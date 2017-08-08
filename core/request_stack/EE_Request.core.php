<?php
use EventEspresso\core\interfaces\InterminableInterface;

defined('EVENT_ESPRESSO_VERSION') || exit('No direct script access allowed');



/**
 * class EE_Request
 *
 * @package     Event Espresso
 * @subpackage  /core/
 * @author      Brent Christensen
 */
class EE_Request implements InterminableInterface
{

    /**
     * $_GET parameters
     *
     * @var array $_get
     */
    private $_get;

    /**
     * $_POST parameters
     *
     * @var    array $_post
     */
    private $_post;

    /**
     * $_COOKIE parameters
     *
     * @var array $_cookie
     */
    private $_cookie;

    /**
     * $_REQUEST parameters
     *
     * @var array $_params
     */
    private $_params;

    /**
     * whether current request is via AJAX
     *
     * @access public
     */
    public $ajax = false;

    /**
     * whether current request is via AJAX from the frontend of the site
     *
     * @access public
     */
    public $front_ajax = false;

    /**
     * IP address for request
     *
     * @var string $_ip_address
     */
    private $_ip_address;



    /**
     * class constructor
     *
     * @access    public
     * @param array $get
     * @param array $post
     * @param array $cookie
     */
    public function __construct(array $get, array $post, array $cookie)
    {
        // grab request vars
        $this->_get = (array)$get;
        $this->_post = (array)$post;
        $this->_cookie = (array)$cookie;
        $this->_params = array_merge($this->_get, $this->_post);
        // AJAX ???
        $this->ajax = defined('DOING_AJAX') ? true : false;
        $this->front_ajax = $this->is_set('ee_front_ajax') && (int)$this->get('ee_front_ajax') === 1;
        // grab user IP
        $this->_ip_address = $this->_visitor_ip();
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
     * returns   the value for a request param if the given key exists
     *
     * @param       $key
     * @param null  $default
     * @return mixed
     */
    public function get($key, $default = null)
    {
        return $this->request_parameter_drill_down($key, $default, 'get');
    }



    /**
     * check if param exists
     * @param       $key
     * @return bool
     */
    public function is_set($key)
    {
        return $this->request_parameter_drill_down($key);
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
    private function request_parameter_drill_down(
        $key,
        $default = null,
        $is_set_or_get = 'is_set',
        array $request_params = array()
    ) {
        $request_params = ! empty($request_params)
            ? $request_params
            : $this->_params;
        // does incoming key represent an array like 'first[second][third]'  ?
        if (strpos($key, '[') !== false) {
            // turn it into an actual array
            $key = str_replace(']', '', $key);
            $keys = explode('[', $key);
            $key = array_shift($keys);
            // check if top level key exists
            if (isset($request_params[$key])) {
                // build a new key to pass along like: 'second[third]'
                // or just 'second' depending on depth of keys
                $key_string = array_shift($keys);
                if (! empty($keys)) {
                    $key_string .= '[' . implode('][', $keys) . ']';
                }
                return $this->request_parameter_drill_down(
                    $key_string,
                    $default,
                    $is_set_or_get,
                    $request_params[$key]
                );
            }
        }
        if ($is_set_or_get === 'is_set') {
            return isset($request_params[$key]);
        }
        return isset($request_params[$key])
            ? $request_params[$key]
            : $default;
    }



    /**
     * remove param
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
            if (isset($_SERVER[$key])) {
                foreach (array_map('trim', explode(',', $_SERVER[$key])) as $ip) {
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
