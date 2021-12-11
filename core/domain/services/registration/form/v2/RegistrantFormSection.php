<?php

namespace EventEspresso\core\domain\services\registration\form\v2;

use EE_Admin_Two_Column_Layout;
use EE_Div_Per_Section_Layout;
use EE_Error;
use EE_Form_Element;
use EE_Form_Section;
use EE_Form_Section_HTML;
use EE_Form_Section_Proper;
use EE_Registration;
use EEH_HTML;
use EventEspresso\core\services\form\meta\FormLabel;
use ReflectionException;
use RuntimeException;

class RegistrantFormSection extends EE_Form_Section_Proper
{

    /**
     * @var RegistrantFormInput
     */
    public $reg_form_input;


    /**
     * RegistrantFormSection constructor.
     *
     * @param EE_Registration     $registration
     * @param EE_Form_Section     $form_section
     * @param bool                $admin_request
     * @param RegistrantFormInput $reg_form_input
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function __construct(
        EE_Registration $registration,
        EE_Form_Section $form_section,
        bool $admin_request,
        RegistrantFormInput $reg_form_input
    ) {
        $this->reg_form_input = $reg_form_input;
        parent::__construct($this->generateFormArgs($registration, $form_section, $admin_request));
    }


    /**
     * @param EE_Registration $registration
     * @param EE_Form_Section $form_section
     * @param bool            $admin_request
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function generateFormArgs(
        EE_Registration $registration,
        EE_Form_Section $form_section,
        bool $admin_request
    ): array {
        $form_args   = $this->generateTopLevelFormArgs($registration, $form_section, $admin_request);
        $form_inputs = $form_section->formElements();
        // loop thru questions
        foreach ($form_inputs as $form_input) {
            if ($form_input instanceof EE_Form_Element) {
                $form_args['subsections'][ $form_input->slug() ] = $this->reg_form_input->generateFormInput(
                    $registration,
                    $form_section,
                    $form_input
                );
            }
        }
        $form_args['subsections'] = $this->filterFormSectionContent(
            $registration,
            $form_section,
            $form_args['subsections']
        );
        return $form_args;
    }


    /**
     * @param EE_Registration $registration
     * @param EE_Form_Section $form_section
     * @param bool            $admin_request
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function generateTopLevelFormArgs(
        EE_Registration $registration,
        EE_Form_Section $form_section,
        bool $admin_request
    ): array {
        return [
            'html_id'         => 'ee-reg-form-qstn-grp-' . $form_section->slug() . '-' . $registration->ID(),
            'html_class'      => $admin_request
                ? 'form-table ee-reg-form-qstn-grp-dv'
                : 'ee-reg-form-qstn-grp-dv',
            'html_label_id'   => 'ee-reg-form-qstn-grp-' . $form_section->slug() . '-' . $registration->ID() . '-lbl',
            'subsections'     => [
                'reg_form_qstn_grp_hdr' => $this->formSectionHeader($form_section, $admin_request),
            ],
            'layout_strategy' => $admin_request
                ? new EE_Admin_Two_Column_Layout()
                : new EE_Div_Per_Section_Layout(),
        ];
    }


    /**
     * @param EE_Form_Section $form_section
     * @param bool            $admin_request
     * @return EE_Form_Section_HTML
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function formSectionHeader(EE_Form_Section $form_section, bool $admin_request): EE_Form_Section_HTML
    {
        $html  = '';
        $label = $form_section->label();
        // group_name
        if ($label instanceof FormLabel && $label->showLabel()) {
            if ($admin_request && $label->adminLabel() !== '') {
                $html .= EEH_HTML::br();
                $html .= EEH_HTML::h3(
                    $label->adminLabel(),
                    '',
                    'ee-reg-form-qstn-grp-title title',
                    'font-size: 1.3em; padding-left:0;'
                );
            } elseif (! $admin_request && $label->publicLabel() !== '') {
                $html .= EEH_HTML::h4(
                    $label->publicLabel(),
                    '',
                    'ee-reg-form-qstn-grp-title section-title'
                );
            }
        }
        // group_desc
        // if ($question_group->show_group_desc() && $question_group->desc() !== '') {
        //     $html .= EEH_HTML::p(
        //         $question_group->desc(),
        //         '',
        //         $admin_request
        //             ? 'ee-reg-form-qstn-grp-desc-pg'
        //             : 'ee-reg-form-qstn-grp-desc-pg small-text lt-grey-text'
        //     );
        // }
        return new EE_Form_Section_HTML($html);
    }


    /**
     * @param EE_Registration $registration
     * @param EE_Form_Section $form_section
     * @param array           $subsections
     * @return array
     */
    private function filterFormSectionContent(
        EE_Registration $registration,
        EE_Form_Section $form_section,
        array $subsections
    ): array {
        // filter for additional content before questions
        $filtered = (array) apply_filters(
            'FHEE__EventEspresso_core_domain_services_registration_form_v2_RegistrantFormSection__filterFormSectionContent',
            [
                'before_inputs' => '',
                'form_section'  => $subsections,
                'after_inputs'  => '',
            ],
            $registration,
            $form_section,
            $this
        );

        if (! isset($filtered['form_section'])) {
            throw new RuntimeException(
                esc_html__('Form Section arguments can not be removed.', 'event_espresso')
            );
        }
        $form_args = $filtered['form_section'];
        if (! empty($filtered['before_inputs'])) {
            $form_args['reg_form_questions_before'] = new EE_Form_Section_HTML($filtered['before_inputs']);
        }
        if (! empty($filtered['after_inputs'])) {
            $form_args['reg_form_questions_after'] = new EE_Form_Section_HTML($filtered['after_inputs']);
        }
        return $form_args;
    }
}
