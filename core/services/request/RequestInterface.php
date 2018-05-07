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
     * returns contents of $_REQUEST
     *
     * @return array
     */
    public function requestParams();


    /**
     * @param string $key
     * @param string $value
     * @param bool   $override_ee
     * @return    void
     */
    public function setRequestParam($key, $value, $override_ee = false);


    /**
     * returns the value for a request param if the given key exists
     *
     * @param string $key
     * @param null   $default
     * @return mixed
     */
    public function getRequestParam($key, $default = null);


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
     * @param null|mixed $default
     * @return false|int
     */
    public function getMatch($pattern, $default = null);


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
     * @return string
     */
    public function ipAddress();


    /**
     * @return string
     */
    public function requestUri();


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
}
