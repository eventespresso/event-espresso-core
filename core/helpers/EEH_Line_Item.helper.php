<?php

if (!defined('EVENT_ESPRESSO_VERSION')) {
	exit('No direct script access allowed');
}

/**
 *
 * EEH_Line_Item
 *
 * This should be the main class which is aware of the line item tree structure, and
 * shoudl take care of common operations like inserting items into it, updating
 * items in it based on what the line items are for, and removed line items.
 * All this logic was originally contained in EE_Cart, but because there are
 * actually other places that need to modify the record of what was purchased
 * (eg when a paypal IPN is received, if paypal changes the taxes, we need to update the line items;
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
	 * Returns the new line item created by adding a purchase of the ticket
	 * @param EE_Line_Item $total_line_item of type EEM_Line_Item::type_total
	 * @param EE_Ticket $ticket
	 * @param int $qty
	 * @return EE_Line_Item
	 */
	public static function add_ticket_purchase($total_line_item, $ticket, $qty = 1 ){
		$datetimes = $ticket->datetimes();
		$event_names = array();
		foreach($datetimes as $datetime){
			$event = $datetime->event();
			$event_names[$event->ID()] = $event->name();
		}
		$description_addition = " (For ".implode(", ",$event_names).")";
		$full_description = $ticket->description().$description_addition;
		// add $ticket to cart
		$line_item = EE_Line_Item::new_instance(array(
			'LIN_name'=>$ticket->name(),
			'LIN_desc'=>$full_description,
			'LIN_unit_price'=>$ticket->price(),
			'LIN_quantity'=>$qty,
			'LIN_is_taxable'=>$ticket->taxable(),
			'LIN_order'=>count($total_line_item->children()),
			'LIN_total'=>$ticket->price() * $qty,
			'LIN_type'=>  EEM_Line_Item::type_line_item,
			'OBJ_ID'=>$ticket->ID(),
			'OBJ_type'=>'Ticket'
		));
		//now add the sub-line items
		$running_total_for_ticket = 0;
		foreach($ticket->prices(array('order_by'=>array('PRC_order'=>'ASC'))) as $price){
			$sign = $price->is_discount() ? -1 : 1;
			$price_total = $price->is_percent() ? $running_total_for_ticket * $price->amount() / 100 : $price->amount() * $qty;

			$sub_line_item = EE_Line_Item::new_instance(array(
				'LIN_name'=>$price->name(),
				'LIN_desc'=>$price->desc(),
				'LIN_quantity'=>$price->is_percent() ? null : $qty,
				'LIN_is_taxable'=> false,
				'LIN_order'=>$price->order(),
				'LIN_total'=>$sign * $price_total,
				'LIN_type'=>  EEM_Line_Item::type_sub_line_item,
				'OBJ_ID'=>$price->ID(),
				'OBJ_type'=>'Price'
			));
			if($price->is_percent()){
				$sub_line_item->set_percent($sign * $price->amount());
			}else{
				$sub_line_item->set_unit_price($sign * $price->amount());
			}
			$running_total_for_ticket += $price_total;
			$line_item->add_child_line_item($sub_line_item);
		}

		self::add_item( $total_line_item, $line_item );
		return $line_item;
	}
	/**
	 * Adds the specified item in teh appropriate place in the line item tree
	 * @param EE_Line_Item $total_line_item
	 * @param EE_Line_Item $item to be added
	 * @return boolean
	 */
	public static function add_item($total_line_item, $item ){
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
	 * @return type
	 */
	public static function get_items_subtotal( $total_line_item ){
		$tickets = $total_line_item->get_child_line_item('tickets');
		return $tickets ? $tickets : self::create_default_items_subtotal( $total_line_item );
	}


	/**
	 * Gets the line item for the taxes subtotal
	 * @param EE_Line_Item $total_line_item of type EEM_Line_Item::type_total
	 * @return type
	 */
	public static function get_taxes_subtotal( $total_line_item ){
		$taxes = $total_line_item->get_child_line_item('taxes');
		return $taxes ? $taxes : self::create_default_taxes_subtotal( $total_line_item );
	}

	/**
	 * Creates a new default total line item for the transaction,
	 * and its tickets subtotal and taxes subttoal line items (and adds the
	 * existing taxes as children of the taxes subtotal line item)
	 * @param EE_Transaction $transaction
	 * @return EE_Line_Item of type total
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
	 * Creates a default items subttoal line item
	 * @param type $total_line_item
	 * @param type $transaction
	 * @return EE_Line_Item
	 */
	protected static function create_default_items_subtotal( $total_line_item, $transaction = NULL ){
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
	 * @param type $transaction
	 * @return type
	 */
	protected static function create_default_taxes_subtotal( $total_line_item, $transaction = NULL ){
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
	public static function apply_taxes( $total_line_item ){
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
		$total_line_item->recalculate_taxes_and_total();
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
	 * Deletes the line items as indicated by the line item code(s) provided
	 * @param EE_Line_Item $total_line_item of type EEM_Line_Item::type_total
	 * @param string|array $line_item_codes
	 * @return int number of items successfully removed
	 */
	public static function delete_items( $total_line_item, $line_item_codes = FALSE ) {

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
			$total_line_item->recalculate_taxes_and_total();
			return $removals;
		} else {
			return FALSE;
		}
	}
}

// End of file EEH_Line_Item.helper.php