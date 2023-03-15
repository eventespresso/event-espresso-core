<?php

use EventEspresso\core\domain\entities\admin\menu\AdminMenuItem;

/**
 * Support_Admin_Page_Init
 *
 * This is the init for the EE Support Admin Pages.  See EE_Admin_Page_Init for method inline docs.
 *
 *
 * @package         Support_Admin_Page_Init
 * @subpackage      includes/core/admin/Support_Admin_Page_Init.core.php
 * @author          Darren Ethier
 */
class Support_Admin_Page_Init extends EE_Admin_Page_Init
{
    public function __construct()
    {
        // define some help/support page related constants
        if (! defined('EE_SUPPORT_PG_SLUG')) {
            define('EE_SUPPORT_PG_SLUG', 'espresso_support');
            define('EE_SUPPORT_ADMIN_URL', admin_url('admin.php?page=' . EE_SUPPORT_PG_SLUG));
            define('EE_SUPPORT_ADMIN_TEMPLATE_PATH', EE_ADMIN_PAGES . 'support/templates/');
            define('EE_SUPPORT_ADMIN', EE_ADMIN_PAGES . 'support/');
            define('EE_SUPPORT_ASSETS_URL', EE_ADMIN_PAGES_URL . 'support/assets/');
        }
        parent::__construct();
    }


    protected function _set_init_properties()
    {
        $this->label = esc_html__('Help & Support', 'event_espresso');
    }


    public function getMenuProperties(): array
    {
        return [
            'menu_type'               => AdminMenuItem::TYPE_MENU_SUB_ITEM,
            'menu_group'              => 'extras',
            'menu_order'              => 30,
            'show_on_menu'            => AdminMenuItem::DISPLAY_BLOG_AND_NETWORK,
            'parent_slug'             => 'espresso_events',
            'menu_slug'               => EE_SUPPORT_PG_SLUG,
            'menu_label'              => esc_html__('Help & Support', 'event_espresso'),
            'capability'              => 'ee_read_ee',
            'maintenance_mode_parent' => 'espresso_maintenance_settings',
        ];
    }
}
