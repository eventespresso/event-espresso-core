<?php

namespace EventEspresso\core\services\request;

use EventEspresso\core\domain\services\contexts\RequestTypeContextCheckerInterface;
use EventEspresso\core\interfaces\InterminableInterface;
use EventEspresso\core\interfaces\ReservedInstanceInterface;

/**
 * Class Request
 * Representation of an incoming, server-side HTTP request
 *
 * @package EventEspresso\core\services\request
 * @author  Brent Christensen
 * @since   4.9.53
 */
class Request implements InterminableInterface, RequestInterface, ReservedInstanceInterface
{
    /**
     * $_COOKIE parameters
     *
     * @var array|null
     */
    protected ?array $cookies;

    /**
     * $_FILES parameters
     *
     * @var array|null
     */
    protected ?array $files;

    /**
     * true if current user appears to be some kind of bot
     *
     * @var bool
     */
    protected bool $is_bot;

    protected RequestParams $request_params;

    protected ?RequestTypeContextCheckerInterface $request_type = null;

    protected ServerParams $server_params;


    public function __construct(
        RequestParams $request_params,
        ServerParams $server_params,
        array $cookies = [],
        array $files = []
    ) {
        $this->cookies        = ! empty($cookies)
            ? $cookies
            : filter_input_array(INPUT_COOKIE, FILTER_UNSAFE_RAW);
        $this->files          = ! empty($files) ? $files : $_FILES;
        $this->request_params = $request_params;
        $this->server_params  = $server_params;
    }


    /**
     * @param RequestTypeContextCheckerInterface $type
     */
    public function setRequestTypeContextChecker(RequestTypeContextCheckerInterface $type)
    {
        $this->request_type = $type;
    }


    /**
     * @return array
     */
    public function getParams()
    {
        return $this->request_params->getParams();
    }


    /**
     * @return array
     */
    public function postParams()
    {
        return $this->request_params->postParams();
    }


    /**
     * @return array
     */
    public function cookieParams()
    {
        return $this->cookies;
    }


    /**
     * @return array
     */
    public function serverParams()
    {
        return $this->server_params->getAllServerParams();
    }


    /**
     * @param string     $key
     * @param mixed|null $default
     * @return array|int|float|string
     */
    public function getServerParam($key, $default = null)
    {
        return $this->server_params->getServerParam($key, $default);
    }


    /**
     * @param string                 $key
     * @param array|int|float|string $value
     * @param bool                   $set_global_too
     * @return void
     */
    public function setServerParam(string $key, $value, bool $set_global_too = false)
    {
        $this->server_params->setServerParam($key, $value, $set_global_too);
    }


    /**
     * @param string $key
     * @return bool
     */
    public function serverParamIsSet($key)
    {
        return $this->server_params->serverParamIsSet($key);
    }


    /**
     * @return array
     */
    public function filesParams()
    {
        return $this->files;
    }


    /**
     * returns sanitized contents of $_REQUEST
     *
     * @return array
     */
    public function requestParams()
    {
        return $this->request_params->requestParams();
    }


    /**
     * @param string     $key
     * @param mixed|null $value
     * @param bool       $override_ee
     * @return void
     */
    public function setRequestParam($key, $value, $override_ee = false)
    {
        $this->request_params->setRequestParam($key, $value, $override_ee);
    }


    /**
     * merges the incoming array of parameters into the existing request parameters
     *
     * @param array $request_params
     * @return void
     * @since   4.10.24.p
     */
    public function mergeRequestParams(array $request_params)
    {
        $this->request_params->mergeRequestParams($request_params);
    }


    /**
     * returns sanitized value for a request param if the given key exists
     *
     * @param string     $key
     * @param mixed|null $default
     * @param string     $type      the expected data type for the parameter's value, ie: string, int, bool, etc
     * @param bool       $is_array  if true, then parameter value will be treated as an array of $type
     * @param string     $delimiter for CSV type strings that should be returned as an array
     * @return array|bool|float|int|string
     */
    public function getRequestParam($key, $default = null, $type = DataType::STRING, $is_array = false, $delimiter = '')
    {
        return $this->request_params->getRequestParam($key, $default, $type, $is_array, $delimiter);
    }


    /**
     * check if param exists
     *
     * @param string $key
     * @return bool
     */
    public function requestParamIsSet($key)
    {
        return $this->request_params->requestParamIsSet($key);
    }


    /**
     * check if a request parameter exists whose key that matches the supplied wildcard pattern
     * and return the sanitized value for the first match found
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
    public function getMatch($pattern, $default = null, $type = DataType::STRING, $is_array = false, $delimiter = '')
    {
        return $this->request_params->getMatch($pattern, $default, $type, $is_array, $delimiter);
    }


    /**
     * check if a request parameter exists whose key matches the supplied wildcard pattern
     * wildcards can be either of the following:
     *      ? to represent a single character of any type
     *      * to represent one or more characters of any type
     * returns true if a match is found or false if not
     *
     * @param string $pattern
     * @return bool
     */
    public function matches($pattern)
    {
        return $this->request_params->matches($pattern);
    }


    /**
     * remove param
     *
     * @param      $key
     * @param bool $unset_from_global_too
     */
    public function unSetRequestParam($key, $unset_from_global_too = false)
    {
        $this->request_params->unSetRequestParam($key, $unset_from_global_too);
    }


    /**
     * remove params
     *
     * @param array $keys
     * @param bool  $unset_from_global_too
     */
    public function unSetRequestParams(array $keys, $unset_from_global_too = false)
    {
        $this->request_params->unSetRequestParams($keys, $unset_from_global_too);
    }


    /**
     * @param string $key
     * @param bool   $unset_from_global_too
     * @return void
     */
    public function unSetServerParam(string $key, bool $unset_from_global_too = false)
    {
        $this->server_params->unSetServerParam($key, $unset_from_global_too);
    }


    /**
     * @return string
     */
    public function ipAddress()
    {
        return $this->server_params->ipAddress();
    }


    /**
     * Gets the request's literal URI. Related to `requestUriAfterSiteHomeUri`, see its description for a comparison.
     *
     * @param boolean $relativeToWpRoot    If home_url() is "http://mysite.com/wp/", and a request comes to
     *                                     "http://mysite.com/wp/wp-json", setting $relativeToWpRoot=true will return
     *                                     "/wp-json", whereas $relativeToWpRoot=false will return "/wp/wp-json/".
     * @param boolean $remove_query_params whether to return the uri with all query params removed.
     * @return string
     */
    public function requestUri($relativeToWpRoot = false, $remove_query_params = false)
    {
        return $this->server_params->requestUri($relativeToWpRoot);
    }


    /**
     * @return string
     */
    public function userAgent()
    {
        return $this->server_params->userAgent();
    }


    /**
     * @param string $user_agent
     */
    public function setUserAgent($user_agent = '')
    {
        $this->server_params->setUserAgent($user_agent);
    }


    /**
     * @return bool
     */
    public function isBot()
    {
        return $this->is_bot;
    }


    /**
     * @param bool $is_bot
     */
    public function setIsBot($is_bot)
    {
        $this->is_bot = filter_var($is_bot, FILTER_VALIDATE_BOOLEAN);
    }


    /**
     * @return bool
     */
    public function isActivation()
    {
        return $this->request_type->isActivation();
    }


    /**
     * @param $is_activation
     * @return bool
     */
    public function setIsActivation($is_activation)
    {
        return $this->request_type->setIsActivation($is_activation);
    }


    /**
     * @return bool
     */
    public function isAdmin()
    {
        return $this->request_type->isAdmin();
    }


    /**
     * @return bool
     */
    public function isAdminAjax()
    {
        return $this->request_type->isAdminAjax();
    }


    /**
     * @return bool
     */
    public function isAjax()
    {
        return $this->request_type->isAjax();
    }


    /**
     * @return bool
     */
    public function isEeAjax()
    {
        return $this->request_type->isEeAjax();
    }


    /**
     * @return bool
     */
    public function isOtherAjax()
    {
        return $this->request_type->isOtherAjax();
    }


    /**
     * @return bool
     */
    public function isApi()
    {
        return $this->request_type->isApi();
    }


    /**
     * @return bool
     */
    public function isCli()
    {
        return $this->request_type->isCli();
    }


    /**
     * @return bool
     */
    public function isCron()
    {
        return $this->request_type->isCron();
    }


    /**
     * @return bool
     */
    public function isFeed()
    {
        return $this->request_type->isFeed();
    }


    /**
     * @return bool
     */
    public function isFrontend()
    {
        return $this->request_type->isFrontend();
    }


    /**
     * @return bool
     */
    public function isFrontAjax()
    {
        return $this->request_type->isFrontAjax();
    }


    /**
     * @return bool
     */
    public function isGQL()
    {
        return $this->request_type->isGQL();
    }


    /**
     * @return bool
     */
    public function isIframe()
    {
        return $this->request_type->isIframe();
    }


    /**
     * @return bool
     */
    public function isUnitTesting()
    {
        return $this->request_type->isUnitTesting();
    }


    /**
     * @return bool
     */
    public function isWordPressApi()
    {
        return $this->request_type->isWordPressApi();
    }


    /**
     * @return bool
     */
    public function isWordPressHeartbeat()
    {
        return $this->request_type->isWordPressHeartbeat();
    }


    /**
     * @return bool
     */
    public function isWordPressScrape()
    {
        return $this->request_type->isWordPressScrape();
    }


    /**
     * @return string
     */
    public function slug()
    {
        return $this->request_type->slug();
    }


    /**
     * returns the path portion of the current request URI with both the WP Root (home_url()) and query params removed
     *
     * @return string
     * @since   5.0.0.p
     */
    public function requestPath()
    {
        return $this->requestUri(true, true);
    }


    /**
     * returns true if the last segment of the current request path (without params) matches the provided string
     *
     * @param string $uri_segment
     * @return bool
     * @since   5.0.0.p
     */
    public function currentPageIs($uri_segment)
    {
        $request_path = $this->requestPath();
        $current_page = explode('/', $request_path);
        return end($current_page) === $uri_segment;
    }


    /**
     * @return RequestTypeContextCheckerInterface
     */
    public function getRequestType(): RequestTypeContextCheckerInterface
    {
        return $this->request_type;
    }
}
