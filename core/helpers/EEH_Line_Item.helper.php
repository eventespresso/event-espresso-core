<?php if (!defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 *
 * EEH_Line_Item
 *
 * This should be the main class which is aware of the line item tree structure, and
 * should take care of common operations like inserting items into it, updating
 * items in it based on what the line items are for, and removed line items.
 * All this logic was originally contained in EE_Cart, but because there are
 * actually other places that need to modify the record of what was purchased
 * (eg when a PayPal IPN is received, if PayPal changes the taxes, we need to update the line items;
 * or admin-side cancellations etc).
 * Generally all these functions will first take the total line item and figure things out from there
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EEH_Line_Item {
	//other functions: cancel ticket purchase
	//delete ticket purchase
	//add promotion
	/**
	 * Adds a simple item ( unrelated to any other model object) to the total line item,
	 * in the correct spot in the line item tree (also verifying it doesn't add a duplicate
	 * based on the LIN_code)
	 * @param EE_Line_Item $total_line_item
	 * @param string $name
	 * @param float $unit_price
	 * @param string $description
	 * @param int $quantity
	 * @param boolean $taxable
	 * @param boolean $code if set to a value, ensures there is only one line item with that code
	 * @return boolean success
	 */
	public static function add_unrelated_item( EE_Line_Item $total_line_item, $name, $unit_price, $description = '', $quantity = 1, $taxable = FALSE, $code = NULL  ){
		$items_subtotal = self::get_items_subtotal( $total_line_item );
		$line_item = EE_Line_Item::new_instance(array(
			'LIN_name' => $name,
			'LIN_desc' => $description,
			'LIN_unit_price' => $unit_price,
			'LIN_quantity' => $quantity,
			'LIN_is_taxable' => $taxable,
			'LIN_order' => $items_subtotal instanceof EE_Line_Item ? count( $items_subtotal->children() ) : 0,
			'LIN_total' => floatval( $unit_price ) * intval( $quantity ),
			'LIN_type'=>  EEM_Line_Item::type_line_item,
			'LIN_code' => $code,
		));
		return self::add_item($total_line_item, $line_item );
	}



	/**
	 * Returns the new line item created by adding a purchase of the ticket
	 * @param EE_Line_Item $total_line_item of type EEM_Line_Item::type_total
	 * @param EE_Ticket $ticket
	 * @param int $qty
	 * @return EE_Line_Item
	 */
	public static function add_ticket_purchase( EE_Line_Item $total_line_item, EE_Ticket $ticket, $qty = 1 ){
		$line_item = self::increment_ticket_qty_if_already_in_cart( $total_line_item, $ticket, $qty );
		if ( ! $line_item instanceof EE_Line_Item ) {
			$line_item = self::create_ticket_line_item( $total_line_item, $ticket, $qty );
		}
		self::add_item( $total_line_item, $line_item );
		return $line_item;
	}



	/**
	 * Returns the new line item created by adding a purchase of the ticket
	 * @param \EE_Line_Item $total_line_item
	 * @param EE_Ticket $ticket
	 * @param int $qty
	 * @return \EE_Line_Item
	 * @throws \EE_Error
	 */
	public static function increment_ticket_qty_if_already_in_cart( EE_Line_Item $total_line_item, EE_Ticket $ticket, $qty = 1 ) {
		$line_item = null;
		if ( $total_line_item instanceof EE_Line_Item && $total_line_item->is_total() ) {
			$tickets_subtotal_line_item = $total_line_item->get_child_line_item( 'tickets' );
			if ( $tickets_subtotal_line_item instanceof EE_Line_Item && $tickets_subtotal_line_item->is_sub_total() ) {
				$ticket_line_items = $total_line_item->get_child_line_item( 'tickets' )->children();
				foreach ( (array)$ticket_line_items as $ticket_line_item ) {
					if ( $ticket_line_item instanceof EE_Line_Item && $ticket_line_item->OBJ_ID() == $ticket->ID() ) {
						$line_item = $ticket_line_item;
						break;
					}
				}
			}
		}
		if ( $line_item instanceof EE_Line_Item ) {
			$qty += $line_item->quantity();
			$line_item->set_quantity( $qty );
			$line_item->set_total( $line_item->unit_price() * $qty );
			$line_item->save();
			return $line_item;
		}
		return null;
	}



	/**
	 * Returns the new line item created by adding a purchase of the ticket
	 * @param EE_Line_Item $total_line_item of type EEM_Line_Item::type_total
	 * @param EE_Ticket $ticket
	 * @param int $qty
	 * @return EE_Line_Item
	 */
	public static function create_ticket_line_item( EE_Line_Item $total_line_item, EE_Ticket $ticket, $qty = 1 ) {
		$datetimes = $ticket->datetimes();
		$event_names = array();
		foreach ( $datetimes as $datetime ) {
			$event = $datetime->event();
			$event_names[ $event->ID() ] = $event->name();
		}
		$description_addition = sprintf( __( ' (For %1$s)', 'event_espresso' ), implode(", ",$event_names) );
		$full_description = $ticket->description() . $description_addition;
		$items_subtotal = self::get_items_subtotal( $total_line_item );
		// add $ticket to cart
		$line_item = EE_Line_Item::new_instance( array(
			'LIN_name'       => $ticket->name(),
			'LIN_desc'       => $full_description,
			'LIN_unit_price' => $ticket->price(),
			'LIN_quantity'   => $qty,
			'LIN_is_taxable' => $ticket->taxable(),
			'LIN_order'      => $items_subtotal instanceof EE_Line_Item ? count( $items_subtotal->children() ) : 0,
			'LIN_total'      => $ticket->price() * $qty,
			'LIN_type'       => EEM_Line_Item::type_line_item,
			'OBJ_ID'         => $ticket->ID(),
			'OBJ_type'       => 'Ticket'
		) );
		//now add the sub-line items
		$running_total_for_ticket = 0;
		foreach ( $ticket->prices( array( 'order_by' => array( 'PRC_order' => 'ASC' ) ) ) as $price ) {
			$sign = $price->is_discount() ? -1 : 1;
			$price_total = $price->is_percent() ? $running_total_for_ticket * $price->amount() / 100 : $price->amount() * $qty;
			$sub_line_item = EE_Line_Item::new_instance( array(
				'LIN_name'       => $price->name(),
				'LIN_desc'       => $price->desc(),
				'LIN_quantity'   => $price->is_percent() ? null : $qty,
				'LIN_is_taxable' => false,
				'LIN_order'      => $price->order(),
				'LIN_total'      => $sign * $price_total,
				'LIN_type'       => EEM_Line_Item::type_sub_line_item,
				'OBJ_ID'         => $price->ID(),
				'OBJ_type'       => 'Price'
			) );
			if ( $price->is_percent() ) {
				$sub_line_item->set_percent( $sign * $price->amount() );
			} else {
				$sub_line_item->set_unit_price( $sign * $price->amount() );
			}
			$running_total_for_ticket += $price_total;
			$line_item->add_child_line_item( $sub_line_item );
		}
		return $line_item;
	}



	/**
	 * Adds the specified item in teh appropriate place in the line item tree
	 * @param EE_Line_Item $total_line_item
	 * @param EE_Line_Item $item to be added
	 * @return boolean
	 */
	public static function add_item(EE_Line_Item $total_line_item, EE_Line_Item $item ){
		// add item to cart
		$ticket_items = self::get_items_subtotal( $total_line_item );
		if($ticket_items){
			$success = $ticket_items->add_child_line_item($item);
		}else{
			return FALSE;
		}
		// recalculate cart totals based on new items
		$total_line_item->recalculate_total_including_taxes();
		return $success;

	}



	/**
	 * Gets the line item which contains the subtotal of all the items
	 * @param EE_Line_Item $total_line_item of type EEM_Line_Item::type_total
	 *	@return \EE_Line_Item
	 */
	public static function get_items_subtotal( EE_Line_Item $total_line_item ){
		$tickets = $total_line_item->get_child_line_item('tickets');
		return $tickets ? $tickets : self::create_default_items_subtotal( $total_line_item );
	}



	/**
	 * Gets the line item for the taxes subtotal
	 * @param EE_Line_Item $total_line_item of type EEM_Line_Item::type_total
	 * @return \EE_Line_Item
	 */
	public static function get_taxes_subtotal( EE_Line_Item $total_line_item ){
		$taxes = $total_line_item->get_child_line_item('taxes');
		return $taxes ? $taxes : self::create_default_taxes_subtotal( $total_line_item );
	}



	/**
	 * Creates a new default total line item for the transaction,
	 * and its tickets subtotal and taxes subtotal line items (and adds the
	 * existing taxes as children of the taxes subtotal line item)
	 * @param EE_Transaction $transaction
	 * @return \EE_Line_Item of type total
	 */
	public static function create_default_total_line_item( $transaction = NULL){
		$line_item = EE_Line_Item::new_instance(array(
			'LIN_code'=>'total',
			'LIN_name'=>  __('Grand Total', 'event_espresso'),
			'LIN_type'=>  EEM_Line_Item::type_total,
			'OBJ_type'=>'Transaction'
		));
		if( $transaction ){
			$transaction = EEM_Transaction::instance()->ensure_is_ID( $transaction );
			$line_item->set_TXN_ID( $transaction );
		}
		self::create_default_items_subtotal( $line_item, $transaction );
		self::create_default_taxes_subtotal( $line_item, $transaction );
		return $line_item;
	}



	/**
	 * Creates a default items subtotal line item
	 * @param EE_Line_Item $total_line_item
	 * @param EE_Transaction $transaction
	 * @return EE_Line_Item
	 */
	protected static function create_default_items_subtotal(EE_Line_Item  $total_line_item, $transaction = NULL ){
		$items_line_item = EE_Line_Item::new_instance(array(
			'LIN_code'=>'tickets',
			'LIN_name'=>  __('Tickets', 'event_espresso'),
			'LIN_type'=>  EEM_Line_Item::type_sub_total
		));
		if( $transaction ){
			$transaction = EEM_Transaction::instance()->ensure_is_ID( $transaction );
			$total_line_item->set_TXN_ID( $transaction );
		}
		$total_line_item->add_child_line_item($items_line_item);
		return $items_line_item;
	}



	/**
	 * Creates a line item for the taxes subtotal and finds all the tax prices
	 * and applies taxes to it
	 * @param EE_Line_Item $total_line_item of type EEM_Line_Item::type_total
	 * @param EE_Transaction $transaction
	 * @return EE_Line_Item
	 */
	protected static function create_default_taxes_subtotal( EE_Line_Item $total_line_item, $transaction = NULL ){
		$tax_line_item = EE_Line_Item::new_instance(array(
			'LIN_code'=>'taxes',
			'LIN_name'=> __('Taxes', 'event_espresso'),
			'LIN_type'=>  EEM_Line_Item::type_tax_sub_total
		));
		if( $transaction ){
			$transaction = EEM_Transaction::instance()->ensure_is_ID( $transaction );
			$total_line_item->set_TXN_ID( $transaction );
		}
		$total_line_item->add_child_line_item($tax_line_item);
		//and lastly, add the actual taxes
		self::apply_taxes( $total_line_item );
		return $tax_line_item;
	}



	/**
	 * Finds what taxes should apply, adds them as tax line items under the taxes sub-total,
	 * and recalculates the taxes sub-total and the grand total. Resets the taxes, so
	 * any old taxes are removed
	 * @param EE_Line_Item $total_line_item of type EEM_Line_Item::type_total
	 */
	public static function apply_taxes( EE_Line_Item $total_line_item ){
		// get array of taxes via Price Model
		$ordered_taxes = EE_Registry::instance()->load_model( 'Price' )->get_all_prices_that_are_taxes();
		ksort( $ordered_taxes );
		$taxes_line_item = self::get_taxes_subtotal( $total_line_item );
		//just to be safe, remove its old tax line items
		$taxes_line_item->delete_children_line_items();
		//loop thru taxes
		foreach ( $ordered_taxes as $order => $taxes ) {
			foreach ( $taxes as $tax ) {
				if ( $tax instanceof EE_Price ) {
					$taxes_line_item->add_child_line_item(EE_Line_Item::new_instance(array(
						'LIN_name'=>$tax->name(),
						'LIN_desc'=>$tax->desc(),
						'LIN_percent'=>$tax->amount(),
						'LIN_is_taxable'=>false,
						'LIN_order'=>$order,
						'LIN_total'=>0,
						'LIN_type'=>  EEM_Line_Item::type_tax,
						'OBJ_type'=>'Price',
						'OBJ_ID'=>$tax->ID()
					)));
				}
			}
		}
		$total_line_item->recalculate_total_including_taxes();
	}



	/**
	 * Ensures that taxes have been applied to the order, if not applies them.
	 * Returns the total amount of tax
	 * @param EE_Line_Item $total_line_item of type EEM_Line_Item::type_total
	 * @return float
	 */
	public static function ensure_taxes_applied( $total_line_item ){
		$taxes_subtotal = self::get_taxes_subtotal( $total_line_item );
		if( ! $taxes_subtotal->children()){
			self::apply_taxes( $total_line_item );
		}
		return $taxes_subtotal->total();
	}



	/**
	 * Deletes ALL children of the passed line item
	 *
	 * @param EE_Line_Item $parent_line_item
	 * @return bool
	 */
	public static function delete_all_child_items( EE_Line_Item $parent_line_item ) {
		$deleted = 0;
		foreach ( $parent_line_item->children() as $child_line_item ) {
			if ( $child_line_item instanceof EE_Line_Item ) {
				$deleted += EEH_Line_Item::delete_all_child_items( $child_line_item );
				if ( $child_line_item->ID() ) {
					$child_line_item->delete();
				} else {
					$parent_line_item->delete_child_line_item( $child_line_item->code() );
				}
				$deleted++;
			}
		}
		return $deleted;
	}



	/**
	 * Deletes the line items as indicated by the line item code(s) provided
	 * @param EE_Line_Item      $total_line_item of type EEM_Line_Item::type_total
	 * @param array|bool|string $line_item_codes
	 * @return int number of items successfully removed
	 */
	public static function delete_items( EE_Line_Item $total_line_item, $line_item_codes = FALSE ) {

		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );

		// check if only a single line_item_id was passed
		if ( ! empty( $line_item_codes ) && ! is_array( $line_item_codes )) {
			// place single line_item_id in an array to appear as multiple line_item_ids
			$line_item_codes = array ( $line_item_codes );
		}

		$items_line_item = self::get_items_subtotal( $total_line_item );
		if( ! $items_line_item){
			return 0;
		}
		$removals = 0;
		// cycle thru line_item_ids
		foreach ( $line_item_codes as $line_item_id ) {
			$removals += $items_line_item->delete_child_line_item($line_item_id);
		}

		if ( $removals > 0 ) {
			$total_line_item->recalculate_taxes_and_tax_total();
			return $removals;
		} else {
			return FALSE;
		}
	}

	/**
	 * Overwrites the previous tax by clearing out the old taxes, and creates a new
	 * tax and updates the total line item accordingly
	 * @param EE_Line_Item $total_line_item
	 * @param float $amount
	 * @param string $name
	 * @param string $description
	 * @return EE_Line_Item the new tax line item created
	 */
	public static function set_total_tax_to( EE_Line_Item $total_line_item, $amount, $name = NULL, $description = NULL ){
		//first: remove all tax descendants
		//add this as a new tax descendant
		$tax_subtotal = self::get_taxes_subtotal( $total_line_item );
		$tax_subtotal->delete_children_line_items();
		$taxable_total = $total_line_item->taxable_total();
		$new_tax = EE_Line_Item::new_instance(array(
			'TXN_ID' => $total_line_item->TXN_ID(),
			'LIN_name' => $name ? $name : __('Tax', 'event_espresso'),
			'LIN_desc' => $description ? $description : '',
			'LIN_percent' => $taxable_total ? ( $amount / $total_line_item->taxable_total()  * 100 ) : 0,
			'LIN_total' => $amount,
			'LIN_parent' => $tax_subtotal->ID(),
			'LIN_type' => EEM_Line_Item::type_tax
		));
		$new_tax->save();
		$tax_subtotal->set_total( $amount );
		$tax_subtotal->save();
		$total_line_item->recalculate_total_including_taxes();
		return $new_tax;
	}



	/**
	 * Prints out a representation of the line item tree
	 * @param EE_Line_Item $line_item
	 * @param int $indentation
	 * @return void
	 */
	public static function visualize( EE_Line_Item $line_item, $indentation = 0 ){
		echo "\r\n";
		for( $i = 0; $i < $indentation; $i++ ){
			echo "-";
		}
		echo $line_item->name() . ": " . $line_item->type() . " $" . $line_item->total();
		if( $line_item->is_taxable() ){
			echo " taxable";
		}
		if( $line_item->children() ){
			foreach($line_item->children() as $child){
				self::visualize($child, $indentation + 1);
			}
		}
	}
}
// End of file EEH_Line_Item.helper.php