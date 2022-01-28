<?php

namespace EventEspresso\tests\mocks\core\services\request;

use EventEspresso\core\domain\services\contexts\RequestTypeContextCheckerInterface;
use EventEspresso\core\services\request\RequestInterface;

/**
 * Class RequestMockBlank
 * implements empty stubs for the entire RequestInterface public API
 * used for exerting full control over methods when testing
 *
 * @author  Brent Christensen
 * @package EventEspresso\tests\mocks\core\services\request
 * @since   4.10.20.p
 */
class RequestMockBlank implements RequestInterface
{

    public function setRequestTypeContextChecker(RequestTypeContextCheckerInterface $type)
    {
    }


    public function getParams()
    {
    }


    public function postParams()
    {
    }


    public function cookieParams()
    {
    }


    public function serverParams()
    {
    }


    public function getServerParam($key, $default = null)
    {
    }


    public function setServerParam($key, $value)
    {
    }


    public function serverParamIsSet($key)
    {
    }


    public function filesParams()
    {
    }


    public function requestParams()
    {
    }


    public function setRequestParam($key, $value, $override_ee = false)
    {
    }


    public function getRequestParam($key, $default = null, $type = 'string', $is_array = false, $delimiter = '')
    {
    }


    public function requestParamIsSet($key)
    {
    }


    public function getMatch($pattern, $default = null, $type = 'string', $is_array = false, $delimiter = '')
    {
    }


    public function matches($pattern)
    {
    }


    public function unSetRequestParam($key, $unset_from_global_too = false)
    {
    }


    public function unSetRequestParams(array $keys, $unset_from_global_too = false)
    {
    }


    public function ipAddress()
    {
    }


    public function requestUri($relativeToWpRoot = false)
    {
    }


    public function userAgent()
    {
    }


    public function setUserAgent($user_agent = '')
    {
    }


    public function isBot()
    {
    }


    public function setIsBot($is_bot)
    {
    }


    public function isActivation()
    {
    }


    public function setIsActivation($is_activation)
    {
    }


    public function isAdmin()
    {
    }


    public function isAdminAjax()
    {
    }


    public function isAjax()
    {
    }


    public function isApi()
    {
    }


    public function isCli()
    {
    }


    public function isCron()
    {
    }


    public function isEeAjax()
    {
    }


    public function isFeed()
    {
    }


    public function isFrontend()
    {
    }


    public function isFrontAjax()
    {
    }


    public function isIframe()
    {
    }


    public function isOtherAjax()
    {
    }


    public function isWordPressApi()
    {
    }


    public function isWordPressHeartbeat()
    {
    }


    public function isWordPressScrape()
    {
    }


    public function slug()
    {
    }
}