<?php
/**
 * Contains class for EE Admin Menu objects
 *
 * @since 		4.4.0
 * @package 		Event Espresso
 * @subpackage 	admin
 */

/**
 * Defines the EE_Admin_Page sub menu object used in EE_Admin_Page_Loader for setting up EE Admin
 * menus.
 *
 * @since 		4.4.0
 * @package 		Event Espresso
 * @subpackage 	admin
 */
class EE_Admin_Page_Menu_Map  {

	/**
	 * The title for the menu item. (What shows up in the actual menu).
	 *
	 * @since 4.4.0
	 * @var string
	 */
	public $label;




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




	/**
	 * Whether this item is displayed in the menu or not.
	 * Sometimes an EE Admin Page needs to register itself but is not accessible via the WordPress
	 * admin menu.
	 *
	 * @since 4.4.0
	 * @var boolean
	 */
	public $show_on_menu = TRUE;




	/**
	 * Constructor.
	 *
	 * @since 4.4.0
	 *
	 * @param  array     $menu_args  {
	 *               An array of arguments used to setup the menu properties on construct.
	 *               @type string $label 		Menu Title.  Required.
	 *               @type string $parent_slug 		Slug for the parent of this menu.  Required.
	 *               @type string $capability		The capability required for this menu to be
	 *                     					displayed to the user. Optional. Default
	 *                     					'administrator'.
	 *               @type string $menu_slug		The slug name to refer to this menu by (should
	 *                     					be unique for this menu). Required.
	 *               @type string $menu_callback	The function to be called to output the content
	 *                     					for the admin page.  Required.
	 *               @type EE_Admin_Page_Init  $admin_init_page    The init page this menu item is
	 *                     					associated with.  This is used for setting
	 *                     					dependencies in the loader. Required.
	 *               @type string $menu_group	What group this menu belongs to. Required.
	 *               @type string $menu_order 	What order this menu item should appear in the 						  menu. (within the group it belongs to). Required.
	 *               @type bool  $show_on_menu	Whether menu shows in WP admin menu or not.
	 *                     					Optional. Default TRUE.
	 * }
	 * @return void
	 */
	public function __construct( $menu_args = array() ) {
		//verify that required keys are present in the incoming array.
		$expected = array( 'label', 'parent_slug', 'menu_slug', 'menu_callback', 'menu_group', 'menu_order', 'admin_init_page');
		$missing = array_diff( $expected, array_keys( (array) $menu_args ) );

		if ( !empty( $missing ) ) {
			throw new EE_Error( sprintf( __('EE_Admin_Page_Sub_Menu is missing some expected keys in the argument array.  The following keys are missing: %s', 'event_espresso'), implode(', ', $missing ) ) );
		}

		//made it here okay, so let's set the properties!
		foreach ( $menu_args as $prop => $value ) {
			if ( $prop == 'show_on_menu'  ) {
				$value = (bool) $value;
			} else if ( $prop == 'admin_init_page' &&  ! $this instanceof EE_Admin_Page_Menu_Group && ! $value instanceof EE_Admin_Page_Init ) {
				throw new EE_Error( sprintf( __('The value for the "admin_init_page" argument must be an instance of an EE_Admin_Page_Init object.  Instead %s was given as the value.', 'event_espresso'), $value ) );
			} else {
				$value = (string) $value;
			}

			$this->{$prop} = $value;

		}
	}

} //end EE_Admin_Page_Menu_Map




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


	/**
	 * Constructor.
	 *
	 * @since 4.4.0
 *
	 * @param  array     $menu_args  {
	 *               An array of arguments used to setup the menu group properties on construct.
	 *               @type string $label 		Menu Group Title.  Required.
	 *               @type string $parent_slug		Not used for menu groups.
	 *               @type string $capability		The capability required for this menu to be
	 *                     					displayed to the user. Optional. Default
	 *                     					'administrator'.
	 *               @type string $menu_slug		The slug name to refer to this menu by (should
	 *                     					be unique for this menu). Required.
	 *               @type string $menu_callback	Menu Group adds its own callback.
	 *               @type EE_Admin_Page_Init  $admin_init_page    Not used for menu groups.
	 *               @type string $menu_group	Will be set the same as the menu slug
	 *                     					automatically by menu groups.
	 *               @type string $menu_order 	Not used by Menu Groups
	 *               @type bool  $show_on_menu	Whether menu shows in WP admin menu or not.
	 *                     					Optional. Default TRUE.
	 * }
	 * @return void
	 */
	public function __construct( $menu_args = array() ) {
		//let's set defaults so that EE_Admin_Page_Menu_Map doesn't scream at us.
		$menu_args['parent_slug'] = '';
		$menu_args['menu_callback'] = array( $this, 'default_header_link' );
		$menu_args['admin_init_page'] = '';
		$menu_args['menu_group'] = !empty( $menu_args['menu_slug'] ) ? $menu_args['menu_slug'] : '';
		$menu_args['menu_order'] = 0;

		parent::__construct( $menu_args );
	}



	public function default_header_link() {
		return false;
	}


	public function group_link() {
		return '<span class="ee_menu_group"  onclick="return false;">' . $this->label . '</span>';
	}
}
