<?php

/**
 *
 * Tickets_List_Table
 *
 * Class for preparing the table listing all the default tickets
 * note: anywhere there are no php docs it is because the docs are available in the parent class.
 *
 * @package     Tickets List Table
 * @subpackage  caffeinated/admin/new/tickets/Tickets_List_Table.core.php
 * @author      Darren Ethier
 */
class Tickets_List_Table extends EE_Admin_List_Table
{
    /**
     * @var Tickets_Admin_Page
     */
    protected $_admin_page;

    protected function _setup_data()
    {
        $trashed               = $this->_admin_page->get_view() === 'trashed';
        $this->_data           = $this->_admin_page->get_default_tickets($this->_per_page, false, $trashed);
        $this->_all_data_count = $this->_admin_page->get_default_tickets($this->_per_page, true, false);
        $this->_trashed_count  = $this->_admin_page->get_default_tickets($this->_per_page, true, true);
    }


    protected function _set_properties()
    {
        $this->_wp_list_args = [
            'singular' => esc_html__('ticket', 'event_espresso'),
            'plural'   => esc_html__('tickets', 'event_espresso'),
            'ajax'     => true,
            'screen'   => $this->_admin_page->get_current_screen()->id,
        ];

        $this->_columns = [
            'cb'              => '<input type="checkbox" />', // Render a checkbox instead of text
            'TKT_name'        => esc_html__('Name', 'event_espresso'),
            'TKT_description' => esc_html__('Description', 'event_espresso'),
            'TKT_qty'         => esc_html__('Quantity', 'event_espresso'),
            'TKT_uses'        => esc_html__('Uses', 'event_espresso'),
            'TKT_min'         => esc_html__('Minimum', 'event_espresso'),
            'TKT_max'         => esc_html__('Maximum', 'event_espresso'),
            'TKT_price'       => esc_html__('Price', 'event_espresso'),
            'TKT_taxable'     => esc_html__('Taxable', 'event_espresso'),
        ];

        $this->_sortable_columns = [
            // TRUE means its already sorted
            'TKT_name'        => ['TKT_name', true],
            'TKT_description' => ['TKT_description', false],
            'TKT_qty'         => ['TKT_qty', false],
            'TKT_uses'        => ['TKT_uses', false],
            'TKT_min'         => ['TKT_min', false],
            'TKT_max'         => ['TKT_max', false],
            'TKT_price'       => ['TKT_price', false],
        ];

        $this->_hidden_columns = [];
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


    /**
     * @param EE_Ticket $item
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     * @since   $VID:$
     */
    public function column_TKT_name(EE_Ticket $item)
    {
        // build row actions
        $actions = [];

        // trash links
        if ($item->ID() !== 1) {
            if ($this->_view == 'all') {
                $trash_lnk_url    = EE_Admin_Page::add_query_args_and_nonce(
                    [
                        'action' => 'trash_ticket',
                        'TKT_ID' => $item->ID(),
                    ],
                    TICKETS_ADMIN_URL
                );
                $actions['trash'] = '<a href="' . $trash_lnk_url . '" title="'
                                    . esc_attr__('Move Ticket to trash', 'event_espresso') . '">'
                                    . esc_html__('Trash', 'event_espresso')
                                    . '</a>';
            } else {
                // restore price link
                $restore_lnk_url    = EE_Admin_Page::add_query_args_and_nonce(
                    [
                        'action' => 'restore_ticket',
                        'TKT_ID' => $item->ID(),
                    ],
                    TICKETS_ADMIN_URL
                );
                $actions['restore'] = '<a href="' . $restore_lnk_url . '" title="'
                                      . esc_attr__('Restore Ticket', 'event_espresso') . '">'
                                      . esc_html__('Restore', 'event_espresso')
                                      . '</a>';
                // delete price link
                $delete_lnk_url    = EE_Admin_Page::add_query_args_and_nonce(
                    [
                        'action' => 'delete_ticket',
                        'TKT_ID' => $item->ID(),
                    ],
                    TICKETS_ADMIN_URL
                );
                $actions['delete'] = '<a href="' . $delete_lnk_url . '" title="'
                                     . esc_attr__('Delete Ticket Permanently', 'event_espresso') . '">'
                                     . esc_html__('Delete Permanently', 'event_espresso')
                                     . '</a>';
            }
        }

        return $item->name() . $this->row_actions($actions);
    }


    /**
     * @param EE_Ticket $item
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     * @since   $VID:$
     */
    public function column_TKT_description(EE_Ticket $item)
    {
        return $item->description();
    }


    /**
     * @param EE_Ticket $item
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     * @since   $VID:$
     */
    public function column_TKT_qty(EE_Ticket $item)
    {
        return $item->qty();
    }


    /**
     * @param EE_Ticket $item
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     * @since   $VID:$
     */
    public function column_TKT_uses(EE_Ticket $item)
    {
        return $item->uses();
    }


    /**
     * @param EE_Ticket $item
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     * @since   $VID:$
     */
    public function column_TKT_min(EE_Ticket $item)
    {
        return $item->min();
    }


    /**
     * @param EE_Ticket $item
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     * @since   $VID:$
     */
    public function column_TKT_max(EE_Ticket $item)
    {
        return $item->max();
    }


    /**
     * @param EE_Ticket $item
     * @return mixed
     * @throws EE_Error
     * @throws ReflectionException
     * @since   $VID:$
     */
    public function column_TKT_price(EE_Ticket $item)
    {
        return $item->pretty_price();
    }


    /**
     * @param EE_Ticket $item
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     * @since   $VID:$
     */
    public function column_TKT_taxable(EE_Ticket $item)
    {
        return $item->taxable() ? esc_html__('Yes', 'event_espresso') : esc_html__('No', 'event_espresso');
    }
}
