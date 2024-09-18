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
    protected bool $deactivate_plugin = false;

    protected array $notice            = [];

    /**
     * rendered output to be returned to WP
     */
    protected array $output             = [];

    protected array $request_headers    = [];

    protected bool $request_terminated = false;


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
    public function addOutput(string $string, bool $append = true)
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
    public function getOutput(bool $as_string = true, string $separator = PHP_EOL)
    {
        return $as_string
            ? implode($separator, $this->output)
            : $this->output;
    }


    /**
     * @return boolean
     */
    public function requestTerminated(): bool
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


    /**
     * @return array
     * @since 5.0.0.p
     */
    public function requestHeaders(): array
    {
        return $this->request_headers;
    }


    /**
     * @param string $request_header
     * @return void
     * @since 5.0.0.p
     */
    public function setRequestHeader(string $request_header): void
    {
        $this->request_headers[] = $request_header;
    }
}
