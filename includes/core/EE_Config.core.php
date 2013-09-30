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
	 * 	current_blog_id
	 *	@var 	int	$current_blog_id	
	 * 	@access 	public
	 */
	public $current_blog_id = NULL;
	
	/**
	 *
	 * @var EE_Core_Config
	 */
	public $core;

	/**
	 *
	 * @var EE_Organization_Config
	 */
	public $organization;
	
	/**
	 * 
	 * @var EE_Currency_Config 
	 */
	public $currency;
	
	/**
	 *
	 * @var EE_Registration_Config
	 */
	public $registration;

	/**
	 *
	 * @var EE_Gateway_Config
	 */
	public $gateway;




	/**
	 *		@singleton method used to instantiate class object
	 *		@access public
	 *		@return EE_Config instance
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
		//set defaults
		$this->core = new EE_Core_Config();
		$this->organization = new EE_Organization_Config();
		$this->currency = new EE_Currency_Config();
		$this->registration = new EE_Registration_Config();
		$this->admin = new EE_Admin_Config();
		$this->template_settings = new EE_Admin_Config();
		$this->map_settings = new EE_Map_Config();
		$this->gateway = new EE_Gateway_Config();
		// set _module_route_map
		EE_Config::$_module_route_map = array();
		// set _module_forward_map
		EE_Config::$_module_forward_map = array();
		// set _module_view_map
		EE_Config::$_module_view_map = array();

		// load existing EE site settings
		$this->_load_config();
		add_action( 'init', array( $this, 'init' ), 10 );
		
	}





	/**
	 * 		load EE organization options and begin EE logging
	 *
	 * 		@access private
	 * 		@return void
	 */
	private function _load_config() {
		$espresso_config = $this->get_espresso_config();
		foreach ( $espresso_config as $config => $settings ) {
			if ( ! empty( $settings )) {
				$this->$config = $settings;
			}
		}
	}




	/**
	 * 	get_espresso_config
	 *
	 *  @access 	public
	 *  @return 	array of espresso config stuff
	 */
	public function get_espresso_config() {
		// grab espresso configuration
		if ( is_multisite() ) {
			// look for blog specific config
			if ( ! $CFG = get_blog_option( $this->current_blog_id, 'espresso_config', array() )) {
				// if not, then look for network config
				if ( ! $CFG = get_site_option( 'espresso_config', array() )) {
				    // if not, then look for generic config
					$CFG = get_option( 'espresso_config', array() );
				}						
			}
		} else {
			$CFG = get_option( 'espresso_config', array() );
		}
		$CFG = apply_filters( 'FHEE__Config__get_espresso_config__CFG', $CFG );
		return $CFG;
	}



	/**
	 * 	update_espresso_config'
	 *
	 *  @access 	public
	 *  @return 	boolean success 
	 */
	public function update_espresso_config( $add_succes = FALSE, $add_error = TRUE ) {
		// compare existing settings with what's already saved'
		$no_change = TRUE;
		$espresso_config = $this->get_espresso_config();
		foreach ( $espresso_config as $config => $settings ) {
			if ( $this->$config != $settings ) {
				$no_change = FALSE;
				break;
			}
		}		
		// update
		if ( is_multisite() ) {
			// look for blog specific config
			if ( ! $saved = update_blog_option( $this->current_blog_id, 'espresso_config', $this )) {
				// if not, then look for network config
				if ( ! $saved = update_site_option( 'espresso_config', $this )) {
				    // if not, then look for generic config
					$saved = update_option( 'espresso_config', $this );
				}						
			}
		} else {
			$saved = update_option( 'espresso_config', $this );
		}
		// if config remains the same or was updated successfully
		if ( $no_change || $saved ) {
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
		$this->core->post_shortcodes = isset( $this->core->post_shortcodes ) && is_array( $this->core->post_shortcodes ) ? $this->core->post_shortcodes : array();
		// cycle thru post_shortcodes
		foreach( $this->core->post_shortcodes as $post_name => $shortcodes ){
			// skip the posts page, because we want all shortcodes registered for it
			if ( $post_name != 'posts' ) {
				foreach( $shortcodes as $shortcode => $post_id ){
					if ( $post = get_post( $post_id )) {
						if ( $post->post_name == $post_name ) {
//							echo '<h4>$post_name : ' . $post_name . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
							break;
						}
					}
					unset( $this->core->post_shortcodes[ $post_name ] );
				}
			}
		}
		//only show errors
		$this->update_espresso_config();
	}



	/**
	 * 	init
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function init() {
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
		EE_Registry::instance()->shortcodes = apply_filters( 'FHEE__Front_Controller__register_shortcodes__installed_shortcodes', EE_Registry::instance()->shortcodes );
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
		EE_Registry::instance()->modules = apply_filters( 'FHEE__Front_Controller__register_modules__installed_modules', EE_Registry::instance()->modules );
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




	/**
	 * 	__sleep
	 *
	 *  @access 	public
	 *  @return 	array
	 */
	public function __sleep() {
		return array(
			'core',
			'organization',
			'currency',
			'registration',
			'admin',
			'template_settings',
			'map_settings',
			'gateway'
		);
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
 * Class for defining what's in the EE_Config relating to registration settings
 */
class EE_Core_Config extends EE_Config_Base {
	
	public $site_license_key;
	public $ee_ueip_optin;
	public $post_shortcodes;
	public $module_route_map;
	public $module_forward_map;
	public $module_view_map;
	public $reg_page_id;
	public $txn_page_id;
	public $thank_you_page_id;
	public $cancel_page_id;

	/**
	 * 	class constructor
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function __construct() {
		// set default organization settings
		$this->site_license_key = NULL;
		$this->ee_ueip_optin = TRUE;
		$this->post_shortcodes = array();
		$this->module_route_map = array();
		$this->module_forward_map = array();
		$this->module_view_map = array();
		$this->reg_page_id = FALSE;
		$this->txn_page_id = FALSE;
		$this->thank_you_page_id = FALSE;
		$this->cancel_page_id = FALSE;
	}	

}

/**
 * Config class for storing info on the Organization
 */
class EE_Organization_Config extends EE_Config_Base {
	
	/** 
	* @var string  $name
	* eg EE4.1
	*/ 
	public $name;
	
	/** 
	* @var string $address_1
	* eg 123 Onna Road
	*/ 
	public $address_1;
	
	/** 
	* @var string $address_2
	* eg PO Box 123
	*/ 
	public $address_2;
	
	/** 
	* @var string $city
	* eg Inna City
	*/ 
	public $city;
	
	/** 
	* @var int $STA_ID
	* eg 4
	*/ 
	public $STA_ID;
	
	/** 
	* @var string  $CNT_ISO 
	* eg US
	*/ 
	public $CNT_ISO;
	
	/** 
	* @var string $zip 
	* eg 12345  or V1A 2B3
	*/ 
	public $zip;
	
	/** 
	* @var string  $email 
	* eg support@eventespresso.com
	*/ 
	public $email;
	
	/** 
	* @var string  $logo_url 
	* eg http://www.somedomain.com/wp-content/uploads/kittehs.jpg
	*/ 
	public $logo_url;

	/**
	 * 	class constructor
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function __construct() {
		// set default organization settings
		$this->name = get_bloginfo('name');
		$this->address_1 = '123 Onna Road';
		$this->address_2 = 'PO Box 123';
		$this->city = 'Inna City';
		$this->STA_ID = 4;
		$this->CNT_ISO = 'US';
		$this->zip = '12345';
		$this->email = get_bloginfo('admin_email');
		$this->logo_url = '';	
	}
	
}




/**
 * Class for defining what's in the EE_Config relating to currency
 */
class EE_Currency_Config extends EE_Config_Base {

	/**
	* @var string  $code
	* eg 'US'
	*/
	public $code;
	
	/**
	* @var string $name
	* eg 'Dollar'
	*/
	public $name;

	/**
	* plural name
	* @var string $plural
	* eg 'Dollars'
	*/
	public $plural;

	/**
	* currency sign
	* @var string  $sign
	* eg '$'
	*/
	public $sign;
	
	/**
	* Whether the currency sign shoudl come before the number or not
	* @var boolean $sign_b4
	*/
	public $sign_b4;

	/**
	* How many digits should come after the decimal place
	* @var int $dec_plc
	*/
	public $dec_plc;
	
	/**
	* Symbol to use for decimal mark
	* @var string $dec_mrk
	* eg '.'
	*/
	public $dec_mrk;
	
	/**
	* Symbol to use for thousands
	* @var string $thsnds
	* eg ','
	*/
	public $thsnds;


	/**
	 * 	class constructor
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function __construct() {
		// set default currency settings
		$this->code = 'USD'; 	// currency code: USD, CAD, EUR
		$this->name = __( 'Dollar', 'event_espresso' ); 	// Dollar
		$this->plural = __( 'Dollars', 'event_espresso' ); 	// Dollars
		$this->sign =  '$'; 	// currency sign: $
		$this->sign_b4 = TRUE; 	// currency sign before or after: $TRUE  or  FALSE$
		$this->dec_plc = 2; 	// decimal places: 2 = 0.00  3 = 0.000
		$this->dec_mrk = '.'; 	// decimal mark: (comma) ',' = 0,01   or (decimal) '.' = 0.01
		$this->thsnds = ','; 	// thousands separator: (comma) ',' = 1,000   or (decimal) '.' = 1.000
	}
}




/**
 * Class for defining what's in the EE_Config relating to registration settings
 */
class EE_Registration_Config extends EE_Config_Base {
	 
	/**
	 * Default registration status
	 * @var string $default_STS_ID
	 * eg 'RPN'
	 */
	public $default_STS_ID;
	  
	  /**
	   * Whether attendees need admin approval before their registration is approved
	   * @var boolean $use_attendee_pre_approval
	   */
      public $use_attendee_pre_approval;
	  
	/**
	 * 	whether or not to show alternate payment options during the reg process if payment status is pending
	 * @var boolean $pending_counts_reg_limit
	 */
      public $show_pending_payment_options;
	
	/**
	 * Whether pending registration status counts toward reg limits
	 * @var boolean $pending_counts_reg_limit
	 */
      public $pending_counts_reg_limit;
	  
	  /**
	   * Whether or not to use ReCaptcha
	   * @var boolean $use_captcha
	   */
      public $use_captcha;
	  
	  /**
	   * ReCaptcha Theme
	   * @var string $recaptcha_theme
	   * eg 'clean', 'red'
	   */
      public $recaptcha_theme;
	  
	  /**
	   * ReCaptcha language
	   * @var string $recaptcha_language
	   * eg 'en'
	   */
      public $recaptcha_language;
	 
	  /**
	   * ReCaptcha width
	   * @var int $recaptcha_width
	   */
      public $recaptcha_width;
	 
	  /**
	   * ReCaptcha public key
	   * @var string $recaptcha_publickey
	   */
      public $recaptcha_publickey;
	  
	  /**
	   * ReCaptcha private key
	   * @var string $recaptcha_privatekey
	   */
      public $recaptcha_privatekey;


	/**
	 * 	class constructor
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function __construct() {
		// set default registration settings
		$this->default_STS_ID = 'RPN'; 	// default reg status
		$this->use_attendee_pre_approval = FALSE;
		$this->show_pending_payment_options = FALSE;
		$this->pending_counts_reg_limit = TRUE;
		$this->use_captcha = FALSE;
		$this->recaptcha_theme = 'clean';
		$this->recaptcha_language = 'en';
		$this->recaptcha_width = 500;
		$this->recaptcha_publickey = NULL;
		$this->recaptcha_privatekey = NULL;
	}

}



/**
 * Class for defining what's in the EE_Config relating to admin settings
 */
class EE_Admin_Config extends EE_Config_Base {

	/**
	* @var boolean $use_personnel_manager
	*/
	public $use_personnel_manager;

	/**
	* @var boolean $use_dashboard_widget
	*/
	public $use_dashboard_widget;

	/**
	* @var int $events_in_dasboard
	*/
	public $events_in_dasboard;

	/**
	* @var boolean $use_event_timezones
	*/
	public $use_event_timezones;

	/**
	* @var boolean $use_full_logging
	*/
	public $use_full_logging;

	/**
	* @var boolean $use_remote_logging
	*/
	public $use_remote_logging;

	/**
	* @var string $remote_logging_url
	*/
	public $remote_logging_url;

	/**
	* @var boolean $show_reg_footer
	*/
	public $show_reg_footer;

	/**
	* @var string $affiliate_id
	*/
	public $affiliate_id;


	/**
	 * 	class constructor
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function __construct() {
		// set default general admin settings
		$this->use_personnel_manager = TRUE;
		$this->use_dashboard_widget = TRUE;
		$this->events_in_dasboard = 30;
		$this->use_event_timezones = FALSE;
		$this->use_full_logging = FALSE;
		$this->use_remote_logging = FALSE;
		$this->remote_logging_url = NULL;
		$this->show_reg_footer = TRUE;
		$this->affiliate_id = NULL;
	}

}



/**
 * Class for defining what's in the EE_Config relating to template settings
 */
class EE_Template_Config extends EE_Config_Base {

	/**
	* @var boolean $enable_default_style
	*/
	public $enable_default_style;

	/**
	* @var boolean $display_address_in_regform
	*/
	public $display_address_in_regform;

	/**
	* @var int $display_description_on_multi_reg_page
	*/
	public $display_description_on_multi_reg_page;

	/**
	* @var boolean $use_custom_templates
	*/
	public $use_custom_templates;


	/**
	 * 	class constructor
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function __construct() {
		// set default template settings
		$this->enable_default_style = TRUE;
		$this->display_address_in_regform = TRUE;
		$this->display_description_on_multi_reg_page = FALSE;
		$this->use_custom_templates = FALSE;
	}

}



/**
 * Class for defining what's in the EE_Config relating to map settings
 */
class EE_Map_Config extends EE_Config_Base {

	/**
	* @var boolean $use_google_maps
	*/
	public $use_google_maps;

	/**
	* @var int $event_details_map_width
	*/
	public $event_details_map_width;

	/**
	* @var int $event_details_map_height
	*/
	public $event_details_map_height;

	/**
	* @var int $event_details_map_zoom
	*/
	public $event_details_map_zoom;

	/**
	* @var boolean $event_details_display_nav
	*/
	public $event_details_display_nav;

	/**
	* @var boolean $event_details_nav_size
	*/
	public $event_details_nav_size;

	/**
	* @var string $event_details_control_type
	*/
	public $event_details_control_type;

	/**
	* @var string $event_details_map_align
	*/
	public $event_details_map_align;

	/**
	* @var int $event_list_map_width
	*/
	public $event_list_map_width;

	/**
	* @var int $event_list_map_height
	*/
	public $event_list_map_height;

	/**
	* @var int $event_list_map_zoom
	*/
	public $event_list_map_zoom;

	/**
	* @var boolean $event_list_display_nav
	*/
	public $event_list_display_nav;

	/**
	* @var boolean $event_list_nav_size
	*/
	public $event_list_nav_size;

	/**
	* @var string $event_list_control_type
	*/
	public $event_list_control_type;

	/**
	* @var string $event_list_map_align
	*/
	public $event_list_map_align;



	/**
	 * 	class constructor
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function __construct() {
		// set default map settings
		$this->use_google_maps = TRUE;
		// for event details pages (reg page)
		$this->event_details_map_width = 585; 			// ee_map_width_single
		$this->event_details_map_height = 362; 			// ee_map_height_single
		$this->event_details_map_zoom = 14; 			// ee_map_zoom_single
		$this->event_details_display_nav = TRUE; 			// ee_map_nav_display_single
		$this->event_details_nav_size = FALSE; 			// ee_map_nav_size_single
		$this->event_details_control_type = 'default'; 		// ee_map_type_control_single
		$this->event_details_map_align = 'center'; 			// ee_map_align_single
		// for event list pages
		$this->event_list_map_width = 300; 			// ee_map_width
		$this->event_list_map_height = 185; 		// ee_map_height
		$this->event_list_map_zoom = 12; 			// ee_map_zoom
		$this->event_list_display_nav = FALSE; 		// ee_map_nav_display
		$this->event_list_nav_size = TRUE; 			// ee_map_nav_size
		$this->event_list_control_type = 'dropdown'; 		// ee_map_type_control
		$this->event_list_map_align = 'center'; 			// ee_map_align
	}

}

/**
 * stores payment gateway info
 */
class EE_Gateway_Config extends EE_Config_Base{
	/**
	 * Array with keys that are payment gateways slugs, and values are arrays 
	 * with any config info the gateway wants to store 
	 * @var array
	 */
	public $payment_settings;
	/**
	 * Where keys are gateway slugs, and values are booleans indicating whether or not
	 * the gateway is stored in the uploads directory
	 * @var array
	 */
	public $active_gateways;
	
	public function __construct(){
		$this->payment_settings = array();
		$this->active_gateways = array('Invoice'=>false);
	}
}


// End of file EE_Config.core.php
// Location: /core/EE_Config.core.php