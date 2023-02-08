<?php

/**
 * EE_Checkin class
 *
 * @package            Event Espresso
 * @subpackage         includes/classes/EE_Checkin.class.php
 * @author             Darren Ethier
 */
class EE_Checkin extends EE_Base_Class
{
    /**
     * Registration can NOT be checked in or out
     *
     * @type int
     */
    const status_invalid = -1;

    /**
     * Registration has been checked out.
     *
     * @type int
     */
    const status_checked_out = 0;

    /**
     * Registration has been checked in.
     *
     * @type int
     */
    const status_checked_in = 1;

    /**
     * Registration has never been checked in.
     *
     * @type int
     */
    const status_checked_never = 2;


    /**
     *
     * @param array|null  $props_n_values incoming values
     * @param string|null $timezone       incoming timezone (if not set the timezone set for the website will be used.)
     * @param array|null  $date_formats   incoming date_formats in an array
     *                                    where the first value is the date_format
     *                                    and the second value is the time format
     * @return EE_Checkin
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function new_instance(
        $props_n_values = [],
        $timezone = '',
        $date_formats = []
    ) {
        $has_object = parent::_check_for_object($props_n_values, __CLASS__, $timezone, $date_formats);
        return $has_object ?: new self($props_n_values, false, $timezone, $date_formats);
    }


    /**
     * @param array|null  $props_n_values incoming values from the database
     * @param string|null $timezone       incoming timezone as set by the model.  If not set the timezone for
     *                                    the website will be used.
     * @return EE_Checkin
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function new_instance_from_db($props_n_values = [], $timezone = '')
    {
        return new self($props_n_values, true, $timezone);
    }


    public function ID()
    {
        return $this->get('CHK_ID');
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     * @return int
     */
    public function registration_id()
    {
        return (int) $this->get('REG_ID');
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     * @return int
     */
    public function datetime_id()
    {
        return (int) $this->get('DTT_ID');
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     * @return int
     */
    public function status()
    {
        return (int) $this->get('CHK_in');
    }


    /**
     * @throws ReflectionException
     * @throws EE_Error
     */
    public function timestamp()
    {
        return $this->get('CHK_timestamp');
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     * @return string
     */
    public function getCheckInText()
    {
        switch ($this->status()) {
            case EE_Checkin::status_checked_in:
                return esc_html__('Checked In', 'event_espresso');
            case EE_Checkin::status_checked_out:
                return esc_html__('Checked Out', 'event_espresso');
            case EE_Checkin::status_checked_never:
                return esc_html__('Never Checked In', 'event_espresso');
            default:
                return esc_html__('Can Not Check-in', 'event_espresso');
        }
    }
}
