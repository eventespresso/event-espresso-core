<?php if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * Class EE_Object_Repository
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
abstract class EE_Object_Repository extends EE_Object_Collection implements EEI_Repository {

	/**
	 * default persist method called on repository objects if none supplied
	 * @type string $persist_method
	 */
	protected $persist_method;


	/**
	 * _call_user_func_array_on_current
	 *
	 * calls the supplied callback method name on the current repository object,
	 * an array of arguments can also be supplied that will be passed along to the callback method,
	 * where each element of the $arguments array corresponds to a parameter for the callback method
	 * PLZ NOTE: if the first argument of the callback requires an array, for example array( 'key' => 'value' )
	 * then $arguments needs to be a DOUBLE array ie: array( array( 'key' => 'value' ) )
	 *
	 * @access public
	 * @param string $callback 		name of method found on object to be called.
	 * @param array $arguments	arrays of arguments that will be passed to the object's callback method
	 * @return bool | int
	 */
	protected function _call_user_func_array_on_current( $callback = '', $arguments = array() ) {
		if ( $callback !== '' && method_exists( $this->current(), $callback ) ) {
			return call_user_func_array( array( $this->current(), $callback ), $arguments );
		}
		return false;
	}



	/**
	 * _call_user_func_on_all
	 *
	 * calls the supplied callback method name on ALL repository objects,
	 *
	 * @access public
	 * @param string $callback  name of method found on repository objects to be called
	 * @return bool | int
	 */
	protected function _call_user_func_on_all( $callback = '' ) {
		$success = true;
		if ( $this->valid() ) {
			$this->rewind();
			while ( $this->valid() ) {
				// any negative result will toggle success to false
				$success = $this->_call_user_func_array_on_current( $callback ) ? $success : false;
				$this->next();
			}
			$this->rewind();
		}
		return $success;
	}



	/**
	 * persist
	 *
	 * primarily used for saving EE_Base_Class classes to the database,
	 * but can be supplied with a "persistence callback" that can be used for classes that are not instances of EE_Base_Class,
	 * or for providing alternate ways to persist an object such as session caching, etc...
	 * an array of arguments can also be supplied that will be passed along to the object's persistence method
	 *
	 * @access public
	 * @param string 	$persistence_callback 	name of method found on object that can be used for persisting the object
	 *                                        								defaults to EE_Object_Repository::$persist_method
	 * @param array 	$persistence_arguments	arrays of arguments that will be passed to the object's persistence method
	 * @return bool | int
	 */
	public function persist( $persistence_callback = '', $persistence_arguments = array() ) {
		$persistence_callback = ! empty( $persistence_callback ) ? $persistence_callback : $this->persist_method;
		return $this->_call_user_func_array_on_current( $persistence_callback, $persistence_arguments );
	}



	/**
	 * persist_all
	 *
	 * calls \EE_Object_Repository::persist() on all objects within the repository
	 *
	 * @access public
	 * @param string 	$persistence_callback 		name of method found on object that can be used for persisting the object
	 * @return bool | int
	 */
	public function persist_all( $persistence_callback = '' ) {
		$persistence_callback = ! empty( $persistence_callback ) ? $persistence_callback : $this->persist_method;
		return $this->_call_user_func_on_all( $persistence_callback );
	}



}
// End of file EE_Object_Repository.core.php
// Location: /core/EE_Object_Repository.core.php