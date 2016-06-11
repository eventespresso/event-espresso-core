<?php
namespace EventEspresso\core\services\commands;


if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class Command
 * Abstract parent class for Command DTOs (Data Transfer Object)
 * that route specific data from client code to a specific CommandHandler.
 * Data is set upon construction, and then passed to the CommandBus
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
abstract class Command implements CommandInterface
{



}
// End of file Command.php
// Location: /Command.php