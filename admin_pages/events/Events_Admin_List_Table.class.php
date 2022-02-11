<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;

/**
 * Events_Admin_List_Table
 * Class for preparing the table listing all the events
 * note: anywhere there are no php docs it is because the docs are available in the parent class.
 *
 * @package         Events_Admin_List_Table
 * @subpackage      includes/core/admin/events/Events_Admin_List_Table.class.php
 * @author          Darren Ethier
 */
class Events_Admin_List_Table extends EE_Admin_List_Table
{

    /**
     * @var EE_Datetime
     */
    private $_dtt;


    /**
     * Initial setup of data properties for the list table.
     */
    protected function _setup_data()
    {
        $this->_data = $this->_admin_page->get_events($this->_per_page, $this->_current_page);
        $this->_all_data_count = $this->_admin_page->get_events(0, 0, true);
    }


    /**
     * Set up of additional properties for the list table.
     *
     * @throws EE_Error
     */
    protected function _set_properties()
    {
        $this->_wp_list_args = array(
            'singular' => esc_html__('event', 'event_espresso'),
            'plural'   => esc_html__('events', 'event_espresso'),
            'ajax'     => true, // for now
            'screen'   => $this->_admin_page->get_current_screen()->id,
        );
        $approved_egistrations = esc_html__('Approved Registrations', 'event_espresso');
        $this->_columns = array(
            'cb'              => '<input type="checkbox" />',
            // 'status'          => '',
            'id'              => esc_html__('ID', 'event_espresso'),
            'name'            => esc_html__('Name', 'event_espresso'),
            'author'          => esc_html__('Author', 'event_espresso'),
            'venue'           => esc_html__('Venue', 'event_espresso'),
            'start_date_time' => esc_html__('Event Start', 'event_espresso'),
            'reg_begins'      => esc_html__('On Sale', 'event_espresso'),
            'attendees'       => '
                <span class="show-on-mobile-view-only" aria-label="' . $approved_egistrations . '">
                    ' . $approved_egistrations . '
                </span>
                <span class="dashicons dashicons-groups ee-icon-color-ee-green"></span>',
            'actions' => $this->actionsColumnHeader(),
        );
        $this->addConditionalColumns();
        $this->_sortable_columns = array(
            'id'              => array('EVT_ID' => true),
            'name'            => array('EVT_name' => false),
            'author'          => array('EVT_wp_user' => false),
            'venue'           => array('Venue.VNU_name' => false),
            'start_date_time' => array('Datetime.DTT_EVT_start' => false),
            'reg_begins'      => array('Datetime.Ticket.TKT_start_date' => false),
        );

        $this->_primary_column = 'id';
        $this->_hidden_columns = array('author', 'event_category');
    }


    /**
     * @return array
     */
    protected function _get_table_filters()
    {
        return array(); // no filters with decaf
    }


    /**
     * Setup of views properties.
     *
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     */
    protected function _add_view_counts()
    {
        $this->_views['all']['count'] = $this->_admin_page->total_events();
        $this->_views['draft']['count'] = $this->_admin_page->total_events_draft();
        if (
            EE_Registry::instance()->CAP->current_user_can(
                'ee_delete_events',
                'espresso_events_trash_events'
            )
        ) {
            $this->_views['trash']['count'] = $this->_admin_page->total_trashed_events();
        }
    }


    /**
     * @param EE_Event $item
     * @return string
     */
    protected function _get_row_class($item)
    {
        $class = parent::_get_row_class($item);
        if ($this->_has_checkbox_column) {
            $class .= ' has-checkbox-column';
        }
        return $class;
    }


    /**
     * @param EE_Event $item
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_cb($item)
    {
        if (! $item instanceof EE_Event) {
            return '';
        }
        $this->_dtt = $item->primary_datetime(); // set this for use in other columns
        $content = sprintf(
            '<input type="checkbox" name="EVT_IDs[]" value="%s" />',
            $item->ID()
        );
        return $this->columnContent('cb', $content, 'center');
    }


    /**
     * @param EE_Event $event
     * @return mixed|string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_id(EE_Event $event)
    {
        $content = $event->ID();
        $content .= '<span class="show-on-mobile-view-only">';
        $content .= $this->column_name($event, false);;
        $content .= '</span>';
        return $this->columnContent('id', $content, 'end');
    }


    /**
     * @param EE_Event $item
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function column_name(EE_Event $event, $prep_content = true)
    {
        $edit_query_args = array(
            'action' => 'edit',
            'post'   => $event->ID(),
        );
        $edit_link = EE_Admin_Page::add_query_args_and_nonce($edit_query_args, EVENTS_ADMIN_URL);
        $actions = $this->_column_name_action_setup($event);
        $status = esc_attr($event->get_active_status());
        $pretty_status = EEH_Template::pretty_status($status, false, 'sentence');
        $status_dot = '<span class="ee-status-dot ee-status-bg--' . $status . '"></span>';
        $content = '<div class="ee-layout-row">';
        $content .= '<a class="row-title ee-status-color--' . $status . ' ee-aria-tooltip" aria-label="' .
                    $pretty_status . '" href="' . $edit_link . '">' . $status_dot .
                    $event->name() . '</a>';
        $content .= '</div>';
        $content .= $this->row_actions($actions);

        return $prep_content ? $this->columnContent('name', $content) : $content;
    }


    /**
     * Just a method for setting up the actions for the name column
     *
     * @param EE_Event $event
     * @return array array of actions
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    protected function _column_name_action_setup(EE_Event $event)
    {
        // todo: remove when attendees is active
        if (! defined('REG_ADMIN_URL')) {
            define('REG_ADMIN_URL', EVENTS_ADMIN_URL);
        }
        $actions = array();
        $restore_event_link = '';
        $delete_event_link = '';
        $trash_event_link = '';
        if (
            EE_Registry::instance()->CAP->current_user_can(
                'ee_edit_event',
                'espresso_events_edit',
                $event->ID()
            )
        ) {
            $edit_query_args = array(
                'action' => 'edit',
                'post'   => $event->ID(),
            );
            $edit_link = EE_Admin_Page::add_query_args_and_nonce($edit_query_args, EVENTS_ADMIN_URL);
            $actions['edit'] = '<a href="' . $edit_link . '" class="ee-aria-tooltip" '
                               . ' aria-label="' . esc_attr__('Edit Event', 'event_espresso') . '">'
                               . esc_html__('Edit', 'event_espresso')
                               . '</a>';
        }
        if (
            EE_Registry::instance()->CAP->current_user_can(
                'ee_read_registrations',
                'espresso_registrations_view_registration'
            )
            && EE_Registry::instance()->CAP->current_user_can(
                'ee_read_event',
                'espresso_registrations_view_registration',
                $event->ID()
            )
        ) {
            $attendees_query_args = array(
                'action'   => 'default',
                'event_id' => $event->ID(),
            );
            $attendees_link = EE_Admin_Page::add_query_args_and_nonce($attendees_query_args, REG_ADMIN_URL);
            $actions['attendees'] = '<a href="' . $attendees_link . '" class="ee-aria-tooltip"'
                                    . ' aria-label="' . esc_attr__('View Registrations', 'event_espresso') . '">'
                                    . esc_html__('Registrations', 'event_espresso')
                                    . '</a>';
        }
        if (
            EE_Registry::instance()->CAP->current_user_can(
                'ee_delete_event',
                'espresso_events_trash_event',
                $event->ID()
            )
        ) {
            $trash_event_query_args = array(
                'action' => 'trash_event',
                'EVT_ID' => $event->ID(),
            );
            $trash_event_link = EE_Admin_Page::add_query_args_and_nonce(
                $trash_event_query_args,
                EVENTS_ADMIN_URL
            );
        }
        if (
            EE_Registry::instance()->CAP->current_user_can(
                'ee_delete_event',
                'espresso_events_restore_event',
                $event->ID()
            )
        ) {
            $restore_event_query_args = array(
                'action' => 'restore_event',
                'EVT_ID' => $event->ID(),
            );
            $restore_event_link = EE_Admin_Page::add_query_args_and_nonce(
                $restore_event_query_args,
                EVENTS_ADMIN_URL
            );
        }
        if (
            EE_Registry::instance()->CAP->current_user_can(
                'ee_delete_event',
                'espresso_events_delete_event',
                $event->ID()
            )
        ) {
            $delete_event_query_args = array(
                'action' => 'delete_event',
                'EVT_ID' => $event->ID(),
            );
            $delete_event_link = EE_Admin_Page::add_query_args_and_nonce(
                $delete_event_query_args,
                EVENTS_ADMIN_URL
            );
        }
        $view_link = get_permalink($event->ID());
        $actions['view'] = '<a href="' . $view_link . '" class="ee-aria-tooltip"'
                           . ' aria-label="' . esc_attr__('View Event', 'event_espresso') . '">'
                           . esc_html__('View', 'event_espresso')
                           . '</a>';
        if ($event->get('status') === 'trash') {
            if (
                EE_Registry::instance()->CAP->current_user_can(
                    'ee_delete_event',
                    'espresso_events_restore_event',
                    $event->ID()
                )
            ) {
                $actions['restore_from_trash'] = '<a href="' . $restore_event_link . '" class="ee-aria-tooltip"'
                                                 . ' aria-label="' . esc_attr__('Restore from Trash', 'event_espresso')
                                                 . '">'
                                                 . esc_html__('Restore from Trash', 'event_espresso')
                                                 . '</a>';
            }
            if (
                EE_Registry::instance()->CAP->current_user_can(
                    'ee_delete_event',
                    'espresso_events_delete_event',
                    $event->ID()
                )
            ) {
                $actions['delete'] = '<a href="' . $delete_event_link . '" class="ee-aria-tooltip"'
                                     . ' aria-label="' . esc_attr__('Delete Permanently', 'event_espresso') . '">'
                                     . esc_html__('Delete Permanently', 'event_espresso')
                                     . '</a>';
            }
        } else {
            if (
                EE_Registry::instance()->CAP->current_user_can(
                    'ee_delete_event',
                    'espresso_events_trash_event',
                    $event->ID()
                )
            ) {
                $actions['move to trash'] = '<a href="' . $trash_event_link . '" class="ee-aria-tooltip"'
                                            . ' aria-label="' . esc_attr__('Trash Event', 'event_espresso') . '">'
                                            . esc_html__('Trash', 'event_espresso')
                                            . '</a>';
            }
        }
        return $actions;
    }


    /**
     * @param EE_Event $event
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_author(EE_Event $event)
    {
        // user author info
        $event_author = get_userdata($event->wp_user());
        $gravatar = get_avatar($event->wp_user(), '24');
        // filter link
        $query_args = array(
            'action'      => 'default',
            'EVT_wp_user' => $event->wp_user(),
        );
        $filter_url = EE_Admin_Page::add_query_args_and_nonce($query_args, EVENTS_ADMIN_URL);
        $content = '<div class="ee-layout-row">';
        $content .= $gravatar . '  <a href="' . $filter_url . '" class="ee-aria-tooltip"'
               . ' aria-label="' . esc_attr__('Click to filter events by this author.', 'event_espresso') . '">'
               . $event_author->display_name
               . '</a>';
        $content .= '</div>';
        return $this->columnContent('author', $content);
    }


    /**
     * @param EE_Event $event
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_event_category(EE_Event $event)
    {
        $event_categories = $event->get_all_event_categories();
        $content = implode(
            ', ',
            array_map(
                function (EE_Term $category) {
                    return $category->name();
                },
                $event_categories
            )
        );
        return $this->columnContent('event_category', $content);
    }


    /**
     * @param EE_Event $event
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_venue(EE_Event $event)
    {
        $venue = $event->get_first_related('Venue');
        $content = ! empty($venue)
            ? $venue->name()
            : '';
        return $this->columnContent('venue', $content);
    }


    /**
     * @param EE_Event $event
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_start_date_time(EE_Event $event)
    {
        $content = $this->_dtt instanceof EE_Datetime
            ? $this->_dtt->get_i18n_datetime('DTT_EVT_start')
            : esc_html__('No Date was saved for this Event', 'event_espresso');
        return $this->columnContent('start_date_time', $content);
    }


    /**
     * @param EE_Event $event
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_reg_begins(EE_Event $event)
    {
        $reg_start = $event->get_ticket_with_earliest_start_time();
        $content = $reg_start instanceof EE_Ticket
            ? $reg_start->get_i18n_datetime('TKT_start_date')
            : esc_html__('No Tickets have been setup for this Event', 'event_espresso');
        return $this->columnContent('reg_begins', $content);
    }


    /**
     * @param EE_Event $event
     * @return int|string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function column_attendees(EE_Event $event)
    {
        $attendees_query_args = array(
            'action'   => 'default',
            'event_id' => $event->ID(),
        );
        $attendees_link = EE_Admin_Page::add_query_args_and_nonce($attendees_query_args, REG_ADMIN_URL);
        $registered_attendees = EEM_Registration::instance()->get_event_registration_count($event->ID());
        $content = EE_Registry::instance()->CAP->current_user_can(
            'ee_read_event',
            'espresso_registrations_view_registration',
            $event->ID()
        )
               && EE_Registry::instance()->CAP->current_user_can(
                   'ee_read_registrations',
                   'espresso_registrations_view_registration'
               )
            ? '<a href="' . $attendees_link . '">' . $registered_attendees . '</a>'
            : $registered_attendees;
        return $this->columnContent('attendees', $content, 'center');
    }


    /**
     * @param EE_Event $event
     * @return float
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function column_tkts_sold(EE_Event $event)
    {
        $content = EEM_Ticket::instance()->sum(array(array('Datetime.EVT_ID' => $event->ID())), 'TKT_sold');
        return $this->columnContent('tkts_sold', $content);
    }


    /**
     * @param EE_Event $event
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function column_actions(EE_Event $event)
    {
        // todo: remove when attendees is active
        if (! defined('REG_ADMIN_URL')) {
            define('REG_ADMIN_URL', EVENTS_ADMIN_URL);
        }
        $action_links = array();
        $view_link = get_permalink($event->ID());
        $action_links[] = '<a href="' . $view_link . '" class="ee-aria-tooltip button button--icon-only"'
                          . ' aria-label="' . esc_attr__('View Event', 'event_espresso') . '" target="_blank">
                          <span class="dashicons dashicons-visibility"></span></a>';
        if (
            EE_Registry::instance()->CAP->current_user_can(
                'ee_edit_event',
                'espresso_events_edit',
                $event->ID()
            )
        ) {
            $edit_query_args = array(
                'action' => 'edit',
                'post'   => $event->ID(),
            );
            $edit_link = EE_Admin_Page::add_query_args_and_nonce($edit_query_args, EVENTS_ADMIN_URL);
            $action_links[] = '<a href="' . $edit_link . '" class="ee-aria-tooltip button button--icon-only"'
                              . ' aria-label="' . esc_attr__('Edit Event', 'event_espresso') . '">'
                              . '<span class="dashicons dashicons-calendar-alt"></span>'
                              . '</a>';
        }
        if (
            EE_Registry::instance()->CAP->current_user_can(
                'ee_read_registrations',
                'espresso_registrations_view_registration'
            ) && EE_Registry::instance()->CAP->current_user_can(
                'ee_read_event',
                'espresso_registrations_view_registration',
                $event->ID()
            )
        ) {
            $attendees_query_args = array(
                'action'   => 'default',
                'event_id' => $event->ID(),
            );
            $attendees_link = EE_Admin_Page::add_query_args_and_nonce($attendees_query_args, REG_ADMIN_URL);
            $action_links[] = '<a href="' . $attendees_link . '" class="ee-aria-tooltip button button--icon-only"'
                              . ' aria-label="' . esc_attr__('View Registrants', 'event_espresso') . '">'
                              . '<span class="dashicons dashicons-groups"></span>'
                              . '</a>';
        }
        $action_links = apply_filters(
            'FHEE__Events_Admin_List_Table__column_actions__action_links',
            $action_links,
            $event
        );
        $content = $this->_action_string(
            implode("\n\t", $action_links),
            $event,
            'div',
            'event-overview-actions ee-list-table-actions'
        );
        return $this->columnContent('actions', $this->actionsModalMenu($content));
    }


    /**
     * Helper for adding columns conditionally
     *
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    private function addConditionalColumns()
    {
        $event_category_count = EEM_Term::instance()->count(
            [['Term_Taxonomy.taxonomy' => EEM_CPT_Base::EVENT_CATEGORY_TAXONOMY]]
        );
        if ($event_category_count === 0) {
            return;
        }
        $column_array = [];
        foreach ($this->_columns as $column => $column_label) {
            $column_array[ $column ] = $column_label;
            if ($column === 'venue') {
                $column_array['event_category'] = esc_html__('Event Category', 'event_espresso');
            }
        }
        $this->_columns = $column_array;
    }
}
