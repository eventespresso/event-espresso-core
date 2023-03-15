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
    public function getNotices(): array;


    /**
     * @param string $string
     * @param bool   $append
     */
    public function addOutput(string $string, bool $append = true);


    /**
     * @param bool   $as_string
     * @param string $separator
     * @return array|string
     */
    public function getOutput(bool $as_string = true, string $separator = PHP_EOL);


    /**
     * @return boolean
     */
    public function requestTerminated(): bool;


    /**
     * @param bool|int|string|null $request_terminated
     */
    public function terminateRequest($request_terminated = true);


    /**
     * @return boolean
     */
    public function pluginDeactivated(): bool;


    /**
     * sets $deactivate_plugin to true
     */
    public function deactivatePlugin();


    /**
     * @return array
     * @since 5.0.0.p
     */
    public function requestHeaders(): array;


    /**
     * @param string $request_header
     * @return void
     * @since 5.0.0.p
     */
    public function setRequestHeader(string $request_header): void;
}
