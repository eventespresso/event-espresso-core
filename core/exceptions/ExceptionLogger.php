<?php
namespace EventEspresso\core\exceptions;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class ExceptionLogger
 * writes exception details to log file
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0.
 */
class ExceptionLogger {



	/**
	 * ExceptionLogger constructor.
	 *
	 * @param \Exception $exception
	 */
	public function __construct( \Exception $exception ) {
		$this->log( $exception );
	}



	/**
	 * write exception details to log file
	 *
	 * @param \Exception $exception
	 * @param int        $time
	 */
	public function log( \Exception $exception, $time = 0 ) {
		if ( ! $time ) {
			$time = time();
		}
		$exception_log = '----------------------------------------------------------------------------------------';
		$exception_log .= PHP_EOL;
		$exception_log .= '[' . date( 'Y-m-d H:i:s', $time ) . ']  Exception Details' . PHP_EOL;
		$exception_log .= 'Message: ' . $exception->getMessage() . PHP_EOL;
		$exception_log .= 'Code: ' . $exception->getCode() . PHP_EOL;
		$exception_log .= 'File: ' . $exception->getFile() . PHP_EOL;
		$exception_log .= 'Line No: ' . $exception->getLine() . PHP_EOL;
		$exception_log .= 'Stack trace: ' . PHP_EOL;
		$exception_log .= $exception->getTraceAsString() . PHP_EOL;
		$exception_log .= '----------------------------------------------------------------------------------------';
		$exception_log .=  PHP_EOL;
		error_log( $exception_log );
	}

}
// End of file ExceptionLogger.php
// Location: /ExceptionLogger.php