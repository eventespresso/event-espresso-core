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
	 * used for persisting the current object ( ie: to the database, cache, session, etc )
	 * can be supplied with a "persistence callback" on a per method call basis,
	 * or the $persist_method property can be set in the class constructor,
	 * for providing how to persist an object such as session caching, etc...
	 * an array of arguments can also be supplied that will be passed along to the object's persistence method
	 *
	 * @access public
	 * @param string $persistence_callback  name of method found on object that can be used for persisting the object
	 * @param array  $persistence_arguments arrays of arguments that will be passed to the object's persistence method
	 * @return bool | int
	 * @throws \EE_Error
	 */
	public function persist( $persistence_callback = '', $persistence_arguments = array() );



	/**
	 * persist_all
	 *
	 * calls \EEI_Repository::persist() on all objects within the repository
	 *
	 * @access public
	 * @param string $persistence_callback name of method found on object that can be used for persisting it
	 * @return bool | int
	 */
	public function persist_all( $persistence_callback = '' );

	}
// End of file EEI_Repository.interface.php
// Location: /core/interfaces/line_items/EEI_Repository.interface.php