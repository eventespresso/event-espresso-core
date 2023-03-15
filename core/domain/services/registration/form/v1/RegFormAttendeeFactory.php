<?php

namespace EventEspresso\core\domain\services\registration\form\v1;

use EE_Attendee;
use EE_Error;
use EE_Registration;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\commands\attendee\CreateAttendeeCommand;
use EventEspresso\core\services\commands\CommandBusInterface;
use InvalidArgumentException;
use ReflectionException;
use RuntimeException;

class RegFormAttendeeFactory
{
    /**
     * @var CommandBusInterface
     */
    public $command_bus;

    /**
     * @var RegistrantData
     */
    private $registrant_data;


    /**
     * RegFormAttendeeFactory constructor.
     *
     * @param CommandBusInterface $command_bus
     * @param RegistrantData      $registrant_data
     */
    public function __construct(CommandBusInterface $command_bus, RegistrantData $registrant_data)
    {
        $this->command_bus     = $command_bus;
        $this->registrant_data = $registrant_data;
    }


    /**
     * @param EE_Registration $registration
     * @param string          $reg_url_link
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function create(EE_Registration $registration, string $reg_url_link): bool
    {
        // this registration does not require additional attendee information ?
        if (
            $this->registrant_data->copyPrimary()
            && $this->registrant_data->attendeeCount() > 1
            && $this->registrant_data->primaryRegistrantIsValid()
        ) {
            // just copy the primary registrant
            $attendee = $this->registrant_data->primaryRegistrant();
        } else {
            // ensure critical details are set for additional attendees
            // raw form data was already set during call to processRegFormData()
            $this->registrant_data->ensureCriticalRegistrantDataIsSet($reg_url_link);
            // execute create attendee command (which may return an existing attendee)
            $attendee = $this->command_bus->execute(
                new CreateAttendeeCommand(
                    $this->registrant_data->getRegistrantData($reg_url_link),
                    $registration
                )
            );
            // who's #1 ?
            if ($this->registrant_data->currentRegistrantIsPrimary()) {
                $this->registrant_data->setPrimaryRegistrant($attendee);
            }
        }
        // add relation to registration, set attendee ID, and cache attendee
        $this->associateAttendeeWithRegistration($registration, $attendee);
        return $this->isValidAttendee($registration, $reg_url_link);
    }


    /**
     * @param EE_Registration $registration
     * @param string          $reg_url_link
     * @return bool
     * @throws EE_Error
     */
    private function isValidAttendee(EE_Registration $registration, string $reg_url_link): bool
    {
        if ($registration->attendee() instanceof EE_Attendee) {
            return true;
        }
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


    /**
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
    private function associateAttendeeWithRegistration(EE_Registration $registration, EE_Attendee $attendee)
    {
        // add relation to attendee
        $registration->_add_relation_to($attendee, 'Attendee');
        $registration->set_attendee_id($attendee->ID());
        $registration->update_cache_after_object_save('Attendee', $attendee);
    }
}
