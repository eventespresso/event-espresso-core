<?php
namespace EventEspresso\core\services\commands;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Interface CommandRequiresCapCheckInterface
 * this interface is used to identify Command classes
 * that require a permissions check before they can be executed.
 *
 * @package EventEspresso\core\services\commands
 */
interface CommandRequiresCapCheckInterface {

	/**
	 * @return \EventEspresso\core\domain\services\capabilities\CapCheck
	 */
	public function getCapCheck();

}
// End of file CommandRequiresCapCheckInterface.php
// Location: /CommandRequiresCapCheckInterface.php