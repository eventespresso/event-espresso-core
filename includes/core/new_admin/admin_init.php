<?php

//load admin settings pages
/**
 * This is a demonstration of what the new admin system for EE can be.  Of course, things will be broken out into their own files but for demonstration purposes I kept this very simple by including everything in this one file.
 */




function ee_init_admin_pages() {
	//this loads the controller for the admin pages which will setup routing etc.
	try {
		$EEAdmin = new EE_Admin_Page_init_eg();
	} catch (EE_Error $e) {
		$e->get_error();
	}
}
add_action('admin_menu', 'ee_init_admin_pages', 200);


//basic example of controller
class EE_Admin_Page_init_eg {

	//holds active page
	private $_active_page;

	//holds installed_pages (array of class names obtained from glob scan)
	private $_installed_pages = array();

	//holds an associative array of installed_pages hooks.  The key is the class name of the page (corresponds to installed_page). The value is the hook after setting the menu. Use in add_action("load-$hook, 'function_to_run_on_page_load');
	private $_installed_pages_hooks = array();


	public function __construct() {
		//first define global EE_Admin constants
		$this->_define_all_constants();

		//let's do a scan and see what installed pages we have
		$this->_get_installed_pages();

		//set menus (has to be done on every load - we're not actually loading the page just setting the menus and where they point to).
		$this->_set_menus();

	}

	private function _define_all_constants() {
		//just contains all constants that are set globally for EE_Admin pages.
		//eg
		define( 'EE_CORE_ADMIN_EXAMPLE', EE_CORE . 'admin' .DS );
	}

	private function _get_installed_pages() {
		//we'd do the typical glob here to get everything admin screens in core directly but I'll just manually set the example of one page for the purpose of our example. We'd also do our require_once() in here for each page.
		$this->_installed_pages = array('EE_Admin_example');
	}

	private function _set_menus() {
		//we can do some things for setting the order of the installed pages ie a usort or something utilizing a static EE_Admin_example::get_page_order(), something like
		//usort( $this->_installed_pages, array($this, _sort_pages) )
		//I know we need to work this into the existing setup and it's easy enough to do (just hook into the relevant filter.  Once everything is converted to the new system we can use static properties in the admin page classes to indicate if they are main or not (and we'd have to loop and sort accordingly..ie. all main pages would have to be added first).I'm assuming here that the MAIN eventespresso admin page has already been set.  

		foreach ( $this->_installed_pages as $installed_page ) {
			$a = new ReflectionClass( $installed_page );
			$EE_Admin = $a->newInstance(); //note this won't load everything if there is not page request.  In that case it just sets the properties we need here. However, if it IS a page request (and the page request matches the slug for the page then the object will load everything - including js, screen_options etc.).
			$parent_slug = 'events';
			$wp_page_slug = add_submenu_page( $parent_slug, $EE_Admin->label, $EE_Admin->menu_label, $EE_Admin->capability, $EE_Admin->menu_slug, array($EE_Admin, 'route_admin_request') );
			$EE_Admin->set_wp_page_slug($wp_page_slug);
		}
	}

	private function _sort_pages($a, $b) {
		$apo = $a::get_page_order();
		$bpo = $b::get_page_order();
		if ( $apo == $bpo ) {
			return 0;
		}
		return ( $apo < $bpo ) ? -1 : 1;
	}

}

//example parent class for ee_admin page in new system. much of the logic here will eventually be replicated from the existing "new" system but I'm not putting all of that in here for the initial demonstration.
//key thing to remember here is that everything running in here that hooks into WP systems run actions AFTER the admin_menu hook (which comes after plugins_loaded and init BUT before admin_init //see -> http://codex.wordpress.org/Plugin_API/Action_Reference);

abstract class EE_Admin_core_example {

	public $label;
	public $menu_label;
	public $capability;
	public $menu_slug;

	//protected
	protected $_default_nav_tab_name;
	protected $_is_UI_request;
	protected $_doing_AJAX;
	protected $_current_page;
	protected $_current_screen;
	protected $_wp_page_slug; //used for hooks.
	protected $_nav_tabs;
	protected $_admin_base_url;
	protected $_admin_page_title;
	protected $_template_args;
	protected $_view;
	protected $_views;
	protected $_page_routes;
	protected $_req_action;
	protected $_req_nonce;

	public function __construct() {

		//first we set properties that are always available when class is initialized (and use in EE_Admin_Page_init_eg)
		$this->_set_init_properties();

		//this just sets some defaults that child classes might redefine later (via _define_page_props);
		$this->_set_defaults();

		//next let's do other init stuff (and within it we check if valid page_request, if UI Request etc);
		$this->_page_setup();
	}

	/**
	 * child classes have to set the following properties:
	 * $label, $menu_label, $capability, $menu_slug
	 */
	abstract protected function _set_init_properties();

	abstract protected function _ajax_hooks();

	abstract protected function _define_page_props();
	abstract protected function _set_page_routes();
	abstract protected function _add_screen_options();
	abstract protected function _add_help_tabs();
	abstract public function load_scripts_styles();

	/**
	 * we really don't want child classes overriding this.
	 * @return void
	 */
	final protected function _page_setup() {

		//this needs to be set early because we need the ajax hooks available to any incoming ajax request.
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
		$this->_req_nonce = $this->_req_action . '_nonce';
		$this->_define_page_props();
		$this->_set_page_routes();

		if ( $this->_is_UI_request ) {
			//hook into page load hook so all necessary stuff shows up here.
			if ( !empty($this->_wp_page_slug) )
				add_action('load-' . $this->_wp_page_slug, array($this, '_load_page_dependencies') );
		}

	}

	/**
	 * This hook is run in the IDEAL place for a WP Admin page load because it runs right when WordPress has setup some prepopulated stuff (such as $current_screen global etc.).  It's also the BEST place to dependencies and run other stuff such as add_meta_box, add_screen_option, and other things.  ALSO, when wp_list_table stuff is run we'll have column info etc. for it in screen options tab.  
	 * We can also add in wp_help tabs -> http://codex.wordpress.org/Function_Reference/add_help_tab
	 * @return [type] [description]
	 */
	private function _load_page_dependencies() {
		$this->_current_screen = get_current_screen();
		//initialize template args etc in here
			

		//load admin_init hooks we'll probably copy pretty much what existing system does (i.e. meta_boxes etc).
		
		//load admin_notices
		

		//add screen options
		$this->_add_screen_options();

		//add help tab(s)
		$this->_add_help_tabs();

		//enqueue scripts/styles
		add_action('admin_enqueue_scripts', array($this, 'load_scripts_styles') );
	}

	private function _set_defaults() {
		$this->_doing_AJAX = FALSE; //this will be set to true by the called ajax method in our child classes
		$this->_admin_base_url = $this->_current_screen = $this->_admin_page_title = $this->_page_slug = $this->_wp_page_slug = $this->_req_action = $this->_req_nonce = NULL;

		$this->_nav_tabs = $this->_template_args = $this_views = $this->_page_routes = array();

		$this->default_nav_tab_name = 'overview';
	}

	public function route_admin_request() {
		try {
			$this->_route_admin_request();
		} catch ( EE_Error $e ) {
			$e->get_error();
		}
	}

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
			$error_msg = __('No page routes have been set for the ' . $this->_admin_page_title . ' admin page.', 'event_espresso');
			// developer error msg
			$error_msg .=  '||' . $error_msg . __( ' Make sure the "set_page_routes()" method exists, and is seting the "_page_routes" array properlly.', 'event_espresso' );
			throw new EE_Error( $error_msg );
		} 							
	
		// and that the requested page route exists 
		if ( array_key_exists( $this->_req_action, $this->_page_routes )) {
			$route = $this->_page_routes[ $this->_req_action ];
		} else {
			// user error msg
			$error_msg =  __('The requested page route does not exist for the ' . $this->_admin_page_title . ' admin page.', 'event_espresso');
			// developer error msg
			$error_msg .=  '||' . $error_msg . __( ' Create a key in the "_page_routes" array named "'.$this->_req_action.'" and set it\'s value to the appropriate method.', 'event_espresso' );
			throw new EE_Error( $error_msg );
		}

		// and that a default route exists
		if ( ! array_key_exists( 'default', $this->_page_routes )) {
			// user error msg
			$error_msg = __('A default page route has not been set for the ' . $this->_admin_page_title . ' admin page.', 'event_espresso');
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
				$error_msg .= '||' . __( 'Page route "' . $func . '" could not be called. Check that the spelling for method names and actions in the "_page_routes" array are all correct.', 'event_espresso' );
				throw new EE_Error( $error_msg );
			}				
		}
	}

	/**
	 * this sets the wp_page_slug (as set via add_submenu_page or add_menu_page), with this we can do other nifty stuff.
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

	

}// end class EE_Admin_core_example

class EE_Admin_example extends EE_Admin_core_example {

	public function __construct() {
		parent::__construct();
	}

	protected function _set_init_properties() {

		$this->label = __('EE Admin Core Example', 'event_espresso');
		$this->menu_label = __('EE Admin Page Test', 'event_espresso');
		$this->capability = 'administrator';
		$this->menu_slug = 'ee_admin_test_example';
	}

	protected function _ajax_hooks() {
		//demonstration, so no need to set this right now.
	}

	protected function _define_page_props() {
		$this->admin_page_title = $this->label;
		//demonstration, so we're not going to do this here.
	}

	protected function _add_screen_options() {
		//demonstration, so we're not going to do this here.
	}

	protected function _add_help_tabs() {
		//demonstration, so we're not going to do this here.
	}

	protected function _set_page_routes() {
		//gonna leave as an empty array for now (which will result in exceptions but that's the whole idea!)
		$this->_page_routes = array();
	}

	public function load_scripts_styles() {
		//demonstration, so empty for now. but in real world this would include your wp_enqueue_scripts(), wp_enqueue_styles() etc. needed for this particular admin page subset.
	}

} //end class EE_Admin_example