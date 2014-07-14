<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * Event List
 *
 * @package			Event Espresso
 * @subpackage	/modules/csv/
 * @author				Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EED_Csv  extends EED_Module {



	/**
	 * @return EED_Csv
	 */
	public static function instance() {
		return parent::get_instance( __CLASS__ );
	}



	/**
	 * 	set_hooks - for hooking into EE Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks() {
	}

	/**
	 * 	set_hooks_admin - for hooking into EE Admin Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks_admin() {
	}



	/**
	 * 	run - initial module setup
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function run( $WP ) {
//		add_filter( 'FHEE_load_ee_config', '__return_true' );
//		add_filter( 'FHEE_run_EE_wp', '__return_true' );
//		add_filter( 'FHEE_load_EE_Session', '__return_true' );
//		add_action( 'wp_loaded', array( $this, 'wp_loaded' ));
//		add_action( 'wp', array( $this, 'wp' ));
//		add_filter( 'the_content', array( $this, 'the_content' ));
	}




	/**
	 * 	export
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function export() {
		$Export = EE_Registry::instance()->load_class( 'Export' );
		$Export->export();
	}




	/**
	 * 	import
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function import() {
		$Import = EE_Registry::instance()->load_class( 'Import' );
		$Import->import();
	}





}
// End of file EED_Csv.module.php
// Location: /modules/csv/EED_Csv.module.php