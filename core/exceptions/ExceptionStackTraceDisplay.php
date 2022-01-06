<?php

namespace EventEspresso\core\exceptions;

use EEH_File;
use Exception;
use ReflectionClass;
use ReflectionException;
use ReflectionMethod;

/**
 * Class ExceptionStackTraceDisplay
 * displays exceptions with a stack trace and class description for where the exception was thrown
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class ExceptionStackTraceDisplay
{

    /**
     * @var   string
     * @since $VID:$
     */
    private $class_name = '';

    /**
     * @var   string
     * @since $VID:$
     */
    private $error_code = '';


    /**
     * @param Exception $exception
     * @throws Exception
     */
    public function __construct(Exception $exception)
    {
        if (WP_DEBUG && ! defined('EE_TESTS_DIR')) {
            $this->displayException($exception);
        } else {
            throw $exception;
        }
    }


    /**
     * @access protected
     * @param Exception $exception
     * @throws ReflectionException
     */
    protected function displayException(Exception $exception)
    {
        // get separate user and developer messages if they exist
        $msg = explode('||', $exception->getMessage());
        $user_msg = $msg[0];
        $dev_msg = isset($msg[1]) ? $msg[1] : $msg[0];
        $msg = WP_DEBUG ? $dev_msg : $user_msg;
        // process trace info
        $trace_details = $this->traceDetails($exception);
        $code          = $exception->getCode() ?: $this->error_code;
        // add helpful developer messages if debugging is on
        // or generic non-identifying messages for non-privileged users
        $error_message = WP_DEBUG
            ? $this->developerError($exception, $msg, $code, $trace_details)
            : $this->genericError($msg, $code);
        // start gathering output
        $output = '
<div id="ee-error-message" class="error">
    ' . $error_message . '
</div>';
        $styles = $this->exceptionStyles();
        $scripts = $this->printScripts(true);
        if (defined('DOING_AJAX')) {
            echo wp_json_encode(array('error' => $styles . $output . $scripts));
            exit();
        }
        echo $styles, $output, $scripts; // already escaped
    }


    private function genericError($msg, $code)
    {
        return '
    <p>
        <span class="ee-error-user-msg-spn">' . trim($msg) . '</span> &nbsp; <sup>' . $code . '</sup>
	</p>';
    }


    /**
     * @throws ReflectionException
     */
    private function developerError(Exception $exception, $msg, $code, $trace_details)
    {
        $time = time();
        return '
	<div class="ee-error-dev-msg-dv">
		<p class="ee-error-dev-msg-pg">
		    '
               . sprintf(
               esc_html__('%1$sAn %2$s was thrown!%3$s code: %4$s', 'event_espresso'),
               '<strong class="ee-error-dev-msg-str">',
               get_class($exception),
               '</strong>  &nbsp; <span>',
               $code . '</span>'
            )
               . '<br />
            <span class="big-text">"' . trim($msg) . '"</span><br/>
            <a id="display-ee-error-trace-1'
               . $time
               . '" class="display-ee-error-trace-lnk small-text" rel="ee-error-trace-1'
               . $time
               . '">
                ' . esc_html__('click to view backtrace and class/method details', 'event_espresso') . '
            </a><br />
            '
               . $exception->getFile()
               . sprintf(
               esc_html__('%1$s( line no: %2$s )%3$s', 'event_espresso'),
               ' &nbsp; <span class="small-text lt-grey-text">',
               $exception->getLine(),
               '</span>'
            )
               . '
        </p>
        <div id="ee-error-trace-1'
               . $time
               . '-dv" class="ee-error-trace-dv" style="display: none;">
            '
               . $trace_details
               . $this->classDetails() . '
        </div>
    </div>';
    }


    /**
     * @throws ReflectionException
     */
    private function classDetails()
    {
        if (empty($this->class_name)) {
            return '';
        }
        $a = new ReflectionClass($this->class_name);
        return '
            <div style="padding:3px; margin:0 0 1em; border:1px solid #999; background:#fff; border-radius:3px;">
                <div style="padding:1em 2em; border:1px solid #999; background:#fcfcfc;">
                    <h3>' . esc_html__('Class Details', 'event_espresso') . '</h3>
                    <pre>' . $a . '</pre>
                </div>
            </div>';
    }

    /**
     * @param Exception $exception
     * @return string
     * @throws ReflectionException
     * @since $VID:$
     */
    private function traceDetails(Exception $exception)
    {
        $trace = $exception->getTrace();
        if (empty($trace)) {
            return esc_html__(
                'Sorry, but no trace information was available for this exception.',
                'event_espresso'
            );
        }

        $trace_details = '
        <div id="ee-trace-details">
            <table>
                <tr>
                    <th scope="col" class="ee-align-right" style="width:2.5%;">#</th>
                    <th scope="col" class="ee-align-right" style="width:3.5%;">Line</th>
                    <th scope="col" class="ee-align-left" style="width:40%;">File</th>
                    <th scope="col" class="ee-align-left">
                    ' . esc_html__('Class', 'event_espresso')
                              . '->'
                              . esc_html__('Method( arguments )', 'event_espresso') . '
                    </th>
                </tr>';
        $last_on_stack = count($trace) - 1;
        // reverse array so that stack is in proper chronological order
        $sorted_trace = array_reverse($trace);
        foreach ($sorted_trace as $nmbr => $trace) {
            $this->class_name = isset($trace['class']) ? $trace['class'] : '';
            $file     = isset($trace['file']) ? $trace['file'] : '';
            $type     = isset($trace['type']) ? $trace['type'] : '';
            $function = isset($trace['function']) ? $trace['function'] : '';
            $args     = isset($trace['args']) ? $this->_convert_args_to_string($trace['args']) : '';
            $args     = isset($trace['args']) && count($trace['args']) > 4 ? ' <br />' . $args . '<br />' : $args;
            $line     = isset($trace['line']) ? $trace['line'] : '';
            if (empty($file) && ! empty($this->class_name)) {
                $a    = new ReflectionClass($this->class_name);
                $file = $a->getFileName();
                if (empty($line) && ! empty($function)) {
                    try {
                        // if $function is a closure, this throws an exception
                        $b    = new ReflectionMethod($this->class_name, $function);
                        $line = $b->getStartLine();
                    } catch (Exception $closure_exception) {
                        $line = 'unknown';
                    }
                }
            }
            if ($nmbr === $last_on_stack) {
                $file       = $exception->getFile() ?: $file;
                $line       = $exception->getLine() ?: $line;
                $this->error_code = $this->generate_error_code($file, $trace['function'], $line);
            }
            $file          = EEH_File::standardise_directory_separators($file);
            $nmbr          = ! empty($nmbr) ? $nmbr : '&nbsp;';
            $line          = ! empty($line) ? $line : '&nbsp;';
            $file          = ! empty($file) ? $file : '&nbsp;';
            $type          = ! empty($type) ? $type : '';
            $function      = ! empty($function) ? $function : '';
            $args          = ! empty($args) ? '( ' . $args . ' )' : '()';
            $trace_details .= '
                <tr>
                    <td class="ee-align-right">' . $nmbr . '</td>
                    <td class="ee-align-right">' . $line . '</td>
                    <td class="ee-align-left">' . $file . '</td>
                    <td class="ee-align-left">' . $this->class_name . $type . $function . $args . '</td>
                </tr>';
        }
        $trace_details .= '
            </table>
        </div>';
        return $trace_details;
    }


    // phpcs:disable PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    // phpcs:disable PSR2.Methods.MethodDeclaration.Underscore

    /**
     * generate string from exception trace args
     *
     * @param array $arguments
     * @param int   $indent
     * @param bool  $array
     * @return string
     */
    private function _convert_args_to_string($arguments = array(), $indent = 0, $array = false)
    {
        $args = array();
        $args_count = count($arguments);
        if ($args_count > 2) {
            $indent++;
            $args[] = '<br />';
        }
        $x = 0;
        foreach ($arguments as $arg) {
            $x++;
            for ($i = 0; $i < $indent; $i++) {
                $args[] = ' &nbsp;&nbsp; ';
            }
            if (is_string($arg)) {
                if (! $array && strlen($arg) > 75) {
                    $args[] = '<br />';
                    for ($i = 0; $i <= $indent; $i++) {
                        $args[] = ' &nbsp;&nbsp; ';
                    }
                    $args[] = "'" . $arg . "'<br />";
                } else {
                    $args[] = " '" . $arg . "'";
                }
            } elseif (is_array($arg)) {
                $arg_count = count($arg);
                if ($arg_count > 2) {
                    $indent++;
                    $args[] = ' array(' . $this->_convert_args_to_string($arg, $indent, true) . ')';
                    $indent--;
                } elseif ($arg_count === 0) {
                    $args[] = ' array()';
                } else {
                    $args[] = ' array( ' . $this->_convert_args_to_string($arg) . ' )';
                }
            } elseif ($arg === null) {
                $args[] = ' null';
            } elseif (is_bool($arg)) {
                $args[] = $arg ? ' true' : ' false';
            } elseif (is_object($arg)) {
                $args[] = get_class($arg);
            } elseif (is_resource($arg)) {
                $args[] = get_resource_type($arg);
            } else {
                $args[] = $arg;
            }
            if ($x === $args_count) {
                if ($args_count > 2) {
                    $args[] = '<br />';
                    $indent--;
                    for ($i = 1; $i < $indent; $i++) {
                        $args[] = ' &nbsp;&nbsp; ';
                    }
                }
            } else {
                $args[] = $args_count > 2 ? ',<br />' : ', ';
            }
        }
        return implode('', $args);
    }


    /**
     * create error code from filepath, function name,
     * and line number where exception or error was thrown
     *
     * @access protected
     * @param string $file
     * @param string $func
     * @param string $line
     * @return string
     */
    protected function generate_error_code($file = '', $func = '', $line = '')
    {
        $file_bits = explode('.', basename($file));
        $error_code = ! empty($file_bits[0]) ? $file_bits[0] : '';
        $error_code .= ! empty($func) ? ' - ' . $func : '';
        $error_code .= ! empty($line) ? ' - ' . $line : '';
        return $error_code;
    }


    /**
     * @return string
     */
    private function exceptionStyles()
    {
        return '
<style media="screen">
	#ee-error-message {
		max-width:90% !important;
		margin: 2em 5%;
	}
	.ee-error-dev-msg-pg,
	.error .ee-error-dev-msg-pg {
		padding:1em;
		margin:0 0 1em;
		border:2px solid #e65983;
		background:#fff;
		border-radius:3px;
		line-height: 1.5em;;
	}
	#ee-trace-details {
		margin:0 0 1em;
	}
	#ee-trace-details table {
		background:#fff;
		width: 100%;
	}
	#ee-trace-details table th {
		background:#e6e6e6;
		padding: .75rem 1.5rem;
	}
	#ee-trace-details table td {
		padding: .75rem 1.5rem;
	}
	#ee-trace-details table .ee-align-left {
		text-align: start;
	}
	#ee-trace-details table .ee-align-right {
		text-align: end;
	}
	#ee-trace-details tr:nth-child(odd) {
		background:#f6f6f6;
	}
	.display-ee-error-trace-lnk {
		color: #008dcb;
		cursor:pointer;
		font-weight: bold;
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
     * @return string
     */
    private function printScripts($force_print = false)
    {
        if (! $force_print && (did_action('admin_enqueue_scripts') || did_action('wp_enqueue_scripts'))) {
            //  if script is already enqueued then we can just get out
            if (wp_script_is('ee_error_js')) {
                return '';
            }
            if (wp_script_is('ee_error_js', 'registered')) {
                wp_enqueue_style('espresso_default');
                wp_enqueue_style('espresso_custom_css');
                wp_enqueue_script('ee_error_js');
                wp_localize_script('ee_error_js', 'ee_settings', array('wp_debug' => WP_DEBUG));
                return '';
            }
        }
        $jquery = esc_url_raw(includes_url() . 'js/jquery/jquery.js');
        $core = esc_url_raw(EE_GLOBAL_ASSETS_URL . 'scripts/espresso_core.js?ver=' . espresso_version());
        $ee_error = esc_url_raw(EE_GLOBAL_ASSETS_URL . 'scripts/EE_Error.js?ver=' . espresso_version());
        return '
<script>
/* <![CDATA[ */
const ee_settings = {"wp_debug":"' . WP_DEBUG . '"};
/* ]]> */
</script>
<script src="' . $jquery . '" type="text/javascript" ></script>
<script src="' . $core . '" type="text/javascript" ></script>
<script src="' . $ee_error . '" type="text/javascript" ></script>
';
    }
}
