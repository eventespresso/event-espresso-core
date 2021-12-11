<?php

namespace EventEspresso\core\domain\services\registration\form\v2;

use EE_Error;
use EE_Form_Element;
use EE_Form_Input_Base;
use EE_Form_Section;
use EE_Registration;
use EEM_Answer;
use EventEspresso\core\services\form\meta\Required;
use EventEspresso\core\services\json\JsonDataAPI;
use ReflectionException;

class RegistrantFormInput
{

    /**
     * @var callable
     */
    protected $addRequiredQuestion;

    /**
     * @var JsonDataAPI
     */
    public $form_data_api;

    /**
     * @var FormInputFactory
     */
    public $form_input_factory;

    /**
     * @var   SystemInputFieldNames
     * @since $VID:$
     */
    protected $system_input_field_names;


    /**
     * @param callable              $addRequiredQuestion
     * @param JsonDataAPI           $form_data_api
     * @param SystemInputFieldNames $system_input_field_names
     */
    public function __construct(
        callable $addRequiredQuestion,
        JsonDataAPI $form_data_api,
        SystemInputFieldNames $system_input_field_names
    ) {
        $this->addRequiredQuestion      = $addRequiredQuestion;
        $this->form_data_api            = $form_data_api;
        $this->system_input_field_names = $system_input_field_names;
        $this->form_input_factory       = new FormInputFactory(
            new FormInputValidationStrategies(
                new FieldLengthCalculator()
            )
        );
    }


    /**
     * @param EE_Registration $registration
     * @param EE_Form_Section $form_section
     * @param EE_Form_Element $form_input
     * @return EE_Form_Input_Base
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function generateFormInput(
        EE_Registration $registration,
        EE_Form_Section $form_section,
        EE_Form_Element $form_input
    ): EE_Form_Input_Base {
        $callback    = $this->addRequiredQuestion;
        $required    = $form_input->required();
        $is_required = $required instanceof Required ? $required->isRequired() : false;
        $callback($form_input->slug(), $is_required);
        $answer = $this->getAnswer($registration, $form_section, $form_input);
        return $this->form_input_factory->create($registration, $form_input, $answer);
    }


    /**
     * @param EE_Registration $registration
     * @param EE_Form_Section $form_section
     * @param EE_Form_Element $form_input
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function getAnswer(
        EE_Registration $registration,
        EE_Form_Section $form_section,
        EE_Form_Element $form_input
    ): string {
        \EEH_Debug_Tools::printr(__FUNCTION__, __CLASS__, __FILE__, __LINE__, 2);
        // $input_name = $form_input->slug();
        $path = "{$registration->reg_url_link()}.{$form_section->slug()}.{$form_input->slug()}";
        \EEH_Debug_Tools::printr($path, '$path', __FILE__, __LINE__);
        $answer = $this->form_data_api->get($path);
        \EEH_Debug_Tools::printr($form_input->slug(), '$input_name', __FILE__, __LINE__);
        \EEH_Debug_Tools::printr($answer, '$answer', __FILE__, __LINE__);
        // \EEH_Debug_Tools::printr($this->form_data_api->jsonData(), '$this->form_data_api->jsonData()', __FILE__, __LINE__);
        // if ($this->isAttendeeProperty($form_input) && empty($answer)) {
        //     // if this question was for an attendee detail, then check for that answer
        //     $answer = EEM_Answer::instance()->get_attendee_property_answer_value(
        //         $registration,
        //         $this->system_input_field_names->getInputName($input_name)
        //     );
        // }
        // \EEH_Debug_Tools::printr($answer, '$answer', __FILE__, __LINE__);
        return $answer ?: '';
    }


    /**
     * @param EE_Form_Element $form_input
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function isAttendeeProperty(EE_Form_Element $form_input): bool
    {
        $maps_to = $form_input->mapsTo();
        if ($maps_to && strpos($maps_to, 'Attendee.') === 0) {
            $model_and_field = explode('.', $maps_to);
            $field           = array_pop($model_and_field);
            return $this->system_input_field_names->setAttendeeField($field, $form_input->slug());
        }
        return false;
    }
}
