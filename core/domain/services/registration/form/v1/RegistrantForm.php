<?php

namespace EventEspresso\core\domain\services\registration\form\v1;

use EE_Error;
use EE_Event;
use EE_Fieldset_Section_Layout;
use EE_Form_Input_Base;
use EE_Form_Section_Proper;
use EE_Hidden_Input;
use EE_Question_Group;
use EE_Registration;
use EE_SPCO_Reg_Step_Attendee_Information;
use EEM_Event_Question_Group;
use EventEspresso\core\services\loaders\LoaderFactory;
use ReflectionException;

class RegistrantForm extends EE_Form_Section_Proper
{

    /**
     * @var EE_SPCO_Reg_Step_Attendee_Information
     */
    public $reg_step;

    /**
     * @var EEM_Event_Question_Group
     */
    public $event_question_group_model;

    /**
     * @var bool
     */
    private $has_questions = false;


    /**
     * RegistrantForm constructor.
     *
     * @param EE_Registration          $registration
     * @param bool                     $copy_attendee_info
     * @param callable                 $enablePrintCopyInfo
     * @param EE_SPCO_Reg_Step_Attendee_Information $reg_step
     * @param EEM_Event_Question_Group $event_question_group_model
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function __construct(
        EE_Registration $registration,
        bool $copy_attendee_info,
        callable $enablePrintCopyInfo,
        EE_SPCO_Reg_Step_Attendee_Information $reg_step,
        EEM_Event_Question_Group $event_question_group_model
    ) {
        $this->reg_step = $reg_step;
        $this->event_question_group_model = $event_question_group_model;
        parent::__construct(
            $this->generateFormArgs($registration, $copy_attendee_info, $enablePrintCopyInfo)
        );
    }


    /**
     * @return bool
     */
    public function hasQuestions(): bool
    {
        return $this->has_questions;
    }


    /**
     * @param EE_Registration $registration
     * @param bool            $copy_attendee_info
     * @param callable        $enablePrintCopyInfo
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function generateFormArgs(
        EE_Registration $registration,
        bool $copy_attendee_info,
        callable $enablePrintCopyInfo
    ): array {
        static $attendee_nmbr = 1;
        $form_args = [];
        // verify that registration has valid event
        if ($registration->event() instanceof EE_Event) {
            $field_name      = 'Event_Question_Group.' . $this->event_question_group_model->fieldNameForContext(
                $registration->is_primary_registrant()
            );
            $question_groups = $registration->event()->question_groups(
                apply_filters(
                    'FHEE__EventEspresso_core_domain_services_registration_form_v1_RegistrantForm__generateFormArgs__question_groups_query_parameters',
                    [
                        [
                            'Event.EVT_ID' => $registration->event()->ID(),
                            $field_name    => true,
                        ],
                        'order_by' => ['QSG_order' => 'ASC'],
                    ],
                    $registration,
                    $this
                )
            );
            if ($question_groups) {
                // array of params to pass to parent constructor
                $form_args = [
                    'html_id'         => 'ee-registration-' . $registration->reg_url_link(),
                    'html_class'      => 'ee-reg-form-attendee-dv',
                    'html_style'      => $this->reg_step->checkout->admin_request
                        ? 'padding:0em 2em 1em; margin:3em 0 0; border:1px solid #ddd;'
                        : '',
                    'subsections'     => [],
                    'layout_strategy' => new EE_Fieldset_Section_Layout(
                        [
                            'legend_class' => 'spco-attendee-lgnd',
                            'legend_text'  => sprintf(
                                esc_html_x(
                                    'Attendee %d',
                                    'Attendee 123',
                                    'event_espresso'
                                ),
                                $attendee_nmbr
                            ),
                        ]
                    ),
                ];
                foreach ($question_groups as $question_group) {
                    if ($question_group instanceof EE_Question_Group) {
                        $question_group_reg_form = LoaderFactory::getNew(
                            RegFormQuestionGroup::class,
                            [$registration, $question_group, $this->reg_step]
                        );
                        $form_args['subsections'][ $question_group->identifier() ] = apply_filters(
                            'FHEE__EventEspresso_core_domain_services_registration_form_v1_RegistrantForm__generateFormArgs__question_group_reg_form',
                            $question_group_reg_form,
                            $registration,
                            $question_group,
                            $this
                        );
                    }
                }
                // add hidden input
                $form_args['subsections']['additional_attendee_reg_info'] = $this->additionalAttendeeRegInfoInput(
                    $registration
                );

                // If we have question groups for additional attendees, then display the copy options
                $printCopyInfo = apply_filters(
                    'FHEE__EventEspresso_core_domain_services_registration_form_v1_RegistrantForm__generateFormArgs__printCopyInfo',
                    $attendee_nmbr > 1 && $copy_attendee_info,
                    $attendee_nmbr,
                    $registration,
                    $this
                );
                if ($printCopyInfo) {
                    $enablePrintCopyInfo();
                }


                if ($registration->is_primary_registrant()) {
                    // generate hidden input
                    $form_args['subsections']['primary_registrant'] = $this->additionalPrimaryRegistrantInputs(
                        $registration
                    );
                }
            }
        }
        $attendee_nmbr++;

        // Increment the reg forms number if form is valid.
        if (! empty($form_args)) {
            $this->has_questions = true;
        }

        return $form_args;
    }


    /**
     * @param EE_Registration $registration
     * @return EE_Form_Input_Base
     * @throws EE_Error
     */
    private function additionalAttendeeRegInfoInput(EE_Registration $registration)
    {
        // generate hidden input
        return new EE_Hidden_Input(
            [
                'html_id' => 'additional-attendee-reg-info-' . $registration->reg_url_link(),
                'default' => true,
            ]
        );
    }


    /**
     * @param EE_Registration $registration
     * @return    EE_Form_Input_Base
     * @throws EE_Error
     */
    private function additionalPrimaryRegistrantInputs(EE_Registration $registration)
    {
        // generate hidden input
        return new EE_Hidden_Input(
            [
                'html_id' => 'primary_registrant',
                'default' => $registration->reg_url_link(),
            ]
        );
    }
}
