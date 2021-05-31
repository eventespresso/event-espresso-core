<?php

namespace EventEspresso\core\domain\services\registration\form;

use DomainException;
use EE_Admin_Two_Column_Layout;
use EE_Answer;
use EE_Checkbox_Multi_Input;
use EE_Div_Per_Section_Layout;
use EE_Error;
use EE_Event;
use EE_Fieldset_Section_Layout;
use EE_Form_Input_Base;
use EE_Form_Section_Base;
use EE_Form_Section_HTML;
use EE_Form_Section_Proper;
use EE_Hidden_Input;
use EE_Line_Item_Display;
use EE_Question;
use EE_Question_Group;
use EE_Registration;
use EE_Registration_Config;
use EE_SPCO_Reg_Step_Attendee_Information;
use EE_Template_Layout;
use EEH_Autoloader;
use EEH_HTML;
use EEH_Line_Item;
use EEM_Answer;
use EEM_Event_Question_Group;
use EventEspresso\core\exceptions\EntityNotFoundException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;
use InvalidArgumentException;
use ReflectionException;

/**
 * Class LegacyRegistrationForm
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\domain\services\registration\form
 * @since   $VID:$
 */
class LegacyRegistrationForm extends EE_Form_Section_Proper
{


    /**
     * @var bool
     */
    private $print_copy_info;

    /**
     * @var EE_Registration_Config
     */
    public $reg_config;

    /**
     * @var int
     */
    protected $reg_form_count = 0;


    /**
     * @var EE_SPCO_Reg_Step_Attendee_Information
     */
    public $reg_step;

    /**
     * @var array
     */
    private $required_questions = [];

    /**
     * @var array
     */
    private $template_args = [];


    /**
     * LegacyRegistrationForm constructor.
     *
     * @param EE_SPCO_Reg_Step_Attendee_Information $reg_step
     * @param EE_Registration_Config                $reg_config
     * @throws ReflectionException
     * @throws EE_Error
     */
    public function __construct(EE_SPCO_Reg_Step_Attendee_Information $reg_step, EE_Registration_Config $reg_config)
    {
        $this->reg_step        = $reg_step;
        $this->reg_config      = $reg_config;
        $this->print_copy_info = $reg_config->copyAttendeeInfo();
        LoaderFactory::getLoader()->getShared(CountryOptions::class, [$this->reg_step->checkout->action]);
        LoaderFactory::getLoader()->getShared(StateOptions::class, [$this->reg_step->checkout->action]);
        parent::__construct(
            [
                'name'            => $this->reg_step->reg_form_name(),
                'html_id'         => $this->reg_step->reg_form_name(),
                'subsections'     => $this->generateSubsections(),
                'layout_strategy' => new EE_Template_Layout(
                    [
                        'layout_template_file' => $this->reg_step->template(), // layout_template
                        'template_args'        => $this->template_args,
                    ]
                ),
            ]
        );
    }


    /**
     * @return bool
     */
    public function printCopyInfo(): bool
    {
        return $this->print_copy_info;
    }


    /**
     * @return int
     */
    public function regFormCount(): int
    {
        return $this->reg_form_count;
    }


    /**
     * @return array
     */
    public function requiredQuestions(): array
    {
        return $this->required_questions;
    }


    /**
     * @return EE_Form_Section_Proper[]
     * @throws DomainException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws EntityNotFoundException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function generateSubsections(): array
    {
        // Init reg forms count.
        $this->reg_form_count = 0;

        $primary_registrant = null;
        // autoload Line_Item_Display classes
        EEH_Autoloader::register_line_item_display_autoloaders();
        $Line_Item_Display = new EE_Line_Item_Display();
        // calculate taxes
        $Line_Item_Display->display_line_item(
            $this->reg_step->checkout->cart->get_grand_total(),
            ['set_tax_rate' => true]
        );
        $extra_inputs_section = $this->reg_step->reg_step_hidden_inputs();
        $this->addPrivacyConsentCheckbox($extra_inputs_section);
        $subsections = [
            'default_hidden_inputs' => $extra_inputs_section,
        ];

        $this->template_args = [
            'revisit'       => $this->reg_step->checkout->revisit,
            'registrations' => [],
            'ticket_count'  => [],
        ];
        // grab the saved registrations from the transaction
        $registrations
            = $this->reg_step->checkout->transaction->registrations($this->reg_step->checkout->reg_cache_where_params);
        if ($registrations) {
            foreach ($registrations as $registration) {
                // can this registration be processed during this visit ?
                if (
                    $registration instanceof EE_Registration
                    && $this->reg_step->checkout->visit_allows_processing_of_this_registration($registration)
                ) {
                    $reg_url_link                                                         = $registration->reg_url_link();
                    $subsections[ $reg_url_link ]
                                                                                          = $this->getRegForm($registration);
                    $this->template_args['registrations'][ $reg_url_link ]                = $registration;
                    $this->template_args['ticket_count'][ $registration->ticket()->ID() ] = isset(
                        $this->template_args['ticket_count'][ $registration->ticket()->ID() ]
                    )
                        ? $this->template_args['ticket_count'][ $registration->ticket()->ID() ] + 1
                        : 1;
                    $ticket_line_item
                                                                                          = EEH_Line_Item::get_line_items_by_object_type_and_IDs(
                        $this->reg_step->checkout->cart->get_grand_total(),
                        'Ticket',
                        [$registration->ticket()->ID()]
                    );
                    $ticket_line_item                                                     = is_array($ticket_line_item)
                        ? reset($ticket_line_item)
                        : $ticket_line_item;
                    $this->template_args['ticket_line_item'][ $registration->ticket()->ID() ]
                                                                                          = $Line_Item_Display->display_line_item($ticket_line_item);
                    if ($registration->is_primary_registrant()) {
                        $primary_registrant = $reg_url_link;
                    }
                }
            }

            if ($primary_registrant && count($registrations) > 1) {
                $copy_options['spco_copy_attendee_chk'] = $this->print_copy_info
                    ? new LegacyCopyAttendeeInfoForm($registrations, $this->reg_step->slug())
                    : new LegacyAutoCopyAttendeeInfoForm($this->reg_step->slug());
                // generate hidden input
                if (
                    isset($subsections[ $primary_registrant ])
                    && $subsections[ $primary_registrant ] instanceof EE_Form_Section_Proper
                ) {
                    $subsections[ $primary_registrant ]->add_subsections(
                        $copy_options,
                        'primary_registrant',
                        false
                    );
                }
            }
        }

        // Set the registration form template (default: one form per ticket details table).
        // We decide the template to used based on the number of forms.
        $template = $this->reg_form_count > 1
            ? SPCO_REG_STEPS_PATH . $this->reg_step->slug() . '/attendee_info_main.template.php'
            : SPCO_REG_STEPS_PATH . $this->reg_step->slug() . '/attendee_info_single.template.php';
        $this->reg_step->setTemplate($template);

        return $subsections;
    }


    /**
     * @param EE_Form_Section_Proper $extra_inputs_section
     * @throws EE_Error
     */
    private function addPrivacyConsentCheckbox(EE_Form_Section_Proper $extra_inputs_section)
    {
        // if this isn't a revisit, and they have the privacy consent box enabled, add it
        if (! $this->reg_step->checkout->revisit && $this->reg_config->isConsentCheckboxEnabled()) {
            $extra_inputs_section->add_subsections(
                [
                    'consent_box' => new EE_Form_Section_Proper(
                        [
                            'layout_strategy' =>
                                new EE_Template_Layout(
                                    [
                                        'input_template_file' => SPCO_REG_STEPS_PATH
                                                                 . $this->reg_step->slug()
                                                                 . '/privacy_consent.template.php',
                                    ]
                                ),
                            'subsections'     => [
                                'consent' => new EE_Checkbox_Multi_Input(
                                    [
                                        'consent' => $this->reg_config->getConsentCheckboxLabelText(),
                                    ],
                                    [
                                        'required'                          => true,
                                        'required_validation_error_message' => esc_html__(
                                            'You must consent to these terms in order to register.',
                                            'event_espresso'
                                        ),
                                        'html_label_text'                   => '',
                                    ]
                                ),
                            ],
                        ]
                    ),
                ],
                null,
                false
            );
        }
    }


    /**
     * @param EE_Registration $registration
     * @return EE_Form_Section_Base
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws EntityNotFoundException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function getRegForm(EE_Registration $registration)
    {
        static $attendee_nmbr = 1;
        $form_args = [];
        // verify that registration has valid event
        if ($registration->event() instanceof EE_Event) {
            $field_name      = 'Event_Question_Group.'
                               . EEM_Event_Question_Group::instance()->fieldNameForContext(
                    $registration->is_primary_registrant()
                );
            $question_groups = $registration->event()->question_groups(
                apply_filters(
                // @codingStandardsIgnoreStart
                    'FHEE__EE_SPCO_Reg_Step_Attendee_Information___registrations_reg_form__question_groups_query_parameters',
                    // @codingStandardsIgnoreEnd
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
                foreach ($question_groups as $question_group) {
                    if ($question_group instanceof EE_Question_Group) {
                        $form_args['subsections'][ $question_group->identifier() ] = $this->questionGroupRegForm(
                            $registration,
                            $question_group
                        );
                    }
                }
                // add hidden input
                $form_args['subsections']['additional_attendee_reg_info'] = $this->additionalAttendeeRegInfoInput(
                    $registration
                );

                /**
                 * @var $reg_config EE_Registration_Config
                 */
                $reg_config = LoaderFactory::getLoader()->getShared('EE_Registration_Config');

                // If we have question groups for additional attendees, then display the copy options
                $this->print_copy_info = apply_filters(
                    'FHEE__EE_SPCO_Reg_Step_Attendee_Information___registrations_reg_form___printCopyInfo',
                    $attendee_nmbr > 1 && $reg_config->copyAttendeeInfo(),
                    $attendee_nmbr
                );

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
            $this->reg_form_count++;
        }

        return ! empty($form_args)
            ? new EE_Form_Section_Proper($form_args)
            : new EE_Form_Section_HTML();
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
     * @param EE_Registration   $registration
     * @param EE_Question_Group $question_group
     * @return EE_Form_Section_Proper
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    private function questionGroupRegForm(
        EE_Registration $registration,
        EE_Question_Group $question_group
    ): EE_Form_Section_Proper {
        // array of params to pass to parent constructor
        $form_args = [
            'html_id'         => 'ee-reg-form-qstn-grp-' . $question_group->identifier() . '-' . $registration->ID(),
            'html_class'      => $this->reg_step->checkout->admin_request
                ? 'form-table ee-reg-form-qstn-grp-dv'
                : 'ee-reg-form-qstn-grp-dv',
            'html_label_id'   => 'ee-reg-form-qstn-grp-' . $question_group->identifier() . '-'
                                 . $registration->ID() . '-lbl',
            'subsections'     => [
                'reg_form_qstn_grp_hdr' => $this->questionGroupHeader($question_group),
            ],
            'layout_strategy' => $this->reg_step->checkout->admin_request
                ? new EE_Admin_Two_Column_Layout()
                : new EE_Div_Per_Section_Layout(),
        ];
        // where params
        $query_params = ['QST_deleted' => 0];
        // don't load admin only questions on the frontend
        if (! $this->reg_step->checkout->admin_request) {
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
                $identifier                              = $question->is_system_question()
                    ? $question->system_ID()
                    : $question->ID();
                $form_args['subsections'][ $identifier ] = $this->regFormQuestion($registration, $question);
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
        // d($form_args);
        $question_group_reg_form = new EE_Form_Section_Proper($form_args);
        return apply_filters(
            'FHEE__EE_SPCO_Reg_Step_Attendee_Information___question_group_reg_form__question_group_reg_form',
            $question_group_reg_form,
            $registration,
            $question_group,
            $this
        );
    }


    /**
     * @param EE_Question_Group $question_group
     * @return    EE_Form_Section_HTML
     */
    private function questionGroupHeader(EE_Question_Group $question_group): EE_Form_Section_HTML
    {
        $html = '';
        // group_name
        if ($question_group->show_group_name() && $question_group->name() !== '') {
            if ($this->reg_step->checkout->admin_request) {
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
                $this->reg_step->checkout->admin_request
                    ? 'ee-reg-form-qstn-grp-desc-pg'
                    : 'ee-reg-form-qstn-grp-desc-pg small-text lt-grey-text'
            );
        }
        return new EE_Form_Section_HTML($html);
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
    public function regFormQuestion(EE_Registration $registration, EE_Question $question): EE_Form_Input_Base
    {

        // if this question was for an attendee detail, then check for that answer
        $answer_value = EEM_Answer::instance()->get_attendee_property_answer_value(
            $registration,
            $question->system_ID()
        );
        $answer       = $answer_value === null
            ? EEM_Answer::instance()->get_one(
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
        $this->required_questions[ $identifier ] = $question->required();
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
        $form_input = $question->generate_form_input(
            $registration,
            $answer,
            $input_constructor_args
        );
        remove_filter(
            'FHEE__EE_Question__generate_form_input__country_options',
            [$this, 'use_cached_countries_for_form_input']
        );
        remove_filter(
            'FHEE__EE_Question__generate_form_input__state_options',
            [$this, 'use_cached_states_for_form_input']
        );
        return $form_input;
    }
}
