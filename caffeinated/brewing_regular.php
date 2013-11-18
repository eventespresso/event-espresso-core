<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
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
 * EE_Brewing_Regular class.  Just a wrapper to help namespace activity for the functionliaty of this file.
 *
 * @package		Event Espresso
 * @subpackage	/caffeinated/brewing_regular.php
 * @author		Darren Ethier 
 *
 * ------------------------------------------------------------------------
 */
EE_Registry::instance(); //makes sure EE_Base gets loaded.
class EE_Brewing_Regular extends EE_Base {

	public function __construct() {
		$this->_run_now();
		add_action( 'init', array( $this, 'on_init' ), 2 );
		add_action( 'wp_enqueue_scripts', array( $this, 'on_wp_enqueue_scripts'), 10 );
	}


	private function _run_now(){
		/**
		 * note, this action hook is simply for reliably having things run ONLY if EE Regular is running.  This hook is executed at the plugins_loaded (priority 3) hook point. (see EE_System::plugins_loaded)
		 */
		do_action('AHEE__EE_Brewing_Regular__run_now');
		add_action('AHEE__EEH_Activation__initialize_db_content',array($this,'initialize_caf_db_content'));
	}
	
	/**
	 * Upon brand-new activation, if this is a new activation of CAF, we want to add
	 * some global prices that will show off EE4's capabilities. However, if they're upgrading
	 * from 3.1, or simply 4.1 decaf, we assume they don't want us to suddenly introduce these extra prices.
	 * This action should only be called when EE 4.1.0P is initially activated.
	 * Right now the only CAF content are these global prices. If there's more in teh future, then
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
//				$SQL = "INSERT INTO $price_type_table ( PRT_ID, PRT_name, PBT_ID, PRT_is_percent, PRT_order, PRT_deleted ) VALUES
//							(6, '" . __('Regional Tax', 'event_espresso') . "', 4,  1, 60, 0),
//							(7, '" . __('Federal Tax', 'event_espresso') . "', 4,  1, 70, 0);";
//				$SQL = apply_filters( 'FHEE_default_price_types_activation_sql', $SQL );
//				$wpdb->query( $SQL );
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
				if( $result){
					$wpdb->insert($price_table,
							array(
								'PRT_ID'=>$wpdb->insert_id,
								'PRC_amount'=>7.00,
								'PRC_name'=>  __("Local Sales Tax", "event_espresso"),
								'PRC_desc'=>  __("Locally imposed tax. Example content - delete if you want to", "event_espresso"),
								'PRC_is_default'=>true,
								'PRC_overrides'=>NULL,
								'PRC_deleted'=>false,
								'PRC_order'=>40,
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
								'PRC_desc'=>  __("Federally imposed tax. Example content - delete if you want to", "event_espresso"),
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
	 * Inserts them mostly unconditionally.
	 * @global type $wpdb
	 */
//	private function _insert_caf_prices(){
//		global $wpdb;
//		$price_table = $wpdb->prefix."esp_price";
//		
//		if ($wpdb->get_var("SHOW TABLES LIKE '$price_table'") == $price_table) {
//			//we are now assuming we want to insert these tables if this function is called
////			$SQL = 'SELECT COUNT(PRC_ID) FROM ' .$price_table;
////			$existing_prices_count = $wpdb->get_var( $SQL );
////			if ( $existing_prices_count <= 1 ) {
//				$SQL = "INSERT INTO $price_table
//							(PRC_ID, PRT_ID, PRC_amount, PRC_name, PRC_desc,  PRC_is_default, PRC_overrides, PRC_order, PRC_deleted, PRC_parent ) VALUES
//							(4, 6, '7.00', 'Local Sales Tax', 'Locally imposed tax. Example content - delete if you want to', 1, NULL, 40, 0, 0),
//							(5, 7, '15.00', 'Sales Tax', 'Federally imposed tax. Example content - delete if you want to', 1, NULL, 50, 0, 0);";			
//				$SQL = apply_filters( 'FHEE_default_prices_activation_sql', $SQL );
//				$wpdb->query($SQL);			
////			}
//		}	
//	}




	public function on_init(){
		/**
		 * EE_Register_CPTs hooks
		 */
		add_filter('FHEE__EE_Register_CPTs__get_taxonomies', array( $this, 'filter_taxonomies' ), 10 );
		add_filter('FHEE__EE_Register_CPTs__get_CPTs', array( $this, 'filter_cpts' ), 10 );
		add_filter('FHEE__EE_Admin__get_extra_nav_menu_pages_items', array( $this, 'nav_metabox_items' ), 10 );
	}



	public function on_wp_enqueue_scripts(){}


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