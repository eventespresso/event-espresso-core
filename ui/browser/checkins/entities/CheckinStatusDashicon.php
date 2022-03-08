<?php

namespace EventEspresso\ui\browser\checkins\entities;

use EE_Checkin;
use EE_Datetime;
use EE_Error;
use EE_Registration;
use ReflectionException;

/**
 * Class CheckinStatusDashicon
 * Description
 *
 * @package EventEspresso\ui\browser\checkins\entities
 * @author  Brent Christensen
 */
class CheckinStatusDashicon
{
    /**
     * @var int $checkin_status
     */
    private $checkin_status;


    /**
     * CheckinStatusDashicon constructor.
     *
     * @param int $checkin_status
     */
    public function __construct(int $checkin_status = EE_Checkin::status_checked_never)
    {
        $this->checkin_status = $checkin_status;
    }


    /**
     * @return int
     */
    public function checkinStatus(): int
    {
        return $this->checkin_status;
    }


    /**
     * @param EE_Checkin $checkin
     * @return CheckinStatusDashicon
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function fromCheckin(EE_Checkin $checkin): CheckinStatusDashicon
    {
        return new CheckinStatusDashicon(
            $checkin->status()
                ? EE_Checkin::status_checked_in
                : EE_Checkin::status_checked_out
        );
    }


    /**
     * @param EE_Registration $registration
     * @param EE_Datetime     $datetime
     * @return CheckinStatusDashicon
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function fromRegistrationAndDatetime(EE_Registration $registration, EE_Datetime $datetime): CheckinStatusDashicon
    {
        return new CheckinStatusDashicon(
            $registration->check_in_status_for_datetime(
                $datetime->ID()
            )
        );
    }


    /**
     * @param EE_Registration $registration
     * @param int             $DTT_ID
     * @return CheckinStatusDashicon
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function fromRegistrationAndDatetimeId(EE_Registration $registration, int $DTT_ID = 0): CheckinStatusDashicon
    {
        return new CheckinStatusDashicon(
            $registration->check_in_status_for_datetime(
                absint($DTT_ID)
            )
        );
    }

    /**
     * Will return the correct set of dashicon css classes for the set checkin status
     *
     * @return string
     */
    public function cssClasses(): string
    {
        switch ($this->checkin_status) {
            case EE_Checkin::status_checked_in:
                return "dashicons dashicons-yes-alt checkin-icons checkedin-status-{$this->checkin_status}";
            case EE_Checkin::status_checked_out:
                return "dashicons dashicons-marker checkin-icons checkedin-status-{$this->checkin_status}";
            case EE_Checkin::status_checked_never:
                return "dashicons dashicons-no checkin-icons checkedin-status-{$this->checkin_status}";
            default:
                return 'dashicons dashicons-warning ee-status--warning';
        }
    }

    /**
     * returns a description for the Checkin Status Dashicon that can be used in List Table Legends
     *
     * @return string
     */
    public function legendLabel(): string
    {
        switch ($this->checkin_status) {
            case EE_Checkin::status_checked_in:
                return esc_html__('This Registrant has been Checked In', 'event_espresso');
            case EE_Checkin::status_checked_out:
                return esc_html__('This Registrant has been Checked Out', 'event_espresso');
            case EE_Checkin::status_checked_never:
                return esc_html__('No Check-in Record has been Created for this Registrant', 'event_espresso');
            default:
                return esc_html__('Can not perform Registrant Check-in.', 'event_espresso');
        }
    }

    /**
     * returns a description for the Checkin Status Dashicon that can be used as a button aria label
     *
     * @return string
     */
    public function ariaLabel(): string
    {
        switch ($this->checkin_status) {
            case EE_Checkin::status_checked_in:
                return esc_html__('click to change status to Checked Out', 'event_espresso');
            case EE_Checkin::status_checked_out:
            case EE_Checkin::status_checked_never:
                return esc_html__('click to change status to Checked In', 'event_espresso');
            default:
                return esc_html__(
                    'Can not perform Registrant Check-in because there are either no event dates currently active for this ticket option (event has not yet started) or there are multiple dates to choose from. Please use the filters above to select a single, currently active event date in order to perform check-ins.',
                    'event_espresso'
                );
        }
    }
}
