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
 * @package			Event Espresso
 * @subpackage		includes/core/admin/EE_Admin_Page.core.php
 * @author				Brent Christensen
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

		//echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		$this->_check_user_access();

		$this->_AJAX = isset($_POST['espresso_ajax']) && $_POST['espresso_ajax'] == 1  ? TRUE : FALSE;

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
		echo espresso_get_notices();
	}





	/**
	 * 		grab url requests and route them
	*		@access private
	*		@return void
	*/
	public function route_admin_request() {			

		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		
		if ( $this->_req_action != 'default' ) {
			wp_verify_nonce( $this->_req_nonce );
		}		

		global $espresso_notices;
		
		// check that the page_routes array is not empty
		if ( empty( $this->_page_routes )) {
			$error_msg = __('No page routes have been set for the ' . $this->admin_page_title . ' admin page.', 'event_espresso');
			$espresso_notices['errors'][] = $error_msg . espresso_get_error_code(__FILE__, __FUNCTION__, __LINE__ );			
			$this->display_espresso_notices();
			exit();
		} 
		// and that a default route exists
		if ( ! array_key_exists( 'default', $this->_page_routes )) {
			$error_msg =  __('A default page route has not been set for the ' . $this->admin_page_title . ' admin page.', 'event_espresso');
			$espresso_notices['errors'][] = $error_msg . espresso_get_error_code(__FILE__, __FUNCTION__, __LINE__ );			
			$this->display_espresso_notices();
			exit();
		}
		// and that the requested page route exists 
		if ( array_key_exists( $this->_req_action, $this->_page_routes )) {
			$route = $this->_page_routes[ $this->_req_action ];
		} else {
			$error_msg =  __('The requested page route does not exist for the ' . $this->admin_page_title . ' admin page.', 'event_espresso');
			$espresso_notices['errors'][] = $error_msg . espresso_get_error_code(__FILE__, __FUNCTION__, __LINE__ );			
			$this->display_espresso_notices();
			exit();
		}
		// check if callback has args
		if ( is_array( $route )) {
			$func = $route['func'];
			$args = $route['args'];
		} else {
			$func = $route;
			$args = array();	
		}

		if ( call_user_func_array( array( $this, &$func  ), $args ) === FALSE ) {
			$error_msg =  __('An error occured and the  ' . $func . ' page route could not be called.', 'event_espresso');
			$espresso_notices['errors'][] = $error_msg . espresso_get_error_code(__FILE__, __FUNCTION__, __LINE__ );
			$this->display_espresso_notices();
			exit();
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
	public function _add_admin_page_meta_box( $action, $title, $callback, $callback_args, $column, $priority, $create_func = true ) {	
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

		//the final wrapper
		$this->admin_page_wrapper();
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

		$this->template_args['post_body_content'] = $this->template_args['admin_page_content'];
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
		//$this->template_args['notices'] = espresso_get_notices();
		
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
	 * 	@todo: note this should be extracted eventually into some sort of form-builder/sanitizer/validation library for use with EE.
	 */
	protected function _generate_admin_form_fields($input_vars = array(), $id = FALSE) {

		if (empty($input_vars) || !$id) {
			return new WP_Error(__('form_field_generator_error', 'event_espresso'), __('missing required variables for the form field generator', 'event_espresso') . espresso_get_error_code(__FILE__, __FUNCTION__, __LINE__) );
		}
		
		// if you don't behave - this is what you're gonna get !!!
		$output = '';

		// cycle thru inputs
		foreach ($input_vars as $input_key => $input_value) {

			// required fields get a * 
			$required = $input_value['required'] ? '&nbsp;<em>*</em>' : '';
			// and the css class "required"
			$styles = $input_value['required'] ? 'required ' . $input_value['css_class'] : $input_value['css_class'];
			$field_id = $id . '-' . $input_key;

			// what type of input are we dealing with ?
			switch ($input_vars['input']) {

				// text inputs
				case 'text' :

					$output .= "\n\t\t\t" . '<label for="' . $field_id . '">' . $input_value['label'] . $required . '</label>';
					$output .= "\n\t\t\t" . '<input id="' . $field_id . '" class="' . $styles . '" type="text" value="' . $input_value['value'] . '" name="' . $input_value['name'] . '">';
					break;

				// dropdowns
				case 'select' :

					$output .= "\n\t\t\t" . '<label for="' . $field_id . '">' . $input_value['label'] . $required . '</label>';
					$output .= "\n\t\t\t" . '<select id="' . $field_id . '" class="' . $styles . '" name="' . $input_value['name'] . '">';

					if (is_array($input_value['options'])) {
						$options = $input_value['options'];
					} else {
						$options = explode(',', $input_value['options']);
					}

					foreach ($options as $key => $value) {
						//$key = str_replace( ' ', '_', sanitize_key( $value ));
						$output .= "\n\t\t\t\t" . '<option value="' . $key . '">' . $value . '</option>';
					}
					$output .= "\n\t\t\t" . '</select>';

					break;

				case 'textarea' :

					$output .= "\n\t\t\t" . '<label for="' . $field_id . '">' . $input_value['label'] . $required . '</label>';
					$output .= "\n\t\t\t" . '<textarea id="' . $field_id . '" class="' . $styles . '" name="' . $input_value['name'] . '">' . $input_value['value'] . '</textarea>';
					break;

				case 'hidden' :
					$output .= "\n\t\t\t" . '<input id="' . $field_id . '" type="hidden" name="' . $input_value['name'] . '" value="' . $input_value['value'] . '">';
					break;

				case 'checkbox' : 
					$checked = ( $input_value['value'] == 1 ) ? 'checked="checked"' : '';
					$output .= "\n\t\t\t" . '<label for="' . $field_id . '">' . $input_value['label'] . $required . '</label>';
					$output .= "\n\t\t\t" . '<input id="' . $field_id. '" type="checkbox" name="' . $input_value['name'] . '" value="1"' . $checked . ' />';
					break; 
				}
			
		} // end foreach( $input_vars as $input_key => $input_value ) 

		return $output;
	}
	
}	
// end of file:  includes/core/admin/EE_Admin_Page.core.php