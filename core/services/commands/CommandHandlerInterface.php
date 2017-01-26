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

}
// End of file CommandHandlerInterface.php
// Location: core/services/commands/CommandHandlerInterface.php