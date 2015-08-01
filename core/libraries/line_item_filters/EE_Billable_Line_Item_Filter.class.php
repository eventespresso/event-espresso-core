<?php
if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * Class EE_Billable_Line_Item_Filter
 *
 * Filters line items to remove any that can not be billed for
 * as based on a list of EE_Registrations passed during construction.
 * Also, modifies NON-ticket regular line items (eg flat discounts and percent surcharges, etc)
 * to only show the share for the specified ticket quantities
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Brent Christensen / Mike Nelson
 * @since 				4.8.0
 *
 */
class EE_Billable_Line_Item_Filter extends EE_Modified_Ticket_Quantities_Line_Item_Filter {




	/**
	 * EE_Billable_Line_Item_Filter constructor.
	 * @param EE_Registration[] $registrations
	 */
	public function __construct( $registrations ) {
		parent::__construct( $this->_calculate_billable_ticket_quantities_from_registrations( $registrations ) );
	}



	/**
	 *    _calculate_billable_ticket_quantities_from_registrations
	 * compiles a list of EE_Tickets for each event in the passed array
	 *
	 * @access protected
	 * @param EE_Registration[] $registrations
	 * @return mixed
	 */
	protected function _calculate_billable_ticket_quantities_from_registrations( $registrations = array() ) {
		$billable_ticket_quantities = array();
		if ( ! empty( $registrations ) ) {
			// these reg statuses require payment (if event is not free)
			$requires_payment = EEM_Registration::reg_statuses_that_allow_payment();
			foreach ( $registrations as $registration ) {
				if ( ! $registration instanceof EE_Registration ) {
					continue;
				}
				// make sure ticket qty is set
				if ( ! isset( $billable_ticket_quantities[ $registration->ticket_ID() ] ) ) {
					$billable_ticket_quantities[ $registration->ticket_ID() ] = 0;
				}
				// are we billing for this registration at this moment ?
				if (
					$registration->owes_monies_and_can_pay( $requires_payment ) ||
					(
						// free registration with valid reg status
						$registration->final_price() == 0 &&
						in_array( $registration->status_ID(), $requires_payment )
					)
				) {
					// then increment the billable ticket quantity
					$billable_ticket_quantities[ $registration->ticket_ID() ]++;
				}
			}
		}
		return $billable_ticket_quantities;
	}
}
// End of file EE_Billable_Line_Item_Filter.class.php
// Location: /core/libraries/line_item_filters/EE_Billable_Line_Item_Filter.class.php