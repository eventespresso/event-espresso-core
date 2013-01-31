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
	protected $_folder_name;
	protected $_file_name;
	protected $_wp_page_slug;


	//will hold page object.
	protected $_loaded_page_object;

	//load_page?
	private $_load_page;




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

		//set default capability
		$this->_set_capability();

		//global styles/scripts across all wp admin pages
		add_action('admin_enqueue_scripts', array($this, 'load_wp_global_scripts_styles'), 5 );

		//load initial stuff.
		$this->_set_file_and_folder_name();
		$this->_initialize_admin_page();
		$this->_register_hooks();

		//some global constants
		if ( !defined('EE_FF_HELPER') )
			define( 'EE_FF_HELPER', EVENT_ESPRESSO_PLUGINFULLPATH . '/helpers/EE_Form_Fields.helper.php');
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
	 * 		'parent_slug' => 'the_slug_for_the_parent_menu_item'
	 * )
	 * @abstract
	 * @access public 
	 * @return array see above description for format.
	 */
	abstract public function get_menu_map();





	/**
	 * This loads scripts and styles for the EE_Admin system that must be available on ALL WP admin pages (i.e. EE_menu items)
	 * @return void
	 */
	public function load_wp_global_scripts_styles() {
		/** STYLES **/
		//register
		wp_register_style('espresso_menu', EVENT_ESPRESSO_PLUGINFULLURL . 'css/admin-menu-styles.css');



		//enqueue
		wp_enqueue_style('espresso_menu');


		/** SCRIPTS **/
		//register
		


		//enqueue
		
	}




	


	/**
	 * this sets default properties (might be overridden in _set_init_properties);
	 *
	 * @access private
	 * @return  void
	 */
	private function _set_defaults() {
		$this->_file_name = $this->_folder_name = $this->_wp_page_slug = $this->capability = NULL;
		$this->show_on_menu = TRUE;
		$this->_load_page = FALSE;
	}



	protected function _set_capability() {
		$capability = empty($this->capability) ? 'administrator' : $this->capability;
		$this->capability = apply_filters('filter_hook_espresso_' . $this->menu_slug . '_capability', $capability);
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
		if ( !is_object( $this->_loaded_page_object) ) return;
		$this->_loaded_page_object->route_admin_request();
		return;
	}







	public function set_page_dependencies($wp_page_slug) {
		if ( !$this->_load_page ) return;

		if ( !is_object($this->_loaded_page_object) ) {
			$msg[] = __('We can\'t load the page because we\'re missing a valid page object that tells us what to load', 'event_espresso');
			$msg[] = $msg[0] . "\r\n" . sprintf( __('The custom slug you have set for this page is %s. This means we\'re looking for the class %s_Admin_Page (found in %s_Admin_Page.core.php) within your %s directory', 'event_espresso'), $this->_file_name, $this->_file_name, $this->_file_name, $this->menu_label);
			throw new EE_Error( implode( '||', $msg) );
		}

		$this->_loaded_page_object->set_wp_page_slug($wp_page_slug);
		$page_hook = 'load-' . $wp_page_slug;
		//hook into page load hook so all page specific stuff get's loaded.
		if ( !empty($wp_page_slug) )
			add_action($page_hook, array($this->_loaded_page_object, 'load_page_dependencies') );
	}



	/**
	 * all we're doing here is setting the $_file_name property for later use.
	 *
	 * @access private
	 * @return void
	 */
	private function _set_file_and_folder_name() {
		$bt = debug_backtrace();

		//we're using this to get the actual folder name of the CALLING class (i.e. the child class that extends this).  Why?  Because $this->menu_slug may be different than the folder name (to avoid conflicts with other plugins)
		$this->_folder_name = basename(dirname($bt[1]['file']));

		$this->_file_name = preg_replace( '/^ee/' , 'EE', $this->_folder_name );
		$this->_file_name = ucwords( str_replace('_', ' ', $this->_file_name) );
		$this->_file_name = str_replace(' ', '_', $this->_file_name);
	}


	/**
	 * This automatically checks if we have a hook class in the loaded child directory.  If we DO then we will register it with the appropriate pages.  That way all we have to do is make sure the file is named correctly and "dropped" in.  
	 * Example: if we wanted to set this up for Messages hooking into Events then we would do:  events_Messages_Hooks.class.php
	 * 
	 * @return void
	 */
	private function _register_hooks() {
		//get a list of files in the directory that have the "Hook" in their name
		if ( $hook_files = glob( EE_CORE_ADMIN . '*' . $this->_file_name . '_.Hooks.class.php' ) ) {
			foreach ( $hook_files as $file ) {
				//lets get the linked admin.
				$rel_admin = preg_replace('/_' . $this->_file_name . '_Hooks.class.php/', '', $file );
				$rel_admin = strtolower($rel_admin);
				$rel_admin_hook = 'filter_hook_espresso_do_other_page_hooks_' . $rel_admin;
				add_filter($rel_admin_hook, $file);
			}
		}
	}


	/**
	 * _initialize_admin_page
	 * @see  initialize_admin_page() for info
	 */
	protected function _initialize_admin_page() {
		//JUST CHECK WE'RE ON RIGHT PAGE.
		if ( !isset( $_REQUEST['page'] ) || $_REQUEST['page'] != $this->menu_slug )
			return; //not on the right page so let's get out.

		$this->_load_page = TRUE;

		//we don't need to do a page_request check here because it's only called via WP menu system.
		$admin_page = $this->_file_name . '_Admin_Page';
		
		// define requested admin page class name then load the file and instantiate
		$path_to_file = str_replace( array( '\\', '/' ), DS, EE_CORE_ADMIN . $this->_folder_name . DS . $admin_page . '.core.php' );
		if ( is_readable( $path_to_file )) {					
			
			/**
			 * This is a place where EE plugins can hook in to make sure their own files are required in the appropriate place
			 */
			do_action( 'action_hook_espresso_before_initialize_admin_page' );
			do_action( 'action_hook_espresso_before_initialize_admin_page_' . $this->menu_slug );
			require_once( $path_to_file );
			$a = new ReflectionClass( $admin_page );
			$this->_loaded_page_object = $a->newInstance();				
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
	

}

	
// end of file:  includes/core/admin/EE_Admin_Page_Init.core.php