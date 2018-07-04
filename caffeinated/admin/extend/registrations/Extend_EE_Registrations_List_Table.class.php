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
     * @param EE_Registration $item
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function column__REG_date(EE_Registration $item)
    {
        $date_linked = parent::column__REG_date($item);
        $actions = array();
        // Build row actions
        $check_in_url = EE_Admin_Page::add_query_args_and_nonce(array(
            'action'   => 'event_registrations',
            'event_id' => $item->event_ID(),
        ), REG_ADMIN_URL);
        $actions['check_in'] = EE_Registry::instance()->CAP->current_user_can(
            'ee_read_registration',
            'espresso_registrations_registration_checkins',
            $item->ID()
        ) && EE_Registry::instance()->CAP->current_user_can(
            'ee_read_checkins',
            'espresso_registrations_registration_checkins'
        )
            ? '<a href="' . $check_in_url . '"'
              . ' title="' . esc_attr__(
                  'The Check-In List allows you to easily toggle check-in status for this event',
                  'event_espresso'
              )
              . '">' . esc_html__('View Check-ins', 'event_espresso') . '</a>'
            : esc_html__('View Check-ins', 'event_espresso');

        return sprintf('%1$s %2$s', $date_linked, $this->row_actions($actions));
    }


    /**
     *        column_default
     *
     * @param \EE_Registration $item
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function column_DTT_EVT_start(EE_Registration $item)
    {
        $remove_defaults = array('default_where_conditions' => 'none');
        $ticket = $item->ticket();
        $datetimes = $ticket instanceof EE_Ticket ? $ticket->datetimes($remove_defaults) : array();
        $EVT_ID = $item->event_ID();
        $datetimes_for_display = array();
        foreach ($datetimes as $datetime) {
            $datetime_string = '';
            if (EE_Registry::instance()->CAP->current_user_can(
                'ee_read_checkin',
                'espresso_registrations_registration_checkins',
                $item->ID()
            )) {
                // open "a" tag and "href"
                $datetime_string .= '<a href="';
                // checkin URL
                $datetime_string .= EE_Admin_Page::add_query_args_and_nonce(
                    array(
                        'action'   => 'event_registrations',
                        'event_id' => $EVT_ID,
                        'DTT_ID'   => $datetime->ID(),
                    ),
                    REG_ADMIN_URL
                );
                // close "href"
                $datetime_string .= '"';
                // open "title" tag
                $datetime_string .= ' title="';
                // link title text
                $datetime_string .= esc_attr__('View Checkins for this Event', 'event_espresso');
                // close "title" tag and end of "a" tag opening
                $datetime_string .= '">';
                // link text
                $datetime_string .= $datetime->get_i18n_datetime('DTT_EVT_start');
                // close "a" tag
                $datetime_string .= '</a>';
            } else {
                $datetime_string .= $datetime->get_i18n_datetime('DTT_EVT_start');
            }
            // add a "View Registrations" link that filters list by event AND datetime
            $datetime_string .= $this->row_actions(
                array(
                    'event_datetime_filter' => '<a href="' . EE_Admin_Page::add_query_args_and_nonce(
                        array('event_id' => $EVT_ID, 'datetime_id' => $datetime->ID()),
                        REG_ADMIN_URL
                    )
                                               . '" title="' . sprintf(
                                                   esc_attr__(
                                                       'Filter this list to only show registrations for this datetime %s',
                                                       'event_espresso'
                                                   ),
                                                   $datetime->name()
                                               ) . '">'
                                               . esc_html__('View Registrations', 'event_espresso')
                                               . '</a>',
                )
            );
            $datetimes_for_display[] = $datetime_string;
        }
        return $this->generateDisplayForDateTimes($datetimes_for_display);
    }
}
