<?php

use EventEspresso\core\domain\entities\admin\menu\AdminMenuItem;

/**
 * Venues_Admin_Page_Init
 *
 * This is the init for the EE Venue Admin Pages.  See EE_Admin_Page_CPT_Init (and EE_Admin_Page_Init) for method
 * inline docs.
 *
 *
 * @package         Venues_Admin_Page_Init
 * @subpackage      caffeinated/admin/new/Venues_Admin_Page_Init.core.php
 * @author          Darren Ethier
 */
class Venues_Admin_Page_Init extends EE_Admin_Page_CPT_Init
{
    public function __construct()
    {
        // define some event categories related constants
        if (! defined('EE_VENUES_PG_SLUG')) {
            define('EE_VENUES_PG_SLUG', 'espresso_venues');
            define('EE_VENUES_ADMIN_URL', admin_url('admin.php?page=' . EE_VENUES_PG_SLUG));
            define('EE_VENUES_ASSETS_URL', EE_ADMIN_PAGES_URL . 'venues/assets/');
            define('EE_VENUES_TEMPLATE_PATH', EE_ADMIN_PAGES . 'venues/templates/');
        }
        parent::__construct();
        $this->_folder_path = EE_ADMIN_PAGES . $this->_folder_name . '/';
    }


    protected function _set_init_properties()
    {
        $this->label      = esc_html__('Event Venues', 'event_espresso');
        $this->menu_label = esc_html__('Venues', 'event_espresso');
        $this->menu_slug  = EE_VENUES_PG_SLUG;
    }


    public function getMenuProperties(): array
    {
        return [
            'menu_type'       => AdminMenuItem::TYPE_MENU_SUB_ITEM,
            'menu_group'      => 'management',
            'menu_order'      => 40,
            'show_on_menu'    => AdminMenuItem::DISPLAY_BLOG_ONLY,
            'parent_slug'     => 'espresso_events',
            'menu_slug'       => EE_VENUES_PG_SLUG,
            'menu_label'      => esc_html__('Venues', 'event_espresso'),
            'capability'      => 'ee_read_venues',
        ];
    }
}
