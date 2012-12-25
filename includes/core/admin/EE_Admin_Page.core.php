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
	protected $_wp_page_slug;

	//navtabs
	protected $_nav_tabs;
	protected $_default_nav_tab_name;

	//template variables (used by templates)
	protected $_template_args;

	//bools
	protected $_is_UI_request;
	protected $_doing_AJAX;

	//list table args
	protected $_view;
	protected $_views;

	//action => method pairs used for routing incoming requests
	protected $_page_routes;

	//set via request page and action args.
	protected $_current_page;
	protected $_current_view;

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
	 * $page_slug, $page_label (localized)
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
	 * $_admin_base_url, $_admin_page_title, $_wp_page_slug
	 *
	 * @abstract
	 * @access protected
	 * @return void
	 */
	abstract protected function _define_page_props();





	/**
	 * _set_page_routes
	 * child classes use this to define the page routes for all subpages handled by the class.  Page routes are assigned to a action => method pairs in an array and to the $_page_routes property
	 *
	 * @abstract
	 * @access protected
	 * @return void
	 */
	abstract protected function _set_page_routes();





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
		$this->_set_page_routes();

		if ( $this->_is_UI_request ) {
			
			//admin_init stuff - global, all views for this page class, specific view
			add_action( 'admin_init', array( $this, 'admin_init_global' ), 5 );
			add_action( 'admin_init', array( $this, 'admin_init' ), 10 );
			add_action( 'admin_init', array( $this, 'admin_init_' . $this->_current_view ), 15 );

			//hook into page load hook so all page specific stuff get's loaded.
			if ( !empty($this->_wp_page_slug) )
				add_action('load-' . $this->_wp_page_slug, array($this, '_load_page_dependencies') );
		}
	}


	/**
	 * _load_page_dependencies
	 * loads things specific to this page class when its loaded.  Really helps with efficiency.
	 * @access private
	 * @return void
	 */
	private function _load_page_dependencies() {
		$this->_current_screen = get_current_screen();
		
		//init template args
		$this->_template_args = array(
			'admin_page_header' => NULL,
			'admin_page_content' => NULL,
			'post_body_content' => NULL
		);
			
		
		//load admin_notices - global, page class, and view specific
		add_action( 'admin_notices', array( $this, 'admin_notices_global'), 5 );
		add_action( 'admin_notices', array( $this, 'admin_notices' ), 10 );
		add_action( 'admin_notices', array( $this, 'admin_notices_' . $this->_current_view ), 15 );

		//setup list table properties
		$this->_set_list_table_views();
		$this->_set_list_table_view();

		//setup search attributes
		$this->_set_search_attributes();

		//global metaboxes
		$this->_add_espresso_meta_boxes();

		//add screen options - global, page child class, and view specific
		$this->_add_global_screen_options();
		$this->_add_screen_options();
		call_user_func( array( $this, '_add_screen_options_' . $this->_current_view ) );

		//add help tab(s) - global, page child class, and view specific
		$this->_add_help_tabs();
		$this->_add_global_help_tabs();
		call_user_func( array( $this, '_add_help_tabs_' . $this->_current_view ) );

		//add feature_pointers - global, page child class, and view specific
		$this->_add_feature_pointers();
		$this->_add_global_feature_pointers();
		call_user_func( array( $this, '_add_feature_pointers_' . $this->_current_view ) );

		//enqueue scripts/styles - global, page class, and view specific
		add_action('admin_enqueue_scripts', array($this, 'load_global_scripts_styles'), 5 );
		add_action('admin_enqueue_scripts', array($this, 'load_scripts_styles'), 10 );
		add_action('admin_enqueue_scripts', array($this, 'load_scripts_styles_' . $this->_current_view ), 15 );

		//admin_print_footer_scripts - global, page child class, and view specific.  NOTE, despite the name, whenever possible, scripts should NOT be loaded using this.  In most cases that's doing_it_wrong().  But adding hidden container elements etc. is a good use case. Notice the late priority we're giving these. 
		add_action('admin_print_footer_scripts', array( $this, 'admin_footer_scripts_global', 99 ) );
		add_action('admin_print_footer_scripts', array( $this, 'admin_footer_scripts', 100 ) );
		add_action('admin_print_footer_scripts', array( $this, 'admin_footer_scripts_' . $this->_current_view ), 101 );
	}

	



	/**
	 * _set_defaults
	 * This sets some global defaults for class properties.
	 */
	private function _set_defaults() {
		$this->_doing_AJAX = FALSE; //this will be set to true by the called ajax method in our child classes
		$this->_admin_base_url = $this->_current_screen = $this->_admin_page_title = $this->page_slug = $this->page_label = $this->_wp_page_slug = $this->_req_action = $this->_req_nonce = NULL;

		$this->_nav_tabs = $this->_template_args = $this_views = $this->_page_routes = array();

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
	 * _route_admin_request()
	 * Meat and potatoes of the class.  Basically, this dude checks out what's being requested and sees if theres are some doodads to work the magic and handle the flingjangy.
	 * Translation:  Checks if the requested action is listed in the page routes and then will try to load the corresponding method.
	 *
	 * @access private
	 * @return void
	 */
	private function _route_admin_request() {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

		if ( !$this->_current_page && !$this->_doing_AJAX ) return FALSE;

		if ( $this->_req_action != 'default' ) {
			wp_verify_nonce( $this->_req_nonce );
		}		

		$route = FALSE;
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
			$route = $this->_page_routes[ $this->_req_action ];
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
		
		// check if callback has args
		if ( is_array( $route )) {
			$func = $route['func'];
			$args = $route['args'];
		} else {
			$func = $route;
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
	 * this sets the wp_page_slug (passed through via EE_Admin_Init), with this we can do other nifty stuff.
	 *
	 * @access public
	 * @param void
	 */
	public function set_wp_page_slug($slug) {
		$this->_wp_page_slug = $slug;
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
	public function admin_init_global() {}






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
			add_action('admin_head', array( &$this, 'add_xdebug_style' ));
		}
		wp_enqueue_style('jquery-ui-style', EVENT_ESPRESSO_PLUGINFULLURL . 'css/ui-ee-theme/jquery-ui-1.8.16.custom.css');


		/** SCRIPTS **/

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
			$this->_view = $this->_views['in_use']['slug'];
		} else {
			$this->_view = sanitize_key( $_REQUEST['status'] );
		}
	}





	/**
	 * 		_set_search_attributes
	*		@access 		protected
	*		@return 		void
	*/
	public function _set_search_attributes( $max_entries = FALSE ) {
		$this->template_args['search']['btn_label'] = sprintf( __( 'Search %s', 'event_espresso' ), $this->page_label );
		$this->template_args['search']['callback'] = 'search_' . $this->page_slug;
	}



	/**
	 * 		_add_espresso_meta_boxes
	 * 		add in default metaboxes for pages.
	 *
	 * @link http://codex.wordpress.org/Function_Reference/add_meta_box
	 * @access private
	 * @return void
	*/
	private function _add_espresso_meta_boxes() {	
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		global $espresso_premium;	
		add_meta_box('espresso_news_post_box', __('New @ Event Espresso', 'event_espresso'), 'espresso_news_post_box', $this->_wp_page_slug, 'side');
		add_meta_box('espresso_links_post_box', __('Helpful Plugin Links', 'event_espresso'), 'espresso_links_post_box', $this->_wp_page_slug, 'side');
		if ( ! $espresso_premium ) {
			add_meta_box('espresso_sponsors_post_box', __('Sponsors', 'event_espresso'), 'espresso_sponsors_post_box', $this->_wp_page_slug, 'side');
		}
	}




	/**
	 * remove_espresso_meta_boxes
	 * Child classes can call this method if they wish to remove the default espresso meta-boxes.  Just remember that it needs to be called AFTER _add_espresso_meta_boxes has executed.
	 *
	 * @link http://codex.wordpress.org/Function_Reference/remove_meta_box
	 * @access private
	 * @return void
	 */
	private function _remove_espresso_meta_boxes() {
		remove_meta_box( 'espresso_news_post_box', $this->_wp_page_slug, 'side');
		remove_meta_box( 'espresso_links_post_box', $this->_wp_page_slug, 'side');
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
					<span style="color:red;"><php _e( 'Warning!', 'event_espresso' ); ?></span>
					<?php _e( 'Javascript is currently turned off for your browser. Javascript must be enabled in order for all of the features on this page to function properly. Please turn your javascript back on.', 'event_espresso' ); ?>
				</p>
			</div>
		</noscript>';
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
	private function add_admin_page_ajax_loading_img() {
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
	private function add_admin_page_overlay() {
		?>
		<div id="espresso-admin-page-overlay-dv" class=""></div>
		<?php
	}




	/**
	 * 		get_list_table_view_RLs - get it? View RL ?? URL ??
	*		@access protected
	*		@return array
	*/
	protected function get_list_table_view_RLs() {
	
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
	*		_add_admin_page_meta_box - facade for add_meta_box
	*		@access public
	* 		@param		int 			$max_entries 		total number of rows in the table
	*		@return void
	*/		
	public function _add_admin_page_meta_box( $action, $title, $callback, $callback_args ) {	
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, $callback );
		add_meta_box( str_replace( '_', '-', $action ) . '-mbox', $title, array( $this, $callback . '_meta_box' ), $this->wp_page_slug, 'normal', 'high', $callback_args );
	}





	/**
	*		_add_admin_page_sidebar_meta_box - facade for add_meta_box
	*		@access public
	* 		@param		int 			$max_entries 		total number of rows in the table
	*		@return void
	*/		
	public function _add_admin_page_sidebar_meta_box( $action, $title, $callback, $callback_args ) {	
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, $callback );
		add_meta_box( str_replace( '_', '-', $action ) . '-sidebar-mbox', $title, array( $this, $callback . '_sidebar_meta_box' ), $this->wp_page_slug, 'side', 'high', $callback_args );
	}





	/**
	*		generates  HTML wrapper for an admin details page
	*		@access public
	*		@return void
	*/		
	public function display_admin_page_with_sidebar() {		
		
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		global $wp_version;
		// set current wp page slug - looks like: event-espresso_page_event_categories
		$this->template_args['current_page'] = $this->wp_page_slug;
		if (version_compare($wp_version, '3.3.2', '>')) {
			// path toWP ver >= 3.4 template
			$template_path = EE_CORE_ADMIN . 'admin_details_wrapper.template.php';
		} else {
			// path toWP ver < 3.4 template
			$template_path = EE_CORE_ADMIN . 'admin_details_wrapper_pre_34.template.php';
		}

		$this->template_args['post_body_content'] = isset( $this->template_args['admin_page_content'] ) ? $this->template_args['admin_page_content'] : NULL;
		$this->template_args['admin_page_content'] = espresso_display_template( $template_path, $this->template_args, TRUE );

		// the final template wrapper
		$this->admin_page_wrapper();

	}





	/**
	*		generates  HTML wrapper with Tabbed nav for an admin page
	*		@access public
	*		@return void
	*/		
	public function admin_page_wrapper(  ) {

		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		// tab urls
		$this->nav_tabs[ $this->default_nav_tab_name ]['url'] = $this->admin_base_url;  
		$this->nav_tabs[ $this->default_nav_tab_name ]['link_text'] = __( ucwords( str_replace( '_', ' ', $this->default_nav_tab_name )), 'event_espresso' );
		$this->nav_tabs[ $this->default_nav_tab_name ]['css_class'] = ' nav-tab-active';
		$this->nav_tabs[ $this->default_nav_tab_name ]['order'] = 10;

		$this->nav_tabs['reports']['url'] = wp_nonce_url( add_query_arg( array( 'action'=>'reports' ), $this->admin_base_url ), 'reports_nonce' );  
		$this->nav_tabs['reports']['link_text'] = __( 'Reports', 'event_espresso' );
		$this->nav_tabs['reports']['css_class'] = '';
		$this->nav_tabs['reports']['order'] = 20;

		$this->nav_tabs['settings']['url'] = wp_nonce_url( add_query_arg( array( 'action'=>'settings' ), $this->admin_base_url ), 'settings_nonce' );  
		$this->nav_tabs['settings']['link_text'] = __( 'Settings', 'event_espresso' );
		$this->nav_tabs['settings']['css_class'] = '';
		$this->nav_tabs['settings']['order'] = 30;

		$this->nav_tabs = apply_filters( 'filter_hook_espresso_admin_page_nav_tabs', $this->nav_tabs );

		if( $this->_req_action != 'default' ) {
			$this->nav_tabs[ $this->default_nav_tab_name ]['css_class'] = '';	
			if ( isset( $this->nav_tabs[ $this->_req_action ] )) {
				$this->nav_tabs[ $this->_req_action ]['css_class'] = ' nav-tab-active';
			}			
		}		

		usort( $this->nav_tabs, array($this, '_sort_nav_tabs' ));
		//	printr( $this->nav_tabs, '$this->nav_tabs  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

		$this->template_args['nav_tabs'] = $this->nav_tabs;
		$this->template_args['admin_page_title'] = $this->admin_page_title;
		
		// grab messages at the last second
		$this->template_args['notices'] = EE_Error::get_notices();
		
		// load settings page wrapper template
		$template_path = EE_CORE_ADMIN . 'admin_wrapper.template.php';
		espresso_display_template( $template_path, $this->template_args );

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
	 * 		remove reports tab from admin_page_nav_tabs
	*		@access private
	*		@param array	$nav_tabs
	*		@return array
	*/
	public function _remove_reports_from_admin_page_nav_tabs( $nav_tabs = array() ) {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		unset ( $nav_tabs['reports'] );	
		return $nav_tabs;		
	}





	/**
	 * 		remove settings tab from admin_page_nav_tabs
	*		@access private
	*		@param array	$nav_tabs
	*		@return array
	*/
	public function _remove_settings_from_admin_page_nav_tabs( $nav_tabs = array() ) {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		unset ( $nav_tabs['settings'] );	
		return $nav_tabs;		
	}





	/**
	*		spinny things pacify the masses don't they?
	*		@access public
	*		@return void
	*/		
	public function add_admin_page_ajax_loading_img() {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		echo '
	<div id="espresso-admin-page-ajax-loading" class="hidden">
		<img src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/ajax-loader-grey.gif" /><span>' . __('loading...', 'event_espresso') . '</span>
	</div>
';
	}





	/**
	*		add admin page overlay for modal boxes
	*		@access public
	*		@return void
	*/		
	public function add_admin_page_overlay() {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		echo '
	<div id="espresso-admin-page-overlay-dv" class=""></div>
';
	}
	

}


	
// end of file:  includes/core/admin/EE_Admin_Page.core.php