<?php
defined('EVENT_ESPRESSO_VERSION') || exit('No direct script access allowed');


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
     * Used to reference when a registration has been checked out.
     *
     * @type int
     */
    const status_checked_out = 0;

    /**
     * Used to reference when a registration has been checked in.
     *
     * @type int
     */
    const status_checked_in = 1;

    /**
     * Used to reference when a registration has never been checked in.
     *
     * @type int
     */
    const status_checked_never = 2;



    /**
     *
     * @param array  $props_n_values    incoming values
     * @param string $timezone          incoming timezone (if not set the timezone set for the website will be used.)
     * @param array  $date_formats      incoming date_formats in an array
     *                                  where the first value is the date_format
     *                                  and the second value is the time format
     * @return EE_Checkin
     * @throws EE_Error
     */
    public static function new_instance($props_n_values = array(), $timezone = null, $date_formats = array())
    {
        $has_object = parent::_check_for_object($props_n_values, __CLASS__, $timezone, $date_formats);
        return $has_object
            ? $has_object
            : new self($props_n_values, false, $timezone, $date_formats);
    }



    /**
     * @param array  $props_n_values  incoming values from the database
     * @param string $timezone        incoming timezone as set by the model.  If not set the timezone for
     *                                the website will be used.
     * @return EE_Checkin
     * @throws EE_Error
     */
    public static function new_instance_from_db($props_n_values = array(), $timezone = null)
    {
        return new self($props_n_values, true, $timezone);
    }


    public function ID()
    {
        return $this->get('CHK_ID');
    }


    public function registration_id()
    {
        return $this->get('REG_ID');
    }


    public function datetime_id()
    {
        return $this->get('DTT_ID');
    }


    public function status()
    {
        return $this->get('CHK_in');
    }


    public function timestamp()
    {
        return $this->get('CHK_timestamp');
    }
}
