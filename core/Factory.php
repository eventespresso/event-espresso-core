<?php
namespace EventEspresso\core;

use EventEspresso\core\libraries\iframe_display\Iframe;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class Factory
 * creates instantiations of classes
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 * @since         4.9.0
 */
class Factory {

	/**
	 * @param string $class_name
	 * @param array  $arguments
	 * @return mixed|null
	 * @throws \EE_Error
	 */
	public static function create( $class_name, $arguments = array() ) {
		if ( empty( $class_name ) ) {
			throw new \EE_Error(
				__( 'You must provide a class name in order to instantiate it.', 'event_espresso' )
			);
		}
		// if ( ! class_exists( $class_name ) ) {
		// 	throw new \EE_Error(
		// 		sprintf(
		// 			__( 'The "%1$s" class was not found. Please include the correct file or set an autoloader for it', 'event_espresso' ),
		// 			$class_name
		// 		)
		// 	);
		// }
		$object = null;
		switch ( $class_name ) {

			case 'EE_Request' :
				$object = new \EE_Request( $_GET, $_POST, $_COOKIE );
				break;

			case 'Iframe' :
				$title = isset( $arguments['title'] ) ? $arguments['title'] : null;
				$content = isset( $arguments['content'] ) ? $arguments['content'] : null;
				$object = new Iframe( $title, $content );
				break;

			default :
				$object = new $class_name( $arguments );

		}

		// if ( ! $object instanceof $class_name ) {
		// 	throw new \EE_Error(
		// 		sprintf(
		// 			__(
		// 				'An error occurred during class instantiation and the requested object could not be created. The result was: %1$s %2$s',
		// 				'event_espresso'
		// 			),
		// 			'<br />',
		// 			var_export( $object, true )
		// 		)
		// 	);
		// }
		return $object;
	}

}
// End of file Factory.php
// Location: /Factory.php