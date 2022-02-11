<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\ui\browser\checkins\entities\CheckinStatusDashicon;

/**
 * Class EE_Event_Registrations_List_Table
 *
 * @package       Event Espresso
 */
class EE_Event_Registrations_List_Table extends EE_Admin_List_Table
{

    /**
     * This property will hold the related Datetimes on an event IF the event id is included in the request.
     *
     * @var EE_Datetime[]
     */
    protected $_dtts_for_event = [];


    /**
     * The event if one is specified in the request
     *
     * @var EE_Event
     */
    protected $_evt = null;


    /**
     * The DTT_ID if the current view has a specified datetime.
     *
     * @var int $_cur_dtt_id
     */
    protected $_cur_dtt_id = 0;


    /**
     * EE_Event_Registrations_List_Table constructor.
     *
     * @param Registrations_Admin_Page $admin_page
     */
    public function __construct($admin_page)
    {
        parent::__construct($admin_page);
        $this->_status = $this->_admin_page->get_registration_status_array();
    }


    protected function _setup_data()
    {
        $this->_data           = $this->_view !== 'trash' ? $this->_admin_page->get_event_attendees($this->_per_page)
            : $this->_admin_page->get_event_attendees($this->_per_page, false, true);
        $this->_all_data_count = $this->_view !== 'trash' ? $this->_admin_page->get_event_attendees(
            $this->_per_page,
            true
        ) : $this->_admin_page->get_event_attendees($this->_per_page, true, true);
    }


    protected function _set_properties()
    {
        $return_url = $this->getReturnUrl();

        $evt_id              = isset($this->_req_data['event_id']) ? $this->_req_data['event_id'] : null;
        $this->_wp_list_args = [
            'singular' => esc_html__('registrant', 'event_espresso'),
            'plural'   => esc_html__('registrants', 'event_espresso'),
            'ajax'     => true,
            'screen'   => $this->_admin_page->get_current_screen()->id,
        ];
        $columns             = [];
        $this->_columns      = [
            '_REG_att_checked_in' => esc_html__('Check In', 'event_espresso'),
            'ATT_name'            => esc_html__('Registrant', 'event_espresso'),
            'ATT_email'           => esc_html__('Email Address', 'event_espresso'),
            'Event'               => esc_html__('Event', 'event_espresso'),
            'PRC_name'            => esc_html__('TKT Option', 'event_espresso'),
            '_REG_final_price'    => esc_html__('Price', 'event_espresso'),
            'TXN_paid'            => esc_html__('Paid', 'event_espresso'),
            'TXN_total'           => esc_html__('Total', 'event_espresso'),
        ];
        // Add/remove columns when an event has been selected
        if (! empty($evt_id)) {
            // Render a checkbox column
            $columns['cb']              = '<input type="checkbox" />';
            $this->_has_checkbox_column = true;
            // Remove the 'Event' column
            unset($this->_columns['Event']);
        }
        $this->_columns        = array_merge($columns, $this->_columns);
        $this->_primary_column = '_REG_att_checked_in';
        if (
            ! empty($evt_id)
            && EE_Registry::instance()->CAP->current_user_can(
                'ee_read_registrations',
                'espresso_registrations_registrations_reports',
                $evt_id
            )
        ) {
            $this->_bottom_buttons = [
                'report' => [
                    'route'         => 'registrations_report',
                    'extra_request' =>
                        [
                            'EVT_ID'     => $evt_id,
                            'return_url' => $return_url,
                        ],
                ],
            ];
        }
        $this->_bottom_buttons['report_filtered'] = [
            'route'         => 'registrations_checkin_report',
            'extra_request' => [
                'use_filters' => true,
                'filters'     => array_merge(
                    [
                        'EVT_ID' => $evt_id,
                    ],
                    array_diff_key(
                        $this->_req_data,
                        array_flip(
                            [
                                'page',
                                'action',
                                'default_nonce',
                            ]
                        )
                    )
                ),
                'return_url'  => $return_url,
            ],
        ];
        $this->_sortable_columns                  = [
            /**
             * Allows users to change the default sort if they wish.
             * Returning a falsey on this filter will result in the default sort to be by firstname rather than last name.
             *
             * Note: usual naming conventions for filters aren't followed here so that just one filter can be used to
             * change the sorts on any list table involving registration contacts.  If you want to only change the filter
             * for a specific list table you can use the provided reference to this object instance.
             */
            'ATT_name' => [
                'FHEE__EE_Registrations_List_Table___set_properties__default_sort_by_registration_last_name',
                true,
                $this,
            ]
                ? ['ATT_lname' => true]
                : ['ATT_fname' => true],
            'Event'    => ['Event.EVT_name' => false],
        ];
        $this->_hidden_columns                    = [];
        $this->_evt                               = EEM_Event::instance()->get_one_by_ID($evt_id);
        $this->_dtts_for_event                    =
            $this->_evt instanceof EE_Event ? $this->_evt->datetimes_ordered() : [];
    }


    /**
     * @param EE_Registration $registration
     * @return string
     */
    protected function _get_row_class($registration)
    {
        $class = parent::_get_row_class($registration);
        if ($this->_has_checkbox_column) {
            $class .= ' has-checkbox-column';
        }
        return $class;
    }


    /**
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _get_table_filters()
    {
        $filters        = $where = [];
        $current_EVT_ID = isset($this->_req_data['event_id']) ? (int) $this->_req_data['event_id'] : 0;
        if (empty($this->_dtts_for_event) || count($this->_dtts_for_event) === 1) {
            // this means we don't have an event so let's setup a filter dropdown for all the events to select
            // note possible capability restrictions
            if (! EE_Registry::instance()->CAP->current_user_can('ee_read_private_events', 'get_events')) {
                $where['status**'] = ['!=', 'private'];
            }
            if (! EE_Registry::instance()->CAP->current_user_can('ee_read_others_events', 'get_events')) {
                $where['EVT_wp_user'] = get_current_user_id();
            }
            $events  = EEM_Event::instance()->get_all(
                [
                    $where,
                    'order_by' => ['Datetime.DTT_EVT_start' => 'DESC'],
                ]
            );
            $evts[]  = [
                'id'   => 0,
                'text' => esc_html__(' - select an event - ', 'event_espresso'),
            ];
            $checked = 'checked';
            /** @var EE_Event $evt */
            foreach ($events as $evt) {
                // any registrations for this event?
                if (! $evt->get_count_of_all_registrations()) {
                    continue;
                }
                $evts[] = [
                    'id'    => $evt->ID(),
                    'text'  => apply_filters(
                        'FHEE__EE_Event_Registrations___get_table_filters__event_name',
                        $evt->get('EVT_name'),
                        $evt
                    ),
                    'class' => $evt->is_expired() ? 'ee-expired-event' : '',
                ];
                if ($evt->ID() === $current_EVT_ID && $evt->is_expired()) {
                    $checked = '';
                }
            }
            $event_filter = '<div class="ee-event-filter">';
            $event_filter .= '<label for="event_id">';
            $event_filter .= esc_html__('Check-in Status for', 'event_espresso');
            $event_filter .= '</label>&nbsp;&nbsp;';
            $event_filter .= EEH_Form_Fields::select_input('event_id', $evts, $current_EVT_ID);
            $event_filter .= '<span class="ee-event-filter-toggle">';
            $event_filter .= '<label for="js-ee-hide-expired-events">';
            $event_filter .= '<input type="checkbox" id="js-ee-hide-expired-events" ' . $checked . '>&nbsp;&nbsp;';
            $event_filter .= esc_html__('Hide Expired Events', 'event_espresso');
            $event_filter .= '</label>';
            $event_filter .= '</span>';
            $event_filter .= '</div>';
            $filters[]    = $event_filter;
        }
        if (! empty($this->_dtts_for_event)) {
            // DTT datetimes filter
            $this->_cur_dtt_id = isset($this->_req_data['DTT_ID']) ? $this->_req_data['DTT_ID'] : 0;
            if (count($this->_dtts_for_event) > 1) {
                $dtts[0] = esc_html__('To toggle check-in status, select a datetime.', 'event_espresso');
                foreach ($this->_dtts_for_event as $dtt) {
                    $datetime_string    = $dtt->name();
                    $datetime_string    = ! empty($datetime_string) ? ' (' . $datetime_string . ')' : '';
                    $datetime_string    =
                        $dtt->start_date_and_time() . ' - ' . $dtt->end_date_and_time() . $datetime_string;
                    $dtts[ $dtt->ID() ] = $datetime_string;
                }
                $input     = new EE_Select_Input(
                    $dtts,
                    [
                        'html_name' => 'DTT_ID',
                        'html_id'   => 'DTT_ID',
                        'default'   => $this->_cur_dtt_id,
                    ]
                );
                $filters[] = $input->get_html_for_input();
                $filters[] = '<input type="hidden" name="event_id" value="' . $current_EVT_ID . '">';
            }
        }
        return $filters;
    }


    protected function _add_view_counts()
    {
        $this->_views['all']['count'] = $this->_get_total_event_attendees();
    }


    /**
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _get_total_event_attendees()
    {
        $EVT_ID       = isset($this->_req_data['event_id']) ? absint($this->_req_data['event_id']) : false;
        $DTT_ID       = $this->_cur_dtt_id;
        $query_params = [];
        if ($EVT_ID) {
            $query_params[0]['EVT_ID'] = $EVT_ID;
        }
        // if DTT is included we only show for that datetime.  Otherwise we're showing for all datetimes (the event).
        if ($DTT_ID) {
            $query_params[0]['Ticket.Datetime.DTT_ID'] = $DTT_ID;
        }
        $status_ids_array          = apply_filters(
            'FHEE__Extend_Registrations_Admin_Page__get_event_attendees__status_ids_array',
            [EEM_Registration::status_id_pending_payment, EEM_Registration::status_id_approved]
        );
        $query_params[0]['STS_ID'] = ['IN', $status_ids_array];
        return EEM_Registration::instance()->count($query_params);
    }


    /**
     * @param EE_Registration $registration
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_cb($registration)
    {
        return sprintf('<input type="checkbox" name="checkbox[%1$s]" value="%1$s" />', $registration->ID());
    }


    /**
     * column_REG_att_checked_in
     *
     * @param EE_Registration $registration
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function column__REG_att_checked_in(EE_Registration $registration)
    {
        $attendee      = $registration->attendee();
        $attendee_name = $attendee instanceof EE_Attendee ? $attendee->full_name() : '';

        if ($this->_cur_dtt_id === 0 && count($this->_dtts_for_event) === 1) {
            $latest_related_datetime = $registration->get_latest_related_datetime();
            if ($latest_related_datetime instanceof EE_Datetime) {
                $this->_cur_dtt_id = $latest_related_datetime->ID();
            }
        }
        $checkin_status_dashicon = CheckinStatusDashicon::fromRegistrationAndDatetimeId(
            $registration,
            $this->_cur_dtt_id
        );
        $nonce                   = wp_create_nonce('checkin_nonce');
        $toggle_active           = ! empty($this->_cur_dtt_id)
                                   && EE_Registry::instance()->CAP->current_user_can(
            'ee_edit_checkin',
            'espresso_registrations_toggle_checkin_status',
            $registration->ID()
        )
            ? ' clickable trigger-checkin'
            : '';
        $mobile_view_content     = ' <span class="show-on-mobile-view-only">' . $attendee_name . '</span>';
        return '
        <button class="button button--secondary button--icon-only ' . $toggle_active . '"
                data-_regid="' . $registration->ID() . '"
                data-dttid="' . $this->_cur_dtt_id . '"
                data-nonce="' . $nonce . '"
        >   
            <span class="' . $checkin_status_dashicon->cssClasses() . '"></span>
        </button>
            '
               . $mobile_view_content;
    }


    /**
     * @param EE_Registration $registration
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_ATT_name(EE_Registration $registration)
    {
        $attendee = $registration->attendee();
        if (! $attendee instanceof EE_Attendee) {
            return esc_html__('No contact record for this registration.', 'event_espresso');
        }
        // edit attendee link
        $edit_lnk_url = EE_Admin_Page::add_query_args_and_nonce(
            ['action' => 'view_registration', '_REG_ID' => $registration->ID()],
            REG_ADMIN_URL
        );
        $name_link    = '
            <span class="ee-status-dot ee-status-bg--' . esc_attr($registration->status_ID()) . ' ee-aria-tooltip"
            aria-label="' . EEH_Template::pretty_status($registration->status_ID(), false, 'sentence') . '">
            </span>';
        $name_link    .= EE_Registry::instance()->CAP->current_user_can(
            'ee_edit_contacts',
            'espresso_registrations_edit_attendee'
        )
            ? '<a class="ee-aria-tooltip" href="' . $edit_lnk_url . '" aria-label="' . esc_attr__(
                'View Registration Details',
                'event_espresso'
            ) . '">'
              . $registration->attendee()->full_name()
              . '</a>'
            : $registration->attendee()->full_name();
        $name_link    .= $registration->count() === 1
            ? '&nbsp;<sup><div class="dashicons dashicons-star-filled gold-icon"></div></sup>	'
            : '';
        // add group details
        $name_link .= '&nbsp;' . sprintf(
                esc_html__('(%s of %s)', 'event_espresso'),
                $registration->count(),
                $registration->group_size()
            );
        // add regcode
        $link      = EE_Admin_Page::add_query_args_and_nonce(
            ['action' => 'view_registration', '_REG_ID' => $registration->ID()],
            REG_ADMIN_URL
        );
        $name_link .= '<br>';
        $name_link .= EE_Registry::instance()->instance()->CAP->current_user_can(
            'ee_read_registration',
            'view_registration',
            $registration->ID()
        )
            ? '<a class="ee-aria-tooltip" href="' . $link . '" aria-label="' . esc_attr__(
                'View Registration Details',
                'event_espresso'
            ) . '">'
              . $registration->reg_code()
              . '</a>'
            : $registration->reg_code();
        // status
        // $name_link               .= '<br><span class="ee-status-text-small">';
        // $name_link               .= EEH_Template::pretty_status($registration->status_ID(), false, 'sentence');
        // $name_link               .= '</span>';
        $actions                 = [];
        $DTT_ID                  = $this->_cur_dtt_id;
        $latest_related_datetime =
            empty($DTT_ID) && ! empty($this->_req_data['event_id']) && $registration instanceof EE_Registration
                ? $registration->get_latest_related_datetime()
                : null;
        $DTT_ID                  = $latest_related_datetime instanceof EE_Datetime
            ? $latest_related_datetime->ID()
            : $DTT_ID;
        if (
            ! empty($DTT_ID)
            && EE_Registry::instance()->CAP->current_user_can(
                'ee_read_checkins',
                'espresso_registrations_registration_checkins'
            )
        ) {
            $checkin_list_url = EE_Admin_Page::add_query_args_and_nonce(
                ['action' => 'registration_checkins', '_REG_ID' => $registration->ID(), 'DTT_ID' => $DTT_ID],
                REG_ADMIN_URL
            );
            // get the timestamps for this registration's checkins, related to the selected datetime
            $timestamps = $registration->get_many_related('Checkin', [['DTT_ID' => $DTT_ID]]);
            if (! empty($timestamps)) {
                // get the last timestamp
                $last_timestamp = end($timestamps);
                // checked in or checked out?
                $checkin_status = $last_timestamp->get('CHK_in')
                    ? esc_html__('Checked In', 'event_espresso')
                    : esc_html__('Checked Out', 'event_espresso');
                // get timestamp string
                $timestamp_string   = $last_timestamp->get_datetime('CHK_timestamp');
                $actions['checkin'] = '<a class="ee-aria-tooltip" href="' . $checkin_list_url . '" aria-label="'
                                      . esc_attr__(
                                          'View this registrant\'s check-ins/checkouts for the datetime',
                                          'event_espresso'
                                      ) . '">' . $checkin_status . ': ' . $timestamp_string . '</a>';
            }
        }
        return (! empty($DTT_ID) && ! empty($timestamps))
            ? sprintf('%1$s %2$s', $name_link, $this->row_actions($actions, true))
            : $name_link;
    }


    /**
     * @param EE_Registration $registration
     * @return string
     * @throws EE_Error
     * @throws EE_Error
     */
    public function column_ATT_email(EE_Registration $registration)
    {
        $attendee = $registration->attendee();
        return $attendee instanceof EE_Attendee ? $attendee->email() : '';
    }


    /**
     * @param EE_Registration $registration
     * @return bool|string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_Event(EE_Registration $registration)
    {
        try {
            $event         = $this->_evt instanceof EE_Event ? $this->_evt : $registration->event();
            $chkin_lnk_url = EE_Admin_Page::add_query_args_and_nonce(
                ['action' => 'event_registrations', 'event_id' => $event->ID()],
                REG_ADMIN_URL
            );
            $event_label   = EE_Registry::instance()->CAP->current_user_can(
                'ee_read_checkins',
                'espresso_registrations_registration_checkins'
            ) ? '<a class="ee-aria-tooltip" href="' . $chkin_lnk_url . '" aria-label="'
                . esc_attr__(
                    'View Checkins for this Event',
                    'event_espresso'
                ) . '">' . $event->name() . '</a>' : $event->name();
        } catch (\EventEspresso\core\exceptions\EntityNotFoundException $e) {
            $event_label = esc_html__('Unknown', 'event_espresso');
        }
        return $event_label;
    }


    /**
     * @param EE_Registration $registration
     * @return mixed|string|void
     */
    public function column_PRC_name(EE_Registration $registration)
    {
        return $registration->ticket() instanceof EE_Ticket
            ? $registration->ticket()->name()
            : esc_html__(
                "Unknown",
                "event_espresso"
            );
    }


    /**
     * column_REG_final_price
     *
     * @param EE_Registration $registration
     * @return string
     * @throws EE_Error
     * @throws EE_Error
     */
    public function column__REG_final_price(EE_Registration $registration)
    {
        return '<span class="reg-pad-rght">' . ' ' . $registration->pretty_final_price() . '</span>';
    }


    /**
     * column_TXN_paid
     *
     * @param EE_Registration $registration
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_TXN_paid(EE_Registration $registration)
    {
        if ($registration->count() === 1) {
            if ($registration->transaction()->paid() >= $registration->transaction()->total()) {
                return '<span class="reg-pad-rght"><div class="dashicons dashicons-yes green-icon"></div></span>';
            } else {
                $view_txn_lnk_url = EE_Admin_Page::add_query_args_and_nonce(
                    ['action' => 'view_transaction', 'TXN_ID' => $registration->transaction_ID()],
                    TXN_ADMIN_URL
                );
                return EE_Registry::instance()->CAP->current_user_can(
                    'ee_read_transaction',
                    'espresso_transactions_view_transaction'
                ) ? '
				<span class="reg-pad-rght">
					<a class="ee-aria-tooltip ee-status-color--'
                    . $registration->transaction()->status_ID()
                    . '" href="'
                    . $view_txn_lnk_url
                    . '"  aria-label="'
                    . esc_attr__('View Transaction', 'event_espresso')
                    . '">
						'
                    . $registration->transaction()->pretty_paid()
                    . '
					</a>
				<span>' : '<span class="reg-pad-rght">' . $registration->transaction()->pretty_paid() . '</span>';
            }
        } else {
            return '<span class="reg-pad-rght"></span>';
        }
    }


    /**
     *        column_TXN_total
     *
     * @param EE_Registration $registration
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_TXN_total(EE_Registration $registration)
    {
        $txn          = $registration->transaction();
        $view_txn_url = add_query_arg(['action' => 'view_transaction', 'TXN_ID' => $txn->ID()], TXN_ADMIN_URL);
        if ($registration->get('REG_count') === 1) {
            $line_total_obj = $txn->total_line_item();
            $txn_total      = $line_total_obj instanceof EE_Line_Item
                ? $line_total_obj->get_pretty('LIN_total')
                : esc_html__(
                    'View Transaction',
                    'event_espresso'
                );
            return EE_Registry::instance()->CAP->current_user_can(
                'ee_read_transaction',
                'espresso_transactions_view_transaction'
            ) ? '<a class="ee-aria-tooltip" href="'
                . $view_txn_url
                . '" aria-label="'
                . esc_attr__('View Transaction', 'event_espresso')
                . '"><span class="reg-pad-rght">'
                . $txn_total
                . '</span></a>' : '<span class="reg-pad-rght">' . $txn_total . '</span>';
        } else {
            return '<span class="reg-pad-rght"></span>';
        }
    }
}
