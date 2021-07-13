<?php

/**
 * EE_Mock
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 *
 */
class EE_New_Addon_Thing extends EE_Base_Class
{
    /**
     *
     * @param array $props_n_values
     * @return EE_New_Addon_Thing
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function new_instance(array $props_n_values = [])
    {
        $classname  = __CLASS__;
        $has_object = parent::_check_for_object($props_n_values, $classname);
        return $has_object ? $has_object : new self($props_n_values);
    }


    /**
     * @param array $props_n_values
     * @return EE_New_Addon_Thing
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function new_instance_from_db(array $props_n_values = [])
    {
        return new self($props_n_values, true);
    }
}
