<?php

use EventEspresso\caffeinated\payment_methods\Paypal_Smart_Buttons\forms\PayPalSmartButtonSettingsForm;

/**
 * EEPMT_Paypal_Smart_Buttons
 *
 * @package         Event Espresso
 * @subpackage
 * @author              Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_PMT_Paypal_Smart_Buttons extends EE_PMT_Base
{

    /**
     * @param EE_Payment_Method $pm_instance
     * @return EE_PMT_Paypal_Smart_Buttons
     */
    public function __construct($pm_instance = null)
    {
        require_once($this->file_folder().'EEG_Paypal_Smart_Buttons.gateway.php');
        $this->_gateway = new EEG_Paypal_Smart_Buttons();
        $this->_pretty_name = __("PayPal Smart Buttons", 'event_espresso');
        $this->_default_description = __('If payment with PayPal is unsuccessful, please try an alternative method, or contact us.', 'event_espresso');
        $this->_requires_https = true;
        parent::__construct($pm_instance);
    }



    /**
     * Gets the form for all the settings related to this payment method type
     * @return EE_Payment_Method_Form
     */
    public function generate_new_settings_form()
    {
        $form =  new PayPalSmartButtonSettingsForm(
            $this->get_help_tab_link()
        );
        return $form;
    }


    /**
     * Creates the billing form for this payment method type
     * @param \EE_Transaction $transaction
     * @throws \EE_Error
     * @return EE_Billing_Info_Form
     */
    public function generate_new_billing_form(EE_Transaction $transaction = null)
    {
        return new EE_Billing_Info_Form(
            $this->_pm_instance,
            array(
                'subsections' =>
                array(
                    'token' => new EE_Hidden_Input(),
                )
            )
        );
    }


    /**
     * Adds the help tab
     * @see EE_PMT_Base::help_tabs_config()
     * @return array
     */
    public function help_tabs_config()
    {
        return array(
            $this->get_help_tab_name() => array(
                        'title' => __('PayPal Pro Settings', 'event_espresso'),
                        'filename' => 'payment_methods_overview_paypalpro'
                        ),
        );
    }
}
