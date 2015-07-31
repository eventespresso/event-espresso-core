<?php
if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * Class EE_Billable_Line_Item_Filter
 *
 * Filters line items to remove any that can not be billed for
 * as based on a list of EE_Registrations passed during construction
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Brent Christensen / Mike Nelson
 * @since 				4.8.0
 *
 */
class EE_Billable_Line_Item_Filter extends EE_Line_Item_Filter_Base {

	/**
	 * array of ticket IDs and their corresponding quantities for
	 * registrations that owe money and can pay at this moment
	 * @type array $_billable_ticket_quantities
	 */
	protected $_billable_ticket_quantities = array();



	/**
	 * EE_Billable_Line_Item_Filter constructor.
	 * @param EE_Registration[] $registrations
	 */
	public function __construct( $registrations ) {
		$this->_billable_ticket_quantities = $this->_calculate_billable_ticket_quantities_from_registrations( $registrations );
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



	/**
	 * Creates a duplicate of the line item tree, except only includes billable items
	 * and the portion of line items attributed to billable things
	 * @param EEI_Line_Item      $line_item
	 * @return \EEI_Line_Item
	 */
	public function process( EEI_Line_Item $line_item ) {
		$billable_line_item = $this->_filter_billable_line_item( $line_item );
		if ( ! $billable_line_item instanceof EEI_Line_Item ) {
			return null;
		}
		foreach ( $line_item->children() as $child_line_item ) {
			$this->process( $child_line_item );
		}
		return $billable_line_item;
	}



	/**
	 * Creates a new, unsaved line item from $line_item that factors in the
	 * number of billable registrations on $registrations.
	 * @param EEI_Line_Item $line_item
	 * @return EEI_Line_Item
	 */
	protected function _filter_billable_line_item( EEI_Line_Item $line_item ) {
		// is this a ticket ?
		if ( $line_item->type() === EEM_Line_Item::type_line_item && $line_item->OBJ_type() == 'Ticket' ) {
			// if this ticket is billable at this moment, then we should have a positive quantity
			if ( isset( $this->_billable_ticket_quantities[ $line_item->OBJ_ID() ] )) {
				// set quantity based on number of billable registrations for this ticket
				$line_item->set_quantity( $this->_billable_ticket_quantities[ $line_item->OBJ_ID() ] );
			}
		}
		return $line_item;
	}



}
// End of file EE_Billable_Line_Item_Filter.class.php
// Location: /core/libraries/line_item_filters/EE_Billable_Line_Item_Filter.class.php