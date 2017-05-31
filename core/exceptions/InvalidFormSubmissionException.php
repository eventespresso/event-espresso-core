<?php
namespace EventEspresso\core\exceptions;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class InvalidFormSubmissionException
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class InvalidFormSubmissionException extends \OutOfBoundsException {


	/**
	 * InvalidFormSubmissionException constructor
	 *
	 * @param string     $form_name
	 * @param string     $message
	 * @param int        $code
	 * @param \Exception $previous
	 */
	public function __construct( $form_name, $message = '', $code = 0, \Exception $previous = null ) {
		if ( empty( $message ) ) {
			$message = sprintf(
				__(
					'The data for the "%1$s" form, is either missing or was not submitted properly.',
					'event_espresso'
				),
				$form_name
			);
		}
		parent::__construct( $message, $code, $previous );
	}

}
// End of file InvalidFormSubmissionException.php
// Location: /InvalidFormSubmissionException.php