<?php
namespace EventEspresso\Core\Exceptions;

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
 class InvalidEntityException extends \EE_Error {

	 /**
	  * InvalidInterfaceException constructor.
	  *
	  * @param string $actual classname of what we got
	  * @param string $expected classname of the entity we wanted
	  */
	 public function __construct( $actual, $expected ) {
		 parent::__construct(
			 sprintf(
				 __( 'The supplied entity is an instance of "%1$s", but an instance of "%2$s" was expected.', 'event_espresso' ),
				 $actual,
				 $expected
			 )
		 );
	 }

 }
// End of file InvalidEntityException.php
// Location: /InvalidEntityException.php