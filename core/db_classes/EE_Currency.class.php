<?php

/**
 * EE_Currency
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_Currency extends EE_Base_Class
{

    /** Currency COde @var CUR_code */
    protected $_CUR_code = null;
    /** Currency Name Singular @var CUR_single */
    protected $_CUR_single = null;
    /** Currency Name Plural @var CUR_plural */
    protected $_CUR_plural = null;
    /** Currency Sign @var CUR_sign */
    protected $_CUR_sign = null;
    /** Currency Decimal Places @var CUR_dec_plc */
    protected $_CUR_dec_plc = null;
    /** Active? @var CUR_active */
    protected $_CUR_active = null;
    protected $_Payment_Method;

    /**
     *
     * @param array  $props_n_values          incoming values
     * @param string $timezone                incoming timezone (if not set the timezone set for the website will be
     *                                        used.)
     * @param array  $date_formats            incoming date_formats in an array where the first value is the
     *                                        date_format and the second value is the time format
     * @return EE_Attendee
     */
    public static function new_instance($props_n_values = array(), $timezone = null, $date_formats = array())
    {
        $has_object = parent::_check_for_object($props_n_values, __CLASS__, $timezone, $date_formats);
        return $has_object ? $has_object : new self($props_n_values, false, $timezone, $date_formats);
    }


    /**
     * @param array  $props_n_values  incoming values from the database
     * @param string $timezone        incoming timezone as set by the model.  If not set the timezone for
     *                                the website will be used.
     * @return EE_Attendee
     */
    public static function new_instance_from_db($props_n_values = array(), $timezone = null)
    {
        return new self($props_n_values, true, $timezone);
    }

    /**
     * Gets code
     *
     * @return string
     */
    public function code()
    {
        return $this->get('CUR_code');
    }

    /**
     * Sets code
     *
     * @param string $code
     * @return boolean
     */
    public function set_code($code)
    {
        return $this->set('CUR_code', $code);
    }

    /**
     * Gets active
     *
     * @return boolean
     */
    public function active()
    {
        return $this->get('CUR_active');
    }

    /**
     * Sets active
     *
     * @param boolean $active
     * @return boolean
     */
    public function set_active($active)
    {
        return $this->set('CUR_active', $active);
    }

    /**
     * Gets dec_plc
     *
     * @return int
     */
    public function dec_plc()
    {
        return $this->get('CUR_dec_plc');
    }

    /**
     * Sets dec_plc
     *
     * @param int $dec_plc
     * @return boolean
     */
    public function set_dec_plc($dec_plc)
    {
        return $this->set('CUR_dec_plc', $dec_plc);
    }

    /**
     * Gets plural
     *
     * @return string
     */
    public function plural_name()
    {
        return $this->get('CUR_plural');
    }

    /**
     * Sets plural
     *
     * @param string $plural
     * @return boolean
     */
    public function set_plural_name($plural)
    {
        return $this->set('CUR_plural', $plural);
    }

    /**
     * Gets sign
     *
     * @return string
     */
    public function sign()
    {
        return $this->get('CUR_sign');
    }

    /**
     * Sets sign
     *
     * @param string $sign
     * @return boolean
     */
    public function set_sign($sign)
    {
        return $this->set('CUR_sign', $sign);
    }

    /**
     * Gets single
     *
     * @return string
     */
    public function singular_name()
    {
        return $this->get('CUR_single');
    }

    /**
     * Sets single
     *
     * @param string $single
     * @return boolean
     */
    public function set_singular_name($single)
    {
        return $this->set('CUR_single', $single);
    }

    /**
     * Gets a prettier name
     *
     * @return string
     */
    public function name()
    {
        return sprintf(__("%s (%s)", "event_espresso"), $this->code(), $this->plural_name());
    }
}
