<?php
namespace EventEspresso\core\services\collection_loaders;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class CollectionDetails
 * Description
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 * @since         $VID:$
 */
abstract class CollectionDetails implements CollectionDetailsInterface {

	/**
	 * @var string $collection_interface
	 */
	protected $collection_interface = '';

	/**
	 * @var string $path_to_collection
	 */
	protected $path_to_collection = '';



	/**
	 * @return mixed
	 */
	public function getCollectionInterface() {
		return $this->collection_interface;
	}



	/**
	 * @param string $collection_interface
	 */
	public function setCollectionInterface( $collection_interface ) {
		$this->collection_interface = $collection_interface;
	}



	/**
	 * @return string
	 */
	public function getPathToCollection() {
		return $this->path_to_collection;
	}



	/**
	 * @param string $path_to_collection
	 */
	public function setPathToCollection( $path_to_collection ) {
		$this->path_to_collection = $path_to_collection;
	}



}
// End of file CollectionDetails.php
// Location: /CollectionDetails.php