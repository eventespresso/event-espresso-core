<?php

use EventEspresso\core\services\request_stack\middleware\RecommendedVersions;

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
     * @param EE_Request  $request
     * @param EE_Response $response
     * @return EE_Response
     */
    public function handle_request(EE_Request $request, EE_Response $response)
    {
        EE_Error::doing_it_wrong(
            __METHOD__,
            esc_html__(
                'All Event Espresso request stack classes have been moved to \core\services\request_stack  and are now under the EventEspresso\core\services\request_stack namespace',
                'event_espresso'
            ),
            '4.9.52'
        );
        return $response;
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
            esc_html__(
                'This method is deprecated. Please use EventEspresso\core\services\request_stack\middleware\RecommendedVersions::compareWordPressVersion() instead. All Event Espresso request stack classes have been moved to \core\services\request_stack  and are now under the EventEspresso\core\services\request_stack namespace',
                'event_espresso'
            ),
            '4.9.52',
            '4.10.0'
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
            esc_html__(
                'This method is deprecated. Please use EventEspresso\core\services\request_stack\middleware\RecommendedVersions::minimumWpVersionError() instead. All Event Espresso request stack classes have been moved to \core\services\request_stack  and are now under the EventEspresso\core\services\request_stack namespace',
                'event_espresso'
            ),
            '4.9.52'
        );
    }




}
// End of file EE_Recommended_Versions.core.php
// Location: /EE_Recommended_Versions.core.php
