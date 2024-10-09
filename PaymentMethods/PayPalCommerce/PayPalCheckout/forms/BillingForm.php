<?php

namespace EventEspresso\PaymentMethods\PayPalCommerce\PayPalCheckout\forms;

use EE_Billing_Attendee_Info_Form;
use EE_Billing_Info_Form;
use EE_Error;
use EE_Form_Section_Base;
use EE_Form_Section_HTML;
use EE_Form_Section_Proper;
use EE_Hidden_Input;
use EE_Organization_Config;
use EE_Payment_Method;
use EE_Registry;
use EE_Submit_Input;
use EE_Template_Layout;
use EE_Text_Input;
use EE_Transaction;
use EED_PayPalCommerce;
use EEH_HTML;
use EEM_Payment_Method;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\request\Request;
use EventEspresso\PaymentMethods\PayPalCommerce\domain\Domain;
use EventEspresso\PaymentMethods\PayPalCommerce\tools\currency\CurrencyManager;
use EventEspresso\PaymentMethods\PayPalCommerce\tools\extra_meta\PayPalExtraMetaManager;
use Exception;
use ReflectionException;

/**
 * Class BillingForm
 * Form used on the checkout page.
 *
 * @package     Event Espresso
 * @subpackage  eea-paypal-commerce
 * @author      Nazar Kolivoshka
 */
class BillingForm extends EE_Billing_Attendee_Info_Form
{
    protected EE_Payment_Method $paypal_pmt;

    protected ?EE_Transaction $transaction = null;

    protected string $checkout_type;

    /**
     * Filepath to template files
     *
     * @var string $template_path
     */
    protected string $template_path;


    /**
     * Class constructor.
     *
     * @param EE_Payment_Method    $payment_method
     * @param array                $options
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function __construct(EE_Payment_Method $payment_method, array $options)
    {
        $this->paypal_pmt    = $payment_method;
        // Can't be too careful.
        $this->transaction   = $options['transaction'] ?? null;
        $this->template_path = $options['template_path'] ?? '';
        $this->checkout_type = $payment_method->get_extra_meta(
            Domain::META_KEY_CHECKOUT_TYPE,
            true,
            'express_checkout'
        );
        $pm_slug             = $payment_method->slug();
        $parameters          = array_replace_recursive(
            $options,
            [
                'name'        => 'PayPalCommerceBillingForm',
                'html_id'     => 'pp-' . $pm_slug . '-billing-form',
                'html_class'  => 'pp_commerce_billing_form',
                'subsections' => [
                    'eea_paypal_commerce_token' => new EE_Hidden_Input(
                        [
                            'html_id'   => 'eea-paypal-commerce-token',
                            'html_name' => 'EEA_paymentToken',
                            'default'   => '',
                        ]
                    ),
                    'pp_order_nonce'            => new EE_Hidden_Input(
                        [
                            'html_id'   => 'eea-' . $pm_slug . '-order-nonce',
                            'html_name' => 'pp_order_nonce',
                            'default'   => '',
                        ]
                    ),
                    'pp_order_id'               => new EE_Hidden_Input(
                        [
                            'html_id'   => 'eea-' . $pm_slug . '-order-id',
                            'html_name' => 'pp_order_id',
                            'default'   => '',
                        ]
                    ),
                    'pp_order_status'           => new EE_Hidden_Input(
                        [
                            'html_id'   => 'eea-' . $pm_slug . '-order-status',
                            'html_name' => 'pp_order_status',
                            'default'   => '',
                        ]
                    ),
                ],
            ]
        );
        // Add data tags to the PP script.
        add_filter('script_loader_tag', [$this, 'addDataTagsToScript'], 10, 2);
        parent::__construct($payment_method, $parameters);
        // Add and exclude other sections.
        $this->addPaymentSections();
        // Additional actions and/or filters.
        $this->loadActionsAndFilters();
    }


    /**
     * Add PayPal payment sections.
     *
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function addPaymentSections(): void
    {
        // Exclude the default billing form fields.
        $this->exclude(
            [
                'first_name',
                'last_name',
                'email',
            ]
        );
        // Add PayPal Hosted Fields.
        if (! empty($this->checkout_type) && $this->checkout_type !== 'express_checkout') {
            $this->addAdvancedCardFields();
        }
        // Add payment types separator, if both are enabled.
        if ($this->checkout_type === 'all') {
            $this->addTypesSeparator();
        }
        // Add PayPal Buttons section.
        if ($this->checkout_type !== 'ppcp') {
            $this->add_subsections(
                [
                    'paypal_commerce_pm_form' => $this->addPayPalCheckout(),
                ]
            );
        }
        // Exclude the rest billing form fields if the payment type is express checkout.
        if ($this->checkout_type === 'express_checkout') {
            $this->exclude(
                [
                    'address',
                    'address2',
                    'state',
                    'phone',
                    'city',
                    'country',
                    'zip',
                ]
            );
            // Remove the Info subsection.
            add_filter('FHEE__EE_Form_Section_Proper___construct__options_array', [$this, 'excludeInfoSubsection']);
        }
        $this->add_subsections(
            [
                'debug_content' => $this->addDebugContent($this->paypal_pmt),
            ]
        );
    }


    /**
     * Additional actions and/or filters.
     *
     * @return void
     */
    public function loadActionsAndFilters(): void
    {
        add_filter(
            'FHEE__EE_SPCO_Reg_Step_Payment_Options___get_billing_form_for_payment_method__billing_form',
            [__CLASS__, 'excludeBillingFormFields'],
            10,
            2
        );
    }


    /**
     * Filter out billing form fields if pay button was used.
     *
     * @param EE_Billing_Info_Form $billing_form
     * @param EE_Payment_Method    $payment_method
     * @return EE_Billing_Info_Form
     */
    public static function excludeBillingFormFields(
        EE_Billing_Info_Form $billing_form,
        EE_Payment_Method $payment_method
    ): EE_Billing_Info_Form {
        $request        = LoaderFactory::getShared(Request::class);
        $request_params = $request->requestParams();
        // Only the PPC billing form.
        if (! $billing_form instanceof BillingForm) {
            return $billing_form;
        }
        // Make sure the billing form subsections have correct names.
        $inputs = $billing_form->inputs_in_subsections();
        if (
            ! empty($request_params['process_form_submission'])
            && $request_params['process_form_submission'] === '1'
            && ! empty($request_params['eep_ppc_skip_form_validation'])
        ) {
            // Hide card info fields.
            $billing_form->exclude(
                [
                    'pp_name_on_card',
                    'address',
                    'address2',
                    'state',
                    'phone',
                    'city',
                    'country',
                    'zip',
                ]
            );
        }
        return $billing_form;
    }


    /**
     * Add advanced card & debit card fields.
     *
     * @return void
     * @throws EE_Error|ReflectionException
     */
    public function addAdvancedCardFields(): void
    {
        $pm_slug = $this->paypal_pmt->slug();
        $this->add_subsections(
            [
                'pp_card_number'     => new EE_Form_Section_HTML(
                    EEH_HTML::label(
                        esc_html__('Card Number', 'event_espresso'),
                        "$pm_slug-card-number-lbl",
                        "$pm_slug-card-fields",
                        "",
                        'for="' . $pm_slug . '-card-number"'
                    ) .
                    EEH_HTML::p(
                        "",
                        "$pm_slug-card-number",
                        "card_field $pm_slug-card-fields"
                    )
                ),
                'pp_expiration_date' => new EE_Form_Section_HTML(
                    EEH_HTML::label(
                        esc_html__('Expiration Date', 'event_espresso'),
                        "$pm_slug-expiration-date-lbl",
                        "$pm_slug-card-fields",
                        "",
                        'for="' . $pm_slug . '-expiration-date"'
                    ) .
                    EEH_HTML::p(
                        "",
                        "$pm_slug-expiration-date",
                        "card_field $pm_slug-card-fields"
                    )
                ),
                'pp_card_cvv'        => new EE_Form_Section_HTML(
                    EEH_HTML::label(
                        esc_html__('CVV', 'event_espresso'),
                        "$pm_slug-cvv-lbl",
                        "$pm_slug-card-fields",
                        "",
                        'for="' . $pm_slug . '-cvv"'
                    ) .
                    EEH_HTML::p(
                        "",
                        "$pm_slug-cvv",
                        "card_field $pm_slug-card-fields"
                    )
                ),
                'pp_name_on_card'    => new EE_Text_Input(
                    [
                        'html_label_text' => esc_html__('Name On Card', 'event_espresso'),
                        'html_id'         => $pm_slug . '-card-holder-name',
                        'html_name'       => 'card-holder-name',
                        'html_class'      => '',
                        'required'        => true,
                    ]
                ),
            ]
        );
        // Add the submit button at the end.
        $this->add_subsections(
            [
                'pp_cc_submit' => new EE_Submit_Input(
                    [
                        'html_label_text' => esc_html__('Submit', 'event_espresso'),
                        'html_id'         => $pm_slug,
                        'html_class'      => 'eep-ppc-btn',
                    ]
                ),
            ],
            'phone',
            false
        );
    }


    /**
     * Add advanced card & debit card fields.
     *
     * @return void
     * @throws EE_Error|ReflectionException
     */
    public function addTypesSeparator(): void
    {
        $this->add_subsections(
            [
                'pp_payment_types_separator' => new EE_Form_Section_HTML(
                    EEH_HTML::div(
                        EEH_HTML::div(
                            ' ',
                            'eep-' . $this->paypal_pmt->slug() . '-payments-separator',
                            'eep-ppc-separator-line eep-left-floating'
                        ) .
                        EEH_HTML::div(
                            esc_html__(' or ', 'event_espresso'),
                            'eep-' . $this->paypal_pmt->slug() . '-separator-text',
                            'eep-ppc-separator-text1 eep-mid-floating'
                        ) . EEH_HTML::div(
                            ' ',
                            'eep-' . $this->paypal_pmt->slug() . '-payments-separator',
                            'eep-ppc-separator-line eep-right-floating'
                        ),
                        'eep-ppc-separator-holder',
                        'eep-ppc-separator-holder'
                    )
                ),
            ]
        );
    }


    /**
     * Exclude the info subsection from the PPC checkout form.
     *
     * @param array $options_array
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function excludeInfoSubsection(array $options_array): array
    {
        if (
            ! empty($options_array['html_id'])
            && $options_array['html_id'] === 'spco-payment-method-info-' . $this->paypal_pmt->slug()
        ) {
            if (! empty($options_array['subsections']) && isset($options_array['subsections']['info'])) {
                unset($options_array['subsections']['info']);
            }
        }
        return $options_array;
    }


    /**
     * Possibly adds debug content to PayPal commerce billing form.
     *
     * @param EE_Payment_Method $paypal_pm
     * @return EE_Form_Section_Base
     * @throws EE_Error|ReflectionException
     */
    public function addDebugContent(EE_Payment_Method $paypal_pm): EE_Form_Section_Base
    {
        if ($paypal_pm->debug_mode()) {
            return new EE_Form_Section_Proper(
                [
                    'layout_strategy' => new EE_Template_Layout(
                        [
                            'layout_template_file' => $this->template_path . 'debugInfo.template.php',
                            'template_args'        => [],
                        ]
                    ),
                ]
            );
        }
        return new EE_Form_Section_HTML();
    }


    /**
     * Add PayPal checkout buttons.
     *
     * @return EE_Form_Section_Proper
     * @throws EE_Error
     * @throws ReflectionException
     * @throws Exception
     */
    public function addPayPalCheckout(): EE_Form_Section_Proper
    {
        $template_args['pm_slug']     = $this->paypal_pmt->slug();
        return new EE_Form_Section_Proper(
            [
                'layout_strategy' => new EE_Template_Layout(
                    [
                        'layout_template_file' => $this->template_path . 'paymentButtons.template.php',
                        'template_args'        => $template_args,
                    ]
                ),
            ]
        );
    }


    /**
     * Load scripts and localize data needed for this form.
     *
     * @param $tag
     * @param $handle
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function addDataTagsToScript($tag, $handle): string
    {
        if ($handle === 'eea_paypal_commerce_js_lib') {
            $bn_code  = PayPalExtraMetaManager::getPmOption($this->_pm_instance, Domain::META_KEY_BN_CODE);
            $response = EED_PayPalCommerce::requestClientToken($this->paypal_pmt);
            if (empty($response['client_token'])) {
                return $tag;
            }
            $client_token = $response['client_token'];
            $attributes   = " data-partner-attribution-id=\"$bn_code\" data-client-token=\"$client_token\"";
            $tag          = str_replace('></script>', $attributes . '></script>', $tag);
        }
        return $tag;
    }


    /**
     * Load scripts and localize data needed for this form.
     *
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     * @throws Exception
     */
    public function enqueue_js(): void
    {
        // Setup default values
        $client_id_key = Domain::META_KEY_CLIENT_ID;
        $merchant_id   = false;
        $funding_options = ['venmo', 'paylater'];

        // Override the above if thrid party integration
        if (EED_PayPalCommerce::isThirdParty($this->_pm_instance)) {
            $client_id_key = Domain::META_KEY_PARTNER_CLIENT_ID;
            $merchant_id   = PayPalExtraMetaManager::getPmOption(
                $this->_pm_instance,
                Domain::META_KEY_SELLER_MERCHANT_ID
            );
        }

        // Setup query args
        $url_params            = [
            'client-id'        => PayPalExtraMetaManager::getPmOption($this->_pm_instance, $client_id_key),
            'currency'         => CurrencyManager::currencyCode(),
            'components'       => implode(',', ['buttons','hosted-fields']),
            'intent'           => 'capture',
            'merchant-id'      => $merchant_id,
        ];

        // Which funding methods are active?
        $enabled_funding = $this->_pm_instance->get_extra_meta(Domain::META_KEY_FUNDING_OPTIONS, true, $funding_options);

        // Any funding method not enabled should be disabled.
        $disabled_funding = array_diff(
            $funding_options,
            $enabled_funding
        );

        // Any funding options enabled?
        if (count($enabled_funding) > 0) {
            $url_params['enable-funding'] = implode(',', $enabled_funding);
        }

        // Any funding options disabled?
        if (count($disabled_funding) > 0) {
            $url_params['disable-funding'] = implode(',', $disabled_funding);
        }

        // Enqueue the PayPal JS
        wp_enqueue_script(
            'eea_paypal_commerce_js_lib',
            add_query_arg($url_params, 'https://www.paypal.com/sdk/js'),
            [],
            null
        );

        wp_enqueue_script(
            'eea_paypal_commerce_js',
            EEP_PAYPAL_COMMERCE_URL . 'assets/js/paypal-commerce-payments.js',
            ['eea_paypal_commerce_js_lib'],
            EVENT_ESPRESSO_VERSION,
            true
        );
        // Styles.
        wp_enqueue_style(
            'eea_paypal_checkout_form_styles',
            EEP_PAYPAL_COMMERCE_URL . 'assets' . DS . 'css' . DS . 'eea-paypal-checkout.css',
            [],
            EVENT_ESPRESSO_VERSION
        );
        // Localize the script with our transaction data.
        $parameters = $this->localizeParameters();
        wp_localize_script('eea_paypal_commerce_js', 'eeaPPCommerceParameters', $parameters);
        parent::enqueue_js();
    }


    /**
     * Form and return PayPal commerce parameters for script localization.
     *
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     * @throws Exception
     */
    public function localizeParameters(): array
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
        // Convert money for a display format.
        $decimal_places = CurrencyManager::getDecimalPlaces();
        $org_country    = isset(EE_Registry::instance()->CFG->organization)
        && EE_Registry::instance()->CFG->organization instanceof EE_Organization_Config
            ? EE_Registry::instance()->CFG->organization->CNT_ISO
            : 'US';
        $transaction_id = $this->transaction instanceof EE_Transaction ? $this->transaction->ID() : 0;
        $currency_code  = CurrencyManager::currencyCode();
        return [
            'pm_versions'            => $pm_versions,
            'payment_currency'       => $currency_code,
            'checkout_type'          => $this->checkout_type,
            'currency_sign'          => EE_Registry::instance()->CFG->currency->sign,
            'pp_order_nonce'         => wp_create_nonce(Domain::CAPTURE_ORDER_NONCE_NAME),
            // The transaction ID is only used for logging errors.
            'txn_id'                 => $transaction_id,
            'org_country'            => $org_country,
            'decimal_places'         => $decimal_places,
            'site_name'              => get_bloginfo('name'),
            'active_states'          => EED_PayPalCommerce::getActiveStates(),
            'no_spco_error'          => esc_html__(
                'It appears the SDK script was not loaded properly! Please refresh the page and try again or contact support.',
                'event_espresso'
            ),
            'no_pm_error'            => esc_html__(
                'It appears that PayPal Commerce checkout JavaScript was not loaded properly! Please refresh the page and try again or contact support. PayPal Commerce payments can\'t be processed.',
                'event_espresso'
            ),
            'browser_not_supported'  => esc_html__(
                'It appears that this browser is not supported by PayPal scripts. We apologize, but PayPal payments won\'t work in this browser version.',
                'event_espresso'
            ),
            'get_token_error'        => esc_html__(
                'There was an error while trying to get the payment token. Please refresh the page and try again or contact support.',
                'event_espresso'
            ),
            'form_validation_notice' => esc_html__('Billing form information not valid.', 'event_espresso'),
            'no_verification_token'  => esc_html__('Missing the Verification token.', 'event_espresso'),
            'error_response'         => esc_html__('Error response received', 'event_espresso'),
            'payment_error'          => esc_html__(
                'There was an error with this payment. See the logs for details.',
                'event_espresso'
            ),
            'no_order_id'            => esc_html__('No Order ID found.', 'event_espresso'),
            'general_pp_error'       => esc_html__('PayPal form threw an error.', 'event_espresso'),
            'hf_render_error'        => esc_html__('Hosted fields could not be rendered!', 'event_espresso'),
            'pm_capture_error'       => esc_html__('Payment could not be captured!', 'event_espresso'),
            'not_acdc_eligible'      => esc_html__(
                'This merchant is not eligible for Advanced Card Fields checkout type.',
                'event_espresso'
            ),
        ];
    }
}
