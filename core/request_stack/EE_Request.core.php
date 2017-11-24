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
