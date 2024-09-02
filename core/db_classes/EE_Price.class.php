<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;

/**
 * EE_Price class
 *
 * @package            Event Espresso
 * @subpackage         includes/classes/EE_Price.class.php
 * @author             Mike Nelson
 *
 * @method EE_Price_Type|null get_first_related(string $relation_name, array $query_params = []);
 */
class EE_Price extends EE_Soft_Delete_Base_Class
{
    /**
     * @param array  $props_n_values          incoming values
     * @param string $timezone                incoming timezone (if not set the timezone set for the website will be
     *                                        used.)
     * @param array  $date_formats            incoming date_formats in an array where the first value is the
     *                                        date_format and the second value is the time format
     * @return EE_Price
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function new_instance($props_n_values = [], $timezone = '', $date_formats = [])
    {
        $has_object = parent::_check_for_object($props_n_values, __CLASS__, $timezone, $date_formats);
        return $has_object ? $has_object : new self($props_n_values, false, $timezone, $date_formats);
    }


    /**
     * @param array  $props_n_values  incoming values from the database
     * @param string $timezone        incoming timezone as set by the model.  If not set the timezone for
     *                                the website will be used.
     * @return EE_Price
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function new_instance_from_db($props_n_values = [], $timezone = '')
    {
        return new self($props_n_values, true, $timezone);
    }


    /**
     * Set Price type ID
     *
     * @param int $PRT_ID
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_type($PRT_ID = 0)
    {
        $this->set('PRT_ID', $PRT_ID);
    }


    /**
     * Set Price Amount
     *
     * @param float $PRC_amount
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_amount($PRC_amount = 0.00)
    {
        $this->set('PRC_amount', $PRC_amount);
    }


    /**
     * Set Price Name
     *
     * @param string $PRC_name
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_name($PRC_name = '')
    {
        $this->set('PRC_name', $PRC_name);
    }


    /**
     * Set Price Description
     *
     * @param string $PRC_desc
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_description($PRC_desc = '')
    {
        $this->Set('PRC_desc', $PRC_desc);
    }


    /**
     * set is_default
     *
     * @param bool $PRC_is_default
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_is_default($PRC_is_default = false)
    {
        $this->set('PRC_is_default', $PRC_is_default);
    }


    /**
     * set deleted
     *
     * @param bool $PRC_deleted
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_deleted($PRC_deleted = null)
    {
        $this->set('PRC_deleted', $PRC_deleted);
    }


    /**
     * get Price type
     *
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function type(): int
    {
        return (int) $this->get('PRT_ID');
    }


    /**
     * get Price Amount
     *
     * @return float
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function amount(): float
    {
        return (float) $this->get('PRC_amount');
    }


    /**
     * get Price Name
     *
     * @return        string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function name()
    {
        return $this->get('PRC_name');
    }


    /**
     * get Price description
     *
     * @return        string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function desc()
    {
        return $this->get('PRC_desc');
    }


    /**
     * get overrides
     *
     * @return        int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function overrides()
    {
        return $this->get('PRC_overrides');
    }


    /**
     * get order
     *
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function order()
    {
        return $this->get('PRC_order');
    }


    /**
     * get the author of the price
     *
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     * @since 4.5.0
     */
    public function wp_user()
    {
        return $this->get('PRC_wp_user');
    }


    /**
     * get is_default
     *
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function is_default()
    {
        return $this->get('PRC_is_default');
    }


    /**
     * get deleted
     *
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function deleted()
    {
        return $this->get('PRC_deleted');
    }


    /**
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function parent()
    {
        return $this->get('PRC_parent');
    }


    // some helper methods for getting info on the price_type for this price

    /**
     * @return EE_Price_Type|null
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function type_obj(): ?EE_Price_Type
    {
        return $this->get_first_related('Price_Type');
    }


    /**
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function type_order(): int
    {
        $price_type = $this->type_obj();
        return $price_type instanceof EE_Price_Type ? $price_type->order() : 0;
    }


    /**
     * return whether the price is a base price or not
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
        $price_type = $this->type_obj();
        return $price_type instanceof EE_Price_Type && $price_type->is_base_price();
    }


    /**
     * Simply indicates whether this price increases or decreases the total
     *
     * @return bool true = discount, otherwise adds to the total
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function is_discount(): bool
    {
        $price_type = $this->type_obj();
        return $price_type instanceof EE_Price_Type && $price_type->is_discount();
    }


    /**
     * whether the price is a percentage or not
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
        $price_type = $this->type_obj();
        return $price_type instanceof EE_Price_Type && $price_type->is_percent();
    }


    /**
     * whether the price is a percentage or not
     *
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function is_surcharge(): bool
    {
        $price_type = $this->type_obj();
        return $price_type instanceof EE_Price_Type && $price_type->is_surcharge();
    }



    /**
     * whether the price is a percentage or not
     *
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function is_tax(): bool
    {
        $price_type = $this->type_obj();
        return $price_type instanceof EE_Price_Type && $price_type->is_tax();
    }


    /**
     * return pretty price dependant on whether its a dollar or percent.
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     * @since 4.4.0
     */
    public function pretty_price(): string
    {
        return ! $this->is_percent()
            ? $this->get_pretty('PRC_amount')
            : $this->get('PRC_amount') . '%';
    }


    /**
     * @return mixed
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_price_without_currency_symbol()
    {
        return str_replace(
            EE_Registry::instance()->CFG->currency->sign,
            '',
            $this->get_pretty('PRC_amount')
        );
    }
}
