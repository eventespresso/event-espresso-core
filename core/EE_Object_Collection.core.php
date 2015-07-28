<?php if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * Class EE_Object_Collection
 *
 * abstract storage entity for unique objects
 * extends SplObjectStorage so therefore implements the
 * Countable, Iterator, Serializable, and ArrayAccess interfaces
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Brent Christensen
 * @since                4.6.31
 *
 */
abstract class EE_Object_Collection extends SplObjectStorage {

	/**
	 * addObject
	 *
	 * attaches an object to the SplObjectStorage
	 * and sets any supplied data associated with the current iterator entry
	 * by calling EE_Object_Collection::setObjectInfo()
	 *
	 * @access protected
	 * @param object $object
	 * @param mixed $info
	 * @return bool
	 */
	protected function addObject( $object, $info = null ) {
		$this->attach( $object );
		$this->setObjectInfo( $object, $info );
		return $this->contains( $object );
	}



	/**
	 * setObjectInfo
	 *
	 * Sets the data associated with an object in the SplObjectStorage
	 * if no $info is supplied, then the spl_object_hash() is used
	 *
	 * @access protected
	 * @param object $object
	 * @param mixed $info
	 * @return bool
	 */
	protected function setObjectInfo( $object, $info = null ) {
		$info = ! empty( $info ) ? $info : spl_object_hash( $object );
		$this->rewind();
		while ( $this->valid() ) {
			if ( $object == $this->current() ) {
				$this->setInfo( $info );
				$this->rewind();
				return true;
			}
			$this->next();
		}
		return false;
	}



	/**
	 * getObjectByInfo
	 *
	 * finds and returns an object in the repository based on the info that was set using addObject()
	 *
	 * @access protected
	 * @param mixed
	 * @return null | object
	 */
	protected function getObjectByInfo( $info ) {
		$this->rewind();
		while ( $this->valid() ) {
			if ( $info === $this->getInfo() ) {
				$object = $this->current();
				$this->rewind();
				return $object;
			}
			$this->next();
		}
		return null;
	}



	/**
	 * hasObject
	 *
	 * returns TRUE or FALSE depending on whether the supplied object is within the repository
	 *
	 * @access protected
	 * @param object $object
	 * @return bool
	 */
	protected function hasObject( $object ) {
		return $this->contains( $object );
	}



	/**
	 * removeObject
	 *
	 * detaches an object from the SplObjectStorage
	 *
	 * @access protected
	 * @param $object
	 * @return void
	 */
	protected function removeObject( $object ) {
		$this->detach( $object );
	}



}
// End of file EE_Object_Collection.core.php
// Location: /core/EE_Object_Collection.core.php