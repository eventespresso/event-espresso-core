<?php
namespace EventEspresso\core\services\ticket;

use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\exceptions\UnexpectedEntityException;
use EventEspresso\core\services\commands\CommandHandlerInterface;
use EventEspresso\core\services\commands\CommandInterface;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class CreateTicketLineItemCommandHandler
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class CreateTicketLineItemCommandHandler implements CommandHandlerInterface
{



	/**
	 * @param \EventEspresso\core\services\commands\CommandInterface $command
	 * @return \EE_Line_Item
	 */
	public function handle( CommandInterface $command ) {
		/** @var CreateTicketLineItemCommand $command */
		if ( ! $command instanceof CreateTicketLineItemCommand ) {
			throw new InvalidEntityException( get_class( $command ), 'CreateTicketLineItemCommand' );
		}
		// create new line item for ticket
		$ticket_line_item = \EEH_Line_Item::add_ticket_purchase(
			$command->transaction()->total_line_item(),
			$command->ticket(),
			$command->quantity()
		);
		if ( ! $ticket_line_item instanceof \EE_Line_Item ) {
			throw new UnexpectedEntityException( $ticket_line_item, 'EE_Line_Item' );
		}
		// apply any applicable promotions that were initially used during registration to new line items
		do_action(
			'AHEE__\EventEspresso\core\services\ticket\CreateTicketLineItemCommandHandler__handle__new_ticket_line_item_added',
			$command->transaction()->total_line_item(),
			$command->ticket(),
			$command->transaction(),
			$command->quantity()
		);
		return $ticket_line_item;
	}



}
// End of file CreateTicketLineItemCommandHandler.php
// Location: /CreateTicketLineItemCommandHandler.php