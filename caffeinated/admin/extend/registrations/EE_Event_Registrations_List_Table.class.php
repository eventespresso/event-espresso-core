<?php

use EventEspresso\core\domain\services\admin\registrations\DatetimesForEventCheckIn;
use EventEspresso\core\domain\services\admin\registrations\list_table\csv_reports\RegistrationsCsvReportParams;
use EventEspresso\core\domain\services\registration\RegStatus;
use EventEspresso\core\exceptions\EntityNotFoundException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\request\DataType;
use EventEspresso\core\services\request\RequestInterface;
use EventEspresso\ui\browser\checkins\entities\CheckinStatusDashicon;

/**
 * Class EE_Event_Registrations_List_Table
 *
 * @package       Event Espresso
 */
class EE_Event_Registrations_List_Table extends EE_Registrations_List_Table
{
    /**
     * @var Extend_Registrations_Admin_Page
     */
    protected EE_Admin_Page $_admin_page;

    /**
     * This property will hold the related Datetimes on an event IF the event id is included in the request.
     */
    protected DatetimesForEventCheckIn  $datetimes_for_event;

    protected ?DatetimesForEventCheckIn $datetimes_for_current_row = null;

    /**
     * The DTT_ID if the current view has a specified datetime.
     */
    protected int          $datetime_id = 0;

    protected ?EE_Datetime $datetime    = null;

    /**
     * The event ID if one is specified in the request
     */
    protected int       $event_id      = 0;

    protected ?EE_Event $event         = null;

    protected bool      $hide_expired  = false;

    protected bool      $hide_upcoming = false;

    protected array     $_status       = [];


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
     * @since 5.0.0.p
     */
    private function resolveRequestVars()
    {
        $this->event_id            = $this->request->getRequestParam('event_id', 0, DataType::INTEGER);
        $this->datetimes_for_event = DatetimesForEventCheckIn::fromEventID($this->event_id);
        // if we're filtering for a specific event and it only has one datetime, then grab its ID
        $this->datetime    = $this->datetimes_for_event->getOneDatetimeForEvent();
        $this->datetime_id = $this->datetime instanceof EE_Datetime ? $this->datetime->ID() : 0;
        // else check the request, but use the above as the default (and hope they match if BOTH exist, LOLZ)
        $this->datetime_id = $this->request->getRequestParam(
            'DTT_ID',
            $this->datetime_id,
            DataType::INTEGER
        );
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
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


    /**
     * @throws ReflectionException
     * @throws EE_Error
     */
    protected function _set_properties()
    {
        $this->_wp_list_args = [
            'singular' => esc_html__('registrant', 'event_espresso'),
            'plural'   => esc_html__('registrants', 'event_espresso'),
            'ajax'     => true,
            'screen'   => $this->_admin_page->get_current_screen()->id,
        ];
        $columns             = [];

        $this->_columns = [
            '_REG_att_checked_in' => '<span class="dashicons dashicons-yes-alt"></span>',
            'ATT_name'            => esc_html__('Registrant', 'event_espresso'),
            'ATT_email'           => esc_html__('Email Address', 'event_espresso'),
            'Event'               => esc_html__('Event', 'event_espresso'),
            'REG_ticket'          => esc_html__('Ticket', 'event_espresso'),
            '_REG_final_price'    => esc_html__('Price', 'event_espresso'),
            '_REG_paid'           => esc_html__('REG Paid', 'event_espresso'),
            'TXN_total'           => esc_html__('TXN Paid/Total', 'event_espresso'),
        ];
        // Add/remove columns when an event has been selected
        if (! empty($this->event_id)) {
            // Render a checkbox column
            $columns['cb']              = '<input type="checkbox" />';
            $this->_has_checkbox_column = true;
            // Remove the 'Event' column
            unset($this->_columns['Event']);
        }
        $this->_columns        = array_merge($columns, $this->_columns);
        $this->_primary_column = '_REG_att_checked_in';

        $csv_report = RegistrationsCsvReportParams::getRequestParams(
            $this->getReturnUrl(),
            $this->_admin_page->get_request_data(),
            $this->event_id,
            $this->datetime_id
        );
        if (! empty($csv_report)) {
            $this->_bottom_buttons['csv_reg_report'] = $csv_report;
        }

        $this->_sortable_columns = [
            /**
             * Allows users to change the default sort if they wish.
             * Returning a falsey on this filter will result in the default sort to be by firstname rather than last name.
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
        $this->_hidden_columns   = [];
        $this->event             = EEM_Event::instance()->get_one_by_ID($this->event_id);
        if ($this->event instanceof EE_Event) {
            $this->datetimes_for_event = DatetimesForEventCheckIn::fromEvent($this->event);
        }
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
    protected function _get_table_filters()
    {
        $filters               = [];
        $this->hide_expired    = $this->request->getRequestParam('hide_expired', false, DataType::BOOL);
        $this->hide_upcoming   = $this->request->getRequestParam('hide_upcoming', false, DataType::BOOL);
        $hide_expired_checked  = $this->hide_expired ? 'checked' : '';
        $hide_upcoming_checked = $this->hide_upcoming ? 'checked' : '';
        // get datetimes for ALL active events (note possible capability restrictions)
        $events          = $this->datetimes_for_event->getAllEvents();
        $event_options[] = [
            'id'   => 0,
            'text' => esc_html__(' - select an event - ', 'event_espresso'),
        ];
        foreach ($events as $event) {
            // any registrations for this event?
            if (! $event instanceof EE_Event/* || ! $event->get_count_of_all_registrations()*/) {
                continue;
            }
            $expired_class  = $event->is_expired() ? 'ee-expired-event' : '';
            $upcoming_class = $event->is_upcoming() ? ' ee-upcoming-event' : '';

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
                $this->hide_expired    = $expired_class === '' ? $this->hide_expired : false;
                $hide_expired_checked  = $expired_class === '' ? $hide_expired_checked : '';
                $this->hide_upcoming   = $upcoming_class === '' ? $this->hide_upcoming : false;
                $hide_upcoming_checked = $upcoming_class === '' ? $hide_upcoming_checked : '';
            }
        }

        $select_class = $this->hide_expired ? 'ee-hide-expired-events' : '';
        $select_class .= $this->hide_upcoming ? ' ee-hide-upcoming-events' : '';
        $select_input = EEH_Form_Fields::select_input(
            'event_id',
            $event_options,
            $this->event_id,
            '',
            $select_class
        );

        $filters[] = '
        <div class="ee-event-filter__wrapper">
            <label class="ee-event-filter-main-label">
                ' . esc_html__('Check-in Status for', 'event_espresso') . '
            </label>
            <div class="ee-event-filter ee-status-outline ee-status-bg--info">
                <span class="ee-event-selector">
                    <label for="event_id">' . esc_html__('Event', 'event_espresso') . '</label>
                    ' . $select_input . '
                </span>';
        // DTT datetimes filter
        $datetimes_for_event = $this->datetimes_for_event->getAllDatetimesForEvent(
            $hide_upcoming_checked === 'checked'
        );
        if (count($datetimes_for_event) > 1) {
            $datetimes[0] = esc_html__(' - select a datetime - ', 'event_espresso');
            foreach ($datetimes_for_event as $datetime) {
                if ($datetime instanceof EE_Datetime) {
                    $datetime_string = $datetime->name();
                    $datetime_string = ! empty($datetime_string) ? $datetime_string . ': ' : '';
                    $datetime_string .= $datetime->date_and_time_range();
                    $datetime_string .= $datetime->is_active() ? ' ∗' : '';
                    $datetime_string .= $datetime->is_expired() ? ' «' : '';
                    $datetime_string .= $datetime->is_upcoming() ? ' »' : '';
                    // now put it all together
                    $datetimes[ $datetime->ID() ] = $datetime_string;
                }
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
                    <span class="ee-help-btn dashicons dashicons-editor-help ee-aria-tooltip"
                          aria-label="'
                         . esc_html__(
                             'Will not display events with start dates in the future (ie: have not yet begun)',
                             'event_espresso'
                         ) . '"
                    ></span>
                </span>
                <span class="ee-hide-expired-check">
                    <label for="js-ee-hide-expired-events">
                        <input type="checkbox" id="js-ee-hide-expired-events" name="hide_expired" '
                         . $hide_expired_checked
                         . '>
                            ' . esc_html__('Hide Expired Events', 'event_espresso') . '
                    </label>
                    <span class="ee-help-btn dashicons dashicons-editor-help ee-aria-tooltip"
                          aria-label="'
                         . esc_html__(
                             'Will not display events with end dates in the past (ie: have already finished)',
                             'event_espresso'
                         )
                         . '"
                    ></span>
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
        $query_params = [];
        if ($this->event_id) {
            $query_params[0]['EVT_ID'] = $this->event_id;
        }
        // if DTT is included we only show for that datetime.  Otherwise we're showing for all datetimes (the event).
        if ($this->datetime_id) {
            $query_params[0]['Ticket.Datetime.DTT_ID'] = $this->datetime_id;
        }
        $status_ids_array          = apply_filters(
            'FHEE__Extend_Registrations_Admin_Page__get_event_attendees__status_ids_array',
            [RegStatus::PENDING_PAYMENT, RegStatus::APPROVED]
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
        // we need a local variable for the datetime for each row
        // (so that we don't pollute state for the entire table)
        // so let's try to get it from the registration's event
        $DTT_ID = $this->datetime_id;
        if (! $DTT_ID) {
            $reg_ticket_datetimes = $registration->ticket()->datetimes();
            if (count($reg_ticket_datetimes) === 1) {
                $reg_ticket_datetime = reset($reg_ticket_datetimes);
                $DTT_ID              = $reg_ticket_datetime instanceof EE_Datetime ? $reg_ticket_datetime->ID() : 0;
            }
        }

        if (! $DTT_ID) {
            $this->datetimes_for_current_row = DatetimesForEventCheckIn::fromRegistration($registration);
            $datetime                        = $this->datetimes_for_current_row->getOneDatetimeForEvent($DTT_ID);
            $DTT_ID                          = $datetime instanceof EE_Datetime ? $datetime->ID() : 0;
        }

        $checkin_status_dashicon = CheckinStatusDashicon::fromRegistrationAndDatetimeId(
            $registration,
            $DTT_ID
        );

        $aria_label     = $checkin_status_dashicon->ariaLabel();
        $dashicon_class = $checkin_status_dashicon->cssClasses();
        $attributes     = ' onClick="return false"';
        $button_class   = 'button button--secondary button--icon-only ee-aria-tooltip ee-aria-tooltip--big-box';

        if ($DTT_ID && $this->caps_handler->userCanEditRegistrationCheckin($registration)) {
            // overwrite the disabled attribute with data attributes for performing checkin
            $attributes   = 'data-_regid="' . $registration->ID() . '"';
            $attributes   .= ' data-dttid="' . $DTT_ID . '"';
            $attributes   .= ' data-nonce="' . wp_create_nonce('checkin_nonce') . '"';
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
        $status        = esc_attr($registration->status_ID());
        $name_link    .= $this->caps_handler->userCanEditContacts()
            ? '
            <a class="ee-aria-tooltip ee-status-color--' . $status . '"
               href="' . $edit_lnk_url . '"
               aria-label="' . esc_attr__('View Registration Details', 'event_espresso') . '"
            >
                ' . $registration->attendee()->full_name() . '
            </a>'
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
        $name_link .= $this->caps_handler->userCanReadRegistration($registration)
            ? '<a class="ee-aria-tooltip" href="' . $link . '" aria-label="' . esc_attr__(
                'View Registration Details',
                'event_espresso'
            ) . '">'
              . $registration->reg_code()
              . '</a>'
            : $registration->reg_code();

        $actions = [];
        if ($this->datetime_id && $this->caps_handler->userCanReadRegistrationCheckins()) {
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
            ? $name_link . $this->row_actions($actions, true)
            : $name_link;
        return $this->columnContent('ATT_name', $content);
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
            $content          = $this->caps_handler->userCanReadRegistrationCheckins()
                ? '<a class="ee-aria-tooltip" href="' . $checkin_link_url . '" aria-label="'
                . esc_attr__(
                    'View Check-ins for this Event',
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
        return $this->column_REG_ticket($registration);
    }
}
