<?php

use EventEspresso\core\domain\services\registration\form\v1\CountryOptions;
use EventEspresso\core\domain\services\registration\form\v1\RegForm;
use EventEspresso\core\domain\services\registration\form\v1\RegFormHandler;
use EventEspresso\core\domain\services\registration\form\v1\RegFormQuestionFactory;
use EventEspresso\core\domain\services\registration\form\v1\StateOptions;
use EventEspresso\core\exceptions\EntityNotFoundException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
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
     * @var RegForm
     */
    public $reg_form;

    /**
     * @var int
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
    public function initialize_reg_step(): bool
    {
        return true;
    }


    /**
     * @return RegForm
     * @throws DomainException
     * @throws InvalidArgumentException
     * @throws EntityNotFoundException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function generate_reg_form(): RegForm
    {
        // TODO detect if event has a reg form UUID and swap this out for new reg form builder generated form
        return LoaderFactory::getShared(RegForm::class, [$this]);
    }


    /**
     * looking for hooks?
     * this method has been replaced by:
     * EventEspresso\core\domain\services\registration\form\v1\RegForm::getRegForm()
     *
     * @deprecated   $VID:$
     */
    private function _registrations_reg_form()
    {
    }


    /**
     * looking for hooks?
     * this method has been replaced by:
     * EventEspresso\core\domain\services\registration\form\v1\RegForm::additionalAttendeeRegInfoInput()
     *
     * @deprecated   $VID:$
     */
    private function _additional_attendee_reg_info_input()
    {
    }


    /**
     * looking for hooks?
     * this method has been replaced by:
     * EventEspresso\core\domain\services\registration\form\v1\RegForm::questionGroupRegForm()
     *
     * @deprecated   $VID:$
     */
    private function _question_group_reg_form()
    {
    }


    /**
     * looking for hooks?
     * this method has been replaced by:
     * EventEspresso\core\domain\services\registration\form\v1\RegForm::questionGroupHeader()
     *
     * @deprecated   $VID:$
     */
    private function _question_group_header()
    {
    }


    /**
     * looking for hooks?
     * this method has been replaced by:
     * EventEspresso\core\domain\services\registration\form\v1\CopyAttendeeInfoForm
     *
     * @deprecated   $VID:$
     */
    private function _copy_attendee_info_form()
    {
    }


    /**
     * looking for hooks?
     * this method has been replaced by:
     * EventEspresso\core\domain\services\registration\form\v1\AutoCopyAttendeeInfoForm
     *
     * @deprecated   $VID:$
     */
    private function _auto_copy_attendee_info()
    {
    }


    /**
     * looking for hooks?
     * this method has been replaced by:
     * EventEspresso\core\domain\services\registration\form\v1\CopyAttendeeInfoForm
     *
     * @deprecated   $VID:$
     */
    private function _copy_attendee_info_inputs()
    {
    }


    /**
     * looking for hooks?
     * this method has been replaced by:
     * EventEspresso\core\domain\services\registration\form\v1\RegForm::additionalPrimaryRegistrantInputs()
     *
     * @deprecated   $VID:$
     */
    private function _additional_primary_registrant_inputs()
    {
    }


    /**
     * looking for hooks?
     * this method has been replaced by:
     * EventEspresso\core\domain\services\registration\form\v1\RegFormQuestionFactory::create()
     *
     * @param EE_Registration $registration
     * @param EE_Question     $question
     * @return EE_Form_Input_Base
     * @throws EE_Error
     * @throws ReflectionException
     * @deprecated   $VID:$
     */
    public function reg_form_question(EE_Registration $registration, EE_Question $question): EE_Form_Input_Base
    {
        /** @var RegFormQuestionFactory $reg_form_question_factory */
        $reg_form_question_factory = LoaderFactory::getShared(RegFormQuestionFactory::class);
        return $reg_form_question_factory->create($registration, $question);
    }


    /**
     * looking for hooks?
     * this method has been replaced by:
     * EventEspresso\core\domain\services\registration\form\v1\RegForm::generateQuestionInput()
     *
     * @deprecated   $VID:$
     */
    private function _generate_question_input()
    {
    }


    /**
     * looking for hooks?
     * this method has been replaced by:
     * EventEspresso\core\domain\services\registration\form\v1\CountryOptions::forLegacyFormInput()
     *
     * @param array|null           $countries_list
     * @param EE_Question|null     $question
     * @param EE_Registration|null $registration
     * @param EE_Answer|null       $answer
     * @return array 2d keys are country IDs, values are their names
     * @throws EE_Error
     * @throws ReflectionException
     * @deprecated   $VID:$
     */
    public function use_cached_countries_for_form_input(
        array $countries_list = null,
        EE_Question $question = null,
        EE_Registration $registration = null,
        EE_Answer $answer = null
    ): array {
        /** @var CountryOptions $country_options */
        $country_options = LoaderFactory::getShared(CountryOptions::class, [$this->checkout->action]);
        return $country_options->forLegacyFormInput($countries_list, $question, $registration, $answer);
    }


    /**
     * looking for hooks?
     * this method has been replaced by:
     * EventEspresso\core\domain\services\registration\form\v1\StateOptions::forLegacyFormInput()
     *
     * @param array|null           $states_list
     * @param EE_Question|null     $question
     * @param EE_Registration|null $registration
     * @param EE_Answer|null       $answer
     * @return array 2d keys are state IDs, values are their names
     * @throws EE_Error
     * @throws ReflectionException
     * @deprecated   $VID:$
     */
    public function use_cached_states_for_form_input(
        array $states_list = null,
        EE_Question $question = null,
        EE_Registration $registration = null,
        EE_Answer $answer = null
    ): array {
        /** @var StateOptions $state_options */
        $state_options = LoaderFactory::getShared(StateOptions::class, [$this->checkout->action]);
        return $state_options->forLegacyFormInput($states_list, $question, $registration, $answer);
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
    public function process_reg_step(): bool
    {
        do_action('AHEE_log', __FILE__, __FUNCTION__, '');
        // grab validated data from form
        $valid_data = $this->checkout->current_step->valid_data();
        // if we don't have any $valid_data then something went TERRIBLY WRONG !!!
        if (empty($valid_data)) {
            return $this->inValidDataError();
        }
        if (! $this->checkout->transaction instanceof EE_Transaction || ! $this->checkout->continue_reg) {
            return $this->inValidTransactionError();
        }
        // get cached registrations
        $registrations = $this->checkout->transaction->registrations($this->checkout->reg_cache_where_params);
        // verify we got the goods
        if (empty($registrations)) {
            return $this->noRegistrationsError();
        }
        /** @var RegFormHandler $reg_form_handler */
        $reg_form_handler = LoaderFactory::getNew(
            RegFormHandler::class,
            [$this->checkout, $this->reg_form->requiredQuestions()]
        );
        // extract attendee info from form data and save to model objects
        if (! $reg_form_handler->processRegistrations($registrations, $valid_data)) {
            // return immediately if the previous step exited early due to errors
            return false;
        }
        // if first pass thru SPCO,
        // then let's check processed registrations against the total number of tickets in the cart
        $registrations_processed = $reg_form_handler->attendeeCount();
        if (! $this->checkout->revisit && $registrations_processed !== $this->checkout->total_ticket_count) {
            return $this->registrationProcessingError($registrations_processed);
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
     * @return bool
     * @since   $VID:$
     */
    private function inValidDataError(): bool
    {
        EE_Error::add_error(
            esc_html__('No valid question responses were received.', 'event_espresso'),
            __FILE__,
            __FUNCTION__,
            __LINE__
        );
        return false;
    }


    /**
     * @return bool
     * @since   $VID:$
     */
    private function inValidTransactionError(): bool
    {
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


    /**
     * @return bool
     * @since   $VID:$
     */
    private function noRegistrationsError(): bool
    {
        // combine the old translated string with a new one, in order to not break translations
        $error_message = esc_html__(
            'Your form data could not be applied to any valid registrations.',
            'event_espresso'
        );
        $error_message .= sprintf(
            esc_html_x(
                '%3$sThis can sometimes happen if too much time has been taken to complete the registration process.%3$sPlease return to the %1$sEvent List%2$s and reselect your tickets. If the problem continues, please contact the site administrator.',
                '(line break)This can sometimes happen if too much time has been taken to complete the registration process.(line break)Please return to the (link)Event List(end link) and reselect your tickets. If the problem continues, please contact the site administrator.',
                'event_espresso'
            ),
            '<a href="' . get_post_type_archive_link('espresso_events') . '" >',
            '</a>',
            '<br />'
        );
        EE_Error::add_error($error_message, __FILE__, __FUNCTION__, __LINE__);
        return false;
    }


    /**
     * @param int $registrations_processed
     * @return bool
     * @since   $VID:$
     */
    private function registrationProcessingError(int $registrations_processed): bool
    {
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
    public function update_reg_step(): bool
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
