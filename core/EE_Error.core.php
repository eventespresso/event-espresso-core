<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
// if you're a dev and want to receive all errors via email add this to your wp-config.php: define( 'EE_ERROR_EMAILS', TRUE );
if ( defined( 'WP_DEBUG' ) && WP_DEBUG === TRUE && defined( 'EE_ERROR_EMAILS' ) && EE_ERROR_EMAILS === TRUE ) {
	set_error_handler( array( 'EE_Error', 'error_handler' ));
	register_shutdown_function( array( 'EE_Error', 'fatal_error_handler' ));
}
/**
 *
 * Error Handling Class
 *
 * @package			Event Espresso
 * @subpackage		includes/classes/EE_Exceptions.class.php
 * @author				Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EE_Error extends Exception {


	/**
	* 	name of the file to log exceptions to
	* 	@access	private
    *	@var string
	*/
	private static $_exception_log_file = 'espresso_error_log.txt';

	/**
	* 	the exception
	* 	@access	private
    *	@var object
	*/
	private $_exception;

	/**
	* 	stores details for all exception
	* 	@access	private
    *	@var array
	*/
	private static $_all_exceptions = array();

	/**
	* 	tracks number of errors
	* 	@access	private
    *	@var int
	*/
	private static $_error_count = 0;

	/**
	* 	has JS been loaded ?
	* 	@access	private
    *	@var boolean
	*/
	private static $_js_loaded = FALSE;

	/**
	* 	has shutdown action been added ?
	* 	@access	private
    *	@var boolean
	*/
	private static $_action_added = FALSE;

	/**
	* 	has shutdown action been added ?
	* 	@access	private
    *	@var boolean
	*/
	private static $_espresso_notices = array( 'success' => FALSE, 'errors' => FALSE, 'attention' => FALSE );





	/**
	*	@override default exception handling
	*	@access public
	*	@echo string
	*/
	function __construct( $message, $code = 0, Exception $previous = NULL ) {
		if ( version_compare( phpversion(), '5.3.0', '<' )) {
			parent::__construct( $message, $code );
		} else {
			parent::__construct( $message, $code, $previous );
		}
	}



	/**
	 *    error_handler
	 * @access public
	 * @param $code
	 * @param $message
	 * @param $file
	 * @param $line
	 * @return void
	 */
	public static function error_handler( $code, $message, $file, $line ) {
		$type = EE_Error::error_type( $code );
		$site = site_url();
		switch ( $site ) {
			case 'http://ee4.eventespresso.com/' :
			case 'http://ee4decaf.eventespresso.com/' :
			case 'http://ee4hf.eventespresso.com/' :
			case 'http://ee4a.eventespresso.com/' :
			case 'http://ee4ad.eventespresso.com/' :
			case 'http://ee4b.eventespresso.com/' :
			case 'http://ee4bd.eventespresso.com/' :
			case 'http://ee4d.eventespresso.com/' :
			case 'http://ee4dd.eventespresso.com/' :
				$to = 'developers@eventespresso.com';
				break;
			default :
				$to = get_option( 'admin_email' );
		}
		$subject = $type . ' ' . $message . ' in ' . EVENT_ESPRESSO_VERSION . ' on ' . site_url();
		$msg = EE_Error::_format_error( $type, $message, $file, $line );
		if ( function_exists( 'wp_mail' )) {
			add_filter( 'wp_mail_content_type', array( 'EE_Error', 'set_content_type' ));
			wp_mail( $to, $subject, $msg );
		}
		echo '<div id="message" class="espresso-notices error"><p>';
		echo $type . ': ' . $message . '<br />' . $file . ' line ' . $line;
		echo '<br /></p></div>';
	}



	/**
	 *    error_type
	 *    http://www.php.net/manual/en/errorfunc.constants.php#109430
	 * @access public
	 * @param $code
	 * @return string
	 */
	public static function error_type( $code ) {
		switch( $code ) {
			case E_ERROR: // 1 //
			return 'E_ERROR';
			case E_WARNING: // 2 //
			return 'E_WARNING';
			case E_PARSE: // 4 //
			return 'E_PARSE';
			case E_NOTICE: // 8 //
			return 'E_NOTICE';
			case E_CORE_ERROR: // 16 //
			return 'E_CORE_ERROR';
			case E_CORE_WARNING: // 32 //
			return 'E_CORE_WARNING';
			case E_CORE_ERROR: // 64 //
			return 'E_COMPILE_ERROR';
			case E_CORE_WARNING: // 128 //
			return 'E_COMPILE_WARNING';
			case E_USER_ERROR: // 256 //
			return 'E_USER_ERROR';
			case E_USER_WARNING: // 512 //
			return 'E_USER_WARNING';
			case E_USER_NOTICE: // 1024 //
			return 'E_USER_NOTICE';
			case E_STRICT: // 2048 //
			return 'E_STRICT';
			case E_RECOVERABLE_ERROR: // 4096 //
			return 'E_RECOVERABLE_ERROR';
			case E_DEPRECATED: // 8192 //
			return 'E_DEPRECATED';
			case E_USER_DEPRECATED: // 16384 //
			return 'E_USER_DEPRECATED';
			case E_ALL: // 16384 //
			return 'E_ALL';
		}
		return "";
	}



	/**
	*	fatal_error_handler
	*	@access public
	*	@return void
	*/
	public static function fatal_error_handler() {
		$last_error = error_get_last();
		if ( $last_error['type'] === E_ERROR ) {
			EE_Error::error_handler( E_ERROR, $last_error['message'], $last_error['file'], $last_error['line'] );
		}
	}



	/**
	 *    _format_error
	 * @access private
	 * @param $code
	 * @param $message
	 * @param $file
	 * @param $line
	 * @return string
	 */
	private static function _format_error( $code, $message, $file, $line ) {
		$html  = "<table cellpadding='5'><thead bgcolor='#f8f8f8'><th>Item</th><th align='left'>Details</th></thead><tbody>";
		$html .= "<tr valign='top'><td><b>Code</b></td><td>$code</td></tr>";
		$html .= "<tr valign='top'><td><b>Error</b></td><td>$message</td></tr>";
		$html .= "<tr valign='top'><td><b>File</b></td><td>$file</td></tr>";
		$html .= "<tr valign='top'><td><b>Line</b></td><td>$line</td></tr>";
		$html .= "</tbody></table>";
		return $html;
	}



	/**
	 *    set_content_type
	 * @access public
	 * @param $content_type
	 * @return string
	 */
	public static function set_content_type( $content_type ) {
		return 'text/html';
	}




	/**
	*	_add_actions
	*	@access public
	*	@return void
	*/
    public function get_error() {

		if( apply_filters( 'FHEE__EE_Error__get_error__show_normal_exceptions', FALSE ) ){
			throw $this;
		}
		// get separate user and developer messages if they exist
		$msg = explode( '||', $this->getMessage() );
		$user_msg = $msg[0];
		$dev_msg = isset( $msg[1] ) ? $msg[1] : $msg[0];
		$msg = WP_DEBUG ? $dev_msg : $user_msg;

		// add details to _all_exceptions array
		$x_time = time();
		self::$_all_exceptions[ $x_time ]['name'] 	= get_class( $this );
		self::$_all_exceptions[ $x_time ]['file'] 		= $this->getFile();
		self::$_all_exceptions[ $x_time ]['line'] 		= $this->getLine();
		self::$_all_exceptions[ $x_time ]['msg'] 	= $msg;
		self::$_all_exceptions[ $x_time ]['code'] 	= $this->getCode();
		self::$_all_exceptions[ $x_time ]['trace'] 	= $this->getTrace();
		self::$_all_exceptions[ $x_time ]['string'] 	= $this->getTraceAsString();
		self::$_error_count++;

		//add_action( 'shutdown', array( $this, 'display_errors' ));
		$this->display_errors();

	}



    /**
     *    has_error
     *
     * @access public
     * @param bool   $check_stored
     * @param string $type_to_check
     * @return bool
     */
    public static function has_error( $check_stored = false, $type_to_check = 'errors' ){
	    $has_error = isset(self::$_espresso_notices[$type_to_check]) && ! empty(self::$_espresso_notices[$type_to_check])
            ? true
            : false;
	    if ( $check_stored && ! $has_error ) {
		    $notices = (array) get_option( 'ee_notices', array() );
		    foreach ( $notices as $type => $notice ) {
			    if ( $type === $type_to_check && $notice ) {
				    return true;
			    }
		    }
	    }
	    return $has_error;
    }



	/**
	*	display_errors
	*	@access public
	*	@echo string
	*/
    public function display_errors(){

		$trace_details = '';

		$output = '
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
	}
	#ee-trace-details {
		padding:3px;
		margin:0 0 1em;
		border:1px solid #666;
		background:#fff;
		border-radius:3px;
	}
	#ee-trace-details table {
		border:1px solid #666;
		border-bottom:none;
		background:#f9f9f9;
	}
	#ee-trace-details table th {
		background:#eee;
		border-bottom:1px solid #666;
	}
	#ee-trace-details table td {
		border-bottom:1px solid #666;
	}
	#ee-trace-details table td.odd {
		background:#f3f3f3;
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
		color: #a8a8a8;
	}
</style>
<div id="ee-error-message" class="error">';

		if ( ! WP_DEBUG ) {
			$output .= '
	<p>';
		}

		// cycle thru errors
		foreach ( self::$_all_exceptions as $time => $ex ) {

			// process trace info
			if ( empty( $ex['trace'] )) {

	            $trace_details .= __( 'Sorry, but no trace information was available for this exception.', 'event_espresso' );

			} else {

				$trace_details .= '
			<div id="ee-trace-details">
			<table width="100%" border="0" cellpadding="5" cellspacing="0">
				<tr>
					<th scope="col" align="right" style="width:2.5%;">#</th>
					<th scope="col" align="right" style="width:3.5%;">Line</th>
					<th scope="col" align="left" style="width:40%;">File</th>
					<th scope="col" align="left">Class</th>
					<th scope="col" align="left">Method( arguments )</th>
				</tr>';

				$last_on_stack = count( $ex['trace'] ) - 1;
				// reverse array so that stack is in proper chronological order
				$sorted_trace = array_reverse( $ex['trace'] );

				foreach ( $sorted_trace as $nmbr => $trace ) {

					$file = isset( $trace['file'] ) ? $trace['file'] : '' ;
					$class = isset( $trace['class'] ) ? $trace['class'] : '';
					$type = isset( $trace['type'] ) ? $trace['type'] : '';
					$function = isset( $trace['function'] ) ? $trace['function'] : '';
					$args = isset( $trace['args'] ) ? $this->_convert_args_to_string( $trace['args'] ) : '';
					$line = isset( $trace['line'] ) ? $trace['line'] : '';
					$zebra = $nmbr % 2 ? ' odd' : '';

					if ( empty( $file ) && ! empty( $class )) {
						$a = new ReflectionClass( $class );
						$file = $a->getFileName();
						if ( empty( $line ) && ! empty( $function )) {
							$b = new ReflectionMethod( $class, $function );
							$line = $b->getStartLine();
						}
					}

					if ( $nmbr == $last_on_stack ) {
						$file = $ex['file'] != '' ? $ex['file'] : $file;
						$line = $ex['line'] != '' ? $ex['line'] : $line;
						$error_code = self::generate_error_code ( $file, $trace['function'], $line );
					}

					$nmbr_dsply = ! empty( $nmbr ) ? $nmbr : '&nbsp;';
					$line_dsply = ! empty( $line ) ? $line : '&nbsp;';
					$file_dsply = ! empty( $file ) ? $file : '&nbsp;';
					$class_dsply = ! empty( $class ) ? $class : '&nbsp;';
					$type_dsply = ! empty( $type ) ? $type : '&nbsp;';
					$function_dsply = ! empty( $function ) ? $function : '&nbsp;';
					$args_dsply = ! empty( $args ) ? '( ' . $args . ' )' : '';

		              $trace_details .= '
					<tr>
						<td align="right" class="' . $zebra . '">' . $nmbr_dsply . '</td>
						<td align="right" class="' . $zebra . '">' . $line_dsply . '</td>
						<td align="left" class="' . $zebra . '">' . $file_dsply . '</td>
						<td align="left" class="' . $zebra . '">' . $class_dsply . '</td>
						<td align="left" class="' . $zebra . '">' . $type_dsply . $function_dsply . $args_dsply . '</td>
					</tr>';


				}

	            $trace_details .= '
			 </table>
			</div>';

			}

			$ex['code'] = $ex['code'] ? $ex['code'] : $error_code;

			// add generic non-identifying messages for non-privileged uesrs
			if ( ! WP_DEBUG ) {

				$output .= '<span class="ee-error-user-msg-spn">' . trim( $ex['msg'] )  . '</span> &nbsp; <sup>' . $ex['code'] . '</sup><br />';

			} else {

				// or helpful developer messages if debugging is on
				$output .= '
		<div class="ee-error-dev-msg-dv">
			<p class="ee-error-dev-msg-pg">
				<strong class="ee-error-dev-msg-str">An ' . $ex['name'] . ' exception was thrown!</strong>  &nbsp; <span>code: ' . $ex['code'] . '</span><br />
				<span class="big-text">"' . trim( $ex['msg'] ) . '"</span><br/>
				<a id="display-ee-error-trace-' . self::$_error_count . $time . '" class="display-ee-error-trace-lnk small-text" rel="ee-error-trace-' . self::$_error_count . $time . '">
					' . __( 'click to view backtrace and class/method details', 'event_espresso' ) . '
				</a><br />
				<span class="small-text lt-grey-text">'.$ex['file'].' &nbsp; ( line no: '.$ex['line'].' )</span>
			</p>
			<div id="ee-error-trace-' . self::$_error_count . $time . '-dv" class="ee-error-trace-dv" style="display: none;">
				' . $trace_details;

				if ( ! empty( $class )) {
					$output .= '
				<div style="padding:3px; margin:0 0 1em; border:1px solid #666; background:#fff; border-radius:3px;">
					<div style="padding:1em 2em; border:1px solid #666; background:#f9f9f9;">
						<h3>Class Details</h3>';
						$a = new ReflectionClass( $class );
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
		$output = substr( $output, 0, ( count( $output ) - 7 ));

		if ( ! WP_DEBUG ) {
			$output .= '
	</p>';
		}

		$output .= '
</div>';

		$output .= self::_print_scripts( TRUE );

		if ( defined( 'DOING_AJAX' )) {
			echo wp_json_encode( array( 'error' => $output ));
			exit();
		}

		echo $output;
		die();

	}





	/**
	*	generate string from exception trace args
	*
	*	@access private
	*	@ param array $arguments
	*	@ return string
	*/
	private function _convert_args_to_string ( $arguments = array(), $array = FALSE ) {

		$arg_string = '';
		if ( ! empty( $arguments )) {

			$args = array();

			foreach ( $arguments as $arg ) {

				if ( ! empty( $arg )) {

					if ( is_string( $arg )) {
						$args[] = " '" . $arg . "'";
					} elseif ( is_array( $arg )) {
						$args[] = 'ARRAY(' . $this->_convert_args_to_string( $arg, TRUE );
					} elseif ( is_null( $arg )) {
						$args[] = ' NULL';
					} elseif ( is_bool( $arg )) {
						$args[] = ( $arg ) ? ' TRUE' : ' FALSE';
					} elseif ( is_object( $arg )) {
						$args[] = ' OBJECT ' . get_class( $arg );
					} elseif ( is_resource( $arg )) {
						$args[] = get_resource_type( $arg );
					} else {
						$args[] = $arg;
					}

				}

			}
			$arg_string = implode( ', ', $args );
		}
		if ( $array ) {
			$arg_string .= ' )';
		}
		return $arg_string;
	}





	/**
	* 	add error message
	*
	*	@access public
	* 	@param		string		$msg	the message to display to users or developers - adding a double pipe || (OR) creates separate messages for user || dev
	* 	@param		string		$file		the file that the error occurred in - just use __FILE__
	* 	@param		string		$func	the function/method that the error occurred in - just use __FUNCTION__
	* 	@param		string		$line	the line number where the error occurred - just use __LINE__
	* 	@return 		void
	*/
	public static function add_error( $msg = NULL, $file = NULL, $func = NULL, $line = NULL ) {
		self::_add_notice ( 'errors', $msg, $file, $func, $line );
		self::$_error_count++;
	}

	/**
	 * If WP_DEBUG is active, throws an exception. If WP_DEBUG is off, just
	 * adds an error
	 * @param string $msg
	 * @param string $file
	 * @param string $func
	 * @param string $line
	 * @throws EE_Error
	 */
	public static function throw_exception_if_debugging( $msg = null, $file = null, $func = null, $line = null ) {
		if( WP_DEBUG ) {
			throw new EE_Error( $msg );
		} else  {
			EE_Error::add_error( $msg, $file, $func, $line );
		}
	}





	/**
	* 	add success message
	*
	*	@access public
	* 	@param		string		$msg	the message to display to users or developers - adding a double pipe || (OR) creates separate messages for user || dev
	* 	@param		string		$file		the file that the error occurred in - just use __FILE__
	* 	@param		string		$func	the function/method that the error occurred in - just use __FUNCTION__
	* 	@param		string		$line	the line number where the error occurred - just use __LINE__
	* 	@return 		void
	*/
	public static function add_success( $msg = NULL, $file = NULL, $func = NULL, $line = NULL ) {
		self::_add_notice ( 'success', $msg, $file, $func, $line );
	}





	/**
	* 	add attention message
	*
	*	@access public
	* 	@param		string		$msg	the message to display to users or developers - adding a double pipe || (OR) creates separate messages for user || dev
	* 	@param		string		$file		the file that the error occurred in - just use __FILE__
	* 	@param		string		$func	the function/method that the error occurred in - just use __FUNCTION__
	* 	@param		string		$line	the line number where the error occurred - just use __LINE__
	* 	@return 		void
	*/
	public static function add_attention( $msg = NULL, $file = NULL, $func = NULL, $line = NULL ) {
		self::_add_notice ( 'attention', $msg, $file, $func, $line );
	}





	/**
	* 	add success message
	*
	*	@access public
	* 	@param		string		$type	whether the message is for a success or error notification
	* 	@param		string		$msg	the message to display to users or developers - adding a double pipe || (OR) creates separate messages for user || dev
	* 	@param		string		$file		the file that the error occurred in - just use __FILE__
	* 	@param		string		$func	the function/method that the error occurred in - just use __FUNCTION__
	* 	@param		string		$line	the line number where the error occurred - just use __LINE__
	* 	@return 		void
	*/
	private static function _add_notice( $type = 'success', $msg = NULL, $file = NULL, $func = NULL, $line = NULL ) {
		if ( empty( $msg )) {
			EE_Error::doing_it_wrong(
				'EE_Error::add_' . $type . '()',
				sprintf(
					__( 'Notifications are not much use without a message! Please add a message to the EE_Error::add_%s() call made in %s on line %d', 'event_espresso' ),
					$type,
					$file,
					$line
				),
				EVENT_ESPRESSO_VERSION
			);
		}
		if ( $type == 'errors' && ( empty( $file ) || empty( $func ) || empty( $line ))) {
			EE_Error::doing_it_wrong(
				'EE_Error::add_error()',
				__('You need to provide the file name, function name, and line number that the error occurred on in order to better assist with debugging.', 'event_espresso' ),
				EVENT_ESPRESSO_VERSION
			);
		}
		// get separate user and developer messages if they exist
		$msg = explode( '||', $msg );
		$user_msg = $msg[0];
		$dev_msg = isset( $msg[1] ) ? $msg[1] : $msg[0];
		/**
		 * Do an action so other code can be triggered when a notice is created
		 * @param string $type can be 'errors', 'attention', or 'success'
		 * @param string $user_msg message displayed to user when WP_DEBUG is off
		 * @param string $user_msg message displayed to user when WP_DEBUG is on
		 * @param string $file file where error was generated
		 * @param string $func function where error was generated
		 * @param string $line line where error was generated
		 */
		do_action( 'AHEE__EE_Error___add_notice', $type, $user_msg, $dev_msg, $file, $func, $line );
		$msg = WP_DEBUG ? $dev_msg : $user_msg;
		// add notice if message exists
		if ( ! empty( $msg )) {
			// get error code
			$notice_code = EE_Error::generate_error_code( $file, $func, $line );
			if ( WP_DEBUG && $type == 'errors' ) {
				$msg .= '<br/><span class="tiny-text">' . $notice_code . '</span>';
			}
			// add notice. Index by code if it's not blank
			if( $notice_code ) {
				self::$_espresso_notices[ $type ][ $notice_code ] = $msg;
			} else {
				self::$_espresso_notices[ $type ][] = $msg;
			}
			add_action( 'wp_footer', array( 'EE_Error', 'enqueue_error_scripts' ), 1 );
		}

	}





	/**
	* 	in some case it may be necessary to overwrite the existing success messages
	*
	*	@access public
	* 	@return 		void
	*/
	public static function overwrite_success() {
		self::$_espresso_notices['success'] = FALSE;
	}





	/**
	* 	in some case it may be necessary to overwrite the existing attention messages
	*
	*	@access public
	* 	@return 		void
	*/
	public static function overwrite_attention() {
		self::$_espresso_notices['attention'] = FALSE;
	}





	/**
	* 	in some case it may be necessary to overwrite the existing error messages
	*
	*	@access public
	* 	@return 		void
	*/
	public static function overwrite_errors() {
		self::$_espresso_notices['errors'] = FALSE;
	}



	/**
	*	reset_notices
	*	@access private
	*	@return void
	*/
	public static function reset_notices(){
    	self::$_espresso_notices['success'] = FALSE;
    	self::$_espresso_notices['attention'] = FALSE;
    	self::$_espresso_notices['errors'] = FALSE;
    }



	/**
	*	has_errors
	*	@access public
	*	@return int
	*/
    public static function has_notices(){
		$has_notices = 0;
		// check for success messages
		$has_notices = self::$_espresso_notices['success'] && ! empty(  self::$_espresso_notices['success'] ) ? 3 : $has_notices;
		// check for attention messages
		$has_notices = self::$_espresso_notices['attention'] && ! empty(  self::$_espresso_notices['attention'] ) ? 2 : $has_notices;
		// check for error messages
		$has_notices = self::$_espresso_notices['errors'] && ! empty(  self::$_espresso_notices['errors'] ) ? 1 : $has_notices;
		return $has_notices;
	}




	/**
	 * This simply returns non formatted error notices as they were sent into the EE_Error object.
	 *
	 * @since 4.9.0
	 * @return array
	 */
	public static function get_vanilla_notices() {
		return array(
			'success' => isset( self::$_espresso_notices['success'] ) ? self::$_espresso_notices['success'] : array(),
			'attention' => isset( self::$_espresso_notices['attention'] )  ? self::$_espresso_notices['attention'] : array(),
			'errors' => isset( self::$_espresso_notices['errors'] ) ? self::$_espresso_notices['errors'] : array(),
		);
	}



	/**
	* 	compile all error or success messages into one string
	*	@see EE_Error::get_raw_notices if you want the raw notices without any preparations made to them
	*
	*	@access public
	* 	@param		boolean		$format_output		whether or not to format the messages for display in the WP admin
	* 	@param		boolean		$save_to_transient	whether or not to save notices to the db for retrieval on next request - ONLY do this just before redirecting
	* 	@param		boolean		$remove_empty		whether or not to unset empty messages
	* 	@return 		array
	*/
	public static function get_notices( $format_output = TRUE, $save_to_transient = FALSE, $remove_empty = TRUE ) {
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );

		$success_messages = '';
		$attention_messages = '';
		$error_messages = '';
		$print_scripts = FALSE;

		// EEH_Debug_Tools::printr( self::$_espresso_notices, 'espresso_notices  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

		// either save notices to the db
		if ( $save_to_transient ) {
			update_option( 'ee_notices', self::$_espresso_notices );
			return;
		}
		// grab any notices that have been previously saved
		if ( $notices = get_option( 'ee_notices', FALSE )) {
			foreach ( $notices as $type => $notice ) {
				if ( is_array( $notice ) && ! empty( $notice )) {
					// make sure that existing notice type is an array
					self::$_espresso_notices[ $type ] =  is_array( self::$_espresso_notices[ $type ] ) && ! empty( self::$_espresso_notices[ $type ] ) ? self::$_espresso_notices[ $type ] : array();
					// merge stored notices with any newly created ones
					self::$_espresso_notices[ $type ] = array_merge( self::$_espresso_notices[ $type ], $notice );
					$print_scripts = TRUE;
				}
			}
			// now clear any stored notices
			update_option( 'ee_notices', FALSE );
		}

		// check for success messages
		if ( self::$_espresso_notices['success'] && ! empty(  self::$_espresso_notices['success'] )) {
			// combine messages
			$success_messages .= implode( self::$_espresso_notices['success'], '<br />' );
			$print_scripts = TRUE;
		}

		// check for attention messages
		if ( self::$_espresso_notices['attention'] && ! empty(  self::$_espresso_notices['attention'] ) ) {
			// combine messages
			$attention_messages .= implode( self::$_espresso_notices['attention'], '<br />' );
			$print_scripts = TRUE;
		}

		// check for error messages
		if ( self::$_espresso_notices['errors'] && ! empty(  self::$_espresso_notices['errors'] ) ) {
			$error_messages .= count( self::$_espresso_notices['errors'] ) > 1 ? __( 'The following errors have occurred:<br />', 'event_espresso' ) : __( 'An error has occurred:<br />', 'event_espresso' );
			// combine messages
			$error_messages .= implode( self::$_espresso_notices['errors'], '<br />' );
			$print_scripts = TRUE;
		}

		if ($format_output) {

			$notices = '<div id="espresso-notices">';

			$close = is_admin() ? '' : '<a class="close-espresso-notice hide-if-no-js"><span class="dashicons dashicons-no"></span></a>';

			if ($success_messages !== '') {
				$css_id = is_admin() ? 'message' : 'espresso-notices-success';
				$css_class = is_admin() ? 'updated fade' : 'success fade-away';
				//showMessage( $success_messages );
				$notices .= '<div id="' . $css_id . '" class="espresso-notices ' . $css_class . '" style="display:none;"><p>' . $success_messages . '</p>' . $close . '</div>';
			}

			if ($attention_messages !== '') {
				$css_id = is_admin() ? 'message' : 'espresso-notices-attention';
				$css_class = is_admin() ? 'updated ee-notices-attention' : 'attention fade-away';
				//showMessage( $error_messages, TRUE );
				$notices .= '<div id="' . $css_id . '" class="espresso-notices ' . $css_class . '" style="display:none;"><p>' . $attention_messages . '</p>' . $close . '</div>';
			}

			if ($error_messages !== '') {
				$css_id = is_admin() ? 'message' : 'espresso-notices-error';
				$css_class = is_admin() ? 'error' : 'error fade-away';
				//showMessage( $error_messages, TRUE );
				$notices .= '<div id="' . $css_id . '" class="espresso-notices ' . $css_class . '" style="display:none;"><p>' . $error_messages . '</p>' . $close . '</div>';
			}

			$notices .= '</div>';

		} else {

			$notices = array(
					'success' => $success_messages,
					'attention' => $attention_messages,
					'errors' => $error_messages
			);

			if ( $remove_empty ) {
				// remove empty notices
				foreach ($notices as $type => $notice) {
					if (empty($notice)) {
						unset($notices[$type]);
					}
				}
			}
		}

		if ( $print_scripts ) {
			self::_print_scripts();
		}

		return $notices;
	}





	/**
	* 	add_persistent_admin_notice
	*
	*	@access 	public
	* 	@param		string	$pan_name	the name, or key of the Persistent Admin Notice to be stored
	* 	@param		string	$pan_message	the message to be stored persistently until dismissed
	* 	@param bool $force_update allows one to enforce the reappearance of a persistent message.
	* 	@return 		void
	*/
	public static function add_persistent_admin_notice( $pan_name = '', $pan_message, $force_update = FALSE ) {
		if ( ! empty( $pan_name ) && ! empty( $pan_message )) {
			$persistent_admin_notices = get_option( 'ee_pers_admin_notices', array() );
			//maybe initialize persistent_admin_notices
			if ( empty( $persistent_admin_notices )) {
				add_option( 'ee_pers_admin_notices', array(), '', 'no' );
			}
			$pan_name = sanitize_key( $pan_name );
			if ( ! array_key_exists( $pan_name, $persistent_admin_notices ) || $force_update ) {
				$persistent_admin_notices[ $pan_name ] = $pan_message;
				update_option( 'ee_pers_admin_notices', $persistent_admin_notices );
			}
		}
	}



	/**
	 *    dismiss_persistent_admin_notice
	 *
	 * @access    public
	 * @param        string $pan_name the name, or key of the Persistent Admin Notice to be dismissed
	 * @param bool          $purge
	 * @param bool          $return_immediately
	 * @return        void
	 */
	public static function dismiss_persistent_admin_notice( $pan_name = '', $purge = FALSE, $return_immediately = FALSE ) {
		$pan_name = EE_Registry::instance()->REQ->is_set( 'ee_nag_notice' ) ? EE_Registry::instance()->REQ->get( 'ee_nag_notice' ) : $pan_name;
		if ( ! empty( $pan_name )) {
			$persistent_admin_notices = get_option( 'ee_pers_admin_notices', array() );
			// check if notice we wish to dismiss is actually in the $persistent_admin_notices array
			if ( is_array( $persistent_admin_notices ) && isset( $persistent_admin_notices[ $pan_name ] )) {
				// completely delete nag notice, or just NULL message so that it can NOT be added again ?
				if ( $purge ) {
					unset( $persistent_admin_notices[ $pan_name ] );
				} else {
					$persistent_admin_notices[ $pan_name ] = NULL;
				}
				if ( update_option( 'ee_pers_admin_notices', $persistent_admin_notices ) === FALSE ) {
					EE_Error::add_error( sprintf( __( 'The persistent admin notice for "%s" could not be deleted.', 'event_espresso' ), $pan_name ), __FILE__, __FUNCTION__, __LINE__ );
				}
			}
		}
		if ( $return_immediately ) {
			return;
		} else if ( EE_Registry::instance()->REQ->ajax ) {
			// grab any notices and concatenate into string
			echo wp_json_encode( array( 'errors' => implode( '<br />', EE_Error::get_notices( FALSE ))));
			exit();
		} else {
			// save errors to a transient to be displayed on next request (after redirect)
			EE_Error::get_notices( FALSE, TRUE );
			$return_url = EE_Registry::instance()->REQ->is_set( 'return_url' ) ? EE_Registry::instance()->REQ->get( 'return_url' ) : '';
			wp_safe_redirect( urldecode( $return_url ));
		}
	}



	/**
	 * display_persistent_admin_notices
	 *
	 * @access public
	 * @param  string $pan_name    the name, or key of the Persistent Admin Notice to be stored
	 * @param  string $pan_message the message to be stored persistently until dismissed
	 * @param  string $return_url  URL to go back to after nag notice is dismissed
	 * @return string
	 */
	public static function display_persistent_admin_notices( $pan_name = '', $pan_message = '', $return_url = '' ) {
		if ( ! empty( $pan_name ) && ! empty( $pan_message )&& ! is_array( $pan_message )) {
			$args = array(
				'nag_notice' => $pan_name,
				'return_url' => urlencode( $return_url ),
				'ajax_url' => WP_AJAX_URL,
				'unknown_error' => __( 'An unknown error has occurred on the server while attempting to dismiss this notice.', 'event_espresso' )
			);
			wp_localize_script( 'espresso_core', 'ee_dismiss', $args );
			return '
			<div id="' . $pan_name . '" class="espresso-notices updated ee-nag-notice clearfix" style="border-left: 4px solid #fcb93c;">
				<p>' . $pan_message . '</p>
				<a class="dismiss-ee-nag-notice hide-if-no-js" style="float: right; cursor: pointer; text-decoration:none;" rel="' . $pan_name . '">
					<span class="dashicons dashicons-dismiss" style="position:relative; top:-1px; margin-right:.25em;"></span>'.__( 'Dismiss', 'event_espresso' ) .'
				</a>
				<div style="clear:both;"></div>
			</div>';
		}
		return '';
	}



	/**
	 *    get_persistent_admin_notices
	 *
	 * @access    public
	 * @param string $return_url
	 * @return    array
	 */
	public static function get_persistent_admin_notices( $return_url = '' ) {
		$notices = '';
		// check for persistent admin notices
		//filter the list though so plugins can notify the admin in a different way if they want
		$persistent_admin_notices = apply_filters(
			'FHEE__EE_Error__get_persistent_admin_notices',
			get_option( 'ee_pers_admin_notices', FALSE ),
			'ee_pers_admin_notices',
			$return_url
		);
		if ( $persistent_admin_notices ) {
			// load scripts
			wp_register_script( 'espresso_core', EE_GLOBAL_ASSETS_URL . 'scripts/espresso_core.js', array('jquery'), EVENT_ESPRESSO_VERSION, TRUE );
			wp_register_script( 'ee_error_js', EE_GLOBAL_ASSETS_URL . 'scripts/EE_Error.js', array('espresso_core'), EVENT_ESPRESSO_VERSION, TRUE );
			wp_enqueue_script( 'ee_error_js' );
			// and display notices
			foreach( $persistent_admin_notices as $pan_name => $pan_message ) {
				$notices .= self::display_persistent_admin_notices( $pan_name, $pan_message, $return_url );
			}
		}
		return $notices;
	}



	/**
	 *    _print_scripts
	 *
	 * @access 	public
	 * @param 	bool $force_print
	 * @return 	void
	 */
	private static function _print_scripts( $force_print = FALSE ) {
		if (( did_action( 'admin_enqueue_scripts' ) || did_action( 'wp_enqueue_scripts' )) && ! $force_print ) {
			if ( wp_script_is( 'ee_error_js', 'enqueued' )) {
				return;
			} else if ( wp_script_is( 'ee_error_js', 'registered' )) {
				add_filter( 'FHEE_load_css', '__return_true' );
				add_filter( 'FHEE_load_js', '__return_true' );
				wp_enqueue_script( 'ee_error_js' );
				wp_localize_script( 'ee_error_js','ee_settings', array( 'wp_debug'=>WP_DEBUG ));
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

	}






	/**
	* 	enqueue_error_scripts
	*
	*	@access public
	* 	@return 		void
	*/
	public static function enqueue_error_scripts() {
		self::_print_scripts();
	}



	/**
	*	create error code from filepath, function name,
	*	and line number where exception or error was thrown
	*
	*	@access public
	*	@param string $file
	*	@param string $func
	*	@param string $line
	*	@return string
	*/
	public static function generate_error_code ( $file = '', $func = '', $line = '' ) {
		$file = explode( '.', basename( $file ));
		$error_code = ! empty( $file[0] ) ? $file[0] : '';
		$error_code .= ! empty( $func ) ? ' - ' . $func : '';
		$error_code .= ! empty( $line ) ? ' - ' . $line : '';
		return $error_code;
	}





	/**
	*	write exception details to log file
	*
	*	@access public
	*	@ param timestamp $time
	*	@ param object $ex
	*	@ return void
	*/
	public function write_to_error_log ( $time = FALSE, $ex = FALSE, $clear = FALSE ) {

		if ( ! $ex ) {
			return;
		}

		if ( ! $time ) {
			$time = time();
		}

		$exception_log = '----------------------------------------------------------------------------------------' . PHP_EOL;
		$exception_log .= '[' . date( 'Y-m-d H:i:s', $time ) . ']  Exception Details' . PHP_EOL;
		$exception_log .= 'Message: ' . $ex['msg'] . PHP_EOL;
		$exception_log .= 'Code: '. $ex['code'] . PHP_EOL;
		$exception_log .= 'File: '. $ex['file'] . PHP_EOL;
		$exception_log .= 'Line No: ' . $ex['line'] . PHP_EOL;
		$exception_log .= 'Stack trace: ' . PHP_EOL;
		$exception_log .= $ex['string'] . PHP_EOL;
		$exception_log .= '----------------------------------------------------------------------------------------' . PHP_EOL;

		try {
			EEH_File::ensure_file_exists_and_is_writable( EVENT_ESPRESSO_UPLOAD_DIR . 'logs' . DS . self::$_exception_log_file );
			EEH_File::add_htaccess_deny_from_all( EVENT_ESPRESSO_UPLOAD_DIR . 'logs' );
			if ( ! $clear ) {
				//get existing log file and append new log info
				$exception_log = EEH_File::get_file_contents( EVENT_ESPRESSO_UPLOAD_DIR . 'logs' . DS . self::$_exception_log_file ) . $exception_log;
			}
			EEH_File::write_to_file( EVENT_ESPRESSO_UPLOAD_DIR . 'logs' . DS . self::$_exception_log_file, $exception_log );
		} catch( EE_Error $e ){
			EE_Error::add_error( sprintf( __(  'Event Espresso error logging could not be setup because: %s', 'event_espresso' ), $e->getMessage() ));
			return;
		}

	}



	/**
	 * This is just a wrapper for the EEH_Debug_Tools::instance()->doing_it_wrong() method.
	 * doing_it_wrong() is used in those cases where a normal PHP error won't get thrown,
	 * but the code execution is done in a manner that could lead to unexpected results
	 * (i.e. running to early, or too late in WP or EE loading process).
	 * A good test for knowing whether to use this method is:
	 * 1. Is there going to be a PHP error if something isn't setup/used correctly?
	 * Yes -> use EE_Error::add_error() or throw new EE_Error()
	 * 2. If this is loaded before something else, it won't break anything,
	 * but just wont' do what its supposed to do? Yes -> use EE_Error::doing_it_wrong()
	 *
	 * @uses   constant WP_DEBUG test if wp_debug is on or not
	 * @param string $function      The function that was called
	 * @param string $message       A message explaining what has been done incorrectly
	 * @param string $version       The version of Event Espresso where the error was added
	 * @param string  $applies_when a version string for when you want the doing_it_wrong notice to begin appearing
	 *                              for a deprecated function. This allows deprecation to occur during one version,
	 *                              but not have any notices appear until a later version. This allows developers
	 *                              extra time to update their code before notices appear.
	 * @param int     $error_type
	 */
	public static function doing_it_wrong(
		$function,
		$message,
		$version,
		$applies_when = '',
		$error_type = null
	) {
		if ( defined('WP_DEBUG') && WP_DEBUG ) {
			EEH_Debug_Tools::instance()->doing_it_wrong( $function, $message, $version, $applies_when, $error_type );
		}
	}



	/**
	 * Like get_notices, but returns an array of all the notices of the given type.
	 * @return array {
	 *	@type array $success all the success messages
	 *	@type array $errors all the error messages
	 *	@type array $attention all the attention messages
	 * }
	 */
	public static function get_raw_notices() {
		return self::$_espresso_notices;
	}




}
// end of Class EE_Exceptions



/**
 * 	espresso_error_enqueue_scripts
 *
 *  @access 	public
 *  @return 	void
 */
function espresso_error_enqueue_scripts() {
	// js for error handling
	wp_register_script( 'espresso_core', EE_GLOBAL_ASSETS_URL . 'scripts/espresso_core.js', array('jquery'), EVENT_ESPRESSO_VERSION, FALSE );
	wp_register_script( 'ee_error_js', EE_GLOBAL_ASSETS_URL . 'scripts/EE_Error.js', array('espresso_core'), EVENT_ESPRESSO_VERSION, FALSE );
}
if ( is_admin() ) {
	add_action( 'admin_enqueue_scripts', 'espresso_error_enqueue_scripts', 2 );
} else {
	add_action( 'wp_enqueue_scripts', 'espresso_error_enqueue_scripts', 2 );
}





/* End of file EE_Exceptions.class.php */
/* Location: includes/classes/EE_Exceptions.class.php */
