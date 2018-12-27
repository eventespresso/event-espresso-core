<?php

/**
 * This is the caffeinated class for the event list table.  It is only loaded in caffeinated versions of Event
 * Espresso.
 *
 * @package          Event Espresso
 * @subpackage       admin
 * @since            4.4.9
 * @author           Darren Ethier
 */
class Extend_Events_Admin_List_Table extends Events_Admin_List_Table
{

    protected function _column_name_action_setup(EE_Event $item)
    {
        $export_query_args = array(
            'action' => 'export_events',
            'EVT_ID' => $item->ID(),
        );
        $export_event_link = EE_Admin_Page::add_query_args_and_nonce($export_query_args, EVENTS_ADMIN_URL);

        $actions = parent::_column_name_action_setup($item);
        return $actions;
    }
}
