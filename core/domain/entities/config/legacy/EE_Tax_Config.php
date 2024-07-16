<?php

/**
 * Stores any options pertaining to taxes
 *
 * @since       4.9.13
 * @package     Event Espresso
 * @subpackage  config
 */
class EE_Tax_Config extends EE_Config_Base
{
    /**
     * flag to indicate whether to display ticket prices with the taxes included
     *
     * @var boolean $prices_displayed_including_taxes
     */
    public $prices_displayed_including_taxes = true;


    public function __construct()
    {
    }
}
