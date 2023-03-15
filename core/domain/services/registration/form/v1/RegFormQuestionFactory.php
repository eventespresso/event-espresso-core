<?php

namespace EventEspresso\core\domain\services\registration\form\v1;

use EE_Answer;
use EE_Error;
use EE_Form_Input_Base;
use EE_Question;
use EE_Registration;
use EEM_Answer;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use InvalidArgumentException;
use ReflectionException;

class RegFormQuestionFactory
{
    /**
     * @var callable
     */
    protected $addRequiredQuestion;

    /**
     * @var EEM_Answer
     */
    public $answer_model;


    /**
     * @param callable   $addRequiredQuestion
     * @param EEM_Answer $answer_model
     */
    public function __construct(callable $addRequiredQuestion, EEM_Answer $answer_model)
    {
        $this->addRequiredQuestion = $addRequiredQuestion;
        $this->answer_model = $answer_model;
    }


    /**
     * @param EE_Registration $registration
     * @param EE_Question     $question
     * @return EE_Form_Input_Base
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function create(
        EE_Registration $registration,
        EE_Question $question
    ): EE_Form_Input_Base {
        // if this question was for an attendee detail, then check for that answer
        $answer_value = $this->answer_model->get_attendee_property_answer_value(
            $registration,
            $question->system_ID()
        );
        $answer       = $answer_value === null
            ? $this->answer_model->get_one(
                [['QST_ID' => $question->ID(), 'REG_ID' => $registration->ID()]]
            )
            : null;
        // if NOT returning to edit an existing registration
        // OR if this question is for an attendee property
        // OR we still don't have an EE_Answer object
        if ($answer_value || ! $answer instanceof EE_Answer || ! $registration->reg_url_link()) {
            // create an EE_Answer object for storing everything in
            $answer = EE_Answer::new_instance(
                [
                    'QST_ID' => $question->ID(),
                    'REG_ID' => $registration->ID(),
                ]
            );
        }
        // verify instance
        if ($answer instanceof EE_Answer) {
            if (! empty($answer_value)) {
                $answer->set('ANS_value', $answer_value);
            }
            $answer->cache('Question', $question);
            // remember system ID had a bug where sometimes it could be null
            $answer_cache_id = $question->is_system_question()
                ? $question->system_ID() . '-' . $registration->reg_url_link()
                : $question->ID() . '-' . $registration->reg_url_link();
            $registration->cache('Answer', $answer, $answer_cache_id);
        }
        return $this->generateQuestionInput($registration, $question, $answer);
    }


    /**
     * @param EE_Registration $registration
     * @param EE_Question     $question
     * @param                 $answer
     * @return EE_Form_Input_Base
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    private function generateQuestionInput(
        EE_Registration $registration,
        EE_Question $question,
        $answer
    ): EE_Form_Input_Base {
        $identifier                              = $question->is_system_question()
            ? $question->system_ID()
            : $question->ID();
        $callback = $this->addRequiredQuestion;
        $callback($identifier, $question->required());
        $input_constructor_args                  = [
            'html_name'        => 'ee_reg_qstn[' . $registration->ID() . '][' . $identifier . ']',
            'html_id'          => 'ee_reg_qstn-' . $registration->ID() . '-' . $identifier,
            'html_class'       => 'ee-reg-qstn ee-reg-qstn-' . $identifier,
            'html_label_id'    => 'ee_reg_qstn-' . $registration->ID() . '-' . $identifier,
            'html_label_class' => 'ee-reg-qstn',
        ];
        $input_constructor_args['html_label_id'] .= '-lbl';
        if ($answer instanceof EE_Answer && $answer->ID()) {
            $input_constructor_args['html_name']     .= '[' . $answer->ID() . ']';
            $input_constructor_args['html_id']       .= '-' . $answer->ID();
            $input_constructor_args['html_label_id'] .= '-' . $answer->ID();
        }
        return $question->generate_form_input(
            $registration,
            $answer,
            $input_constructor_args
        );
    }
}
