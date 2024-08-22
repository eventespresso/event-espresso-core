<?php

namespace EventEspresso\PaymentMethods;

use EE_Dependency_Map;
use EE_Error;
use EEH_Autoloader;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\modules\LegacyModulesManager;

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
    public function __construct()
    {
    }


    /**
     * Register with EE and load this payment method dependencies.
     *
     * @return void
     * @throws EE_Error
     */
    public function initialize()
    {
        $this->registerDependencies();
        // Register payment method through a legacy manager.
        add_filter(
            'FHEE__EE_Payment_Method_Manager__register_payment_methods__payment_methods_to_register',
            [__CLASS__, 'injectPaymentMethod']
        );
        // Load modules.
        /** @var LegacyModulesManager $legacy_modules_manager */
        $legacy_modules_manager = LoaderFactory::getShared(LegacyModulesManager::class);
        $legacy_modules_manager->registerModule(__DIR__ . '/modules/EED_PayPalCommerce.module.php');
        $legacy_modules_manager->registerModule(__DIR__ . '/modules/EED_PayPalOnboard.module.php');

        // Setup auto loaders.
        EEH_Autoloader::instance()->register_autoloader([
            'SettingsForm'   => EEP_PAYPAL_COMMERCE_PATH . 'forms/SettingsForm.php',
            'OnboardingForm' => EEP_PAYPAL_COMMERCE_PATH . 'forms/OnboardingForm.php',
            'BillingForm'    => EEP_PAYPAL_COMMERCE_PATH . 'forms/BillingForm.php',
        ]);
    }


    /**
     * Add this payment to the list of PMs to be registered.
     *
     * @param array $pms_to_register
     * @return array
     */
    public static function injectPaymentMethod(array $pms_to_register): array
    {
        $pms_to_register[] = EEP_PAYPAL_COMMERCE_PATH;
        return $pms_to_register;
    }


    /**
     * Register class dependencies.
     *
     * @return void
     * @since 5.0.22.p
     */
    protected function registerDependencies(): void
    {
        EE_Dependency_Map::instance()->registerDependencies(
            'EventEspresso\PaymentMethods\PayPalCommerce\api\orders\CreateOrder',
            [
                null,
                null,
                null,
                'EventEspresso\core\domain\services\capabilities\FeatureFlags' => EE_Dependency_Map::load_from_cache,
            ]
        );
        EE_Dependency_Map::instance()->registerDependencies(
            'EventEspresso\PaymentMethods\PayPalCommerce\tools\fees\PartnerPaymentFees',
            [
                'EventEspresso\core\services\payments\PaymentProcessorFees' => EE_Dependency_Map::load_from_cache,
            ]
        );
    }
}
