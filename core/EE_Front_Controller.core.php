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
final class EE_Front_Controller {


	/**
	 * 	instance of the EE_System object
	 *	@var 	$_instance
	 * 	@access 	private
	 */
	private static $_instance = NULL;

	/**
	 * 	system registry
	 *	@var 	EE_Registry		$EE
	 * 	@access 	private
	 */
	private $EE;

	/**
	 * 	$_template_path
	 *	@var 	string		$_template_path
	 * 	@access 	public
	 */
	private $_template_path = NULL;

	/**
	 * 	$_template
	 *	@var 	string		$_template
	 * 	@access 	public
	 */
	private $_template = NULL;


	/**
	 * static copy of registry that modules can use until they get instantiated
	 *	@var 	EE_Registry	$registry
	 * 	@access 	public
	 */
	public static $registry;


	/**
	 *	@singleton method used to instantiate class object
	 *	@access public
	 *	@return EE_Front_Controller
	 */
	public static function instance() {
		// check if class object is instantiated, and instantiated properly
		if ( self::$_instance === NULL  or ! is_object( self::$_instance ) or ! ( self::$_instance instanceof  EE_Front_Controller )) {
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
		// early init
		add_action( 'init', array( $this, 'init' ), 5 );
		// determine how to integrate WP_Query with the EE models
		add_action( 'init', array( $this, 'employ_CPT_Strategy' ), 10 );
		// action hook EE
		do_action( 'AHEE__EE_Front_Controller__construct__done',$this );
	}







	/*********************************************** 		INIT ACTION HOOK		 ***********************************************/





	/**
	 * 	init - should fire after shortcode, module, addon, or other plugin's default priority init phases have run
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function init(){
		// additional hooks get added in the init phase
		// load other resources and begin to actually run shortcodes and modules
		add_action( 'wp_loaded', array( $this, 'wp_loaded' ), 5 );
		// analyse the incoming WP request
		add_action( 'parse_request', array( $this, 'get_request' ), 1 );
		// process any content shortcodes
		add_action( 'parse_request', array( $this, '_initialize_shortcodes' ), 5 );
		// process request with module factory
		add_action( 'pre_get_posts', array( $this, 'pre_get_posts' ), 10 );
		// before headers sent
		add_action( 'wp', array( $this, 'wp' ), 5 );
		// load css and js
		add_action('wp_enqueue_scripts', array( $this, 'wp_enqueue_scripts' ), 5 );
		// header
		add_action('wp_head', array( $this, 'header_meta_tag' ), 5 );
		add_filter( 'template_include', array( $this, 'template_include' ), 1 );
		// display errors
		add_action('loop_start', array( $this, 'display_errors' ), 2 );			
		// the content
		add_filter( 'the_content', array( $this, 'the_content' ), 5, 1 );
		add_action('wp_footer', array( $this, 'display_registration_footer' ), 10 );
		//exclude EE critical pages from wp_list_pages
		add_filter('wp_list_pages_excludes', array( $this, 'remove_pages_from_wp_list_pages'), 10 );

		//exclude our private cpt comments
		add_filter( 'comments_clauses', array( $this, 'filter_wp_comments'), 10, 2 );			
	}


	/**
	 * simply hooks into "wp_list_pages_exclude" filter (for wp_list_pages method) and makes sure EE critical pages are never returned with the function.
	 *
	 *
	 * @param  array  $exclude_array any existing pages being excluded are in this array.
	 * @return array
	 */
	public function remove_pages_from_wp_list_pages( $exclude_array ) {
		return  array_merge( $exclude_array, EE_Registry::instance()->CFG->core->get_critical_pages_array() );
	}



	/**
	 * This simply makes sure that any "private" EE cpts do not have their comments show up in any wp comment widgets/queries done on frontend
	 * @param  array           $clauses  array of comment clauses setup by WP_Comment_Query
	 * @param  WP_Comment_Query $wpc     
	 * @return array                     array of comment clauses with modifications.
	 */
	public function filter_wp_comments( $clauses, WP_Comment_Query $wpc ) {
		global $wpdb;
		if ( strpos( $clauses['join'], $wpdb->posts ) !== FALSE ) {
			$cpts = EE_Register_CPTs::get_private_CPTs();
			foreach ( $cpts as $cpt => $details ) {
				$clauses['where'] .= $wpdb->prepare( " AND $wpdb->posts.post_type != %s", $cpt );
			}
		}
		return $clauses;
	}





	/**
	 * 	employ_CPT_Strategy
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function employ_CPT_Strategy() {
		if ( apply_filters( 'FHEE__EE_Front_Controller__employ_CPT_Strategy',true) ){
			EE_Registry::instance()->load_core( 'CPT_Strategy' );
		}
	}






	/*********************************************** 		WP_LOADED ACTION HOOK		 ***********************************************/





	/**
	 * 	wp_loaded - should fire after shortcode, module, addon, or other plugin's have been registered and their default priority init phases have run
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function wp_loaded() {
		// messages loading is turned OFF by default, but prior to the wp_loaded hook, can be turned back on again via: add_filter( 'FHEE_load_EE_messages', '__return_true' );
		if ( apply_filters( 'FHEE_load_EE_messages', FALSE ) ) {
			EE_Registry::instance()->load_lib( 'Messages_Init' );
		}

	}





	/*********************************************** 		PARSE_REQUEST HOOK		 ***********************************************/




	/**
	 *	_get_request
	 * 
	 *	@access public
	 *	@return void
	 */
	public function get_request( WP $WP ) {
//		d( $WP );
		do_action( 'AHEE__EE_Front_Controller__get_request__before_Request_Handler_loaded' );
		EE_Registry::instance()->load_core( 'Request_Handler', $WP );	
		do_action( 'AHEE__EE_Front_Controller__get_request__after_Request_Handler_loaded' );
	}




	/**
	 * 	_initialize_shortcodes - calls init method on shortcodes that have been determined to be in the_content for the currently requested page
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function _initialize_shortcodes( WP $WP ) {
		do_action( 'AHEE__EE_Front_Controller__initialize_shortcodes__begin', $WP, $this );
		// grab post_name from request
		$current_post = apply_filters( 'FHEE__EE_Front_Controller__initialize_shortcodes__current_post_name', EE_Registry::instance()->REQ->get( 'post_name' ));
		// if it's not set, then check if frontpage is blog
		if ( empty( $current_post ) && get_option( 'show_on_front' ) == 'posts' ) {
			// yup.. this is the posts page, prepare to load all shortcode modules
			$current_post = 'posts';
		} else if ( empty( $current_post ) && get_option( 'show_on_front' ) == 'page' ) {
			// some other page is set as the homepage
			if ( $page_on_front = get_option( 'page_on_front' )) {
				// k now we need to find the slug for this page
				global $wpdb;
				$SQL = 'SELECT post_name from ' . $wpdb->posts . ' WHERE post_type="page" AND post_status="publish" AND ID=%d';
				if( $post_slug = $wpdb->get_var( $wpdb->prepare( $SQL, $page_on_front ))) {
					// set the current post slug to what it actually is
					$current_post = $post_slug;
				}					
			}
		} else if ( get_option( 'show_on_front' ) == 'page' ) {
			// we're not on the homepage, but some "other" page is set as the posts page... 
			if ( $page_for_posts = get_option( 'page_for_posts' )) {
				// better get the ID for the current post
				global $wpdb;
				$SQL = 'SELECT ID from ' . $wpdb->posts . ' WHERE post_type="posts" OR post_type="page" AND post_status="publish" AND post_name=%s';
				$current_post_id = $wpdb->get_var( $wpdb->prepare( $SQL, $current_post ));
				// is the current post the "page_for_posts" ???
				if ( $current_post_id === $page_for_posts ) {
					$current_post = 'posts';
				}					
			}
		} 
		// are we on a category page?
		$term_exists = is_array( term_exists( $current_post, 'category' )) || array_key_exists( 'category_name', $WP->query_vars );
		// make sure shortcodes are set
		if ( isset( EE_Registry::instance()->CFG->core->post_shortcodes )) {
			// cycle thru all posts with shortcodes set
			foreach ( EE_Registry::instance()->CFG->core->post_shortcodes as $post_name => $post_shortcodes ) {
				// are we on this page ?
				if ( $current_post == $post_name || $term_exists ) {
					// filter shortcodes so 
					$post_shortcodes = apply_filters( 'FHEE__Front_Controller__initialize_shortcodes__post_shortcodes', $post_shortcodes );
					// now cycle thru shortcodes
					foreach ( $post_shortcodes as $shortcode_class => $post_id ) {
						// verify shortcode is in list of registered shortcodes
						if ( ! isset( EE_Registry::instance()->shortcodes[ $shortcode_class ] )) {
							unset( EE_Registry::instance()->shortcodes[ $shortcode_class ] );
							if ( defined( 'WP_DEBUG' ) && WP_DEBUG === TRUE ) {
								$msg = sprintf( __( 'The [%s] shortcode has not been properly registered or the corresponding addon/module is not active for some reason. Either fix/remove the shortcode from the post, or activate the addon/module the shortcode is associated with.', 'event_espresso' ), $shortcode_class );
								EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
								add_filter( 'FHEE_run_EE_the_content', '__return_true' );
							}
							break;
						}
						// is this : a shortcodes set exclusively for this post, or for the home page, or a category, or a taxonomy ?
						if ( isset( EE_Registry::instance()->CFG->core->post_shortcodes[ $current_post ] ) || $term_exists || $current_post == 'posts' ) {
							// let's pause to reflect on this...
							$sc_reflector = new ReflectionClass( 'EES_' . $shortcode_class );
							// ensure that class is actually a shortcode
							if ( ! $sc_reflector->isSubclassOf( 'EES_Shortcode' ) && defined( 'WP_DEBUG' ) && WP_DEBUG === TRUE ) {
								$msg = sprintf( __( 'The requested %s shortcode is not of the class "EES_Shortcode". Please check your files.', 'event_espresso' ), $shortcode_class );
								EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
								add_filter( 'FHEE_run_EE_the_content', '__return_true' );
								break;
							}
							// and pass the request object to the run method
							$shortcode = $sc_reflector->newInstance();
							// fire the shortcode class's run method, so that it can activate resources
							$shortcode->run( $WP );
						}
					}
				}
			}
		}
		do_action( 'AHEE__EE_Front_Controller__initialize_shortcodes__end',$this );
	}




	/**
	 * 	pre_get_posts - basically a module factory for instantiating modules and selecting the final view template
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function pre_get_posts( $WP_Query ) {
		// load module request router
		$Module_Request_Router = EE_Registry::instance()->load_core( 'Module_Request_Router' );
		// cycle thru module routes
		while ( $route = $Module_Request_Router->get_route( $WP_Query ) ) {
			// determine module and method for route
			$module = $Module_Request_Router->resolve_route( $route );
			// get registered view for route
			$this->_template_path = $Module_Request_Router->get_view( $route );
			// map the routes to the module objects
			EE_Registry::instance()->modules[ $route ] = $module;
		}
	}





	/*********************************************** 		WP HOOK		 ***********************************************/






	/**
	 * 	wp - basically last chance to do stuff before headers sent
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function wp() {
		EE_Registry::instance()->load_helper( 'Template' );
	}



	/*********************************************** 		WP_ENQUEUE_SCRIPTS && WP_HEAD HOOK		 ***********************************************/



	/**
	 * 	wp_enqueue_scripts
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function wp_enqueue_scripts() {
		
		// css is turned ON by default, but prior to the wp_enqueue_scripts hook, can be turned OFF  via:  add_filter( 'FHEE_load_css', '__return_false' );
		if ( apply_filters( 'FHEE_load_css', TRUE ) ) {
			
			EE_Registry::instance()->CFG->template_settings->enable_default_style = TRUE;
			//Load the ThemeRoller styles if enabled
			if ( isset( EE_Registry::instance()->CFG->template_settings->enable_default_style ) && EE_Registry::instance()->CFG->template_settings->enable_default_style ) {

				//Load custom style sheet if available
				if ( isset( EE_Registry::instance()->CFG->style_settings['css_name'] )) {
					wp_register_style('espresso_custom_css', EVENT_ESPRESSO_UPLOAD_URL . 'css/' . EE_Registry::instance()->CFG->style_settings['css_name'], EVENT_ESPRESSO_VERSION );
					wp_enqueue_style('espresso_custom_css');
				}

				if ( file_exists( EVENT_ESPRESSO_UPLOAD_DIR . 'css/style.css' )) {
					wp_register_style( 'espresso_default', EVENT_ESPRESSO_UPLOAD_DIR . 'css/espresso_default.css', array( 'dashicons' ), EVENT_ESPRESSO_VERSION );
				} else {
					wp_register_style( 'espresso_default', EE_GLOBAL_ASSETS_URL . 'css/espresso_default.css', array( 'dashicons' ), EVENT_ESPRESSO_VERSION );
				}
				wp_enqueue_style('espresso_default');

				if ( file_exists( get_stylesheet_directory() . EE_Config::get_current_theme() . DS . 'style.css' )) {
					wp_register_style( 'espresso_style', get_stylesheet_directory_uri() . EE_Config::get_current_theme() . DS . 'style.css', array( 'dashicons', 'espresso_default' ) );
				} else {
					wp_register_style( 'espresso_style', EE_TEMPLATES_URL . EE_Config::get_current_theme() . DS . 'style.css', array( 'dashicons', 'espresso_default' ) );
				}
				
			}

		}

		// js is turned ON by default, but prior to the wp_enqueue_scripts hook, can be turned OFF  via:  add_filter( 'FHEE_load_js', '__return_false' );
		if ( apply_filters( 'FHEE_load_js', TRUE ) ) {

			wp_enqueue_script( 'jquery' );
			//let's make sure that all required scripts have been setup
			if ( function_exists( 'wp_script_is' )) {
				if ( ! wp_script_is( 'jquery' )) {
					$msg = sprintf( 
						__( '%sJquery is not loaded!%sEvent Espresso is unable to load Jquery due to a conflict with your theme or another plugin.', 'event_espresso' ),
						'<em><br />',
						'</em>'
					);
					EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
				}
			}
			// load core js
			wp_register_script( 'espresso_core', EE_GLOBAL_ASSETS_URL . 'scripts/espresso_core.js', array('jquery'), EVENT_ESPRESSO_VERSION, TRUE );
			wp_enqueue_script( 'espresso_core' );
			
		}

		//qtip is turned OFF by default, but prior to the wp_enqueue_scripts hook, can be turned back on again via: add_filter('FHEE_load_qtips', '__return_true' );
		if ( apply_filters( 'FHEE_load_qtip', FALSE ) ) {
			EE_Registry::instance()->load_helper('Qtip_Loader');
			EEH_Qtip_Loader::instance()->register_and_enqueue();
		}


		//accounting.js library
		// @link http://josscrowcroft.github.io/accounting.js/
		if ( apply_filters( 'FHEE_load_accounting_js', FALSE ) ) {
			$acct_js = EE_THIRD_PARTY_URL . 'accounting/accounting.js';
			wp_register_script( 'ee-accounting', EE_GLOBAL_ASSETS_URL . 'scripts/ee-accounting-config.js', array('ee-accounting-core'), EVENT_ESPRESSO_VERSION, TRUE );
			wp_register_script( 'ee-accounting-core', $acct_js, array('underscore'), '0.3.2', TRUE );
			wp_enqueue_script( 'ee-accounting' );

			$currency_config = array(
				'currency' => array(
					'symbol' => EE_Registry::instance()->CFG->currency->sign,
					'format' => array(
						'pos' => EE_Registry::instance()->CFG->currency->sign_b4 ? '%s%v' : '%v%s',
						'neg' => EE_Registry::instance()->CFG->currency->sign_b4 ? '- %s%v' : '- %v%s',
						'zero' => EE_Registry::instance()->CFG->currency->sign_b4 ? '%s--' : '--%s'
						 ),
					'decimal' => EE_Registry::instance()->CFG->currency->dec_mrk,
					'thousand' => EE_Registry::instance()->CFG->currency->thsnds,
					'precision' => EE_Registry::instance()->CFG->currency->dec_plc
					),
				'number' => array(
					'precision' => 0,
					'thousand' => EE_Registry::instance()->CFG->currency->thsnds,
					'decimal' => EE_Registry::instance()->CFG->currency->dec_mrk
					)
				);
			wp_localize_script('ee-accounting', 'EE_ACCOUNTING_CFG', $currency_config);
		}

		if ( ! function_exists( 'wp_head' )) {
			$msg = sprintf( 
				__( '%sMissing wp_head() function.%sThe WordPress function wp_head() seems to be missing in your theme. Please contact the theme developer to make sure this is fixed before using Event Espresso.', 'event_espresso' ),
				'<em><br />',
				'</em>'
			);
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
		}
		if ( ! function_exists( 'wp_footer' )) {
			$msg = sprintf( 
				__( '%sMissing wp_footer() function.%sThe WordPress function wp_footer() seems to be missing in your theme. Please contact the theme developer to make sure this is fixed before using Event Espresso.', 'event_espresso' ),
				'<em><br />',
				'</em>'
			);
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
		}

	}



	/**
	 * 	header_meta_tag
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function header_meta_tag() {
		print( apply_filters("FHEE__EE_Front_Controller__header_meta_tag","<meta name='generator' content='Event Espresso Version " . EVENT_ESPRESSO_VERSION . "' />"));
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
		if ( apply_filters( 'FHEE_run_EE_the_content', FALSE ) ) {
		}
		return $the_content;
	}







	/*********************************************** 		WP_FOOTER		 ***********************************************/





	/**
	 * 	display_registration_footer
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public function display_registration_footer() {
		$url = apply_filters( 'FHEE__EE_Front_Controller__registration_footer__url', 'http://eventespresso.com/' );
		if ( apply_filters( 'FHEE__EE_Front__Controller__show_reg_footer',EE_Registry::instance()->CFG->admin->show_reg_footer ) ) {
			return apply_filters( 'FHEE__EE_Front_Controller__display_registration_footer','<p style="font-size: 12px;"><a href="' . $url . '" title="Event Registration Powered by Event Espresso">Event Registration and Ticketing</a> Powered by <a href="' . $url . '" title="Event Espresso - Event Registration and Management System for WordPress">Event Espresso</a></p>' );
		}
	}




	/**
	 * 	display_errors
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public function display_errors() {
		static $shown_already = FALSE;
		do_action( 'AHEE__EE_Front_Controller__display_errors__begin' );
		if( apply_filters( 'FHEE__EE_Front_Controller__display_errors', TRUE ) && ! $shown_already && ! is_feed() ){
			echo EE_Error::get_notices();
			$shown_already = TRUE;
			EE_Registry::instance()->load_helper( 'Template' );
			EEH_Template::display_template( EE_TEMPLATES . 'espresso-ajax-notices.template.php' );
		}
		do_action( 'AHEE__EE_Front_Controller__display_errors__end' );
	}





	/*********************************************** 		UTILITIES		 ***********************************************/




	/**
	 * 	template_include
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function template_include( $template_include_path = NULL ) {
//		echo '<h4><br/>$template_include_path : ' . $template_include_path . ' </h4>';
//		echo '<h4>$this->_template_path : ' . $this->_template_path . '</h4>';
		// use our locate_template() method which checks for the template in the following places:
		// * /wp-content/theme/ (currently active theme)
		// * /wp-content/uploads/espresso/templates/  
		// * /wp-content/uploads/espresso/templates/ee-theme/  
		// * /wp-content/plugins/EE4/templates/espresso_default/ 
		$this->_template_path = ! empty( $this->_template_path ) ? basename( $this->_template_path ) : basename( $template_include_path );
		$template_path = EEH_Template::locate_template( $this->_template_path, FALSE );
		$this->_template_path = ! empty( $template_path ) ? $template_path : $template_include_path;
		$this->_template = basename( $this->_template_path );
//		echo '<h4>$this->_template_path : ' . $this->_template_path . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
		return $this->_template_path;
	}		




	/**
	 * 	get_selected_template
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public function get_selected_template( $with_path = FALSE ) {
		return $with_path ? $this->_template_path : $this->_template;
	}





	
	


}
// End of file EE_Front_Controller.core.php
// Location: /core/EE_Front_Controller.core.php
