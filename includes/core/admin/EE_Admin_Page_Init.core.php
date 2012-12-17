<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license				{@link http://eventespresso.com/support/terms-conditions/}   * see Plugin Licensing *
 * @ link					{@link http://www.eventespresso.com}
 * @ since		 		3.2.P
 *
 * ------------------------------------------------------------------------   
 */
interface Admin_Page_Init_Interface {
	function load_css();
	function load_js();
	function get_admin_menu_filter_name();
	function get_admin_menu_order();
	function get_page_access_capability();
}
/**
 * EE_Admin_Page_Init_Interface 
 * 
 * This is utilizes by all Admin_Page_Init child classes in order to define their require methods
 *
 * @package			Event Espresso
 * @subpackage		includes/core/admin/EE_Admin_Page_Init.core.php
 * @author				Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class EE_Admin_Page_Init {
	
	protected $page_name = NULL;
	protected $page_slug = NULL;
	protected $dir_name = NULL;
	protected $capability = 'espresso_manager_general';
	protected $admin_page = NULL;
	protected $is_biz_reports_tab = FALSE;
	// denotes that current request is for a UI (web facing page) - gets set to false when performing data updates, inserts, deletions etc, so that unecessary resources don't get loaded
	protected $_is_UI_request = TRUE;





	/**
	 * 		@Constructor
	 * 		@access public
	 * 		@return void
	 */
	private function __construct() {}



	/**
	 * 		_init
	 *		do some stuff upon instantiation 
	 * 		@access protected
	 * 		@return void
	 */
	protected function _init( $page_slug, $page_name, $dir_name, $page_request ) { 
		
//		echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		global $is_UI_request;
		// is this request for UI or backend 
		$this->_is_UI_request = $is_UI_request;
		// is the current request for a business reports tab ?
		$this->is_biz_reports_tab = ( isset( $_REQUEST['action'] ) && $_REQUEST['action'] == 'reports' ) ? TRUE : FALSE;
		// set some more vars and initialize admin page for current request
		$this->initialize_admin_page( $page_slug, $page_name, $dir_name, $page_request );	
	}





	/**
	*		instantiates page init files, adds admin menu filter, and instantiates requested page class
	*		@return void
	*/
	public function initialize_admin_page( $page_slug, $page_name, $dir_name, $page_request ) {

		//echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		
		$this->page_slug = $page_slug;
		$this->page_name = $page_name;
		$this->dir_name = $dir_name;

		// now hook into admin menu to add settings page for this page
		add_filter( $this->get_admin_menu_filter_name(), array( &$this, 'create_admin_menu_subpage' ), $this->get_admin_menu_order(), 2 );
		
		if ( $this->page_slug == $page_request ) {				
			$admin_page = $this->dir_name . '_Admin_Page';
			// define requested admin page class name then load the file and instantiate
			$path_to_file = str_replace( array( '\\', '/' ), DS, EE_CORE_ADMIN . $this->page_slug . DS . $admin_page . '.core.php' );
			if ( file_exists( $path_to_file )) {
				//echo '<h2>$path_to_file : ' . $path_to_file . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h2>';						
				require_once( $path_to_file );
				$a = new ReflectionClass( $admin_page );
				$this->admin_page = $a->newInstance( $this->_is_UI_request );						
			}
			if ( $this->_is_UI_request ) {
				add_action( 'admin_init', array( &$this, 'add_assets' ));
			}
		}

	}





	/**
	*		create subpage within existing Event Espresso main menu 
	*		@access public
	*		@return void
	*/		
	public function create_admin_menu_subpage( $menu_section, $espresso_manager ) {
			
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		$class = ! is_null( $this->admin_page ) ? $this->admin_page : $this->dir_name . '_Admin_Page';

		$menu_section[$this->page_slug] = array(
					TRUE,
					'events',
					__( 'Event Espresso - ' . $this->page_name, 'event_espresso' ),
					__( $this->page_name, 'event_espresso' ),
					apply_filters( 
											'filter_hook_espresso_management_capability', 
											'administrator', 
											$espresso_manager[ $this->get_page_access_capability() ] 
										),
					$this->page_slug,
					array( &$class, 'route_admin_request' )
				);
				
		return $menu_section;

	}






	/**
	*		load css and javascript
	* 
	*		@access 		public
	*		@return 		void
	*/	
	public function add_assets() {
	
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

		//global $ee_admin_page;

		// add debugging styles
		if ( WP_DEBUG ) {
			add_action('admin_head', array( &$this, 'add_xdebug_style' ));
		}
		// add some style
		add_action( 'admin_print_styles', array( &$this, 'load_core_admin_css' ));
		//add_action( 'admin_print_styles-' . $ee_admin_page[$this->page_slug], array( &$this, 'load_css' ), 20);
		add_action( 'admin_print_styles-event-espresso_page_' . $this->page_slug, array( &$this, 'load_css' ), 20);
		// and make it dance
		add_action( 'admin_print_scripts', array( &$this, 'load_core_admin_js' ));			
		//add_action( 'admin_print_scripts-' . $ee_admin_page[$this->page_slug], array( &$this, 'load_js' ), 20);
		add_action( 'admin_print_scripts-event-espresso_page_' . $this->page_slug, array( &$this, 'load_js' ), 20);

	}





	/**
	*		load enhanced xdebug styles for ppl like me with failing eyesight
	* 
	*		@access 		public
	*		@return 		void
	*/	
	public function add_xdebug_style() {
		echo '<style>.xdebug-error { font-size:1.5em; }</style>';
	}





	/**
	*		load core admin css - styles that apply to all admin pages
	* 
	*		@access 		public
	*		@return 		void
	*/	
	public function load_core_admin_css() {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		wp_register_style('ee_core_css', EE_CORE_ADMIN_URL . 'assets/ee-admin-page.css');
		wp_enqueue_style('jquery-ui-style', EVENT_ESPRESSO_PLUGINFULLURL . 'css/ui-ee-theme/jquery-ui-1.8.16.custom.css');
		wp_enqueue_style('ee_core_css');
	}





	/**
	*		load core admin js - scripts that apply to all admin pages
	* 
	*		@access 		public
	*		@return 		void
	*/	
	public function load_core_admin_js() {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		wp_register_script('ee_core_js', EE_CORE_ADMIN_URL . 'assets/ee-admin-page.js', array('jquery'), false, true);
		wp_enqueue_script('jquery-ui-core');
		wp_enqueue_script('jquery-ui-tabs');
		wp_enqueue_script('common');
		wp_enqueue_script('wp-lists');
		wp_enqueue_script('postbox');
		wp_enqueue_script('ee_core_js');	
	}
	
	
	function __clone() {}
	function __set( $a, $b ) {}
	function __get( $a ) {}
	

}

	
// end of file:  includes/core/admin/EE_Admin_Page_Init.core.php