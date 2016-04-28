<?php
namespace EventEspresso\core\services\collection_loaders;

use EventEspresso\Core\Exceptions\InvalidClassException;
use EventEspresso\Core\Exceptions\InvalidFilePathException;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class CollectionLoader
 *
 * given an empty collection and the details on where to find files,
 * will populate the collection
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class CollectionLoader {

	protected $collection_details;

	protected $collection;



	/**
	 * CollectionLoader constructor.
	 *
	 * @param CollectionInterface        $collection
	 * @param CollectionDetailsInterface $collection_details
	 * @throws \EventEspresso\Core\Exceptions\InvalidClassException
	 * @throws \EventEspresso\Core\Exceptions\InvalidFilePathException
	 * @throws \EventEspresso\Core\Exceptions\InvalidInterfaceException
	 */
	public function __construct( CollectionDetailsInterface $collection_details, CollectionInterface $collection = null ) {
		$this->collection_details = $collection_details;
		if ( ! $collection instanceof CollectionInterface ) {
			$collection = new Collection( $this->collection_details->getCollectionInterface() );
		}
		$this->collection = $collection;
		$this->loadAllFromFilepaths();
		$this->loadAllFromFQCNs();
	}



	/**
	 * @access public
	 * @return \EventEspresso\core\services\collection_loaders\CollectionInterface
	 */
	public function getCollection() {
		return $this->collection;
	}



	/**
	 * @access protected
	 * @throws \EventEspresso\Core\Exceptions\InvalidClassException
	 * @throws \EventEspresso\Core\Exceptions\InvalidFilePathException
	 */
	protected function loadAllFromFilepaths() {
		$filepaths = $this->collection_details->getCollectionPaths();
		foreach ( $filepaths as $filepath ) {
			$this->loadAllFromFilepath( $filepath );
		}
	}



	/**
	 * loadAllFromFilepath
	 * globs the supplied filepath and adds any files found
	 *
	 * @access protected
	 * @param  string $folder
	 * @throws \EventEspresso\Core\Exceptions\InvalidClassException
	 * @throws \EventEspresso\Core\Exceptions\InvalidFilePathException
	 */
	protected function loadAllFromFilepath( $folder = '' ) {
		$folder .= $folder[ strlen( $folder ) - 1 ] !== DS ? DS : '';
		// get all the files in that folder that end in the supplied file mask
		$filepaths = (array) apply_filters(
			"FHEE__CollectionLoaderManager__loadAllFromFilepath__{$this->collection_details->collectionName()}",
			glob( $folder . $this->collection_details->getFileMask() )
		);
		if ( empty( $filepaths ) ) {
			return;
		}
		foreach ( $filepaths as $filepath ) {
			if ( ! is_readable( $filepath ) ) {
				throw new InvalidFilePathException( $filepath );
			}
			require( $filepath );
			$this->loadClassFromFilepath( $filepath );
		}
	}



	/**
	 * loadClassFromFilepath
	 *
	 * @access protected
	 * @param  string $file_path
	 * @return array
	 * @throws \EventEspresso\Core\Exceptions\InvalidClassException
	 */
	protected function loadClassFromFilepath( $file_path ) {
		// extract filename from path
		$file_name = basename( $file_path );
		// now remove any file extensions
		$class_name = substr( $file_name, 0, strpos( $file_name, '.' ) );
		if ( ! class_exists( $class_name ) ) {
			throw new InvalidClassException( $class_name );
		}
		$this->addClassToCollection( new $class_name(), $file_name );
	}



	/**
	 * addClassToCollection
	 *
	 * @access protected
	 * @param  $class
	 * @param  mixed $identifier
	 * @return bool
	 */
	protected function addClassToCollection( $class, $identifier ) {
		if ( $this->collection->has( $identifier ) ) {
			return true;
		}
		return $this->collection->add( $class, $identifier );
	}



	/**
	 * loadAllFromFQCNs
	 *
	 * @access protected
	 * @throws \EventEspresso\Core\Exceptions\InvalidClassException
	 */
	protected function loadAllFromFQCNs() {
		$FQCNs = $this->collection_details->getCollectionFQCNs();
		foreach ( $FQCNs as $FQCN ) {
			$this->loadClassFromFQCN( $FQCN );
		}
	}



	/**
	 * loadClassFromFQCN
	 *
	 * @access protected
	 * @param  string $FQCN Fully Qualified Class Name
	 * @return array
	 * @throws \EventEspresso\Core\Exceptions\InvalidClassException
	 */
	protected function loadClassFromFQCN( $FQCN ) {
		if ( ! class_exists( $FQCN ) ) {
			throw new InvalidClassException( $FQCN );
		}
		$this->addClassToCollection( new $FQCN(), $FQCN );
	}



}
// End of file CollectionLoader.php
// Location: core/services/collection_loaders/CollectionLoader.php