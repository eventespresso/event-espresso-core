<?php

/**
 * Event Espresso
 * Event Registration and Management Plugin for WordPress
 *
 *                  Maintenance_Admin_page_INit
 *                  This is for when we're in maintenance mode. If we're in level 2 of maintenance
 *                  mode, this is all users can see (because everything else is broken). If we're just
 *                  in level 1, they can see most of this and the other admin pages.
 *
 * @package         Payments_Admin_Page_Init
 * @subpackage      includes/core/admin/Payments_Admin_Page_Init.core.php
 * @author          Darren Ethier
 */
class Maintenance_Admin_Page_Init extends EE_Admin_Page_Init
{
    /**
     * @var int
     */
    protected $maintenance_mode_level;


    public function __construct()
    {
        $this->maintenance_mode_level = EE_Maintenance_Mode::instance()->level();
        // define some page related constants
        define('EE_MAINTENANCE_LABEL', esc_html__('Maintenance', 'event_espresso'));
        define('EE_MAINTENANCE_PG_SLUG', 'espresso_maintenance_settings');
        define('EE_MAINTENANCE_ADMIN_URL', admin_url('admin.php?page=' . EE_MAINTENANCE_PG_SLUG));
        define('EE_MAINTENANCE_ADMIN', EE_ADMIN_PAGES . 'maintenance/');
        define('EE_MAINTENANCE_TEMPLATE_PATH', EE_MAINTENANCE_ADMIN . 'templates/');
        define('EE_MAINTENANCE_ASSETS_URL', EE_ADMIN_PAGES_URL . 'maintenance/assets/');
        // check that if we're in maintenance mode that we tell the admin that
        add_action('admin_notices', [$this, 'check_maintenance_mode']);
        parent::__construct();
    }


    protected function _set_init_properties()
    {
        $this->label = EE_MAINTENANCE_LABEL;
    }


    /**
     * @throws EE_Error
     */
    protected function _set_menu_map()
    {
        $menu_map        = $this->_menu_map();
        $this->_menu_map = $this->maintenance_mode_level === EE_Maintenance_Mode::level_2_complete_maintenance
            ? new EE_Admin_Page_Main_Menu($menu_map)
            : new EE_Admin_Page_Sub_Menu($menu_map);
    }


    protected function _menu_map()
    {
        $map = [
            'menu_group'              => 'extras',
            'menu_order'              => 30,
            'show_on_menu'            => EE_Admin_Page_Menu_Map::BLOG_ADMIN_ONLY,
            'parent_slug'             => 'espresso_events',
            'menu_slug'               => EE_MAINTENANCE_PG_SLUG,
            'menu_label'              => EE_MAINTENANCE_LABEL,
            'capability'              => 'manage_options',
            'maintenance_mode_parent' => EE_MAINTENANCE_PG_SLUG,
            'admin_init_page'         => $this,
        ];
        if ($this->maintenance_mode_level == EE_Maintenance_Mode::level_2_complete_maintenance) {
            $map['menu_group'] = 'main';
            $map['subtitle']   = EE_MAINTENANCE_LABEL;
            $map['menu_label'] = esc_html__('Event Espresso', 'event_espresso');
        }
        return $map;
    }


    /**
     * Checks if we're in maintenance mode, and if so we notify the admin adn tell them how to take the site OUT of
     * maintenance mode
     */
    public function check_maintenance_mode()
    {
        $notice               = '';
        $maintenance_page_url = '';
        if ($this->maintenance_mode_level) {
            $maintenance_page_url = esc_url_raw(
                EE_Admin_Page::add_query_args_and_nonce([], EE_MAINTENANCE_ADMIN_URL)
            );
            switch ($this->maintenance_mode_level) {
                case EE_Maintenance_Mode::level_1_frontend_only_maintenance:
                    $notice = '<div class="update-nag ee-update-nag">';
                    $notice .= sprintf(
                        esc_html__(
                            "Event Espresso is in Frontend-Only MAINTENANCE MODE. This means the front-end (ie, non-wp-admin pages) is disabled for ALL users except site admins. Visit the %s Maintenance Page %s to disable maintenance mode.",
                            "event_espresso"
                        ),
                        "<a href='$maintenance_page_url'>",
                        "</a>"
                    );
                    $notice .= '</div>';
                    break;
                case EE_Maintenance_Mode::level_2_complete_maintenance:
                    $notice = '<div class="error"><p>';
                    $notice .= sprintf(
                        esc_html__(
                            "As part of the process for updating Event Espresso, your database also
needs to be updated. Event Espresso is in COMPLETE MAINTENANCE MODE (both WordPress admin pages and front-end event registration pages are disabled) until you run the database update script. %s Visit the Maintenance Page to get started,%s it only takes a moment.",
                            "event_espresso"
                        ),
                        "<a href='$maintenance_page_url'>",
                        "</a>"
                    );
                    $notice .= '</p></div>';
                    break;
            }
        }
        echo apply_filters(
            'FHEE__Maintenance_Admin_Page_Init__check_maintenance_mode__notice',
            $notice, // already escaped
            $maintenance_page_url // already escaped
        );
    }
}
