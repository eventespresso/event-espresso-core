<?php

use EventEspresso\core\domain\entities\admin\menu\AdminMenuItem;

/**
 * Other_Services_Admin_Page_Init
 *
 * This is the init for the EE Other Services Admin Pages.  See EE_Admin_Page_Init for method inline docs.
 *
 *
 * @package         Event Espresso
 * @subpackage      admin
 * @author          Darren Ethier
 */
class Other_Services_Admin_Page_Init extends EE_Admin_Page_Init
{
    public function __construct()
    {
        // define some help/support page related constants
        if (! defined('EE_OTHER_SERVICES_PG_SLUG')) {
            define('EE_OTHER_SERVICES_PG_SLUG', 'espresso_packages');
            define('EE_OTHER_SERVICES_ADMIN_URL', admin_url('admin.php?page=' . EE_OTHER_SERVICES_PG_SLUG));
            define('EE_OTHER_SERVICES_ADMIN_TEMPLATE_PATH', EE_ADMIN_PAGES . 'other_services/templates/');
            define('EE_OTHER_SERVICES_ADMIN', EE_ADMIN_PAGES . 'other_services/');
            define('EE_OTHER_SERVICES_ASSETS_URL', EE_ADMIN_PAGES_URL . 'other_services/assets/');
        }
        parent::__construct();
    }


    protected function _set_init_properties()
    {
        $this->label = esc_html__('Extensions & Services', 'event_espresso');
    }


    public function getMenuProperties(): array
    {
        return [
            'menu_type'               => AdminMenuItem::TYPE_MENU_SUB_ITEM,
            'menu_group'              => 'extras',
            'menu_order'              => 30,
            'show_on_menu'            => AdminMenuItem::DISPLAY_BLOG_AND_NETWORK,
            'parent_slug'             => 'espresso_events',
            'menu_slug'               => EE_OTHER_SERVICES_PG_SLUG,
            'menu_label'              => esc_html__('Extensions & Services', 'event_espresso'),
            'capability'              => 'ee_read_ee',
            'maintenance_mode_parent' => 'espresso_maintenance_settings',
        ];
    }
}
