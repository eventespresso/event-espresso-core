<?php
namespace EventEspresso\core\services\commands;

use EventEspresso\core\exceptions\InvalidDataTypeException;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class Command
 * Abstract parent class for self executing DTOs (Data Transfer Object)
 * that route specific data from client code to a specific CommandHandler.
 * Data is set upon construction, and then passed to the CommandBus
 * by calling execute() on the command itself
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
abstract class Command implements CommandInterface
{

	/**
	 * @var \EE_Registry $registry
	 */
	private $registry;

	/**
	 * @var CommandBusInterface $command_bus
	 */
	private $command_bus;



	/**
	 * Command constructor
	 *
	 * @param \EE_Registry        $registry
	 * @param CommandBusInterface $command_bus
	 */
	public function __construct( \EE_Registry $registry, CommandBusInterface $command_bus )
	{
		$this->registry = $registry;
		$this->command_bus = $command_bus;
	}



	/**
	 * @return \EE_Registry
	 */
	public function registry() {
		return $this->registry;
	}



	/**
	 * @return \EventEspresso\core\services\commands\CommandBusInterface
	 */
	public function commandBus() {
		return $this->command_bus;
	}



	/**
	 * @param string $command_name
	 * @param array  $arguments
	 * @return mixed
	 */
	public function executeSubCommand( $command_name, $arguments = array() ) {
		if ( ! is_string( $command_name ) ) {
			throw new InvalidDataTypeException( '$command_name', $command_name, 'string' );
		}
		return $this->registry->create( $command_name, (array) $arguments );
	}



}
// End of file Command.php
// Location: /Command.php