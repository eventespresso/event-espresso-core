<?php

/**
 * EE_Country class
 *
 * @package               Event Espresso
 * @subpackage            includes/classes/EE_Country.class.php
 * @author                Brent Christensen
 */
class EE_Country extends EE_Base_Class
{
    /**
     * @param array $props_n_values
     * @return EE_Country|mixed
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function new_instance($props_n_values = [])
    {
        $has_object = parent::_check_for_object($props_n_values, __CLASS__);
        return $has_object ? $has_object : new self($props_n_values);
    }


    /**
     * @param array $props_n_values
     * @return EE_Country
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function new_instance_from_db($props_n_values = []): EE_Country
    {
        return new self($props_n_values, true);
    }


    /**
     * Gets the country name
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function name(): string
    {
        return $this->get('CNT_name');
    }


    /**
     * Whether the country is active/enabled
     *
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function isActive(): bool
    {
        return (bool) $this->get('CNT_active');
    }


    /**
     * Gets the country ISO3
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function ISO3(): string
    {
        return $this->get('CNT_ISO3');
    }


    /**
     * gets the country's currency code
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function currency_code(): string
    {
        return $this->get('CNT_cur_code');
    }


    /**
     * gets the country's currency sign/symbol
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function currency_sign(): string
    {
        $CNT_cur_sign = $this->get('CNT_cur_sign');
        return $CNT_cur_sign ?: '';
    }


    /**
     * Currency name singular
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function currency_name_single(): string
    {
        return $this->get('CNT_cur_single');
    }


    /**
     * Currency name plural
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function currency_name_plural(): string
    {
        return $this->get('CNT_cur_plural');
    }


    /**
     * currency_sign_before - ie: $TRUE  or  FALSE$
     *
     * @return boolean
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function currency_sign_before(): bool
    {
        return (bool) $this->get('CNT_cur_sign_b4');
    }


    /**
     * currency_decimal_places : 2 = 0.00   3 = 0.000
     *
     * @return integer
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function currency_decimal_places(): int
    {
        return $this->get('CNT_cur_dec_plc');
    }


    /**
     * currency_decimal_mark :   (comma) ',' = 0,01   or   (decimal) '.' = 0.01
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function currency_decimal_mark(): string
    {
        return $this->get('CNT_cur_dec_mrk');
    }


    /**
     * currency thousands separator:   (comma) ',' = 1,000   or   (decimal) '.' = 1.000
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function currency_thousands_separator(): string
    {
        return $this->get('CNT_cur_thsnds');
    }


    /**
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     * @since $VID:$
     */
    public function isEU(): bool
    {
        return (bool) $this->get('CNT_is_EU');
    }


    /**
     * Country Telephone Code: +1
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     * @since $VID:$
     */
    public function telephoneCode(): string
    {
        return $this->get('CNT_tel_code');
    }


    /**
     * @return bool
     * @deprecated $VID:$
     */
    public function is_active(): bool
    {
        return $this->isActive();
    }
}
