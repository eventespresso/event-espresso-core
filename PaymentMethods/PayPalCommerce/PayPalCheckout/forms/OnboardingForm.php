<?php

namespace EventEspresso\PaymentMethods\PayPalCommerce\PayPalCheckout\forms;

use EE_Form_Section_Base;
use EED_PayPalOnboard;
use EEM_Payment_Method;
use EE_Admin_Two_Column_Layout;
use EE_Error;
use EE_Form_Section_HTML;
use EE_Form_Section_Proper;
use EE_Payment_Method;
use EE_PMT_Base;
use EE_Simple_HTML_Validation_Strategy;
use EEH_HTML;
use EventEspresso\PaymentMethods\PayPalCommerce\domain\Domain;
use EventEspresso\PaymentMethods\PayPalCommerce\tools\extra_meta\PayPalExtraMetaManager;
use Exception;

/**
 * Class OnboardingForm
 *
 * @package     Event Espresso
 * @subpackage  eea-paypal-commerce
 * @author      Nazar Kolivoshka
 */
class OnboardingForm extends EE_Form_Section_Proper
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
    protected $onboard_btn_text = '';

    /**
     *  PayPal Onboarding button in sandbox mode text.
     *
     * @var string
     */
    protected $sandbox_btn_text = '';

    /**
     *  PayPal Onboarding section sandbox mode text.
     *
     * @var string
     */
    protected $authed_sandbox_text = '';

    /**
     *  Options field header.
     *
     * @var string
     */
    protected $option_heading = '';

    /**
     *  Onboarding URL.
     *
     * @var string
     */
    protected $onboarding_url = '';


    /**
     * Class constructor.
     *
     * @param EE_PMT_Base       $pmt
     * @param EE_Payment_Method $payment_method
     * @throws EE_Error
     */
    public function __construct(EE_PMT_Base $pmt, EE_Payment_Method $payment_method)
    {
        $this->payment_method      = $pmt;
        $this->pm_instance         = $payment_method;
        $this->pm_slug             = $this->pm_instance->slug();
        $this->onboard_btn_text    = esc_html__('Connect with PayPal', 'event_espresso');
        $this->sandbox_btn_text    = esc_html__('Connect with PayPal (sandbox)', 'event_espresso');
        $this->authed_sandbox_text = esc_html__('(using sandbox credentials)', 'event_espresso');
        // Help tab link as icon.
        $this->option_heading = EEH_HTML::th(
            sprintf(
                esc_html__('PayPal Onboarding: %1$s', 'event_espresso'),
                $this->payment_method->get_help_tab_link()
            ),
            'eea_paypal_onboard_heading_' . $this->pm_slug,
            'eea-paypal-onboard-heading'
        );
        $options = [
            'html_id'               => $this->pm_slug . '_pp_commerce_form',
            'layout_strategy'       => new EE_Admin_Two_Column_Layout(),
            'validation_strategies' => [new EE_Simple_HTML_Validation_Strategy()],
            'subsections'           => $this->onboardSectionContents(),
        ];
        parent::__construct($options);
    }


    /**
     * Add the onboarding options section.
     *
     * @return array
     * @throws EE_Error
     */
    public function onboardSectionContents(): array
    {
        $subsections = [];
        // Get the Onboarding status.
        $is_onboard  = EED_PayPalOnboard::isOnboard($this->pm_instance);
        $subsections = $this->addOnboardButton($subsections, $is_onboard);
        $subsections = $this->addOffboardButton($subsections, $is_onboard);
        $subsections = $this->addPmSlugHolder($subsections);
        return $subsections;
    }


    /**
     * Add the onboarding button.
     *
     * @param array $subsections
     * @param bool  $is_onboard
     * @return array
     * @throws EE_Error
     */
    public function addOnboardButton(array $subsections, bool $is_onboard): array
    {
        // Prep the redirect link for the merchant if he is not onboard yet.
        $onboard_url = '';
        if (! $is_onboard) {
            $onboard_url = EED_PayPalOnboard::getSignUpLink($this->pm_instance);
        }
        $this->onboarding_url = $onboard_url ? $onboard_url . '?&displayMode=minibrowser' : '#';
        // Section to be displayed if not onboard.
        $subsections['paypal_onboard_btn'] = new EE_Form_Section_HTML(
            EEH_HTML::tr(
                $this->option_heading .
                EEH_HTML::td(
                    EEH_HTML::link(
                        $this->onboarding_url,
                        EEH_HTML::span($this->onboard_btn_text),
                        '',
                        'eea_paypal_onboard_btn_' . $this->pm_slug,
                        'eea-paypal-onboard-btn button button--primary',
                        '',
                        'target="_blank" data-paypal-onboard-complete="onboardedCallback" data-paypal-button="true"'
                        . ' data-ee-pm-slug=' . $this->pm_slug
                    )
                ),
                'eea_paypal_onboard_section_' . $this->pm_slug,
                'eea-onboard-section-' . $this->pm_slug,
                // Are we onboard ?
                $is_onboard ? 'display:none;' : ''
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
            $payer_id = PayPalExtraMetaManager::getPmOption($this->pm_instance, Domain::META_KEY_PAYER_ID) ?? '--';
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
                $this->option_heading
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
     * HTML for the disconnect warning dialog.
     *
     * @return EE_Form_Section_Base
     */
    public function disconnectDialogHtml(): EE_Form_Section_Base
    {
        $message = esc_html__(
            'Disconnecting your PayPal account will prevent you from offering PayPal services and products on your website.',
            'event_espresso'
        );
        return new EE_Form_Section_HTML(
            EEH_HTML::tr(
                EEH_HTML::td(
                    EEH_HTML::strong(
                        $message,
                        'eea_paypal_dialog_txt_' . $this->pm_slug,
                        'eea-paypal-dialog-txt'
                    ) .
                    EEH_HTML::link(
                        '',
                        'Cancel',
                        'cancel, go back',
                        'eea_paypal_dialog_cancel_' . $this->pm_slug,
                        'eea-paypal-dialog-cancel button button--secondary'
                    ) .
                    EEH_HTML::link(
                        '',
                        'Disconnect',
                        'ok, continue',
                        'eea_paypal_dialog_ok_' . $this->pm_slug,
                        'eea-paypal-dialog-ok button button--primary-alt'
                    )
                ),
                'eea_paypal_disconnect_dialog_' . $this->pm_slug
            )
        );
    }


    /**
     * Add JS needed for this form.
     * This is called automatically when displaying the form.
     *
     * @return void
     * @throws EE_Error
     */
    public function enqueue_js()
    {
        // Also tell the script about each instance of this PM.
        $pm_versions            = [];
        $active_payment_methods = EEM_Payment_Method::instance()->get_all_active(
            EEM_Payment_Method::scope_cart,
            [['PMD_slug' => ['LIKE', '%paypalcheckout%']]]
        );
        foreach ($active_payment_methods as $payment_method) {
            $pm_versions[ $payment_method->slug() ] = [
                'pm_slug' => $payment_method->slug(),
            ];
        }

        $parameters = [
            'onboard_btn_text'     => $this->onboard_btn_text,
            'sandbox_btn_text'     => $this->sandbox_btn_text,
            'sandbox_text'         => $this->authed_sandbox_text,
            'pm_versions'          => $pm_versions,
            'onboarding_url'       => $this->onboarding_url,
            'disconnect_dialog'    => $this->disconnectDialogHtml()->get_html(),
            'ee_default_styles'    => EE_ADMIN_URL . 'assets/ee-admin-page.css',
            'wp_stylesheet'        => includes_url('css/dashicons.min.css'),
            'can_disable_input'    => method_exists('EE_Form_Input_Base', 'isDisabled'),
            'connection_notice'    => esc_html__('Error while requesting the redirect URL.', 'event_espresso'),
            'error_response'       => esc_html__('Error response received', 'event_espresso'),
            'request_error'        => esc_html__(
                'Onboarding request Error. Please check the logs on the Payment Methods page.',
                'event_espresso'
            ),
            'unknown_container'    => esc_html__('Could not specify the parent form.', 'event_espresso'),
            'pm_nice_name'         => esc_html__('PayPal Payments', 'event_espresso'),
            'blocked_popup_notice' => esc_html__(
                'The authentication process could not be executed. Please allow window pop-ups in your browser for this website in order to process a successful authentication.',
                'event_espresso'
            ),
            'debug_is_on_notice'   => esc_html__(
                'The authentication with PayPal is in sandbox mode! If you wish to process real payments with this payment method, please Offboard and use live credentials to authenticate with PayPal.',
                'event_espresso'
            ),
            'debug_is_off_notice'  => esc_html__(
                'The authentication with PayPal is in Live mode! If you wish to test this payment method, please Offboard and use sandbox credentials to authenticate with PayPal.',
                'event_espresso'
            ),
            'refresh_alert'        => esc_html__(
                'There was an unexpected error. Please refresh the page and check the logs on the Payment Methods page.',
                'event_espresso'
            ),
        ];

        // Styles.
        wp_enqueue_style(
            'eea_paypal_onboard_form_styles',
            EEP_PAYPAL_COMMERCE_URL . 'assets' . DS . 'css' . DS . 'eea-paypal-onboard.css',
            [],
            filemtime(EEP_PAYPAL_COMMERCE_DIR . 'assets' . DS . 'css' . DS . 'eea-paypal-onboard.css')
        );

        // Scripts.
        wp_enqueue_script(
            'eea_paypal_onboard_form_scripts',
            EEP_PAYPAL_COMMERCE_URL . 'assets' . DS . 'js' . DS . 'eea-paypal-onboarding.js',
            [],
            filemtime(EEP_PAYPAL_COMMERCE_DIR . 'assets' . DS . 'js' . DS . 'eea-paypal-onboarding.js')
        );
        wp_enqueue_script(
            'eea_paypal_partner_script',
            'https://www.paypal.com/webapps/merchantboarding/js/lib/lightbox/partner.js',
            [],
            EVENT_ESPRESSO_VERSION
        );

        // Localize the script with some extra data.
        wp_localize_script('eea_paypal_onboard_form_scripts', 'eeaPPOnboardParameters', $parameters);

        parent::enqueue_js();
    }
}
