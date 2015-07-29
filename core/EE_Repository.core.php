<?php if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * Class EE_Repository
 *
 * abstract storage entity for unique objects with persistence
 * extends EE_Collection...
 * which extends SplObjectStorage, so therefore implements the
 * Countable, Iterator, Serializable, and ArrayAccess interfaces
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Brent Christensen
 * @since                4.6.31
 *
 */
abstract class EE_Repository extends EE_Collection implements EEI_Repository {



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



}
// End of file EE_Repository.core.php
// Location: /core/EE_Repository.core.php