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

/**
 * EE_Admin_Page_Init
 * 
 * This is utilizes by all Admin_Page_Init child classes in order to define their require methods
 *
 * @package			Event Espresso
 * @abstract
 * @subpackage		includes/core/admin/EE_Admin_Page_Init.core.php
 * @author			Brent Christensen, Darren Ethier 
 *
 * ------------------------------------------------------------------------
 */
abstract class EE_Admin_Page_Init extends EE_BASE {
	
	//identity properties (set in _set_defaults and _set_init_properties)
	public $label;
	public $menu_label;
	public $capability;
	public $menu_slug;
	public $show_on_menu;

	//set in _set_defaults
	protected $_dir_name;
	protected $_wp_page_slug;

	//will hold page object.
	protected $_loaded_page_object;




	/**
	 * 		@Constructor
	 * 		@access public
	 * 		@return void
	 */
	public function __construct() {
		//set global defaults
		$this->_set_defaults();

		//set properties that are always available with objects.
		$this->_set_init_properties();
	}




	/**
	 * _set_init_properties
	 * Child classes use to set the following properties:
	 * $label, $menu_label, $capability, $menu_slug, $show_on_menu
	 *
	 * @abstract
	 * @access protected
	 * @return void
	 */
	abstract protected function _set_init_properties();






	/**
	 * get_menu_map is a static function that child classes use to indicate the details of their placement on the menu (or even if they show up on the menu).
	 * The map is in an associative array with the following properties.
	 * array(
	 * 		'group' => 'what "group" this page should be listed with (see EE_Admin_Page_load for list of available groups',
	 * 		'menu_order' => 'what order the this page will appear in the list for that group - just a regular int value please'
	 * 		'show_on_menu' => 'bool indicating whether this page will appear in the EE admin navigation menu.'
	 * )
	 * @abstract
	 * @access public 
	 * @return array see above description for format.
	 */
	abstract public function get_menu_map();






	/**
	 * this sets default properties (might be overridden in _set_init_properties);
	 *
	 * @access private
	 * @return  void
	 */
	private function _set_defaults() {
		$this->dir_name = $this->_wp_page_slug = NULL;
		$this->show_on_menu = TRUE;
		$this->capability = 'administrator';
	}




	/**
	 * initialize_admin_page
	 * This method is what executes the loading of the specific page class for the given dir_name as called by the EE_Admin_Init class.
	 *
	 * @access  public
	 * @uses   _initialize_admin_page()	
	 * @param  string $dir_name directory name for specific admin_page being loaded.
	 * @return void         
	 */
	public function initialize_admin_page() {
		//let's check user access first
		$this->_check_user_access();

		//all is good. keep going then.
		$this->_initialize_admin_page();
	}




	/**
	 * _initialize_admin_page
	 * @see  initialize_admin_page() for info
	 */
	protected function _initialize_admin_page() {
		$this->dir_name = ucwords( str_replace('_', ' ', $this->menu_slug) );
		$this->dir_name = str_replace(' ', '_', $this->dir_name);

		//we don't need to do a page_request check here because it's only called via WP menu system.
		$admin_page = $this->dir_name . '_Admin_Page';
		// define requested admin page class name then load the file and instantiate
		$path_to_file = str_replace( array( '\\', '/' ), DS, EE_CORE_ADMIN . $this->menu_slug . DS . $admin_page . '.core.php' );
		if ( is_readable( $path_to_file )) {					
			
			/**
			 * This is a place where EE plugins can hook in to make sure their own files are required in the appropriate place
			 */
			do_action( 'action_hook_espresso_before_initialize_admin_page' );
			do_action( 'action_hook_espresso_before_initialize_admin_page_' . $this->menu_slug );

			require_once( $path_to_file );
			$a = new ReflectionClass( $admin_page );
			$this->_loaded_page_object = $a->newInstance();						
			$this->_loaded_page_object->set_wp_page_slug( $this->_wp_page_slug );
			$this->_loaded_page_object->route_admin_request();
		}

		do_action( 'action_hook_espresso_after_initialize_admin_page' );
		do_action( 'action_hook_espresso_after_initialize_admin_page_' . $this->menu_slug );
	}






	/**
	 * _check_user_access
	 * verifies user access for this admin page.  If no user access is available then let's gracefully exit with a WordPress die message.
	 * @return bool|die true if pass (or admin) wp_die if fail
	 */
	private function _check_user_access() {
		//note we want to make sure we never lock out administrators.
		if ( current_user_can( 'administrator' ) ) {
			return true;
		} elseif (!current_user_can( $this->capability ) ) {
			wp_die( __('You don\'t have access to this page.'), '', array( 'back_link' => true ) );
		}

		return true;
	}




	/**
	 * set_wp_page_slug
	 * sets the wp_page_slug ( as defined via add_submenu_page or add_menu_page ).
	 *
	 * @access  public
	 * @param string $slug this is the slug wp uses internally to identify the page.
	 * @return void
	 */
	public function set_wp_page_slug( $slug ) {
		$this->_wp_page_slug = $slug;
	}
	

}

	
// end of file:  includes/core/admin/EE_Admin_Page_Init.core.php