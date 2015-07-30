<?php
if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 * Repository Interface
 *
 * @package    Event Espresso
 * @subpackage interfaces
 * @since      4.8.0
 * @author     Brent Christensen
 */
interface EEI_Repository extends EEI_Collection {



	/**
	 * persist
	 *
	 * primarily used for saving EE_Base_Class classes to the database,
	 * but can be supplied with a "persistence callback" that can be used for classes that are not instances of EE_Base_Class,
	 * or for providing alternate ways to persist an object such as session caching, etc...
	 * an array of arguments can also be supplied that will be passed along to the object's persistence method
	 *
	 * @access public
	 * @param object $object
	 * @param string $persistence_callback  name of method found on object that can be used for persisting the object
	 * @param array  $persistence_arguments arrays of arguments that will be passed to the object's persistence method
	 * @return bool | int
	 * @throws \EE_Error
	 */
	public function persist( $object, $persistence_callback = '', $persistence_arguments = array() );


}
// End of file EEI_Repository.interface.php
// Location: /core/interfaces/line_items/EEI_Repository.interface.php