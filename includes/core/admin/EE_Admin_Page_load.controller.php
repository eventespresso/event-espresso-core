<?php
if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for Wordpress
 *
 * @package		Event Espresso
 * @author		Seth Shoultes
 * @copyright	(c)2009-2012 Event Espresso All Rights Reserved.
 * @license		http://eventespresso.com/support/terms-conditions/  ** see Plugin Licensing **
 * @link		http://www.eventespresso.com
 * @version		3.2.P
 *
 * ------------------------------------------------------------------------
 *
 * EE_Admin_Page_load
 *
 * This is a controller class used for initializing the Event Espresso Admin system
 *
 * @package		EE_Admin_Page_load
 * @subpackage	core/admin
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */

class EE_Admin_Page_load {

	/**
	 * _installed_pages
	 * objects for page_init objects detected and loaded
	 * @access private
	 * @var array
	 */
	private $_installed_pages = array();



	/**
	 * _prepped_installed_pages
	 * This is the prepared array of installed pages for adding to the admin_menu.
	 * @access private
	 * @var array
	 */
	private $_prepped_installed_pages = array();




	/**
	 * _admin_menu_groups
	 * array that holds the group headings and details for 
	 * @access private
	 * @var array
	 */
	private $_admin_menu_groups = array();






	/**
	 * constructor
	 *
	 * @access public
	 * @return void
	 */
	public function __construct() {
		//first define global EE_Admin constants
		$this->_define_all_constants();

		//define the default "groups" for the admin_pages
		$this->_set_menu_groups();


		//let's do a scan and see what installed pages we have
		$this->_get_installed_pages();

		//set menus (has to be done on every load - we're not actually loading the page just setting the menus and where they point to).
		$this->_set_menus();

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
		define( 'EE_CORE_ADMIN_URL', EVENT_ESPRESSO_PLUGINFULLURL . 'includes' . DS . 'core' . DS . 'admin' . DS );
		define( 'WP_AJAX_URL', get_bloginfo('url') . '/wp-admin/admin-ajax.php' );
		define( 'JQPLOT_URL', EVENT_ESPRESSO_PLUGINFULLURL . 'scripts/jqplot/' );
	}



	

	/**
	 * _set_menu_groups
	 * sets the filterable _admin_menu_groups property (list of various "groupings" within the EE admin menu array)
	 *
	 * @access private
	 * @return void
	 */
	private function _set_menu_groups() {
		$groups = array(
			'main' => array(
				'title' => __('Main', 'event_espresso'),
				'show_heading' => FALSE
				),
			'management' => array(
				'title' => __('Management', 'event_espresso'),
				'show_heading' => TRUE
				),
			'settings' => array(
				'title' => __('Settings', 'event_espresso'),
				'show_heading' => TRUE
				),
			'templates' => array(
				'title' => __('Templates', 'event_espresso'),
				'show_heading' => TRUE
				),
			'extras' => array(
				'title' => __('Extras', 'event_espresso'),
				'show_heading' => TRUE
				)
			);

		$this->_admin_menu_groups = apply_filters( 'filter_hook_espresso_admin_menu_groups', $groups );
	}




	/**
	 * _get_installed_pages
	 * This just gets the list of installed EE_Admin_pages.
	 *
	 * @access private
	 * @return void 
	 */
	private function _get_installed_pages() {
		$installed_refs = array();
		// grab everything in the  admin core directory
		if ( $admin_screens = glob( EE_CORE_ADMIN . '*' ) ) {
			foreach( $admin_screens as $admin_screen ) {
				// files and anything in the exclude array need not apply
				if ( is_dir( $admin_screen ) && ! in_array( $admin_screen, $exclude )) {
					// these folders represent the different EE admin pages
					$installed_refs[] = basename( $admin_screen );
				}
			}
		}

		if ( empty( $installed_refs ) ) {
			$error_msg = __('There are no EE_Admin pages detected, it looks like EE did not install properly', 'event_espresso');
			throw new EE_Error($error_msg);
		}

		//allow plugins to add in their own pages (note at this point they will need to have an autoloader defined for their class);
		$installed_refs = apply_filters( 'filter_hook_espresso_admin_pages_array', $installed_refs );

		//loop through admin pages and setup the $_installed_pages array.
		foreach ( $installed_refs as $page ) {
			$this->_installed_pages[$page] = $this->_load_admin_page( $page );
		}
	}



	/**
	 * _load_admin_page
	 * Loads and instantiates page_init object for a single EE_admin page.
	 * @param  string $page page_reference
	 * @return object|bool  return page object if valid, bool false if not.
	 */
	private function _load_admin_page( $page ) {
		$page = strtolower( $page );
		$class_name = $page . '_Admin_Page_Init';

		if ( !class_exists($class_name ) ) {
			$error_msg = sprintf( __('Something went wrong with loading the %s admin page.', 'event_espresso' ), $page);
			$error_msg .= '||' . $error_msg . sprintf( __( 'There is no Init class in place for the %s admin page.  Make sure you have <strong>%s</strong> defined. If this is a non-EE-core admin page then you also must have an autoloader in place for your class', 'event_espresso'), $page, $class_name );
			throw new EE_Error($error_msg);
		}

		$a = new ReflectionClass($page_class);
		$p_obj = $a->newInstance();
		return $p_obj;
	}	

	/**
	 * _set_menus
	 * This method setsup the menus for EE Admin Pages
	 *
	 * @access private
	 * @return void
	 */
	private function _set_menus() {
		//prep the pages (sort, group, set if display etc.)
		$this->_prep_pages();
		
		//todo: We need to setup the initial main menu (which will be based off of the initial item in the _prepped_installed_pages property.  Then for each subsequent page we need to add the submenu item. NOTE, if the value of the _prepped_installed_pages is an array, then that means this is a header, not an object so handle accordingly.

		foreach ( $this->_installed_pages as $installed_page ) {
			$a = new ReflectionClass( $installed_page );
			$EE_Admin = $a->newInstance(); //note this won't load everything if there is not page request.  In that case it just sets the properties we need here. However, if it IS a page request (and the page request matches the slug for the page then the object will load everything - including js, screen_options etc.).
			$parent_slug = 'events';
			$wp_page_slug = add_submenu_page( $parent_slug, $EE_Admin->label, $EE_Admin->menu_label, $EE_Admin->capability, $EE_Admin->menu_slug, array($EE_Admin, 'route_admin_request') );
			$EE_Admin->set_wp_page_slug($wp_page_slug);
		}
	}




	
	/**
	 * _prep_pages
	 * sets the _prepped_installed_pages property
	 * 
	 * @access private
	 * @return void 
	 */
	private function _prep_pages() {
		$pages_array = array();

		//loop through each page object and assign those marked "show_menu" into their respective groups.
		foreach ( $this->_installed_pages as $slug => $page ) {
			//get map for page
			$page_map = $page->get_menu_map();

			//if not in menu let's unset (via continue)
			if ( !$page_map['show_on_menu'] )
				continue;
			
			//assign to group
			$pages_array[$page_map['group']][] = $page;
		}

		if ( empty( $pages_array ) )
			throw new EE_Error(__('Something went wrong when prepping the admin pages', 'event_espresso') );

		//let's sort the groups, make sure it's a valid group, add header (if to show), then 
		foreach ( $pages_array as $group => $pages ) {
			//valid group?
			if (  !array_key_exists( $group, $this->_admin_menu_groups ) )
				continue;

			//first sort
			usort( $pages, array($this, '_sort_pages' ) );

			//prepend header but only if header is to show.
			if ( $this->_admin_menu_groups[$group]['show_heading'] ) {
				array_unshift( $pages, $this->_admin_menu_groups[$group] );
			}

			//reset $pages_array with prepped data
			$pages_array[$group] = $pages;
		}

		//now let's setup the _prepped_installed_pages property
		foreach ( $this->_admin_menu_groups as $group ) {
			array_push($this->_prepped_installed_pages, $pages_array[$group]);
		}

		
	}






	/**
	 * _sort_pages
	 * Utility method for sorting the _installed_pages (callback for usort php function)
	 * @param  object $a page object
	 * @param  object $b page object being compared to
	 * @return int    sort order
	 */
	private function _sort_pages($a, $b) {
		$apo = $a->get_menu_map();
		$bpo = $b->get_menu_map();
		if ( $apo['menu_order'] == $bpo['menu_order'] ) {
			return 0;
		}
		return ( $apo['menu_order'] < $bpo['menu_order'] ) ? -1 : 1;
	}


}// end class EE_Admin_Page_load