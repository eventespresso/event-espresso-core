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

	/**
	 * @access public
	 * @return string
	 */
	public function getCollectionInterface();

	/**
	 * @access public
	 * @return string
	 */
	public function collectionName();

	/**
	 * @access public
	 * @return string
	 */
	public function identifierType();

	/**
	 * @access public
	 * @return string
	 */
	public function getFileMask();

	/**
	 * @access public
	 * @return array
	 */
	public function getCollectionFQCNs();

	/**
	 * @access public
	 * @return array
	 */
	public function getCollectionPaths();

}
// End of file CollectionDetailsInterface.php
// Location: /CollectionDetailsInterface.php