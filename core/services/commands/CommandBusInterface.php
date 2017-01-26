<?php
namespace EventEspresso\core\services\commands;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Interface CommandBusInterface
 *
 * @package EventEspresso\core\services\commands
 */
interface CommandBusInterface {

	/**
	 * @return CommandHandlerManagerInterface
	 */
	public function getCommandHandlerManager();

	/**
	 * @param \EventEspresso\core\services\commands\CommandInterface $command
	 * @return mixed
	 */
	public function execute( $command );

}
// End of file CommandBusInterface.php
// Location: core/services/commands/CommandBusInterface.php