<?php

namespace EventEspresso\PaymentMethods\PayPalCommerce\PayPalCheckout\forms;

use EE_Billing_Attendee_Info_Form;
use EE_Error;
use EE_Form_Section_Base;
use EE_Form_Section_HTML;
use EE_Form_Section_Proper;
use EE_Hidden_Input;
use EE_Organization_Config;
use EE_Payment_Method;
use EE_PMT_PayPalCheckout;
use EE_Registry;
use EE_Template_Layout;
use EE_Transaction;
use EEM_Payment_Method;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\PaymentMethods\PayPalCommerce\domain\Domain;
use EventEspresso\PaymentMethods\PayPalCommerce\tools\currency\CurrencyManager;
use EventEspresso\PaymentMethods\PayPalCommerce\tools\extra_meta\PayPalExtraMetaManager;
use Exception;
use InvalidArgumentException;
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
    /**
     * Filepath to template files
     *
     * @var @template_path
     */
    protected $template_path;

    /**
     * @var EE_Transaction
     */
    protected $transaction;

    /**
     * @var EE_PMT_PayPalCheckout
     */
    protected $paypal_pmt;


    /**
     * Class constructor.
     *
     * @param EE_Payment_Method $payment_method
     * @param array             $options
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws EE_Error
     */
    public function __construct(EE_Payment_Method $payment_method, array $options = [])
    {
        // Don't initiate if there's no transaction.
        if (isset($options['transaction']) && $options['transaction'] instanceof EE_Transaction) {
            if (! isset($options['template_path'])) {
                $this->throwError('template_path');
            }
            $this->paypal_pmt    = $payment_method;
            $this->transaction   = $options['transaction'];
            $this->template_path = $options['template_path'];
        }
        $pm_slug = $payment_method->slug();
        $parameters = array_replace_recursive(
            $options,
            [
                'name'        => 'PayPalCommerceBillingForm',
                'html_id'     => 'pp-' . $payment_method->slug() . '-billing-form',
                'html_class'  => 'pp_commerce_billing_form',
                'subsections' => [
                    'debug_content'             => $this->addDebugContent($payment_method),
                    'paypal_commerce_pm_form'   => $this->addPaymentButtons(),
                    'eea_paypal_commerce_token' => new EE_Hidden_Input(
                        [
                            'html_id'   => 'eea-paypal-commerce-token',
                            'html_name' => 'EEA_paymentToken',
                            'default'   => '',
                        ]
                    ),
                    'pp_order_nonce' => new EE_Hidden_Input(
                        [
                            'html_id'   => 'eea-' . $pm_slug . '-order-nonce',
                            'html_name' => 'pp_order_nonce',
                            'default'   => '',
                        ]
                    ),
                    'pp_order_id' => new EE_Hidden_Input(
                        [
                            'html_id'   => 'eea-' . $pm_slug . '-order-id',
                            'html_name' => 'pp_order_id',
                            'default'   => '',
                        ]
                    ),
                    'pp_order_status' => new EE_Hidden_Input(
                        [
                            'html_id'   => 'eea-' . $pm_slug . '-order-status',
                            'html_name' => 'pp_order_status',
                            'default'   => '',
                        ]
                    ),
                    'pp_order_amount' => new EE_Hidden_Input(
                        [
                            'html_id'   => 'eea-' . $pm_slug . '-order-amount',
                            'html_name' => 'pp_order_amount',
                            'default'   => '',
                        ]
                    ),
                ],
            ]
        );

        parent::__construct($payment_method, $parameters);
    }


    /**
     * Possibly adds debug content to PayPal commerce billing form.
     *
     * @param EE_Payment_Method $paypal_pm
     * @return EE_Form_Section_Base
     * @throws EE_Error
     */
    public function addDebugContent($paypal_pm)
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
     */
    public function addPaymentButtons()
    {
        $template_args = [
            // 'pm_slug' => $this->_pm_instance->slug(),
        ];
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
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     * @throws Exception
     */
    public function enqueue_js()
    {
        $client_id = PayPalExtraMetaManager::getPmOption($this->_pm_instance, Domain::META_KEY_CLIENT_ID);
        $currency  = CurrencyManager::currencyCode();
        // Scripts.
        $scripts_src = 'https://www.paypal.com/sdk/js?&client-id=' . $client_id . '&currency=' . $currency;
        wp_enqueue_script('eea_paypal_commerce_js_lib', $scripts_src, [], null);
        wp_enqueue_script(
            'eea_paypal_commerce_js',
            EEP_PAYPAL_COMMERCE_URL . 'assets/js/paypal-commerce-payments.js',
            [],
            filemtime(EEP_PAYPAL_COMMERCE_DIR . 'assets/js/paypal-commerce-payments.js'),
            true
        );
        // Localize the script with our transaction data.
        $parameters = $this->localizeParameters($client_id);
        wp_localize_script('eea_paypal_commerce_js', 'eeaPPCommerceParameters', $parameters);
        parent::enqueue_js();
    }


    /**
     * Get PayPal order ID if already created for this transaction.
     *
     * @param string $transaction_id
     * @return string
     */
    public function getPpOrderId($transaction_id)
    {
        try {
            $pp_order        = PayPalExtraMetaManager::getPmOption($this->paypal_pmt, Domain::META_KEY_LAST_ORDER);
            $pp_order_txn_id = isset($pp_order['ee_txn_id']) ? $pp_order['ee_txn_id'] : false;
            if ($pp_order_txn_id != $transaction_id) {
                // Old order data, delete it.
                PayPalExtraMetaManager::deletePmOption($this->paypal_pmt, Domain::META_KEY_LAST_ORDER);
                return '';
            }
        } catch (Exception $exception) {
            return '';
        }
        return isset($pp_order['id']) ? $pp_order['id'] : '';
    }


    /**
     * Form and return PayPal commerce parameters for script localization.
     *
     * @param string $client_id
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     * @throws Exception
     */
    public function localizeParameters($client_id)
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
            'client_id'              => $client_id,
            'payment_currency'       => $currency_code,
            'currency_sign'          => EE_Registry::instance()->CFG->currency->sign,
            'pp_order_id'            => $this->getPpOrderId($transaction_id),
            'pp_order_nonce'         => wp_create_nonce(Domain::CAPTURE_ORDER_NONCE_NAME),
            // The transaction ID is only used for logging errors.
            'txn_id'                 => $transaction_id,
            'org_country'            => $org_country,
            'decimal_places'         => $decimal_places,
            'site_name'              => get_bloginfo('name'),
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
            'error_response'         => esc_html__('Got an error response (AJAX)', 'event_espresso'),
            'payment_error'          => esc_html__(
                'There was an error with this payment. See the logs for details.',
                'event_espresso'
            ),
            'no_order_id'            => esc_html__('No Order ID found.', 'event_espresso'),
            'general_pp_error'       => esc_html__('PayPal form threw an error.', 'event_espresso'),
        ];
    }


    /**
     * Throw an EE error.
     *
     * @param string $error_name
     * @throws EE_Error
     */
    private function throwError($error_name)
    {
        $error_name = (string) $error_name;
        if ($error_name === 'template_path') {
            throw new EE_Error(
                sprintf(
                    esc_html__(
                        '%1$s instantiated without the required template_path. Please provide it in $2$s',
                        'event_espresso'
                    ),
                    __CLASS__,
                    '$options[\'template_path\']'
                )
            );
        }
    }
}
