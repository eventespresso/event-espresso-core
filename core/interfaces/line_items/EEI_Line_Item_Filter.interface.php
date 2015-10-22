<?php
if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 * Line Item Filter Interface
 *
 * Defines the contract required by classes that employ EE_Line_Item_Filters
 * the process() method accepts an EEI_Line_Item object
 * and returns an EEI_Line_Item object that may or may not have been modified
 * OR can even return null if the line item should be removed entirely
 *
 * @package    Event Espresso
 * @subpackage interfaces
 * @since      4.8.0
 * @author     Brent Christensen
 */
interface EEI_Line_Item_Filter {



	/**
	 * process
	 *
	 * @param \EEI_Line_Item $line_item
	 * @return \EEI_Line_Item
	 */
	public function process( EEI_Line_Item $line_item );



}
// End of file EEI_Line_Item_Filter.interface.php
// Location: /core/interfaces/line_items/EEI_Line_Item_Filter.interface.php