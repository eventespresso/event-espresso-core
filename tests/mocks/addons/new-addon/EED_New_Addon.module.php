<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/*
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package		Event Espresso
 * @ author			Event Espresso
 * @ copyright	(c) 2008-2014 Event Espresso  All Rights Reserved.
 * @ license		http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link				http://www.eventespresso.com
 * @ version		$VID:$
 *
 * ------------------------------------------------------------------------
 */
/**
 * Class  EED_New_Addon
 *
 * @package			Event Espresso
 * @subpackage		espresso-new-addon
 * @author 				Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EED_New_Addon extends EED_Module {

	/**
	 * @var 		bool
	 * @access 	public
	 */
	public static $shortcode_active = FALSE;



	/**
	 * @return EED_New_Addon
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
		 EE_Config::register_route( 'new_addon', 'EED_New_Addon', 'run' );
	 }

	 /**
	  * 	set_hooks_admin - for hooking into EE Admin Core, other modules, etc
	  *
	  *  @access 	public
	  *  @return 	void
	  */
	 public static function set_hooks_admin() {
		 // ajax hooks
		 add_action( 'wp_ajax_get_new_addon', array( 'EED_New_Addon', 'get_new_addon' ));
		 add_action( 'wp_ajax_nopriv_get_new_addon', array( 'EED_New_Addon', 'get_new_addon' ));
	 }

	 public static function get_new_addon(){
		 echo json_encode( array( 'response' => 'ok', 'details' => 'you have made an ajax request!') );
		 die;
	 }



	/**
	 *    config
	 *
	 * @return EE_New_Addon_Config
	 */
	public function config(){
		// config settings are setup up individually for EED_Modules via the EE_Configurable class that all modules inherit from, so
		// $this->config();  can be used anywhere to retrieve it's config, and:
		// $this->_update_config( $EE_Config_Base_object ); can be used to supply an updated instance of it's config object
		// to piggy back off of the config setup for the base EE_New_Addon class, just use the following (note: updates would have to occur from within that class)
		return EE_Registry::instance()->addons->EE_New_Addon->config();
	}






	 /**
	  *    run - initial module setup
	  *
	  * @access    public
	  * @param  WP $WP
	  * @return    void
	  */
	 public function run( $WP ) {
		 add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ));
	 }






	/**
	 * 	enqueue_scripts - Load the scripts and css
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function enqueue_scripts() {
		//Check to see if the new_addon css file exists in the '/uploads/espresso/' directory
		if ( is_readable( EVENT_ESPRESSO_UPLOAD_DIR . "css/new_addon.css")) {
			//This is the url to the css file if available
			wp_register_style( 'espresso_new_addon', EVENT_ESPRESSO_UPLOAD_URL . 'css/espresso_new_addon.css' );
		} else {
			// EE new_addon style
			wp_register_style( 'espresso_new_addon', EE_NEW_ADDON_URL . 'css/espresso_new_addon.css' );
		}
		// new_addon script
		wp_register_script( 'espresso_new_addon', EE_NEW_ADDON_URL . 'scripts/espresso_new_addon.js', array( 'jquery' ), EE_NEW_ADDON_VERSION, TRUE );

		// is the shortcode or widget in play?
		if ( EED_New_Addon::$shortcode_active ) {
			wp_enqueue_style( 'espresso_new_addon' );
			wp_enqueue_script( 'espresso_new_addon' );
		}
	}




	/**
	 *		@ override magic methods
	 *		@ return void
	 */
	public function __set($a,$b) { return FALSE; }
	public function __get($a) { return FALSE; }
	public function __isset($a) { return FALSE; }
	public function __unset($a) { return FALSE; }
	public function __clone() { return FALSE; }
	public function __wakeup() { return FALSE; }
	public function __destruct() { return FALSE; }

 }
// End of file EED_New_Addon.module.php
// Location: /wp-content/plugins/espresso-new-addon/EED_New_Addon.module.php
