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
            'TKT_uses'        => __('Uses', 'event_espresso'),
            'TKT_min'         => __('Minimum', 'event_espresso'),
            'TKT_max'         => __('Maximum', 'event_espresso'),
            'TKT_price'       => __('Price', 'event_espresso'),
            'TKT_taxable'     => __('Taxable', 'event_espresso'),
        );

        $this->_sortable_columns = array(
            // TRUE means its already sorted
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
            ? '<span class="ee-lock-icon"></span>'
            : sprintf(
                '<input type="checkbox" name="checkbox[%1$s]" value="%1$s" />',
                $item->ID()
            );
    }


    public function column_TKT_name($item)
    {
        // build row actions
        $actions = array();

        // trash links
        if ($item->ID() !== 1) {
            if ($this->_view == 'all') {
                $trash_lnk_url = EE_Admin_Page::add_query_args_and_nonce(array(
                    'action' => 'trash_ticket',
                    'TKT_ID' => $item->ID(),
                ), TICKETS_ADMIN_URL);
                $actions['trash'] = '<a href="' . $trash_lnk_url . '" title="'
                                    . esc_attr__('Move Ticket to trash', 'event_espresso') . '">'
                                    . __('Trash', 'event_espresso') . '</a>';
            } else {
                // restore price link
                $restore_lnk_url = EE_Admin_Page::add_query_args_and_nonce(array(
                    'action' => 'restore_ticket',
                    'TKT_ID' => $item->ID(),
                ), TICKETS_ADMIN_URL);
                $actions['restore'] = '<a href="' . $restore_lnk_url . '" title="'
                                      . esc_attr__('Restore Ticket', 'event_espresso') . '">'
                                      . __('Restore', 'event_espresso') . '</a>';
                // delete price link
                $delete_lnk_url = EE_Admin_Page::add_query_args_and_nonce(array(
                    'action' => 'delete_ticket',
                    'TKT_ID' => $item->ID(),
                ), TICKETS_ADMIN_URL);
                $actions['delete'] = '<a href="' . $delete_lnk_url . '" title="'
                                     . esc_attr__('Delete Ticket Permanently', 'event_espresso') . '">'
                                     . __('Delete Permanently', 'event_espresso') . '</a>';
            }
        }

        return $item->get('TKT_name') . $this->row_actions($actions);
    }


    public function column_TKT_description($item)
    {
        return $item->get('TKT_description');
    }


    public function column_TKT_qty($item)
    {
        return $item->get_pretty('TKT_qty', 'text');
    }


    public function column_TKT_uses($item)
    {
        return $item->get_pretty('TKT_uses', 'text');
    }


    public function column_TKT_min($item)
    {
        return $item->get('TKT_min');
    }


    public function column_TKT_max($item)
    {
        return $item->get_pretty('TKT_max', 'text');
    }


    public function column_TKT_price($item)
    {
        return EEH_Template::format_currency($item->get('TKT_price'));
    }


    public function column_TKT_taxable($item)
    {
        return $item->get('TKT_taxable') ? __('Yes', 'event_espresso') : __('No', 'event_espresso');
    }
}
