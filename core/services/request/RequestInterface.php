<?php

namespace EventEspresso\core\services\request;

use EventEspresso\core\domain\services\contexts\RequestTypeContextCheckerInterface;

/**
 * RequestInterface
 * Representation of an incoming, server-side HTTP request
 * with additional evaluation methods added via RequestTypeContextCheckerInterface
 *
 * @package EventEspresso\core\services\request
 * @author  Brent Christensen
 * @since   4.9.59.p
 */
interface RequestInterface extends RequestTypeContextCheckerInterface
{

    /**
     * @param RequestTypeContextCheckerInterface $type
     */
    public function setRequestTypeContextChecker(RequestTypeContextCheckerInterface $type);


    /**
     * @return array
     */
    public function getParams();


    /**
     * @return array
     */
    public function postParams();


    /**
     * @return array
     */
    public function cookieParams();


    /**
     * @return array
     */
    public function serverParams();


    /**
     * @param string $key
     * @param mixed|null $default
     * @return array|int|float|string
     */
    public function getServerParam($key, $default = null);


    /**
     * @param string                 $key
     * @param array|int|float|string $value
     * @return void
     */
    public function setServerParam($key, $value);


    /**
     * @param string $key
     * @return bool
     */
    public function serverParamIsSet($key);


    /**
     * @return array
     */
    public function filesParams();


    /**
     * returns sanitized contents of $_REQUEST
     *
     * @return array
     */
    public function requestParams();


    /**
     * @param string $key
     * @param string $value
     * @param bool   $override_ee
     * @return void
     */
    public function setRequestParam($key, $value, $override_ee = false);


    /**
     * returns   the value for a request param if the given key exists
     *
     * @param string     $key
     * @param mixed|null $default
     * @param string     $type      the expected data type for the parameter's value, ie: string, int, bool, etc
     * @param bool       $is_array  if true, then parameter value will be treated as an array of $type
     * @param string     $delimiter for CSV type strings that should be returned as an array
     * @return array|bool|float|int|string
     */
    public function getRequestParam($key, $default = null, $type = DataType::STRING, $is_array = false, $delimiter = '');


    /**
     * check if param exists
     *
     * @param string $key
     * @return bool
     */
    public function requestParamIsSet($key);


    /**
     * check if a request parameter exists whose key that matches the supplied wildcard pattern
     * and return the value for the first match found
     * wildcards can be either of the following:
     *      ? to represent a single character of any type
     *      * to represent one or more characters of any type
     *
     * @param string     $pattern
     * @param mixed|null $default
     * @param string     $type      the expected data type for the parameter's value, ie: string, int, bool, etc
     * @param bool       $is_array  if true, then parameter value will be treated as an array of $type
     * @param string     $delimiter for CSV type strings that should be returned as an array
     * @return array|bool|float|int|string
     */
    public function getMatch($pattern, $default = null, $type = DataType::STRING, $is_array = false, $delimiter = '');


    /**
     * check if a request parameter exists whose key matches the supplied wildcard pattern
     * wildcards can be either of the following:
     *      ? to represent a single character of any type
     *      * to represent one or more characters of any type
     * returns true if a match is found or false if not
     *
     * @param string $pattern
     * @return false|int
     */
    public function matches($pattern);


    /**
     * remove param
     *
     * @param string $key
     * @param bool   $unset_from_global_too
     */
    public function unSetRequestParam($key, $unset_from_global_too = false);


    /**
     * remove params
     *
     * @param array $keys
     * @param bool  $unset_from_global_too
     */
    public function unSetRequestParams(array $keys, $unset_from_global_too = false);


    /**
     * @return string
     */
    public function ipAddress();


    /**
     * @param boolean $relativeToWpRoot    whether or not to return the uri relative to WordPress' home URL.
     * @param boolean $remove_query_params whether or not to return the uri with all query params removed.
     * @return string
     */
    public function requestUri($relativeToWpRoot = false, $remove_query_params = false);


    /**
     * @return string
     */
    public function userAgent();


    /**
     * @param string $user_agent
     */
    public function setUserAgent($user_agent = '');


    /**
     * @return bool
     */
    public function isBot();


    /**
     * @param bool $is_bot
     */
    public function setIsBot($is_bot);


    /**
     * returns the path portion of the current request URI with both the WP Root (home_url()) and query params removed
     *
     * @return string
     * @since   $VID:$
     */
    public function requestPath();


    /**
     * returns true if the last segment of the current request path (without params) matches the provided string
     *
     * @param string $uri_segment
     * @return bool
     * @since   $VID:$
     */
    public function currentPageIs($uri_segment);


    /**
     * merges the incoming array of parameters into the existing request parameters
     *
     * @param array $request_params
     * @return mixed
     * @since   4.10.24.p
     */
    public function mergeRequestParams(array $request_params);
}
