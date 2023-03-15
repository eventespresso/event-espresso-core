<?php

namespace EventEspresso\PaymentMethods\PayPalCommerce\PayPalCheckout\forms;

use EE_Payment_Method_Form;
use EE_PMT_PayPalCheckout;
use EE_Payment_Method;
use EE_Error;
use EE_Form_Section_HTML;
use EED_PayPalOnboard;
use EEH_HTML;

/**
 * Class SettingsForm
 *
 * @package     Event Espresso
 * @subpackage  eea-paypal-commerce
 * @author      Nazar Kolivoshka
 */
class SettingsForm extends EE_Payment_Method_Form
{
    /**
     * Class constructor.
     *
     * @param EE_PMT_PayPalCheckout $payment_method
     * @param EE_Payment_Method     $pm_instance
     */
    public function __construct(EE_PMT_PayPalCheckout $payment_method, EE_Payment_Method $pm_instance)
    {
        $form_parameters = [];
        // Build the PM form.
        parent::__construct($form_parameters);
        // Add a form for PayPal Onboard.
        $this->addOnboardingForm($payment_method, $pm_instance);
        // Add the clear data button.
        $this->clearMetadataButton($pm_instance);
        // Disable inputs if needed
        $this->toggleSubsections($pm_instance);
    }


    /**
     * Adds an onboarding form as a subsection.
     *
     * @param EE_PMT_PayPalCheckout $payment_method
     * @param EE_Payment_Method     $pm_instance
     * @return void
     */
    public function addOnboardingForm(EE_PMT_PayPalCheckout $payment_method, EE_Payment_Method $pm_instance)
    {
        // Add the connect button before the app id field.
        try {
            // $template = new OnboardingForm($payment_method, $pm_instance);
            $this->add_subsections(
                [
                    // 'paypal_onboard' => new EE_Form_Section_HTML($template->get_html_and_js()),
                    'paypal_onboard' => new OnboardingForm($payment_method, $pm_instance),
                ],
                'PMD_debug_mode',
                false
            );
        } catch (EE_Error $e) {
            // Simply don't add the form.
        }
    }


    /**
     * Adds a button for clearing the PM metadata.
     *
     * @param EE_Payment_Method     $pm_instance
     * @return void
     */
    public function clearMetadataButton(EE_Payment_Method $pm_instance)
    {
        try {
            $is_onboard = EED_PayPalOnboard::isOnboard($pm_instance);
            if ($is_onboard) {
                return;
            }

            $button_text = sprintf(
                esc_html__('Clear %1$s metadata', 'event_espresso'),
                $pm_instance->admin_name()
            );
            $this->add_subsections(
                [
                    'clear_pm_metadata' => new EE_Form_Section_HTML(
                        // EEH_HTML::table(
                        EEH_HTML::tr(
                            EEH_HTML::th(esc_html__('Clear PM metadata ?', 'event_espresso')) .
                                EEH_HTML::td(
                                    EEH_HTML::link(
                                        '',
                                        $button_text,
                                        $button_text,
                                        'eea_clear_metadata_' . $pm_instance->slug(),
                                        'espresso-button button button--secondary'
                                    )
                                )
                        )
                        // )
                    ),
                ],
                'PMD_order',
                false
            );
        } catch (EE_Error $e) {
            // Don't add the button if there's some error.
        }
    }


    /**
     * Toggles subsections depending on the OAuth status etc.
     *
     * @param EE_Payment_Method $pm_instance
     * @return void
     * @throws EE_Error
     */
    private function toggleSubsections(EE_Payment_Method $pm_instance)
    {
        $onboard = EED_PayPalOnboard::isOnboard($pm_instance);
        // Don't allow changing the debug mode setting while connected.
        if ($onboard) {
            $debug_mode_input = $this->get_input('PMD_debug_mode', false);
            if (method_exists($debug_mode_input, 'isDisabled')) {
                $debug_mode_input->disable();
            }
        }
    }
}
