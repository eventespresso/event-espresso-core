<?php
namespace EventEspresso\core\interfaces;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Interface InterminableInterface
 * denotes that any class implementing this interface should NOT be terminated, unset(),
 * or have it's instance nulled, when switching between blogs, unit tests, etc
 * because the class does not contain any site or request specific data.
 *
 * @package EventEspresso\core\interfaces
 * @since 4.9.2
 */
interface InterminableInterface {

	// no specific methods required

}
// End of file InterminableInterface.php
// Location: /InterminableInterface.php