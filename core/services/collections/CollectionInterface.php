<?php
namespace EventEspresso\core\services\collections;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Interface CollectionInterface
 * interface for classes that manage a set of entities that all adhere to the same interface
 * unofficially follows Interop\Container\ContainerInterface
 *
 * @package EventEspresso\core\services\collections
 */
interface CollectionInterface {

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
	 */
	public function add( $object, $identifier = null );

	/**
	 * setIdentifier
	 * Sets the data associated with an object in the Collection
	 * if no $identifier is supplied, then the spl_object_hash() is used
	 *
	 * @access public
	 * @param        $object
	 * @param  mixed $identifier
	 * @return bool
	 */
	public function setIdentifier( $object, $identifier = null );

	/**
	 * get
	 * finds and returns an object in the Collection based on the identifier that was set using addObject()
	 * PLZ NOTE: the pointer is reset to the beginning of the collection before returning
	 *
	 * @access public
	 * @param mixed $identifier
	 * @return mixed
	 */
	public function get( $identifier );

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
	public function has( $identifier );

	/**
	 * hasObject
	 * returns TRUE or FALSE depending on whether the supplied object is within the Collection
	 *
	 * @access public
	 * @param $object
	 * @return bool
	 */
	public function hasObject( $object );

	/**
	 * remove
	 * detaches an object from the Collection
	 *
	 * @access public
	 * @param $object
	 * @return bool
	 */
	public function remove( $object );

	/**
	 * setCurrent
	 * advances pointer to the object whose identifier matches that which was provided
	 *
	 * @access public
	 * @param mixed $identifier
	 * @return boolean
	 */
	public function setCurrent( $identifier ) ;

	/**
	 * setCurrentUsingObject
	 * advances pointer to the provided object
	 *
	 * @access public
	 * @param $object
	 * @return boolean
	 */
	public function setCurrentUsingObject( $object );

	/**
	 * Returns the object occupying the index before the current object,
	 * unless this is already the first object, in which case it just returns the first object
	 *
	 * @return mixed
	 */
	public function previous();

		/**
	 * Returns the index of a given object, or false if not found
	 *
	 * @see http://stackoverflow.com/a/8736013
	 * @param $object
	 * @return boolean|int|string
	 */
	public function indexOf( $object );


	/**
	 * Returns the object at the given index
	 *
	 * @see http://stackoverflow.com/a/8736013
	 * @param $index
	 * @return mixed
	 */
	public function objectAtIndex( $index );

	/**
	 * Returns the sequence of objects as specified by the offset and length
	 *
	 * @see http://stackoverflow.com/a/8736013
	 * @param int $offset
	 * @param int $length
	 * @return array
	 */
	public function slice( $offset, $length );

	/**
	 * Inserts an object (or an array of objects) at a certain point
	 *
	 * @see http://stackoverflow.com/a/8736013
	 * @param mixed   $objects A single object or an array of objects
	 * @param integer $index
	 */
	public function insertAt( $objects, $index );

	/**
	 * Removes the object at the given index
	 *
	 * @see http://stackoverflow.com/a/8736013
	 * @param integer $index
	 */
	public function removeAt( $index ) ;


}
// End of file CollectionInterface.php
// Location: /CollectionInterface.php