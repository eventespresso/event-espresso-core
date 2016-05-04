<?php
namespace EventEspresso\core\services\collections;

use EventEspresso\Core\Exceptions\InvalidEntityException;
use EventEspresso\Core\Exceptions\InvalidInterfaceException;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * Class Collection
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
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
	  * @throws \EventEspresso\Core\Exceptions\InvalidInterfaceException
	  */
	 public function __construct( $collection_interface ) {
		 $this->setCollectionInterface( $collection_interface );
	 }



	 /**
	  * setCollectionInterface
	  *
	  * @access protected
	  * @param  string $collection_interface
	  * @throws \EventEspresso\Core\Exceptions\InvalidInterfaceException
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
	  * @throws \EventEspresso\Core\Exceptions\InvalidEntityException
	  */
	 public function add( $object, $identifier = null ) {
		 if ( ! $object instanceof $this->collection_interface ) {
			 throw new InvalidEntityException( get_class( $object ), $this->collection_interface );
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
	  * @return void
	  */
	 public function setCurrent( $identifier ) {
		 $this->rewind();
		 while ( $this->valid() ) {
			 if ( $identifier === $this->getInfo() ) {
				 break;
			 }
			 $this->next();
		 }
	 }



	 /**
	  * setCurrentUsingObject
	  * advances pointer to the provided object
	  *
	  * @access public
	  * @param $object
	  * @return void
	  */
	 public function setCurrentUsingObject( $object ) {
		 $this->rewind();
		 while ( $this->valid() ) {
			 if ( $this->current() === $object ) {
				 break;
			 }
			 $this->next();
		 }
	 }


 }
// End of file Collection.php
// Location: /Collection.php