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
		add_action( 'plugins_loaded', array( $this, 'on_plugins_loaded' ), 3 );
		add_action( 'init', array( $this, 'on_init' ), 2 );
		add_action( 'wp_enqueue_scripts', array( $this, 'on_wp_enqueue_scripts'), 10 );
	}


	private function _run_now(){
		/**
		 * note, this action hook is simply for reliably having things run ONLY if EE Regular is running.  This hook is executed VERY eraly in the EE loading process so the callback should only be a point for adding other hooks etc into the EE loading process.
		 */
		do_action('AHEE__EE_Brewing_Regular__run_now');
	}



	public function on_plugins_loaded(){}



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