<?php

use EventEspresso\core\domain\entities\admin\menu\AdminMenuItem;

/**
 * Transactions_Admin_Page_Init class
 *
 * @package               Event Espresso
 * @subpackage            includes/core/admin/transactions/Transactions_Admin_Page_Init.class.php
 * @author                Brent Christensen
 */
class Transactions_Admin_Page_Init extends EE_Admin_Page_Init
{
    public function __construct()
    {
        do_action('AHEE_log', __FILE__, __FUNCTION__, '');
        if (! defined('TXN_PG_SLUG')) {
            define('TXN_PG_SLUG', 'espresso_transactions');
            define('TXN_PG_NAME', ucwords(str_replace('_', '', TXN_PG_SLUG)));
            define('TXN_ADMIN', EE_ADMIN_PAGES . 'transactions/');
            define('TXN_ADMIN_URL', admin_url('admin.php?page=' . TXN_PG_SLUG));
            define('TXN_ASSETS_PATH', TXN_ADMIN . 'assets/');
            define('TXN_ASSETS_URL', str_replace('\\', '/', EE_ADMIN_PAGES_URL . 'transactions/assets/'));
            define('TXN_TEMPLATE_PATH', TXN_ADMIN . 'templates/');
            define('TXN_TEMPLATE_URL', str_replace('\\', '/', EE_ADMIN_PAGES_URL . 'transactions/templates/'));
        }
        parent::__construct();
    }


    protected function _set_init_properties()
    {
        $this->label = esc_html__('Transactions Overview', 'event_espresso');
    }


    public function getMenuProperties(): array
    {
        return [
            'menu_type'       => AdminMenuItem::TYPE_MENU_SUB_ITEM,
            'menu_group'      => 'main',
            'menu_order'      => 50,
            'show_on_menu'    => AdminMenuItem::DISPLAY_BLOG_ONLY,
            'parent_slug'     => 'espresso_events',
            'menu_slug'       => TXN_PG_SLUG,
            'menu_label'      => esc_html__('Transactions', 'event_espresso'),
            'capability'      => 'ee_read_transactions',
        ];
    }
}
