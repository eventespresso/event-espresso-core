<?php

namespace EventEspresso\core\services\commands\registration;

use EE_Error;
use EventEspresso\core\domain\services\registration\CopyRegistrationService;
use EventEspresso\core\exceptions\EntityNotFoundException;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\exceptions\UnexpectedEntityException;
use EventEspresso\core\services\commands\CommandHandler;
use EventEspresso\core\services\commands\CommandInterface;
use RuntimeException;

/**
 * Class CopyRegistrationDetailsCommandHandler
 * Given two EE_Registrations supplied via a CopyRegistrationDetailsCommand object,
 * will copy attendee and event details from the registration to copy to the target
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class CopyRegistrationDetailsCommandHandler extends CommandHandler
{
    /**
     * @var CopyRegistrationService $copy_registration_service
     */
    private $copy_registration_service;


    /**
     * Command constructor
     *
     * @param CopyRegistrationService $copy_registration_service
     */
    public function __construct(CopyRegistrationService $copy_registration_service)
    {
        defined('EVENT_ESPRESSO_VERSION') || exit;
        $this->copy_registration_service = $copy_registration_service;
    }


    /**
     * @param CommandInterface|CopyRegistrationDetailsCommand $command
     * @return boolean
     * @throws InvalidEntityException
     * @throws EE_Error
     * @throws EntityNotFoundException
     * @throws UnexpectedEntityException
     * @throws RuntimeException
     */
    public function handle(CommandInterface $command)
    {
        return $this->copy_registration_service->copyRegistrationDetails(
            $command->targetRegistration(),
            $command->registrationToCopy()
        );
    }
}
