<?php

namespace EventEspresso\ui\browser\checkins\entities;

use EE_Checkin;
use EE_Datetime;
use EE_Error;
use EE_Registration;

defined('EVENT_ESPRESSO_VERSION') || exit;


/**
 * Class CheckinStatusDashicon
 * Description
 *
 * @package EventEspresso\ui\browser\checkins\entities
 * @author  Brent Christensen
 * @since   $VID:$
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
}
// Location: ui/browser/checkins/entities/CheckinStatusDashicon.php
