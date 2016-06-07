<?php
namespace EventEspresso\core\services\commands;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Interface SelfExecutingCommandInterface
 *
 * @package EventEspresso\core\services\commands
 */
interface SelfExecutingCommandInterface extends CommandInterface {

	/**
	 * @return mixed
	 */
	public function execute();
	
}
// End of file SelfExecutingCommandInterface.php
// Location: /SelfExecutingCommandInterface.php