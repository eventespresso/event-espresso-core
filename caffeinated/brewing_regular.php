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
	 * @global type $wpdb
	 */
	function initialize_caf_db_content(){
		global $wpdb;
		$price_table = $wpdb->prefix."esp_price";
		
		if ($wpdb->get_var("SHOW TABLES LIKE '$price_table'") == $price_table) {
			
			$SQL = 'SELECT COUNT(PRC_ID) FROM ' .$price_table;
			$existing_prices_count = $wpdb->get_var( $SQL );
			//note: I believe this function is called even on upgrades. So 
			//you could jsut change this conditional to add default prices even on upgrades
			if ( $existing_prices_count <= 1 ) {
				$SQL = "INSERT INTO $price_table
							(PRC_ID, PRT_ID, PRC_amount, PRC_name, PRC_desc,  PRC_is_default, PRC_overrides, PRC_order, PRC_deleted, PRC_parent ) VALUES
							(2, 2, '10', 'Early Bird Discount', 'Sign up early and receive an additional 10% discount off of the regular price. Example content - delete if you want to', 1, NULL, 20, 0, 0),
							(3, 5, '7.50', 'Service Fee', 'Covers administrative expenses. Example content - delete if you want to', 1, NULL, 30, 0, 0),
							(4, 6, '7.00', 'Local Sales Tax', 'Locally imposed tax. Example content - delete if you want to', 1, NULL, 40, 0, 0),
							(5, 7, '15.00', 'Sales Tax', 'Federally imposed tax. Example content - delete if you want to', 1, NULL, 50, 0, 0);";			
				$SQL = apply_filters( 'FHEE_default_prices_activation_sql', $SQL );
				$wpdb->query($SQL);			
			}
		}	
	}




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