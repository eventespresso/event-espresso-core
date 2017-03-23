<?php
namespace EventEspresso\core\libraries\rest_api\controllers\config;

if (! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * _Read
 * For handling READ requests for config data
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 */
class Read
{

    /**
     * @param \WP_REST_Request $request
     * @return \EE_Config|\WP_Error
     */
    public static function handle_request(\WP_REST_Request $request)
    {
        $cap = \EE_Restriction_Generator_Base::get_default_restrictions_cap();
        if (\EE_Capabilities::instance()->current_user_can($cap, 'read_over_api')) {
            return \EE_Config::instance();
        } else {
            return new \WP_Error(
                'cannot_read_config',
                sprintf(
                    __(
                        'You do not have the necessary capabilities (%s) to read Event Espresso Configuration data',
                        'event_espresso'
                    ),
                    $cap
                ),
                array('status' => 403)
            );
        }
    }



    /**
     * Handles the request for public site info
     *
     * @global                 $wp_json_basic_auth_success       boolean set by the basic auth plugin, indicates if the
     *                         current user could be authenticated using basic auth data
     * @global                 $wp_json_basic_auth_received_data boolean set by the basic auth plugin, indicates if
     *                         basic auth data was somehow received
     * @param \WP_REST_Request $request
     * @return \EE_Config|\WP_Error
     */
    public static function handle_request_site_info(\WP_REST_Request $request)
    {
        global $wp_json_basic_auth_success, $wp_json_basic_auth_received_data;
        $insecure_usage_of_basic_auth = apply_filters(
            'EventEspresso__core__libraries__rest_api__controllers__config__handle_request_site_info__insecure_usage_of_basic_auth',
            $wp_json_basic_auth_success && ! is_ssl(),
            $request
        );
        if ($insecure_usage_of_basic_auth) {
            $warning = sprintf(
                esc_html__('Your data is not secured with SSL. %1$sPlease see our recommendations.%2$s',
                    'event_espresso'),
                '<a href="https://eventespresso.com/wiki/rest-api-security-recommendations/">',
                '</a>'
            );
        } else {
            $warning = '';
        }
        return array(
            'default_timezone' => array(
                'pretty' => \EEH_DTT_Helper::get_timezone_string_for_display(),
                'string' => get_option('timezone_string'),
                'offset' => \EEH_DTT_Helper::get_site_timezone_gmt_offset(),
            ),
            'default_currency' => \EE_Config::instance()->currency,
            'authentication'   => array(
                'received_basic_auth_data'     => (bool)$wp_json_basic_auth_received_data,
                'insecure_usage_of_basic_auth' => (bool)$insecure_usage_of_basic_auth,
                'warning'                      => $warning
            )
        );
    }
}

// End of file Read.php