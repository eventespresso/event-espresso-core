<?php

use EventEspresso\core\domain\entities\admin\menu\AdminMenuItem;
use EventEspresso\core\domain\entities\admin\menu\AdminMenuSubItem;

/**
 * Pricing_Admin_Page_Init class
 *
 * This is the init for the EE Pricing Admin Pages.  See EE_Admin_Page_Init for method inline docs.
 *
 * @package               Event Espresso
 * @subpackage            includes/core/admin/pricing/Pricing_Admin_Page_Init.core.php
 * @author                Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class Pricing_Admin_Page_Init extends EE_Admin_Page_Init
{
    /**
     * @Constructor
     */
    public function __construct()
    {
        if (! defined('PRICING_PG_SLUG')) {
            define('PRICING_PG_SLUG', 'pricing');
            define('PRICING_LABEL', esc_html__('Pricing', 'event_espresso'));
            define('PRICING_PG_NAME', ucwords(str_replace('_', '', PRICING_PG_SLUG)));
            define('PRICING_ADMIN', EE_CORE_CAF_ADMIN . 'new/' . PRICING_PG_SLUG . '/');
            define('PRICING_ADMIN_URL', admin_url('admin.php?page=' . PRICING_PG_SLUG));
            define('PRICING_ASSETS_PATH', PRICING_ADMIN . 'assets/');
            define('PRICING_ASSETS_URL', EE_CORE_CAF_ADMIN_URL . 'new/' . PRICING_PG_SLUG . '/assets/');
            define('PRICING_TEMPLATE_PATH', PRICING_ADMIN . 'templates/');
            define('PRICING_TEMPLATE_URL', EE_CORE_CAF_ADMIN_URL . 'new/' . PRICING_PG_SLUG . '/templates/');
        }
        parent::__construct();
        $this->_folder_path = EE_CORE_CAF_ADMIN . 'new/' . $this->_folder_name . '/';
    }


    protected function _set_init_properties()
    {
        $this->label = PRICING_LABEL;
    }


    /**
     * @return array|void
     * @throws EE_Error
     * @since 5.0.0.p
     */
    protected function _set_menu_map()
    {
        $this->_menu_map = new AdminMenuSubItem(
            array(
                'menu_group'      => 'management',
                'menu_order'      => 20,
                'show_on_menu'    => AdminMenuItem::DISPLAY_BLOG_ONLY,
                'parent_slug'     => 'espresso_events',
                'menu_slug'       => PRICING_PG_SLUG,
                'menu_label'      => PRICING_LABEL,
                'capability'      => 'ee_read_default_prices',
                'admin_init_page' => $this,
            )
        );
    }
}
