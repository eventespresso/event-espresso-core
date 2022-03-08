<?php

/**
 * Venues_Admin_List_Table
 *
 * Class for preparing the table listing all the event categories
 *
 * note: anywhere there are no php docs it is because the docs are available in the parent class.
 *
 * @package         Venues_Admin_List_Table
 * @subpackage      includes/core/admin/events/Venues_Admin_List_Table.class.php
 * @author          Darren Ethier
 */
class Venues_Admin_List_Table extends EE_Admin_List_Table
{

    protected function _setup_data()
    {
        $this->_data = $this->_admin_page->get_venues($this->_per_page);
        $this->_all_data_count = $this->_admin_page->get_venues($this->_per_page, true);
    }


    protected function _set_properties()
    {
        $this->_wp_list_args = array(
            'singular' => esc_html__('Event Venue', 'event_espresso'),
            'plural'   => esc_html__('Event Venues', 'event_espresso'),
            'ajax'     => true, // for now,
            'screen'   => $this->_admin_page->get_current_screen()->id,
        );

        $this->_columns = array(
            'cb'       => '<input type="checkbox" />',
            'id'       => esc_html__('ID', 'event_espresso'),
            'name'     => esc_html__('Name', 'event_espresso'),
            'address'  => esc_html__('Address', 'event_espresso'),
            'city'     => esc_html__('City', 'event_espresso'),
            'capacity' => esc_html__('Capacity', 'event_espresso'),
            // 'shortcode' => esc_html__('Shortcode', 'event_espresso'),
        );

        $this->_sortable_columns = array(
            'id'       => array('id' => true),
            'name'     => array('name' => false),
            'city'     => array('city' => false),
            'capacity' => array('capacity' => false),
        );

        $this->_hidden_columns = array();
    }


    // todo... add _venue_status in here (which we'll define a EE_Admin_CPT_List_Table for common properties)
    protected function _get_table_filters()
    {
        return array();
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _add_view_counts()
    {
        $this->_views['all']['count'] = EEM_Venue::instance()->count();
        if (EE_Registry::instance()->CAP->current_user_can('ee_delete_venues', 'espresso_venues_trash_venues')) {
            $this->_views['trash']['count'] = EEM_Venue::instance()->count_deleted();
        }
    }


    public function column_cb($item)
    {

        return $item->count_related('Event') > 0 && $item->get('status') === 'trash'
            ? '<span class="dashicons dashicons-lock"></span>'
            : sprintf(
                '<input type="checkbox" name="venue_id[]" value="%s" />',
                $item->ID()
            );
    }


    public function column_id($item)
    {
        $content = '
            <span class="ee-entity-id">' . $item->ID() . '</span>
            <span class="show-on-mobile-view-only">' . $this->column_name($item, false) . '</span>';
        return $this->columnContent('id', $content, 'end');
    }


    /**
     * @param EE_Venue $item
     * @param bool     $prep_content
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_name(EE_Venue $item, bool $prep_content = true): string
    {
        $edit_query_args = array(
            'action' => 'edit',
            'post'   => $item->ID(),
        );

        $edit_link = EE_Admin_Page::add_query_args_and_nonce($edit_query_args, EE_VENUES_ADMIN_URL);

        $statuses = EEM_Venue::instance()->get_status_array();
        $actions = $prep_content ? $this->_column_name_action_setup($item) : [];
        $content = EE_Registry::instance()->CAP->current_user_can('ee_edit_venue', 'espresso_venues_edit', $item->ID())
            ? '<strong><a class="row-title" href="' . $edit_link . '">' . stripslashes_deep(
                $item->name()
            ) . '</a></strong>' : $item->name();
        $content .= $item->status() == 'draft' ? ' - <span class="post-state">' . $statuses['draft'] . '</span>' : '';

        $content .= $prep_content ? $this->row_actions($actions) : '';
        return $prep_content ? $this->columnContent('name', $content) : $content;
    }


    /**
     * Used to setup the actions for the Venue name column
     *
     * @param EE_Venue $item
     * @return array()
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _column_name_action_setup(EE_Venue $item): array
    {
        $actions = array();

        if (EE_Registry::instance()->CAP->current_user_can('ee_edit_venue', 'espresso_venues_edit', $item->ID())) {
            $edit_query_args = array(
                'action' => 'edit',
                'post'   => $item->ID(),
            );
            $edit_link = EE_Admin_Page::add_query_args_and_nonce($edit_query_args, EE_VENUES_ADMIN_URL);
            $actions['edit'] = '<a href="' . $edit_link . '" title="' . esc_attr__(
                'Edit Venue',
                'event_espresso'
            ) . '">' . esc_html__('Edit', 'event_espresso') . '</a>';
        }


        switch ($item->get('status')) {
            case 'trash':
                if (
                    EE_Registry::instance()->CAP->current_user_can(
                        'ee_delete_venue',
                        'espresso_venues_restore_venue',
                        $item->ID()
                    )
                ) {
                    $restore_venue_link = EE_Admin_Page::add_query_args_and_nonce(
                        [
                            'action' => 'restore_venue',
                            'VNU_ID' => $item->ID(),
                        ],
                        EE_VENUES_ADMIN_URL
                    );

                    $actions['restore_from_trash'] = '<a href="' . $restore_venue_link . '" title="' . esc_attr__(
                        'Restore from Trash',
                        'event_espresso'
                    ) . '">' . esc_html__('Restore from Trash', 'event_espresso') . '</a>';
                }
                if (
                    $item->count_related('Event') === 0 && EE_Registry::instance()->CAP->current_user_can(
                        'ee_delete_venue',
                        'espresso_venues_delete_venue',
                        $item->ID()
                    )
                ) {
                    $delete_venue_link = EE_Admin_Page::add_query_args_and_nonce(
                        [
                            'action' => 'delete_venue',
                            'VNU_ID' => $item->ID(),
                        ],
                        EE_VENUES_ADMIN_URL
                    );

                    $actions['delete permanently'] = '<a href="' . $delete_venue_link . '" title="' . esc_attr__(
                        'Delete Permanently',
                        'event_espresso'
                    ) . '">' . esc_html__('Delete Permanently', 'event_espresso') . '</a>';
                }
                break;
            default:
                $actions['view'] = '
                    <a  href="' . get_permalink($item->ID()) . '" 
                        title="' . esc_attr__('View Venue', 'event_espresso') . '"
                    >
                        ' . esc_html__('View', 'event_espresso') . '
                    </a>';
                if (
                    EE_Registry::instance()->CAP->current_user_can(
                        'ee_delete_venue',
                        'espresso_venues_trash_venue',
                        $item->ID()
                    )
                ) {
                    $trash_venue_link = EE_Admin_Page::add_query_args_and_nonce(
                        [
                            'action' => 'trash_venue',
                            'VNU_ID' => $item->ID(),
                        ],
                        EE_VENUES_ADMIN_URL
                    );

                    $actions['move to trash'] = '<a href="' . $trash_venue_link . '" title="' . esc_attr__(
                        'Trash Event',
                        'event_espresso'
                    ) . '">' . esc_html__('Trash', 'event_espresso') . '</a>';
                }
        }
        return $actions;
    }


    public function column_address(EE_Venue $item): string
    {
        return $this->columnContent('address', $item->address());
    }


    public function column_city(EE_Venue $item): string
    {
        return $this->columnContent('city', $item->city());
    }


    public function column_capacity(EE_Venue $item): string
    {
        return $this->columnContent('capacity', $item->capacity());
    }


    /**
     * @throws ReflectionException
     * @throws EE_Error
     */
    public function column_shortcode(EE_Venue $item): string
    {
        $content = '[ESPRESSO_VENUE id=' . $item->ID() . ']';
        return $this->columnContent('shortcode', $content);
    }
}
