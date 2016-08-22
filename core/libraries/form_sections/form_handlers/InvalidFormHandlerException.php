<?php
namespace EventEspresso\core\libraries\form_sections\form_handlers;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class InvalidFormHandlerException
 * thrown when a FormHandler class is found to be invalid
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class InvalidFormHandlerException extends \UnexpectedValueException
{

	/**
	 * InvalidFormHandlerException constructor.
	 *
	 * @param string $actual the FormHandler object that was received
	 * @param string     $message
	 * @param int        $code
	 * @param \Exception $previous
	 */
	public function __construct( $actual, $message = '', $code = 0, \Exception $previous = null ) {
		if ( empty( $message ) ) {
			$message = sprintf(
				__(
					'A valid Form Handler was expected but instead "%1$s" was received.',
					'event_espresso'
				),
				$actual
			);
		}
		parent::__construct( $message, $code, $previous );
	}

}
// End of file InvalidFormHandlerException.php
// Location: /InvalidFormHandlerException.php