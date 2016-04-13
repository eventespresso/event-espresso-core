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
class CollectionDetails implements CollectionDetailsInterface {

	protected $collection_interface;



	/**
	 * @return mixed
	 */
	protected function getCollectionInterface() {
		return $this->collection_interface;
	}



	/**
	 * @param mixed $collection_interface
	 */
	protected function setCollectionInterface( $collection_interface ) {
		$this->collection_interface = $collection_interface;
	}



}
// End of file CollectionDetails.php
// Location: /CollectionDetails.php