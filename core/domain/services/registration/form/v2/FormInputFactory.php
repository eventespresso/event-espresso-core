<?php

namespace EventEspresso\core\domain\services\registration\form\v2;

use EE_Checkbox_Multi_Input;
use EE_Country_Select_Input;
use EE_Datepicker_Input;
use EE_Email_Confirm_Input;
use EE_Email_Input;
use EE_Error;
use EE_Float_Input;
use EE_Form_Element;
use EE_Form_Input_Base;
use EE_Integer_Input;
use EE_Radio_Button_Input;
use EE_Registration;
use EE_Select_Input;
use EE_Select_Multiple_Input;
use EE_State_Select_Input;
use EE_Text_Area_Input;
use EE_Text_Input;
use EE_Year_Input;
use EventEspresso\core\services\form\meta\FormLabel;
use EventEspresso\core\services\form\meta\InputOptions;
use EventEspresso\core\services\form\meta\inputs\DateTime;
use EventEspresso\core\services\form\meta\inputs\Input;
use EventEspresso\core\services\form\meta\inputs\Number;
use EventEspresso\core\services\form\meta\inputs\Phone;
use EventEspresso\core\services\form\meta\inputs\Select;
use EventEspresso\core\services\form\meta\inputs\Text;
use EventEspresso\core\services\form\meta\Required;
use ReflectionException;
use stdClass;

class FormInputFactory
{
    /**
     * @var stdClass
     */
    private $config;

    /**
     * @var FormInputValidationStrategies
     */
    public $validation_strategies;


    /**
     * FormInputFactory constructor.
     *
     * @param FormInputValidationStrategies $validation_strategies
     */
    public function __construct(FormInputValidationStrategies $validation_strategies)
    {
        $this->validation_strategies           = $validation_strategies;
        $this->config                          = new stdClass();
        $days                                  = range(1, 31);
        $months                                = range(1, 12);
        $this->config->days                    = array_combine($days, $days);
        $this->config->months                  = array_combine($months, $months);
        $this->config->year_input              = new stdClass();
        $this->config->year_input->four_digit  = (bool) apply_filters(
            'FHEE__EE_SPCO_Reg_Step_Attendee_Information___generate_question_input__year_question__four_digit',
            true,
            $this
        );
        $this->config->year_input->early_range = (int) apply_filters(
            'FHEE__EE_SPCO_Reg_Step_Attendee_Information___generate_question_input__year_question__early_range',
            100,
            $this
        );
        $this->config->year_input->end_range   = (int) apply_filters(
            'FHEE__EE_SPCO_Reg_Step_Attendee_Information___generate_question_input__year_question__end_range',
            100,
            $this
        );
    }


    /**
     * @param EE_Registration  $registration
     * @param EE_Form_Element  $form_input
     * @param int|float|string $answer
     * @return EE_Form_Input_Base|null
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function create(
        EE_Registration $registration,
        EE_Form_Element $form_input,
        $answer
    ): ?EE_Form_Input_Base {
        $input_args = (array) apply_filters(
            'FHEE__EE_SPCO_Reg_Step_Attendee_Information___generate_question_input__input_constructor_args',
            $this->generateInputArgs($registration, $form_input, $answer),
            $registration,
            $this,
            $answer
        );
        return $this->getInput($form_input, $input_args);
    }


    /**
     * @param EE_Registration  $registration
     * @param EE_Form_Element  $form_input
     * @param int|float|string $answer
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function generateInputArgs(EE_Registration $registration, EE_Form_Element $form_input, $answer): array
    {
        $identifier = $form_input->slug();
        $reg_id     = $registration->ID();
        $label      = $form_input->label();
        $required   = $form_input->required();
        // group_name
        $input_args = [
            'default'                           => $answer,
            'html_name'                         => "ee_reg_qstn[$reg_id][$identifier]",
            'html_id'                           => "ee_reg_qstn-$reg_id-$identifier",
            'html_class'                        => "ee-reg-qstn ee-reg-qstn-$identifier",
            'html_label_id'                     => "ee_reg_qstn-$reg_id-$identifier-lbl",
            'html_label_class'                  => 'ee-reg-qstn',
            'html_label_text'                   => $label instanceof FormLabel ? $label->publicLabel() : '',
            'required'                          => $required instanceof Required ? $required->isRequired() : false,
            'required_validation_error_message' => $required instanceof Required ? $required->validationText() : '',
        ];
        return $this->validation_strategies->applyValidationStrategies($form_input, $input_args);
    }


    /**
     * @param EE_Form_Element $form_input
     * @param array           $input_args
     * @return EE_Form_Input_Base|null
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function getInput(EE_Form_Element $form_input, array $input_args): ?EE_Form_Input_Base
    {
        $input_options = $form_input->options();
        $options       = $input_options instanceof InputOptions ? $input_options->options() : [];
        switch ($form_input->type()) {

            // date type inputs
            case DateTime::TYPE_DATE:
                return new EE_Datepicker_Input($input_args);

            case DateTime::TYPE_DATETIME_LOCAL:
                $input_args['type'] = 'datetime-local';
                return new EE_Text_Input($input_args);

            case DateTime::TYPE_MONTH:
                $input_args['type'] = 'month';
                return new EE_Text_Input($input_args);

            case DateTime::TYPE_TIME:
                $input_args['type'] = 'time';
                return new EE_Text_Input($input_args);

            case DateTime::TYPE_WEEK:
                $input_args['type'] = 'week';
                return new EE_Text_Input($input_args);

            case DateTime::TYPE_SELECT_DAY:
                return new EE_Select_Input($this->config->days, $input_args);

            case DateTime::TYPE_SELECT_MONTH:
                return new EE_Select_Input($this->config->months, $input_args);

            case DateTime::TYPE_SELECT_YEAR:
                return new EE_Year_Input(
                    $input_args,
                    $this->config->year_input->four_digit,
                    $this->config->year_input->early_range,
                    $this->config->year_input->end_range
                );

            // input type inputs (???)
            case Input::TYPE_CHECKBOX:
                return new EE_Checkbox_Multi_Input($options, $input_args);

            case Input::TYPE_COLOR:
                $input_args['type'] = 'color';
                return new EE_Text_Input($input_args);

            case Input::TYPE_FILE:
                $input_args['type'] = 'file';
                return new EE_Text_Input($input_args);

            case Input::TYPE_HIDDEN:
                $input_args['type'] = 'hidden';
                return new EE_Text_Input($input_args);

            case Input::TYPE_IMAGE:
                $input_args['type'] = 'image';
                return new EE_Text_Input($input_args);

            case Input::TYPE_PASSWORD:
                $input_args['type'] = 'password';
                return new EE_Text_Input($input_args);

            case Input::TYPE_URL:
                $input_args['type'] = 'url';
                return new EE_Text_Input($input_args);

            case Input::TYPE_RADIO:
                return new EE_Radio_Button_Input($options, $input_args);

            // numeric type inputs
            case Number::TYPE_FLOAT:
                return new EE_Float_Input($input_args);

            case Number::TYPE_INT:
                return new EE_Integer_Input($input_args);

            case Number::TYPE_RANGE:
                $input_args['type'] = 'range';
                return new EE_Text_Input($input_args);

            // phone type inputs
            case Phone::INPUT_TYPE:
                $input_args['type'] = 'tel';
                return new EE_Text_Input($input_args);
            // return new EE_Phone_Input($input_args);

            // select type inputs
            case Select::TYPE_SELECT:
                return new EE_Select_Input($options, $input_args);

            case Select::TYPE_SELECT_COUNTRY:
                return new EE_Country_Select_Input([], $input_args);

            case Select::TYPE_SELECT_STATE:
                return new EE_State_Select_Input([], $input_args);

            case Select::TYPE_SELECT_MULTI:
                return new EE_Select_Multiple_Input($options, $input_args);

            // text type inputs
            case Text::TYPE_TEXTAREA:
            case Text::TYPE_TEXTAREA_HTML:
                return new EE_Text_Area_Input($input_args);

            case Text::TYPE_EMAIL:
                return new EE_Email_Input($input_args);

            case Text::TYPE_EMAIL_CONFIRMATION:
                return new EE_Email_Confirm_Input($input_args);

            case Text::TYPE_TEXT:
            default:
                return new EE_Text_Input($input_args);
        }
    }
}
