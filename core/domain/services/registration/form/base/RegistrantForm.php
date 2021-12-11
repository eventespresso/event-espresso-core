<?php

namespace EventEspresso\core\domain\services\registration\form\base;

use EE_Error;
use EE_Fieldset_Section_Layout;
use EE_Form_Section_Proper;
use EE_Hidden_Input;
use EE_Registration;
use EventEspresso\core\domain\services\registration\form\RegistrantFormInterface;

abstract class RegistrantForm extends EE_Form_Section_Proper implements RegistrantFormInterface
{
    /**
     * @var array
     */
    protected $form_args = [];

    /**
     * @var bool
     */
    private $has_questions = false;


    /**
     * RegistrantForm constructor.
     *
     * @param array $form_args
     * @throws EE_Error
     */
    public function __construct(array $form_args)
    {
        parent::__construct($form_args);
    }


    /**
     * @param EE_Registration $registration
     * @return void
     * @throws EE_Error
     */
    protected function addAdditionalAttendeeRegInfoInput(EE_Registration $registration)
    {
        // generate hidden input
        $this->form_args['subsections']['additional_attendee_reg_info'] = new EE_Hidden_Input(
            [
                'html_id' => 'additional-attendee-reg-info-' . $registration->reg_url_link(),
                'default' => true,
            ]
        );
    }


    /**
     * @param EE_Registration $registration
     * @return void
     * @throws EE_Error
     */
    protected function addAdditionalPrimaryRegistrantInputs(EE_Registration $registration)
    {
        if ($registration->is_primary_registrant()) {
            // generate hidden input
            $this->form_args['subsections']['primary_registrant'] = new EE_Hidden_Input(
                [
                    'html_id' => 'primary_registrant',
                    'default' => $registration->reg_url_link(),
                ]
            );
        }
    }


    /**
     * @param int      $attendee_nmbr
     * @param bool     $copy_attendee_info
     * @param callable $enablePrintCopyInfo
     */
    protected function enablePrintCopyInfo(
        int $attendee_nmbr,
        bool $copy_attendee_info,
        callable $enablePrintCopyInfo
    ) {
        // If we have question groups for additional attendees, then display the copy options
        $printCopyInfo = apply_filters(
            'FHEE__EE_SPCO_Reg_Step_Attendee_Information___registrations_reg_form___printCopyInfo',
            $attendee_nmbr > 1 && $copy_attendee_info,
            $attendee_nmbr
        );
        if ($printCopyInfo) {
            $enablePrintCopyInfo();
        }
    }


    /**
     * @param EE_Registration $registration
     * @param bool            $admin_request
     * @param int             $attendee_nmbr
     * @return array
     * @throws EE_Error
     */
    protected function generateTopLevelFormArgs(
        EE_Registration $registration,
        bool $admin_request,
        int $attendee_nmbr
    ): array {
        return [
            'html_id'         => 'ee-registration-' . $registration->reg_url_link(),
            'html_class'      => 'ee-reg-form-attendee-dv',
            'html_style'      => $admin_request
                ? 'padding:0em 2em 1em; margin:3em 0 0; border:1px solid #ddd;'
                : '',
            'subsections'     => [],
            'layout_strategy' => new EE_Fieldset_Section_Layout(
                [
                    'legend_class' => 'spco-attendee-lgnd smaller-text lt-grey-text',
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
    }


    /**
     * @return bool
     */
    public function hasQuestions(): bool
    {
        return $this->has_questions;
    }


    /**
     * @return void
     */
    protected function setHasQuestions(): void
    {
        $this->has_questions = ! empty($this->form_args);
    }
}
