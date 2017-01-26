<?php
namespace EventEspresso\core\services\commands\registration;

use EventEspresso\core\domain\services\registration\CopyRegistrationService;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\services\commands\CommandHandler;
use EventEspresso\core\services\commands\CommandInterface;

if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



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
     * @param \EventEspresso\core\services\commands\CommandInterface $command
     * @return boolean
     */
    public function handle(CommandInterface $command)
    {
        /** @var CopyRegistrationPaymentsCommand $command */
        if ( ! $command instanceof CopyRegistrationPaymentsCommand) {
            throw new InvalidEntityException(get_class($command), 'CopyRegistrationPaymentsCommand');
        }
        return $this->copy_registration_service->copyPaymentDetails(
            $command->targetRegistration(),
            $command->registrationToCopy()
        );
    }



}
// End of file CopyRegistrationPaymentsCommandHandler.php
// Location: /CopyRegistrationPaymentsCommandHandler.php