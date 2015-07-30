<?php if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * Class EE_Base_Class_Repository
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
abstract class EE_Base_Class_Repository extends EE_Collection implements EEI_Repository {



	/**
	 * persistObject
	 *
	 * used for saving EE_Base_Class classes to the database,
	 * an array of arguments can also be supplied that will be passed along to EE_Base_Class::save()
	 *
	 * @access protected
	 * @param object 	$object
	 * @param array 	$persistence_arguments	arrays of arguments that will be passed to the object's persistence method
	 * @return bool | int
	 * @throws \EE_Error
	 */
	protected function persistObject( $object, $persistence_arguments = array() ) {
		if ( $this->contains( $object ) ) {
			$this->rewind();
			while ( $this->valid() ) {
				if ( $object === $this->current() ) {
					$success = $object->save( $persistence_arguments );
					$this->rewind();
					return $success;
				}
				$this->next();
			}
		}
		return false;
	}



}
// End of file EE_Base_Class_Repository.core.php
// Location: /core/EE_Base_Class_Repository.core.php