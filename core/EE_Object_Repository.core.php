<?php if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * Class EE_Object_Repository
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
abstract class EE_Object_Repository extends SplObjectStorage {

	/**
	 * addObject
	 *
	 * attaches an object to the SplObjectStorage
	 * and sets any supplied data associated with the current iterator entry
	 * by calling EE_Object_Repository::setObjectInfo()
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
				return;
			}
			$this->next();
		}
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
	 * persistObject
	 *
	 * primarily used for saving EE_Base_Class classes to the database,
	 * but can be supplied with a "persistence callback" that can be used for classes that are not instances of EE_Base_Class,
	 * or for providing alternate ways to persist an object such as session caching, etc...
	 * an array of arguments can also be supplied that will be passed along to the object's persistence method
	 *
	 * @access protected
	 * @param object 	$object
	 * @param string 	$persistence_callback 		name of method found on object that can be used for persisting the object
	 * @param array 	$persistence_arguments	arrays of arguments that will be passed to the object's persistence method
	 * @return bool | int
	 * @throws \EE_Error
	 */
	protected function persistObject( $object, $persistence_callback = '', $persistence_arguments = array() ) {
		if ( $this->contains( $object ) ) {
			$this->rewind();
			while ( $this->valid() ) {
				if ( $object === $this->current() ) {
					$success = false;
					if ( $persistence_callback !== '' && method_exists( $object, $persistence_callback ) ) {
						$success = $object->$persistence_callback( $persistence_arguments );
					} else if ( $object instanceof EE_Base_Class ) {
						$success = $object->save( $persistence_arguments );
					}
					$this->rewind();
					return $success;
				}
				$this->next();
			}
		}
		return false;
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
// End of file EE_Object_Repository.core.php
// Location: /core/EE_Object_Repository.core.php