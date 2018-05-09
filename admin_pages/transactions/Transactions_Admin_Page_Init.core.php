<?php

/**
 * Transactions_Admin_Page_Init class
 *
 * @package               Event Espresso
 * @subpackage            includes/core/admin/transactions/Transactions_Admin_Page_Init.class.php
 * @author                Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class Transactions_Admin_Page_Init extends EE_Admin_Page_Init
{


    /**
     * @Constructor
     * @access public
     * @return Transactions_Admin_Page_Init
     */
    public function __construct()
    {

        do_action('AHEE_log', __FILE__, __FUNCTION__, '');
        if (! defined('TXN_PG_SLUG')) {
            define('TXN_PG_SLUG', 'espresso_transactions');
            define('TXN_PG_NAME', ucwords(str_replace('_', '', TXN_PG_SLUG)));
            define('TXN_ADMIN', EE_ADMIN_PAGES . 'transactions' . DS);
            define('TXN_ADMIN_URL', admin_url('admin.php?page=' . TXN_PG_SLUG));
            define('TXN_ASSETS_PATH', TXN_ADMIN . 'assets' . DS);
            define('TXN_ASSETS_URL', str_replace('\\', '/', EE_ADMIN_PAGES_URL . 'transactions/assets' . DS));
            define('TXN_TEMPLATE_PATH', TXN_ADMIN . 'templates' . DS);
            define('TXN_TEMPLATE_URL', str_replace('\\', '/', EE_ADMIN_PAGES_URL . 'transactions/templates' . DS));
        }
        parent::__construct();
    }


    /**
     *    _set_init_properties
     *
     * @return void
     */
    protected function _set_init_properties()
    {
        $this->label = __('Transactions Overview', 'event_espresso');
    }


    /**
     *    _set_menu_map
     *
     * @return void
     */
    protected function _set_menu_map()
    {
        $this->_menu_map = new EE_Admin_Page_Sub_Menu(
            array(
                'menu_group'      => 'main',
                'menu_order'      => 50,
                'show_on_menu'    => EE_Admin_Page_Menu_Map::BLOG_ADMIN_ONLY,
                'parent_slug'     => 'espresso_events',
                'menu_slug'       => TXN_PG_SLUG,
                'menu_label'      => __('Transactions', 'event_espresso'),
                'capability'      => 'ee_read_transactions',
                'admin_init_page' => $this,
            )
        );
    }
}
