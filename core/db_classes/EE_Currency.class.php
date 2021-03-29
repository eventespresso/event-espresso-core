<?php

/**
 * EE_Currency
 *
 * @package     Event Espresso
 * @subpackage
 * @author      Mike Nelson
 */
class EE_Currency extends EE_Base_Class
{

    /** Currency COde
     *
     * @var CUR_code
     */
    protected $_CUR_code = null;

    /** Currency Name Singular
     *
     * @var CUR_single
     */
    protected $_CUR_single = null;

    /** Currency Name Plural
     *
     * @var CUR_plural
     */
    protected $_CUR_plural = null;

    /** Currency Sign
     *
     * @var CUR_sign
     */
    protected $_CUR_sign = null;

    /** Currency Decimal Places
     *
     * @var CUR_dec_plc
     */
    protected $_CUR_dec_plc = null;

    /** Active?
     *
     * @var CUR_active
     */
    protected $_CUR_active = null;

    protected $_Payment_Method;


    /**
     * @param array  $props_n_values          incoming values
     * @param string $timezone                incoming timezone
     *                                        (if not set the timezone set for the website will be used.)
     * @param array  $date_formats            incoming date_formats in an array where the first value is the
     *                                        date_format and the second value is the time format
     * @return EE_Currency
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function new_instance($props_n_values = [], $timezone = null, $date_formats = [])
    {
        $has_object = parent::_check_for_object($props_n_values, __CLASS__, $timezone, $date_formats);
        return $has_object ? $has_object : new self($props_n_values, false, $timezone, $date_formats);
    }


    /**
     * @param array  $props_n_values  incoming values from the database
     * @param string $timezone        incoming timezone as set by the model.
     *                                If not set the timezone for the website will be used.
     * @return EE_Currency
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function new_instance_from_db($props_n_values = [], $timezone = null)
    {
        return new self($props_n_values, true, $timezone);
    }


    /**
     * Sets code
     *
     * @param string $code
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_code($code)
    {
        $this->set('CUR_code', $code);
    }


    /**
     * Gets active
     *
     * @return boolean
     * @throws EE_Error
     */
    public function active()
    {
        return $this->get('CUR_active');
    }


    /**
     * Sets active
     *
     * @param boolean $active
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_active($active)
    {
        $this->set('CUR_active', $active);
    }


    /**
     * Gets dec_plc
     *
     * @return int
     * @throws EE_Error
     */
    public function dec_plc()
    {
        return $this->get('CUR_dec_plc');
    }


    /**
     * Sets dec_plc
     *
     * @param int $dec_plc
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_dec_plc($dec_plc)
    {
        $this->set('CUR_dec_plc', $dec_plc);
    }


    /**
     * Sets plural
     *
     * @param string $plural
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_plural_name($plural)
    {
        $this->set('CUR_plural', $plural);
    }


    /**
     * Gets sign
     *
     * @return string
     * @throws EE_Error
     */
    public function sign()
    {
        return $this->get('CUR_sign');
    }


    /**
     * Sets sign
     *
     * @param string $sign
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_sign($sign)
    {
        $this->set('CUR_sign', $sign);
    }


    /**
     * Gets single
     *
     * @return string
     * @throws EE_Error
     */
    public function singular_name()
    {
        return $this->get('CUR_single');
    }


    /**
     * Sets single
     *
     * @param string $single
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_singular_name($single)
    {
        $this->set('CUR_single', $single);
    }


    /**
     * Gets a prettier name
     *
     * @return string
     * @throws EE_Error
     */
    public function name()
    {
        return sprintf(
            esc_html__("%s (%s)", "event_espresso"),
            $this->code(),
            $this->plural_name()
        );
    }


    /**
     * Gets code
     *
     * @return string
     * @throws EE_Error
     */
    public function code()
    {
        return $this->get('CUR_code');
    }


    /**
     * Gets plural
     *
     * @return string
     * @throws EE_Error
     */
    public function plural_name()
    {
        return $this->get('CUR_plural');
    }
}
