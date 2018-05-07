<?php

/**
 * Price_Types_List_Table
 *
 * Class for preparing the table listing all the event categories
 *
 * note: anywhere there are no php docs it is because the docs are available in the parent class.
 *
 * @package               Event_Categories_Admin_List_Table
 * @subpackage            includes/core/admin/pricing_manager/Prices_List_Table.core.php
 * @author                Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class Price_Types_List_Table extends EE_Admin_List_Table
{

    public function __construct($admin_page)
    {
        parent::__construct($admin_page);
        require_once(EE_MODELS . 'EEM_Price_Type.model.php');
        $this->_PRT = EEM_Price_Type::instance();
    }


    protected function _setup_data()
    {
        $trashed = $this->_admin_page->get_view() == 'trashed' ? true : false;
        $this->_data = $this->_admin_page->get_price_types_overview_data($this->_per_page, false, $trashed);
        $this->_all_data_count = $this->_admin_page->get_price_types_overview_data($this->_per_page, true, false);
        $this->_trashed_count = $this->_admin_page->get_price_types_overview_data($this->_per_page, true, true);
    }


    protected function _set_properties()
    {
        $this->_wp_list_args = array(
            'singular' => __('price type', 'event_espresso'),
            'plural'   => __('price types', 'event_espresso'),
            'ajax'     => true,
            'screen'   => $this->_admin_page->get_current_screen()->id,
        );

        $this->_columns = array(
            'cb'        => '<input type="checkbox" />', // Render a checkbox instead of text
            'name'      => __('Name', 'event_espresso'),
            'base_type' => '<div class="jst-cntr">' . __('Base Type', 'event_espresso') . '</div>',
            'percent'   => '<div class="jst-cntr">' . __('Applied', 'event_espresso') . '<br/>'
                           . __('as ', 'event_espresso') . '<span class="big-text">'
                           . __('%', 'event_espresso') . '</span>'
                           . __(' or ', 'event_espresso') . '<span class="big-text">'
                           . __('$', 'event_espresso') . '</span></div>',
            'order'     => '<div class="jst-cntr">' . __('Order of', 'event_espresso') . '<br/>'
                           . __('Application', 'event_espresso') . '</div>',
        );

        $this->_sortable_columns = array(
            // TRUE means its already sorted
            'name' => array('name' => false),
        );

        $this->_hidden_columns = array();
    }


    protected function _get_table_filters()
    {
    }


    protected function _add_view_counts()
    {
        $this->_views['all']['count'] = $this->_all_data_count;
        if (EE_Registry::instance()->CAP->current_user_can(
            'ee_delete_default_price_types',
            'pricing_trash_price_type'
        )) {
            $this->_views['trashed']['count'] = $this->_trashed_count;
        }
    }


    public function column_cb($item)
    {
        if ($item->base_type() !== 1) {
            return sprintf(
                '<input type="checkbox" name="checkbox[%1$s]" />',
                $item->ID()
            );
        }
        return '';
    }


    public function column_name($item)
    {

        // Build row actions
        $actions = array();
        // edit price link
        if (EE_Registry::instance()->CAP->current_user_can(
            'ee_edit_default_price_type',
            'pricing_edit_price_type',
            $item->ID()
        )) {
            $edit_lnk_url = EE_Admin_Page::add_query_args_and_nonce(array(
                'action' => 'edit_price_type',
                'id'     => $item->ID(),
            ), PRICING_ADMIN_URL);
            $actions['edit'] = '<a href="' . $edit_lnk_url . '" title="'
                               . esc_attr__('Edit Price Type', 'event_espresso') . '">'
                               . __('Edit', 'event_espresso') . '</a>';
        }

        $name_link = EE_Registry::instance()->CAP->current_user_can(
            'ee_edit_default_price_type',
            'pricing_edit_price_type',
            $item->ID()
        )
            ? '<a href="' . $edit_lnk_url . '" title="'
              . esc_attr__('Edit Price Type', 'event_espresso') . '">'
              . stripslashes($item->name()) . '</a>'
            : $item->name();

        if ($item->base_type() !== 1) {
            if ($this->_view == 'all') {
                // trash price link
                if (EE_Registry::instance()->CAP->current_user_can(
                    'ee_delete_default_price_type',
                    'pricing_trash_price_type',
                    $item->ID()
                )) {
                    $trash_lnk_url = EE_Admin_Page::add_query_args_and_nonce(array(
                        'action'   => 'trash_price_type',
                        'id'       => $item->ID(),
                        'noheader' => true,
                    ), PRICING_ADMIN_URL);
                    $actions['trash'] = '<a href="' . $trash_lnk_url . '" title="'
                                        . esc_attr__('Move Price Type to Trash', 'event_espresso') . '">'
                                        . __('Move to Trash', 'event_espresso') . '</a>';
                }
            } else {
                // restore price link
                if (EE_Registry::instance()->CAP->current_user_can(
                    'ee_delete_default_price_type',
                    'pricing_restore_price_type',
                    $item->ID()
                )) {
                    $restore_lnk_url = EE_Admin_Page::add_query_args_and_nonce(array(
                        'action'   => 'restore_price_type',
                        'id'       => $item->ID(),
                        'noheader' => true,
                    ), PRICING_ADMIN_URL);
                    $actions['restore'] = '<a href="' . $restore_lnk_url . '" title="'
                                          . esc_attr__('Restore Price Type', 'event_espresso') . '">'
                                          . __('Restore', 'event_espresso') . '</a>';
                }
                // delete price link
                if (EE_Registry::instance()->CAP->current_user_can(
                    'ee_delete_default_price_type',
                    'pricing_delete_price_type',
                    $item->ID()
                )) {
                    $delete_lnk_url = EE_Admin_Page::add_query_args_and_nonce(array(
                        'action'   => 'delete_price_type',
                        'id'       => $item->ID(),
                        'noheader' => true,
                    ), PRICING_ADMIN_URL);
                    $actions['delete'] = '<a href="' . $delete_lnk_url . '" title="'
                                         . esc_attr__('Delete Price Type Permanently', 'event_espresso') . '">'
                                         . __('Delete Permanently', 'event_espresso') . '</a>';
                }
            }
        }

        // Return the name contents
        return sprintf(
            '%1$s <span style="color:silver">(id:%2$s)</span>%3$s',
            $name_link,
            $item->ID(),
            $this->row_actions($actions)
        );
    }


    public function column_base_type($item)
    {
        return '<div class="jst-cntr">' . $item->base_type_name() . '</div>';
    }


    public function column_percent($item)
    {
        return '<div class="jst-cntr">' . ($item->is_percent() ? '%' : EE_Registry::instance()->CFG->currency->sign) . '</div>';
    }


    public function column_order($item)
    {
        return '<div class="jst-cntr">' . $item->order() . '</div>';
    }
}
