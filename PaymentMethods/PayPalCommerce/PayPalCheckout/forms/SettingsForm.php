<?php

namespace EventEspresso\PaymentMethods\PayPalCommerce\PayPalCheckout\forms;

use EE_Payment_Method_Form;
use EE_PMT_Base;
use EE_PMT_PayPalCheckout;
use EE_Payment_Method;
use EE_Error;
use EE_Form_Section_HTML;
use EE_Select_Input;
use EE_Checkbox_Multi_Input;
use EED_PayPalOnboard;
use EEH_HTML;
use EventEspresso\PaymentMethods\PayPalCommerce\domain\Domain;
use EventEspresso\PaymentMethods\PayPalCommerce\tools\extra_meta\PayPalExtraMetaManager;
use ReflectionException;

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
     *  Payment method.
     *
     * @var EE_PMT_Base|null
     */
    protected $payment_method = null;

    /**
     *  Payment method instance.
     *
     * @var EE_PMT_Base|null
     */
    protected $pm_instance = null;


    /**
     * Class constructor.
     *
     * @param EE_PMT_PayPalCheckout $payment_method
     * @param EE_Payment_Method     $pm_instance
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function __construct(EE_PMT_PayPalCheckout $payment_method, EE_Payment_Method $pm_instance)
    {
        $form_parameters      = [];
        $this->payment_method = $payment_method;
        $this->pm_instance    = $pm_instance;
        // Allow Advanced Card Checkout if PPCP checkout type was possible and selected.
        $allowed_type = PayPalExtraMetaManager::getPmOption($pm_instance, Domain::META_KEY_ALLOWED_CHECKOUT_TYPE);
        $is_onboard   = EED_PayPalOnboard::isOnboard($pm_instance);
        if ($is_onboard && ($allowed_type === 'ppcp' || $allowed_type === 'all')) {
            $form_parameters = $this->addCheckoutTypeSelect($form_parameters);
            $form_parameters = $this->addFundingOptions($form_parameters);
        }
        // Build the PM form.
        parent::__construct($form_parameters);
        // Add a form for PayPal Onboard.
        $this->addOnboardingForm($payment_method, $pm_instance);
        // Add a form for PayPal Onboard.
        $this->addFeesNotice();
        // Add the clear data button.
        $this->clearMetadataButton($pm_instance);
        // Disable inputs if needed.
        $this->toggleSubsections($pm_instance);
    }


    /**
     * Adds an onboarding form as a subsection.
     *
     * @param EE_PMT_PayPalCheckout $payment_method
     * @param EE_Payment_Method     $pm_instance
     * @return void
     */
    public function addOnboardingForm(EE_PMT_PayPalCheckout $payment_method, EE_Payment_Method $pm_instance): void
    {
        // Add the connect button before the app id field.
        try {
            $this->add_subsections(
                [
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
     * Add fees notice.
     *
     * @return void
     */
    public function addFeesNotice(): void
    {
        if (defined('EE_PPC_USE_PAYMENT_FEES') && ! EE_PPC_USE_PAYMENT_FEES) {
            // We want to be able to disable fees.
            return;
        }
        try {
            $this->add_subsections(
                [
                    'partner_fees_notice' => new EE_Form_Section_HTML(
                        EEH_HTML::tr(
                            EEH_HTML::th()
                            . EEH_HTML::thx()
                            . EEH_HTML::td(
                                EEH_HTML::div(
                                    EEH_HTML::strong(
                                        esc_html__(
                                            'PayPal Partner Commission Fees are based upon the status of your Support License:',
                                            'event_espresso'
                                        )
                                    )
                                    . EEH_HTML::ul()
                                    . EEH_HTML::li(
                                        esc_html__('- Active licenses commission fees: 0%', 'event_espresso')
                                    )
                                    . EEH_HTML::li(
                                        esc_html__('- Expired license commission fees: 3%', 'event_espresso')
                                    )
                                    . EEH_HTML::ulx()
                                    . esc_html__(
                                        'Keep your support license active for: lower fees, up-to-date software and have access to our support team. By connecting and processing payments you agree to these terms.',
                                        'event_espresso'
                                    ),
                                    '',
                                    'ee-status-outline ee-status-bg--info'
                                )
                            )
                        )
                    ),
                ],
                'paypal_onboard'
            );
        } catch (EE_Error $e) {
            // Don't add this subsection then.
        }
    }


    /**
     * Add a checkout type select.
     *
     * @param array $form_parameters
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function addCheckoutTypeSelect(array $form_parameters): array
    {
        $pm_slug               = $this->pm_instance->slug();
        // Section to be displayed if onboard.
        $form_parameters['extra_meta_inputs'][Domain::META_KEY_CHECKOUT_TYPE] = new EE_Select_Input(
            [
                'express_checkout' => esc_html__('Express Checkout', 'event_espresso'),
                'ppcp'             => esc_html__('Advanced Credit and Debit Card payments', 'event_espresso'),
                'all'              => esc_html__('Both, ACDC and Express Checkout', 'event_espresso'),
            ],
            [
                'html_name'  => "eep_checkout_type_option_$pm_slug",
                'html_id'    => "eep_checkout_type_option_$pm_slug",
                'html_class' => "eep-checkout-type-option-$pm_slug",
                'required'   => true,
                'default'    => PayPalExtraMetaManager::getPmOption(
                    $this->pm_instance,
                    Domain::META_KEY_ALLOWED_CHECKOUT_TYPE
                ),
            ]
        );
        return $form_parameters;
    }


    /**
     * Add a checkout type select.
     *
     * @param array $form_parameters
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function addFundingOptions(array $form_parameters): array
    {
        $pm_slug               = $this->pm_instance->slug();
        // Section to be displayed if onboard.
        $form_parameters['extra_meta_inputs'][Domain::META_KEY_FUNDING_OPTIONS] = new EE_Checkbox_Multi_Input(
            [
                'venmo'    => esc_html__('Venmo', 'event_espresso'),
                'paylater' => esc_html__('PayLater', 'event_espresso'),
            ],
            [
                'html_name'       => "eep_checkout_funding_options_$pm_slug",
                'html_id'         => "eep_checkout_funding_options_$pm_slug",
                'html_class'      => "eep-checkout-funding-options-$pm_slug",
                'html_label_text' => esc_html__('Enable PayPal funding options:', 'event_espresso'),
                'default'         => ['venmo', 'paylater'],
            ]
        );
        return $form_parameters;
    }


    /**
     * Adds a button for clearing the PM metadata.
     *
     * @param EE_Payment_Method $pm_instance
     * @return void
     */
    public function clearMetadataButton(EE_Payment_Method $pm_instance): void
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
    private function toggleSubsections(EE_Payment_Method $pm_instance): void
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
