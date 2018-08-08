<?php

namespace EventEspresso\tests\mocks\core\services\request;

use EventEspresso\core\domain\services\contexts\RequestTypeContextCheckerInterface;
use EventEspresso\core\interfaces\InterminableInterface;
use EventEspresso\core\interfaces\ReservedInstanceInterface;
use EventEspresso\core\services\request\RequestInterface;

/**
 * Class RequestMock
 * Description
 *
 * @package EventEspresso\tests\mocks\core\services\request
 * @author  Brent Christensen
 * @since   $VID:$
 */
class RequestMock implements InterminableInterface, RequestInterface, ReservedInstanceInterface
{

    /**
     * @param RequestTypeContextCheckerInterface $type
     */
    public function setRequestTypeContextChecker(RequestTypeContextCheckerInterface $type)
    {
        // TODO: Implement setRequestTypeContextChecker() method.
// $type
    }

    /**
     * @return array
     */
    public function getParams()
    {
        // TODO: Implement getParams() method.
//
    }

    /**
     * @return array
     */
    public function postParams()
    {
        // TODO: Implement postParams() method.
//
    }

    /**
     * @return array
     */
    public function cookieParams()
    {
        // TODO: Implement cookieParams() method.
//
    }

    /**
     * @return array
     */
    public function serverParams()
    {
        // TODO: Implement serverParams() method.
//
    }

    /**
     * returns contents of $_REQUEST
     *
     * @return array
     */
    public function requestParams()
    {
        // TODO: Implement requestParams() method.
//
    }

    /**
     * @param string $key
     * @param string $value
     * @param bool   $override_ee
     * @return    void
     */
    public function setRequestParam($key, $value, $override_ee = false)
    {
        // TODO: Implement setRequestParam() method.
// $key,$value,$override_ee
    }

    /**
     * returns the value for a request param if the given key exists
     *
     * @param string $key
     * @param null   $default
     * @return mixed
     */
    public function getRequestParam($key, $default = null)
    {
        // TODO: Implement getRequestParam() method.
// $key,$default
    }

    /**
     * check if param exists
     *
     * @param string $key
     * @return bool
     */
    public function requestParamIsSet($key)
    {
        // TODO: Implement requestParamIsSet() method.
// $key
    }

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
    public function getMatch($pattern, $default = null)
    {
        // TODO: Implement getMatch() method.
// $pattern,$default
    }

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
    public function matches($pattern)
    {
        // TODO: Implement matches() method.
// $pattern
    }

    /**
     * remove param
     *
     * @param string $key
     * @param bool   $unset_from_global_too
     */
    public function unSetRequestParam($key, $unset_from_global_too = false)
    {
        // TODO: Implement unSetRequestParam() method.
// $key,$unset_from_global_too
    }

    /**
     * @return string
     */
    public function ipAddress()
    {
        // TODO: Implement ipAddress() method.
//
    }

    /**
     * @return string
     */
    public function requestUri()
    {
        // TODO: Implement requestUri() method.
//
    }

    /**
     * @return string
     */
    public function userAgent()
    {
        // TODO: Implement userAgent() method.
//
    }

    /**
     * @param string $user_agent
     */
    public function setUserAgent($user_agent = '')
    {
        // TODO: Implement setUserAgent() method.
// $user_agent
    }

    /**
     * @return bool
     */
    public function isBot()
    {
        // TODO: Implement isBot() method.
//
    }

    /**
     * @param bool $is_bot
     */
    public function setIsBot($is_bot)
    {
        // TODO: Implement setIsBot() method.
// $is_bot
    }

    /**
     * true if the current request involves some form of activation
     *
     * @return bool
     */
    public function isActivation()
    {
        // TODO: Implement isActivation() method.
//
    }

    /**
     * @param $is_activation
     * @return bool
     */
    public function setIsActivation($is_activation)
    {
        // TODO: Implement setIsActivation() method.
// $is_activation
    }

    /**
     * true if the current request is for the admin and is not being made via AJAX
     *
     * @return bool
     */
    public function isAdmin()
    {
        // TODO: Implement isAdmin() method.
//
    }

    /**
     * true if the current request is for the admin AND is being made via AJAX
     * and the ajax request contains the request parameter "ee_admin_ajax"
     *
     * @return bool
     */
    public function isAdminAjax()
    {
        // TODO: Implement isAdminAjax() method.
//
    }

    /**
     * true if the current request is being made via AJAX... any AJAX
     *
     * @return bool
     */
    public function isAjax()
    {
        // TODO: Implement isAjax() method.
//
    }

    /**
     * true if the current request is for the EE REST API
     *
     * @return bool
     */
    public function isApi()
    {
        // TODO: Implement isApi() method.
//
    }

    /**
     * true if the current request is from the command line
     *
     * @return bool
     */
    public function isCli()
    {
        // TODO: Implement isCli() method.
//
    }

    /**
     * true if the current request is for a WP_Cron
     *
     * @return bool
     */
    public function isCron()
    {
        // TODO: Implement isCron() method.
//
    }

    /**
     * true if the current request is for either the EE admin or EE frontend AND is being made via AJAX
     *
     * @return bool
     */
    public function isEeAjax()
    {
        // TODO: Implement isEeAjax() method.
//
    }

    /**
     * true if the current request is for a feed (ie: RSS)
     *
     * @return bool
     */
    public function isFeed()
    {
        // TODO: Implement isFeed() method.
//
    }

    /**
     * true if the current request is for the frontend and is not being made via AJAX
     *
     * @return bool
     */
    public function isFrontend()
    {
        // TODO: Implement isFrontend() method.
//
    }

    /**
     * @return bool
     */
    public function isFrontAjax()
    {
        // TODO: Implement isFrontAjax() method.
//
    }

    /**
     * @return bool
     */
    public function isIframe()
    {
        // TODO: Implement isIframe() method.
//
    }

    /**
     * true if the current request is being made via AJAX but is NOT for EE related logic
     *
     * @return bool
     */
    public function isOtherAjax()
    {
        // TODO: Implement isOtherAjax() method.
//
    }

    /**
     * @return string
     */
    public function slug()
    {
        // TODO: Implement slug() method.
//
    }
}