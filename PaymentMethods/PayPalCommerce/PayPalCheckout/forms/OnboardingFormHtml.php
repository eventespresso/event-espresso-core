<?php

namespace EventEspresso\PaymentMethods\PayPalCommerce\PayPalCheckout\forms;

use EE_Checkbox_Multi_Input;
use EE_Config;
use EE_Country;
use EE_Form_Section_Base;
use EE_Select_Input;
use EED_PayPalCommerce;
use EEM_Country;
use EE_Form_Section_HTML;
use EE_Payment_Method;
use EE_PMT_Base;
use EEH_HTML;
use EventEspresso\PaymentMethods\PayPalCommerce\domain\Domain;
use EventEspresso\PaymentMethods\PayPalCommerce\tools\extra_meta\PayPalExtraMetaManager;
use Exception;

/**
 * Class OnboardingFormHtml
 *
 * @package     Event Espresso
 * @subpackage  eea-paypal-commerce
 * @author      Nazar Kolivoshka
 * @since       5.0.13.p
 */
class OnboardingFormHtml
{
    /**
     *  Payment method.
     *
     * @var EE_PMT_Base
     */
    protected $payment_method = null;

    /**
     *  Payment method instance.
     *
     * @var EE_PMT_Base
     */
    protected $pm_instance = null;

    /**
     *  Payment method slug.
     *
     * @var EE_PMT_Base
     */
    protected $pm_slug = null;

    /**
     *  PayPal Onboarding button text.
     *
     * @var string
     */
    public $onboard_btn_text = '';

    /**
     *  PayPal Onboarding button in sandbox mode text.
     *
     * @var string
     */
    public $sandbox_btn_text = '';

    /**
     *  PayPal Onboarding section sandbox mode text.
     *
     * @var string
     */
    public $authed_sandbox_text = '';


    /**
     * Class constructor.
     *
     * @param EE_PMT_Base       $pmt
     * @param EE_Payment_Method $payment_method
     */
    public function __construct(EE_PMT_Base $pmt, EE_Payment_Method $payment_method)
    {
        $this->payment_method      = $pmt;
        $this->pm_instance         = $payment_method;
        $this->pm_slug             = $this->pm_instance->slug();
        $this->onboard_btn_text    = esc_html__('Connect with PayPal', 'event_espresso');
        $this->sandbox_btn_text    = esc_html__('Connect with PayPal (sandbox)', 'event_espresso');
        $this->authed_sandbox_text = esc_html__('(using sandbox credentials)', 'event_espresso');
    }


    /**
     * Form a heading.
     *
     * @param string $text
     * @return string
     */
    public function getHeader(string $text = ''): string
    {
        $text = $text ?: esc_html__('PayPal Onboarding: %1$s', 'event_espresso');
        return EEH_HTML::th(
            sprintf(
                $text,
                $this->payment_method->get_help_tab_link()
            ),
            'eea_paypal_onboard_heading_' . $this->pm_slug,
            'eea-paypal-onboard-heading'
        );
    }


    /**
     * Add the onboarding button.
     *
     * @param array $subsections
     * @param bool  $is_onboard
     * @return array
     */
    public function addOnboardButton(array $subsections, bool $is_onboard): array
    {
        // Section to be displayed if not onboard.
        $subsections['paypal_onboard_btn'] = new EE_Form_Section_HTML(
            EEH_HTML::tr(
                $this->getHeader() .
                EEH_HTML::td(
                    EEH_HTML::button(
                        $this->onboard_btn_text,
                        'eea-paypal-onboard-btn button button--primary',
                        '',
                        'eea_paypal_onboard_btn_' . $this->pm_slug,
                    )
                    . EEH_HTML::link(
                        '#',
                        '',
                        '',
                        'eea_paypal_onboard_trigger_btn_' . $this->pm_slug,
                        'eea-paypal-onboard-trigger-btn',
                        '',
                        'data-ee-pm-slug="' . $this->pm_slug . '" data-paypal-button="true"'
                    )
                ),
                'eea_paypal_onboard_section_' . $this->pm_slug,
                'eea-onboard-section eea-onboard-section-' . $this->pm_slug,
                // Are we onboard ?
                $is_onboard ? 'display:none;' : ''
            ),
            ['required' => true]
        );
        return $subsections;
    }


    /**
     * Add the offboarding (deauthorize) button.
     *
     * @param array $subsections
     * @param bool  $is_onboard
     * @return array
     */
    public function addOffboardButton(array $subsections, bool $is_onboard): array
    {
        $onboard_sandbox_section = $this->getOnboardSandboxSection();
        // If we are connected, display the seller merchant ID.
        $seller_id_section = $this->getSellerIdSection();
        // Section to be displayed when onboard.
        $subsections['paypal_offboard_btn'] = new EE_Form_Section_HTML(
            EEH_HTML::tr(
                $this->getHeader()
                . EEH_HTML::td(
                    EEH_HTML::img(
                        EEP_PAYPAL_COMMERCE_URL . 'assets' . DS . 'lib' . DS . 'paypal-onboard.png',
                        '',
                        'eea_paypal_offboard_ico',
                        'eea-paypal-offboard-ico'
                    )
                    . EEH_HTML::strong(
                        esc_html__('Connected.', 'event_espresso'),
                        'eea_paypal_offboard_txt_' . $this->pm_slug,
                        'eea-paypal-offboard-txt'
                    )
                    . $onboard_sandbox_section
                    . $seller_id_section
                    . EEH_HTML::link(
                        '#',
                        EEH_HTML::span(esc_html__('Disconnect', 'event_espresso')),
                        '',
                        'eea_paypal_offboard_btn_' . $this->pm_slug,
                        'eea-paypal-onboard-btn button button--primary'
                    )
                ),
                'eea_paypal_offboard_section_' . $this->pm_slug,
                'eea-offboard-section-' . $this->pm_slug,
                // Are we onboard ?
                ! $is_onboard ? 'display:none;' : ''
            ),
            ['required' => true]
        );
        return $subsections;
    }


    /**
     * Get the sandbox onboarding section contents.
     *
     * @return string
     */
    public function getOnboardSandboxSection(): string
    {
        // Is this a test onboarding ?
        $sandbox_mode_text = $this->pm_instance->debug_mode() ? $this->authed_sandbox_text : '';
        return ' ' . EEH_HTML::strong(
            $sandbox_mode_text,
            'eea_paypal_onboard_test_txt_' . $this->pm_slug,
            'eea-paypal-onboard-test-txt'
        );
    }


    /**
     * Get the seller merchant ID section contents.
     *
     * @return string
     */
    public function getSellerIdSection(): string
    {
        try {
            $is_third_party = EED_PayPalCommerce::isThirdParty($this->pm_instance);
            $meta_key       = $is_third_party ? Domain::META_KEY_SELLER_MERCHANT_ID : Domain::META_KEY_PAYER_ID;
            $payer_id       = PayPalExtraMetaManager::getPmOption($this->pm_instance, $meta_key) ?: '--';
        } catch (Exception $e) {
            $payer_id = '--';
        }
        return ' ' . EEH_HTML::strong(
            sprintf(esc_html__('Linked account ID: %1$s', 'event_espresso'), $payer_id),
            'eea_paypal_seller_id_' . $this->pm_slug,
            'eea-paypal-seller-id'
        );
    }


    /**
     * Add the PM slug holder.
     *
     * @param array $subsections
     * @return array
     */
    public function addPmSlugHolder(array $subsections): array
    {
        $subsections['paypal_pm_slug_holder'] = new EE_Form_Section_HTML(
            EEH_HTML::span(
                '',
                'eea_paypal_pm_slug',
                'eea-paypal-pm-slug',
                'display:none;'
            )
        );
        return $subsections;
    }


    /**
     * HTML for onboarding settings dialog.
     *
     * @return EE_Form_Section_Base
     */
    public function connectDialog(): EE_Form_Section_Base
    {
        return new EE_Form_Section_HTML(
            EEH_HTML::div(
                $this->countriesSelectHtml() .
                $this->paymentOptionsHtml() .
                EEH_HTML::div(
                    EEH_HTML::link(
                        '',
                        'Cancel',
                        'cancel, go back',
                        'eea_ppc_connect_cancel_' . $this->pm_slug,
                        'eea-ppc-connect-cancel button button--secondary'
                    ) .
                    EEH_HTML::link(
                        '',
                        'Continue',
                        'ok, continue',
                        'eea_ppc_connect_ok_' . $this->pm_slug,
                        'eea-ppc-connect-ok button button--primary-alt'
                    ),
                    '',
                    'eep-ppc-dialog-yes-no'
                ),
                'eea_paypal_connect_dialog_' . $this->pm_slug
            )
        );
    }


    /**
     * Form a countries select and return as html.
     *
     * @return string
     */
    public function countriesSelectHtml(): string
    {
        $countries = [];
        $countries_select = EEH_HTML::strong(
            esc_html__('Please select a country where your PayPal account is registered:', 'event_espresso'),
            'eep_ppc_country_txt_' . $this->pm_slug,
            'eep-ppc-country-txt'
        );
        try {
            // Get all countries list.
            $countries_iso = EEM_Country::instance()->get_all_countries();
            foreach ($countries_iso as $iso => $country) {
                if ($country instanceof EE_Country) {
                    $countries [ $iso ] = $country->get('CNT_name');
                }
            }
            // Now build the select input.
            $select_input = new EE_Select_Input(
                $countries,
                [
                    'html_name'       => 'eep_ppc_country_' . $this->pm_slug,
                    'html_id'         => 'eep_ppc_country_' . $this->pm_slug,
                    'html_class'      => 'eep-ppc-country-' . $this->pm_slug,
                    'html_label_text' => esc_html__('Select country', 'event_espresso'),
                    'required'        => true,
                    'default'         => EE_Config::instance()->organization->CNT_ISO ?? 'US'
                ]
            );
            $countries_select .= $select_input->get_html_for_input();
        } catch (Exception $e) {
            // Countries list set at this point, so just continue.
        }
        return $countries_select;
    }


    /**
     * Form the payment options checkboxes and return as html.
     *
     * @return string
     */
    public function paymentOptionsHtml(): string
    {
        $options_lbl = EEH_HTML::strong(
            esc_html__('Select a product you\'d like to allow at checkout:', 'event_espresso'),
            'eea_ppc_product_txt_' . $this->pm_slug,
            'eea-ppc-product-txt'
        );
        $express_checkout_lbl = EEH_HTML::label(
            esc_html__('Accept PayPal ', 'event_espresso')
            . EEH_HTML::img(
                'https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-100px.png',
                '',
                'eea_ppc_express_checkout_img_' . $this->pm_slug,
                'eea-ppc-express-checkout-img'
            ),
            '',
            '',
            '',
            'for="' . 'eep_ppc_checkout_type_' . $this->pm_slug . '-express_checkout"'
        );
        $ppcp_lbl = EEH_HTML::label(
            esc_html__('Accept credit and debit card payments with PayPal ', 'event_espresso')
            . EEH_HTML::img(
                'https://www.paypalobjects.com/digitalassets/c/website/marketing/apac/C2/logos-buttons/optimize/Full_Online_Tray_RGB.png',
                '',
                'eea_ppc_ppcp_img_' . $this->pm_slug,
                'eea-ppc-ppcp-img'
            ),
            '',
            '',
            '',
            'for="' . 'eep_ppc_checkout_type_' . $this->pm_slug . '-ppcp"'
        );
        $checkbox = new EE_Checkbox_Multi_Input(
            [
                'express_checkout' => $express_checkout_lbl,
                'ppcp'             => $ppcp_lbl,
            ],
            [
                'html_id'         => 'eep_ppc_checkout_type_' . $this->pm_slug,
                'html_label_text' => esc_html__(
                    'Select a product you\'d like to allow at checkout.',
                    'event_espresso'
                ),
                'html_help_text'  => esc_html__(
                    'Select a product you\'d like to allow at checkout.',
                    'event_espresso'
                ),
                'default'         => ['express_checkout', 'ppcp']
            ]
        );
        try {
            return EEH_HTML::div(
                $options_lbl
                . $checkbox->get_html_for_input(),
                'eep_ppc_checkout_types_' . $this->pm_slug,
                'eep-ppc-checkout-types'
            );
        } catch (Exception $e) {
            return '';
        }
    }


    /**
     * HTML for onboarding settings dialog.
     *
     * @return EE_Form_Section_Base
     */
    public function processingMask(): EE_Form_Section_Base
    {
        return new EE_Form_Section_HTML(
            EEH_HTML::div(
                EEH_HTML::div(' ', 'eep_ppc_processing_mask', 'eep-ppc-processing-mask') .
                EEH_HTML::div(' ', 'eep_ppc_processing_spinner', 'ee-spinner ee-spin') .
                EEH_HTML::div(
                    esc_html__('The login window should be open. If you don\'t see a new PayPal login window you might need to enable pop-ups in your browser in order to continue.') .
                    EEH_HTML::div(
                        EEH_HTML::link(
                            '#',
                            esc_html__('Focus window'),
                            esc_html__('Focus window'),
                            'eep_ppc_window_focus_' . $this->pm_slug,
                            'eep-ppc-window-focus'
                        )
                    ),
                    'eep_ppc_processing_message',
                    'eep-ppc-processing-message'
                ),
                'eep_ppc_processing_' . $this->pm_slug,
                'eep-ppc-processing'
            )
        );
    }


    /**
     * HTML for the disconnect warning dialog.
     *
     * @return EE_Form_Section_Base
     */
    public function disconnectDialog(): EE_Form_Section_Base
    {
        $message = esc_html__(
            'Disconnecting your PayPal account will prevent you from offering PayPal services and products on your website.',
            'event_espresso'
        );
        return new EE_Form_Section_HTML(
            EEH_HTML::div(
                EEH_HTML::strong(
                    $message,
                    'eep_ppc_disconnect_dialog_txt_' . $this->pm_slug,
                    'eep-ppc-disconnect-dialog-txt'
                ) .
                EEH_HTML::div(
                    EEH_HTML::link(
                        '',
                        'Cancel',
                        'cancel, go back',
                        'eep_ppc_disconnect_cancel_' . $this->pm_slug,
                        'eep-ppc-disconnect-cancel button button--secondary'
                    ) .
                    EEH_HTML::link(
                        '',
                        'Disconnect',
                        'ok, continue',
                        'eep_ppc_disconnect_ok_' . $this->pm_slug,
                        'eep-ppc-disconnect-ok button button--primary-alt'
                    ),
                    '',
                    'eep-ppc-dialog-yes-no'
                ),
                'eep_paypal_disconnect_dialog_' . $this->pm_slug
            )
        );
    }
}
