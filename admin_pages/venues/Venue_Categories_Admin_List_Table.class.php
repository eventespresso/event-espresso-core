<?php

/**
 * Venue_Categories_Admin_List_Table
 *
 * Class for preparing the table listing all the venue categories
 *
 * note: anywhere there are no php docs it is because the docs are available in the parent class.
 *
 * @package         Venue_Categories_Admin_List_Table
 * @subpackage      caffeinated/admin/new/venues/Venue_Categories_Admin_List_Table.class.php
 * @author          Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Venue_Categories_Admin_List_Table extends EE_Admin_List_Table
{
    protected function _setup_data()
    {
        $this->_data = $this->_admin_page->get_categories($this->_per_page, $this->_current_page);
        $this->_all_data_count = $this->_admin_page->get_categories($this->_per_page, $this->_current_page, true);
    }


    protected function _set_properties()
    {
        $this->_wp_list_args = array(
            'singular' => esc_html__('venue category', 'event_espresso'),
            'plural'   => esc_html__('venue categories', 'event_espresso'),
            'ajax'     => true, // for now,
            'screen'   => $this->_admin_page->get_current_screen()->id,
        );

        $this->_columns = array(
            'cb'    => '<input type="checkbox" />',
            'id'    => esc_html__('ID', 'event_espresso'),
            'name'  => esc_html__('Name', 'event_espresso'),
            'count' => esc_html__('Venues', 'event_espresso'),
        );

        $this->_sortable_columns = array(
            'id'    => array('Term.term_id' => true),
            'name'  => array('Term.slug' => false),
            'count' => array('term_count' => false),
        );

        $this->_hidden_columns = array();
    }


    // not needed
    protected function _get_table_filters()
    {
        return array();
    }


    protected function _add_view_counts()
    {
        $this->_views['all']['count'] = $this->_all_data_count;
    }


    public function column_cb($item)
    {
        return sprintf('<input type="checkbox" name="VEN_CAT_ID[]" value="%s" />', $item->get('term_id'));
    }


    public function column_id($item)
    {
        $content = $item->get('term_id');
        $content .= '  <span class="show-on-mobile-view-only">' . $item->get_first_related('Term')->get(
            'name'
        ) . '</span>';
        return $content;
    }


    public function column_name($item)
    {
        $edit_query_args = array(
            'action'     => 'edit_category',
            'VEN_CAT_ID' => $item->get('term_id'),
        );

        $delete_query_args = array(
            'action'     => 'delete_category',
            'VEN_CAT_ID' => $item->get('term_id'),
        );

        $edit_link = EE_Admin_Page::add_query_args_and_nonce($edit_query_args, EE_VENUES_ADMIN_URL);
        $delete_link = EE_Admin_Page::add_query_args_and_nonce($delete_query_args, EE_VENUES_ADMIN_URL);

        $term_name = $item->get_first_related('Term')->get('name');

        $actions = array(
            'edit' => '<a href="' . $edit_link . '" aria-label="' . sprintf(
                /* translators: The name of the venue category */
                esc_attr__(
                    'Edit Category (%s)',
                    'event_espresso'
                ),
                $term_name
            ) . '">' . esc_html__('Edit', 'event_espresso') . '</a>',
        );


        $actions['delete'] = '<a href="' . $delete_link . '" aria-label="' . sprintf(
            /* translators: The name of the venue category */
            esc_attr__(
                'Delete Category (%s)',
                'event_espresso'
            ),
            $term_name
        ) . '">' . esc_html__('Delete', 'event_espresso') . '</a>';

        $content = '<strong><a class="row-title" href="' . $edit_link . '">' . $item->get_first_related('Term')->get(
            'name'
        ) . '</a></strong>';
        $content .= $this->row_actions($actions);
        return $content;
    }


    public function column_shortcode($item)
    {
        $content = '[EVENT_ESPRESSO_CATEGORY category_id="' . $item->get_first_related('Term')->get('slug') . '"]';
        return $content;
    }


    public function column_count($item)
    {
        $e_args = array(
            'action'   => 'default',
            'category' => $item->get_first_related('Term')->ID(),
        );
        $e_link = EE_Admin_Page::add_query_args_and_nonce($e_args, EE_VENUES_ADMIN_URL);
        $content = '<a href="' . $e_link . '">' . $item->get('term_count') . '</a>';
        return $content;
    }
}
