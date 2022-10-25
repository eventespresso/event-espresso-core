<?php

namespace EventEspresso\caffeinated\core\services\licensing;

use EE_Checkbox_Multi_Input;
use EE_Core_Config;
use EE_Error;
use EE_Form_Section_HTML;
use EE_Form_Section_Proper;
use EE_Network_Core_Config;
use EE_Text_Input;
use EEH_HTML;
use EEH_Template;
use EventEspresso\caffeinated\core\domain\services\pue\Stats;
use EventEspresso\core\libraries\form_sections\strategies\filter\VsprintfFilter;

class UserExperienceForm
{
    /**
     * @var EE_Core_Config
     */
    protected $core_config;

    /**
     * @var EE_Network_Core_Config
     */
    protected $network_core_config;


    /**
     * @param EE_Core_Config         $core_config
     * @param EE_Network_Core_Config $network_core_config
     */
    public function __construct(EE_Core_Config $core_config, EE_Network_Core_Config $network_core_config)
    {
        $this->core_config         = $core_config;
        $this->network_core_config = $network_core_config;
    }


    /**
     * @throws EE_Error
     */
    public function uxipFormSections(EE_Form_Section_Proper $org_settings_form): EE_Form_Section_Proper
    {
        if (is_main_site()) {
            $org_settings_form->add_subsections(
                [
                    'site_license_key_hdr' => new EE_Form_Section_HTML(
                        EEH_HTML::h2(
                            esc_html__('Your Event Espresso License Key', 'event_espresso')
                            . ' '
                            . EEH_HTML::span(
                                EEH_Template::get_help_tab_link('site_license_key_info')
                            ),
                            '',
                            'site-license-key-hdr'
                        )
                    ),
                    'site_license_key'     => new EE_Text_Input(
                        [
                            'html_name'        => 'ee_site_license_key',
                            'html_id'          => 'site_license_key',
                            'html_label_text'  => esc_html__('Support License Key', 'event_espresso'),
                            /** phpcs:disable WordPress.WP.I18n.UnorderedPlaceholdersText */
                            'html_help_text'   => sprintf(
                                esc_html__(
                                    'Adding a valid Support License Key will enable automatic update notifications and backend updates for Event Espresso Core and any installed add-ons. If this is a Development or Test site, %sDO NOT%s enter your Support License Key.',
                                    'event_espresso'
                                ),
                                '<strong>',
                                '</strong>'
                            ),
                            /** phpcs:enable */
                            'default'          => $this->network_core_config->site_license_key ?? '',
                            'required'         => false,
                            'form_html_filter' => new VsprintfFilter(
                                '%2$s %1$s',
                                [$this->getValidationIndicator()]
                            )
                        ]
                    )
                ]
            );
            $org_settings_form->add_subsections(
                [
                    'uxip_optin_hdr' => new EE_Form_Section_HTML(Stats::optinText(false)),
                    'ueip_optin'     => new EE_Checkbox_Multi_Input(
                        [
                            true => esc_html__('Yes! I want to help improve Event Espresso!', 'event_espresso')
                        ],
                        [
                            'html_name'       => EE_Core_Config::OPTION_NAME_UXIP,
                            'html_label_text' => esc_html__(
                                'UXIP Opt In?',
                                'event_espresso'
                            ),
                            'default'         => isset($this->core_config->ee_ueip_optin)
                                ? filter_var($this->core_config->ee_ueip_optin, FILTER_VALIDATE_BOOLEAN)
                                : false,
                            'required'        => false,
                        ]
                    ),
                ],
                'organization_instagram',
                false
            );
        }
        return $org_settings_form;
    }



    /**
     * Return whether the site license key has been verified or not.
     *
     * @return bool
     */
    private function licenseKeyVerified(): bool
    {
        if (empty($this->network_core_config->site_license_key)) {
            return false;
        }
        $verify_fail = get_option(
            'puvererr_' . basename(EE_PLUGIN_BASENAME),
            false
        );
        return $verify_fail === false
               || (
                   ! empty($this->network_core_config->site_license_key)
                   && $verify_fail === false
               );
    }


    /**
     * @return string
     */
    private function getValidationIndicator(): string
    {
        $verified_class = $this->licenseKeyVerified() ? 'ee-icon-color-ee-green' : 'ee-icon-color-ee-red';
        return '<span class="dashicons dashicons-admin-network ' . $verified_class . ' ee-icon-size-20"></span>';
    }
}
