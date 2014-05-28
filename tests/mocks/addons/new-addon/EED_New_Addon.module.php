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
		 add_action( 'wp_ajax_get_new_addon', array( 'EED_New_Addon', '_get_new_addon' ));
		 add_action( 'wp_ajax_nopriv_get_new_addon', array( 'EED_New_Addon', '_get_new_addon' ));
	 }





	/**
	 *    set_config
	 *
	 * @return EE_New_Addon_Config
	 */
	protected static function _set_config(){
		return EED_New_Addon::instance()->set_config( 'addons', 'EED_New_Addon', 'EE_New_Addon_Config' );
	}



	/**
	 *    _get_config
	 *
	 * @return EE_New_Addon_Config
	 */
	protected static function _get_config(){
		$config = EED_New_Addon::instance()->get_config( 'addons', 'EED_New_Addon', 'EE_New_Addon_Config' );
		return $config instanceof EE_New_Addon_Config ? $config : EED_New_Addon::_set_config();
	}





	 /**
	  *    run - initial module setup
	  *
	  * @access    public
	  * @param  WP $WP
	  * @return    void
	  */
	 public function run( $WP ) {
		 EED_New_Addon::_set_config();
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
	  *    _get_new_addon
	  *
	  * @access    	public
	  * @return    	string
	  */
	public static function _get_new_addon(  ) {
		// get new_addon options
		$config = EED_New_Addon::_get_config();
		return '';
	}




	 /**
	  *    display_new_addon
	  *
	  * @access    	public
	  * @return    	string
	  */
	public function display_new_addon(  ) {
		// get new_addon options
		$config = EED_New_Addon::_get_config();
		return '';
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
