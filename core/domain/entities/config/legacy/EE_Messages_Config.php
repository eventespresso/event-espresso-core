<?php

/**
 * Holds all global messages configuration options.
 *
 * @package    EventEspresso/core/
 * @subpackage config
 * @author     Darren Ethier
 * @since      4.27.rc
 */
class EE_Messages_Config extends EE_Config_Base
{
    /**
     * This is an integer representing the deletion threshold in months for when old messages will get deleted.
     * A value of 0 represents never deleting.  Default is 0.
     *
     * @var integer
     */
    public $delete_threshold = 0;


    public function __construct()
    {
    }
}
