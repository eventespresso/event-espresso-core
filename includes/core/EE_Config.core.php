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
final class EE_Config {


	/**
	 * 	instance of the EE_Config object
	 *	@var 	$_instance
	 * 	@access 	private
	 */
	private static $_instance = NULL;

	/**
	 * 	_module_route_map
	 *	@var 	array	$_module_route_map
	 * 	@access 	private
	 */
	private static $_module_route_map = array();

	/**
	 * 	_module_forward_map
	 *	@var 	array	$_module_forward_map
	 * 	@access 	private
	 */
	private static $_module_forward_map = array();

	/**
	 * 	_module_view_map
	 *	@var 	array	$_module_view_map
	 * 	@access 	private
	 */
	private static $_module_view_map = array();

	/**
	 * 	EE_Registry Object
	 *	@var 	EE_Registry	$EE	
	 * 	@access 	protected
	 */
	protected $EE = NULL;

	/**
	 * 	current_blog_id
	 *	@var 	int	$current_blog_id	
	 * 	@access 	public
	 */
	public $current_blog_id = NULL;
	
	/**
	 * 
	 * @var EE_Currency_Config 
	 */
	public $currency;

	/**
	 *
	 * @var EE_Organization_Config
	 */
	public $organization;
	
	/**
	 *
	 * @var EE_Registration_Config
	 */
	public $registration;
	
	/**
	 *
	 * @var EE_Core_Config
	 */
	public $core;
	/**
	 * ID of the 'primary' ee user. Mike thinks thinks this will be deprecated in 
	 * 4.2 when we no longer are storing global config stuff in user meta tables
	 * @var int
	 */
	public $wp_user;

	




	/**
	 *		@singleton method used to instantiate class object
	 *		@access public
	 *		@return class instance
	 */
	public static function instance( $activation = FALSE ) {
		// check if class object is instantiated, and instantiated properly
		if ( self::$_instance === NULL  or ! is_object( self::$_instance ) or ! ( self::$_instance instanceof EE_Config )) {
			self::$_instance = new self( $activation );
		}
		return self::$_instance;
	}



	/**
	 * 	class constructor
	 *
	 *  @access 	private
	 *  @return 	void
	 */
	private function __construct( $activation ) {
		$this->current_blog_id = get_current_blog_id();
		$this->EE = EE_Registry::instance();
		// get EE site settings
		if ( ! $activation ) {
			$this->_load_config();
		}
		$this->_register_shortcodes_and_modules();
		//add_action( 'init', array( $this, 'init' ), 5 );
		add_action( 'wp_loaded', array( $this, 'wp_loaded' ), 3 );
		
	}

 


	/**
	 * 	wp_loaded
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function wp_loaded() {

	}




	/**
	 * 		load EE organization options and begin EE logging
	 *
	 * 		@access private
	 * 		@return void
	 */
	private function _load_config() {

		$this->EE->CFG = $this->_get_espresso_config();
		
		// do settings for this blog exist ?
		if ( empty( $this->EE->CFG )) {
			$this->EE->load_helper( 'Activation' );
			EEH_Activation::configuration_initialization();
		} else {
			// list of critical settings
			$critical_settings = array( 
				'core',
				'organization',
				'currency'
			);
			// cycle thru critical org_options
			foreach ( $critical_settings as $critical_setting ) {
				// make sure each one actually exists 
				if ( ! isset( $this->EE->CFG->$critical_setting )) {
					// reinitialize the org options
					$this->EE->load_helper( 'Activation' );
					$this->EE->CFG = EEH_Activation::configuration_initialization( TRUE );		
					break;	
				}
			}
		}
		
		// add current_user_id
		$this->EE->CFG->wp_user = get_current_user_id();	

//		printr( $this->EE->CFG, '$this->EE->CFG  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		
		// set _module_route_map
		EE_Config::$_module_route_map = isset( $this->EE->CFG->core->module_route_map ) ? $this->EE->CFG->core->module_route_map : array();
		// set _module_forward_map
		EE_Config::$_module_forward_map = isset( $this->EE->CFG->core->module_forward_map ) ? $this->EE->CFG->core->module_forward_map : array();
		// set _module_view_map
		EE_Config::$_module_view_map = isset( $this->EE->CFG->core->module_view_map ) ? $this->EE->CFG->core->module_view_map : array();

		
		do_action('AHEE_debug_file');
	}



	/**
	 * 	_get_espresso_config
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	private function _get_espresso_config() {
		// grab espresso configuration
		if ( is_multisite() ) {
			// look for blog specific config
			if ( ! $CFG = get_blog_option( $this->current_blog_id, 'espresso_config', NULL )) {
				// if not, then look for network config
				if ( ! $CFG = get_site_option( 'espresso_config', NULL )) {
				    // if not, then look for generic config
					$CFG = get_option( 'espresso_config', NULL );
				}						
			}
		} else {
			$CFG = get_option( 'espresso_config', NULL );
		}
		$CFG = apply_filters( 'FHEE__Config__get_espresso_config__CFG', $CFG );
		return $CFG;
	}


	/**
	 * 	update_espresso_config'
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function update_espresso_config( $add_succes = FALSE, $add_error = TRUE ) {
		// map... the maps ?!?!?
		$this->EE->CFG->core->module_route_map = EE_Config::$_module_route_map;
		$this->EE->CFG->core->module_forward_map = EE_Config::$_module_forward_map;
		$this->EE->CFG->core->module_view_map = EE_Config::$_module_view_map;
		// filter config before saving
		$this->EE->CFG = apply_filters( 'FHEE__Config__update_espresso_config__CFG', $this->EE->CFG );
		// update
		if ( is_multisite() ) {
			// look for blog specific config
			if ( ! $saved = update_blog_option( $this->current_blog_id, 'espresso_config', $this->EE->CFG )) {
				// if not, then look for network config
				if ( ! $saved = update_site_option( 'espresso_config', $this->EE->CFG )) {
				    // if not, then look for generic config
					$saved = update_option( 'espresso_config', $this->EE->CFG );
				}						
			}
		} else {
			$saved = update_option( 'espresso_config', $this->EE->CFG );
		}
		// if config remains the same or was updated successfully
		if ( $this->EE->CFG == $this->_get_espresso_config() || $saved ) {
			if ( $add_succes ) {
				$msg = __( 'The Event Espresso Configuration Settings have been successfully updated.', 'event_espresso' );
				EE_Error::add_succes( $msg, __FILE__, __FUNCTION__, __LINE__ );
			}
			return TRUE;
		} else {
			if ( $add_error ) {
				$msg = __( 'The Event Espresso Configuration Settings were not updated.', 'event_espresso' );
				EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			}
			return FALSE;
		}
	}


	/**
	 * 	update_post_shortcodes
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function update_post_shortcodes() {
		$this->EE->CFG->core->post_shortcodes = isset( $this->EE->CFG->core->post_shortcodes ) && is_array( $this->EE->CFG->core->post_shortcodes ) ? $this->EE->CFG->core->post_shortcodes : array();
		// cycle thru post_shortcodes
		foreach( $this->EE->CFG->core->post_shortcodes as $post_name => $shortcodes ){
			// skip the posts page, because we want all shortcodes registered for it
			if ( $post_name != 'posts' ) {
				foreach( $shortcodes as $shortcode => $post_id ){
					if ( $post = get_post( $post_id )) {
						if ( $post->post_name == $post_name ) {
//							echo '<h4>$post_name : ' . $post_name . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
							break;
						}
					}
					unset( $this->EE->CFG->core->post_shortcodes[ $post_name ] );
				}
			}
		}
		//only show errors
		$this->update_espresso_config();
	}





	/**
	 * 	_register_shortcodes_and_modules
	 *
	 *  @access 	private
	 *  @return 	void
	 */
	private function _register_shortcodes_and_modules() {
		// allow shortcodes to register with WP and to set hooks for the rest of the system
		$this->_register_shortcodes();
		// allow modules to set hooks for the rest of the system
		$this->_register_modules();
	}



	/**
	 * 		_register_shortcodes
	 *
	 * 		@access private
	 * 		@return void
	 */
	private function _register_shortcodes() {
		// load base class
		require_once( EE_SHORTCODES . 'EES_Shortcode.shortcode.php' );
		// grab list of installed shortcodes
		$shortcodes_to_register = glob( EE_SHORTCODES . '*', GLOB_ONLYDIR );
		// filter list of modules to register
		$shortcodes_to_register = apply_filters( 'FHEE__Front_Controller__register_shortcodes__shortcodes_to_register', $shortcodes_to_register );
		// cycle thru shortcode folders
		foreach ( $shortcodes_to_register as $shortcode_path ) {
			// add to list of installed shortcode modules
			EE_Config::register_shortcode( $shortcode_path );
		}
		// filter list of installed modules
		$this->EE->shortcodes = apply_filters( 'FHEE__Front_Controller__register_shortcodes__installed_shortcodes', $this->EE->shortcodes );
	}



	/**
	 * 	register_shortcode - makes core aware of this shortcode
	 *
	 *  @access 	public
	 *  @param 	string 		$shortcode_path - full path up to and including shortcode folder
	 *  @return 	void
	 */
	public static function register_shortcode( $shortcode_path = NULL ) {
		$shortcode_ext = '.shortcode.php';
		// make all separators match
		$shortcode_path = rtrim( str_replace( '/\\', DS, $shortcode_path ), DS );
		// grab and sanitize shortcode directory name
		$shortcode_dir = sanitize_key( basename( $shortcode_path ));
		// create classname from shortcode directory name
		$shortcode = str_replace( ' ', '_', ucwords( str_replace( '_', ' ', $shortcode_dir )));
		// add class prefix
		$shortcode_class = 'EES_' . $shortcode;
		// does the shortcode exist ?
		if ( ! is_readable( $shortcode_path . DS . $shortcode_class . $shortcode_ext )) {
			$msg = sprintf( __( 'The requested %s shortcode file could not be found or is not readable due to file permissions.', 'event_espresso' ), $shortcode_class );
			EE_Error::add_error( $msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		// load the shortcode class file
		require_once( $shortcode_path . DS . $shortcode_class . $shortcode_ext );
		// verfiy that class exists
		if ( ! class_exists( $shortcode_class )) {
			$msg = sprintf( __( 'The requested %s shortcode class does not exist.', 'event_espresso' ), $shortcode_class );
			EE_Error::add_error( $msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		// fire the shortcode class's set_hooks methods in case it needs to hook into other parts of the system
		// which set hooks ?
		if ( is_admin() ) {
			// fire immediately			
			call_user_func( array( $shortcode_class, 'set_hooks_admin' ));
		} else {
			// delay until other systems are online
			add_action( 'wp_loaded', array( $shortcode_class,'set_hooks' ), 1 );
		}		
		// add to array of registered shortcodes
		EE_Registry::instance()->shortcodes[ strtoupper( $shortcode ) ] = $shortcode_path . DS . $shortcode_class . $shortcode_ext;
		return TRUE;
	}	




	/**
	 * 		_register_modules
	 *
	 * 		@access private
	 * 		@return void
	 */
	private function _register_modules() {
		// load base class
		require_once( EE_MODULES . 'EED_Module.module.php' );
		// grab list of installed modules
		$modules_to_register = glob( EE_MODULES . '*', GLOB_ONLYDIR );
		// filter list of modules to register
		$modules_to_register = apply_filters( 'FHEE__Front_Controller__register_modules__modules_to_register', $modules_to_register );
		// loop through folders
		foreach ( $modules_to_register as $module_path ) {
			if ( $module_path != EE_MODULES . 'zzz-copy-this-module-template' ) {
				// add to list of installed modules
				EE_Config::register_module( $module_path );
			}
		}
		// filter list of installed modules
		$this->EE->modules = apply_filters( 'FHEE__Front_Controller__register_modules__installed_modules', $this->EE->modules );
	}



	/**
	 * 	register_module - makes core aware of this module
	 *
	 *  @access 	public
	 *  @param 	string 		$module_path - full path up to and including module folder
	 *  @return 	void
	 */
	public static function register_module( $module_path = NULL ) {
		$module_ext = '.module.php';
		// make all separators match
		$module_path = rtrim( str_replace( '/\\', DS, $module_path ), DS );
		// grab and sanitize module name
		$module_dir = basename( $module_path );
		// create classname from module directory name
		$module = str_replace( ' ', '_', ucwords( str_replace( '_', ' ', $module_dir )));
		// add class prefix
		$module_class = 'EED_' . $module;
		// does the module exist ?
		if ( ! is_readable( $module_path . DS . $module_class . $module_ext )) {
			$msg = sprintf( __( 'The requested %s module file could not be found or is not readable due to file permissions.', 'event_espresso' ), $module );
			EE_Error::add_error( $msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		// load the module class file
		require_once( $module_path . DS . $module_class . $module_ext );
		// verfiy that class exists
		if ( ! class_exists( $module_class )) {
			$msg = sprintf( __( 'The requested %s module class does not exist.', 'event_espresso' ), $module_class );
			EE_Error::add_error( $msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		// fire the module class's set_hooks methods in case it needs to hook into other parts of the system
		// which set hooks ?
		if ( is_admin() ) {
			// fire immediately			
			call_user_func( array( $module_class, 'set_hooks_admin' ));
		} else {
			// delay until other systems are online
			add_action( 'wp_loaded', array( $module_class, 'set_hooks' ), 1 );
		}
		// add to array of registered modules
		EE_Registry::instance()->modules[ $module ] = $module_path . DS . $module_class . $module_ext;
		return TRUE;
	}



	/**
	 * 	register_route - adds module method routes to route_map
	 *
	 *  @access 	public
	 *  @param 	string 		$route - "pretty" public alias for module method
	 *  @param 	string 		$module - module name (classname without EED_ prefix)
	 *  @param 	string 		$method_name - the actual module method to be routed to
	 *  @return 	void
	 */
	public static function register_route( $route = NULL, $module = NULL, $method_name = NULL ) {
		$module = str_replace( 'EED_', '', $module );
		if ( ! isset( EE_Registry::instance()->modules[ $module ] )) {
			$msg = sprintf( __( 'The module %s has not been registered.', 'event_espresso' ), $module );
			EE_Error::add_error( $msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		if ( empty( $route )) {
			$msg = sprintf( __( 'No route has been supplied.', 'event_espresso' ), $route );
			EE_Error::add_error( $msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		if ( ! method_exists ( 'EED_' . $module, $method_name )) {
			$msg = sprintf( __( 'A valid class method for the %s route has not been supplied.', 'event_espresso' ), $route );
			EE_Error::add_error( $msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		EE_Config::$_module_route_map[ $route ] = array( 'EED_' . $module, $method_name );
//		echo '<br /><br /><h4>$route : ' . $route . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//		printr( EE_Config::$_module_route_map[ $route ], 'EE_Config::$_module_route_map[ $route ]  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
	}



	/**
	 * 	get_route - get module method route
	 *
	 *  @access 	public
	 *  @param 	string 		$route - "pretty" public alias for module method
	 *  @return 	void
	 */
	public static function get_route( $route = NULL ) {
		if ( isset( EE_Config::$_module_route_map[ $route ] )) {
			return EE_Config::$_module_route_map[ $route ];
		}
		return NULL;
	}



	/**
	 * 	register_forward - allows modules to forward request to another module for further processing
	 *
	 *  @access 	public
	 *  @param 	string 		$route - "pretty" public alias for module method
	 *  @param 	integer	$status - integer value corresponding  to status constant strings set in module parent class, allows different forwards to be served based on status
	 *  @param 	mixed		string|array 	$forward - function name or array( class, method )
	 *  @return 	void
	 */
	public static function register_forward( $route = NULL, $status = 0, $forward = NULL ) {
		if ( ! isset( EE_Config::$_module_route_map[ $route ] ) ||  empty( $route )) {
			$msg = sprintf( __( 'The module route %s for this forward has not been registered.', 'event_espresso' ), $route );
			EE_Error::add_error( $msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		if ( empty( $forward )) {
			$msg = sprintf( __( 'No forwarding route has been supplied.', 'event_espresso' ), $route );
			EE_Error::add_error( $msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		if ( is_array( $forward )) {
			if ( ! isset( $forward[1] )) {
				$msg = sprintf( __( 'A class method for the %s forwarding route has not been supplied.', 'event_espresso' ), $route );
				EE_Error::add_error( $msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__ );
				return FALSE;
			}
			if ( ! method_exists( $forward[0], $forward[1] )) {
				$msg = sprintf( __( 'The class method %s for the %s forwarding route is in invalid.', 'event_espresso' ), $forward[1], $route );
				EE_Error::add_error( $msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__ );
				return FALSE;
			}
		} else if ( ! function_exists( $forward )) {
			$msg = sprintf( __( 'The function %s for the %s forwarding route is in invalid.', 'event_espresso' ), $forward, $route );
			EE_Error::add_error( $msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		EE_Config::$_module_forward_map[ $route ][ absint( $status ) ] = $forward;
//		printr( EE_Config::$_module_forward_map, 'EE_Config::$_module_forward_map  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
	}



	/**
	 * 	get_forward - get forwarding route 
	 *
	 *  @access 	public
	 *  @param 	string 		$route - "pretty" public alias for module method
	 *  @param 	integer	$status - integer value corresponding  to status constant strings set in module parent class, allows different forwards to be served based on status
	 *  @return 	void
	 */
	public static function get_forward( $route = NULL, $status = 0 ) {
		if ( isset( EE_Config::$_module_forward_map[ $route ][ $status ] )) {
			return EE_Config::$_module_forward_map[ $route ][ $status ];
		}
		return NULL;
	}



	/**
	 * 	register_forward - allows modules to specify different view templates for different method routes and status results
	 *
	 *  @access 	public
	 *  @param 	string 		$route - "pretty" public alias for module method
	 *  @param 	integer	$status - integer value corresponding  to status constant strings set in module parent class, allows different views to be served based on status
	 *  @param 	mixed		string|array 	$forward - function name or array( class, method )
	 *  @return 	void
	 */
	public static function register_view( $route = NULL, $status = 0, $view = NULL ) {
		if ( ! isset( EE_Config::$_module_route_map[ $route ] ) ||  empty( $route )) {
			$msg = sprintf( __( 'The module route %s for this view has not been registered.', 'event_espresso' ), $route );
			EE_Error::add_error( $msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		if ( ! is_readable( $view )) {
			$msg = sprintf( __( 'The %s view file could not be found or is not readable due to file permissions.', 'event_espresso' ), $view );
			EE_Error::add_error( $msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		EE_Config::$_module_view_map[ $route ][ absint( $status ) ] = $view;
	}



	/**
	 * 	get_view - get view for route and status
	 *
	 *  @access 	public
	 *  @param 	string 		$route - "pretty" public alias for module method
	 *  @param 	integer	$status - integer value corresponding  to status constant strings set in module parent class, allows different views to be served based on status
	 *  @return 	void
	 */
	public static function get_view( $route = NULL, $status = 0 ) {
		if ( isset( EE_Config::$_module_view_map[ $route ][ $status ] )) {
			return EE_Config::$_module_view_map[ $route ][ $status ];
		}
		return NULL;
	}





}




/**
 * Base class used for config classes. These classes should generally not have
 * magic functions in use, except we'll allow them to magically set and get stuff...
 * basically, they should just be well-defined stdClasses
 */
class EE_Config_Base{
	/**
	 *		@ override magic methods
	 *		@ return void
	 */	
//	public function __get($a) { return FALSE; }
//	public function __set($a,$b) { return FALSE; }
	public function __isset($a) { return FALSE; }
	public function __unset($a) { return FALSE; }
	public function __clone() { return FALSE; }
	public function __wakeup() { return FALSE; }	
	public function __destruct() { return FALSE; }		
}




/**
 * Config class for storing info on the Organization
 */
class EE_Organization_Config extends EE_Config_Base{
	 /** @var $name eg EE4.1*/ 
	var $name;
      /** @var $address_1 eg 123 Onna Road*/ 
	var $address_1;
      /** @var $address_2 eg PO Box 123*/ 
	var $address_2;
      /** @var $city eg Inna City*/ 
	var $city;
      /** @var $STA_ID eg 4*/ 
	var $STA_ID;
      /** @var $CNT_ISO eg US*/ 
	var $CNT_ISO;
      /** @var $zip eg 12345*/ 
	var $zip;
      /** @var $email eg michael@eventespresso.com*/ 
	var $email;
      /** @var $logo_url eg */ 
	var $logo_url;
}




/**
 * Class for defining what's in the EE_Config relating to currency
 */
class EE_Currency_Config extends EE_Config_Base{
	 
	/**
	 * @var $code string
	 * eg 'US'
	 */
	public $code;
	/**
	 * @var $name string
	 * eg 'Dollar'
	 */
      public $name;
	  
	  /**
	   * PLural name
	   * @var $plural string
	   * eg 'Dollars'
	   */
      public $plural;
	  
	  /**
	   * currency sign
	   * @var $sign string
	   * eg '$'
	   */
      public $sign;
	  /**
	   * Whether the currency sign shoudl come before the number or not
	   * @var $sign_b4 boolean
	   */
      public $sign_b4;
	  
	  /**
	   * How many digits should come after the decimal place
	   * @var $dec_plc int
	   */
      public $dec_plc;
	  /**
	   * Symbol to use for decimal mark
	   * @var $dec_mrk string
	   * eg '.'
	   */
      public $dec_mrk;
	  /**
	   * Symbol to use for thousands
	   * @var $thsnds string
	   * eg ','
	   */
      public $thsnds;
}




/**
 * Class for defining what's in the EE_Config relating to registration settings
 */
class EE_Registration_Config extends EE_Config_Base{
	 
	/**
	 * 	Default registration status
	 * @var $default_STS_ID string
	 * eg 'RPN'
	 */
	public $default_STS_ID = 'RPN';
	  
	  /**
	   * Whether attendees need admin approval before their registration is approved
	   * @var $use_attendee_pre_approval boolean
	   */
      public $use_attendee_pre_approval = FALSE;
	  
	/**
	 * 	whether or not to show alternate payment options during the reg process if payment status is pending
	 * @var $pending_counts_reg_limit boolean
	 */
      public $show_pending_payment_options = FALSE;
	
	/**
	 * 	Whether pending registration status counts toward reg limits
	 * @var $pending_counts_reg_limit boolean
	 */
      public $pending_counts_reg_limit = TRUE;
	  
	  /**
	   * Whether or not to use ReCaptcha
	   * @var $use_captcha boolean
	   */
      public $use_captcha = FALSE;
	  
	  /**
	   * ReCaptcha Theme
	   * @var $recaptcha_theme string
	   * eg 'clean', 'red'
	   */
      public $recaptcha_theme = 'clean';
	  
	  /**
	   * ReCaptcha language
	   * @var $recaptcha_language string
	   * eg 'en'
	   */
      public $recaptcha_language = 'en';
	 
	  /**
	   * ReCaptcha width
	   * @var $recaptcha_width int
	   */
      public $recaptcha_width = 500;
	 
	  /**
	   * ReCaptcha public key
	   * @var $recaptcha_publickey string
	   */
      public $recaptcha_publickey = NULL;
	  
	  /**
	   * ReCaptcha private key
	   * @var $recaptcha_privatekey string
	   */
      public $recaptcha_privatekey = NULL;
	 


}


/**
 * Class for defining what's in the EE_Config relating to registration settings
 */
class EE_Core_Config extends EE_Config_Base{
	public $site_license_key = NULL;
	public $ee_ueip_optin = NULL;
	public $post_shortcodes = array();
	public $module_route_map = array();
	public $module_forward_map = array();
	public $module_view_map = array();
	public $reg_page_id = null;
	public $txn_page_id = null;
	public $thank_you_page_id = null;
	public $cancel_page_id = null;
}
// End of file EE_Config.core.php
// Location: /core/EE_Config.core.php