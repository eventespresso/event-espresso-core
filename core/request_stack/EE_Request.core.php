<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\interfaces\InterminableInterface;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\request\LegacyRequestInterface;
use EventEspresso\core\services\request\RequestInterface;

defined('EVENT_ESPRESSO_VERSION') || exit('No direct script access allowed');



/**
 * class EE_Request
 *
 * @deprecated 4.9.53
 * @package     Event Espresso
 * @subpackage  /core/
 * @author      Brent Christensen
 */
class EE_Request implements LegacyRequestInterface, InterminableInterface
{

    /**
     * @var RequestInterface $request
     */
    private $request;

    /**
     * whether current request is for the admin but NOT via AJAX
     *
     * @var boolean $admin
     */
    public $admin = false;

    /**
     * whether current request is via AJAX
     *
     * @var boolean $ajax
     */
    public $ajax = false;

    /**
     * whether current request is via AJAX from the frontend of the site
     *
     * @var boolean $front_ajax
     */
    public $front_ajax = false;


    /**
     * @deprecated 4.9.53
     * @param array $get
     * @param array $post
     * @param array $cookie
     * @param array $server
     */
    public function __construct(array $get, array $post, array $cookie, array $server = array())
    {
    }


    /**
     * @return RequestInterface
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     */
    private function request()
    {
        if($this->request instanceof RequestInterface){
            return $this->request;
        }
        $loader = LoaderFactory::getLoader();
        $this->request = $loader->getShared('EventEspresso\core\services\request\RequestInterface');
        return $this->request;
    }


    /**
     * @param RequestInterface $request
     */
    public function setRequest(RequestInterface $request)
    {
        $this->request = $request;
    }



    /**
     * @deprecated 4.9.53
     * @return array
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function get_params()
    {
        return $this->request()->getParams();
    }



    /**
     * @deprecated 4.9.53
     * @return array
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function post_params()
    {
        return $this->request()->postParams();
    }



    /**
     * @deprecated 4.9.53
     * @return array
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function cookie_params()
    {
        return $this->request()->cookieParams();
    }


    /**
     * @deprecated 4.9.53
     * @return array
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function server_params()
    {
        return $this->request()->serverParams();
    }



    /**
     * returns contents of $_REQUEST
     *
     * @deprecated 4.9.53
     * @return array
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function params()
    {
        return $this->request()->requestParams();
    }



    /**
     * @deprecated 4.9.53
     * @param      $key
     * @param      $value
     * @param bool $override_ee
     * @return void
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function set($key, $value, $override_ee = false)
    {
        $this->request()->setRequestParam($key, $value, $override_ee);
    }



    /**
     * returns   the value for a request param if the given key exists
     *
     * @deprecated 4.9.53
     * @param      $key
     * @param null $default
     * @return mixed
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function get($key, $default = null)
    {
        return $this->request()->getRequestParam($key, $default);
    }



    /**
     * check if param exists
     *
     * @deprecated 4.9.53
     * @param $key
     * @return bool
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function is_set($key)
    {
        return $this->request()->requestParamIsSet($key);
    }


    /**
     * check if a request parameter exists whose key that matches the supplied wildcard pattern
     * and return the value for the first match found
     * wildcards can be either of the following:
     *      ? to represent a single character of any type
     *      * to represent one or more characters of any type
     *
     * @param string $pattern
     * @param null|mixed $default
     * @return false|int
     */
    public function getMatch($pattern, $default = null)
    {
        return $this->request_parameter_drill_down($pattern, $default, 'match');
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
        return $this->request_parameter_drill_down($pattern, null, 'match') !== null;
    }


    /**
     * @see https://stackoverflow.com/questions/6163055/php-string-matching-with-wildcard
     * @param string $pattern           A string including wildcards to be converted to a regex pattern
     *                                  and used to search through the current request's parameter keys
     * @param array  $request_params    The array of request parameters to search through
     * @param mixed  $default           [optional] The value to be returned if no match is found.
     *                                  Default is null
     * @param string $return            [optional] Controls what kind of value is returned.
     *                                  Options are:
     *                                      'bool' will return true or false if match is found or not
     *                                      'key' will return the first key found that matches the supplied pattern
     *                                      'value' will return the value for the first request parameter
     *                                      whose key matches the supplied pattern
     *                                  Default is 'value'
     * @return boolean|string
     */
    private function match($pattern, array $request_params, $default = null, $return = 'value')
    {
        $return = in_array($return, array('bool', 'key', 'value'), true)
            ? $return
            : 'is_set';
        // replace wildcard chars with regex chars
        $pattern = str_replace(
            array("\*", "\?"),
            array('.*', '.'),
            preg_quote($pattern, '/')
        );
        foreach ($request_params as $key => $request_param) {
            if (preg_match('/^' . $pattern . '$/is', $key)) {
                // return value for request param
                if ($return === 'value'){
                    return $request_params[ $key ];
                }
                // or actual key or true just to indicate it was found
                return $return === 'key' ? $key : true;
            }
        }
        // match not found so return default value or false
        return $return === 'value' ? $default : false;
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
     * would return true if default parameters were set
     *
     * @param string $callback
     * @param        $key
     * @param null   $default
     * @param array  $request_params
     * @return bool|mixed|null
     */
    private function request_parameter_drill_down(
        $key,
        $default = null,
        $callback = 'is_set',
        array $request_params = array()
    ) {
        $callback = in_array($callback, array('is_set', 'get', 'match'), true)
            ? $callback
            : 'is_set';
        $request_params = ! empty($request_params)
            ? $request_params
            : $this->_params;
        // does incoming key represent an array like 'first[second][third]'  ?
        if (strpos($key, '[') !== false) {
            // turn it into an actual array
            $key  = str_replace(']', '', $key);
            $keys = explode('[', $key);
            $key  = array_shift($keys);
            if ($callback === 'match') {
                $real_key = $this->match($key, $request_params, $default, 'key');
                $key = $real_key ? $real_key : $key;
            }
            // check if top level key exists
            if (isset($request_params[ $key ])) {
                // build a new key to pass along like: 'second[third]'
                // or just 'second' depending on depth of keys
                $key_string = array_shift($keys);
                if (! empty($keys)) {
                    $key_string .= '[' . implode('][', $keys) . ']';
                }
                return $this->request_parameter_drill_down(
                    $key_string,
                    $default,
                    $callback,
                    $request_params[ $key ]
                );
            }
        }
        if ($callback === 'is_set') {
            return isset($request_params[$key]);
        }
        if ($callback === 'match') {
            return $this->match($key, $request_params, $default);
        }
        return isset($request_params[$key])
            ? $request_params[$key]
            : $default;
    }



    /**
     * remove param
     *
     * @deprecated 4.9.53
     * @param      $key
     * @param bool $unset_from_global_too
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function un_set($key, $unset_from_global_too = false)
    {
        $this->request()->unSetRequestParam($key, $unset_from_global_too);
    }



    /**
     * @deprecated 4.9.53
     * @return string
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function ip_address()
    {
        return $this->request()->ipAddress();
    }


    /**
     * @deprecated 4.9.53
     * @return bool
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function isAdmin()
    {
        return $this->request()->isAdmin();
    }


    /**
     * @deprecated 4.9.53
     * @return mixed
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function isAjax()
    {
        return $this->request()->isAjax();
    }


    /**
     * @deprecated 4.9.53
     * @return mixed
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function isFrontAjax()
    {
        return $this->request()->isFrontAjax();
    }


    /**
     * @deprecated 4.9.53
     * @return mixed|string
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function requestUri()
    {
        return $this->request()->requestUri();
    }


    /**
     * @deprecated 4.9.53
     * @return string
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function userAgent()
    {
        return $this->request()->userAgent();
    }


    /**
     * @deprecated 4.9.53
     * @param string $user_agent
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function setUserAgent($user_agent = '')
    {
        $this->request()->setUserAgent($user_agent);
    }


    /**
     * @deprecated 4.9.53
     * @return bool
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function isBot()
    {
        return $this->request()->isBot();
    }


    /**
     * @deprecated 4.9.53
     * @param bool $is_bot
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function setIsBot($is_bot)
    {
        $this->request()->setIsBot($is_bot);
    }



}
// End of file EE_Request.core.php
// Location: /core/request/EE_Request.core.php
