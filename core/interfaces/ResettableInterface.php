<?php
namespace EventEspresso\core\interfaces;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Interface ResettableInterface

 * denotes that any class implementing this interface
 * should have its reset() method called when switching between blogs, unit tests, etc
 * because the class utilizes the "singleton" pattern and contains a cached instance of itself.
 *
 * @package EventEspresso\core\interfaces
 * @since   4.9.0
 */
interface ResettableInterface {

	public static function reset();

}
// End of file ResettableInterface.php
// Location: /ResettableInterface.php