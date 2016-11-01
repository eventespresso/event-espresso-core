<?php
namespace EventEspresso\core\exceptions;

defined( 'ABSPATH' ) || exit;



/**
 * Class InvalidSessionDataException
 * throw when the session data can not be reconstructed from what was in the database
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class InvalidSessionDataException extends \Exception {

	/**
	 * InvalidInterfaceException constructor.
	 *
	 * @param string     $message
	 * @param int        $code
	 * @param \Exception $previous
	 */
	public function __construct( $message = '', $code = 0, \Exception $previous = null ) {
		if ( empty( $message ) ) {
			$message = esc_html__( 'The session data is either missing or invalid.', 'event_espresso' );
		}
		parent::__construct( $message, $code, $previous );
	}


}
// End of file InvalidSessionDataException.php
// Location: EventEspresso\core\exceptions\InvalidSessionDataException.php