<?php

namespace EventEspresso\core\domain\services\licensing;

use EventEspresso\core\services\licensing\PluginLicense;
use stdClass;

class ActivateLicenseButton
{
    /**
     * @param PluginLicense $plugin_license
     * @param stdClass|null $license_data
     * @return string
     */
    public static function html(PluginLicense $plugin_license, ?stdClass $license_data): string
    {
        $activate_btn_class   = '';
        $deactivate_btn_class = '';
        $license_status       = $license_data->license ?? '';
        if ($license_status !== 'valid') {
            $deactivate_btn_class = ' ee-license-action-btn--hidden';
        } else {
            $activate_btn_class = ' ee-license-action-btn--hidden';
        }

        $activate_btn_label   = esc_html__('activate', 'event_espresso');
        $deactivate_btn_label = esc_html__('deactivate', 'event_espresso');
        $reset_btn_label      = esc_html__('reset/clear this license key', 'event_espresso');

        $item_id        = $plugin_license->itemID();
        $item_name      = $plugin_license->itemName();
        $plugin_slug    = $plugin_license->pluginSlug();
        $min_core_ver   = $plugin_license->minCoreVersion();
        $plugin_version = $plugin_license->version();
        $disabled       = empty($license_data->license_key) ? 'disabled' : '';
        return "
        <button id='activate-$plugin_slug'
                class='ee-license-action-btn ee-license-action-btn__activate$activate_btn_class button button--primary'
                data-action='activate_license'
                data-target='$plugin_slug-license-key'
                data-item_id='$item_id'
                data-item_name='$item_name'
                data-plugin_slug='$plugin_slug'
                data-plugin_ver='$plugin_version'
                data-min_core_ver='$min_core_ver'
                $disabled
        >
            $activate_btn_label
        </button>
        <button id='deactivate-$plugin_slug'
                class='ee-license-action-btn ee-license-action-btn__deactivate$deactivate_btn_class button button--outline button--caution'
                data-action='deactivate_license'
                data-target='$plugin_slug-license-key'
                data-item_id='$item_id'
                data-item_name='$item_name'
                data-plugin_slug='$plugin_slug'
                data-plugin_ver='$plugin_version'
                data-min_core_ver='$min_core_ver'
        >
            $deactivate_btn_label
        </button>
        <button id='reset-$plugin_slug'
                aria-label='$reset_btn_label'
                class='ee-license-action-btn ee-license-action-btn__reset button button--icon-only ee-aria-tooltip'
                data-action='reset_license'
                data-target='$plugin_slug-license-key'
                data-item_id='$item_id'
                data-item_name='$item_name'
                data-plugin_slug='$plugin_slug'
                data-plugin_ver='$plugin_version'
                data-min_core_ver='$min_core_ver'
                $disabled
        >
            <span class='dashicons dashicons-trash'></span>
        </button>";
    }
}
