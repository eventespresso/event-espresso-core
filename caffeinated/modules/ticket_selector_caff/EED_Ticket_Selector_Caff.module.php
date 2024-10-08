<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;

/**
 *
 * EED_Ticket_Selector_Caff
 *
 * @package    Event Espresso
 * @subpackage /modules/events_archive_caff/
 * @author     Brent Christensen
 * @method EED_Ticket_Selector_Caff get_instance($module_name)
 * @method EE_Ticket_Selector_Config config()
 */
class EED_Ticket_Selector_Caff extends EED_Ticket_Selector
{
    /**
     * @return EED_Module|EED_Ticket_Selector_Caff
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function instance()
    {
        return EED_Module::get_instance(__CLASS__);
    }


    /**
     *    set_hooks - for hooking into EE Core, other modules, etc
     *
     * @access    public
     * @return    void
     */
    public static function set_hooks()
    {
        add_action(
            'AHEE__ticket_selector_chart_template__ticket_details__after_description',
            ['EED_Ticket_Selector_Caff', 'ticket_price_details'],
            10,
            3
        );
    }


    /**
     *    set_hooks_admin - for hooking into EE Admin Core, other modules, etc
     *
     * @access    public
     * @return    void
     */
    public static function set_hooks_admin()
    {
        define(
            'TICKET_SELECTOR_CAFF_TEMPLATES_PATH',
            str_replace('\\', '/', plugin_dir_path(__FILE__)) . 'templates/'
        );
        add_action(
            'AHEE__template_settings__template__before_settings_form',
            ['EED_Ticket_Selector_Caff', 'template_settings_form']
        );
        add_filter(
            'FHEE__General_Settings_Admin_Page__update_template_settings__data',
            ['EED_Ticket_Selector_Caff', 'update_template_settings'],
            10,
            2
        );
    }


    /**
     * @param WP $WP
     */
    public function run($WP)
    {
        $this->set_config();
    }


    /**
     * @static
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function template_settings_form()
    {
        echo EED_Ticket_Selector_Caff::_ticket_selector_settings_form()->get_html();
    }


    /**
     * @return EE_Form_Section_Proper
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function _ticket_selector_settings_form(): EE_Form_Section_Proper
    {
        return new EE_Form_Section_Proper(
            [
                'name'            => 'ticket_selector_settings_form',
                'html_id'         => 'ticket_selector_settings_form',
                'layout_strategy' => new EE_Div_Per_Section_Layout(),
                'subsections'     => apply_filters(
                    'FHEE__EED_Ticket_Selector_Caff___ticket_selector_settings_form__form_subsections',
                    [
                        'appearance_settings_hdr' => new EE_Form_Section_HTML(
                            EEH_HTML::br(2) .
                            EEH_HTML::h2(esc_html__('Ticket Selector Template Settings', 'event_espresso'))
                        ),
                        'appearance_settings'     => EED_Ticket_Selector_Caff::_ticket_selector_appearance_settings(),
                    ]
                ),
            ]
        );
    }


    /**
     * @return EE_Form_Section_Proper
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function _ticket_selector_appearance_settings(): EE_Form_Section_Proper
    {
        if (
            ! EE_Registry::instance()->CFG->template_settings->EED_Ticket_Selector instanceof EE_Ticket_Selector_Config
        ) {
            EED_Ticket_Selector::instance()->set_config();
            EE_Registry::instance()->CFG->template_settings->EED_Ticket_Selector = EED_Ticket_Selector::instance()
                                                                                                      ->config();
        }
        $EE_Ticket_Selector_Config = EE_Registry::instance()->CFG->template_settings->EED_Ticket_Selector;
        // get option for whether to show datetime selector in TS
        $show_datetime_selector = $EE_Ticket_Selector_Config->getShowDatetimeSelector();
        // and option for how may datetimes must exist if display is conditional
        $datetime_selector_threshold = $EE_Ticket_Selector_Config->getDatetimeSelectorThreshold();

        return new EE_Form_Section_Proper(
            [
                'name'            => 'ticket_selector_settings_tbl',
                'html_id'         => 'ticket_selector_settings_tbl',
                'html_class'      => 'form-table',
                'layout_strategy' => new EE_Admin_Two_Column_Layout(),
                'subsections'     => apply_filters(
                    'FHEE__EED_Ticket_Selector_Caff___ticket_selector_appearance_settings__form_subsections',
                    [
                        'use_new_checkbox_selector' => new EE_Switch_Input(
                            [
                                'html_label_text' => esc_html__('Use New Checkbox Selector', 'event_espresso'),
                                'default'        => $EE_Ticket_Selector_Config->useNewCheckboxSelector()
                                    ? EE_Switch_Input::OPTION_ON
                                    : EE_Switch_Input::OPTION_OFF,
                                'html_name'      => 'use_new_checkbox_selector',
                                'html_help_text' => esc_html__(
                                    'Whether to display a a checkbox in the ticket selector when the max qty for a ticket is set to 1, meaning only one of that ticket can be purchased at a time. Defaults to off.',
                                    'event_espresso'
                                ),
                                'layout_container_class' => 'ee-feature-highlight-2024',
                                'extra_container_html' => '<span class="ee-feature-highlight-2024-notice">✨ ' . esc_html__('NEW','event_espresso') . '</span>',
                            ],
                            [
                                EE_Switch_Input::OPTION_OFF => esc_html__(
                                    esc_html__('new checkbox selector will NOT be used', 'event_espresso'),
                                    'event_espresso'
                                ),
                                EE_Switch_Input::OPTION_ON  => esc_html__(
                                    esc_html__('new checkbox selector WILL be used', 'event_espresso'),
                                    'event_espresso'
                                ),
                            ]
                        ),
                        'use_new_form_styles' => new EE_Switch_Input(
                            [
                                'html_label_text' => esc_html__('Use New Ticket Selector Form Styles', 'event_espresso'),
                                'default'        => $EE_Ticket_Selector_Config->useNewFormStyles()
                                    ? EE_Switch_Input::OPTION_ON
                                    : EE_Switch_Input::OPTION_OFF,
                                'html_name'      => 'use_new_form_styles',
                                'html_help_text' => esc_html__(
                                    'Whether to use new form styles for the ticket selector inputs and submit button. Defaults to off.',
                                    'event_espresso'
                                ),
                                'layout_container_class' => 'ee-feature-highlight-2024',
                                'extra_container_html' => '<span class="ee-feature-highlight-2024-notice">✨ ' . esc_html__('NEW','event_espresso') . '</span>',
                            ],
                            [
                                EE_Switch_Input::OPTION_OFF => esc_html__(
                                    esc_html__('new form styles will NOT be used', 'event_espresso'),
                                    'event_espresso'
                                ),
                                EE_Switch_Input::OPTION_ON  => esc_html__(
                                    esc_html__('new form styles WILL be used', 'event_espresso'),
                                    'event_espresso'
                                ),
                            ]
                        ),
                        'accent_color' => new EE_Text_Input(
                            [
                                'html_label_text' => esc_html__('Accent Color', 'event_espresso'),
                                'html_help_text'  => sprintf(
                                    esc_html__(
                                        'Enter a hex color code to use as the accent color for the ticket selector form. Defaults to a bright blue.%1$sPRO TIP: choosing colors nearest the top right corner of the color picker tool will work best!%2$s',
                                        'event_espresso'
                                    ),
                                    '<br><strong>',
                                    '</strong>'
                                ),
                                'html_name'       => 'accent_color',
                                'html_class'      => 'ee-input-width--tiny',
                                'default'         => $EE_Ticket_Selector_Config->accentColorAsHex(),
                                'layout_container_class' => 'ee-feature-highlight-2024',
                                'extra_container_html' => '<span class="ee-feature-highlight-2024-notice">✨ ' . esc_html__('NEW','event_espresso') . '</span>',
                            ],
                            'color'
                        ),
                        'show_ticket_details'           => new EE_Yes_No_Input(
                            [
                                'html_label_text'         => esc_html__(
                                    'Show Ticket Details?',
                                    'event_espresso'
                                ),
                                'html_help_text'          => esc_html__(
                                    'This lets you choose whether the extra ticket details section is displayed with the ticket selector.',
                                    'event_espresso'
                                ),
                                'default'                 => $EE_Ticket_Selector_Config->show_ticket_details ?? true,
                                'display_html_label_text' => false,
                            ]
                        ),
                        'show_ticket_sale_columns'      => new EE_Yes_No_Input(
                            [
                                'html_label_text'         => esc_html__(
                                    'Show Ticket Sale Info?',
                                    'event_espresso'
                                ),
                                'html_help_text'          => esc_html__(
                                    'This lets you indicate whether information about ticket sales is shown with ticket details in the ticket selector.',
                                    'event_espresso'
                                ),
                                'default'                 => $EE_Ticket_Selector_Config->show_ticket_sale_columns ?? true,
                                'display_html_label_text' => false,
                            ]
                        ),
                        'show_expired_tickets'          => new EE_Yes_No_Input(
                            [
                                'html_label_text'         => esc_html__(
                                    'Show Expired Tickets?',
                                    'event_espresso'
                                ),
                                'html_help_text'          => esc_html__(
                                    'Indicate whether to show expired tickets in the ticket selector',
                                    'event_espresso'
                                ),
                                'default'                 => $EE_Ticket_Selector_Config->show_expired_tickets ?? true,
                                'display_html_label_text' => false,
                            ]
                        ),
                        'show_datetime_selector'        => new EE_Select_Input(
                            $EE_Ticket_Selector_Config->getShowDatetimeSelectorOptions(false),
                            [
                                'html_label_text'         => esc_html__(
                                    'Show Date & Time Filter?',
                                    'event_espresso'
                                ),
                                'html_help_text'          => sprintf(
                                    esc_html__(
                                        'Indicates whether or not to display a dropdown select box above each ticket selector that displays dates and times for the available tickets. Ticket options can be unselected, which removes (hides) them from the list of tickets being displayed.%1$sOptions include:%1$s &bull; %2$sdo not show date & time filter%3$s%1$s &nbsp; this option will NEVER display a date filter, regardless of how many dates exist.%1$s &bull; %2$smaybe show date & time filter%3$s%1$s &nbsp; this option will conditionally display the date filter when the number of dates for the event matches the value set for "Date Filter Threshold".',
                                        'event_espresso'
                                    ),
                                    '<br>',
                                    '<strong>',
                                    '</strong>'
                                ),
                                'default'                 => ! empty($show_datetime_selector)
                                    ? $show_datetime_selector
                                    : EE_Ticket_Selector_Config::DO_NOT_SHOW_DATETIME_SELECTOR,
                                'display_html_label_text' => false,
                                'html_class'              => 'ee-input-width--reg',
                            ]
                        ),
                        'datetime_selector_threshold'   => new EE_Select_Input(
                            array_combine($r = range(1, 10), $r),
                            [
                                'html_label_text'         => esc_html__(
                                    'Date & Time Filter Threshold',
                                    'event_espresso'
                                ),
                                'html_help_text'          => esc_html__(
                                    'The number of unique dates an event has to have before conditionally displaying a date & time filter',
                                    'event_espresso'
                                ),
                                'default'                 => ! empty($datetime_selector_threshold)
                                    ? $datetime_selector_threshold
                                    : 3,
                                'display_html_label_text' => false,
                                'html_class'              => 'ee-input-width--tiny',
                            ]
                        ),
                        'datetime_selector_max_checked' => new EE_Integer_Input(
                            [
                                'html_label_text'         => esc_html__(
                                    'Date & Time Filter Max Checked',
                                    'event_espresso'
                                ),
                                'html_help_text'          => sprintf(
                                    esc_html__(
                                        'Determines the maximum number of dates that will be checked upon initial loading for a Date and Time Filter.%1$sIf set to zero or left blank, then ALL dates will be checked upon initial loading.',
                                        'event_espresso'
                                    ),
                                    '<br>'
                                ),
                                'default'                 => $EE_Ticket_Selector_Config->getDatetimeSelectorMaxChecked(
                                ),
                                'display_html_label_text' => false,
                                'min_value'               => 0,
                                'html_class'              => 'ee-input-width--tiny',
                            ]
                        ),
                    ]
                ),
            ]
        );
    }


    /**
     * callback for updating template settings
     *
     * @param EE_Template_Config $CFG
     * @param array              $REQ incoming request
     * @return EE_Template_Config
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @since 4.6.18.rc.006
     */
    public static function update_template_settings(EE_Template_Config $CFG, array $REQ): EE_Template_Config
    {
        /** @var EE_Capabilities $capabilities */
        $capabilities = LoaderFactory::getLoader()->getShared(EE_Capabilities::class);
        if (! $capabilities->current_user_can('ee_edit_events', 'edit-event-template-settings')) {
            wp_die(esc_html__('You do not have the required privileges to perform this action', 'event_espresso'));
        }
        if (! $CFG->EED_Ticket_Selector instanceof EE_Ticket_Selector_Config) {
            EED_Ticket_Selector::instance()->set_config();
            $CFG->EED_Ticket_Selector = EED_Ticket_Selector::instance()->config();
        }
        try {
            $ticket_selector_form = EED_Ticket_Selector_Caff::_ticket_selector_settings_form();

            // check for form submission
            if ($ticket_selector_form->was_submitted()) {
                // capture form data
                $ticket_selector_form->receive_form_submission();

                // validate form data
                if ($ticket_selector_form->is_valid()) {
                    // grab validated data from form
                    $valid_data = $ticket_selector_form->valid_data();

                    // set data on config
                    $CFG->EED_Ticket_Selector->show_ticket_sale_columns =
                        $valid_data['appearance_settings']['show_ticket_sale_columns'] ?? false;
                    $CFG->EED_Ticket_Selector->show_ticket_details      =
                        $valid_data['appearance_settings']['show_ticket_details'] ?? false;
                    $CFG->EED_Ticket_Selector->show_expired_tickets     =
                        $valid_data['appearance_settings']['show_expired_tickets'] ?? false;
                    $CFG->EED_Ticket_Selector->setShowDatetimeSelector(
                        $valid_data['appearance_settings']['show_datetime_selector']
                            ?? EE_Ticket_Selector_Config::DO_NOT_SHOW_DATETIME_SELECTOR
                    );
                    $CFG->EED_Ticket_Selector->setDatetimeSelectorThreshold(
                        $valid_data['appearance_settings']['datetime_selector_threshold'] ?? 3
                    );
                    $CFG->EED_Ticket_Selector->setDatetimeSelectorMaxChecked(
                        $valid_data['appearance_settings']['datetime_selector_max_checked'] ?? 10
                    );
                    $CFG->EED_Ticket_Selector->setUseNewCheckboxSelector(
                        $valid_data['appearance_settings']['use_new_checkbox_selector'] ?? false
                    );
                    $CFG->EED_Ticket_Selector->setUseNewFormStyles(
                        $valid_data['appearance_settings']['use_new_form_styles'] ?? false
                    );
                    $CFG->EED_Ticket_Selector->setAccentColorHex(
                        $valid_data['appearance_settings']['accent_color'] ?? '#0080FF'
                    );
                } else {
                    if ($ticket_selector_form->submission_error_message() !== '') {
                        EE_Error::add_error(
                            $ticket_selector_form->submission_error_message(),
                            __FILE__,
                            __FUNCTION__,
                            __LINE__
                        );
                    }
                }
            }
        } catch (EE_Error $e) {
            $e->get_error();
        }

        return $CFG;
    }


    /**
     * @param EE_Ticket $ticket
     * @param float     $ticket_price
     * @param bool      $display_ticket_price
     */
    public static function ticket_price_details(
        EE_Ticket $ticket,
        float $ticket_price = 0.0,
        bool $display_ticket_price = false
    ) {
        require str_replace('\\', '/', plugin_dir_path(__FILE__))
            . 'templates/ticket_selector_price_details.template.php';
    }
}
