<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



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
class EE_Payment_Method_Manager
{

    /**
     *    instance of the EE_Payment_Method_Manager object
     *
     * @var    $_instance
     * @access    private
     */
    private static $_instance;

    /**
     * @var array keys are classnames without 'EE_PMT_', values are their filepaths
     */
    protected $_payment_method_types = array();



    /**
     * @singleton method used to instantiate class object
     * @access    public
     * @return EE_Payment_Method_Manager instance
     */
    public static function instance()
    {
        // check if class object is instantiated, and instantiated properly
        if ( ! self::$_instance instanceof EE_Payment_Method_Manager) {
            self::$_instance = new self();
        }
        EE_Registry::instance()->load_lib('PMT_Base');
        return self::$_instance;
    }



    /**
     * Resets the instance and returns a new one
     *
     * @return EE_Payment_Method_Manager
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
        if ( ! $this->_payment_method_types || $force_recheck) {
            $this->_register_payment_methods();
            //if in admin lets ensure caps are set.
            if (is_admin()) {
                add_filter('FHEE__EE_Capabilities__init_caps_map__caps', array($this, 'add_payment_method_caps'));
                EE_Registry::instance()->CAP->init_caps();
            }
        }
    }



    /**
     *        register_payment_methods
     *
     * @return array
     */
    protected function _register_payment_methods()
    {
        // grab list of installed modules
        $pm_to_register = glob(EE_PAYMENT_METHODS . '*', GLOB_ONLYDIR);
        // filter list of modules to register
        $pm_to_register = apply_filters('FHEE__EE_Payment_Method_Manager__register_payment_methods__payment_methods_to_register',
            $pm_to_register);
        // loop through folders
        foreach ($pm_to_register as $pm_path) {
            $this->register_payment_method($pm_path);
        }
        do_action('FHEE__EE_Payment_Method_Manager__register_payment_methods__registered_payment_methods');
        // filter list of installed modules
        //keep them organized alphabetically by the payment method type's name
        ksort($this->_payment_method_types);
        return apply_filters('FHEE__EE_Payment_Method_Manager__register_payment_methods__installed_payment_methods',
            $this->_payment_method_types);
    }



    /**
     *    register_payment_method- makes core aware of this payment method
     *
     * @access public
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
        // create classname from module directory name
        $module = str_replace(' ', '_', str_replace('_', ' ', $module_dir));
        // add class prefix
        $module_class = 'EE_PMT_' . $module;
        // does the module exist ?
        if ( ! is_readable($payment_method_path . DS . $module_class . $module_ext)) {
            $msg = sprintf(__('The requested %s payment method file could not be found or is not readable due to file permissions.',
                'event_espresso'), $module);
            EE_Error::add_error($msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__);
            return false;
        }
        if (WP_DEBUG === true) {
            EEH_Debug_Tools::instance()->start_timer();
        }
        // load the module class file
        require_once($payment_method_path . DS . $module_class . $module_ext);
        if (WP_DEBUG === true) {
            EEH_Debug_Tools::instance()->stop_timer("Requiring payment method $module_class");
        }
        // verify that class exists
        if ( ! class_exists($module_class)) {
            $msg = sprintf(__('The requested %s module class does not exist.', 'event_espresso'), $module_class);
            EE_Error::add_error($msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__);
            return false;
        }
        // add to array of registered modules
        $this->_payment_method_types[$module] = $payment_method_path . DS . $module_class . $module_ext;
        return true;
    }



    /**
     * Checks if a payment method has been registered, and if so includes it
     *
     * @param string  $payment_method_name like 'Paypal_Pro', (ie classname without the prefix 'EEPM_')
     * @param boolean $force_recheck       whether to force re-checking for new payment method types
     * @return boolean
     */
    public function payment_method_type_exists($payment_method_name, $force_recheck = false)
    {
        if (
            $force_recheck
            || ! is_array($this->_payment_method_types)
            || ! isset($this->_payment_method_types[$payment_method_name])
        ) {
            $this->maybe_register_payment_methods($force_recheck);
        }
        if (isset($this->_payment_method_types[$payment_method_name])) {
            require_once($this->_payment_method_types[$payment_method_name]);
            return true;
        } else {
            return false;
        }
    }



    /**
     * Returns all the classnames of the various payment method types
     *
     * @param boolean $with_prefixes TRUE: get payment method type classnames; false just their 'names'
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
        } else {
            return array_keys($this->_payment_method_types);
        }
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
        $this->maybe_register_payment_methods($force_recheck);
        $pmt_objs = array();
        foreach ($this->payment_method_type_names(true) as $classname) {
            $pmt_objs[] = new $classname;
        }
        return $pmt_objs;
    }



    /**
     * Changes the payment method's classname into the payment method type's name
     * (as used on the payment method's table's PMD_type field)
     *
     * @param string $classname
     * @return string
     */
    public function payment_method_type_sans_class_prefix($classname)
    {
        return str_replace("EE_PMT_", "", $classname);
    }



    /**
     * Does the opposite of payment-method_type_sans_prefix
     *
     * @param string $type
     * @return string
     */
    public function payment_method_class_from_type($type)
    {
        $this->maybe_register_payment_methods();
        return "EE_PMT_" . $type;
    }



    /**
     * Activates a payment method of the given type.
     *
     * @param string $payment_method_type the PMT_type; for EE_PMT_Invoice this would be 'Invoice'
     * @return \EE_Payment_Method
     * @throws \EE_Error
     */
    public function activate_a_payment_method_of_type($payment_method_type)
    {
        $payment_method = EEM_Payment_Method::instance()->get_one_of_type($payment_method_type);
        if ( ! $payment_method instanceof EE_Payment_Method) {
            $pm_type_class = $this->payment_method_class_from_type($payment_method_type);
            if (class_exists($pm_type_class)) {
                /** @var $pm_type_obj EE_PMT_Base */
                $pm_type_obj = new $pm_type_class;
                $payment_method = EEM_Payment_Method::instance()->get_one_by_slug($pm_type_obj->system_name());
                if ( ! $payment_method) {
                    $payment_method = $this->create_payment_method_of_type($pm_type_obj);
                }
                $payment_method->set_type($payment_method_type);
                $this->initialize_payment_method($payment_method);
            } else {
                throw new EE_Error(
                    sprintf(
                        __('There is no payment method of type %1$s, so it could not be activated', 'event_espresso'),
                        $pm_type_class)
                );
            }
        }
        $payment_method->set_active();
        $payment_method->save();
        $this->set_usable_currencies_on_payment_method($payment_method);
        if ($payment_method->type() === 'Invoice') {
            /** @type EE_Message_Resource_Manager $message_resource_manager */
            $message_resource_manager = EE_Registry::instance()->load_lib('Message_Resource_Manager');
            $message_resource_manager->ensure_message_type_is_active('invoice', 'html');
            $message_resource_manager->ensure_messenger_is_active('pdf');
            EE_Error::add_persistent_admin_notice(
                'invoice_pm_requirements_notice',
                sprintf(
                    __('The Invoice payment method has been activated. It requires the invoice message type, html messenger, and pdf messenger be activated as well for the %1$smessages system%2$s, so it has been automatically verified that they are also active.',
                        'event_espresso'),
                    '<a href="' . admin_url('admin.php?page=espresso_messages') . '">',
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
     * @throws \EE_Error
     */
    public function create_payment_method_of_type($pm_type_obj)
    {
        global $current_user;
        $payment_method = EE_Payment_Method::new_instance(
            array(
                'PMD_type'       => $pm_type_obj->system_name(),
                'PMD_name'       => $pm_type_obj->pretty_name(),
                'PMD_admin_name' => $pm_type_obj->pretty_name(),
                'PMD_slug'       => $pm_type_obj->system_name(),//automatically converted to slug
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
     * @throws \EE_Error
     */
    public function initialize_payment_method($payment_method)
    {
        $pm_type_obj = $payment_method->type_obj();
        $payment_method->set_description($pm_type_obj->default_description());
        if ( ! $payment_method->button_url()) {
            $payment_method->set_button_url($pm_type_obj->default_button_url());
        }
        //now add setup its default extra meta properties
        $extra_metas = $pm_type_obj->settings_form()->extra_meta_inputs();
        if ( ! empty($extra_metas)) {
            //verify the payment method has an ID before adding extra meta
            if ( ! $payment_method->ID()) {
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
     * @param EE_Payment_Method $payment_method
     * @return EE_Payment_Method
     * @throws \EE_Error
     */
    public function set_usable_currencies_on_payment_method($payment_method)
    {
        foreach ($payment_method->get_all_usable_currencies() as $currency_obj) {
            $payment_method->_add_relation_to($currency_obj, 'Currency');
        }
        return $payment_method;
    }



    /**
     * Deactivates a payment method of the given payment method slug.
     *
     * @param string $payment_method_slug The slug for the payment method to deactivate.
     * @return int count of rows updated.
     */
    public function deactivate_payment_method($payment_method_slug)
    {
        EE_Log::instance()->log(
            __FILE__,
            __FUNCTION__,
            sprintf(
                __('Payment method with slug %1$s is being deactivated by site admin', 'event_espresso'),
                $payment_method_slug
            ),
            'payment_method_change'
        );
        $count_updated = EEM_Payment_Method::instance()->update(
            array('PMD_scope' => array()),
            array(array('PMD_slug' => $payment_method_slug))
        );
        return $count_updated;
    }



    /**
     * callback for FHEE__EE_Capabilities__init_caps_map__caps filter to add dynamic payment method
     * access caps.
     *
     * @param array $caps capabilities being filtered
     * @return array
     */
    public function add_payment_method_caps($caps)
    {
        /* add dynamic caps from payment methods
         * at the time of writing, october 20 2014, these are the caps added:
         * ee_payment_method_admin_only
         * ee_payment_method_aim
         * ee_payment_method_bank
         * ee_payment_method_check
         * ee_payment_method_invoice
         * ee_payment_method_mijireh
         * ee_payment_method_paypal_pro
         * ee_payment_method_paypal_standard
         * Any other payment methods added to core or via addons will also get
         * their related capability automatically added too, so long as they are
         * registered properly using EE_Register_Payment_Method::register()
         */
        foreach ($this->payment_method_types() as $payment_method_type_obj) {
            $caps['administrator'][] = $payment_method_type_obj->cap_name();
        }
        return $caps;
    }

}
