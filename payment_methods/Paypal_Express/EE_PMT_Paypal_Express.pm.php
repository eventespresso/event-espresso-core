<?php

use EventEspresso\payment_methods\Paypal_Express\forms\SettingsForm;

/**
 * ----------------------------------------------
 * Class  EE_PMT_Paypal_Express
 *
 * @package            Event Espresso
 * @subpackage         eea-paypal-express
 * @author             Event Espresso
 *
 * ----------------------------------------------
 */
class EE_PMT_Paypal_Express extends EE_PMT_Base
{

    /**
     * EE_PMT_Paypal_Express constructor.
     */
    public function __construct($pm_instance = null)
    {
        require_once($this->file_folder() . 'EEG_Paypal_Express.gateway.php');
        $this->_gateway = new EEG_Paypal_Express();

        $this->_pretty_name = esc_html__('PayPal Express', 'event_espresso');
        $this->_template_path = $this->file_folder() . 'templates' . DS;
        $this->_default_description = esc_html__(
            // @codingStandardsIgnoreStart
            'After clicking \'Finalize Registration\', you will be forwarded to PayPal website to Login and make your payment.',
            // @codingStandardsIgnoreEnd
            'event_espresso'
        );
        $this->_default_button_url = $this->file_url() . 'lib' . DS . 'paypal-express-checkout-logo-gold-160.png';

        parent::__construct($pm_instance);
    }


    /**
     * Adds the help tab.
     *
     * @see EE_PMT_Base::help_tabs_config()
     * @return array
     */
    public function help_tabs_config()
    {
        return array(
            $this->get_help_tab_name() => array(
                'title'    => esc_html__('PayPal Express Settings', 'event_espresso'),
                'filename' => 'payment_methods_overview_paypal_express'
            )
        );
    }


    /**
     * Gets the form for all the settings related to this payment method type.
     *
     * @return EE_Payment_Method_Form
     */
    public function generate_new_settings_form()
    {
        return new SettingsForm(array(), $this->get_help_tab_link());
    }


    /**
     * Creates a billing form for this payment method type.
     *
     * @param \EE_Transaction $transaction
     * @return \EE_Billing_Info_Form
     */
    public function generate_new_billing_form(EE_Transaction $transaction = null)
    {
        if ($this->_pm_instance->debug_mode()) {
            $form = new EE_Billing_Info_Form(
                $this->_pm_instance,
                array(
                    'name' => 'paypal_express_Info_Form',
                    'subsections' => array(
                        'paypal_express_debug_info' => new EE_Form_Section_Proper(
                            array(
                                'layout_strategy' => new EE_Template_Layout(
                                    array(
                                        'layout_template_file' => $this->_template_path
                                                                    . 'paypal_express_debug_info.template.php',
                                        'template_args'        => array(
                                            'debug_mode' => $this->_pm_instance->debug_mode()
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            );
            return $form;
        }

        return false;
    }
}
