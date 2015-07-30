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
	 * an array of arguments can also be supplied that will be passed along to EE_Base_Class::save()
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
	 * delete
	 *
	 * calls EE_Base_Class::delete() on the current object
	 *
	 * @access public
	 * @return bool | int
	 */
	public function delete() {
		return $this->_call_user_func_array_on_current( 'delete' );
	}



	/**
	 * delete_all
	 *
	 * calls EE_Base_Class::delete() on ALL objects in the repository
	 *
	 * @access public
	 * @return bool | int
	 */
	public function delete_all() {
		return $this->_call_user_func_on_all( 'delete' );
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
		return $this->_call_user_func_array_on_current( 'delete', array( $meta_key, $meta_value, $previous_value ) );
	}



}
// End of file EE_Base_Class_Repository.core.php
// Location: /core/EE_Base_Class_Repository.core.php