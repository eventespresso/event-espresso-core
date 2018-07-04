<?php

/**
 * EE_Currency_Payment_Method
 * Model for showing which currencies apply to which payment methods
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 * @deprecated            in 4.9.40 because this model is basically not used and inefficient
 *
 * ------------------------------------------------------------------------
 */
class EE_Currency_Payment_Method extends EE_Base_Class
{

    /** Currency to Payment Method Link ID @var CPM_ID */
    protected $_CPM_ID = null;
    /** Currency Code @var CUR_code */
    protected $_CUR_code = null;
    /** Payment Method ID @var PMD_ID */
    protected $_PMD_ID = null;
    protected $_Payment_Method;
    protected $_Currency;


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
}
