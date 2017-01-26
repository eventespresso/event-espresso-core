<?php
namespace EventEspresso\core\services\locators;

use Countable;
use  EventEspresso\core\exceptions\InvalidDataTypeException;
use FilesystemIterator;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class Locator
 * abstract parent for classes that use SPL Iterators
 *
 * @package Event Espresso
 * @author  Brent Christensen
 * @since   4.9.0
 */
abstract class Locator implements LocatorInterface, Countable {

	/**
	 * @var array $flags
	 */
	protected $flags = array();



	/**
	 * FileLocator constructor.
	 *
	 * @access public
	 * @param array $flags controls how files are found and/or file data is returned
	 * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
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
	 * @see    http://php.net/manual/en/class.filesystemiterator.php#filesystemiterator.constants
	 * @access public
	 * @param array $flags
	 * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
	 */
	public function setFlags( $flags ) {
		if ( ! is_array( $flags ) ) {
			throw new InvalidDataTypeException( '$flags', $flags, 'array' );
		}
		$this->flags = $flags;
	}



}
// End of file Locator.php
// Location: /Locator.php