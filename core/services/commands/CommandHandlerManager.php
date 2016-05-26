<?php
namespace EventEspresso\core\services\commands;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class CommandHandlerManager
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class CommandHandlerManager implements CommandHandlerManagerInterface
{

	/**
	 * @var CommandHandlerInterface[] $commandHandlers
	 */
	private $commandHandlers;



	/**
	 * @param \EventEspresso\core\services\commands\CommandHandlerInterface $command_handler
	 * @return mixed
	 */
	public function addCommandHandler( CommandHandlerInterface $command_handler )
	{
		$command_name = preg_replace( '/(.*)Handler$/i', '$1', get_class( $command_handler ) );
		if ( empty( $command_name ) ) {
			throw new InvalidCommandHandlerException( $command_name );
		}
		$this->commandHandlers[ $command_name ] = $command_handler;
	}



	/**
	 * @param \EventEspresso\core\services\commands\CommandInterface $command
	 * @return mixed
	 */
	public function getCommandHandler( CommandInterface $command )
	{
		$command_name = get_class( $command );
		if ( isset( $this->commandHandlers[ $command_name ] ) ) {
			return $this->commandHandlers[ $command_name ];
		}
		throw new CommandHandlerNotFoundException( $command_name );
	}


}
// End of file CommandHandlerManager.php
// Location: core/services/commands/CommandHandlerManager.php