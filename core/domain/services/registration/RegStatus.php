<?php

namespace EventEspresso\core\domain\services\registration;

use InvalidArgumentException;

/**
 * Class for managing the various registration statuses used throughout the system.
 *
 * @since 5.0.20.p
 */
class RegStatus
{
    /**
     * Status ID (STS_ID on esp_status table) to indicate an APPROVED registration.
     * the TXN may or may not be completed ( paid in full )
     * Payments are allowed.
     * A space IS reserved.
     * Registration is active
     */
    public const APPROVED = 'RAP';

    /**
     * Status ID (STS_ID on esp_status table) to indicate an UNAPPROVED registration.
     * Payments are NOT allowed.
     * Event Admin must manually toggle STS_ID for it to change
     * No space reserved.
     * Registration is active
     */
    public const AWAITING_REVIEW = 'RNA';

    /**
     * Status ID (STS_ID on esp_status table) to indicate a registration was CANCELLED by the attendee.
     * Payments are NOT allowed.
     * NO space reserved.
     * Registration is NOT active
     */
    public const CANCELLED = 'RCN';

    /**
     * Status ID (STS_ID on esp_status table) to indicate a registration was DECLINED by the Event Admin
     * Payments are NOT allowed.
     * No space reserved.
     * Registration is NOT active
     */
    public const DECLINED = 'RDC';

    /**
     * Status ID (STS_ID on esp_status table) to indicate an INCOMPLETE registration.
     * Initial status for registrations when they are first created
     * Payments are NOT allowed.
     * Automatically toggled to whatever the default Event registration status is upon completion of the attendee
     * information reg step NO space reserved. Registration is NOT active
     */
    public const INCOMPLETE = 'RIC';

    /**
     * Status ID (STS_ID on esp_status table) to indicate registration is PENDING_PAYMENT .
     * Payments are allowed.
     * STS_ID will automatically be toggled to RAP if payment is made in full by the attendee
     * No space reserved.
     * Registration is active
     */
    public const PENDING_PAYMENT = 'RPP';

    /**
     * Status ID (STS_ID on esp_status table) to indicate registration is on the WAIT_LIST .
     * Payments are allowed.
     * STS_ID will automatically be toggled to RAP if payment is made in full by the attendee
     * No space reserved.
     * Registration is active
     */
    public const WAIT_LIST = 'RWL';


    /**
     * returns an array of ALL Reg statuses for use in comparisons
     *
     * @return string[]
     */
    public static function validRegStatuses(): array
    {
        return [
            RegStatus::APPROVED,
            RegStatus::AWAITING_REVIEW,
            RegStatus::CANCELLED,
            RegStatus::DECLINED,
            RegStatus::INCOMPLETE,
            RegStatus::PENDING_PAYMENT,
            RegStatus::WAIT_LIST,
        ];
    }


    public static function isValidStatus(string $status, bool $throw_exception = true): bool
    {
        $valid = in_array($status, RegStatus::validRegStatuses(), true);
        if (! $valid && $throw_exception) {
            throw new InvalidArgumentException(
                sprintf(
                    esc_html__(
                        'Invalid registration status "%1$s" provided. Valid statuses are: %2$s',
                        'event_espresso'
                    ),
                    $status,
                    implode(', ', RegStatus::validRegStatuses())
                )
            );
        }
        return $valid;
    }
}
