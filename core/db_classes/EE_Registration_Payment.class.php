<?php

/**
 * Class EE_Registration_Payment
 *
 * @package     Event Espresso
 * @subpackage  core
 * @author      Brent Christensen
 * @since       4.7.0
 *
 */
class EE_Registration_Payment extends EE_Base_Class
{
    /**
     * @var EE_Currency_Config $currency_config
     */
    protected $currency;

    /**
     *
     * @param array  $props_n_values          incoming values
     * @param string $timezone                incoming timezone (if not set the timezone set for the website will be
     *                                        used.)
     * @param array  $date_formats            incoming date_formats in an array where the first value is the
     *                                        date_format and the second value is the time format
     * @return EE_Registration_Payment
     * @throws EE_Error|ReflectionException
     */
    public static function new_instance($props_n_values = array(), $timezone = '', $date_formats = array())
    {
        $reg_payment = parent::_check_for_object($props_n_values, __CLASS__, $timezone, $date_formats);
        if (! $reg_payment instanceof EE_Registration_Payment) {
            $reg_payment = new EE_Registration_Payment($props_n_values, false, $timezone, $date_formats);
        }
        return $reg_payment;
    }


    /**
     * @param array  $props_n_values
     * @param string $timezone
     * @return EE_Registration_Payment
     * @throws EE_Error|ReflectionException
     */
    public static function new_instance_from_db($props_n_values = array(), $timezone = '')
    {
        return new self($props_n_values, true, $timezone);
    }


    /**
     * Adds some defaults if they're not specified
     *
     * @param array  $props_n_values
     * @param bool   $bydb
     * @param string $timezone
     * @param array  $date_formats  incoming date_formats in an array where the first value is the
     *                              date_format and the second value is the time format
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function __construct($props_n_values = [], $bydb = false, $timezone = '', $date_formats = [])
    {
        parent::__construct($props_n_values, $bydb, $timezone, $date_formats);
        if (! $this->currency instanceof EE_Currency_Config) {
            $this->currency = EE_Registry::instance()->CFG->currency instanceof EE_Currency_Config
                ? EE_Registry::instance()->CFG->currency
                : new EE_Currency_Config();
        }
    }


    /**
     * registration_ID
     *
     * @return    int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function registration_ID()
    {
        return $this->get('REG_ID');
    }


    /**
     * payment_ID
     *
     * @return    int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function payment_ID()
    {
        return $this->get('PAY_ID');
    }


    /**
     * amount
     *
     * @return    float
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function amount()
    {
        return $this->get('RPY_amount');
    }


    /**
     * amount
     *
     * @param float $amount
     * @throws EE_Error|ReflectionException
     */
    public function set_amount($amount = 0.000)
    {
        $this->set('RPY_amount', round($amount, $this->currency->dec_plc));
    }


    /**
     * registration
     *
     * @return EE_Base_Class|EE_Registration
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function registration()
    {
        return $this->get_first_related('Registration');
    }


    /**
     * payment
     *
     * @return EE_Base_Class|EE_Payment
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function payment()
    {
        return $this->get_first_related('Payment');
    }
}
