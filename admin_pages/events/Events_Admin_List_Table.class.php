<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;

defined('EVENT_ESPRESSO_VERSION') || exit('No direct access allowed');


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
     */
    protected function _set_properties()
    {
        $this->_wp_list_args = array(
            'singular' => esc_html__('event', 'event_espresso'),
            'plural'   => esc_html__('events', 'event_espresso'),
            'ajax'     => true, //for now
            'screen'   => $this->_admin_page->get_current_screen()->id,
        );
        $this->_columns = array(
            'cb'              => '<input type="checkbox" />',
            'id'              => esc_html__('ID', 'event_espresso'),
            'name'            => esc_html__('Name', 'event_espresso'),
            'author'          => esc_html__('Author', 'event_espresso'),
            'venue'           => esc_html__('Venue', 'event_espresso'),
            'start_date_time' => esc_html__('Event Start', 'event_espresso'),
            'reg_begins'      => esc_html__('On Sale', 'event_espresso'),
            'attendees'       => '<span class="dashicons dashicons-groups ee-icon-color-ee-green ee-icon-size-20">'
                                 . '</span>',
            //'tkts_sold' => esc_html__('Tickets Sold', 'event_espresso'),
            'actions'         => esc_html__('Actions', 'event_espresso'),
        );
        $this->_sortable_columns = array(
            'id'              => array('EVT_ID' => true),
            'name'            => array('EVT_name' => false),
            'author'          => array('EVT_wp_user' => false),
            'venue'           => array('Venue.VNU_name' => false),
            'start_date_time' => array('Datetime.DTT_EVT_start' => false),
            'reg_begins'      => array('Datetime.Ticket.TKT_start_date' => false),
        );
        $this->_primary_column = 'id';
        $this->_hidden_columns = array('author');
    }



    /**
     * @return array
     */
    protected function _get_table_filters()
    {
        return array(); //no filters with decaf
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
        if (EE_Registry::instance()->CAP->current_user_can(
            'ee_delete_events',
            'espresso_events_trash_events'
        )) {
            $this->_views['trash']['count'] = $this->_admin_page->total_trashed_events();
        }
    }



    /**
     * @param EE_Event $item
     * @return string
     * @throws EE_Error
     */
    protected function _get_row_class($item)
    {
        $class = parent::_get_row_class($item);
        //add status class
        $class .= $item instanceof EE_Event
            ? ' ee-status-strip event-status-' . $item->get_active_status()
            : '';
        if ($this->_has_checkbox_column) {
            $class .= ' has-checkbox-column';
        }
        return $class;
    }



    /**
     * @param EE_Event $item
     * @return string
     * @throws EE_Error
     */
    public function column_status(EE_Event $item)
    {
        return '<span class="ee-status-strip ee-status-strip-td event-status-'
               . $item->get_active_status()
               . '"></span>';
    }



    /**
     * @param  EE_Event $item
     * @return string
     * @throws EE_Error
     */
    public function column_cb($item)
    {
        if (! $item instanceof EE_Event) {
            return '';
        }
        $this->_dtt = $item->primary_datetime(); //set this for use in other columns
        //does event have any attached registrations?
        $regs = $item->count_related('Registration');
        return $regs > 0 && $this->_view === 'trash'
            ? '<span class="ee-lock-icon"></span>'
            : sprintf(
                '<input type="checkbox" name="EVT_IDs[]" value="%s" />',
                $item->ID()
            );
    }



    /**
     * @param EE_Event $item
     * @return mixed|string
     * @throws EE_Error
     */
    public function column_id(EE_Event $item)
    {
        $content = $item->ID();
        $content .= '  <span class="show-on-mobile-view-only">' . $item->name() . '</span>';
        return $content;
    }



    /**
     * @param EE_Event $item
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function column_name(EE_Event $item)
    {
        $edit_query_args = array(
            'action' => 'edit',
            'post'   => $item->ID(),
        );
        $edit_link = EE_Admin_Page::add_query_args_and_nonce($edit_query_args, EVENTS_ADMIN_URL);
        $actions = $this->_column_name_action_setup($item);
        $status = ''; //$item->status() !== 'publish' ? ' (' . $item->status() . ')' : '';
        $content = '<strong><a class="row-title" href="'
                   . $edit_link . '">'
                   . $item->name()
                   . '</a></strong>'
                   . $status;
        $content .= '<br><span class="ee-status-text-small">'
                    . EEH_Template::pretty_status(
                $item->get_active_status(),
                false,
                'sentence'
            )
                    . '</span>';
        $content .= $this->row_actions($actions);
        return $content;
    }



    /**
     * Just a method for setting up the actions for the name column
     *
     * @param EE_Event $item
     * @return array array of actions
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    protected function _column_name_action_setup(EE_Event $item)
    {
        //todo: remove when attendees is active
        if (! defined('REG_ADMIN_URL')) {
            define('REG_ADMIN_URL', EVENTS_ADMIN_URL);
        }
        $actions = array();
        $restore_event_link = '';
        $delete_event_link = '';
        $trash_event_link = '';
        if (EE_Registry::instance()->CAP->current_user_can(
            'ee_edit_event',
            'espresso_events_edit',
            $item->ID()
        )) {
            $edit_query_args = array(
                'action' => 'edit',
                'post'   => $item->ID(),
            );
            $edit_link = EE_Admin_Page::add_query_args_and_nonce($edit_query_args, EVENTS_ADMIN_URL);
            $actions['edit'] = '<a href="' . $edit_link . '"'
                               . ' title="' . esc_attr__('Edit Event', 'event_espresso') . '">'
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
                $item->ID()
            )
        ) {
            $attendees_query_args = array(
                'action'   => 'default',
                'event_id' => $item->ID(),
            );
            $attendees_link = EE_Admin_Page::add_query_args_and_nonce($attendees_query_args, REG_ADMIN_URL);
            $actions['attendees'] = '<a href="' . $attendees_link . '"'
                                    . ' title="' . esc_attr__('View Registrations', 'event_espresso') . '">'
                                    . esc_html__('Registrations', 'event_espresso')
                                    . '</a>';
        }
        if (
        EE_Registry::instance()->CAP->current_user_can(
            'ee_delete_event',
            'espresso_events_trash_event',
            $item->ID()
        )
        ) {
            $trash_event_query_args = array(
                'action' => 'trash_event',
                'EVT_ID' => $item->ID(),
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
            $item->ID()
        )
        ) {
            $restore_event_query_args = array(
                'action' => 'restore_event',
                'EVT_ID' => $item->ID(),
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
            $item->ID()
        )
        ) {
            $delete_event_query_args = array(
                'action' => 'delete_event',
                'EVT_ID' => $item->ID(),
            );
            $delete_event_link = EE_Admin_Page::add_query_args_and_nonce(
                $delete_event_query_args,
                EVENTS_ADMIN_URL
            );
        }
        $view_link = get_permalink($item->ID());
        $actions['view'] = '<a href="' . $view_link . '"'
                           . ' title="' . esc_attr__('View Event', 'event_espresso') . '">'
                           . esc_html__('View', 'event_espresso')
                           . '</a>';
        if ($item->get('status') === 'trash') {
            if (EE_Registry::instance()->CAP->current_user_can(
                'ee_delete_event',
                'espresso_events_restore_event',
                $item->ID()
            )) {
                $actions['restore_from_trash'] = '<a href="' . $restore_event_link . '"'
                                                 . ' title="' . esc_attr__('Restore from Trash', 'event_espresso')
                                                 . '">'
                                                 . esc_html__('Restore from Trash', 'event_espresso')
                                                 . '</a>';
            }
            if (
                $item->count_related('Registration') === 0
                && EE_Registry::instance()->CAP->current_user_can(
                    'ee_delete_event',
                    'espresso_events_delete_event',
                    $item->ID()
                )
            ) {
                $actions['delete'] = '<a href="' . $delete_event_link . '"'
                                     . ' title="' . esc_attr__('Delete Permanently', 'event_espresso') . '">'
                                     . esc_html__('Delete Permanently', 'event_espresso')
                                     . '</a>';
            }
        } else {
            if (
                EE_Registry::instance()->CAP->current_user_can(
                    'ee_delete_event',
                    'espresso_events_trash_event',
                    $item->ID()
                )
            ) {
                $actions['move to trash'] = '<a href="' . $trash_event_link . '"'
                                            . ' title="' . esc_attr__('Trash Event', 'event_espresso') . '">'
                                            . esc_html__('Trash', 'event_espresso')
                                            . '</a>';
            }
        }
        return $actions;
    }



    /**
     * @param EE_Event $item
     * @return string
     * @throws EE_Error
     */
    public function column_author(EE_Event $item)
    {
        //user author info
        $event_author = get_userdata($item->wp_user());
        $gravatar = get_avatar($item->wp_user(), '15');
        //filter link
        $query_args = array(
            'action'      => 'default',
            'EVT_wp_user' => $item->wp_user(),
        );
        $filter_url = EE_Admin_Page::add_query_args_and_nonce($query_args, EVENTS_ADMIN_URL);
        return $gravatar . '  <a href="' . $filter_url . '"'
               . ' title="' . esc_attr__('Click to filter events by this author.', 'event_espresso') . '">'
               . $event_author->display_name
               . '</a>';
    }



    /**
     * @param EE_Event $item
     * @return string
     * @throws EE_Error
     */
    public function column_venue(EE_Event $item)
    {
        $venue = $item->get_first_related('Venue');
        return ! empty($venue)
            ? $venue->name()
            : '';
    }



    /**
     * @param EE_Event $item
     * @throws EE_Error
     */
    public function column_start_date_time(EE_Event $item)
    {
        echo ! empty($this->_dtt)
            ? $this->_dtt->get_i18n_datetime('DTT_EVT_start')
            : esc_html__('No Date was saved for this Event', 'event_espresso');
        //display in user's timezone?
        echo ! empty($this->_dtt)
            ? $this->_dtt->display_in_my_timezone(
                'DTT_EVT_start',
                'get_i18n_datetime',
                '',
                'My Timezone: '
            )
            : '';
    }



    /**
     * @param EE_Event $item
     * @throws EE_Error
     */
    public function column_reg_begins(EE_Event $item)
    {
        $reg_start = $item->get_ticket_with_earliest_start_time();
        echo ! empty($reg_start)
            ? $reg_start->get_i18n_datetime('TKT_start_date')
            : esc_html__('No Tickets have been setup for this Event', 'event_espresso');
        //display in user's timezone?
        echo ! empty($reg_start)
            ? $reg_start->display_in_my_timezone(
                'TKT_start_date',
                'get_i18n_datetime',
                '',
                'My Timezone: '
            )
            : '';
    }



    /**
     * @param EE_Event $item
     * @return int|string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function column_attendees(EE_Event $item)
    {
        $attendees_query_args = array(
            'action'   => 'default',
            'event_id' => $item->ID(),
        );
        $attendees_link = EE_Admin_Page::add_query_args_and_nonce($attendees_query_args, REG_ADMIN_URL);
        $registered_attendees = EEM_Registration::instance()->get_event_registration_count($item->ID());
        return EE_Registry::instance()->CAP->current_user_can(
            'ee_read_event',
            'espresso_registrations_view_registration',
            $item->ID()
        )
               && EE_Registry::instance()->CAP->current_user_can(
            'ee_read_registrations',
            'espresso_registrations_view_registration'
        )
            ? '<a href="' . $attendees_link . '">' . $registered_attendees . '</a>'
            : $registered_attendees;
    }



    /**
     * @param EE_Event $item
     * @return float
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function column_tkts_sold(EE_Event $item)
    {
        return EEM_Ticket::instance()->sum(array(array('Datetime.EVT_ID' => $item->ID())), 'TKT_sold');
    }



    /**
     * @param EE_Event $item
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function column_actions(EE_Event $item)
    {
        //todo: remove when attendees is active
        if (! defined('REG_ADMIN_URL')) {
            define('REG_ADMIN_URL', EVENTS_ADMIN_URL);
        }
        $action_links = array();
        $view_link = get_permalink($item->ID());
        $action_links[] = '<a href="' . $view_link . '"'
                         . ' title="' . esc_attr__('View Event', 'event_espresso') . '" target="_blank">';
        $action_links[] = '<div class="dashicons dashicons-search"></div></a>';
        if (EE_Registry::instance()->CAP->current_user_can(
            'ee_edit_event',
            'espresso_events_edit',
            $item->ID()
        )) {
            $edit_query_args = array(
                'action' => 'edit',
                'post'   => $item->ID(),
            );
            $edit_link = EE_Admin_Page::add_query_args_and_nonce($edit_query_args, EVENTS_ADMIN_URL);
            $action_links[] = '<a href="' . $edit_link . '"'
                             . ' title="' . esc_attr__('Edit Event', 'event_espresso') . '">'
                             . '<div class="ee-icon ee-icon-calendar-edit"></div>'
                             . '</a>';
        }
        if (
            EE_Registry::instance()->CAP->current_user_can(
                'ee_read_registrations',
                'espresso_registrations_view_registration'
            ) && EE_Registry::instance()->CAP->current_user_can(
                'ee_read_event',
                'espresso_registrations_view_registration',
                $item->ID()
            )
        ) {
            $attendees_query_args = array(
                'action'   => 'default',
                'event_id' => $item->ID(),
            );
            $attendees_link = EE_Admin_Page::add_query_args_and_nonce($attendees_query_args, REG_ADMIN_URL);
            $action_links[] = '<a href="' . $attendees_link . '"'
                             . ' title="' . esc_attr__('View Registrants', 'event_espresso') . '">'
                             . '<div class="dashicons dashicons-groups"></div>'
                             . '</a>';
        }
        $action_links = apply_filters(
            'FHEE__Events_Admin_List_Table__column_actions__action_links',
            $action_links,
            $item
        );
        return $this->_action_string(
            implode("\n\t", $action_links),
            $item,
            'div'
        );
    }
}
