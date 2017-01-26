<?php
use EventEspresso\core\services\database\TableAnalysis;

if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}
/**
 * the purpose of this file is to simply contain any action/filter hook callbacks etc for specific aspects of EE
 * related to caffeinated (regular) use.  Before putting any code in here, First be certain that it isn't better to
 * define and use the hook in a specific caffeinated/whatever class or file.
 */
// defined some new constants related to caffeinated folder
define('EE_CAF_URL', EE_PLUGIN_DIR_URL . 'caffeinated/');
define('EE_CAF_CORE', EE_CAFF_PATH . 'core' . DS);
define('EE_CAF_LIBRARIES', EE_CAF_CORE . 'libraries' . DS);
define('EE_CAF_PAYMENT_METHODS', EE_CAFF_PATH . 'payment_methods' . DS);



/**
 * EE_Brewing_Regular class.  Just a wrapper to help namespace activity for the functionality of this file.
 *
 * @package        Event Espresso
 * @subpackage     /caffeinated/brewing_regular.php
 * @author         Darren Ethier
 */
class EE_Brewing_Regular extends EE_BASE
{

    /**
     * @var \EventEspresso\core\services\database\TableAnalysis $table_analysis
     */
    protected $_table_analysis;



    /**
     * EE_Brewing_Regular constructor.
     */
    public function __construct(TableAnalysis $table_analysis)
    {
        $this->_table_analysis = $table_analysis;
        if (defined('EE_CAFF_PATH')) {
            // activation
            add_action('AHEE__EEH_Activation__initialize_db_content', array($this, 'initialize_caf_db_content'));
            // load caff init
            add_action('AHEE__EE_System__set_hooks_for_core', array($this, 'caffeinated_init'));
            // remove the "powered by" credit link from receipts and invoices
            add_filter('FHEE_EE_Html_messenger__add_powered_by_credit_link_to_receipt_and_invoice', '__return_false');
            // add caffeinated modules
            add_filter(
                'FHEE__EE_Config__register_modules__modules_to_register',
                array($this, 'caffeinated_modules_to_register')
            );
            // load caff scripts
            add_action('wp_enqueue_scripts', array($this, 'enqueue_caffeinated_scripts'), 10);
            add_filter('FHEE__EE_Registry__load_helper__helper_paths', array($this, 'caf_helper_paths'), 10);
            add_filter(
                'FHEE__EE_Payment_Method_Manager__register_payment_methods__payment_methods_to_register',
                array($this, 'caf_payment_methods')
            );
            // caffeinated constructed
            do_action('AHEE__EE_Brewing_Regular__construct__complete');
            //seeing how this is caf, which isn't put on WordPress.org, we can have affiliate links without a disclaimer
            add_filter('FHEE__ee_show_affiliate_links', '__return_false');
        }
    }



    /**
     * callback for the FHEE__EE_Registry__load_helper__helper_paths filter to add the caffeinated paths
     *
     * @param array $paths original helper paths array
     * @return array             new array of paths
     */
    public function caf_helper_paths($paths)
    {
        $paths[] = EE_CAF_CORE . 'helpers' . DS;
        return $paths;
    }



    /**
     * Upon brand-new activation, if this is a new activation of CAF, we want to add
     * some global prices that will show off EE4's capabilities. However, if they're upgrading
     * from 3.1, or simply EE4.x decaf, we assume they don't want us to suddenly introduce these extra prices.
     * This action should only be called when EE 4.x.0.P is initially activated.
     * Right now the only CAF content are these global prices. If there's more in the future, then
     * we should probably create a caf file to contain it all instead just a function like this.
     * Right now, we ASSUME the only price types in the system are default ones
     *
     * @global wpdb $wpdb
     */
    public function initialize_caf_db_content()
    {
        global $wpdb;
        //use same method of getting creator id as the version introducing the change
        $default_creator_id = apply_filters('FHEE__EE_DMS_Core_4_5_0__get_default_creator_id', get_current_user_id());
        $price_type_table = $wpdb->prefix . "esp_price_type";
        $price_table = $wpdb->prefix . "esp_price";
        if ($this->_get_table_analysis()->tableExists($price_type_table)) {
            $SQL = 'SELECT COUNT(PRT_ID) FROM ' . $price_type_table . ' WHERE PBT_ID=4';//include trashed price types
            $tax_price_type_count = $wpdb->get_var($SQL);
            if ($tax_price_type_count <= 1) {
                $wpdb->insert(
                    $price_type_table,
                    array(
                        'PRT_name'       => __("Regional Tax", "event_espresso"),
                        'PBT_ID'         => 4,
                        'PRT_is_percent' => true,
                        'PRT_order'      => 60,
                        'PRT_deleted'    => false,
                        'PRT_wp_user'    => $default_creator_id,
                    ),
                    array(
                        '%s',//PRT_name
                        '%d',//PBT_id
                        '%d',//PRT_is_percent
                        '%d',//PRT_order
                        '%d',//PRT_deleted
                        '%d', //PRT_wp_user
                    )
                );
                //federal tax
                $result = $wpdb->insert(
                    $price_type_table,
                    array(
                        'PRT_name'       => __("Federal Tax", "event_espresso"),
                        'PBT_ID'         => 4,
                        'PRT_is_percent' => true,
                        'PRT_order'      => 70,
                        'PRT_deleted'    => false,
                        'PRT_wp_user'    => $default_creator_id,
                    ),
                    array(
                        '%s',//PRT_name
                        '%d',//PBT_id
                        '%d',//PRT_is_percent
                        '%d',//PRT_order
                        '%d',//PRT_deleted
                        '%d' //PRT_wp_user
                    )
                );
                if ($result) {
                    $wpdb->insert(
                        $price_table,
                        array(
                            'PRT_ID'         => $wpdb->insert_id,
                            'PRC_amount'     => 15.00,
                            'PRC_name'       => __("Sales Tax", "event_espresso"),
                            'PRC_desc'       => '',
                            'PRC_is_default' => true,
                            'PRC_overrides'  => null,
                            'PRC_deleted'    => false,
                            'PRC_order'      => 50,
                            'PRC_parent'     => null,
                            'PRC_wp_user'    => $default_creator_id,
                        ),
                        array(
                            '%d',//PRT_id
                            '%f',//PRC_amount
                            '%s',//PRC_name
                            '%s',//PRC_desc
                            '%d',//PRC_is_default
                            '%d',//PRC_overrides
                            '%d',//PRC_deleted
                            '%d',//PRC_order
                            '%d',//PRC_parent
                            '%d' //PRC_wp_user
                        )
                    );
                }
            }
        }
    }



    /**
     *    caffeinated_modules_to_register
     *
     * @access public
     * @param array $modules_to_register
     * @return array
     */
    public function caffeinated_modules_to_register($modules_to_register = array())
    {
        if (is_readable(EE_CAFF_PATH . 'modules')) {
            $caffeinated_modules_to_register = glob(EE_CAFF_PATH . 'modules' . DS . '*', GLOB_ONLYDIR);
            if (is_array($caffeinated_modules_to_register) && ! empty($caffeinated_modules_to_register)) {
                $modules_to_register = array_merge($modules_to_register, $caffeinated_modules_to_register);
            }
        }
        return $modules_to_register;
    }



    public function caffeinated_init()
    {
        // EE_Register_CPTs hooks
        add_filter('FHEE__EE_Register_CPTs__get_taxonomies__taxonomies', array($this, 'filter_taxonomies'), 10);
        add_filter('FHEE__EE_Register_CPTs__get_CPTs__cpts', array($this, 'filter_cpts'), 10);
        add_filter('FHEE__EE_Admin__get_extra_nav_menu_pages_items', array($this, 'nav_metabox_items'), 10);
        EE_Registry::instance()->load_file(EE_CAFF_PATH, 'EE_Caf_Messages', 'class', array(), false);
        // caffeinated_init__complete hook
        do_action('AHEE__EE_Brewing_Regular__caffeinated_init__complete');
    }



    public function enqueue_caffeinated_scripts()
    {
        // sound of crickets...
    }



    /**
     * callbacks below here
     *
     * @param array $taxonomy_array
     * @return array
     */
    public function filter_taxonomies(array $taxonomy_array)
    {
        $taxonomy_array['espresso_venue_categories']['args']['show_in_nav_menus'] = true;
        return $taxonomy_array;
    }



    /**
     * @param array $cpt_array
     * @return mixed
     */
    public function filter_cpts(array $cpt_array)
    {
        $cpt_array['espresso_venues']['args']['show_in_nav_menus'] = true;
        return $cpt_array;
    }



    /**
     * @param array $menuitems
     * @return array
     */
    public function nav_metabox_items(array $menuitems)
    {
        $menuitems[] = array(
            'title'       => __('Venue List', 'event_espresso'),
            'url'         => get_post_type_archive_link('espresso_venues'),
            'description' => __('Archive page for all venues.', 'event_espresso'),
        );
        return $menuitems;
    }



    /**
     * Adds the payment methods in {event-espresso-core}/caffeinated/payment_methods
     *
     * @param array $payment_method_paths
     * @return array values are folder paths to payment method folders
     */
    public function caf_payment_methods($payment_method_paths)
    {
        $caf_payment_methods_paths = glob(EE_CAF_PAYMENT_METHODS . '*', GLOB_ONLYDIR);
        $payment_method_paths = array_merge($payment_method_paths, $caf_payment_methods_paths);
        return $payment_method_paths;
    }



    /**
     * Gets the injected table analyzer, or throws an exception
     *
     * @return TableAnalysis
     * @throws \EE_Error
     */
    protected function _get_table_analysis()
    {
        if ($this->_table_analysis instanceof TableAnalysis) {
            return $this->_table_analysis;
        } else {
            throw new \EE_Error(
                sprintf(
                    __('Table analysis class on class %1$s is not set properly.', 'event_espresso'),
                    get_class($this)
                )
            );
        }
    }
}



$brewing = new EE_Brewing_Regular(
    EE_Registry::instance()->create('TableAnalysis', array(), true)
);
