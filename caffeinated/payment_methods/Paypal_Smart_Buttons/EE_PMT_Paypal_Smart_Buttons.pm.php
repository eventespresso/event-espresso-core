<?php

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
        $this->_default_description = __('Please provide the following billing information.', 'event_espresso');
        $this->_requires_https = true;
        parent::__construct($pm_instance);
    }



    /**
     * Gets the form for all the settings related to this payment method type
     * @return EE_Payment_Method_Form
     */
    public function generate_new_settings_form()
    {
        $form =  new EE_Payment_Method_Form(array(
            'extra_meta_inputs'=>array(
                'client_id'=>new EE_Text_Input(array(
                    'html_label_text'=>  sprintf(__("Paypal REST API App Client ID %s", "event_espresso"), $this->get_help_tab_link()),
                    'required' => true
                )),
                'secret'=>new EE_Text_Input(array(
                    'html_label_text'=>  sprintf(__("Paypal REST API App Secret %s", "event_espresso"), $this->get_help_tab_link()),
                    'required' => true
                )),
                )
            ));
        $form->exclude(
            array(
                'PMD_button_url'
            )
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
