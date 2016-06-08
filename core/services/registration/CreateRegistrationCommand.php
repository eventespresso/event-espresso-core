<?php
namespace EventEspresso\core\services\registration;

use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\services\commands\SelfExecutingCommand;
use EventEspresso\core\services\commands\CommandBusInterface;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class CreateRegistrationCommand
 * DTO for passing data to a CreateRegistrationCommandHandler
 *
*@package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class CreateRegistrationCommand extends SelfExecutingCommand
{

	/**
	 * @var \EE_Transaction $transaction
	 */
	private $transaction;

	/**
	 * @var \EE_Ticket $ticket
	 */
	private $ticket;

	/**
	 * @var \EE_Line_Item $ticket_line_item
	 */
	private $ticket_line_item;

	/**
	 * @var int $reg_count
	 */
	private $reg_count = 1;

	/**
	 * @var int $reg_group_size
	 */
	private $reg_group_size = 0;

	/**
	 * @var \EE_Registration $registration
	 */
	protected $registration;



	/**
	 * CreateRegistrationCommand constructor.
	 *
	 * @param \EE_Transaction     $transaction
	 * @param \EE_Line_Item       $ticket_line_item
	 * @param int                 $reg_count
	 * @param int                 $reg_group_size
	 * @param \EE_Registry        $registry
	 * @param CommandBusInterface $command_bus
	 */
	public function __construct(
		\EE_Transaction $transaction,
		\EE_Line_Item $ticket_line_item,
		$reg_count = 1,
		$reg_group_size = 0,
		\EE_Registry $registry,
		CommandBusInterface $command_bus
	) {
		// grab the related ticket object for this line_item
		$this->ticket = $ticket_line_item->ticket();
		if ( ! $this->ticket instanceof \EE_Ticket ) {
			throw new InvalidEntityException(
				is_object( $this->ticket ) ? get_class( $this->ticket ) : gettype( $this->ticket ),
				'EE_Ticket',
				sprintf(
					__( "Line item %s did not contain a valid ticket", "event_espresso" ),
					$ticket_line_item->ID()
				)
			);
		}
		$this->transaction = $transaction;
		$this->ticket_line_item = $ticket_line_item;
		$this->reg_count = absint( $reg_count );
		$this->reg_group_size = absint( $reg_group_size );
		parent::__construct( $registry, $command_bus, 'registration' );
	}



	/**
	 * @return \EE_Transaction
	 */
	public function transaction() {
		return $this->transaction;
	}



	/**
	 * @return \EE_Ticket
	 */
	public function ticket() {
		return $this->ticket;
	}



	/**
	 * @return \EE_Line_Item
	 */
	public function ticketLineItem() {
		return $this->ticket_line_item;
	}



	/**
	 * @return int
	 */
	public function regCount() {
		return $this->reg_count;
	}



	/**
	 * @return int
	 */
	public function regGroupSize() {
		return $this->reg_group_size;
	}



	/**
	 * @return \EE_Registration
	 */
	public function registration() {
		return $this->registration;
	}




}
// End of file CreateRegistrationCommand.php
// Location: /CreateRegistrationCommand.php