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
 */
class Response implements ResponseInterface, ReservedInstanceInterface
{
    /**
     * @var bool
     */
    protected $deactivate_plugin = false;

    /**
     * @var mixed[]
     */
    protected $notice            = [];

    /**
     * rendered output to be returned to WP
     * @var mixed[]
     */
    protected $output             = [];

    /**
     * @var mixed[]
     */
    protected $request_headers    = [];

    /**
     * @var bool
     */
    protected $request_terminated = false;


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
        return $as_string
            ? implode($separator, $this->output)
            : $this->output;
    }


    /**
     * @return boolean
     */
    public function requestTerminated()
    {
        return $this->request_terminated;
    }


    /**
     * @param bool|int|string|null $request_terminated
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


    /**
     * @return array
     * @since $VID:$
     */
    public function requestHeaders()
    {
        return $this->request_headers;
    }


    /**
     * @param string $request_header
     * @return void
     * @since $VID:$
     */
    public function setRequestHeader($request_header)
    {
        $this->request_headers[] = $request_header;
    }
}
