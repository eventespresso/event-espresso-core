<?php

/**
 * EE_Extra_Join
 * This is the model object for EEM_Event_Message_Template
 *
 * @package           Event Espresso
 * @subpackage        models
 * @author            Darren Ethier
 * @since             4.3.0
 */
class EE_Extra_Join extends EE_Base_Class
{

    /**
     * @param array $props_n_values
     * @param null  $timezone
     * @return EE_Extra_Join|mixed
     */
    public static function new_instance($props_n_values = array(), $timezone = null)
    {
        $has_object = parent::_check_for_object($props_n_values, __CLASS__, $timezone);
        return $has_object ? $has_object : new self($props_n_values, false, $timezone);
    }


    /**
     * @param array $props_n_values
     * @param null  $timezone
     * @return EE_Extra_Join
     */
    public static function new_instance_from_db($props_n_values = array(), $timezone = null)
    {
        return new self($props_n_values, true, $timezone);
    }
}
