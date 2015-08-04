<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EE_Modified_Ticket_Quantities_Line_Item_Filter
 *
 * Modifies the ticket quantities for line items for tickets according to
 * the $billable_ticket_quantities supplied in the constructor.
 * Also, modifies NON-ticket regular line items (eg flat discounts and percent surcharges, etc)
 * to only show the share for the specified ticket quantities
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EE_Modified_Ticket_Quantities_Line_Item_Filter extends EE_Line_Item_Filter_Base {
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
	public function __construct( $billable_ticket_quantities ) {
		$this->_billable_ticket_quantities = $billable_ticket_quantities;
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
		//the original running total (taking ALL tickets into account)
		$running_total_of_children = 0;
		//the new running total (only taking the specified ticket quantities into account)
		$runnign_total_of_children_under_consideration = 0;
		foreach ( $line_item->children() as $child_line_item ) {
			if( $child_line_item->is_percent() ) {
				$original_li_total = $running_total_of_children * $child_line_item->percent() / 100;
			}else{
				$original_li_total = $child_line_item->unit_price() * $child_line_item->quantity();
			}
			$this->process( $child_line_item );
			/*
			 * If this line item is a normal line item that isn't for a ticket
			 * we want to modify its total (and unit price if not a percentage line item)
			 * so it reflects only that portion of the surcharge/discount shared by these
			 * registrations
			 */
			if( $child_line_item->type() === EEM_Line_Item::type_line_item &&
					$child_line_item->OBJ_type() !== 'Ticket' ) {

				$percent_of_running_total = $original_li_total / $running_total_of_children;
				$child_line_item->set_total( $runnign_total_of_children_under_consideration * $percent_of_running_total );
				if( ! $child_line_item->is_percent() ) {
					$child_line_item->set_unit_price( $child_line_item->total() / $child_line_item->quantity() );
				}
			}
			$running_total_of_children += $original_li_total;
			$runnign_total_of_children_under_consideration += $child_line_item->total();
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
				$line_item->set_total( $line_item->unit_price() * $line_item->quantity() );
			}
		}
		return $line_item;
	}
}

// End of file EE_Modified_Ticket_Quantities_Line_Item_Filter.class.php