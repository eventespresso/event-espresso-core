<?php

use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\request\DataType;
use EventEspresso\core\services\request\Request;
use EventEspresso\core\services\request\RequestInterface;
use EventEspresso\PaymentMethods\PayPalCommerce\PayPalCheckout\forms\BillingForm;
use EventEspresso\PaymentMethods\PayPalCommerce\PayPalCheckout\forms\SettingsForm;

/**
 * Class EE_PMT_PayPalCheckout
 *
 * @package     Event Espresso
 * @subpackage  eea-paypal-commerce
 * @author      Nazar Kolivoshka
 */
class EE_PMT_PayPalCheckout extends EE_PMT_Base
{
    /**
     * @param EE_Payment_Method|null $pm_instance
     * @throws ReflectionException
     * @throws EE_Error
     */
    public function __construct($pm_instance = null)
    {
        $this->_template_path       = dirname(__FILE__) . DS . 'templates' . DS;
        $this->_default_description = esc_html__('Please provide the following billing information.', 'event_espresso');
        $this->_default_button_url  = $this->file_url() . 'lib/default-cc-logo.png';
        $this->_pretty_name         = esc_html__('PayPal Commerce', 'event_espresso');
        $this->_cache_billing_form  = true;
        $this->_requires_https      = true;

        // Load gateway.
        require_once(
            EEP_PAYPAL_COMMERCE_PATH . 'EEG_PayPalCheckout.gateway.php'
        );
        $this->_gateway = new EEG_PayPalCheckout();

        // Display a refund message at transactions actions area.
        add_action(
            'AHEE__txn_admin_details_main_meta_box_txn_details__after_actions_buttons',
            [__CLASS__, 'refundNotice']
        );

        parent::__construct($pm_instance);
    }


    /**
     * Generate a new payment method settings form.
     *
     * @return EE_Payment_Method_Form
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function generate_new_settings_form()
    {
        // Settings form.
        $settings_form = new SettingsForm($this, $this->_pm_instance);
        // Filter the form contents.
        return apply_filters(
            'FHEE__EE_PMT_PayPalCheckout__generate_new_settings_form__form_filtering',
            $settings_form,
            $this,
            $this->_pm_instance
        );
    }


    /**
     * Creates a billing form for this payment method type.
     *
     * @param EE_Transaction|null $transaction
     * @param array|null          $extra_args
     * @return EE_Billing_Info_Form|null
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function generate_new_billing_form(EE_Transaction $transaction = null, ?array $extra_args = [])
    {
        $request        = LoaderFactory::getShared(Request::class);
        $request_params = $request->requestParams();
        // Return the default billing form for the postbox if this is a WP admin transaction info page.
        if (! empty($request_params['page']) && $request_params['page'] === 'espresso_transactions') {
            $default_form = new EE_Billing_Attendee_Info_Form($this->_pm_instance, $extra_args);
            $default_form->add_subsections(['credit_card' => new EE_Credit_Card_Input()]);
            return $default_form;
        }
        // Just in case this is used on other admin pages.
        if (empty($transaction) && ! empty($request_params['TXN_ID'])) {
            $txn_instance = EEM_Transaction::instance()->get_one_by_ID($request_params['TXN_ID']);
            $transaction  = $txn_instance instanceof EE_Transaction ? $txn_instance : null;
        }
        $options = array_merge(
            [
                'transaction'   => $transaction,
                'template_path' => $this->_template_path,
            ],
            $extra_args
        );
        return LoaderFactory::getNew(BillingForm::class, [$this->_pm_instance, $options]);
    }


    /**
     * Adds PM info to the help tab.
     *
     * @return array
     * @see EE_PMT_Base::help_tabs_config()
     */
    public function help_tabs_config(): array
    {
        return [
            $this->get_help_tab_name() => [
                'title'    => esc_html__('PayPal Commerce settings', 'event_espresso'),
                'filename' => 'pp-commerce-overview',
            ],
        ];
    }


    /**
     * Adds a refund related message section.
     *
     * @param bool $can_edit_payments Flag that tells if user can edit payments.
     * @access public
     * @return void
     */
    public static function refundNotice(bool $can_edit_payments)
    {
        if (! $can_edit_payments) {
            return;
        }
        $request = LoaderFactory::getLoader()->getShared(RequestInterface::class);
        $txn_id  = $request->getRequestParam('TXN_ID', 0, DataType::INT);
        try {
            $transaction = EEM_Transaction::instance()->get_one_by_ID($txn_id);
            if (! $transaction instanceof EE_Transaction) {
                return;
            }
            // Was this transaction paid using PayPal ?
            if (strpos((string) $transaction->payment_method(), 'PayPal Commerce') === false) {
                return;
            }
            // Try loading the template.
            EE_Registry::instance()->load_helper('Template');
        } catch (EE_Error | ReflectionException $e) {
            // Just return, adding nothing.
            return;
        }
        $html = EEH_Template::locate_template(
            apply_filters(
                'FHEEA__EE_PMT_PayPalCheckout__refundNotice',
                dirname(__FILE__) . DS . 'templates' . DS . 'apply-refund-notice.template.php'
            )
        );
        echo $html;
    }


    /**
     * Override the parent.
     *
     * @param EE_Transaction            $transaction
     * @param float|null                $amount
     * @param EE_Billing_Info_Form|null $billing_info
     * @param string|null               $return_url
     * @param string                    $fail_url
     * @param string                    $method
     * @param bool                      $by_admin
     * @return EE_Payment
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function process_payment(
        EE_Transaction $transaction,
        $amount = null,
        $billing_info = null,
        $return_url = null,
        $fail_url = '',
        $method = 'CART',
        $by_admin = false
    ): EE_Payment {
        // This payment should have been processed in the background, while the Order was created and charged.
        // So simply return the last payment. Unless it's somehow missing.
        $payment = $transaction->last_payment();
        if (empty($payment) || $payment->status() === EEM_Payment::status_id_failed) {
            // Then we try processing the payment as usual.
            return parent::process_payment(
                $transaction,
                $amount,
                $billing_info,
                $return_url,
                $fail_url,
                $method,
                $by_admin
            );
        }
        return $transaction->last_payment();
    }
}
