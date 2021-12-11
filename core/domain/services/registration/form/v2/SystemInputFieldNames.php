<?php

namespace EventEspresso\core\domain\services\registration\form\v2;

use EventEspresso\core\domain\services\registration\form\SystemInputFieldNamesInterface;

/**
 * Class SystemInputFieldNames
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\domain\services\registration\form\v1
 * @since   $VID:$
 */
class SystemInputFieldNames implements SystemInputFieldNamesInterface
{

    /**
     * ATTENDEE_FIELD_* constants are a 'balanced ternary' to simultaneously represent
     * whether the requested field is a property and whether or not it has been set:
     *
     *  ATTENDEE_FIELD_SET (1)      indicates that the field IS an attendee field AND has been set
     *  ATTENDEE_FIELD_NOT_SET (0)  indicates that the field IS an attendee field but has not yet been set
     *  ATTENDEE_FIELD_UNKNOWN (-1) indicates that the field is NOT a known attendee field
     */
    const ATTENDEE_FIELD_SET     = 1;

    const ATTENDEE_FIELD_NOT_SET = 0;

    const ATTENDEE_FIELD_UNKNOWN = -1;


    /**
     * @var array
     */
    private $attendee_fields = [
        'ATT_fname'     => null,
        'ATT_lname'     => null,
        'ATT_email'     => null,
        'email_confirm' => null,
        'ATT_address'   => null,
        'ATT_address2'  => null,
        'ATT_city'      => null,
        'STA_ID'        => null,
        'CNT_ISO'       => null,
        'ATT_zip'       => null,
        'ATT_phone'     => null,
    ];


    /**
     * @param string $field
     * @return string
     */
    public function getInputName(string $field): string
    {
        switch ($field) {
            case SystemInputFieldNamesInterface::FIRST_NAME && $this->attendeeFieldIsSet('ATT_fname'):
                return $this->attendee_fields['ATT_fname'];
            case SystemInputFieldNamesInterface::LAST_NAME && $this->attendeeFieldIsSet('ATT_lname'):
                return $this->attendee_fields['ATT_lname'];
            case SystemInputFieldNamesInterface::EMAIL && $this->attendeeFieldIsSet('ATT_email'):
                return $this->attendee_fields['ATT_email'];
            case SystemInputFieldNamesInterface::EMAIL_CONFIRM && $this->attendeeFieldIsSet('email_confirm'):
                return $this->attendee_fields['email_confirm'];
            case SystemInputFieldNamesInterface::ADDRESS && $this->attendeeFieldIsSet('ATT_address'):
                return $this->attendee_fields['ATT_address'];
            case SystemInputFieldNamesInterface::ADDRESS_2 && $this->attendeeFieldIsSet('ATT_address2'):
                return $this->attendee_fields['ATT_address2'];
            case SystemInputFieldNamesInterface::CITY && $this->attendeeFieldIsSet('ATT_city'):
                return $this->attendee_fields['ATT_city'];
            case SystemInputFieldNamesInterface::STATE && $this->attendeeFieldIsSet('STA_ID'):
                return $this->attendee_fields['STA_ID'];
            case SystemInputFieldNamesInterface::COUNTRY && $this->attendeeFieldIsSet('CNT_ISO'):
                return $this->attendee_fields['CNT_ISO'];
            case SystemInputFieldNamesInterface::POSTAL_CODE && $this->attendeeFieldIsSet('ATT_zip'):
                return $this->attendee_fields['ATT_zip'];
            case SystemInputFieldNamesInterface::PHONE && $this->attendeeFieldIsSet('ATT_phone'):
                return $this->attendee_fields['ATT_phone'];
        }
        return $field;
    }


    /**
     * uses a "balanced ternary" to simultaneously represent
     * whether the requested field is a property and whether or not it has been set:
     *
     *   1 indicates that the field IS an attendee field AND has been set
     *   0 indicates that the field IS an attendee field but has not yet been set
     *  -1 indicates that the field is NOT a known attendee field
     *
     * @param string $field
     * @return int
     */
    public function attendeeFieldIsSet(string $field): int
    {
        if (! array_key_exists($field, $this->attendee_fields)) {
            return self::ATTENDEE_FIELD_UNKNOWN;
        }
        return $this->attendee_fields[ $field ] !== null
            ? self::ATTENDEE_FIELD_SET
            : self::ATTENDEE_FIELD_NOT_SET;
    }


    /**
     * @param string $field
     * @param string $input_name
     * @return bool
     */
    public function setAttendeeField(string $field, string $input_name): bool
    {
        if ($this->attendeeFieldIsSet($field) === self::ATTENDEE_FIELD_NOT_SET) {
            $this->attendee_fields[ $field ] = $input_name;
            return true;
        }
        return false;
    }
}
