<?php

namespace EventEspresso\core\domain\services\registration\form\v1;

use EE_Admin_Two_Column_Layout;
use EE_Div_Per_Section_Layout;
use EE_Error;
use EE_Form_Section_HTML;
use EE_Form_Section_Proper;
use EE_Question;
use EE_Question_Group;
use EE_Registration;
use EEH_HTML;
use ReflectionException;

class QuestionGroupRegForm extends EE_Form_Section_Proper
{
    /**
     * @var RegFormQuestionFactory
     */
    public $reg_form_question_factory;


    /**
     * QuestionGroupRegForm constructor.
     *
     * @param EE_Registration        $registration
     * @param EE_Question_Group      $question_group
     * @param bool                   $admin_request
     * @param RegFormQuestionFactory $reg_form_question_factory
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function __construct(
        EE_Registration $registration,
        EE_Question_Group $question_group,
        bool $admin_request,
        RegFormQuestionFactory $reg_form_question_factory
    ) {
        $this->reg_form_question_factory = $reg_form_question_factory;
        parent::__construct($this->generateFormArgs($registration, $question_group, $admin_request));
    }


    /**
     * @param EE_Registration   $registration
     * @param EE_Question_Group $question_group
     * @param bool              $admin_request
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function generateFormArgs(
        EE_Registration $registration,
        EE_Question_Group $question_group,
        bool $admin_request
    ): array {
        // array of params to pass to parent constructor
        $form_args = [
            'html_id'         => 'ee-reg-form-qstn-grp-' . $question_group->identifier() . '-' . $registration->ID(),
            'html_class'      => $admin_request
                ? 'form-table ee-reg-form-qstn-grp-dv'
                : 'ee-reg-form-qstn-grp-dv',
            'html_label_id'   => 'ee-reg-form-qstn-grp-' . $question_group->identifier() . '-'
                                 . $registration->ID() . '-lbl',
            'subsections'     => [
                'reg_form_qstn_grp_hdr' => $this->questionGroupHeader($question_group, $admin_request),
            ],
            'layout_strategy' => $admin_request
                ? new EE_Admin_Two_Column_Layout()
                : new EE_Div_Per_Section_Layout(),
        ];
        // where params
        $query_params = ['QST_deleted' => 0];
        // don't load admin only questions on the frontend
        if (! $admin_request) {
            $query_params['QST_admin_only'] = ['!=', true];
        }
        $questions = $question_group->get_many_related(
            'Question',
            apply_filters(
                'FHEE__EE_SPCO_Reg_Step_Attendee_Information___question_group_reg_form__related_questions_query_params',
                [
                    $query_params,
                    'order_by' => [
                        'Question_Group_Question.QGQ_order' => 'ASC',
                    ],
                ],
                $question_group,
                $registration,
                $this
            )
        );
        // filter for additional content before questions
        $form_args['subsections']['reg_form_questions_before'] = new EE_Form_Section_HTML(
            apply_filters(
                'FHEE__EEH_Form_Fields__generate_question_groups_html__before_question_group_questions',
                '',
                $registration,
                $question_group,
                $this
            )
        );
        // loop thru questions
        foreach ($questions as $question) {
            if ($question instanceof EE_Question) {
                $identifier = $question->is_system_question()
                    ? $question->system_ID()
                    : $question->ID();

                $form_args['subsections'][ $identifier ] = $this->reg_form_question_factory->create(
                    $registration,
                    $question
                );
            }
        }
        $form_args['subsections'] = apply_filters(
            'FHEE__EE_SPCO_Reg_Step_Attendee_Information__question_group_reg_form__subsections_array',
            $form_args['subsections'],
            $registration,
            $question_group,
            $this
        );
        // filter for additional content after questions
        $form_args['subsections']['reg_form_questions_after'] = new EE_Form_Section_HTML(
            apply_filters(
                'FHEE__EEH_Form_Fields__generate_question_groups_html__after_question_group_questions',
                '',
                $registration,
                $question_group,
                $this
            )
        );

        return $form_args;
    }


    /**
     * @param EE_Question_Group $question_group
     * @param bool              $admin_request
     * @return EE_Form_Section_HTML
     */
    private function questionGroupHeader(EE_Question_Group $question_group, bool $admin_request): EE_Form_Section_HTML
    {
        $html = '';
        // group_name
        if ($question_group->show_group_name() && $question_group->name() !== '') {
            if ($admin_request) {
                $html .= EEH_HTML::br();
                $html .= EEH_HTML::h3(
                    $question_group->name(),
                    '',
                    'ee-reg-form-qstn-grp-title title',
                    'font-size: 1.3em; padding-left:0;'
                );
            } else {
                $html .= EEH_HTML::h4(
                    $question_group->name(),
                    '',
                    'ee-reg-form-qstn-grp-title section-title'
                );
            }
        }
        // group_desc
        if ($question_group->show_group_desc() && $question_group->desc() !== '') {
            $html .= EEH_HTML::p(
                $question_group->desc(),
                '',
                $admin_request
                    ? 'ee-reg-form-qstn-grp-desc-pg'
                    : 'ee-reg-form-qstn-grp-desc-pg small-text lt-grey-text'
            );
        }
        return new EE_Form_Section_HTML($html);
    }
}
