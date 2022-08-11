<?php

namespace EventEspresso\core\libraries\rest_api;

use WP_REST_Request;

class Authorization
{
    /**
     * @var WP_REST_Request
     */
    protected $request;


    public static function verifyAccess(WP_REST_Request $request)
    {
        // $headers = $request->get_headers();
        // foreach ($headers as $key => $header) {
        //     EEH_Debug_Tools::printr($header, $key, __FILE__, __LINE__);
        // }
        echo "\n";

        // if (is_readable(EE_THIRD_PARTY . 'wp-api-basic-auth/basic-auth.php')) {
        //     $auth_header = $headers['Authorization'] ?? [];
        //     // \EEH_Debug_Tools::printr($auth_header, '$auth_header', __FILE__, __LINE__);
        //     if (Authorization::basicAuthentication($auth_header)) {
        //         return true;
        //     }
        // }

        // if (class_exists('Jwt_Auth')){
        //     $auth_headers = $headers['Authorization'] ?? [];
        // }

        if (class_exists('Miniorange_Api_Authentication')){
            // $auth_header = $headers['Authorization'] ?? [];
            // if (Authorization::basicAuthentication($auth_header)) {
            //     return true;
            // }
            Authorization::jwtAuthentication();
        }
        // throw new RuntimeException(
        //     esc_html__('Authorization required to access REST API routes.', 'event_espresso')
        // );
    }


    private static function basicAuthentication($auth_header): bool
    {
        return is_string($auth_header) && strpos($auth_header, 'Basic') === 0;
    }

    private static function jwtAuthentication()
    {
        $route = site_url(rest_get_url_prefix() . '/api/v1/token?mo_rest_api_test_config=jwt_auth');
        \EEH_Debug_Tools::printr($route, '$route', __FILE__, __LINE__);
        echo "\n";
        $post_data = [
            'username' => 'bc',
            'password' => 'bc',
        ];
        $request = new WP_REST_Request('POST', $route);
        $request->set_body_params($post_data);
        $response = rest_do_request($request);
        \EEH_Debug_Tools::printr($response, '$response', __FILE__, __LINE__);
        echo "\n";
        // if ($response->is_error()) {
        //     $error = $response->as_error();
        //     throw new RuntimeException(
        //         sprintf(
        //             esc_html__('Authorization required to access REST API routes: %1$s', 'event_espresso'),
        //             $error->get_error_message()
        //         )
        //     );
        // }
        $data = $response->get_data();
        \EEH_Debug_Tools::printr($data, '$data', __FILE__, __LINE__);
        echo "\n\n";
    }
}