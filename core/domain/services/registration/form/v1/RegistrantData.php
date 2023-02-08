<?php

namespace EventEspresso\core\domain\services\registration\form\v1;

use EE_Answer;
use EE_Attendee;
use EE_Error;
use EE_Registration;
use ReflectionException;

/**
 * Class RegistrantData
 * DTO for tracking and sharing data during the registration process
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\domain\services\registration\form\v1
 * @since   $VID:$
 */
class RegistrantData
{
    /**
     * @var int
     */
    private $attendee_counter = 0;

    /**
     * @var array
     */
    private $registrant_data = [];

    /**
     * @var bool
     */
    private $copy_primary = false;

    /**
     * @var array
     */
    private $required_questions = [];

    /**
     * @var EE_Registration[]
     */
    private $registrations = [];

    /**
     * @var EE_Answer[][]
     */
    private $registrant_answers = [];

    /**
     * array for tracking reg form data for the primary registrant
     *
     * @var array
     */
    private $primary_registrant_data;

    /**
     * the attendee object created for the primary registrant
     *
     * @var EE_Attendee
     */
    private $primary_registrant;


    /**
     * RegistrantData constructor.
     */
    public function __construct()
    {
        $this->primary_registrant_data = ['line_item_id' => null,];
    }


    /**
     * @param EE_Registration $registration
     * @throws EE_Error
     * @return void
     */
    public function initializeRegistrantData($registration)
    {
        $reg_url_link = $registration->reg_url_link();
        $this->registrations[ $reg_url_link ] = $registration;
        $this->registrant_answers[ $reg_url_link ] = $registration->answers();
        $this->registrant_data[ $reg_url_link ] = [];
        $this->attendee_counter++;
    }


    /**
     * @return int
     */
    public function attendeeCount()
    {
        return $this->attendee_counter;
    }


    /**
     * @return bool
     */
    public function copyPrimary()
    {
        return $this->copy_primary;
    }


    /**
     * @param bool $copy_primary
     * @return void
     */
    public function setCopyPrimary($copy_primary)
    {
        $this->copy_primary = filter_var($copy_primary, FILTER_VALIDATE_BOOLEAN);
    }


    /**
     * @param string $reg_url_link
     * @return array|null
     */
    public function getRegistrant($reg_url_link)
    {
        return isset($this->registrations[ $reg_url_link ]) ? $this->registrations[ $reg_url_link ] : null;
    }


    /**
     * @param string $reg_url_link
     * @return array|null
     */
    public function getRegistrantData($reg_url_link)
    {
        return isset($this->registrant_data[ $reg_url_link ]) ? $this->registrant_data[ $reg_url_link ] : null;
    }


    /**
     * @param string $reg_url_link
     * @param string $key
     * @param mixed $value
     * @return void
     */
    public function addRegistrantDataValue($reg_url_link, $key, $value)
    {
        $this->registrant_data[ $reg_url_link ][ $key ] = $value;
    }


    /**
     * ensures that all attendees at least have data for first name, last name, and email address
     *
     * @param string $reg_url_link
     * @throws EE_Error
     * @throws ReflectionException
     * @return void
     */
    public function ensureCriticalRegistrantDataIsSet($reg_url_link)
    {
        if ($this->currentRegistrantIsPrimary()) {
            return;
        }
        // bare minimum critical details include first name, last name, email address
        $critical_attendee_details = ['ATT_fname', 'ATT_lname', 'ATT_email'];
        // add address info to critical details?
        if (
            apply_filters(
                'FHEE__EventEspresso_core_domain_services_registration_form_v1_RegistrantData__ensureCriticalRegistrantDataIsSet',
                false
            )
        ) {
            $critical_attendee_details += [
                'ATT_address',
                'ATT_address2',
                'ATT_city',
                'STA_ID',
                'CNT_ISO',
                'ATT_zip',
                'ATT_phone',
            ];
        }
        foreach ($critical_attendee_details as $critical_attendee_detail) {
            if (
                ! isset($this->registrant_data[ $reg_url_link ][ $critical_attendee_detail ])
                || empty($this->registrant_data[ $reg_url_link ][ $critical_attendee_detail ])
            ) {
                $this->registrant_data[ $reg_url_link ][ $critical_attendee_detail ] = $this->primary_registrant->get(
                    $critical_attendee_detail
                );
            }
        }
    }


    /**
     * @param string $reg_url_link
     * @param array $registrant_data
     * @return void
     */
    public function setRegistrantData($reg_url_link, $registrant_data)
    {
        $this->registrant_data[ $reg_url_link ] = $registrant_data;
    }


    /**
     * @return array
     */
    public function getRequiredQuestions()
    {
        return $this->required_questions;
    }


    /**
     * @param string $identifier
     * @param string $required_question
     * @return void
     */
    public function addRequiredQuestion($identifier, $required_question)
    {
        $this->required_questions[ $identifier ] = $required_question;
    }


    /**
     * @return EE_Answer[]
     * @param string $reg_url_link
     */
    public function registrantAnswers($reg_url_link)
    {
        return isset($this->registrant_answers[ $reg_url_link ]) ? $this->registrant_answers[ $reg_url_link ] : [];
    }


    /**
     * @param string $reg_url_link
     * @param string $identifier  the answer cache ID
     * @param EE_Answer $answer
     * @return void
     */
    public function addRegistrantAnswer($reg_url_link, $identifier, $answer)
    {
        $this->registrant_answers[ $reg_url_link ][ $identifier ] = $answer;
    }


    /**
     * @param string $reg_url_link
     * @param string $identifier
     * @return EE_Answer|null
     */
    public function getRegistrantAnswer($reg_url_link, $identifier)
    {
        return isset($this->registrant_answers[ $reg_url_link ][ $identifier ]) ? $this->registrant_answers[ $reg_url_link ][ $identifier ] : null;
    }



    /**
     * @param string $reg_url_link
     * @param string $identifier
     * @return bool
     */
    public function registrantAnswerIsObject($reg_url_link, $identifier)
    {
        $registrant_answer = $this->getRegistrantAnswer($reg_url_link, $identifier);
        return $registrant_answer instanceof EE_Answer;
    }


    /**
     * @return array
     */
    public function primaryRegistrantData()
    {
        return $this->primary_registrant_data;
    }


    /**
     * @param string $key
     * @param mixed  $value
     * @return void
     */
    public function addPrimaryRegistrantDataValue($key, $value)
    {
        $this->primary_registrant_data[ $key ] = $value;
    }


    /**
     * @param string $key
     * @return mixed
     */
    public function getPrimaryRegistrantDataValue($key)
    {
        return isset($this->primary_registrant_data[ $key ]) ? $this->primary_registrant_data[ $key ] : null;
    }


    /**
     * @param array $primary_registrant_data
     * @return void
     */
    public function setPrimaryRegistrantData($primary_registrant_data)
    {
        $this->primary_registrant_data = $primary_registrant_data;
    }


    /**
     * @return EE_Attendee
     */
    public function primaryRegistrant()
    {
        return $this->primary_registrant;
    }


    /**
     * @return bool
     */
    public function primaryRegistrantIsValid()
    {
        return $this->primary_registrant instanceof EE_Attendee;
    }


    /**
     * @param EE_Attendee $primary_registrant
     * @return void
     */
    public function setPrimaryRegistrant($primary_registrant)
    {
        $this->primary_registrant = $primary_registrant;
    }


    /**
     * @param string $reg_url_link
     * @return bool
     */
    public function currentRegistrantIsPrimary($reg_url_link = '')
    {
        return $this->attendeeCount() === 1
            || (
                $this->attendeeCount() === 1
                && $reg_url_link !== ''
                && $this->getPrimaryRegistrantDataValue('reg_url_link') === $reg_url_link
            );
    }


    /**
     * @return bool
     */
    public function currentRegistrantIsNotPrimary()
    {
        return $this->attendeeCount() > 1;
    }


    /**
     * @param string $reg_url_link
     * @param string $form_input
     * @param mixed  $input_value
     * @return mixed|null
     */
    public function saveOrCopyPrimaryRegistrantData($reg_url_link, $form_input, $input_value)
    {
        // store a bit of data about the primary attendee
        if (! empty($input_value) && $this->currentRegistrantIsPrimary($reg_url_link)) {
            $this->primary_registrant_data[ $form_input ] = $input_value;
            return $input_value;
        }
        // or copy value from primary if incoming value is not set
        if ($input_value === null && $this->copyPrimary()) {
            $input_value = $this->getPrimaryRegistrantDataValue($form_input);
        }
        return $input_value;
    }
}
