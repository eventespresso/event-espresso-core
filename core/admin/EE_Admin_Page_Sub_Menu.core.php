<?php

/**
 * Defines the menu map structure for sub menu pages.
 *
 * @since      4.4.0
 * @package    Event Espresso
 * @subpackage admin
 */
class EE_Admin_Page_Sub_Menu extends EE_Admin_Page_Main_Menu
{

    public function __construct($menu_args)
    {
        parent::__construct($menu_args);
    }


    protected function _add_menu_page()
    {
        return add_submenu_page(
            $this->parent_slug,
            $this->title,
            $this->menu_label,
            $this->capability,
            $this->menu_slug,
            $this->menu_callback
        );
    }
}
