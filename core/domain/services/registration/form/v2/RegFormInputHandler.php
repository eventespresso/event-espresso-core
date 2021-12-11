<?php

namespace EventEspresso\core\domain\services\registration\form\v2;

use EE_Answer;
use EE_Error;
use EE_Registration;
use EEM_Attendee;
use EventEspresso\core\domain\services\registration\form\SystemInputFieldNamesInterface;
use EventEspresso\core\domain\services\registration\form\v1\RegFormInputHandler as RegFormInputHandlerV1;
use EventEspresso\core\domain\services\registration\form\base\RegistrantData;

// use EventEspresso\core\domain\services\registration\form\v1\SystemInputFieldNames;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use InvalidArgumentException;
use ReflectionException;

class RegFormInputHandler extends RegFormInputHandlerV1
{

    // /**
    //  * @var array
    //  */
    // protected $non_persistable_fields = [SystemInputFieldNamesInterface::EMAIL_CONFIRM];

    // /**
    //  * @var EEM_Attendee
    //  */
    // private $attendee_model;
    //
    // /**
    //  * @var string
    //  */
    // private $checkout_reg_url_link;

    // /**
    //  * @var RegistrantData
    //  */
    // private $registrant_data;
    //
    // /**
    //  * @var array
    //  */
    // private $required_questions;


    /**
     * RegFormHandler constructor.
     */
    public function __construct(
        string $checkout_reg_url_link,
        array $required_questions,
        EEM_Attendee $attendee_model,
        RegistrantData $registrant_data,
        SystemInputFieldNames $system_input_field_names
    ) {
        parent::__construct(
            $checkout_reg_url_link,
            $required_questions,
            $attendee_model,
            $registrant_data,
            $system_input_field_names
        );
    }


    // /**
    //  * @param EE_Registration  $registration
    //  * @param string           $reg_url_link
    //  * @param int|string       $form_input
    //  * @param float|int|string $input_value
    //  * @return bool
    //  * @throws EE_Error
    //  * @throws ReflectionException
    //  */
    // public function processFormInput(
    //     EE_Registration $registration,
    //     string $reg_url_link,
    //     $form_input,
    //     $input_value
    // ): bool {
    //     // check for critical inputs
    //     if (! $this->verifyCriticalAttendeeDetailsAreSetAndValidateEmail($form_input, $input_value)) {
    //         return false;
    //     }
    //     $input_value = $this->registrant_data->saveOrCopyPrimaryRegistrantData(
    //         $reg_url_link,
    //         $form_input,
    //         $input_value
    //     );
    //     if (! $this->saveRegistrationFormInput($registration, $reg_url_link, $form_input, $input_value)) {
    //         EE_Error::add_error(
    //             sprintf(
    //                 esc_html_x(
    //                     'Unable to save registration form data for the form input: "%1$s" with the submitted value: "%2$s"',
    //                     'Unable to save registration form data for the form input: "form input name" with the submitted value: "form input value"',
    //                     'event_espresso'
    //                 ),
    //                 $form_input,
    //                 $input_value
    //             ),
    //             __FILE__,
    //             __FUNCTION__,
    //             __LINE__
    //         );
    //         return false;
    //     }
    //     return true;
    // }


    /**
     * @param EE_Registration  $registration
     * @param string           $reg_url_link
     * @param int|string       $field
     * @param float|int|string $value
     * @return bool
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    protected function saveRegistrationFormInput(
        EE_Registration $registration,
        string $reg_url_link,
        $field = '',
        $value = ''
    ): bool {
        // echo '<br />';
        \EEH_Debug_Tools::printr(__FUNCTION__, __CLASS__, __FILE__, __LINE__, 1);
        \EEH_Debug_Tools::printr($field, '$field', '', __LINE__);
        \EEH_Debug_Tools::printr($value, '$value', '', __LINE__);
        // echo '<br />';
        if ($this->bypassSaveRegFormInputValue($registration, $field, $value)) {
            echo '<br />@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@<br />';
            return true;
        }
        /*
         * $answer_cache_id is the key used to find the EE_Answer we want
         * @see https://events.codebasehq.com/projects/event-espresso/tickets/10477
         */
        $answer_cache_id = $this->checkout_reg_url_link
            ? $field . '-' . $reg_url_link
            : $field;
        \EEH_Debug_Tools::printr($answer_cache_id, '$answer_cache_id', __FILE__, __LINE__);

        $registrant_answer = $this->registrant_data->getRegistrantAnswer($reg_url_link, $answer_cache_id);
        \EEH_Debug_Tools::printr($registrant_answer, '$registrant_answer', __FILE__, __LINE__);
        // $answer_is_obj     = $registrant_answer instanceof EE_Answer;
        // \EEH_Debug_Tools::printr($answer_is_obj, '$answer_is_obj', __FILE__, __LINE__);
        // if this form input has a corresponding attendee property
        if ($this->isAttendeeProperty($field)) {
            // rename form_inputs if they are EE_Attendee properties
            $field = $this->renameFormInput($field);
            \EEH_Debug_Tools::printr($field, '$field', __FILE__, __LINE__);
            $this->registrant_data->addRegistrantDataValue($reg_url_link, $field, $value);
            // if ($answer_is_obj) {
            //     // and delete the corresponding answer since we won't be storing this data in that object
            //     $registration->_remove_relation_to($registrant_answer, 'Answer');
            //     $registrant_answer->delete_permanently();
            // }
            return true;
        }
        // if ($answer_is_obj) {
        //     // save this data to the answer object
        //     $registrant_answer->set_value($value);
        //     $result = $registrant_answer->save();
        //     return $result !== false;
        // }
        // foreach ($this->registrant_data->registrantAnswers($reg_url_link) as $answer) {
        //     if ($answer instanceof EE_Answer && $answer->question_ID() === $answer_cache_id) {
        //         $answer->set_value($value);
        //         $result = $answer->save();
        //         return $result !== false;
        //     }
        // }
        echo '<br />*********************************************************<br />';
        return false;
    }


    // /**
    //  * @param EE_Registration $registration
    //  * @param string          $form_input
    //  * @param mixed           $input_value
    //  * @return bool
    //  */
    // private function bypassSaveRegFormInputValue(EE_Registration $registration, string $form_input, $input_value): bool
    // {
    //     // If email_confirm is sent it's not saved
    //     if ($form_input === 'email_confirm') {
    //         return true;
    //     }
    //     // allow for plugins to hook in and do their own processing of the form input.
    //     // For plugins to bypass normal processing here, they just need to return a truthy value.
    //     // NOTE: this hook does the opposite of what its name implies...
    //     // ie: returning true does NOT save the input here, meaning it needs to be saved externally.
    //     // This should have been named something like  "bypass_save_registration_form_input"
    //     return filter_var(
    //         apply_filters(
    //             'FHEE__EE_SPCO_Reg_Step_Attendee_Information___save_registration_form_input',
    //             false,
    //             $registration,
    //             $form_input,
    //             $input_value,
    //             $this
    //         ),
    //         FILTER_VALIDATE_BOOLEAN
    //     );
    // }


    /**
     * @param string $field
     * @return bool
     */
    private function isAttendeeProperty(string $field): bool
    {
        // $this->reg_form_input_factory
        switch ($field) {
            case 'state':
            case 'STA_ID':
            case 'country':
            case 'CNT_ISO':
                return true;
            default:
                return $this->attendee_model->has_field("ATT_$field");
        }
    }


    // /**
    //  * @param string $field
    //  * @return string
    //  */
    // private function renameFormInput(string $field): string
    // {
    //     switch ($field) {
    //         case 'state':
    //         case 'STA_ID':
    //             return 'STA_ID';
    //
    //         case 'country':
    //         case 'CNT_ISO':
    //             return 'CNT_ISO';
    //
    //         default:
    //             return "ATT_$field";
    //     }
    // }


    /**
     * @param int|string       $field
     * @param float|int|string $value
     * @return boolean
     */
    private function verifyCriticalAttendeeDetailsAreSetAndValidateEmail(
        $field = '',
        $value = ''
    ): bool {
        if (empty($value)) {
            // if the form input isn't marked as being required, then just return
            if (! isset($this->required_questions[ $field ]) || ! $this->required_questions[ $field ]) {
                return true;
            }
            switch ($field) {
                case $this->system_input_field_names->getInputName(SystemInputFieldNamesInterface::FIRST_NAME):
                    EE_Error::add_error(
                        esc_html__('First Name is a required value.', 'event_espresso'),
                        __FILE__,
                        __FUNCTION__,
                        __LINE__
                    );
                    return false;
                case $this->system_input_field_names->getInputName(SystemInputFieldNamesInterface::LAST_NAME):
                    EE_Error::add_error(
                        esc_html__('Last Name is a required value.', 'event_espresso'),
                        __FILE__,
                        __FUNCTION__,
                        __LINE__
                    );
                    return false;
                case $this->system_input_field_names->getInputName(SystemInputFieldNamesInterface::EMAIL):
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
