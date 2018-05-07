<?php

namespace EventEspresso\core\services\request;

/**
 * class EE_Request
 *
 * @package     Event Espresso
 * @subpackage  /core/
 * @author      Brent Christensen
 */
interface LegacyRequestInterface
{

    /**
     * @return array
     */
    public function get_params();


    /**
     * @return array
     */
    public function post_params();


    /**
     * @return array
     */
    public function cookie_params();


    /**
     * @return array
     */
    public function server_params();


    /**
     * returns contents of $_REQUEST
     *
     * @return array
     */
    public function params();


    /**
     * @param      $key
     * @param      $value
     * @param bool $override_ee
     * @return    void
     */
    public function set($key, $value, $override_ee = false);


    /**
     * returns   the value for a request param if the given key exists
     *
     * @param       $key
     * @param null  $default
     * @return mixed
     */
    public function get($key, $default = null);


    /**
     * check if param exists
     *
     * @param       $key
     * @return bool
     */
    public function is_set($key);


    /**
     * remove param
     *
     * @param      $key
     * @param bool $unset_from_global_too
     */
    public function un_set($key, $unset_from_global_too = false);


    /**
     * @return string
     */
    public function ip_address();


    /**
     * @return bool
     */
    public function isAdmin();


    /**
     * @return mixed
     */
    public function isAjax();


    /**
     * @return mixed
     */
    public function isFrontAjax();


    /**
     * @return mixed|string
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
