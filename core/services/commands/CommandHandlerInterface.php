<?php
namespace EventEspresso\core\services\commands;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Interface CommandHandlerInterface
 *
 * @package EventEspresso\core\services\commands
 */
interface CommandHandlerInterface
{

	/**
	 * @param \EventEspresso\core\services\commands\CommandInterface $command
	 * @return mixed
	 */
	public function handle( CommandInterface $command );



	/**
	 * @return \EventEspresso\core\services\commands\CommandBusInterface
	 */
	public function commandBus();



	/**
	 * @return \EE_Registry
	 */
	public function registry();



	/**
	 * Given a valid Command class name, will execute that Command using the supplied arguments array
	 *
	 * @param string $command_name
	 * @param array  $arguments
	 * @return mixed
	 */
	public function executeSubCommand( $command_name, $arguments = array() );


}
// End of file CommandHandlerInterface.php
// Location: core/services/commands/CommandHandlerInterface.php