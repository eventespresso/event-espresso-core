<?php

namespace EventEspresso\core\services\request;

use EventEspresso\core\interfaces\ReservedInstanceInterface;

/**
 * class Response
 * Passes output, notices, and request termination status between Middleware classes
 *
 * @package         Event Espresso
 * @subpackage      /core/
 * @author          Brent Christensen
 * ------------------------------------------------------------------------
 */
class Response implements ResponseInterface, ReservedInstanceInterface
{

    /**
     * @var array $notice
     */
    protected $notice = array();

    /**
     * rendered output to be returned to WP
     *
     * @var string $output
     */
    protected $output = '';

    /**
     * @var bool
     */
    protected $request_terminated = false;

    /**
     * @var bool $deactivate_plugin
     */
    protected $deactivate_plugin = false;


    /**
     * EE_Response constructor.
     */
    public function __construct()
    {
        $this->terminateRequest(false);
    }


    /**
     * @param $key
     * @param $value
     * @return    void
     */
    public function setNotice($key, $value)
    {
        $this->notice[ $key ] = $value;
    }


    /**
     * @param $key
     * @return    mixed
     */
    public function getNotice($key)
    {
        return isset($this->notice[ $key ]) ? $this->notice[ $key ] : null;
    }


    /**
     * @return array
     */
    public function getNotices()
    {
        return $this->notice;
    }


    /**
     * @param string $string
     * @param bool   $append
     */
    public function addOutput($string, $append = true)
    {
        $this->output = $append ? $this->output . $string : $string . $this->output;
    }


    /**
     * @return string
     */
    public function getOutput()
    {
        return $this->output;
    }


    /**
     * @return boolean
     */
    public function requestTerminated()
    {
        return $this->request_terminated;
    }


    /**
     * @param boolean $request_terminated
     */
    public function terminateRequest($request_terminated = true)
    {
        $this->request_terminated = filter_var($request_terminated, FILTER_VALIDATE_BOOLEAN);
    }


    /**
     * @return boolean
     */
    public function pluginDeactivated()
    {
        return $this->deactivate_plugin;
    }


    /**
     * sets $deactivate_plugin to true
     */
    public function deactivatePlugin()
    {
        $this->deactivate_plugin = true;
    }
}
