<?php
namespace EventEspresso\core\exceptions;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class InvalidFilePathException
 * thrown when is_readable() returns false for a given filepath
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class InvalidFilePathException extends \InvalidArgumentException {

	/**
	 * InvalidClassException constructor.
	 *
	 * @param string     $file_path
	 * @param string     $message
	 * @param int        $code
	 * @param \Exception $previous
	 */
	public function __construct( $file_path, $message = '', $code = 0, \Exception $previous = null ) {
		if ( empty( $message ) ) {
			$message = sprintf(
				__(
					'The "%1$s" file is either missing or could not be read due to permissions. Please ensure that the following path is correct and verify that the file permissions are correct:%2$s %3$s',
					'event_espresso'
				),
				basename( $file_path ),
				'<br />',
				$file_path
			);
		}
		parent::__construct( $message, $code, $previous );
	}

}
// End of file InvalidFilePathException.php
// Location: core/exceptions/InvalidFilePathException.php