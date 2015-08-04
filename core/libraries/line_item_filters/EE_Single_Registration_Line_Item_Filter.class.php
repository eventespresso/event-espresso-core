<?php
if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * Class EE_Single_Registration_Line_Item_Filter
 *
 * Filters line items to remove any that aren't for the specified registration.
 * Also, other price modifiers, like discounts or surcharges, must be shared between
 * this registration and others, so this tree should only show this registration's share.
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Brent Christensen / Mike Nelson
 * @since 				4.8.0
 *
 */
class EE_Single_Registration_Line_Item_Filter extends EE_Specific_Registrations_Line_Item_Filter {

	/**
	 *
	 * @param EE_Registration $registration
	 */
	public function __construct( $registration ) {
		parent::__construct( array( $registration ) );
	}
}
// End of file EE_Single_Registration_Line_Item_Filter.class.php
// Location: /core/libraries/line_item_filters/EE_Single_Registration_Line_Item_Filter.class.php