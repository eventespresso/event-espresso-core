<?php

/**
 * Other_Services_Admin_Page_Init
 *
 * This is the init for the EE Other Services Admin Pages.  See EE_Admin_Page_Init for method inline docs.
 *
 *
 * @package         Event Espresso
 * @subpackage      admin
 * @author          Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Other_Services_Admin_Page_Init extends EE_Admin_Page_Init
{
    public function __construct()
    {
        // define some help/support page related constants
        define('EE_OTHER_SERVICES_PG_SLUG', 'espresso_packages');
        define('EE_OTHER_SERVICES_ADMIN_URL', admin_url('admin.php?page=' . EE_OTHER_SERVICES_PG_SLUG));
        define('EE_OTHER_SERVICES_ADMIN_TEMPLATE_PATH', EE_ADMIN_PAGES . 'other_services/templates/');
        define('EE_OTHER_SERVICES_ADMIN', EE_ADMIN_PAGES . 'other_services/');
        define('EE_OTHER_SERVICES_ASSETS_URL', EE_ADMIN_PAGES_URL . 'other_services/assets/');

        parent::__construct();
    }

    protected function _set_init_properties()
    {
        $this->label = esc_html__('Extensions & Services', 'event_espresso');
    }

    protected function _set_menu_map()
    {
        $this->_menu_map = new EE_Admin_Page_Sub_Menu(
            array(
                'menu_group'              => 'extras',
                'menu_order'              => 30,
                'show_on_menu'            => EE_Admin_Page_Menu_Map::BLOG_AND_NETWORK_ADMIN,
                'parent_slug'             => 'espresso_events',
                'menu_slug'               => EE_OTHER_SERVICES_PG_SLUG,
                'menu_label'              => esc_html__('Extensions & Services', 'event_espresso'),
                'capability'              => 'ee_read_ee',
                'maintenance_mode_parent' => 'espresso_maintenance_settings',
                'admin_init_page'         => $this,
            )
        );
    }
}
