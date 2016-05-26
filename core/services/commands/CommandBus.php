<?php
namespace EventEspresso\core\services\commands;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class CommandBus
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class CommandBus implements CommandBusInterface
{

	/**
	 * @type CommandHandlerManagerInterface $command_handler_manager
	 */
	private $command_handler_manager;



	/**
	 * CommandBus constructor.
	 *
	 * @param \EventEspresso\core\services\commands\CommandHandlerManagerInterface $command_handler_manager
	 */
	public function __construct( CommandHandlerManagerInterface $command_handler_manager )
	{
		$this->command_handler_manager = $command_handler_manager;
	}



	/**
	 * @return CommandHandlerManagerInterface
	 */
	public function getCommandHandlerManager() {
		return $this->command_handler_manager;
	}



	/**
	 * @param \EventEspresso\core\services\commands\CommandInterface $command
	 * @return mixed
	 */
	public function execute( CommandInterface $command )
	{
		$command_handler = $this->command_handler_manager->getCommandHandler( $command );
		return $command_handler->handle( $command );
	}


}
// End of file CommandBus.php
// Location: core/services/commands/CommandBus.php