<?php
namespace EventEspresso\core\services\locators;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Interface LocatorInterface
 *
 * @package EventEspresso\core\services\locators
 */
interface LocatorInterface {

	/**
	 * given a string or an array of information for where to look,
	 * will find all files in that location
	 *
	 * @access public
	 * @param array|string $location
	 * @return \FilesystemIterator
	 */
	public function locate( $location );

}
// End of file LocatorInterface.php
// Location: /LocatorInterface.php