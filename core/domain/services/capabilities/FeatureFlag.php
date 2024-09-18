<?php

namespace EventEspresso\core\domain\services\capabilities;

/**
 * class FeatureFlag
 * defines the Feature Flags used to enable/disable new features in Event Espresso
 *
 * @since 5.0.18.p
 */
class FeatureFlag
{
    /**
     * Whether to use the New Event Editor (EDTR) or continue using the legacy Event Editor
     * deafult: Enabled for Caffeinated sites, disabled for Decaf or Multisite installs
     */
    public const  USE_ADVANCED_EVENT_EDITOR = 'ee_advanced_event_editor';

    /**
     * Whether to enable the Bulk Edit feature in the Advanced Event Editor (EDTR)
     * default: Enabled for Caffeinated sites, disabled for Decaf or Multisite installs
     */
    public const  USE_EVENT_EDITOR_BULK_EDIT = 'ee_event_editor_bulk_edit';

    /**
     * Whether to enable the new Default Ticket Manager in the EDTR
     * default: Enabled
     */
    public const  USE_DEFAULT_TICKET_MANAGER = 'use_default_ticket_manager';

    /**
     * Whether to enable the Rich Text Editor for the Event Description field in the EDTR or use tinymce
     * default: Disabled
     */
    public const  USE_EVENT_DESCRIPTION_RTE = 'use_event_description_rte';

    /**
     * Whether to enable the Rich Text Editor for all other RTE fields in the EDTR
     * default: Disabled
     */
    public const  USE_EXPERIMENTAL_RTE = 'use_experimental_rte';

    /**
     * Whether to enable the new Registration Form Builder in the EDTR
     * or continue using the legacy Question Groups and Registration Form admin pages
     * default: Disabled
     */
    public const  USE_REG_FORM_BUILDER = 'use_reg_form_builder';

    /**
     * Whether to enable the new Registration Options meta box in the EDTR
     * or continue using the legacy Event Registration Options
     * default: Disabled
     */
    public const  USE_REG_OPTIONS_META_BOX = 'use_reg_options_meta_box';

    /**
     * Whether to enable the new Single Page Checkout form refactor changes
     * default: Disabled
     *
     * @since 5.0.18.p
     */
    public const  USE_SPCO_FORM_REFACTOR = 'use_spco_form_refactor';

    /**
     * Whether to enable the new Reg Form Ticket Questions functionality
     * default: Disabled
     */
    public const  USE_REG_FORM_TICKET_QUESTIONS = 'use_reg_form_ticket_questions';

    /**
     * Whether to use the EDD Plugin Licensing system to manage licenses for the EE plugins
     * default: Disabled
     */
    public const USE_EDD_PLUGIN_LICENSING = 'use_edd_plugin_licensing';

    /**
     * Whether to use the new Datetime Status Controls in the EDTR
     * default: Disabled
     */
    public const USE_DATETIME_STATUS_CONTROLS = 'use_datetime_status_controls';

    /**
     * Whether to apply Gateway Partner fees to transactions
     * default: Disabled
     */
    public const USE_PAYMENT_PROCESSOR_FEES = 'use_payment_processor_fees';


    public static function getFormOptions(): array
    {
        return [
            FeatureFlag::USE_EVENT_EDITOR_BULK_EDIT    => [
                'name'            => esc_html__('Event Editor Bulk Edit', 'event_espresso'),
                'html_label_text' => esc_html__('Use Event Editor Bulk Edit', 'event_espresso'),
                'help_text'       => sprintf(
                    esc_html__(
                        'Whether to enable the Bulk Edit feature in the Advanced Event Editor (EDTR).%1$s%2$sPLEASE NOTE: Bulk Editing is ALWAYS enabled if the Recurring Events Manager add-on is active.%3$s%1$s default: Enabled for Caffeinated sites, disabled for Decaf or Multisite installs',
                        'event_espresso'
                    ),
                    '<br/>',
                    '<strong>',
                    '</strong>'
                ),
                'overridden'      => false,
                'overridden_by'   => '',
            ],
            FeatureFlag::USE_DEFAULT_TICKET_MANAGER    => [
                'name'            => esc_html__('Default Ticket Manager', 'event_espresso'),
                'html_label_text' => esc_html__('Use Default Ticket Manager', 'event_espresso'),
                'help_text'       => esc_html__(
                    'Whether to enable the new Default Ticket Manager in the EDTR. default: Enabled',
                    'event_espresso'
                ),
                'overridden'      => false,
                'overridden_by'   => '',
            ],
            FeatureFlag::USE_EVENT_DESCRIPTION_RTE     => [
                'name'            => esc_html__('Event Description RTE', 'event_espresso'),
                'html_label_text' => esc_html__('Use Rich Text Editor for Event Description', 'event_espresso'),
                'help_text'       => esc_html__(
                    'Whether to enable the Rich Text Editor for the Event Description field in the EDTR or use tinymce. default: Disabled',
                    'event_espresso'
                ),
                'overridden'      => false,
                'overridden_by'   => '',
            ],
            FeatureFlag::USE_EXPERIMENTAL_RTE          => [
                'name'            => esc_html__('Rich Text Editor', 'event_espresso'),
                'html_label_text' => esc_html__('Use Rich Text Editor for other RTE fields', 'event_espresso'),
                'help_text'       => esc_html__(
                    'Whether to enable the Rich Text Editor for all other RTE fields in the EDTR. default: Disabled',
                    'event_espresso'
                ),
                'overridden'      => false,
                'overridden_by'   => '',
            ],
            FeatureFlag::USE_REG_FORM_BUILDER          => [
                'name'            => esc_html__('Registration Form Builder', 'event_espresso'),
                'html_label_text' => esc_html__('Use Registration Form Builder', 'event_espresso'),
                'help_text'       => esc_html__(
                    'Whether to enable the new Registration Form Builder in the EDTR or continue using the legacy Question Groups and Registration Form admin pages. default: Disabled',
                    'event_espresso'
                ),
                'overridden'      => false,
                'overridden_by'   => '',
            ],
            FeatureFlag::USE_REG_OPTIONS_META_BOX      => [
                'name'            => esc_html__('Registration Options', 'event_espresso'),
                'html_label_text' => esc_html__('Use Registration Options', 'event_espresso'),
                'help_text'       => esc_html__(
                    'Whether to enable the new Registration Options meta box in the EDTR or continue using the legacy Event Registration Options. default: Disabled',
                    'event_espresso'
                ),
                'overridden'      => false,
                'overridden_by'   => '',
            ],
            FeatureFlag::USE_SPCO_FORM_REFACTOR        => [
                'name'            => esc_html__('SPCO Form Refactor', 'event_espresso'),
                'html_label_text' => esc_html__('Use SPCO Form Refactor', 'event_espresso'),
                'help_text'       => esc_html__(
                    'Whether to enable the new Single Page Checkout form refactor changes or continue using the legacy Single Page Checkout form. default: Disabled',
                    'event_espresso'
                ),
                'overridden'      => false,
                'overridden_by'   => '',
            ],
            FeatureFlag::USE_REG_FORM_TICKET_QUESTIONS => [
                'name'            => esc_html__('Reg Form Ticket Questions', 'event_espresso'),
                'html_label_text' => esc_html__('Use Reg Form Ticket Questions', 'event_espresso'),
                'help_text'       => esc_html__(
                    'Whether to enable the new Reg Form Ticket Questions functionality. default: Disabled',
                    'event_espresso'
                ),
                'overridden'      => false,
                'overridden_by'   => '',
            ],
            FeatureFlag::USE_EDD_PLUGIN_LICENSING      => [
                'name'            => esc_html__('EDD Plugin Licensing', 'event_espresso'),
                'html_label_text' => esc_html__('Use EDD Plugin Licensing', 'event_espresso'),
                'help_text'       => esc_html__(
                    'Whether to use the EDD Plugin Licensing system to manage licenses for the EE plugins. default: Disabled',
                    'event_espresso'
                ),
                'overridden'      => defined('EE_USE_EDD_PLUGIN_LICENSING'),
                'overridden_by'   => defined('EE_USE_EDD_PLUGIN_LICENSING')
                    ? sprintf(
                        esc_html__(
                            '%1$sCurrently overriden by the %2$s constant in wp-config.php%3$s',
                            'event_espresso'
                        ),
                        '<br><span class="ee-status--warning">',
                        'EE_USE_EDD_PLUGIN_LICENSING',
                        '</span>'
                    )
                    : '',
            ],
            FeatureFlag::USE_DATETIME_STATUS_CONTROLS  => [
                'name'            => esc_html__('Datetime Status Controls', 'event_espresso'),
                'html_label_text' => esc_html__('Use Datetime Status Controls', 'event_espresso'),
                'help_text'       => esc_html__(
                    'Whether to use the new Datetime Status Controls in the EDTR. default: Disabled',
                    'event_espresso'
                ),
                'overridden'      => false,
                'overridden_by'   => '',
            ],
            FeatureFlag::USE_PAYMENT_PROCESSOR_FEES    => [
                'name'            => esc_html__('Gateway Partner Fees', 'event_espresso'),
                'html_label_text' => esc_html__('Apply Payment Processor Fees', 'event_espresso'),
                'help_text'       => esc_html__(
                    'Whether to apply Gateway Partner fees to transactions. default: Disabled',
                    'event_espresso'
                ),
                'overridden'      => false,
                'overridden_by'   => '',
            ],
        ];
    }
}
