<?php

namespace EventEspresso\core\domain\services\registration\form\v1;

use EEM_Attendee;
use EventEspresso\core\domain\services\registration\form\SystemInputFieldNamesInterface;

/**
 * Class SystemInputFieldNames
 * Adapter for translating legacy "system questions" field names used for populating EE_Attendee properties
 * to those used in the V1 reg form
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\domain\services\registration\form\v1
 * @since   $VID:$
 */
class SystemInputFieldNames implements SystemInputFieldNamesInterface
{

    /**
     * @param string $field
     * @return string
     */
    public function getInputName(string $field): string
    {
        switch ($field) {
            case SystemInputFieldNamesInterface::FIRST_NAME:
                return EEM_Attendee::system_question_fname;
            case SystemInputFieldNamesInterface::LAST_NAME:
                return EEM_Attendee::system_question_lname;
            case SystemInputFieldNamesInterface::EMAIL:
                return EEM_Attendee::system_question_email;
            case SystemInputFieldNamesInterface::EMAIL_CONFIRM:
                return EEM_Attendee::system_question_email_confirm;
            case SystemInputFieldNamesInterface::ADDRESS:
                return EEM_Attendee::system_question_address;
            case SystemInputFieldNamesInterface::ADDRESS_2:
                return EEM_Attendee::system_question_address2;
            case SystemInputFieldNamesInterface::CITY:
                return EEM_Attendee::system_question_city;
            case SystemInputFieldNamesInterface::STATE:
                return EEM_Attendee::system_question_state;
            case SystemInputFieldNamesInterface::COUNTRY:
                return EEM_Attendee::system_question_country;
            case SystemInputFieldNamesInterface::POSTAL_CODE:
                return EEM_Attendee::system_question_zip;
            case SystemInputFieldNamesInterface::PHONE:
                return EEM_Attendee::system_question_phone;
        }
        return $field;
    }
}
