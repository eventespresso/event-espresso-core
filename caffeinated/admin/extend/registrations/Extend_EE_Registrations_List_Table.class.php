<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;

/**
 * Extend_EE_Registrations_List_Table
 *
 * @package            Event Espresso
 * @subpackage         caffeinated/admin/extend/registrations/Extend_EE_Registrations_List_Table.class.php
 * @author             Darren Ethier
 */
class Extend_EE_Registrations_List_Table extends EE_Registrations_List_Table
{

    /**
     * @param EE_Registration $registration
     * @param bool            $prep_content
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column__REG_date(EE_Registration $registration, bool $prep_content = true): string
    {
        $actions['check_in'] = '';
        $date_linked = parent::column__REG_date($registration, false);
        $actions = array();

        if (
            $this->caps_handler->userCanReadRegistrationCheckins()
            && $this->caps_handler->userCanReadRegistrationCheckin($registration)
        ) {
            $check_in_url = EE_Admin_Page::add_query_args_and_nonce(
                [
                    'action' => 'event_registrations',
                    'event_id' => $registration->event_ID(),
                ],
                REG_ADMIN_URL
            );

            $actions['check_in'] = '
            <a  class="ee-aria-tooltip ee-event-filter-link" 
                href="' . $check_in_url . '"
                aria-label="' . esc_attr__(
                   'The Check-In List allows you to easily toggle check-in status for this event',
                   'event_espresso'
               ) . '"
            >
                <span class="dashicons dashicons-groups dashicons--small"></span>'
                . esc_html__('View Check-ins', 'event_espresso') . '
            </a>';
        }

        $content = sprintf('%1$s %2$s', $date_linked, $this->row_actions($actions));

        return $prep_content ? $this->columnContent('_REG_date', $content) : $content;
    }


    /**
     * @param EE_Registration $registration
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function column_DTT_EVT_start(EE_Registration $registration): string
    {
        $remove_defaults = array('default_where_conditions' => 'none');
        $ticket = $registration->ticket();
        $datetimes = $ticket instanceof EE_Ticket ? $ticket->datetimes($remove_defaults) : array();
        $EVT_ID = $registration->event_ID();
        $datetimes_for_display = array();
        foreach ($datetimes as $datetime) {
            $datetime_string = '<div class="ee-reg-list-dates-list-date">';
            if ($this->caps_handler->userCanReadRegistrationCheckin($registration)) {
                $checkins_url = EE_Admin_Page::add_query_args_and_nonce(
                    [
                        'action'   => 'event_registrations',
                        'event_id' => $EVT_ID,
                        'DTT_ID'   => $datetime->ID(),
                    ],
                    REG_ADMIN_URL
                );
                // open "a" tag and "href"
                $datetime_string .= '
                    <a class="ee-aria-tooltip ee-status-color--' . $datetime->get_active_status() . '" 
                        href="' . $checkins_url . '"
                        aria-label="' . esc_attr__('View Checkins for this Event', 'event_espresso') . '"
                    >
                        ' . $datetime->get_i18n_datetime('DTT_EVT_start', 'M jS Y g:i a') . '
                    </a>';
            } else {
                $datetime_string .= $datetime->get_i18n_datetime('DTT_EVT_start', 'M jS Y g:i a');
            }
            // add a "View Registrations" link that filters list by event AND datetime
            $filter_list_url = EE_Admin_Page::add_query_args_and_nonce(
                ['event_id' => $EVT_ID, 'datetime_id' => $datetime->ID()],
                REG_ADMIN_URL
            );
            $datetime_string .= $this->row_actions(
                array(
                    'event_datetime_filter' => '
                    <a class="ee-aria-tooltip ee-event-filter-link" 
                        href="' . $filter_list_url . '" 
                        aria-label="' . sprintf(
                        esc_attr__(
                            'Filter this list to only show registrations for this datetime %s',
                            'event_espresso'
                        ),
                        $datetime->name()
                    ) . '">
                        <span class="dashicons dashicons-groups dashicons--small"></span>
                    </a>',
                )
            );
                        // ' . esc_html__('View Registrations', 'event_espresso') . '
            $datetime_string .= '</div>';
            $datetimes_for_display[] = $datetime_string;
        }
        return $this->columnContent(
            'DTT_EVT_start',
            $this->generateDisplayForDateTimes($datetimes_for_display)
        );
    }
}
