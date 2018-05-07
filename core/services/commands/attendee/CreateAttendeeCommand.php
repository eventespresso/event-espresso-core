<?php

namespace EventEspresso\core\services\commands\attendee;

use EE_Registration;
use EventEspresso\core\domain\services\capabilities\CapCheck;
use EventEspresso\core\domain\services\capabilities\CapCheckInterface;
use EventEspresso\core\domain\services\capabilities\PublicCapabilities;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\services\commands\Command;
use EventEspresso\core\services\commands\CommandRequiresCapCheckInterface;

/**
 * Class CreateAttendeeCommand
 * DTO for passing data to a CreateAttendeeCommandHandler
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 */
class CreateAttendeeCommand extends Command implements CommandRequiresCapCheckInterface
{

    /**
     * array of details where keys are names of EEM_Attendee model fields
     *
     * @var array $attendee_details
     */
    protected $attendee_details;

    /**
     * an existing registration to associate this attendee with
     *
     * @var EE_Registration $registration
     */
    protected $registration;


    /**
     * CreateAttendeeCommand constructor.
     *
     * @param array           $attendee_details
     * @param EE_Registration $registration
     */
    public function __construct(array $attendee_details, EE_Registration $registration)
    {
        $this->attendee_details = $attendee_details;
        $this->registration = $registration;
    }


    /**
     * @return array
     */
    public function attendeeDetails()
    {
        return $this->attendee_details;
    }


    /**
     * @return EE_Registration
     */
    public function registration()
    {
        return $this->registration;
    }


    /**
     * @return CapCheckInterface
     * @throws InvalidDataTypeException
     */
    public function getCapCheck()
    {
        // need cap for non-AJAX admin requests
        if (! (defined('DOING_AJAX') && DOING_AJAX) && is_admin()) {
            return new CapCheck('ee_edit_contacts', 'create_new_contact');
        }
        return new PublicCapabilities('', 'create_new_contact');
    }
}
