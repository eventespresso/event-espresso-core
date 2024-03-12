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
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function column_event_name(EE_Registration $registration): string
    {
        $this->_set_related_details($registration);
        $edit_event                = $this->editEventLink($registration);
        $actions['event_filter']   = $this->eventFilterLink($registration);
        $actions['event_checkins'] = $this->viewCheckinsLink($registration);
        return $this->columnContent(
            'event_name',
             $edit_event . $this->row_actions($actions)
        );
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
        $ticket                = $registration->ticket();
        $datetimes             = $ticket instanceof EE_Ticket
            ? $ticket->datetimes(['default_where_conditions' => 'none'])
            : [];
        $datetimes_for_display = [];
        foreach ($datetimes as $datetime) {
            $datetime_string         = '<div class="ee-reg-list-dates-list-date">';
            $datetime_string         .= $datetime->get_i18n_datetime('DTT_EVT_start', 'M jS Y g:i a');
            $datetime_string         .= $this->row_actions(
                [
                    'datetime_filter'   => $this->datetimeFilterLink($registration, $datetime),
                    'datetime_checkins' => $this->viewCheckinsLink($registration, $datetime),
                ]
            );
            $datetime_string         .= '</div>';
            $datetimes_for_display[] = $datetime_string;
        }
        return $this->columnContent(
            'DTT_EVT_start',
            $this->generateDisplayForDateTimes($datetimes_for_display)
        );
    }


    /**
     * @param EE_Registration $registration
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_REG_ticket(EE_Registration $registration): string
    {
        $ticket      = $registration->ticket();
        $ticket_name = $this->ticketName($ticket);
        $actions     = [
            'ticket_filter'   => $this->ticketFilterLink($ticket),
            'ticket_checkins' => $this->viewCheckinsLink($registration, null, $ticket),
        ];
        return $this->columnContent(
            'REG_ticket',
            $ticket_name . $this->row_actions($actions)
        );
    }


    /**
     * @param EE_Registration $registration
     * @param EE_Datetime     $datetime
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     * @since 5.0.18.p
     */
    protected function datetimeFilterLink(EE_Registration $registration, EE_Datetime $datetime): string
    {
        $datetime_filter_url = EE_Admin_Page::add_query_args_and_nonce(
            [
                'event_id'    => $registration->event_ID(),
                'datetime_id' => $datetime->ID(),
            ],
            REG_ADMIN_URL
        );
        return '
            <a  class="ee-aria-tooltip ee-datetime-filter-link"
                href="' . $datetime_filter_url . '"
                aria-label="' . sprintf(
                esc_attr__('Filter this list to only show registrations for %s', 'event_espresso'),
                $datetime->name() ?: esc_attr__('this datetime', 'event_espresso'),
            ) . '"
            >
                <span class="dashicons dashicons-groups dashicons--small"></span>
            </a>';
    }


    /**
     * @param EE_Registration  $registration
     * @param EE_Datetime|null $datetime
     * @param EE_Ticket|null   $ticket
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     * @since 5.0.18.p
     */
    private function viewCheckinsLink(
        EE_Registration $registration,
        ?EE_Datetime $datetime = null,
        ?EE_Ticket $ticket = null
    ): string {
        if (! $this->caps_handler->userCanReadRegistrationCheckin($registration)) {
            return '';
        }
        $text  = esc_html__('View Check-ins', 'event_espresso');
        $label = esc_attr__('View Check-ins for this Event', 'event_espresso');
        $class = 'ee-aria-tooltip';

        $url_params = [
            'action'   => 'event_registrations',
            'event_id' => $registration->event_ID(),
        ];
        if ($datetime instanceof EE_Datetime) {
            $url_params['DTT_ID'] = $datetime->ID();
            $text                 = '';
            $label                = esc_attr__('View Check-ins for this Datetime', 'event_espresso');
            $class                .= ' ee-status-color--' . $datetime->get_active_status();
        }
        if ($ticket instanceof EE_Ticket) {
            $url_params['TKT_ID'] = $ticket->ID();
            $text                 = esc_html__('View Check-ins', 'event_espresso');
            $label                = esc_attr__('View Check-ins for this Ticket', 'event_espresso');
            $class                .= ' ee-status-color--' . $ticket->ticket_status();
        }
        $url = EE_Admin_Page::add_query_args_and_nonce($url_params, REG_ADMIN_URL);
        return "
        <a aria-label='$label' class='$class' href='$url'>
            <span class='dashicons dashicons-yes-alt dashicons--small'></span>$text
        </a>";
    }
}
