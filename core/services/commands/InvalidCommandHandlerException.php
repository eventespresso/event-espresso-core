<?php
namespace EventEspresso\core\services\commands;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class InvalidCommandHandlerException
 * thrown when the Command Handler for a Command could not be resolved
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class InvalidCommandHandlerException extends \DomainException
{

	/**
	 * @access public
	 * @param  string     $command_name
	 * @param  string     $message
	 * @param  int        $code
	 * @param  \Exception $previous
	 */
	public function __construct( $command_name, $message = '', $code = 0, \Exception $previous = null ) {
		if ( empty( $message ) ) {
			$message = sprintf(
				__( 'The supplied Command Handler "%1$s" does not have a valid name. It should be in the following format: "{CommandName}Handler" ', 'event_espresso' ),
				$command_name
			);
		}
		parent::__construct( $message, $code, $previous );
	}

}
// End of file InvalidCommandHandlerException.php
// Location: core/services/commands/InvalidCommandHandlerException.php