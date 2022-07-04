<?php

use EventEspresso\core\services\Benchmark;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\request\RequestInterface;
use EventEspresso\core\services\request\sanitizers\AllowedTags;

/**
 * Class EEH_Debug_Tools
 *
 * @package               Event Espresso
 * @subpackage            core
 * @author                Brent Christensen, Michael Nelson
 * @since                 4.0
 */
class EEH_Debug_Tools
{
    /**
     *    instance of the EEH_Autoloader object
     *
     * @var    $_instance
     * @access    private
     */
    private static $_instance;

    /**
     * @var array
     */
    protected $_memory_usage_points = array();



    /**
     * @singleton method used to instantiate class object
     * @access    public
     * @return EEH_Debug_Tools
     */
    public static function instance()
    {
        // check if class object is instantiated, and instantiated properly
        if (! self::$_instance instanceof EEH_Debug_Tools) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }



    /**
     * private class constructor
     */
    private function __construct()
    {
        // load Kint PHP debugging library
        if (
            defined('EE_LOAD_KINT')
            && ! class_exists('Kint')
            && file_exists(EE_PLUGIN_DIR_PATH . 'tests/kint/Kint.class.php')
        ) {
            // despite EE4 having a check for an existing copy of the Kint debugging class,
            // if another plugin was loaded AFTER EE4 and they did NOT perform a similar check,
            // then hilarity would ensue as PHP throws a "Cannot redeclare class Kint" error
            // so we've moved it to our test folder so that it is not included with production releases
            // plz use https://wordpress.org/plugins/kint-debugger/  if testing production versions of EE
            require_once(EE_PLUGIN_DIR_PATH . 'tests/kint/Kint.class.php');
        }
        $plugin = basename(EE_PLUGIN_DIR_PATH);
        add_action("activate_{$plugin}", array('EEH_Debug_Tools', 'ee_plugin_activation_errors'));
        add_action('activated_plugin', array('EEH_Debug_Tools', 'ee_plugin_activation_errors'));
        add_action('shutdown', array('EEH_Debug_Tools', 'show_db_name'));
    }



    /**
     *    show_db_name
     *
     * @return void
     */
    public static function show_db_name()
    {
        if (! defined('DOING_AJAX') && (defined('EE_ERROR_EMAILS') && EE_ERROR_EMAILS)) {
            echo '<p style="font-size:10px;font-weight:normal;color:#E76700;margin: 1em 2em; text-align: right;">DB_NAME: '
                 . DB_NAME
                 . '</p>';
        }
        if (EE_DEBUG) {
            Benchmark::displayResults();
        }
    }



    /**
     *    dump EE_Session object at bottom of page after everything else has happened
     *
     * @return void
     */
    public function espresso_session_footer_dump()
    {
        if (
            (defined('WP_DEBUG') && WP_DEBUG)
            && ! defined('DOING_AJAX')
            && class_exists('Kint')
            && function_exists('wp_get_current_user')
            && current_user_can('update_core')
            && class_exists('EE_Registry')
        ) {
            Kint::dump(EE_Registry::instance()->SSN->id());
            Kint::dump(EE_Registry::instance()->SSN);
            //          Kint::dump( EE_Registry::instance()->SSN->get_session_data('cart')->get_tickets() );
            $this->espresso_list_hooked_functions();
            Benchmark::displayResults();
        }
    }



    /**
     *    List All Hooked Functions
     *    to list all functions for a specific hook, add ee_list_hooks={hook-name} to URL
     *    http://wp.smashingmagazine.com/2009/08/18/10-useful-wordpress-hook-hacks/
     *
     * @param string $tag
     * @return void
     */
    public function espresso_list_hooked_functions($tag = '')
    {
        global $wp_filter;
        echo '<br/><br/><br/><h3>Hooked Functions</h3>';
        if ($tag) {
            $hook[ $tag ] = $wp_filter[ $tag ];
            if (! is_array($hook[ $tag ])) {
                trigger_error("Nothing found for '$tag' hook", E_USER_WARNING);
                return;
            }
            echo '<h5>For Tag: ' . esc_html($tag) . '</h5>';
        } else {
            $hook = is_array($wp_filter) ? $wp_filter : array($wp_filter);
            ksort($hook);
        }
        foreach ($hook as $tag_name => $priorities) {
            echo "<br />&gt;&gt;&gt;&gt;&gt;\t<strong>esc_html($tag_name)</strong><br />";
            ksort($priorities);
            foreach ($priorities as $priority => $function) {
                echo esc_html($priority);
                foreach ($function as $name => $properties) {
                    $name = esc_html($name);
                    echo "\t$name<br />";
                }
            }
        }
    }



    /**
     *    registered_filter_callbacks
     *
     * @param string $hook_name
     * @return array
     */
    public static function registered_filter_callbacks($hook_name = '')
    {
        $filters = array();
        global $wp_filter;
        if (isset($wp_filter[ $hook_name ])) {
            $filters[ $hook_name ] = array();
            foreach ($wp_filter[ $hook_name ] as $priority => $callbacks) {
                $filters[ $hook_name ][ $priority ] = array();
                foreach ($callbacks as $callback) {
                    $filters[ $hook_name ][ $priority ][] = $callback['function'];
                }
            }
        }
        return $filters;
    }



    /**
     *    captures plugin activation errors for debugging
     *
     * @return void
     * @throws EE_Error
     */
    public static function ee_plugin_activation_errors()
    {
        if (WP_DEBUG) {
            $activation_errors = ob_get_contents();
            if (! empty($activation_errors)) {
                $activation_errors = date('Y-m-d H:i:s') . "\n" . $activation_errors;
            }
            espresso_load_required('EEH_File', EE_HELPERS . 'EEH_File.helper.php');
            if (class_exists('EEH_File')) {
                try {
                    EEH_File::ensure_file_exists_and_is_writable(
                        EVENT_ESPRESSO_UPLOAD_DIR . 'logs/espresso_plugin_activation_errors.html'
                    );
                    EEH_File::write_to_file(
                        EVENT_ESPRESSO_UPLOAD_DIR . 'logs/espresso_plugin_activation_errors.html',
                        $activation_errors
                    );
                } catch (EE_Error $e) {
                    EE_Error::add_error(
                        sprintf(
                            esc_html__(
                                'The Event Espresso activation errors file could not be setup because: %s',
                                'event_espresso'
                            ),
                            $e->getMessage()
                        ),
                        __FILE__,
                        __FUNCTION__,
                        __LINE__
                    );
                }
            } else {
                // old school attempt
                file_put_contents(
                    EVENT_ESPRESSO_UPLOAD_DIR . 'logs/espresso_plugin_activation_errors.html',
                    $activation_errors
                );
            }
            $activation_errors = get_option('ee_plugin_activation_errors', '') . $activation_errors;
            update_option('ee_plugin_activation_errors', $activation_errors);
        }
    }



    /**
     * This basically mimics the WordPress _doing_it_wrong() function except adds our own messaging etc.
     * Very useful for providing helpful messages to developers when the method of doing something has been deprecated,
     * or we want to make sure they use something the right way.
     *
     * @access public
     * @param string $function      The function that was called
     * @param string $message       A message explaining what has been done incorrectly
     * @param string $version       The version of Event Espresso where the error was added
     * @param string $applies_when  a version string for when you want the doing_it_wrong notice to begin appearing
     *                              for a deprecated function. This allows deprecation to occur during one version,
     *                              but not have any notices appear until a later version. This allows developers
     *                              extra time to update their code before notices appear.
     * @param int    $error_type
     * @uses   trigger_error()
     */
    public function doing_it_wrong(
        $function,
        $message,
        $version,
        $applies_when = '',
        $error_type = null
    ) {
        $applies_when = ! empty($applies_when) ? $applies_when : espresso_version();
        $error_type = $error_type !== null ? $error_type : E_USER_NOTICE;
        // because we swapped the parameter order around for the last two params,
        // let's verify that some third party isn't still passing an error type value for the third param
        if (is_int($applies_when)) {
            $error_type = $applies_when;
            $applies_when = espresso_version();
        }
        // if not displaying notices yet, then just leave
        if (version_compare(espresso_version(), $applies_when, '<')) {
            return;
        }
        do_action('AHEE__EEH_Debug_Tools__doing_it_wrong_run', $function, $message, $version);
        $version = $version === null
            ? ''
            : sprintf(
                esc_html__('(This message was added in version %s of Event Espresso)', 'event_espresso'),
                $version
            );
        $error_message = sprintf(
            esc_html__('%1$s was called %2$sincorrectly%3$s. %4$s %5$s', 'event_espresso'),
            $function,
            '<strong>',
            '</strong>',
            $message,
            $version
        );
        // don't trigger error if doing ajax,
        // instead we'll add a transient EE_Error notice that in theory should show on the next request.
        if (defined('DOING_AJAX') && DOING_AJAX) {
            $error_message .= ' ' . esc_html__(
                'This is a doing_it_wrong message that was triggered during an ajax request.  The request params on this request were: ',
                'event_espresso'
            );
            $request = LoaderFactory::getLoader()->getShared(RequestInterface::class);
            $error_message .= '<ul><li>';
            $error_message .= implode('</li><li>', $request->requestParams());
            $error_message .= '</ul>';
            EE_Error::add_error($error_message, 'debug::doing_it_wrong', $function, '42');
            // now we set this on the transient so it shows up on the next request.
            EE_Error::get_notices(false, true);
        } else {
            trigger_error($error_message, $error_type);
        }
    }




    /**
     * Logger helpers
     */
    /**
     * debug
     *
     * @param string $class
     * @param string $func
     * @param string $line
     * @param array  $info
     * @param bool   $display_request
     * @param string $debug_index
     * @param string $debug_key
     */
    public static function log(
        $class = '',
        $func = '',
        $line = '',
        $info = array(),
        $display_request = false,
        $debug_index = '',
        $debug_key = 'EE_DEBUG_SPCO'
    ) {
        if (WP_DEBUG) {
            $debug_key = $debug_key . '_' . EE_Session::instance()->id();
            $debug_data = get_option($debug_key, array());
            $default_data = array(
                $class => $func . '() : ' . $line,
            );
            // don't serialize objects
            $info = self::strip_objects($info);
            $index = ! empty($debug_index) ? $debug_index : 0;
            if (! isset($debug_data[ $index ])) {
                $debug_data[ $index ] = array();
            }
            $debug_data[ $index ][ microtime() ] = array_merge($default_data, $info);
            update_option($debug_key, $debug_data);
        }
    }



    /**
     * strip_objects
     *
     * @param array $info
     * @return array
     */
    public static function strip_objects($info = array())
    {
        foreach ($info as $key => $value) {
            if (is_array($value)) {
                $info[ $key ] = self::strip_objects($value);
            } elseif (is_object($value)) {
                $object_class = get_class($value);
                $info[ $object_class ] = array();
                $info[ $object_class ]['ID'] = method_exists($value, 'ID') ? $value->ID() : spl_object_hash($value);
                if (method_exists($value, 'ID')) {
                    $info[ $object_class ]['ID'] = $value->ID();
                }
                if (method_exists($value, 'status')) {
                    $info[ $object_class ]['status'] = $value->status();
                } elseif (method_exists($value, 'status_ID')) {
                    $info[ $object_class ]['status'] = $value->status_ID();
                }
                unset($info[ $key ]);
            }
        }
        return (array) $info;
    }



    /**
     * @param mixed      $var
     * @param string     $var_name
     * @param string     $file
     * @param int|string $line
     * @param int|string $heading_tag
     * @param bool       $die
     * @param string     $margin
     */
    public static function printv(
        $var,
        $var_name = '',
        $file = '',
        $line = '',
        $heading_tag = 5,
        $die = false,
        $margin = ''
    ) {
        $var_name = ! $var_name ? 'string' : $var_name;
        $var_name = ucwords(str_replace('$', '', $var_name));
        $is_method = method_exists($var_name, $var);
        $var_name = ucwords(str_replace('_', ' ', $var_name));
        $heading_tag = EEH_Debug_Tools::headingTag($heading_tag);
        $result = EEH_Debug_Tools::headingSpacer($heading_tag);
        $result .= EEH_Debug_Tools::heading($var_name, $heading_tag, $margin, $line);
        $result .= $is_method
            ? EEH_Debug_Tools::grey_span('::') . EEH_Debug_Tools::orange_span($var . '()')
            : EEH_Debug_Tools::grey_span(' : ') . EEH_Debug_Tools::orange_span($var);
        $result .= EEH_Debug_Tools::file_and_line($file, $line, $heading_tag);
        $result .= EEH_Debug_Tools::headingX($heading_tag);
        if ($die) {
            die($result);
        }
        echo wp_kses($result, AllowedTags::getWithFormTags());
    }


    protected static function headingTag($heading_tag)
    {
        $heading_tag = absint($heading_tag);
        return $heading_tag > 0 && $heading_tag < 7 ? "h{$heading_tag}" : 'h5';
    }

    protected static function headingSpacer($heading_tag)
    {
        return EEH_Debug_Tools::plainOutput() && ($heading_tag === 'h1' || $heading_tag === 'h2')
            ? self::lineBreak()
            : '';
    }


    protected static function lineBreak()
    {
        return defined('DOING_AJAX') && DOING_AJAX ? '<br />' : "\n";
    }


    protected static function plainOutput()
    {
        return defined('EE_TESTS_DIR')
               || (defined('DOING_AJAX') && DOING_AJAX)
               || (
                   isset($_SERVER['REQUEST_URI'])
                   && strpos(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), 'wp-json') !== false
               );
    }


    /**
     * @param string $var_name
     * @param string $heading_tag
     * @param string $margin
     * @param int    $line
     * @return string
     */
    protected static function heading($var_name = '', $heading_tag = 'h5', $margin = '', $line = 0)
    {
        if (EEH_Debug_Tools::plainOutput()) {
            $heading = '';
            if ($heading_tag === 'h1' || $heading_tag === 'h2') {
                $heading .= self::lineBreak();
            }
            $heading .= self::lineBreak() . "{$line}) {$var_name}";
            return $heading;
        }
        $margin = "25px 0 0 {$margin}";
        return '<' . $heading_tag . ' style="color:#2EA2CC; margin:' . $margin . ';"><b>' . $var_name . '</b>';
    }



    /**
     * @param string $heading_tag
     * @return string
     */
    protected static function headingX($heading_tag = 'h5')
    {
        if (EEH_Debug_Tools::plainOutput()) {
            return '';
        }
        return '</' . $heading_tag . '>';
    }



    /**
     * @param string $content
     * @return string
     */
    protected static function grey_span($content = '')
    {
        if (EEH_Debug_Tools::plainOutput()) {
            return $content;
        }
        return '<span style="color:#999">' . $content . '</span>';
    }



    /**
     * @param string $file
     * @param int    $line
     * @return string
     */
    protected static function file_and_line($file, $line, $heading_tag)
    {
        if ($file === '' || $line === '') {
            return '';
        }
        $file = str_replace(EE_PLUGIN_DIR_PATH, '/', $file);
        if (EEH_Debug_Tools::plainOutput()) {
            if ($heading_tag === 'h1' || $heading_tag === 'h2') {
                return " ({$file})";
            }
            return '';
        }
        return '<br /><span style="font-size:9px;font-weight:normal;color:#666;line-height: 12px;">'
               . $file
               . '<br />line no: '
               . $line
               . '</span>';
    }



    /**
     * @param string $content
     * @return string
     */
    protected static function orange_span($content = '')
    {
        if (EEH_Debug_Tools::plainOutput()) {
            return $content;
        }
        return '<span style="color:#E76700">' . $content . '</span>';
    }



    /**
     * @param mixed $var
     * @return string
     */
    protected static function pre_span($var)
    {
        ob_start();
        var_dump($var);
        $var = ob_get_clean();
        if (EEH_Debug_Tools::plainOutput()) {
            return str_replace("\n", '', $var);
        }
        return '<pre style="color:#999; padding:1em; background: #fff">' . $var . '</pre>';
    }



    /**
     * @param mixed      $var
     * @param string     $var_name
     * @param string     $file
     * @param int|string $line
     * @param int|string $heading_tag
     * @param bool       $die
     */
    public static function printr(
        $var,
        $var_name = '',
        $file = '',
        $line = '',
        $heading_tag = 5,
        $die = false
    ) {
        // return;
        $file = str_replace(rtrim(ABSPATH, '\\/'), '', $file);
        $margin = is_admin() ? ' 180px' : '0';
        if (is_string($var)) {
            EEH_Debug_Tools::printv($var, $var_name, $file, $line, $heading_tag, $die, $margin);
            return;
        }
        if (is_object($var)) {
            $var_name = ! $var_name ? 'object' : $var_name;
        } elseif (is_array($var)) {
            $var_name = ! $var_name ? 'array' : $var_name;
        } elseif (is_numeric($var)) {
            $var_name = ! $var_name ? 'numeric' : $var_name;
        } elseif ($var === null) {
            $var_name = ! $var_name ? 'null' : $var_name;
        }
        $var_name = ucwords(str_replace(array('$', '_'), array('', ' '), $var_name));
        $heading_tag = EEH_Debug_Tools::headingTag($heading_tag);
        $result = EEH_Debug_Tools::headingSpacer($heading_tag);
        $result .= EEH_Debug_Tools::heading($var_name, $heading_tag, $margin, $line);
        $result .= EEH_Debug_Tools::grey_span(' : ') . EEH_Debug_Tools::orange_span(
            EEH_Debug_Tools::pre_span($var)
        );
        $result .= EEH_Debug_Tools::file_and_line($file, $line, $heading_tag);
        $result .= EEH_Debug_Tools::headingX($heading_tag);
        if ($die) {
            die($result);
        }
        echo wp_kses($result, AllowedTags::getWithFormTags());
    }



    /******************** deprecated ********************/



    /**
     * @deprecated 4.9.39.rc.034
     */
    public function reset_times()
    {
        Benchmark::resetTimes();
    }



    /**
     * @deprecated 4.9.39.rc.034
     * @param null $timer_name
     */
    public function start_timer($timer_name = null)
    {
        Benchmark::startTimer($timer_name);
    }



    /**
     * @deprecated 4.9.39.rc.034
     * @param string $timer_name
     */
    public function stop_timer($timer_name = '')
    {
        Benchmark::stopTimer($timer_name);
    }



    /**
     * @deprecated 4.9.39.rc.034
     * @param string  $label      The label to show for this time eg "Start of calling Some_Class::some_function"
     * @param boolean $output_now whether to echo now, or wait until EEH_Debug_Tools::show_times() is called
     * @return void
     */
    public function measure_memory($label, $output_now = false)
    {
        Benchmark::measureMemory($label, $output_now);
    }



    /**
     * @deprecated 4.9.39.rc.034
     * @param int $size
     * @return string
     */
    public function convert($size)
    {
        return Benchmark::convert($size);
    }



    /**
     * @deprecated 4.9.39.rc.034
     * @param bool $output_now
     * @return string
     */
    public function show_times($output_now = true)
    {
        return Benchmark::displayResults($output_now);
    }



    /**
     * @deprecated 4.9.39.rc.034
     * @param string $timer_name
     * @param float  $total_time
     * @return string
     */
    public function format_time($timer_name, $total_time)
    {
        return Benchmark::formatTime($timer_name, $total_time);
    }
}



/**
 * borrowed from Kint Debugger
 * Plugin URI: http://upthemes.com/plugins/kint-debugger/
 */
if (class_exists('Kint') && ! function_exists('dump_wp_query')) {
    function dump_wp_query()
    {
        global $wp_query;
        d($wp_query);
    }
}
/**
 * borrowed from Kint Debugger
 * Plugin URI: http://upthemes.com/plugins/kint-debugger/
 */
if (class_exists('Kint') && ! function_exists('dump_wp')) {
    function dump_wp()
    {
        global $wp;
        d($wp);
    }
}
/**
 * borrowed from Kint Debugger
 * Plugin URI: http://upthemes.com/plugins/kint-debugger/
 */
if (class_exists('Kint') && ! function_exists('dump_post')) {
    function dump_post()
    {
        global $post;
        d($post);
    }
}
