<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EE_Specific_Registrations_Line_Item_Filter
 *
 * Modifies the line item quantities to reflect only those items for the specified registrations.
 * Also, modifies NON-ticket regular line items (eg flat discounts and percent surcharges, etc)
 * to only show the share for the specified ticket quantities
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EE_Specific_Registrations_Line_Item_Filter extends EE_Line_Item_Filter_Base {
/**
	 * array of line item codes and their corresponding quantities for
	 * registrations that owe money and can pay at this moment
	 * @type array $_counts_per_line_item_code
	 */
	protected $_counts_per_line_item_code = array();

	/**
	 * Just kept in case we want it someday. Currently unused
	 * @var EE_Registration[]
	 */
	protected $_registrations = array();



	/**
	 * EE_Billable_Line_Item_Filter constructor.
	 * @param EE_Registration[] $registrations
	 */
	public function __construct( $registrations ) {
		$this->_registrations = $registrations;
		$this->_calculate_counts_per_line_item_code( $registrations );
	}

	/**
	 * sets the _counts_per_line_item_code from the provided registrations
	 * @param EE_Registration[] $registrations
	 * @return void
	 */
	protected function _calculate_counts_per_line_item_code( $registrations ) {
		foreach( $registrations as $registration ) {
			$line_item_code = EEM_Line_Item::instance()->get_var( EEM_Line_Item::instance()->line_item_for_registration_query_params( $registration, array( 'limit' => 1 ) ), 'LIN_code' );
			if( $line_item_code ) {
				if( ! isset( $this->_counts_per_line_item_code[ $line_item_code ] ) ) {
					$this->_counts_per_line_item_code[ $line_item_code ] = 1;
				}else{
					$this->_counts_per_line_item_code[ $line_item_code ]++;
				}
			}
		}
	}



	/**
	 * Creates a duplicate of the line item tree, except only includes billable items
	 * and the portion of line items attributed to billable things
	 * @param EEI_Line_Item      $line_item
	 * @return \EEI_Line_Item
	 */
	public function process( EEI_Line_Item $line_item ) {
		$this->_filter_billable_line_item( $line_item );
		if( ! $line_item->children() ) {
			return $line_item;
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
				if( $running_total_of_children ) {
					$percent_of_running_total = $original_li_total / $running_total_of_children;
				} else {
					$percent_of_running_total = 0;
				}

				$child_line_item->set_total( $runnign_total_of_children_under_consideration * $percent_of_running_total );
				if( ! $child_line_item->is_percent() ) {
					$child_line_item->set_unit_price( $child_line_item->total() / $child_line_item->quantity() );
				}
			}elseif( $line_item->type() === EEM_Line_Item::type_line_item &&
					$line_item->OBJ_type() === 'Ticket' ) {
				//make sure this item's quantity matches its parent
				if( ! $child_line_item->is_percent() ) {
					$child_line_item->set_quantity( $line_item->quantity() );
					$child_line_item->set_total( $child_line_item->unit_price() * $child_line_item->quantity() );
				}
			}
			$running_total_of_children += $original_li_total;
			$runnign_total_of_children_under_consideration += $child_line_item->total();
		}
		$line_item->set_total( $runnign_total_of_children_under_consideration );
		if( $line_item->quantity() ) {
			$line_item->set_unit_price( $runnign_total_of_children_under_consideration / $line_item->quantity() );
		} else {
			$line_item->set_unit_price( 0 );
		}
		return $line_item;
	}



	/**
	 * Adjusts quantities for line items for tickets according to the registrations provided
	 * in the constructor
	 * @param EEI_Line_Item $line_item
	 * @return EEI_Line_Item
	 */
	protected function _filter_billable_line_item( EEI_Line_Item $line_item ) {
		// is this a ticket ?
		if ( $line_item->type() === EEM_Line_Item::type_line_item && $line_item->OBJ_type() == 'Ticket' ) {
			// if this ticket is billable at this moment, then we should have a positive quantity
			if ( isset( $this->_counts_per_line_item_code[ $line_item->code() ] )) {
				// set quantity based on number of billable registrations for this ticket
				$quantity = $this->_counts_per_line_item_code[ $line_item->code() ];
			} else {
				$quantity = 0;
			}
			$line_item->set_quantity( $quantity );
			$line_item->set_total( $line_item->unit_price() * $line_item->quantity() );
		}
		return $line_item;
	}
}

// End of file EE_Specific_Registrations_Line_Item_Filter.class.php