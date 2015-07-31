<?php
if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 * Deletable Interface
 *
 * @package    Event Espresso
 * @subpackage interfaces
 * @since      4.8.0
 * @author     Brent Christensen
 */
interface EEI_Deletable {



	/**
	 * delete
	 *
	 * used for deleting the current object from the wherever the object is persisted ( ie: from the database, cache, session, etc )
	 *
	 * @access public
	 * @return bool | int
	 */
	public function delete();



}
// End of file EEI_Deletable.interface.php
// Location: /core/interfaces/line_items/EEI_Deletable.interface.php