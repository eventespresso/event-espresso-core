<?php

namespace EventEspresso\core\domain\services\registration\form\v1;

use DomainException;
use EE_Error;
use EE_Form_Section_HTML;
use EE_Form_Section_Proper;
use EE_Line_Item;
use EE_Line_Item_Display;
use EE_No_Layout;
use EE_Registration;
use EE_Registration_Config;
use EE_SPCO_Reg_Step_Attendee_Information;
use EEH_Autoloader;
use EEH_HTML;
use EventEspresso\core\domain\services\registration\form\utilities\CountryOptions;
use EventEspresso\core\domain\services\registration\form\utilities\StateOptions;
use EventEspresso\core\domain\services\registration\form\v1\subsections\AttendeeInformationNotice;
use EventEspresso\core\domain\services\registration\form\v1\subsections\AttendeePanelForm;
use EventEspresso\core\domain\services\registration\form\v1\subsections\AutoCopyAttendeeInfoForm;
use EventEspresso\core\domain\services\registration\form\v1\subsections\CopyAttendeeInfoForm;
use EventEspresso\core\domain\services\registration\form\v1\subsections\EventHeader;
use EventEspresso\core\domain\services\registration\form\v1\subsections\PrivacyConsentCheckboxForm;
use EventEspresso\core\domain\services\registration\form\v1\subsections\AttendeeRegForm;
use EventEspresso\core\domain\services\registration\form\v1\subsections\TicketDetailsTable;
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
 * @since   5.0.0.p
 */
class RegForm extends EE_Form_Section_Proper
{
    private EE_Line_Item_Display $line_item_display;

    private string $primary_registrant = '';

    private array $required_questions = [];

    private array $subsections = [];


    private bool $print_copy_info = false;

    protected int $reg_form_count = 0;

    public EE_Registration_Config $reg_config;

    public EE_SPCO_Reg_Step_Attendee_Information $reg_step;


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
        // setup some classes so that they are ready for loading during construction of other classes
        LoaderFactory::getShared(CountryOptions::class, [$this->reg_step->checkout->action]);
        LoaderFactory::getShared(StateOptions::class, [$this->reg_step->checkout->action]);
        LoaderFactory::getShared(RegFormQuestionFactory::class, [[$this, 'addRequiredQuestion']]);
        parent::__construct(
            [
                'name'            => $this->reg_step->reg_form_name(),
                'html_id'         => $this->reg_step->reg_form_name(),
                'layout_strategy' => new EE_No_Layout(),
                'subsections'     => $this->generateSubsections(),
            ]
        );
    }


    /**
     * @return void
     */
    public function enablePrintCopyInfo(): void
    {
        $this->print_copy_info = true;
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
     * @param string $identifier
     * @param string $required_question
     */
    public function addRequiredQuestion(string $identifier, string $required_question): void
    {
        $this->required_questions[ $identifier ] = $required_question;
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
        $this->configureLineItemDisplay();
        $this->addAttendeeInformationNotice();

        // grab the saved registrations from the transaction
        $registrations = $this->reg_step->checkout->transaction->registrations(
            $this->reg_step->checkout->reg_cache_where_params
        );
        if ($registrations) {
            foreach ($registrations as $registration) {
                if (! $registration instanceof EE_Registration) {
                    continue;
                }
                $this->addAttendeeRegForm($registration);
            }
            $this->addCopyAttendeeInfoForm($registrations);
        }
        $this->addPrivacyConsentCheckbox();
        $this->displayEventQuestionsLink();
        $this->subsections['default_hidden_inputs']  =  $this->reg_step->reg_step_hidden_inputs();

        return (array) apply_filters(
            'FHEE__EventEspresso_core_domain_services_registration_form_v1_RegForm__generateSubsections__subsections',
            $this->subsections,
            $this
        );
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function configureLineItemDisplay()
    {
        // autoload Line_Item_Display classes
        EEH_Autoloader::register_line_item_display_autoloaders();
        $this->line_item_display = new EE_Line_Item_Display();
        // calculate taxes
        $this->line_item_display->display_line_item(
            $this->reg_step->checkout->cart->get_grand_total(),
            ['set_tax_rate' => true]
        );
    }


    private function addAttendeeInformationNotice(): void
    {
        if (is_admin()) {
            return;
        }
        $this->subsections['attendee_information_notice'] = new AttendeeInformationNotice();
    }


    /**
     * @param EE_Registration $registration
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function addAttendeeRegForm(EE_Registration $registration): void
    {
        // can this registration be processed during this visit ?
        if (! $this->reg_step->checkout->visit_allows_processing_of_this_registration($registration)) {
            return;
        }
        $reg_url_link = $registration->reg_url_link();
        if ($registration->is_primary_registrant()) {
            $this->primary_registrant = $reg_url_link;
        }

        /** @var AttendeeRegForm $registrant_form */
        $registrant_form = LoaderFactory::getNew(
            AttendeeRegForm::class,
            [
                $registration,
                $this->reg_config->copyAttendeeInfo(),
                [$this, 'enablePrintCopyInfo'],
                $this->reg_step,
            ]
        );

        // skip section if there are no questions
        if (! $registrant_form->hasQuestions()) {
            return;
        }

        // but increment the reg form count if form is valid.
        $this->reg_form_count++;
        $this->subsections["panel-div-open-$reg_url_link"]  = new EE_Form_Section_HTML(
            EEH_HTML::div(
                '',
                "spco-attendee-panel-dv-$reg_url_link",
                "spco-attendee-panel-dv spco-attendee-ticket-$reg_url_link"
            )
        );
        $this->subsections["event-header-$reg_url_link"]    = new EventHeader($registration->event());
        $this->subsections["ticket-details-$reg_url_link"]  = new TicketDetailsTable(
            $this->reg_step->checkout->cart->get_grand_total(),
            $this->line_item_display,
            $registration->ticket(),
            $this->reg_step->checkout->revisit
        );
        $this->subsections[ $reg_url_link ]                 = $registrant_form;
        $this->subsections["panel-div-close-$reg_url_link"] = new EE_Form_Section_HTML(
            EEH_HTML::divx("spco-attendee-panel-dv-$reg_url_link")
        );
    }


    /**
     * @throws ReflectionException
     * @throws EE_Error
     */
    private function addCopyAttendeeInfoForm(array $registrations)
    {
        if (
            $this->primary_registrant
            && count($registrations) > 1
            && isset($this->subsections[ $this->primary_registrant ])
            && $this->subsections[ $this->primary_registrant ] instanceof EE_Form_Section_Proper
        ) {
            $this->subsections[ $this->primary_registrant ]->add_subsections(
                [
                    'spco_copy_attendee_chk' => $this->print_copy_info
                        ? new CopyAttendeeInfoForm($registrations, $this->reg_step->slug())
                        : new AutoCopyAttendeeInfoForm($this->reg_step->slug()),
                ],
                'primary_registrant',
                false
            );
        }
    }


    /**
     * @return void
     * @throws EE_Error
     */
    private function addPrivacyConsentCheckbox(): void
    {
        // if this isn't a revisit, and they have the privacy consent box enabled, add it
        if (! $this->reg_step->checkout->revisit && $this->reg_config->isConsentCheckboxEnabled()) {
            $this->subsections['consent_box'] = new PrivacyConsentCheckboxForm(
                $this->reg_step->slug(),
                $this->reg_config->getConsentCheckboxLabelText()
            );
        }
    }


    private function displayEventQuestionsLink()
    {
        $this->subsections['event_questions_link'] = new EE_Form_Section_HTML(
            EEH_HTML::div(
                EEH_HTML::link(
                    '',
                    esc_html__('show&nbsp;event&nbsp;questions', 'event_espresso'),
                    esc_html__('show&nbsp;event&nbsp;questions', 'event_espresso'),
                    'spco-display-event-questions-lnk',
                    'act-like-link smaller-text hidden hide-if-no-js float-right'
                ),
                '',
                'clearfix'
            )
        );
    }
}
