<?php

/**
 * Class EE_Registration_Payment
 * Description
 *
 * @package     Event Espresso
 * @subpackage  core
 * @author      Brent Christensen
 * @since       4.7.0
 * @method EE_Payment|EE_Registration|null get_first_related(string string $relation_name, array array $query_params = [])
 */
class EE_Registration_Payment extends EE_Base_Class
{
    /**
     * @param array  $props_n_values
     * @param string $timezone
     * @param array  $date_formats
     * @return EE_Registration_Payment
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function new_instance($props_n_values = [], $timezone = '', $date_formats = [])
    {
        $has_object = parent::_check_for_object($props_n_values, __CLASS__, $timezone, $date_formats);
        return $has_object ?: new self($props_n_values, false, $timezone, $date_formats);
    }


    /**
     * @param array  $props_n_values
     * @param string $timezone
     * @return EE_Registration_Payment
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function new_instance_from_db($props_n_values = [], $timezone = '')
    {
        return new self($props_n_values, true, $timezone);
    }


    /**
     * @return    int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function registration_ID(): int
    {
        return (int) $this->get('REG_ID');
    }


    /**
     * @return    int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function payment_ID(): int
    {
        return (int) $this->get('PAY_ID');
    }


    /**
     * amount
     *
     * @access    public
     * @return    float
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function amount(): float
    {
        return (float) $this->get('RPY_amount');
    }


    /**
     * @param float|int|string $amount
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_amount($amount = 0.000)
    {
        $this->set('RPY_amount', (float) $amount);
    }


    /**
     * @return EE_Registration|null
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function registration(): ?EE_Registration
    {
        return $this->get_first_related('Registration');
    }


    /**
     * @return EE_Payment|null
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function payment(): ?EE_Payment
    {
        return $this->get_first_related('Payment');
    }
}
