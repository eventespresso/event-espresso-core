<?php

use EventEspresso\core\exceptions\ExceptionStackTraceDisplay;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;

/**
 *
 * EED_Ticket_Selector_Caff
 *
 * @package        Event Espresso
 * @subpackage     /modules/events_archive_caff/
 * @author         Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EED_Ticket_Selector_Caff extends EED_Ticket_Selector
{


    /**
     * @return EED_Module|EED_Ticket_Selector_Caff
     */
    public static function instance()
    {
        return parent::get_instance(__CLASS__);
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
            array('EED_Ticket_Selector_Caff', 'ticket_price_details'),
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
            array('EED_Ticket_Selector_Caff', 'template_settings_form'),
            10
        );
        add_filter(
            'FHEE__General_Settings_Admin_Page__update_template_settings__data',
            array('EED_Ticket_Selector_Caff', 'update_template_settings'),
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
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function template_settings_form()
    {
        echo EED_Ticket_Selector_Caff::_ticket_selector_settings_form()->get_html();
    }


    /**
     * @return EE_Form_Section_Proper
     * @throws EE_Error
     */
    public static function _ticket_selector_settings_form()
    {

        return new EE_Form_Section_Proper(
            array(
                'name'            => 'ticket_selector_settings_form',
                'html_id'         => 'ticket_selector_settings_form',
                'layout_strategy' => new EE_Div_Per_Section_Layout(),
                'subsections'     => apply_filters(
                    'FHEE__EED_Ticket_Selector_Caff___ticket_selector_settings_form__form_subsections',
                    array(
                        'appearance_settings_hdr' => new EE_Form_Section_HTML(
                            EEH_HTML::br(2) .
                            EEH_HTML::h2(esc_html__('Ticket Selector Template Settings', 'event_espresso'))
                        ),
                        'appearance_settings'     => EED_Ticket_Selector_Caff::_ticket_selector_appearance_settings(),
                    )
                ),
            )
        );
    }


    /**
     * @return EE_Form_Section_Proper
     * @throws EE_Error
     */
    public static function _ticket_selector_appearance_settings()
    {
        if (! EE_Registry::instance()->CFG->template_settings->EED_Ticket_Selector instanceof EE_Ticket_Selector_Config
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
            array(
                'name'            => 'ticket_selector_settings_tbl',
                'html_id'         => 'ticket_selector_settings_tbl',
                'html_class'      => 'form-table',
                'layout_strategy' => new EE_Admin_Two_Column_Layout(),
                'subsections'     => apply_filters(
                    'FHEE__EED_Ticket_Selector_Caff___ticket_selector_appearance_settings__form_subsections',
                    array(
                        'show_ticket_details'         => new EE_Yes_No_Input(
                            array(
                                'html_label_text'         => esc_html__(
                                    'Show Ticket Details?',
                                    'event_espresso'
                                ),
                                'html_help_text'          => esc_html__(
                                    'This lets you choose whether the extra ticket details section is displayed with the ticket selector.',
                                    'event_espresso'
                                ),
                                'default'                 => isset($EE_Ticket_Selector_Config->show_ticket_details)
                                    ? $EE_Ticket_Selector_Config->show_ticket_details
                                    : true,
                                'display_html_label_text' => false,
                            )
                        ),
                        'show_ticket_sale_columns'    => new EE_Yes_No_Input(
                            array(
                                'html_label_text'         => esc_html__(
                                    'Show Ticket Sale Info?',
                                    'event_espresso'
                                ),
                                'html_help_text'          => esc_html__(
                                    'This lets you indicate whether information about ticket sales is shown with ticket details in the ticket selector.',
                                    'event_espresso'
                                ),
                                'default'                 => isset($EE_Ticket_Selector_Config->show_ticket_sale_columns)
                                    ? $EE_Ticket_Selector_Config->show_ticket_sale_columns
                                    : true,
                                'display_html_label_text' => false,
                            )
                        ),
                        'show_expired_tickets'        => new EE_Yes_No_Input(
                            array(
                                'html_label_text'         => esc_html__(
                                    'Show Expired Tickets?',
                                    'event_espresso'
                                ),
                                'html_help_text'          => esc_html__(
                                    'Indicate whether to show expired tickets in the ticket selector',
                                    'event_espresso'
                                ),
                                'default'                 => isset($EE_Ticket_Selector_Config->show_expired_tickets)
                                    ? $EE_Ticket_Selector_Config->show_expired_tickets
                                    : true,
                                'display_html_label_text' => false,
                            )
                        ),
                        'show_datetime_selector'      => new EE_Select_Input(
                            $EE_Ticket_Selector_Config->getShowDatetimeSelectorOptions(false),
                            array(
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
                            )
                        ),
                        'datetime_selector_threshold' => new EE_Select_Input(
                            array_combine($r = range(1, 10), $r),
                            array(
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
                            )
                        ),
                        'datetime_selector_max_checked' => new EE_Integer_Input(
                            array(
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
                                'default'                 => $EE_Ticket_Selector_Config->getDatetimeSelectorMaxChecked(),
                                'display_html_label_text' => false,
                                'min_value'               => 0,
                            )
                        ),
                    )
                ),
            )
        );
    }


    /**
     * callback for updating template settings
     *
     * @since 4.6.18.rc.006
     * @param EE_Template_Config $CFG
     * @param array              $REQ incoming request
     * @return EE_Template_Config
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function update_template_settings(EE_Template_Config $CFG, $REQ)
    {
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
                    $CFG->EED_Ticket_Selector->show_ticket_sale_columns = $valid_data['appearance_settings']['show_ticket_sale_columns'];
                    $CFG->EED_Ticket_Selector->show_ticket_details = $valid_data['appearance_settings']['show_ticket_details'];
                    $CFG->EED_Ticket_Selector->show_expired_tickets = $valid_data['appearance_settings']['show_expired_tickets'];
                    $CFG->EED_Ticket_Selector->setShowDatetimeSelector(
                        $valid_data['appearance_settings']['show_datetime_selector']
                    );
                    $CFG->EED_Ticket_Selector->setDatetimeSelectorThreshold(
                        $valid_data['appearance_settings']['datetime_selector_threshold']
                    );
                    $CFG->EED_Ticket_Selector->setDatetimeSelectorMaxChecked(
                        $valid_data['appearance_settings']['datetime_selector_max_checked']
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
     * @param int       $ticket_price
     * @param bool      $display_ticket_price
     * @throws Exception
     */
    public static function ticket_price_details(EE_Ticket $ticket, $ticket_price = 0, $display_ticket_price = false)
    {
        // NOTE: the seemingly unused variables below are used within the template
        try {
            $is_valid_base_price = $ticket->base_price() instanceof EE_Price;
            if ($is_valid_base_price) {
                $ticket_base_price_name = $ticket->base_price()->name();
                $ticket_base_price_pretty_price = $ticket->base_price()->pretty_price();
                $running_total = $ticket->base_price()->amount();
            } else {
                $running_total = 0;
            }
            $ticket_price_modifiers = [];
            foreach ($ticket->price_modifiers() as $price_modifier) {
                $ticket_price_modifier = new stdClass();
                $ticket_price_modifier->name = $price_modifier->name();
                $ticket_price_modifier->desc = $price_modifier->desc();

                if ($price_modifier->is_percent()) {
                    $ticket_price_modifier->desc .= ' ' . $price_modifier->pretty_price();
                    $new_sub_total = $running_total * ($price_modifier->amount() / 100);
                    $new_sub_total = $price_modifier->is_discount() ? $new_sub_total * -1 : $new_sub_total;
                } else {
                    $new_sub_total = $price_modifier->is_discount()
                        ? (float) $price_modifier->amount() * -1
                        : $price_modifier->pretty_price();
                }
                $ticket_price_modifier->sub_total = EEH_Money::formatForLocale($new_sub_total);
                $ticket_price_modifiers[] = $ticket_price_modifier;
                $running_total += $new_sub_total;
            }
            $pre_tax_subtotal = EEH_Money::formatForLocale($running_total, '', 4);
            // taxes
            $taxes = [];
            $total_taxes = 0;
            $display_taxes = $ticket->taxable();
            if ($display_taxes) {
                foreach ($ticket->get_ticket_taxes_for_admin() as $tax) {
                    $ticket_tax = new stdClass();
                    $ticket_tax->name = $tax->name();
                    $ticket_tax->rate = $tax->amount() . '%';
                    $tax_amount = $running_total * ($tax->amount() / 100);
                    $ticket_tax->amount = EEH_Money::formatForLocale($tax_amount, '', 4);
                    $total_taxes += $tax_amount;
                    $taxes[] = $ticket_tax;
                }
            }
            $ticket_total = EEH_Money::formatForLocale($running_total + $total_taxes, '', 4);
        } catch (Exception $exception) {
            EE_Error::add_error($exception->getMessage(), __FILE__, __FUNCTION__, __LINE__);
            new ExceptionStackTraceDisplay($exception);
        }
        require str_replace('\\', '/', plugin_dir_path(__FILE__))
                . 'templates/ticket_selector_price_details.template.php';
    }
}
