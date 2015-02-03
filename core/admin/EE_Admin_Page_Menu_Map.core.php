<?php
/**
 * Contains class for EE Admin Menu objects
 *
 * @since 		4.4.0
 * @package 		Event Espresso
 * @subpackage 	admin
 */


/**
 * Abstract class for defining EE Admin Page Menu Map objects
 *
 * @since 		4.4.0
 * @package 		Event Espresso
 * @subpackage 	admin
 */
abstract class EE_Admin_Page_Menu_Map  {


	/**
	 * The title for the menu page. (the page the menu links to)
	 *
	 * @since  4.4.0
	 * @var string
	 */
	public $title;





	/**
	 * The label for the menu item. (What shows up in the actual menu).
	 *
	 * @since 4.4.0
	 * @var string
	 */
	public $menu_label;




	/**
	 * What menu item is the parent of this menu item.
	 *
	 * @since 4.4.0
	 * @var string
	 */
	public $parent_slug;




	/**
	 * What capability is required to access this page.
	 *
	 * @since 4.4.0
	 * @var string
	 */
	public $capability = 'administrator';




	/**
	 * What slug should be used to reference this menu item.
	 *
	 * @since 4.4.0
	 * @var string
	 */
	public $menu_slug;



	/**
	 * The callback for displaying the page that the menu references.
	 *
	 * @since 4.4.0
	 * @var string
	 */
	public $menu_callback;




	/**
	 * The EE_Admin_Page_Init attached to this map.
	 * @var EE_Admin_Page_Init
	 */
	public $admin_init_page;




	/**
	 * The EE specific group this menu item belongs in (group slug).
	 *
	 * @since 4.4.0
	 * @var string
	 */
	public $menu_group;




	/**
	 * What order this item should be in the menu.
	 *
	 * @since 4.4.0
	 * @var int
	 */
	public $menu_order;



	const NONE = 0;
	const BLOG_ADMIN_ONLY = 1;
	const BLOG_AND_NETWORK_ADMIN = 2;
	const NETWORK_ADMIN_ONLY = 3;


	/**
	 * Whether this item is displayed in the menu or not.
	 * Sometimes an EE Admin Page needs to register itself but is not accessible via the WordPress
	 * admin menu.
	 *
	 * @since 4.4.0
	 * @var int
	 */
	public $show_on_menu = self::BLOG_ADMIN_ONLY;


	/**
	 * Menu maps can define a parent slug that gets used instead of the main parent slug for the menu when EE_Maintenance_Mode::level_2_complete_maintenance is active.
	 *
	 * @var bool
	 */
	public $maintenance_mode_parent = '';






	/**
	 * Constructor.
	 *
	 * @since 4.4.0
	 *
	 * @param  array $menu_args  An array of arguments used to setup the menu
	 *                           		properties on construct.
	 * @param  array $required   	An array of keys that should be in the $menu_args, this
	 *                            		is used to validate that the items that should be defined
	 *                            		are present.
	 * @return void
	 */
	public function __construct( $menu_args, $required ) {
		//filter all args before processing so plugins can manipulate various settings for menus.
		$menu_args = apply_filters( 'FHEE__EE_Admin_Page_Menu_Map__construct__menu_args', $menu_args, $required, get_class( $this ) );


		//verify that required keys are present in the incoming array.
		$missing = array_diff( (array) $required, array_keys( (array) $menu_args ) );

		if ( !empty( $missing ) ) {
			throw new EE_Error( sprintf( __('%s is missing some expected keys in the argument array.  The following keys are missing: %s', 'event_espresso'), get_class( $this ), implode(', ', $missing ) ) );
		}

		//made it here okay, so let's set the properties!
		foreach ( $menu_args as $prop => $value ) {

			switch ( $prop ) {
				case 'show_on_menu' :
					$value = (int) $value;
					break;
				case 'admin_init_page' :
					if ( in_array( 'admin_init_page', $required ) && ! $value instanceof EE_Admin_Page_Init ) {
						throw new EE_Error( sprintf( __('The value for the "admin_init_page" argument must be an instance of an EE_Admin_Page_Init object.  Instead %s was given as the value.', 'event_espresso'), print_r($value, TRUE) ) );
					}
					break;
				case 'menu_callback' :
					break;

				default :
					$value = (string) $value;
					break;

			}
			if ( ! EEH_Class_Tools::has_property( $this, $prop ) )
				throw new EE_Error( sprintf( __('The $menu_args coming into %s has a index key (%s) representing a property that is not defined by the class.  Perhaps there is a typo?', 'event_espresso'), get_class( $this ), $prop ) );
			$this->{$prop} = $value;

		}

		//filter capabilities (both static and dynamic)
		$this->capability = apply_filters( 'FHEE_management_capability', $this->capability, NULL );
		$this->capability = apply_filters( 'FHEE_' . $this->menu_slug . '_capability', $this->capability, NULL );

		//Might need to change parent slug depending on maintenance mode.
		if ( ! empty( $this->maintenance_mode_parent ) && EE_Maintenance_Mode::instance()->level() == EE_Maintenance_Mode::level_2_complete_maintenance )  {
			$this->parent_slug = $this->maintenance_mode_parent;
		}

		//if empty menu_callback let's set default (but only if we have admin page init object)
		if ( empty( $this->menu_callback ) && $this->admin_init_page instanceof EE_Admin_Page_Init )
			$this->menu_callback = array( $this->admin_init_page, 'initialize_admin_page' );

	}


	/**
	 * This method should define how the menu page gets added for this particular item
	 * and go ahead and define it.  Note that child classes MUST also return the result of
	 * the function used to register the WordPress admin page (the wp_page_slug string)
	 *
	 * @since  4.4.0
	 * @return string wp_page_slug.
	 */
	abstract protected function _add_menu_page();


	/**
	 * Called by client code to use this menu map for registering a WordPress admin page
	 *
	 * @param boolean $network_admin whether this is being added to the network admin page or not
	 * @since  4.4.0
	 */
	public function add_menu_page( $network_admin = FALSE ) {

		$show_on_menu_int = (int) $this->show_on_menu;
		if( ( $network_admin && in_array( $show_on_menu_int, array( self::BLOG_AND_NETWORK_ADMIN, self::NETWORK_ADMIN_ONLY ), TRUE ) )
				||
			( ! $network_admin && in_array( $show_on_menu_int, array( self::BLOG_AND_NETWORK_ADMIN, self::BLOG_ADMIN_ONLY ), TRUE )) ){
			$wp_page_slug = $this->_add_menu_page();
		}else{
			$wp_page_slug = '';
		}

		if ( !empty( $wp_page_slug ) && $this->admin_init_page instanceof EE_Admin_Page_Init ) {
			try {
				$this->admin_init_page->set_page_dependencies( $wp_page_slug );
			} catch( EE_Error $e ) {
				$e->get_error();
			}
		}
	}

} //end EE_Admin_Page_Menu_Map




/**
 * This defines the menu map structure for a main menu item.
 *
 * @since  4.4.0
 * @package  Event Espresso
 * @subpackage  admin
 */
class EE_Admin_Page_Main_Menu extends EE_Admin_Page_Menu_Map {

	/**
	 * If included int incoming params, then this class will also register a Sub Menue Admin page with a different subtitle than the main menu item.
	 *
	 * @since 4.4.0
	 *
	 * @var string
	 */
	public $subtitle;

	/**
	 * The page to a icon used for this menu.
	 *
	 * @since  4.4.0
	 * @see http://codex.wordpress.org/Function_Reference/add_menu_page#Parameters
	 *      	for what can be set for this property.
	 * @var string
	 */
	public $icon_url;



	/**
	 * What position in the main menu order for the WP admin menu this menu item
	 * should show.
	 *
	 * @since  4.4.0
	 * @see http://codex.wordpress.org/Function_Reference/add_menu_page#Parameters
	 *      	for what can be set for this property.
	 * @var integer
	 */
	public $position;


	public function __construct( $menu_args ) {
		$required = array( 'menu_label', 'parent_slug', 'menu_slug', 'menu_group', 'menu_order', 'admin_init_page');

		parent::__construct( $menu_args, $required );

		$this->position = ! empty( $this->position ) ? (int) $this->position : $this->position;
	}


	/**
	 * Uses the proper WP utility for registering a menu page for the main WP pages.
	 */
	protected function _add_menu_page() {
		$main =  add_menu_page( $this->title, $this->menu_label, $this->capability, $this->parent_slug, $this->menu_callback, $this->icon_url, $this->position );
		if ( ! empty( $this->subtitle ) ) {
			add_submenu_page( $this->parent_slug, $this->subtitle, $this->subtitle, $this->capability, $this->menu_slug, $this->menu_callback );
		}
		return $main;
	}
} //end EE_Admin_Page_Main_Menu



/**
 * Defines the menu map structure for sub menu pages.
 *
 * @since 4.4.0
 * @package Event Espresso
 * @subpackage admin
 */
class EE_Admin_Page_Sub_Menu extends EE_Admin_Page_Main_Menu {

	public function __construct( $menu_args ) {
		parent::__construct( $menu_args );
	}


	protected function _add_menu_page() {
		return add_submenu_page( $this->parent_slug, $this->title, $this->menu_label, $this->capability, $this->menu_slug, $this->menu_callback );
	}

} //end class EE_Admin_Page_Menu_Map


/**
 * Defines the EE_Admin page menu group object used in EE_Admin_Page Loader for setting up EE
 * Admin menu groups.
 *
 * A menu group is a special heading that does not link to anything but allows for logical separate of
 * submenu elements.
 *
 * @since  		4.4.0
 * @package 		Event Espresso
 * @subpackage 	admin
 */
class EE_Admin_Page_Menu_Group extends EE_Admin_Page_Menu_Map {



	public function __construct( $menu_args = array() ) {
		$required = array( 'menu_label', 'menu_slug', 'menu_order', 'parent_slug' );
		parent::__construct( $menu_args, $required );
	}


	protected function _add_menu_page() {
		return add_submenu_page( $this->parent_slug, $this->menu_label, $this->_group_link(), $this->capability, $this->menu_slug, '__return_false' );
	}


	private function _group_link() {
		return '<span class="ee_menu_group"  onclick="return false;">' . $this->menu_label . '</span>';
	}
} //end EE_Admin_Page_Menu_Group
