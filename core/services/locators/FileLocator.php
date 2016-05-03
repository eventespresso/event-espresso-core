<?php
namespace EventEspresso\core\services\locators;

use EventEspresso\Core\Exceptions\InvalidDataTypeException;
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
class FileLocator extends Locator {

	/**
	 * @var array $filepaths
	 */
	protected $filepaths = array();



	/**
	 * FileLocator constructor.
	 *
	 * @access public
	 * @param array $flags controls how files are found and/or file data is returned
	 * @throws \EventEspresso\Core\Exceptions\InvalidDataTypeException
	 */
	public function __construct( $flags = array() ) {
		parent::__construct( $flags );
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



}
// End of file FileLocator.php
// Location: /FileLocator.php