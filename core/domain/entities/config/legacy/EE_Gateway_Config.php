<?php

/**
 * stores payment gateway info
 *
 * @deprecated
 */
class EE_Gateway_Config extends EE_Config_Base
{
    /**
     * Array with keys that are payment gateways slugs, and values are arrays
     * with any config info the gateway wants to store
     *
     * @var array
     */
    public $payment_settings = [];

    /**
     * Where keys are gateway slugs, and values are booleans indicating whether
     * the gateway is stored in the uploads directory
     *
     * @var array
     */
    public $active_gateways = ['Invoice' => false];


    /**
     * @deprecated
     */
    public function __construct()
    {
    }
}
