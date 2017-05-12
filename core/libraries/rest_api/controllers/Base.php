<?php
namespace EventEspresso\core\libraries\rest_api\controllers;

use EventEspresso\core\libraries\rest_api\Rest_Exception;

if (! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * Base
 * Base controller for EE REST API
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 */
class Base
{

    const header_prefix_for_ee = 'X-EE-';

    const header_prefix_for_wp = 'X-WP-';

    /**
     * Contains debug info we'll send back in the response headers
     *
     * @var array
     */
    protected $_debug_info = array();

    /**
     * Indicates whether or not the API is in debug mode
     *
     * @var boolean
     */
    protected $_debug_mode = false;

    /**
     * Indicates the version that was requested
     *
     * @var string
     */
    protected $_requested_version;

    /**
     * flat array of headers to send in the response
     *
     * @var array
     */
    protected $_response_headers = array();



    public function __construct()
    {
        $this->_debug_mode = defined('EE_REST_API_DEBUG_MODE') ? EE_REST_API_DEBUG_MODE : false;
    }



    /**
     * Sets the version the user requested
     *
     * @param string $version eg '4.8'
     */
    public function set_requested_version($version)
    {
        $this->_requested_version = $version;
    }



    /**
     * Sets some debug info that we'll send back in headers
     *
     * @param string       $key
     * @param string|array $info
     */
    protected function _set_debug_info($key, $info)
    {
        $this->_debug_info[$key] = $info;
    }



    /**
     * Sets headers for the response
     *
     * @param string       $header_key    , excluding the "X-EE-" part
     * @param array|string $value         if an array, multiple headers will be added, one
     *                                    for each key in the array
     * @param boolean      $use_ee_prefix whether to use the EE prefix on the header, or fallback to
     *                                    the standard WP one
     */
    protected function _set_response_header($header_key, $value, $use_ee_prefix = true)
    {
        if (is_array($value)) {
            foreach ($value as $value_key => $value_value) {
                $this->_set_response_header($header_key . '[' . $value_key . ']', $value_value);
            }
        } else {
            $prefix = $use_ee_prefix ? Base::header_prefix_for_ee : Base::header_prefix_for_wp;
            $this->_response_headers[$prefix . $header_key] = $value;
        }
    }



    /**
     * Returns a flat array of headers to be added to the response
     *
     * @return array
     */
    protected function _get_response_headers()
    {
        return apply_filters('FHEE__EventEspresso\core\libraries\rest_api\controllers\Base___get_response_headers',
            $this->_response_headers,
            $this,
            $this->_requested_version
        );
    }



    /**
     * Adds error notices from EE_Error onto the provided \WP_Error
     *
     * @param \WP_Error $wp_error_response
     * @return \WP_Error
     */
    protected function _add_ee_errors_to_response(\WP_Error $wp_error_response)
    {
        $notices_during_checkin = \EE_Error::get_raw_notices();
        if (! empty($notices_during_checkin['errors'])) {
            foreach ($notices_during_checkin['errors'] as $error_code => $error_message) {
                $wp_error_response->add(
                    sanitize_key($error_code),
                    strip_tags($error_message));
            }
        }
        return $wp_error_response;
    }



    /**
     * Sends a response, but also makes sure to attach headers that
     * are handy for debugging.
     * Specifically, we assume folks will want to know what exactly was the DB query that got run,
     * what exactly was the Models query that got run, what capabilities came into play, what fields were omitted from
     * the response, others?
     *
     * @param array|\WP_Error|\Exception $response
     * @return \WP_REST_Response
     */
    public function send_response($response)
    {
        if ($response instanceof Rest_Exception) {
            $response = new \WP_Error($response->get_string_code(), $response->getMessage(), $response->get_data());
        }
        if ($response instanceof \Exception) {
            $code = $response->getCode() ? $response->getCode() : 'error_occurred';
            $response = new \WP_Error($code, $response->getMessage());
        }
        if ($response instanceof \WP_Error) {
            $response = $this->_add_ee_errors_to_response($response);
            $rest_response = $this->_create_rest_response_from_wp_error($response);
        } else {
            $rest_response = new \WP_REST_Response($response, 200);
        }
        $headers = array();
        if ($this->_debug_mode && is_array($this->_debug_info)) {
            foreach ($this->_debug_info as $debug_key => $debug_info) {
                if (is_array($debug_info)) {
                    $debug_info = wp_json_encode($debug_info);
                }
                $headers['X-EE4-Debug-' . ucwords($debug_key)] = $debug_info;
            }
        }
        $headers = array_merge(
            $headers,
            $this->_get_response_headers(),
            $this->_get_headers_from_ee_notices()
        );
        $rest_response->set_headers($headers);
        return $rest_response;
    }



    /**
     * Converts the \WP_Error into `WP_REST_Response.
     * Mostly this is just a copy-and-paste from \WP_REST_Server::error_to_response
     * (which is protected)
     *
     * @param \WP_Error $wp_error
     * @return \WP_REST_Response
     */
    protected function _create_rest_response_from_wp_error(\WP_Error $wp_error)
    {
        $error_data = $wp_error->get_error_data();
        if (is_array($error_data) && isset($error_data['status'])) {
            $status = $error_data['status'];
        } else {
            $status = 500;
        }
        $errors = array();
        foreach ((array)$wp_error->errors as $code => $messages) {
            foreach ((array)$messages as $message) {
                $errors[] = array(
                    'code'    => $code,
                    'message' => $message,
                    'data'    => $wp_error->get_error_data($code),
                );
            }
        }
        $data = isset($errors[0]) ? $errors[0] : array();
        if (count($errors) > 1) {
            // Remove the primary error.
            array_shift($errors);
            $data['additional_errors'] = $errors;
        }
        return new \WP_REST_Response($data, $status);
    }



    /**
     * Array of headers derived from EE success, attention, and error messages
     *
     * @return array
     */
    protected function _get_headers_from_ee_notices()
    {
        $headers = array();
        $notices = \EE_Error::get_raw_notices();
        foreach ($notices as $notice_type => $sub_notices) {
            if (! is_array($sub_notices)) {
                continue;
            }
            foreach ($sub_notices as $notice_code => $sub_notice) {
                $headers['X-EE4-Notices-'
                         . \EEH_Inflector::humanize($notice_type)
                         . '['
                         . $notice_code
                         . ']'] = strip_tags($sub_notice);
            }
        }
        return apply_filters(
            'FHEE__EventEspresso\core\libraries\rest_api\controllers\Base___get_headers_from_ee_notices__return',
            $headers,
            $this->_requested_version,
            $notices
        );
    }



    /**
     * Finds which version of the API was requested given the route, and returns it.
     * eg in a request to "mysite.com/wp-json/ee/v4.8.29/events/123" this would return
     * "4.8.29"
     *
     * @param string $route
     * @return string
     */
    public function get_requested_version($route = null)
    {
        $matches = $this->parse_route(
            $route,
            '~' . \EED_Core_Rest_Api::ee_api_namespace_for_regex . '~',
            array('version')
        );
        if (isset($matches['version'])) {
            return $matches['version'];
        } else {
            return \EED_Core_Rest_Api::latest_rest_api_version();
        }
    }



    /**
     * Applies the regex to the route, then creates an array using the values of
     * $match_keys as keys (but ignores the full pattern match). Returns the array of matches.
     * For example, if you call
     * parse_route( '/ee/v4.8/events', '~\/ee\/v([^/]*)\/(.*)~', array( 'version', 'model' ) )
     * it will return array( 'version' => '4.8', 'model' => 'events' )
     *
     * @param string $route
     * @param string $regex
     * @param array  $match_keys EXCLUDING matching the entire regex
     * @return array where  $match_keys are the keys (the first value of $match_keys
     *                           becomes the first key of the return value, etc. Eg passing in $match_keys of
     *                           array( 'model', 'id' ), will, if the regex is successful, will return
     *                           array( 'model' => 'foo', 'id' => 'bar' )
     * @throws \EE_Error if it couldn't be parsed
     */
    public function parse_route($route, $regex, $match_keys)
    {
        $indexed_matches = array();
        $success = preg_match($regex, $route, $matches);
        if (
        is_array($matches)
        ) {
            //skip the overall regex match. Who cares
            for ($i = 1; $i <= count($match_keys); $i++) {
                if (! isset($matches[$i])) {
                    $success = false;
                } else {
                    $indexed_matches[$match_keys[$i - 1]] = $matches[$i];
                }
            }
        }
        if (! $success) {
            throw new \EE_Error(
                __('We could not parse the URL. Please contact Event Espresso Support', 'event_espresso'),
                'endpoint_parsing_error'
            );
        }
        return $indexed_matches;
    }
}

// End of file Base.php