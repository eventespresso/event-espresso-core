<?php

namespace EventEspresso\core\services\commands\registration;

use EE_Error;
use EventEspresso\core\domain\services\registration\CopyRegistrationService;
use EventEspresso\core\exceptions\UnexpectedEntityException;
use EventEspresso\core\services\commands\CommandHandler;
use EventEspresso\core\services\commands\CommandInterface;
use RuntimeException;

/**
 * Class CopyRegistrationPaymentsCommandHandler
 * Given two EE_Registrations supplied via a CopyRegistrationDetailsCommand object,
 * will copy payment details from one registration to the target,
 * and then remove the original copied payment details from the registration
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class CopyRegistrationPaymentsCommandHandler extends CommandHandler
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
        $this->copy_registration_service = $copy_registration_service;
    }


    /**
     * @param CommandInterface|CopyRegistrationPaymentsCommand $command
     * @return boolean
     * @throws EE_Error
     * @throws UnexpectedEntityException
     * @throws RuntimeException
     */
    public function handle(CommandInterface $command)
    {
        return $this->copy_registration_service->copyPaymentDetails(
            $command->targetRegistration(),
            $command->registrationToCopy()
        );
    }
}
