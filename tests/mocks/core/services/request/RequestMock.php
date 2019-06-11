<?php

namespace EventEspresso\tests\mocks\core\services\request;

use EventEspresso\core\domain\services\contexts\RequestTypeContextCheckerInterface;
use EventEspresso\core\interfaces\InterminableInterface;
use EventEspresso\core\interfaces\ReservedInstanceInterface;
use EventEspresso\core\services\request\Request;
use EventEspresso\core\services\request\RequestInterface;

/**
 * Class RequestMock
 * Description
 *
 * @package EventEspresso\tests\mocks\core\services\request
 * @author  Brent Christensen
 * @since   4.9.70.p
 */
class RequestMock extends Request implements InterminableInterface, RequestInterface, ReservedInstanceInterface
{

    /**
     * $_GET parameters
     *
     * @var array $get
     */
    public $get;

    /**
     * $_POST parameters
     *
     * @var array $post
     */
    public $post;

    /**
     * $_COOKIE parameters
     *
     * @var array $cookie
     */
    public $cookie;

    /**
     * $_SERVER parameters
     *
     * @var array $server
     */
    public $server;

    /**
     * $_FILES parameters
     *
     * @var array $files
     */
    private $files;

    /**
     * $_REQUEST parameters
     *
     * @var array $request
     */
    public $request;

    /**
     * @var RequestTypeContextCheckerInterface
     */
    public $request_type;

    /**
     * IP address for request
     *
     * @var string $ip_address
     */
    public $ip_address;

    /**
     * @var string $user_agent
     */
    public $user_agent;

    /**
     * true if current user appears to be some kind of bot
     *
     * @var bool $is_bot
     */
    public $is_bot;


    public function __construct(
        array $get,
        array $post,
        array $cookie,
        array $server,
        array $files = array(),
        $ip_address = '0.0.0.0'
    ) {
        $this->get = $get;
        $this->post = $post;
        $this->cookie = $cookie;
        $this->server = $server;
        $this->files = $files;
        $this->request = array_merge($this->get, $this->post);
        $this->ip_address = $this->visitorIp($ip_address);
        parent::__construct($get, $post, $cookie, $server);
    }


    /**
     * @param string $key
     * @param string $value
     * @param bool   $override_ee
     * @return    void
     */
    public function setRequestParam($key, $value, $override_ee = false)
    {
        $this->request[ $key ] = $value;
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
        return isset($this->request[ $key ]) ? $this->request[ $key ] : $default;
    }


    /**
     * check if param exists
     *
     * @param string $key
     * @return bool
     */
    public function requestParamIsSet($key)
    {
        return isset($this->request[ $key ]);
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
        // replace wildcard chars with regex chars
        $pattern = str_replace(
            array("\*", "\?"),
            array('.*', '.'),
            preg_quote($pattern, '/')
        );
        foreach ($this->request as $key => $request_param) {
            if (preg_match('/^' . $pattern . '$/is', $key)) {
                return $request_param;
            }
        }
        return null;
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
        return $this->getMatch($pattern) !== null;
    }


    /**
     * remove param
     *
     * @param string $key
     * @param bool   $unset_from_global_too
     */
    public function unSetRequestParam($key, $unset_from_global_too = false)
    {
        unset($this->request[ $key ]);
    }


    /**
     * @return string
     */
    public function visitorIp($visitor_ip = '0.0.0.0')
    {
        return $visitor_ip;
    }


    /**
     * @return string
     */
    public function requestUri()
    {
        return isset($this->server['REQUEST_URI']) ? $this->server['REQUEST_URI'] : '';
    }

    public function requestUriAfterSiteHomeUri()
    {
        // On single site, these functions are equivalent.
        return $this->requestUri();
    }


    /**
     * @param string $user_agent
     */
    public function setUserAgent($user_agent = '')
    {
        $this->user_agent = $user_agent;
    }


}