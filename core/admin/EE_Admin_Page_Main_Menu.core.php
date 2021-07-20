<?php

/**
 * This defines the menu map structure for a main menu item.
 *
 * @since       4.4.0
 * @package     Event Espresso
 * @subpackage  admin
 */
class EE_Admin_Page_Main_Menu extends EE_Admin_Page_Menu_Map
{

    /**
     * If included int incoming params, then this class will also register a Sub Menue Admin page with a different
     * subtitle than the main menu item.
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
     * @see    http://codex.wordpress.org/Function_Reference/add_menu_page#Parameters
     *        for what can be set for this property.
     * @var string
     */
    public $icon_url;


    /**
     * What position in the main menu order for the WP admin menu this menu item
     * should show.
     *
     * @since  4.4.0
     * @see    http://codex.wordpress.org/Function_Reference/add_menu_page#Parameters
     *        for what can be set for this property.
     * @var integer
     */
    public $position;


    /**
     * @throws EE_Error
     */
    public function __construct($menu_args)
    {
        $required = ['menu_label', 'parent_slug', 'menu_slug', 'menu_group', 'menu_order', 'admin_init_page'];

        parent::__construct($menu_args, $required);

        $this->position = ! empty($this->position) ? (int) $this->position : $this->position;
    }


    /**
     * Uses the proper WP utility for registering a menu page for the main WP pages.
     */
    protected function _add_menu_page()
    {
        $main = add_menu_page(
            $this->title,
            $this->menu_label,
            $this->capability,
            $this->parent_slug,
            $this->menu_callback,
            $this->icon_url,
            $this->position
        );
        if (! empty($this->subtitle)) {
            add_submenu_page(
                $this->parent_slug,
                $this->subtitle,
                $this->subtitle,
                $this->capability,
                $this->menu_slug,
                $this->menu_callback
            );
        }
        return $main;
    }
}
