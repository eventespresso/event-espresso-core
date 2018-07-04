<?php

/**
 * EE_Mock
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 */
class EE_Mock extends EE_Base_Class
{
    /**
     * @param array $props_n_values
     * @return EE_Mock|mixed
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     */
    public static function new_instance($props_n_values = array())
    {
        $classname = __CLASS__;
        $has_object = parent::_check_for_object($props_n_values, $classname);
        return $has_object ? $has_object : new self($props_n_values);
    }


    /**
     * @param array $props_n_values
     * @return EE_Mock
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
     */
    public static function new_instance_from_db($props_n_values = array())
    {
        return new self($props_n_values, true);
    }

    //extra helper method to return the internally cached DateTime object rather than what the public method exposes
    public function internalDateTimeObject($field_name)
    {
        return isset($this->_fields[$field_name])
            ? $this->_fields[$field_name]
            : null;
    }
}
