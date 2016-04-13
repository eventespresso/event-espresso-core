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

	public function setCollectionInterface();

}
// End of file CollectionDetailsInterface.php
// Location: /CollectionDetailsInterface.php