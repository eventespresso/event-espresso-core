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
 * @ link					{@link http://www.eventespresso.com}
 * @ since		 		3.2.P
 *
 * ------------------------------------------------------------------------
 */
interface Admin_Page_Interface {
	// main function required by admin menu for displaying page
	function define_page_vars();
	function set_page_routes();
}
/**
 * EE_Admin_Page class
 *
 * @package		Event Espresso
 * @subpackage		includes/core/admin/EE_Admin_Page.core.php
 * @author		Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EE_Admin_Page {
	
	// must be set in define_page_vars()
	protected $admin_base_url = NULL; 
	protected $admin_page_title = NULL;
	protected $page_slug = NULL;
	protected $wp_page_slug = NULL;
	// array for passing nav tab vars to templates
	protected $nav_tabs = array();
	// array for passing vars to templates
	protected $template_args = array();
	// string for setting a template path
	protected $_template_path = NULL;
	// is current request via AJAX ?
	protected $_AJAX = FALSE;
	// denotes that current request is for a UI (web facing page) - gets set to false when performing data updates, inserts, deletions etc, so that unecessary resources don't get loaded
	protected $_is_UI_request = TRUE;
	// current list table view
	protected $_view = 'in_use';		
	// active and trashed prices array
	protected $_views = array();		
	// array of action => method pairs used for routing requests 
	protected $_page_routes = array();		
	// sanitized $_REQUEST['action'] 
	protected $_req_action = NULL;		
	protected $_req_nonce = NULL;		

	protected $_search_btn_label;
	protected $_search_box_callback;
	protected $default_nav_tab_name = 'overview';




//	function define_page_vars(){}
//	function set_page_routes(){}




	/**
	 * 		@Constructor
	 * 		@access private
	 * 		@return void
	 */
	private function __construct() {}





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
	 * child classes can call this in their constructor if they want their page to use columns (similar to wp_dashboard)
	 * @access protected
	 * @return void
	 */
	protected function _use_columns() {
		add_action( 'admin_print_scripts', array( $this, 'set_screen_options') );
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
	 * use for setting screen options on a page.
	 */
	public function set_screen_options() {
		wp_enqueue_script('dashboard');
		add_screen_option('layout_columns', array('max' => 4, 'default' => 3) );
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
				'template_args' => $this->template_args,
				);
		}

		//if $create_func is true (default) then we automatically create the function for displaying the actual meta box.  If false then we take the $callback reference passed through and use it instead (so callers can define their own callback function/method if they wish)
		$call_back_func = $create_func ? create_function('$post, $metabox', 'do_action( "action_hook_espresso_log", __FILE__, __FUNCTION__, ""); echo espresso_display_template( $metabox["args"]["template_path"], $metabox["args"]["template_args"], TRUE );') : $callback;

		add_meta_box( str_replace( '_', '-', $action ) . '-mbox', $title, $call_back_func, $this->wp_page_slug, $column, $priority, $callback_args );
	}






	/**
	 * generates HTML wrapper for and admin details page that contains metaboxes in columns
	 * @return [type] [description]
	 */
	public function display_admin_page_with_metabox_columns() {
		$screen = get_current_screen();
		$this->template_args['current_screen_widget_class'] = 'columns-' . 
		$screen->get_columns();
		$this->template_args['current_page'] = $this->wp_page_slug;
		$template_path = EE_CORE_ADMIN. 'admin_details_metabox_column_wrapper.template.php';

		$this->template_args['screen'] = $screen;
		$this->template_args['post_body_content'] = $this->template_args['admin_page_content'];
		$this->template_args['admin_page_content'] = espresso_display_template( $template_path, $this->template_args, TRUE);

		//display any espresso_notices (generated from metaboxes)
		$this->display_espresso_notices();

		//the final wrapper
		$this->admin_page_wrapper();
	}






	/**
	*	generates  HTML wrapper for an admin details page
	*	@access public
	*	@return void
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

		//display any espresso_notices (generated from metaboxes)
		$this->display_espresso_notices();

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






	/**
	 * _handle_errors
	 * This will take an incoming error object and add it to the espresso_notices array.
	 * @param  object $error_obj a WP_Error object
	 * @access protected
	 * @return void
	 * @todo Currently this is just being used by EE_messages subsystem. IF this works well, we could roll it out to all systems for handling errors and switch things over to using WP_Error objects.
	 */
	protected function _handle_errors($error_obj) {
		global $espresso_notices;
		
		if ( is_wp_error($error_obj) ) {
			$espresso_notices['errors'][] = $error_obj->get_error_message();
		}
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

		$this->template_args['save_buttons'] = '<div class="publishing-action">';
		//add in a hidden index for the current page (so save and close redirects properly)
		$this->template_args['save_buttons'] .= empty($actions) ? '<input type="hidden" id="save_and_close_referrer" name="save_and_close_referrer" value="' . $_SERVER['REQUEST_URI'] .'" />' : '';

		foreach ( $button_text as $key => $button ) {
			$ref = $default_names[$key];
			$name = !empty($action) ? $actions[$key] : $ref;
			$this->template_args['save_buttons'] .= '<input type="submit" class="button-primary" value="' . $button . '" name="' . $name . '" id="' . $ref . '" />';
			if ( !$both ) break;
		}
		$this->template_args['save_buttons'] .= '</div><br class="clear" /></div>';
		$alt_buttons = $alt_div . $this->template_args['save_buttons'];
		$this->template_args['save_buttons'] = $init_div . $this->template_args['save_buttons'] . $alt_buttons;
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

		// overwrite default success messages
		$espresso_notices['success'] = array();
		$redirect_url = $this->admin_base_url;

		// how many records affected ? more than one record ? or just one ?
		if ( $success == 2 ) {
			// set plural msg
			$espresso_notices['success'][] = sprintf( __('The %s have been successfully %s.', 'event_espresso'), $what, $action_desc );
		} else if ( $success == 1 ) {
			// set singular msg
			$espresso_notices['success'][] = sprintf( __('The %s has been successfully %s.', 'event_espresso'), $what, $action_desc);
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
		$notices = espresso_get_notices( FALSE, TRUE, TRUE, FALSE );
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
	
}	
// end of file:  includes/core/admin/EE_Admin_Page.core.php
