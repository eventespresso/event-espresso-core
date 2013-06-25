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
 * @subpackage	/modules/event_list/
 * @author				Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class EED_Event_List  extends EED_Module {

	/**
	 * 	register_module - makes core aware of this module
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function register_module() {
		EE_Front_Controller::register_module(  __CLASS__ , __FILE__ );
	}

	/**
	 * 	set_hooks - for hooking into EE Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks() {
		add_filter( 'FHEE_run_EE_wp', '__return_true' );
		add_filter( 'FHEE_load_EE_Session', '__return_true' );
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
	 * 	init - initial module setup
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function init() {
		add_filter( 'FHEE_load_org_options', '__return_true' );
//		add_filter( 'FHEE_run_EE_wp', '__return_true' );
//		add_filter( 'FHEE_load_EE_Session', '__return_true' );
//		add_action( 'wp_loaded', array( $this, 'wp_loaded' ));
//		add_action( 'wp', array( $this, 'wp' ));
		add_filter( 'the_content', array( $this, 'the_content' ));
	}



	/**
	 * 	all_events
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function all_events() {
		$this->ouput .= '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		$this->ouput .= '<h4>currency_symbol : ' . $this->EE->CFG->currency_symbol . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';		
	}



	/**
	 * 	wp_loaded
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function wp_loaded() {
		//echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
	}



	/**
	 * 	wp
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function wp() {
		//echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
	}



	/**
	 * 	the_content
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function the_content( $content ) {
		//$content .= printr( $this->EE, 'EE_Registry  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		$content .= $this->ouput;
		return $content;
	}
	
	


}
// End of file EED_Event_List.module.php
// Location: /modules/event_list/EED_Event_List.module.php