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
 * EE_Front_Controller
 *
 * @package			Event Espresso
 * @subpackage	core/
 * @author				Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class EE_Front_Controller {

	/**
	 * 	path to main espresso.php file
	 *	@var 	$main_file
	 * 	@access 	public
	 */
	public $main_file;

	/**
	 * 	system registry
	 *	@var 	EE_Registry		$EE
	 * 	@access 	public
	 */
	public $EE;

	/**
	 * static copy of registry that modules can use until they get instantiated
	 *	@var 	EE_Registry	$registry
	 * 	@access 	public
	 */
	public static $registry;

	/**
	 * 	_installed_shortcodes
	 *	@var 	array	$_installed_shortcodes
	 * 	@access 	private
	 */
	private static $_installed_shortcodes = array();

	/**
	 * 	_installed_modules
	 *	@var 	array	$_installed_modules
	 * 	@access 	private
	 */
	private static $_installed_modules = array();



	/**
	 * 	class constructor
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function __construct( $main_file ) {
		add_action( 'plugins_loaded', array( $this, 'plugins_loaded' ), 1 );
		add_action( 'init', array( $this, 'init' ), 5 );
		// determine how to integrate WP_Query with the EE models
		add_action( 'init', array( $this, 'employ_CPT_Strategy' ), 10 );
		// load EE_Request_Handler
		add_action( 'wp_loaded', array( $this, 'get_request' ), 1 );
		add_action( 'wp_loaded', array( $this, 'wp_loaded' ), 5 );
		add_action( 'wp', array( $this, 'wp' ), 5 );
		add_action('wp_enqueue_scripts', array( $this, 'wp_enqueue_scripts' ), 5 );
		add_action('wp_head', array( $this, 'header_meta_tag' ), 5 );
		add_filter( 'the_content', array( $this, 'the_content' ), 5, 1 );
	}



	/**
	 * 		plugins_loaded
	 *
	 * 		@access 	public
	 * 		@return 		void
	 */
	public function plugins_loaded() {
		// registry, settings, autoloaders, and other config stuff
		$this->_load_system_files();
	}



	/**
	 * 		_load_system_files
	 *
	 * 		@access 	private
	 * 		@return 		void
	 */
	private function _load_system_files() {
		if ( is_readable( EE_CORE . 'EE_System.core.php' )) {
			require_once( EE_CORE . 'EE_System.core.php' );
			$this->EE = EE_System::instance()->get_registry();
			// create static copy of EE for modules and shortcodes to access during their initial phases
			 self::$registry = $this->EE;
		} else {
			wp_die( __( 'An error has occured. The EE_System files could not be loaded.', 'event_espresso' ));
		}
	}



	/**
	 * 		get_static_registry
	 *
	 * 		@access 	public
	 * 		@return 		void
	 */
	public static function get_static_registry() {
		return self::$registry;
	}





	/*********************************************** 		INIT ACTION HOOK		 ***********************************************/



	/**
	 *	_get_request
	 * 
	 *	@access public
	 *	@return void
	 */
	public function get_request() {
		$this->EE->load_core( 'Request_Handler' );	
	}





	/**
	 * 	init - should fire after shortcode, module, addon, or other plugin's default priority init phases have run
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function init() {
			// allow shortcodes to register with WP and to set hooks for the rest of the system
			$this->_register_shortcodes();
			// allow modules to set hooks for the rest of the system
			$this->_register_modules();
			// pass shortcodes and modules to registry
			$this->EE->shortcodes = self::$_installed_shortcodes;
			$this->EE->modules = self::$_installed_modules;

//		} 
		
	}




	/**
	 * 		_register_shortcodes
	 *
	 * 		@access private
	 * 		@return void
	 */
	private function _register_shortcodes() {
		// which set hooks ?
		$hook_point = is_admin() ? 'set_hooks_admin' : 'set_hooks';
		// load base class
		require_once( EE_SHORTCODES . 'EES_Shortcode.shortcode.php' );
		// grab list of installed shortcodes
		$shortcode_dirs = glob( EE_SHORTCODES . '*', GLOB_ONLYDIR );
//		echo '<h4>EE_SHORTCODES : ' . EE_SHORTCODES . '*.shortcode.php' . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//		printr( $shortcode_dirs, '$shortcode_dirs  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		// cycle thru shortcode folders
		foreach ( $shortcode_dirs as $shortcode_dir ) {
			// grab and sanitize shortcode name
			$shortcode_dir = sanitize_key( basename( $shortcode_dir ));
			// create classname from shortcode directory name
			$shortcode_class = 'EES_' . str_replace( ' ', '_', ucwords( str_replace( '_', ' ', $shortcode_dir )));
			// does the shortcode exist ?
			if ( ! file_exists( EE_SHORTCODES . $shortcode_dir . DS . $shortcode_class . '.shortcode.php' )) {
				$msg = sprintf( __( 'An error has occured. The requested Event Espresso %s shortcode could not be loaded.', 'event_espresso' ), $shortcode_class );
				EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
				break;
			}
			// load the shortcode class file
			require_once( EE_SHORTCODES . $shortcode_dir . DS . $shortcode_class . '.shortcode.php' );
			// verfiy that class exists
			if ( ! class_exists( $shortcode_class )) {
				$msg = sprintf( __( 'An error has occured. The requested Event Espresso %s shortcode class does not exist.', 'event_espresso' ), $shortcode_class );
				EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
				add_filter( 'FHEE_run_EE_the_content', '__return_true' );
				break;
			}
			// let's pause to reflect on this...
			$sc_reflector = new ReflectionClass( $shortcode_class );
			// ensure that class is actually a shortcode
			if ( ! $sc_reflector->isSubclassOf( 'EES_Shortcode' )) {
				$msg = sprintf( __( 'An error has occured. The requested Event Espresso %s shortcode is not of the class "EES_Shortcode".', 'event_espresso' ), $shortcode_class );
				EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
				add_filter( 'FHEE_run_EE_the_content', '__return_true' );
				break;
			}
			// and pass the request object to the run method
			$shortcode =$sc_reflector->newInstance( $this->EE );
			// fire the shortcode class's set_hooks method during the wp_loaded hook, in case it needs to hook into other parts of the system
			add_action( 'wp_loaded', array( $shortcode, $hook_point ));
			// add to list of installed shortcode modules
			EE_Front_Controller::register_shortcode( $shortcode_class, $shortcode );
		}
		// filter list of installed modules
		self::$_installed_shortcodes = apply_filters( 'AHEE__Front_Controller__register_shortcodes__installed_shortcodes', self::$_installed_shortcodes );
	}



	/**
	 * 	register_shortcode - makes core aware of this shortcode
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function register_shortcode( $shortcode_class = NULL, EES_Shortcode $shortcode = NULL ) {
		if ( ! empty( $shortcode_class ) && ! empty( $shortcode )) {
			$shortcode_class = str_replace( 'EES_', '', $shortcode_class );
			self::$_installed_shortcodes[ $shortcode_class ] = $shortcode;
		}
	}	




	/**
	 * 		_register_modules
	 *
	 * 		@access private
	 * 		@return void
	 */
	private function _register_modules() {
		// which set hooks ?
		$hook_point = is_admin() ? 'set_hooks_admin' : 'set_hooks';
		// load base class
		require_once( EE_MODULES . 'EED_Module.module.php' );
		// grab list of installed modules
		$module_dirs = glob( EE_MODULES . '*', GLOB_ONLYDIR );
		// loop through folders
		foreach ( $module_dirs as $module_dir ) {
			// grab and sanitize module name
			$module_dir = sanitize_key( basename( $module_dir ));
			// create classname from module directory name
			$module = 'EED_' . str_replace( ' ', '_', ucwords( str_replace( '_', ' ', $module_dir )));
			// does the module exist ?
			if ( $module_dir == 'moduletemplatecopy-this' ) {
				break;
			} else if ( ! file_exists( EE_MODULES . $module_dir . DS . $module . '.module.php' )) {
				$msg = sprintf( __( 'An error has occured. The requested Event Espresso %s module could not be loaded.', 'event_espresso' ), $module );
				EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
				break;
			}
			// load the module class file
			require_once( EE_MODULES . $module_dir . DS . $module . '.module.php' );
			// fire the module class's set_hooks method during the  wp_loaded hook
			add_action( 'wp_loaded', array( $module, $hook_point ));
			// add to list of installed modules
			EE_Front_Controller::register_module( $module_dir, EE_MODULES . $module_dir . DS . $module . '.module.php' );
		}
		// filter list of installed modules
		self::$_installed_modules = apply_filters( 'AHEE__Front_Controller__register_modules__installed_modules', self::$_installed_modules );
	}



	/**
	 * 	register_module - makes core aware of this module
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function register_module( $module = NULL, $module_dir = NULL ) {
		if ( ! empty( $module ) && ! empty( $module_dir )) {
			self::$_installed_modules[ $module ] = $module_dir;
		}
	}	



	/**
	 * 	employ_CPT_Strategy
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function employ_CPT_Strategy() {
		$this->EE->load_core( 'CPT_Strategy', TRUE );
	}





	/*********************************************** 		WP_LOADED ACTION HOOK		 ***********************************************/





	/**
	 * 	wp_loaded - should fire after shortcode, module, addon, or other plugin's default priority init phases have run
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function wp_loaded() {
		// messages loading is turned OFF by default, but prior to the wp_loaded hook, can be turned back on again via: add_filter( 'FHEE_load_EE_messages', '__return_true' );
		if ( apply_filters( 'FHEE_load_EE_messages', FALSE )) {
			EE_messages_init::init();
		}
		// process any content shortcodes
		$this->_initialize_shortcodes();
		// process request with module factory
		$this->_process_request();		


	}



	/**
	 * 	_initialize_shortcodes - calls init method on shortcodes that have been determined to be in the_content for the requested page
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	private function _initialize_shortcodes() {
		// make sure post_name is set on REQ
		if ( $this->EE->REQ->is_set( 'post_name' )) {
			// grab post_name from request
			$current_post = $this->EE->REQ->get( 'post_name' );
			// if it's not set, then check if frontpage is blog
			$current_post = ! empty( $current_post ) ? $current_post : get_option('show_on_front');
			// make sure shortcodes are set
			if ( isset( $this->EE->CFG->post_shortcodes )) {
//				printr( $this->EE->CFG->post_shortcodes, '$this->EE->CFG->post_shortcodes  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
				// cycle thru all posts with shortcodes set
				foreach ( $this->EE->CFG->post_shortcodes as $post_name => $post_shortcodes ) {
//					echo '<h4>$post_name : ' . $post_name . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
					// are we on this page ?
					$term_exists = is_array( term_exists( $current_post, 'category' ));
					// if on the current page, or the current page is a category
					if ( $current_post == $post_name || $term_exists ) {
//						echo '<h4>$post_name : ' . $post_name . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
						// filter shortcodes so 
						$post_shortcodes = apply_filters( 'FHEE__Front_Controller__initialize_shortcodes__post_shortcodes', $post_shortcodes );
//						printr( $post_shortcodes, '$post_shortcodes  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
						// now cycle thru shortcodes
						foreach ( $post_shortcodes as $shortcode_class => $post_id ) {
							// verify shortcode is in list of registered shortcodes
							if ( ! isset( $this->EE->shortcodes[ $shortcode_class ] )) {
								$msg = sprintf( __( 'An error has occured. The requested Event Espresso %s shortcode is not of the proper class', 'event_espresso' ), $shortcode_class );
								EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
								add_filter( 'FHEE_run_EE_the_content', '__return_true' );
								break;
							}
							// verfiy that class is a shortcode
							if ( ! is_a( $this->EE->shortcodes[ $shortcode_class ], 'EES_Shortcode' )) {
								$msg = sprintf( __( 'An error has occured. The requested Event Espresso %s shortcode is not of the proper class', 'event_espresso' ), $shortcode_class );
								EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
								add_filter( 'FHEE_run_EE_the_content', '__return_true' );
								break;
							}
							//is this : a shortcodes set exclusively for this post, or for the home page, or a category, or a taxonomy ?
							if ( isset( $this->EE->CFG->post_shortcodes[ $current_post ] ) || $term_exists ) {
								// fire the shortcode class's init function, so that it can activate resources
								$this->EE->shortcodes[ $shortcode_class ]->init();
							}
						}
					}
				}
			}
		}
		//printr( $this->EE->shortcodes, '$this->EE->shortcodes  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
	}




	/**
	 * 	_process_request - basically a module factory for instantiating modules
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	private function _process_request() {
//		echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		//filter modules
		$modules = apply_filters( 'AHEE__Front_Controller__process_request__modules', array() );
		// method used to initialize the module
		$module_init = 'init';
		// check request for module
		if ( $this->EE->REQ->is_set( 'ee_module' )) {
			// grab and sanitize module name
			$modules[] = sanitize_key( $this->EE->REQ->get( 'ee_module' ));
		}
		//printr( $modules, '$modules  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		// cycle thru modules
		foreach ( $modules as $module_dir ) {
			// create classname from module directory name
			$module_class = 'EED_' . str_replace( ' ', '_', ucwords( str_replace( '_', ' ', $module_dir )));
			// does the module exist ?
			if ( ! file_exists( EE_MODULES . $module_dir . DS . $module_class . '.module.php' )) {
				$msg = sprintf( __( 'An error has occured. The requested Event Espresso %s module file could not be loaded.', 'event_espresso' ), $module_class );
				EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
				add_filter( 'FHEE_run_EE_the_content', '__return_true' );
				return;
			}
			// load the module class file
			require_once( EE_MODULES . $module_dir . DS . $module_class . '.module.php' );
			// verfiy that class exists
			if ( ! class_exists( $module_class )) {
				$msg = sprintf( __( 'An error has occured. The requested Event Espresso %s class could not be found.', 'event_espresso' ), $module_class );
				EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
				add_filter( 'FHEE_run_EE_the_content', '__return_true' );
				return;
			}
			// let's pause to reflect on this...
			$mod_reflector = new ReflectionClass( $module_class );
			// ensure that class is actually a module
			if ( ! $mod_reflector->isSubclassOf( 'EED_Module' )) {
				$msg = sprintf( __( 'An error has occured. The requested Event Espresso module is not of the class EED_Module.', 'event_espresso' ), $module_class );
				EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
				add_filter( 'FHEE_run_EE_the_content', '__return_true' );
			}
			// and pass the request object to the run method
			$module =$mod_reflector->newInstance( $this->EE );
			// fire the module class's init function, so that it can activate resources
			$module->$module_init();
			// check if module action is in request
			if ( $this->EE->REQ->is_set( 'action' )) {
				// grab the module action from the request
				if ( $mod_action = $this->EE->REQ->get( 'action' )) {
					// verify that the method exists
					if ( ! method_exists( $module, $mod_action )) {
						$msg = sprintf( __( 'An error has occured. The requested %s module action does not exist.', 'event_espresso' ), $module_class );
						EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
						add_filter( 'FHEE_run_EE_the_content', '__return_true' );
						return;
					}
					// now add a hook for whatever action is being called
					add_action( 'wp', array( $module, $mod_action ));
				}				
			}
		}
	}








	/*********************************************** 		PARSE_REQUEST ACTION HOOK		 ***********************************************/



	/**
	 * 	wp_loaded - should fire after shortcode, module, addon, or other plugin's default priority init phases have run
	 *
	 *  @access 	public
	 *  @return 	void
	 */
/*	public function filter_request(  $req  ) {
//		echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		if ( $espresso_page = $this->EE->REQ->is_espresso_page() ) {
//			echo '<h1>is_espresso_page  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h1>';
			$CPTs = $this->EE->REQ->get_espresso_CPT_endpoints();
//			printr( $CPTs, '$CPTs  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
			if ( isset( $CPTs[ $espresso_page ] )) {
//				echo '<h4>$espresso_page : ' . $espresso_page . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
		 		$req['pagename'] = isset( $req['pagename'] ) && ! empty( $req['pagename'] ) ? $req['pagename'] : $espresso_page;
		 		$req['post_type'] = $CPTs[ $espresso_page ];			
			}
		}
//		printr( $req, '$req  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
	    return $req;
	}*/




	/**
	 * 	pre_get_posts
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function pre_get_posts(  $WP_Query  ) {
//		echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
//		printr( $WP_Query, '$WP_Query  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

//$my_query = new WP_Query( array(
//	'no_found_rows' => TRUE,
//	'update_post_meta_cacge' => FALSE,
//	'update_post_term_cacge' => FALSE
//));
//
//is_main_query()
//
//
//EE_Register_CPTs::get_espresso_taxonomies();
//EE_Register_CPTs::get_espresso_CPTs();
	}



	/**
	 * 	wp_loaded - should fire after shortcode, module, addon, or other plugin's default priority init phases have run
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function parse_request(  $WP_Query  ) {
//		echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
//		echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
//		printr(  $WP_Query , ' $WP_Query   <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
	}



	/*********************************************** 		WP ACTION HOOK		 ***********************************************/



	/**
	 * 	wp - should fire after shortcode, module, addon, or other plugin's default priority init phases have run
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function wp( $WP_Query ) {
//		echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		// nothing gets loaded at this point unless other systems turn this hookpoint on by using:  add_filter( 'FHEE_run_EE_wp', '__return_true' );
		if ( apply_filters( 'FHEE_run_EE_wp', FALSE )) {
			define( 'EE_wp', TRUE );
			// shortcodes loading is turned OFF by default, but prior to the wp hook, can be turned back on again via: add_filter( 'FHEE_load_shortcodes', '__return_true' );
			if ( apply_filters( 'FHEE_load_shortcodes', FALSE )) {
			}
		}
//		printr( $wp_query , '$wp_query   <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
//		$EVT_IDs = array();
//		if ( isset( $WP_Query->posts )) {
//			foreach ( $WP_Query->posts as $post ) {
//				$EVT_IDs[] = $post->ID;
//			}
//		}

	}



	/*********************************************** 		WP_ENQUEUE_SCRIPTS && WP_HEAD HOOK		 ***********************************************/



	/**
	 * 	wp_enqueue_scripts
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function wp_enqueue_scripts() {

		// css is turned OFF by default, but prior to the wp_enqueue_scripts hook, can be turned back on again via:  add_filter( 'FHEE_load_css', '__return_true' );
		if ( apply_filters( 'FHEE_load_css', FALSE )) {

			$this->EE->CFG->style_settings['enable_default_style'] = TRUE;
			//Load the ThemeRoller styles if enabled
			if ( isset( $this->EE->CFG->style_settings['enable_default_style'] ) && $this->EE->CFG->style_settings['enable_default_style'] ) {

				add_filter( 'FHEE_enable_default_espresso_css', '__return_true' );
				//Define the path to the ThemeRoller files
				if ( file_exists( EVENT_ESPRESSO_UPLOAD_DIR . 'themeroller/index.php' )) {
				$themeroller_style_path = EVENT_ESPRESSO_UPLOAD_URL . 'themeroller/';
				} else {
					$themeroller_style_path = EVENT_ESPRESSO_PLUGINFULLURL . 'templates/css/themeroller/';
				}

				//Load custom style sheet if available
				if ( isset( $this->EE->CFG->style_settings['css_name'] )) {
					wp_register_style('espresso_custom_css', EVENT_ESPRESSO_UPLOAD_URL . 'css/' . $this->EE->CFG->style_settings['css_name']);
					wp_enqueue_style('espresso_custom_css');
				}

				//Register the ThemeRoller styles
				if ( isset( $this->EE->CFG->themeroller )) {

					//Load the themeroller base style sheet
					//If the themeroller-base.css is in the uploads folder, then we will use it instead of the one in the core
					if ( file_exists( EVENT_ESPRESSO_UPLOAD_DIR . $themeroller_style_path . 'themeroller-base.css' )) {
						wp_register_style( 'espresso_themeroller_base', $themeroller_style_path . 'themeroller-base.css' );
					} else {
						wp_register_style( 'espresso_themeroller_base', EVENT_ESPRESSO_PLUGINFULLURL . 'templates/css/themeroller/themeroller-base.css' );
					}
					wp_enqueue_style('espresso_themeroller_base');

					//Load the smoothness style by default<br />
					if ( ! isset( $this->EE->CFG->themeroller['themeroller_style'] ) || empty( $this->EE->CFG->themeroller['themeroller_style'] )) {
						$this->EE->CFG->themeroller['themeroller_style'] = 'smoothness';
					}

					//Load the selected themeroller style
					wp_register_style('espresso_themeroller', $themeroller_style_path . $this->EE->CFG->themeroller['themeroller_style'] . '/style.css');
					wp_enqueue_style('espresso_themeroller');
				}
			}

		}

		// js is turned OFF by default, but prior to the wp_enqueue_scripts hook, can be turned back on again via:  add_filter( 'FHEE_load_js', '__return_true' );
		if ( apply_filters( 'FHEE_load_js', FALSE )) {
			wp_enqueue_script( 'jquery' );			
			wp_localize_script( 'single_page_checkout', 'eei18n', EE_Registry::$i18n_js_strings );
			// check if required scripts are loaded
			if ( function_exists( 'wp_script_is' )) {
				if ( ! wp_script_is( 'jquery' )) {
					add_filter( 'the_content', array( $this, 'no_jquery' ), 100, 1 );
				}
			}
			if ( ! function_exists( 'wp_head' )) {
				add_filter( 'the_content', array( $this, 'no_wp_head' ), 100, 1 );
			}
			if ( ! function_exists( 'wp_footer' )) {
				add_filter( 'the_content', array( $this, 'no_wp_footer' ), 100, 1 );
			}
		}


	}



	/**
	 * 	header_meta_tag
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function header_meta_tag() {
		print( "<meta name='generator' content='Event Espresso Version " . EVENT_ESPRESSO_VERSION . "' />");
	}




	/*********************************************** 		THE_CONTENT FILTER HOOK		 ***********************************************/



	/**
	 * 	the_content
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public function the_content( $the_content ) {
		// nothing gets loaded at this point unless other systems turn this hookpoint on by using:  add_filter( 'FHEE_run_EE_the_content', '__return_true' );
		if ( apply_filters( 'FHEE_run_EE_the_content', FALSE )) {
			$the_content = EE_Error::get_notices() . $the_content;
		}
		return $the_content;
	}


	/**
	 * 	no_jquery
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public function no_jquery( $the_content ) {
		ob_start();
		?>
			<div class="event_espresso_error">
				<p>
					<em><?php _e( 'Jquery is not loaded!', 'event_espresso' );?></em><br />
					<?php _e( 'Event Espresso is unable to load Jquery do to a conflict with your theme or another plugin.', 'event_espresso' );?></p>
			</div>
		<?php
		return ob_get_clean() . $the_content;
	}

	/**
	 * 	script_check
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public function no_wp_head( $the_content ) {
		ob_start();
		?>
			<div class="event_espresso_error">
				<p>
					<em><?php _e( 'Missing wp_head() function.', 'event_espresso' );?></em><br />
					<?php _e( 'The WordPress function wp_head() seems to be missing in your theme. Please contact the theme developer to make sure this is fixed before using Event Espresso.', 'event_espresso' );?></p>
			</div>
		<?php
		return ob_get_clean() . $the_content;
	}

	/**
	 * 	no_wp_footer
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public function no_wp_footer( $the_content ) {
		ob_start();
		?>
			<div class="event_espresso_error">
				<p>
					<em><?php _e( 'Missing wp_footer() function.', 'event_espresso' );?></em><br />
					<?php _e( 'The WordPress function wp_footer() seems to be missing in your theme. Please contact the theme developer to make sure this is fixed before using Event Espresso.', 'event_espresso' );?></p>
			</div>
		<?php
		return ob_get_clean() . $the_content;
	}



	/*********************************************** 		UTILITIES		 ***********************************************/




	
	


}
// End of file EE_Front_Controller.core.php
// Location: /core/EE_Front_Controller.core.php