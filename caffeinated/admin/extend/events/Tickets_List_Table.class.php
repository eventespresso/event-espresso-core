<?php

/**
 * Tickets_List_Table
 *
 * Class for preparing the table listing all the default tickets
 *
 * note: anywhere there are no php docs it is because the docs are available in the parent class.
 *
 * @package            Tickets List Table
 * @subpackage         caffeinated/admin/new/tickets/Tickets_List_Table.core.php
 * @author             Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Tickets_List_Table extends EE_Admin_List_Table
{


    protected function _setup_data()
    {
        $trashed = $this->_admin_page->get_view() == 'trashed' ? true : false;
        $this->_data = $this->_admin_page->get_default_tickets($this->_per_page, false, $trashed);
        $this->_all_data_count = $this->_admin_page->get_default_tickets($this->_per_page, true, false);
        $this->_trashed_count = $this->_admin_page->get_default_tickets($this->_per_page, true, true);
    }


    protected function _set_properties()
    {
        $this->_wp_list_args = array(
            'singular' => __('ticket', 'event_espresso'),
            'plural'   => __('tickets', 'event_espresso'),
            'ajax'     => true,
            'screen'   => $this->_admin_page->get_current_screen()->id,
        );

        $this->_columns = array(
            'cb'              => '<input type="checkbox" />', // Render a checkbox instead of text
            'TKT_name'        => __('Name', 'event_espresso'),
            'TKT_description' => __('Description', 'event_espresso'),
            'TKT_qty'         => __('Quantity', 'event_espresso'),
            'TKT_uses'        => __('Datetimes', 'event_espresso'),
            'TKT_min'         => __('Minimum', 'event_espresso'),
            'TKT_max'         => __('Maximum', 'event_espresso'),
            'TKT_price'       => __('Price', 'event_espresso'),
            'TKT_taxable'     => __('Taxable', 'event_espresso'),
        );

        $this->_sortable_columns = array(
            // TRUE means its already sorted
            'TKT_name'        => array('TKT_name' => true),
            'TKT_description' => array('TKT_description' => false),
            'TKT_qty'         => array('TKT_qty' => false),
            'TKT_uses'        => array('TKT_uses' => false),
            'TKT_min'         => array('TKT_min' => false),
            'TKT_max'         => array('TKT_max' => false),
            'TKT_price'       => array('TKT_price' => false),
        );

        $this->_hidden_columns = array();
    }


    protected function _get_table_filters()
    {
    }


    protected function _add_view_counts()
    {
        $this->_views['all']['count'] = $this->_all_data_count;
        $this->_views['trashed']['count'] = $this->_trashed_count;
    }


    /**
     * @param EE_Ticket $item
     * @return string|void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_cb($item)
    {
        return $item->ID() === 1
            ? '<span class="ee-lock-icon"></span>'
            : sprintf(
                '<input type="checkbox" name="checkbox[%1$s]" value="%1$s" />',
                $item->ID()
            );
    }


    /**
     * @param EE_Ticket $ticket
     * @return string|void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_TKT_name(EE_Ticket $ticket)
    {
        // build row actions
        $actions = array();

        // trash links
        if ($ticket->ID() !== 1) {
            if ($this->_view == 'all') {
                $trash_lnk_url = EE_Admin_Page::add_query_args_and_nonce(array(
                    'action' => 'trash_ticket',
                    'TKT_ID' => $ticket->ID(),
                ), EVENTS_ADMIN_URL);
                $actions['trash'] = '<a href="' . $trash_lnk_url . '" title="'
                                    . esc_attr__('Move Ticket to trash', 'event_espresso') . '">'
                                    . __('Trash', 'event_espresso') . '</a>';
            } else {
                // restore price link
                $restore_lnk_url = EE_Admin_Page::add_query_args_and_nonce(array(
                    'action' => 'restore_ticket',
                    'TKT_ID' => $ticket->ID(),
                ), EVENTS_ADMIN_URL);
                $actions['restore'] = '<a href="' . $restore_lnk_url . '" title="'
                                      . esc_attr__('Restore Ticket', 'event_espresso') . '">'
                                      . __('Restore', 'event_espresso') . '</a>';
                // delete price link
                $delete_lnk_url = EE_Admin_Page::add_query_args_and_nonce(array(
                    'action' => 'delete_ticket',
                    'TKT_ID' => $ticket->ID(),
                ), EVENTS_ADMIN_URL);
                $actions['delete'] = '<a href="' . $delete_lnk_url . '" title="'
                                     . esc_attr__('Delete Ticket Permanently', 'event_espresso') . '">'
                                     . __('Delete Permanently', 'event_espresso') . '</a>';
            }
        }

        return $ticket->name() . $this->row_actions($actions);
    }


    /**
     * @param EE_Ticket $ticket
     * @return string|void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_TKT_description(EE_Ticket $ticket)
    {
        return $ticket->description();
    }


    /**
     * @param EE_Ticket $ticket
     * @return string|void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_TKT_qty(EE_Ticket $ticket)
    {
        return $ticket->qty();
    }


    /**
     * @param EE_Ticket $ticket
     * @return string|void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_TKT_uses(EE_Ticket $ticket)
    {
        return $ticket->uses();
    }


    /**
     * @param EE_Ticket $ticket
     * @return string|void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_TKT_min(EE_Ticket $ticket)
    {
        return $ticket->min();
    }


    /**
     * @param EE_Ticket $ticket
     * @return string|void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_TKT_max(EE_Ticket $ticket)
    {
        return $ticket->max();
    }


    /**
     * @param EE_Ticket $ticket
     * @return string|void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_TKT_price(EE_Ticket $ticket)
    {
        return $ticket->pretty_price();
    }


    /**
     * @param EE_Ticket $ticket
     * @return string|void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_TKT_taxable(EE_Ticket $ticket)
    {
        return $ticket->taxable() ? __('Yes', 'event_espresso') : __('No', 'event_espresso');
    }
}
