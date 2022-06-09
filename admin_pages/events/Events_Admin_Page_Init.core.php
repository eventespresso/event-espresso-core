<?php

use EventEspresso\core\domain\entities\admin\menu\AdminMenuItem;

/**
 * Events_Admin_Page_Init
 *
 * This is the init for the EE Events Admin Pages.  See EE_Admin_Page_Init for method inline docs.
 *
 * @package            Event Espresso
 * @abstract
 * @subpackage         includes/core/admin/events/Events_Admin_Page_Init.core.php
 * @author             Darren Ethier
 */
class Events_Admin_Page_Init extends EE_Admin_Page_CPT_Init
{
    public function __construct()
    {
        /**
         * define some events related constants but only if not defined (need to check because unit tests
         *  may load)
         */
        if (! defined('EVENTS_PG_SLUG')) {
            define('EVENTS_PG_SLUG', 'espresso_events');
            define('EVENTS_LABEL', esc_html__('Events', 'event_espresso'));
            define('EVENTS_ADMIN', EE_ADMIN_PAGES . 'events/');
            define('EVENTS_ADMIN_URL', admin_url('admin.php?page=' . EVENTS_PG_SLUG));
            define('EVENTS_TEMPLATE_PATH', EVENTS_ADMIN . 'templates/');
            define('EVENTS_ASSETS_URL', EE_ADMIN_PAGES_URL . 'events/assets/');
        }
        parent::__construct();
    }


    protected function _set_init_properties()
    {
        $this->label = esc_html__('Event Espresso - Event Details', 'event_espresso');
    }


    public function getMenuProperties(): array
    {
        return [
            'menu_type'       => AdminMenuItem::TYPE_MENU_SUB_ITEM,
            'menu_group'      => 'main',
            'menu_order'      => 10,
            'show_on_menu'    => AdminMenuItem::DISPLAY_BLOG_ONLY,
            'parent_slug'     => 'espresso_events',
            'menu_slug'       => 'espresso_events',
            'menu_label'      => esc_html__('Events', 'event_espresso'),
            'capability'      => 'ee_read_events',
        ];
    }
}
