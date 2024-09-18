<?php

namespace EventEspresso\core\domain\services\licensing;

use EE_Error;
use EE_Form_Section_HTML;
use EE_Form_Section_Proper;
use EE_No_Layout;
use EE_Registry;
use EEH_Array;
use EEH_HTML;
use EventEspresso\core\libraries\form_sections\form_handlers\FormHandler;

class LicenseKeysAdminForm extends FormHandler
{
    public function __construct(EE_Registry $registry)
    {
        parent::__construct(
            LICENSE_KEYS_LABEL,
            LICENSE_KEYS_LABEL,
            LICENSE_KEYS_PG_SLUG,
            '',
            FormHandler::DO_NOT_SETUP_FORM,
            $registry
        );
    }


    /**
     * @throws EE_Error
     */
    public function generate(): EE_Form_Section_Proper
    {
        $subsections = (array) apply_filters('FHEE__LicenseKeysAdminForm__generate__form_subsections', []);
        ksort($subsections);
        return new EE_Form_Section_Proper(
            [
                'name'            => 'license_keys_admin_form',
                'html_id'         => 'license_keys_admin_form',
                'layout_strategy' => new EE_No_Layout(),
                'subsections'     => $this->addCoreSupportLicenseKey($subsections),
            ]
        );
    }


    private function addCoreSupportLicenseKey(array $subsections): array
    {
        // we want to move the license key input for core to a different location,
        // so to do that we need to copy it, delete the old location, then add re-add to the form
        $core_license_key = $subsections['event_espresso_core'] ?? null;
        unset($subsections['event_espresso_core']);
        $new_subsections = [
            'license_keys_hdr'           => new EE_Form_Section_HTML(
                EEH_HTML::h1(
                    esc_html__('Event Espresso Core License & Support Keys', 'event_espresso'),
                    '',
                    'ee-admin-settings-hdr'
                )
            ),
            'event_espresso_core'        => $core_license_key,
            'support_license_notice'     => new EE_Form_Section_HTML(
                EEH_HTML::br()
                . EEH_HTML::div(
                    '<span class="dashicons dashicons-sos"></span>'
                    . EEH_HTML::span(
                        esc_html__(
                            'Adding a valid Support License Key will enable automatic update notifications and backend updates.',
                            'event_espresso'
                        )
                    ),
                    'support-license-notice-dv',
                    'ee-status-outline ee-status-outline--micro ee-status-outline--info ee-status-bg--info'
                )
                . EEH_HTML::br()
                . EEH_HTML::div(
                    EEH_HTML::span(
                        sprintf(
                            esc_html__(
                                'If this is a Development or Test site, %sDO NOT%s enter your Support License Key.',
                                'event_espresso'
                            ),
                            '<strong>',
                            '</strong>'
                        )
                    ),
                    '',
                    'ee-status-outline ee-status-outline--attention'
                )
            ),
            'add-on-license-keys-hdr'    => new EE_Form_Section_HTML(
                EEH_HTML::h2(
                    esc_html__('Add-on License Keys', 'event_espresso'),
                    '',
                    'ee-admin-settings-hdr'
                )
            ),
            'add-on-license-keys-notice' => new EE_Form_Section_HTML(
                EEH_HTML::div(
                    EEH_HTML::span(
                        esc_html__(
                            'Please activate an Event Espresso Core support license key first in order to activate your add-on license keys',
                            'event_espresso'
                        )
                    ),
                    'add-on-license-keys-notice-dv',
                    'ee-status-outline ee-status-outline--micro ee-status-bg--attention',
                    'display: none;'
                )
            ),
        ];

        if ($core_license_key instanceof LicenseKeyFormInput && $core_license_key->get_default()) {
            unset($new_subsections['support_license_notice']);
            unset($new_subsections['add-on-license-keys-notice']);
        }
        return EEH_Array::insert_into_array($subsections, $new_subsections);
    }
}
