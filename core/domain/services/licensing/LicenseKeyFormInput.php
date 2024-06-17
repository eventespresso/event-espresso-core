<?php

namespace EventEspresso\core\domain\services\licensing;

use EE_Text_Input;
use EventEspresso\core\libraries\form_sections\strategies\filter\VsprintfFilter;
use EventEspresso\core\services\licensing\LicenseManager;
use EventEspresso\core\services\licensing\PluginLicense;

class LicenseKeyFormInput extends EE_Text_Input
{
    public function __construct(PluginLicense $plugin_license, LicenseManager $licence_manager)
    {
        $plugin_slug    = $plugin_license->pluginSlug();
        $item_ID        = $plugin_license->itemID();
        $item_name      = $plugin_license->itemName();
        $license_key    = $plugin_license->licenseKey();
        $plugin_version = $plugin_license->version();
        $license_data   = $licence_manager->checkLicense(
            $license_key,
            $item_ID,
            $item_name,
            $plugin_slug,
            $plugin_version
        );

        $license_expires  = $license_data->expires ?? '';
        $license_status   = $license_data->license ?? '';
        $activations_left = $license_data->activations_left ?? '?';
        $license_status   = $license_key !== '' ? $license_status : '';

        $help_text                 = '';
        $license_status_for_notice = '';
        $input_status_class        = "ee-license-key__input ee-input-width--reg ee-status-outline";

        if ($license_key !== '') {
            $license_status_for_notice = $license_status;
            $status_class              = LicenseStatus::statusClass($license_status);
            $input_status_class        .= $license_status !== 'valid' ? " ee-status-outline--$status_class" : '';

            if ($license_status === 'valid' && $license_expires !== '') {
                $help_text = sprintf(
                /* translators: 1: date  2: divider ( | )  3: number */
                    esc_html__('license valid until: %1$s %2$s activations remaining: %3$s', 'event_espresso'),
                    date('F jS Y', strtotime($license_expires)),
                    '&nbsp; &nbsp; | &nbsp; &nbsp;',
                    $activations_left
                );
            }
        }

        parent::__construct(
            [
                'html_name'        => "$plugin_slug-license-key",
                'html_id'          => "$plugin_slug-license-key",
                'html_label_text'  => $plugin_license->itemName(),
                'html_help_text'   => $help_text,
                'html_class'       => $input_status_class,
                'default'          => $license_data->license_key ?? '',
                'data_attributes'  => [
                    'plugin_slug'      => $plugin_slug,
                    'plugin_version'   => $plugin_version,
                    'item_id'          => $item_ID,
                    'item_name'        => $item_name,
                    'license_status'   => $license_status === 'valid' ? 'valid' : 'invalid',
                    'license_expires'  => $license_expires,
                    'activations_left' => $activations_left,
                ],
                'required'         => false,
                'form_html_filter' => new VsprintfFilter(
                    '%1$s %5$s %2$s %3$s %4$s',
                    [
                        '<div class="ee-license-status__wrapper ee-layout-row--fixed">',
                        ActivateLicenseButton::html($plugin_license, $license_data),
                        LicenseStatus::statusNotice($license_status_for_notice),
                        '</div>',
                        // %5$s is the form input
                    ]
                ),
            ]
        );
    }
}
