<?php

use EventEspresso\core\domain\entities\notifications\PersistentAdminNotice;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\interfaces\ResettableInterface;

/**
 * Class EE_Payment_Method_Manager
 * Used for finding all payment method types that can be defined.
 * Allows addons to easily add other payment methods
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Michael Nelson
 * @since         4.5
 */
class EE_Payment_Method_Manager implements ResettableInterface
{

    /**
     * prefix added to all payment method capabilities names
     */
    const   CAPABILITIES_PREFIX = 'ee_payment_method_';

    /**
     * @var EE_Payment_Method_Manager $_instance
     */
    private static $_instance;

    /**
     * @var boolean
     */
    protected $payment_method_caps_initialized = false;

    /**
     * @var array keys are class names without 'EE_PMT_', values are their filepaths
     */
    protected $_payment_method_types = array();

    /**
     * @var EE_PMT_Base[]
     */
    protected $payment_method_objects = array();


    /**
     * EE_Payment_Method_Manager constructor.
     *
     * @throws EE_Error
     * @throws DomainException
     */
    public function __construct()
    {
        // if in admin lets ensure caps are set.
        if (is_admin()) {
            $this->_register_payment_methods();
            // set them immediately
            $this->initializePaymentMethodCaps();
            // plus any time they get reset
            add_filter(
                'FHEE__EE_Capabilities__addCaps__capabilities_to_add',
                array($this, 'addPaymentMethodCapsDuringReset')
            );
        }
    }


    /**
     * @singleton method used to instantiate class object
     * @return EE_Payment_Method_Manager instance
     * @throws DomainException
     * @throws EE_Error
     */
    public static function instance()
    {
        // check if class object is instantiated, and instantiated properly
        if (! self::$_instance instanceof EE_Payment_Method_Manager) {
            EE_Registry::instance()->load_lib('PMT_Base');
            self::$_instance = new self();
        }
        return self::$_instance;
    }


    /**
     * Resets the instance and returns a new one
     *
     * @return EE_Payment_Method_Manager
     * @throws DomainException
     * @throws EE_Error
     */
    public static function reset()
    {
        self::$_instance = null;
        return self::instance();
    }


    /**
     * If necessary, re-register payment methods
     *
     * @param boolean $force_recheck whether to recheck for payment method types,
     *                               or just re-use the PMTs we found last time we checked during this request (if
     *                               we have not yet checked during this request, then we need to check anyways)
     */
    public function maybe_register_payment_methods($force_recheck = false)
    {
        if (! $this->_payment_method_types || $force_recheck) {
            $this->_register_payment_methods();
        }
    }


    /**
     * register_payment_methods
     *
     * @return array
     */
    protected function _register_payment_methods()
    {
        // grab list of installed modules
        $pm_to_register = glob(EE_PAYMENT_METHODS . '*', GLOB_ONLYDIR);
        // filter list of modules to register
        $pm_to_register = apply_filters(
            'FHEE__EE_Payment_Method_Manager__register_payment_methods__payment_methods_to_register',
            $pm_to_register
        );
        // remove any duplicates if that should happen for some reason
        $pm_to_register = array_unique($pm_to_register);
        // loop through folders
        foreach ($pm_to_register as $pm_path) {
            $this->register_payment_method($pm_path);
        }
        do_action('FHEE__EE_Payment_Method_Manager__register_payment_methods__registered_payment_methods');
        // filter list of installed modules
        // keep them organized alphabetically by the payment method type's name
        ksort($this->_payment_method_types);
        return apply_filters(
            'FHEE__EE_Payment_Method_Manager__register_payment_methods__installed_payment_methods',
            $this->_payment_method_types
        );
    }


    /**
     * register_payment_method- makes core aware of this payment method
     *
     * @param string $payment_method_path - full path up to and including payment method folder
     * @return boolean
     */
    public function register_payment_method($payment_method_path = '')
    {
        do_action('AHEE__EE_Payment_Method_Manager__register_payment_method__begin', $payment_method_path);
        $module_ext = '.pm.php';
        // make all separators match
        $payment_method_path = rtrim(str_replace('/\\', DS, $payment_method_path), DS);
        // grab and sanitize module name
        $module_dir = basename($payment_method_path);
        // create class name from module directory name
        $module = str_replace(array('_', ' '), array(' ', '_'), $module_dir);
        // add class prefix
        $module_class = 'EE_PMT_' . $module;
        // does the module exist ?
        if (! is_readable($payment_method_path . DS . $module_class . $module_ext)) {
            $msg = sprintf(
                esc_html__(
                    'The requested %s payment method file could not be found or is not readable due to file permissions.',
                    'event_espresso'
                ),
                $module
            );
            EE_Error::add_error($msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__);
            return false;
        }
        // load the module class file
        require_once($payment_method_path . DS . $module_class . $module_ext);
        // verify that class exists
        if (! class_exists($module_class)) {
            $msg = sprintf(
                esc_html__('The requested %s module class does not exist.', 'event_espresso'),
                $module_class
            );
            EE_Error::add_error($msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__);
            return false;
        }
        // add to array of registered modules
        $this->_payment_method_types[ $module ] = $payment_method_path . DS . $module_class . $module_ext;
        ksort($this->_payment_method_types);
        return true;
    }


    /**
     * Checks if a payment method has been registered, and if so includes it
     *
     * @param string  $payment_method_name like 'PayPal_Pro', (ie class name without the prefix 'EEPM_')
     * @param boolean $force_recheck       whether to force re-checking for new payment method types
     * @return boolean
     */
    public function payment_method_type_exists($payment_method_name, $force_recheck = false)
    {
        if ($force_recheck
            || ! is_array($this->_payment_method_types)
            || ! isset($this->_payment_method_types[ $payment_method_name ])
        ) {
            $this->maybe_register_payment_methods($force_recheck);
        }
        if (isset($this->_payment_method_types[ $payment_method_name ])) {
            require_once($this->_payment_method_types[ $payment_method_name ]);
            return true;
        }
        return false;
    }


    /**
     * Returns all the class names of the various payment method types
     *
     * @param boolean $with_prefixes TRUE: get payment method type class names; false just their 'names'
     *                               (what you'd find in wp_esp_payment_method.PMD_type)
     * @param boolean $force_recheck whether to force re-checking for new payment method types
     * @return array
     */
    public function payment_method_type_names($with_prefixes = false, $force_recheck = false)
    {
        $this->maybe_register_payment_methods($force_recheck);
        if ($with_prefixes) {
            $classnames = array_keys($this->_payment_method_types);
            $payment_methods = array();
            foreach ($classnames as $classname) {
                $payment_methods[] = $this->payment_method_class_from_type($classname);
            }
            return $payment_methods;
        }
        return array_keys($this->_payment_method_types);
    }


    /**
     * Gets an object of each payment method type, none of which are bound to a
     * payment method instance
     *
     * @param boolean $force_recheck whether to force re-checking for new payment method types
     * @return EE_PMT_Base[]
     */
    public function payment_method_types($force_recheck = false)
    {
        if ($force_recheck || empty($this->payment_method_objects)) {
            $this->maybe_register_payment_methods($force_recheck);
            foreach ($this->payment_method_type_names(true) as $classname) {
                if (! isset($this->payment_method_objects[ $classname ])) {
                    $this->payment_method_objects[ $classname ] = new $classname;
                }
            }
        }
        return $this->payment_method_objects;
    }


    /**
     * Changes the payment method's class name into the payment method type's name
     * (as used on the payment method's table's PMD_type field)
     *
     * @param string $classname
     * @return string
     */
    public function payment_method_type_sans_class_prefix($classname)
    {
        return str_replace('EE_PMT_', '', $classname);
    }


    /**
     * Does the opposite of payment-method_type_sans_prefix
     *
     * @param string $type
     * @return string
     */
    public function payment_method_class_from_type($type)
    {
        return 'EE_PMT_' . $type;
    }


    /**
     * Activates a payment method of the given type.
     *
     * @param string $payment_method_type the PMT_type; for EE_PMT_Invoice this would be 'Invoice'
     * @return EE_Payment_Method
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function activate_a_payment_method_of_type($payment_method_type)
    {
        $this->maybe_register_payment_methods();
        $payment_method = EEM_Payment_Method::instance()->get_one_of_type($payment_method_type);
        if (! $payment_method instanceof EE_Payment_Method) {
            $pm_type_class = $this->payment_method_class_from_type($payment_method_type);
            if (class_exists($pm_type_class)) {
                /** @var $pm_type_obj EE_PMT_Base */
                $pm_type_obj = new $pm_type_class;
                $payment_method = EEM_Payment_Method::instance()->get_one_by_slug($pm_type_obj->system_name());
                if (! $payment_method) {
                    $payment_method = $this->create_payment_method_of_type($pm_type_obj);
                }
                $payment_method->set_type($payment_method_type);
                $this->initialize_payment_method($payment_method);
            } else {
                throw new EE_Error(
                    sprintf(
                        esc_html__(
                            'There is no payment method of type %1$s, so it could not be activated',
                            'event_espresso'
                        ),
                        $pm_type_class
                    )
                );
            }
        }
        $payment_method->set_active();
        $payment_method->save();
        /** @type EE_Message_Resource_Manager $message_resource_manager */
        // if this was the invoice message type, make sure users can view their invoices
        if ($payment_method->type() === 'Invoice'
            && (
            ! EEH_MSG_Template::is_mt_active('invoice')
            )
        ) {
            $message_resource_manager = EE_Registry::instance()->load_lib('Message_Resource_Manager');
            /** @type EE_Message_Resource_Manager $message_resource_manager */
            $message_resource_manager->ensure_message_type_is_active('invoice', 'html');
            new PersistentAdminNotice(
                'invoice_pm_requirements_notice',
                sprintf(
                    esc_html__(
                        'The Invoice payment method has been activated. It requires the %1$sinvoice message%2$s type to be active, so it was automatically activated for you.',
                        'event_espresso'
                    ),
                    '<a href="' . admin_url('admin.php?page=espresso_messages&action=settings') . '">',
                    '</a>'
                ),
                true
            );
        }
        return $payment_method;
    }


    /**
     * Creates a payment method of the specified type. Does not save it.
     *
     * @global WP_User    $current_user
     * @param EE_PMT_Base $pm_type_obj
     * @return EE_Payment_Method
     * @throws EE_Error
     */
    public function create_payment_method_of_type($pm_type_obj)
    {
        global $current_user;
        $payment_method = EE_Payment_Method::new_instance(
            array(
                'PMD_type'       => $pm_type_obj->system_name(),
                'PMD_name'       => $pm_type_obj->defaultFrontendName(),
                'PMD_admin_name' => $pm_type_obj->pretty_name(),
                'PMD_slug'       => $pm_type_obj->system_name(),// automatically converted to slug
                'PMD_wp_user'    => $current_user->ID,
                'PMD_order'      => EEM_Payment_Method::instance()->count(
                    array(array('PMD_type' => array('!=', 'Admin_Only')))
                ) * 10,
            )
        );
        return $payment_method;
    }


    /**
     * Sets the initial payment method properties (including extra meta)
     *
     * @param EE_Payment_Method $payment_method
     * @return EE_Payment_Method
     * @throws EE_Error
     */
    public function initialize_payment_method($payment_method)
    {
        $pm_type_obj = $payment_method->type_obj();
        $payment_method->set_description($pm_type_obj->default_description());
        if (! $payment_method->button_url()) {
            $payment_method->set_button_url($pm_type_obj->default_button_url());
        }
        // now add setup its default extra meta properties
        $extra_metas = $pm_type_obj->settings_form()->extra_meta_inputs();
        if (! empty($extra_metas)) {
            // verify the payment method has an ID before adding extra meta
            if (! $payment_method->ID()) {
                $payment_method->save();
            }
            foreach ($extra_metas as $meta_name => $input) {
                $payment_method->update_extra_meta($meta_name, $input->raw_value());
            }
        }
        return $payment_method;
    }


    /**
     * Makes sure the payment method is related to the specified payment method
     *
     * @deprecated in 4.9.40 because the currency payment method table is being deprecated
     * @param EE_Payment_Method $payment_method
     * @return EE_Payment_Method
     * @throws EE_Error
     */
    public function set_usable_currencies_on_payment_method($payment_method)
    {
        EE_Error::doing_it_wrong(
            'EE_Payment_Method_Manager::set_usable_currencies_on_payment_method',
            esc_html__(
                'We no longer define what currencies are usable by payment methods. Its not used nor efficient.',
                'event_espresso'
            ),
            '4.9.40'
        );
        return $payment_method;
    }


    /**
     * Deactivates a payment method of the given payment method slug.
     *
     * @param string $payment_method_slug The slug for the payment method to deactivate.
     * @return int count of rows updated.
     * @throws EE_Error
     */
    public function deactivate_payment_method($payment_method_slug)
    {
        EE_Log::instance()->log(
            __FILE__,
            __FUNCTION__,
            sprintf(
                esc_html__(
                    'Payment method with slug %1$s is being deactivated by site admin',
                    'event_espresso'
                ),
                $payment_method_slug
            ),
            'payment_method_change'
        );
        $count_updated = EEM_Payment_Method::instance()->update(
            array('PMD_scope' => array()),
            array(array('PMD_slug' => $payment_method_slug))
        );
        do_action(
            'AHEE__EE_Payment_Method_Manager__deactivate_payment_method__after_deactivating_payment_method',
            $payment_method_slug,
            $count_updated
        );
        return $count_updated;
    }


    /**
     * initializes payment method access caps via EE_Capabilities::init_role_caps()
     * upon EE_Payment_Method_Manager construction
     *
     * @throws EE_Error
     * @throws DomainException
     */
    protected function initializePaymentMethodCaps()
    {
        // don't do this twice
        if ($this->payment_method_caps_initialized) {
            return;
        }
        EE_Capabilities::instance()->addCaps(
            $this->getPaymentMethodCaps()
        );
        $this->payment_method_caps_initialized = true;
    }


    /**
     * array  of dynamic payment method access caps.
     * at the time of writing, october 20 2014, these are the caps added:
     *  ee_payment_method_admin_only
     *  ee_payment_method_aim
     *  ee_payment_method_bank
     *  ee_payment_method_check
     *  ee_payment_method_invoice
     *  ee_payment_method_mijireh
     *  ee_payment_method_paypal_pro
     *  ee_payment_method_paypal_standard
     * Any other payment methods added to core or via addons will also get
     * their related capability automatically added too, so long as they are
     * registered properly using EE_Register_Payment_Method::register()
     *
     * @return array
     * @throws DomainException
     */
    protected function getPaymentMethodCaps()
    {
        $caps = array();
        foreach ($this->payment_method_type_names() as $payment_method_name) {
            $caps = $this->addPaymentMethodCap($payment_method_name, $caps);
        }
        return $caps;
    }


    /**
     * @param string $payment_method_name
     * @param array  $payment_method_caps
     * @param string $role
     * @return array
     * @throws DomainException
     */
    public function addPaymentMethodCap($payment_method_name, array $payment_method_caps, $role = 'administrator')
    {
        if (empty($payment_method_name)) {
            throw new DomainException(
                esc_html__(
                    'The name of a payment method must be specified to add capabilities.',
                    'event_espresso'
                )
            );
        }
        if (empty($role)) {
            throw new DomainException(
                sprintf(
                    esc_html__(
                        'No role was supplied while trying to add capabilities for the %1$s payment method.',
                        'event_espresso'
                    ),
                    $payment_method_name
                )
            );
        }
        if (! isset($payment_method_caps[ $role ])) {
            $payment_method_caps[ $role ] = array();
        }
        $payment_method_caps[ $role ][] = EE_Payment_Method_Manager::CAPABILITIES_PREFIX
                                          . strtolower($payment_method_name);
        return $payment_method_caps;
    }


    /**
     * callback for FHEE__EE_Capabilities__init_role_caps__caps_map filter
     * to add dynamic payment method access caps when capabilities are reset
     * (or if that filter is called and PM caps are not already set)
     *
     * @param array $caps capabilities being filtered
     * @param bool  $reset
     * @return array
     * @throws DomainException
     */
    public function addPaymentMethodCapsDuringReset(array $caps, $reset = false)
    {
        if ($reset || ! $this->payment_method_caps_initialized) {
            $this->payment_method_caps_initialized = true;
            $caps = array_merge_recursive($caps, $this->getPaymentMethodCaps());
        }
        return $caps;
    }


    /**
     * @deprecated 4.9.42
     * @param $caps
     * @return mixed
     */
    public function add_payment_method_caps($caps)
    {
        return $caps;
    }
}
