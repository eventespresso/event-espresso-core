<?php
if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * Class EE_Line_Item_Filter_Collection
 *
 * An EE_Object_Collection object that type checks
 * for EEI_Line_Item_Filter objects when adding to the collection
 *
 * @package               Event Espresso
 * @subpackage            core
 * @author                Brent Christensen
 * @since                 4.8.0
 *
 *
 *
 */
class EE_Line_Item_Filter_Collection extends EE_Object_Collection {



	/**
	 * EE_Line_Item_Filter_Collection constructor.
	 */
	public function __construct() {
		$this->interface = 'EEI_Line_Item_Filter';
	}



}
// End of file EE_Line_Item_Filter_Collection.class.php
// Location: /core/libraries/line_item_filters/EE_Line_Item_Filter_Collection.class.php