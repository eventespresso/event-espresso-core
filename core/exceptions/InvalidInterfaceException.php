<?php
namespace EventEspresso\Core\Exceptions;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class InvalidInterfaceException
 * thrown when an invalid or missing interface name is used

*
*@package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 * @since         $VID:$
 */
class InvalidInterfaceException extends \EE_Error {

	/**
	 * InvalidInterfaceException constructor.
	 *
	 * @param string $interface_name
	 */
	public function __construct( $interface_name ) {
		parent::__construct(
			sprintf(
				__( 'The "%1$s" Interface is either missing or invalid.', 'event_espresso' ),
				$interface_name
			)
		);
	}

}
// End of file InvalidInterfaceException.php
// Location: core/exceptions/InvalidInterfaceException.php