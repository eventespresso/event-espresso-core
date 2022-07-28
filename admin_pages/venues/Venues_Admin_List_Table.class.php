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
    /**
     * @var   int
     */
    private $related_event_count = 0;


    /**
     * @param $admin_page
     */
    public function __construct($admin_page)
    {
        parent::__construct($admin_page);
    }


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


    /**
     * @return array
     */
    protected function _get_table_filters(): array
    {
        return array();
    }


    /**
     * @throws EE_Error
     */
    protected function _add_view_counts()
    {
        $this->_views['all']['count'] = EEM_Venue::instance()->count();
        if (EE_Registry::instance()->CAP->current_user_can('ee_delete_venues', 'espresso_venues_trash_venues')) {
            $this->_views['trash']['count'] = EEM_Venue::instance()->count_deleted();
        }
    }


    /**
     * @param EE_Venue|null $venue
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_cb($venue): string
    {
        $this->related_event_count = $venue->count_related('Event');
        return $this->related_event_count > 0 && $venue->status() === 'trash'
            ? '<span class="ee-lock-icon"></span>'
            : sprintf(
                '<input type="checkbox" name="venue_id[]" value="%s" />',
                $venue->ID()
            );
    }


    /**
     * @param EE_Venue $venue
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_id(EE_Venue $venue): string
    {
        return $venue->ID() . '  <span class="show-on-mobile-view-only">' . $venue->name() . '</span>';
    }


    /**
     * @param EE_Venue $venue
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_name(EE_Venue $venue): string
    {
        $edit_link = EE_Admin_Page::add_query_args_and_nonce(
            [
                'action' => 'edit',
                'post'   => $venue->ID(),
            ],
            EE_VENUES_ADMIN_URL
        );

        $statuses = EEM_Venue::instance()->get_status_array();
        $actions = $this->_column_name_action_setup($venue);
        $content = EE_Registry::instance()->CAP->current_user_can('ee_edit_venue', 'espresso_venues_edit', $venue->ID())
            ? '
            <strong>
                <a class="row-title" href="' . $edit_link . '">' . stripslashes_deep($venue->name()) . '</a>
            </strong>'
            : $venue->name();
        $content .= $venue->status() == 'draft' ? ' - <span class="post-state">' . $statuses['draft'] . '</span>' : '';
        $content .= $this->row_actions(array_filter($actions));
        return $content;
    }


    /**
     * Used to setup the actions for the Venue name column
     *
     * @param EE_Venue $venue
     * @return array()
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _column_name_action_setup(EE_Venue $venue): array
    {
        $actions = [];
        if ($venue->status() === 'trash') {
            $actions['restore_venue'] = $this->getVenueActionLink(
                $venue,
                'restore_venue',
                esc_html__('Restore from Trash', 'event_espresso'),
                /* Translators: The name of the venue */
                esc_attr__('Restore Venue (%s) from Trash', 'event_espresso'),
                'ee_delete_venue',
                'espresso_venues_restore_venue'
            );
            if ($this->related_event_count === 0) {
                $actions['delete_venue'] = $this->getVenueActionLink(
                    $venue,
                    'delete_venue',
                    esc_html__('Delete Permanently', 'event_espresso'),
                    /* Translators: The name of the venue */
                    esc_attr__('Permanently Delete Venue (%s)', 'event_espresso'),
                    'ee_delete_venue',
                    'espresso_venues_delete_venue'
                );
            }
        } else {
            $actions['view']        = $this->getVenueActionLink(
                $venue,
                'view',
                esc_html__('View', 'event_espresso'),
                /* Translators: The name of the venue */
                esc_attr__('View Venue (%s)', 'event_espresso'),
                '',
                '',
                get_permalink($venue->ID())
            );
            $actions['edit']        = $this->getVenueActionLink(
                $venue,
                'edit',
                esc_html__('Edit', 'event_espresso'),
                /* Translators: The name of the venue */
                esc_attr__('Edit Venue (%s)', 'event_espresso'),
                'ee_edit_venue',
                'espresso_venues_edit'
            );
            $actions['trash_venue'] = $this->getVenueActionLink(
                $venue,
                'trash_venue',
                esc_html__('Trash', 'event_espresso'),
                /* Translators: The name of the venue */
                esc_attr__('Trash Venue (%s)', 'event_espresso'),
                'ee_delete_venue',
                'espresso_venues_trash_venue'
            );
        }
        return $actions;
    }


    /**
     * @param EE_Venue $venue
     * @return string
     */
    public function column_address(EE_Venue $venue): string
    {
        return $venue->address();
    }


    /**
     * @param EE_Venue $venue
     * @return string
     */
    public function column_city(EE_Venue $venue): string
    {
        return $venue->city();
    }


    /**
     * @param EE_Venue $venue
     * @return int|string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_capacity(EE_Venue $venue)
    {
        return $venue->capacity();
    }


    /**
     * @param EE_Venue $venue
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_shortcode(EE_Venue $venue): string
    {
        return '[ESPRESSO_VENUE id=' . $venue->ID() . ']';
    }


    /**
     * @param EE_Venue    $venue
     * @param string      $action
     * @param string      $link_text
     * @param string      $aria_label
     * @param string      $cap
     * @param string      $context
     * @param string|null $action_url
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     * @since 4.10.38.p
     */
    public function getVenueActionLink(
        EE_Venue $venue,
        string $action,
        string $link_text,
        string $aria_label,
        string $cap,
        string $context,
        ?string $action_url = null
    ): string {
        if ($cap && ! EE_Registry::instance()->CAP->current_user_can($cap, $context, $venue->ID())) {
            return '';
        }
        $key = $action === 'edit' ? 'post' : 'VNU_ID';
        // if supplied an $action_url, then use that, otherwise build one using the $action param
        $action_url = $action_url
            ?: EE_Admin_Page::add_query_args_and_nonce(
                [
                    'action' => $action,
                    $key     => $venue->ID(),
                ],
                EE_VENUES_ADMIN_URL
            );
        $aria_label = sprintf($aria_label, $venue->name());
        return "
        <a href='$action_url' aria-label='$aria_label'>$link_text</a>";
    }
}
