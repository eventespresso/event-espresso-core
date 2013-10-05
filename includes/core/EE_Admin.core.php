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
 * EE_Admin
 *
 * @package			Event Espresso
 * @subpackage	/core/admin/
 * @author				Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
final class EE_Admin {

   /**
     * 	EE_Admin Object
     * 	@private _instance
	 * 	@private 	protected
     */
	private static $_instance = NULL;

	/**
	 * 	EE_Registry Object
	 *	@var 	EE_Registry	$EE
	 * 	@access 	protected
	 */
	protected $EE = NULL;






	/**
	 *@ singleton method used to instantiate class object
	 *@ access public
	 *@ return class instance
	 */	
	public static function instance() {
		// check if class object is instantiated
		if ( self::$_instance === NULL  or ! is_object( self::$_instance ) or ! ( self::$_instance instanceof EE_Admin )) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}


	
   /**
     * class constructor
     */
	protected function __construct() {
		// grab registry
		$this->EE = EE_Registry::instance();
		// define global EE_Admin constants
		$this->_define_all_constants();
		
		// admin hooks
		add_filter( 'plugin_action_links', array( $this, 'filter_plugin_actions' ), 10, 2 );
		// load EE_Request_Handler early
		add_action( 'init', array( $this, 'get_request' ), 4 );
		add_action( 'init', array( $this, 'init' ), 100 );
		add_action( 'admin_init', array( $this, 'admin_init' ), 100 );
		
//		add_action( 'admin_enqueue_scripts', 'espresso_load_scripts_styles' );
		add_action( 'admin_notices', array( $this, 'display_admin_notices' ), 10 );
		add_filter('admin_footer_text', array( $this, 'espresso_admin_footer' ));
		
		
	}





	/**
	 * _define_all_constants
	 * define constants that are set globally for all admin pages
	 *
	 * @access private
	 * @return void
	 */
	private function _define_all_constants() {
		define( 'EE_CORE_ADMIN', EE_CORE . 'admin' . DS );
		define( 'EE_CORE_ADMIN_URL', EVENT_ESPRESSO_PLUGINFULLURL . 'includes/core/admin/' );
		define( 'EE_CORE_ADMIN_TEMPLATE', EE_CORE_ADMIN . 'templates' . DS );
		define( 'WP_ADMIN_PATH', ABSPATH . 'wp-admin/' );
		define( 'WP_AJAX_URL', get_bloginfo('url') . '/wp-admin/admin-ajax.php' );
		define( 'JQPLOT_URL', EVENT_ESPRESSO_PLUGINFULLURL . 'scripts/jqplot/' );
	}



	/**
	 * 	filter_plugin_actions - adds links to the Plugins page listing
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function filter_plugin_actions( $links, $plugin ) {
		// set $main_file in stone
		static $main_file;
		// if $main_file is not set yet
		if ( ! $main_file ) {
			$main_file = plugin_basename( EVENT_ESPRESSO_MAIN_FILE );
		}
		// compare current plugin to this one
		if ( $plugin == $main_file ) {
			$org_settings_link = '<a href="admin.php?page=espresso_general_settings">' . __( 'Settings', 'event_espresso' ) . '</a>';
			$events_link = '<a href="admin.php?page=espresso_events">' . __( 'Events', 'event_espresso' ) . '</a>';
			// add before other links
			array_unshift( $links, $org_settings_link, $events_link );
		}
		return $links;
	}



	/**
	 *	_get_request
	 * 
	 *	@access public
	 *	@return void
	 */
	public function get_request() {
		$this->EE->load_helper( 'URL' );	
		$this->EE->load_core( 'CPT_Strategy' );
		$this->EE->load_core( 'Request_Handler' );
	}



	/**
	 *	hide_admin_pages_except_maintenance_mode
	 * 
	 *	@access public
	 *	@return array
	 */	
	public function hide_admin_pages_except_maintenance_mode( $admin_page_folder_names = array() ){
		return array('maintenance');
	}



	/**
	* init- should fire after shortcode, module,  addon, other plugin (default priority), and even EE_Front_Controller's init phases have run
	* 
	* @access public
	* @return void
	*/
	public function init() {
		
		//if we're in maintenance mode level 2, we want to disable the entire admin, except the maintenance mode page(s)
		//however, we want to make use of the admin infrastructure still
		if ( EE_Maintenance_Mode::instance()->level() == EE_Maintenance_Mode::level_2_complete_maintenance ){
			add_filter( 'FHEE_admin_pages_array', array( $this, 'hide_admin_pages_except_maintenance_mode' ));			
		} else {
			//ok so we want to enable the entire admin
			add_action( 'wp_ajax_event_list_save_state', array( $this, 'event_list_save_state_callback' ));
			add_action( 'wp_ajax_event_list_load_state', array( $this, 'event_list_load_state_callback' ));
			add_action( 'action_hook_espresso_help', array( $this, 'help_tab_links' ), 10, 4 );
			add_action( 'admin_bar_menu', array( $this, 'espresso_toolbar_items' ), 100 );
			add_action( 'edit_post', array( $this, 'parse_post_content_on_save' ), 100, 2 );
			// bring out the pidgeons!!!
			$this->EE->load_core( 'messages_init' );
		}
		
		// run the admin page factory but ONLY if we are doing an ee admin ajax request
		if ( !defined('DOING_AJAX') || EE_ADMIN_AJAX ) {
			try {
				//this loads the controller for the admin pages which will setup routing etc
				$this->EE->load_core( 'Admin_Page_Loader' );
			} catch ( EE_Error $e ) {
				$e->get_error();
			}			
		}
		
	}




	/**
	* admin_init
	* 
	* @access public
	* @return void
	*/
	public function admin_init() {
		// pew pew pew
		$this->EE->load_core( 'PUE' );		
	}



	/**
	* event_list_save_state_callback
	* 
	* @access public
	* @return void
	*/
	public function event_list_save_state_callback() {
		check_ajax_referer('event_list_state', 'nonce');
		update_user_meta($_POST['user'], 'event_list_state', $_POST['data']);
		die(); // this is required to return a proper result
	}



	/**
	* event_list_load_state_callback
	* 
	* @access public
	* @return void
	*/
	public function event_list_load_state_callback() {
		check_ajax_referer('event_list_state', 'nonce');
		echo json_encode(get_user_meta($_POST['user'], 'event_list_state', true));
		die(); // this is required to return a proper result
	}



	/**
	* wp_loaded
	* 
	* @access public
	* @return void
	*/
	public function wp_loaded() {
		$this->check_no_ticket_prices_array();
		
	}



	/**
	 * 	check_no_ticket_prices_array
	 *
	 *  @access 	private
	 *  @return 	string
	 */
	private function check_no_ticket_prices_array() {
		$espresso_no_ticket_prices = get_option( 'espresso_no_ticket_prices', FALSE );
		//printr( $espresso_no_ticket_prices, '$espresso_no_ticket_prices  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		if ( $espresso_no_ticket_prices ) {
			$no_ticket_prices_msg = __( '<strong>Warning!</strong> The following events have no ticket prices set for them and will therefore not allow registrations:', 'event_espresso' );
			foreach ( $espresso_no_ticket_prices as $EVT_ID => $event_name ) {
				if ( empty( $EVT_ID )) {
					unset( $espresso_no_ticket_prices[ $EVT_ID ] );
				} else {
					$edit_event_url = EE_Admin_Page::add_query_args_and_nonce( array( 'page'=>'espresso_events', 'action'=>'edit_event', 'EVT_ID'=>$EVT_ID ),  admin_url( 'admin.php?' ));
					$event_name = stripslashes( htmlentities( $event_name, ENT_QUOTES, 'UTF-8' ));
					$no_ticket_prices_msg .= '<br/><a href="' . $edit_event_url . '" title="' . sprintf( __( 'Edit Event: %s', 'event_espresso' ), $event_name ) .'">' .  wp_trim_words( $event_name, 30, '...' ) . '</a>';
				}
			}
			$no_ticket_prices_msg .= '<br/>' . __( 'click on the event name to go to the event editor and correct this issue.', 'event_espresso' );
			EE_Error::add_error( $no_ticket_prices_msg, __FILE__, __FUNCTION__, __LINE__ );
			add_action( 'admin_notices', 'display_admin_notice' );
			update_option( 'espresso_no_ticket_prices', $espresso_no_ticket_prices );
		}
	}



	/**
	 * 	display_admin_notices
	 *
	 *  @access 	public
	 *  @return 	string
	 */
	public function display_admin_notices() {
		echo EE_Error::get_notices();
	}





	/**
	 * 	help_tab_links
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function help_tab_links( $help_tab = FALSE, $action = FALSE, $page = FALSE, $help_text = '' ) {
		
		if ( ! $page ) {
			$page = isset( $_REQUEST['page'] ) && ! empty( $_REQUEST['page'] ) ? sanitize_key( $_REQUEST['page'] ) : $page;
		}
		
		if ( ! $action ) {
			$action = isset( $_REQUEST['action'] ) && ! empty( $_REQUEST['action'] ) ? sanitize_key( $_REQUEST['action'] ) : $action;
		}

		if ( ! $help_tab ) {
			$help_tab = isset( $_REQUEST['action'] ) && ! empty( $_REQUEST['action'] ) ? sanitize_key( $_REQUEST['action'] ) . '_help_tab' : $help_tab;
		}
		
	//	echo '<h4>$page : ' . $page . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
	//	echo '<h4>$action : ' . $action . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
	//	echo '<h4>$help_tab : ' . $help_tab . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
		
		$help_tab_lnk = $page . '-' . $action . '-' . $help_tab;
		$icon_style = empty( $help_text ) ? ' help_img' : '';
		$help_text = ! empty( $help_text ) ? $help_text : 'click for help';
	//	$help_icon_img = $custom_image ? $custom_image : '<img src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/subtle_help.png" width="16" height="16" alt="help" />';
		
		echo '
		<a id="' . $help_tab_lnk . '" class="espresso-help-tab-lnk' . $icon_style . '" title="click to open the \'Help\' tab for more information about this feature" > ' . $help_text . ' </a>';
	}



	/**
	 * 	espresso_toolbar_items
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function espresso_toolbar_items($admin_bar) {

		do_action('AHEE_log', __FILE__, __FUNCTION__, '');
		$menu_class = 'espresso_menu_item_class';

		//Top Level
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar',
				'title' => '<span class="ab-icon-espresso"></span><span class="ab-label">' . _x('Event Espresso', 'admin bar menu group label') . '</span>',
				'href' => EVENTS_ADMIN_URL,
				'meta' => array(
						'title' => __('Event Espresso'),
						'class' => $menu_class . 'first'
				),
		));

		//Events
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar-events',
				'parent' => 'espresso-toolbar',
				'title' => 'Events',
				'href' => EVENTS_ADMIN_URL,
				'meta' => array(
						'title' => __('Events'),
						'target' => '',
						'class' => $menu_class
				),
		));

		//Events Add New
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar-events-new',
				'parent' => 'espresso-toolbar-events',
				'title' => 'Add New',
				'href' => EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'create_new' ), EVENTS_ADMIN_URL ),
				'meta' => array(
						'title' => __('Add New'),
						'target' => '',
						'class' => $menu_class
				),
		));

		//Events View
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar-events-view',
				'parent' => 'espresso-toolbar-events',
				'title' => 'View',
				'href' => EVENTS_ADMIN_URL,
				'meta' => array(
						'title' => __('View'),
						'target' => '',
						'class' => $menu_class
				),
		));

		//Events View All
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar-events-all',
				'parent' => 'espresso-toolbar-events-view',
				'title' => 'All',
				'href' => EVENTS_ADMIN_URL,
				'meta' => array(
						'title' => __('All'),
						'target' => '',
						'class' => $menu_class
				),
		));

		//Events View Today
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar-events-today',
				'parent' => 'espresso-toolbar-events-view',
				'title' => 'Today',
				'href' => EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'default', 'status'=>'today' ), EVENTS_ADMIN_URL ),
				'meta' => array(
						'title' => __('Today'),
						'target' => '',
						'class' => $menu_class
				),
		));

		//Events View This Month
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar-events-month',
				'parent' => 'espresso-toolbar-events-view',
				'title' => 'This Month',
				'href' => EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'default', 'status'=>'month' ), EVENTS_ADMIN_URL ),
				'meta' => array(
						'title' => __('This Month'),
						'target' => '',
						'class' => $menu_class
				),
		));

		//Registration Overview
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar-registrations',
				'parent' => 'espresso-toolbar',
				'title' => 'Registrations',
				'href' => REG_ADMIN_URL,
				'meta' => array(
						'title' => __('Registrations'),
						'target' => '',
						'class' => $menu_class
				),
		));

		//Registration Overview Today
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar-registrations-today',
				'parent' => 'espresso-toolbar-registrations',
				'title' => 'Today',
				'href' => EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'default', 'status'=>'today' ), REG_ADMIN_URL ),
				'meta' => array(
						'title' => __('Today'),
						'target' => '',
						'class' => $menu_class
				),
		));

		//Registration Overview Today Completed
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar-registrations-today-approved',
				'parent' => 'espresso-toolbar-registrations-today',
				'title' => 'Approved',
				'href' => EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'default', 'status'=>'today', 'reg_status'=>'RAP' ), REG_ADMIN_URL ),
				'meta' => array(
						'title' => __('Approved'),
						'target' => '',
						'class' => $menu_class
				),
		));

		//Registration Overview Today Pending
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar-registrations-today-pending',
				'parent' => 'espresso-toolbar-registrations-today',
				'title' => 'Pending',
				'href' => EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'default', 'status'=>'today', 'reg_status'=>'RPN' ), REG_ADMIN_URL ),
				'meta' => array(
						'title' => __('Pending'),
						'target' => '',
						'class' => $menu_class
				),
		));

		//Registration Overview Today Incomplete
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar-registrations-today-not-approved',
				'parent' => 'espresso-toolbar-registrations-today',
				'title' => 'Not Approved',
				'href' => EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'default', 'status'=>'today', 'reg_status'=>'RNA' ), REG_ADMIN_URL ),
				'meta' => array(
						'title' => __('Not Approved'),
						'target' => '',
						'class' => $menu_class
				),
		));

		//Registration Overview Today Incomplete
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar-registrations-today-cancelled',
				'parent' => 'espresso-toolbar-registrations-today',
				'title' => 'Cancelled',
				'href' => EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'default', 'status'=>'today', 'reg_status'=>'RCN' ), REG_ADMIN_URL ),
				'meta' => array(
						'title' => __('Cancelled'),
						'target' => '',
						'class' => $menu_class
				),
		));

		//Registration Overview This Month
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar-registrations-month',
				'parent' => 'espresso-toolbar-registrations',
				'title' => 'This Month',
				'href' => EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'default', 'status'=>'month' ), REG_ADMIN_URL ),
				'meta' => array(
						'title' => __('This Month'),
						'target' => '',
						'class' => $menu_class
				),
		));

		//Registration Overview This Month Approved
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar-registrations-month-approved',
				'parent' => 'espresso-toolbar-registrations-month',
				'title' => 'Approved',
				'href' => EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'default', 'status'=>'month', 'reg_status'=>'RAP' ), REG_ADMIN_URL ),
				'meta' => array(
						'title' => __('Approved'),
						'target' => '',
						'class' => $menu_class
				),
		));

		//Registration Overview This Month Pending
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar-registrations-month-pending',
				'parent' => 'espresso-toolbar-registrations-month',
				'title' => 'Pending',
				'href' => EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'default', 'status'=>'month', 'reg_status'=>'RPN' ), REG_ADMIN_URL ),
				'meta' => array(
						'title' => __('Pending'),
						'target' => '',
						'class' => $menu_class
				),
		));
		
		//Registration Overview This Month Not Approved
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar-registrations-month-not-approved',
				'parent' => 'espresso-toolbar-registrations-month',
				'title' => 'Not Approved',
				'href' => EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'default', 'status'=>'month', 'reg_status'=>'RNA' ), REG_ADMIN_URL ),
				'meta' => array(
						'title' => __('Not Approved', 'event_espresso' ),
						'target' => '',
						'class' => $menu_class
				),
		));

		//Registration Overview This Month Cancelled
		$admin_bar->add_menu(array(
				'id' => 'espresso-toolbar-registrations-month-cancelled',
				'parent' => 'espresso-toolbar-registrations-month',
				'title' => 'Cancelled',
				'href' => EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'default', 'status'=>'month', 'reg_status'=>'RCN' ), REG_ADMIN_URL ),
				'meta' => array(
						'title' => __('Cancelled'),
						'target' => '',
						'class' => $menu_class
				),
		));
	}


	/**
	 * 	parse_post_content_on_insert
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function parse_post_content_on_save( $post_ID, $post ) {
		// default post types
		$post_types = array( 'post' => 0, 'page' => 1 );
		// add CPTs
		$CPTs = EE_Register_CPTs::get_CPTs();
		$post_types = array_merge( $post_types, $CPTs );
//		printr( $post_types, '$post_types  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

		// for default or CPT posts...
		if ( isset( $post_types[ $post->post_type ] )) {
//			echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
			// post on frontpage ?
			$show_on_front = get_option('show_on_front');
			$update_post_shortcodes = FALSE;
			$this->EE->CFG->core->post_shortcodes = isset( $this->EE->CFG->core->post_shortcodes ) ? $this->EE->CFG->core->post_shortcodes : array();
			$this->EE->CFG->core->post_shortcodes[ $post->post_name ] = array();
			// loop thru shortcodes
			foreach ( $this->EE->shortcodes as $EES_Shortcode => $shortcode_dir ) {
				// strip class prefix and convert to UPPERCASE
				$EES_Shortcode = strtoupper( $EES_Shortcode );
				//$shortcode = strtoupper( str_replace( 'EES_', '', $EES_Shortcode ));
				// is the shortcode in the post_content ?
				if ( strpos( $post->post_content, $EES_Shortcode ) !== FALSE ) {
					// map shortcode to post
					$this->EE->CFG->core->post_shortcodes[ $post->post_name ][ $EES_Shortcode ] = $post_ID;
					// and to frontpage in case it's displaying latest posts
					$this->EE->CFG->core->post_shortcodes[ $show_on_front ][ $EES_Shortcode ] = $post_ID;
					$update_post_shortcodes = TRUE;
				} 
			}
//			printr( $this->EE->CFG->core->post_shortcodes, '$this->EE->CFG->core->post_shortcodes  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
			
			if ( $update_post_shortcodes ) {
				$this->EE->CFG->update_post_shortcodes();
			}			
		}
	}



	/**
	 * 	espresso_admin_footer
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public function espresso_admin_footer() {
		return sprintf( 
			__( 'Event Registration and Ticketing Powered by %sEvent Registration Powered by Event Espresso%s', 'event_espresso' ),
			'<a href="http://eventespresso.com/" title="',
			'">' . EVENT_ESPRESSO_POWERED_BY . '</a>'
		);
	}





}
// End of file EE_Admin.core.php
// Location: /core/admin/EE_Admin.core.php