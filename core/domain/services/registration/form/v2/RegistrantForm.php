<?php

namespace EventEspresso\core\domain\services\registration\form\v2;

use EE_Error;
use EE_Event;
use EE_Form_Section;
use EE_Registration;
use EEM_Form_Element;
use EEM_Form_Section;
use EventEspresso\core\domain\services\registration\form\base\RegistrantForm as BaseRegistrantForm;
use EventEspresso\core\services\loaders\LoaderFactory;
use ReflectionException;

class RegistrantForm extends BaseRegistrantForm
{

    /**
     * @var EEM_Form_Element
     */
    protected $form_input_model;

    /**
     * @var EEM_Form_Section
     */
    public $form_section_model;

    /**
     * @var RegistrantFormInput
     */
    public $reg_form_input_factory;


    /**
     * RegistrantForm constructor.
     *
     * @param EE_Registration     $registration
     * @param bool                $admin_request
     * @param bool                $copy_attendee_info
     * @param callable            $enablePrintCopyInfo
     * @param RegistrantFormInput $reg_form_input_factory
     * @param EEM_Form_Element    $form_input_model
     * @param EEM_Form_Section    $form_section_model
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function __construct(
        EE_Registration $registration,
        bool $admin_request,
        bool $copy_attendee_info,
        callable $enablePrintCopyInfo,
        RegistrantFormInput $reg_form_input_factory,
        EEM_Form_Element $form_input_model,
        EEM_Form_Section $form_section_model
    ) {
        $this->reg_form_input_factory = $reg_form_input_factory;
        $this->form_input_model       = $form_input_model;
        $this->form_section_model     = $form_section_model;
        parent::__construct(
            $this->generateFormArgs($registration, $admin_request, $copy_attendee_info, $enablePrintCopyInfo)
        );
    }


    /**
     * @param EE_Registration $registration
     * @param bool            $admin_request
     * @param bool            $copy_attendee_info
     * @param callable        $enablePrintCopyInfo
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function generateFormArgs(
        EE_Registration $registration,
        bool $admin_request,
        bool $copy_attendee_info,
        callable $enablePrintCopyInfo
    ): array {
        static $attendee_nmbr = 1;
        $this->form_args = [];
        // verify that registration has valid event
        if ($registration->event() instanceof EE_Event) {
            $form_sections = $this->form_section_model->getFormSectionsForEvent($registration->event());
            if ($form_sections) {
                $all_form_inputs = $this->form_input_model->getAllFormElementsForFormSections($form_sections);
                // array of params to pass to parent constructor
                $this->form_args = $this->generateTopLevelFormArgs($registration, $admin_request, $attendee_nmbr);
                foreach ($form_sections as $form_section) {
                    if ($form_section instanceof EE_Form_Section) {
                        // \EEH_Debug_Tools::printr($form_section->slug(), '$form_section->slug()', __FILE__, __LINE__);
                        $form_inputs = $form_section->filterFormElements($all_form_inputs);
                        if (empty($form_inputs)) {
                            continue;
                        }
                        $form_section->setFormElements($form_inputs);
                        $registrant_form_section                                 = LoaderFactory::getNew(
                            RegistrantFormSection::class,
                            [$registration, $form_section, $admin_request, $this->reg_form_input_factory]
                        );
                        $this->form_args['subsections'][ $form_section->slug() ] = apply_filters(
                            'FHEE__EE_SPCO_Reg_Step_Attendee_Information___question_group_reg_form__question_group_reg_form',
                            $registrant_form_section,
                            $registration,
                            $form_section,
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
