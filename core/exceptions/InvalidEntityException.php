<?php
namespace EventEspresso\Core\Exceptions;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * Class InvalidEntityException
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
 class InvalidEntityException extends \EE_Error {

	 /**
	  * InvalidInterfaceException constructor.
	  *
	  * @param string $expected classname of the entity we wanted
	  * @param string $actual classname of what we got
	  */
	 public function __construct( $expected, $actual ) {
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