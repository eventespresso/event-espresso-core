<?php
if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * Class EE_Non_Zero_Line_Item_Filter
 *
 * Filters line items to remove :
 * 		subtotals with a total of 0
 * 		line items with a quantity of 0
 *
 * @package               Event Espresso
 * @subpackage            core
 * @author                Brent Christensen
 * @since                 $VID:$
 *
 */
class EE_Non_Zero_Line_Item_Filter extends EE_Line_Item_Filter_Base {

	/**
	 * EE_Non_Zero_Line_Item_Filter constructor.
	 */
	public function __construct() {
	}



	/**
	 * Creates a duplicate of the line item tree, except only includes billable items
	 * and the portion of line items attributed to billable things
	 * @param EEI_Line_Item $line_item
	 * @return \EEI_Line_Item
	 */
	public function process( EEI_Line_Item $line_item ) {
		$non_zero_line_item = $this->_filter_zero_line_item( $line_item );
		if ( ! $non_zero_line_item instanceof EEI_Line_Item ) {
			return null;
		}
		//if this is an event subtotal, we want to only include it if it
		//has a non-zero total and at least one ticket line item child
		if( $line_item->children() ) {
			$ticket_or_subtotals_with_tkt_children_count = 0;
			foreach ( $line_item->children() as $child_line_item ) {
				$code = $child_line_item->code();
				$child_line_item = $this->process( $child_line_item );
				if( ! $child_line_item instanceof EEI_Line_Item ) {
					$line_item->delete_child_line_item( $code );
					continue;
				}
				if (
					( $child_line_item instanceof EEI_Line_Item &&
					$child_line_item->type() === EEM_Line_Item::type_line_item &&
					$child_line_item->OBJ_type() === 'Ticket' ) ||
					( $child_line_item instanceof EEI_Line_Item &&
					 $child_line_item->type() === EEM_Line_Item::type_sub_total )
				) {
					$ticket_or_subtotals_with_tkt_children_count++;
				}
			}
			// if this is an event subtotal with NO ticket children
			// we basically want to ignore it
			return $this->_filter_zero_subtotal_line_item( $non_zero_line_item, $ticket_or_subtotals_with_tkt_children_count );
		}else{
			return $non_zero_line_item;
		}
	}



	/**
	 * Creates a new, unsaved line item, but if it's a ticket line item
	 * with a total of 0, or a subtotal of 0, returns null instead
	 * @param EEI_Line_Item $line_item
	 * @return EEI_Line_Item
	 */
	protected function _filter_zero_line_item( EEI_Line_Item $line_item ) {
		if (
			$line_item->type() === EEM_Line_Item::type_line_item &&
			$line_item->OBJ_type() === 'Ticket' &&
			$line_item->quantity() == 0
		) {
			return null;
		}
		return $line_item;
	}



	/**
	 * Creates a new, unsaved line item, but if it's a ticket line item
	 * with a total of 0, or a subtotal of 0, returns null instead
	 * @param EEI_Line_Item $line_item
	 * @param int           $ticket_children
	 * @return \EEI_Line_Item
	 */
	protected function _filter_zero_subtotal_line_item( EEI_Line_Item $line_item, $ticket_children = 0 ) {
		if (
			$line_item->type() === EEM_Line_Item::type_sub_total &&
			$ticket_children === 0
		) {
			return null;
		}
		return $line_item;
	}



}



// End of file EE_NonZero_Line_Item_Filter.strategy.php
// Location: /core/libraries/line_item_filters/EE_NonZero_Line_Item_Filter.strategy.php