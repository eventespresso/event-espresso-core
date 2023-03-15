<?php

use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\request\DataType;
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
            [__CLASS__, 'refundNotice'],
            10,
            1
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
    public function generate_new_billing_form(EE_Transaction $transaction = null, $extra_args = [])
    {
        $options = array_merge(
            ['transaction' => $transaction, 'template_path' => $this->_template_path],
            $extra_args
        );
        return new BillingForm($this->_pm_instance, $options);
    }


    /**
     * Adds PM info to the help tab.
     *
     * @return array
     * @see EE_PMT_Base::help_tabs_config()
     */
    public function help_tabs_config()
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
            ),
            []
        );
        echo $html;
    }
}
