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
	 * name of the file to log exceptions to
	 */
	const EXCEPTION_LOG_FILE = 'espresso_error_log.txt';



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
	 * @param bool       $clear
	 */
	public function log( \Exception $exception, $time = 0, $clear = false ) {

		if ( empty( $exception ) ) {
			return;
		}
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
		try {
			\EEH_File::ensure_file_exists_and_is_writable(
				EVENT_ESPRESSO_UPLOAD_DIR . 'logs' . DS . ExceptionLogger::EXCEPTION_LOG_FILE
			);
			\EEH_File::add_htaccess_deny_from_all( EVENT_ESPRESSO_UPLOAD_DIR . 'logs' );
			if ( ! $clear ) {
				//get existing log file and append new log info
				$exception_log = \EEH_File::get_file_contents(
						EVENT_ESPRESSO_UPLOAD_DIR . 'logs' . DS . ExceptionLogger::EXCEPTION_LOG_FILE
					) . $exception_log;
			}
			\EEH_File::write_to_file(
				EVENT_ESPRESSO_UPLOAD_DIR . 'logs' . DS . ExceptionLogger::EXCEPTION_LOG_FILE,
				$exception_log
			);
		} catch ( \Exception $e ) {
			\EE_Error::add_error(
				sprintf(
					__( 'Event Espresso error logging could not be setup because: %s', 'event_espresso' ),
					$e->getMessage()
				)
			);
			return;
		}
	}

}
// End of file ExceptionLogger.php
// Location: /ExceptionLogger.php