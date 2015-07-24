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
	 * Adds a simple item ( unrelated to any other model object) to the total line item
	 * in the correct spot in the line item tree (also verifying it doesn't add a duplicate based on the LIN_code)
	 * beneath the pre-tax-total (alongside event subtotals).
	 * Automatically re-calculates the line item totals and updates the related transaction. But
	 * DOES NOT automatically upgrade the transaction's registrations' final prices (which
	 * should probably change because of this).
	 * You should call EE_Registration_Processor::calculate_reg_final_prices_per_line_item()
	 * after using this, to keep the registration final prices in-sync with the transaction's total.
	 * @param EE_Line_Item $parent_line_item
	 * @param string $name
	 * @param float $unit_price
	 * @param string $description
	 * @param int $quantity
	 * @param boolean $taxable
	 * @param boolean $code if set to a value, ensures there is only one line item with that code
	 * @return boolean success
	 */
	public static function add_unrelated_item( EE_Line_Item $parent_line_item, $name, $unit_price, $description = '', $quantity = 1, $taxable = FALSE, $code = NULL  ){
		$items_subtotal = self::get_pre_tax_subtotal( $parent_line_item );
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
		$line_item = apply_filters(
			'FHEE__EEH_Line_Item__add_unrelated_item__line_item',
			$line_item
		);
		return self::add_item( $parent_line_item, $line_item );
	}



	/**
	 * Adds a simple item ( unrelated to any other model object) to the total line item,
	 * in the correct spot in the line item tree. Automatically
	 * re-calculates the line item totals and updates the related transaction. But
	 * DOES NOT automatically upgrade the transaction's registrations' final prices (which
	 * should probably change because of this).
	 * You should call EE_Registration_Processor::calculate_reg_final_prices_per_line_item()
	 * after using this, to keep the registration final prices in-sync with the transaction's total.
	 *
	 * @param EE_Line_Item $parent_line_item
	 * @param string       $name
	 * @param float        $percentage_amount
	 * @param string       $description
	 * @param boolean      $taxable
	 * @return boolean success
	 */
	public static function add_percentage_based_item( EE_Line_Item $parent_line_item, $name, $percentage_amount, $description = '', $taxable = FALSE ){
		$line_item = EE_Line_Item::new_instance(array(
			'LIN_name' => $name,
			'LIN_desc' => $description,
			'LIN_unit_price' => 0,
			'LIN_percent' => $percentage_amount,
			'LIN_quantity' => NULL,
			'LIN_is_taxable' => $taxable,
			'LIN_total' => floatval( $percentage_amount * ( $parent_line_item->total() / 100 )),
			'LIN_type'=>  EEM_Line_Item::type_line_item,
			'LIN_parent' => $parent_line_item->ID()
		));
		$line_item = apply_filters(
			'FHEE__EEH_Line_Item__add_percentage_based_item__line_item',
			$line_item
		);
		return self::add_item( $parent_line_item, $line_item );
	}



	/**
	 * Returns the new line item created by adding a purchase of the ticket
	 * ensures that ticket line item is saved, and that cart total has been recalculated.
	 * If this ticket has already been purchased, just increments its count.
	 * Automatically re-calculates the line item totals and updates the related transaction. But
	 * DOES NOT automatically upgrade the transaction's registrations' final prices (which
	 * should probably change because of this).
	 * You should call EE_Registration_Processor::calculate_reg_final_prices_per_line_item()
	 * after using this, to keep the registration final prices in-sync with the transaction's total.
	 *
	 * @param EE_Line_Item $total_line_item grand total line item of type EEM_Line_Item::type_total
	 * @param EE_Ticket $ticket
	 * @param int $qty
	 * @return \EE_Line_Item
	 * @throws \EE_Error
	 */
	public static function add_ticket_purchase( EE_Line_Item $total_line_item, EE_Ticket $ticket, $qty = 1 ){
		if ( ! $total_line_item instanceof EE_Line_Item || ! $total_line_item->is_total() ) {
			throw new EE_Error( sprintf( __( 'A valid line item total is required in order to add tickets. A line item of type "%s" was passed.', 'event_espresso' ), $ticket->ID(), $total_line_item->ID() ) );
		}
		// either increment the qty for an existing ticket
		$line_item = self::increment_ticket_qty_if_already_in_cart( $total_line_item, $ticket, $qty );
		// or add a new one
		if ( ! $line_item instanceof EE_Line_Item ) {
			$line_item = self::create_ticket_line_item( $total_line_item, $ticket, $qty );
		}
		$total_line_item->recalculate_total_including_taxes();
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
			$ticket_line_items = EEH_Line_Item::get_ticket_line_items( $total_line_item );
			foreach ( (array)$ticket_line_items as $ticket_line_item ) {
				if ( $ticket_line_item instanceof EE_Line_Item && $ticket_line_item->OBJ_ID() == $ticket->ID() ) {
					$line_item = $ticket_line_item;
					break;
				}
			}
		}
		if ( $line_item instanceof EE_Line_Item ) {
			$qty += $line_item->quantity();
			$line_item->set_quantity( $qty );
			$line_item->set_total( $line_item->unit_price() * $qty );
			return $line_item;
		}
		return null;
	}



	/**
	 * Returns the new line item created by adding a purchase of the ticket
	 * @param EE_Line_Item $total_line_item of type EEM_Line_Item::type_total
	 * @param EE_Ticket $ticket
	 * @param int $qty
	 * @return \EE_Line_Item
	 * @throws \EE_Error
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
		// get event subtotal line
		$events_sub_total = self::get_event_line_item_for_ticket( $total_line_item, $ticket );
		if ( ! $events_sub_total instanceof EE_Line_Item ) {
			throw new EE_Error( sprintf( __( 'There is no events sub-total for ticket %s on total line item %d', 'event_espresso' ), $ticket->ID(), $total_line_item->ID() ) );
		}
		// add $ticket to cart
		$line_item = EE_Line_Item::new_instance( array(
			'LIN_name'       	=> $ticket->name(),
			'LIN_desc'       		=> $full_description,
			'LIN_unit_price' 	=> $ticket->price(),
			'LIN_quantity'   	=> $qty,
			'LIN_is_taxable' 	=> $ticket->taxable(),
			'LIN_order'      	=> count( $events_sub_total->children() ),
			'LIN_total'      		=> $ticket->price() * $qty,
			'LIN_type'       		=> EEM_Line_Item::type_line_item,
			'OBJ_ID'         		=> $ticket->ID(),
			'OBJ_type'       	=> 'Ticket'
		) );
		$line_item = apply_filters(
			'FHEE__EEH_Line_Item__create_ticket_line_item__line_item',
			$line_item
		);
		//now add the sub-line items
		$running_total_for_ticket = 0;
		foreach ( $ticket->prices( array( 'order_by' => array( 'PRC_order' => 'ASC' ) ) ) as $price ) {
			$sign = $price->is_discount() ? -1 : 1;
			$price_total = $price->is_percent() ? $running_total_for_ticket * $price->amount() / 100 : $price->amount() * $qty;
			$sub_line_item = EE_Line_Item::new_instance( array(
				'LIN_name'       	=> $price->name(),
				'LIN_desc'       		=> $price->desc(),
				'LIN_quantity'   	=> $price->is_percent() ? null : $qty,
				'LIN_is_taxable' 	=> false,
				'LIN_order'      	=> $price->order(),
				'LIN_total'      		=> $sign * $price_total,
				'LIN_type'       		=> EEM_Line_Item::type_sub_line_item,
				'OBJ_ID'         		=> $price->ID(),
				'OBJ_type'       	=> 'Price'
			) );
			$sub_line_item = apply_filters(
				'FHEE__EEH_Line_Item__create_ticket_line_item__sub_line_item',
				$sub_line_item
			);
			if ( $price->is_percent() ) {
				$sub_line_item->set_percent( $sign * $price->amount() );
			} else {
				$sub_line_item->set_unit_price( $sign * $price->amount() );
			}
			$running_total_for_ticket += $price_total;
			$line_item->add_child_line_item( $sub_line_item );
		}
		$events_sub_total->add_child_line_item( $line_item );
		return $line_item;
	}



	/**
	 * Adds the specified item under the pre-tax-sub-total line item. Automatically
	 * re-calculates the line item totals and updates the related transaction. But
	 * DOES NOT automatically upgrade the transaction's registrations' final prices (which
	 * should probably change because of this).
	 * You should call EE_Registration_Processor::calculate_reg_final_prices_per_line_item()
	 * after using this, to keep the registration final prices in-sync with the transaction's total.
	 * @param EE_Line_Item $total_line_item
	 * @param EE_Line_Item $item to be added
	 * @return boolean
	 */
	public static function add_item( EE_Line_Item $total_line_item, EE_Line_Item $item ){
		$pre_tax_subtotal = self::get_pre_tax_subtotal( $total_line_item );
		if ( $pre_tax_subtotal instanceof EE_Line_Item ){
			$success = $pre_tax_subtotal->add_child_line_item($item);
		}else{
			return FALSE;
		}
		$total_line_item->recalculate_total_including_taxes();
		return $success;
	}



	/**
	 * Gets the line item which contains the subtotal of all the items
	 * @param EE_Line_Item $total_line_item of type EEM_Line_Item::type_total
	 *	@return \EE_Line_Item
	 */
	public static function get_pre_tax_subtotal( EE_Line_Item $total_line_item ){
		$pre_tax_subtotal = $total_line_item->get_child_line_item( 'pre-tax-subtotal' );
		return $pre_tax_subtotal instanceof EE_Line_Item ? $pre_tax_subtotal : self::create_pre_tax_subtotal( $total_line_item );
	}



	/**
	 * Gets the line item for the taxes subtotal
	 * @param EE_Line_Item $total_line_item of type EEM_Line_Item::type_total
	 * @return \EE_Line_Item
	 */
	public static function get_taxes_subtotal( EE_Line_Item $total_line_item ){
		$taxes = $total_line_item->get_child_line_item( 'taxes' );
		return $taxes ? $taxes : self::create_taxes_subtotal( $total_line_item );
	}



	/**
	 * sets the TXN ID on an EE_Line_Item if passed a valid EE_Transaction object
	 * @param EE_Line_Item $line_item
	 * @param EE_Transaction $transaction
	 * @return void
	 */
	public static function set_TXN_ID( EE_Line_Item $line_item, $transaction = NULL ){
		if( $transaction ){
			/** @type EEM_Transaction $EEM_Transaction */
			$EEM_Transaction = EE_Registry::instance()->load_model( 'Transaction' );
			$transaction = $EEM_Transaction->ensure_is_ID( $transaction );
			$line_item->set_TXN_ID( $transaction );
		}
	}



	/**
	 * Creates a new default total line item for the transaction,
	 * and its tickets subtotal and taxes subtotal line items (and adds the
	 * existing taxes as children of the taxes subtotal line item)
	 * @param EE_Transaction $transaction
	 * @return \EE_Line_Item of type total
	 */
	public static function create_total_line_item( $transaction = NULL ){
		$total_line_item = EE_Line_Item::new_instance( array(
			'LIN_code'	=> 'total',
			'LIN_name'	=> __('Grand Total', 'event_espresso'),
			'LIN_type'	=> EEM_Line_Item::type_total,
			'OBJ_type'	=>'Transaction'
		));
		$total_line_item = apply_filters(
			'FHEE__EEH_Line_Item__create_total_line_item__total_line_item',
			$total_line_item
		);
		self::set_TXN_ID( $total_line_item, $transaction );
		self::create_pre_tax_subtotal( $total_line_item, $transaction );
		self::create_taxes_subtotal( $total_line_item, $transaction );
		return $total_line_item;
	}



	/**
	 * Creates a default items subtotal line item
	 * @param EE_Line_Item $total_line_item
	 * @param EE_Transaction $transaction
	 * @return EE_Line_Item
	 */
	protected static function create_pre_tax_subtotal( EE_Line_Item $total_line_item, $transaction = NULL ){
		$pre_tax_line_item = EE_Line_Item::new_instance( array(
			'LIN_code' 	=> 'pre-tax-subtotal',
			'LIN_name' 	=> __( 'Pre-Tax Subtotal', 'event_espresso' ),
			'LIN_type' 	=> EEM_Line_Item::type_sub_total
		) );
		$pre_tax_line_item = apply_filters(
			'FHEE__EEH_Line_Item__create_pre_tax_subtotal__pre_tax_line_item',
			$pre_tax_line_item
		);
		self::set_TXN_ID( $pre_tax_line_item, $transaction );
		$total_line_item->add_child_line_item( $pre_tax_line_item );
		self::create_event_subtotal( $pre_tax_line_item, $transaction );
		return $pre_tax_line_item;
	}



	/**
	 * Creates a line item for the taxes subtotal and finds all the tax prices
	 * and applies taxes to it
	 * @param EE_Line_Item $total_line_item of type EEM_Line_Item::type_total
	 * @param EE_Transaction $transaction
	 * @return EE_Line_Item
	 */
	protected static function create_taxes_subtotal( EE_Line_Item $total_line_item, $transaction = NULL ){
		$tax_line_item = EE_Line_Item::new_instance(array(
			'LIN_code'	=> 'taxes',
			'LIN_name' 	=> __('Taxes', 'event_espresso'),
			'LIN_type'	=> EEM_Line_Item::type_tax_sub_total
		));
		$tax_line_item = apply_filters(
			'FHEE__EEH_Line_Item__create_taxes_subtotal__tax_line_item',
			$tax_line_item
		);
		self::set_TXN_ID( $tax_line_item, $transaction );
		$total_line_item->add_child_line_item( $tax_line_item );
		//and lastly, add the actual taxes
		self::apply_taxes( $total_line_item );
		return $tax_line_item;
	}



	/**
	 * Creates a default items subtotal line item
	 * @param EE_Line_Item $pre_tax_line_item
	 * @param EE_Transaction $transaction
	 * @param EE_Event $event
	 * @return EE_Line_Item
	 */
	public static function create_event_subtotal( EE_Line_Item $pre_tax_line_item, $transaction = NULL, $event = NULL ){
		$event_line_item = EE_Line_Item::new_instance(array(
			'LIN_code'	=> self::get_event_code( $event ),
			'LIN_name' 	=> __('Event', 'event_espresso'),
			'LIN_type'	=> EEM_Line_Item::type_sub_total,
			'OBJ_type' 	=> 'Event',
			'OBJ_ID' 		=>  $event instanceof EE_Event ? $event->ID() : 0
		));
		$event_line_item = apply_filters(
			'FHEE__EEH_Line_Item__create_event_subtotal__event_line_item',
			$event_line_item
		);
		self::set_TXN_ID( $event_line_item, $transaction );
		$pre_tax_line_item->add_child_line_item( $event_line_item );
		return $event_line_item;
	}

	/**
	 * Gets what the event ticket's code SHOULD be
	 * @param EE_Event $event
	 * @return string
	 */
	public static function get_event_code( $event ) {
		return 'event-' . ( $event instanceof EE_Event ? $event->ID() : '0' );
	}

	/**
	  * Given the grand total line item and a ticket, finds the event sub-total
	  * line item the ticket's purchase should be added onto
	  *
	  * @access public
	  * @param EE_Line_Item $grand_total the grand total line item
	  * @param EE_Ticket $ticket
	  * @throws \EE_Error
	  * @return EE_Line_Item
	  */
	public static function get_event_line_item_for_ticket( EE_Line_Item $grand_total, EE_Ticket $ticket ) {
		$first_datetime = $ticket->first_datetime();
		if( ! $first_datetime instanceof EE_Datetime ){
			throw new EE_Error( sprintf( __( 'The supplied ticket (ID %d) has no datetimes', 'event_espresso' ), $ticket->ID() ) );
		}
		$event = $first_datetime->event();
		if ( ! $event instanceof EE_Event ) {
			throw new EE_Error( sprintf( __( 'The supplied ticket (ID %d) has no event data associated with it.','event_espresso' ), $ticket->ID() ) );
		}
		$event_line_item = NULL;
		$found = false;
		foreach ( EEH_Line_Item::get_event_subtotals( $grand_total ) as $event_line_item ) {
			// default event subtotal, we should only ever find this the first time this method is called
			if ( ! $event_line_item->OBJ_ID() ) {
				// let's use this! but first... set the event details
				EEH_Line_Item::set_event_subtotal_details( $event_line_item, $event );
				$found = true;
				break;
			} else if ( $event_line_item->OBJ_ID() === $event->ID() ) {
				// found existing line item for this event in the cart, so break out of loop and use this one
				$found = true;
				break;
			}
		}
		if ( ! $found ) {
			//there is no event sub-total yet, so add it
			$pre_tax_subtotal = EEH_Line_Item::get_pre_tax_subtotal( $grand_total );
			// create a new "event" subtotal below that
			$event_line_item = EEH_Line_Item::create_event_subtotal( $pre_tax_subtotal, null, $event );
			// and set the event details
			EEH_Line_Item::set_event_subtotal_details( $event_line_item, $event );
		}
		return $event_line_item;
	}



	/**
	 * Creates a default items subtotal line item
	 * @param EE_Line_Item $event_line_item
	 * @param EE_Event $event
	 * @param EE_Transaction $transaction
	 * @return EE_Line_Item
	 */
	public static function set_event_subtotal_details( EE_Line_Item $event_line_item, EE_Event $event, $transaction = NULL ){
		if ( $event instanceof EE_Event ) {
			$event_line_item->set_code( self::get_event_code( $event ) );
			$event_line_item->set_desc( $event->name() );
			$event_line_item->set_OBJ_ID( $event->ID() );
		}
		self::set_TXN_ID( $event_line_item, $transaction );
	}



	/**
	 * Finds what taxes should apply, adds them as tax line items under the taxes sub-total,
	 * and recalculates the taxes sub-total and the grand total. Resets the taxes, so
	 * any old taxes are removed
	 * @param EE_Line_Item $total_line_item of type EEM_Line_Item::type_total
	 */
	public static function apply_taxes( EE_Line_Item $total_line_item ){
		/** @type EEM_Price $EEM_Price */
		$EEM_Price = EE_Registry::instance()->load_model( 'Price' );
		// get array of taxes via Price Model
		$ordered_taxes = $EEM_Price->get_all_prices_that_are_taxes();
		ksort( $ordered_taxes );
		$taxes_line_item = self::get_taxes_subtotal( $total_line_item );
		//just to be safe, remove its old tax line items
		$taxes_line_item->delete_children_line_items();
		//loop thru taxes
		foreach ( $ordered_taxes as $order => $taxes ) {
			foreach ( $taxes as $tax ) {
				if ( $tax instanceof EE_Price ) {
					$tax_line_item = EE_Line_Item::new_instance(
						array(
							'LIN_name'       => $tax->name(),
							'LIN_desc'       => $tax->desc(),
							'LIN_percent'    => $tax->amount(),
							'LIN_is_taxable' => false,
							'LIN_order'      => $order,
							'LIN_total'      => 0,
							'LIN_type'       => EEM_Line_Item::type_tax,
							'OBJ_type'       => 'Price',
							'OBJ_ID'         => $tax->ID()
						)
					);
					$tax_line_item = apply_filters(
						'FHEE__EEH_Line_Item__apply_taxes__tax_line_item',
						$tax_line_item
					);
					$taxes_line_item->add_child_line_item( $tax_line_item );
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
					unset( $child_line_item );
				} else {
					$parent_line_item->delete_child_line_item( $child_line_item->code() );
				}
				$deleted++;
			}
		}
		return $deleted;
	}



	/**
	 * Deletes the line items as indicated by the line item code(s) provided,
	 * regardless of where they're found in the line item tree. Automatically
	 * re-calculates the line item totals and updates the related transaction. But
	 * DOES NOT automatically upgrade the transaction's registrations' final prices (which
	 * should probably change because of this).
	 * You should call EE_Registration_Processor::calculate_reg_final_prices_per_line_item()
	 * after using this, to keep the registration final prices in-sync with the transaction's total.
	 * @param EE_Line_Item      $total_line_item of type EEM_Line_Item::type_total
	 * @param array|bool|string $line_item_codes
	 * @return int number of items successfully removed
	 */
	public static function delete_items( EE_Line_Item $total_line_item, $line_item_codes = FALSE ) {

		if( $total_line_item->type() != EEM_Line_Item::type_total ){
			EE_Error::doing_it_wrong('EEH_Line_Item::delete_items', __( 'This static method should only be called with a TOTAL line item, otherwise we won\'t recalculate the totals correctly', 'event_espresso' ), '4.6.18' );
		}
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );

		// check if only a single line_item_id was passed
		if ( ! empty( $line_item_codes ) && ! is_array( $line_item_codes )) {
			// place single line_item_id in an array to appear as multiple line_item_ids
			$line_item_codes = array ( $line_item_codes );
		}
		$removals = 0;
		// cycle thru line_item_ids
		foreach ( $line_item_codes as $line_item_id ) {
			$removals += $total_line_item->delete_child_line_item($line_item_id);
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
		$new_tax_subtotal = EE_Line_Item::new_instance(array(
			'TXN_ID' => $total_line_item->TXN_ID(),
			'LIN_name' => $name ? $name : __('Tax', 'event_espresso'),
			'LIN_desc' => $description ? $description : '',
			'LIN_percent' => $taxable_total ? ( $amount / $total_line_item->taxable_total()  * 100 ) : 0,
			'LIN_total' => $amount,
			'LIN_parent' => $tax_subtotal->ID(),
			'LIN_type' => EEM_Line_Item::type_tax
		));
		$new_tax_subtotal = apply_filters(
			'FHEE__EEH_Line_Item__set_total_tax_to__new_tax_subtotal',
			$new_tax_subtotal
		);
		$new_tax_subtotal->save();
		$tax_subtotal->set_total( $amount );
		$tax_subtotal->save();
		$total_line_item->recalculate_total_including_taxes();
		return $new_tax_subtotal;
	}



	/**
	 * Gets all descendants that are event subtotals
	 *
	 * @uses  EEH_Line_Item::get_subtotals_of_object_type()
	 * @param \EE_Line_Item $parent_line_item - the line item to find descendants of
	 * @return EE_Line_Item[]
	 */
	public static function get_event_subtotals( EE_Line_Item $parent_line_item ) {
		return self::get_subtotals_of_object_type( $parent_line_item, 'Event' );
	}



	/**
	 * Gets all descendants subtotals that match the supplied object type
	 *
	 * @uses  EEH_Line_Item::_get_descendants_by_type_and_object_type()
	 * @param \EE_Line_Item $parent_line_item - the line item to find descendants of
	 * @param string $obj_type
	 * @return EE_Line_Item[]
	 */
	public static function get_subtotals_of_object_type( EE_Line_Item $parent_line_item, $obj_type = '' ) {
		return self::_get_descendants_by_type_and_object_type( $parent_line_item, EEM_Line_Item::type_sub_total, $obj_type );
	}



	/**
	 * Gets all descendants that are tickets
	 *
	 * @uses  EEH_Line_Item::get_line_items_of_object_type()
	 * @param \EE_Line_Item $parent_line_item - the line item to find descendants of
	 * @return EE_Line_Item[]
	 */
	public static function get_ticket_line_items( EE_Line_Item $parent_line_item ) {
		return self::get_line_items_of_object_type( $parent_line_item, 'Ticket' );
	}



	/**
	 * Gets all descendants subtotals that match the supplied object type
	 *
	 * @uses  EEH_Line_Item::_get_descendants_by_type_and_object_type()
	 * @param \EE_Line_Item $parent_line_item - the line item to find descendants of
	 * @param string $obj_type
	 * @return EE_Line_Item[]
	 */
	public static function get_line_items_of_object_type( EE_Line_Item $parent_line_item, $obj_type = '' ) {
		return self::_get_descendants_by_type_and_object_type( $parent_line_item, EEM_Line_Item::type_line_item, $obj_type );
	}



	/**
	 * Gets all the descendants (ie, children or children of children etc) that are of the type 'tax'
	 * @uses  EEH_Line_Item::get_descendants_of_type()
	 * @param \EE_Line_Item $parent_line_item - the line item to find descendants of
	 * @return EE_Line_Item[]
	 */
	public static function get_tax_descendants( EE_Line_Item $parent_line_item ) {
		return EEH_Line_Item::get_descendants_of_type( $parent_line_item, EEM_Line_Item::type_tax );
	}



	/**
	 * Gets all the real items purchased which are children of this item
	 * @uses  EEH_Line_Item::get_descendants_of_type()
	 * @param \EE_Line_Item $parent_line_item - the line item to find descendants of
	 * @return EE_Line_Item[]
	 */
	public static function get_line_item_descendants( EE_Line_Item $parent_line_item ) {
		return EEH_Line_Item::get_descendants_of_type( $parent_line_item, EEM_Line_Item::type_line_item );
	}



	/**
	 * Gets all descendants of supplied line item that match the supplied line item type
	 *
	 * @uses  EEH_Line_Item::_get_descendants_by_type_and_object_type()
	 * @param \EE_Line_Item $parent_line_item - the line item to find descendants of
	 * @param string $line_item_type one of the EEM_Line_Item constants
	 * @return EE_Line_Item[]
	 */
	public static function get_descendants_of_type( EE_Line_Item $parent_line_item, $line_item_type ) {
		return self::_get_descendants_by_type_and_object_type( $parent_line_item, $line_item_type, NULL );
	}



	/**
	 * Gets all descendants of supplied line item that match the supplied line item type and possibly the object type as well
	 *
	 * @param \EE_Line_Item $parent_line_item - the line item to find descendants of
	 * @param string $line_item_type one of the EEM_Line_Item constants
	 * @param string | NULL $obj_type object model class name (minus prefix) or NULL to ignore object type when searching
	 * @return EE_Line_Item[]
	 */
	protected static function _get_descendants_by_type_and_object_type( EE_Line_Item $parent_line_item, $line_item_type, $obj_type = NULL ) {
		$objects = array();
		foreach ( $parent_line_item->children() as $child_line_item ) {
			if ( $child_line_item instanceof EE_Line_Item ) {
				if ( $child_line_item->type() == $line_item_type && ( $child_line_item->OBJ_type() == $obj_type || $obj_type === NULL )) {
					$objects[] = $child_line_item;
				} else {
					//go-through-all-its children looking for more matches
					$objects = array_merge( $objects, self::_get_descendants_by_type_and_object_type( $child_line_item, $line_item_type, $obj_type ));
				}
			}
		}
		return $objects;
	}



	/**
	 * Gets all descendants subtotals that match the supplied object type
	 *
	 * @uses  EEH_Line_Item::_get_descendants_by_type_and_object_type()
	 * @param \EE_Line_Item $parent_line_item - the line item to find descendants of
	 * @param string $OBJ_type object type (like Event)
	 * @param array $OBJ_IDs array of OBJ_IDs
	 * @return EE_Line_Item[]
	 */
	public static function get_line_items_by_object_type_and_IDs( EE_Line_Item $parent_line_item, $OBJ_type = '', $OBJ_IDs = array() ) {
		return self::_get_descendants_by_object_type_and_object_ID( $parent_line_item, $OBJ_type, $OBJ_IDs );
	}



	/**
	 * Gets all descendants of supplied line item that match the supplied line item type and possibly the object type as well
	 *
	 * @param \EE_Line_Item $parent_line_item - the line item to find descendants of
	 * @param string $OBJ_type object type (like Event)
	 * @param array $OBJ_IDs array of OBJ_IDs
	 * @return EE_Line_Item[]
	 */
	protected static function _get_descendants_by_object_type_and_object_ID( EE_Line_Item $parent_line_item, $OBJ_type, $OBJ_IDs ) {
		$objects = array();
		foreach ( $parent_line_item->children() as $child_line_item ) {
			if ( $child_line_item instanceof EE_Line_Item ) {
				if ( is_array( $OBJ_IDs ) && $child_line_item->OBJ_type() == $OBJ_type && in_array( $child_line_item->OBJ_ID(), $OBJ_IDs )) {
					$objects[] = $child_line_item;
				} else {
					//go-through-all-its children looking for more matches
					$objects = array_merge( $objects, self::_get_descendants_by_object_type_and_object_ID( $child_line_item, $OBJ_type, $OBJ_IDs ));
				}
			}
		}
		return $objects;
	}



	/**
	 * Uses a breadth-first-search in order to find the nearest descendant of
	 * the specified type and returns it, else NULL
	 *
	 * @uses  EEH_Line_Item::_get_nearest_descendant()
	 * @param \EE_Line_Item $parent_line_item - the line item to find descendants of
	 * @param string $type like one of the EEM_Line_Item::type_*
	 * @return EE_Line_Item
	 */
	public static function get_nearest_descendant_of_type( EE_Line_Item $parent_line_item, $type ) {
		return self::_get_nearest_descendant( $parent_line_item, 'LIN_type' , $type );
	}



	/**
	 * Uses a breadth-first-search in order to find the nearest descendant having the specified LIN_code and returns it, else NULL
	 *
	 * @uses  EEH_Line_Item::_get_nearest_descendant()
	 * @param \EE_Line_Item $parent_line_item - the line item to find descendants of
	 * @param string $code any value used for LIN_code
	 * @return EE_Line_Item
	 */
	public static function get_nearest_descendant_having_code( EE_Line_Item $parent_line_item, $code ) {
		return self::_get_nearest_descendant( $parent_line_item, 'LIN_code' , $code );
	}



	/**
	 * Uses a breadth-first-search in order to find the nearest descendant having the specified LIN_code and returns it, else NULL
	 *
	 * @param \EE_Line_Item $parent_line_item - the line item to find descendants of
	 * @param string $search_field  name of EE_Line_Item property
	 * @param string $value any value stored in $search_field
	 * @return EE_Line_Item
	 */
	protected static function _get_nearest_descendant( EE_Line_Item $parent_line_item, $search_field, $value ) {
		foreach( $parent_line_item->children() as $child ){
			if ( $child->get( $search_field ) == $value ){
				return $child;
			}
		}
		foreach( $parent_line_item->children() as $child ){
			$descendant_found = self::_get_nearest_descendant( $child, $search_field, $value );
			if ( $descendant_found ){
				return $descendant_found;
			}
		}
		return NULL;
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
		echo $line_item->name() . "(" . $line_item->ID() . "): " . $line_item->type() . " $" . $line_item->total() . "($" . $line_item->unit_price() . "x" . $line_item->quantity() . ")";
		if( $line_item->is_taxable() ){
			echo " taxable";
		}
		if( $line_item->children() ){
			foreach($line_item->children() as $child){
				self::visualize($child, $indentation + 1);
			}
		}
	}



	/**
	 * Calculates the registration's final price, taking into account that they
	 * need to not only help pay for their OWN ticket, but also any transaction-wide surcharges and taxes,
	 * and receive a portion of any transaction-wide discounts.
	 * eg1, if I buy a $1 ticket and brent buys a $9 ticket, and we receive a $5 discount
	 * then I'll get 1/10 of that $5 discount, which is $0.50, and brent will get
	 * 9/10ths of that $5 discount, which is $4.50. So my final price should be $0.50
	 * and brent's final price should be $5.50.
	 *
	 * In order to do this, we basically need to traverse the line item tree calculating
	 * the running totals (just as if we were recalculating the total), but when we identify
	 * regular line items, we need to keep track of their share of the grand total.
	 * Also, we need to keep track of the TAXABLE total for each ticket purchase, so
	 * we can know how to apply taxes to it. (Note: "taxable total" does not equal the "pretax total"
	 * when there are non-taxable items; otherwise they would be the same)
	 *
	 * @param EE_Line_Item $line_item
	 * @param array $billable_ticket_quantities 		array of EE_Ticket IDs and their corresponding quantity that
	 *                                          									can be included in price calculations at this moment
	 * @return array 		keys are line items for tickets IDs and values are their share of the running total,
	 *                                          plus the key 'total', and 'taxable' which also has keys of all the ticket IDs. Eg
	 *                                          array(
	 *                                          12 => 4.3
	 *                                          23 => 8.0
	 *                                          'total' => 16.6,
	 *                                          'taxable' => array(
	 *                                          12 => 10,
	 *                                          23 => 4
	 *                                          ).
	 *                                          So to find which registrations have which final price, we need to find which line item
	 *                                          is theirs, which can be done with
	 *                                          `EEM_Line_Item::instance()->get_line_item_for_registration( $registration );`
	 */
	public static function calculate_reg_final_prices_per_line_item( EE_Line_Item $line_item, $billable_ticket_quantities = array() ) {
		//init running grand total if not already
		if ( ! isset( $running_totals[ 'total' ] ) ) {
			$running_totals[ 'total' ] = 0;
		}
		if( ! isset( $running_totals[ 'taxable' ] ) ) {
			$running_totals[ 'taxable' ] = array( 'total' => 0 );
		}
		foreach ( $line_item->children() as $child_line_item ) {
			switch ( $child_line_item->type() ) {

				case EEM_Line_Item::type_sub_total :
					$running_totals_from_subtotal = EEH_Line_Item::calculate_reg_final_prices_per_line_item( $child_line_item, $billable_ticket_quantities );
					//combine arrays but preserve numeric keys
					$running_totals = array_replace_recursive( $running_totals_from_subtotal, $running_totals );
					$running_totals[ 'total' ] += $running_totals_from_subtotal[ 'total' ];
					$running_totals[ 'taxable'][ 'total' ] += $running_totals_from_subtotal[ 'taxable' ][ 'total' ];
					break;

				case EEM_Line_Item::type_tax_sub_total :

					//find how much the taxes percentage is
					if ( $child_line_item->percent() != 0 ) {
						$tax_percent_decimal = $child_line_item->percent() / 100;
					} else {
						$tax_percent_decimal = EE_Taxes::get_total_taxes_percentage() / 100;
					}
					//and apply to all the taxable totals, and add to the pretax totals
					foreach ( $running_totals as $line_item_id => $this_running_total ) {
						//"total" and "taxable" array key is an exception
						if ( $line_item_id === 'taxable' ) {
							continue;
						}
						$taxable_total = $running_totals[ 'taxable' ][ $line_item_id ];
						$running_totals[ $line_item_id ] += ( $taxable_total * $tax_percent_decimal );
					}
					break;

				case EEM_Line_Item::type_line_item :

					// ticket line items or ????
					if ( $child_line_item->OBJ_type() === 'Ticket' ) {
						// kk it's a ticket
						if ( isset( $running_totals[ $child_line_item->ID() ] ) ) {
							//huh? that shouldn't happen.
							$running_totals[ 'total' ] += $child_line_item->total();
						} else {
							//its not in our running totals yet. great.
							if ( $child_line_item->is_taxable() ) {
								$taxable_amount = $child_line_item->unit_price();
							} else {
								$taxable_amount = 0;
							}
							// are we only calculating totals for some tickets?
							if ( isset( $billable_ticket_quantities[ $child_line_item->OBJ_ID() ] ) ) {
								$quantity = $billable_ticket_quantities[ $child_line_item->OBJ_ID() ];
								$running_totals[ $child_line_item->ID() ] = $quantity ? $child_line_item->unit_price() : 0;
								$running_totals[ 'taxable' ][ $child_line_item->ID() ] = $quantity ? $taxable_amount : 0;
							} else {
								$quantity = $child_line_item->quantity();
								$running_totals[ $child_line_item->ID() ] = $child_line_item->unit_price();
								$running_totals[ 'taxable' ][ $child_line_item->ID() ] = $taxable_amount;
							}
							$running_totals[ 'taxable' ][ 'total' ] += $taxable_amount * $quantity;
							$running_totals[ 'total' ] += $child_line_item->unit_price() * $quantity;
						}
					} else {
						// it's some other type of item added to the cart
						// it should affect the running totals
						// basically we want to convert it into a PERCENT modifier. Because
						// more clearly affect all registration's final price equally
						$line_items_percent_of_running_total = $running_totals[ 'total' ] > 0 ? ( $child_line_item->total() / $running_totals[ 'total' ] ) + 1 : 1;
						foreach ( $running_totals as $line_item_id => $this_running_total ) {
							//the "taxable" array key is an exception
							if ( $line_item_id === 'taxable' ) {
								continue;
							}
							// update the running totals
							// yes this actually even works for the running grand total!
							$running_totals[ $line_item_id ] = $line_items_percent_of_running_total * $this_running_total;
							if ( $child_line_item->is_taxable() ) {
								$running_totals[ 'taxable' ][ $line_item_id ] = $line_items_percent_of_running_total * $running_totals[ 'taxable' ][ $line_item_id ];
							}
						}
					}
					break;
			}
		}
		return $running_totals;
	}




	/**************************************** @DEPRECATED METHODS ****************************************/



	/**
	 * @deprecated
	 * @param EE_Line_Item $total_line_item
	 *	@return \EE_Line_Item
	 */
	public static function get_items_subtotal( EE_Line_Item $total_line_item ){
		EE_Error::doing_it_wrong( 'EEH_Line_Item::get_items_subtotal()', __('Method replaced with EEH_Line_Item::get_pre_tax_subtotal()', 'event_espresso'), '4.6.0' );
		return self::get_pre_tax_subtotal( $total_line_item );
	}



	/**
	 * @deprecated
	 * @param EE_Transaction $transaction
	 *	@return \EE_Line_Item
	 */
	public static function create_default_total_line_item( $transaction = NULL) {
		EE_Error::doing_it_wrong( 'EEH_Line_Item::create_default_total_line_item()', __('Method replaced with EEH_Line_Item::create_total_line_item()', 'event_espresso'), '4.6.0' );
		return self::create_total_line_item( $transaction );
	}



	/**
	 * @deprecated
	 * @param EE_Line_Item $total_line_item
	 * @param EE_Transaction $transaction
	 *	@return \EE_Line_Item
	 */
	public static function create_default_tickets_subtotal( EE_Line_Item $total_line_item, $transaction = NULL) {
		EE_Error::doing_it_wrong( 'EEH_Line_Item::create_default_tickets_subtotal()', __('Method replaced with EEH_Line_Item::create_pre_tax_subtotal()', 'event_espresso'), '4.6.0' );
		return self::create_pre_tax_subtotal( $total_line_item, $transaction );
	}



	/**
	 * @deprecated
	 * @param EE_Line_Item $total_line_item
	 * @param EE_Transaction $transaction
	 *	@return \EE_Line_Item
	 */
	public static function create_default_taxes_subtotal( EE_Line_Item $total_line_item, $transaction = NULL) {
		EE_Error::doing_it_wrong( 'EEH_Line_Item::create_default_taxes_subtotal()', __('Method replaced with EEH_Line_Item::create_taxes_subtotal()', 'event_espresso'), '4.6.0' );
		return self::create_taxes_subtotal( $total_line_item, $transaction );
	}



	/**
	 * @deprecated
	 * @param EE_Line_Item $total_line_item
	 * @param EE_Transaction $transaction
	 *	@return \EE_Line_Item
	 */
	public static function create_default_event_subtotal( EE_Line_Item $total_line_item, $transaction = NULL) {
		EE_Error::doing_it_wrong( 'EEH_Line_Item::create_default_event_subtotal()', __('Method replaced with EEH_Line_Item::create_event_subtotal()', 'event_espresso'), '4.6.0' );
		return self::create_event_subtotal( $total_line_item, $transaction );
	}




}
// End of file EEH_Line_Item.helper.php
