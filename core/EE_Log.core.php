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
	 * @var array
	 */
	private $_log = array();

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
		// don't log WP Heartbeat API calls
		if ( isset( $_POST[ "action" ] ) && $_POST[ "action" ] == 'heartbeat' ) {
			return;
		}

		$config = $this->_set_config();
		if ( ! $config->use_full_logging && ! $config->use_remote_logging ) {
			return;
		}

		$this->_logs_folder = EVENT_ESPRESSO_UPLOAD_DIR . 'logs' . DS;
		$this->_log_file = $config->log_file_name;
		$this->_log = array();
		$this->_debug_file = $config->debug_file_name;
		$this->_debug_log = '';
		$this->_remote_logging_url = $config->remote_logging_url;
		$this->_remote_log = '';

		add_action( 'admin_init', array( $this, 'verify_filesystem' ), -10 );
		add_action( 'AHEE_log', array( $this, 'log' ), 10, 5 );
		if ( $config->use_full_logging ) {
			add_action( 'shutdown', array( $this, 'write_log' ), 9999 );
			// if WP_DEBUG
			add_action( 'shutdown', array( $this, 'write_debug' ), 9999 );
		}
		if ( $config->use_remote_logging ) {
			add_action( 'shutdown', array( $this, 'send_log' ), 9999 );
		}

	}



	/**
	 *    _set_config
	 * @return stdClass
	 */
	protected function _set_config() {
		$config = new stdClass();
		if ( EE_Registry::instance()->CFG instanceof EE_Config && EE_Registry::instance()->CFG->admin instanceof EE_Admin_Config ) {
			$config->use_full_logging = EE_Registry::instance()->CFG->admin->use_full_logging;
			$config->use_remote_logging = EE_Registry::instance()->CFG->admin->use_remote_logging;
			$config->remote_logging_url = EE_Registry::instance()->CFG->admin->remote_logging_url;
			$config->log_file_name = EE_Registry::instance()->CFG->admin->log_file_name();
			$config->debug_file_name = EE_Registry::instance()->CFG->admin->debug_file_name();
		} else if ( WP_DEBUG ) {
			$config->use_full_logging = true;
			$config->use_remote_logging = false;
			$config->remote_logging_url = '';
			$config->log_file_name = sanitize_key( 'espresso_log_' . md5( NONCE_SALT ) ) . '.txt';
			$config->debug_file_name = sanitize_key( 'espresso_debug_' . md5( NONCE_SALT ) ) . '.txt';
		} else {
			$config->use_full_logging = false;
			$config->use_remote_logging = false;
		}
		return $config;
	}



	/**
	 *	verify_filesystem
	 * tests that the required files and folders exist and are writable
	 *
	 */
	public function verify_filesystem() {
		try {
			EE_Registry::instance()->load_helper( 'File' );
			EEH_File::ensure_folder_exists_and_is_writable( EVENT_ESPRESSO_UPLOAD_DIR );
			EEH_File::ensure_folder_exists_and_is_writable( $this->_logs_folder );
			EEH_File::add_htaccess_deny_from_all( $this->_logs_folder );
			foreach ( $this->_log as $file_prefix => $log ) {
				EEH_File::ensure_file_exists_and_is_writable( $this->_logs_folder . $file_prefix . $this->_log_file );
			}
			EEH_File::ensure_file_exists_and_is_writable( $this->_logs_folder . $this->_debug_file );
		} catch( EE_Error $e ){
			EE_Error::add_error(
				sprintf(
					__(  'Event Espresso logging could not be setup because: %s', 'event_espresso' ),
					' &nbsp; &nbsp; ' . $e->getMessage()
				),
				__FILE__, __FUNCTION__, __LINE__
			);
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
		$msg = current_time( 'mysql' ) . " . . ";
		$where = ! empty( $file ) ? basename( $file ) : '';
		$is_file = strpos( $where, '.php' ) !== false ? true : false;
		$where .= ! empty( $file ) && ! empty( $function ) && ! $is_file ? " -> " : '';
		if ( ! empty( $function ) && ! $is_file ) {
			$where .= $function;
		} else {
			$message = ! empty( $message ) ? $function . "\t:\t" . $message : $function;
		}
		$where .= ! $is_file ? '()' : '';
		$msg .= $where;
		if ( ! empty( $message ) ) {
			$tabs = floor( 60 - strlen( $where ) );
			for ( $x = 0; $x <= $tabs; $x++ ) {
				$msg .= " .";
			}
		}
		$type = ! empty( $type ) ? ltrim( $type, '$' ) . "\t=\t" : "\t";
		$msg .= ! empty( $message ) ? " " . $type . $message : '';
		$msg .= PHP_EOL;
		return $msg;
	}



	/**
	 *    log
	 * adds content to the EE_Log->_log property which gets written to file
	 * during the WP 'shutdown' hookpoint via the EE_Log::write_log() callback
	 *
	 * @param string $file
	 * @param string $function
	 * @param string $message
	 * @param string $type
	 * @param string $file_prefix
	 */
	public function log( $file = '', $function = '', $message = '', $type = '', $file_prefix = '' ) {
		$file_prefix = ! empty( $file_prefix ) ? sanitize_key( rtrim( $file_prefix, '_'  ) ) . '_' : '';
		$this->_log[ $file_prefix ] = isset( $this->_log[ $file_prefix ] ) ? $this->_log[ $file_prefix ] : '';
		$this->_log[ $file_prefix ] .= $this->_format_message( $file, $function, $message, $type );
	}



	/**
	 * write_log
	 * appends the results of the 'AHEE_log' filter to the espresso log file
	 */
	public function write_log() {
		try {
			foreach ( $this->_log as $file_prefix => $log ) {
				$full_path_to_log_file = $this->_logs_folder . $file_prefix . $this->_log_file;
				//get existing log file and append new log info
				$log = EEH_File::get_file_contents( $full_path_to_log_file ) . $log;
				// now break apart by line
				$log = explode( PHP_EOL, $log );
				// how many lines should log files be?
				$log_file_size_in_lines = apply_filters( 'FHEE__EE_Log__write_log__log_file_size_in_lines', 1000 );
				// extract only the last ### lines so that the log doesn't grow too big
				$log = array_slice( $log, absint( $log_file_size_in_lines ) * -1 );
				// put file back together
				$log = implode( PHP_EOL, $log );
				EEH_File::write_to_file( $full_path_to_log_file, $log, 'Event Espresso Log' );
			}
		} catch( EE_Error $e ){
			EE_Error::add_error(
				sprintf(
					__(  'Could not write to the Event Espresso log file because: %s', 'event_espresso' ),
					' &nbsp; &nbsp; ' . $e->getMessage()
				),
				__FILE__, __FUNCTION__, __LINE__
			);
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

		$data = 'domain=' . filter_input( INPUT_SERVER, 'HTTP_HOST', FILTER_SANITIZE_URL );
		$data .= '&ip=' . filter_input( INPUT_SERVER, 'SERVER_ADDR', FILTER_SANITIZE_URL );
		$data .= '&server_type=' . filter_input( INPUT_SERVER, 'SERVER_SOFTWARE', FILTER_SANITIZE_STRING );
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
		if ( WP_DEBUG && ! empty( $_GET ) && ! empty( $_POST ) ) {
			$this->_debug_log = '';
			foreach ( $_GET as $key => $value ) {
				$this->_debug_log .= '$_GET["' . $key . '"] = "' . serialize( $value ) . '"' . PHP_EOL;
			}
			foreach ( $_POST as $key => $value ) {
				$this->_debug_log .= '$_POST["' . $key . '"] = "' . serialize( $value ) . '"' . PHP_EOL;
			}
			try {
				EEH_File::write_to_file( $this->_logs_folder . $this->_debug_file, $this->_debug_log, 'Event Espresso Debug Log' );
			} catch ( EE_Error $e ) {
				EE_Error::add_error(
					sprintf(
						__( 'Could not write to the Event Espresso debug log file because: %s', 'event_espresso' ),
						' &nbsp; &nbsp; ' . $e->getMessage()
					),
					__FILE__, __FUNCTION__, __LINE__
				);
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