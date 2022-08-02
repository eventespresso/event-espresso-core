<?php

namespace EventEspresso\core\services\request;

use EventEspresso\core\interfaces\InterminableInterface;
use EventEspresso\core\interfaces\ReservedInstanceInterface;

/**
 * class Response
 * Passes output, notices, and request termination status between Middleware classes
 *
 * @package         Event Espresso
 * @subpackage      /core/
 * @author          Brent Christensen
 */
class Response implements InterminableInterface, ResponseInterface, ReservedInstanceInterface
{
    /**
     * @var array $notice
     */
    protected $notice = [];

    /**
     * rendered output to be returned to WP
     *
     * @var array
     */
    protected $output = [];

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
        return $this->notice[ $key ] ?? null;
    }


    /**
     * @return array
     */
    public function getNotices(): array
    {
        return $this->notice;
    }


    /**
     * @param string $string
     * @param bool   $append
     */
    public function addOutput($string, $append = true)
    {
        if ($append) {
            $this->output[] = $string;
            return;
        }
        array_unshift($this->output, $string);
    }


    /**
     * @param bool   $as_string
     * @param string $separator
     * @return array|string
     */
    public function getOutput($as_string = true, $separator = PHP_EOL)
    {
        return $as_string ? implode($separator, $this->output) : $this->output ;
    }


    /**
     * @return bool
     */
    public function requestTerminated(): bool
    {
        return $this->request_terminated;
    }


    /**
     * @param bool $request_terminated
     */
    public function terminateRequest($request_terminated = true)
    {
        $this->request_terminated = filter_var($request_terminated, FILTER_VALIDATE_BOOLEAN);
    }


    /**
     * @return bool
     */
    public function pluginDeactivated(): bool
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
