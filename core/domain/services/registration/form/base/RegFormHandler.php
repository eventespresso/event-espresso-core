<?php

namespace EventEspresso\core\domain\services\registration\form\base;

use EE_Checkout;
use EE_Error;
use EE_Form_Section_Proper;
use EE_Registration;
use EE_Registration_Processor;
use EventEspresso\core\domain\entities\contexts\Context;
use EventEspresso\core\domain\services\registration\form\RegFormHandlerInterface;
use EventEspresso\core\exceptions\EntityNotFoundException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use InvalidArgumentException;
use ReflectionException;
use RuntimeException;

abstract class RegFormHandler implements RegFormHandlerInterface
{

    /**
     * @var EE_Checkout
     */
    protected $checkout;

    /**
     * @var array
     */
    protected $non_input_form_sections;

    /**
     * @var RegFormAttendeeFactory
     */
    protected $attendee_factory;

    /**
     * @var RegistrantData
     */
    protected $registrant_data;

    /**
     * the registration form for the current checkout step
     *
     * @var EE_Form_Section_Proper $reg_form
     */
    protected $reg_form;

    /**
     * @var EE_Registration_Processor
     */
    protected $registration_processor;

    /**
     * @var bool
     */
    protected $valid = true;


    /**
     * RegFormHandler constructor.
     */
    public function __construct(
        EE_Checkout $checkout,
        RegistrantData $registrant_data,
        EE_Form_Section_Proper $reg_form,
        RegFormAttendeeFactory $attendee_factory,
        EE_Registration_Processor $registration_processor
    ) {
        $this->checkout               = $checkout;
        $this->reg_form               = $reg_form;
        $this->registrant_data        = $registrant_data;
        $this->attendee_factory       = $attendee_factory;
        $this->registration_processor = $registration_processor;
        // reg form sections that do not contain inputs
        $this->non_input_form_sections = [
            'primary_registrant',
            'additional_attendee_reg_info',
            'spco_copy_attendee_chk',
        ];
    }


    /**
     * @return void
     */
    abstract public function initializeInputHandler();


    /**
     * @param EE_Registration $registration
     * @param string          $reg_url_link
     * @param array           $reg_form_data
     * @return bool
     */
    abstract protected function processRegFormData(
        EE_Registration $registration,
        string $reg_url_link,
        array $reg_form_data
    ): bool;


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
    protected function isInvalid(): bool
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
            // reg_url_link exists ?
            $reg_url_link = $registration->reg_url_link();
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
            /**
             * This allows plugins to trigger a fail on processing of a
             * registration for any conditions they may have for it to pass.
             *
             * @var bool if true is returned by the plugin then the registration processing is halted.
             */
            if (
                apply_filters(
                    'FHEE__EE_SPCO_Reg_Step_Attendee_Information___process_registrations__pre_registration_process',
                    false,
                    $this->attendeeCount(),
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
    protected function isValidRegUrlLink(string $reg_url_link): bool
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
    protected function isValidRegistration(?EE_Registration $registration): bool
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
    protected function processRegistration(
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
        // we can also consider the TXN to not have been failed, so temporarily upgrade it's status to abandoned
        $this->checkout->transaction->toggle_failed_transaction_status();
        // if we've gotten this far, then let's save what we have
        $registration->save();
        // add relation between TXN and registration
        $this->associateRegistrationWithTransaction($registration);
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
