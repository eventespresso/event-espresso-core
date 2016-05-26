<?php
namespace EventEspresso\core\services\commands;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class CommandHandlerManager
 * Connects a Command with its corresponding Command Handler
 * Command Handlers can be specified explicitly using addCommandHandler()
 * or determined dynamically if the Command and Command Handler share the exact same namespace
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
	 * @param string $fqcn_for_command
	 * @return mixed
	 */
	public function addCommandHandler( CommandHandlerInterface $command_handler, $fqcn_for_command = '' )
	{
		$command = ! empty( $fqcn_for_command )
			? $fqcn_for_command
			: str_replace( 'CommandHandler', 'Command', get_class( $command_handler ) );
		if ( empty( $command ) ) {
			throw new InvalidCommandHandlerException( $command );
		}
		$this->commandHandlers[ $command ] = $command_handler;
	}



	/**
	 * @param \EventEspresso\core\services\commands\CommandInterface $command
	 * @return mixed
	 */
	public function getCommandHandler( CommandInterface $command )
	{
		$command_name = get_class( $command );
		$command_handler = str_replace( 'Command', 'CommandHandler', $command_name );
		// has a command handler already been set for this class ?
		// if not, can we find one via the FQCN ?
		if ( isset( $this->commandHandlers[ $command_name ] ) ) {
			return $this->commandHandlers[ $command_name ];
		} else if ( class_exists( $command_handler ) ) {
			return new $command_handler();
		}
		throw new CommandHandlerNotFoundException( $command_handler );
	}


}
// End of file CommandHandlerManager.php
// Location: core/services/commands/CommandHandlerManager.php