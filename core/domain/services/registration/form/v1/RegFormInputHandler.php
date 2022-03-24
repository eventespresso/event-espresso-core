<?php

namespace EventEspresso\core\domain\services\registration\form\v1;

use EE_Answer;
use EE_Error;
use EE_Registration;
use EEM_Attendee;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use InvalidArgumentException;
use ReflectionException;

class RegFormInputHandler
{
    /**
     * @var EEM_Attendee
     */
    private $attendee_model;

    /**
     * @var string
     */
    private $checkout_reg_url_link;

    /**
     * @var RegistrantData
     */
    private $registrant_data;

    /**
     * @var array
     */
    private $required_questions;


    /**
     * RegFormHandler constructor.
     */
    public function __construct(
        string $checkout_reg_url_link,
        array $required_questions,
        EEM_Attendee $attendee_model,
        RegistrantData $registrant_data
    ) {
        $this->attendee_model        = $attendee_model;
        $this->checkout_reg_url_link = $checkout_reg_url_link;
        $this->registrant_data       = $registrant_data;
        $this->required_questions    = $required_questions;
    }


    /**
     * @param EE_Registration  $registration
     * @param string           $reg_url_link
     * @param int|string       $form_input
     * @param float|int|string $input_value
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function processFormInput(
        EE_Registration $registration,
        string $reg_url_link,
        $form_input,
        $input_value
    ): bool {
        // check for critical inputs
        if (! $this->verifyCriticalAttendeeDetailsAreSetAndValidateEmail($form_input, $input_value)) {
            return false;
        }
        $input_value = $this->registrant_data->saveOrCopyPrimaryRegistrantData(
            $reg_url_link,
            $form_input,
            $input_value
        );
        if (! $this->saveRegistrationFormInput($registration, $reg_url_link, $form_input, $input_value)) {
            EE_Error::add_error(
                sprintf(
                    esc_html_x(
                        'Unable to save registration form data for the form input: "%1$s" with the submitted value: "%2$s"',
                        'Unable to save registration form data for the form input: "form input name" with the submitted value: "form input value"',
                        'event_espresso'
                    ),
                    $form_input,
                    $input_value
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            return false;
        }
        return true;
    }


    /**
     * @param EE_Registration  $registration
     * @param string           $reg_url_link
     * @param int|string       $form_input
     * @param float|int|string $input_value
     * @return bool
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    private function saveRegistrationFormInput(
        EE_Registration $registration,
        string $reg_url_link,
        $form_input = '',
        $input_value = ''
    ): bool {
        // If email_confirm is sent it's not saved
        if ((string) $form_input === 'email_confirm') {
            return true;
        }
        // allow for plugins to hook in and do their own processing of the form input.
        // For plugins to bypass normal processing here, they just need to return a truthy value.
        if (
            apply_filters(
                'FHEE__EventEspresso_core_domain_services_registration_form_v1_RegFormInputHandler__saveRegistrationFormInput',
                false,
                $registration,
                $form_input,
                $input_value,
                $this
            )
        ) {
            return true;
        }
        /*
         * $answer_cache_id is the key used to find the EE_Answer we want
         * @see https://events.codebasehq.com/projects/event-espresso/tickets/10477
         */
        $answer_cache_id   = $this->checkout_reg_url_link
            ? $form_input . '-' . $reg_url_link
            : $form_input;
        $registrant_answer = $this->registrant_data->getRegistrantAnswer($reg_url_link, $answer_cache_id);
        $answer_is_obj     = $registrant_answer instanceof EE_Answer;
        // rename form_inputs if they are EE_Attendee properties
        switch ((string) $form_input) {
            case 'state':
            case 'STA_ID':
                $attendee_property = true;
                $form_input        = 'STA_ID';
                break;

            case 'country':
            case 'CNT_ISO':
                $attendee_property = true;
                $form_input        = 'CNT_ISO';
                break;

            default:
                $ATT_input         = 'ATT_' . $form_input;
                $attendee_property = $this->attendee_model->has_field($ATT_input);
                $form_input        = $attendee_property
                    ? 'ATT_' . $form_input
                    : $form_input;
        }

        // if this form input has a corresponding attendee property
        if ($attendee_property) {
            $this->registrant_data->addRegistrantDataValue($reg_url_link, $form_input, $input_value);
            if ($answer_is_obj) {
                // and delete the corresponding answer since we won't be storing this data in that object
                $registration->_remove_relation_to($registrant_answer, 'Answer');
                $registrant_answer->delete_permanently();
            }
            return true;
        }
        if ($answer_is_obj) {
            // save this data to the answer object
            $registrant_answer->set_value($input_value);
            $result = $registrant_answer->save();
            return $result !== false;
        }
        foreach ($this->registrant_data->registrantAnswers($reg_url_link) as $answer) {
            if ($answer instanceof EE_Answer && $answer->question_ID() === $answer_cache_id) {
                $answer->set_value($input_value);
                $result = $answer->save();
                return $result !== false;
            }
        }
        return false;
    }


    /**
     * @param int|string       $form_input
     * @param float|int|string $input_value
     * @return boolean
     */
    private function verifyCriticalAttendeeDetailsAreSetAndValidateEmail(
        $form_input = '',
        $input_value = ''
    ): bool {
        if (empty($input_value)) {
            // if the form input isn't marked as being required, then just return
            if (! isset($this->required_questions[ $form_input ]) || ! $this->required_questions[ $form_input ]) {
                return true;
            }
            switch ($form_input) {
                case 'fname':
                    EE_Error::add_error(
                        esc_html__('First Name is a required value.', 'event_espresso'),
                        __FILE__,
                        __FUNCTION__,
                        __LINE__
                    );
                    return false;
                case 'lname':
                    EE_Error::add_error(
                        esc_html__('Last Name is a required value.', 'event_espresso'),
                        __FILE__,
                        __FUNCTION__,
                        __LINE__
                    );
                    return false;
                case 'email':
                    EE_Error::add_error(
                        esc_html__('Please enter a valid email address.', 'event_espresso'),
                        __FILE__,
                        __FUNCTION__,
                        __LINE__
                    );
                    return false;
            }
        }
        return true;
    }
}
