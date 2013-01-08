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
	protected $_template_args;

	//this will hold the list table object for a given view.
	protected $_list_table_object;

	//bools
	protected $_is_UI_request;
	protected $_doing_AJAX;

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





	/**
	 * 		@Constructor
	 * 		@access public
	 * 		@return void
	 */
	public function __construct($_wp_page_slug) {

		//init _wp_page_slug property
		$this->_wp_page_slug = $_wp_page_slug;

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
	 * Note: within the ajax callback methods, child classes should make sure that $this->_doing_AJAX flag is set true.
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
	 *     			'order' => 10 //required to indicate tab position.
	 *     		'list_table' => 'name_of_list_table' //string for list table class to be loaded for this admin_page.
	 *     		'metaboxes' => array('metabox1', 'metabox2'), //if present this key indicates we want to load metaboxes set for eventespresso admin pages. 
	 *     		'has_metaboxes' => true //this boolean flag can simply be used to indicate if the route will have metaboxes.  Typically this is used if the 'metaboxes' index is not used because metaboxes are added later.  We just use this flag to make sure the necessary js gets enqueued on page load.
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
		$this->_current_page = !empty( $_REQUEST['page'] ) ? sanitize_key( $_REQUEST['page'] ) : FALSE;

		if ( !$this->_current_page && !$this->_doing_AJAX ) return FALSE;

		//next let's just check user_access and kill if no access
		$this->_check_user_access();

		//next let's set if this is a UI request or not.
		$this->_is_UI_request = ( ! isset( $_REQUEST['noheader'] ) || $_REQUEST['noheader'] != 'true' ) ? TRUE : FALSE;
		
		// becuz WP List tables have two duplicate select inputs for choosing bulk actions, we need to copy the action from the second to the first
		if ( isset( $_REQUEST['action2'] ) && $_REQUEST['action'] == -1 ) {
			$_REQUEST['action'] = ! empty( $_REQUEST['action2'] ) && $_REQUEST['action2'] != -1 ? $_REQUEST['action2'] : $_REQUEST['action'];
		}
		// then set blank or -1 action values to 'default'
		$this->_req_action = isset( $_REQUEST['action'] ) && ! empty( $_REQUEST['action'] ) && $_REQUEST['action'] != -1 ? sanitize_key( $_REQUEST['action'] ) : 'default';
		$this->_current_view = $this->_req_action;
		$this->_req_nonce = $this->_req_action . '_nonce';
		$this->_define_page_props();

		$this->_current_page_view_url = add_query_arg( array( 'page' => $this->_current_page, 'action' => $this->_current_view ),  $this->_admin_base_url );

		$this->_set_page_routes();
		$this->_set_page_config();

		if ( $this->_is_UI_request ) {
			
			//admin_init stuff - global, all views for this page class, specific view
			add_action( 'admin_init', array( $this, 'admin_init_global' ), 5 );
			add_action( 'admin_init', array( $this, 'admin_init' ), 10 );
			if ( method_exists( $this, 'admin_init_' . $this->_current_view ) )
				add_action( 'admin_init', array( $this, 'admin_init_' . $this->_current_view ), 15 );

			$page_hook = 'load-' . $this->_wp_page_slug;
			//hook into page load hook so all page specific stuff get's loaded.
			if ( !empty($this->_wp_page_slug) )
				add_action($page_hook, array($this, 'load_page_dependencies') );
		}
	}


	/**
	 * load_page_dependencies
	 * loads things specific to this page class when its loaded.  Really helps with efficiency.
	 * @access public
	 * @return void
	 */
	public function load_page_dependencies() {

		//verify routes
		$this->_verify_routes();

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
		$this->_set_list_table_views();
		$this->_set_list_table_view();
		$this->_set_list_table_object();

		//setup search attributes
		$this->_set_search_attributes();

		// child classes can "register" a metabox to be automatically handled via the _page_config array property.  However in some cases the metaboxes will need to be added within a route handling callback.
		$this->_add_registered_meta_boxes();

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
		$this->_doing_AJAX = FALSE; //this will be set to true by the called ajax method in our child classes
		$this->_admin_base_url = $this->_current_screen = $this->_admin_page_title = $this->page_slug = $this->page_label = $this->_req_action = $this->_req_nonce = NULL;

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

	


	/**
	 * _verify_routes
	 * All this method does is verify the incoming request and make sure that routes exist for it.  We do this early so we know if we need to drop out.
	 *
	 * @
	 * @return [type] [description]
	 */
	private function _verify_routes() {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

		if ( !$this->_current_page && !$this->_doing_AJAX ) return FALSE;

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
	 * @return void 
	 */
	public function load_global_scripts_styles() {
		/** STYLES **/
		// add debugging styles
		if ( WP_DEBUG ) {
			add_action('admin_head', array( $this, 'add_xdebug_style' ));
		}
		wp_enqueue_style('jquery-ui-style', EVENT_ESPRESSO_PLUGINFULLURL . 'css/ui-ee-theme/jquery-ui-1.8.16.custom.css');
		wp_enqueue_style('event_espresso', EVENT_ESPRESSO_PLUGINFULLURL . 'css/admin-styles.css');


		/** SCRIPTS **/
		//are we loading metaboxes?
		if ( isset($this->_route_config['metaboxes'] ) || isset($this->_route_config['has_metaboxes']) ) {
			wp_enqueue_script('dashboard');
		}

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
	 * 		set views array for List Table
	*		@access public
	*		@return void
	*/
	protected function _set_list_table_views() {
		$this->_views = array(			
			'in_use' => array(
					'slug' => 'in_use',
					'label' => 'In Use',
					'count' => 0,
					'bulk_action' => array()
			),
			'trashed' => array(
					'slug' => 'trashed',
					'label' => 'Trash',
					'count' => 0,
					'bulk_action' => array()
			)
		);		
	}







	/**
	 * 		set current view for List Table
	*		@access public
	*		@return array
	*/
	protected function _set_list_table_view() {		
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		// looking at active items or dumpster diving ?
		if ( ! isset( $_REQUEST['status'] ) || ! array_key_exists( $_REQUEST['status'], $this->_views )) {
			$this->_view = 'in_use';
		} else {
			$this->_view = sanitize_key( $_REQUEST['status'] );
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
	 * 		get_list_table_view_RLs - get it? View RL ?? URL ??
	*		@access public
	*		@return array
	*/
	public function get_list_table_view_RLs() {
	
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		$query_args = array();

		if ( empty( $this->_views )) {
			$this->_set_list_table_views();
		}

		// cycle thru views
		foreach ( $this->_views as $key => $view ) {
			// check for current view
			if ( $this->_view == $view['slug']) {
				$this->_views[ $key ]['class'] = 'current';
			} else {
				$this->_views[ $key ]['class'] = '';
			}
			if ( $this->_req_action != 'default' ) {
				$query_args['action'] = $this->_req_action;
				$query_args['_wpnonce'] = wp_create_nonce( $query_args['action'] . '_nonce' );
			}
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
		$per_page = ( ! empty( $_REQUEST['per_page'] )) ? absint( $_REQUEST['per_page'] ) : 10;
		
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
	public function _set_search_attributes( $max_entries = FALSE ) {
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


	/** end of globally available metaboxes section **/
	/*************************************************/

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
					<span style="color:red;"><php _e( 'Warning!', 'event_espresso' ); ?></span>
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
		$screen = get_current_screen();
		$this->template_args['current_screen_widget_class'] = 'columns-' . 
		$screen->get_columns();
		$this->template_args['current_page'] = $this->_wp_page_slug;
		$template_path = EE_CORE_ADMIN . 'admin_details_metabox_column_wrapper.template.php';

		$this->template_args['screen'] = $screen;
		$this->template_args['post_body_content'] = $this->template_args['admin_page_content'];
		$this->template_args['admin_page_content'] = espresso_display_template( $template_path, $this->template_args, TRUE);

		//display any espresso_notices (generated from metaboxes)
		$this->display_espresso_notices();

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

		$this->_template_args['post_body_content'] = isset( $this->_template_args['admin_page_content'] ) ? $this->_template_args['admin_page_content'] : NULL;
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

		$this->_template_args['table_url'] = $this->_doing_AJAX ? add_query_arg( array( 'noheader' => 'true'), $this->_admin_base_url ) : $this->_admin_base_url;
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
		
		// grab messages at the last second
		$this->_template_args['notices'] = EE_Error::get_notices();
		
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
	 * 	@return string
	 * 	@uses EE_Form_Fields::get_form_fields (/helper/EE_Form_Fields.helper.php)
	 */
	protected function _generate_admin_form_fields($input_vars = array(), $id = FALSE) {
		require_once EVENT_ESPRESSO_PLUGINFULLPATH . '/helpers/EE_Form_Fields.helper.php';
		$content = EE_Form_Fields::get_form_fields($input_vars, $id);

		if ( is_wp_error($content) )
			return $content;

		return $content;
	}

	







	/**
	 * generates the "Save" and "Save & Close" buttons for edit forms
	 *
	 * @access protected
	 * @param bool $both if true then both buttons will be generated.  If false then just the "Save & Close" button.
	 * @param array $text if included, generator will use the given text for the buttons ( array([0] => 'Save', [1] => 'save & close')
	 * @param array $actions if included allows us to set the actions that each button will carry out (i.e. via the "name" value in the button).  We can also use this to just dump default actions by submitting some other value.
	 */
	protected function _set_save_buttons($both = TRUE, $text = array(), $actions = array() ) {
		//make sure $text and $actions are in an array
		$text = (array) $text;
		$actions = (array) $actions;

		$button_text = !empty($text) ? $text : array( __('Save', 'event_espresso'), __('Save and Close', 'event_espresso') );
		$default_names = array( 'save', 'save_and_close' );
		$init_div = '<div id="event_editor_major_buttons_wrapper">';
		$alt_div = '<div id="event-editor-floating-save-btns" class="hidden">';

		$this->_template_args['save_buttons'] = '<div class="publishing-action">';
		//add in a hidden index for the current page (so save and close redirects properly)
		$this->_template_args['save_buttons'] .= empty($actions) ? '<input type="hidden" id="save_and_close_referrer" name="save_and_close_referrer" value="' . $_SERVER['REQUEST_URI'] .'" />' : '';

		foreach ( $button_text as $key => $button ) {
			$ref = $default_names[$key];
			$name = !empty($action) ? $actions[$key] : $ref;
			$this->_template_args['save_buttons'] .= '<input type="submit" class="button-primary" value="' . $button . '" name="' . $name . '" id="' . $ref . '" />';
			if ( !$both ) break;
		}
		$this->_template_args['save_buttons'] .= '</div><br class="clear" /></div>';
		$alt_buttons = $alt_div . $this->_template_args['save_buttons'];
		$this->_template_args['save_buttons'] = $init_div . $this->_template_args['save_buttons'] . $alt_buttons;
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
		global $espresso_notices;

		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );

		$redirect_url = $this->admin_base_url;

		// how many records affected ? more than one record ? or just one ?
		if ( $success == 2 ) {
			// set plural msg
			EE_Error::add_success( sprintf( __('The %s have been successfully %s.', 'event_espresso'), $what, $action_desc ), __FILE__, __FUNCTION__, __LINE__);
		} else if ( $success == 1 ) {
			// set singular msg
			EE_Error::add_success( sprintf( __('The %s has been successfully %s.', 'event_espresso'), $what, $action_desc), __FILE__, __FUNCTION__, __LINE );
		}

		// check that $query_args isn't something crazy
		if ( ! is_array( $query_args )) {
			$query_args = array();
		}

		//calculate where we're going (if we have a "save and close" button pushed)
		if ( isset($_REQUEST['save'] ) && isset($_REQUEST['save_and_close_referrer'] ) ) {
			$redirect_url = $_REQUEST['save_and_close_referrer'];
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
					if ( $value < 1 || $value > 100 )
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

}

	
// end of file:  includes/core/admin/EE_Admin_Page.core.php