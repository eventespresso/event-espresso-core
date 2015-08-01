<?php
if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 * Line Item Filter Interface
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