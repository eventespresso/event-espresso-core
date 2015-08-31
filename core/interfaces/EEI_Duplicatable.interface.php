<?php
if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 * Duplicatable Interface for things that that be duplicated
 *
 * @package    Event Espresso
 * @subpackage interfaces
 * @since      4.8.9
 * @author     Mike Nelson
 */
interface EEI_Duplicatable {



	/**
	 * duplicate
	 *
	 * used for duplicating the current object and its related dependent data
	 *
	 * @access public
	 * @param array $options key-value pairs of special options for duplicating, which varies by implemtor.
	 *	For example, it might have an option to duplicate related data or not, or to make a duplicate
	 *	with the exception of a particular attribute
	 * @return object of the same class as what was called on
	 */
	public function duplicate( $options = array() );



}
// End of file EEI_Duplicatable.interface.php
// Location: /core/interfaces/line_items/EEI_Duplicatable.interface.php