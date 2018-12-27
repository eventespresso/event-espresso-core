<?php

/**
 * EE_Ticket_Template class
 *
 * @package            Event Espresso
 * @subpackage         includes/classes/EE_Ticket_Template.class.php
 * @author             Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Ticket_Template extends EE_Base_Class
{

    /**
     * @param array  $props_n_values
     * @param string $timezone
     * @return EE_Ticket_Template|mixed
     */
    public static function new_instance($props_n_values = array(), $timezone = '')
    {
        $has_object = parent::_check_for_object($props_n_values, __CLASS__, $timezone);
        return $has_object ? $has_object : new self($props_n_values, false, $timezone);
    }


    /**
     * @param array  $props_n_values
     * @param string $timezone
     * @return EE_Ticket_Template
     */
    public static function new_instance_from_db($props_n_values = array(), $timezone = '')
    {
        return new self($props_n_values, true, $timezone);
    }
}
