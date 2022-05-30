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
     *
     * @param EE_Payment_Method $pm_instance
     * @return EE_PMT_Admin_Only
     */
    public function __construct($pm_instance = null)
    {
        $this->_pretty_name = esc_html__("Admin Only", 'event_espresso');
        $this->_default_button_url = '';
        parent::__construct($pm_instance);
    }



    /**
     * Creates the billing form for this payment method type
     * @param \EE_Transaction $transaction
     * @return NULL
     */
    public function generate_new_billing_form(EE_Transaction $transaction = null)
    {
        return null;
    }



    /**
     * Gets the form for all the settings related to this payment method type
     * @return EE_Payment_Method_Form
     */
    public function generate_new_settings_form()
    {
        return new EE_Payment_Method_Form();
    }
}
