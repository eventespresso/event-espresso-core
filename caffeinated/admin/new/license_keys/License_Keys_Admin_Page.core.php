<?php

use EventEspresso\core\domain\services\licensing\LicenseKeysAdminForm;
use EventEspresso\core\domain\services\licensing\LicenseStatus;
use EventEspresso\core\services\licensing\LicenseAPI;
use EventEspresso\core\services\licensing\LicenseKeyData;
use EventEspresso\core\services\licensing\LicenseManager;
use EventEspresso\core\services\licensing\PluginLicenseCollection;
use EventEspresso\core\services\request\DataType;

/**
 * License_Keys_Admin_Page
 * UI for managing License Keys
 *
 * @since $VID:$
 */
class License_Keys_Admin_Page extends EE_Admin_Page
{
    protected function _init_page_props()
    {
        $this->page_slug        = LICENSE_KEYS_PG_SLUG;
        $this->page_label       = LICENSE_KEYS_LABEL;
        $this->_admin_base_url  = LICENSE_KEYS_ADMIN_URL;
        $this->_admin_base_path = LICENSE_KEYS_ADMIN;
    }


    protected function _ajax_hooks()
    {
        add_action('wp_ajax_espresso_update_license', [$this, 'updateLicenseKey']);
    }


    protected function _define_page_props()
    {
        $this->_admin_page_title = LICENSE_KEYS_LABEL;
    }


    protected function _set_page_routes()
    {
        $this->_page_routes = [
            'default'            => [
                'func'       => [$this, 'licenseKeysAdminPage'],
                'capability' => 'manage_options',
            ],
            'update_license_key' => [
                'func'       => [$this, 'updateLicenseKey'],
                'capability' => 'manage_options',
                'noheader'   => true,
            ],
        ];
    }


    protected function _set_page_config()
    {
        $this->_page_config = [
            'default' => [
                'nav'           => [
                    'label' => LICENSE_KEYS_LABEL,
                    'icon'  => 'dashicons-admin-network',
                    'order' => 10,
                ],
                'metaboxes'     => array_merge($this->_default_espresso_metaboxes),
                'require_nonce' => false,
            ],
        ];
    }


    protected function _add_screen_options()
    {
        // TODO: Implement _add_screen_options() method.
    }


    protected function _add_feature_pointers()
    {
        // TODO: Implement _add_feature_pointers() method.
    }


    public function load_scripts_styles()
    {
        wp_enqueue_style(
            'license_keys_admin_style',
            LICENSE_KEYS_ASSETS_URL . 'license_keys_admin.css',
            [],
            EVENT_ESPRESSO_VERSION
        );

        wp_enqueue_script(
            'license_keys_admin_js',
            LICENSE_KEYS_ASSETS_URL . 'license_keys_admin.js',
            ['jquery'],
            EVENT_ESPRESSO_VERSION,
            true
        );
        wp_localize_script(
            'license_keys_admin_js',
            'eeLicenseData',
            [
                'domain'              => home_url(),
                'statusMessages'      => LicenseStatus::statusMessages(),
                'confirmDeactivation' => esc_html__(
                    'Are you sure you want to deactivate this license?',
                    'event_espresso'
                ),
                'resetDeactivation'   => esc_html__(
                    'Are you sure you want to reset this license?',
                    'event_espresso'
                ),
            ]
        );
    }


    public function admin_init()
    {
        // TODO: Implement admin_init() method.
    }


    public function admin_notices()
    {
        // TODO: Implement admin_notices() method.
    }


    public function admin_footer_scripts()
    {
        // TODO: Implement admin_footer_scripts() method.
    }


    public function _before_page_setup()
    {
        EE_Dependency_Map::instance()->registerDependencies(
            LicenseManager::class,
            [
                LicenseAPI::class              => EE_Dependency_Map::load_from_cache,
                LicenseKeyData::class          => EE_Dependency_Map::load_from_cache,
                PluginLicenseCollection::class => EE_Dependency_Map::load_from_cache,
            ]
        );
        EE_Dependency_Map::instance()->registerDependencies(
            LicenseKeysAdminForm::class,
            ['EE_Registry' => EE_Dependency_Map::load_from_cache]
        );
        parent::_before_page_setup();
    }


    private function getLicenseManager(): LicenseManager
    {
        return $this->loader->getShared(LicenseManager::class);
    }


    private function getPluginLicenseCollection(): PluginLicenseCollection
    {
        return $this->loader->getShared(PluginLicenseCollection::class);
    }


    /**
     * @throws EE_Error
     */
    public function licenseKeysAdminPage()
    {
        $this->_template_args['admin_page_content'] = '';
        try {
            $license_keys_admin_form                    = $this->loader->getShared(LicenseKeysAdminForm::class);
            $this->_template_args['admin_page_content'] = EEH_HTML::div(
                $license_keys_admin_form->display(),
                '',
                'padding'
            );
        } catch (Exception $e) {
            EE_Error::add_error($e->getMessage(), __FILE__, __FUNCTION__, __LINE__);
        }
        $this->_set_add_edit_form_tags('update_license_keys');
        $this->_set_publish_post_box_vars();
        $this->display_admin_page_with_sidebar();
    }


    /**
     * @throws EE_Error
     */
    public function updateLicenseKey()
    {
        if (current_user_can('manage_options')) {
            $licence_manager  = $this->getLicenseManager();
            $license_action   = $this->request->getRequestParam(LicenseAPI::REQUEST_PARAM_ACTION);
            $license_key      = $this->request->getRequestParam(LicenseAPI::REQUEST_PARAM_LICENSE_KEY);
            $item_id          = $this->request->getRequestParam(LicenseAPI::REQUEST_PARAM_ITEM_ID, 0, DataType::INT);
            $item_name        = $this->request->getRequestParam(LicenseAPI::REQUEST_PARAM_ITEM_NAME);
            $plugin_slug      = $this->request->getRequestParam(LicenseAPI::REQUEST_PARAM_PLUGIN_SLUG);
            $plugin_version   = $this->request->getRequestParam(LicenseAPI::REQUEST_PARAM_PLUGIN_VER);
            $min_core_version = $this->request->getRequestParam(LicenseAPI::REQUEST_PARAM_MIN_CORE_VER);

            $license_data = [];
            switch ($license_action) {
                case LicenseAPI::ACTION_ACTIVATE:
                    $license_data = $licence_manager->activateLicense(
                        $license_key,
                        $item_id,
                        $item_name,
                        $plugin_slug,
                        $plugin_version,
                        $min_core_version
                    );
                    break;

                case LicenseAPI::ACTION_DEACTIVATE:
                    $license_data = $licence_manager->deactivateLicense(
                        $license_key,
                        $item_id,
                        $item_name,
                        $plugin_slug,
                        $plugin_version,
                        $min_core_version
                    );
                    break;

                case LicenseAPI::ACTION_CHECK:
                    $license_data = $licence_manager->checkLicense(
                        $license_key,
                        $item_id,
                        $item_name,
                        $plugin_slug,
                        $plugin_version,
                        $min_core_version
                    );
                    break;

                case LicenseAPI::ACTION_GET_VERSION:
                    $license_data = $licence_manager->getVersionInfo();
                    break;

                case LicenseAPI::ACTION_RESET:
                    $license_data = $licence_manager->resetLicenseKey($plugin_slug);
                    break;
            }

            $license_data = (object) $license_data;
            $license_data->statusNotice = LicenseStatus::statusNotice($license_data->license);
            $license_data->statusClass  = LicenseStatus::statusClass($license_data->license);
            $notices = EE_Error::get_notices(false, false, false);
        } else {
            $license_data = new stdClass();
            $notices = [
                'success' => false,
                'errors'  => [
                    esc_html__('You do not have permission to perform this action.', 'event_espresso'),
                ],
            ];
        }

        if ($this->request->isAjax()) {
            wp_send_json(
                [
                    'return_data' => $license_data,
                    'success'     => $notices['success'],
                    'errors'      => $notices['errors'],
                ]
            );
        }

        $this->_redirect_after_action(
            empty($notices['errors']),
            '',
            '',
            ['action' => 'default'],
            true
        );
    }
}

