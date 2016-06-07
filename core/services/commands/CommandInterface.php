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
	 * @return mixed
	 */
	public function execute();

}
// End of file CommandInterface.php
// Location: core/services/commands/CommandInterface.php