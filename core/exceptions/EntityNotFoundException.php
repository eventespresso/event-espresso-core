<?php
namespace EventEspresso\core\exceptions;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class EntityNotFoundException
 * thrown if attempting to retrieve an entity from some location (collection, database, etc)
 * but it was not found using the supplied identifier
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class EntityNotFoundException extends \UnexpectedValueException {


	/**
	 * EntityNotFoundException constructor
	 *
	 * @param string     $identifier_type the name of the identifier used (ie: ID, Name, etc)
	 * @param string     $identifier      the actual data value used to retrieve the entity
	 * @param string     $message
	 * @param int        $code
	 * @param \Exception $previous
	 */
	public function __construct( $identifier_type, $identifier, $message = '', $code = 0, \Exception $previous = null ) {
		if ( empty( $message ) ) {
			$message = sprintf(
				__(
					'The requested entity with %1$s="%2$s" was not found.',
					'event_espresso'
				),
				$identifier_type,
				$identifier
			);
		}
		parent::__construct( $message, $code, $previous );
	}


}
// End of file EntityNotFoundException.php
// Location: /EntityNotFoundException.php