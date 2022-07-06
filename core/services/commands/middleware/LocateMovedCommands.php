<?php

namespace EventEspresso\core\services\commands\middleware;

use Closure;
use EE_Error;
use EventEspresso\core\domain\services\commands\attendee\CreateAttendeeCommand;
use EventEspresso\core\domain\services\commands\registration\CancelRegistrationAndTicketLineItemCommand;
use EventEspresso\core\domain\services\commands\registration\CopyRegistrationDetailsCommand;
use EventEspresso\core\domain\services\commands\registration\CopyRegistrationPaymentsCommand;
use EventEspresso\core\domain\services\commands\registration\CreateRegistrationCommand;
use EventEspresso\core\domain\services\commands\registration\UpdateRegistrationAndTransactionAfterChangeCommand;
use EventEspresso\core\domain\services\commands\ticket\CancelTicketLineItemCommand;
use EventEspresso\core\domain\services\commands\ticket\CreateTicketLineItemCommand;
use EventEspresso\core\domain\services\commands\transaction\CreateTransactionCommand;
use EventEspresso\core\services\commands\CommandInterface;
use EventEspresso\core\services\commands\attendee\CreateAttendeeCommand as OldCreateAttendeeCommand;
use EventEspresso\core\services\commands\registration\CancelRegistrationAndTicketLineItemCommand as OldCancelRegistrationAndTicketLineItemCommand;
use EventEspresso\core\services\commands\registration\CopyRegistrationDetailsCommand as OldCopyRegistrationDetailsCommand;
use EventEspresso\core\services\commands\registration\CopyRegistrationPaymentsCommand as OldCopyRegistrationPaymentsCommand;
use EventEspresso\core\services\commands\registration\CreateRegistrationCommand as OldCreateRegistrationCommand;
use EventEspresso\core\services\commands\registration\UpdateRegistrationAndTransactionAfterChangeCommand as OldUpdateRegistrationAndTransactionAfterChangeCommand;
use EventEspresso\core\services\commands\ticket\CancelTicketLineItemCommand as OldCancelTicketLineItemCommand;
use EventEspresso\core\services\commands\ticket\CreateTicketLineItemCommand as OldCreateTicketLineItemCommand;
use EventEspresso\core\services\commands\transaction\CreateTransactionCommand as OldCreateTransactionCommand;

/**
 * Class LocateMovedCommands
 * Determines if incoming command has been moved to a new location,
 * and if so, instantiates the new command and returns that instead of the old command
 *
 * @package EventEspresso\core\services\commands\middleware
 * @author  Brent Christensen
 * @since   4.10.33.p
 */
class LocateMovedCommands implements CommandBusMiddlewareInterface
{
    /**
     * @param CommandInterface $command
     * @param Closure          $next
     * @return mixed
     * @throws EE_Error
     */
    public function handle(CommandInterface $command, Closure $next)
    {
        $command_class = get_class($command);
        switch ($command_class) {
            case 'EventEspresso\core\services\commands\attendee\CreateAttendeeCommand':
                $command = $this->getCreateAttendeeCommand($command);
                break;
            case 'EventEspresso\core\services\commands\registration\CancelRegistrationAndTicketLineItemCommand':
                $command = $this->getCancelRegistrationAndTicketLineItemCommand($command);
                break;
            case 'EventEspresso\core\services\commands\registration\CopyRegistrationDetailsCommand':
                $command = $this->getCopyRegistrationDetailsCommand($command);
                break;
            case 'EventEspresso\core\services\commands\registration\CopyRegistrationPaymentsCommand':
                $command = $this->getCopyRegistrationPaymentsCommand($command);
                break;
            case 'EventEspresso\core\services\commands\registration\CreateRegistrationCommand':
                $command = $this->getCreateRegistrationCommand($command);
                break;
            case 'EventEspresso\core\services\commands\registration\UpdateRegistrationAndTransactionAfterChangeCommand':
                $command = $this->getUpdateRegistrationAndTransactionAfterChangeCommand($command);
                break;
            case 'EventEspresso\core\services\commands\ticket\CancelTicketLineItemCommand':
                $command = $this->getCancelTicketLineItemCommand($command);
                break;
            case 'EventEspresso\core\services\commands\ticket\CreateTicketLineItemCommand':
                $command = $this->getCreateTicketLineItemCommand($command);
                break;
            case 'EventEspresso\core\services\commands\transaction\CreateTransactionCommand':
                $command = $this->getCreateTransactionCommand($command);
                break;
        }
        return $next($command);
    }


    /**
     * @param OldCreateAttendeeCommand|CommandInterface $command
     * @return CreateAttendeeCommand|OldCreateAttendeeCommand
     */
    private function getCreateAttendeeCommand(OldCreateAttendeeCommand $command)
    {
        return class_exists('EventEspresso\core\domain\services\commands\attendee\CreateAttendeeCommand')
            ? new CreateAttendeeCommand(
                $command->attendeeDetails(),
                $command->registration()
            )
            : $command;
    }


    /**
     * @param OldCancelRegistrationAndTicketLineItemCommand|CommandInterface $command
     * @return CancelRegistrationAndTicketLineItemCommand|OldCancelRegistrationAndTicketLineItemCommand
     */
    private function getCancelRegistrationAndTicketLineItemCommand(
        OldCancelRegistrationAndTicketLineItemCommand $command
    ) {
        return class_exists('EventEspresso\core\domain\services\commands\registration\CancelRegistrationAndTicketLineItemCommand')
            ? new CancelRegistrationAndTicketLineItemCommand($command->registration())
            : $command;
    }


    /**
     * @param OldCopyRegistrationDetailsCommand|CommandInterface $command
     * @return CopyRegistrationDetailsCommand|OldCopyRegistrationDetailsCommand
     */
    private function getCopyRegistrationDetailsCommand(
        OldCopyRegistrationDetailsCommand $command
    ) {
        return class_exists('EventEspresso\core\domain\services\commands\registration\CopyRegistrationDetailsCommand')
            ? new CopyRegistrationDetailsCommand(
                $command->targetRegistration(),
                $command->registrationToCopy()
            )
            : $command;
    }


    /**
     * @param OldCopyRegistrationPaymentsCommand|CommandInterface $command
     * @return CopyRegistrationPaymentsCommand|OldCopyRegistrationPaymentsCommand
     */
    private function getCopyRegistrationPaymentsCommand(
        OldCopyRegistrationPaymentsCommand $command
    ) {
        return class_exists('EventEspresso\core\domain\services\commands\registration\CopyRegistrationPaymentsCommand')
            ? new CopyRegistrationPaymentsCommand(
                $command->targetRegistration(),
                $command->registrationToCopy()
            )
            : $command;
    }


    /**
     * @param OldCreateRegistrationCommand|CommandInterface $command
     * @return CreateRegistrationCommand|OldCreateRegistrationCommand
     * @throws EE_Error
     */
    private function getCreateRegistrationCommand(
        OldCreateRegistrationCommand $command
    ) {
        return class_exists('EventEspresso\core\domain\services\commands\registration\CreateRegistrationCommand')
            ? new CreateRegistrationCommand(
                $command->transaction(),
                $command->ticketLineItem(),
                $command->regCount(),
                $command->regGroupSize(),
                $command->regStatus(),
                $command->ticket()
            )
            : $command;
    }


    /**
     * @param OldUpdateRegistrationAndTransactionAfterChangeCommand|CommandInterface $command
     * @return UpdateRegistrationAndTransactionAfterChangeCommand|OldUpdateRegistrationAndTransactionAfterChangeCommand
     */
    private function getUpdateRegistrationAndTransactionAfterChangeCommand(
        OldUpdateRegistrationAndTransactionAfterChangeCommand $command
    ) {
        return class_exists('EventEspresso\core\domain\services\commands\registration\UpdateRegistrationAndTransactionAfterChangeCommand')
            ? new UpdateRegistrationAndTransactionAfterChangeCommand($command->registration())
            : $command;
    }


    /**
     * @param OldCancelTicketLineItemCommand|CommandInterface $command
     * @return CancelTicketLineItemCommand|OldCancelTicketLineItemCommand
     */
    private function getCancelTicketLineItemCommand(
        OldCancelTicketLineItemCommand $command
    ) {
        return class_exists('EventEspresso\core\domain\services\commands\ticket\CancelTicketLineItemCommand')
            ? new CancelTicketLineItemCommand(
                $command->transaction(),
                $command->ticket(),
                $command->quantity(),
                $command->ticketLineItem()
            )
            : $command;
    }


    /**
     * @param OldCreateTicketLineItemCommand|CommandInterface $command
     * @return CreateTicketLineItemCommand|OldCreateTicketLineItemCommand
     */
    private function getCreateTicketLineItemCommand(
        OldCreateTicketLineItemCommand $command
    ) {
        return class_exists('EventEspresso\core\domain\services\commands\ticket\CreateTicketLineItemCommand')
            ? new CreateTicketLineItemCommand(
                $command->transaction(),
                $command->ticket(),
                $command->quantity()
            )
            : $command;
    }


    /**
     * @param OldCreateTransactionCommand|CommandInterface $command
     * @return CreateTransactionCommand|OldCreateTransactionCommand
     */
    private function getCreateTransactionCommand(
        OldCreateTransactionCommand $command
    ) {
        return class_exists('EventEspresso\core\domain\services\commands\transaction\CreateTransactionCommand')
            ? new CreateTransactionCommand(
                $command->checkout(),
                $command->transactionDetails()
            )
            : $command;
    }
}
