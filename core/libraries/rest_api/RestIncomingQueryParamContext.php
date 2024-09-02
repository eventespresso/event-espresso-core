<?php

namespace EventEspresso\core\libraries\rest_api;

use EEM_Base;

/**
 * Class RestIncomingQueryParamContext
 *
 * DTO describing the context in which query parameters coming from the REST API (ie, querystring) are to be
 * interpreted. This is info that can be determined before even looking at what the query parameters are.
 * This is convenient when interpreting REST API query params and generating model query params.
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          4.9.72.p
 *
 */
class RestIncomingQueryParamContext
{
    private EEM_Base $model;

    private string $requested_version;

    private bool $writing;


    /**
     * RestIncomingQueryParamContext constructor.
     *
     * @param EEM_Base        $model
     * @param string          $requested_version
     * @param bool|int|string $writing
     */
    public function __construct(EEM_Base $model, string $requested_version, $writing)
    {
        $this->model             = $model;
        $this->requested_version = $requested_version;
        $this->writing           = filter_var($writing, FILTER_VALIDATE_BOOLEAN);
    }


    /**
     * Gets the model currently being requested, eg class EEM_Event
     *
     * @return EEM_Base
     * @since 4.9.72.p
     */
    public function getModel(): EEM_Base
    {
        return $this->model;
    }


    /**
     * Gets the version being requested, eg 4.8.36
     *
     * @return string
     * @since 4.9.72.p
     */
    public function getRequestedVersion(): string
    {
        return $this->requested_version;
    }


    /**
     * Gets if the current request is for a writing request or just simple read
     *
     * @return bool
     * @since 4.9.72.p
     */
    public function isWriting(): bool
    {
        return $this->writing;
    }
}
// End of file RestIncomingQueryParamContext.php
// Location: EventEspresso\core\libraries\rest_api/RestIncomingQueryParamContext.php
