<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * the purpose of this file is to simply contain any action/filter hook callbacks etc for specific aspects of EE related to caffeinated (regular) use.  Before putting any code in here, First be certain that it isn't better to define and use the hook in a specific caffeinated/whatever class or file.
 */
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright			(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link				http://www.eventespresso.com
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * EE_Brewing_Regular class.  Just a wrapper to help namespace activity for the functionality of this file.
 *
 * @package		Event Espresso
 * @subpackage	/caffeinated/brewing_regular.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Brewing_Regular extends EE_Base {

	public function __construct() {
		// defined some new constants related to caffeinated folder
		if ( defined( 'EE_CAFF_PATH' )) {
			define('EE_CAF_URL', EE_PLUGIN_DIR_URL . 'caffeinated/' );
			define('EE_CAF_CORE', EE_CAFF_PATH . 'core' . DS);
			define('EE_CAF_LIBRARIES', EE_CAF_CORE . 'libraries' . DS);
			// activation
			add_action( 'AHEE__EEH_Activation__initialize_db_content', array( $this, 'initialize_caf_db_content' ));
			// load caff init
			add_action( 'AHEE__EE_System__set_hooks_for_core', array( $this, 'caffeinated_init' ));
			// make it so the PDF receipt doesn't show our shameless plug
			add_filter( 'FHEE_Invoice__send_invoice__shameless_plug', '__return_false' );
			// add caffeinated modules
			add_filter( 'FHEE__EE_Config__register_modules__modules_to_register', array( $this, 'caffeinated_modules_to_register' ));
			// load caff scripts
			add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_caffeinated_scripts'), 10 );

			add_filter( 'FHEE__EE_Registry__load_helper__helper_paths', array( $this, 'caf_helper_paths' ), 10 );

			// caffeinated constructed
			do_action( 'AHEE__EE_Brewing_Regular__construct__complete' );
		}
	}


	/**
	 * callback for the FHEE__EE_Registry__load_helper__helper_paths filter to add the caffeinated paths
	 * @param array  $paths original helper paths array
	 * @return array             new array of paths
	 */
	public function caf_helper_paths( $paths ) {
		$paths[] = EE_CAF_CORE . 'helpers' . DS;
		return $paths;
	}



	/**
	 * Upon brand-new activation, if this is a new activation of CAF, we want to add
	 * some global prices that will show off EE4's capabilities. However, if they're upgrading
	 * from 3.1, or simply 4.1 decaf, we assume they don't want us to suddenly introduce these extra prices.
	 * This action should only be called when EE 4.1.0P is initially activated.
	 * Right now the only CAF content are these global prices. If there's more in the future, then
	 * we should probably create a caf file to contain it all instead just a function like this.
	 * Right now, we ASSUME the only price types in the system are default ones
	 * @global type $wpdb
	 */
	function initialize_caf_db_content(){
//		echo "initialize caf db content!";
		global $wpdb;

		$price_type_table = $wpdb->prefix."esp_price_type";
		$price_table = $wpdb->prefix."esp_price";

		if ($wpdb->get_var("SHOW TABLES LIKE '$price_type_table'") == $price_type_table) {

			$SQL = 'SELECT COUNT(PRT_ID) FROM ' . $price_type_table . ' WHERE PBT_ID=4';//include trashed price types
			$tax_price_type_count = $wpdb->get_var( $SQL );

			if ( $tax_price_type_count <= 1) {
				$result = $wpdb->insert($price_type_table,
						array(
							'PRT_name'=>  __("Regional Tax", "event_espresso"),
							'PBT_ID'=>4,
							'PRT_is_percent'=>true,
							'PRT_order'=>60,
							'PRT_deleted'=>false
						),
						array(
							'%s',//PRT_name
							'%d',//PBT_id
							'%d',//PRT_is_percent
							'%d',//PRT_order
							'%d',//PRT_deleted
						));
				//federal tax
				$result = $wpdb->insert($price_type_table,
						array(
							'PRT_name'=>  __("Federal Tax", "event_espresso"),
							'PBT_ID'=>4,
							'PRT_is_percent'=>true,
							'PRT_order'=>70,
							'PRT_deleted'=>false
						),
						array(
							'%s',//PRT_name
							'%d',//PBT_id
							'%d',//PRT_is_percent
							'%d',//PRT_order
							'%d',//PRT_deleted
						));
				if( $result){
					$wpdb->insert($price_table,
							array(
								'PRT_ID'=>$wpdb->insert_id,
								'PRC_amount'=>15.00,
								'PRC_name'=>  __("Sales Tax", "event_espresso"),
								'PRC_desc'=>  '',
								'PRC_is_default'=>true,
								'PRC_overrides'=>NULL,
								'PRC_deleted'=>false,
								'PRC_order'=>50,
								'PRC_parent'=>null
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
							));
				}


			}
		}


	}


	/**
	 * 	caffeinated_modules_to_register
	 *
	 * 	@access public
	 *  	@param array $modules_to_register
	 *  	@return array
	 */
	public function caffeinated_modules_to_register( $modules_to_register = array() ){
		if ( is_readable( EE_CAFF_PATH . 'modules' )) {
			$caffeinated_modules_to_register = glob( EE_CAFF_PATH . 'modules' . DS . '*', GLOB_ONLYDIR );
			if ( is_array( $caffeinated_modules_to_register ) && ! empty( $caffeinated_modules_to_register )) {
				$modules_to_register = array_merge( $modules_to_register, $caffeinated_modules_to_register );
			}
		}
		return $modules_to_register;
	}



	public function caffeinated_init(){
		// EE_Register_CPTs hooks
		add_filter('FHEE__EE_Register_CPTs__construct__taxonomies', array( $this, 'filter_taxonomies' ), 10 );
		add_filter('FHEE__EE_Register_CPTs__construct__CPTs', array( $this, 'filter_cpts' ), 10 );
		add_filter('FHEE__EE_Admin__get_extra_nav_menu_pages_items', array( $this, 'nav_metabox_items' ), 10 );
		EE_Registry::instance()->load_file( EE_CAFF_PATH, 'EE_Caf_Messages', 'class', array(), FALSE );
		// caffeinated_init__complete hook
		do_action( 'AHEE__EE_Brewing_Regular__caffeinated_init__complete' );
	}



	public function enqueue_caffeinated_scripts(){
		// sound of crickets...
	}


	/**
	 * callbacks below here
	 */

	public function filter_taxonomies( $taxonomy_array ) {
		$taxonomy_array['espresso_venue_categories']['args']['show_in_nav_menus'] = TRUE;
		return $taxonomy_array;
	}



	public function filter_cpts( $cpt_array ) {
		$cpt_array['espresso_venues']['args']['show_in_nav_menus'] = TRUE;
		return $cpt_array;
	}


	public function nav_metabox_items( $menuitems ) {
		$menuitems[] = array(
			'title' => __('Venue List', 'event_espresso'),
			'url' => get_post_type_archive_link( 'espresso_venues' ),
			'description' => __('Archive page for all venues.', 'event_espresso')
			);
		return $menuitems;
	}

}
$brewing = new EE_Brewing_Regular();
