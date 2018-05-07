<?php

namespace EventEspresso\ui\browser\checkins\entities;

use EE_Checkin;
use EE_Datetime;
use EE_Error;
use EE_Registration;

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
    public function __construct($checkin_status = EE_Checkin::status_checked_never)
    {
        $this->checkin_status = $checkin_status;
    }


    /**
     * @param EE_Checkin $checkin
     * @return CheckinStatusDashicon
     * @throws EE_Error
     */
    public static function fromCheckin(EE_Checkin $checkin)
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
     */
    public static function fromRegistrationAndDatetime(EE_Registration $registration, EE_Datetime $datetime)
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
     */
    public static function fromRegistrationAndDatetimeId(EE_Registration $registration, $DTT_ID = 0)
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
    public function cssClasses()
    {
        if ($this->checkin_status === EE_Checkin::status_checked_in) {
            return "ee-dashicons ee-icon-check-in checkin-icons checkedin-status-{$this->checkin_status}";
        }
        if ($this->checkin_status === EE_Checkin::status_checked_out) {
            return "ee-dashicons ee-icon-check-out checkin-icons checkedin-status-{$this->checkin_status}";
        }
        return "dashicons dashicons-no checkin-icons checkedin-status-{$this->checkin_status}";
    }

    /**
     * returns a description for the Checkin Status Dashicon that can be used in List Table Legends
     *
     * @return string
     */
    public function legendLabel()
    {
        if ($this->checkin_status === EE_Checkin::status_checked_in) {
            return esc_html__('This Registrant has been Checked In', 'event_espresso');
        }
        if ($this->checkin_status === EE_Checkin::status_checked_out) {
            return esc_html__('This Registrant has been Checked Out', 'event_espresso');
        }
        return esc_html__('No Check-in Record has been Created for this Registrant', 'event_espresso');
    }
}
