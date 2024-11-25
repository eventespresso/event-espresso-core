<?php

namespace EventEspresso\core\domain\services\registration\form\v1;

use EE_Checkout;
use EE_Error;
use EE_Registration;
use EE_Registration_Processor;
use EventEspresso\core\domain\entities\contexts\Context;
use EventEspresso\core\exceptions\EntityNotFoundException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;
use InvalidArgumentException;
use ReflectionException;
use RuntimeException;

class RegFormHandler
{
    public EE_Checkout $checkout;

    public RegFormInputHandler $input_handler;

    private RegFormAttendeeFactory $attendee_factory;

    private RegistrantData $registrant_data;

    private EE_Registration_Processor $registration_processor;

    /**
     * reg form sections that do not contain inputs
     *
     * @var string[]
     */
    private array $non_input_form_sections = [
        'primary_registrant',
        'additional_attendee_reg_info',
        'spco_copy_attendee_chk',
    ];

    private bool $valid;


    /**
     * RegFormHandler constructor.
     */
    public function __construct(
        EE_Checkout $checkout,
        RegistrantData $registrant_data,
        RegFormAttendeeFactory $attendee_factory,
        EE_Registration_Processor $registration_processor
    ) {
        $this->checkout               = $checkout;
        $this->registrant_data        = $registrant_data;
        $this->attendee_factory       = $attendee_factory;
        $this->registration_processor = $registration_processor;
        $this->initializeInputHandler();
    }


    private function initializeInputHandler()
    {
        $reg_form            = $this->checkout->current_step->reg_form;
        $required_questions  = $reg_form instanceof RegForm ? $reg_form->requiredQuestions() : [];
        $this->input_handler = LoaderFactory::getShared(
            RegFormInputHandler::class,
            [$this->checkout->reg_url_link, $required_questions]
        );
    }


    /**
     * @return int
     */
    public function attendeeCount(): int
    {
        return $this->registrant_data->attendeeCount();
    }


    /**
     * @return bool
     */
    private function isInvalid(): bool
    {
        $this->valid = false;
        return $this->valid;
    }


    /**
     * @param EE_Registration[] $registrations
     * @param array[][]         $reg_form_data
     * @return bool
     * @throws EntityNotFoundException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws RuntimeException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function processRegistrations(array $registrations, array $reg_form_data): bool
    {
        // start off optimistic, then trip this to false if anything goes wrong
        $this->valid = true;
        foreach ($registrations as $registration) {
            // verify EE_Registration object
            if (! $this->isValidRegistration($registration)) {
                return $this->isInvalid();
            }
            $reg_url_link = $registration->reg_url_link();
            // reg_url_link exists ?
            if (! $this->isValidRegUrlLink($reg_url_link)) {
                return $this->isInvalid();
            }
            // should this registration be processed during this visit ?
            if (! $this->checkout->visit_allows_processing_of_this_registration($registration)) {
                continue;
            }
            // if NOT revisiting, then let's save the registration now,
            // so that we have a REG_ID to use when generating other objects
            if (! $this->checkout->revisit) {
                $registration->save();
            }

            if (
                // This allows plugins to trigger a fail on processing of a registration
                // for any conditions they may have for it to pass.
                apply_filters(
                    'FHEE__EventEspresso_core_domain_services_registration_form_v1_RegFormHandler__processRegistrations__bypass',
                    false, // if true is returned by the plugin then the registration processing is halted.
                    $this->registrant_data->attendeeCount(),
                    $registration,
                    $registrations,
                    $reg_form_data,
                    $this
                )
            ) {
                return $this->isInvalid();
            }

            // Houston, we have a registration!
            if (! $this->processRegistration($registration, $reg_url_link, $reg_form_data)) {
                return $this->isInvalid();
            }
        }
        return $this->valid;
    }


    /**
     * @param string $reg_url_link
     * @return bool
     */
    private function isValidRegUrlLink(string $reg_url_link): bool
    {
        if (! empty($reg_url_link)) {
            return true;
        }
        EE_Error::add_error(
            esc_html__(
                'An invalid or missing line item ID was encountered while attempting to process the registration form.',
                'event_espresso'
            ),
            __FILE__,
            __FUNCTION__,
            __LINE__
        );
        return false;
    }


    /**
     * @param EE_Registration|null $registration
     * @return bool
     */
    private function isValidRegistration(?EE_Registration $registration): bool
    {
        // verify EE_Registration object
        if ($registration instanceof EE_Registration) {
            return true;
        }
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


    /**
     * @param EE_Registration $registration
     * @param string          $reg_url_link
     * @param array[][]       $reg_form_data
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function processRegistration(
        EE_Registration $registration,
        string $reg_url_link,
        array $reg_form_data
    ): bool {
        $this->registrant_data->initializeRegistrantData($registration);
        if (! $this->processRegFormData($registration, $reg_url_link, $reg_form_data)) {
            return false;
        }
        // RegFormAttendeeFactory
        if (! $this->attendee_factory->create($registration, $reg_url_link)) {
            return false;
        }
        // at this point, we should have enough details about the registrant to consider the registration
        // NOT incomplete
        $this->registration_processor->toggle_incomplete_registration_status_to_default(
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
        // we can also consider the TXN to not have been failed, so temporarily upgrade its status to
        // abandoned
        $this->checkout->transaction->toggle_failed_transaction_status();
        // if we've gotten this far, then let's save what we have
        $registration->save();
        // add relation between TXN and registration
        $this->associateRegistrationWithTransaction($registration);
        return true;
    }


    /**
     * @param EE_Registration $registration
     * @param string          $reg_url_link
     * @param array           $reg_form_data
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function processRegFormData(EE_Registration $registration, string $reg_url_link, array $reg_form_data): bool
    {
        if (isset($reg_form_data[ $reg_url_link ])) {
            // do we need to copy basic info from primary attendee ?
            $copy_primary = isset($reg_form_data[ $reg_url_link ]['additional_attendee_reg_info'])
                && absint($reg_form_data[ $reg_url_link ]['additional_attendee_reg_info']) === 0;
            $this->registrant_data->setCopyPrimary($copy_primary);
            // filter form input data for this registration
            $reg_form_data[ $reg_url_link ] = (array) apply_filters(
                'FHEE__EventEspresso_core_domain_services_registration_form_v1_RegFormHandler__processRegFormData__registrant_form_data',
                $reg_form_data[ $reg_url_link ],
                $registration
            );
            if (isset($reg_form_data['primary_attendee'])) {
                $primary_reg_url_link = $reg_form_data['primary_attendee'] ?: '';
                $this->registrant_data->addPrimaryRegistrantDataValue('reg_url_link', $primary_reg_url_link);
                unset($reg_form_data['primary_attendee']);
            }
            // now loop through our array of valid post data && process attendee reg forms
            foreach ($reg_form_data[ $reg_url_link ] as $form_section => $form_inputs) {
                if (in_array($form_section, $this->non_input_form_sections, true)) {
                    continue;
                }
                foreach ($form_inputs as $form_input => $input_value) {
                    $input_processed = $this->input_handler->processFormInput(
                        $registration,
                        $reg_url_link,
                        $form_input,
                        $input_value
                    );
                    if (! $input_processed) {
                        return false;
                    }
                }
            }
        }
        return true;
    }


    /**
     * @param EE_Registration $registration
     * @return void
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    private function associateRegistrationWithTransaction(EE_Registration $registration)
    {
        // add relation to registration
        $this->checkout->transaction->_add_relation_to($registration, 'Registration');
        $this->checkout->transaction->update_cache_after_object_save('Registration', $registration);
    }
}
