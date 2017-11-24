<?php

namespace EventEspresso\core\services\request;

use EventEspresso\core\domain\services\contexts\RequestTypeContextCheckerInterface;
use EventEspresso\core\interfaces\InterminableInterface;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class Request
 * Representation of an incoming, server-side HTTP request
 *
 * @package EventEspresso\core\services\request
 * @author  Brent Christensen
 * @since   4.9.53
 */
class Request implements InterminableInterface, RequestInterface
{

    /**
     * $_GET parameters
     *
     * @var array $get
     */
    private $get;

    /**
     * $_POST parameters
     *
     * @var    array $post
     */
    private $post;

    /**
     * $_COOKIE parameters
     *
     * @var array $cookie
     */
    private $cookie;

    /**
     * $_SERVER parameters
     *
     * @var array $server
     */
    private $server;

    /**
     * $_REQUEST parameters
     *
     * @var array $request
     */
    private $request;

    /**
     * @var RequestTypeContextCheckerInterface
     */
    private $request_type;

    /**
     * IP address for request
     *
     * @var string $ip_address
     */
    private $ip_address;

    /**
     * @var string $user_agent
     */
    private $user_agent;

    /**
     * true if current user appears to be some kind of bot
     *
     * @var bool $is_bot
     */
    private $is_bot;



    /**
     * @param array                              $get
     * @param array                              $post
     * @param array                              $cookie
     * @param array                              $server
     */
    public function __construct(array $get, array $post, array $cookie, array $server)
    {
        // grab request vars
        $this->get        = $get;
        $this->post       = $post;
        $this->cookie     = $cookie;
        $this->server     = $server;
        $this->request    = array_merge($this->get, $this->post);
        $this->ip_address = $this->visitorIp();
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
        return $this->get;
    }



    /**
     * @return array
     */
    public function postParams()
    {
        return $this->post;
    }



    /**
     * @return array
     */
    public function cookieParams()
    {
        return $this->cookie;
    }


    /**
     * @return array
     */
    public function serverParams()
    {
        return $this->server;
    }



    /**
     * returns contents of $_REQUEST
     *
     * @return array
     */
    public function requestParams()
    {
        return $this->request;
    }



    /**
     * @param      $key
     * @param      $value
     * @param bool $override_ee
     * @return    void
     */
    public function setRequestParam($key, $value, $override_ee = false)
    {
        // don't allow "ee" to be overwritten unless explicitly instructed to do so
        if (
            $key !== 'ee'
            || ($key === 'ee' && empty($this->request['ee']))
            || ($key === 'ee' && ! empty($this->request['ee']) && $override_ee)
        ) {
            $this->request[ $key ] = $value;
        }
    }



    /**
     * returns   the value for a request param if the given key exists
     *
     * @param       $key
     * @param null  $default
     * @return mixed
     */
    public function getRequestParam($key, $default = null)
    {
        return $this->requestParameterDrillDown($key, $default, 'get');
    }



    /**
     * check if param exists
     *
     * @param       $key
     * @return bool
     */
    public function requestParamIsSet($key)
    {
        return $this->requestParameterDrillDown($key);
    }



    /**
     * the supplied key can be a simple string to represent a "top-level" request parameter
     * or represent a key for a request parameter that is nested deeper within the request parameter array,
     * by using square brackets to surround keys for deeper array elements.
     * For example :
     * if the supplied $key was: "first[second][third]"
     * then this will attempt to drill down into the request parameter array to find a value.
     * Given the following request parameters:
     *  array(
     *      'first' => array(
     *          'second' => array(
     *              'third' => 'has a value'
     *          )
     *      )
     *  )
     * would return true
     *
     * @param string $is_set_or_get
     * @param        $key
     * @param null   $default
     * @param array  $request_params
     * @return bool|mixed|null
     */
    private function requestParameterDrillDown(
        $key,
        $default = null,
        $is_set_or_get = 'is_set',
        array $request_params = array()
    ) {
        $request_params = ! empty($request_params)
            ? $request_params
            : $this->request;
        // does incoming key represent an array like 'first[second][third]'  ?
        if (strpos($key, '[') !== false) {
            // turn it into an actual array
            $key  = str_replace(']', '', $key);
            $keys = explode('[', $key);
            $key  = array_shift($keys);
            // check if top level key exists
            if (isset($request_params[ $key ])) {
                // build a new key to pass along like: 'second[third]'
                // or just 'second' depending on depth of keys
                $key_string = array_shift($keys);
                if (! empty($keys)) {
                    $key_string .= '[' . implode('][', $keys) . ']';
                }
                return $this->requestParameterDrillDown(
                    $key_string,
                    $default,
                    $is_set_or_get,
                    $request_params[ $key ]
                );
            }
        }
        if ($is_set_or_get === 'is_set') {
            return isset($request_params[ $key ]);
        }
        return isset($request_params[ $key ])
            ? $request_params[ $key ]
            : $default;
    }



    /**
     * remove param
     *
     * @param      $key
     * @param bool $unset_from_global_too
     */
    public function unSetRequestParam($key, $unset_from_global_too = false)
    {
        unset($this->request[ $key ]);
        if ($unset_from_global_too) {
            unset($_REQUEST[ $key ]);
        }
    }



    /**
     * @return string
     */
    public function ipAddress()
    {
        return $this->ip_address;
    }


    /**
     * _visitor_ip
     *    attempt to get IP address of current visitor from server
     * plz see: http://stackoverflow.com/a/2031935/1475279
     *
     * @access public
     * @return string
     */
    private function visitorIp()
    {
        $visitor_ip  = '0.0.0.0';
        $server_keys = array(
            'HTTP_CLIENT_IP',
            'HTTP_X_FORWARDED_FOR',
            'HTTP_X_FORWARDED',
            'HTTP_X_CLUSTER_CLIENT_IP',
            'HTTP_FORWARDED_FOR',
            'HTTP_FORWARDED',
            'REMOTE_ADDR',
        );
        foreach ($server_keys as $key) {
            if (isset($this->server[ $key ])) {
                foreach (array_map('trim', explode(',', $this->server[ $key ])) as $ip) {
                    if ($ip === '127.0.0.1' || filter_var($ip, FILTER_VALIDATE_IP) !== false) {
                        $visitor_ip = $ip;
                    }
                }
            }
        }
        return $visitor_ip;
    }


    /**
     * @return string
     */
    public function requestUri()
    {
        $request_uri = filter_input(
            INPUT_SERVER,
            'REQUEST_URI',
            FILTER_SANITIZE_URL,
            FILTER_NULL_ON_FAILURE
        );
        if (empty($request_uri)) {
            // fallback sanitization if the above fails
            $request_uri = wp_sanitize_redirect($this->server['REQUEST_URI']);
        }
        return $request_uri;
    }


    /**
     * @return string
     */
    public function userAgent()
    {
        return $this->user_agent;
    }


    /**
     * @param string $user_agent
     */
    public function setUserAgent($user_agent = '')
    {
        if ($user_agent === '' || ! is_string($user_agent)) {
            $user_agent = isset($_SERVER['HTTP_USER_AGENT']) ? esc_attr($_SERVER['HTTP_USER_AGENT']) : '';
        }
        $this->user_agent = $user_agent;
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
     * @return mixed
     */
    public function isAjax()
    {
        return $this->request_type->isAjax();
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
     * @return mixed
     */
    public function isFeed()
    {
        return $this->request_type->isFeed();
    }


    /**
     * @return mixed
     */
    public function isFrontend()
    {
        return $this->request_type->isFrontend();
    }


    /**
     * @return mixed
     */
    public function isFrontAjax()
    {
        return $this->request_type->isFrontAjax();
    }



    /**
     * @return mixed
     */
    public function isIframe()
    {
        return $this->request_type->isIframe();
    }


    /**
     * @return string
     */
    public function slug()
    {
        return $this->request_type->slug();
    }


}
// Location: Request.php
