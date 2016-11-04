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
 * EEH_Class_Tools Helper
 *
 * @package			Event Espresso
 * @subpackage		/helpers/
 * @author				Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EEH_Class_Tools {

	static $i = 0;
	static $file_line = null;

	/**
	 * 	get_called_class - for PHP versions < 5.3
	 *
	 *  @access 	public
	 *  @author	origins:  http://stackoverflow.com/a/1542045
	 *  return string
	 */
	public static function get_called_class() {
		$backtrace = debug_backtrace();
		if ( isset( $backtrace[2] ) && is_array( $backtrace[2] ) && isset( $backtrace[2]['class'] ) && ! isset( $backtrace[2]['file'] )) {
			return $backtrace[2]['class'];
		} else if ( isset( $backtrace[3] ) && is_array( $backtrace[3] ) && isset( $backtrace[3]['class'] ) && ! isset( $backtrace[3]['file'] )) {
			return $backtrace[3]['class'];
		} else if ( isset( $backtrace[2] ) && is_array( $backtrace[2] ) && isset( $backtrace[2]['file'] ) && isset( $backtrace[2]['line'] )) {
			if ( self::$file_line == $backtrace[2]['file'] . $backtrace[2]['line'] ) {
				self::$i++;
			} else {
				self::$i = 0;
				self::$file_line = $backtrace[2]['file'] . $backtrace[2]['line'];
			}
			// was  class method called via call_user_func ?
			if ( $backtrace[2]['function'] == 'call_user_func' && isset( $backtrace[2]['args'] ) && is_array( $backtrace[2]['args'] )){
				if ( isset( $backtrace[2]['args'][0] ) && isset( $backtrace[2]['args'][0][0] )) {
					$called_class = $backtrace[2]['args'][0][0];
					// is it an EE function ?
					if ( strpos( $called_class, 'EE' ) === 0 ) {
						$prefix_chars = strpos( $called_class, '_' ) + 1;
						$prefix = substr( $called_class, 0, $prefix_chars );
						$classname = substr( $called_class, $prefix_chars, strlen( $called_class ));
						$classname = $prefix . str_replace( ' ', '_', ucwords( strtolower( str_replace( '_', ' ', $classname  ))));
						return $classname;
					}
				}
			} else {
				$lines = file( $backtrace[2]['file'] );
				preg_match_all( '/([a-zA-Z0-9\_]+)::' . $backtrace[2]['function'] . '/', $lines[$backtrace[2]['line']-1], $matches );
				if ( isset( $matches[1] ) && isset( $matches[1][ self::$i ] )) {
					return $matches[1][ self::$i ];
				}
			}
		}
		return FALSE;
	}




	/**
	 * 	get_class_names_for_all_callbacks_on_hook
	 * returns an array of names for all classes that have methods registered as callbacks for the given action or filter hook
	 * 	@access 	public
	 * 	@param 	string 	$hook
	 * 	@return 	array
	 */
	public static function get_class_names_for_all_callbacks_on_hook( $hook = NULL ) {
		global $wp_filter;
		$class_names = array();
		// are any callbacks registered for this hook ?
		if ( isset( $wp_filter[ $hook ] )) {
			// loop thru all of the callbacks attached to the deprecated hookpoint
			foreach( $wp_filter[ $hook ] as $priority ) {
				foreach( $priority as $callback ) {
					// is the callback a non-static class method ?
					if ( isset( $callback['function'] ) && is_array( $callback['function'] )) {
						if ( isset( $callback['function'][0] ) && is_object( $callback['function'][0] )) {
							$class_names[] = get_class( $callback['function'][0] );
						}
					// test for static method
					} else if ( strpos( $callback['function'], '::' ) !== FALSE ) {
						$class = explode( '::', $callback['function'] );
						$class_names[] = $class[0];
					} else {
						// just a function
					}
				}
			}
		}
		return $class_names;
	}




	/**
	 * 	property_exists() with fallback for PHP versions < 5.3
	 * 	@access 	public
	 * 	@param 		mixed object | string 	$class
	 * 	@param		string 	$property
	 * 	@return 		boolean
	 */
	public static function has_property( $class = NULL, $property = NULL ) {
		// if $class or $property don't exist, then get out, cuz that would be like... fatal dude
		if ( empty( $class ) || empty( $property )) {
			return FALSE;
		}
		// if your hosting company doesn't cut the mustard
		if ( version_compare( PHP_VERSION, '5.3.0' ) < 0 ) {
			// just in case $class is an actual instantiated object
			if ( is_object( $class )) {
				return isset( $class->{$property} ) ? TRUE : FALSE;
			} else {
				// use reflection for < PHP 5.3 to get details using just the class name
				$reflector = new ReflectionClass( $class );
				return $reflector->hasProperty( $property );
			}
		} else {
			// or try regular property exists method which works as expected in PHP 5.3+
			return property_exists( $class, $property );
		}
	}


}



// if PHP version < 5.3
if ( ! function_exists( 'get_called_class' )) {
	/**
	 * @return string
	 */
	function get_called_class() {
		return EEH_Class_Tools::get_called_class();
	}
}




// End of file EEH_Class_Tools.helper.php
// Location: /helpers/EEH_Class_Tools.helper.php