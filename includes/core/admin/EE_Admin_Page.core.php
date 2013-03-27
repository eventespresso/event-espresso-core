<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			{@link http://eventespresso.com/support/terms-conditions/}   * see Plugin Licensing *
 * @ link				{@link http://www.eventespresso.com}
 * @ since		 		3.2.P
 *
 * ------------------------------------------------------------------------
 */



/**
 * EE_Admin_Page class
 *
 * @package		Event Espresso
 * @subpackage		includes/core/admin/EE_Admin_Page.core.php
 * @abstract
 * @author		Brent Christensen, Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
abstract class EE_Admin_Page extends EE_BASE {

	//set in _init_page_props()
	public $page_slug;
	public $page_label;

	//set in define_page_props()
	protected $_admin_base_url;
	protected $_admin_page_title;
	protected $_labels;
	
	//set early within EE_Admin_Init
	protected $_wp_page_slug;

	//navtabs
	protected $_nav_tabs;
	protected $_default_nav_tab_name;

	//template variables (used by templates)
	protected $_template_path;
	protected $_column_template_path;
	protected $_template_args;

	//this will hold the list table object for a given view.
	protected $_list_table_object;

	//bools
	protected $_is_UI_request;
	protected $_routing;

	//list table args
	protected $_view;
	protected $_views;


	//action => method pairs used for routing incoming requests
	protected $_page_routes;
	protected $_page_config;

	//the current page route and route config
	protected $_route;
	protected $_route_config;

	//set via request page and action args.
	protected $_current_page;
	protected $_current_view;
	protected $_current_page_view_url;

	//sanitized request action (and nonce)
	protected $_req_action;
	protected $_req_nonce;

	//search related
	protected $_search_btn_label;
	protected $_search_box_callback;

	//for holding current screen object provided by WP
	protected $_current_screen;

	//for holding EE_Admin_Hooks object when needed (set via set_hook_object())
	protected $_hook_obj;

	//for holding incoming request data
	protected $_req_data;

	// yes / no array for admin form fields
	protected $_yes_no_values = array();




	/**
	 * 		@Constructor
	 *
	 * 		@param bool $routing indicate whether we want to just load the object and handle routing or just load the object.
	 * 		@access public
	 * 		@return void
	 */
	public function __construct( $routing = TRUE ) {

		$this->_yes_no_values = array(
			array('id' => TRUE, 'text' => __('Yes', 'event_espresso')),
			array('id' => FALSE, 'text' => __('No', 'event_espresso'))
		);

		//set the _req_data property.
		$this->_req_data = array_merge( $_GET, $_POST );


		//routing enabled?
		$this->_routing = $routing;
		
		//set initial page props (child method)
		$this->_init_page_props();

		//set global defaults
		$this->_set_defaults();

		//set up page dependencies
		$this->_page_setup();

	}



	
	/**
	 * _init_page_props
	 * Child classes use to set at least the following properties:
	 * $page_slug.
	 *
	 * @abstract
	 * @access protected
	 * @return void
	 */
	abstract protected function _init_page_props();




	/**
	 * _ajax_hooks
	 * child classes put all their add_action('wp_ajax_{name_of_hook}') hooks in here.
	 * Note: within the ajax callback methods.
	 *
	 * @abstract
	 * @access protected
	 * @return void
	 */
	abstract protected function _ajax_hooks();




	/**
	 * _define_page_props
	 * child classes define page properties in here.  Must include at least:
	 * $_admin_base_url = base_url for all admin pages
	 * $_admin_page_title = default admin_page_title for admin pages
	 * $_labels = array of default labels for various automatically generated elements:
	 * 	array(
	 * 		'buttons' => array(
	 * 			'add' => __('label for add new button'),
	 * 	 		'edit' => __('label for edit button'),
	 * 	  		'delete' => __('label for delete button')
	 * 	  	 	)
	 * 	  	)
	 *
	 * @abstract
	 * @access protected
	 * @return void
	 */
	abstract protected function _define_page_props();





	/**
	 * _set_page_routes
	 * child classes use this to define the page routes for all subpages handled by the class.  Page routes are assigned to a action => method pairs in an array and to the $_page_routes property.  Each page route must also have a 'default' route. Here's the format
	 * $this->_page_routes = array(
	 * 		'default' => array(
	 * 			'func' => '_default_method_handling_route',
	 * 			'args' => array('array','of','args')
	 * 			'noheader' => true //add this in if this page route is processed before any headers are loaded (i.e. ajax request, backend processing)
	 * 		),
	 * 		'insert_item' => '_method_for_handling_insert_item' //this can be used if all we need to have is a handling method. 
	 * 		)
	 * 		
	 * )
	 *
	 *
	 * @abstract
	 * @access protected
	 * @return void
	 */
	abstract protected function _set_page_routes();






	/**
	 * _set_page_config
	 * child classes use this to define the _page_config array for all subpages handled by the class. Each key in the array corresponds to the page_route for the loaded page.
	 * Format:
	 * $this->_page_config = array(
	 * 		'default' => array(
	 * 			'labels' => array(
	 * 				'buttons' => array(
	 * 					'add' => __('label for adding item'),
	 * 				 	'edit' => __('label for editing item'),
	 * 				  	'delete' => __('label for deleting item')
	 * 			    )
	 * 			), //optional an array of custom labels for various automatically generated elements to use on the page. If this isn't present then the defaults will be used as set for the $this->_labels in _define_page_props() method
	 * 			'nav' => array(
	 * 				'label' => __('Label for Tab', 'event_espresso').
	 *     			'url' => 'http://someurl', //automatically generated UNLESS you define
	 *     			'css_class' => 'css-class', //automatically generated UNLESS you define
	 *     			'order' => 10, //required to indicate tab position.
	 *     			'persistent' => false //if you want the nav tab to ONLY display when the specific route is displayed then add this parameter.
	 *     		'list_table' => 'name_of_list_table' //string for list table class to be loaded for this admin_page.
	 *     		'metaboxes' => array('metabox1', 'metabox2'), //if present this key indicates we want to load metaboxes set for eventespresso admin pages. 
	 *     		'has_metaboxes' => true, //this boolean flag can simply be used to indicate if the route will have metaboxes.  Typically this is used if the 'metaboxes' index is not used because metaboxes are added later.  We just use this flag to make sure the necessary js gets enqueued on page load.
	 *     		'has_help_popups' => false //defaults(true) //this boolean flag can simply be used to indicate if the given route has help popups setup and if it does then we need to make sure thickbox is enqueued.
	 *     		'columns' => array(4, 2), //this key triggers the setup of a page that uses columns (metaboxes).  The array indicates the max number of columns (4) and the default number of columns on page load (2).  There is an option in the "screen_options" dropdown that is setup so users can pick what columns they want to display.
	 *     		'help_tabs' => array( //this is used for adding help tabs to a page
	 *     			'tab_id' => array(
	 *     				'title' => 'tab_title',
	 *     				'callback' => 'callback_method_for_content'
	 *     				),
	 *     			'tab2_id' => array(
	 *     			 	'title' => 'tab2 title',
	 *     			 	'callback' => 'callback_method_for_content',
	 *     			 )
	 *     		)
	 * 			
	 * )
	 * 
	 *
	 * @abstract
	 * @access protected
	 * @return void
	 */
	abstract protected function _set_page_config();






	/**
	 * _add_screen_options
	 * Child classes can add any extra wp_screen_options within this method using built-in WP functions/methods for doing so.
	 * Note child classes can also define _add_screen_options_($this->_current_view) to limit screen options to a particular view.
	 * @link http://chrismarslender.com/wp-tutorials/wordpress-screen-options-tutorial/
	 * see also WP_Screen object documents...
	 * @link http://codex.wordpress.org/Class_Reference/WP_Screen
	 *
	 * @abstract
	 * @access protected
	 * @return void
	 */
	abstract protected function _add_screen_options();







	/**
	 * _add_feature_pointers
	 * Child classes should use this method for implementing any "feature pointers" (using built-in WP styling js).
	 * Note child classes can also define _add_feature_pointers_($this->_current_view) to limit screen options to a particular view.
	 * Note: this is just a placeholder for now.  Implementation will come down the road
	 * See: WP_Internal_Pointers class in wp-admin/includes/template.php for example (its a final class so can't be extended) also see:
	 * @link http://eamann.com/tech/wordpress-portland/
	 *
	 * @abstract
	 * @access protected
	 * @return void
	 */
	abstract protected function _add_feature_pointers();





	/**
	 * load_scripts_styles
	 * child classes put their wp_enqueue_script and wp_enqueue_style hooks in here for anything they need loaded for their pages/subpages.  Note this is for all pages/subpages of the system.  You can also load only specific scripts/styles per view by putting them in a dynamic function in this format (load_scripts_styles_{$this->_current_view}) which matches your page route (action request arg)
	 *
	 * @abstract
	 * @access public
	 * @return void
	 */
	abstract public function load_scripts_styles();






	/**
	 * admin_init
	 * Anything that should be set/executed at 'admin_init' WP hook runtime should be put in here.  This will apply to all pages/views loaded by child class.
	 *
	 * @abstract
	 * @access public
	 * @return void
	 */
	abstract public function admin_init();




	/**
	 * admin_notices
	 * Anything triggered by the 'admin_notices' WP hook should be put in here.  This particular method will apply to all pages/views loaded by child class.
	 *
	 * @abstract
	 * @access public
	 * @return void
	 */
	abstract public function admin_notices();




	/**
	 * admin_footer_scripts
	 * Anything triggered by the 'admin_print_footer_scripts' WP hook should be put in here. This particular method will apply to all pages/views loaded by child class.
	 *
	 * @access public
	 * @return void 
	 */
	abstract public function admin_footer_scripts();








	/**
	 * _page_setup
	 * Makes sure any things that need to be loaded early get handled.  We also escape early here if the page requested doesn't match the object.
	 *
	 * @final
	 * @access protected
	 * @return void
	 */
	final protected function _page_setup() {

		//set early because incoming requests could be ajax related and we need to register those hooks.
		$this->_ajax_hooks();


		//other_page_hooks have to be early too.
		$this->_do_other_page_hooks();


		//first verify if we need to load anything...
		$this->_current_page = !empty( $_GET['page'] ) ? sanitize_key( $_GET['page'] ) : FALSE;

		if ( !$this->_current_page && !defined( 'DOING_AJAX') ) return FALSE;


		//next let's just check user_access and kill if no access
		$this->_check_user_access();

		
		// becuz WP List tables have two duplicate select inputs for choosing bulk actions, we need to copy the action from the second to the first
		if ( isset( $this->_req_data['action2'] ) && $this->_req_data['action'] == -1 ) {
			$this->_req_data['action'] = ! empty( $this->_req_data['action2'] ) && $this->_req_data['action2'] != -1 ? $this->_req_data['action2'] : $this->_req_data['action'];
		}
		// then set blank or -1 action values to 'default'
		$this->_req_action = isset( $this->_req_data['action'] ) && ! empty( $this->_req_data['action'] ) && $this->_req_data['action'] != -1 ? sanitize_key( $this->_req_data['action'] ) : 'default';
		
		//however if we are doing_ajax and we've got a 'route' set then that's what the req_action will be
		$this->_req_action = defined('DOING_AJAX') && isset($this->_req_data['route']) ? $this->_req_data['route'] : $this->_req_action;

		$this->_current_view = $this->_req_action;
		$this->_req_nonce = $this->_req_action . '_nonce';
		$this->_define_page_props();

		$this->_current_page_view_url = add_query_arg( array( 'page' => $this->_current_page, 'action' => $this->_current_view ),  $this->_admin_base_url );

		//set page configs
		$this->_set_page_routes();
		$this->_set_page_config();


		//next route only if routing enabled
		if ( $this->_routing && !defined('DOING_AJAX') ) {
			
			$this->_verify_routes();

			if ( $this->_is_UI_request ) {
				//admin_init stuff - global, all views for this page class, specific view
				add_action( 'admin_init', array( $this, 'admin_init_global' ), 5 );
				add_action( 'admin_init', array( $this, 'admin_init' ), 10 );
				if ( method_exists( $this, 'admin_init_' . $this->_current_view )) {
					add_action( 'admin_init', array( $this, 'admin_init_' . $this->_current_view ), 15 );
				}
				
				// Check to make sure all of the main pages are setup properly,
				// if not create the default pages and display an admin notice
				$this->_verify_default_pages_exist();
							
			} else {
				//hijack regular WP loading and route admin request immediately
				if ( current_user_can( 'manage_options' ) )
					@ini_set( 'memory_limit', apply_filters( 'admin_memory_limit', WP_MAX_MEMORY_LIMIT ) );
				$this->route_admin_request();
			}
		}
	}





	/**
	 * Provides a way for related child admin pages to load stuff on the loaded admin page.
	 *
	 * @access private
	 * @return void
	 */
	private function _do_other_page_hooks() {
		$registered_pages = apply_filters('filter_hook_espresso_do_other_page_hooks_' . $this->page_slug, array() );

		foreach ( $registered_pages as $page ) {

			//now let's setup the file name and class that should be present
			$classname = str_replace('.class.php', '', $page);

			//autoloaders should take care of loading file
			if ( !class_exists( $classname ) ) {
				$error_msg[] = sprintf( __('Something went wrong with loading the %s admin hooks page.', 'event_espresso' ), $page);
				$error_msg[] = $error_msg[0] . "\r\n" . sprintf( __( 'There is no class in place for the %s admin hooks page.%sMake sure you have <strong>%s</strong> defined. If this is a non-EE-core admin page then you also must have an autoloader in place for your class', 'event_espresso'), $page, '<br />', $classname );
				throw new EE_Error( implode( '||', $error_msg ));
			}

			$a = new ReflectionClass($classname);

			//notice we are passing the instance of this class to the hook object.
			$hookobj[] = $a->newInstance($this);
		}
	}


	/**
	 * load_page_dependencies
	 * loads things specific to this page class when its loaded.  Really helps with efficiency.
	 * @access public
	 * @return void
	 */
	public function load_page_dependencies() {

		$this->_current_screen = get_current_screen();
			
		
		//load admin_notices - global, page class, and view specific
		add_action( 'admin_notices', array( $this, 'admin_notices_global'), 5 );
		add_action( 'admin_notices', array( $this, 'admin_notices' ), 10 );
		if ( method_exists( $this, 'admin_notices_' . $this->_current_view ) )
			add_action( 'admin_notices', array( $this, 'admin_notices_' . $this->_current_view ), 15 );

		//this will save any per_page screen options if they are present 
		$this->_set_per_page_screen_options();

		//setup list table properties
		$this->_set_list_table();
		
		//setup search attributes
		$this->_set_search_attributes();

		// child classes can "register" a metabox to be automatically handled via the _page_config array property.  However in some cases the metaboxes will need to be added within a route handling callback.
		$this->_add_registered_meta_boxes();
		$this->_add_screen_columns();

		//add screen options - global, page child class, and view specific
		$this->_add_global_screen_options();
		$this->_add_screen_options();
		if ( method_exists( $this, '_add_screen_options_' . $this->_current_view ) )
			call_user_func( array( $this, '_add_screen_options_' . $this->_current_view ) );

		//add help tab(s) - set via page_config.
		$this->_add_help_tabs();


		//add feature_pointers - global, page child class, and view specific
		$this->_add_feature_pointers();
		$this->_add_global_feature_pointers();
		if ( method_exists( $this, '_add_feature_pointer_' . $this->_current_view ) )
			call_user_func( array( $this, '_add_feature_pointer_' . $this->_current_view ) );

		//enqueue scripts/styles - global, page class, and view specific
		add_action('admin_enqueue_scripts', array($this, 'load_global_scripts_styles'), 5 );
		add_action('admin_enqueue_scripts', array($this, 'load_scripts_styles'), 10 );
		if ( method_exists( $this, 'load_scripts_styles_' . $this->_current_view ) )
			add_action('admin_enqueue_scripts', array($this, 'load_scripts_styles_' . $this->_current_view ), 15 );

		//admin_print_footer_scripts - global, page child class, and view specific.  NOTE, despite the name, whenever possible, scripts should NOT be loaded using this.  In most cases that's doing_it_wrong().  But adding hidden container elements etc. is a good use case. Notice the late priority we're giving these. 
		add_action('admin_print_footer_scripts', array( $this, 'admin_footer_scripts_global' ), 99 );
		add_action('admin_print_footer_scripts', array( $this, 'admin_footer_scripts' ), 100 );
		if ( method_exists( $this, 'admin_footer_scripts_' . $this->_current_view ) )
			add_action('admin_print_footer_scripts', array( $this, 'admin_footer_scripts_' . $this->_current_view ), 101 );
		add_action('admin_print_footer_scripts', array( $this, 'admin_footer_scripts_eei18n_js_strings' ), 102 );
	}

	



	/**
	 * _set_defaults
	 * This sets some global defaults for class properties.
	 */
	private function _set_defaults() {
		$this->_admin_base_url = $this->_current_screen = $this->_admin_page_title = $this->_req_action = $this->_req_nonce = $this->_event = $this->_template_path = $this->_column_template_path = NULL;

		$this->_nav_tabs = $this_views = $this->_page_routes = $this->_page_config = array();

		$this->default_nav_tab_name = 'overview';

		//init template args
		$this->_template_args = array(
			'admin_page_header' => '',
			'admin_page_content' => '',
			'post_body_content' => ''
		);
	}


	

	/**
	 * route_admin_request
	 * 
	 * @see _route_admin_request()
	 * @access public
	 * @return void|exception error
	 */
	public function route_admin_request() {

		try {
			$this->_route_admin_request();
		} catch ( EE_Error $e ) {
			$e->get_error();
		}
	}

	

	public function set_wp_page_slug($wp_page_slug) {
		$this->_wp_page_slug = $wp_page_slug;
	}

	/**
	 * _verify_routes
	 * All this method does is verify the incoming request and make sure that routes exist for it.  We do this early so we know if we need to drop out.
	 *
	 * @access private
	 * @return void
	 */
	private function _verify_routes() {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

		if ( !$this->_current_page && !defined( 'DOING_AJAX')) return FALSE;

		$this->_route = FALSE;
		$func = FALSE;
		$args = array();	
		
		// check that the page_routes array is not empty
		if ( empty( $this->_page_routes )) {
			// user error msg
			$error_msg = sprintf( __('No page routes have been set for the %s admin page.', 'event_espresso'), $this->_admin_page_title );
			// developer error msg
			$error_msg .=  '||' . $error_msg . __( ' Make sure the "set_page_routes()" method exists, and is seting the "_page_routes" array properly.', 'event_espresso' );
			throw new EE_Error( $error_msg );
		} 							
	
		// and that the requested page route exists 
		if ( array_key_exists( $this->_req_action, $this->_page_routes )) {
			$this->_route = $this->_page_routes[ $this->_req_action ];
			$this->_route_config = isset($this->_page_config[$this->_req_action]) ? $this->_page_config[$this->_req_action] : array();
		} else {
			// user error msg
			$error_msg =  sprintf( __( 'The requested page route does not exist for the %s admin page.', 'event_espresso' ), $this->_admin_page_title );
			// developer error msg
			$error_msg .=  '||' . $error_msg . sprintf( __( ' Create a key in the "_page_routes" array named "%s" and set it\'s value to the appropriate method.', 'event_espresso' ), $this->_req_action );
			throw new EE_Error( $error_msg );
		}

		// and that a default route exists
		if ( ! array_key_exists( 'default', $this->_page_routes )) {
			// user error msg
			$error_msg = sprintf( __( 'A default page route has not been set for the % admin page.', 'event_espresso' ), $this->_admin_page_title );
			// developer error msg
			$error_msg .=  '||' . $error_msg . __( ' Create a key in the "_page_routes" array named "default" and set it\'s value to your default page method.', 'event_espresso' );
			throw new EE_Error( $error_msg );
		}

		//lets set if this is a UI request or not.
		$this->_is_UI_request = ( ! isset( $this->_req_data['noheader'] ) || $this->_req_data['noheader'] != 'true' ) ? TRUE : FALSE;


		//wait a minute... we might have a noheader in the route array
		$this->_is_UI_request = is_array($this->_route) && isset($this->_route['noheader'] ) && $this->_route['noheader'] ? FALSE : $this->_is_UI_request;

	}



	/**
	 * this method simply verifies a given route and makes sure its an actual route available for the loaded page
	 * @param  string $route the route name we're verifying
	 * @return mixed  (bool|Exception)      we'll throw an exception if this isn't a valid route.
	 */
	private function _verify_route( $route ) {
		if ( array_key_exists( $this->_req_action, $this->_page_routes )) {
			return true;
		} else {
			// user error msg
			$error_msg =  sprintf( __( 'The given page route does not exist for the %s admin page.', 'primal-plugin' ), $this->_admin_page_title );
			// developer error msg
			$error_msg .=  '||' . $error_msg . sprintf( __( ' Check the route you are using in your method (%s) and make sure it matches a route set in your "_page_routes" array property', 'event_espresso' ), $route );
			throw new PRM_Error( $error_msg );
		}
	}




	/**
	 * perform nonce verification
	 * This method has be encapsulated here so that any ajax requests that bypass normal routes can verify their nonces using this method (and save retyping!)
	 * @param  string $nonce     The nonce sent
	 * @param  string $nonce_ref The nonce reference string (name0)
	 * @return mixed (bool|die)   
	 */
	protected function _verify_nonce( $nonce, $nonce_ref ) {
		// verify nonce against expected value
		if ( ! wp_verify_nonce( $nonce, $nonce_ref) ) {
			// these are not the droids you are looking for !!!
			$msg = sprintf(__('%sNonce Fail.%s' , 'event_espresso'), '<a href="http://www.youtube.com/watch?v=56_S0WeTkzs">', '</a>' );
			if ( WP_DEBUG ) {
				$msg .= "\n" . sprintf( __('In order to dynamically generate nonces for your actions, use the %s->_add_query_arg method. May the Nonce be with you!', 'event_espresso' ), __CLASS__  );
			}
			if ( ! defined( 'DOING_AJAX' )) {
				wp_die( $msg );
			} else {
				EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
				$this->_return_json();
			}
		}
	}




	/**
	 * _route_admin_request()
	 * Meat and potatoes of the class.  Basically, this dude checks out what's being requested and sees if theres are some doodads to work the magic and handle the flingjangy.
	 * Translation:  Checks if the requested action is listed in the page routes and then will try to load the corresponding method.
	 *
	 * @access private
	 * @return void
	 */
	private function _route_admin_request() {

		$this->_verify_routes();

		if ( $this->_req_action != 'default' ) {
			// set nonce from post data
			$nonce = isset($this->_req_data[ $this->_req_nonce  ]) ? sanitize_text_field( $this->_req_data[ $this->_req_nonce  ] ) : '';
			$this->_verify_nonce( $nonce, $this->_req_nonce );	
		}		

		$this->_set_nav_tabs(); //set the nav_tabs array
		$this->_set_current_labels();
		$args = array();	

		
		// check if callback has args
		if ( is_array( $this->_route )) {
			$func = $this->_route['func'];
			$args = isset( $this->_route['args'] ) ?  $this->_route['args'] : array();
		} else {
			$func = $this->_route;
		}
			
		if ( $func ) {		
			// and finally,  try to access page route
			if ( call_user_func_array( array( $this, &$func  ), $args ) === FALSE ) {
				// user error msg
				$error_msg =  __( 'An error occured. The  requested page route could not be found.', 'event_espresso' );
				// developer error msg
				$error_msg .= '||' . sprintf( __( 'Page route "%s" could not be called. Check that the spelling for method names and actions in the "_page_routes" array are all correct.', 'event_espresso' ), $func );
				throw new EE_Error( $error_msg );
			}				
		}
	}




	/**
	 * _add_query_arg
	 * adds nonce to array of arguments then calls WP add_query_arg function
	 *
	 * 	@access public
	 *	@param array $args
	 *	@param string $url
	 * 	@return void
	 */
	public static function add_query_args_and_nonce( $args = array(), $url = FALSE ) {
		if ( ! $url ) {
			$user_msg = __('An error occured. A URL is a required parameter for the _add_query_arg method.', 'event_espresso' );
			$dev_msg = $user_msg . "\n" . sprintf( 
					__('In order to dynamically generate nonces for your actions, you need to supply a valid URL as a second parameter for the %s->_add_query_arg method.', 'event_espresso' ),
					__CLASS__ 
				);
			EE_Error::add_error( $user_msg . '||' . $dev_msg, __FILE__, __FUNCTION__, __LINE__ );				
		}
		// check that an action exists
		if ( isset( $args['action'] ) && ! empty( $args['action'] )) {
			$args = array_merge( $args, array( $args['action'] . '_nonce' => wp_create_nonce( $args['action'] . '_nonce' )));
		} else {
			$args = array_merge( $args, array( 'action' => 'default', 'default_nonce' => wp_create_nonce( 'default_nonce' )));
		}
		return add_query_arg( $args, $url );
		
	}




	/**
	 * _add_help_tabs
	 * 
	 * Note child classes define their help tabs within the page_config array.
	 * @link http://codex.wordpress.org/Function_Reference/add_help_tab
	 *
	 * @access protected
	 * @return void
	 */
	protected function _add_help_tabs() {

		foreach ( $this->_page_config as $slug => $config ) {
			if ( !is_array( $config ) || ( is_array( $config ) && !isset( $config['help_tabs'] ) ) || $slug != $this->_req_action ) continue; //no help tabs for this config

			foreach ( $config['help_tabs'] as $tab_id => $cfg ) {
				//we're here so there ARE help tabs!
				
				//make sure we've got what we need
				if ( !isset( $cfg['title'] ) )
					throw new EE_Error( __('The _page_config array is not set up properly for help tabs.  It is missing a title', 'event_espresso') );

				if ( !isset( $cfg['callback'] ) )
					throw new EE_Error( __('The _page_config array is not setup properly for help tabs. It is missing a callback reference', 'event_espresso') );

				//chekc if callback is valid
				if ( !method_exists( $this, $cfg['callback'] ) ) 
					throw new EE_Error( sprintf( __('The callback given for the %s help tab does not have a corresponding method.  Check the spelling or make sure the method is present.  This method is used to get the content for the tab.', 'event_espresso'), $cfg['title'] ) );
		
					
				//setup config array for help tab method
				$id = $this->page_slug . '-' . $slug . '-' . $tab_id;
				$_ht = array(
					'id' => $id,
					'title' => $cfg['title'],
					'callback' => array( $this, $cfg['callback'] )
					);

				$this->_current_screen->add_help_tab( $_ht );
			}
		}
	}




	/**
	 * _set_nav_tabs
	 * This sets up the nav tabs from the page_routes array.  This method can be overwritten by child classes if you wish to add additional tabs or modify accordingly.
	 *
	 * @access protected
	 * @return void
	 */
	protected function _set_nav_tabs() {
		$i = 0;
		foreach ( $this->_page_config as $slug => $config ) {
			if ( !is_array( $config ) || ( is_array($config) && (isset($config['nav']) && !$config['nav'] ) || !isset($config['nav'] ) ) ) 
				continue; //no nav tab for this config

			//check for persistent flag
			if ( isset( $config['nav']['persistent']) && !$config['nav']['persistent'] && $slug !== $this->_req_action )
				continue; //nav tab is only to appear when route requested.

			$css_class = isset( $config['css_class'] ) ? $config['css_class'] . ' ' : '';
			$this->_nav_tabs[$slug] = array(
				'url' => isset($config['nav']['url']) ? $config['nav']['url'] : self::add_query_args_and_nonce( array( 'action'=>$slug ), $this->_admin_base_url ),
				'link_text' => isset( $config['nav']['label'] ) ? $config['nav']['label'] : ucwords(str_replace('_', ' ', $slug ) ),
				'css_class' => $this->_req_action == $slug ? $css_class . 'nav-tab-active' : $css_class,
				'order' => isset( $config['nav']['order'] ) ? $config['nav']['order'] : $i
				); 
			$i++;
		}

		//if $this->_nav_tabs is empty then lets set the default
		if ( empty( $this->_nav_tabs ) ) {
			$this->_nav_tabs[$this->default_nav_tab_name] = array(
				'url' => $this->admin_base_url,
				'link_text' => ucwords( str_replace( '_', ' ', $this->default_nav_tab_name ) ),
				'css_class' => 'nav-tab-active',
				'order' => 10
				);
		}

		//now let's sort the tabs according to order
		usort( $this->_nav_tabs, array($this, '_sort_nav_tabs' ));

	}





	/**
	 * _set_current_labels
	 * This method modifies the _labels property with any optional specific labels indicated in the _page_routes property array
	 *
	 * @access private
	 * @return void
	 */
	private function _set_current_labels() {
		if ( is_array($this->_route_config) && isset($this->_route_config['labels']) ) {
			foreach ( $this->_route_config['labels'] as $label => $text ) {
				if ( is_array($text) ) {
					foreach ( $text as $sublabel => $subtext ) {
						$this->_labels[$label][$sublabel] = $subtext;
					}
				} else {
					$this->_labels[$label] = $text;
				}
			}
		}
	}






	/**
	 * 		verifies user access for this admin page
	*		@access 		private
	*		@return 		void
	*/
	private function _check_user_access() {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		if ( ! function_exists( 'is_admin' ) or  ! current_user_can( 'manage_options' )) {
			wp_redirect( home_url('/') . 'wp-admin/' );
		}
	}







	/**
	 * admin_init_global
	 * This runs all the code that we want executed within the WP admin_init hook.
	 * This method executes for ALL EE Admin pages.
	 *
	 * @access public
	 * @return void
	 */
	public function admin_init_global() {
	}






	/**
	 * admin_notices
	 * Anything triggered by the 'admin_notices' WP hook should be put in here.  This particular method will apply on ALL EE_Admin pages.
	 *
	 * @access public
	 * @return void
	 */
	public function admin_notices_global() {
		$this->_display_no_javascript_warning();
		$this->_display_espresso_notices();
	}



	
	/**
	 * admin_footer_scripts_global
	 * Anything triggered by the 'admin_print_footer_scripts' WP hook should be put in here. This particular method will apply on ALL EE_Admin pages.
	 *
	 * @access public
	 * @return void 
	 */
	public function admin_footer_scripts_global() {
		$this->_add_admin_page_ajax_loading_img();
		$this->_add_admin_page_overlay();

		//if metaboxes are present we need to add the nonce field
		if ( isset($this->_route_config['metaboxes']) || ( isset($this->_route_config['has_metaboxes']) && $this->_route_config['has_metaboxes'] ) || isset($this->_route_config['list_table']) ) {
			wp_nonce_field('closedpostboxes', 'closedpostboxesnonce', false);
			wp_nonce_field('meta-box-order', 'meta-box-order-nonce', false);
		}
	}



	/**
	 * This function sees if there is a method for help popup content existing for the given route.  If there is then we'll use the retrieved array to output the content using the template.
	 *
	 * For child classes:
	 * If you want to have help popups then in your templates or your content you set "triggers" for the content using the "_set_help_trigger('help_trigger_id')" where "help_trigger_id" is what you will use later in your custom method for the help popup content on that page.
	 * Then in your Child_Admin_Page class you need to define a help popup method for the content in the format "_help_popup_content_{route_name}()"  So if you are setting help content for the 'edit_event' route you should have a method named "_help_popup_content_edit_route".
	 * In your defined "help_popup_content_..." method.  You must prepare and return an array in the following format
	 * array(
	 * 	'help_trigger_id' => array(
	 * 		'title' => __('localized title for popup', 'event_espresso'),
	 * 		'content' => __('localized content for popup', 'event_espresso')
	 * 	)
	 * );
	 *
	 * Then the EE_Admin_Parent will take care of making sure that is setup properly on the correct route.
	 * 
	 *
	 * @access protected
	 * @return string content
	 */
	protected function _set_help_popup_content( $help_array = array(), $display = FALSE ) {
		$content = '';

		$help_array = empty( $help_array ) ? $this->_get_help_content() : $help_array;
		$template_path = EE_CORE_ADMIN . 'admin_help_popup.template.php';


		//loop through the array and setup content
		foreach ( $help_array as $trigger => $help ) {
			//make sure the array is setup properly
			if ( !isset($help['title']) || !isset($help['content'] ) ) {
				throw new EE_Error( __('Does not look like the popup content array has been setup correctly.  Might want to double check that.  Read the comments for the _get_help_popup_content method found in "EE_Admin_Page" class', 'event_espresso') );
			}

			//we're good so let'd setup the template vars and then assign parsed template content to our content.
			$template_args = array(
				'help_popup_id' => $trigger,
				'help_popup_title' => $help['title'],
				'help_popup_content' => $help['content']
				); 

			$content .= espresso_display_template( $template_path, $template_args, TRUE );
		}

		if ( $display )
			echo $content;
		else
			return $content;
	}




	/**
	 * All this does is retrive the help content array if set by the EE_Admin_Page child
	 *
	 * @access private
	 * @return array properly formatted array for help popup content
	 */
	private function _get_help_content() {
		//what is the method we're looking for?
		$method_name = '_help_popup_content_' . $this->_req_action;

		//if method doesn't exist let's get out.
		if ( !method_exists( $this, $method_name ) )
			return array();

		//k we're good to go let's retrieve the help array
		$help_array = call_user_func( array( $this, $method_name ) );

		//make sure we've got an array!
		if ( !is_array($help_array) ) {
			throw new EE_Error( __('Something went wrong with help popup content generation. Expecting an array and well, this ain\'t no array bub.', 'event_espresso' ) );
		}

		return $help_array;
	}
	


	/**
	 * EE Admin Pages can use this to set a properly formatted trigger for a help popup.
	 *
	 * By default the trigger html is printed.  Otherwise it can be returned if the $display flag is set "false"
	 *
	 * See comments made on the _set_help_content method for understanding other parts to the help popup tool.
	 *
	 * 
	 * @access protected
	 * @param string  $trigger_id reference for retrieving the trigger content for the popup
	 * @param boolean $display    if false then we return the trigger string
	 * @param array $dimensions an array of dimensions for the box (array(h,w))
	 * @return string
	 */
	protected function _set_help_trigger( $trigger_id, $display = TRUE, $dimensions = array( '400', '640') ) {

		if ( defined('DOING_AJAX') ) return;

		//let's check and see if there is any content set for this popup.  If there isn't then we'll include a default title and content so that developers know something needs to be corrected
		$help_array = $this->_get_help_content();
		$help_content = '';

		if ( empty( $help_array ) || !isset( $help_array[$trigger_id] ) ) {
			$help_array[$trigger_id] = array(
				'title' => __('Missing Content', 'event_espresso'),
				'content' => __('A trigger has been set that doesn\'t have any corresponding content. Make sure you have set the help content. (see the "_set_help_popup_content" method in the EE_Admin_Page for instructions.)', 'event_espresso')
				);
			$help_content = $this->_set_help_popup_content( $help_array, FALSE );
		}

		//let's setup the trigger
		$content = '<a class="ee-dialog" href="?height='. $dimensions[0] . '&width=' . $dimensions[1] . '&inlineId=' . $trigger_id . '" target="_blank"><span class="question ee-help-popup-question"></span></a>';
		$content = $content . $help_content;

		if ( $display )
			echo $content;
		else
			return $content;
	}


	/**
	 * _add_global_screen_options
	 * Add any extra wp_screen_options within this method using built-in WP functions/methods for doing so.
	 * This particular method will add_screen_options on ALL EE_Admin Pages
	 * @link http://chrismarslender.com/wp-tutorials/wordpress-screen-options-tutorial/
	 * see also WP_Screen object documents...
	 * @link http://codex.wordpress.org/Class_Reference/WP_Screen
	 *
	 * @abstract
	 * @access private
	 * @return void
	 */
	private function _add_global_screen_options() {}









	/**
	 * _add_global_feature_pointers
	 * This method is used for implementing any "feature pointers" (using built-in WP styling js).
	 * This particular method will implement feature pointers for ALL EE_Admin pages.
	 * Note: this is just a placeholder for now.  Implementation will come down the road
	 * @see WP_Internal_Pointers class in wp-admin/includes/template.php for example (its a final class so can't be extended) also see:
	 * @link http://eamann.com/tech/wordpress-portland/
	 *
	 * @abstract
	 * @access protected
	 * @return void
	 */
	private function _add_global_feature_pointers() {}






	/**
	 * load_global_scripts_styles
	 * The scripts and styles enqueued in here will be loaded on every EE Admin page
	 * 
	 * @return void 
	 */
	public function load_global_scripts_styles() {
		/** STYLES **/
		// add debugging styles
		if ( WP_DEBUG ) {
			add_action('admin_head', array( $this, 'add_xdebug_style' ));
		}
		
		//register all styles
		wp_register_style('jquery-ui-style', EVENT_ESPRESSO_PLUGINFULLURL . 'css/ui-ee-theme/jquery-ui-1.8.16.custom.css', array(),EVENT_ESPRESSO_VERSION );
		//wp_register_style('event_espresso', EVENT_ESPRESSO_PLUGINFULLURL . 'css/admin-styles.css', array(), EVENT_ESPRESSO_VERSION);
		wp_register_style('jquery-ui-style-datepicker-css', EVENT_ESPRESSO_PLUGINFULLURL . 'css/ui-ee-theme/jquery.ui.datepicker.css', array('jquery-ui-style'), EVENT_ESPRESSO_VERSION );
		wp_register_style('ee-admin-css', EE_CORE_ADMIN_URL . 'assets/ee-admin-page.css', array(), EVENT_ESPRESSO_VERSION);
		//helpers styles
		wp_register_style('ee-text-links', EVENT_ESPRESSO_PLUGINFULLURL . 'helpers/assets/ee_text_list_helper.css', array(), EVENT_ESPRESSO_VERSION );
		//enqueue global styles
		wp_enqueue_style('ee-admin-css');


		/** SCRIPTS **/

		//register all scripts
		//wp_register_script('jquery-ui-datepicker', EVENT_ESPRESSO_PLUGINFULLURL . 'scripts/jquery-ui-datepicker.js', array('jquery-ui-core'), EVENT_ESPRESSO_VERSION, true );
		wp_register_script('jquery-ui-timepicker-addon', EVENT_ESPRESSO_PLUGINFULLURL . 'scripts/jquery-ui-timepicker-addon.js', array('jquery-ui-datepicker'), EVENT_ESPRESSO_VERSION, true );
		wp_register_script('ee_admin_js', EE_CORE_ADMIN_URL . 'assets/ee-admin-page.js', array('jquery', 'ee-parse-uri'), EVENT_ESPRESSO_VERSION, true );
		wp_register_script('jquery-validate', EVENT_ESPRESSO_PLUGINFULLURL . "scripts/jquery.validate.min.js", array('jquery'), EVENT_ESPRESSO_VERSION, TRUE);
		wp_register_script('espresso_ajax_table_sorting', EE_CORE_ADMIN_URL . "assets/espresso_ajax_table_sorting.js", array('ee_admin_js', 'jquery-ui-draggable'), EVENT_ESPRESSO_VERSION, TRUE);
		//script for parsing uri's
		wp_register_script( 'ee-parse-uri', EVENT_ESPRESSO_PLUGINFULLURL . 'scripts/parseuri.js', array(), EVENT_ESPRESSO_VERSION, TRUE );
		//and parsing associative serialized form elements
		wp_register_script( 'ee-serialize-full-array', EVENT_ESPRESSO_PLUGINFULLURL . 'scripts/jquery.serializefullarray.js', array('jquery'), EVENT_ESPRESSO_VERSION, TRUE );
		//helpers scripts
		wp_register_script('ee-text-links', EVENT_ESPRESSO_PLUGINFULLURL . 'helpers/assets/ee_text_list_helper.js', array('jquery'), EVENT_ESPRESSO_VERSION, TRUE );

		//jqplot library
		wp_register_script('jqplot', JQPLOT_URL . 'jquery.jqplot.min.js', array('jquery'), '', FALSE);
		wp_register_script('jqplot-barRenderer', JQPLOT_URL . 'plugins/jqplot.barRenderer.min.js', array('jqplot'), '', FALSE);
		wp_register_script('jqplot-canvasTextRenderer', JQPLOT_URL . 'plugins/jqplot.canvasTextRenderer.min.js', array('jqplot'), '', FALSE);
		wp_register_script('jqplot-canvasAxisTickRenderer', JQPLOT_URL . 'plugins/jqplot.canvasAxisTickRenderer.min.js', array('jqplot'), '', FALSE);
		wp_register_script('jqplot-categoryAxisRenderer', JQPLOT_URL . 'plugins/jqplot.categoryAxisRenderer.min.js', array('jqplot'), '', FALSE);
		wp_register_script('jqplot-dateAxisRenderer', JQPLOT_URL . 'plugins/jqplot.dateAxisRenderer.min.js', array('jqplot'), '', FALSE);
		wp_register_script('jqplot-highlighter', JQPLOT_URL . 'plugins/jqplot.highlighter.min.js', array('jqplot'), '', FALSE);
		wp_register_script('jqplot-pointLabels', JQPLOT_URL . 'plugins/jqplot.pointLabels.min.js', array('jqplot'), '', FALSE);
		wp_register_script('jqplot-all', EE_CORE_ADMIN_URL . 'assets/ee-admin-jqlot-all.js', array('jqplot-pointLabels', 'jqplot-highlighter', 'jqplot-dateAxisRenderer', 'jqplot-categoryAxisRenderer', 'jqplot-canvasAxisTickRenderer', 'jqplot-canvasTextRenderer', 'jqplot-barRenderer'), EVENT_ESPRESSO_VERSION, FALSE );


		//enqueue global scripts

		//taking care of metaboxes
		if ( isset($this->_route_config['metaboxes'] ) || isset($this->_route_config['has_metaboxes']) ) {
			wp_enqueue_script('dashboard');
		}

		//enqueue thickbox for ee help popups.  default is to enqueue unless its explicitly set to false since we're assuming all EE pages will have popups
		if ( !isset( $this->_route_config['has_help_popups']) || ( isset( $this->_route_config['has_help_popups']) && $this->_route_config['has_help_popups'] ) ) {
			wp_enqueue_script('ee_admin_js');
			wp_enqueue_style('ee-admin-css');
		}
		


		//localizers (for passing variables to js as well)
//		global $eei18n_js_strings;
//		$eei18n_js_strings['image_confirm'] = __('Do you really want to delete this image? Please remember to update your event to complete the removal.', 'event_espresso');
//		wp_localize_script( 'event_editor_js', 'EE_EDIT_VARS', $eei18n_js_strings );


		/** remove filters **/
		remove_all_filters('mce_external_plugins');
	}


	

	/**
	*		admin_footer_scripts_eei18n_js_strings
	* 
	*		@access 		public
	*		@return 		void
	*/	
	public function admin_footer_scripts_eei18n_js_strings() {
		
		global $eei18n_js_strings;
		$eei18n_js_strings['confirm_delete'] = __( 'Are you absolutely sure you want to delete this item?\nThis action will delete ALL DATA asscociated with this item!!!\nThis can NOT be undone!!!', 'event_espresso' );
		
		$eei18n_js_strings['January'] = __( 'January', 'event_espresso' );
		$eei18n_js_strings['February'] = __( 'February', 'event_espresso' );
		$eei18n_js_strings['March'] = __( 'March', 'event_espresso' );
		$eei18n_js_strings['April'] = __( 'April', 'event_espresso' );
		$eei18n_js_strings['May'] = __( 'May', 'event_espresso' );
		$eei18n_js_strings['June'] = __( 'June', 'event_espresso' );
		$eei18n_js_strings['July'] = __( 'July', 'event_espresso' );
		$eei18n_js_strings['August'] = __( 'August', 'event_espresso' );
		$eei18n_js_strings['September'] = __( 'September', 'event_espresso' );
		$eei18n_js_strings['October'] = __( 'October', 'event_espresso' );
		$eei18n_js_strings['November'] = __( 'November', 'event_espresso' );
		$eei18n_js_strings['December'] = __( 'December', 'event_espresso' );
		$eei18n_js_strings['Jan'] = __( 'Jan', 'event_espresso' );
		$eei18n_js_strings['Feb'] = __( 'Feb', 'event_espresso' );
		$eei18n_js_strings['Mar'] = __( 'Mar', 'event_espresso' );
		$eei18n_js_strings['Apr'] = __( 'Apr', 'event_espresso' );
		$eei18n_js_strings['May'] = __( 'May', 'event_espresso' );
		$eei18n_js_strings['Jun'] = __( 'Jun', 'event_espresso' );
		$eei18n_js_strings['Jul'] = __( 'Jul', 'event_espresso' );
		$eei18n_js_strings['Aug'] = __( 'Aug', 'event_espresso' );
		$eei18n_js_strings['Sep'] = __( 'Sep', 'event_espresso' );
		$eei18n_js_strings['Oct'] = __( 'Oct', 'event_espresso' );
		$eei18n_js_strings['Nov'] = __( 'Nov', 'event_espresso' );
		$eei18n_js_strings['Dec'] = __( 'Dec', 'event_espresso' );
		
		$eei18n_js_strings['Sunday'] = __( 'Sunday', 'event_espresso' );
		$eei18n_js_strings['Monday'] = __( 'Monday', 'event_espresso' );
		$eei18n_js_strings['Tuesday'] = __( 'Tuesday', 'event_espresso' );
		$eei18n_js_strings['Wednesday'] = __( 'Wednesday', 'event_espresso' );
		$eei18n_js_strings['Thursday'] = __( 'Thursday', 'event_espresso' );
		$eei18n_js_strings['Friday'] = __( 'Friday', 'event_espresso' );
		$eei18n_js_strings['Saturday'] = __( 'Saturday', 'event_espresso' );
		$eei18n_js_strings['Sun'] = __( 'Sun', 'event_espresso' );
		$eei18n_js_strings['Mon'] = __( 'Mon', 'event_espresso' );
		$eei18n_js_strings['Tue'] = __( 'Tue', 'event_espresso' );
		$eei18n_js_strings['Wed'] = __( 'Wed', 'event_espresso' );
		$eei18n_js_strings['Thu'] = __( 'Thu', 'event_espresso' );
		$eei18n_js_strings['Fri'] = __( 'Fri', 'event_espresso' );
		$eei18n_js_strings['Sat'] = __( 'Sat', 'event_espresso' );
		
		wp_localize_script( 'ee_admin_js', 'eei18n', $eei18n_js_strings );
		wp_localize_script( 'jquery-validate', 'eei18n', $eei18n_js_strings );
		
	}

	

	/**
	*		load enhanced xdebug styles for ppl with failing eyesight
	* 
	*		@access 		public
	*		@return 		void
	*/	
	public function add_xdebug_style() {
		echo '<style>.xdebug-error { font-size:1.5em; }</style>';
	}


	/************************/
	/** LIST TABLE METHODS **/
	/************************/





	/**
	 * this sets up the list table if the current view requires it.
	 *
	 * @access protected
	 * @return void
	 */
	protected function _set_list_table() {
		//first is this a list_table view?
		if ( !isset($this->_route_config['list_table']) )
			return; //not a list_table view so get out.

		//list table functions are per view specific (because some admin pages might have more than one listtable!)
		
		if ( call_user_func( array( $this, '_set_list_table_views_' . $this->_req_action ) ) === FALSE ) {
			//user error msg
			$error_msg = __('An error occured. The requested list table views could not be found.', 'event_espresso' );
			//developer error msg
			$error_msg .= '||' . sprintf( __('List table views for "%s" route could not be setup. Check that you have the corresponding method, "%s" set up for defining list_table_views for this route.', 'event_espresso' ), $this->_req_action, '_set_list_table_views_' . $this->_req_action );
			throw new EE_Error( $error_msg );
		}


		$this->_set_list_table_view();
		$this->_set_list_table_object();

	}










	/**
	 * 		set current view for List Table
	*		@access public
	*		@return array
	*/
	protected function _set_list_table_view() {		
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		// looking at active items or dumpster diving ?
		if ( ! isset( $this->_req_data['status'] ) || ! array_key_exists( $this->_req_data['status'], $this->_views )) {
			$this->_view = isset( $this->_views['in_use'] ) ? 'in_use' : 'all';
		} else {
			$this->_view = sanitize_key( $this->_req_data['status'] );
		}
	}


	
	/**
	 * _set_list_table_object
	 * WP_List_Table objects need to be loaded fairly early so automatic stuff WP does is taken care of.
	 */
	protected function _set_list_table_object() {
		if ( isset($this->_route_config['list_table'] ) ) {
			$a = new ReflectionClass($this->_route_config['list_table']);
			$this->_list_table_object = $a->newInstance($this);
		}
	}



	/**
	 * 		get_list_table_view_RLs - get it? View RL ?? VU-RL???  URL ??
	*		@access public
	*		@return array
	*/
	public function get_list_table_view_RLs() {
	
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		$query_args = array();

		if ( empty( $this->_views )) {
			$this->_views = array();
		}

		// cycle thru views
		foreach ( $this->_views as $key => $view ) {
			// check for current view
			if ( $this->_view == $view['slug']) {
				$this->_views[ $key ]['class'] = 'current';
			} else {
				$this->_views[ $key ]['class'] = '';
			}
			
			$query_args['action'] = $this->_req_action;
			$query_args['_wpnonce'] = wp_create_nonce( $query_args['action'] . '_nonce' );
			$query_args['status'] = $view['slug'];
			$this->_views[ $key ]['url'] = add_query_arg( $query_args, $this->_admin_base_url );
		}
		
		return $this->_views;
	}




	/**
	 * _entries_per_page_dropdown
	 * generates a drop down box for selecting the number of visiable rows in an admin page list table
	 * @todo: Note: ideally this should be added to the screen options dropdown as that would be consistent with how WP does it.
	 * @access protected
	 * @param int $max_entries total number of rows in the table
	 * @return string
	*/
	protected function _entries_per_page_dropdown( $max_entries = FALSE ) {
		
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		$values = array( 10, 25, 50, 100 );
		$per_page = ( ! empty( $this->_req_data['per_page'] )) ? absint( $this->_req_data['per_page'] ) : 10;
		
		if ( $max_entries ) {
			$values[] = $max_entries;
			sort( $values );
		}
	
		$entries_per_page_dropdown = '
			<div id="entries-per-page-dv" class="alignleft actions">
				<label class="hide-if-no-js">
					Show
					<select id="entries-per-page-slct" name="entries-per-page-slct">';
		
		foreach ( $values as $value ) {
			if ( $value < $max_entries ) {			
				$selected = $value == $per_page ?  ' selected="' . $per_page . '"' : '';
				$entries_per_page_dropdown .= '
						<option value="'.$value.'"'.$selected.'>'.$value.'&nbsp;&nbsp;</option>';
			}
		}

		$selected = $max_entries == $per_page ?  ' selected="' . $per_page . '"' : '';
		$entries_per_page_dropdown .= '
						<option value="'.$max_entries.'"'.$selected.'>All&nbsp;&nbsp;</option>';
						
		$entries_per_page_dropdown .= '
					</select>
					entries
				</label>
				<input id="entries-per-page-btn" class="button-secondary" type="submit" value="Go" >
			</div>
		';			
		return $entries_per_page_dropdown;
	}




	/**
	 * 		_set_search_attributes
	*		@access 		protected
	*		@return 		void
	*/
	public function _set_search_attributes() {
		$this->_template_args['search']['btn_label'] = sprintf( __( 'Search %s', 'event_espresso' ), $this->page_label );
		$this->_template_args['search']['callback'] = 'search_' . $this->page_slug;
	}

	/*** END LIST TABLE METHODS **/
	/*****************************/





	/**
	 * 		_add_registered_metaboxes
	 * 		this loads any registered metaboxes via the 'metaboxes' index in the _page_config property array.
	 *
	 * @link http://codex.wordpress.org/Function_Reference/add_meta_box
	 * @access private
	 * @return void
	*/
	private function _add_registered_meta_boxes() {	
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

		//we only add meta boxes if the page_route calls for it
		if ( is_array($this->_route_config) && isset( $this->_route_config['metaboxes'] ) && is_array($this->_route_config['metaboxes']) ) {
		

			//this simply loops through the callbacks provided and checks if there is a corresponding callback registered by the child - if there is then we go ahead and process the metabox loader.
			foreach ( $this->_route_config['metaboxes'] as $metabox_callback ) {
				if ( call_user_func( array($this, &$metabox_callback) ) === FALSE ) {
					// user error msg
				$error_msg =  __( 'An error occured. The  requested metabox could not be found.', 'event_espresso' );
				// developer error msg
				$error_msg .= '||' . sprintf( __( 'The metabox with the string "%s" could not be called. Check that the spelling for method names and actions in the "_page_config[\'metaboxes\']" array are all correct.', 'event_espresso' ), $metabox_callback );
				throw new EE_Error( $error_msg );
				}
			}
		}
	}




	/**
	 * _add_screen_columns
	 * This will check the _page_config array and if there is "columns" key index indicated, we'll set the template as the dynamic column template and we'll setup the column options for the page.
	 *
	 * @access private
	 * @return void
	 */
	private function _add_screen_columns() {
		if ( is_array($this->_route_config) && isset( $this->_route_config['columns'] ) && is_array($this->_route_config['columns']) && count( $this->_route_config['columns'] == 2 ) ) {

			add_screen_option('layout_columns', array('max' => (int) $this->_route_config['columns'][0], 'default' => (int) $this->_route_config['columns'][1] ) );
			$this->_template_args['num_columns'] = $this->_route_config['columns'][0];
			$screen_id = $this->_current_screen->id;
			$screen_columns = (int) get_user_option("screen_layout_$screen_id");
			$total_columns = !empty($screen_columns) ? $screen_columns : $this->_route_config['columns'][1];
			$this->_template_args['current_screen_widget_class'] = 'columns-' . $total_columns;
			$this->_template_args['current_page'] = $this->_wp_page_slug;
			$this->_template_args['screen'] = $this->_current_screen;
			$this->_column_template_path = EE_CORE_ADMIN . 'admin_details_metabox_column_wrapper.template.php';

			//finally if we don't have has_metaboxes set in the route config let's make sure it IS set other wise the necessary hidden fields for this won't be loaded.
			$this->_route_config['has_metaboxes'] = TRUE;
		}
	}



	/**********************************/
	/** GLOBALLY AVAILABLE METABOXES **/

	/**
	 * In this section we put any globally available EE metaboxes for all EE Admin pages.  They are called by simply referencing the callback in the _page_config array property.  This way you can be very specific about what pages these get loaded on.
	 */

	private function _espresso_news_post_box() {
		function espresso_news_post_box() {
		?>
	  <div class="padding">
	  	<div class="infolinks">
	  		<?php
	  		echo '<h4 style="margin:0">' . __('From the Blog', 'event_espresso') . '</h4>';

	  		// Get RSS Feed(s)
	  		@wp_widget_rss_output('http://eventespresso.com/feed/', array('show_date'=> 0,'items'    => 5));

	  		/*echo '<h4 style="margin:0">' . __('From the Forums', 'event_espresso') . '</h4>';

	  		if ($caffeinated == true){
	  		@wp_widget_rss_output('http://eventespresso.com/forum/event-espresso-support/feed', array('show_date' => 0, 'items' => 4));
	  		}else{
	  		@wp_widget_rss_output('http://eventespresso.com/forum/event-espresso-public/feed', array('show_date' => 0, 'items' => 4));
	  		}*/
	  		?>
	  	</div>
	  </div>
		<?php
		}
		add_meta_box('espresso_news_post_box', __('New @ Event Espresso', 'event_espresso'), 'espresso_news_post_box', $this->_wp_page_slug, 'side');
	}


	private function _espresso_links_post_box() {
		function espresso_links_post_box() {
?>
	   <div class="padding">
	   	<ul class="infolinks">
	   		<li>
	   			<?php echo '<a href="http://eventespresso.com/wiki/installation/" target="_blank">'.__('Installation', 'event_espresso') . '</a>  &amp; <a href="http://eventespresso.com/wiki/setting-up-event-espresso/" target="_blank">' . __('Usage Guide').'</a>'; ?>
	   		</li>
	   		<li>
		   		<a href="http://eventespresso.com/wiki/put-custom-templates/" target="_blank">
	   				<?php _e('Template Customization', 'event_espresso'); ?>
	   			</a>
	   		</li>
	   		<li>
		   		<a href="http://eventespresso.com/support/forums/" target="_blank">
	   				<?php _e('Support Forums', 'event_espresso'); ?>
	   			</a>
	   		</li>

	   		<li>
		   		<a href="http://eventespresso.com/wiki/change-log/" target="_blank">
	   				<?php _e('Changelog', 'event_espresso'); ?>
	   			</a>
	   		</li>
	   		<li>
		   		<a href="http://eventespresso.com/about/" target="_blank">
	   				<?php _e('Meet the Team', 'event_espresso'); ?>
	   			</a>
	   		</li>
	   		<li>
		   		<a href="http://eventespresso.com/rich-features/sponsor-new-features/" target="_blank">
	   				<?php _e('Sponsor New Features!', 'event_espresso'); ?>
	   			</a>
	   		</li>
	   		<li>
	   			<?php echo '<a href="http://eventespresso.com/pricing/" target="_blank">'.__('Plugins', 'event_espresso'). '</a> &amp; <a href="http://eventespresso.com/add-ons/" target="_blank">' .__('Addons', 'event_espresso').'</a>'; ?><br />
	   			<br />
	   			<ol>
	   				<li>
		   				<a href="http://eventespresso.com/product/espresso-ticketing/" target="_blank">
		   					<?php _e('Ticket Scanning', 'event_espresso'); ?>
	   					</a>
	   				</li>
	   				<li>
		   				<a href="http://eventespresso.com/product/espresso-multiple/" target="_blank">
		   					<?php _e('Multiple Event Registration', 'event_espresso'); ?>
	   					</a>
	   				</li>
	   				<li>
		   				<a href="http://eventespresso.com/product/espresso-members/" target="_blank">
		   					<?php _e('WP User Integration', 'event_espresso'); ?>
	   					</a>
	   				</li>
	   				<li>
		   				<a href="http://eventespresso.com/product/espresso-seating/" target="_blank">
		   					<?php _e('Seating Chart', 'event_espresso'); ?>
	   					</a>
	   				</li>
	   			</ol>
	   		</li>
	   	</ul>
	</div>
		   <?php
		   global $caffeinated;
		   if ( ! $caffeinated ) {
		   	?>
   	<div id="submitdiv2" class="postbox " >
   		<h3>
   			<?php _e('Sponsors', 'event_espresso'); ?>
   		</h3>
   		<div class="inside">
   			<div class="padding">
   				<?php echo wp_remote_retrieve_body(wp_remote_get('http://ee-updates.s3.amazonaws.com/plugin-sponsors.html')); ?>
   			</div>
   		</div>
   	</div>
		   	<?php
			}			
		}
		add_meta_box('espresso_links_post_box', __('Helpful Plugin Links', 'event_espresso'), 'espresso_links_post_box', $this->_wp_page_slug, 'side');
	}



	private function _publish_post_box() {
		$meta_box_ref = 'espresso_' . $this->page_slug . '_editor_overview';
		add_meta_box( $meta_box_ref, __('Publish', 'event_espresso'), array( $this, 'editor_overview' ), $this->_current_screen_id, 'side', 'high' );

	}



	public function editor_overview() {
		//if we have extra content set let's add it in if not make sure its empty
		$this->_template_args['publish_box_extra_content'] = isset( $this->_template_args['publish_box_extra_content'] ) ? $this->_template_args['publish_box_extra_content'] : '';
		$template_path = EE_CORE_ADMIN . 'admin_details_publish_metabox.template.php';
		echo espresso_display_template( $template_path, $this->_template_args, TRUE );
	}


	/** end of globally available metaboxes section **/
	/*************************************************/

	



	/**
	 * Sets the _template_args arguments used by the _publish_post_box shortcut
	 * 
	 * @param	string	$name		key used for the action ID (i.e. event_id)
	 * @param	int		$id			id attached to the item published
	 * @param	string	$delete	page route callback for the delete action
	 * @param	string	$post_save_redirect_URL	custom URL to redirect to after Save & Close has been completed
	 * @param	boolean	$both_btns	whether to display BOTH the "Save & Close" and "Save" buttons or just the Save button
	 */	
	protected function _set_publish_post_box_vars( $name = NULL, $id = FALSE, $delete = FALSE, $save_close_redirect_URL = NULL, $both_btns = TRUE ) {

		if ( empty( $name ) || ! $id ) {
			//user error msg
			$user_msg = __('An error occured. A required form key or ID was not supplied.', 'event_espresso' );
			//developer error msg
			$dev_msg = $user_msg . "\n" . __('In order for the "Save" or "Save and Close" buttons to work, a key name for what it is being saved (ie: event_id), as well as some sort of id for the individual record is required.', 'event_espresso' );
			EE_Error::add_error( $user_msg . '||' . $dev_msg, __FILE__, __FUNCTION__, __LINE__ );			
		}
		// if Save & Close, use a custom redirect URL or default to the main page?
		$save_close_redirect_URL = ! empty( $save_close_redirect_URL ) ? $save_close_redirect_URL : $this->_admin_base_url;
		// create the Save & Close and Save buttons
		$this->_set_save_buttons( $both_btns, array(), array(), $save_close_redirect_URL );
		//if we have extra content set let's add it in if not make sure its empty
		$this->_template_args['publish_box_extra_content'] = isset( $this->_template_args['publish_box_extra_content'] ) ? $this->_template_args['publish_box_extra_content'] : '';


		if ( $delete ) {
			$delete_link_args = array( $name => $id );
			$delete = $this->_get_action_link_or_button( $delete, $type = 'delete', $delete_link_args, $class='submitdelete deletion');
		}
		
		$this->_template_args['publish_delete_link'] = $delete;
		// create hidden id field for what is being saved
		$hidden_field_arr[$name] = array(
			'type' => 'hidden',
			'value' => $id
			);
		$hf = $this->_generate_admin_form_fields($hidden_field_arr, 'array');
		// add hidden field
		$this->_template_args['publish_hidden_fields'] = $hf[$name]['field'];

	}




	/**
	 * 		displays an error message to ppl who have javascript disabled
	*		@access 		private
	*		@return 		string  
	*/
	private function _display_no_javascript_warning() {
		?>
		<noscript>
			<div id="no-js-message" class="error">
				<p style="font-size:1.3em;">
					<span style="color:red;"><?php _e( 'Warning!', 'event_espresso' ); ?></span>
					<?php _e( 'Javascript is currently turned off for your browser. Javascript must be enabled in order for all of the features on this page to function properly. Please turn your javascript back on.', 'event_espresso' ); ?>
				</p>
			</div>
		</noscript>
		<?php
	}








	/**
	 * 		displays espresso success and/or error notices
	*		@access 		private
	*		@return 		string
	*/
	private function _display_espresso_notices() {
		$notices = $this->_get_transient( TRUE );
		echo stripslashes($notices);
	}






	/**
	*		spinny things pacify the masses
	*		@access private
	*		@return string
	*/		
	private function _add_admin_page_ajax_loading_img() {
		?>
			<div id="espresso-admin-page-ajax-loading" class="hidden">
				<img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL; ?>images/ajax-loader-grey.gif" /><span><?php _e('loading...', 'event_espresso'); ?>'</span>
			</div>
		<?php
	}





	/**
	*		add admin page overlay for modal boxes
	*		@access private
	*		@return string
	*/		
	private function _add_admin_page_overlay() {
		?>
		<div id="espresso-admin-page-overlay-dv" class=""></div>
		<?php
	}

	




	/**
	 * facade for add_meta_box
	 * @param string  $action        where the metabox get's displayed
	 * @param string  $title         Title of Metabox (output in metabox header)		
	 * @param string  $callback      If not empty and $create_fun is set to false then we'll use a custom callback instead of the one created in here.
	 * @param array  $callback_args an array of args supplied for the metabox
	 * @param string  $column        what metabox column
	 * @param string  $priority      give this metabox a priority (using accepted priorities for wp meta boxes)
	 * @param boolean $create_func   default is true.  Basically we can say we don't WANT to have the runtime function created but just set our own callback for wp's add_meta_box.
	 */
	public function _add_admin_page_meta_box( $action, $title, $callback, $callback_args, $column = 'normal', $priority = 'high', $create_func = true ) {	
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, $callback );

		//if we have empty callback args and we want to automatically create the metabox callback then we need to make sure the callback args are generated.
		if ( empty( $callback_args ) && $create_func ) {
			$callback_args = array(
				'template_path' => $this->_template_path,
				'template_args' => $this->_template_args,
				);
		}

		//if $create_func is true (default) then we automatically create the function for displaying the actual meta box.  If false then we take the $callback reference passed through and use it instead (so callers can define their own callback function/method if they wish)
		$call_back_func = $create_func ? create_function('$post, $metabox', 'do_action( "action_hook_espresso_log", __FILE__, __FUNCTION__, ""); echo espresso_display_template( $metabox["args"]["template_path"], $metabox["args"]["template_args"], TRUE );') : $callback;

		add_meta_box( str_replace( '_', '-', $action ) . '-mbox', $title, $call_back_func, $this->_wp_page_slug, $column, $priority, $callback_args );
	}





	/**
	 * generates HTML wrapper for and admin details page that contains metaboxes in columns
	 * @return [type] [description]
	 */
	public function display_admin_page_with_metabox_columns() {
		$this->_template_args['post_body_content'] = $this->_template_args['admin_page_content'];
		$this->_template_args['admin_page_content'] = espresso_display_template( $this->_column_template_path, $this->_template_args, TRUE);

		//the final wrapper
		$this->admin_page_wrapper();
	}







	/**
	*		generates  HTML wrapper for an admin details page
	*		@access public
	*		@return void
	*/		
	public function display_admin_page_with_sidebar() {	

		$this->_display_admin_page(TRUE);
	}




	/**
	*		generates  HTML wrapper for an admin details page (except no sidebar)
	*		@access public
	*		@return void
	*/
	public function display_admin_page_with_no_sidebar() {
		$this->_display_admin_page();
	}


	/**
	 * display_admin_page
	 * contains the code for actually displaying an admin page
	 *
	 * @access private
	 * @param  boolean $sidebar true with sidebar, false without
	 * @return html           admin_page
	 */
	private function _display_admin_page($sidebar = false) {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

		// set current wp page slug - looks like: event-espresso_page_event_categories
		$this->_template_args['current_page'] = $this->_wp_page_slug;
		$template_path = $sidebar ?  EE_CORE_ADMIN . 'admin_details_wrapper.template.php' : EE_CORE_ADMIN . 'admin_details_wrapper_no_sidebar.template.php';

		if ( defined('DOING_AJAX' ) )
			$template_path = EE_CORE_ADMIN . 'admin_details_wrapper_no_sidebar_ajax.template.php';

		$template_path = !empty($this->_column_template_path) ? $this->_column_template_path : $template_path;

		$this->_template_args['post_body_content'] = isset( $this->_template_args['admin_page_content'] ) ? $this->_template_args['admin_page_content'] : '';
		$this->_template_args['before_admin_page_content'] = isset($this->_template_args['before_admin_page_content']) ? $this->_template_args['before_admin_page_content'] : '';
		$this->_template_args['after_admin_page_content'] = isset($this->_template_args['after_admin_page_content']) ? $this->_template_args['after_admin_page_content'] : '';
		$this->_template_args['admin_page_content'] = espresso_display_template( $template_path, $this->_template_args, TRUE );


		// the final template wrapper
		$this->admin_page_wrapper();
	}


	/**
	 * display_admin_list_table_page_with_sidebar
	 * generates HTML wrapper for an admin_page with list_table
	 *
	 * @access public
	 * @return html 
	 */
	public function display_admin_list_table_page_with_sidebar() {
		$this->_display_admin_list_table_page(TRUE);
	}

	/**
	 * display_admin_list_table_page_with_no_sidebar
	 * generates HTML wrapper for an admin_page with list_table (but with no sidebar)
	 *
	 * @access public
	 * @return html 
	 */
	public function display_admin_list_table_page_with_no_sidebar() {
		$this->_display_admin_list_table_page();
	}



	/**
	 * generates html wrapper for an admin_list_table page
	 * @access private
	 * @param boolean $sidebar whether to display with sidebar or not.	
	 * @return html
	 */
	private function _display_admin_list_table_page( $sidebar = false ) {
		$this->_template_args['current_page'] = $this->_wp_page_slug;
		$template_path = EE_CORE_ADMIN . 'admin_list_wrapper.template.php';

		$this->_template_args['table_url'] = defined( 'DOING_AJAX') ? add_query_arg( array( 'noheader' => 'true'), $this->_admin_base_url ) : $this->_admin_base_url;
		$this->_template_args['list_table'] = $this->_list_table_object;
		
		$ajax_sorting_callback = $this->_list_table_object->get_ajax_sorting_callback();	
		if( ! empty( $ajax_sorting_callback )) {
			$sortable_list_table_form_fields = wp_nonce_field( $ajax_sorting_callback . '_nonce', $ajax_sorting_callback . '_nonce', FALSE, FALSE );
//			$reorder_action = 'espresso_' . $ajax_sorting_callback . '_nonce';
//			$sortable_list_table_form_fields = wp_nonce_field( $reorder_action, 'ajax_table_sort_nonce', FALSE, FALSE );
			$sortable_list_table_form_fields .= '<input type="hidden" id="ajax_table_sort_page" name="ajax_table_sort_page" value="' . $this->page_slug .'" />';
			$sortable_list_table_form_fields .= '<input type="hidden" id="ajax_table_sort_action" name="ajax_table_sort_action" value="' . $ajax_sorting_callback . '" />';
		} else {
			$sortable_list_table_form_fields = '';
		}

		$this->_template_args['sortable_list_table_form_fields'] = $sortable_list_table_form_fields;

		$this->_template_args['admin_page_content'] = espresso_display_template( $template_path, $this->_template_args, TRUE );

		// the final template wrapper
		if ( $sidebar )
			$this->display_admin_page_with_sidebar();
		else
			$this->display_admin_page_with_no_sidebar();
	}




	/**
	 * this is used whenever we're DOING_AJAX to return a formatted json array that our calling javascript can expect
	 *
	 * The returned json object is created from an array in the following format:
	 * array(
	 * 	'error' => FALSE, //(default FALSE), contains any errors and/or exceptions (exceptions return json early),
	 * 	'success' => FALSE, //(default FALSE) - contains any special success message.
	 * 	'notices' => '', // - contains any EE_Error formatted notices
	 * 	'content' => 'string can be html', //this is a string of formatted content (can be html)
	 * 	'data' => array() //this can be any key/value pairs that a method returns for later json parsing by the js. We're also going to include the template args with every package (so js can pick out any specific template args that might be included in here)
	 * )
	 *
	 * The json object is populated by whatever is set in the $_template_args property.
	 *
	 * @return json object 
	 */
	protected function _return_json() {

		//make sure any EE_Error notices have been handled.
		$this->_process_notices();


		$data = isset( $this->_template_args['data'] ) ? $this->_template_args['data'] : array();
		unset($this->_template_args['data']);
		$json = array(
			'error' => isset( $this->_template_args['error'] ) ? $this->_template_args['error'] : FALSE,
			'success' => isset( $this->_template_args['success'] ) ? $this->_template_args['success'] : FALSE,
			'notices' => EE_Error::get_notices(),
			'content' => utf8_encode($this->_template_args['admin_page_content']),
			'data' => array_merge( $data, array('template_args' => $this->_template_args ) )
			);


		// make sure there are no php errors or headers_sent.  Then we can set correct json header.
		if ( NULL === error_get_last() || ! headers_sent() )
			header('Content-Type: application/json');

		echo json_encode( $json );
		exit();
	}




	/**
	 * This provides a way for child hook classes to send along themselves by reference so methods/properties within them can be accessed by EE_Admin_child pages. This is assigned to the $_hook_obj property.
	 * 
	 * @param EE_Admin_Hooks object $hook_obj This will be the object for the EE_Admin_Hooks child
	 *
	 * @access public
	 * @return void
	 */
	public function set_hook_object( EE_Admin_Hooks $hook_obj ) {
		$this->_hook_obj = $hook_obj;
	}





	/**
	*		generates  HTML wrapper with Tabbed nav for an admin page
	*		@access public
	*		@return void
	*/		
	public function admin_page_wrapper() {

		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');	

		//setup nav-tab html
		//let's generate the html using the EE_Tabbed_Content helper.  We do this here so that it's possible for child classes to add in nav tabs dynamically at the last minute (rather than setting in the page_routes array)
		require_once EVENT_ESPRESSO_PLUGINFULLPATH . 'helpers/EE_Tabbed_Content.helper.php' ;
		$this->_nav_tabs = EE_Tabbed_Content::display_admin_nav_tabs($this->_nav_tabs);

		$this->_template_args['nav_tabs'] = $this->_nav_tabs;
		$this->_template_args['admin_page_title'] = $this->_admin_page_title;

		$this->_template_args['before_admin_page_content'] = apply_filters( 'filter_hook_espresso_before_admin_page_content' . $this->_current_page . $this->_current_view, isset( $this->_template_args['before_admin_page_content'] ) ? $this->_template_args['before_admin_page_content'] : '');
		$this->_template_args['after_admin_page_content'] = apply_filters( 'filter_hook_espresso_after_admin_page_content' . $this->_current_page . $this->_current_view, isset( $this->_template_args['after_admin_page_content'] ) ? $this->_template_args['after_admin_page_content'] : '');

		$this->_template_args['after_admin_page_content'] .= $this->_set_help_popup_content();

		
		
		// load settings page wrapper template
		$template_path = !defined( 'DOING_AJAX' ) ? EE_CORE_ADMIN . 'admin_wrapper.template.php' : EE_CORE_ADMIN . 'admin_wrapper_ajax.template.php';


		if ( defined( 'DOING_AJAX' ) ) {
			$this->_template_args['admin_page_content'] = espresso_display_template( $template_path, $this->_template_args, TRUE );

			$this->_return_json();
		} else {
			espresso_display_template( $template_path, $this->_template_args );
		}

	}






	/**
	*		sort nav tabs
	*		@access public
	*		@return void
	*/		
	private function _sort_nav_tabs( $a, $b ) {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		if ($a['order'] == $b['order']) {
	        return 0;
	    }
	    return ($a['order'] < $b['order']) ? -1 : 1;
	}





	/**
	 * 	generates HTML for the forms used on admin pages
	 * 	@access protected
	 * 	@param	array $input_vars - array of input field details
	 * 	@param	array $id - used for defining unique identifiers for the form.
	 * 	@param string $generator (options are 'string' or 'array', basically use this to indicate which generator to use)
	 * 	@return string
	 * 	@uses EE_Form_Fields::get_form_fields (/helper/EE_Form_Fields.helper.php)
	 * 	@uses EE_Form_Fields::get_form_fields_array (/helper/EE_Form_Fields.helper.php)
	 */
	protected function _generate_admin_form_fields( $input_vars = array(), $generator = 'string', $id = FALSE ) {
		require_once EVENT_ESPRESSO_PLUGINFULLPATH . '/helpers/EE_Form_Fields.helper.php';
		$content = $generator == 'string' ? EE_Form_Fields::get_form_fields($input_vars, $id) : EE_Form_Fields::get_form_fields_array($input_vars);
		return $content;
	}

	







	/**
	 * generates the "Save" and "Save & Close" buttons for edit forms
	 *
	 * @access protected
	 * @param bool $both if true then both buttons will be generated.  If false then just the "Save & Close" button.
	 * @param array $text if included, generator will use the given text for the buttons ( array([0] => 'Save', [1] => 'save & close')
	 * @param array $actions if included allows us to set the actions that each button will carry out (i.e. via the "name" value in the button).  We can also use this to just dump default actions by submitting some other value.
	 * @param bool|string|null $referrer if false then we just do the default action on save and close.  Other wise it will use the $referrer string. IF null, then we don't do ANYTHING on save and close (normal form handling).
	 */
	protected function _set_save_buttons($both = TRUE, $text = array(), $actions = array(), $referrer = NULL ) {
		//make sure $text and $actions are in an array
		$text = (array) $text;
		$actions = (array) $actions;
		$referrer_url = empty($referrer) ? '' : $referrer;
		$referrer_url = !$referrer ? '<input type="hidden" id="save_and_close_referrer" name="save_and_close_referrer" value="' . $_SERVER['REQUEST_URI'] .'" />' : '<input type="hidden" id="save_and_close_referrer" name="save_and_close_referrer" value="' . $referrer .'" />';

		$button_text = !empty($text) ? $text : array( __('Save', 'event_espresso'), __('Save and Close', 'event_espresso') );
		$default_names = array( 'save', 'save_and_close' );

		//add in a hidden index for the current page (so save and close redirects properly)
		$this->_template_args['save_buttons'] = $referrer_url;

		foreach ( $button_text as $key => $button ) {
			$ref = $default_names[$key];
			$id = $this->_current_view . '_' . $ref;
			$name = !empty($actions) ? $actions[$key] : $ref;
			$this->_template_args['save_buttons'] .= '<input type="submit" class="button-primary ' . $ref . '" value="' . $button . '" name="' . $name . '" id="' . $id . '" />';
			if ( !$both ) break;
		}

	}



	/**
	 * set form open and close tags on add/edit pages.
	 *
	 * @access protected
	 * @param string $route the route you want the form to direct to
	 * @param string $additional_hidden_fields any additional hidden fields required in the form header
	 * @return void
	 */
	protected function _set_add_edit_form_tags( $route = FALSE, $additional_hidden_fields = array() ) {
		
		if ( ! $route ) {
			$user_msg = __('An error occurred. No action was set for this page\'s form.', 'event_espresso');
			$dev_msg = $user_msg . "\n" . sprintf( __('The $route argument is required for the %s->%s method.', 'event_espresso'), __FUNCTION__, __CLASS__ );
			EE_Error::add_error( $user_msg . '||' . $dev_msg, __FILE__, __FUNCTION__, __LINE__ );			
		}
		// open form
		$this->_template_args['before_admin_page_content'] = '<form name="form" method="post" action="' . $this->_admin_base_url . '" id="' . $route . '_event_form" >';
		// add nonce
		$nonce = wp_nonce_field( $route . '_nonce', $route . '_nonce', FALSE, FALSE );
//		$nonce = wp_nonce_field( $route . '_nonce', '_wpnonce', FALSE, FALSE );
		$this->_template_args['before_admin_page_content'] .= "\n\t" . $nonce;
		// add REQUIRED form action
		$hidden_fields = array( 
				'action' => array( 'type' => 'hidden', 'value' => $route ),
			);
		// merge arrays
		$hidden_fields = is_array( $additional_hidden_fields) ? array_merge( $hidden_fields, $additional_hidden_fields ) : $hidden_fields;
		// generate form fields
		$form_fields = $this->_generate_admin_form_fields( $hidden_fields, 'array' );
		// add fields to form
		foreach ( $form_fields as $field_name => $form_field ) {
			$this->_template_args['before_admin_page_content'] .= "\n\t" . $form_field['field'];
		}	
				
		// close form
		$this->_template_args['after_admin_page_content'] = '</form>';
		
	}



	/**
	 * 	_redirect_after_action
	 *	@param int 		$success 	- whether success was for two or more records, or just one, or none
	 *	@param string 	$what 		- what the action was performed on
	 *	@param string 	$action_desc 	- what was done ie: updated, deleted, etc
	 *	@param int 		$query_args		- an array of query_args to be added to the URL to redirect to after the admin action is completed
	 *	@access protected
	 *	@return void
	 */
	protected function _redirect_after_action( $success = FALSE, $what = 'item', $action_desc = 'processed', $query_args = array() ) {

		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );


		$redirect_url = $this->_admin_base_url;

		// how many records affected ? more than one record ? or just one ?
		if ( $success == 2 ) {
			// overwrite default success messages
			EE_Error::overwrite_success();
			// set plural msg
			EE_Error::add_success( sprintf( __('The %s have been successfully %s.', 'event_espresso'), $what, $action_desc ), __FILE__, __FUNCTION__, __LINE__);
		} else if ( $success == 1 ) {
			// overwrite default success messages
			EE_Error::overwrite_success();
			// set singular msg
			EE_Error::add_success( sprintf( __('The %s has been successfully %s.', 'event_espresso'), $what, $action_desc), __FILE__, __FUNCTION__, __LINE__ );
		}

		// check that $query_args isn't something crazy
		if ( ! is_array( $query_args )) {
			$query_args = array();
		}

		//calculate where we're going (if we have a "save and close" button pushed)
		if ( isset($this->_req_data['save_and_close'] ) && isset($this->_req_data['save_and_close_referrer'] ) ) {
			// even though we have the save_and_close referrer, we need to parse the url for the action in order to generate a nonce
			$parsed_url = parse_url( $this->_req_data['save_and_close_referrer'] );
			// regenerate query args array from refferer URL
			parse_str( $parsed_url['query'], $query_args );
			// correct page and action will be in the query args now
			$redirect_url = admin_url( 'admin.php' );
		}

		$this->_process_notices($query_args);
		
		
		// generate redirect url

		// if redirecting to anything other than the main page, add a nonce
		if ( isset( $query_args['action'] )) {
			// manually generate wp_nonce and merge that with the query vars becuz the wp_nonce_url function wrecks havoc on some vars
			$query_args['_wpnonce'] = wp_create_nonce( $query_args['action'] . '_nonce' );
		} 

		//we're adding some hooks and filters in here for processing any things just before redirects (example: an admin page has done an insert or update and we want to run something after that).
		$classname = get_class($this);
		do_action( 'action_hook_espresso_redirect_' . $classname . $this->_req_action, $query_args );

		$redirect_url = apply_filters( 'filter_hook_espresso_redirect_' . $classname . $this->_req_action, self::add_query_args_and_nonce( $query_args, $redirect_url ), $query_args ); 

		// check if we're doing ajax.  If we are then lets just return the results and js can handle how it wants.
		if ( defined('DOING_AJAX' ) ) {
			$default_data = array(
				'close' => TRUE,
				'redirect_url' => $redirect_url,
				'where' => 'main',
				'what' => 'append',
				);

			$this->_template_args['success'] = $success;
			$this->_template_args['data'] = !empty($this->_template_args['data']) ? array_merge($default_data, $this->_template_args['data'] ): $default_data;
			$this->_return_json();
		}

		wp_safe_redirect( $redirect_url );	
		exit();		
	}




	/**
	 * process any notices before redirecting (or returning ajax request)
	 * This method sets the $this->_template_args['notices'] attribute;
	 * 
	 * @param  array  $query_args any query args that need to be used for notice transient ('action')
	 * @return void
	 */
	protected function _process_notices( $query_args = array() ) {
		
		$this->_template_args['notices'] = EE_Error::get_notices();

		//IF this isn't ajax we need to create a transient for the notices using the route.
		if ( ! defined( 'DOING_AJAX' ) ) {
			$route = isset( $query_args['action'] ) ? $query_args['action'] : 'default';
			$this->_add_transient( $route, $this->_template_args['notices'], TRUE );
		}
	}


	

	/**
	 * _get_action_link_or_button
	 * returns the button html for adding, editing, or deleting an item (depending on given type) 
	 * 
	 * @access  protected
	 *
	 * @param string $action use this to indicate which action the url is generated with.
	 * @param string $type accepted strings must be defined in the $_labels['button'] array(as the key) property.
	 * @param array $extra_request if the button requires extra params you can include them in $key=>$value pairs.  
	 * @param string $class Use this to give the class for the button. Defaults to 'button-primary'	
	 * @param string $base_url If this is not provided the _admin_base_url will be used as the default for the button base_url.  Otherwise this value will be used.	
	 * @return string html for button
	 */
	protected function _get_action_link_or_button($action, $type = 'add', $extra_request = array(), $class = 'button-primary', $base_url = FALSE) {
		//first let's validate the action (if $base_url is FALSE otherwise validation will happen further along)
		if ( !isset($this->_page_routes[$action]) && !$base_url )
			throw new EE_Error( sprintf( __('There is no page route for given action for the button.  This action was given: %s', 'event_espresso'), $action) );

		if ( !isset( $this->_labels['buttons'][$type] ) )
			throw new EE_Error( sprintf( __('There is no label for the given button type (%s). Labels are set in the <code>_page_config</code> property.', 'event_espresso'), $type) );

		$_base_url = !$base_url ? $this->_admin_base_url : $base_url;

		$query_args = array(
			'action' => $action );

		//merge extra_request args but make sure our original action takes precedence and doesn't get overwritten.
		if ( !empty($extra_request) )
			$query_args = array_merge( $extra_request, $query_args );

		$url = self::add_query_args_and_nonce( $query_args, $_base_url );

		$button = '<a href="' . $url . '" class="' . $class . '">' . $this->_labels['buttons'][$type] . '</a>';

		return $button;
	}





	/**
	 * _per_page_screen_option
	 * Utility function for adding in a per_page_option in the screen_options_dropdown.
	 * @return void
	 */
	protected function _per_page_screen_option() {
		$option = 'per_page';
		$args = array(
			'label' => $this->_admin_page_title,
			'default' => 10,
			'option' => $this->_current_page . '_' . $this->_current_view . '_per_page'
			);
		add_screen_option( $option, $args );
	}



	
	/**
	 * set_per_page_screen_option
	 * All this does is make sure that WordPress saves any per_page screen options (if set) for the current page.
	 * we have to do this rather than running inside the 'set-screen-options' hook because it runs earlier than admin_menu.
	 * 
	 * @access private
	 * @return void
	 */
	private function _set_per_page_screen_options() {
		if ( isset($_POST['wp_screen_options']) && is_array($_POST['wp_screen_options']) ) {
			check_admin_referer( 'screen-options-nonce', 'screenoptionnonce' );

			if ( !$user = wp_get_current_user() )
			return;
			$option = $_POST['wp_screen_options']['option'];
			$value = $_POST['wp_screen_options']['value'];

			if ( $option != sanitize_key( $option ) )
				return;

			$map_option = $option;

			$option = str_replace('-', '_', $option);

			switch ( $map_option ) {
				case $this->_current_page . '_' .  $this->_current_view . '_per_page':
					$value = (int) $value;
					if ( $value < 1 || $value > 999 )
						return;
					break;
				default:
					$value = apply_filters('filter_hook_espresso_set-screen-option', false, $option, $value);
					if ( false === $value )
						return;
					break;
			}

			update_user_meta($user->ID, $option, $value);
			wp_safe_redirect( remove_query_arg( array('pagenum', 'apage', 'paged'), wp_get_referer() ) );
			exit;
		}
	}




	/**
	 * This makes available the WP transient system for temporarily moving data between routes
	 *
	 * @access protected
	 * @param route $route the route that should receive the transient
	 * @param data $data  the data that gets sent
	 * @param bool $notices If this is for notices then we use this to indicate so, otherwise its just a normal route transient.
	 */
	protected function _add_transient( $route, $data, $notices = FALSE ) {
		$user_id = get_current_user_id();
		
		$this->_verify_route($route);


		//now let's set the string for what kind of transient we're setting
		$transient = $notices ? 'rte_n_tx_' . $route . '_' . $user_id : 'rte_tx_' . $route . '_' . $user_id;
		$data = $notices ? array( 'notices' => $data ) : $data;
		//is there already a transient for this route?  If there is then let's ADD to that transient
		if ( $existing = get_transient( $transient ) ) {
			$data = array_merge( (array) $data, (array) $existing );
		}

		set_transient( $transient, $data, 5 );
	}
	



	/**
	 * this retrieves the temporary transient that has been set for moving data between routes.
	 * @param bool $notices true we get notices transient. False we just return normal route transient
	 * @return mixed data
	 */
	protected function _get_transient( $notices = FALSE, $route = FALSE ) {
		$user_id = get_current_user_id();
		$route = !$route ? $this->_req_action : $route;
		$transient = $notices ? 'rte_n_tx_' . $route . '_' . $user_id : 'rte_tx_' . $route . '_' . $user_id;
		$data = get_transient( $transient );
		return $notices ? $data['notices'] : $data;
	}





	/**
	 * get_view
	 *
	 * @access public
	 * @return string content of _view property
	 */
	public function get_view() {
		return $this->_view;
	}




	/**
	 * get_current_page
	 *
	 * @access public
	 * @return string _current_page property value
	 */
	public function get_current_page() {
		return $this->_current_page;
	}




	/**
	 * get_current_view
	 *
	 * @access public
	 * @return string _current_view property value
	 */
	public function get_current_view() {
		return $this->_current_view;
	}



	/**
	 * get_current_screen
	 *
	 * @access public
	 * @return object The current WP_Screen object
	 */
	public function get_current_screen() {
		return $this->_current_screen;
	}


	/**
	 * get_current_page_view_url
	 *
	 * @access public
	 * @return string This returns the url for the current_page_view.
	 */
	public function get_current_page_view_url() {
		return $this->_current_page_view_url;
	}


	

	/**
	 * just returns the _req_data property
	 * @return array
	 */
	public function get_request_data() {
		return $this->_req_data;
	}





	/**
	 * correct variable display
	 *
	 * @access protected
	 * @param array $var
	 * @return string
	 */
	protected function _display_nice( $var ) {
		return htmlentities( stripslashes( $var ), ENT_QUOTES, 'UTF-8' );
	}



	/**
	 * updates events_organization_settings user_meta
	 *
	 * @access 	protected
	 * @param string $tab
	 * @param array $data
	 * @param string $file	file where error occured
	 * @param string $func function  where error occured
	 * @param string $line	line no where error occured
	 * @return boolean
	 */
	protected function _update_organization_settings( $tab, $data, $file = '', $func = '', $line = '' ) {
		global $espresso_wp_user;
		// grab existing org options
		$org_options = get_user_meta( $espresso_wp_user, 'events_organization_settings', TRUE );
		// make sure everything is in arrays
		$org_options = is_array( $org_options ) ? $org_options : array( $org_options );
		$data = is_array( $data ) ? $data : array( $data );
		foreach ( $data as $key => $value ) {
			$data[ $key ] = is_array( $value ) ? $value : addslashes( html_entity_decode( $value, ENT_QUOTES, 'UTF-8' ));
		}
		// overwrite existing org options with new data
		$data = array_merge( $org_options, $data );
		// and save it
		if ( update_user_meta( $espresso_wp_user, 'events_organization_settings', $data )) {
			EE_Error::add_success( sprintf( __('%s have been successfully updated.', 'event_espresso'), $tab ));
			return TRUE;
		} else {
			$user_msg = sprintf( __('An error occured. The %s were not updated.', 'event_espresso'), $tab );
			EE_Error::add_error( $user_msg, $file, $func, $line  );
			return FALSE;
		}			

	}
	
	/**
	 * Returns an array to be used for EE_FOrm_Fields.helper.php's select_input as the $values argument.
	 * @return array
	 */
	function get_yes_no_values(){
		return $this->_yes_no_values;
	}









	private function _verify_default_pages_exist() {
				
		if ( has_action('admin_notices', 'espresso_page_problems')) {
			$this->_create_default_pages(); 
		}


	}





	//This function installs the required pages
	private function _create_default_pages() {

		//echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		global $wpdb, $org_options, $espresso_wp_user;
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		
		$required_pages = array( 
				'event_page_id' 	=> __( 'Event Registration', 'event_espresso' ), 
				'return_url' 			=> __( 'Thank You', 'event_espresso' ), 
				'cancel_return'	=> __( 'Registration Cancelled', 'event_espresso' ), 
				'notify_url'			=> __( 'Transactions', 'event_espresso' ) 
			);
					
		$existing_pages = get_pages();
		//printr( $existing_pages, '$existing_pages  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		foreach ( $existing_pages as $page ) {
			// does page already exist ?
			if ( in_array( $page->post_title, $required_pages )) {
				//make sure it's ID is set properlly, but first we'll need the right org_option key
				$key = array_search( $page->post_title, $required_pages );
				$org_options[ $key ] = $page->ID;
				// now remove it from required pages list since we already have it
				unset( $required_pages[ $key ] );
			} 
		}
		
		$event_reg = __( 'Event Registration', 'event_espresso' );
		$thank_you = __( 'Thank You', 'event_espresso' );
		$reg_cancelled = __( 'Registration Cancelled', 'event_espresso' );
		$transactions = __( 'Transactions', 'event_espresso' );
		
		
		$updated_flag = false;
		$page_ids = get_all_page_ids();
		foreach ( $required_pages as $new_page_title ) {

			// Create post object
			$my_post = array();
			$my_post['post_title'] = $new_page_title;
			$my_post['post_status'] = 'publish';
			$my_post['post_type'] = 'page';
			$my_post['comment_status'] = 'closed';
			
			//echo '<h4>$new_page_title : ' . $new_page_title . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';

			switch ( $new_page_title ) {
			
				case $event_reg :
					//if ( empty( $org_options['event_page_id'] ) || ! in_array( $org_options['event_page_id'], $page_ids )) {
						$my_post['post_content'] = '[ESPRESSO_EVENTS]';
						$event_page_id = wp_insert_post($my_post);
						$org_options['event_page_id'] = $event_page_id;
						$updated_flag = true;
					//}
					break;
					
				case $thank_you :
					//if ( empty( $org_options['return_url'] ) || ! in_array( $org_options['return_url'], $page_ids )) {
						$my_post['post_content'] = '[ESPRESSO_PAYMENTS]';
						$return_url = wp_insert_post($my_post);
						$org_options['return_url'] = $return_url;
						$updated_flag = true;
					//}
					break;
					
				case $reg_cancelled :
					//if ( empty( $org_options['cancel_return'] ) || ! in_array( $org_options['cancel_return'], $page_ids )) {
						$my_post['post_content'] = 'You have cancelled your registration.<br />[ESPRESSO_CANCELLED]';
						$cancel_return = wp_insert_post($my_post);
						$org_options['cancel_return'] = $cancel_return;
						$updated_flag = true;
					//}
					break;
					
				case $transactions :
					//if ( empty( $org_options['notify_url'] ) || ! in_array( $org_options['notify_url'], $page_ids )) {
						$my_post['post_content'] = '[ESPRESSO_TXN_PAGE]';
						$notify_url = wp_insert_post($my_post);
						$org_options['notify_url'] = $notify_url;
						$updated_flag = true;
					//}
					break;
			}
		}
		
		update_user_meta( $espresso_wp_user, 'events_organization_settings', $org_options );
		if ( $updated_flag ) {
			require_once( EE_CORE . 'admin/admin_helper.php' );
			add_action('admin_notices', 'espresso_updated_pages');
		}
			
	}



}

	
// end of file:  includes/core/admin/EE_Admin_Page.core.php
