<?php
namespace EventEspresso\core\exceptions;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * Class InvalidEntityException
 * thrown when an entity is not of the expected instance
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
 class InvalidEntityException extends \InvalidArgumentException {

	 /**
	  * InvalidInterfaceException constructor.
	  *
	  * @param string     $actual   classname of what we got
	  * @param string     $expected classname of the entity we wanted
	  * @param string     $message
	  * @param int        $code
	  * @param \Exception $previous
	  */
	 public function __construct( $actual, $expected, $message = '', $code = 0, \Exception $previous = null ) {
		 if ( empty( $message ) ) {
			 $message = sprintf(
				 __(
					 'The supplied entity is an instance of "%1$s", but an instance of "%2$s" was expected.',
					 'event_espresso'
				 ),
				 is_object($actual) ? get_class($actual) : gettype($actual),
				 $expected
			 );
		 }
		 parent::__construct( $message, $code, $previous );
	 }

 }
// End of file InvalidEntityException.php
// Location: /InvalidEntityException.php