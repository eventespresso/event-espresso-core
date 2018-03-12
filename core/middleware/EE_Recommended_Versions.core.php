<?php

use EventEspresso\core\services\request\middleware\RecommendedVersions;

defined('EVENT_ESPRESSO_VERSION') || exit('No direct script access allowed');



/**
 * Class EE_Recommended_Versions
 * checks required and recommended versions for both WP and PHP
 * terminates the request if minimum required versions are not met
 *
 * @deprecated
 * @package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 * @since         4.8.20
 */
class EE_Recommended_Versions extends EE_Middleware
{


    /**
     * @deprecated
     * @param EE_Request $request
     * @param EE_Response   $response
     * @return EE_Response
     */
    public function handle_request(EE_Request $request, EE_Response $response)
    {
        EE_Error::doing_it_wrong(
            __METHOD__,
            sprintf(
                esc_html__(
                    'This class is deprecated. Please use %1$s instead. All Event Espresso request stack classes have been moved to %2$s and are now under the %3$s namespace',
                    'event_espresso'
                ),
                'EventEspresso\core\services\request\middleware\RecommendedVersions',
                '\core\services\request',
                'EventEspresso\core\services\request'
            ),
            '4.9.52'
        );
        $this->_request  = $request;
        $this->_response = $response;
        //$this->_response->add_output( "\n\t IN >>  " . __CLASS__ );
        //$this->_response->set_notice( 1, 'hey look at this' );
        // check required WP version
        if (! $this->_minimum_wp_version_required()) {
            $this->_request->un_set('activate', true);
            add_action('admin_notices', array($this, 'minimum_wp_version_error'), 1);
            //$this->_response->add_output( "\n<br />" . 'minimum_wp_version_error' );
            $this->_response->terminate_request();
            $this->_response->deactivate_plugin();
        }
        // check recommended PHP version
        if (! $this->_minimum_php_version_recommended()) {
            $this->_display_minimum_recommended_php_version_notice();
        }

        //upcoming required version
        if (! $this->upcomingRequiredPhpVersion()) {
            $this->displayUpcomingRequiredVersion();
        }
        $this->_response = $this->process_request_stack($this->_request, $this->_response);
        //$this->_response->add_output( "\n\t OUT << " . __CLASS__ );
        return $this->_response;
    }


    /**
     * @deprecated
     * @param string $version_to_check
     * @param string $operator
     * @return bool
     */
    public static function check_wp_version($version_to_check = EE_MIN_WP_VER_REQUIRED, $operator = '>=')
    {
        EE_Error::doing_it_wrong(
            __METHOD__,
            sprintf(
                esc_html__(
                    'This method is deprecated. Please use %1$s instead. All Event Espresso request stack classes have been moved to %2$s and are now under the %3$s namespace',
                    'event_espresso'
                ),
                'EventEspresso\core\services\request\middleware\RecommendedVersions::compareWordPressVersion()',
                '\core\services\request',
                'EventEspresso\core\services\request'
            ),
            '4.9.52',
            '5.0.0'
        );
        return RecommendedVersions::compareWordPressVersion($version_to_check, $operator);
    }



    /**
     * @deprecated
     * @return void
     */
    public function minimum_wp_version_error()
    {
        EE_Error::doing_it_wrong(
            __METHOD__,
            sprintf(
                esc_html__(
                    'This method is deprecated. Please use %1$s instead. All Event Espresso request stack classes have been moved to %2$s and are now under the %3$s namespace',
                    'event_espresso'
                ),
                'EventEspresso\core\services\request\middleware\RecommendedVersions::minimumWpVersionError()',
                '\core\services\request',
                'EventEspresso\core\services\request'
            ),
            '4.9.52'
        );
    }


    /**
     * Returns whether the provided php version number is greater than the current version of php installed on the server.
     * @param string $version_required
     * @return bool
     */
    private function upcomingRequiredPhpVersion($version_required = '5.5')
    {
        return $this->_check_php_version($version_required);
    }



    /**
     *  Sets a notice for an upcoming required version of PHP in the next update of EE core.
     */
    private function displayUpcomingRequiredVersion()
    {
        if ($this->_request->isAdmin()
            && apply_filters('FHEE__EE_Recommended_Versions__displayUpcomingRequiredVersion', true, $this->_request)
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
