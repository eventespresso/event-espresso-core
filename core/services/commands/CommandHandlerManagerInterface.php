<?php
namespace EventEspresso\core\services\commands;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Interface CommandHandlerManagerInterface
 *
 * @package EventEspresso\core\services\commands
 */
interface CommandHandlerManagerInterface
{

	/**
	 * @param \EventEspresso\core\services\commands\CommandHandlerInterface $command_handler
	 * @return mixed
	 */
	public function addCommandHandler( CommandHandlerInterface $command_handler );


	/**
	 * @param \EventEspresso\core\services\commands\CommandInterface $command
	 * @return mixed
	 */
	public function getCommandHandler( CommandInterface $command );

}
// End of file CommandHandlerManagerInterface.php
// Location: core/services/commands/CommandHandlerManagerInterface.php