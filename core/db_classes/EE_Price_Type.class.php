<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;

/**
 * EE_Price_Type class
 *
 * @package               Event Espresso
 * @subpackage            includes/classes/EE_Price_Type.class.php
 * @author                Mike Nelson
 */
class EE_Price_Type extends EE_Soft_Delete_Base_Class
{
    /**
     * @param array $props_n_values
     * @return EE_Price_Type
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function new_instance($props_n_values = array())
    {
        $has_object = parent::_check_for_object($props_n_values, __CLASS__);
        return $has_object ? $has_object : new self($props_n_values);
    }


    /**
     * @param array $props_n_values
     * @return EE_Price_Type
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function new_instance_from_db($props_n_values = array())
    {
        return new self($props_n_values, true);
    }


    /**
     * Set Price Type Name
     *
     * @param string $PRT_name
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function set_name(string $PRT_name = '')
    {
        $this->set('PRT_name', $PRT_name);
    }


    /**
     * Set Price Type a percent
     *
     * @param bool $PRT_is_percent
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function set_is_percent($PRT_is_percent = false)
    {
        $this->set('PRT_is_percent', $PRT_is_percent);
    }


    /**
     * Set Price Type order
     *
     * @param int $PRT_order
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function set_order($PRT_order = 0)
    {
        $this->set('PRT_order', $PRT_order);
    }


    /**
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function move_to_trash()
    {
        $this->set('PRT_deleted', true);
    }


    /**
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function restore_from_trash()
    {
        $this->set('PRT_deleted', false);
    }


    /**
     * get Price Type Name
     *
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function name(): string
    {
        return (string) $this->get('PRT_name');
    }


    /**
     * get base Price Type
     *
     * @return int
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function base_type(): int
    {
        return (int) $this->get('PBT_ID');
    }


    /**
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function base_type_name(): string
    {
        return (string) $this->get_pretty('PBT_ID');
    }


    /**
     * get is Price Type a percent?
     *
     * @return bool
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function is_base_price(): bool
    {
        return $this->get('PBT_ID') === EEM_Price_Type::base_type_base_price;
    }


    /**
     * get is Price Type a percent?
     *
     * @return bool
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function is_percent(): bool
    {
        return (bool) $this->get('PRT_is_percent');
    }


    /**
     * @return bool
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function is_discount(): bool
    {
        return $this->get('PBT_ID') === EEM_Price_Type::base_type_discount;
    }


    /**
     * @return bool
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function is_surcharge(): bool
    {
        return $this->get('PBT_ID') === EEM_Price_Type::base_type_surcharge;
    }


    /**
     * @return bool
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function is_tax(): bool
    {
        return $this->get('PBT_ID') === EEM_Price_Type::base_type_tax;
    }


    /**
     * get the author of the price type.
     *
     * @return int
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @since 4.5.0
     */
    public function wp_user(): int
    {
        return (int) $this->get('PRT_wp_user');
    }


    /**
     * get Price Type order
     *
     * @return int
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function order(): int
    {
        return (int) $this->get('PRT_order');
    }


    /**
     * get  is Price Type deleted ?
     *
     * @return bool
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function deleted(): bool
    {
        return (bool) $this->get('PRT_deleted');
    }
}
