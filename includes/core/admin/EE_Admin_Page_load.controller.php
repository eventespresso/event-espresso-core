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
 * @version		4.0
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
	 * _caffeinated_extends
	 * This array is the generated configuration array for which core EE_Admin pages are extended (and the bits and pieces needed to do so).  This property is defined in the _set_caffeinated method.
	 * @var array
	 */
	private $_caffeinated_extends = array();



	/**
	 * _current_caf_extend_slug
	 * This property is used for holding the page slug that is required for referencing the correct _caffeinated_extends index when the corresponding core child EE_Admin_Page_init hooks are executed.
	 * @var array
	 */
	private $_current_caf_extend_slug;




	/**
	 * _caf_autoloader
	 * This property is used for holding an array of folder names of any NEW EE_Admin_Pages found in the caffeinated/new directory.  This array is then used to setup a corresponding dynamic autoloader for these pages classes.
	 * @var array
	 */
	private $_caf_autoloader = array();



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
	 * This property will hold the hook file for setting up the filter that does all the connections between admin pages.
	 * @var string
	 */
	public $hook_file;






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
		add_action('admin_menu', array($this, 'set_menus') );

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
		define( 'WP_ADMIN_PATH', ABSPATH . 'wp-admin/' );
		define( 'WP_AJAX_URL', get_bloginfo('url') . '/wp-admin/admin-ajax.php' );
		define( 'JQPLOT_URL', EVENT_ESPRESSO_PLUGINFULLURL . 'scripts/jqplot/' );
	}




	/**
	 * When caffeinated system is detected, this method is called to setup the caffeinated directory constants used by files in the caffeinated folder.
	 *
	 * @access private
	 * @return void
	 */
	private function _define_caffeinated_constants() {
		define( 'EE_CORE_CAF_ADMIN', EVENT_ESPRESSO_PLUGINFULLPATH . 'caffeinated/admin/');
		define( 'EE_CORE_CAF_ADMIN_URL', EVENT_ESPRESSO_PLUGINFULLURL . 'caffeinated/admin/');
		define( 'EE_CORE_CAF_ADMIN_NEW', EE_CORE_CAF_ADMIN . 'new/');
		define( 'EE_CORE_CAF_ADMIN_EXTEND', EE_CORE_CAF_ADMIN . 'extend/');
		define( 'EE_CORE_CAF_ADMIN_EXTEND_URL', EE_CORE_CAF_ADMIN_URL . 'extend/');
		define( 'EE_CORE_CAF_ADMIN_HOOKS', EE_CORE_CAF_ADMIN . 'hooks/');
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
				'show_heading' => FALSE,
				'slug' => 'main',
				'capability' => 'administrator'
				),
			'management' => array(
				'title' => __('Management', 'event_espresso'),
				'show_heading' => TRUE,
				'slug' => 'management',
				'capability' => 'administrator'
				),
			'settings' => array(
				'title' => __('Settings', 'event_espresso'),
				'show_heading' => TRUE,
				'slug' => 'settings',
				'capability' => 'administrator'
				),
			'templates' => array(
				'title' => __('Templates', 'event_espresso'),
				'show_heading' => TRUE,
				'slug' => 'templates',
				'capability' => 'administrator'
				),
			'extras' => array(
				'title' => __('Extras', 'event_espresso'),
				'show_heading' => TRUE,
				'slug' => 'extras',
				'capability' => 'administrator'
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
		$exclude = array( 'assets' );
		// grab everything in the  admin core directory
		if ( $admin_screens = glob( EE_CORE_ADMIN . '*', GLOB_ONLYDIR )) {
			foreach( $admin_screens as $admin_screen ) {
				// files and anything in the exclude array need not apply
				if ( is_dir( $admin_screen ) && !in_array( basename($admin_screen), $exclude )) {
					// these folders represent the different EE admin pages
					$installed_refs[] = basename( $admin_screen );
				}
			}
		}

		if ( empty( $installed_refs ) ) {
			$error_msg[] = __('There are no EE_Admin pages detected, it looks like EE did not install properly', 'event_espresso');
			$error_msg[] = $error_msg[0] . "\r\n" . sprintf( __('Check that the %s folder exists and is writable. Maybe try deactivating, then reactivating Event Espresso again.', 'event_espresso'), EE_CORE_ADMIN );
			throw new EE_Error( implode( '||', $error_msg ));
		}

		//this just checks the caffeinated folder and takes care of setting up any caffeinated stuff.
		$installed_refs = $this->_set_caffeinated($installed_refs);

		//allow plugins to add in their own pages (note at this point they will need to have an autoloader defined for their class);
		$installed_refs = apply_filters( 'filter_hook_espresso_admin_pages_array', $installed_refs );


		//loop through admin pages and setup the $_installed_pages array.
		foreach ( $installed_refs as $page ) {
			$this->_installed_pages[$page] = $this->_load_admin_page( $page );

			$extend = FALSE; //flag for register hooks on extended pages b/c extended pages use the default INIT.

			//now that we've got the admin_init objects... lets see if there are any caffeinated pages extending the originals.  If there are then let's hook into the init admin filter and load our extend instead.
			if ( isset( $this->_caffeinated_extends[$page] ) ) {
				$this->_current_caf_extend_slug = $page;
				$path_hook = 'filter_hooks_espresso_path_to_' . $this->_installed_pages[$page]->menu_slug . '_' . $this->_installed_pages[$page]->get_admin_page_name();
				$path_runtime = 'return "' . $this->_caffeinated_extends[$this->_current_caf_extend_slug]["path"] . '";';
				$page_hook = 'filter_hooks_espresso_admin_page_for_' . $this->_installed_pages[$page]->menu_slug . '_' . $this->_installed_pages[$page]->get_admin_page_name();
				$page_runtime = 'return "' . $this->_caffeinated_extends[$this->_current_caf_extend_slug]["admin_page"] . '";';

				$hook_function_path = create_function( '$path_to_file', $path_runtime);
				$hook_function_page = create_function( '$admin_page', $page_runtime );
				
				add_filter( $path_hook, $hook_function_path );
				add_filter( $page_hook, $hook_function_page );
			}

			//let's do the registered hooks
			$this->_installed_pages[$page]->register_hooks( $extend );
		}


		//we need to loop again to run any early code
		foreach ( $installed_refs as $page ) {
			$this->_installed_pages[$page]->do_initial_loads();
		}
	}







	/**
	 * _load_admin_page
	 * Loads and instantiates page_init object for a single EE_admin page.
	 * @param  string $page page_reference
	 * @return object|bool  return page object if valid, bool false if not.
	 */
	private function _load_admin_page( $page ) {
		$page = str_replace('_', ' ', strtolower( $page ) );
		$class_name = str_replace(' ', '_', ucwords($page) ) . '_Admin_Page_Init';
		//echo '<h4>$class_name : ' . $class_name . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
 
		if ( !class_exists($class_name )) {
			$error_msg[] = sprintf( __('Something went wrong with loading the %s admin page.', 'event_espresso' ), $page);
			$error_msg[] = $error_msg[0] . "\r\n" . sprintf( __( 'There is no Init class in place for the %s admin page.', 'event_espresso') . '<br />' . __( 'Make sure you have <strong>%s</strong> defined. If this is a non-EE-core admin page then you also must have an autoloader in place for your class', 'event_espresso'), $page, $class_name );
			throw new EE_Error( implode( '||', $error_msg ));
		}

		$a = new ReflectionClass($class_name);
		$p_obj = $a->newInstance();
		return $p_obj;
	}	

	/**
	 * set_menus
	 * This method setsup the menus for EE Admin Pages
	 *
	 * @access private
	 * @return void
	 */
	public function set_menus() {
		global $espresso_manager;
		//prep the pages (sort, group, set if display etc.)
		$this->_prep_pages();
		$parent_slug = 'espresso_events';
		$add_main_menu = true;

		//loop through prepped pages and hook into WP's menu functions
		$i=0;
		foreach ( $this->_prepped_installed_pages as $installed_page ) {
			if ( $i === 0 ) {
				//if initial menu item is a header let's temporarily store and continue.
				if ( is_array($installed_page) ) {
					$temp_ref = $installed_page;
					continue;
				}
			}
		
			//if we've got $add_main_menu || $temp_ref then we need to add_menu_page on current item
			if ( isset($temp_ref) || $add_main_menu ) {
				$title = __('Event Espresso', 'event_espresso');
					$wp_main_page_slug = add_menu_page( $title, $title, apply_filters('filter_hook_espresso_management_capability', 'administrator', $espresso_manager['espresso_manager_events']), $parent_slug, array($installed_page, 'initialize_admin_page'), EVENT_ESPRESSO_PLUGINFULLURL . 'images/events_icon_16.png');
				
				//make sure we add initial header if present
				if ( isset($temp_ref) ) {
					$wp_page_slug = add_submenu_page( $parent_slug, $temp_ref['title'], '<span class="ee_menu_group"  onclick="return false;">' . $temp_ref['title'] . '</span>', $temp_ref['capability'], $temp_ref['slug'], array($this, '_default_header_link') );
				}
			}

			//let's setup the submenu items
			$label = is_array($installed_page) ? $installed_page['title'] : $installed_page->label;
			$menu_label = is_array($installed_page) ? '<span class="ee_menu_group"  onclick="return false;">' . $installed_page['title'] . '</span>' : $installed_page->menu_label;
			$capability = is_array($installed_page) ? $installed_page['capability'] : $installed_page->capability;
			$menu_slug = is_array($installed_page) ? $installed_page['slug'] : $installed_page->menu_slug;
			$menu_func = is_array($installed_page) ? array($this, '_default_header_link') : array($installed_page, 'initialize_admin_page');
			
			
			$wp_page_slug = add_submenu_page( $parent_slug, $label, $menu_label, $capability, $menu_slug, $menu_func );

			if ( is_object($installed_page) ) {
				try {
					$installed_page->set_page_dependencies($wp_page_slug);
				} catch ( EE_Error $e) {
					$e->get_error();
				}
			}
			$add_main_menu = false;
			$i++;
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

		if ( empty( $pages_array )) {
			throw new EE_Error(__('Something went wrong when prepping the admin pages', 'event_espresso') );
		}

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
		foreach ( $this->_admin_menu_groups as $group => $details ) {
			if ( isset($pages_array[$group] ) )
				$this->_prepped_installed_pages = array_merge($this->_prepped_installed_pages , $pages_array[$group]);
		}

		
	}






	/**
	 * This method is the "workhorse" for detecting and setting up caffeinated functionality.
	 *
	 * In this method there are three checks being done:
	 * 1. Do we have any NEW admin page sets.  If we do, lets add them into the menu setup (via the $installed_refs array) etc.  (new page sets are found in caffeinated/new/{page})
	 * 2. Do we have any EXTENDED page sets.  Basically an extended EE_Admin Page extends the core {child}_Admin_Page class.  eg. would be caffeinated/extend/events/Extend_Events_Admin_Page.core.php and in there would be a class: Extend_Events_Admin_Page extends Events_Admin_Page.
	 * 3. Do we have any files just for setting up hooks into other core pages.  The files can be any name in "caffeinated/hooks" EXCEPT they need a ".class.php" extension and the file name must correspond with the classname inside.  These classes are instantiated really early so that any hooks in them are run before the corresponding apply_filters/do_actions that are found in any future loaded EE_Admin pages (INCLUDING caffeinated admin_pages)
	 *
	 * 
	 * 
	 * @param array $installed_refs the original installed_refs array that may contain our NEW EE_Admin_Pages to be loaded.
	 */
	private function _set_caffeinated( $installed_refs ) {

		//first let's check if there IS a caffeinated folder. If there is not then lets get out.
		if ( !is_dir( EVENT_ESPRESSO_PLUGINFULLPATH . 'caffeinated/admin' ) ) return $installed_refs;

		$this->_define_caffeinated_constants();

		$exclude = array();

		//okay let's setup an "New" pages first (we'll return installed refs later)
		if ( $new_admin_screens = glob( EE_CORE_CAF_ADMIN . 'new/*', GLOB_ONLYDIR ) ) {

			foreach( $new_admin_screens as $admin_screen ) {
				// files and anything in the exclude array need not apply
				if ( is_dir( $admin_screen ) && !in_array( basename($admin_screen), $exclude )) {
					// these folders represent the different NEW EE admin pages
					$installed_refs[] = basename( $admin_screen );
					$this->_caf_autoloader[] = array(
						'dir' => 'new',
						'folder' => basename( $admin_screen )
						);
				}
			}
		}

		//let's see if there are any EXTENDS to setup in the $_caffeinated_extends array (that will be used later for hooking into the _initialize_admin_age in the related core_init admin page)
		if ( $extends = glob( EE_CORE_CAF_ADMIN . 'extend/*', GLOB_ONLYDIR ) ) {
			foreach( $extends as $extend ) {
				if ( is_dir( $extend ) ) {
					$extend_ref = basename( $extend );
					//now let's make sure there is a file that matches the expected format
					$filename = str_replace(' ', '_', ucwords( str_replace('_', ' ', $extend_ref ) ) );
					$filename = 'Extend_' . $filename . '_Admin_Page';
					$this->_caffeinated_extends[$extend_ref]['path'] = str_replace( array( '\\', '/' ), DS, EE_CORE_CAF_ADMIN . 'extend' . DS . $extend_ref . DS . $filename . '.core.php' );
					$this->_caffeinated_extends[$extend_ref]['admin_page'] = $filename;
					$this->_caf_autoloader[] = array(
						'dir' => 'extend',
						'folder' => $extend_ref
						);/**/
				}
			}
		}

		//let's see if there are any HOOK files and instantiate them if there are (so that hooks are loaded early!).
		$ee_admin_hooks = array();
		if ( $hooks = glob( EE_CORE_CAF_ADMIN . 'hooks/*.class.php' ) ) {
			foreach ( $hooks as $hook ) {
				if ( is_readable( $hook ) ) {
					require_once EE_CORE_CAF_ADMIN . 'hooks/' . $hook;
					$classname = str_replace('.class.php', '', $hook);
					if ( class_exists( $classname ) ) {
						$a = new ReflectionClass( $classname );
						$ee_admin_hooks[] = $a->newInstance();
					}
				}
			}
		}

		//if we've got _caf_autoloaders set then let's register the autoloader method
		if ( !empty( $this->_caf_autoloader ) ) {
			spl_autoload_register(array( $this, 'caffeinated_autoloaders') );
		}

		return $installed_refs;

	}









	/**
	 * This method takes care of setting up the autoloader dynamically for any NEW EE_Admin pages found in the caffeinated folders.
	 *
	 * @access public
	 * @param  string $className in coming classname being called
	 * @return void
	 */
	public function caffeinated_autoloaders( $className ) {
		//let's setup an array of paths to check (for each subsystem)
		$root = EE_CORE_CAF_ADMIN;

		$dir_ref = array();
		foreach ( $this->_caf_autoloader as $pathinfo) {
			$dir_ref[$pathinfo['dir'] . DS . $pathinfo['folder'] . DS] = array('core', 'class');
		}

		//assemble a list of filenames
		foreach ( $dir_ref as $dir => $types ) {
			if ( is_array($types) ) {
				foreach ( $types as $type) {
					$filenames[] = ( $dir == 'root' ) ? $root . $className . '.' . $type . '.php' : $root . $dir . $className . '.' . $type . '.php';
				}
			} else {
				$filenames[] = ( $dir == 'root' ) ? $root . $className . '.' . $types . '.php' : $root . $dir . $className . '.' . $types . '.php';
			}
		}

		//now loop through assembled filenames and require as available
		foreach ( $filenames as $filename ) {
			if ( is_readable($filename) )
				require_once( $filename );
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


	/**
	 * _default_header_link
	 * This is just a dummy method to use with header submenu items
	 * @return bool false
	 */
	public function _default_header_link() {
		return false;
	}


}// end class EE_Admin_Page_load