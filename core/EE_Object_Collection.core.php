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
abstract class EE_Object_Collection extends SplObjectStorage implements EEI_Collection {

	/**
	 * an interface (or class) name to be used for restricting the type of objects added to the storage
	 * this should be set from within the child class constructor
	 * @type string $interface
	 */
	protected $interface;



	/**
	 * add
	 *
	 * attaches an object to the Collection
	 * and sets any supplied data associated with the current iterator entry
	 * by calling EE_Object_Collection::set_info()
	 *
	 * @access public
	 * @param object $object
	 * @param mixed $info
	 * @return bool
	 */
	public function add( $object, $info = null ) {
		$class = $this->interface;
		if ( ! $object instanceof $class ) {
			return false;
		}
		$this->attach( $object );
		$this->set_info( $object, $info );
		return $this->contains( $object );
	}



	/**
	 * set_info
	 *
	 * Sets the data associated with an object in the Collection
	 * if no $info is supplied, then the spl_object_hash() is used
	 *
	 * @access public
	 * @param object $object
	 * @param mixed $info
	 * @return bool
	 */
	public function set_info( $object, $info = null ) {
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
	 * get_by_info
	 *
	 * finds and returns an object in the Collection based on the info that was set using addObject()
	 * PLZ NOTE: the pointer is reset to the beginning of the collection before returning
	 *
	 * @access public
	 * @param mixed
	 * @return null | object
	 */
	public function get_by_info( $info ) {
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
	 * has
	 *
	 * returns TRUE or FALSE depending on whether the supplied object is within the Collection
	 *
	 * @access public
	 * @param object $object
	 * @return bool
	 */
	public function has( $object ) {
		return $this->contains( $object );
	}



	/**
	 * remove
	 *
	 * detaches an object from the Collection
	 *
	 * @access public
	 * @param $object
	 * @return bool
	 */
	public function remove( $object ) {
		$this->detach( $object );
		return true;
	}



	/**
	 * set_current
	 *
	 * advances pointer to the provided object
	 *
	 * @access public
	 * @param $object
	 * @return void
	 */
	public function set_current( $object ) {
		$this->rewind();
		while ( $this->valid() ) {
			if ( $this->current() === $object ) {
				break;
			}
			$this->next();
		}
	}



	/**
	 * set_current_by_info
	 *
	 * advances pointer to the object whose info matches that which was provided
	 *
	 * @access public
	 * @param $info
	 * @return void
	 */
	public function set_current_by_info( $info ) {
		$this->rewind();
		while ( $this->valid() ) {
			if ( $info === $this->getInfo() ) {
				break;
			}
			$this->next();
		}
	}



}
// End of file EE_Object_Collection.core.php
// Location: /core/EE_Object_Collection.core.php