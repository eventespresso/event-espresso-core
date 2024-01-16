<?php

namespace EventEspresso\PaymentMethods\PayPalCommerce\PayPalCheckout\forms;

use EED_PayPalOnboard;
use EEM_Payment_Method;
use EE_Admin_Two_Column_Layout;
use EE_Error;
use EE_Form_Section_Proper;
use EE_Payment_Method;
use EE_PMT_Base;
use EE_Simple_HTML_Validation_Strategy;
use ReflectionException;

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
     *  Payment method slug.
     *
     * @var EE_PMT_Base|null
     */
    protected $pm_slug = null;

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
     *  Onboarding form html entities object.
     *
     * @var OnboardingFormHtml|null
     */
    protected $form_html = null;


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
        $this->form_html           = new OnboardingFormHtml($pmt, $payment_method);
        // Help tab link as icon.
        $this->option_heading = $this->form_html->getHeader();
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
     */
    public function onboardSectionContents(): array
    {
        $subsections = [];
        // Get the Onboarding status.
        $is_onboard  = EED_PayPalOnboard::isOnboard($this->pm_instance);
        $subsections = $this->form_html->addOnboardButton($subsections, $is_onboard);
        $subsections = $this->form_html->addOffboardButton($subsections, $is_onboard);
        return $this->form_html->addPmSlugHolder($subsections);
    }


    /**
     * Add JS needed for this form.
     * This is called automatically when displaying the form.
     *
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
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
        $countries_iso = ["US", "AU", "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU",
                          "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE"];
        $parameters = [
            'onboard_btn_text'     => $this->form_html->onboard_btn_text,
            'sandbox_btn_text'     => $this->form_html->sandbox_btn_text,
            'sandbox_text'         => $this->form_html->authed_sandbox_text,
            'pm_versions'          => $pm_versions,
            'onboarding_url'       => $this->onboarding_url,
            'supported_countries'  => $countries_iso,
            'connect_dialog'       => $this->form_html->connectDialog()->get_html(),
            'disconnect_dialog'    => $this->form_html->disconnectDialog()->get_html(),
            'processing_mask'      => $this->form_html->processingMask()->get_html(),
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
            'pm_nice_name'         => esc_html__('PayPal Commerce', 'event_espresso'),
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
            EVENT_ESPRESSO_VERSION
        );
        // Scripts.
        wp_enqueue_script(
            'eea_paypal_onboard_form_scripts',
            EEP_PAYPAL_COMMERCE_URL . 'assets' . DS . 'js' . DS . 'eea-paypal-onboarding.js',
            [],
            EVENT_ESPRESSO_VERSION
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
