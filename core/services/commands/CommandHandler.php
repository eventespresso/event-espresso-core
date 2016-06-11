<?php
namespace EventEspresso\core\services\commands;

use EventEspresso\core\exceptions\InvalidDataTypeException;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class CommandHandler
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
abstract class CommandHandler implements CommandHandlerInterface
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
	 * @param \EventEspresso\core\services\commands\CommandInterface $command
	 * @return mixed
	 */
	abstract public function handle( CommandInterface $command );



	/**
	 * @return \EE_Registry
	 */
	public function registry()
	{
		return $this->registry;
	}



	/**
	 * @return \EventEspresso\core\services\commands\CommandBusInterface
	 */
	public function commandBus()
	{
		return $this->command_bus;
	}



	/**
	 * @param string $command_name
	 * @param array  $arguments
	 * @return mixed
	 */
	public function executeSubCommand( $command_name, $arguments = array() )
	{
		if ( ! is_string( $command_name ) ) {
			throw new InvalidDataTypeException( '$command_name', $command_name, 'string' );
		}
		$command = $this->registry->create( $command_name, (array) $arguments );
		if ( ! $command instanceof CommandInterface ) {
			throw new InvalidDataTypeException( __METHOD__ . '( $command )', $command, 'CommandInterface' );
		}
		return $this->command_bus->execute(
			$command
		);
	}



}
// End of file CommandHandler.php
// Location: /CommandHandler.php