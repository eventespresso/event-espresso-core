<?php
namespace EventEspresso\core\services\commands;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Interface CommandInterface
 *
 * @package EventEspresso\core\services\commands
 */
interface CommandInterface
{

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
// End of file CommandInterface.php
// Location: core/services/commands/CommandInterface.php