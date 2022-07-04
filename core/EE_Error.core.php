<?php

use EventEspresso\core\domain\entities\notifications\PersistentAdminNotice;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\container\exceptions\ServiceNotFoundException;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\notifications\PersistentAdminNoticeManager;
use EventEspresso\core\services\request\RequestInterface;
use EventEspresso\core\services\request\sanitizers\AllowedTags;

/**
 * Error Handling Class
 *
 * @package               Event Espresso
 * @subpackage            includes/classes/EE_Exceptions.class.php
 * @author                Brent Christensen
 */
class EE_Error extends Exception
{
    const OPTIONS_KEY_NOTICES = 'ee_notices';

    /**
     *    stores details for all exception
     *
     * @var array
     */
    private static $_all_exceptions = [];

    /**
     *    tracks number of errors
     *
     * @var int
     */
    private static $_error_count = 0;

    /**
     * @var array $_espresso_notices
     */
    private static $_espresso_notices = ['success' => false, 'errors' => false, 'attention' => false];


    /**
     * @override default exception handling
     * @param string         $message
     * @param int            $code
     * @param Exception|null $previous
     */
    public function __construct($message, $code = 0, Exception $previous = null)
    {
        if (version_compare(PHP_VERSION, '5.3.0', '<')) {
            parent::__construct($message, $code);
        } else {
            parent::__construct($message, $code, $previous);
        }
    }


    /**
     *    error_handler
     *
     * @param int  $code
     * @param string $message
     * @param string $file
     * @param int|string $line
     * @return void
     */
    public static function error_handler(int $code, string $message, string $file, $line)
    {
        $type    = EE_Error::error_type($code);
        $site    = site_url();
        $to      = strpos($site, 'eventespresso.com')
            ? 'developers@eventespresso.com'
            : get_option('admin_email');
        $subject = "$type $message in " . EVENT_ESPRESSO_VERSION . ' on ' . site_url();
        $msg     = EE_Error::_format_error($type, $message, $file, $line);
        if (function_exists('wp_mail')) {
            add_filter('wp_mail_content_type', ['EE_Error', 'set_content_type']);
            wp_mail($to, $subject, $msg);
        }
        echo '<div id="message" class="espresso-notices error"><p>';
        echo wp_kses($type . ': ' . $message . '<br />' . $file . ' line ' . $line, AllowedTags::getWithFormTags());
        echo '<br /></p></div>';
    }


    /**
     * error_type
     * http://www.php.net/manual/en/errorfunc.constants.php#109430
     *
     * @param int $code
     * @return string
     */
    public static function error_type(int $code): string
    {
        switch ($code) {
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
            case E_COMPILE_ERROR: // 64 //
                return 'E_COMPILE_ERROR';
            case E_COMPILE_WARNING: // 128 //
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
        return '';
    }


    /**
     *    fatal_error_handler
     *
     * @return void
     */
    public static function fatal_error_handler()
    {
        $last_error = error_get_last();
        if ($last_error['type'] === E_ERROR) {
            EE_Error::error_handler(E_ERROR, $last_error['message'], $last_error['file'], $last_error['line']);
        }
    }


    /**
     * _format_error
     *
     * @param $code
     * @param $message
     * @param $file
     * @param $line
     * @return string
     */
    private static function _format_error($code, $message, $file, $line): string
    {
        $html =
            "<table><thead><th>Item</th><th>Details</th></thead><tbody>";
        $html .= "<tr><td><b>Code</b></td><td>$code</td></tr>";
        $html .= "<tr><td><b>Error</b></td><td>$message</td></tr>";
        $html .= "<tr><td><b>File</b></td><td>$file</td></tr>";
        $html .= "<tr><td><b>Line</b></td><td>$line</td></tr>";
        $html .= '</tbody></table>';
        return $html;
    }


    /**
     * set_content_type
     *
     * @param $content_type
     * @return string
     */
    public static function set_content_type($content_type): string
    {
        return 'text/html';
    }


    /**
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_error()
    {
        if (apply_filters('FHEE__EE_Error__get_error__show_normal_exceptions', false)) {
            throw $this;
        }
        // get separate user and developer messages if they exist
        $msg      = explode('||', $this->getMessage());
        $user_msg = $msg[0];
        $dev_msg  = $msg[1] ?? $msg[0];
        $msg      = WP_DEBUG ? $dev_msg : $user_msg;
        // add details to _all_exceptions array
        $x_time                                     = time();
        self::$_all_exceptions[ $x_time ]['name']   = get_class($this);
        self::$_all_exceptions[ $x_time ]['file']   = $this->getFile();
        self::$_all_exceptions[ $x_time ]['line']   = $this->getLine();
        self::$_all_exceptions[ $x_time ]['msg']    = $msg;
        self::$_all_exceptions[ $x_time ]['code']   = $this->getCode();
        self::$_all_exceptions[ $x_time ]['trace']  = $this->getTrace();
        self::$_all_exceptions[ $x_time ]['string'] = $this->getTraceAsString();
        self::$_error_count++;
        // add_action( 'shutdown', array( $this, 'display_errors' ));
        $this->display_errors();
    }


    /**
     * @param bool   $check_stored
     * @param string $type_to_check
     * @return bool
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     */
    public static function has_error(bool $check_stored = false, string $type_to_check = 'errors'): bool
    {
        $has_error = isset(self::$_espresso_notices[ $type_to_check ])
                     && ! empty(self::$_espresso_notices[ $type_to_check ]);
        if ($check_stored && ! $has_error) {
            $notices = EE_Error::getStoredNotices();
            foreach ($notices as $type => $notice) {
                if ($type === $type_to_check && $notice) {
                    return true;
                }
            }
        }
        return $has_error;
    }


    /**
     * @echo string
     * @throws ReflectionException
     */
    public function display_errors()
    {
        $trace_details = '';
        $output = '
        <div id="ee-error-message" class="error">';
        if (! WP_DEBUG) {
            $output .= '
	        <p>';
        }
        // cycle thru errors
        foreach (self::$_all_exceptions as $time => $ex) {
            $error_code = '';
            // process trace info
            if (empty($ex['trace'])) {
                $trace_details .= esc_html__(
                    'Sorry, but no trace information was available for this exception.',
                    'event_espresso'
                );
            } else {
                $trace_details .= '
			<div id="ee-trace-details">
			<table>
				<tr>
					<th scope="col" style="width:2.5%;">#</th>
					<th scope="col" style="width:3.5%;">Line</th>
					<th scope="col" style="width:40%;">File</th>
					<th scope="col">Class</th>
					<th scope="col">Method( arguments )</th>
				</tr>';
                $last_on_stack = count($ex['trace']) - 1;
                // reverse array so that stack is in proper chronological order
                $sorted_trace = array_reverse($ex['trace']);
                foreach ($sorted_trace as $number => $trace) {
                    $file     = $trace['file'] ?? '';
                    $class    = $trace['class'] ?? '';
                    $type     = $trace['type'] ?? '';
                    $function = $trace['function'] ?? '';
                    $args     = isset($trace['args']) ? $this->_convert_args_to_string($trace['args']) : '';
                    $line     = $trace['line'] ?? '';
                    $zebra    = ($number % 2) ? ' odd' : '';
                    if (empty($file) && ! empty($class)) {
                        $a    = new ReflectionClass($class);
                        $file = $a->getFileName();
                        if (empty($line) && ! empty($function)) {
                            try {
                                // if $function is a closure, this throws an exception
                                $b    = new ReflectionMethod($class, $function);
                                $line = $b->getStartLine();
                            } catch (Exception $closure_exception) {
                                $line = 'unknown';
                            }
                        }
                    }
                    if ($number === $last_on_stack) {
                        $file       = $ex['file'] !== '' ? $ex['file'] : $file;
                        $line       = $ex['line'] !== '' ? $ex['line'] : $line;
                        $error_code = self::generate_error_code($file, $trace['function'], $line);
                    }
                    $number_display   = ! empty($number) ? $number : '&nbsp;';
                    $line_display     = ! empty($line) ? $line : '&nbsp;';
                    $file_display     = ! empty($file) ? $file : '&nbsp;';
                    $class_display    = ! empty($class) ? $class : '&nbsp;';
                    $type_display     = ! empty($type) ? $type : '&nbsp;';
                    $function_display = ! empty($function) ? $function : '&nbsp;';
                    $args_display     = ! empty($args) ? '( ' . $args . ' )' : '';
                    $trace_details    .= '
					<tr>
						<td class="' . $zebra . '">' . $number_display . '</td>
						<td class="' . $zebra . '">' . $line_display . '</td>
						<td class="' . $zebra . '">' . $file_display . '</td>
						<td class="' . $zebra . '">' . $class_display . '</td>
						<td class="' . $zebra . '">' . $type_display . $function_display . $args_display . '</td>
					</tr>';
                }
                $trace_details .= '
			 </table>
			</div>';
            }
            $ex['code'] = $ex['code'] ?: $error_code;
            // add generic non-identifying messages for non-privileged users
            if (! WP_DEBUG) {
                $output .= '<span class="ee-error-user-msg-spn">'
                           . trim($ex['msg'])
                           . '</span> &nbsp; <sup>'
                           . $ex['code']
                           . '</sup><br />';
            } else {
                // or helpful developer messages if debugging is on
                $output .= '
		<div class="ee-error-dev-msg-dv">
			<p class="ee-error-dev-msg-pg">
				<strong class="ee-error-dev-msg-str">An '
                           . $ex['name']
                           . ' exception was thrown!</strong>  &nbsp; <span>code: '
                           . $ex['code']
                           . '</span><br />
				<span class="big-text">"'
                           . trim($ex['msg'])
                           . '"</span><br/>
				<a id="display-ee-error-trace-'
                           . self::$_error_count
                           . $time
                           . '" class="display-ee-error-trace-lnk small-text" rel="ee-error-trace-'
                           . self::$_error_count
                           . $time
                           . '">
					'
                           . esc_html__('click to view backtrace and class/method details', 'event_espresso')
                           . '
				</a><br />
				<span class="small-text lt-grey-text">'
                           . $ex['file']
                           . ' &nbsp; ( line no: '
                           . $ex['line']
                           . ' )</span>
			</p>
			<div id="ee-error-trace-'
                           . self::$_error_count
                           . $time
                           . '-dv" class="ee-error-trace-dv" style="display: none;">
				'
                           . $trace_details;
                if (! empty($class)) {
                    $output .= '
				<div style="padding:3px; margin:0 0 1em; border:1px solid #666; background:#fff; border-radius:3px;">
					<div style="padding:1em 2em; border:1px solid #666; background:#f9f9f9;">
						<h3>Class Details</h3>';
                    $a      = new ReflectionClass($class);
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
            $this->write_to_error_log($time, $ex);
        }
        // remove last linebreak
        $output = substr($output, 0, -6);
        if (! WP_DEBUG) {
            $output .= '
	        </p>';
        }
        $output .= '
        </div>';
        $output .= self::_print_scripts(true);
        if (defined('DOING_AJAX')) {
            echo wp_json_encode(['error' => $output]);
            exit();
        }
        echo wp_kses($output, AllowedTags::getWithFormTags());
        die();
    }


    /**
     *    generate string from exception trace args
     *
     * @param array $arguments
     * @param bool  $array
     * @return string
     */
    private function _convert_args_to_string(array $arguments = [], bool $array = false): string
    {
        $arg_string = '';
        if (! empty($arguments)) {
            $args = [];
            foreach ($arguments as $arg) {
                if (! empty($arg)) {
                    if (is_string($arg)) {
                        $args[] = " '" . $arg . "'";
                    } elseif (is_array($arg)) {
                        $args[] = 'ARRAY(' . $this->_convert_args_to_string($arg, true);
                    } elseif (is_bool($arg)) {
                        $args[] = $arg ? ' TRUE' : ' FALSE';
                    } elseif (is_object($arg)) {
                        $args[] = ' OBJECT ' . get_class($arg);
                    } elseif (is_resource($arg)) {
                        $args[] = get_resource_type($arg);
                    } else {
                        $args[] = $arg;
                    }
                } else {
                    $args[] = ' NULL';
                }
            }
            $arg_string = implode(', ', $args);
        }
        if ($array) {
            $arg_string .= ' )';
        }
        return $arg_string;
    }


    /**
     *    add error message
     *
     * @param string $msg         the message to display to users or developers - adding a double pipe || (OR) creates
     *                            separate messages for user || dev
     * @param string $file        the file that the error occurred in - just use __FILE__
     * @param string $func        the function/method that the error occurred in - just use __FUNCTION__
     * @param int|string $line        the line number where the error occurred - just use __LINE__
     * @return        void
     */
    public static function add_error(string $msg, string $file, string $func, $line)
    {
        self::_add_notice('errors', $msg, $file, $func, $line);
        self::$_error_count++;
    }


    /**
     * If WP_DEBUG is active, throws an exception. If WP_DEBUG is off, just
     * adds an error
     *
     * @param string $msg
     * @param string $file
     * @param string $func
     * @param int|string $line
     * @throws EE_Error
     */
    public static function throw_exception_if_debugging(
        string $msg = '',
        string $file = '',
        string $func = '',
        $line = ''
    ) {
        if (WP_DEBUG) {
            throw new EE_Error($msg);
        }
        EE_Error::add_error($msg, $file, $func, $line);
    }


    /**
     *    add success message
     *
     * @param string $msg         the message to display to users or developers - adding a double pipe || (OR) creates
     *                            separate messages for user || dev
     * @param string $file        the file that the error occurred in - just use __FILE__
     * @param string $func        the function/method that the error occurred in - just use __FUNCTION__
     * @param int|string $line        the line number where the error occurred - just use __LINE__
     * @return void
     */
    public static function add_success(string $msg = '', string $file = '', string $func = '', $line = '')
    {
        self::_add_notice('success', $msg, $file, $func, $line);
    }


    /**
     *    add attention message
     *
     * @param string $msg         the message to display to users or developers - adding a double pipe || (OR) creates
     *                            separate messages for user || dev
     * @param string $file        the file that the error occurred in - just use __FILE__
     * @param string $func        the function/method that the error occurred in - just use __FUNCTION__
     * @param int|string $line        the line number where the error occurred - just use __LINE__
     * @return        void
     */
    public static function add_attention(string $msg = '', string $file = '', string $func = '', $line = '')
    {
        self::_add_notice('attention', $msg, $file, $func, $line);
    }


    /**
     * @param string $type whether the message is for a success or error notification
     * @param string $msg  the message to display to users or developers
     *                     - adding a double pipe || (OR) creates separate messages for user || dev
     * @param string $file the file that the error occurred in - just use __FILE__
     * @param string $func the function/method that the error occurred in - just use __FUNCTION__
     * @param int|string $line the line number where the error occurred - just use __LINE__
     * @return void
     */
    private static function _add_notice(
        string $type = 'success',
        string $msg = '',
        string $file = '',
        string $func = '',
        $line = ''
    ) {
        if (empty($msg)) {
            EE_Error::doing_it_wrong(
                'EE_Error::add_' . $type . '()',
                sprintf(
                    esc_html__(
                        'Notifications are not much use without a message! Please add a message to the EE_Error::add_%s() call made in %s on line %d',
                        'event_espresso'
                    ),
                    $type,
                    $file,
                    $line
                ),
                EVENT_ESPRESSO_VERSION
            );
        }
        if ($type === 'errors' && (empty($file) || empty($func) || empty($line))) {
            EE_Error::doing_it_wrong(
                'EE_Error::add_error()',
                esc_html__(
                    'You need to provide the file name, function name, and line number that the error occurred on in order to better assist with debugging.',
                    'event_espresso'
                ),
                EVENT_ESPRESSO_VERSION
            );
        }
        // get separate user and developer messages if they exist
        $msg      = explode('||', $msg);
        $user_msg = $msg[0];
        $dev_msg  = $msg[1] ?? $msg[0];
        /**
         * Do an action so other code can be triggered when a notice is created
         *
         * @param string $type     can be 'errors', 'attention', or 'success'
         * @param string $user_msg message displayed to user when WP_DEBUG is off
         * @param string $user_msg message displayed to user when WP_DEBUG is on
         * @param string $file     file where error was generated
         * @param string $func     function where error was generated
         * @param int|string $line     line where error was generated
         */
        do_action('AHEE__EE_Error___add_notice', $type, $user_msg, $dev_msg, $file, $func, $line);
        $msg = WP_DEBUG ? $dev_msg : $user_msg;
        // add notice if message exists
        if (! empty($msg)) {
            // get error code
            $notice_code = EE_Error::generate_error_code($file, $func, $line);
            if (WP_DEBUG && $type === 'errors') {
                $msg .= '<br/><span class="tiny-text">' . $notice_code . '</span>';
            }

            if (! is_array(self::$_espresso_notices[ $type ]) || ! array_key_exists($type, self::$_espresso_notices)) {
                self::$_espresso_notices[ $type ] = [];
            }

            // add notice. Index by code if it's not blank
            if ($notice_code) {
                self::$_espresso_notices[ $type ][ $notice_code ] = $msg;
            } else {
                self::$_espresso_notices[ $type ][] = $msg;
            }
            add_action('wp_footer', ['EE_Error', 'enqueue_error_scripts'], 1);
        }
    }


    /**
     * in some case it may be necessary to overwrite the existing success messages
     *
     * @return        void
     */
    public static function overwrite_success()
    {
        self::$_espresso_notices['success'] = [];
    }


    /**
     * in some case it may be necessary to overwrite the existing attention messages
     *
     * @return void
     */
    public static function overwrite_attention()
    {
        self::$_espresso_notices['attention'] = [];
    }


    /**
     * in some case it may be necessary to overwrite the existing error messages
     *
     * @return void
     */
    public static function overwrite_errors()
    {
        self::$_espresso_notices['errors'] = [];
    }


    /**
     * @return void
     */
    public static function reset_notices()
    {
        self::$_espresso_notices['success']   = [];
        self::$_espresso_notices['attention'] = [];
        self::$_espresso_notices['errors']    = [];
    }


    /**
     * @return int
     */
    public static function has_notices(): int
    {
        $has_notices = 0;
        // check for success messages
        $has_notices = self::$_espresso_notices['success'] && ! empty(self::$_espresso_notices['success'])
            ? 3
            : $has_notices;
        // check for attention messages
        $has_notices = self::$_espresso_notices['attention'] && ! empty(self::$_espresso_notices['attention'])
            ? 2
            : $has_notices;
        // check for error messages
        return self::$_espresso_notices['errors'] && ! empty(self::$_espresso_notices['errors'])
            ? 1
            : $has_notices;
    }


    /**
     * This simply returns non formatted error notices as they were sent into the EE_Error object.
     *
     * @return array
     * @since 4.9.0
     */
    public static function get_vanilla_notices(): array
    {
        return [
            'success'   => self::$_espresso_notices['success'] ?? [],
            'attention' => self::$_espresso_notices['attention'] ?? [],
            'errors'    => self::$_espresso_notices['errors'] ?? [],
        ];
    }


    /**
     * @return array
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function getStoredNotices(): array
    {
        if ($user_id = get_current_user_id()) {
            // get notices for logged in user
            $notices = get_user_option(EE_Error::OPTIONS_KEY_NOTICES, $user_id);
            return is_array($notices) ? $notices : [];
        }
        if (EE_Session::isLoadedAndActive()) {
            // get notices for user currently engaged in a session
            $session_data = EE_Session::instance()->get_session_data(EE_Error::OPTIONS_KEY_NOTICES);
            return is_array($session_data) ? $session_data : [];
        }
        // get global notices and hope they apply to the current site visitor
        $notices = get_option(EE_Error::OPTIONS_KEY_NOTICES, []);
        return is_array($notices) ? $notices : [];
    }


    /**
     * @param array $notices
     * @return bool
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function storeNotices(array $notices): bool
    {
        if ($user_id = get_current_user_id()) {
            // store notices for logged in user
            return (bool) update_user_option(
                $user_id,
                EE_Error::OPTIONS_KEY_NOTICES,
                $notices
            );
        }
        if (EE_Session::isLoadedAndActive()) {
            // store notices for user currently engaged in a session
            return EE_Session::instance()->set_session_data(
                [EE_Error::OPTIONS_KEY_NOTICES => $notices]
            );
        }
        // store global notices and hope they apply to the same site visitor on the next request
        return update_option(EE_Error::OPTIONS_KEY_NOTICES, $notices);
    }


    /**
     * @return bool
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function clearNotices(): bool
    {
        if ($user_id = get_current_user_id()) {
            // clear notices for logged in user
            return (bool) update_user_option(
                $user_id,
                EE_Error::OPTIONS_KEY_NOTICES,
                []
            );
        }
        if (EE_Session::isLoadedAndActive()) {
            // clear notices for user currently engaged in a session
            return EE_Session::instance()->reset_data(EE_Error::OPTIONS_KEY_NOTICES);
        }
        // clear global notices and hope none belonged to some for some other site visitor
        return update_option(EE_Error::OPTIONS_KEY_NOTICES, []);
    }


    /**
     * saves notices to the db for retrieval on next request
     *
     * @return void
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function stashNoticesBeforeRedirect()
    {
        EE_Error::get_notices(false, true);
    }


    /**
     * compile all error or success messages into one string
     *
     * @param boolean $format_output            whether or not to format the messages for display in the WP admin
     * @param boolean $save_to_transient        whether or not to save notices to the db for retrieval on next request
     *                                          - ONLY do this just before redirecting
     * @param bool $remove_empty             whether or not to unset empty messages
     * @return array|string
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @see EE_Error::get_raw_notices if you want the raw notices without any preparations made to them
     */
    public static function get_notices(
        bool $format_output = true,
        bool $save_to_transient = false,
        bool $remove_empty = true
    ) {
        $success_messages   = '';
        $attention_messages = '';
        $error_messages     = '';
        /** @var RequestInterface $request */
        $request = LoaderFactory::getLoader()->getShared(RequestInterface::class);
        // either save notices to the db
        if ($save_to_transient || $request->requestParamIsSet('activate-selected')) {
            self::$_espresso_notices = array_merge(
                EE_Error::getStoredNotices(),
                self::$_espresso_notices
            );
            EE_Error::storeNotices(self::$_espresso_notices);
            return [];
        }
        $print_scripts = EE_Error::combineExistingAndNewNotices();
        // check for success messages
        if (! empty(self::$_espresso_notices['success'])) {
            // combine messages
            $success_messages .= implode('<br />', self::$_espresso_notices['success']);
            $print_scripts    = true;
        }
        // check for attention messages
        if (! empty(self::$_espresso_notices['attention'])) {
            // combine messages
            $attention_messages .= implode('<br />', self::$_espresso_notices['attention']);
            $print_scripts      = true;
        }
        // check for error messages
        if (! empty(self::$_espresso_notices['errors'])) {
            $error_messages .= count(self::$_espresso_notices['errors']) > 1
                ? esc_html__('The following errors have occurred:', 'event_espresso')
                : esc_html__('An error has occurred:', 'event_espresso');
            // combine messages
            $error_messages .= '<br />' . implode('<br />', self::$_espresso_notices['errors']);
            $print_scripts  = true;
        }
        if ($format_output) {
            $notices = EE_Error::formatNoticesOutput(
                $success_messages,
                $attention_messages,
                $error_messages
            );
        } else {
            $notices = [
                'success'   => $success_messages,
                'attention' => $attention_messages,
                'errors'    => $error_messages,
            ];
            if ($remove_empty) {
                // remove empty notices
                foreach ($notices as $type => $notice) {
                    if (empty($notice)) {
                        unset($notices[ $type ]);
                    }
                }
            }
        }
        if ($print_scripts) {
            self::_print_scripts();
        }
        return $notices;
    }


    /**
     * @return bool
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    private static function combineExistingAndNewNotices(): bool
    {
        $print_scripts = false;
        // grab any notices that have been previously saved
        $notices = EE_Error::getStoredNotices();
        if (! empty($notices)) {
            foreach ($notices as $type => $notice) {
                if (is_array($notice) && ! empty($notice)) {
                    // make sure that existing notice type is an array
                    self::$_espresso_notices[ $type ] = is_array(self::$_espresso_notices[ $type ])
                                                        && ! empty(self::$_espresso_notices[ $type ])
                        ? self::$_espresso_notices[ $type ]
                        : [];
                    // add newly created notices to existing ones
                    self::$_espresso_notices[ $type ] += $notice;
                    $print_scripts                    = true;
                }
            }
            // now clear any stored notices
            EE_Error::clearNotices();
        }
        return $print_scripts;
    }


    /**
     * @param string $success_messages
     * @param string $attention_messages
     * @param string $error_messages
     * @return string
     */
    private static function formatNoticesOutput(
        string $success_messages,
        string $attention_messages,
        string $error_messages
    ): string {
        $notices = '<div id="espresso-notices">';
        $close   = is_admin()
            ? ''
            : '<a class="close-espresso-notice hide-if-no-js"><span class="dashicons dashicons-no"/></a>';
        if ($success_messages !== '') {
            $css_id    = is_admin() ? 'ee-success-message' : 'espresso-notices-success';
            $css_class = is_admin() ? 'updated fade' : 'success fade-away';
            // showMessage( $success_messages );
            $notices .= '<div id="' . $css_id . '" '
                        . 'class="espresso-notices ' . $css_class . '" '
                        . 'style="display:none;">'
                        . '<p>' . $success_messages . '</p>'
                        . $close
                        . '</div>';
        }
        if ($attention_messages !== '') {
            $css_id    = is_admin() ? 'ee-attention-message' : 'espresso-notices-attention';
            $css_class = is_admin() ? 'updated ee-notices-attention' : 'attention fade-away';
            // showMessage( $error_messages, TRUE );
            $notices .= '<div id="' . $css_id . '" '
                        . 'class="espresso-notices ' . $css_class . '" '
                        . 'style="display:none;">'
                        . '<p>' . $attention_messages . '</p>'
                        . $close
                        . '</div>';
        }
        if ($error_messages !== '') {
            $css_id    = is_admin() ? 'ee-error-message' : 'espresso-notices-error';
            $css_class = is_admin() ? 'error' : 'error fade-away';
            // showMessage( $error_messages, TRUE );
            $notices .= '<div id="' . $css_id . '" '
                        . 'class="espresso-notices ' . $css_class . '" '
                        . 'style="display:none;">'
                        . '<p>' . $error_messages . '</p>'
                        . $close
                        . '</div>';
        }
        $notices .= '</div>';
        return $notices;
    }


    /**
     * _print_scripts
     *
     * @param bool $force_print
     * @return    string
     */
    private static function _print_scripts(bool $force_print = false): string
    {
        if (! $force_print && (did_action('admin_enqueue_scripts') || did_action('wp_enqueue_scripts'))) {
            if (wp_script_is('ee_error_js', 'registered')) {
                wp_enqueue_style('espresso_default');
                wp_enqueue_style('espresso_custom_css');
                wp_enqueue_script('ee_error_js');
            }
            if (wp_script_is('ee_error_js')) {
                wp_localize_script('ee_error_js', 'ee_settings', ['wp_debug' => WP_DEBUG]);
                return '';
            }
        } else {
            return '
<script>
/* <![CDATA[ */
const ee_settings = {"wp_debug":"' . WP_DEBUG . '"};
/* ]]> */
</script>
<script src="' . includes_url() . 'js/jquery/jquery.js" type="text/javascript"></script>
<script src="' . EE_GLOBAL_ASSETS_URL . 'scripts/espresso_core.js' . '?ver=' . espresso_version() . '" type="text/javascript"></script>
<script src="' . EE_GLOBAL_ASSETS_URL . 'scripts/EE_Error.js' . '?ver=' . espresso_version() . '" type="text/javascript"></script>
';
        }
        return '';
    }


    /**
     * @return void
     */
    public static function enqueue_error_scripts()
    {
        self::_print_scripts();
    }


    /**
     * create error code from filepath, function name,
     * and line number where exception or error was thrown
     *
     * @param string $file
     * @param string $func
     * @param int|string $line
     * @return string
     */
    public static function generate_error_code(string $file = '', string $func = '', $line = ''): string
    {
        $file       = explode('.', basename($file));
        $error_code = ! empty($file[0]) ? $file[0] : '';
        $error_code .= ! empty($func) ? ' - ' . $func : '';
        $error_code .= ! empty($line) ? ' - ' . $line : '';
        return $error_code;
    }


    /**
     * write exception details to log file
     * Since 4.9.53.rc.006 this writes to the standard PHP log file, not EE's custom log file
     *
     * @param int   $time
     * @param array $ex
     * @param bool  $clear
     * @return void
     */
    public function write_to_error_log(int $time = 0, array $ex = [], bool $clear = false)
    {
        if (empty($ex)) {
            return;
        }
        if (! $time) {
            $time = time();
        }
        $exception_log = '----------------------------------------------------------------------------------------'
                         . PHP_EOL;
        $exception_log .= '[' . date('Y-m-d H:i:s', $time) . ']  Exception Details' . PHP_EOL;
        $exception_log .= 'Message: ' . $ex['msg'] . PHP_EOL;
        $exception_log .= 'Code: ' . $ex['code'] . PHP_EOL;
        $exception_log .= 'File: ' . $ex['file'] . PHP_EOL;
        $exception_log .= 'Line No: ' . $ex['line'] . PHP_EOL;
        $exception_log .= 'Stack trace: ' . PHP_EOL;
        $exception_log .= $ex['string'] . PHP_EOL;
        $exception_log .= '----------------------------------------------------------------------------------------'
                          . PHP_EOL;
        try {
            error_log($exception_log);
        } catch (Exception $e) {
            EE_Error::add_error(
                sprintf(
                    esc_html__(
                        'Event Espresso error logging could not be setup because: %s',
                        'event_espresso'
                    ),
                    $e->getMessage()
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
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
     * @param string   $function     The function that was called
     * @param string   $message      A message explaining what has been done incorrectly
     * @param string   $version      The version of Event Espresso where the error was added
     * @param string   $applies_when a version string for when you want the doing_it_wrong notice to begin appearing
     *                               for a deprecated function. This allows deprecation to occur during one version,
     *                               but not have any notices appear until a later version. This allows developers
     *                               extra time to update their code before notices appear.
     * @param int|null $error_type
     * @uses   constant WP_DEBUG test if wp_debug is on or not
     */
    public static function doing_it_wrong(
        string $function,
        string $message,
        string $version,
        string $applies_when = '',
        int $error_type = null
    ) {
        if (defined('WP_DEBUG') && WP_DEBUG) {
            EEH_Debug_Tools::instance()->doing_it_wrong($function, $message, $version, $applies_when, $error_type);
        }
    }


    /**
     * Like get_notices, but returns an array of all the notices of the given type.
     *
     * @return array {
     * @type array $success   all the success messages
     * @type array $errors    all the error messages
     * @type array $attention all the attention messages
     * }
     */
    public static function get_raw_notices(): array
    {
        return self::$_espresso_notices;
    }


    /**
     * @param string $pan_name     the name, or key of the Persistent Admin Notice to be stored
     * @param string $pan_message  the message to be stored persistently until dismissed
     * @param bool   $force_update allows one to enforce the reappearance of a persistent message.
     * @return void
     * @throws InvalidDataTypeException
     * @deprecated 4.9.27
     */
    public static function add_persistent_admin_notice(
        string $pan_name = '',
        string $pan_message = '',
        bool $force_update = false
    ) {
        new PersistentAdminNotice(
            $pan_name,
            $pan_message,
            $force_update
        );
        EE_Error::doing_it_wrong(
            __METHOD__,
            sprintf(
                esc_html__('Usage is deprecated. Use "%1$s" instead.', 'event_espresso'),
                '\EventEspresso\core\domain\entities\notifications\PersistentAdminNotice'
            ),
            '4.9.27'
        );
    }


    /**
     * @param string $pan_name the name, or key of the Persistent Admin Notice to be dismissed
     * @param bool   $purge
     * @param bool   $return
     * @throws DomainException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws ServiceNotFoundException
     * @throws InvalidArgumentException
     * @deprecated 4.9.27
     */
    public static function dismiss_persistent_admin_notice(
        string $pan_name = '',
        bool $purge = false,
        bool $return = false
    ) {
        /** @var PersistentAdminNoticeManager $persistent_admin_notice_manager */
        $persistent_admin_notice_manager = LoaderFactory::getLoader()->getShared(
            'EventEspresso\core\services\notifications\PersistentAdminNoticeManager'
        );
        $persistent_admin_notice_manager->dismissNotice($pan_name, $purge, $return);
        EE_Error::doing_it_wrong(
            __METHOD__,
            sprintf(
                esc_html__('Usage is deprecated. Use "%1$s" instead.', 'event_espresso'),
                '\EventEspresso\core\services\notifications\PersistentAdminNoticeManager'
            ),
            '4.9.27'
        );
    }


    /**
     * @param string $pan_name    the name, or key of the Persistent Admin Notice to be stored
     * @param string $pan_message the message to be stored persistently until dismissed
     * @param string $return_url  URL to go back to after nag notice is dismissed
     * @deprecated 4.9.27
     */
    public static function display_persistent_admin_notices(
        string $pan_name = '',
        string $pan_message = '',
        string $return_url = ''
    ) {
        EE_Error::doing_it_wrong(
            __METHOD__,
            sprintf(
                esc_html__('Usage is deprecated. Use "%1$s" instead.', 'event_espresso'),
                '\EventEspresso\core\services\notifications\PersistentAdminNoticeManager'
            ),
            '4.9.27'
        );
    }


    /**
     * @param string $return_url
     * @deprecated 4.9.27
     */
    public static function get_persistent_admin_notices(string $return_url = '')
    {
        EE_Error::doing_it_wrong(
            __METHOD__,
            sprintf(
                esc_html__('Usage is deprecated. Use "%1$s" instead.', 'event_espresso'),
                '\EventEspresso\core\services\notifications\PersistentAdminNoticeManager'
            ),
            '4.9.27'
        );
    }
}

// end of Class EE_Exceptions


/**
 * espresso_error_enqueue_scripts
 *
 * @return    void
 */
function espresso_error_enqueue_scripts()
{
    // js for error handling
    wp_register_script(
        'espresso_core',
        EE_GLOBAL_ASSETS_URL . 'scripts/espresso_core.js',
        ['jquery'],
        EVENT_ESPRESSO_VERSION
    );
    wp_register_script(
        'ee_error_js',
        EE_GLOBAL_ASSETS_URL . 'scripts/EE_Error.js',
        ['espresso_core'],
        EVENT_ESPRESSO_VERSION
    );
    wp_localize_script('ee_error_js', 'ee_settings', ['wp_debug' => WP_DEBUG]);
}


if (is_admin()) {
    add_action('admin_enqueue_scripts', 'espresso_error_enqueue_scripts', 5);
} else {
    add_action('wp_enqueue_scripts', 'espresso_error_enqueue_scripts', 5);
}





/* End of file EE_Exceptions.class.php */
/* Location: includes/classes/EE_Exceptions.class.php */
