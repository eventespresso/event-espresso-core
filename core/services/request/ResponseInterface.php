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
     * @param $key
     * @param $value
     * @return    void
     */
    public function setNotice($key, $value);

    /**
     * @param $key
     * @return    mixed
     */
    public function getNotice($key);

    /**
     * @return    array
     */
    public function getNotices();

    /**
     * @param string $string
     * @param bool   $append
     */
    public function addOutput($string, $append = true);

    /**
     * @param bool   $as_string
     * @param string $separator
     * @return array|string
     */
    public function getOutput($as_string = true, $separator = PHP_EOL);

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
