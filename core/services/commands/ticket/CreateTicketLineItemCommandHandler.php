<?php

namespace EventEspresso\core\services\commands\ticket;

use EventEspresso\core\domain\services\ticket\CreateTicketLineItemService;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\services\commands\CommandHandler;
use EventEspresso\core\services\commands\CommandInterface;

/**
 * Class CreateTicketLineItemCommandHandler
 * generates and validates a new ticket line item
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class CreateTicketLineItemCommandHandler extends CommandHandler
{


    /**
     * @var CreateTicketLineItemService $factory
     */
    private $factory;


    /**
     * Command constructor
     *
     * @param CreateTicketLineItemService $factory
     */
    public function __construct(CreateTicketLineItemService $factory)
    {
        $this->factory = $factory;
    }


    /**
     * @param \EventEspresso\core\services\commands\CommandInterface $command
     * @return \EE_Line_Item
     * @throws \EventEspresso\core\exceptions\InvalidEntityException
     * @throws \EventEspresso\core\exceptions\UnexpectedEntityException
     * @throws \EE_Error
     */
    public function handle(CommandInterface $command)
    {
        /** @var CreateTicketLineItemCommand $command */
        if (! $command instanceof CreateTicketLineItemCommand) {
            throw new InvalidEntityException(get_class($command), 'CreateTicketLineItemCommand');
        }
        // create new line item for ticket
        return $this->factory->create(
            $command->transaction(),
            $command->ticket(),
            $command->quantity()
        );
    }
}
