<?php

/**
 *
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
        EEH_Debug_Tools::printr(__FUNCTION__, __CLASS__, __FILE__, __LINE__, 2);
        $trashed = $this->_admin_page->get_view() == 'trashed' ? true : false;
        $this->_data = $this->_admin_page->get_default_tickets($this->_per_page, false, $trashed);
        $this->_all_data_count = $this->_admin_page->get_default_tickets($this->_per_page, true, false);
        $this->_trashed_count = $this->_admin_page->get_default_tickets($this->_per_page, true, true);
    }


    protected function _set_properties()
    {
        $this->_wp_list_args = array(
            'singular' => esc_html__('ticket', 'event_espresso'),
            'plural'   => esc_html__('tickets', 'event_espresso'),
            'ajax'     => true,
            'screen'   => $this->_admin_page->get_current_screen()->id,
        );

        $this->_columns = array(
            'cb'              => '<input type="checkbox" />', // Render a checkbox instead of text
            'id'              => esc_html__('ID', 'event_espresso'),
            'TKT_name'        => esc_html__('Name', 'event_espresso'),
            'TKT_description' => esc_html__('Description', 'event_espresso'),
            'TKT_qty'         => esc_html__('Quantity', 'event_espresso'),
            'TKT_uses'        => esc_html__('Uses', 'event_espresso'),
            'TKT_min'         => esc_html__('Minimum', 'event_espresso'),
            'TKT_max'         => esc_html__('Maximum', 'event_espresso'),
            'TKT_price'       => esc_html__('Price', 'event_espresso'),
            'TKT_taxable'     => esc_html__('Taxable', 'event_espresso'),
        );

        $this->_sortable_columns = array(
            // TRUE means its already sorted
            'id' => array('TKT_ID', false),
            'TKT_name'        => array('TKT_name', true),
            'TKT_description' => array('TKT_description', false),
            'TKT_qty'         => array('TKT_qty', false),
            'TKT_uses'        => array('TKT_uses', false),
            'TKT_min'         => array('TKT_min', false),
            'TKT_max'         => array('TKT_max', false),
            'TKT_price'       => array('TKT_price', false),
        );

        $this->_hidden_columns = array();
    }


    protected function _get_table_filters()
    {
    }


    protected function _add_view_counts()
    {
        $this->_views['all']['count'] = $this->_all_data_count;
        if (EE_Registry::instance()->CAP->current_user_can('ee_delete_default_tickets', 'trash_ticket')) {
            $this->_views['trashed']['count'] = $this->_trashed_count;
        }
    }


    public function column_cb($item)
    {
        return $item->ID() === 1
            ? '<span class="dashicons dashicons-lock"></span>'
            : sprintf(
                '<input type="checkbox" name="checkbox[%1$s]" value="%1$s" />',
                $item->ID()
            );
    }


    /**
     * @param EE_Ticket $item
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_id($item)
    {
        $content = '<span class="ee-entity-id">' . $item->ID() . '</span>';
        $content .= '<span class="show-on-mobile-view-only">' . $this->column_TKT_name($item, false) . '</span>';
        return $this->columnContent('id', $content, 'end');
    }


    /**
     * @param EE_Ticket $ticket
     * @param bool $prep_content
     * @return string
     */
    public function column_TKT_name($ticket, $prep_content = true)
    {
        // build row actions
        $actions = array();

        // trash links
        if ($ticket->ID() !== 1) {
            if ($this->_view == 'all') {
                $trash_lnk_url = EE_Admin_Page::add_query_args_and_nonce(array(
                    'action' => 'trash_ticket',
                    'TKT_ID' => $ticket->ID(),
                ), TICKETS_ADMIN_URL);
                $actions['trash'] = '<a href="' . $trash_lnk_url . '" aria-label="'
                                    . esc_attr__('Move Ticket to trash', 'event_espresso') . '">'
                                    . esc_html__('Trash', 'event_espresso') . '</a>';
            } else {
                // restore price link
                $restore_lnk_url = EE_Admin_Page::add_query_args_and_nonce(array(
                    'action' => 'restore_ticket',
                    'TKT_ID' => $ticket->ID(),
                ), TICKETS_ADMIN_URL);
                $actions['restore'] = '<a href="' . $restore_lnk_url . '" aria-label="'
                                      . esc_attr__('Restore Ticket', 'event_espresso') . '">'
                                      . esc_html__('Restore', 'event_espresso') . '</a>';
                // delete price link
                $delete_lnk_url = EE_Admin_Page::add_query_args_and_nonce(array(
                    'action' => 'delete_ticket',
                    'TKT_ID' => $ticket->ID(),
                ), TICKETS_ADMIN_URL);
                $actions['delete'] = '<a href="' . $delete_lnk_url . '" aria-label="'
                                     . esc_attr__('Delete Ticket Permanently', 'event_espresso') . '">'
                                     . esc_html__('Delete Permanently', 'event_espresso') . '</a>';
            }
        }
        // return $ticket->get('TKT_name') . $this->row_actions($actions);
        $content = $prep_content ? $ticket->name() . $this->row_actions($actions) : $ticket->name();
        return $prep_content ? $this->columnContent('TKT_name', $content) : $content;
    }


    /**
     * @param EE_Ticket $ticket
     */
    public function column_TKT_description($ticket)
    {
        return $this->columnContent('TKT_description', $ticket->description());
    }


    /**
     * @param EE_Ticket $ticket
     */
    public function column_TKT_qty($ticket)
    {

        return $ticket->get_pretty('TKT_qty', 'text');
        // return $this->columnContent('TKT_qty', $ticket->qty());
    }


    /**
     * @param EE_Ticket $ticket
     */
    public function column_TKT_uses($ticket)
    {
        return $ticket->get_pretty('TKT_uses', 'text');
    }


    /**
     * @param EE_Ticket $ticket
     */
    public function column_TKT_min($ticket)
    {
        return $ticket->get('TKT_min');
    }


    /**
     * @param EE_Ticket $ticket
     */
    public function column_TKT_max($ticket)
    {
        return $ticket->get_pretty('TKT_max', 'text');
    }


    /**
     * @param EE_Ticket $ticket
     */
    public function column_TKT_price($ticket)
    {
        return EEH_Template::format_currency($ticket->get('TKT_price'));
    }


    /**
     * @param EE_Ticket $ticket
     */
    public function column_TKT_taxable($ticket)
    {
        return $ticket->get('TKT_taxable') ? esc_html__('Yes', 'event_espresso') : esc_html__('No', 'event_espresso');
    }
}
