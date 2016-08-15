<?php
namespace EventEspresso\core\services\collections;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Interface CollectionDetailsInterface
 * interface for defining classes that can be used for loading objects into a
 * \EventEspresso\core\services\collections\Collection
 *
 * @package EventEspresso\core\services\collections
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
	public function identifierCallback();

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