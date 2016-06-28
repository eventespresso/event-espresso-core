<?php
namespace EventEspresso\core\interfaces;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Interface InterminableInterface
 *
 * denotes that any class implementing this interface should NOT be unset(),
 * or have it's instance nulled, when switching between blogs, unit tests, etc
 * because the class does not contain any site or request specific data.
 * ie: it should persist between changes
 *
 * @package EventEspresso\core\interfaces
 * @since 4.9.0
 */
interface InterminableInterface {

	// no specific methods required

}
// End of file InterminableInterface.php
// Location: /InterminableInterface.php