<?php

/**
 * EEPMT_Bank
 *
 * @package             Event Espresso
 * @subpackage
 * @author              Mike Nelson
 */
class EE_PMT_Bank extends EE_PMT_Base
{
    /**
     *
     * @param EE_Payment_Method $pm_instance
     * @throws EE_Error
     */
    public function __construct($pm_instance = null)
    {
        $this->_pretty_name = esc_html__("Bank", 'event_espresso');
        parent::__construct($pm_instance);
        $this->_default_button_url  = $this->file_url() . 'lib/bank-logo.png';
        $this->_default_description = esc_html__(
            'Make payment using an electronic funds transfer from your bank.',
            'event_espresso'
        );
    }


    /**
     * Creates the billing form for this payment method type
     *
     * @param EE_Transaction $transaction
     * @return null
     */
    public function generate_new_billing_form(EE_Transaction $transaction = null)
    {
        return null;
    }


    /**
     * Gets the form for all the settings related to this payment method type
     *
     * @return EE_Payment_Method_Form
     */
    public function generate_new_settings_form(): EE_Payment_Method_Form
    {
        return new EE_Payment_Method_Form(
            [
                'extra_meta_inputs' => [
                    'page_title'           => new EE_Text_Input(
                        [
                            'html_label_text' => sprintf(
                                esc_html__("Title %s", "event_espresso"),
                                $this->get_help_tab_link()
                            ),
                            'default'         => esc_html__("Electronic Funds Transfers", 'event_espresso'),
                        ]
                    ),
                    'payment_instructions' => new EE_Text_Area_Input(
                        [
                            'html_label_text'       => sprintf(
                                esc_html__("Payment Instructions %s", "event_espresso"),
                                $this->get_help_tab_link()
                            ),
                            'html_help_text'        => esc_html__(
                                'Provide instructions on how registrants can send the bank draft payment. Eg, mention your account name, bank account number, bank name, bank routing code, and bank address, etc.',
                                'event_espresso'
                            ),
                            'default'               => sprintf(
                                esc_html__(
                                    'Please initiate an electronic payment using the following bank information: %1$sAccount Owner: Luke Skywalker%1$sBank Account # 1234567890%1$sBank Name: Rebellion Bank%1$sRouting Number: 12345%1$sBank Address: 12345 Wookie Rd., Planet Corellian.%1$sPayment must be received within 48 hours of event date.',
                                    'event_espresso'
                                ),
                                "\n"
                            ),
                            'validation_strategies' => [
                                new EE_Full_HTML_Validation_Strategy(),
                            ],
                        ]
                    ),
                ],
                'exclude'           => ['PMD_debug_mode'],
            ]
        );
    }


    /**
     * Adds the help tab
     *
     * @return array
     * @see EE_PMT_Base::help_tabs_config()
     */
    public function help_tabs_config(): array
    {
        return [
            $this->get_help_tab_name() => [
                'title'    => esc_html__('Bank Draft Settings', 'event_espresso'),
                'filename' => 'payment_methods_overview_bank_draft',
            ],
        ];
    }


    /**
     * For adding any html output ab ove the payment overview.
     * Many gateways won't want ot display anything, so this function just returns an empty string.
     * Other gateways may want to override this, such as offline gateways.
     *
     * @param EE_Payment $payment
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function payment_overview_content(EE_Payment $payment): string
    {
        $extra_meta_for_payment_method = $this->_pm_instance->all_extra_meta_array();
        $template_vars                 = array_merge(
            [
                'payment_method'       => $this->_pm_instance,
                'payment'              => $payment,
                'page_title'           => '',
                'payment_instructions' => '',
            ],
            $extra_meta_for_payment_method
        );
        return EEH_Template::locate_template(
            'payment_methods/Bank/templates/bank_payment_details_content.template.php',
            $template_vars
        );
    }
}
