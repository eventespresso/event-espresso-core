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
                'button_color' => new EE_Select_Input(
                    array(
                        '' => esc_html__('Default', 'event_espresso'),
                        'gold' => esc_html__('Gold', 'event_espresso'),
                        'blue' => esc_html__('Blue', 'event_espresso'),
                        'darkblue' => esc_html__('Dark Blue', 'event_espresso'),
                        'silver' => esc_html__('Silver', 'event_espresso'),
                        'black' => esc_html__('Black', 'event_espresso')
                    ),
                    array(
                        'html_label_text' => esc_html__('Button Color', 'event_espresso'),
                        'default' => ''
                    )
                ),
                'button_shape' => new EE_Select_Input(
                    array(
                        'pill' => esc_html__('Pill (Recommended)', 'event_espresso'),
                        'rect' => esc_html__('Rectangular', 'event_espresso')
                    ),
                    array(
                        'html_label_text' => esc_html__('Button Shape', 'event_espresso'),
                        'default' => 'pill'
                    )
                ),
                'button_size' => new EE_Select_Input(
                    array(
                        'medium' => esc_html__('Medium (250px by 35px)', 'event_espresso'),
                        'large' => esc_html__('Large (350px by 40px)', 'event_espresso'),
                        'responsive' => esc_html__('Responsive (fills the page)', 'event_espresso')
                    ),
                    array(
                        'html_label_text' => esc_html__('Button Size', 'event_espresso'),
                        'default' => 'medium',
                    )
                ),
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
