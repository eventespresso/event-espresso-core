<?php
namespace EventEspresso\Core\Exceptions;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class InvalidClassException
 * thrown when an invalid or missing class name is used
 *
*@package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class InvalidClassException extends \EE_Error {

	/**
	 * InvalidClassException constructor.

*
*@param string $class_name
	 */
	public function __construct( $class_name ) {
		parent::__construct(
			sprintf(
				__( 'The "%1$s" Class is either missing or invalid.', 'event_espresso' ),
				$class_name
			)
		);
	}

}
// End of file InvalidClassException.php
// Location: core/exceptions/InvalidClassException.php