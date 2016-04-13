<?php
namespace EventEspresso\core\services\collection_loaders;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Interface CollectionDetailsInterface
 *
 * @package EventEspresso\core\services\collection_loaders
 */
interface CollectionDetailsInterface {

	public function getCollectionInterface();
	
	/**
	 * @param string $collection_interface
	 */
	public function setCollectionInterface( $collection_interface );

}
// End of file CollectionDetailsInterface.php
// Location: /CollectionDetailsInterface.php