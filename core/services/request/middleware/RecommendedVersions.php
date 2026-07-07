<?php

namespace EventEspresso\core\services\request\middleware;

use EventEspresso\core\services\request\RequestInterface;
use EventEspresso\core\services\request\ResponseInterface;

/**
 * Class RecommendedVersions
 * checks required and recommended versions for both WP and PHP
 * terminates the request if minimum required versions are not met
 *
 * @package EventEspresso\core\services\request\middleware
 * @author  Brent Christensen
 * @since   4.9.52
 */
class RecommendedVersions extends Middleware
{
    /**
     * converts a Request to a Response
     *
     * @param RequestInterface  $request
     * @param ResponseInterface $response
     * @return ResponseInterface
     */
    public function handleRequest(RequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $this->request  = $request;
        $this->response = $response;

        if (! $this->minimumWordPressVersionRequired()) {
            $this->minimumWpVersionError();
            $this->terminateAndDeactivate();
        }

        if (CHECK_UPCOMING_REQUIRED_PHP_VERSION && ! $this->upcomingRequiredPhpVersion()) {
            $this->upcomingRequiredVersionWarning();
        }

        $this->response = $this->processRequestStack($this->request, $this->response);
        return $this->response;
    }


    private function terminateAndDeactivate(): void
    {
        $this->request->unSetRequestParam('activate', true);
        $this->response->terminateRequest();
        $this->response->deactivatePlugin();
    }


    /**
     * Helper method to assess installed wp version against given values.
     * By default, this compares the required minimum version of WP for EE against the installed version of WP
     * Note, $wp_version is the first parameter sent into the PHP version_compare function (what is being checked
     * against) so consider that when sending in your values.
     *
     * @param string $version_to_check
     * @param string $operator
     * @return bool
     */
    public static function compareWordPressVersion(
        string $version_to_check = EE_MIN_WP_VER_REQUIRED,
        string $operator = '>='
    ): bool {
        global $wp_version;
        // first account for wp_version being pre-release
        // (like RC, beta etc) which are usually in the format like 4.7-RC3-39519
        $installed_version = strpos($wp_version, '-') > 0
            ? substr($wp_version, 0, strpos($wp_version, '-'))
            : $wp_version;
        return version_compare($installed_version, $version_to_check, $operator);
    }


    /**
     * @return boolean
     */
    private function minimumWordPressVersionRequired(): bool
    {
        return RecommendedVersions::compareWordPressVersion();
    }


    /**
     * Returns whether the provided php version number is less than the current version of php installed on the server.
     *
     * @return bool
     */
    private function upcomingRequiredPhpVersion(): bool
    {
        return version_compare(PHP_VERSION, UPCOMING_REQUIRED_PHP_VERSION, '>=');
    }


    /**
     * @return void
     */
    public function minimumWpVersionError(): void
    {
        if ($this->request->isAdmin() && current_user_can('update_plugins')) {
            add_action(
                'admin_notices',
                function() {
                    global $wp_version;
                    echo '
                <div class="notice error">
                    <p style="font-size: .9375rem; padding: .0625rem .75rem;">'
                        . sprintf(
                            esc_html__(
                                'We\'re sorry, but Event Espresso requires WordPress version %1$s or greater in order to operate. You are currently running version %2$s.%3$sFor information on how to update your version of WordPress, please go to %4$s.',
                                'event_espresso'
                            ),
                            EE_MIN_WP_VER_REQUIRED,
                            $wp_version,
                            '<br/>',
                            '<a href="https://codex.wordpress.org/Updating_WordPress">https://codex.wordpress.org/Updating_WordPress</a>'
                        ) . '
                    </p>
                </div>';
                }
            );
        }
    }


    /**
     *  Sets a notice for an upcoming required version of PHP in the next update of EE core.
     */
    private function upcomingRequiredVersionWarning(): void
    {
        if (
            $this->request->isAdmin()
            && apply_filters('FHEE__EE_Recommended_Versions__displayUpcomingRequiredVersion', true, $this->request)
            && current_user_can('update_plugins')
        ) {
            add_action(
                'admin_notices',
                function() {
                    echo '
                <div class="notice event-espresso-admin-notice notice-warning">
                    <p style="font-size: .9375rem; padding: .0625rem .75rem;">'
                        . sprintf(
                            esc_html__(
                                '%1$sIMPORTANT%2$s%7$sThe next update of Event Espresso %1$srequires PHP %6$s or greater%2$s.  Your web server\'s PHP version is %3$s.  You will need to contact your hosting provider and ask them to update your PHP version to at least PHP %6$s.%7$sPlease do not update to the new version of Event Espresso until the PHP update is completed.  Read about why keeping your server on the latest version of PHP is a good idea %4$shere%5$s',
                                'event_espresso'
                            ),
                            '<strong>',
                            '</strong>',
                            PHP_VERSION,
                            '<a href="https://wordpress.org/support/upgrade-php/" target="_blank" rel="noopener noreferrer">',
                            '</a>',
                            UPCOMING_REQUIRED_PHP_VERSION,
                            '<br>'
                        ) . '
                    </p>
                </div>';
                }
            );
        }
    }
}
