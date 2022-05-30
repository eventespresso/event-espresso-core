<?php

/**
 * Registrations_Admin_Page_Init class
 *
 * @package               Event Espresso
 * @subpackage            includes/core/admin/registrations/Registrations_Admin_Page_Init.core.php
 * @author                Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class Registrations_Admin_Page_Init extends EE_Admin_Page_CPT_Init
{
    /**
     *        constructor
     *
     * @Constructor
     * @access public
     * @return void
     */
    public function __construct()
    {
        do_action('AHEE_log', __FILE__, __FUNCTION__, '');
        if (! defined('REG_PG_SLUG')) {
            define('REG_PG_SLUG', 'espresso_registrations');
            define('REG_PG_NAME', ucwords(str_replace('_', '', REG_PG_SLUG)));
            define('REG_ADMIN', EE_ADMIN_PAGES . 'registrations/');
            define('REG_ADMIN_URL', admin_url('admin.php?page=' . REG_PG_SLUG));
            define('REG_ASSETS_PATH', REG_ADMIN . 'assets/');
            define('REG_ASSETS_URL', EE_ADMIN_PAGES_URL . 'registrations/assets/');
            define('REG_TEMPLATE_PATH', REG_ADMIN . 'templates/');
            define('REG_TEMPLATE_URL', EE_ADMIN_PAGES_URL . 'registrations/templates/');
        }

        parent::__construct();
    }


    protected function _set_init_properties()
    {
        $this->label = esc_html__('Registrations Overview', 'event_espresso');
    }


    protected function _set_menu_map()
    {
        $this->_menu_map = new EE_Admin_Page_Sub_Menu(
            array(
                'menu_group'      => 'main',
                'menu_order'      => 40,
                'show_on_menu'    => EE_Admin_Page_Menu_Map::BLOG_ADMIN_ONLY,
                'parent_slug'     => 'espresso_events',
                'menu_slug'       => REG_PG_SLUG,
                'menu_label'      => esc_html__('Registrations', 'event_espresso'),
                'capability'      => 'ee_read_registrations',
                'admin_init_page' => $this,
            )
        );
    }
}
