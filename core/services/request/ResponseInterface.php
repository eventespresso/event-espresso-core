<?php

namespace EventEspresso\core\services\request;

/**
 * Interface ResponseInterface
 *
 * @package EventEspresso\core\services\request
 * @author  Brent Christensen
 * @since   4.9.53
 */
interface ResponseInterface
{

    /**
     *    set_notice
     *
     * @access    public
     * @param $key
     * @param $value
     * @return    void
     */
    public function setNotice($key, $value);

    /**
     *    get_notice
     *
     * @access    public
     * @param $key
     * @return    mixed
     */
    public function getNotice($key);

    /**
     *    get_notices
     *
     * @access    public
     * @return    array
     */
    public function getNotices();

    /**
     *    add_output
     *
     * @access    public
     * @param      $string
     * @param bool $append
     */
    public function addOutput($string, $append = true);

    /**
     *    get_output
     *
     * @access    public
     * @return    string
     */
    public function getOutput();

    /**
     * @return boolean
     */
    public function requestTerminated();

    /**
     * @param boolean $request_terminated
     */
    public function terminateRequest($request_terminated = true);

    /**
     * @return boolean
     */
    public function pluginDeactivated();

    /**
     * sets $deactivate_plugin to true
     */
    public function deactivatePlugin();
}
