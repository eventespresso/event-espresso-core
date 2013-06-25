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
 * EE_Config
 *
 * @package			Event Espresso
 * @subpackage	core/
 * @author				Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class EE_Config {


	/**
	 * 	instance of the EE_Config object
	 *	@var 	$_instance
	 * 	@access 	private
	 */
	private static $_instance = NULL;





	/**
	 *		@singleton method used to instantiate class object
	 *		@access public
	 *		@return class instance
	 */
	public static function instance() {
		// check if class object is instantiated, and instantiated properly
		if ( self::$_instance === NULL  or ! is_object( self::$_instance ) or ! is_a( self::$_instance, __CLASS__ )) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}



	/**
	 * 	class constructor
	 *
	 *  @access 	private
	 *  @return 	void
	 */
	private function __construct() {
//		echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		add_action( 'plugins_loaded', array( $this, 'plugins_loaded' ), 10 );
	}



	/**
	 * 	plugins_loaded
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function plugins_loaded() {
//		echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		// org options loading is turned OFF by default, but prior to the plugins_loaded hook, can be turned back on again via:  add_filter( 'FHEE_load_org_options', '__return_true' );
		if ( apply_filters( 'FHEE_load_org_options', FALSE )) {
			// get EE site settings
			$this->_load_config();
		}
	}




	/**
	 * 		load EE organization options and begin EE logging
	 *
	 * 		@access private
	 * 		@return void
	 */
	private function _load_config() {

		$current_user_id = get_current_user_id();
		$current_user_id = $current_user_id ? $current_user_id : 1;		
		// grab org options based on current admin user
		$config = get_user_meta( $current_user_id, 'events_organization_settings', TRUE );
		// do settings for this user exist ?
		if ( empty( $config )) {
			require_once( EVENT_ESPRESSO_INCLUDES_DIR . 'functions/activation.php');
			espresso_org_option_initialization();		
		} else {
			// list of critical settings
			$critical_settings = array( 
				'contact_email',
				'currency_symbol'
			);
			// cycle thru critical org_options
			foreach ( $critical_settings as $critical_setting ) {
				// make sure each one actually exists 
				if ( ! isset( $config[ $critical_setting ] )) {
					// reinitialize the org options
					require_once( EVENT_ESPRESSO_INCLUDES_DIR . 'functions/activation.php');
					espresso_org_option_initialization( TRUE );
					break;	
				}
			}
		}
		//printr( $config, '$config  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		foreach ( $config as $key => $value ) {
			$this->$key = $value;
		}
		do_action('AHEE_debug_file');
	}



	/**
	 * 	'update_config'
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function update_config() {
		$config = get_object_vars( $this );
		$current_user_id = get_current_user_id();
		$current_user_id = $current_user_id ? $current_user_id : 1;		
		// grab org options based on current admin user
		if ( ! update_usermeta( $current_user_id, 'events_organization_settings', $config )) {
			$msg = __( 'An error has occured. The Event Espresso Configuration Settings could not be update.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
		}
	}

	


}
// End of file EE_Config.core.php
// Location: /core/EE_Config.core.php