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

	/**
	 * possible return value when adding entities to a collection.
	 * denotes that the entity was NOT ADDED to the collection
	 */
	const ENTITY_NOT_ADDED = 'entity-not-added-to-collection';

	/**
	 * possible return value when adding entities to a collection.
	 * denotes that the entity was SUCCESSFULLY ADDED to the collection
	 */
	const ENTITY_ADDED = 'entity-added-to-collection';

	/**
	 * possible return value when adding entities to a collection.
	 * denotes that the entity was ALREADY ADDED to the collection,
	 * and therefore could not be added again.
	 */
	const ENTITY_EXISTS = 'entity-already-in-collection';


	/**
	 * @var CollectionDetailsInterface $collection_details
	 */
	protected $collection_details;

	/**
	 * @var CollectionInterface $collection
	 */
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
		$folder = \EEH_File::end_with_directory_separator( $folder );
		// get all the files in that folder that end in the supplied file mask
		$filepaths = (array) apply_filters(
			"FHEE__CollectionLoader__loadAllFromFilepath__filepaths",
			glob( $folder . $this->collection_details->getFileMask() ),
			$this->collection_details->collectionName(),
			$this->collection_details
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
	 * @return string
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
		$class_name = \EEH_File::get_classname_from_filepath_with_standard_filename( $file_name );
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
	 * @return string
	 */
	public function addEntityToCollection( $entity, $identifier ) {
		do_action(
			"FHEE__CollectionLoader__addEntityToCollection__entity",
			$entity,
			$this->collection_details->collectionName(),
			$this->collection_details
		);
		if ( $this->collection_details->identifierType() === CollectionDetails::ID_OBJECT_HASH ) {
			$identifier = spl_object_hash( $entity );
		}
		$identifier = apply_filters(
			"FHEE__CollectionLoader__addEntityToCollection__identifier",
			$identifier,
			$this->collection_details->collectionName(),
			$this->collection_details
		);
		if ( $this->collection->has( $identifier ) ) {
			do_action(
				"FHEE__CollectionLoader__addEntityToCollection__entity_already_added",
				$this,
				$this->collection_details->collectionName(),
				$this->collection_details
			);
			return CollectionLoader::ENTITY_EXISTS;
		}
		if( $this->collection->add( $entity, $identifier ) ) {
			do_action(
				"FHEE__CollectionLoader__addEntityToCollection__entity_added",
				$this,
				$this->collection_details->collectionName(),
				$this->collection_details
			);
			return CollectionLoader::ENTITY_ADDED;
		} else {
			do_action(
				"FHEE__CollectionLoader__addEntityToCollection__entity_not_added",
				$this,
				$this->collection_details->collectionName(),
				$this->collection_details
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
			"FHEE__CollectionLoader__loadAllFromFQCNs__FQCNs",
			$FQCNs,
			$this->collection_details->collectionName(),
			$this->collection_details
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
	 * @return string
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