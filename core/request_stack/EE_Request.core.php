<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;

if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * class EE_Request
 *
 * @package         Event Espresso
 * @subpackage      /core/
 * @author          Brent Christensen
 *                  ------------------------------------------------------------------------
 */
class EE_Request
{

    /**
     * identifier for $_GET superglobal
     */
    const GET = 'GET';

    /**
     * identifier for $_POST superglobal
     */
    const POST = 'POST';

    /**
     * identifier for $_COOKIE superglobal
     */
    const COOKIE = 'COOKIE';

    /**
     * identifier for $_SERVER superglobal
     */
    const SERVER = 'SERVER';

    /**
     * identifier for $_FILES superglobal
     */
    const FILES = 'FILES';


    /**
     * request is for the site admin
     */
    const TYPE_ADMIN = 'admin_request';

    /**
     * request is for an API endpoint
     */
    const TYPE_API = 'api_request';

    /**
     * request is for a public facing endpoint on the frontend of the site
     */
    const TYPE_FRONTEND = 'frontend_request';

    /**
     * AJAX request originating from the site admin
     */
    const TYPE_ADMIN_AJAX = 'admin_ajax_request';

    /**
     * AJAX request originating from the frontend of the site
     */
    const TYPE_FRONT_AJAX = 'frontend_ajax_request';

    /**
     * plugin needs to be placed into maintenance mode for an activation or upgrade
     */
    const TYPE_MAINTENANCE = 'maintenance_mode';


    /**
     * @access private
     * @var    array $_get $_GET parameters
     */
    private $_get = array();

    /**
     * @access private
     * @var    array $_post $_POST parameters
     */
    private $_post = array();

    /**
     * @access private
     * @var    array $_cookie $_COOKIE parameters
     */
    private $_cookie = array();

    /**
     * @access private
     * @var    array $_params $_REQUEST parameters
     */
    private $_params = array();

    /**
     * @access private
     * @var    array $_params $_SERVER parameters
     */
    private $_server = array();

    /**
     * @access private
     * @var    array $_params $_FILES parameters
     */
    private $_files = array();

    /**
     * whether current request is via AJAX
     *
     * @var    boolean
     * @access public
     */
    public $ajax = false;

    /**
     * whether current request is via AJAX from the frontend of the site
     *
     * @var    boolean
     * @access public
     */
    public $front_ajax = false;

    /**
     * whether current request is from the site admin
     *
     * @var boolean $is_admin
     */
    private $is_admin = false;

    /**
     * IP address for request
     *
     * @var string $_ip_address
     */
    private $_ip_address = '';

    /**
     * the current request type as defined by one the TYPE_* constants above
     *
     * @var string $type
     */
    private $type = '';



    /**
     * class constructor
     *
     * @access    public
     * @param array $get
     * @param array $post
     * @param array $cookie
     * @param array $server
     * @param array $files
     */
    public function __construct(array $get, array $post, array $cookie, array $server = null, array $files = null)
    {
        // grab request vars
        $this->_get = (array)$get;
        $this->_post = (array)$post;
        $this->_cookie = (array)$cookie;
        $this->_params = array_merge($this->_get, $this->_post);
        $this->_server = ! empty($server) ? $server : $_SERVER;
        $this->_files = ! empty($files) ? $files : $_FILES;
        // AJAX ???
        $this->ajax = defined('DOING_AJAX') ? true : false;
        $this->front_ajax = $this->is_set('ee_front_ajax') && (int)$this->get('ee_front_ajax') === 1;
        $this->is_admin = is_admin();
        // grab user IP
        $this->_ip_address = $this->_visitor_ip();
    }



    /**
     * @param string $type
     * @throws InvalidDataTypeException
     */
    public function setRequestType($type = '')
    {
        if (
            ! empty($type)
            && ! in_array(
                $type,
                array(
                    EE_Request::TYPE_API,
                    EE_Request::TYPE_ADMIN,
                    EE_Request::TYPE_FRONTEND,
                    EE_Request::TYPE_FRONT_AJAX,
                    EE_Request::TYPE_MAINTENANCE,
                ),
                true
            )
        ) {
            throw new InvalidDataTypeException(
                $type,
                '$type',
                'one of the EE_Request class TYPE_* constants was expected.'
            );
        }
        if ( ! empty($type)) {
            $this->type = $type;
        } else if (strpos($this->uri(), EED_Core_Rest_Api::ee_api_namespace) !== false) {
            $this->type = EE_Request::TYPE_API;
        } else if ($this->ajax) {
            $this->type = EE_Request::TYPE_ADMIN_AJAX;
        } else if ($this->front_ajax) {
            $this->type = EE_Request::TYPE_FRONT_AJAX;
        } else if ($this->is_admin) {
            $this->type = EE_Request::TYPE_ADMIN;
        } else {
            $this->type = EE_Request::TYPE_FRONTEND;
        }
    }



    /**
     * @return string
     * @throws InvalidDataTypeException
     */
    public function type()
    {
        if (empty($this->type)) {
            $this->setRequestType();
        }
        return $this->type;
    }



    /**
     * @return boolean
     */
    public function isAdmin()
    {
        return $this->is_admin;
    }



    /**
     * @return mixed
     */
    public function isAjax()
    {
        return $this->ajax;
    }



    /**
     * @return array
     */
    public function get_params()
    {
        return $this->_get;
    }



    /**
     * @return array
     */
    public function post_params()
    {
        return $this->_post;
    }



    /**
     * @return array
     */
    public function cookie_params()
    {
        return $this->_cookie;
    }



    /**
     * returns contents of $_REQUEST
     *
     * @return array
     */
    public function params()
    {
        return $this->_params;
    }



    /**
     * @return array
     */
    public function server()
    {
        return $this->_server;
    }



    /**
     * @return array
     */
    public function files()
    {
        return $this->_files;
    }



    /**
     *    setter
     *
     * @access    public
     * @param      $key
     * @param      $value
     * @param bool $override_ee
     * @return    void
     */
    public function set($key, $value, $override_ee = false)
    {
        // don't allow "ee" to be overwritten unless explicitly instructed to do so
        if (
            $key !== 'ee'
            || ($key === 'ee' && empty($this->_params['ee']))
            || ($key === 'ee' && ! empty($this->_params['ee']) && $override_ee)
        ) {
            $this->_params[$key] = $value;
        }
    }



    /**
     *    getter
     *
     * @access    public
     * @param      $key
     * @param null $default
     * @return    mixed
     */
    public function get($key, $default = null)
    {
        return isset($this->_params[$key]) ? $this->_params[$key] : $default;
    }



    /**
     *    check if param exists
     *
     * @access    public
     * @param $key
     * @return    boolean
     */
    public function is_set($key)
    {
        return isset($this->_params[$key]) ? true : false;
    }



    /**
     *    remove param
     *
     * @access    public
     * @param      $key
     * @param bool $unset_from_global_too
     */
    public function un_set($key, $unset_from_global_too = false)
    {
        unset($this->_params[$key]);
        if ($unset_from_global_too) {
            unset($_REQUEST[$key]);
        }
    }



    /**
     * @return string
     */
    public function ip_address()
    {
        return $this->_ip_address;
    }



    /**
     * URI for the current request
     *
     * @param bool $with_query_string if true will return the full URI including the QUERY_STRING,
     *                                if false, will remove the QUERY_STRING
     * @return string
     */
    public function uri($with_query_string = false)
    {
        if (empty($this->_server['REQUEST_URI'])) {
            return '/';
        }
        $uri = filter_input(INPUT_SERVER, 'REQUEST_URI', FILTER_SANITIZE_URL);
        return $with_query_string ? $uri : strtok($uri, '?');
    }


    /**
     * _visitor_ip
     *    attempt to get IP address of current visitor from server
     * plz see: http://stackoverflow.com/a/2031935/1475279
     *
     * @access public
     * @return string
     */
    private function _visitor_ip()
    {
        $visitor_ip = '0.0.0.0';
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
            if (isset($this->_server[$key])) {
                foreach (array_map('trim', explode(',', $this->_server[$key])) as $ip) {
                    if ($ip === '127.0.0.1' || filter_var($ip, FILTER_VALIDATE_IP) !== false) {
                        $visitor_ip = $ip;
                    }
                }
            }
        }
        return $visitor_ip;
    }



}
// End of file EE_Request.core.php
// Location: /core/request_stack/EE_Request.core.php