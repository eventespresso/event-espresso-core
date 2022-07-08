<?php

use EventEspresso\core\domain\entities\contexts\Context;
use EventEspresso\core\exceptions\EntityNotFoundException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\domain\services\commands\attendee\CreateAttendeeCommand;
use EventEspresso\core\services\loaders\LoaderFactory;

/**
 * Class EE_SPCO_Reg_Step_Attendee_Information
 *
 * @package     Event Espresso
 * @subpackage  core
 * @author      Brent Christensen
 * @since       4.5.0
 */
class EE_SPCO_Reg_Step_Attendee_Information extends EE_SPCO_Reg_Step
{
    /**
     * @type bool $_print_copy_info
     */
    private $_print_copy_info = false;

    /**
     * @type array $_attendee_data
     */
    private $_attendee_data = [];

    /**
     * @type array $_required_questions
     */
    private $_required_questions = [];

    /**
     * @type array $_registration_answers
     */
    private $_registration_answers = [];

    /**
     * @type int $reg_form_count
     */
    protected $reg_form_count = 0;


    /**
     *    class constructor
     *
     * @access    public
     * @param EE_Checkout $checkout
     */
    public function __construct(EE_Checkout $checkout)
    {
        $this->request  = EED_Single_Page_Checkout::getRequest();
        $this->_slug    = 'attendee_information';
        $this->_name    = esc_html__('Attendee Information', 'event_espresso');
        $this->checkout = $checkout;
        $this->_reset_success_message();
        $this->set_instructions(
            esc_html__('Please answer the following registration questions before proceeding.', 'event_espresso')
        );
    }


    public function translate_js_strings()
    {
        EE_Registry::$i18n_js_strings['required_field']            = esc_html__(
            ' is a required question.',
            'event_espresso'
        );
        EE_Registry::$i18n_js_strings['required_multi_field']      = esc_html__(
            ' is a required question. Please enter a value for at least one of the options.',
            'event_espresso'
        );
        EE_Registry::$i18n_js_strings['answer_required_questions'] = esc_html__(
            'Please answer all required questions correctly before proceeding.',
            'event_espresso'
        );
        EE_Registry::$i18n_js_strings['attendee_info_copied']      = sprintf(
            esc_html_x(
                'The attendee information was successfully copied.%sPlease ensure the rest of the registration form is completed before proceeding.',
                'The attendee information was successfully copied.(line break)Please ensure the rest of the registration form is completed before proceeding.',
                'event_espresso'
            ),
            '<br/>'
        );
        EE_Registry::$i18n_js_strings['attendee_info_copy_error']  = esc_html__(
            'An unknown error occurred on the server while attempting to copy the attendee information. Please refresh the page and try again.',
            'event_espresso'
        );
        EE_Registry::$i18n_js_strings['enter_valid_email']         = esc_html__(
            'You must enter a valid email address.',
            'event_espresso'
        );
        EE_Registry::$i18n_js_strings['valid_email_and_questions'] = esc_html__(
            'You must enter a valid email address and answer all other required questions before you can proceed.',
            'event_espresso'
        );
    }


    public function enqueue_styles_and_scripts()
    {
    }


    /**
     * @return boolean
     */
    public function initialize_reg_step()
    {
        return true;
    }


    /**
     * @return EE_Form_Section_Proper
     * @throws DomainException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws EntityNotFoundException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function generate_reg_form()
    {
        /**
         * @var $reg_config EE_Registration_Config
         */
        $reg_config = LoaderFactory::getLoader()->getShared('EE_Registration_Config');

        $this->_print_copy_info = $reg_config->copyAttendeeInfo();

        // Init reg forms count.
        $this->reg_form_count = 0;

        $primary_registrant = null;
        // autoload Line_Item_Display classes
        EEH_Autoloader::register_line_item_display_autoloaders();
        $Line_Item_Display = new EE_Line_Item_Display();
        // calculate taxes
        $Line_Item_Display->display_line_item(
            $this->checkout->cart->get_grand_total(),
            ['set_tax_rate' => true]
        );
        /** @var $subsections EE_Form_Section_Proper[] */
        $extra_inputs_section = $this->reg_step_hidden_inputs();
        $subsections          = [
            'default_hidden_inputs' => $extra_inputs_section,
        ];

        // if this isn't a revisit, and they have the privacy consent box enabled, add it
        if (! $this->checkout->revisit && $reg_config->isConsentCheckboxEnabled()) {
            $extra_inputs_section->add_subsections(
                [
                    'consent_box' => new EE_Form_Section_Proper(
                        [
                            'layout_strategy' =>
                                new EE_Template_Layout(
                                    [
                                        'input_template_file' => SPCO_REG_STEPS_PATH
                                                                 . $this->_slug
                                                                 . '/privacy_consent.template.php',
                                    ]
                                ),
                            'subsections'     => [
                                'consent' => new EE_Checkbox_Multi_Input(
                                    [
                                        'consent' => $reg_config->getConsentCheckboxLabelText(),
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
        $template_args = [
            'revisit'       => $this->checkout->revisit,
            'registrations' => [],
            'ticket_count'  => [],
        ];
        // grab the saved registrations from the transaction
        $registrations = $this->checkout->transaction->registrations($this->checkout->reg_cache_where_params);
        if ($registrations) {
            foreach ($registrations as $registration) {
                // can this registration be processed during this visit ?
                if (
                    $registration instanceof EE_Registration
                    && $this->checkout->visit_allows_processing_of_this_registration($registration)
                ) {
                    $subsections[ $registration->reg_url_link() ]                       =
                        $this->_registrations_reg_form($registration);
                    $template_args['registrations'][ $registration->reg_url_link() ]    = $registration;
                    $template_args['ticket_count'][ $registration->ticket()->ID() ]     = isset(
                        $template_args['ticket_count'][ $registration->ticket()->ID() ]
                    )
                        ? $template_args['ticket_count'][ $registration->ticket()->ID() ] + 1
                        : 1;
                    $ticket_line_item                                                   =
                        EEH_Line_Item::get_line_items_by_object_type_and_IDs(
                            $this->checkout->cart->get_grand_total(),
                            'Ticket',
                            [$registration->ticket()->ID()]
                        );
                    $ticket_line_item                                                   = is_array($ticket_line_item)
                        ? reset($ticket_line_item)
                        : $ticket_line_item;
                    $template_args['ticket_line_item'][ $registration->ticket()->ID() ] =
                        $Line_Item_Display->display_line_item($ticket_line_item);
                    if ($registration->is_primary_registrant()) {
                        $primary_registrant = $registration->reg_url_link();
                    }
                }
            }

            if ($primary_registrant && count($registrations) > 1) {
                $copy_options['spco_copy_attendee_chk'] = $this->_print_copy_info
                    ? $this->_copy_attendee_info_form()
                    : $this->_auto_copy_attendee_info();
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
        $this->_template = $this->reg_form_count > 1
            ? SPCO_REG_STEPS_PATH . $this->_slug . '/attendee_info_main.template.php'
            : SPCO_REG_STEPS_PATH . $this->_slug . '/attendee_info_single.template.php';

        return new EE_Form_Section_Proper(
            [
                'name'            => $this->reg_form_name(),
                'html_id'         => $this->reg_form_name(),
                'subsections'     => $subsections,
                'layout_strategy' => new EE_Template_Layout(
                    [
                        'layout_template_file' => $this->_template, // layout_template
                        'template_args'        => $template_args,
                    ]
                ),
            ]
        );
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
    private function _registrations_reg_form(EE_Registration $registration)
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
                            'QSG_deleted'  => false
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
                    'html_style'      => $this->checkout->admin_request
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
                        $form_args['subsections'][ $question_group->identifier() ] = $this->_question_group_reg_form(
                            $registration,
                            $question_group
                        );
                    }
                }
                // add hidden input
                $form_args['subsections']['additional_attendee_reg_info'] = $this->_additional_attendee_reg_info_input(
                    $registration
                );

                /**
                 * @var $reg_config EE_Registration_Config
                 */
                $reg_config = LoaderFactory::getLoader()->getShared('EE_Registration_Config');

                // If we have question groups for additional attendees, then display the copy options
                $this->_print_copy_info = apply_filters(
                    'FHEE__EE_SPCO_Reg_Step_Attendee_Information___registrations_reg_form___printCopyInfo',
                    $attendee_nmbr > 1 && $reg_config->copyAttendeeInfo(),
                    $attendee_nmbr
                );

                if ($registration->is_primary_registrant()) {
                    // generate hidden input
                    $form_args['subsections']['primary_registrant'] = $this->_additional_primary_registrant_inputs(
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
     * @param bool            $additional_attendee_reg_info
     * @return EE_Form_Input_Base
     * @throws EE_Error
     */
    private function _additional_attendee_reg_info_input(
        EE_Registration $registration,
        $additional_attendee_reg_info = true
    ) {
        // generate hidden input
        return new EE_Hidden_Input(
            [
                'html_id' => 'additional-attendee-reg-info-' . $registration->reg_url_link(),
                'default' => $additional_attendee_reg_info,
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
    private function _question_group_reg_form(EE_Registration $registration, EE_Question_Group $question_group)
    {
        // array of params to pass to parent constructor
        $form_args = [
            'html_id'         => 'ee-reg-form-qstn-grp-' . $question_group->identifier() . '-' . $registration->ID(),
            'html_class'      => $this->checkout->admin_request
                ? 'form-table ee-reg-form-qstn-grp-dv'
                : 'ee-reg-form-qstn-grp-dv',
            'html_label_id'   => 'ee-reg-form-qstn-grp-' . $question_group->identifier() . '-'
                                 . $registration->ID() . '-lbl',
            'subsections'     => [
                'reg_form_qstn_grp_hdr' => $this->_question_group_header($question_group),
            ],
            'layout_strategy' => $this->checkout->admin_request
                ? new EE_Admin_Two_Column_Layout()
                : new EE_Div_Per_Section_Layout(),
        ];
        // where params
        $query_params = ['QST_deleted' => 0];
        // don't load admin only questions on the frontend
        if (! $this->checkout->admin_request) {
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
                $form_args['subsections'][ $identifier ] = $this->reg_form_question($registration, $question);
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
    private function _question_group_header(EE_Question_Group $question_group)
    {
        $html = '';
        // group_name
        if ($question_group->show_group_name() && $question_group->name() !== '') {
            if ($this->checkout->admin_request) {
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
                $this->checkout->admin_request
                    ? 'ee-reg-form-qstn-grp-desc-pg'
                    : 'ee-reg-form-qstn-grp-desc-pg small-text lt-grey-text'
            );
        }
        return new EE_Form_Section_HTML($html);
    }


    /**
     * @return    EE_Form_Section_Proper
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    private function _copy_attendee_info_form()
    {
        // array of params to pass to parent constructor
        return new EE_Form_Section_Proper(
            [
                'subsections'     => $this->_copy_attendee_info_inputs(),
                'layout_strategy' => new EE_Template_Layout(
                    [
                        'layout_template_file'     => SPCO_REG_STEPS_PATH
                                                      . $this->_slug
                                                      . '/copy_attendee_info.template.php',
                        'begin_template_file'      => null,
                        'input_template_file'      => null,
                        'subsection_template_file' => null,
                        'end_template_file'        => null,
                    ]
                ),
            ]
        );
    }


    /**
     * @return EE_Form_Section_HTML
     * @throws DomainException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    private function _auto_copy_attendee_info()
    {
        return new EE_Form_Section_HTML(
            EEH_Template::locate_template(
                SPCO_REG_STEPS_PATH . $this->_slug . '/_auto_copy_attendee_info.template.php',
                apply_filters(
                    'FHEE__EE_SPCO_Reg_Step_Attendee_Information__auto_copy_attendee_info__template_args',
                    []
                )
            )
        );
    }


    /**
     * @return array
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    private function _copy_attendee_info_inputs()
    {
        $copy_attendee_info_inputs = [];
        $prev_ticket               = null;
        // grab the saved registrations from the transaction
        $registrations = $this->checkout->transaction->registrations($this->checkout->reg_cache_where_params);
        foreach ($registrations as $registration) {
            // for all  attendees other than the primary attendee
            if ($registration instanceof EE_Registration && ! $registration->is_primary_registrant()) {
                // if this is a new ticket OR if this is the very first additional attendee after the primary attendee
                if ($registration->ticket()->ID() !== $prev_ticket) {
                    $item_name                          = $registration->ticket()->name();
                    $item_name                          .= $registration->ticket()->description() !== ''
                        ? ' - ' . $registration->ticket()->description()
                        : '';
                    $copy_attendee_info_inputs[ 'spco_copy_attendee_chk[ticket-'
                                                . $registration->ticket()->ID()
                                                . ']' ] =
                        new EE_Form_Section_HTML(
                            '<h6 class="spco-copy-attendee-event-hdr">' . $item_name . '</h6>'
                        );
                    $prev_ticket                        = $registration->ticket()->ID();
                }

                $copy_attendee_info_inputs[ 'spco_copy_attendee_chk[' . $registration->ID() . ']' ] =
                    new EE_Checkbox_Multi_Input(
                        [
                            $registration->ID() => sprintf(
                                esc_html_x('Attendee #%s', 'Attendee #123', 'event_espresso'),
                                $registration->count()
                            ),
                        ],
                        [
                            'html_id'                 => 'spco-copy-attendee-chk-' . $registration->reg_url_link(),
                            'html_class'              => 'spco-copy-attendee-chk ee-do-not-validate',
                            'display_html_label_text' => false,
                        ]
                    );
            }
        }
        return $copy_attendee_info_inputs;
    }


    /**
     * @param EE_Registration $registration
     * @return    EE_Form_Input_Base
     * @throws EE_Error
     */
    private function _additional_primary_registrant_inputs(EE_Registration $registration)
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
    public function reg_form_question(EE_Registration $registration, EE_Question $question)
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
        return $this->_generate_question_input($registration, $question, $answer);
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
    private function _generate_question_input(EE_Registration $registration, EE_Question $question, $answer)
    {
        $identifier                               = $question->is_system_question()
            ? $question->system_ID()
            : $question->ID();
        $this->_required_questions[ $identifier ] = $question->required();
        add_filter(
            'FHEE__EE_Question__generate_form_input__country_options',
            [$this, 'use_cached_countries_for_form_input'],
            10,
            4
        );
        add_filter(
            'FHEE__EE_Question__generate_form_input__state_options',
            [$this, 'use_cached_states_for_form_input'],
            10,
            4
        );
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


    /**
     * Gets the list of countries for the form input
     *
     * @param array|null      $countries_list
     * @param EE_Question     $question
     * @param EE_Registration $registration
     * @param EE_Answer       $answer
     * @return array 2d keys are country IDs, values are their names
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function use_cached_countries_for_form_input(
        $countries_list,
        EE_Question $question = null,
        EE_Registration $registration = null,
        EE_Answer $answer = null
    ) {
        $country_options = ['' => ''];
        // get possibly cached list of countries
        $countries = $this->checkout->action === 'process_reg_step'
            ? EEM_Country::instance()->get_all_countries()
            : EEM_Country::instance()->get_all_active_countries();
        if (! empty($countries)) {
            foreach ($countries as $country) {
                if ($country instanceof EE_Country) {
                    $country_options[ $country->ID() ] = $country->name();
                }
            }
        }
        if ($question instanceof EE_Question && $registration instanceof EE_Registration) {
            $answer = EEM_Answer::instance()->get_one(
                [['QST_ID' => $question->ID(), 'REG_ID' => $registration->ID()]]
            );
        } else {
            $answer = EE_Answer::new_instance();
        }
        return apply_filters(
            'FHEE__EE_SPCO_Reg_Step_Attendee_Information___generate_question_input__country_options',
            $country_options,
            $this,
            $registration,
            $question,
            $answer
        );
    }


    /**
     * Gets the list of states for the form input
     *
     * @param array|null      $states_list
     * @param EE_Question     $question
     * @param EE_Registration $registration
     * @param EE_Answer       $answer
     * @return array 2d keys are state IDs, values are their names
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function use_cached_states_for_form_input(
        $states_list,
        EE_Question $question = null,
        EE_Registration $registration = null,
        EE_Answer $answer = null
    ) {
        $state_options = ['' => ['' => '']];
        $states        = $this->checkout->action === 'process_reg_step'
            ? EEM_State::instance()->get_all_states()
            : EEM_State::instance()->get_all_active_states();
        if (! empty($states)) {
            foreach ($states as $state) {
                if ($state instanceof EE_State) {
                    $state_options[ $state->country()->name() ][ $state->ID() ] = $state->name();
                }
            }
        }
        return apply_filters(
            'FHEE__EE_SPCO_Reg_Step_Attendee_Information___generate_question_input__state_options',
            $state_options,
            $this,
            $registration,
            $question,
            $answer
        );
    }


    /********************************************************************************************************/
    /****************************************  PROCESS REG STEP  ****************************************/
    /********************************************************************************************************/


    /**
     * @return bool
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws RuntimeException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function process_reg_step()
    {
        do_action('AHEE_log', __FILE__, __FUNCTION__, '');
        // grab validated data from form
        $valid_data = $this->checkout->current_step->valid_data();
        // if we don't have any $valid_data then something went TERRIBLY WRONG !!!
        if (empty($valid_data)) {
            EE_Error::add_error(
                esc_html__('No valid question responses were received.', 'event_espresso'),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            return false;
        }
        if (! $this->checkout->transaction instanceof EE_Transaction || ! $this->checkout->continue_reg) {
            EE_Error::add_error(
                esc_html__(
                    'A valid transaction could not be initiated for processing your registrations.',
                    'event_espresso'
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            return false;
        }
        // get cached registrations
        $registrations = $this->checkout->transaction->registrations($this->checkout->reg_cache_where_params);
        // verify we got the goods
        if (empty($registrations)) {
            // combine the old translated string with a new one, in order to not break translations
            $error_message = esc_html__(
                'Your form data could not be applied to any valid registrations.',
                'event_espresso'
            )
            . sprintf(
                esc_html_x(
                    '%3$sThis can sometimes happen if too much time has been taken to complete the registration process.%3$sPlease return to the %1$sEvent List%2$s and reselect your tickets. If the problem continues, please contact the site administrator.',
                    '(line break)This can sometimes happen if too much time has been taken to complete the registration process.(line break)Please return to the (link)Event List(end link) and reselect your tickets. If the problem continues, please contact the site administrator.',
                    'event_espresso'
                ),
                '<a href="' . get_post_type_archive_link('espresso_events') . '" >',
                '</a>',
                '<br />'
            );
            EE_Error::add_error(
                $error_message,
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            return false;
        }
        // extract attendee info from form data and save to model objects
        $registrations_processed = $this->_process_registrations($registrations, $valid_data);
        // if first pass thru SPCO,
        // then let's check processed registrations against the total number of tickets in the cart
        if ($registrations_processed === false) {
            // but return immediately if the previous step exited early due to errors
            return false;
        }
        if (! $this->checkout->revisit && $registrations_processed !== $this->checkout->total_ticket_count) {
            // generate a correctly translated string for all possible singular/plural combinations
            if ($this->checkout->total_ticket_count === 1 && $registrations_processed !== 1) {
                $error_msg = sprintf(
                    esc_html_x(
                        'There was %1$d ticket in the Event Queue, but %2$ds registrations were processed',
                        'There was 1 ticket in the Event Queue, but 2 registrations were processed',
                        'event_espresso'
                    ),
                    $this->checkout->total_ticket_count,
                    $registrations_processed
                );
            } elseif ($this->checkout->total_ticket_count !== 1 && $registrations_processed === 1) {
                $error_msg = sprintf(
                    esc_html_x(
                        'There was a total of %1$d tickets in the Event Queue, but only %2$ds registration was processed',
                        'There was a total of 2 tickets in the Event Queue, but only 1 registration was processed',
                        'event_espresso'
                    ),
                    $this->checkout->total_ticket_count,
                    $registrations_processed
                );
            } else {
                $error_msg = sprintf(
                    esc_html__(
                        'There was a total of 2 tickets in the Event Queue, but 2 registrations were processed',
                        'event_espresso'
                    ),
                    $this->checkout->total_ticket_count,
                    $registrations_processed
                );
            }
            EE_Error::add_error($error_msg, __FILE__, __FUNCTION__, __LINE__);
            return false;
        }
        // mark this reg step as completed
        $this->set_completed();
        $this->_set_success_message(
            esc_html__('The Attendee Information Step has been successfully completed.', 'event_espresso')
        );
        // do action in case a plugin wants to do something with the data submitted in step 1.
        // passes EE_Single_Page_Checkout, and it's posted data
        do_action('AHEE__EE_Single_Page_Checkout__process_attendee_information__end', $this, $valid_data);
        return true;
    }


    /**
     *    _process_registrations
     *
     * @param EE_Registration[] $registrations
     * @param array[][]         $valid_data
     * @return bool|int
     * @throws EntityNotFoundException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws RuntimeException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    private function _process_registrations($registrations = [], $valid_data = [])
    {
        // load resources and set some defaults
        EE_Registry::instance()->load_model('Attendee');
        // holder for primary registrant attendee object
        $this->checkout->primary_attendee_obj = null;
        // array for tracking reg form data for the primary registrant
        $primary_registrant = [
            'line_item_id' => null,
        ];
        $copy_primary       = false;
        // reg form sections that do not contain inputs
        $non_input_form_sections = [
            'primary_registrant',
            'additional_attendee_reg_info',
            'spco_copy_attendee_chk',
        ];
        // attendee counter
        $att_nmbr = 0;
        // grab the saved registrations from the transaction
        foreach ($registrations as $registration) {
            // verify EE_Registration object
            if (! $registration instanceof EE_Registration) {
                EE_Error::add_error(
                    esc_html__(
                        'An invalid Registration object was discovered when attempting to process your registration information.',
                        'event_espresso'
                    ),
                    __FILE__,
                    __FUNCTION__,
                    __LINE__
                );
                return false;
            }
            $reg_url_link = $registration->reg_url_link();
            // reg_url_link exists ?
            if (! empty($reg_url_link)) {
                // should this registration be processed during this visit ?
                if ($this->checkout->visit_allows_processing_of_this_registration($registration)) {
                    // if NOT revisiting, then let's save the registration now,
                    // so that we have a REG_ID to use when generating other objects
                    if (! $this->checkout->revisit) {
                        $registration->save();
                    }
                    /**
                     * This allows plugins to trigger a fail on processing of a
                     * registration for any conditions they may have for it to pass.
                     *
                     * @var bool   if true is returned by the plugin then the
                     *            registration processing is halted.
                     */
                    if (
                        apply_filters(
                            'FHEE__EE_SPCO_Reg_Step_Attendee_Information___process_registrations__pre_registration_process',
                            false,
                            $att_nmbr,
                            $registration,
                            $registrations,
                            $valid_data,
                            $this
                        )
                    ) {
                        return false;
                    }

                    // Houston, we have a registration!
                    $att_nmbr++;
                    $this->_attendee_data[ $reg_url_link ] = [];
                    // grab any existing related answer objects
                    $this->_registration_answers = $registration->answers();
                    // unset( $valid_data[ $reg_url_link ]['additional_attendee_reg_info'] );
                    if (isset($valid_data[ $reg_url_link ])) {
                        // do we need to copy basic info from primary attendee ?
                        $copy_primary = isset($valid_data[ $reg_url_link ]['additional_attendee_reg_info'])
                                        && absint($valid_data[ $reg_url_link ]['additional_attendee_reg_info']) === 0;
                        // filter form input data for this registration
                        $valid_data[ $reg_url_link ] = (array) apply_filters(
                            'FHEE__EE_Single_Page_Checkout__process_attendee_information__valid_data_line_item',
                            $valid_data[ $reg_url_link ]
                        );
                        if (isset($valid_data['primary_attendee'])) {
                            $primary_registrant['line_item_id'] = ! empty($valid_data['primary_attendee'])
                                ? $valid_data['primary_attendee']
                                : false;
                            unset($valid_data['primary_attendee']);
                        }
                        // now loop through our array of valid post data && process attendee reg forms
                        foreach ($valid_data[ $reg_url_link ] as $form_section => $form_inputs) {
                            if (! in_array($form_section, $non_input_form_sections, true)) {
                                foreach ($form_inputs as $form_input => $input_value) {
                                    // check for critical inputs
                                    if (
                                        ! $this->_verify_critical_attendee_details_are_set_and_validate_email(
                                            $form_input,
                                            $input_value
                                        )
                                    ) {
                                        return false;
                                    }
                                    // store a bit of data about the primary attendee
                                    if (
                                        $att_nmbr === 1
                                        && ! empty($input_value)
                                        && $reg_url_link === $primary_registrant['line_item_id']
                                    ) {
                                        $primary_registrant[ $form_input ] = $input_value;
                                    } elseif (
                                        $copy_primary
                                              && $input_value === null
                                              && isset($primary_registrant[ $form_input ])
                                    ) {
                                        $input_value = $primary_registrant[ $form_input ];
                                    }
                                    // now attempt to save the input data
                                    if (
                                        ! $this->_save_registration_form_input(
                                            $registration,
                                            $form_input,
                                            $input_value
                                        )
                                    ) {
                                        EE_Error::add_error(
                                            sprintf(
                                                esc_html_x(
                                                    'Unable to save registration form data for the form input: "%1$s" with the submitted value: "%2$s"',
                                                    'Unable to save registration form data for the form input: "form input name" with the submitted value: "form input value"',
                                                    'event_espresso'
                                                ),
                                                $form_input,
                                                $input_value
                                            ),
                                            __FILE__,
                                            __FUNCTION__,
                                            __LINE__
                                        );
                                        return false;
                                    }
                                }
                            }
                        }  // end of foreach ( $valid_data[ $reg_url_link ] as $form_section => $form_inputs )
                    }
                    // this registration does not require additional attendee information ?
                    if (
                        $copy_primary
                        && $att_nmbr > 1
                        && $this->checkout->primary_attendee_obj instanceof EE_Attendee
                    ) {
                        // just copy the primary registrant
                        $attendee = $this->checkout->primary_attendee_obj;
                    } else {
                        // ensure critical details are set for additional attendees
                        $this->_attendee_data[ $reg_url_link ] = $att_nmbr > 1
                            ? $this->_copy_critical_attendee_details_from_primary_registrant(
                                $this->_attendee_data[ $reg_url_link ]
                            )
                            : $this->_attendee_data[ $reg_url_link ];
                        // execute create attendee command (which may return an existing attendee)
                        $attendee = EE_Registry::instance()->BUS->execute(
                            new CreateAttendeeCommand(
                                $this->_attendee_data[ $reg_url_link ],
                                $registration
                            )
                        );
                        // who's #1 ?
                        if ($att_nmbr === 1) {
                            $this->checkout->primary_attendee_obj = $attendee;
                        }
                    }
                    // add relation to registration, set attendee ID, and cache attendee
                    $this->_associate_attendee_with_registration($registration, $attendee);
                    if (! $registration->attendee() instanceof EE_Attendee) {
                        EE_Error::add_error(
                            sprintf(
                                esc_html_x(
                                    'Registration %s has an invalid or missing Attendee object.',
                                    'Registration 123-456-789 has an invalid or missing Attendee object.',
                                    'event_espresso'
                                ),
                                $reg_url_link
                            ),
                            __FILE__,
                            __FUNCTION__,
                            __LINE__
                        );
                        return false;
                    }
                    /** @type EE_Registration_Processor $registration_processor */
                    $registration_processor = EE_Registry::instance()->load_class('Registration_Processor');
                    // at this point, we should have enough details about the registrant to consider the registration
                    // NOT incomplete
                    $registration_processor->toggle_incomplete_registration_status_to_default(
                        $registration,
                        false,
                        new Context(
                            'spco_reg_step_attendee_information_process_registrations',
                            esc_html__(
                                'Finished populating registration with details from the registration form after submitting the Attendee Information Reg Step.',
                                'event_espresso'
                            )
                        )
                    );
                    // we can also consider the TXN to not have been failed, so temporarily upgrade it's status to
                    // abandoned
                    $this->checkout->transaction->toggle_failed_transaction_status();
                    // if we've gotten this far, then let's save what we have
                    $registration->save();
                    // add relation between TXN and registration
                    $this->_associate_registration_with_transaction($registration);
                }
            } else {
                EE_Error::add_error(
                    esc_html__(
                        'An invalid or missing line item ID was encountered while attempting to process the registration form.',
                        'event_espresso'
                    ),
                    __FILE__,
                    __FUNCTION__,
                    __LINE__
                );
                // remove malformed data
                unset($valid_data[ $reg_url_link ]);
                return false;
            }
        } // end of foreach ( $this->checkout->transaction->registrations()  as $registration )
        return $att_nmbr;
    }


    /**
     *    _save_registration_form_input
     *
     * @param EE_Registration $registration
     * @param string          $form_input
     * @param string          $input_value
     * @return bool
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    private function _save_registration_form_input(
        EE_Registration $registration,
        $form_input = '',
        $input_value = ''
    ) {
        // If email_confirm is sent it's not saved
        if ((string) $form_input === 'email_confirm') {
            return true;
        }

        // allow for plugins to hook in and do their own processing of the form input.
        // For plugins to bypass normal processing here, they just need to return a boolean value.
        if (
            apply_filters(
                'FHEE__EE_SPCO_Reg_Step_Attendee_Information___save_registration_form_input',
                false,
                $registration,
                $form_input,
                $input_value,
                $this
            )
        ) {
            return true;
        }
        /*
         * $answer_cache_id is the key used to find the EE_Answer we want
         * @see https://events.codebasehq.com/projects/event-espresso/tickets/10477
         */
        $answer_cache_id = $this->checkout->reg_url_link
            ? $form_input . '-' . $registration->reg_url_link()
            : (string) $form_input;
        $answer_is_obj   = isset($this->_registration_answers[ $answer_cache_id ])
                           && $this->_registration_answers[ $answer_cache_id ] instanceof EE_Answer;
        // rename form_inputs if they are EE_Attendee properties
        switch ((string) $form_input) {
            case 'state':
            case 'STA_ID':
                $attendee_property = true;
                $form_input        = 'STA_ID';
                break;

            case 'country':
            case 'CNT_ISO':
                $attendee_property = true;
                $form_input        = 'CNT_ISO';
                break;

            default:
                $ATT_input = 'ATT_' . $form_input;
                $attendee_property = EEM_Attendee::instance()->has_field($ATT_input);
                $form_input        = $attendee_property ? 'ATT_' . $form_input : $form_input;
        }
        // if this form input has a corresponding attendee property
        if ($attendee_property) {
            $this->_attendee_data[ $registration->reg_url_link() ][ $form_input ] = $input_value;
            if ($answer_is_obj) {
                // and delete the corresponding answer since we won't be storing this data in that object
                $registration->_remove_relation_to($this->_registration_answers[ $answer_cache_id ], 'Answer');
                $this->_registration_answers[ $answer_cache_id ]->delete_permanently();
            }
            return true;
        }
        if ($answer_is_obj) {
            // save this data to the answer object
            $this->_registration_answers[ $answer_cache_id ]->set_value($input_value);
            $result = $this->_registration_answers[ $answer_cache_id ]->save();
            return $result !== false;
        }
        foreach ($this->_registration_answers as $answer) {
            if ($answer instanceof EE_Answer && (string) $answer->question_ID() === $answer_cache_id) {
                $answer->set_value($input_value);
                $result = $answer->save();
                return $result !== false;
            }
        }
        return false;
    }


    /**
     *    _verify_critical_attendee_details_are_set
     *
     * @param string $form_input
     * @param string $input_value
     * @return boolean
     */
    private function _verify_critical_attendee_details_are_set_and_validate_email(
        $form_input = '',
        $input_value = ''
    ) {
        if (empty($input_value)) {
            // if the form input isn't marked as being required, then just return
            if (! isset($this->_required_questions[ $form_input ]) || ! $this->_required_questions[ $form_input ]) {
                return true;
            }
            switch ($form_input) {
                case 'fname':
                    EE_Error::add_error(
                        esc_html__('First Name is a required value.', 'event_espresso'),
                        __FILE__,
                        __FUNCTION__,
                        __LINE__
                    );
                    return false;
                case 'lname':
                    EE_Error::add_error(
                        esc_html__('Last Name is a required value.', 'event_espresso'),
                        __FILE__,
                        __FUNCTION__,
                        __LINE__
                    );
                    return false;
                case 'email':
                    EE_Error::add_error(
                        esc_html__('Please enter a valid email address.', 'event_espresso'),
                        __FILE__,
                        __FUNCTION__,
                        __LINE__
                    );
                    return false;
            }
        }
        return true;
    }


    /**
     *    _associate_attendee_with_registration
     *
     * @param EE_Registration $registration
     * @param EE_Attendee     $attendee
     * @return void
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws RuntimeException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    private function _associate_attendee_with_registration(EE_Registration $registration, EE_Attendee $attendee)
    {
        // add relation to attendee
        $registration->_add_relation_to($attendee, 'Attendee');
        $registration->set_attendee_id($attendee->ID());
        $registration->update_cache_after_object_save('Attendee', $attendee);
    }


    /**
     *    _associate_registration_with_transaction
     *
     * @param EE_Registration $registration
     * @return void
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    private function _associate_registration_with_transaction(EE_Registration $registration)
    {
        // add relation to registration
        $this->checkout->transaction->_add_relation_to($registration, 'Registration');
        $this->checkout->transaction->update_cache_after_object_save('Registration', $registration);
    }


    /**
     *    _copy_critical_attendee_details_from_primary_registrant
     *    ensures that all attendees at least have data for first name, last name, and email address
     *
     * @param array $attendee_data
     * @return array
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    private function _copy_critical_attendee_details_from_primary_registrant($attendee_data = [])
    {
        // bare minimum critical details include first name, last name, email address
        $critical_attendee_details = ['ATT_fname', 'ATT_lname', 'ATT_email'];
        // add address info to critical details?
        if (
            apply_filters(
                'FHEE__EE_SPCO_Reg_Step_Attendee_Information__merge_address_details_with_critical_attendee_details',
                false
            )
        ) {
            $address_details           = [
                'ATT_address',
                'ATT_address2',
                'ATT_city',
                'STA_ID',
                'CNT_ISO',
                'ATT_zip',
                'ATT_phone',
            ];
            $critical_attendee_details = array_merge($critical_attendee_details, $address_details);
        }
        foreach ($critical_attendee_details as $critical_attendee_detail) {
            if (
                ! isset($attendee_data[ $critical_attendee_detail ])
                || empty($attendee_data[ $critical_attendee_detail ])
            ) {
                $attendee_data[ $critical_attendee_detail ] = $this->checkout->primary_attendee_obj->get(
                    $critical_attendee_detail
                );
            }
        }
        return $attendee_data;
    }


    /**
     *    update_reg_step
     *    this is the final step after a user  revisits the site to edit their attendee information
     *    this gets called AFTER the process_reg_step() method above
     *
     * @return bool
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws RuntimeException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function update_reg_step()
    {
        // save everything
        if ($this->process_reg_step()) {
            $this->checkout->redirect     = true;
            $this->checkout->redirect_url = add_query_arg(
                [
                    'e_reg_url_link' => $this->checkout->reg_url_link,
                    'revisit'        => true,
                ],
                $this->checkout->thank_you_page_url
            );
            $this->checkout->json_response->set_redirect_url($this->checkout->redirect_url);
            return true;
        }
        return false;
    }
}
