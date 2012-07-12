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
 *
 * Admin_Page_Init_Interface 
 * 
 * This is utilizes by all Admin_Page_Init child classes in order to define their require methods
 *
 * @package			Event Espresso
 * @subpackage	includes/core/admin/Admin_Page_Init.core.php
 * @author				Brent Christensen 
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
 * Admin_Page_Init class
 *
 * @package			Event Espresso
 * @subpackage	includes/core/admin/Admin_Page_Init.core.php
 * @author				Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class Admin_Page_Init {

	public static $_instance = NULL;
	
	protected $page_name = NULL;
	protected $page_slug = NULL;
	protected $capability = 'espresso_manager_general';
	protected $admin_init = NULL;
	protected $admin_page = NULL;





	/**
	*		private constructor to prevent direct creation
	*		@Constructor
	*		@access private
	*		@return void
	*/
	private function __construct() {}
	private function __clone() {}
 




	/**
	*		@singleton method used to instantiate class object
	*		@access public
	*		@return class instance
	*/	
	public static function &instance ( ) {
		// check if class object is instantiated
		if ( self::$_instance === NULL  or ! is_object( self::$_instance ) or ! is_a( self::$_instance, __CLASS__ )) {
			self::$_instance = new self();
			require_once( EE_CORE_ADMIN . DS . 'Admin_Page.core.php' );
		}
		return self::$_instance;
	}





	public function initialize_admin_page( $page_slug, $page_request ) {

		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		
		$this->page_slug = $page_slug;
		$this->page_name = ucwords( $this->page_slug );
		
		// find, load and instantiate admin page init file
		$path_to_init = EE_CORE_ADMIN . strtolower( $this->page_slug ) . DS . $this->page_name . '_Admin_Page_Init.core.php';
		if ( file_exists( $path_to_init )) {
			require_once( $path_to_init );
			$page_class =  ucwords( $this->page_slug ) . '_Admin_Page_Init';
			$this->admin_init = new $page_class( $this->page_slug );

			if ( $this->page_slug == $page_request ) {				
				// define requested admin page class name then load the file and instantiate
				$admin_page = $this->page_name . '_Admin_Page';
				$path_to_file = EE_CORE_ADMIN . strtolower( $this->page_slug ) . DS . $admin_page . '.core.php';
				if ( file_exists( $path_to_file )) {
					require_once( $path_to_file );
					$this->admin_page = new $admin_page();		
				}
				add_action( 'admin_init', array( &$this, 'add_assets' ));
			}
			// now hook into admin menu to add settings page for this page
			add_filter( $this->admin_init->get_admin_menu_filter_name(), array( &$this, 'create_admin_menu_subpage' ), $this->admin_init->get_admin_menu_order(), 2 );
		}	
	}





	/**
	*		create subpage within existing Event Espresso main menu 
	*		@access public
	*		@return void
	*/		
	public function create_admin_menu_subpage( $menu_section, $espresso_manager ) {

		$menu_section[$this->page_slug] = array(
					TRUE,
					'events',
					__( 'Event Espresso - ' . $this->page_name, 'event_espresso' ),
					__( $this->page_name, 'event_espresso' ),
					apply_filters( 
											'filter_hook_espresso_management_capability', 
											'administrator', 
											$espresso_manager[ $this->admin_init->get_page_access_capability() ] 
										),
					$this->page_slug,
					array( &$this->admin_page, 'route_admin_request' )
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
	
		global $ee_admin_page;

		// add debugging styles
		if ( WP_DEBUG ) {
			add_action('admin_head', array( &$this, 'add_xdebug_style' ));
		}
		// add some style
		add_action( 'admin_print_styles', array( &$this, 'load_core_admin_css' ));
		add_action( 'admin_print_styles-' . $ee_admin_page[$this->page_slug], array( &$this->admin_init, 'load_css' ), 20);
		// and make it dance
		add_action( 'admin_print_scripts', array( &$this, 'load_core_admin_js' ));			
		add_action( 'admin_print_scripts-' . $ee_admin_page[$this->page_slug], array( &$this->admin_init, 'load_js' ), 20);

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
		wp_enqueue_style('jquery-ui-style', EVENT_ESPRESSO_PLUGINFULLURL . 'css/ui-ee-theme/jquery-ui-1.8.16.custom.css');
	}





	/**
	*		load core admin js - scripts that apply to all admin pages
	* 
	*		@access 		public
	*		@return 		void
	*/	
	public function load_core_admin_js() {
		wp_enqueue_script('jquery-ui-core');
		wp_enqueue_script('jquery-ui-tabs');
		wp_enqueue_script('common');
		wp_enqueue_script('wp-lists');
		wp_enqueue_script('postbox');	
	}

}

	
// end of file:  includes/core/admin/Admin_Page_Init.core.php