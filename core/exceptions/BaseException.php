<?php
namespace EventEspresso\Core\Exceptions;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class BaseException
 * extended by other exceptions
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class BaseException extends \Exception {


	/**
	 *    name of the file to log exceptions to
	 *
	 * @access    private
	 * @var string
	 */
	private static $_exception_log_file = 'espresso_error_log.txt';

	/**
	 *    tracks number of errors
	 *
	 * @access    private
	 * @var int
	 */
	private static $_error_count = 0;

	/**
	 *    stores details for all exception
	 *
	 * @access    private
	 * @var array
	 */
	private static $_all_exceptions = array();



	/**
	 * @param string     $message
	 * @param int        $code
	 * @param \Exception $previous
	 * @throws \EventEspresso\Core\Exceptions\BaseException
	 */
	public function __construct( $message, $code = 0, \Exception $previous = null ) {
		parent::__construct( $message, $code, $previous );
		if ( WP_DEBUG ) {
			$this->get_error();
		}
	}



	/**
	 * @access public
	 * @throws \EventEspresso\Core\Exceptions\BaseException
	 */
	public function get_error() {
		if ( apply_filters( 'FHEE__BaseException__get_error__show_normal_exceptions', false ) ) {
			throw $this;
		}
		// get separate user and developer messages if they exist
		$msg = explode( '||', $this->getMessage() );
		$user_msg = $msg[0];
		$dev_msg = isset( $msg[1] ) ? $msg[1] : $msg[0];
		$msg = WP_DEBUG ? $dev_msg : $user_msg;
		// add details to _all_exceptions array
		$x_time = time();
		self::$_all_exceptions[ $x_time ]['name'] = get_class( $this );
		self::$_all_exceptions[ $x_time ]['file'] = $this->getFile();
		self::$_all_exceptions[ $x_time ]['line'] = $this->getLine();
		self::$_all_exceptions[ $x_time ]['msg'] = $msg;
		self::$_all_exceptions[ $x_time ]['code'] = $this->getCode();
		self::$_all_exceptions[ $x_time ]['trace'] = $this->getTrace();
		self::$_all_exceptions[ $x_time ]['string'] = $this->getTraceAsString();
		self::$_error_count++;
		$this->display_errors();
	}



	/**
	 *    display_errors
	 *
	 * @access public
	 * @echo   string
	 */
	public function display_errors() {
		$error_code = '';
		$trace_details = '';
		$output = BaseException::_exception_styles();
		$output .= '
<div id="ee-error-message" class="error">';
		if ( ! WP_DEBUG ) {
			$output .= '
	<p>';
		}
		// cycle thru errors
		foreach ( self::$_all_exceptions as $time => $ex ) {
			// process trace info
			if ( empty( $ex['trace'] ) ) {
				$trace_details .= __(
					'Sorry, but no trace information was available for this exception.',
					'event_espresso'
				);
			} else {
				$trace_details .= '
			<div id="ee-trace-details">
			<table width="100%" border="0" cellpadding="5" cellspacing="0">
				<tr>
					<th scope="col" align="right" style="width:2.5%;">#</th>
					<th scope="col" align="right" style="width:3.5%;">Line</th>
					<th scope="col" align="left" style="width:40%;">File</th>
					<th scope="col" align="left">' . __( 'Class', 'event_espresso' ) . '->' . __( 'Method( arguments )', 'event_espresso' ) . '</th>
				</tr>';
				$last_on_stack = count( $ex['trace'] ) - 1;
				// reverse array so that stack is in proper chronological order
				$sorted_trace = array_reverse( $ex['trace'] );
				foreach ( $sorted_trace as $nmbr => $trace ) {
					$file = isset( $trace['file'] ) ? $trace['file'] : '';
					$class = isset( $trace['class'] ) ? $trace['class'] : '';
					$type = isset( $trace['type'] ) ? $trace['type'] : '';
					$function = isset( $trace['function'] ) ? $trace['function'] : '';
					$args = isset( $trace['args'] ) ? $this->_convert_args_to_string( $trace['args'] ) : '';
					$args = isset( $trace['args'] ) && count( $trace['args'] ) > 4  ? ' <br />' . $args . '<br />' : $args;
					$line = isset( $trace['line'] ) ? $trace['line'] : '';
					$zebra = $nmbr % 2 !== 0 ? ' odd' : '';
					if ( empty( $file ) && ! empty( $class ) ) {
						$a = new \ReflectionClass( $class );
						$file = $a->getFileName();
						if ( empty( $line ) && ! empty( $function ) ) {
							$b = new \ReflectionMethod( $class, $function );
							$line = $b->getStartLine();
						}
					}
					if ( $nmbr === $last_on_stack ) {
						$file = $ex['file'] !== '' ? $ex['file'] : $file;
						$line = $ex['line'] !== '' ? $ex['line'] : $line;
						$error_code = self::generate_error_code( $file, $trace['function'], $line );
					}
					$file = \EEH_File::standardise_directory_separators( $file );
					$nmbr = ! empty( $nmbr ) ? $nmbr : '&nbsp;';
					$line = ! empty( $line ) ? $line : '&nbsp;';
					$file = ! empty( $file ) ? $file : '&nbsp;';
					$class_display = ! empty( $class ) ? $class : '';
					$type = ! empty( $type ) ? $type : '';
					$function = ! empty( $function ) ? $function : '';
					$args = ! empty( $args ) ? '( ' . $args . ' )' : '()';
					$trace_details .= '
					<tr>
						<td align="right" valign="top" class="' . $zebra . '">' . $nmbr . '</td>
						<td align="right" valign="top" class="' . $zebra . '">' . $line . '</td>
						<td align="left" valign="top" class="' . $zebra . '">' . $file . '</td>
						<td align="left" valign="top" class="' . $zebra . '">' . $class_display . $type . $function . $args . '</td>
					</tr>';
				}
				$trace_details .= '
			 </table>
			</div>';
			}
			$ex['code'] = $ex['code'] ? $ex['code'] : $error_code;
			// add generic non-identifying messages for non-privileged users
			if ( ! WP_DEBUG ) {
				$output .= '<span class="ee-error-user-msg-spn">'
				           . trim( $ex['msg'] )
				           . '</span> &nbsp; <sup>'
				           . $ex['code']
				           . '</sup><br />';
			} else {
				// or helpful developer messages if debugging is on
				$output .= '
		<div class="ee-error-dev-msg-dv">
			<p class="ee-error-dev-msg-pg">
				'
				. sprintf(
					__( '%1$sAn %2$s was thrown!%3$s code: %4$s', 'event_espresso' ),
				    '<strong class="ee-error-dev-msg-str">',
					$ex['name'],
					'</strong>  &nbsp; <span>',
					$ex['code'] . '</span>'
				)
				. '<br />
				<span class="big-text">"'
				           . trim( $ex['msg'] )
				           . '"</span><br/>
				<a id="display-ee-error-trace-'
				           . self::$_error_count
				           . $time
				           . '" class="display-ee-error-trace-lnk small-text" rel="ee-error-trace-'
				           . self::$_error_count
				           . $time
				           . '">
					'
				           . __( 'click to view backtrace and class/method details', 'event_espresso' )
				           . '
				</a><br />
				'
				           . $ex['file']
				           . sprintf(
					           __( '%1$s( line no: %2$s )%3$s', 'event_espresso' ),
					           ' &nbsp; <span class="small-text lt-grey-text">',
					           $ex['line'],
					           '</span>'
				           )
				           . '
			</p>
			<div id="ee-error-trace-'
				           . self::$_error_count
				           . $time
				           . '-dv" class="ee-error-trace-dv" style="display: none;">
				'
				           . $trace_details;
				if ( ! empty( $class ) ) {
					$output .= '
				<div style="padding:3px; margin:0 0 1em; border:1px solid #999; background:#fff; border-radius:3px;">
					<div style="padding:1em 2em; border:1px solid #999; background:#fcfcfc;">
						<h3>' . __( 'Class Details', 'event_espresso' ) . '</h3>';
					$a = new \ReflectionClass( $class );
					$output .= '
						<pre>' . $a . '</pre>
					</div>
				</div>';
				}
				$output .= '
			</div>
		</div>
		<br />';
			}
			$this->write_to_error_log( $time, $ex );
		}
		// remove last linebreak
		$output = substr( $output, 0, count( $output ) - 7 );
		if ( ! WP_DEBUG ) {
			$output .= '
	</p>';
		}
		$output .= '
</div>';
		$output .= self::_print_scripts( true );
		if ( defined( 'DOING_AJAX' ) ) {
			echo json_encode( array( 'error' => $output ) );
			exit();
		}
		echo $output;
		die();
	}



	/**
	 * generate string from exception trace args
	 *
	 * @param array $arguments
	 * @param int   $indent
	 * @param bool  $array
	 * @return string
	 */
	private function _convert_args_to_string( $arguments = array(), $indent = 0, $array = false ) {
		$args = array();
		$args_count = count( $arguments );
		if ( $args_count > 2 ) {
			$indent++;
			$args[] = '<br />';
		}
		$x = 0;
		foreach ( $arguments as $arg ) {
			$x++;
			for( $i = 0; $i < $indent; $i++ ) {
				$args[] = ' &nbsp;&nbsp; ';
			}
			if ( is_string( $arg ) ) {
				if ( ! $array && strlen( $arg ) > 75 ) {
					$args[] = "<br />";
					for ( $i = 0; $i <= $indent; $i++ ) {
						$args[] = ' &nbsp;&nbsp; ';
					}
					$args[] = "'" . $arg . "'<br />";
				} else {
					$args[] = " '" . $arg . "'";
				}
			} elseif ( is_array( $arg ) ) {
				$arg_count = count( $arg );
				if ( $arg_count > 2 ) {
					$indent++;
					$args[] = " array(" . $this->_convert_args_to_string( $arg, $indent, true ) . ")";
					$indent--;
				} else if ( $arg_count === 0 ) {
					$args[] = " array()";
				} else {
					$args[] = " array( " . $this->_convert_args_to_string( $arg ) . " )";
				}
			} elseif ( $arg === null ) {
				$args[] = ' null';
			} elseif ( is_bool( $arg ) ) {
				$args[] = $arg ? ' true' : ' false';
			} elseif ( is_object( $arg ) ) {
				$args[] = get_class( $arg );
			} elseif ( is_resource( $arg ) ) {
				$args[] = get_resource_type( $arg );
			} else {
				$args[] = $arg;
			}
			if ( $x === $args_count ) {
				if ( $args_count > 2 ) {
					$args[] = "<br />";
					$indent--;
					for ( $i = 1; $i < $indent; $i++ ) {
						$args[] = ' &nbsp;&nbsp; ';
					}
				}
			} else {
				$args[] = $args_count > 2 ? ",<br />" : ', ';
			}
		}
		return implode( '', $args );
	}



	/**
	 * create error code from filepath, function name,
	 * and line number where exception or error was thrown
	 *
	 * @access public
	 * @param string $file
	 * @param string $func
	 * @param string $line
	 * @return string
	 */
	public static function generate_error_code( $file = '', $func = '', $line = '' ) {
		$file_bits = explode( '.', basename( $file ) );
		$error_code = ! empty( $file_bits[0] ) ? $file_bits[0] : '';
		$error_code .= ! empty( $func ) ? ' - ' . $func : '';
		$error_code .= ! empty( $line ) ? ' - ' . $line : '';
		return $error_code;
	}



	/**
	 * write exception details to log file
	 *
	 * @param int   $time
	 * @param array $ex
	 * @param bool  $clear
	 */
	public function write_to_error_log( $time = 0, $ex = array(), $clear = false ) {
		if ( empty( $ex ) ) {
			return;
		}
		if ( ! $time ) {
			$time = time();
		}
		$exception_log = '----------------------------------------------------------------------------------------'
		                 . PHP_EOL;
		$exception_log .= '[' . date( 'Y-m-d H:i:s', $time ) . ']  Exception Details' . PHP_EOL;
		$exception_log .= 'Message: ' . $ex['msg'] . PHP_EOL;
		$exception_log .= 'Code: ' . $ex['code'] . PHP_EOL;
		$exception_log .= 'File: ' . $ex['file'] . PHP_EOL;
		$exception_log .= 'Line No: ' . $ex['line'] . PHP_EOL;
		$exception_log .= 'Stack trace: ' . PHP_EOL;
		$exception_log .= $ex['string'] . PHP_EOL;
		$exception_log .= '----------------------------------------------------------------------------------------'
		                  . PHP_EOL;
		try {
			\EEH_File::ensure_file_exists_and_is_writable(
				EVENT_ESPRESSO_UPLOAD_DIR . 'logs' . DS . BaseException::$_exception_log_file
			);
			\EEH_File::add_htaccess_deny_from_all( EVENT_ESPRESSO_UPLOAD_DIR . 'logs' );
			if ( ! $clear ) {
				//get existing log file and append new log info
				$exception_log = \EEH_File::get_file_contents(
						EVENT_ESPRESSO_UPLOAD_DIR . 'logs' . DS . BaseException::$_exception_log_file
					) . $exception_log;
			}
			\EEH_File::write_to_file(
				EVENT_ESPRESSO_UPLOAD_DIR . 'logs' . DS . BaseException::$_exception_log_file,
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




	/**
	 * _exception_styles
	 *
	 * @return string
	 */
	private static function _exception_styles() {
		return '
<style type="text/css">
	#ee-error-message {
		max-width:90% !important;
		margin: 0 5%;
	}
	.ee-error-dev-msg-pg,
	.error .ee-error-dev-msg-pg {
		padding:1em;
		margin:0 0 1em;
		border:2px solid #E44064;
		background:#fff;
		border-radius:3px;
		line-height: 1.5em;;
	}
	#ee-trace-details {
		padding:3px;
		margin:0 0 1em;
		border:1px solid #999;
		background:#f9f9f9;
		border-radius:3px;
	}
	#ee-trace-details table {
		border:1px solid #999;
		border-bottom:none;
		background:#fff;
	}
	#ee-trace-details table th {
		background:#eee;
		border-bottom:1px solid #ccc;
	}
	#ee-trace-details table td {
		border-bottom:1px solid #e8e8e8;
		padding: 10px 5px;
	}
	#ee-trace-details table td.odd {
		background:#fdfdfd;
	}
	.display-ee-error-trace-lnk {
		color:blue;
		cursor:pointer;
	}
	.display-ee-error-trace-lnk:hover {
		text-decoration:underline;
	}
	.hidden {
		display:none;
	}
	.small-text {
		font-size: .85em;
		line-height: 1.4em;
		letter-spacing: 1px;
	}
	.lt-grey-text {
		color: #999;
	}
</style>';
	}



	/**
	 * _print_scripts
	 *
	 * @param bool $force_print
	 * @return string|void
	 */
	private static function _print_scripts( $force_print = false ) {
		if ( ! $force_print  && ( did_action( 'admin_enqueue_scripts' ) || did_action( 'wp_enqueue_scripts' ) ) ) {
			if ( wp_script_is( 'ee_error_js', 'enqueued' ) ) {
				return '';
			} else if ( wp_script_is( 'ee_error_js', 'registered' ) ) {
				add_filter( 'FHEE_load_css', '__return_true' );
				add_filter( 'FHEE_load_js', '__return_true' );
				wp_enqueue_script( 'ee_error_js' );
				wp_localize_script( 'ee_error_js', 'ee_settings', array( 'wp_debug' => WP_DEBUG ) );
			}
		} else {
			return '
<script>
/* <![CDATA[ */
var ee_settings = {"wp_debug":"' . WP_DEBUG . '"};
/* ]]> */
</script>
<script src="' . includes_url() . 'js/jquery/jquery.js" type="text/javascript"></script>
<script src="' . EE_GLOBAL_ASSETS_URL . 'scripts/espresso_core.js' . '?ver=' . espresso_version() . '" type="text/javascript"></script>
<script src="' . EE_GLOBAL_ASSETS_URL . 'scripts/EE_Error.js' . '?ver=' . espresso_version() . '" type="text/javascript"></script>
';
		}
		return '';
	}



}
// End of file BaseException.php
// Location: /core/exceptions/BaseException.php