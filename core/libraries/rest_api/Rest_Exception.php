<?php
namespace EventEspresso\core\libraries\rest_api;

/**
 * Class Exception
 * similar to EE's EE_Error, except has space to hold the "data" we
 * want to eventually pass to WP_Error
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 * @since                 $VID:$
 */
if (! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



class Rest_Exception extends \EE_Error
{

    /**
     * @var array
     */
    protected $_wp_error_data = array();

    protected $_wp_error_code = '';



    public function __construct($string_code, $message, $wp_error_data = array(), $previous = null)
    {
        if (is_array($wp_error_data)
            && isset($wp_error_data['status'])
        ) {
            $http_status_number = $wp_error_data['status'];
        } else {
            $http_status_number = 500;
        }
        parent::__construct(
            $message,
            $http_status_number,
            $previous);
        $this->_wp_error_data = $wp_error_data;
        $this->_wp_error_code = $string_code;
    }



    /**
     * Array of data that may have been set during the constructor, intended for WP_Error's data
     *
     * @return array
     */
    public function get_data()
    {
        return $this->_wp_error_data;
    }



    /**
     * Gets the error string
     *
     * @return string
     */
    public function get_string_code()
    {
        return $this->_wp_error_code;
    }
}
