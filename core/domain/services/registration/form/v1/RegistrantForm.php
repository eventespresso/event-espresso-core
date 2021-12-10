<?php

namespace EventEspresso\core\domain\services\registration\form\v1;

use EE_Error;
use EE_Event;
use EE_Question_Group;
use EE_Registration;
use EE_SPCO_Reg_Step_Attendee_Information;
use EEM_Event_Question_Group;
use EventEspresso\core\domain\services\registration\form\base\RegistrantForm as BaseRegistrantForm;
use EventEspresso\core\services\loaders\LoaderFactory;
use ReflectionException;

class RegistrantForm extends BaseRegistrantForm
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
                $this->form_args = $this->generateTopLevelFormArgs($registration, $admin_request, $attendee_nmbr);
                foreach ($question_groups as $question_group) {
                    if ($question_group instanceof EE_Question_Group) {
                        $question_group_reg_form = LoaderFactory::getNew(
                            RegFormQuestionGroup::class,
                            [$registration, $question_group, $this->reg_step]
                        );
                        $this->form_args['subsections'][ $question_group->identifier() ] = apply_filters(
                            'FHEE__EE_SPCO_Reg_Step_Attendee_Information___question_group_reg_form__question_group_reg_form',
                            $question_group_reg_form,
                            $registration,
                            $question_group,
                            $this
                        );
                    }
                }
                $this->addAdditionalAttendeeRegInfoInput($registration);
                $this->enablePrintCopyInfo($attendee_nmbr, $copy_attendee_info, $enablePrintCopyInfo);
                $this->addAdditionalPrimaryRegistrantInputs($registration);
            }
        }
        $attendee_nmbr++;

        $this->setHasQuestions();

        return $this->form_args;
    }
}
