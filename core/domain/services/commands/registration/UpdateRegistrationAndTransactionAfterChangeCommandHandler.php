<?php

namespace EventEspresso\core\domain\services\commands\registration;

use EventEspresso\core\domain\services\registration\UpdateRegistrationService;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\services\commands\CommandHandler;
use EventEspresso\core\services\commands\CommandInterface;

/**
 * Class UpdateRegistrationAndTransactionAfterChangeCommandHandler
 * performs final status updates and triggers notifications
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class UpdateRegistrationAndTransactionAfterChangeCommandHandler extends CommandHandler
{
    /**
     * @var UpdateRegistrationService $update_registration_service
     */
    private $update_registration_service;


    /**
     * Command constructor
     *
     * @param UpdateRegistrationService $update_registration_service
     */
    public function __construct(
        UpdateRegistrationService $update_registration_service
    ) {
        defined('EVENT_ESPRESSO_VERSION') || exit;
        $this->update_registration_service = $update_registration_service;
    }


    /**
     * @param CommandInterface|UpdateRegistrationAndTransactionAfterChangeCommand $command
     * @return boolean
     * @throws InvalidEntityException
     */
    public function handle(CommandInterface $command)
    {
        /** @var UpdateRegistrationAndTransactionAfterChangeCommand $command */
        if (! $command instanceof UpdateRegistrationAndTransactionAfterChangeCommand) {
            throw new InvalidEntityException(
                get_class($command),
                'UpdateRegistrationAndTransactionAfterChangeCommand'
            );
        }
        return $this->update_registration_service->updateRegistrationAndTransaction($command->registration());
    }
}
