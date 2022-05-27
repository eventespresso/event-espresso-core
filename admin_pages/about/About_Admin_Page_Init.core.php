<?php

use EventEspresso\core\domain\entities\admin\menu\AdminMenuItem;

/**
 * EE_About_Admin_Page_Init
 *
 * This is the admin page route to learn more about EE (and the first page users are taken to after new activation).
 *
 * @package            Event Espresso
 * @abstract
 * @subpackage         includes/admin_pages/about/EE_About_Admin_Page_Init.core.php
 * @author             Darren Ethier
 */
class About_Admin_Page_Init extends EE_Admin_Page_Init
{
    public function __construct()
    {
        // define some events related constants
        if (! defined('EE_ABOUT_PG_SLUG')) {
            define('EE_ABOUT_PG_SLUG', 'espresso_about');
            define('EE_ABOUT_LABEL', esc_html__('About', 'event_espresso'));
            define('EE_ABOUT_ADMIN', EE_ADMIN_PAGES . 'about/');
            define('EE_ABOUT_ADMIN_URL', admin_url('admin.php?page=' . EE_ABOUT_PG_SLUG));
            define('EE_ABOUT_TEMPLATE_PATH', EE_ABOUT_ADMIN . 'templates/');
            define('EE_ABOUT_ASSETS_URL', EE_ADMIN_PAGES_URL . 'about/assets/');
        }
        parent::__construct();
    }


    protected function _set_init_properties()
    {
        $this->label = esc_html__('About Event Espresso', 'event_espresso');
    }


    public function getMenuProperties(): array
    {
        return [
            'menu_type'               => AdminMenuItem::TYPE_MENU_SUB_ITEM,
            'menu_group'              => 'extras',
            'menu_order'              => 40,
            'show_on_menu'            => AdminMenuItem::DISPLAY_BLOG_AND_NETWORK,
            'parent_slug'             => 'espresso_events',
            'menu_slug'               => 'espresso_about',
            'menu_label'              => EE_ABOUT_LABEL,
            'capability'              => 'manage_options',
            'maintenance_mode_parent' => 'espresso_maintenance_settings',
        ];
    }
}
