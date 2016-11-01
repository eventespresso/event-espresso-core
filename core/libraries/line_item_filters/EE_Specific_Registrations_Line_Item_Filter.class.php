<?php
if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * EE_Specific_Registrations_Line_Item_Filter
 * Modifies the line item quantities to reflect only those items for the specified registrations.
 * Also, modifies NON-ticket regular line items (eg flat discounts and percent surcharges, etc)
 * to only show the share for the specified ticket quantities
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 */
class EE_Specific_Registrations_Line_Item_Filter extends EE_Line_Item_Filter_Base {

	/**
	 * array of line item codes and their corresponding quantities for registrations
	 *
	 * @type array $_line_item_registrations
	 */
	protected $_line_item_registrations = array();

	/**
	 * Just kept in case we want it someday. Currently unused
	 *
	 * @var EE_Registration[]
	 */
	protected $_registrations = array();

	/**
	 * @var EE_Registration
	 */
	protected $_current_registration;

	/**
	 * these reg statuses should NOT increment the line item quantity
	 *
	 * @var array
	 */
	protected $_closed_reg_statuses = array();



	/**
	 * EE_Billable_Line_Item_Filter constructor.
	 *
	 * @param EE_Registration[] $registrations
	 */
	public function __construct( $registrations ) {
		$this->_registrations = $registrations;
		$this->_calculate_registrations_per_line_item_code( $registrations );
		// these reg statuses should NOT increment the line item quantity
		$this->_closed_reg_statuses = EEM_Registration::closed_reg_statuses();
	}



	/**
	 * sets the _line_item_registrations from the provided registrations
	 *
	 * @param EE_Registration[] $registrations
	 * @return void
	 */
	protected function _calculate_registrations_per_line_item_code( $registrations ) {
		foreach ( $registrations as $registration ) {
			$line_item_code = EEM_Line_Item::instance()->get_var(
				EEM_Line_Item::instance()->line_item_for_registration_query_params(
					$registration,
					array( 'limit' => 1 )
				),
				'LIN_code'
			);
			if ( $line_item_code ) {
				if ( ! isset( $this->_line_item_registrations[ $line_item_code ] ) ) {
					$this->_line_item_registrations[ $line_item_code ] = array();
				}
				$this->_line_item_registrations[ $line_item_code ][ $registration->ID() ] = $registration;
			}
		}
	}



	/**
	 * Creates a duplicate of the line item tree, except only includes billable items
	 * and the portion of line items attributed to billable things
	 *
	 * @param EEI_Line_Item $line_item
	 * @return \EEI_Line_Item
	 */
	public function process( EEI_Line_Item $line_item ) {
		$this->_adjust_line_item_quantity( $line_item );
		if ( ! $line_item->children() ) {
			return $line_item;
		}
		//the original running total (taking ALL tickets into account)
		$running_total_of_children = 0;
		//the new running total (only taking the specified ticket quantities into account)
		$running_total_of_children_under_consideration = 0;
		// let's also track the quantity of tickets that pertain to the registrations
		$total_child_ticket_quantity = 0;
		foreach ( $line_item->children() as $child_line_item ) {
			$original_li_total = $child_line_item->is_percent()
				? $running_total_of_children * $child_line_item->percent() / 100
				: $child_line_item->unit_price() * $child_line_item->quantity();
			$this->process( $child_line_item );
			// If this line item is a normal line item that isn't for a ticket,
			// we want to modify its total (and unit price if not a percentage line item)
			// so it reflects only that portion of the surcharge/discount shared by these registrations
			if (
				$child_line_item->type() === EEM_Line_Item::type_line_item
				&& $child_line_item->OBJ_type() !== 'Ticket'
			) {
				$percent_of_running_total = $running_total_of_children
					? $original_li_total / $running_total_of_children
					: 0;
				$child_line_item->set_total(
					$running_total_of_children_under_consideration * $percent_of_running_total
				);
				if ( ! $child_line_item->is_percent() ) {
					$child_line_item->set_unit_price( $child_line_item->total() / $child_line_item->quantity() );
				}
			} else if (
				$line_item->type() === EEM_Line_Item::type_line_item
				&& $line_item->OBJ_type() === 'Ticket'
			) {
				//make sure this item's quantity and total matches its parent
				if (
					// but not if it's a percentage modifier
					! $child_line_item->is_percent()
					&& ! (
						// or a cancellation
						$child_line_item->is_cancelled()
						&& ! (
							// unless it IS a cancellation and the current registration is cancelled
							$child_line_item->is_cancelled()
							&& $this->_current_registration instanceof EE_Registration
							&& in_array( $this->_current_registration->status_ID(), $this->_closed_reg_statuses )
						)
					)
				) {
					$child_line_item->set_quantity( $line_item->quantity() );
					$child_line_item->set_total( $child_line_item->unit_price() * $child_line_item->quantity() );
				}
			}
			$running_total_of_children += $original_li_total;
			$running_total_of_children_under_consideration += $child_line_item->total();
			if ( $child_line_item->OBJ_type() == 'Ticket' ) {
				$total_child_ticket_quantity += $child_line_item->quantity();
			}
		}
		$line_item->set_total( $running_total_of_children_under_consideration );
		if ( $line_item->quantity() ) {
			$line_item->set_unit_price( $running_total_of_children_under_consideration / $line_item->quantity() );
		} else {
			$line_item->set_unit_price( 0 );
		}
		if ( $line_item->OBJ_type() == 'Event' ) {
			$line_item->set_quantity( $total_child_ticket_quantity );
		}
		return $line_item;
	}



	/**
	 * Adjusts quantities for line items for tickets according to the registrations provided
	 * in the constructor
	 *
	 * @param EEI_Line_Item $line_item
	 * @return EEI_Line_Item
	 */
	protected function _adjust_line_item_quantity( EEI_Line_Item $line_item ) {
		// is this a ticket ?
		if ( $line_item->type() === EEM_Line_Item::type_line_item && $line_item->OBJ_type() == 'Ticket' ) {
			$this->_current_registration = null;
			$quantity = 0;
			// if this ticket is billable at this moment, then we should have a positive quantity
			if (
				isset( $this->_line_item_registrations[ $line_item->code() ] )
				&& is_array( $this->_line_item_registrations[ $line_item->code() ] )
			) {
				// set quantity based on number of open registrations for this ticket
				foreach ( $this->_line_item_registrations[ $line_item->code() ] as $registration ) {
					if (
						$registration instanceof EE_Registration
					) {
						$quantity++;
						$this->_current_registration = $registration;
					}
				}
			}
			$line_item->set_quantity( $quantity );
			$line_item->set_total( $line_item->unit_price() * $line_item->quantity() );
		}
		return $line_item;
	}
}

// End of file EE_Specific_Registrations_Line_Item_Filter.class.php