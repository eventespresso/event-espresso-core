<?php
namespace EventEspresso\core\services\collection_loaders;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class CollectionLoaderManager
 * Description
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 * @since         $VID:$
 */
class CollectionLoaderManager {

	protected $collection_details;

	protected $collection;



	/**
	 * CollectionLoaderManager constructor.
	 *
	 * @param CollectionInterface        $collection
	 * @param CollectionDetailsInterface $collection_details
	 */
	public function __construct( CollectionInterface $collection, CollectionDetailsInterface $collection_details ) {
		$this->collection = $collection;
		$this->collection_details = $collection_details;
	}



	/**
	 * @return \EventEspresso\core\services\collection_loaders\CollectionInterface
	 */
	public function getCollection() {
		return $this->collection;
	}



}
// End of file CollectionLoaderManager.php
// Location: /CollectionLoaderManager.php