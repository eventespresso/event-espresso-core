<?php

namespace EventEspresso\PaymentMethods;

use EE_Config;
use EE_Error;
use EEH_Autoloader;

define('EEP_PAYPAL_COMMERCE_DIR', __DIR__ . DS);
define('EEP_PAYPAL_COMMERCE_PATH', __DIR__ . DS . 'PayPalCheckout' . DS);
define('EEP_PAYPAL_COMMERCE_URL', plugin_dir_url(__FILE__));

/**
 * Class PayPalCommerce
 *
 * @package     Event Espresso
 * @subpackage  payment-methods
 * @author      Nazar Kolivoshka
 */
class PayPalCommerce
{
    /**
     * PayPalCommerce constructor.
     *
     * @throws EE_Error
     */
    public function __construct()
    {
        $this->load();
    }


    /**
     * Register with EE and load this payment method dependencies.
     *
     * @return void
     * @throws EE_Error
     */
    public function load()
    {
        // Register payment method through a legacy manager.
        add_filter(
            'FHEE__EE_Payment_Method_Manager__register_payment_methods__payment_methods_to_register',
            [__CLASS__, 'injectPaymentMethod'],
            10
        );

        // Load modules.
        EE_Config::register_module(__DIR__ . DS . 'modules' . DS . 'EED_PayPalCommerce.module.php');
        EE_Config::register_module(__DIR__ . DS . 'modules' . DS . 'EED_PayPalOnboard.module.php');
        // Setup auto loaders.
        EEH_Autoloader::instance()->register_autoloader([
            'SettingsForm'   => EEP_PAYPAL_COMMERCE_PATH . 'forms' . DS . 'SettingsForm.php',
            'OnboardingForm' => EEP_PAYPAL_COMMERCE_PATH . 'forms' . DS . 'OnboardingForm.php',
            'BillingForm'    => EEP_PAYPAL_COMMERCE_PATH . 'forms' . DS . 'BillingForm.php',
        ]);
    }


    /**
     * Add this payment to the list of PMs to be registered.
     *
     * @param array $pms_to_register
     * @return array
     */
    public static function injectPaymentMethod($pms_to_register)
    {
        $pms_to_register[] = EEP_PAYPAL_COMMERCE_PATH;
        return $pms_to_register;
    }
}
