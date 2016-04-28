<?php
namespace EventEspresso\Core\Exceptions;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * Class InvalidIdentifierException
 * thrown when an identifier is invalid
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
 class InvalidIdentifierException extends \EE_Error {

	 /**
	  * InvalidIdentifierException constructor.
	  *
	  * @param string $actual the identifier that was supplied
	  * @param string $expected example of an acceptable identifier
	  */
	 public function __construct( $actual, $expected ) {
		 parent::__construct(
			 sprintf(
				 __(
					 'The supplied identifier "%1$s" is invalid. A value like "%2$s" was expected.',
					 'event_espresso'
				 ),
				 $actual,
				 $expected
			 )
		 );
	 }

 }
// End of file InvalidIdentifierException.php
// Location: /InvalidIdentifierException.php