<?php
namespace EventEspresso\core\services\commands;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class SelfExecutingCommand
 * Commands that implement SelfExecutingCommandInterface
 * will automatically execute upon instantiation
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class SelfExecutingCommand extends Command implements SelfExecutingCommandInterface
{

	/**
	 * @return mixed
	 */
	public function execute() {
		return $this->commandBus()->execute( $this );
	}

}
// End of file SelfExecutingCommand.php
// Location: /SelfExecutingCommand.php