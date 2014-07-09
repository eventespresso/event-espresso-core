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
	}
	/**
	 *
	 * @param EE_Line_Item $total_line_item
	 * @param EE_Line_Item $item
	 * @return boolean
	 */
	public static function add_item($total_line_item, $item ){
		// add item to cart
		$ticket_items = self::get_items_subtotal( $total_line_item );
		if($ticket_items){
			$ticket_items->add_child_line_item($item);
		}else{
			return false;
		}
		// recalculate cart totals based on new items
		if ( $total_line_item->recalculate_pre_tax_total() ) {
			return TRUE;
		} else {
			return FALSE;
		}
	}
	public static function get_items_subtotal( $total_line_item ){
		$tickets = $total_line_item->get_child_line_item('tickets');
		return $tickets ? $tickets : self::create_default_items_subtotal( $total_line_item );
	}



	public static function get_taxes_subtotal( $total_line_item ){
		$taxes = $total_line_item->get_child_line_item('taxes');
		return $taxes ? $taxes : self::create_default_taxes_subtotal( $total_line_item );
	}


	public static function create_default_total_line_item(){
		$line_item = EE_Line_Item::new_instance(array(
			'LIN_code'=>'total',
			'LIN_name'=>  __('Grand Total', 'event_espresso'),
			'LIN_type'=>  EEM_Line_Item::type_total,
			'OBJ_type'=>'Transaction'
		));
		self::create_default_items_subtotal( $line_item );
		self::create_default_taxes_subtotal( $line_item );
		return $line_item;
	}
	public static function create_default_items_subtotal( $total_line_item ){
		$items_line_item = EE_Line_Item::new_instance(array(
			'LIN_code'=>'tickets',
			'LIN_name'=>  __('Tickets', 'event_espresso'),
			'LIN_type'=>  EEM_Line_Item::type_sub_total
		));
		$total_line_item->add_child_line_item($items_line_item);
		return $items_line_item;
	}
	public static function create_default_taxes_subtotal( $total_line_item ){
		$tax_line_item = EE_Line_Item::new_instance(array(
			'LIN_code'=>'taxes',
			'LIN_name'=> __('Taxes', 'event_espresso'),
			'LIN_type'=>  EEM_Line_Item::type_tax_sub_total
		));
		$total_line_item->add_child_line_item($tax_line_item);
		return $tax_line_item;
	}
	//add item
	//create line item from ticket (and quantity)
	//create line item from price (and quantity)

}

// End of file EEH_Line_Item.helper.php