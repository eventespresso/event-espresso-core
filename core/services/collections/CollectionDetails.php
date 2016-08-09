<?php
namespace EventEspresso\core\services\collections;

use  EventEspresso\core\exceptions\InvalidDataTypeException;
use  EventEspresso\core\exceptions\InvalidFilePathException;
use  EventEspresso\core\exceptions\InvalidIdentifierException;
use  EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\locators\FqcnLocator;
use EventEspresso\core\services\locators\LocatorInterface;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class CollectionDetails
 *
 * Abstract parent class for defining classes for loading into a collection.
 * The supplied interface will be used for type hinting the objects being loaded.
 * Classes can either be located by supplying an array of FQCNs (Fully Qualified Class Names),
 * AND/OR
 * an array of full server filepaths to a folder containing a set of files,
 * where the classnames match the filenames minus all extensions.
 *  for example:
 *  $FQCNs = array(
 *      '/Fully/Qualified/ClassNameA'
 *      '/Fully/Qualified/Other/ClassNameB'
 *  );
 *  $paths = array(
 *      '/full/server/path/to/ClassNameA.ext.php' // for class ClassNameA
 *      '/full/server/path/to/other/ClassNameB.php' // for class ClassNameB
 *  );
 * You do NOT have to provide both! They operate exclusively.
 * So you can provide an array of class names (FQCNs),
 * OR an array of folder filepaths,
 * OR you can provide both, if you happen to have classes of the same type in two locations,
 * and want to add both locations, and it turns out to be easier to use one loading method (FQCNs)
 * for the one location, and the other method for the other location.
 * You can of course use the same loading method for both locations if that worked best.
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 * @since         4.9.0
 */
class CollectionDetails implements CollectionDetailsInterface {

	/**
	 * if $identifier_type is set to this,
	 * then the collection will use each object's spl_object_hash() as it's identifier
	 */
	const ID_OBJECT_HASH = 'identifier-uses-spl-object-hash';

	/**
	 * if $identifier_type is set to this,
	 * then the collection will use each object's class name as it's identifier
	 */
	const ID_CLASS_NAME = 'identifier-uses-object-class-name';

	/**
	 * if $identifier_type is set to this,
	 * then the collection will use the return value from a specified callback method on each object
	 */
	const ID_CALLBACK_METHOD = 'identifier-uses-callback-method';

	/**
	 * The interface used for controlling what gets added to the collection
	 *
	 * @var string $collection_interface
	 */
	protected $collection_interface = '';

	/**
	 * a unique name used to identify the collection in filter names
	 * supplied value is run through sanitize_title_with_dashes(),
	 * but then also converts dashes to underscores
	 *
	 * @var string $collection_name
	 */
	protected $collection_name = '';

	/**
	 * what the collection uses for the object identifier.
	 * corresponds to one of the class constants above.
	 * CollectionDetails::ID_OBJECT_HASH will use spl_object_hash( object ) for the identifier
	 * CollectionDetails::ID_CLASS_NAME will use get_class( object ) for the identifier
	 * CollectionDetails::ID_CALLBACK_METHOD will use a callback for the identifier
	 * defaults to using spl_object_hash() so that multiple objects of the same class can be added
	 *
	 * @var string $identifier_type
	 */
	protected $identifier_type = CollectionDetails::ID_OBJECT_HASH;

	/**
	 * the pattern applied to paths when searching for class files to add to the collection
	 * ie: "My_Awesome_*.class.php"
	 * defaults to "*.php"
	 *
	 * @var string $file_mask
	 */
	protected $file_mask = '';

	/**
	 * if the $identifier_type above is set to CollectionDetails::ID_CALLBACK_METHOD,
	 * then this specifies the method to use on each entity.
	 * If the callback method does not exist, then an exception will be thrown
	 *
	 * @var string $identifier_callback
	 */
	protected $identifier_callback = '';

	/**
	 * an array of Fully Qualified Class Names
	 *  for example:
	 *  $FQCNs = array(
	 *      '/Fully/Qualified/ClassNameA'
	 *      '/Fully/Qualified/Other/ClassNameB'
	 *  );
	 *
	 * @var array $collection_FQCNs
	 */
	protected $collection_FQCNs = array();

	/**
	 * an array of full server paths to folders containing files to be loaded into collection
	 *  for example:
	 *  $paths = array(
	 *      '/full/server/path/to/ClassNameA.ext.php' // for class ClassNameA
	 *      '/full/server/path/to/other/ClassNameB.php' // for class ClassNameB
	 *  );
	 *
	 * @var array $collection_paths
	 */
	protected $collection_paths = array();

	/**
	 * @var LocatorInterface $file_locator
	 */
	protected $file_locator;



	/**
	 * CollectionDetails constructor.
	 *
	 * @access public
	 * @param string           $collection_name
	 * @param string           $collection_interface
	 * @param array            $collection_FQCNs
	 * @param array            $collection_paths
	 * @param string           $file_mask
	 * @param string           $identifier_type
	 * @param string           $identifier_callback
	 * @param LocatorInterface $file_locator
	 * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
	 * @throws \EventEspresso\core\exceptions\InvalidFilePathException
	 * @throws \EventEspresso\core\exceptions\InvalidIdentifierException
	 * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
	 * @throws \EventEspresso\core\exceptions\InvalidClassException
	 */
	public function __construct(
		$collection_name,
		$collection_interface,
		$collection_FQCNs = array(),
		$collection_paths = array(),
		$file_mask = '',
		$identifier_type = CollectionDetails::ID_OBJECT_HASH,
		$identifier_callback = '',
		LocatorInterface $file_locator = null
	) {
		$this->setCollectionName( $collection_name );
		$this->setCollectionInterface( $collection_interface );
		$this->setCollectionFQCNs( $collection_FQCNs );
		$this->setCollectionPaths( $collection_paths );
		$this->setFileMasks( $file_mask );
		$this->setIdentifierType( $identifier_type );
		$this->setIdentifierCallback( $identifier_callback );
		$this->file_locator = $file_locator;
	}



	/**
	 * @access public
	 * @return mixed
	 */
	public function getCollectionInterface() {
		return $this->collection_interface;
	}



	/**
	 * @access protected
	 * @param string $collection_interface
	 * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
	 */
	protected function setCollectionInterface( $collection_interface ) {
		if ( ! ( interface_exists( $collection_interface ) || class_exists( $collection_interface ) ) ) {
			throw new InvalidInterfaceException( $collection_interface );
		}
		$this->collection_interface = $collection_interface;
	}



	/**
	 * the collection name will be used for creating dynamic filters
	 *
	 * @access public
	 * @return string
	 */
	public function collectionName() {
		return $this->collection_name;
	}



	/**
	 * sanitizes collection name and converts spaces and dashes to underscores
	 *
	 * @access protected
	 * @param string $collection_name
	 * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
	 */
	protected function setCollectionName( $collection_name ) {
		if ( ! is_string( $collection_name ) ) {
			throw new InvalidDataTypeException( '$collection_name', $collection_name, 'string' );
		}
		$this->collection_name = str_replace(
			'-',
			'_',
			sanitize_title_with_dashes( $collection_name, '', 'save' )
		);
	}



	/**
	 * @access public
	 * @return string
	 */
	public function identifierType() {
		return $this->identifier_type;
	}



	/**
	 * @access protected
	 * @param string $identifier_type
	 * @throws \EventEspresso\core\exceptions\InvalidIdentifierException
	 */
	protected function setIdentifierType( $identifier_type ) {
		if (
			! (
				$identifier_type === CollectionDetails::ID_CLASS_NAME
				|| $identifier_type === CollectionDetails::ID_OBJECT_HASH
				|| $identifier_type === CollectionDetails::ID_CALLBACK_METHOD
			)
		) {
			throw new InvalidIdentifierException(
				$identifier_type,
				'CollectionDetails::ID_CLASS_NAME or CollectionDetails::ID_OBJECT_HASH or CollectionDetails::ID_CALLBACK_METHOD'
			);
		}
		$this->identifier_type = $identifier_type;
	}



	/**
	 * @access public
	 * @return string
	 */
	public function identifierCallback() {
		return $this->identifier_callback;
	}



	/**
	 * @access protected
	 * @param string $identifier_callback
	 * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
	 */
	protected function setIdentifierCallback( $identifier_callback = 'identifier' ) {
		if ( ! is_string( $identifier_callback ) ) {
			throw new InvalidDataTypeException( '$identifier_callback', $identifier_callback, 'string' );
		}
		$this->identifier_callback = $identifier_callback;
	}



	/**
	 * @access public
	 * @return array
	 */
	public function getFileMask() {
		return $this->file_mask;
	}



	/**
	 * sets the file mask which is then used to filter what files get loaded
	 * when searching for classes to add to the collection. Defaults to '*.php'
	 *
	 * @access protected
	 * @param string $file_mask
	 * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
	 */
	protected function setFileMasks( $file_mask ) {
		$this->file_mask = ! empty( $file_mask ) ? $file_mask : '*.php';
		// we know our default is a string, so if it's not a string now,
		// then that means the incoming parameter was something else
		if ( ! is_string( $this->file_mask ) ) {
			throw new InvalidDataTypeException( '$file_mask', $this->file_mask, 'string' );
		}
	}



	/**
	 * @access public
	 * @return string
	 */
	public function getCollectionFQCNs() {
		return $this->collection_FQCNs;
	}



	/**
	 * @access public
	 * @param string|array $collection_FQCNs
	 * @throws \EventEspresso\core\exceptions\InvalidClassException
	 * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
	 */
	public function setCollectionFQCNs( $collection_FQCNs ) {
		foreach ( (array) $collection_FQCNs as $collection_FQCN ) {
			if ( ! empty( $collection_FQCN ) ) {
				if ( class_exists( $collection_FQCN ) ) {
					$this->collection_FQCNs[] = $collection_FQCN;
				} else {
					foreach ( $this->getFQCNsFromPartialNamespace( $collection_FQCN ) as $FQCN ) {
						$this->collection_FQCNs[] = $FQCN;
					}
				}
			}
		}
	}



	/**
	 * @access protected
	 * @param  string $partial_FQCN
	 * @return array
	 * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
	 * @throws \EventEspresso\core\exceptions\InvalidClassException
	 */
	protected function getFQCNsFromPartialNamespace( $partial_FQCN ) {
		if ( ! $this->file_locator instanceof FqcnLocator ) {
			$this->file_locator = new FqcnLocator();
		}
		$this->file_locator->locate( $partial_FQCN );
		return $this->file_locator->getFQCNs();
	}



	/**
	 * @access public
	 * @return string
	 */
	public function getCollectionPaths() {
		return $this->collection_paths;
	}



	/**
	 * @access public
	 * @param string|array $collection_paths
	 * @throws \EventEspresso\core\exceptions\InvalidFilePathException
	 */
	public function setCollectionPaths( $collection_paths ) {
		foreach ( (array) $collection_paths as $collection_path ) {
			if ( ! empty( $collection_path ) ) {
				if ( ! is_readable( $collection_path ) ) {
					throw new InvalidFilePathException( $collection_path );
				}
				$this->collection_paths[] = $collection_path;
			}
		}
	}



}
// End of file CollectionDetails.php
// Location: /CollectionDetails.php