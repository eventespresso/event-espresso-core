<?php

namespace EventEspresso\core\services\request;

use EventEspresso\core\domain\services\contexts\RequestTypeContextCheckerInterface;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * RequestInterface
 * Representation of an incoming, server-side HTTP request
 * with additional evaluation methods added via RequestTypeContextCheckerInterface
 *
 * @package EventEspresso\core\services\request
 * @author  Brent Christensen
 * @since   $VID:$
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
