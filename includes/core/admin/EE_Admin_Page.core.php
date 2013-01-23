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

	//for holding incoming request data
	protected $_req_data;





	/**
	 * 		@Constructor
	 * 		@access public
	 * 		@return void
	 */
	public function __construct() {

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
	 *     		'has_metaboxes' => true //this boolean flag can simply be used to indicate if the route will have metaboxes.  Typically this is used if the 'metaboxes' index is not used because metaboxes are added later.  We just use this flag to make sure the necessary js gets enqueued on page load.
	 *     		'columns' => array(4, 2) //this key triggers the setup of a page that uses columns (metaboxes).  The array indicates the max number of columns (4) and the default number of columns on page load (2).  There is an option in the "screen_options" dropdown that is setup so users can pick what columns they want to display.
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
	 * _add_help_tabs
	 * Child classes can add any help_tabs within this method using built-in WP functions/methods for doing so.
	 * Note child classes can also define _add_help_tabs_($this->_current_view) to limit screen options to a particular view.
	 * @link http://codex.wordpress.org/Function_Reference/add_help_tab
	 *
	 * @abstract
	 * @access protected
	 * @return void
	 */
	abstract protected function _add_help_tabs();




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


		//first verify if we need to load anything...
		$this->_current_page = !empty( $_GET['page'] ) ? sanitize_key( $_GET['page'] ) : FALSE;

		if ( !$this->_current_page && !defined( 'DOING_AJAX') ) return FALSE;

		//next let's just check user_access and kill if no access
		$this->_check_user_access();

		//set the _req_data property.
		$this->_req_data = array_merge( $_GET, $_POST );

		
		// becuz WP List tables have two duplicate select inputs for choosing bulk actions, we need to copy the action from the second to the first
		if ( isset( $this->_req_data['action2'] ) && $this->_req_data['action'] == -1 ) {
			$this->_req_data['action'] = ! empty( $this->_req_data['action2'] ) && $this->_req_data['action2'] != -1 ? $this->_req_data['action2'] : $this->_req_data['action'];
		}
		// then set blank or -1 action values to 'default'
		$this->_req_action = isset( $this->_req_data['action'] ) && ! empty( $this->_req_data['action'] ) && $this->_req_data['action'] != -1 ? sanitize_key( $this->_req_data['action'] ) : 'default';
		$this->_current_view = $this->_req_action;
		$this->_req_nonce = $this->_req_action . '_nonce';
		$this->_define_page_props();

		$this->_current_page_view_url = add_query_arg( array( 'page' => $this->_current_page, 'action' => $this->_current_view ),  $this->_admin_base_url );

		//set page configs
		$this->_set_page_routes();
		$this->_set_page_config();

		//next verify routes
		$this->_verify_routes();



		if ( $this->_is_UI_request ) {
			
			//admin_init stuff - global, all views for this page class, specific view
			add_action( 'admin_init', array( $this, 'admin_init_global' ), 5 );
			add_action( 'admin_init', array( $this, 'admin_init' ), 10 );
			if ( method_exists( $this, 'admin_init_' . $this->_current_view ) )
				add_action( 'admin_init', array( $this, 'admin_init_' . $this->_current_view ), 15 );
		} else {
			//hijack regular WP loading and route admin request immediately
			if ( current_user_can( 'manage_options' ) )
				@ini_set( 'memory_limit', apply_filters( 'admin_memory_limit', WP_MAX_MEMORY_LIMIT ) );
			$this->route_admin_request();
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

		//init template args
		$this->_template_args = array(
			'admin_page_header' => '',
			'admin_page_content' => '',
			'post_body_content' => ''
		);
			
		
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

		//add help tab(s) - global, page child class, and view specific
		$this->_add_help_tabs();
		$this->_add_global_help_tabs();
		if ( method_exists( $this, '_add_help_tabs_' . $this->_current_view ) )
			call_user_func( array( $this, '_add_help_tabs_' . $this->_current_view ) );

		//add feature_pointers - global, page child class, and view specific
		$this->_add_feature_pointers();
		$this->_add_global_feature_pointers();
		if ( method_exists( $this, '_add_help_tabs_' . $this->_current_view ) )
			call_user_func( array( $this, '_add_help_tabs_' . $this->_current_view ) );

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
	}

	



	/**
	 * _set_defaults
	 * This sets some global defaults for class properties.
	 */
	private function _set_defaults() {
		$this->_admin_base_url = $this->_current_screen = $this->_admin_page_title = $this->_req_action = $this->_req_nonce = $this->_event = $this->_template_path = $this->_column_template_path = NULL;

		$this->_nav_tabs = $this_views = $this->_page_routes = $this->_page_config = array();

		$this->default_nav_tab_name = 'overview';
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
	 * @
	 * @return [type] [description]
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
	 * _route_admin_request()
	 * Meat and potatoes of the class.  Basically, this dude checks out what's being requested and sees if theres are some doodads to work the magic and handle the flingjangy.
	 * Translation:  Checks if the requested action is listed in the page routes and then will try to load the corresponding method.
	 *
	 * @access private
	 * @return void
	 */
	private function _route_admin_request() {

		if ( $this->_req_action != 'default' ) {
			wp_verify_nonce( $this->_req_nonce );
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
				'url' => isset($config['nav']['url']) ? $config['nav']['url'] : wp_nonce_url( add_query_arg( array( 'action'=>$slug ), $this->_admin_base_url), $slug . '_nonce'),
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
	 * _add_global_help_tabs
	 *  Adds any help_tabs within this method using built-in WP functions/methods for doing so.
	 * This particular method will add help tabs for ALL EE_Admin pages
	 * @link http://codex.wordpress.org/Function_Reference/add_help_tab
	 *
	 * @abstract
	 * @access private
	 * @return void
	 */
	private function _add_global_help_tabs() {}






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
		wp_register_style('event_espresso', EVENT_ESPRESSO_PLUGINFULLURL . 'css/admin-styles.css', array(), EVENT_ESPRESSO_VERSION);
		wp_register_style('jquery-ui-style-datepicker-css', EVENT_ESPRESSO_PLUGINFULLURL . 'css/ui-ee-theme/jquery.ui.datepicker.css', array(), EVENT_ESPRESSO_VERSION );

		//helpers styles
		wp_register_style('ee-text-links', EVENT_ESPRESSO_PLUGINFULLURL . 'helpers/assets/ee_text_list_helper.css', array(), EVENT_ESPRESSO_VERSION );
		
		wp_register_style('ee-admin-css', EE_CORE_ADMIN_URL . 'assets/ee-admin-page.css', array(), EVENT_ESPRESSO_VERSION);

		//attendee style registrations
		wp_register_style('espresso_attendees', ATT_ASSETS_URL . 'espresso_attendees_admin.css', array(), EVENT_ESPRESSO_VERSION );	

		//registrations style register
		wp_register_style('espresso_reg', REG_ASSETS_URL . 'espresso_registrations_admin.css', array(), EVENT_ESPRESSO_VERSION );

		//transactions style register
		wp_register_style( 'espresso_txn', TXN_ASSETS_URL . 'espresso_transactions_admin.css', array(), EVENT_ESPRESSO_VERSION );

		//venues style register
		wp_register_style( 'espress_venues', EE_VENUES_ASSETS_URL . 'ee-venues-admin.css', array(), EVENT_ESPRESSO_VERSION );

		//enqueue global styles
		wp_enqueue_style('event_espresso');
		wp_enqueue_style('ee-admin-css');


		/** SCRIPTS **/

		//register all scripts
		wp_register_script('jquery-ui-timepicker-addon', EVENT_ESPRESSO_PLUGINFULLURL . 'scripts/jquery-ui-timepicker-addon.js', array('jquery-ui-datepicker'), EVENT_ESPRESSO_VERSION, true );
		wp_register_script('event_editor_js', EVENT_ESPRESSO_PLUGINFULLURL . 'scripts/event_editor.js', array('jquery-ui-slider', 'jquery-ui-timepicker-addon'), EVENT_ESPRESSO_VERSION, true);
		wp_register_script('event-espresso-js', EVENT_ESPRESSO_PLUGINFULLURL . 'scripts/event_espresso.js', array('jquery'), EVENT_ESPRESSO_VERSION, true);
		wp_register_script('ee_admin_js', EE_CORE_ADMIN_URL . 'assets/ee-admin-page.js', array('jquery'), EVENT_ESPRESSO_VERSION, true );
		wp_register_script('jquery-validate', (EVENT_ESPRESSO_PLUGINFULLURL . "scripts/jquery.validate.min.js"), array('jquery'), EVENT_ESPRESSO_VERSION, TRUE);

		//helpers scripts
		wp_register_script('ee-text-links', EVENT_ESPRESSO_PLUGINFULLURL . 'helpers/assets/ee_text_list_helper.js', array('jquery'), EVENT_ESPRESSO_VERSION, TRUE );


		//attendee script registrations
		wp_register_script('espresso_attendees', ATT_ASSETS_URL . 'espresso_attendees_admin.js', array('jquery'), EVENT_ESPRESSO_VERSION, TRUE);

		//registrations script register
		wp_register_script('espresso_reg', REG_ASSETS_URL . 'espresso_registrations_admin.js', array('jquery-ui-datepicker', 'jquery-ui-draggable'), EVENT_ESPRESSO_VERSION, TRUE);

		//transactions script register
		wp_register_script('espresso_txn', TXN_ASSETS_URL . 'espresso_transactions_admin.js', array('jquery-ui-datepicker', 'jquery-ui-draggable'), EVENT_ESPRESSO_VERSION, TRUE);

		//venues script register
		wp_register_script('espresso_venue_admin', EE_VENUES_ASSETS_URL . 'ee-venues-admin.js', array('jquery-validate'), EVENT_ESPRESSO_VERSION, TRUE );

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
		


		//localizers (for passing variables to js as well)
		$js_args = array(
			'image_confirm' => __('Do you really want to delete this image? Please remember to update your event to complete the removal.', 'event_espresso')
			);
		wp_localize_script( 'event_editor_js', 'EE_EDIT_VARS', $js_args );


		/** remove filters **/
		remove_all_filters('mce_external_plugins');
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
			$this->_view = 'in_use';
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
			$this->_list_table_object = $a->newInstance(&$this);
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
					echo '<h2 style="margin:0">' . __('From the Blog', 'event_espresso') . '</h2>';

					// Get RSS Feed(s)
					@wp_widget_rss_output('http://eventespresso.com/feed/', array('show_date' => 0, 'items' => 6));

					echo '<h2 style="margin:0">' . __('From the Forums', 'event_espresso') . '</h2>';

					@wp_widget_rss_output('http://eventespresso.com/forums/feed/', array('show_date' => 0, 'items' => 4));
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
					<li><a href="http://eventespresso.com/support/installation/" target="_blank">
							<?php _e('Installation &amp; Usage Guide', 'event_espresso'); ?>
						</a></li>
					<li><a href="http://eventespresso.com/forums/2010/09/css-classes/" target="_blank">
							<?php _e('Customization Forums', 'event_espresso'); ?>
						</a></li>
					<li><a href="http://eventespresso.com/forums/category/premium-plugin-support/" target="_blank">
							<?php _e('Plugin Support Forums', 'event_espresso'); ?>
						</a></li>
					<li><a href="http://eventespresso.com/forums/category/general/features-requests/" target="_blank">
							<?php _e('Feature Request Forums', 'event_espresso'); ?>
						</a></li>
					<li><a href="http://eventespresso.com/forums/category/premium-plugin-support/bug-reports/" target="_blank">
							<?php _e('Bug Submission Forums', 'event_espresso'); ?>
						</a></li>
					<li><a href="http://eventespresso.com/forums/category/premium-plugin-support/news-and-updates/changelogs/" target="_blank">
							<?php _e('Changelog', 'event_espresso'); ?>
						</a></li>
					<li><a href="http://eventespresso.com/download/plugins-and-addons/">
							<?php _e('Plugins and Addons', 'event_espresso'); ?>
						</a></li>
				</ul>
			</div>
			<?php
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
	 */	
	protected function _set_publish_post_box_vars( $name = NULL, $id = FALSE, $delete = FALSE, $save_close_redirect_URL = NULL ) {

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
		$this->_set_save_buttons(TRUE, array(), array(), $save_close_redirect_URL );
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
		echo EE_Error::get_notices();
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

		$this->_template_args['admin_page_content'] = espresso_display_template( $template_path, $this->_template_args, TRUE );

		// the final template wrapper
		if ( $sidebar )
			$this->display_admin_page_with_sidebar();
		else
			$this->display_admin_page_with_no_sidebar();
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

		
		
		// load settings page wrapper template
		$template_path = EE_CORE_ADMIN . 'admin_wrapper.template.php';
		espresso_display_template( $template_path, $this->_template_args );

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
		$init_div = '<div id="event_editor_major_buttons_wrapper">';
		$alt_div = '<div id="event-editor-floating-save-btns" class="hidden">';

		$this->_template_args['save_buttons'] = '<div class="publishing-action">';
		//add in a hidden index for the current page (so save and close redirects properly)
		$this->_template_args['save_buttons'] .= $referrer_url;

		foreach ( $button_text as $key => $button ) {
			$ref = $default_names[$key];
			$name = !empty($actions) ? $actions[$key] : $ref;
			$this->_template_args['save_buttons'] .= '<input type="submit" class="button-primary" value="' . $button . '" name="' . $name . '" id="' . $ref . '" />';
			if ( !$both ) break;
		}
		$this->_template_args['save_buttons'] .= '</div><br class="clear" /></div>';
		$alt_buttons = $alt_div . $this->_template_args['save_buttons'];
		$this->_template_args['save_buttons'] = $init_div . $this->_template_args['save_buttons'] . $alt_buttons;
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
		$nonce = wp_nonce_field( $route . '_nonce', '_wpnonce', FALSE, FALSE );
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
			//dump query_args (becaus ethe save_and_close referrer should be setup)
			$query_args = array();
			$redirect_url = $this->_req_data['save_and_close_referrer'];
		}
		
		// grab messages
		$notices = EE_Error::get_notices( false, true );

		//combine $query_args and $notices
		$query_args = array_merge( $query_args, $notices );
		// generate redirect url

		// if redirecting to anything other than the main page, add a nonce
		if ( isset( $query_args['action'] )) {
			// manually generate wp_nonce
			$nonce = array( '_wpnonce' => wp_create_nonce( $query_args['action'] . '_nonce' ));
			// and merge that with the query vars becuz the wp_nonce_url function wrecks havoc on some vars
			$query_args = array_merge( $query_args, $nonce );
		} 

		$redirect_url = add_query_arg( $query_args, $redirect_url ); 

		wp_safe_redirect( $redirect_url );	
		exit();		
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

		$url = wp_nonce_url( add_query_arg( $query_args, $_base_url), $action . '_nonce');

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
}

	
// end of file:  includes/core/admin/EE_Admin_Page.core.php
