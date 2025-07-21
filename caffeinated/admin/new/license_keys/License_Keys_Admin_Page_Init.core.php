<?php

use EventEspresso\core\domain\entities\admin\menu\AdminMenuItem;
use EventEspresso\core\domain\entities\admin\menu\AdminMenuSubItem;
use EventEspresso\core\domain\services\capabilities\FeatureFlags;

/**
 * License_Keys_Admin_Page_Init
 * Initializes the License Keys admin page
 *
 * @since 5.0.20.p
 */
class License_Keys_Admin_Page_Init extends EE_Admin_Page_Init
{
    public function __construct()
    {
        if (! defined('LICENSE_KEYS_PG_SLUG')) {
            define('LICENSE_KEYS_PG_SLUG', 'espresso_license_keys');
            define('LICENSE_KEYS_LABEL', esc_html__('License Keys', 'event_espresso'));
            define('LICENSE_KEYS_ADMIN', EE_CORE_CAF_ADMIN . 'new/license_keys/');
            define('LICENSE_KEYS_ADMIN_URL', admin_url('admin.php?page=' . LICENSE_KEYS_PG_SLUG));
            define('LICENSE_KEYS_ASSETS_URL', EE_CORE_CAF_ADMIN_URL . 'new/license_keys/assets/');
        }
        parent::__construct();
        $this->_folder_path = EE_CORE_CAF_ADMIN . 'new/license_keys/';
    }


    protected function _set_init_properties()
    {
        $this->label = LICENSE_KEYS_LABEL;
    }


    public function getMenuProperties(): array
    {
        $feature = $this->loader->getShared(FeatureFlags::class);
        $this->setAdminMenu(
            new AdminMenuSubItem(
                [
                    'menu_type'       => AdminMenuItem::TYPE_MENU_SUB_ITEM,
                    'menu_group'      => 'settings',
                    'menu_order'      => 10,
                    'show_on_menu'    => $feature->allowed('use_edd_plugin_licensing') && is_main_site()
                        ? AdminMenuItem::DISPLAY_BLOG_ONLY
                        : AdminMenuItem::DISPLAY_NONE,
                    'parent_slug'     => 'espresso_events',
                    'menu_slug'       => LICENSE_KEYS_PG_SLUG,
                    'menu_label'      => LICENSE_KEYS_LABEL,
                    'capability'      => 'manage_options',
                    'admin_init_page' => $this,
                ]
            )
        );
        return [];
    }
}
