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
	 * @type \EE_Registry $registry
	 */
	private $registry;



	/**
	 * CommandHandlerManager constructor
	 *
	 * @param \EE_Registry $registry
	 */
	public function __construct( \EE_Registry $registry ) {
		$this->registry = $registry;
	}



	/**
	 * By default, Commands and CommandHandlers would normally
	 * reside in the same folder under the same namespace,
	 * and the names of the two classes would only differ in that
	 * one ends in "Command" and the other ends in "CommandHandler".
	 * However, if you wanted to utilize a CommandHandler from somewhere else,
	 * then this method allows you to add that CommandHandler and specify the FQCN
	 * (Fully Qualified ClassName) for the Command class that it should be used for.
	 *
	 * For example:
	 *      by default the "Vendor\some\namespace\DoSomethingCommand"
	 *      would resolve to using "Vendor\some\namespace\DoSomethingCommandHandler"
	 *      but if you wanted to instead process that commend using:
	 *      "Vendor\a\totally\different\namespace\for\DoSomethingCommandHandler"
	 *      then the following code:
	 *
     *      $CommandHandlerManager = EE_Registry::instance()->create( 'CommandHandlerManagerInterface' );
	 *      $CommandHandlerManager->addCommandHandler(
	 *          new Vendor\a\totally\different\namespace\for\DoSomethingCommandHandler(),
	 *          'Vendor\some\namespace\DoSomethingCommand'
	 *      );
	 *
	 *      would result in the alternate CommandHandler being used to process that Command
	 *
	 * @param \EventEspresso\core\services\commands\CommandHandlerInterface $command_handler
	 * @param string $fqcn_for_command Fully Qualified ClassName for Command
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
			return $this->registry->create( $command_handler );
		}
		throw new CommandHandlerNotFoundException( $command_handler );
	}


}
// End of file CommandHandlerManager.php
// Location: core/services/commands/CommandHandlerManager.php