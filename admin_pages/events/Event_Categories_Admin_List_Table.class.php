<?php

/**
 * Event_Categories_Admin_List_Table
 * Class for preparing the table listing all the event categories
 * note: anywhere there are no php docs it is because the docs are available in the parent class.
 *
 * @package         Event_Categories_Admin_List_Table
 * @subpackage      includes/core/admin/events/Event_Category_Admin_List_Table.class.php
 * @author          Darren Ethier
 */
class Event_Categories_Admin_List_Table extends EE_Admin_List_Table
{
    /**
     * @var Events_Admin_Page $_admin_page
     */
    protected EE_Admin_Page $_admin_page;


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _setup_data()
    {
        $this->_data           = $this->_admin_page->get_categories($this->_per_page, $this->_current_page);
        $this->_all_data_count = EEM_Term_Taxonomy::instance()->count(
            [['taxonomy' => 'espresso_event_categories']]
        );
    }


    protected function _set_properties()
    {
        $this->_wp_list_args = [
            'singular' => esc_html__('event category', 'event_espresso'),
            'plural'   => esc_html__('event categories', 'event_espresso'),
            'ajax'     => true, // for now,
            'screen'   => $this->_admin_page->get_current_screen()->id,
        ];

        $this->_columns = [
            'cb'        => '<input type="checkbox" />',
            'id'        => esc_html__('ID', 'event_espresso'),
            'name'      => esc_html__('Name', 'event_espresso'),
            'shortcode' => esc_html__('Shortcode', 'event_espresso'),
            'count'     => esc_html__('Events', 'event_espresso'),
        ];

        $this->_sortable_columns = [
            'id'    => ['Term.term_id' => true],
            'name'  => ['Term.slug' => false],
            'count' => ['term_count' => false],
        ];

        $this->_primary_column = 'id';

        $this->_hidden_columns = [];
    }


    protected function _get_table_filters()
    {
        return [];
    }


    protected function _add_view_counts()
    {
        $this->_views['all']['count'] = $this->_all_data_count;
    }


    public function column_cb($item): string
    {
        return sprintf('<input type="checkbox" name="EVT_CAT_ID[]" value="%s" />', $item->get('term_id'));
    }


    /**
     * @param EE_Term_Taxonomy $item
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_id(EE_Term_Taxonomy $item): string
    {
        $content = '
        <span class="ee-entity-id">' . $item->get('term_id') . '</span>
        <span class="show-on-mobile-view-only">
            ' . $item->get_first_related('Term')->get('name') . '
        </span>';
        return $this->columnContent('id', $content, 'end');
    }


    /**
     * @param EE_Term_Taxonomy $item
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_name(EE_Term_Taxonomy $item): string
    {
        $edit_query_args = [
            'action'     => 'edit_category',
            'EVT_CAT_ID' => $item->get('term_id'),
        ];

        $delete_query_args = [
            'action'     => 'delete_category',
            'EVT_CAT_ID' => $item->get('term_id'),
        ];

        $edit_link   = EE_Admin_Page::add_query_args_and_nonce($edit_query_args, EVENTS_ADMIN_URL);
        $delete_link = EE_Admin_Page::add_query_args_and_nonce($delete_query_args, EVENTS_ADMIN_URL);
        $view_link   = get_term_link($item->get('term_id'));

        $term_name = $item->get_first_related('Term')->get('name');

        $edit_category_label = sprintf(
        /* translators: The name of the event category */
            esc_attr__(
                'Edit Category (%s)',
                'event_espresso'
            ),
            $term_name
        );
        $actions['edit']     = '
            <a href="' . $edit_link . '" aria-label="' . $edit_category_label . '">
                ' . esc_html__('Edit', 'event_espresso') . '
            </a>';

        $actions['delete'] = '<a href="' . $delete_link . '" aria-label="' . esc_attr__(
            'Delete Category',
            'event_espresso'
        ) . '">' . esc_html__('Delete', 'event_espresso') . '</a>';

        $view_category_label = sprintf(
        /* translators: %s: event category name */
            esc_html__('View &#8220;%s&#8221; archive', 'event_espresso'),
            $item->get_first_related('Term')->get('name')
        );
        $actions['view']     = '
            <a href="' . $view_link . '" aria-label="' . $view_category_label . '">
                ' . esc_html__('View', 'event_espresso') . '
            </a>';

        $content = '<strong><a class="row-title" href="' . $edit_link . '">' . $term_name . '</a></strong>';
        $content .= $this->row_actions($actions);
        return $this->columnContent('name', $content);
    }


    /**
     * @param EE_Term_Taxonomy $item
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_shortcode(EE_Term_Taxonomy $item): string
    {
        $content = '[ESPRESSO_EVENTS category_slug=' . $item->get_first_related('Term')->get('slug') . ']';
        return $this->columnContent('shortcode', $content);
    }


    /**
     * @param EE_Term_Taxonomy $item
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_count(EE_Term_Taxonomy $item): string
    {
        $category_url = EE_Admin_Page::add_query_args_and_nonce(
            [
                'action'  => 'default',
                'EVT_CAT' => $item->get_first_related('Term')->ID(),
            ],
            EVENTS_ADMIN_URL
        );
        $content      = '<a href="' . $category_url . '">' . $item->get('term_count') . '</a>';
        return $this->columnContent('count', $content);
    }
}
