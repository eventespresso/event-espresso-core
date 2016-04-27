<?php
namespace EventEspresso\core\services\collection_loaders;

use EventEspresso\Core\Exceptions\InvalidClassException;
use EventEspresso\Core\Exceptions\InvalidFilePathException;
use EventEspresso\Core\Exceptions\InvalidInterfaceException;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class CollectionDetails
 * Abstract parent class for defining classes for loading into a collection.
 * The supplied interface will be used for type hinting the objects being loaded.
 * Classes can either be located by supplying an array of FQCNs (Fully Qualified Class Names),
 * or an array of full server filepaths to a set of files,
 * where the classnames match the filenames minus all extensions
 *  for example:
 *  $FCQNs = array(
 *      '/Fully/Qualified/ClassNameA'
 *      '/Fully/Qualified/Other/ClassNameB'
 *  );
 *  $paths = array(
 *      '/full/server/path/to/ClassNameA.ext.php' // for class ClassNameA
 *      '/full/server/path/to/other/ClassNameB.php' // for class ClassNameB
 *  );
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 * @since         4.9.0
 */
abstract class CollectionDetails implements CollectionDetailsInterface {

	/**
	 * @var string $collection_interface
	 */
	protected $collection_interface = '';

	/**
	 * @var array $collection_FCQNs
	 */
	protected $collection_FCQNs = array();

	/**
	 * @var array $collection_paths
	 */
	protected $collection_paths = array();



	/**
	 * CollectionDetails constructor.
	 *
	 * @param string $collection_interface
	 * @param array  $collection_FCQNs
	 * @param array  $collection_paths
	 * @throws \EventEspresso\Core\Exceptions\InvalidInterfaceException
	 * @throws \EventEspresso\Core\Exceptions\InvalidClassException
	 * @throws \EventEspresso\Core\Exceptions\InvalidFilePathException
	 */
	public function __construct( $collection_interface, $collection_FCQNs = array(), $collection_paths = array() ) {
		$this->setCollectionInterface( $collection_interface );
		$this->setCollectionFCQNs( $collection_FCQNs );
		$this->setCollectionPaths( $collection_paths );
	}



	/**
	 * @return mixed
	 */
	public function getCollectionInterface() {
		return $this->collection_interface;
	}



	/**
	 * @param string $collection_interface
	 * @throws \EventEspresso\Core\Exceptions\InvalidInterfaceException
	 */
	public function setCollectionInterface( $collection_interface ) {
		if ( ! interface_exists( $collection_interface ) ) {
			throw new InvalidInterfaceException( $collection_interface );
		}
		$this->collection_interface = $collection_interface;
	}



	/**
	 * @return string
	 */
	public function getCollectionFCQNs() {
		return $this->collection_FCQNs;
	}



	/**
	 * @param string $collection_FCQNs
	 * @throws \EventEspresso\Core\Exceptions\InvalidClassException
	 */
	public function setCollectionFCQNs( $collection_FCQNs ) {
		foreach ( (array) $collection_FCQNs as $collection_FCQN ) {
			if ( ! empty( $collection_FCQN ) && ! in_array( $collection_FCQN, $this->collection_FCQNs ) ) {
				if ( ! class_exists( $collection_FCQN ) ) {
					throw new InvalidClassException( $collection_FCQN );
				}
				$this->collection_FCQNs[] = $collection_FCQN;
			}
		}
	}



	/**
	 * @return string
	 */
	public function getCollectionPaths() {
		return $this->collection_paths;
	}



	/**
	 * @param string $collection_paths
	 * @throws \EventEspresso\Core\Exceptions\InvalidFilePathException
	 */
	public function setCollectionPaths( $collection_paths ) {
		foreach ( (array) $collection_paths as $collection_path ) {
			if ( ! empty( $collection_path ) && ! in_array( $collection_path, $this->collection_paths ) ) {
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