<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 *
 * Class EE_Log
 *
 * Singleton logging class. Can be called from anywhere in the plugin to log data to a log file.
 * Defaults to wp-content/uploads/espresso/logs/espresso_log.txt
 * Usage:
 * do_action( 'AHEE_log', __FILE__, __FUNCTION__, 'logging message' );
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Sidney Harrel, Brent Christensen
 *
 */
class EE_Log {

	/**
	 * @var string
	 */
	private $_logs_folder = '';

	/**
	 * @var string
	 */
	private $_log_file = '';

	/**
	 * @var string
	 */
	private $_log = '';

	/**
	 * @var string
	 */
	private $_debug_file = '';

	/**
	 * @var string
	 */
	private $_debug_log = '';

	/**
	 * Used for remote logging
	 * @var string
	 */
	private $_remote_logging_url = '';

	/**
	 * @var string
	 */
	private $_remote_log = '';

	/**
	 * @var EE_Log
	 */
	private static $_instance;



	/**
	 * @return EE_Log
	 */
	public static function instance() {
		if ( ! self::$_instance instanceof EE_Log ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	/**
	 * @access private
	 * @return EE_Log
	 */
	private function __construct() {

		if ( ! EE_Registry::instance()->CFG->admin->use_full_logging && ! EE_Registry::instance()->CFG->admin->use_remote_logging ) {
			return;
		}

		$this->_logs_folder = EVENT_ESPRESSO_UPLOAD_DIR . 'logs' . DS;
		$this->_log_file = EE_Registry::instance()->CFG->admin->log_file_name();
		$this->_log = '';
		$this->_debug_file = EE_Registry::instance()->CFG->admin->debug_file_name();
		$this->_debug_log = '';
		$this->_remote_logging_url = EE_Registry::instance()->CFG->admin->remote_logging_url;
		$this->_remote_log = '';

		add_action( 'admin_init', array( $this, 'verify_filesystem' ), -10 );
		add_action( 'AHEE_log', array( $this, 'log' ), 10, 4 );
		if ( EE_Registry::instance()->CFG->admin->use_full_logging ) {
			add_action( 'shutdown', array( $this, 'write_log' ), 9999 );
			// if WP_DEBUG
			add_action( 'shutdown', array( $this, 'write_debug' ), 9999 );
		}
		if ( EE_Registry::instance()->CFG->admin->use_remote_logging ) {
			add_action( 'shutdown', array( $this, 'send_log' ), 9999 );
		}

	}



	/**
	 *	verify_filesystem
	 * tests that the required files and folders exist and are writable
	 *
	 */
	public function verify_filesystem() {
		try {
			EEH_File::ensure_file_exists_and_is_writable( $this->_logs_folder . $this->_log_file );
			EEH_File::ensure_file_exists_and_is_writable( $this->_logs_folder . $this->_debug_file );
			EEH_File::add_htaccess_deny_from_all( $this->_logs_folder );
		} catch( EE_Error $e ){
			EE_Error::add_error( sprintf( __(  'Event Espresso logging could not be setup because: %s', 'event_espresso' ), ' &nbsp; &nbsp; ' . $e->getMessage() ), __FILE__, __FUNCTION__, __LINE__ );
			return;
		}
	}



	/**
	 * 	_format_message
	 * 	makes yer log entries look all purdy
	 *
	 * @param string $file
	 * @param string $function
	 * @param string $message
	 * @param string $type
	 * @return string
	 */
	private function _format_message( $file = '', $function = '', $message = '', $type = '' ) {
		$msg = '----------------------------------------------------------------------------------------' . PHP_EOL;
		$msg .= '[' . current_time( 'mysql' ) . '] ';
		$msg .= ! empty( $file ) ? basename( $file ) : '';
		$msg .= ! empty( $file ) && ! empty( $function ) ? ' -> ' : '';
		$msg .= ! empty( $function ) ? $function . '()' : '';
		$msg .= PHP_EOL;
		$type = ! empty( $type ) ? $type : 'log message';
		$msg .= ! empty( $message ) ? "\t" . '[' . $type . '] ' . $message . PHP_EOL : '';
		return $msg;
	}



	/**
	 *	log
	 * adds content to the EE_Log->_log property which gets written to file during the WP 'shutdown' hookpoint via the EE_Log::write_log() callback
	 *
	 * @param string $file
	 * @param string $function
	 * @param string $message
	 * @param string $type
	 */
	public function log( $file = '', $function = '', $message = '', $type = '' ) {
		$this->_log .= $this->_format_message( $file, $function, $message, $type );
	}



	/**
	 * write_log
	 * appends the results of the 'AHEE_log' filter to the espresso log file
	 */
	public function write_log() {
		try {
			//get existing log file and append new log info
			$this->_log = EEH_File::get_file_contents( $this->_logs_folder . $this->_log_file ) . $this->_log;
			EEH_File::write_to_file( $this->_logs_folder . $this->_log_file, $this->_log, 'Event Espresso Log' );
		} catch( EE_Error $e ){
			EE_Error::add_error( sprintf( __(  'Could not write to the Event Espresso log file because: %s', 'event_espresso' ), ' &nbsp; &nbsp; ' . $e->getMessage() ), __FILE__, __FUNCTION__, __LINE__ );
			return;
		}
	}



	/**
	 * send_log
	 * sends the espresso log to a remote URL via a PHP cURL request
	 */
	public function send_log() {

		if ( empty( $this->_remote_logging_url )) {
			return;
		}

		$data = 'domain=' . $_SERVER['HTTP_HOST'];
		$data .= '&ip=' . $_SERVER['SERVER_ADDR'];
		$data .= '&server_type=' . $_SERVER['SERVER_SOFTWARE'];
		$data .= '&time=' . time();
		$data .= '&remote_log=' . $this->_log;
		$data .= '&request_array=' . json_encode( $_REQUEST );
		$data .= '&action=save';

		if ( defined( 'EELOGGING_PASS' )) {
			$data .= '&pass=' . EELOGGING_PASS;
		}
		if ( defined( 'EELOGGING_KEY' )) {
			$data .= '&key=' . EELOGGING_KEY;
		}

		$c = curl_init( $this->_remote_logging_url );
		curl_setopt( $c, CURLOPT_POST, TRUE );
		curl_setopt( $c, CURLOPT_POSTFIELDS, $data );
		curl_setopt( $c, CURLOPT_RETURNTRANSFER, TRUE );
		curl_exec( $c );
		curl_close( $c );
	}



	/**
	 * write_debug
	 * writes the contents of the current request's $_GET and $_POST arrays to a log file.
	 * previous entries are overwritten
	 */
	public function write_debug() {
		if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
			$this->_debug_log = '';
			foreach ( $_GET as $key => $value ) {
				$this->_debug_log .= '$_GET["' . $key . '"] = "' . serialize($value) . '"' . PHP_EOL;
			}
			foreach ( $_POST as $key => $value ) {
				$this->_debug_log .= '$_POST["' . $key . '"] = "' . serialize($value) . '"' . PHP_EOL;
			}
			try {
				EEH_File::write_to_file( $this->_logs_folder . $this->_debug_file, $this->_debug_log, 'Event Espresso Debug Log' );
			} catch( EE_Error $e ){
				EE_Error::add_error( sprintf( __(  'Could not write to the Event Espresso debug log file because: %s', 'event_espresso' ), ' &nbsp; &nbsp; ' . $e->getMessage() ), __FILE__, __FUNCTION__, __LINE__ );
				return;
			}
		}
	}



	/**
	 * __clone
	 */
	public function __clone() {
		trigger_error( __( 'Clone is not allowed.', 'event_espresso' ), E_USER_ERROR );
	}



}
// End of file EE_Log.core.php
// Location: /core/EE_Log.core.php