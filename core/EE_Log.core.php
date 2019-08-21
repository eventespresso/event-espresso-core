<?php

/**
 *
 * Class EE_Log
 *
 * Singleton logging class. Can be called from anywhere in the plugin to log data to a log file.
 * Defaults to wp-content/uploads/espresso/logs/espresso_log.txt
 * Usage:
 * do_action( 'AHEE_log', __FILE__, __FUNCTION__, 'logging message' );
 *
 * @package               Event Espresso
 * @subpackage            core
 * @author                Sidney Harrel, Brent Christensen
 *
 */
class EE_Log
{

    /**
     * @var string
     */
    private $_log = '';

    /**
     * Used for remote logging
     *
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
    public static function instance()
    {
        if (! self::$_instance instanceof EE_Log) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    /**
     * @access private
     * @return EE_Log
     */
    private function __construct()
    {

        if (! EE_Registry::instance()->CFG->admin->use_remote_logging) {
            return;
        }

        $this->_remote_logging_url = EE_Registry::instance()->CFG->admin->remote_logging_url;
        $this->_remote_log = '';

        if (EE_Registry::instance()->CFG->admin->use_remote_logging) {
            add_action('shutdown', array($this, 'send_log'), 9999);
        }
    }


    /**
     *    verify_filesystem
     * tests that the required files and folders exist and are writable
     *
     */
    public function verify_filesystem()
    {
        $msg = esc_html__(
            'The Local File Logging functionality was removed permanently. Remote Logging is recommended instead.',
            'event_espresso'
        );
        EE_Error::doing_it_wrong(
            __METHOD__,
            $msg,
            '$VID:$'
        );
    }


    /**
     *    _format_message
     *    makes yer log entries look all purdy
     *
     * @param string $file
     * @param string $function
     * @param string $message
     * @param string $type
     * @return string
     */
    private function _format_message($file = '', $function = '', $message = '', $type = '')
    {
        $msg = '----------------------------------------------------------------------------------------' . PHP_EOL;
        $msg .= '[' . current_time('mysql') . '] ';
        $msg .= ! empty($file) ? basename($file) : '';
        $msg .= ! empty($file) && ! empty($function) ? ' -> ' : '';
        $msg .= ! empty($function) ? $function . '()' : '';
        $msg .= PHP_EOL;
        $type = ! empty($type) ? $type : 'log message';
        $msg .= ! empty($message) ? "\t" . '[' . $type . '] ' . $message . PHP_EOL : '';
        return $msg;
    }


    /**
     *    log
     * adds content to the EE_Log->_log property which gets written to file during the WP 'shutdown' hookpoint via the
     * EE_Log::write_log() callback
     *
     * @param string $file
     * @param string $function
     * @param string $message
     * @param string $type
     */
    public function log($file = '', $function = '', $message = '', $type = '')
    {
        $this->_log .= $this->_format_message($file, $function, $message, $type);
    }


    /**
     * write_log
     * appends the results of the 'AHEE_log' filter to the espresso log file
     */
    public function write_log()
    {
        $msg = esc_html__(
            'The Local File Logging functionality was removed permanently. Remote Logging is recommended instead.',
            'event_espresso'
        );
        EE_Error::doing_it_wrong(
            __METHOD__,
            $msg,
            '$VID:$'
        );
    }


    /**
     * send_log
     * sends the espresso log to a remote URL via a PHP cURL request
     */
    public function send_log()
    {

        if (empty($this->_remote_logging_url)) {
            return;
        }

        $data = 'domain=' . $_SERVER['HTTP_HOST'];
        $data .= '&ip=' . $_SERVER['SERVER_ADDR'];
        $data .= '&server_type=' . $_SERVER['SERVER_SOFTWARE'];
        $data .= '&time=' . time();
        $data .= '&remote_log=' . $this->_log;
        $data .= '&request_array=' . json_encode($_REQUEST);
        $data .= '&action=save';

        if (defined('EELOGGING_PASS')) {
            $data .= '&pass=' . EELOGGING_PASS;
        }
        if (defined('EELOGGING_KEY')) {
            $data .= '&key=' . EELOGGING_KEY;
        }

        $c = curl_init($this->_remote_logging_url);
        curl_setopt($c, CURLOPT_POST, true);
        curl_setopt($c, CURLOPT_POSTFIELDS, $data);
        curl_setopt($c, CURLOPT_RETURNTRANSFER, true);
        curl_exec($c);
        curl_close($c);
    }


    /**
     * write_debug
     * writes the contents of the current request's $_GET and $_POST arrays to a log file.
     * previous entries are overwritten
     */
    public function write_debug()
    {
        $msg = esc_html__(
            'The Local File Logging functionality was removed permanently. Remote Logging is recommended instead.',
            'event_espresso'
        );
        EE_Error::doing_it_wrong(
            __METHOD__,
            $msg,
            '$VID:$'
        );
    }


    /**
     * __clone
     */
    public function __clone()
    {
        trigger_error(__('Clone is not allowed.', 'event_espresso'), E_USER_ERROR);
    }
}
