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
        $this->copy_registration_service = $copy_registration_service;
    }



    /**
     * @param \EventEspresso\core\services\commands\CommandInterface $command
     * @return boolean
     */
    public function handle(CommandInterface $command)
    {
        /** @var CopyRegistrationDetailsCommand $command */
        if ( ! $command instanceof CopyRegistrationDetailsCommand) {
            throw new InvalidEntityException(get_class($command), 'CopyRegistrationDetailsCommand');
        }
        return $this->copy_registration_service->copyRegistrationDetails(
            $command->targetRegistration(),
            $command->registrationToCopy()
        );
    }


}
// End of file CopyRegistrationDetailsCommandHandler.php
// Location: /CopyRegistrationDetailsCommandHandler.php