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
    protected function _column_name_action_setup(EE_Event $event): array
    {
        $export_query_args = [
            'action' => 'export_events',
            'EVT_ID' => $event->ID(),
        ];
        $export_event_link = EE_Admin_Page::add_query_args_and_nonce($export_query_args, EVENTS_ADMIN_URL);

        return parent::_column_name_action_setup($event);
    }


    /**
     * hook into list table filters and provide filters for caffeinated list table
     *
     * @return array                  new filters
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _get_table_filters()
    {
        // first month/year filters
        $filters[] = $this->espresso_event_months_dropdown();
        $status    = $this->_req_data['status'] ?? '';
        // active status dropdown
        if ($status !== 'draft') {
            $filters[] = $this->active_status_dropdown($this->_req_data['active_status'] ?? '');
            $filters[] = $this->venuesDropdown($this->_req_data['venue'] ?? '');
        }
        // category filter
        $filters[] = $this->category_dropdown();
        return $filters;
    }


    /**
     * espresso_event_months_dropdown
     *
     * @return string                dropdown listing month/year selections for events.
     * @throws EE_Error
     */
    public function espresso_event_months_dropdown(): string
    {
        // what we need to do is get all PRIMARY datetimes for all events to filter on.
        // Note we need to include any other filters that are set!
        return EEH_Form_Fields::generate_event_months_dropdown(
            $this->_req_data['month_range'] ?? null,
            $this->_req_data['status'] ?? null,
            $this->_req_data['EVT_CAT'] ?? 0,
            $this->_req_data['active_status'] ?? null
        );
    }


    /**
     * returns a list of "active" statuses on the event
     *
     * @param string $current_value whatever the current active status is
     * @return string
     */
    public function active_status_dropdown(string $current_value = ''): string
    {
        $select_name = 'active_status';
        $values      = [
            'none'     => esc_html__('Show Active/Inactive', 'event_espresso'),
            'active'   => esc_html__('Active', 'event_espresso'),
            'upcoming' => esc_html__('Upcoming', 'event_espresso'),
            'expired'  => esc_html__('Expired', 'event_espresso'),
            'inactive' => esc_html__('Inactive', 'event_espresso'),
        ];

        return EEH_Form_Fields::select_input($select_name, $values, $current_value);
    }


    /**
     * returns a list of "venues"
     *
     * @param string $current_value whatever the current active status is
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function venuesDropdown(string $current_value = ''): string
    {
        $values = ['' => esc_html__('All Venues', 'event_espresso')];
        // populate the list of venues.
        $venues = EEM_Venue::instance()->get_all(['order_by' => ['VNU_name' => 'ASC']]);

        foreach ($venues as $venue) {
            $values[ $venue->ID() ] = $venue->name();
        }

        return EEH_Form_Fields::select_input('venue', $values, $current_value);
    }


    /**
     * output a dropdown of the categories for the category filter on the event admin list table
     *
     * @return string html
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function category_dropdown(): string
    {
        return EEH_Form_Fields::generate_event_category_dropdown(
            $this->_req_data['EVT_CAT'] ?? -1
        );
    }
}
