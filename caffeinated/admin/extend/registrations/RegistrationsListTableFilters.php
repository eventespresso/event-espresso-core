<?php

namespace EventEspresso\caffeinated\admin\extend\registrations;

use EE_Capabilities;
use EE_Datetime;
use EE_Error;
use EE_Event;
use EEH_Form_Fields;
use EEM_Event;
use EventEspresso\core\domain\services\admin\registrations\DatetimesForEventCheckIn;
use EventEspresso\core\services\request\DataType;
use EventEspresso\core\services\request\RequestInterface;
use ReflectionException;

/**
 * RegistrationsListTableFilters
 *
 * @package     Event Espresso
 * @subpackage  EventEspresso\caffeinated\admin\extend\registrations
 * @author      Brent Christensen
 * @since       5.0.24.p
 */
class RegistrationsListTableFilters
{
    protected RequestInterface $request;

    /**
     * This property will hold the related Datetimes on an event IF the event ID is included in the request.
     */
    protected DatetimesForEventCheckIn $datetimes_for_event;

    protected ?EE_Datetime $datetime = null;

    protected ?EE_Event $event = null;

    /**
     * The DTT_ID if the current view has a specified datetime.
     */
    protected int $DTT_ID = 0;

    /**
     * The event ID if one is specified in the request
     */
    protected int $EVT_ID = 0;

    protected bool $hide_expired = false;

    protected bool $hide_upcoming = false;

    protected string $label = '';


    /**
     * @param RequestInterface $request
     */
    public function __construct(RequestInterface $request)
    {
        $this->request = $request;
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     * @since 5.0.0.p
     */
    public function resolveRequestVars()
    {
        $this->EVT_ID = $this->request->getRequestParam('EVT_ID', 0, DataType::INTEGER);
        $this->EVT_ID = $this->request->getRequestParam('event_id', $this->EVT_ID, DataType::INTEGER);
        $this->event  = EEM_Event::instance()->get_one_by_ID($this->EVT_ID);
        $this->datetimes_for_event = new DatetimesForEventCheckIn(EE_Capabilities::instance(), $this->event);
        // if we're filtering for a specific event and it only has one datetime, then grab its ID
        $this->datetime = $this->datetimes_for_event->getOneDatetimeForEvent();
        $this->DTT_ID = $this->datetime instanceof EE_Datetime ? $this->datetime->ID() : 0;
        // else check the request, but use the above as the default (and hope they match if BOTH exist, LOLZ)
        $this->DTT_ID        = $this->request->getRequestParam('DTT_ID', $this->DTT_ID, DataType::INTEGER);
        $this->DTT_ID        = $this->request->getRequestParam('datetime_id', $this->DTT_ID, DataType::INTEGER);
        $this->hide_expired  = $this->request->getRequestParam('hide_expired', false, DataType::BOOL);
        $this->hide_upcoming = $this->request->getRequestParam('hide_upcoming', false, DataType::BOOL);
    }


    public function datetime(): ?EE_Datetime
    {
        return $this->datetime;
    }


    public function datetimeID(): int
    {
        return $this->DTT_ID;
    }


    public function event(): ?EE_Event
    {
        return $this->event;
    }


    public function eventID(): int
    {
        return $this->EVT_ID;
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function addFiltersAfter(array $filters): array
    {
        return array_merge($filters, $this->getFilters());
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function addFiltersBefore(array $filters): array
    {
        return array_merge($this->getFilters(), $filters);
    }


    public function setLabel(string $label): void
    {
        $this->label = $label;
    }


    private function getLabel(): string
    {
        return $this->label
            ? '<label class="ee-event-filter-main-label">' . esc_html($this->label) . '</label>'
            : '';
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function getFilters(): array
    {
        $filters               = [];
        $hide_expired_checked  = $this->hide_expired ? 'checked' : '';
        $hide_upcoming_checked = $this->hide_upcoming ? 'checked' : '';
        // get datetimes for ALL active events (note possible capability restrictions)
        $events          = $this->datetimes_for_event->getAllEvents();
        $event_options[] = [
            'id'   => 0,
            'text' => esc_html__('Select an Event', 'event_espresso'),
        ];
        foreach ($events as $event) {
            // any registrations for this event?
            if (! $event instanceof EE_Event) {
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
            if ($event->ID() === $this->EVT_ID) {
                $this->hide_expired    = $expired_class === '' ? $this->hide_expired : false;
                $hide_expired_checked  = $expired_class === '' ? $hide_expired_checked : '';
                $this->hide_upcoming   = $upcoming_class === '' ? $this->hide_upcoming : false;
                $hide_upcoming_checked = $upcoming_class === '' ? $hide_upcoming_checked : '';
            }
        }

        $select_class = $this->hide_expired ? 'ee-hide-expired-events' : '';
        $select_class .= $this->hide_upcoming ? ' ee-hide-upcoming-events' : '';
        $select_input = EEH_Form_Fields::select_input(
            'EVT_ID',
            $event_options,
            $this->EVT_ID,
            '',
            $select_class
        );

        $filters[] = $this->getLabel() . '
        <div class="ee-event-filter">
            <span class="ee-event-selector">
                <label for="event_selector">' . esc_html__('Event', 'event_espresso') . '</label>
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
                $this->DTT_ID
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
                'Will not display events in the preceding event selector with start dates in the future (ie: have not yet begun)',
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
                'Will not display events in the preceding event selector with end dates in the past (ie: have already finished)',
                'event_espresso'
            )
            . '"
                ></span>
            </span>
        </div>';
        return $filters;
    }
}
