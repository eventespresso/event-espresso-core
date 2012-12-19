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
abstract class EE_Admin_Page {

	//identity properties
	public $label; //rem: = $admin_page_title
	public $menu_label; 
	public $capability;
	public $menu_slug; //rem: $page_slug

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

		//set properties that are always available with objects.
		$this->_set_init_properties();

		//set global defaults
		$this->_set_defaults();

		//set up page dependencies
		$this->_page_setup();
	}


	
	/**
	 * _set_init_properties
	 * Child classes use to set the following properties:
	 * $label, $menu_label, $capability, $menu_slug
	 *
	 * @abstract
	 * @access protected
	 * @return void
	 */
	abstract protected function _set_init_properties();




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
	 * get_menu_map is a static function that child classes use to indicate the details of their placement on the map.
	 * The map is in an associative array with the following properties.
	 * array(
	 * 		'group' => 'what "group" this page should be listed with (see EE_Admin_Page_init for list of available groups',
	 * 		'menu_order' => 'what order the this page will appear in the list for that group - just a regular int value please'
	 * )
	 * @abstract
	 * @static
	 * @access public 
	 * @return array see above description for format.
	 */
	abstract public static function get_menu_map();


	/**
	 * admin_init
	 * Anything that should be set/executed at 'admin_init' WP hook runtime should be put in here.  This will apply to all pages/views loaded by class.
	 *
	 * @abstract
	 * @access public
	 * @return void
	 */
	abstract public function admin_init();




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
			
		
		//load admin_notices
		

		//add screen options - global, page class, and view specific
		$this->_add_global_screen_options();
		$this->_add_screen_options();
		call_user_func( array( $this, '_add_screen_options_' . $this->_current_view ) );

		//add help tab(s) - global, page class, and view specific
		$this->_add_help_tabs();
		$this->_add_global_help_tabs();
		call_user_func( array( $this, '_add_help_tabs_' . $this->_current_view ) );

		//add feature_pointers - global, page class, and view specific
		$this->_add_feature_pointers();
		$this->_add_global_feature_pointers();
		call_user_func( array( $this, '_add_feature_pointers_' . $this->_current_view ) );

		//enqueue scripts/styles - global, page class, and view specific
		add_action('admin_enqueue_scripts', array($this, 'load_global_scripts_styles'), 5 );
		add_action('admin_enqueue_scripts', array($this, 'load_scripts_styles'), 10 );
		add_action('admin_enqueue_scripts', array($this, 'load_scripts_styles_' . $this->_current_view ), 15 );
	}

	private function admin_init_global() {}
	private function _add_global_screen_options() {}
	private function _add_global_help_tabs() {}
	private function _add_global_feature_pointers() {}
	public function load_global_scripts_styles() {}


	/**
	 * 		_init
	 *		do some stuff upon instantiation 
	 * 		@access protected
	 * 		@return void
	 */
	protected function _init() {

//		echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		$this->_check_user_access();

		global $is_ajax_request;
		$this->_AJAX = $is_ajax_request;
		//$this->_AJAX = isset($_POST['espresso_ajax']) && $_POST['espresso_ajax'] == 1  ? TRUE : FALSE;
		//echo '<h4>AJAX : ' . $this->_AJAX . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';

		// becuz WP List tables have two duplicate select inputs for choosing bulk actions, we need to copy the action from the second to the first
		if ( isset( $_REQUEST['action2'] ) && $_REQUEST['action'] == -1 ) {
			$_REQUEST['action'] = ! empty( $_REQUEST['action2'] ) && $_REQUEST['action2'] != -1 ? $_REQUEST['action2'] : $_REQUEST['action'];
		}
		// then set blank or -1 action values to 'default'
		$this->_req_action = isset( $_REQUEST['action'] ) && ! empty( $_REQUEST['action'] ) && $_REQUEST['action'] != -1 ? sanitize_key( $_REQUEST['action'] ) : 'default';
		$this->_req_nonce = $this->_req_action . '_nonce';

		$this->wp_page_slug = 'event-espresso_page_' . $this->page_slug;

		$this->define_page_vars();
		$this->set_page_routes();


		if ( $this->_is_UI_request ) {

			$this->template_args = array(
					'admin_page_header' => NULL,
					'admin_page_content' => NULL,
					'post_body_content' => NULL
			);

			add_action( 'admin_init', array( &$this, '_set_list_table_views' ), 8 );
			add_action( 'admin_init', array( &$this, '_set_list_table_view' ), 9 );
			add_action( 'admin_init', array( &$this, '_set_search_attributes' ));
			add_action( 'admin_init', array( &$this, '_add_espresso_meta_boxes' ));
			add_action( 'admin_notices', array( &$this, 'display_no_javascript_warning' ));
			add_action( 'admin_notices', array( &$this, 'display_espresso_notices' ));
			add_action('admin_footer', 'espresso_admin_page_footer');
			add_action( 'admin_print_footer_scripts', array( &$this, 'add_admin_page_ajax_loading_img' ), 99 );
			add_action( 'admin_print_footer_scripts', array( &$this, 'add_admin_page_overlay' ), 100 );
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
	 * 		displays an error message to ppl who have javascript disabled
	*		@access 		public
	*		@return 		void
	*/
	public function display_no_javascript_warning() {
		echo '
<noscript>
	<div id="no-js-message" class="error">
		<p style="font-size:1.3em;">
			<span style="color:red;">' . __( 'Warning!', 'event_espresso' ) . '</span>
			' . __( 'Javascript is currently turned off for your browser. Javascript must be enabled in order for all of the features on this page to function properly. Please turn your javascript back on.', 'event_espresso' ) . '
		</p>
	</div>
</noscript>';
	}





	/**
	 * 		displays espresso success and/or errror notices
	*		@access 		public
	*		@return 		void
	*/
	public function display_espresso_notices() {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		echo EE_Error::get_notices();
	}





	/**
	 * 		grab url requests and route them
	*		@access private
	*		@return void
	*/
	public function route_admin_request() {			

		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

//		echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
//		echo '<h4>$this->_req_action : ' . $this->_req_action . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//		echo '<h4>$this->_req_nonce : ' . $this->_req_nonce . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//		printr( $_REQUEST, '$_REQUEST  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		
		if ( $this->_req_action != 'default' ) {
			wp_verify_nonce( $this->_req_nonce );
		}		

		$route = FALSE;
		$func = FALSE;
		$args = array();	

		try {		
			// check that the page_routes array is not empty
			if ( empty( $this->_page_routes )) {
				// user error msg
				$error_msg = __('No page routes have been set for the ' . $this->admin_page_title . ' admin page.', 'event_espresso');
				// developer error msg
				$error_msg .=  '||' . $error_msg . __( ' Make sure the "set_page_routes()" method exists, and is seting the "_page_routes" array properlly.', 'event_espresso' );
				throw new EE_Error( $error_msg );
			} 			
		} catch ( EE_Error $e ) {
			$e->get_error();
		}					

		try {		
			// and that the requested page route exists 
			if ( array_key_exists( $this->_req_action, $this->_page_routes )) {
				$route = $this->_page_routes[ $this->_req_action ];
			} else {
				// user error msg
				$error_msg =  __('The requested page route does not exist for the ' . $this->admin_page_title . ' admin page.', 'event_espresso');
				// developer error msg
				$error_msg .=  '||' . $error_msg . __( ' Create a key in the "_page_routes" array named "'.$this->_req_action.'" and set it\'s value to the appropriate method.', 'event_espresso' );
				throw new EE_Error( $error_msg );
			}
		} catch ( EE_Error $e ) {
			$e->get_error();
		}					

		try {		
			// and that a default route exists
			if ( ! array_key_exists( 'default', $this->_page_routes )) {
				// user error msg
				$error_msg = __('A default page route has not been set for the ' . $this->admin_page_title . ' admin page.', 'event_espresso');
				// developer error msg
				$error_msg .=  '||' . $error_msg . __( ' Create a key in the "_page_routes" array named "default" and set it\'s value to your default page method.', 'event_espresso' );
				throw new EE_Error( $error_msg );
			}
		} catch ( EE_Error $e ) {
			$e->get_error();
		}					

		try {		
			// check if callback has args
			if ( is_array( $route )) {
				$func = $route['func'];
				$args = $route['args'];
			} else {
				$func = $route;
			}
		} catch ( EE_Error $e ) {
			$e->get_error();
		}
			
		if ( $func ) {
			try {		
				// and finally,  try to access page route
				if ( call_user_func_array( array( $this, &$func  ), $args ) === FALSE ) {
					// user error msg
					$error_msg =  __( 'An error occured. The  requested page route could not be found.', 'event_espresso' );
					// developer error msg
					$error_msg .= '||' . __( 'Page route "' . $func . '" could not be called. Check that the spelling for method names and actions in the "_page_routes" array are all correct.', 'event_espresso' );
					throw new EE_Error( $error_msg );
				}	
						
			} catch ( EE_Error $e ) {
				$e->get_error();
			}			
		}

	}





	/**
	 * 		_add_espresso_meta_boxes
	*		@access public
	*		@return array
	*/
	public function _add_espresso_meta_boxes() {	
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		global $espresso_premium;	
		add_meta_box('espresso_news_post_box', __('New @ Event Espresso', 'event_espresso'), 'espresso_news_post_box', $this->wp_page_slug, 'side');
		add_meta_box('espresso_links_post_box', __('Helpful Plugin Links', 'event_espresso'), 'espresso_links_post_box', $this->wp_page_slug, 'side');
		if ( ! $espresso_premium ) {
			add_meta_box('espresso_sponsors_post_box', __('Sponsors', 'event_espresso'), 'espresso_sponsors_post_box', $this->wp_page_slug, 'side');
		}
	}





	/**
	 * 		set current view for List Table
	*		@access public
	*		@return array
	*/
	public function _set_list_table_view() {		
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		// looking at active items or dumpster diving ?
		if ( ! isset( $_REQUEST['status'] ) || ! array_key_exists( $_REQUEST['status'], $this->_views )) {
			$this->_view = $this->_views['in_use']['slug'];
		} else {
			$this->_view = sanitize_key( $_REQUEST['status'] );
		}
	}





	/**
	 * 		set views array for List Table
	*		@access public
	*		@return array
	*/
	public function _set_list_table_views() {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		//echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		// active and trashed prices
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
			$this->_views[ $key ]['url'] = add_query_arg( $query_args, $this->admin_base_url );
		}
		//printr( $this->_views, '$this->_views  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		return $this->_views;
		
	}





	/**
	*		generates  HTML wrapper for an admin details page
	*		@access public
	*		@return void
	*/		
	public function _set_wp_page_slug(  ) {	
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		global $ee_admin_page;
		$this->wp_page_slug = $ee_admin_page[ $this->page_slug ];
	}





	/**
	 * 		_set_search_attributes
	*		@access 		public
	*		@return 		void
	*/
	public function _set_search_attributes( $max_entries = FALSE ) {
		$this->template_args['search']['btn_label'] = __( 'Search ' . ucwords( str_replace( '_', ' ', $this->page_slug )), 'event_espresso' );
		$this->template_args['search']['callback'] = 'search_' . $this->page_slug;
	}





	/**
	 * 		generates a drop down box for selecting the number of visiable rows in an admin page list table
	*		@access 		protected
	* 		@param		int 			$max_entries 		total number of rows in the table
	*		@return 		string
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
	*		spinny things pacify the masses
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