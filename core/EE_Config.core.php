<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Event Espresso
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
 * @subpackage		core/
 * @author				Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
final class EE_Config {


	/**
	 * 	instance of the EE_Config object
	 *	@var 	EE_Config $_instance
	 * 	@access 	private
	 */
	private static $_instance = NULL;

	/**
	 * An StdClass whose property names are addon slugs,
	 * and values are their config classes
	 * @var StdClass
	 */
	public $addons;

	/**
	 *
	 * @var EE_Admin_Config
	 */
	public $admin;

	/**
	 *
	 * @var EE_Core_Config
	 */
	public $core;

	/**
	 *
	 * @var EE_Currency_Config
	 */
	public $currency;

	/**
	 *
	 * @var EE_Gateway_Config
	 */
	public $gateway;

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
	 * @var EE_Template_Config
	 */
	public $template_settings;



	/**
	 * Holds EE environment values.
	 *
	 * @var EE_Environment_Config
	 */
	public $environment;


	/**
	 *	@var 	array	$_config_option_names
	 * 	@access 	private
	 */
	private $_config_option_names = array();

	/**
	 *	@var 	array	$_module_route_map
	 * 	@access 	private
	 */
	private static $_module_route_map = array();

	/**
	 *	@var 	array	$_module_forward_map
	 * 	@access 	private
	 */
	private static $_module_forward_map = array();

	/**
	 *	@var 	array	$_module_view_map
	 * 	@access 	private
	 */
	private static $_module_view_map = array();



	/**
	 *		@singleton method used to instantiate class object
	 *		@access public
	 *		@return EE_Config instance
	 */
	public static function instance() {
		// check if class object is instantiated, and instantiated properly
		if ( ! self::$_instance instanceof EE_Config ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}



	/**
	 *    class constructor
	 *
	 * @access    private
	 * @return \EE_Config
	 */
	private function __construct() {
		do_action( 'AHEE__EE_Config__construct__begin',$this );
		//set defaults
		$this->_config_option_names = get_option( 'ee_config_option_names', array() );
		$this->core = new EE_Core_Config();
		$this->organization = new EE_Organization_Config();
		$this->currency = new EE_Currency_Config();
		$this->registration = new EE_Registration_Config();
		$this->admin = new EE_Admin_Config();
		$this->template_settings = new EE_Template_Config();
		$this->map_settings = new EE_Map_Config();
		$this->gateway = new EE_Gateway_Config();
		$this->environment = new EE_Environment_Config();
		$this->addons = new stdClass();
		// set _module_route_map
		EE_Config::$_module_route_map = array();
		// set _module_forward_map
		EE_Config::$_module_forward_map = array();
		// set _module_view_map
		EE_Config::$_module_view_map = array();
		// load existing EE site settings
		$this->_load_core_config();
		//  register shortcodes and modules
		add_action( 'AHEE__EE_System__register_shortcodes_modules_and_widgets', array( $this, 'register_shortcodes_and_modules' ), 999 );
		//  initialize shortcodes and modules
		add_action( 'AHEE__EE_System__core_loaded_and_ready', array( $this, 'initialize_shortcodes_and_modules' ));
		// register widgets
		add_action( 'widgets_init', array( $this, 'widgets_init' ), 10 );
		// shutdown
		add_action( 'shutdown', array( $this, 'shutdown' ), 10 );
		// construct__end hook
		do_action( 'AHEE__EE_Config__construct__end',$this );
		// hardcoded hack
		$this->template_settings->current_espresso_theme = 'Espresso_Arabica_2014';
	}




	/**
	 * use to get the current theme if needed from static context
	 * @return string current theme set.
	 */
	public static function get_current_theme() {
		return isset( self::$_instance->template_settings->current_espresso_theme ) ? self::$_instance->template_settings->current_espresso_theme : 'Espresso_Arabica_2014';
	}




	/**
	 * 		load core plugin configuration
	 *
	 * 		@access private
	 * 		@return void
	 */
	private function _load_core_config() {
		$update = FALSE;
		$this->_load_calendar_config();
		$convert_from_array = array( 'addons' );
		$espresso_config = $this->get_espresso_config();
		foreach ( $espresso_config as $config => $settings ) {
			// in case old settings were saved as an array
			if ( is_array( $settings ) && in_array( $config, $convert_from_array )) {
				$settings = $this->_migrate_old_config_data( $settings );
				$update = TRUE;
			}
			$config_class = is_object( $settings ) && is_object( $this->$config ) ? get_class( $this->$config ) : '';
			if ( ! empty( $settings ) && $settings instanceof $config_class ) {
				$this->$config = apply_filters( 'FHEE__EE_Config___load_core_config__' . $config, $settings );
			}
		}
		if ( $update ) {
			$this->update_espresso_config();
		}
		// construct__end hook
		do_action( 'AHEE__EE_Config___load_core_config__end', $this );
	}



	/**
	 *    _load_calendar_config
	 *
	 * @access    public
	 * @return    stdClass
	 */
	private function _load_calendar_config() {
		// grab array of all plugin folders and loop thru it
		$plugins = glob( WP_PLUGIN_DIR . DS . '*', GLOB_ONLYDIR );
		foreach ( $plugins as $plugin_path ) {
			// grab plugin folder name from path
			$plugin = basename( $plugin_path );
			// drill down to Espresso plugins
			if ( strpos( $plugin, 'espresso' ) !== FALSE || strpos( $plugin, 'Espresso' ) !== FALSE || strpos( $plugin, 'ee4' ) !== FALSE || strpos( $plugin, 'EE4' ) !== FALSE ) {
				// then to calendar related plugins
				if ( strpos( $plugin, 'calendar' ) !== FALSE ) {
					// this is what we are looking for
					$calendar_config = $plugin_path . DS . 'EE_Calendar_Config.php';
					// does it exist in this folder ?
					if ( is_readable( $calendar_config )) {
						// YEAH! let's load it
						require_once( $calendar_config );
					}
				}
			}
		}
	}



	/**
	 *    _migrate_old_config_data
	 *
	 * @access    public
	 * @param array  $settings
	 * @return    stdClass
	 */
	private function _migrate_old_config_data( $settings = array() ) {
		// convert existing settings to an object
		$config_array = $settings;
		$settings = new stdClass();
		foreach ( $config_array as $key => $value ){
			if ( $key == 'calendar' && class_exists( 'EE_Calendar_Config' )) {
				$this->set_config( 'addons', 'EE_Calendar', 'EE_Calendar_Config', $value );
//				$config_option_name = $this->_generate_config_option_name( 'addons', 'EE_Calendar' );
//				delete_option( $config_option_name );
//				// save calendar settings using new methods
//				add_option( $config_option_name, $value, '', 'no' );
//				// if the config option name hasn't been added yet to the list of option names we're tracking, then do so now
//				if ( ! in_array( $config_option_name, $this->_config_option_names )) {
//					$this->_config_option_names[] = $config_option_name;
//				}
//				$this->addons->EE_Calendar = $value;
			} else {
				$settings->$key = $value;
			}
		}
		return $settings;
	}



	/**
	 * 	get_espresso_config
	 *
	 *  @access 	public
	 *  @return 	array of espresso config stuff
	 */
	public function get_espresso_config() {
		// grab espresso configuration
		return apply_filters( 'FHEE__EE_Config__get_espresso_config__CFG', get_option( 'ee_config', array() ));
	}


	/**
	 * 	double_check_config_comparison
	 *
	 *  @access 	public
	 */
	public function double_check_config_comparison( $option = '', $old_value, $value ) {
		// make sure we're checking the ee config
		if ( $option == 'ee_config' ) {
			// run a loose comparison of the old value against the new value for type and properties, but NOT exact instance like WP update_option does
			if ( $value != $old_value ) {
				// if they are NOT the same, then remove the hook, which means the subsequent update results will be based solely on the update query results
				// the reason we do this is because, as stated above, WP update_option performs an exact instance comparison (===) on any update values passed to it
				// this happens PRIOR to serialization and any subsequent update. If values are found to match their previous old value, then WP bails before performing any update.
				// Since we are passing the EE_Config object, it is comparing the EXACT instance of the saved version it just pulled from the db, with the one being passed to it (which will not match).
				// HOWEVER, once the object is serialized and passed off to MySQL to update,
				// MySQL MAY ALSO NOT perform the update because the string it sees in the db looks the same as the new one it has been passed!!!
				// This results in the query returning an "affected rows" value of ZERO, which gets returned immediately by WP update_option and looks like an error.
				remove_action( 'update_option', array( $this, 'check_config_updated' ));
			}
		}
	}



	/**
	 *    update_espresso_config
	 *
	 * @access   public
	 * @param   bool $add_success
	 * @param   bool $add_error
	 * @return   bool
	 */
	public function update_espresso_config( $add_success = FALSE, $add_error = TRUE ) {
		$instance = self::$_instance;
		self::$_instance = NULL;
		do_action( 'AHEE__EE_Config__update_espresso_config__begin',$this );
		// hook into update_option because that happens AFTER the ( $value === $old_value ) conditional but BEFORE the actual update occurs
		add_action( 'update_option', array( $this, 'double_check_config_comparison' ), 1, 3 );
		// now update "ee_config"
		$saved = update_option( 'ee_config', $this );
		// if not saved... check if the hook we just added still exists; if it does, it means one of two things:
		// that update_option bailed at the ( $value === $old_value ) conditional, or...
		// the db update query returned 0 rows affected (probably because the data  value was the same from it's perspective)
		// so the existence of the hook means that a negative result from update_option is NOT an error, but just means no update occurred, so don't display an error to the user.
		// BUT... if update_option returns FALSE, AND the hook is missing, then it means that something truly went wrong
		$saved = ! $saved ? has_action( 'update_option', array( $this, 'double_check_config_comparison' )) : $saved;
		// remove our action since we don't want it in the system anymore
		remove_action( 'update_option', array( $this, 'double_check_config_comparison' ), 1 );
		do_action( 'AHEE__EE_Config__update_espresso_config__end', $this, $saved );
		self::$_instance = $instance;
		unset( $instance );
		// if config remains the same or was updated successfully
		if ( $saved ) {
			if ( $add_success ) {
				EE_Error::add_success( __( 'The Event Espresso Configuration Settings have been successfully updated.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
			}
			return TRUE;
		} else {
			if ( $add_error ) {
				EE_Error::add_error( __( 'The Event Espresso Configuration Settings were not updated.', 'event_espresso' ), __FILE__, __FUNCTION__, __LINE__ );
			}
			return FALSE;
		}
	}


	/**
	 *    _verify_config_params
	 *
	 * @access    private
	 * @param    string                $section
	 * @param    string                $name
	 * @param    string                $config_class
	 * @param    EE_Config_Base 	$config_obj
	 * @param    array                 $tests_to_run
	 * @param    bool                  $display_errors
	 * @return    bool    TRUE on success, FALSE on fail
	 */
	private function _verify_config_params( $section = '', $name = '', $config_class = '', $config_obj = NULL, $tests_to_run = array( 1, 2, 3, 4, 5, 6, 7, 8 ), $display_errors = TRUE ) {
		try {
			// TEST #1 : check that section was set
			if ( in_array( 1, $tests_to_run ) && empty( $section )) {
				if ( $display_errors ) {
					throw new EE_Error( sprintf( __( 'No configuration section has been provided while attempting to save "%s".', 'event_espresso' ), $config_class ));
				}
				return FALSE;
			}
			// TEST #2 : check that settings section exists
			if ( in_array( 2, $tests_to_run ) && ! isset( $this->{$section} )) {
				if ( $display_errors ) {
					throw new EE_Error( sprintf( __( 'The "%s" configuration section does not exist.', 'event_espresso' ), $section ));
				}
				return FALSE;
			}
			// TEST #3 : check that section is the proper format
			if ( in_array( 3, $tests_to_run ) && ! ( $this->{$section} instanceof EE_Config_Base || $this->{$section} instanceof stdClass )) {
				if ( $display_errors ) {
					throw new EE_Error( sprintf( __( 'The "%s" configuration settings have not been formatted correctly.', 'event_espresso' ), $section ));
				}
				return FALSE;
			}
			// TEST #4 : check that config section name has been set
			if ( in_array( 4, $tests_to_run ) && empty( $name )) {
				if ( $display_errors ) {
					throw new EE_Error( __( 'No name has been provided for the specific configuration section.', 'event_espresso' ));
				}
				return FALSE;
			}
			// TEST #5 : check that config has even been set
			if ( in_array( 5, $tests_to_run ) && ! isset( $this->{$section}->{$name} )) {
				if ( $display_errors ) {
					throw new EE_Error( sprintf( __( 'No configuration has been set for "%s->%s".', 'event_espresso' ), $section, $name ));
				}
				return FALSE;
			}
			// TEST #6 : check that a config class name has been set
			if ( in_array( 6, $tests_to_run ) && empty( $config_class )) {
				if ( $display_errors ) {
					throw new EE_Error( __( 'No class name has been provided for the specific configuration section.', 'event_espresso' ));
				}
				return FALSE;
			}
			// TEST #7 : verify config class is accessible
			if ( in_array( 7, $tests_to_run ) && ! class_exists( $config_class )) {
				if ( $display_errors ) {
					throw new EE_Error( sprintf( __( 'The "%s" class does not exist. Please ensure that an autoloader has been set for it.', 'event_espresso' ), $config_class ));
				}
				return FALSE;
			}
			// TEST #8 : check that config is the requested type
			if ( in_array( 8, $tests_to_run ) && ! $this->{$section}->{$name} instanceof $config_class ) {
				if ( $display_errors ) {
					throw new EE_Error( sprintf( __( 'The configuration for "%s->%s" is not of the "%s" class.', 'event_espresso' ), $section, $name, $config_class ));
				}
				return FALSE;
			}
			// TEST #9 : verify config object
			if ( in_array( 9, $tests_to_run ) && ! $config_obj instanceof EE_Config_Base ) {				//			d( $config_obj );
				if ( $display_errors ) {
					throw new EE_Error( sprintf( __( 'The "%s" class is not an instance of EE_Config_Base.', 'event_espresso' ), print_r( $config_obj, TRUE )));
				}
				return FALSE;
			}
		} catch( EE_Error $e ) {
			$e->get_error();
		}
		// you have successfully run the gauntlet
		return TRUE;
	}



	/**
	 *    _generate_config_option_name
	 *
	 * @access        protected
	 * @param        string          $section
	 * @param        string          $name
	 * @return        string
	 */
	private function _generate_config_option_name( $section = '', $name = '' ) {
		return 'ee_config-' . $section . '-' . $name;
	}



	/**
	 *    _set_config_class
	 * ensures that a config class is set, either from a passed config class or one generated from the config name
	 *
	 * @access 	private
	 * @param 	string $config_class
	 * @param 	string $name
	 * @return 	string
	 */
	private function _set_config_class( $config_class = '', $name = '' ) {
		return ! empty( $config_class ) ? $config_class : str_replace( ' ', '_', ucwords( str_replace( '_', ' ', $name ))) . '_Config';
	}


	/**
	 *    set_config
	 *
	 * @access        protected
	 * @param        string  $section
	 * @param        string  $name
	 * @param        string  $config_class
	 * @param        \EE_Config_Base $config_obj
	 * @return        \EE_Config_Base|bool
	 */
	public function set_config( $section = '', $name = '', $config_class = '', EE_Config_Base $config_obj = NULL ) {
		// ensure config class is set to something
		$config_class = $this->_set_config_class( $config_class, $name );
		// run tests 1-4, 6, and 7 to verify all config params are set and valid
		if ( ! $this->_verify_config_params( $section, $name, $config_class, NULL, array( 1, 2, 3, 4, 6, 7 ))) {
			return FALSE;
		}
		// if the config option name hasn't been added yet to the list of option names we're tracking, then do so now
		if ( ! in_array( $this->_generate_config_option_name( $section, $name ), $this->_config_option_names )) {
			$this->_config_option_names[] = $this->_generate_config_option_name( $section, $name );
		}
		// verify the incoming config object but suppress errors
		if ( ! $this->_verify_config_params( $section, $name, $config_class, $config_obj, array( 9 ), FALSE )) {
			$config_obj = new $config_class();
		}
		// create a wp-option for this config
		if ( add_option( $this->_generate_config_option_name( $section, $name ), $config_obj, '', 'no' )) {
			$this->{$section}->{$name} = $config_obj;
			return $this->{$section}->{$name};
		} else {
			EE_Error::add_error( sprintf( __( 'The "%s" could not be saved to the database.', 'event_espresso' ), $config_class ), __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
	}



	/**
	 *    update_config
	 *
	 * @access 	public
	 * @param 	string 		$section
	 * @param 	string 		$name
	 * @param 	\EE_Config_Base|string $config_obj
	 * @return  bool
	 */
	public function update_config( $section = '', $name = '', $config_obj = '' ) {
		// get class name of the incoming object
		$config_class = get_class( $config_obj );
		// run tests 1-5 and 9 to verify config
		if ( ! $this->_verify_config_params( $section, $name, $config_class, $config_obj, array( 1, 2, 3, 4, 5, 9 ))) {
			return FALSE;
		}
		$config_option_name = $this->_generate_config_option_name( $section, $name );
		// check if config object has been added to db by seeing if config option name is in $this->_config_option_names array
		if ( ! in_array( $config_option_name, $this->_config_option_names  )) {
			// save new config to db
			return $this->set_config( $section, $name, $config_class, $config_obj );
		} else {
			// first check if the record already exists
			$existing_config = get_option( $config_option_name );
			// just return if db record is already up to date
			if ( $existing_config == $config_obj ) {
				$this->{$section}->{$name} = $config_obj;
				return TRUE;
			} else if ( update_option( $config_option_name, $config_obj )) {
				// update wp-option for this config class
				$this->{$section}->{$name} = $config_obj;
				return $this->update_espresso_config();
			} else {
				EE_Error::add_error(
					sprintf(
						__( 'The "%s" object stored at"%s" was not successfully updated in the database.', 'event_espresso' ),
						$config_class,
						'EE_Config->' . $section . '->' . $name
					),
					__FILE__, __FUNCTION__, __LINE__
				);
				return FALSE;
			}
		}
	}



	/**
	 *    get_config
	 *
	 * @access 	public
	 * @param 	string 	$section
	 * @param 	string 	$name
	 * @param 	string 	$config_class
	 * @return 	mixed EE_Config_Base | NULL
	 */
	public function get_config( $section = '', $name = '', $config_class = '' ) {
		// ensure config class is set to something
		$config_class = $this->_set_config_class( $config_class, $name );
		// run tests 1-4, 6 and 7 to verify that all params have been set
		if ( ! $this->_verify_config_params( $section, $name, $config_class, NULL, array( 1, 2, 3, 4, 6, 7 ))) {
			return NULL;
		}
		// now test if the requested config object exists, but suppress errors
		if ( $this->_verify_config_params( $section, $name, $config_class, NULL, array( 5, 8 ), FALSE )) {
			// config already exists, so pass it back
			return $this->{$section}->{$name};
		}
		// load config option from db if it exists
		$config_obj = $this->get_config_option( $this->_generate_config_option_name( $section, $name ));
		// verify the newly retrieved config object, but suppress errors
		if ( $this->_verify_config_params( $section, $name, $config_class, $config_obj, array( 9 ), FALSE )) {
			// config is good, so set it and pass it back
			$this->{$section}->{$name} = $config_obj;
			return $this->{$section}->{$name};
		}
		// oops! $config_obj is not already set and does not exist in the db, so create a new one
		$config_obj =$this->set_config( $section, $name, $config_class );
		// verify the newly created config object
		if ( $this->_verify_config_params( $section, $name, $config_class, $config_obj, array( 9 ))) {
			return $this->{$section}->{$name};
		} else {
			EE_Error::add_error( sprintf( __( 'The "%s" could not be retrieved from the database.', 'event_espresso' ), $config_class ), __FILE__, __FUNCTION__, __LINE__ );
		}
		return NULL;
	}


	/**
	 *    get_config_option
	 *
	 * @access 	public
	 * @param 	string 	$config_option_name
	 * @return 	mixed EE_Config_Base | FALSE
	 */
	public function get_config_option( $config_option_name = '' ) {
		// retrieve the wp-option for this config class.
		return get_option( $config_option_name );
	}




	/**
	 *    update_post_shortcodes
	 *
	 * @access    public
	 * @param $page_for_posts
	 * @return    void
	 */
	public function update_post_shortcodes( $page_for_posts = '' ) {
		// make sure page_for_posts is set
		$page_for_posts = ! empty( $page_for_posts ) ? $page_for_posts : EE_Config::get_page_for_posts();
		// critical page shortcodes that we do NOT want added to the Posts page (blog)
		$critical_shortcodes = $this->core->get_critical_pages_shortcodes_array();
		// allow others to mess stuff up :D
		do_action( 'AHEE__EE_Config__update_post_shortcodes', $this->core->post_shortcodes, $page_for_posts );
		// verify that post_shortcodes is set
		$this->core->post_shortcodes = isset( $this->core->post_shortcodes ) && is_array( $this->core->post_shortcodes ) ? $this->core->post_shortcodes : array();
		// cycle thru post_shortcodes
		foreach( $this->core->post_shortcodes as $post_name => $shortcodes ){
			// are there any shortcodes to track ?
			if ( ! empty( $shortcodes )) {
				// loop thru list of tracked shortcodes
				foreach( $shortcodes as $shortcode => $post_id ) {
					// if shortcode is for a critical page, BUT this is NOT the corresponding critical page for that shortcode
					if ( isset( $critical_shortcodes[ $post_id ] ) && $post_name == $page_for_posts ) {
						// then remove this shortcode, because we don't want critical page shortcodes like ESPRESSO_TXN_PAGE running on the "Posts Page" (blog)
						unset( $this->core->post_shortcodes[ $post_name ][ $shortcode ] );
					}
					// skip the posts page, because we want all shortcodes registered for it
					if ( $post_name == $page_for_posts ) {
						continue;
					}
					// make sure post still exists
					$post = get_post( $post_id );
					if ( $post ) {
						// check that the post name matches what we have saved
						if ( $post->post_name == $post_name ) {
							// if so, then break before hitting the unset below
							continue;
						}
					}
					// we don't like missing posts around here >:(
					unset( $this->core->post_shortcodes[ $post_name ] );
				}
			} else {
				// you got no shortcodes to keep track of !
				unset( $this->core->post_shortcodes[ $post_name ] );
			}
		}
		//only show errors
		$this->update_espresso_config();
	}



	/**
	 * 	get_page_for_posts
	 *
	 * 	if the wp-option "show_on_front" is set to "page", then this is the post_name for the post set in the wp-option "page_for_posts", or "posts" if no page is selected
	 *
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public static function get_page_for_posts() {
		$page_for_posts = get_option( 'page_for_posts' );
		if ( ! $page_for_posts ) {
			return 'posts';
		}
		global $wpdb;
		$SQL = 'SELECT post_name from ' . $wpdb->posts . ' WHERE post_type="posts" OR post_type="page" AND post_status="publish" AND ID=%s';
		return $wpdb->get_var( $wpdb->prepare( $SQL, $page_for_posts ));
	}



	/**
	 * 	register_shortcodes_and_modules.
	 *
	 * 	At this point, it's too early to tell if we're maintenance mode or not.
	 * 	In fact, this is where we give modules a chance to let core know they exist
	 * 	so they can help trigger maintenance mode if it's needed
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function register_shortcodes_and_modules() {
		if ( EE_Maintenance_Mode::disable_frontend_for_maintenance() ) {
			return;
		}
		// allow shortcodes to register with WP and to set hooks for the rest of the system
		EE_Registry::instance()->shortcodes =$this->_register_shortcodes();
		// allow modules to set hooks for the rest of the system
		EE_Registry::instance()->modules = $this->_register_modules();
	}


	/**
	 * 	initialize_shortcodes_and_modules
	 * 	meaning they can start adding their hooks to get stuff done
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function initialize_shortcodes_and_modules() {
		if ( EE_Maintenance_Mode::disable_frontend_for_maintenance() ) {
			return;
		}
		// allow shortcodes to set hooks for the rest of the system
		$this->_initialize_shortcodes();
		// allow modules to set hooks for the rest of the system
		$this->_initialize_modules();
	}




	/**
	 * 	widgets_init
	 *
	 * 	@access private
	 * 	@return void
	 */
	public function widgets_init() {
		if ( EE_Maintenance_Mode::disable_frontend_for_maintenance() ) {
			return;
		}
		//only init widgets on admin pages when not in complete maintenance, and
		//on frontend when not in any maintenance mode
		if (( is_admin() && EE_Maintenance_Mode::instance()->level() != EE_Maintenance_Mode::level_2_complete_maintenance)  || ! EE_Maintenance_Mode::instance()->level() ) {
			// grab list of installed widgets
			$widgets_to_register = glob( EE_WIDGETS . '*', GLOB_ONLYDIR );
			// filter list of modules to register
			$widgets_to_register = apply_filters( 'FHEE__EE_Config__register_widgets__widgets_to_register', $widgets_to_register );
			// cycle thru widget folders
			foreach ( $widgets_to_register as $widget_path ) {
				// add to list of installed widget modules
				EE_Config::register_ee_widget( $widget_path );
			}
			// filter list of installed modules
			EE_Registry::instance()->widgets = apply_filters( 'FHEE__EE_Config__register_widgets__installed_widgets', EE_Registry::instance()->widgets );
		}
	}



	/**
	 * 	register_ee_widget - makes core aware of this widget
	 *
	 *  @access 	public
	 *  @param 	string 	$widget_path - full path up to and including widget folder
	 *  @return 	void
	 */
	public static function register_ee_widget( $widget_path = NULL ) {
		do_action( 'AHEE__EE_Config__register_widget__begin', $widget_path );
		$widget_ext = '.widget.php';
		// make all separators match
		$widget_path = rtrim( str_replace( '/\\', DS, $widget_path ), DS );
		// does the file path INCLUDE the actual file name as part of the path ?
		if ( strpos( $widget_path, $widget_ext ) !== FALSE ) {
			// grab and shortcode file name from directory name and break apart at dots
			$file_name = explode( '.', basename( $widget_path ));
			// take first segment from file name pieces and remove class prefix if it exists
			$widget = strpos( $file_name[0], 'EEW_' ) === 0 ? substr( $file_name[0], 4 ) : $file_name[0];
			// sanitize shortcode directory name
			$widget = sanitize_key( $widget );
			// now we need to rebuild the shortcode path
			$widget_path = explode( DS, $widget_path );
			// remove last segment
			array_pop( $widget_path );
			// glue it back together
			$widget_path = implode( DS, $widget_path );
		} else {
			// grab and sanitize widget directory name
			$widget = sanitize_key( basename( $widget_path ));
		}
		// create classname from widget directory name
		$widget = str_replace( ' ', '_', ucwords( str_replace( '_', ' ', $widget )));
		// add class prefix
		$widget_class = 'EEW_' . $widget;
		// does the widget exist ?
		if ( ! is_readable( $widget_path . DS . $widget_class . $widget_ext )) {
			$msg = sprintf(
				__( 'The requested %s widget file could not be found or is not readable due to file permissions. Please ensure the following path is correct: %s', 'event_espresso' ),
				$widget_class,
				$widget_path . DS . $widget_class . $widget_ext
			);
			EE_Error::add_error( $msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__ );
			return;
		}
		// load the widget class file
		require_once( $widget_path . DS . $widget_class . $widget_ext );
		// verify that class exists
		if ( ! class_exists( $widget_class )) {
			$msg = sprintf( __( 'The requested %s widget class does not exist.', 'event_espresso' ), $widget_class );
			EE_Error::add_error( $msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__ );
			return;
		}
		register_widget( $widget_class );
		// add to array of registered widgets
		EE_Registry::instance()->widgets->$widget_class = $widget_path . DS . $widget_class . $widget_ext;
	}



	/**
	 * 		_register_shortcodes
	 *
	 * 		@access private
	 * 		@return array
	 */
	private function _register_shortcodes() {
		// grab list of installed shortcodes
		$shortcodes_to_register = glob( EE_SHORTCODES . '*', GLOB_ONLYDIR );
		// filter list of modules to register
		$shortcodes_to_register = apply_filters( 'FHEE__EE_Config__register_shortcodes__shortcodes_to_register', $shortcodes_to_register );
		// cycle thru shortcode folders
		foreach ( $shortcodes_to_register as $shortcode_path ) {
			// add to list of installed shortcode modules
			EE_Config::register_shortcode( $shortcode_path );
		}
		// filter list of installed modules
		return apply_filters( 'FHEE__EE_Config___register_shortcodes__installed_shortcodes', EE_Registry::instance()->shortcodes );
	}



	/**
	 * 	register_shortcode - makes core aware of this shortcode
	 *
	 *  @access 	public
	 *  @param 	string 		$shortcode_path - full path up to and including shortcode folder
	 *  @return 	bool
	 */
	public static function register_shortcode( $shortcode_path = NULL ) {
		do_action( 'AHEE__EE_Config__register_shortcode__begin',$shortcode_path );
		$shortcode_ext = '.shortcode.php';
		// make all separators match
		$shortcode_path = str_replace( array( '\\', '/' ), DS, $shortcode_path );
		// does the file path INCLUDE the actual file name as part of the path ?
		if ( strpos( $shortcode_path, $shortcode_ext ) !== FALSE ) {
			// grab shortcode file name from directory name and break apart at dots
			$shortcode_file = explode( '.', basename( $shortcode_path ));
			// take first segment from file name pieces and remove class prefix if it exists
			$shortcode = strpos( $shortcode_file[0], 'EES_' ) === 0 ? substr( $shortcode_file[0], 4 ) : $shortcode_file[0];
			// sanitize shortcode directory name
			$shortcode = sanitize_key( $shortcode );
			// now we need to rebuild the shortcode path
			$shortcode_path = explode( DS, $shortcode_path );
			// remove last segment
			array_pop( $shortcode_path );
			// glue it back together
			$shortcode_path = implode( DS, $shortcode_path ) . DS;
		} else {
			// we need to generate the filename based off of the folder name
			// grab and sanitize shortcode directory name
			$shortcode = sanitize_key( basename( $shortcode_path ));
			$shortcode_path = rtrim( $shortcode_path, DS ) . DS;
		}
		// create classname from shortcode directory or file name
		$shortcode = str_replace( ' ', '_', ucwords( str_replace( '_', ' ', $shortcode )));
		// add class prefix
		$shortcode_class = 'EES_' . $shortcode;
		// does the shortcode exist ?
		if ( ! is_readable( $shortcode_path . DS . $shortcode_class . $shortcode_ext )) {
			$msg = sprintf(
				__( 'The requested %s shortcode file could not be found or is not readable due to file permissions. It should be in %s', 'event_espresso' ),
				$shortcode_class,
				$shortcode_path . DS . $shortcode_class . $shortcode_ext
			);
			EE_Error::add_error( $msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		// load the shortcode class file
		require_once( $shortcode_path . $shortcode_class . $shortcode_ext );
		// verify that class exists
		if ( ! class_exists( $shortcode_class )) {
			$msg = sprintf( __( 'The requested %s shortcode class does not exist.', 'event_espresso' ), $shortcode_class );
			EE_Error::add_error( $msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		$shortcode = strtoupper( $shortcode );
		// add to array of registered shortcodes
		EE_Registry::instance()->shortcodes->$shortcode = $shortcode_path . $shortcode_class . $shortcode_ext;
		return TRUE;
	}




	/**
	 * 		_register_modules
	 *
	 * 		@access private
	 * 		@return array
	 */
	private function _register_modules() {
		// grab list of installed modules
		$modules_to_register = glob( EE_MODULES . '*', GLOB_ONLYDIR );
		// filter list of modules to register
		$modules_to_register = apply_filters( 'FHEE__EE_Config__register_modules__modules_to_register', $modules_to_register );
		// loop through folders
		foreach ( $modules_to_register as $module_path ) {
			/**TEMPORARILY EXCLUDE gateways from modules for time being**/
			if ( $module_path != EE_MODULES . 'zzz-copy-this-module-template' && $module_path != EE_MODULES . 'gateways' ) {
				// add to list of installed modules
				EE_Config::register_module( $module_path );
			}
		}
		// filter list of installed modules
		return apply_filters( 'FHEE__EE_Config___register_modules__installed_modules', EE_Registry::instance()->modules );
	}



	/**
	 * 	register_module - makes core aware of this module
	 *
	 *  @access 	public
	 *  @param 	string 		$module_path - full path up to and including module folder
	 *  @return 	bool
	 */
	public static function register_module( $module_path = NULL ) {
		do_action( 'AHEE__EE_Config__register_module__begin', $module_path );
		$module_ext = '.module.php';
		// make all separators match
		$module_path = str_replace( array( '\\', '/' ), DS, $module_path );
		// does the file path INCLUDE the actual file name as part of the path ?
		if ( strpos( $module_path, $module_ext ) !== FALSE ) {
			// grab and shortcode file name from directory name and break apart at dots
			$module_file = explode( '.', basename( $module_path ));
			// take first segment from file name pieces and remove class prefix if it exists
			$module = strpos( $module_file[0], 'EED_' ) === 0 ? substr( $module_file[0], 4 ) : $module_file[0];
			// sanitize shortcode directory name
			$module = sanitize_key( $module );
			// now we need to rebuild the shortcode path
			$module_path = explode( DS, $module_path );
			// remove last segment
			array_pop( $module_path );
			// glue it back together
			$module_path = implode( DS, $module_path ) . DS;
		} else {
			// we need to generate the filename based off of the folder name
			// grab and sanitize module name
			$module = basename( $module_path );
			$module_path = rtrim( $module_path, DS ) . DS;
		}
		// create classname from module directory name
		$module = str_replace( ' ', '_', ucwords( str_replace( '_', ' ', $module )));
		// add class prefix
		$module_class = 'EED_' . $module;
		// does the module exist ?
		if ( ! is_readable( $module_path . DS . $module_class . $module_ext )) {
			$msg = sprintf( __( 'The requested %s module file could not be found or is not readable due to file permissions.', 'event_espresso' ), $module );
			EE_Error::add_error( $msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		// load the module class file
		require_once( $module_path . $module_class . $module_ext );
		// verify that class exists
		if ( ! class_exists( $module_class )) {
			$msg = sprintf( __( 'The requested %s module class does not exist.', 'event_espresso' ), $module_class );
			EE_Error::add_error( $msg . '||' . $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}
		// add to array of registered modules
		EE_Registry::instance()->modules->$module_class = $module_path . $module_class . $module_ext;
		do_action( 'AHEE__EE_Config__register_module__complete', $module_class, EE_Registry::instance()->modules->$module_class );
		return TRUE;
	}




	/**
	 * 	_initialize_shortcodes
	 * 	allow shortcodes to set hooks for the rest of the system
	 *
	 * 	@access private
	 * 	@return void
	 */
	private function _initialize_shortcodes() {
		// cycle thru shortcode folders
		foreach ( EE_Registry::instance()->shortcodes as $shortcode => $shortcode_path ) {
			// add class prefix
			$shortcode_class = 'EES_' . $shortcode;
			// fire the shortcode class's set_hooks methods in case it needs to hook into other parts of the system
			// which set hooks ?
			if ( is_admin() ) {
				// fire immediately
				call_user_func( array( $shortcode_class, 'set_hooks_admin' ));
			} else {
				// delay until other systems are online
				add_action( 'AHEE__EE_System__set_hooks_for_shortcodes_modules_and_addons', array( $shortcode_class,'set_hooks' ));
				// convert classname to UPPERCASE and create WP shortcode.
				$shortcode_tag = strtoupper( $shortcode );
				// but first check if the shortcode has already been added before assigning 'fallback_shortcode_processor'
				if ( ! shortcode_exists( $shortcode_tag )) {
					// NOTE: this shortcode declaration will get overridden if the shortcode is successfully detected in the post content in EE_Front_Controller->_initialize_shortcodes()
					add_shortcode( $shortcode_tag, array( $shortcode_class, 'fallback_shortcode_processor' ));
				}
			}
		}
	}



	/**
	 * 	_initialize_modules
	 * 	allow modules to set hooks for the rest of the system
	 *
	 * 	@access private
	 * 	@return void
	 */
	private function _initialize_modules() {
		// cycle thru shortcode folders
		foreach ( EE_Registry::instance()->modules as $module_class => $module_path ) {
			// fire the shortcode class's set_hooks methods in case it needs to hook into other parts of the system
			// which set hooks ?
			if ( is_admin() ) {
				// fire immediately
				call_user_func( array( $module_class, 'set_hooks_admin' ));
			} else {
				// delay until other systems are online
				add_action( 'AHEE__EE_System__set_hooks_for_shortcodes_modules_and_addons', array( $module_class,'set_hooks' ));
			}
		}
	}




	/**
	 * 	register_route - adds module method routes to route_map
	 *
	 *  @access 	public
	 *  @param 	string 		$route - "pretty" public alias for module method
	 *  @param 	string 		$module - module name (classname without EED_ prefix)
	 *  @param 	string 		$method_name - the actual module method to be routed to
	 *  @return 	bool
	 */
	public static function register_route( $route = NULL, $module = NULL, $method_name = NULL ) {
		do_action( 'AHEE__EE_Config__register_route__begin', $route, $module, $method_name );
		$module = str_replace( 'EED_', '', $module );
		$module_class = 'EED_' . $module;
		if ( ! isset( EE_Registry::instance()->modules->$module_class )) {
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
		return TRUE;
	}



	/**
	 *    get_route - get module method route
	 *
	 *  @access 	public
	 *  @param 	string 		$route - "pretty" public alias for module method
	 *  @return 	string
	 */
	public static function get_route( $route = NULL ) {
		do_action( 'AHEE__EE_Config__get_route__begin',$route );
		$route = apply_filters( 'FHEE__EE_Config__get_route',$route );
		if ( isset( EE_Config::$_module_route_map[ $route ] )) {
			return EE_Config::$_module_route_map[ $route ];
		}
		return NULL;
	}



	/**
	 *    register_forward - allows modules to forward request to another module for further processing
	 *
	 * @access    public
	 * @param    string  $route  - "pretty" public alias for module method
	 * @param    integer $status - integer value corresponding  to status constant strings set in module parent class, allows different forwards to be served based on status
	 * @param null       $forward
	 * @internal  param array|string $mixed $forward - function name or array( class, method )
	 * @return    bool
	 */
	public static function register_forward( $route = NULL, $status = 0, $forward = NULL ) {
		do_action( 'AHEE__EE_Config__register_forward',$route,$status,$forward );
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
		return TRUE;
	}



	/**
	 * 	get_forward - get forwarding route
	 *
	 *  @access 	public
	 *  @param 	string 		$route - "pretty" public alias for module method
	 *  @param 	integer	$status - integer value corresponding  to status constant strings set in module parent class, allows different forwards to be served based on status
	 *  @return 	string
	 */
	public static function get_forward( $route = NULL, $status = 0 ) {
		do_action( 'AHEE__EE_Config__get_forward__begin',$route,$status );
		if ( isset( EE_Config::$_module_forward_map[ $route ][ $status ] )) {
			return apply_filters( 'FHEE__EE_Config__get_forward',EE_Config::$_module_forward_map[ $route ][ $status ],$route,$status );
		}
		return NULL;
	}



	/**
	 *    register_forward - allows modules to specify different view templates for different method routes and status results
	 *
	 * @access    public
	 * @param    string  $route  - "pretty" public alias for module method
	 * @param    integer $status - integer value corresponding  to status constant strings set in module parent class, allows different views to be served based on status
	 * @param    string   $view
	 * @internal  param array|string $mixed $forward - function name or array( class, method )
	 * @return    bool
	 */
	public static function register_view( $route = NULL, $status = 0, $view = NULL ) {
		do_action( 'AHEE__EE_Config__register_view__begin',$route,$status,$view );
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
		return TRUE;
	}





	/**
	 * 	get_view - get view for route and status
	 *
	 *  @access 	public
	 *  @param 	string 		$route - "pretty" public alias for module method
	 *  @param 	integer	$status - integer value corresponding  to status constant strings set in module parent class, allows different views to be served based on status
	 *  @return 	string
	 */
	public static function get_view( $route = NULL, $status = 0 ) {
		do_action( 'AHEE__EE_Config__get_view__begin',$route,$status );
		if ( isset( EE_Config::$_module_view_map[ $route ][ $status ] )) {
			return apply_filters( 'FHEE__EE_Config__get_view',EE_Config::$_module_view_map[ $route ][ $status ],$route,$status );
		}
		return NULL;
	}



	public function shutdown() {
		update_option( 'ee_config_option_names', $this->_config_option_names );
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
//	public function __get($a) { return apply_filters('FHEE__'.get_class($this).'__get__'.$a,$this->$a); }
//	public function __set($a,$b) { return apply_filters('FHEE__'.get_class($this).'__set__'.$a, $this->$a = $b ); }
	/**
	 * 		__isset
	 */
	public function __isset($a) { return FALSE; }
	/**
	 * 		__unset
	 */
	public function __unset($a) { return FALSE; }
	/**
	 * 		__clone
	 */
	public function __clone() { return FALSE; }
	/**
	 * 		__wakeup
	 */
	public function __wakeup() { return FALSE; }
	/**
	 * 		__destruct
	 */
	public function __destruct() { return FALSE; }
}




/**
 * Class for defining what's in the EE_Config relating to registration settings
 */
class EE_Core_Config extends EE_Config_Base {

	public $current_blog_id;
	public $ee_ueip_optin;
	public $ee_ueip_has_notified;
	/**
	 * Not to be confused with the 4 critical page variables (See
	 * get_critical_pages_array()), this is just an array of wp posts that have EE
	 * shortcodes in them. Keys are slugs, values are arrays with only 1 element: where the key is the shortcode
	 * in the page, and the value is the page's ID. The key 'posts' is basially a duplicate of this same array.
	 * @var array
	 */
	public $post_shortcodes;
	public $module_route_map;
	public $module_forward_map;
	public $module_view_map;
	/**
	 * The next 4 vars are the IDs of critical EE pages.
	 * @var int
	 */
	public $reg_page_id;
	public $txn_page_id;
	public $thank_you_page_id;
	public $cancel_page_id;
	/**
	 * The next 4 vars are the URLs of critical EE pages.
	 * @var int
	 */
	public $reg_page_url;
	public $txn_page_url;
	public $thank_you_page_url;
	public $cancel_page_url;



	/**
	 *    class constructor
	 *
	 * @access    public
	 * @return \EE_Core_Config
	 */
	public function __construct() {
		$current_network_main_site = is_multisite() ? get_current_site() : NULL;
		$current_main_site_id = !empty( $current_network_main_site ) ? $current_network_main_site->blog_id : 1;
		// set default organization settings
		$this->current_blog_id = get_current_blog_id();
		$this->current_blog_id = $this->current_blog_id === NULL ? 1 : $this->current_blog_id;
		$this->ee_ueip_optin = is_main_site() ? get_option( 'ee_ueip_optin', TRUE ) : get_blog_option( $current_main_site_id, 'ee_ueip_optin', TRUE );
		$this->ee_ueip_has_notified = is_main_site() ? get_option( 'ee_ueip_has_notified', FALSE ) : TRUE;
		$this->post_shortcodes = array();
		$this->module_route_map = array();
		$this->module_forward_map = array();
		$this->module_view_map = array();
		// critical EE page IDs
		$this->reg_page_id = FALSE;
		$this->txn_page_id = FALSE;
		$this->thank_you_page_id = FALSE;
		$this->cancel_page_id = FALSE;
		// critical EE page URLs
		$this->reg_page_url = FALSE;
		$this->txn_page_url = FALSE;
		$this->thank_you_page_url = FALSE;
		$this->cancel_page_url = FALSE;

		//ueip constant check
		if ( defined( 'EE_DISABLE_UXIP' ) && EE_DISABLE_UXIP ) {
			$this->ee_ueip_optin = FALSE;
			$this->ee_ueip_has_notified = TRUE;
		}
	}



	/**
	 * @return array
	 */
	public function get_critical_pages_array() {
		return array(
			$this->reg_page_id,
			$this->txn_page_id,
			$this->thank_you_page_id,
			$this->cancel_page_id
		);
	}


	/**
	 * @return array
	 */
	public function get_critical_pages_shortcodes_array() {
		return array(
			$this->reg_page_id => 'ESPRESSO_CHECKOUT',
			$this->txn_page_id => 'ESPRESSO_TXN_PAGE',
			$this->thank_you_page_id => 'ESPRESSO_THANK_YOU',
			$this->cancel_page_id => 'ESPRESSO_CANCELLED'
		);
	}

	/**
	 *  gets/returns URL for EE reg_page
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public function reg_page_url() {
		if ( ! $this->reg_page_url ) {
			$this->reg_page_url = get_permalink( $this->reg_page_id );
		}
		return $this->reg_page_url;
	}
	/**
	 *  gets/returns URL for EE txn_page
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public function txn_page_url() {
		if ( ! $this->txn_page_url ) {
			$this->txn_page_url = get_permalink( $this->txn_page_id );
		}
		return $this->txn_page_url;
	}
	/**
	 *  gets/returns URL for EE thank_you_page
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public function thank_you_page_url() {
		if ( ! $this->thank_you_page_url ) {
			$this->thank_you_page_url = get_permalink( $this->thank_you_page_id );
		}
		return $this->thank_you_page_url;
	}
	/**
	 *  gets/returns URL for EE cancel_page
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public function cancel_page_url() {
		if ( ! $this->cancel_page_url ) {
			$this->cancel_page_url = get_permalink( $this->cancel_page_id );
		}
		return $this->cancel_page_url;
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
	 * @var string $phone
	 * eg. 111-111-1111
	 */
	public $phone;


	/**
	 * @var string $vat
	 * VAT/Tax Number
	 */
	public $vat;

	/**
	* @var string  $logo_url
	* eg http://www.somedomain.com/wp-content/uploads/kittehs.jpg
	*/
	public $logo_url;


	/**
	 * The below are all various properties for holding links to organization social network profiles
	 * @var string
	 */

	/**
	 * facebook (facebook.com/profile.name)
	 * @var string
	 */
	public $facebook;


	/**
	 * twitter (twitter.com/twitterhandle)
	 * @var string
	 */
	public $twitter;



	/**
	 * linkedin (linkedin.com/in/profilename)
	 * @var string
	 */
	public $linkedin;



	/**
	 * pinterest (www.pinterest.com/profilename)
	 * @var string
	 */
	public $pinterest;



	/**
	 * google+ (google.com/+profileName)
	 * @var string
	 */
	public $google;



	/**
	 * instragram (instagram.com/handle)
	 * @var string
	 */
	public $instagram;



	/**
	 *    class constructor
	 *
	 * @access    public
	 * @return \EE_Organization_Config
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
		$this->phone = '';
		$this->vat = '123456789';
		$this->logo_url = '';
		$this->facebook = '';
		$this->twitter = '';
		$this->linkedin = '';
		$this->pinterest = '';
		$this->google = '';
		$this->instagram = '';
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
	 *    class constructor
	 *
	 * @access    public
	 * @param null $CNT_ISO
	 * @return \EE_Currency_Config
	 */
	public function __construct( $CNT_ISO = NULL ) {

		// get country code from organization settings or use default
		$ORG_CNT = isset( EE_Registry::instance()->CFG->organization ) && EE_Registry::instance()->CFG->organization instanceof EE_Organization_Config ? EE_Registry::instance()->CFG->organization->CNT_ISO : NULL;
		// but override if requested
		$CNT_ISO = ! empty( $CNT_ISO ) ? $CNT_ISO : $ORG_CNT;
		// so if that all went well, and we are not in M-Mode (cuz you can't query the db in M-Mode)
		if ( ! empty( $CNT_ISO ) && ! EE_Maintenance_Mode::instance()->level() && ! get_option( 'ee_espresso_activation' )) {
			// retrieve the country settings from the db, just in case they have been customized
			$country = EE_Registry::instance()->load_model( 'Country' )->get_one_by_ID( $CNT_ISO );
			if ( $country instanceof EE_Country ) {
				$this->code = $country->currency_code(); 	// currency code: USD, CAD, EUR
				$this->name = $country->currency_name_single();	// Dollar
				$this->plural = $country->currency_name_plural(); 	// Dollars
				$this->sign =  $country->currency_sign(); 			// currency sign: $
				$this->sign_b4 = $country->currency_sign_before(); 		// currency sign before or after: $TRUE  or  FALSE$
				$this->dec_plc = $country->currency_decimal_places();	// decimal places: 2 = 0.00  3 = 0.000
				$this->dec_mrk = $country->currency_decimal_mark();	// decimal mark: (comma) ',' = 0,01   or (decimal) '.' = 0.01
				$this->thsnds = $country->currency_thousands_separator();	// thousands separator: (comma) ',' = 1,000   or (decimal) '.' = 1.000
			}
		}
		// fallback to hardcoded defaults, in case the above failed
		if ( empty( $this->code )) {
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
}




/**
 * Class for defining what's in the EE_Config relating to registration settings
 */
class EE_Registration_Config extends EE_Config_Base {

	/**
	 * Default registration status
	 * @var string $default_STS_ID
	 * eg 'RPP'
	 */
	public $default_STS_ID;

	/**
	 * 	whether or not to show alternate payment options during the reg process if payment status is pending
	 * @var boolean $show_pending_payment_options
	 */
      public $show_pending_payment_options;

	/**
	 * Whether to skip the registration confirmation page
	 * @var boolean $skip_reg_confirmation
	 */
      public $skip_reg_confirmation;

	/**
	 * Whether registration confirmation should be the last page of SPCO
	 * @var boolean $reg_confirmation_last
	 */
      public $reg_confirmation_last;

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
	 *    class constructor
	 *
	 * @access    public
	 * @return \EE_Registration_Config
	 */
	public function __construct() {
		// set default registration settings
		$this->default_STS_ID = EEM_Registration::status_id_pending_payment;
		$this->show_pending_payment_options = FALSE;
		$this->skip_reg_confirmation = FALSE;
		$this->reg_confirmation_last = FALSE;
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
	* @var int $events_in_dashboard
	*/
	public $events_in_dashboard;

	/**
	* @var boolean $use_event_timezones
	*/
	public $use_event_timezones;

	/**
	* @var boolean $use_full_logging
	*/
	public $use_full_logging;

	/**
	* @var string $log_file_name
	*/
	public $log_file_name;

	/**
	* @var string $debug_file_name
	*/
	public $debug_file_name;

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
	 * help tours on or off (global setting)
	 * @var boolean
	 */
	public $help_tour_activation;



	/**
	 *    class constructor
	 *
	 * @access    public
	 * @return \EE_Admin_Config
	 */
	public function __construct() {
		// set default general admin settings
		$this->use_personnel_manager = TRUE;
		$this->use_dashboard_widget = TRUE;
		$this->events_in_dashboard = 30;
		$this->use_event_timezones = FALSE;
		$this->use_full_logging = FALSE;
		$this->use_remote_logging = FALSE;
		$this->remote_logging_url = NULL;
		$this->show_reg_footer = TRUE;
		$this->affiliate_id = 'default';
		$this->help_tour_activation = TRUE;
	}



	/**
	 * @param bool $reset
	 * @return string
	 */
	public function log_file_name( $reset = FALSE ) {
		if ( empty( $this->log_file_name ) || $reset ) {
			$this->log_file_name = sanitize_key( 'espresso_log_' . md5( uniqid( '', TRUE ))) . '.txt';
			EE_Config::instance()->update_espresso_config( FALSE, FALSE );
		}
		return $this->log_file_name;
	}




	/**
	 * @param bool $reset
	 * @return string
	 */
	public function debug_file_name( $reset = FALSE ) {
		if ( empty( $this->debug_file_name ) || $reset ) {
			$this->debug_file_name = sanitize_key( 'espresso_debug_' . md5( uniqid( '', TRUE ))) . '.txt';
			EE_Config::instance()->update_espresso_config( FALSE, FALSE );
		}
		return $this->debug_file_name;
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
	* @var string $custom_style_sheet
	*/
	public $custom_style_sheet;

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
	* @var string $current_espresso_theme
	*/
	public $current_espresso_theme;



	/**
	 *    class constructor
	 *
	 * @access    public
	 * @return \EE_Template_Config
	 */
	public function __construct() {
		// set default template settings
		$this->enable_default_style = TRUE;
		$this->custom_style_sheet = NULL;
		$this->display_address_in_regform = TRUE;
		$this->display_description_on_multi_reg_page = FALSE;
		$this->use_custom_templates = FALSE;
		$this->current_espresso_theme = 'Espresso_Arabica_2014';
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
	 *    class constructor
	 *
	 * @access    public
	 * @return \EE_Map_Config
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



	/**
	 *	class constructor
	 */
	public function __construct(){
		$this->payment_settings = array();
		$this->active_gateways = array('Invoice'=>false);
	}
}




/**
 * stores Events_Archive settings
 */
class EE_Events_Archive_Config extends EE_Config_Base{

	public $display_status_banner;
	public $display_description;
	public $display_ticket_selector;
	public $display_datetimes;
	public $display_venue;
	public $display_expired_events;



	/**
	 *	class constructor
	 */
	public function __construct(){
		$this->display_status_banner = 0;
		$this->display_description = 1;
		$this->display_ticket_selector = 0;
		$this->display_datetimes = 1;
		$this->display_venue = 0;
		$this->display_expired_events = 0;
	}
}



/**
 * Stores Event_Single_Config settings
 */
class EE_Event_Single_Config extends EE_Config_Base{
	public $display_status_banner_single;
	public $display_venue;

	/**
	 *	class constructor
	 */
	public function __construct() {
		$this->display_status_banner_single = 0;
		$this->display_venue = 1;
	}
}




/**
 * Stores any EE Environment values that are referenced through the code.
 *
 * @since 4.4.0
 * @package Event Espresso
 * @subpackage  config
 */
class EE_Environment_Config extends EE_Config_Base {

	/**
	 * Hold any php environment variables that we want to track.
	 *
	 * @var stdClass;
	 */
	public $php;



	/**
	 * 	constructor
	 */
	public function __construct() {
		$this->php = new stdClass();
		$this->_set_php_values();
	}


	/**
	 * This sets the php environment variables.
	 *
	 * @since 4.4.0
	 * @return void
	 */
	protected function _set_php_values() {
		$this->php->max_input_vars = ini_get( 'max_input_vars' );
		$this->php->version = phpversion();
	}



	/**
	 * helper method for determining whether input_count is
	 * reaching the potential maximum the server can handle
	 * according to max_input_vars
	 *
	 * @param int $input_count the count of input vars.
	 *
	 * @return array {
	 *         An array that represents whether available space and if no available space the error message.
	 *         @type bool $has_space		whether more inputs can be added.
	 *         @type string $msg 		Any message to be displayed.
	 * }
	 */
	public function max_input_vars_limit_check( $input_count = 0 ) {
		if ( ( $input_count >= $this->php->max_input_vars ) && version_compare( $this->php->version, '5.3', '>=' ) ) {
			return  __('The number of inputs on this page has been exceeded.  You cannot add anymore items (i.e. tickets, datetimes, custom fields) on this page because of your servers PHP "max_input_vars" setting.', 'event_espresso');
		} else {
			return '';
		}
	}




	/**
	 * The purpose of this method is just to force rechecking php values so if they've changed, they get updated.
	 *
	 * @since 4.4.1
	 *
	 * @return void
	 */
	public function recheck_values() {
		$this->_set_php_values();
	}
}


// End of file EE_Config.core.php
// Location: /core/EE_Config.core.php
