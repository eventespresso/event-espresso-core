<?php

namespace EventEspresso\core\services\commands\registration;

use EE_Error;
use EventEspresso\core\domain\services\registration\CreateRegistrationService;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\exceptions\UnexpectedEntityException;
use EventEspresso\core\services\commands\CommandHandler;
use EventEspresso\core\services\commands\CommandInterface;
use OutOfRangeException;

/**
 * Class CreateRegistrationCommandHandler
 * generates and validates a Registration
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class CreateRegistrationCommandHandler extends CommandHandler
{

    /**
     * @var CreateRegistrationService $registration_service
     */
    private $registration_service;


    /**
     * Command constructor
     *
     * @param CreateRegistrationService $registration_service
     */
    public function __construct(CreateRegistrationService $registration_service)
    {
        $this->registration_service = $registration_service;
    }


    /**
     * @param  CommandInterface|CreateRegistrationCommand $command
     * @return mixed
     * @throws OutOfRangeException
     * @throws UnexpectedEntityException
     * @throws EE_Error
     * @throws InvalidEntityException
     */
    public function handle(CommandInterface $command)
    {
        // now create a new registration for the ticket
        return $this->registration_service->create(
            $command->ticket()->get_related_event(),
            $command->transaction(),
            $command->ticket(),
            $command->ticketLineItem(),
            $command->regCount(),
            $command->regGroupSize(),
            $command->regStatus()
        );
    }
}
