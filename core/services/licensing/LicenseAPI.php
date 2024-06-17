<?php

namespace EventEspresso\core\services\licensing;

use EE_Error;
use stdClass;
use WP_Error;

class LicenseAPI
{
    public const ACTION_ACTIVATE            = 'activate_license';

    public const ACTION_DEACTIVATE          = 'deactivate_license';

    public const ACTION_CHECK               = 'check_license';

    public const ACTION_GET_VERSION         = 'get_version';

    public const ACTION_RESET               = 'reset_license';

    public const API_USES_ITEM_ID_OR_NAME   = 'item_name';

    public const AUTHOR                     = 'Event Espresso';

    public const REQUEST_PARAM_ACTION       = 'license_action';

    public const REQUEST_PARAM_ITEM_ID      = 'item_id';

    public const REQUEST_PARAM_ITEM_NAME    = 'item_name';

    public const REQUEST_PARAM_LICENSE_KEY  = 'license_key';

    public const REQUEST_PARAM_MIN_CORE_VER = 'min_core_ver';

    public const REQUEST_PARAM_PLUGIN_SLUG  = 'plugin_slug';

    public const REQUEST_PARAM_PLUGIN_VER   = 'plugin_ver';

    public const URL                        = 'https://my.eventespresso.com/';


    /**
     * successfull license key API response example:
     *  {
     *      "success": true,
     *      "license": "valid",
     *      "item_id": false (or Item ID if passed)
     *      "item_name": "EDD Product Name",
     *      "license_limit": 0,
     *      "site_count": 2,
     *      "expires": "2020-06-30 23:59:59",
     *      "activations_left": "unlimited",
     *      "checksum": "<md5 checksum>",
     *      "payment_id": 12345,
     *      "customer_name": "John Doe",
     *      "customer_email": "john@sample.org",
     *      "price_id": "2"
     *  }
     * failed license key API response example:
     *  {
     *      "success": false,
     *      "license": "invalid",
     *      "item_id": false (or Item ID if passed)
     *      "item_name": "EDD Product Name",
     *      "error": "expired",
     *      "expires": "2020-04-28 23:59:59",
     *      "license_limit": 0,
     *      "site_count": 1,
     *      "activations_left": "unlimited",
     *      "checksum": "<md5 checksum>",
     *      "payment_id": 12345,
     *      "customer_name": "John Doe",
     *      "customer_email": "john@sample.com",
     *      "price_id": "2"
     *  }
     *
     * @param string $action
     * @param string $license_key
     * @param string $item_id
     * @param string $item_name
     * @param string $plugin_version
     * @param string $min_core_version
     * @return stdClass
     */
    public function postRequest(
        string $action,
        string $license_key,
        string $item_id,
        string $item_name,
        string $plugin_version,
        string $min_core_version = ''
    ): stdClass {
        $body = [
            'edd_action'                  => $action,
            'event_espresso_core_version' => EVENT_ESPRESSO_VERSION,
            'min_core_version'            => $min_core_version,
            'license'                     => $license_key,
            'version'                     => $plugin_version,
            'php_version'                 => phpversion(),
            'url'                         => home_url(),
            'wp_version'                  => get_bloginfo('version'),
            'environment'                 => function_exists('wp_get_environment_type')
                ? wp_get_environment_type()
                : 'production',
        ];
        // change the item ID or item name based on the API_USES_ITEM_ID_OR_NAME constant
        if (LicenseAPI::API_USES_ITEM_ID_OR_NAME === 'item_name') {
            $body['item_name'] = $item_name;
        } else {
            $body['item_id'] = $item_id;
        }

        $response = $this->handleApiErrors(
            wp_remote_post(
                LicenseAPI::url(),
                [
                    'timeout' => 15,
                    'body'    => $body,
                ]
            )
        );
        // decode the license data
        return (object) json_decode(wp_remote_retrieve_body($response));
    }


    /**
     * @param array|WP_Error $response
     * @return array
     */
    private function handleApiErrors($response): array
    {
        // make sure the response came back okay
        if (is_wp_error($response) || wp_remote_retrieve_response_code($response) !== 200) {
            EE_Error::add_error($response->get_error_message(), __FILE__, __FUNCTION__, __LINE__);
            return ['success' => false, 'error' => true];
        }
        return $response;
    }


    public function getProductVersions(array $products): stdClass
    {
        $response = $this->handleApiErrors(
            wp_remote_post(
                LicenseAPI::url(),
                [
                    'timeout' => 15,
                    'body'    => [
                        'edd_action' => LicenseAPI::ACTION_GET_VERSION,
                        'products'   => $products,
                    ],
                ]
            )
        );
        // decode the license data
        return (object) json_decode(wp_remote_retrieve_body($response));
    }


    public static function url(): string
    {
        return defined('EDD_LICENSE_API_URL') ? EDD_LICENSE_API_URL : LicenseAPI::URL;
    }
}
