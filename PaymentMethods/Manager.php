<?php

namespace EventEspresso\PaymentMethods;

use EE_Error;
use EE_Payment_Method;
use EEM_Payment_Method;
use EventEspresso\core\domain\services\database\DbStatus;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\request\RequestInterface;
use ReflectionException;

/**
 * Class EventEspresso\PaymentMethods\Manager
 *
 * A payment method manager class, that loads and sets up PMs.
 *
 * @package     Event Espresso
 * @subpackage  payment-methods
 * @author      Nazar Kolivoshka
 */
class Manager
{
    /**
     * List of PMs that can be replaced with PP Commerce.
     * ['payment method name' => 'settings option']
     *
     * @var array $pms_can_hide
     */
    protected static array $pms_can_hide = [
        'paypal_express' => 'api_username',
        'paypal_pro'     => 'api_username',
        'aim'            => 'login_id',
    ];


    /**
     * Manager constructor.
     */
    public function __construct()
    {
        if (DbStatus::isOffline()) {
            return;
        }
        $this->loadPaymentMethods();
        if (is_admin()) {
            // Use only PayPal Commerce if it's a new setup.
            add_filter(
                'FHEE__Payments_Admin_Page___payment_methods_list__payment_methods',
                [__CLASS__, 'hidePaymentMethods']
            );
            // Payment methods related admin notices.
            add_action('admin_init', [__CLASS__, 'adminNotice']);
        }
    }


    /**
     * Load all payment methods that are in PaymentMethods folder.
     *
     * @return void
     */
    protected function loadPaymentMethods()
    {
        // Scan the PaymentMethods folder.
        $pms_list = glob(EE_PLUGIN_DIR_PATH . 'PaymentMethods/*', GLOB_ONLYDIR);
        // Filter the discovered PM list.
        $pms_list = apply_filters('FHEE__PaymentMethods__Manager__loadPaymentMethods__pms_list', $pms_list);
        // Clean from duplicates.
        $pms_list = array_unique($pms_list);
        foreach ($pms_list as $pm_path) {
            $this->registerPaymentMethod($pm_path);
        }
    }


    /**
     * Looks for the main payment method file and loads it.
     *
     * @param string $pm_path path to the payment method folder
     * @param string $file_ext
     * @param string $pm_namespace
     * @return boolean
     */
    public function registerPaymentMethod(
        string $pm_path,
        string $file_ext = '.php',
        string $pm_namespace = 'EventEspresso\PaymentMethods'
    ): bool {
        do_action('AHEE__PaymentMethods__Manager__registerPaymentMethod__start', $pm_path);
        // Separators should match.
        $pm_path = str_replace('/\\', '/', $pm_path) . DS;
        // Sanitize PM name.
        $module_dir = basename($pm_path);
        // Get class name.
        $pm_class_name = str_replace(' ', '_', $module_dir);
        // Check if file exists.
        if (! is_readable($pm_path . $pm_class_name . $file_ext)) {
            return false;
        }
        // Load the initial PM class.
        require_once($pm_path . DS . $pm_class_name . $file_ext);
        $pm_object = "$pm_namespace\\$pm_class_name";
        if (! class_exists($pm_object)) {
            return false;
        }
        $payment_menthod = new $pm_object();
        $payment_menthod->initialize();
        return true;
    }


    /**
     * Deactivate a few other PMs if it's a new setup. Use PP Commerce.
     *
     * @param array $pms_to_list
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function hidePaymentMethods(array $pms_to_list): array
    {
        $pms_can_hide = apply_filters(
            'FHEE__EventEspresso_PaymentMethods_Manager__hidePaymentMethods__pms_can_hide',
            self::$pms_can_hide
        );
        foreach ($pms_can_hide as $pm_name => $pm_option) {
            // Can we deregister this PM ?
            if (isset($pms_to_list[ $pm_name ]) && self::pmCanBeHidden($pm_name, $pm_option)) {
                unset($pms_to_list[ $pm_name ]);
            }
        }
        return $pms_to_list;
    }


    /**
     * Deregisters the provided payment method if not used.
     *
     * @param string $pm_name
     * @param string $pm_option
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function pmCanBeHidden(string $pm_name, string $pm_option): bool
    {
        $pm_to_hide = EEM_Payment_Method::instance()->get_one_by_slug($pm_name);
        $pm_active  = $pm_active_before = false;
        if ($pm_to_hide instanceof EE_Payment_Method) {
            $pm_active = $pm_to_hide->active();
            // Payment method used before ?
            $option = $pm_to_hide->get_extra_meta($pm_option, true, false);
            $pm_active_before = ! empty($option);
        }
        // If PM not used before and not active, deregister it.
        if (
            apply_filters(
                "FHEE__PaymentMethods__Manager__register_payment_methods__hide_$pm_name",
                ! $pm_active && ! $pm_active_before,
                $pm_name
            )
        ) {
            return true;
        }
        return false;
    }


    /**
     * Payment methods related admin notices.
     *
     * @return void
     */
    public static function adminNotice()
    {
        // Is this an EE admin page ?
        $request   = LoaderFactory::getLoader()->getShared(RequestInterface::class);
        $page_name = $request->getRequestParam('page');
        // Only show the notice on core EE pages
        if (! str_contains($page_name, 'espresso')) {
            return;
        }
        // Notice if one of the following payment methods is used: PayPal Express, PayPal Pro, Authorize.net AIM.
        try {
            $pp_commerce = EEM_Payment_Method::instance()->get_one_by_slug('paypalcheckout');
            // Don't show notice if PayPal Commerce is active.
            if ($pp_commerce instanceof EE_Payment_Method && $pp_commerce->active()) {
                return;
            }
            foreach (self::$pms_can_hide as $pm_name => $pm_option) {
                $payment_method = EEM_Payment_Method::instance()->get_one_by_slug($pm_name);
                if ($payment_method instanceof EE_Payment_Method && $payment_method->active()) {
                    add_action('admin_notices', [__CLASS__, 'usePayPalCommerceNotice']);
                    return;
                }
            }
        } catch (EE_Error | ReflectionException $e) {
            // No handling needed right now.
        }
    }


    /**
     * Recommend PayPal Commerce notice contents.
     *
     * @return void
     */
    public static function usePayPalCommerceNotice()
    {
        echo '
        <div class="notice ee-status-outline ee-status-outline--ok ee-status-bg--ok">
            <p class="big-text">
                <span class="dashicons dashicons-info"></span> &nbsp; '
                 . sprintf(
                     esc_html__(
                         'We recommend using our latest PayPal integration - %1$sPayPal Commerce%2$s payment method in place of PayPal Standard, PayPal Express and PayPal Pro.',
                         'event_espresso'
                     ),
                     '<strong>',
                     '</strong>'
                 ) . '
            </p>
        </div>';
    }


    /**
     * @return bool
     * @since  5.0.20.p
     */
    public static function verifySSL(): bool
    {
        static $verify_ssl = null;
        if ($verify_ssl === null) {
            $verify_ssl = (bool) apply_filters('FHEE__EventEspresso_PaymentMethods_Manager__verifySSL', true);
        }
        return (bool) $verify_ssl;
    }
}
