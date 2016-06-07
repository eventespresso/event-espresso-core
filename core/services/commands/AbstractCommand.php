<?php
namespace EventEspresso\core\services\commands;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class AbstractCommand
 * Abstract parent class for self executing DTOs (Data Transfer Object)
 * that route specific data from client code to a specific CommandHandler.
 * Data is set upon construction, and then passed to the CommandBus
 * by calling execute() on the command itself
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
abstract class AbstractCommand implements CommandInterface
{

	/**
	 * @var CommandBusInterface $command_bus
	 */
	private $command_bus;


	/**
	 * AbstractCommand constructor
	 *
	 * @param CommandBusInterface $command_bus
	 */
	public function __construct( CommandBusInterface $command_bus )
	{
		$this->command_bus = $command_bus;
	}



	/**
	 * @return \EventEspresso\core\services\commands\CommandBusInterface
	 */
	public function commandBus() {
		return $this->command_bus;
	}



	/**
	 * @return mixed
	 */
	public function execute()
	{
		return $this->command_bus->execute( $this );
	}


}
// End of file AbstractCommand.php
// Location: /AbstractCommand.php