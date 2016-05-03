<?php
namespace EventEspresso\core\services\file;

use Countable;
use EventEspresso\Core\Exceptions\InvalidClassException;
use EventEspresso\Core\Exceptions\InvalidDataTypeException;
use EventEspresso\Core\Psr4Autoloader;
use FilesystemIterator;
use GlobIterator;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class FileLocator
 *
 * finds filepaths from folder paths or FQCNs (Fully Qualified Class Name) from partial FQCNs
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class FileLocator implements Countable {

	/**
	 * @var array $filepaths
	 */
	protected $filepaths = array();

	/**
	 * @var array $flags
	 */
	protected $flags = array();

	/**
	 * @var array $FQCNs
	 */
	protected $FQCNs = array();

	/**
	 * @var FilesystemIterator $iterator
	 */
	protected $iterator;

	/**
	 * @var array $namespaces
	 */
	protected $namespaces = array();



	/**
	 * FileLocator constructor.
	 *
	 * @access public
	 * @param array $flags controls how files are found and/or file data is returned
	 * @throws \EventEspresso\Core\Exceptions\InvalidDataTypeException
	 */
	public function __construct( $flags = array() ) {
		if ( empty( $flags ) ) {
			$flags = array(
				FilesystemIterator::SKIP_DOTS,
				FilesystemIterator::UNIX_PATHS,
				FilesystemIterator::CURRENT_AS_PATHNAME
			);
		}
		$this->setFlags( $flags );
	}



	/**
	 * @see http://php.net/manual/en/class.filesystemiterator.php#filesystemiterator.constants
	 * @access public
	 * @param array $flags
	 * @throws \EventEspresso\Core\Exceptions\InvalidDataTypeException
	 */
	public function setFlags( $flags ) {
		if ( ! is_array( $flags ) ) {
			throw new InvalidDataTypeException( '$flags', $flags, 'array' );
		}
		$this->flags = $flags;
	}



	/**
	 * @access public
	 * @return array
	 */
	public function getFilePaths() {
		return $this->filepaths;
	}



	/**
	 * @access public
	 * @return array
	 */
	public function getFQCNs() {
		return $this->FQCNs;
	}



	/**
	 * @param string $namespace
	 * @param string $namespace_base_dir
	 * @throws \EventEspresso\Core\Exceptions\InvalidDataTypeException
	 */
	public function setNamespace( $namespace, $namespace_base_dir ) {
		if ( ! is_string( $namespace ) ) {
			throw new InvalidDataTypeException( '$namespace', $namespace, 'string' );
		}
		if ( ! is_string( $namespace_base_dir ) ) {
			throw new InvalidDataTypeException( '$namespace_base_dir', $namespace_base_dir, 'string' );
		}
		$this->namespaces[ $namespace ] = $namespace_base_dir;
	}



	/**
	 * @access public
	 * @return int
	 */
	public function count() {
		return count( $this->filepaths );
	}



	/**
	 * given a path to a valid directory, or an array of valid paths,
	 * will find all files that match the provided mask
	 *
	 * @access public
	 * @param array|string $directory_paths
	 * @param string       $file_mask
	 * @return \FilesystemIterator
	 * @throws \EventEspresso\Core\Exceptions\InvalidDataTypeException
	 */
	public function FindByPath( $directory_paths, $file_mask = '' ) {
		if ( ! ( is_string( $directory_paths ) || is_array( $directory_paths ) ) ) {
			throw new InvalidDataTypeException( '$directory_paths', $directory_paths, 'string or array' );
		}
		foreach ( (array) $directory_paths as $directory_path ) {
			foreach ( $this->findFilesByPath( $directory_path, $file_mask ) as $key => $file ) {
				$this->filepaths[ $key ] = \EEH_File::standardise_directory_separators( $file );
			}
		}
		return $this->filepaths;
	}



	/**
	 * given a path to a valid directory, will find all files that match the provided mask
	 *
	 * @access protected
	 * @param string $directory_path
	 * @param string $file_mask
	 * @return \FilesystemIterator
	 */
	protected function findFilesByPath( $directory_path = '', $file_mask = '' ) {
		$iterator = new GlobIterator (
			\EEH_File::end_with_directory_separator( $directory_path ) . $file_mask
		);
		foreach ( $this->flags as $flag ) {
			$iterator->setFlags( $flag );
		}
		return $iterator;
	}



	/**
	 * given a valid namespace, will find all files that match the provided mask
	 *
	 * @access public
	 * @param string|array $namespaces
	 * @return FilesystemIterator
	 * @throws \EventEspresso\Core\Exceptions\InvalidClassException
	 * @throws \EventEspresso\Core\Exceptions\InvalidDataTypeException
	 */
	public function FindByNamespace( $namespaces ) {
		if ( ! ( is_string( $namespaces ) || is_array( $namespaces ) ) ) {
			throw new InvalidDataTypeException( '$namespaces', $namespaces, 'string or array' );
		}
		foreach ( (array) $namespaces as $namespace ) {
			foreach ( $this->FindFQCNsByNamespace( $namespace ) as $key => $file ) {
				$this->FQCNs[ $key ] = $file;
			}
		}
		return $this->FQCNs;
	}



	/**
	 * given a partial namespace, will find all files in that folder
	 * ** PLZ NOTE **
	 * This assumes that all files within the specified folder should be loaded
	 *
	 * @access protected
	 * @param array $partial_namespace
	 * @return FilesystemIterator
	 * @throws \EventEspresso\Core\Exceptions\InvalidClassException
	 * @throws \EventEspresso\Core\Exceptions\InvalidDataTypeException
	 */
	protected function FindFQCNsByNamespace( $partial_namespace ) {
		$iterator = new FilesystemIterator(
			$this->getDirectoryFromPartialNamespace( $partial_namespace )
		);
		foreach ( $this->flags as $flag ) {
			$iterator->setFlags( $flag );
		}
		if ( iterator_count( $iterator ) === 0 ) {
			return array();
		}
		foreach ( $iterator as $file ) {
			$file = \EEH_File::standardise_directory_separators( $file );
			foreach ( $this->namespaces as $namespace => $base_dir ) {
				$namespace .= Psr4Autoloader::NS;
				if ( strpos( $file, $base_dir ) === 0 ) {
					$this->FQCNs[] = Psr4Autoloader::NS . str_replace(
						array( $base_dir, DS, '.php' ),
						array( $namespace, Psr4Autoloader::NS, '' ),
						$file
					);
				}
			}
		}
		return $this->FQCNs;
	}



	/**
	 * getDirectoryFromPartialNamespace
	 *
	 * @access protected
	 * @param  string $partial_namespace almost fully qualified class name ?
	 * @return string
	 * @throws \EventEspresso\Core\Exceptions\InvalidDataTypeException
	 * @throws \EventEspresso\Core\Exceptions\InvalidClassException
	 */
	protected function getDirectoryFromPartialNamespace( $partial_namespace ) {
		if ( empty( $partial_namespace ) ) {
			throw new InvalidClassException( $partial_namespace );
		}
		// load our PSR-4 Autoloader so we can get the list of registered namespaces from it
		$psr4_loader = \EE_Psr4AutoloaderInit::psr4_loader();
		// breakup the incoming namespace into segments then loop thru them
		$namespace_segments = explode( Psr4Autoloader::NS, trim( $partial_namespace, Psr4Autoloader::NS ) );
		// we're only interested in the first element, so pull that from the array
		$namespace = array_shift( $namespace_segments );
		// check if there's a base directory registered for that namespace
		$prefix = $psr4_loader->prefixes( $namespace . Psr4Autoloader::NS );
		// nope? then the incoming namespace is invalid
		if ( empty( $prefix ) || empty( $prefix[0] ) ) {
			throw new InvalidClassException( $partial_namespace );
		}
		$this->setNamespace( $namespace, $prefix[0] );
		// but if it's good, add that base directory to the rest of the path, and return it
		return $prefix[0] . implode( DS, $namespace_segments ) . DS;
	}



}
// End of file FileLocator.php
// Location: /FileLocator.php