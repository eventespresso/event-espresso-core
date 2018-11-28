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
 * @package     Event Espresso
 * @author         Mike Nelson
 * @since         4.9.72.p
 *
 */
class RestIncomingQueryParamContext
{
    /**
     * @var EEM_Base
     */
    private $model;
    /**
     * @var string
     */
    private $requested_version;
    /**
     * @var boolean
     */
    private $writing;

    /**
     * RestIncomingQueryParamContext constructor.
     * @param EEM_Base $model
     * @param string $requested_version
     * @param boolean $writing
     */
    public function __construct(EEM_Base $model, $requested_version, $writing)
    {
        $this->model = $model;
        $this->requested_version = (string) $requested_version;
        $this->writing = filter_var($writing, FILTER_VALIDATE_BOOLEAN);
    }

    /**
     * Gets the model currently being requested, eg class EEM_Event
     * @since 4.9.72.p
     * @return EEM_Base
     */
    public function getModel()
    {
        return $this->model;
    }

    /**
     * Gets the version being requested, eg 4.8.36
     * @since 4.9.72.p
     * @return string
     */
    public function getRequestedVersion()
    {
        return $this->requested_version;
    }

    /**
     * Gets if the current request is for a writing request or just simple read
     * @since 4.9.72.p
     * @return bool
     */
    public function isWriting()
    {
        return $this->writing;
    }
}
// End of file RestIncomingQueryParamContext.php
// Location: EventEspresso\core\libraries\rest_api/RestIncomingQueryParamContext.php
