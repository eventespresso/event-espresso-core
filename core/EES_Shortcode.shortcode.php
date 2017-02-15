<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Event Espresso
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * EES_Shortcode
 *
 * @package			Event Espresso
 * @subpackage	/shortcodes/
 * @author				Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
abstract class EES_Shortcode extends EE_Base {

	/**
	 * @protected 	public
	 * @var 	array $_attributes
	 */
	protected $_attributes = array();

	/**
	 * run - initial shortcode module setup called during "parse_request" hook by
	 * \EE_Front_Controller::_initialize_shortcodes() IF this shortcode is going to execute during this request !
	 * It may also get called by \EES_Shortcode::fallback_shortcode_processor() if the shortcode is being implemented
	 * by a theme or plugin in a non-standard way.
	 * Basically this method is primarily used for loading resources and assets like CSS or JS
	 * that will be required by the shortcode when it is actually processed.
	 * Please note that assets may not load if the fallback_shortcode_processor() is being used.
	 *
	 * @access    public
	 * @param WP $WP
	 * @return    void
	 */
	public abstract function run( WP $WP );



	/**
	 * 	process_shortcode
	 * 	this method is the callback function for the actual shortcode, and is what runs when WP encounters the shortcode within the_content
	 *
	 *  @access 	public
	 *  @param		array 	$attributes
	 *  @return 	mixed
	 */
	public abstract function process_shortcode( $attributes = array() );



	/**
	 *    instance - returns instance of child class object
	 *
	 * @access 	public
	 * @param 	string $shortcode_class
	 * @return 	\EES_Shortcode
	 */
	final public static function instance( $shortcode_class = null ) {
		$shortcode_class = ! empty( $shortcode_class ) ? $shortcode_class : get_called_class();
		if ( $shortcode_class === 'EES_Shortcode' || empty( $shortcode_class )) {
			return null;
		}
		$shortcode = str_replace( 'EES_', '', strtoupper( $shortcode_class ));
		$shortcode_obj = isset( EE_Registry::instance()->shortcodes->{$shortcode} )
            ? EE_Registry::instance()->shortcodes->{$shortcode}
            : null;
		return $shortcode_obj instanceof $shortcode_class || $shortcode_class === 'self'
            ? $shortcode_obj
            : new $shortcode_class();
	}




	/**
	 *    fallback_shortcode_processor - create instance and call process_shortcode
	 *    NOTE: shortcode may not function perfectly dues to missing assets, but it's better than not having things work at all
	 *
	 * @access 	public
	 * @param 	$attributes
	 * @return 	mixed
	 */
	final public static function fallback_shortcode_processor( $attributes ) {
		if ( EE_Maintenance_Mode::disable_frontend_for_maintenance() ) {
			return null;
		}
		// what shortcode was actually parsed ?
		$shortcode_class = get_called_class();
		// notify rest of system that fallback processor was triggered
		add_filter( 'FHEE__fallback_shortcode_processor__' . $shortcode_class, '__return_true' );
		// get instance of actual shortcode
		$shortcode_obj = self::instance( $shortcode_class );
		// verify class
		if ( $shortcode_obj instanceof EES_Shortcode ) {
			global $wp;
			$shortcode_obj->run( $wp );
			// set attributes and run the shortcode
			$shortcode_obj->_attributes = (array)$attributes;
			return $shortcode_obj->process_shortcode( $shortcode_obj->_attributes );
		} else {
			return null;
		}
	}




	/**
	 *    invalid_shortcode_processor -  used in cases where we know the shortcode is invalid, most likely due to a deactivated addon, and simply returns an empty string
	 *
	 * @access 	public
	 * @param 	$attributes
	 * @return 	string
	 */
	final public static function invalid_shortcode_processor( $attributes ) {
		return '';
	}



	/**
	 * class constructor - should ONLY be instantiated by EE_Front_Controller
	 */
	final public function __construct() {
		// get classname, remove EES_prefix, and convert to UPPERCASE
		$shortcode = strtoupper( str_replace( 'EES_', '', get_class( $this )));
		// assign shortcode to the preferred callback, which overwrites the "fallback shortcode processor" assigned earlier
		add_shortcode( $shortcode, array( $this, 'process_shortcode' ));
		// make sure system knows this is an EE page
		EE_Registry::instance()->REQ->set_espresso_page( TRUE );
	}



    /**
     * Performs basic sanitization on shortcode attributes
     * Since incoming attributes from the shortcode usage in the WP editor will all be strings,
     * most attributes will by default be sanitized using the sanitize_text_field() function.
     * This can be overridden by supplying an array for the $custom_sanitization param,
     * where keys match keys in your attributes array,
     * and values represent the sanitization function you wish to be applied to that attribute.
     * So for example, if you had an integer attribute named "event_id"
     * that you wanted to be sanitized using absint(),
     * then you would pass the following for your $custom_sanitization array:
     *      array('event_id' => 'absint')
     * all other attributes would be sanitized using the defaults in the switch statement below
     *
     * @param array $attributes
     * @param array $custom_sanitization
     * @return array
     */
    public static function sanitize_attributes(array $attributes, $custom_sanitization = array())
    {
        foreach ($attributes as $key => $value) {
            // is a custom sanitization callback specified ?
            if ( isset($custom_sanitization[$key])) {
                $callback = $custom_sanitization[$key];
                if ($callback === 'skip_sanitization') {
                    $attributes[$key] = $value;
                    continue;
                } else if (function_exists($callback)){
                    $attributes[$key] = $callback($value);
                    continue;
                }
            }
            switch (true) {
                case $value === null :
                case is_int($value) :
                case is_float($value) :
                    // typical booleans
                case in_array($value, array(true, 'true', '1', 'on', 'yes', false, 'false', '0', 'off', 'no'), true) :
                    $attributes[$key] = $value;
                    break;
                case is_string($value) :
                    $attributes[$key] = sanitize_text_field($value);
                    break;
                case is_array($value) :
                    $attributes[$key] = \EES_Shortcode::sanitize_attributes($value);
                    break;
                default :
                    // only remaining data types are Object and Resource
                    // which are not allowed as shortcode attributes
                    $attributes[$key] = null;
                    break;
            }
        }
        return $attributes;
	}


}
// End of file EES_Shortcode.shortcode.php
// Location: /shortcodes/EES_Shortcode.shortcode.php