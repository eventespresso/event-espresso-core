<?php

use EventEspresso\core\services\request\middleware\RecommendedVersions;

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
}
