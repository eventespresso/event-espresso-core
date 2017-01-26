<?php
namespace EventEspresso\core\services\collections;

use  EventEspresso\core\exceptions\InvalidEntityException;
use  EventEspresso\core\exceptions\InvalidInterfaceException;
use LimitIterator;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * Class Collection
 * class for managing a set of entities that all adhere to the same interface
 * unofficially follows Interop\Container\ContainerInterface
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
 class Collection extends \SplObjectStorage implements CollectionInterface {


	 /**
	  * an interface (or class) name to be used for restricting the type of objects added to the storage
	  * this should be set from within the child class constructor
	  *
	  * @type string $interface
	  */
	 protected $collection_interface;



	 /**
	  * Collection constructor
	  *
	  * @param string $collection_interface
	  * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
	  */
	 public function __construct( $collection_interface ) {
		 $this->setCollectionInterface( $collection_interface );
	 }



	 /**
	  * setCollectionInterface
	  *
	  * @access protected
	  * @param  string $collection_interface
	  * @throws \EventEspresso\core\exceptions\InvalidInterfaceException
	  */
	 protected function setCollectionInterface( $collection_interface ) {
		 if ( ! ( interface_exists( $collection_interface ) || class_exists( $collection_interface ) ) ) {
			 throw new InvalidInterfaceException( $collection_interface );
		 }
		 $this->collection_interface = $collection_interface;
	 }



	 /**
	  * add
	  * attaches an object to the Collection
	  * and sets any supplied data associated with the current iterator entry
	  * by calling EE_Object_Collection::set_identifier()
	  *
	  * @access public
	  * @param        $object
	  * @param  mixed $identifier
	  * @return bool
	  * @throws \EventEspresso\core\exceptions\InvalidEntityException
	  */
	 public function add( $object, $identifier = null ) {
		 if ( ! $object instanceof $this->collection_interface ) {
			 throw new InvalidEntityException( $object, $this->collection_interface );
		 }
		 $this->attach( $object );
		 $this->setIdentifier( $object, $identifier );
		 return $this->contains( $object );
	 }



	 /**
	  * setIdentifier

	  * Sets the data associated with an object in the Collection
	  * if no $identifier is supplied, then the spl_object_hash() is used
	  *
	  * @access public
	  * @param  $object
	  * @param  mixed $identifier
	  * @return bool
	  */
	 public function setIdentifier( $object, $identifier = null ) {
		 $identifier = ! empty( $identifier ) ? $identifier : spl_object_hash( $object );
		 $this->rewind();
		 while ( $this->valid() ) {
			 if ( $object === $this->current() ) {
				 $this->setInfo( $identifier );
				 $this->rewind();
				 return true;
			 }
			 $this->next();
		 }
		 return false;
	 }



	 /**
	  * get
	  * finds and returns an object in the Collection based on the identifier that was set using addObject()
	  * PLZ NOTE: the pointer is reset to the beginning of the collection before returning
	  *
	  * @access public
	  * @param mixed $identifier
	  * @return mixed
	  */
	 public function get( $identifier ) {
		 $this->rewind();
		 while ( $this->valid() ) {
			 if ( $identifier === $this->getInfo() ) {
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
	  * returns TRUE or FALSE
	  * depending on whether the object is within the Collection
	  * based on the supplied $identifier
	  *
	  * @access public
	  * @param  mixed $identifier
	  * @return bool
	  */
	 public function has( $identifier ) {
		 $this->rewind();
		 while ( $this->valid() ) {
			 if ( $identifier === $this->getInfo() ) {
				 $this->rewind();
				 return true;
			 }
			 $this->next();
		 }
		 return false;
	 }



	 /**
	  * hasObject
	  * returns TRUE or FALSE depending on whether the supplied object is within the Collection
	  *
	  * @access public
	  * @param $object
	  * @return bool
	  */
	 public function hasObject( $object ) {
		 return $this->contains( $object );
	 }



	 /**
	  * remove
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
	  * setCurrent
	  * advances pointer to the object whose identifier matches that which was provided
	  *
	  * @access public
	  * @param mixed $identifier
	  * @return boolean
	  */
	 public function setCurrent( $identifier ) {
		 $this->rewind();
		 while ( $this->valid() ) {
			 if ( $identifier === $this->getInfo() ) {
				 return true;
			 }
			 $this->next();
		 }
		 return false;
	 }



	 /**
	  * setCurrentUsingObject
	  * advances pointer to the provided object
	  *
	  * @access public
	  * @param $object
	  * @return boolean
	  */
	 public function setCurrentUsingObject( $object ) {
		 $this->rewind();
		 while ( $this->valid() ) {
			 if ( $this->current() === $object ) {
				 return true;
			 }
			 $this->next();
		 }
		 return false;
	 }



	 /**
	  * Returns the object occupying the index before the current object,
	  * unless this is already the first object, in which case it just returns the first object
	  *
	  * @return mixed
	  */
	 public function previous() {
		 $index = $this->indexOf( $this->current() );
		 if ( $index === 0 ) {
			 return $this->current();
		 }
		 $index--;
		 return $this->objectAtIndex( $index );
	 }



	 /**
	  * Returns the index of a given object, or false if not found
	  *
	  * @see http://stackoverflow.com/a/8736013
	  * @param $object
	  * @return boolean|int|string
	  */
	 public function indexOf( $object ) {
		 if ( ! $this->contains( $object ) ) {
			 return false;
		 }
		 foreach ( $this as $index => $obj ) {
			 if ( $obj === $object ) {
				 return $index;
			 }
		 }
		 return false;
	 }



	 /**
	  * Returns the object at the given index
	  *
	  * @see http://stackoverflow.com/a/8736013
	  * @param int $index
	  * @return mixed
	  */
	 public function objectAtIndex( $index ) {
		 $iterator = new LimitIterator( $this, $index, 1 );
		 $iterator->rewind();
		 return $iterator->current();
	 }



	 /**
	  * Returns the sequence of objects as specified by the offset and length
	  *
	  * @see http://stackoverflow.com/a/8736013
	  * @param int $offset
	  * @param int $length
	  * @return array
	  */
	 public function slice( $offset, $length ) {
		 $slice = array();
		 $iterator = new LimitIterator( $this, $offset, $length );
		 foreach ( $iterator as $object ) {
			 $slice[] = $object;
		 }
		 return $slice;
	 }



	 /**
	  * Inserts an object (or an array of objects) at a certain point
	  *
	  * @see http://stackoverflow.com/a/8736013
	  * @param mixed $objects A single object or an array of objects
	  * @param int $index
	  */
	 public function insertAt( $objects, $index ) {
		 if ( ! is_array( $objects ) ) {
			 $objects = array( $objects );
		 }
		 // check to ensure that objects don't already exist in the collection
		 foreach ( $objects as $key => $object ) {
			 if ( $this->contains( $object ) ) {
				 unset( $objects[ $key ] );
			 }
		 }
		 // do we have any objects left?
		 if ( ! $objects ) {
			 return;
		 }
		 // detach any objects at or past this index
		 $remaining = array();
		 if ( $index < $this->count() ) {
			 $remaining = $this->slice( $index, $this->count() - $index );
			 foreach ( $remaining as $object ) {
				 $this->detach( $object );
			 }
		 }
		 // add the new objects we're splicing in
		 foreach ( $objects as $object ) {
			 $this->attach( $object );
		 }
		 // attach the objects we previously detached
		 foreach ( $remaining as $object ) {
			 $this->attach( $object );
		 }
	 }



	 /**
	  * Removes the object at the given index
	  *
	  * @see http://stackoverflow.com/a/8736013
	  * @param int $index
	  */
	 public function removeAt( $index ) {
		 $this->detach( $this->objectAtIndex( $index ) );
	 }



 }
// End of file Collection.php
// Location: /Collection.php