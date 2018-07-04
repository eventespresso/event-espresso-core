<?php

namespace EventEspresso\core\services\request\middleware;

use EventEspresso\core\services\request\RequestInterface;
use EventEspresso\core\services\request\ResponseInterface;
use EventEspresso\core\domain\entities\notifications\PersistentAdminNotice;
use EventEspresso\core\exceptions\InvalidDataTypeException;

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
     * @throws InvalidDataTypeException
     */
    public function handleRequest(RequestInterface $request, ResponseInterface $response)
    {
        $this->request = $request;
        $this->response = $response;
        // check required WP version
        if (! $this->minimumWordPressVersionRequired()) {
            $this->request->unSetRequestParam('activate', true);
            add_action('admin_notices', array($this, 'minimumWpVersionError'), 1);
            $this->response->terminateRequest();
            $this->response->deactivatePlugin();
        }
        // check recommended PHP version
        if (! $this->minimumPhpVersionRecommended()) {
            $this->displayMinimumRecommendedPhpVersionNotice();
        }
        // upcoming required version
        if (! $this->upcomingRequiredPhpVersion()) {
            $this->displayUpcomingRequiredVersion();
        }
        $this->response = $this->processRequestStack($this->request, $this->response);
        return $this->response;
    }


    /**
     * Helper method to assess installed wp version against given values.
     * By default this compares the required minimum version of WP for EE against the installed version of WP
     * Note, $wp_version is the first parameter sent into the PHP version_compare function (what is being checked
     * against) so consider that when sending in your values.
     *
     * @param string $version_to_check
     * @param string $operator
     * @return bool
     */
    public static function compareWordPressVersion($version_to_check = EE_MIN_WP_VER_REQUIRED, $operator = '>=')
    {
        global $wp_version;
        return version_compare(
            // first account for wp_version being pre-release
            // (like RC, beta etc) which are usually in the format like 4.7-RC3-39519
            strpos($wp_version, '-') > 0
                ? substr($wp_version, 0, strpos($wp_version, '-'))
                : $wp_version,
            $version_to_check,
            $operator
        );
    }


    /**
     * @return boolean
     */
    private function minimumWordPressVersionRequired()
    {
        return RecommendedVersions::compareWordPressVersion();
    }


    /**
     * @param string $min_version
     * @return boolean
     */
    private function checkPhpVersion($min_version = EE_MIN_PHP_VER_RECOMMENDED)
    {
        return version_compare(PHP_VERSION, $min_version, '>=') ? true : false;
    }


    /**
     * @return boolean
     */
    private function minimumPhpVersionRecommended()
    {
        return $this->checkPhpVersion();
    }


    /**
     * @return void
     */
    public function minimumWpVersionError()
    {
        global $wp_version;
        ?>
        <div class="error">
            <p>
                <?php
                printf(
                    __(
                        'We\'re sorry, but Event Espresso requires WordPress version %1$s or greater in order to operate. You are currently running version %2$s.%3$sFor information on how to update your version of WordPress, please go to %4$s.',
                        'event_espresso'
                    ),
                    EE_MIN_WP_VER_REQUIRED,
                    $wp_version,
                    '<br/>',
                    '<a href="http://codex.wordpress.org/Updating_WordPress">http://codex.wordpress.org/Updating_WordPress</a>'
                );
                ?>
            </p>
        </div>
        <?php
    }


    /**
     *    _display_minimum_recommended_php_version_notice
     *
     * @access private
     * @return void
     * @throws InvalidDataTypeException
     */
    private function displayMinimumRecommendedPhpVersionNotice()
    {
        if ($this->request->isAdmin()) {
            new PersistentAdminNotice(
                'php_version_' . str_replace('.', '-', EE_MIN_PHP_VER_RECOMMENDED) . '_recommended',
                sprintf(
                    esc_html__(
                        'Event Espresso recommends PHP version %1$s or greater for optimal performance. You are currently running version %2$s.%3$sIn order to update your version of PHP, you will need to contact your current hosting provider.%3$sFor information on stable PHP versions, please go to %4$s.',
                        'event_espresso'
                    ),
                    EE_MIN_PHP_VER_RECOMMENDED,
                    PHP_VERSION,
                    '<br/>',
                    '<a href="http://php.net/downloads.php">http://php.net/downloads.php</a>'
                )
            );
        }
    }


    /**
     * Returns whether the provided php version number is less than the current version of php installed on the server.
     *
     * @param string $version_required
     * @return bool
     */
    private function upcomingRequiredPhpVersion($version_required = '5.5')
    {
        return true;
        // return $this->checkPhpVersion($version_required);
    }


    /**
     *  Sets a notice for an upcoming required version of PHP in the next update of EE core.
     */
    private function displayUpcomingRequiredVersion()
    {
        if ($this->request->isAdmin()
            && apply_filters('FHEE__EE_Recommended_Versions__displayUpcomingRequiredVersion', true, $this->request)
            && current_user_can('update_plugins')
        ) {
            add_action('admin_notices', function () {
                echo '<div class="notice event-espresso-admin-notice notice-warning"><p>'
                     . sprintf(
                         esc_html__(
                             'Please note: The next update of Event Espresso 4 will %1$srequire%2$s PHP 5.4.45 or greater.  Your web server\'s PHP version is %3$s.  You can contact your host and ask them to update your PHP version to at least PHP 5.6.  Please do not update to the new version of Event Espresso 4 until the PHP update is completed. Read about why keeping your server on the latest version of PHP is a good idea %4$shere%5$s',
                             'event_espresso'
                         ),
                         '<strong>',
                         '</strong>',
                         PHP_VERSION,
                         '<a href="https://wordpress.org/support/upgrade-php/">',
                         '</a>'
                     )
                     . '</p></div>';
            });
        }
    }
}
