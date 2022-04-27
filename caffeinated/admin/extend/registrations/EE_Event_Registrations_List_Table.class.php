<?php

use EventEspresso\core\domain\services\admin\registrations\DatetimesForEventCheckIn;
use EventEspresso\core\exceptions\EntityNotFoundException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\request\RequestInterface;
use EventEspresso\ui\browser\checkins\entities\CheckinStatusDashicon;

/**
 * Class EE_Event_Registrations_List_Table
 *
 * @package       Event Espresso
 */
class EE_Event_Registrations_List_Table extends EE_Admin_List_Table
{
    /**
     * @var RequestInterface
     */
    protected $request;

    /**
     * @var Extend_Registrations_Admin_Page
     */
    protected $_admin_page;

    /**
     * The event ID if one is specified in the request
     *
     * @var int
     */
    protected $event_id = 0;

    /**
     * This property will hold the related Datetimes on an event IF the event id is included in the request.
     *
     * @var DatetimesForEventCheckIn
     */
    protected $datetimes_for_event = [];

    /**
     * The DTT_ID if the current view has a specified datetime.
     *
     * @var int
     */
    protected $datetime_id = 0;

    /**
     * @var EE_Datetime
     */
    protected $datetime;

    /**
     * @var EE_Event
     */
    protected $event;

    /**
     * @var DatetimesForEventCheckIn
     */
    protected $datetimes_for_current_row;

    /**
     * @var bool
     */
    protected $hide_expired;

    /**
     * @var bool
     */
    protected $hide_upcoming;


    /**
     * EE_Event_Registrations_List_Table constructor.
     *
     * @param Registrations_Admin_Page $admin_page
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function __construct($admin_page)
    {
        $this->request = LoaderFactory::getLoader()->getShared(RequestInterface::class);
        $this->resolveRequestVars();
        parent::__construct($admin_page);
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     * @since $VID:$
     */
    private function resolveRequestVars()
    {
        $this->event_id = $this->request->getRequestParam('event_id', 0, 'int');
        $this->datetimes_for_event = DatetimesForEventCheckIn::fromEventID($this->event_id);
        // if we're filtering for a specific event and it only has one datetime, then grab its ID
        $datetime          = $this->datetimes_for_event->getOneActiveDatetimeForEvent();
        $this->datetime_id = $datetime instanceof EE_Datetime ? $datetime->ID() : 0;
        // else check the request, but use the above as the default (and hope they match if BOTH exist, LOLZ)
        $this->datetime_id = $this->request->getRequestParam(
            'DTT_ID',
            $this->datetime_id,
            'int'
        );
    }


    /**
     * @throws EE_Error
     */
    protected function _setup_data()
    {
        $this->_data = $this->_view !== 'trash'
            ? $this->_admin_page->get_event_attendees($this->_per_page)
            : $this->_admin_page->get_event_attendees($this->_per_page, false, true);

        $this->_all_data_count = $this->_view !== 'trash'
            ? $this->_admin_page->get_event_attendees($this->_per_page, true)
            : $this->_admin_page->get_event_attendees($this->_per_page, true, true);
    }


    protected function _set_properties()
    {
        $this->_wp_list_args = [
            'singular' => esc_html__('registrant', 'event_espresso'),
            'plural'   => esc_html__('registrants', 'event_espresso'),
            'ajax'     => true,
            'screen'   => $this->_admin_page->get_current_screen()->id,
        ];

        $this->_columns      = [
            'cb' => '<input type="checkbox" />', // Render a checkbox instead of text
            '_REG_att_checked_in' => esc_html__('Check In', 'event_espresso'),
            'ATT_name'            => esc_html__('Registrant', 'event_espresso'),
            'ATT_email'           => esc_html__('Email Address', 'event_espresso'),
            'Event'               => esc_html__('Event', 'event_espresso'),
            'PRC_name'            => esc_html__('TKT Option', 'event_espresso'),
            '_REG_final_price'    => esc_html__('Price', 'event_espresso'),
            'TXN_paid'            => esc_html__('Paid', 'event_espresso'),
            'TXN_total'           => esc_html__('Total', 'event_espresso'),
        ];
        $this->_primary_column = '_REG_att_checked_in';

        // Add/remove columns when an event has been selected
        if ($this->event_id) {
            // Render a checkbox column
            $this->_columns['cb'] = '<input type="checkbox" />';
            $this->_has_checkbox_column = true;
            // Remove the 'Event' column
            unset($this->_columns['Event']);
            $this->setBottomButtons();
        }

        $this->_sortable_columns = [
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

        $this->_hidden_columns = [];
    }


    private function setBottomButtons()
    {
        if (
            ! EE_Registry::instance()->CAP->current_user_can(
                'ee_read_registrations',
                'espresso_registrations_registrations_reports',
                $this->event_id
            )
        ) {
            return;
        }

        $return_url = $this->getReturnUrl();
        $this->_bottom_buttons = [
            'report' => [
                'route'         => 'registrations_report',
                'extra_request' =>
                    [
                        'EVT_ID'     => $this->event_id,
                        'return_url' => $return_url,
                    ],
            ],
        ];

        $request_params = $this->request->requestParams();

        $this->_bottom_buttons['report_filtered'] = [
            'route'         => 'registrations_checkin_report',
            'extra_request' => [
                'use_filters' => true,
                'filters'     => array_merge(
                    [
                        'EVT_ID' => $this->event_id,
                    ],
                    array_diff_key(
                        $request_params,
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
    }


    /**
     * @param EE_Registration $item
     * @return string
     */
    protected function _get_row_class($item): string
    {
        $class = parent::_get_row_class($item);
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
    protected function _get_table_filters(): array
    {
        $filters = [];
        $this->hide_expired = $this->request->getRequestParam('hide_expired', false, 'bool');
        $this->hide_upcoming = $this->request->getRequestParam('hide_upcoming', false, 'bool');
        $hide_expired_checked = $this->hide_expired ? 'checked' : '';
        $hide_upcoming_checked = $this->hide_upcoming ? 'checked' : '';
        // get datetimes for ALL active events (note possible capability restrictions)
        $events   = $this->datetimes_for_event->getAllActiveDatetimesForAllEvents();
        $event_options[] = [
            'id'   => 0,
            'text' => esc_html__(' - select an event - ', 'event_espresso'),
        ];
        /** @var EE_Event $event */
        foreach ($events as $event) {
            // any registrations for this event?
            if (! $event instanceof EE_Event/* || ! $event->get_count_of_all_registrations()*/) {
                continue;
            }
            $expired_class = $event->is_expired() ? 'ee-expired-event' : '';
            $upcoming_class  = $event->is_upcoming() ? ' ee-upcoming-event' : '';
            $event_options[] = [
                'id'    => $event->ID(),
                'text'  => apply_filters(
                    'FHEE__EE_Event_Registrations___get_table_filters__event_name',
                    $event->name(),
                    $event
                ),
                'class' => $expired_class . $upcoming_class,
            ];
            if ($event->ID() === $this->event_id) {
                $this->hide_expired = $expired_class === '';
                $hide_expired_checked  = $expired_class === '' ? $hide_expired_checked : '';
                $this->hide_upcoming = $upcoming_class === '';
                $hide_upcoming_checked = $upcoming_class === '' ? $hide_upcoming_checked : '';
            }
        }

        $select_class = $this->hide_expired ? 'ee-hide-expired-events' : '';
        $select_class .= $this->hide_upcoming ? ' ee-hide-upcoming-events' : '';

        $filters[] = '
        <div class="ee-event-filter__wrapper">
            <label class="ee-event-filter-main-label">' . esc_html__('Check-in Status for', 'event_espresso') . '</label>
            <div class="ee-event-filter">
                <span class="ee-event-selector">
                    <label for="event_id">' . esc_html__('Event', 'event_espresso') . '</label>
                    ' . EEH_Form_Fields::select_input(
                            'event_id',
                            $event_options,
                            $this->event_id,
                            '',
                            $select_class
                        ) . '
                </span>';
        // DTT datetimes filter
        $datetimes_for_event = $this->datetimes_for_event->getAllActiveDatetimesForEvent($hide_upcoming_checked === 'checked');
        if (count($datetimes_for_event) > 1) {
            $datetimes[0] = esc_html__(' - select a datetime - ', 'event_espresso');
            foreach ($datetimes_for_event as $datetime) {
                $datetime_string              = $datetime->name();
                $datetime_string              = ! empty($datetime_string) ? ' (' . $datetime_string . ')' : '';
                $datetime_string              =
                    $datetime->start_date_and_time() . ' - ' . $datetime->end_date_and_time() . $datetime_string;
                $datetimes[ $datetime->ID() ] = $datetime_string;
            }
            $filters[] = '
                <span class="ee-datetime-selector">
                    <label for="DTT_ID">' . esc_html__('Datetime', 'event_espresso') . '</label>
                    ' . EEH_Form_Fields::select_input(
                        'DTT_ID',
                        $datetimes,
                        $this->datetime_id
                    ) . '
                </span>';
        }
        $filters[] = '
                <span class="ee-hide-upcoming-check">
                    <label for="js-ee-hide-upcoming-events">
                        <input type="checkbox" id="js-ee-hide-upcoming-events" name="hide_upcoming" '
                         . $hide_upcoming_checked
                         . '>
                        '
                         . esc_html__('Hide Upcoming Events', 'event_espresso')
                         . '
                    </label>
                    <span class="ee-help-btn dashicons dashicons-editor-help ee-aria-tooltip" aria-label="'
                         . esc_html__(
                             'Will not display events with start dates in the future (ie: have not yet begun)',
                             'event_espresso'
                         )
                         . '"></span>
                </span>
                <span class="ee-hide-expired-check">
                    <label for="js-ee-hide-expired-events">
                        <input type="checkbox" id="js-ee-hide-expired-events" name="hide_expired" '
                         . $hide_expired_checked
                         . '>
                        '
                         . esc_html__('Hide Expired Events', 'event_espresso')
                         . '
                    </label>
                    <span class="ee-help-btn dashicons dashicons-editor-help ee-aria-tooltip" aria-label="'
                         . esc_html__(
                             'Will not display events with end dates in the past (ie: have already finished)',
                             'event_espresso'
                         )
                         . '"></span>
                </span>
            </div>
        </div>';
        return $filters;
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _add_view_counts()
    {
        $this->_views['all']['count'] = $this->_get_total_event_attendees();
    }


    /**
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _get_total_event_attendees(): int
    {
        $query_params      = [];
        if ($this->event_id) {
            $query_params[0]['EVT_ID'] = $this->event_id;
        }
        // if DTT is included we only show for that datetime.  Otherwise we're showing for all datetimes (the event).
        if ($this->datetime_id) {
            $query_params[0]['Ticket.Datetime.DTT_ID'] = $this->datetime_id;
        }
        $status_ids_array          = apply_filters(
            'FHEE__Extend_Registrations_Admin_Page__get_event_attendees__status_ids_array',
            [EEM_Registration::status_id_pending_payment, EEM_Registration::status_id_approved]
        );
        $query_params[0]['STS_ID'] = ['IN', $status_ids_array];
        return EEM_Registration::instance()->count($query_params);
    }


    /**
     * @param EE_Registration $item
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_cb($item): string
    {
        return sprintf('<input type="checkbox" name="checkbox[%1$s]" value="%1$s" />', $item->ID());
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
    public function column__REG_att_checked_in(EE_Registration $registration): string
    {
        $reg_date_id = 0;
        $reg_datetimes = $registration->ticket()->datetimes();
        if (count($reg_datetimes) === 1) {
            $reg_datetime = reset($reg_datetimes);
            $reg_date_id = $reg_datetime instanceof EE_Datetime ? $reg_datetime->ID() : 0;
        }
        // we need a local variable for the datetime for each row
        // (so that we don't pollute state for the entire table)
        // so let's try to get it from the registration's event
        $this->datetimes_for_current_row = DatetimesForEventCheckIn::fromRegistration($registration);
        $datetime = $this->datetimes_for_current_row->getOneActiveDatetimeForEvent(
            $reg_date_id ?: $this->datetime_id,
            $this->hide_expired
        );

        $DTD_ID = $datetime instanceof EE_Datetime ? $datetime->ID() : 0;

        $checkin_status_dashicon = CheckinStatusDashicon::fromRegistrationAndDatetimeId(
            $registration,
            $DTD_ID
        );

        $aria_label = $checkin_status_dashicon->ariaLabel();
        $dashicon_class = $checkin_status_dashicon->cssClasses();
        $attributes = ' onClick="return false"';
        $button_class = 'button button--secondary button--icon-only ee-aria-tooltip ee-aria-tooltip--big-box';

        if (
            $DTD_ID
            && EE_Registry::instance()->CAP->current_user_can(
                'ee_edit_checkin',
                'espresso_registrations_toggle_checkin_status',
                $registration->ID()
            )
        ) {
            // overwrite the disabled attribute with data attributes for performing checkin
            $attributes = 'data-_regid="' . $registration->ID() . '"';
            $attributes .= ' data-dttid="' . $DTD_ID . '"';
            $attributes .= ' data-nonce="' . wp_create_nonce('checkin_nonce') . '"';
            $button_class .= ' clickable trigger-checkin';
        }

        $content = '
        <button aria-label="' . $aria_label . '" class="' . $button_class . '" ' . $attributes . '>   
            <span class="' . $dashicon_class . '" ></span>
        </button>
        <span class="show-on-mobile-view-only">' . $this->column_ATT_name($registration) . '</span>';
        return $this->columnContent('_REG_att_checked_in', $content, 'center');
    }


    /**
     * @param EE_Registration $registration
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_ATT_name(EE_Registration $registration): string
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

        $actions                 = [];
        if (
            $this->datetime_id
            && EE_Registry::instance()->CAP->current_user_can(
                'ee_read_checkins',
                'espresso_registrations_registration_checkins'
            )
        ) {
            $checkin_list_url = EE_Admin_Page::add_query_args_and_nonce(
                ['action' => 'registration_checkins', '_REG_ID' => $registration->ID(), 'DTT_ID' => $this->datetime_id],
                REG_ADMIN_URL
            );
            // get the timestamps for this registration's checkins, related to the selected datetime
            /** @var EE_Checkin[] $checkins */
            $checkins = $registration->get_many_related('Checkin', [['DTT_ID' => $this->datetime_id]]);
            if (! empty($checkins)) {
                // get the last timestamp
                $last_checkin = end($checkins);
                // get timestamp string
                $timestamp_string   = $last_checkin->get_datetime('CHK_timestamp');
                $actions['checkin'] = '
                    <a  class="ee-aria-tooltip" 
                        href="' . $checkin_list_url . '" 
                        aria-label="' . esc_attr__(
                            'View this registrant\'s check-ins/checkouts for the datetime',
                            'event_espresso'
                        ) . '"
                    >
                        ' . $last_checkin->getCheckInText() . ': ' . $timestamp_string . '
                    </a>';
            }
        }
        $content = (! empty($this->datetime_id) && ! empty($checkins))
            ? sprintf('%1$s %2$s', $name_link, $this->row_actions($actions, true))
            : $name_link;
        return $this->columnContent('ATT_name', $content);
    }


    /**
     * @param EE_Registration $registration
     * @return string
     * @throws EE_Error
     * @throws EE_Error
     */
    public function column_ATT_email(EE_Registration $registration): string
    {
        $attendee = $registration->attendee();
        $content = $attendee instanceof EE_Attendee ? $attendee->email() : '';
        return $this->columnContent('ATT_email', $content);
    }


    /**
     * @param EE_Registration $registration
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_Event(EE_Registration $registration): string
    {
        try {
            $event            = $this->event instanceof EE_Event ? $this->event : $registration->event();
            $checkin_link_url = EE_Admin_Page::add_query_args_and_nonce(
                ['action' => 'event_registrations', 'event_id' => $event->ID()],
                REG_ADMIN_URL
            );
            $content      = EE_Registry::instance()->CAP->current_user_can(
                'ee_read_checkins',
                'espresso_registrations_registration_checkins'
            ) ? '<a class="ee-aria-tooltip" href="' . $checkin_link_url . '" aria-label="'
                . esc_attr__(
                    'View Checkins for this Event',
                    'event_espresso'
                ) . '">' . $event->name() . '</a>' : $event->name();
        } catch (EntityNotFoundException $e) {
            $content = esc_html__('Unknown', 'event_espresso');
        }
        return $this->columnContent('Event', $content);
    }


    /**
     * @param EE_Registration $registration
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_PRC_name(EE_Registration $registration): string
    {
        $content = $registration->ticket() instanceof EE_Ticket
            ? $registration->ticket()->name()
            : esc_html__(
                "Unknown",
                "event_espresso"
            );
        return $this->columnContent('PRC_name', $content);
    }


    /**
     * column_REG_final_price
     *
     * @param EE_Registration $registration
     * @return string
     * @throws EE_Error
     */
    public function column__REG_final_price(EE_Registration $registration): string
    {
        return $this->columnContent('_REG_final_price', $registration->pretty_final_price(), 'end');
    }


    /**
     * column_TXN_paid
     *
     * @param EE_Registration $registration
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_TXN_paid(EE_Registration $registration): string
    {
        $content = '';
        if ($registration->count() === 1) {
            if ($registration->transaction()->paid() >= $registration->transaction()->total()) {
                return '<div class="dashicons dashicons-yes green-icon"></div>';
            } else {
                $view_txn_lnk_url = EE_Admin_Page::add_query_args_and_nonce(
                    ['action' => 'view_transaction', 'TXN_ID' => $registration->transaction_ID()],
                    TXN_ADMIN_URL
                );
                $content = EE_Registry::instance()->CAP->current_user_can(
                    'ee_read_transaction',
                    'espresso_transactions_view_transaction'
                ) ? '
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
				' : $registration->transaction()->pretty_paid();
            }
        }
        return $this->columnContent('TXN_paid', $content, 'end');
    }


    /**
     *        column_TXN_total
     *
     * @param EE_Registration $registration
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function column_TXN_total(EE_Registration $registration): string
    {
        $content = '';
        $txn = $registration->transaction();
        $view_txn_url = add_query_arg(['action' => 'view_transaction', 'TXN_ID' => $txn->ID()], TXN_ADMIN_URL);
        if ($registration->get('REG_count') === 1) {
            $line_total_obj = $txn->total_line_item();
            $txn_total      = $line_total_obj instanceof EE_Line_Item
                ? $line_total_obj->get_pretty('LIN_total')
                : esc_html__(
                    'View Transaction',
                    'event_espresso'
                );
            $content = EE_Registry::instance()->CAP->current_user_can(
                'ee_read_transaction',
                'espresso_transactions_view_transaction'
            ) ? '<a class="ee-aria-tooltip" href="'
                . $view_txn_url
                . '" aria-label="'
                . esc_attr__('View Transaction', 'event_espresso')
                . '">'
                . $txn_total
                . '</a>'
                : $txn_total;
        }
        return $this->columnContent('TXN_total', $content, 'end');
    }
}
