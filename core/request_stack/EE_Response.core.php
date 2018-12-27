<?php

/**
 * class EE_Response
 * Passes output, notices, and request termination status between EE_Middleware classes
 *
 * @deprecated      4.9.53
 * @package         Event Espresso
 * @subpackage      /core/
 * @author          Brent Christensen
 * ------------------------------------------------------------------------
 */
class EE_Response
{

    /**
     * @access    protected
     * @type        array $_notice
     */
    protected $_notice = array();

    /**
     *    rendered output to be returned to WP
     *
     * @access    protected
     * @type        string
     */
    protected $_output = '';

    /**
     * @access    protected
     * @type        bool
     */
    protected $request_terminated = false;

    /**
     * @access    protected
     * @type        bool
     */
    protected $deactivate_plugin = false;


    /**
     * @deprecated  4.9.53
     * @return \EE_Response
     */
    public function __construct()
    {
        $this->terminate_request(false);
        EE_Error::doing_it_wrong(
            __METHOD__,
            sprintf(
                esc_html__(
                    'This class is deprecated. Please use %1$s instead. All Event Espresso request stack classes have been moved to %2$s and are now under the %3$s namespace',
                    'event_espresso'
                ),
                'EventEspresso\core\services\request\Response',
                '\core\services\request',
                'EventEspresso\core\services\request'
            ),
            '4.9.53'
        );
    }


    /**
     * @deprecated  4.9.53
     * @param $key
     * @param $value
     * @return    void
     */
    public function set_notice($key, $value)
    {
        $this->_notice[ $key ] = $value;
    }


    /**
     * @deprecated  4.9.53
     * @param $key
     * @return    mixed
     */
    public function get_notice($key)
    {
        return isset($this->_notice[ $key ]) ? $this->_notice[ $key ] : null;
    }


    /**
     * @deprecated  4.9.53
     * @return    array
     */
    public function get_notices()
    {
        return $this->_notice;
    }


    /**
     * @deprecated  4.9.53
     * @param      $string
     * @param bool $append
     */
    public function add_output($string, $append = true)
    {
        $this->_output = $append ? $this->_output . $string : $string . $this->_output;
    }


    /**
     * @deprecated  4.9.53
     * @return    string
     */
    public function get_output()
    {
        return $this->_output;
    }


    /**
     * @deprecated  4.9.53
     * @return boolean
     */
    public function request_terminated()
    {
        return $this->request_terminated;
    }


    /**
     * @deprecated  4.9.53
     * @param boolean $request_terminated
     */
    public function terminate_request($request_terminated = true)
    {
        $this->request_terminated = filter_var($request_terminated, FILTER_VALIDATE_BOOLEAN);
    }


    /**
     * @deprecated  4.9.53
     * @return boolean
     */
    public function plugin_deactivated()
    {
        return $this->deactivate_plugin;
    }


    /**
     * @deprecated  4.9.53
     * sets $deactivate_plugin to true
     */
    public function deactivate_plugin()
    {
        $this->deactivate_plugin = true;
    }
}
