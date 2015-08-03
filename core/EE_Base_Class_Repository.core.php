<?php if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * Class EE_Base_Class_Repository
 *
 * abstract storage entity for unique objects with persistence
 * extends EE_Object_Collection...
 * which extends SplObjectStorage, so therefore implements the
 * Countable, Iterator, Serializable, and ArrayAccess interfaces
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Brent Christensen
 * @since                4.6.31
 *
 */
abstract class EE_Base_Class_Repository extends EE_Object_Repository implements EEI_Deletable {

	/**
	 * EE_Base_Class_Repository constructor.
	 */
	public function __construct() {
		$this->persist_method = 'save';
	}



	/**
	 * save
	 *
	 * calls EE_Base_Class::save() on the current object
	 * an array of arguments can also be supplied that will be passed along to EE_Base_Class::save(),
	 * where each element of the $arguments array corresponds to a parameter for the callback method
	 * PLZ NOTE: if the first argument of the callback requires an array, for example array( 'key' => 'value' )
	 * then $arguments needs to be a DOUBLE array ie: array( array( 'key' => 'value' ) )
	 *
	 * @access public
	 * @param array $arguments	arrays of arguments that will be passed to the object's save method
	 * @return bool | int
	 */
	public function save( $arguments = array() ) {
		return $this->persist( 'save', $arguments );
	}



	/**
	 * save_all
	 *
	 * calls EE_Base_Class::save() on ALL objects in the repository
	 *
	 * @access public
	 * @return bool | int
	 */
	public function save_all() {
		return $this->persist_all( 'save' );
	}



	/**
	 * Calls EE_Base_Class::delete() on the current object
	 * Keep in mind that this always detaches the object from the collection
	 * regardless of whether the delete was successful for the db.  This is because
	 * its possible that the object ONLY existed in the collection.
	 *
	 * @access public
	 * @return bool
	 */
	public function delete() {
		$success = $this->_call_user_func_array_on_current( 'delete' );
		$this->remove( $this->current() );
		return $success;
	}



	/**
	 * delete_all
	 *
	 * calls EE_Base_Class::delete() on ALL objects in the repository
	 *
	 * @access public
	 * @return bool
	 */
	public function delete_all() {
		$success = true;
		$this->rewind();
		while ( $this->valid() ) {
			// any db error will result in false being returned
			$success = $this->_call_user_func_array_on_current( 'delete' ) !== false ? $success : false;
			// can't remove current object because valid() requires it
			// so just capture current object temporarily
			$object = $this->current();
			// advance the pointer
			$this->next();
			// THEN remove the object from the repository
			$this->remove( $object );
		}
		return $success;
	}



	/**
	 * update_extra_meta
	 *
	 * calls EE_Base_Class::update_extra_meta() on the current object using the supplied values
	 *
	 * @access public
	 * @param string $meta_key
	 * @param string $meta_value
	 * @param string $previous_value
	 * @return bool | int
	 */
	public function update_extra_meta( $meta_key, $meta_value, $previous_value = null ) {
		return $this->_call_user_func_array_on_current( 'update_extra_meta', array( $meta_key, $meta_value, $previous_value ) );
	}



}
// End of file EE_Base_Class_Repository.core.php
// Location: /core/EE_Base_Class_Repository.core.php