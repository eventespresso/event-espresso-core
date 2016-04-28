<?php
namespace EventEspresso\core\services\collection_loaders;

use EventEspresso\Core\Exceptions\InvalidClassException;
use EventEspresso\Core\Exceptions\InvalidDataTypeException;
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

	const ENTITY_NOT_ADDED = 0;

	const ENTITY_ADDED = 1;

	const ENTITY_EXISTS = 2;

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
	 * @throws \EventEspresso\Core\Exceptions\InvalidDataTypeException
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
	 * @throws \EventEspresso\Core\Exceptions\InvalidDataTypeException
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
	 * @throws \EventEspresso\Core\Exceptions\InvalidDataTypeException
	 */
	protected function loadAllFromFilepath( $folder = '' ) {
		$folder .= $folder[ strlen( $folder ) - 1 ] !== DS ? DS : '';
		// get all the files in that folder that end in the supplied file mask
		$filepaths = (array) apply_filters(
			"FHEE__CollectionLoader__loadAllFromFilepath__{$this->collection_details->collectionName()}_filepaths",
			glob( $folder . $this->collection_details->getFileMask() )
		);
		if ( empty( $filepaths ) ) {
			return;
		}
		foreach ( $filepaths as $filepath ) {
			$this->loadClassFromFilepath( $filepath );
		}
	}



	/**
	 * loadClassFromFilepath
	 *
	 * @access public
	 * @param  string $filepath
	 * @return int
	 * @throws \EventEspresso\Core\Exceptions\InvalidDataTypeException
	 * @throws \EventEspresso\Core\Exceptions\InvalidFilePathException
	 * @throws \EventEspresso\Core\Exceptions\InvalidClassException
	 */
	public function loadClassFromFilepath( $filepath ) {
		if ( ! is_string( $filepath ) ) {
			throw new InvalidDataTypeException( '$filepath', $filepath, 'string' );
		}
		if ( ! is_readable( $filepath ) ) {
			throw new InvalidFilePathException( $filepath );
		}
		require_once( $filepath );
		// extract filename from path
		$file_name = basename( $filepath );
		// now remove any file extensions
		$class_name = substr( $file_name, 0, strpos( $file_name, '.' ) );
		if ( ! class_exists( $class_name ) ) {
			throw new InvalidClassException( $class_name );
		}
		return $this->addEntityToCollection( new $class_name(), $file_name );
	}



	/**
	 * addEntityToCollection
	 *
	 * @access public
	 * @param  $entity
	 * @param  mixed $identifier
	 * @return int
	 */
	public function addEntityToCollection( $entity, $identifier ) {
		do_action(
			"FHEE__CollectionLoader__addEntityToCollection__{$this->collection_details->collectionName()}_entity",
			$entity
		);
		if ( $this->collection_details->identifierType() === CollectionDetails::ID_OBJECT_HASH ) {
			$identifier = spl_object_hash( $entity );
		}
		$identifier = apply_filters(
			"FHEE__CollectionLoader__addEntityToCollection__{$this->collection_details->collectionName()}_identifier",
			$identifier
		);
		if ( $this->collection->has( $identifier ) ) {
			return CollectionLoader::ENTITY_EXISTS;
		}
		if( $this->collection->add( $entity, $identifier ) ) {
			do_action(
				"FHEE__CollectionLoader__addEntityToCollection__{$this->collection_details->collectionName()}_entity_added",
				$this
			);
			return CollectionLoader::ENTITY_ADDED;
		} else {
			do_action(
				"FHEE__CollectionLoader__addEntityToCollection__{$this->collection_details->collectionName()}_entity_not_added",
				$this
			);
			return CollectionLoader::ENTITY_NOT_ADDED;
		}
	}



	/**
	 * loadAllFromFQCNs
	 *
	 * @access protected
	 * @throws \EventEspresso\Core\Exceptions\InvalidClassException
	 * @throws \EventEspresso\Core\Exceptions\InvalidDataTypeException
	 */
	protected function loadAllFromFQCNs() {
		$FQCNs = $this->collection_details->getCollectionFQCNs();
		$FQCNs = (array) apply_filters(
			"FHEE__CollectionLoader__loadAllFromFQCNs__{$this->collection_details->collectionName()}_FQCNs",
			$FQCNs
		);
		foreach ( $FQCNs as $FQCN ) {
			$this->loadClassFromFQCN( $FQCN );
		}
	}



	/**
	 * loadClassFromFQCN
	 *
	 * @access public
	 * @param  string $FQCN Fully Qualified Class Name
	 * @return int
	 * @throws \EventEspresso\Core\Exceptions\InvalidDataTypeException
	 * @throws \EventEspresso\Core\Exceptions\InvalidClassException
	 */
	public function loadClassFromFQCN( $FQCN ) {
		if ( ! is_string( $FQCN ) ) {
			throw new InvalidDataTypeException( '$FQCN', $FQCN, 'string' );
		}
		if ( ! class_exists( $FQCN ) ) {
			throw new InvalidClassException( $FQCN );
		}
		return $this->addEntityToCollection( new $FQCN(), $FQCN );
	}



}
// End of file CollectionLoader.php
// Location: core/services/collection_loaders/CollectionLoader.php