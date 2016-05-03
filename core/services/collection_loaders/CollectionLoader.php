<?php
namespace EventEspresso\core\services\collection_loaders;

use EventEspresso\Core\Exceptions\InvalidClassException;
use EventEspresso\Core\Exceptions\InvalidDataTypeException;
use EventEspresso\Core\Exceptions\InvalidFilePathException;
use EventEspresso\core\services\file\FileLocator;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class CollectionLoader
 *
 * given the details on where to find files, will populate a collection
 * plz see: \EventEspresso\core\services\collection_loaders\CollectionDetails
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
	 * @var FileLocator $file_locator
	 */
	protected $file_locator;



	/**
	 * CollectionLoader constructor.
	 *
	 * @param CollectionDetailsInterface $collection_details
	 * @param CollectionInterface        $collection
	 * @param FileLocator                $file_locator
	 * @throws \EventEspresso\Core\Exceptions\InvalidInterfaceException
	 * @throws \EventEspresso\Core\Exceptions\InvalidClassException
	 * @throws \EventEspresso\Core\Exceptions\InvalidDataTypeException
	 * @throws \EventEspresso\Core\Exceptions\InvalidFilePathException
	 */
	public function __construct(
		CollectionDetailsInterface $collection_details,
		CollectionInterface $collection = null,
		FileLocator $file_locator = null
	) {
		$this->collection_details = $collection_details;
		if ( ! $collection instanceof CollectionInterface ) {
			$collection = new Collection( $this->collection_details->getCollectionInterface() );
		}
		$this->collection = $collection;
		$this->file_locator = $file_locator;
		$this->loadAllFromFilepaths();
		$this->loadFromFQCNs();
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
		if ( ! $this->file_locator instanceof FileLocator ) {
			$this->file_locator = new FileLocator();
		}
		// find all of the files that match the file mask in the specified folder
		$this->file_locator->FindByPath(
			$this->collection_details->getCollectionPaths(),
			$this->collection_details->getFileMask()
		);
		// filter the results
		$filepaths = (array) apply_filters(
			"FHEE__CollectionLoader__loadAllFromFilepath__filepaths",
			$this->file_locator->getFilePaths(),
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
	 * @access protected
	 * @param  string $filepath
	 * @return string
	 * @throws \EventEspresso\Core\Exceptions\InvalidDataTypeException
	 * @throws \EventEspresso\Core\Exceptions\InvalidFilePathException
	 * @throws \EventEspresso\Core\Exceptions\InvalidClassException
	 */
	protected function loadClassFromFilepath( $filepath ) {
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
	 * @access protected
	 * @param  $entity
	 * @param  mixed $identifier
	 * @return string
	 */
	protected function addEntityToCollection( $entity, $identifier ) {
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
	 * loadFromFQCNs
	 *
	 * @access protected
	 * @throws \EventEspresso\Core\Exceptions\InvalidClassException
	 * @throws \EventEspresso\Core\Exceptions\InvalidDataTypeException
	 */
	protected function loadFromFQCNs() {
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
	 * @access protected
	 * @param  string $FQCN Fully Qualified Class Name
	 * @return string
	 * @throws \EventEspresso\Core\Exceptions\InvalidDataTypeException
	 * @throws \EventEspresso\Core\Exceptions\InvalidClassException
	 */
	protected function loadClassFromFQCN( $FQCN ) {
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