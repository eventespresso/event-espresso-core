<?php
namespace EventEspresso\core\libraries\rest_api\controllers;

use Exception;
use WP_Error;
use WP_REST_Response;
use EventEspresso\core\libraries\rest_api\RestException;

use EE_Error;
use EED_Core_Rest_Api;
use EEH_Inflector;

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

    /**
     * @deprecated use all-caps version
     */
    // @codingStandardsIgnoreStart
    const header_prefix_for_ee = 'X-EE-';
    // @codingStandardsIgnoreEnd

    const HEADER_PREFIX_FOR_EE = 'X-EE-';

    /**
     * @deprecated use all-caps version instead
     */
    // @codingStandardsIgnoreStart
    const header_prefix_for_wp = 'X-WP-';
    // @codingStandardsIgnoreEnd

    const HEADER_PREFIX_FOR_WP = 'X-WP-';

    /**
     * Contains debug info we'll send back in the response headers
     *
     * @var array
     */
    protected $debug_info = array();

    /**
     * Indicates whether or not the API is in debug mode
     *
     * @var boolean
     */
    protected $debug_mode = false;

    /**
     * Indicates the version that was requested
     *
     * @var string
     */
    protected $requested_version;

    /**
     * flat array of headers to send in the response
     *
     * @var array
     */
    protected $response_headers = array();



    public function __construct()
    {
        $this->debug_mode = defined('EE_REST_API_DEBUG_MODE') ? EE_REST_API_DEBUG_MODE : false;
        //we are handling a REST request. Don't show a fancy HTML error message is any error comes up
        add_filter('FHEE__EE_Error__get_error__show_normal_exceptions', '__return_true');
    }



    /**
     * Sets the version the user requested
     *
     * @param string $version eg '4.8'
     */
    public function setRequestedVersion($version)
    {
        $this->requested_version = $version;
    }



    /**
     * Sets some debug info that we'll send back in headers
     *
     * @param string       $key
     * @param string|array $info
     */
    protected function setDebugInfo($key, $info)
    {
        $this->debug_info[$key] = $info;
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
    protected function setResponseHeader($header_key, $value, $use_ee_prefix = true)
    {
        if (is_array($value)) {
            foreach ($value as $value_key => $value_value) {
                $this->setResponseHeader($header_key . '[' . $value_key . ']', $value_value);
            }
        } else {
            $prefix = $use_ee_prefix ? Base::HEADER_PREFIX_FOR_EE : Base::HEADER_PREFIX_FOR_WP;
            $this->response_headers[$prefix . $header_key] = $value;
        }
    }



    /**
     * Returns a flat array of headers to be added to the response
     *
     * @return array
     */
    protected function getResponseHeaders()
    {
        return apply_filters(
            'FHEE__EventEspresso\core\libraries\rest_api\controllers\Base___get_response_headers',
            $this->response_headers,
            $this,
            $this->requested_version
        );
    }



    /**
     * Adds error notices from EE_Error onto the provided \WP_Error
     *
     * @param WP_Error $wp_error_response
     * @return WP_Error
     */
    protected function addEeErrorsToResponse(WP_Error $wp_error_response)
    {
        $notices_during_checkin = EE_Error::get_raw_notices();
        if (! empty($notices_during_checkin['errors'])) {
            foreach ($notices_during_checkin['errors'] as $error_code => $error_message) {
                $wp_error_response->add(
                    sanitize_key($error_code),
                    strip_tags($error_message)
                );
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
     * @param array|WP_Error|Exception|RestException $response
     * @return WP_REST_Response
     */
    public function sendResponse($response)
    {
        if ($response instanceof RestException) {
            $response = new WP_Error($response->getStringCode(), $response->getMessage(), $response->getData());
        }
        if ($response instanceof Exception) {
            $code = $response->getCode() ? $response->getCode() : 'error_occurred';
            $response = new WP_Error($code, $response->getMessage());
        }
        if ($response instanceof WP_Error) {
            $response = $this->addEeErrorsToResponse($response);
            $rest_response = $this->createRestResponseFromWpError($response);
        } else {
            $rest_response = new WP_REST_Response($response, 200);
        }
        $headers = array();
        if ($this->debug_mode && is_array($this->debug_info)) {
            foreach ($this->debug_info as $debug_key => $debug_info) {
                if (is_array($debug_info)) {
                    $debug_info = wp_json_encode($debug_info);
                }
                $headers['X-EE4-Debug-' . ucwords($debug_key)] = $debug_info;
            }
        }
        $headers = array_merge(
            $headers,
            $this->getResponseHeaders(),
            $this->getHeadersFromEeNotices()
        );
        $rest_response->set_headers($headers);
        return $rest_response;
    }



    /**
     * Converts the \WP_Error into `WP_REST_Response.
     * Mostly this is just a copy-and-paste from \WP_REST_Server::error_to_response
     * (which is protected)
     *
     * @param WP_Error $wp_error
     * @return WP_REST_Response
     */
    protected function createRestResponseFromWpError(WP_Error $wp_error)
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
        return new WP_REST_Response($data, $status);
    }



    /**
     * Array of headers derived from EE success, attention, and error messages
     *
     * @return array
     */
    protected function getHeadersFromEeNotices()
    {
        $headers = array();
        $notices = EE_Error::get_raw_notices();
        foreach ($notices as $notice_type => $sub_notices) {
            if (! is_array($sub_notices)) {
                continue;
            }
            foreach ($sub_notices as $notice_code => $sub_notice) {
                $headers['X-EE4-Notices-'
                         . EEH_Inflector::humanize($notice_type)
                         . '['
                         . $notice_code
                         . ']'] = strip_tags($sub_notice);
            }
        }
        return apply_filters(
            'FHEE__EventEspresso\core\libraries\rest_api\controllers\Base___get_headers_from_ee_notices__return',
            $headers,
            $this->requested_version,
            $notices
        );
    }



    /**
     * Finds which version of the API was requested given the route, and returns it.
     * eg in a request to "mysite.com/wp-json/ee/v4.8.29/events/123" this would return
     * "4.8.29".
     * We should know hte requested version in this model though, so if no route is
     * provided just use what we set earlier
     *
     * @param string $route
     * @return string
     */
    public function getRequestedVersion($route = null)
    {
        if ($route === null) {
            return $this->requested_version;
        }
        $matches = $this->parseRoute(
            $route,
            '~' . EED_Core_Rest_Api::ee_api_namespace_for_regex . '~',
            array('version')
        );
        if (isset($matches['version'])) {
            return $matches['version'];
        } else {
            return EED_Core_Rest_Api::latest_rest_api_version();
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
     * @throws EE_Error if it couldn't be parsed
     */
    public function parseRoute($route, $regex, $match_keys)
    {
        $indexed_matches = array();
        $success = preg_match($regex, $route, $matches);
        if (is_array($matches)) {
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
            throw new EE_Error(
                __('We could not parse the URL. Please contact Event Espresso Support', 'event_espresso'),
                'endpoint_parsing_error'
            );
        }
        return $indexed_matches;
    }



    /**
     * Gets the body's params (either from JSON or parsed body), which EXCLUDES the GET params and URL params
     *
     * @param \WP_REST_Request $request
     * @return array
     */
    protected function getBodyParams(\WP_REST_Request $request)
    {
        //$request->get_params();
        return array_merge(
            (array)$request->get_body_params(),
            (array)$request->get_json_params()
        );
        // return array_diff_key(
        //    $request->get_params(),
        //     $request->get_url_params(),
        //     $request->get_query_params()
        // );
    }
}

// End of file Base.php
