<?php

namespace EventEspresso\core\domain\services\registration\form\v1;

use DomainException;
use EE_Checkbox_Multi_Input;
use EE_Error;
use EE_Form_Input_Base;
use EE_Form_Section_HTML;
use EE_Form_Section_Proper;
use EE_Line_Item_Display;
use EE_Question;
use EE_Registration;
use EE_Registration_Config;
use EE_SPCO_Reg_Step_Attendee_Information;
use EE_Template_Layout;
use EEH_Autoloader;
use EEH_Line_Item;
use EventEspresso\core\exceptions\EntityNotFoundException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;
use InvalidArgumentException;
use ReflectionException;

/**
 * Class RegForm
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\domain\services\registration\form
 * @since   $VID:$
 */
class RegForm extends EE_Form_Section_Proper
{

    /**
     * @var bool
     */
    private $print_copy_info = false;

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
    private $template_args = [];


    /**
     * RegForm constructor.
     *
     * @param EE_SPCO_Reg_Step_Attendee_Information $reg_step
     * @param EE_Registration_Config                $reg_config
     * @throws ReflectionException
     * @throws EE_Error
     */
    public function __construct(
        EE_SPCO_Reg_Step_Attendee_Information $reg_step,
        EE_Registration_Config $reg_config
    ) {
        $this->reg_step   = $reg_step;
        $this->reg_config = $reg_config;
        LoaderFactory::getShared(CountryOptions::class, [$this->reg_step->checkout->action]);
        LoaderFactory::getShared(StateOptions::class, [$this->reg_step->checkout->action]);
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
     * @return void
     */
    public function enablePrintCopyInfo(): void
    {
        $this->print_copy_info = true;
    }


    /**
     * @return int
     */
    public function regFormCount(): int
    {
        return $this->reg_form_count;
    }


    /**
     * @param EE_Registration $registration
     * @param EE_Question     $question
     * @return EE_Form_Input_Base
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function regFormQuestion(EE_Registration $registration, EE_Question $question): EE_Form_Input_Base
    {
        /** @var RegFormQuestionFactory $reg_form_question_factory */
        $reg_form_question_factory = LoaderFactory::getShared(RegFormQuestionFactory::class);
        return $reg_form_question_factory->create($registration, $question);
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
    private function generateSubsections(): array
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
        $registrations = $this->reg_step->checkout->transaction->registrations(
            $this->reg_step->checkout->reg_cache_where_params
        );
        if ($registrations) {
            foreach ($registrations as $registration) {
                // can this registration be processed during this visit ?
                if (
                    $registration instanceof EE_Registration
                    && $this->reg_step->checkout->visit_allows_processing_of_this_registration($registration)
                ) {
                    $reg_url_link = $registration->reg_url_link();
                    /** @var RegistrationForm $registrant_form */
                    $registrant_form = LoaderFactory::getNew(
                        RegistrationForm::class,
                        [
                            $registration,
                            $this->reg_step->checkout->admin_request,
                            $this->reg_config->copyAttendeeInfo(),
                            [$this, 'enablePrintCopyInfo'],
                        ]
                    );
                    // Increment the reg forms number if form is valid.
                    if ($registrant_form->hasQuestions()) {
                        $this->reg_form_count++;
                        $subsections[ $reg_url_link ] = $registrant_form;
                    } else {
                        // or just add a blank section if there are no questions
                        $subsections[ $reg_url_link ] = new EE_Form_Section_HTML();
                    }

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
                    ? new CopyAttendeeInfoForm($registrations, $this->reg_step->slug())
                    : new AutoCopyAttendeeInfoForm($this->reg_step->slug());
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
}
