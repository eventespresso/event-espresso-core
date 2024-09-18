<?php

/**
 *
 * EE_PMT_Admin_Only.
 * These payment methods really shouldn't be shown on frontend and contain nearly no functionality.
 * They should just be used admin-side for recording payments like Cash, Check, etc.
 *
 * @package         Event Espresso
 * @subpackage
 * @author              Mike Nelson
 *
 */
class EE_PMT_Admin_Only extends EE_PMT_Base
{
    /**
     * @param EE_Payment_Method|null $pm_instance
     * @throws ReflectionException
     * @throws EE_Error
     */
    public function __construct($pm_instance = null)
    {
        $this->_pretty_name = esc_html__("Admin Only", 'event_espresso');
        $this->_default_button_url = '';
        parent::__construct($pm_instance);
    }



    /**
     * Creates the billing form for this payment method type
     * @param EE_Transaction|null $transaction
     * @return EE_Billing_Info_Form|null
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function generate_new_billing_form(EE_Transaction $transaction = null)
    {
    return null;
    }



    /**
     * Gets the form for all the settings related to this payment method type
     *
     * @return EE_Payment_Method_Form
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function generate_new_settings_form()
    {
        return new EE_Payment_Method_Form();
    }
}
