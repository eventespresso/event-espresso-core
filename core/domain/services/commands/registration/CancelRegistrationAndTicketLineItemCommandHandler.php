<?php

namespace EventEspresso\core\domain\services\commands\registration;

use DomainException;
use EE_Error;
use EEM_Registration;
use EventEspresso\core\domain\services\ticket\CancelTicketLineItemService;
use EventEspresso\core\exceptions\EntityNotFoundException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\commands\CommandHandler;
use EventEspresso\core\services\commands\CommandInterface;
use InvalidArgumentException;
use ReflectionException;
use RuntimeException;

/**
 * Class CancelRegistrationAndTicketLineItemCommandHandler
 * sets registration status to cancelled and decrements the related ticket quantity
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class CancelRegistrationAndTicketLineItemCommandHandler extends CommandHandler
{
    /**
     * @var CancelTicketLineItemService $cancel_ticket_line_item_service
     */
    private $cancel_ticket_line_item_service;


    /**
     * Command constructor
     *
     * @param CancelTicketLineItemService $cancel_ticket_line_item_service
     */
    public function __construct(CancelTicketLineItemService $cancel_ticket_line_item_service)
    {
        defined('EVENT_ESPRESSO_VERSION') || exit;
        $this->cancel_ticket_line_item_service = $cancel_ticket_line_item_service;
    }


    /**
     * @param CommandInterface|CancelRegistrationAndTicketLineItemCommand $command
     * @return boolean
     * @throws DomainException
     * @throws EE_Error
     * @throws EntityNotFoundException
     * @throws InvalidDataTypeException
     * @throws InvalidEntityException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws RuntimeException
     */
    public function handle(CommandInterface $command)
    {
        /** @var CancelRegistrationAndTicketLineItemCommand $command */
        if (! $command instanceof CancelRegistrationAndTicketLineItemCommand) {
            throw new InvalidEntityException(get_class($command), 'CancelRegistrationAndTicketLineItemCommand');
        }
        $registration = $command->registration();
        $this->cancel_ticket_line_item_service->forRegistration($registration);
        // cancel original registration
        $registration->set_status(EEM_Registration::status_id_cancelled);
        $registration->save();
        return true;
    }
}
