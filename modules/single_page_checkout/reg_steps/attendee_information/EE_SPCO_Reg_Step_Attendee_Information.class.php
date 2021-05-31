<?php

use EventEspresso\core\domain\entities\contexts\Context;
use EventEspresso\core\domain\services\registration\form\CountryOptions;
use EventEspresso\core\domain\services\registration\form\LegacyRegistrationForm;
use EventEspresso\core\domain\services\registration\form\StateOptions;
use EventEspresso\core\exceptions\EntityNotFoundException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\commands\attendee\CreateAttendeeCommand;
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
     * @var bool
     */
    private $_print_copy_info = false;

    /**
     * @var array
     */
    private $_attendee_data = array();

    /**
     * @var array
     */
    private $_required_questions = array();

    /**
     * @var array
     */
    private $_registration_answers = array();

    /**
     * @var int
     */
    protected $reg_form_count = 0;

    /**
     *    class constructor
     *
     * @access    public
     * @param    EE_Checkout $checkout
     */
    public function __construct(EE_Checkout $checkout)
    {
        $this->_slug = 'attendee_information';
        $this->_name = esc_html__('Attendee Information', 'event_espresso');
        $this->checkout = $checkout;
        $this->_reset_success_message();
        $this->set_instructions(
            esc_html__('Please answer the following registration questions before proceeding.', 'event_espresso')
        );
    }


    public function translate_js_strings()
    {
        EE_Registry::$i18n_js_strings['required_field'] = esc_html__(
            ' is a required question.',
            'event_espresso'
        );
        EE_Registry::$i18n_js_strings['required_multi_field'] = esc_html__(
            ' is a required question. Please enter a value for at least one of the options.',
            'event_espresso'
        );
        EE_Registry::$i18n_js_strings['answer_required_questions'] = esc_html__(
            'Please answer all required questions correctly before proceeding.',
            'event_espresso'
        );
        EE_Registry::$i18n_js_strings['attendee_info_copied'] = sprintf(
            esc_html_x(
                'The attendee information was successfully copied.%sPlease ensure the rest of the registration form is completed before proceeding.',
                'The attendee information was successfully copied.(line break)Please ensure the rest of the registration form is completed before proceeding.',
                'event_espresso'
            ),
            '<br/>'
        );
        EE_Registry::$i18n_js_strings['attendee_info_copy_error'] = esc_html__(
            'An unknown error occurred on the server while attempting to copy the attendee information. Please refresh the page and try again.',
            'event_espresso'
        );
        EE_Registry::$i18n_js_strings['enter_valid_email'] = esc_html__(
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
     * @return LegacyRegistrationForm
     * @throws DomainException
     * @throws InvalidArgumentException
     * @throws EntityNotFoundException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function generate_reg_form(): LegacyRegistrationForm
    {
        // TODO detect if event has a reg form UUID and swap this out for new reg form builder generated form
        return LoaderFactory::getLoader()->getShared(LegacyRegistrationForm::class, [$this]);
    }


    /**
     * looking for hooks?
     * this method has been replaced by:
     * EventEspresso\core\domain\services\registration\form\LegacyRegistrationForm::getRegForm()
     *
     * @deprecated   $VID:$
     */
    private function _registrations_reg_form()
    {
    }


    /**
     * looking for hooks?
     * this method has been replaced by:
     * EventEspresso\core\domain\services\registration\form\LegacyRegistrationForm::additionalAttendeeRegInfoInput()
     *
     * @deprecated   $VID:$
     */
    private function _additional_attendee_reg_info_input() {
    }


    /**
     * looking for hooks?
     * this method has been replaced by:
     * EventEspresso\core\domain\services\registration\form\LegacyRegistrationForm::questionGroupRegForm()
     *
     * @deprecated   $VID:$
     */
    private function _question_group_reg_form()
    {
    }


    /**
     * looking for hooks?
     * this method has been replaced by:
     * EventEspresso\core\domain\services\registration\form\LegacyRegistrationForm::questionGroupHeader()
     *
     * @deprecated   $VID:$
     */
    private function _question_group_header()
    {
    }


    /**
     * looking for hooks?
     * this method has been replaced by:
     * EventEspresso\core\domain\services\registration\form\LegacyCopyAttendeeInfoForm
     *
     * @deprecated   $VID:$
     */
    private function _copy_attendee_info_form()
    {
    }


    /**
     * looking for hooks?
     * this method has been replaced by:
     * EventEspresso\core\domain\services\registration\form\LegacyAutoCopyAttendeeInfoForm
     *
     * @deprecated   $VID:$
     */
    private function _auto_copy_attendee_info()
    {
    }


    /**
     * looking for hooks?
     * this method has been replaced by:
     * EventEspresso\core\domain\services\registration\form\LegacyCopyAttendeeInfoForm
     *
     * @deprecated   $VID:$
     */
    private function _copy_attendee_info_inputs()
    {
    }


    /**
     * looking for hooks?
     * this method has been replaced by:
     * EventEspresso\core\domain\services\registration\form\LegacyRegistrationForm::additionalPrimaryRegistrantInputs()
     *
     * @deprecated   $VID:$
     */
    private function _additional_primary_registrant_inputs()
    {
    }


    /**
     * looking for hooks?
     * this method has been replaced by:
     * EventEspresso\core\domain\services\registration\form\LegacyRegistrationForm::regFormQuestion()
     *
     * @param EE_Registration $registration
     * @param EE_Question     $question
     * @return EE_Form_Input_Base
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws OutOfRangeException
     * @throws ReflectionException
     * @deprecated   $VID:$
     */
    public function reg_form_question(EE_Registration $registration, EE_Question $question): EE_Form_Input_Base
    {
        $legacy_reg_form = $this->legacy_reg_forms[ $registration->reg_url_link() ] ?? null;
        if ($legacy_reg_form instanceof LegacyRegistrationForm) {
            return $legacy_reg_form->regFormQuestion($registration, $question);
        }
        throw new OutOfRangeException();
    }


    /**
     * looking for hooks?
     * this method has been replaced by:
     * EventEspresso\core\domain\services\registration\form\LegacyRegistrationForm::generateQuestionInput()
     *
     * @deprecated   $VID:$
     */
    private function _generate_question_input()
    {
    }


    /**
     * looking for hooks?
     * this method has been replaced by:
     * EventEspresso\core\domain\services\registration\form\CountryOptions::forLegacyFormInput()
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
        $country_options = LoaderFactory::getLoader()->getShared(CountryOptions::class, [$this->checkout->action]);
        return $country_options->forLegacyFormInput($countries_list, $question, $registration, $answer);
    }


    /**
     * looking for hooks?
     * this method has been replaced by:
     * EventEspresso\core\domain\services\registration\form\StateOptions::forLegacyFormInput()
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
        $state_options = LoaderFactory::getLoader()->getShared(StateOptions::class, [$this->checkout->action]);
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
    public function process_reg_step()
    {
        do_action('AHEE_log', __FILE__, __FUNCTION__, '');
        // grab validated data from form
        $valid_data = $this->checkout->current_step->valid_data();
        // EEH_Debug_Tools::printr( $_REQUEST, '$_REQUEST', __FILE__, __LINE__ );
        // EEH_Debug_Tools::printr( $valid_data, '$valid_data', __FILE__, __LINE__ );
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
    private function _process_registrations($registrations = array(), $valid_data = array())
    {
        // load resources and set some defaults
        EE_Registry::instance()->load_model('Attendee');
        // holder for primary registrant attendee object
        $this->checkout->primary_attendee_obj = null;
        // array for tracking reg form data for the primary registrant
        $primary_registrant = array(
            'line_item_id' => null,
        );
        $copy_primary = false;
        // reg form sections that do not contain inputs
        $non_input_form_sections = array(
            'primary_registrant',
            'additional_attendee_reg_info',
            'spco_copy_attendee_chk',
        );
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
            /** @var string $reg_url_link */
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
                    $this->_attendee_data[ $reg_url_link ] = array();
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
                                    // \EEH_Debug_Tools::printr( $input_value, $form_input, __FILE__, __LINE__ );
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
                    // EEH_Debug_Tools::printr( $this->_attendee_data, '$this->_attendee_data', __FILE__, __LINE__ );
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
                    // EEH_Debug_Tools::printr( $attendee, '$attendee', __FILE__, __LINE__ );
                    // add relation to registration, set attendee ID, and cache attendee
                    $this->_associate_attendee_with_registration($registration, $attendee);
                    // \EEH_Debug_Tools::printr( $registration, '$registration', __FILE__, __LINE__ );
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

        // \EEH_Debug_Tools::printr( __FUNCTION__, __CLASS__, __FILE__, __LINE__, 2 );
        // \EEH_Debug_Tools::printr( $form_input, '$form_input', __FILE__, __LINE__ );
        // \EEH_Debug_Tools::printr( $input_value, '$input_value', __FILE__, __LINE__ );
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
            : $form_input;
        $answer_is_obj = isset($this->_registration_answers[ $answer_cache_id ])
                         && $this->_registration_answers[ $answer_cache_id ] instanceof EE_Answer;
        // rename form_inputs if they are EE_Attendee properties
        switch ((string) $form_input) {
            case 'state':
            case 'STA_ID':
                $attendee_property = true;
                $form_input = 'STA_ID';
                break;

            case 'country':
            case 'CNT_ISO':
                $attendee_property = true;
                $form_input = 'CNT_ISO';
                break;

            default:
                $ATT_input = 'ATT_' . $form_input;
                // EEH_Debug_Tools::printr( $ATT_input, '$ATT_input', __FILE__, __LINE__ );
                $attendee_property = EEM_Attendee::instance()->has_field($ATT_input) ? true : false;
                $form_input = $attendee_property ? 'ATT_' . $form_input : $form_input;
        }
        // EEH_Debug_Tools::printr( $answer_cache_id, '$answer_cache_id', __FILE__, __LINE__ );
        // EEH_Debug_Tools::printr( $attendee_property, '$attendee_property', __FILE__, __LINE__ );
        // EEH_Debug_Tools::printr( $answer_is_obj, '$answer_is_obj', __FILE__, __LINE__ );
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
            if ($answer instanceof EE_Answer && $answer->question_ID() === $answer_cache_id) {
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
                    break;
                case 'lname':
                    EE_Error::add_error(
                        esc_html__('Last Name is a required value.', 'event_espresso'),
                        __FILE__,
                        __FUNCTION__,
                        __LINE__
                    );
                    return false;
                    break;
                case 'email':
                    EE_Error::add_error(
                        esc_html__('Please enter a valid email address.', 'event_espresso'),
                        __FILE__,
                        __FUNCTION__,
                        __LINE__
                    );
                    return false;
                    break;
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
    private function _copy_critical_attendee_details_from_primary_registrant($attendee_data = array())
    {
        // bare minimum critical details include first name, last name, email address
        $critical_attendee_details = array('ATT_fname', 'ATT_lname', 'ATT_email');
        // add address info to critical details?
        if (
            apply_filters(
                'FHEE__EE_SPCO_Reg_Step_Attendee_Information__merge_address_details_with_critical_attendee_details',
                false
            )
        ) {
            $address_details = array(
                'ATT_address',
                'ATT_address2',
                'ATT_city',
                'STA_ID',
                'CNT_ISO',
                'ATT_zip',
                'ATT_phone',
            );
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
            $this->checkout->redirect = true;
            $this->checkout->redirect_url = add_query_arg(
                array(
                    'e_reg_url_link' => $this->checkout->reg_url_link,
                    'revisit'        => true,
                ),
                $this->checkout->thank_you_page_url
            );
            $this->checkout->json_response->set_redirect_url($this->checkout->redirect_url);
            return true;
        }
        return false;
    }
}
