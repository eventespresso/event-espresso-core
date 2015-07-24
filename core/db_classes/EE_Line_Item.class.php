<?php if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package        Event Espresso
 * @ author        Event Espresso
 * @ copyright    (c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license        {@link http://eventespresso.com/support/terms-conditions/}   * see Plugin Licensing *
 * @ link                {@link http://www.eventespresso.com}
 * @ since            4.0
 *
 */



/**
 * EE_Line_Item class
 * see EEM_Line_Item for description
 *
 * @package            Event Espresso
 * @subpackage         includes/classes/EE_Checkin.class.php
 * @author             Michael Nelson
 */
class EE_Line_Item extends EE_Base_Class {

	/**
	 * for children line items (currently not a normal relation)
	 * @type EE_Line_Item[]
	 */
	protected $_children;



	/**
	 *
	 * @param array $props_n_values  incoming values
	 * @param string $timezone  incoming timezone (if not set the timezone set for the website will be
	 *                          		used.)
	 * @param array $date_formats  incoming date_formats in an array where the first value is the
	 *                             		    date_format and the second value is the time format
	 * @return EE_Line_Item
	 */
	public static function new_instance( $props_n_values = array(), $timezone = null, $date_formats = array() ) {
		$has_object = parent::_check_for_object( $props_n_values, __CLASS__ );
		return $has_object ? $has_object : new self( $props_n_values, false, $timezone, $date_formats );
	}



	/**
	 * @param array $props_n_values  incoming values from the database
	 * @param string $timezone  incoming timezone as set by the model.  If not set the timezone for
	 *                          		the website will be used.
	 * @return EE_Line_Item
	 */
	public static function new_instance_from_db( $props_n_values = array(), $timezone = null ) {
		return new self( $props_n_values, TRUE, $timezone );
	}



	/**
	 * Adds some defaults if they're not specified
	 * @param array  $fieldValues
	 * @param bool   $bydb
	 * @param string $timezone
	 */
	protected function __construct( $fieldValues = array(), $bydb = FALSE, $timezone = '' ) {
		parent::__construct( $fieldValues, $bydb, $timezone );
		if ( ! $this->get( 'LIN_code' ) ) {
			$this->set_code( $this->generate_code() );
		}
	}



	/**
	 * Gets TXN_ID
	 * @return int
	 */
	function TXN_ID() {
		return $this->get( 'TXN_ID' );
	}



	/**
	 * Sets TXN_ID
	 * @param int $TXN_ID
	 * @return boolean
	 */
	function set_TXN_ID( $TXN_ID ) {
		$this->set( 'TXN_ID', $TXN_ID );
	}



	/**
	 * Gets name
	 * @return string
	 */
	function name() {
		$name =  $this->get( 'LIN_name' );
		if( ! $name ){
			$name = ucwords( str_replace( '-', ' ', $this->type() ) );
		}
		return $name;
	}



	/**
	 * Sets name
	 * @param string $name
	 * @return boolean
	 */
	function set_name( $name ) {
		$this->set( 'LIN_name', $name );
	}



	/**
	 * Gets desc
	 * @return string
	 */
	function desc() {
		return $this->get( 'LIN_desc' );
	}



	/**
	 * Sets desc
	 * @param string $desc
	 * @return boolean
	 */
	function set_desc( $desc ) {
		$this->set( 'LIN_desc', $desc );
	}



	/**
	 * Gets quantity
	 * @return int
	 */
	function quantity() {
		return $this->get( 'LIN_quantity' );
	}



	/**
	 * Sets quantity
	 * @param int $quantity
	 * @return boolean
	 */
	function set_quantity( $quantity ) {
		$this->set( 'LIN_quantity', $quantity );
	}



	/**
	 * Gets item_id
	 * @return string
	 */
	function OBJ_ID() {
		return $this->get( 'OBJ_ID' );
	}



	/**
	 * Sets item_id
	 * @param string $item_id
	 * @return boolean
	 */
	function set_OBJ_ID( $item_id ) {
		$this->set( 'OBJ_ID', $item_id );
	}



	/**
	 * Gets item_type
	 * @return string
	 */
	function OBJ_type() {
		return $this->get( 'OBJ_type' );
	}



	/**
	 * Sets item_type
	 * @param string $OBJ_type
	 * @return boolean
	 */
	function set_OBJ_type( $OBJ_type ) {
		$this->set( 'OBJ_type', $OBJ_type );
	}



	/**
	 * Gets unit_price
	 * @return float
	 */
	function unit_price() {
		return $this->get( 'LIN_unit_price' );
	}



	/**
	 * Sets unit_price
	 * @param float $unit_price
	 * @return boolean
	 */
	function set_unit_price( $unit_price ) {
		$this->set( 'LIN_unit_price', $unit_price );
	}



	/**
	 * Checks if this item is a percentage modifier or not
	 * @throws EE_Error
	 * @return boolean
	 */
	function is_percent() {
		if( $this->is_tax_sub_total() ) {
			//tax subtotals HAVE a percent on them, that percentage only applies
			//to taxable items, so its' an exception. Treat it like a flat line item
			return false;
		}
		$unit_price = $this->get( 'LIN_unit_price' );
		$percent = $this->get( 'LIN_percent' );
		if ( $unit_price < .001 && $percent ) {
			return TRUE;
		} elseif ( $unit_price >= .001 && !$percent ) {
			return FALSE;
		} elseif ( $unit_price >= .001 && $percent ) {
			throw new EE_Error( sprintf( __( "A Line Item can not have a unit price of (%s) AND a percent (%s)!", "event_espresso" ), $unit_price, $percent ) );
		} else {
			// if they're both 0, assume its not a percent item
			return FALSE;
		}
	}



	/**
	 * Gets percent (between 100-.001)
	 * @return float
	 */
	function percent() {
		return $this->get( 'LIN_percent' );
	}



	/**
	 * Sets percent (between 100-0.01)
	 * @param float $percent
	 * @return boolean
	 */
	function set_percent( $percent ) {
		$this->set( 'LIN_percent', $percent );
	}



	/**
	 * Gets total
	 * @return float
	 */
	function total() {
		return $this->get( 'LIN_total' );
	}



	/**
	 * Sets total
	 * @param float $total
	 * @return boolean
	 */
	function set_total( $total ) {
		$this->set( 'LIN_total', $total );
	}



	/**
	 * Gets order
	 * @return int
	 */
	function order() {
		return $this->get( 'LIN_order' );
	}



	/**
	 * Sets order
	 * @param int $order
	 */
	function set_order( $order ) {
		$this->set( 'LIN_order', $order );
	}



	/**
	 * Gets parent
	 * @return int
	 */
	function parent_ID() {
		return $this->get( 'LIN_parent' );
	}



	/**
	 * Sets parent
	 * @param int $parent
	 * @return boolean
	 */
	function set_parent_ID( $parent ) {
		$this->set( 'LIN_parent', $parent );
	}



	/**
	 * Gets type
	 * @return string
	 */
	function type() {
		return $this->get( 'LIN_type' );
	}



	/**
	 * Sets type
	 * @param string $type
	 * @return boolean
	 */
	function set_type( $type ) {
		$this->set( 'LIN_type', $type );
	}



	/**
	 * Gets the line item of which this item is a composite. Eg, if this is a subtotal, the parent might be a total\
	 * @return EE_Line_Item
	 */
	public function parent() {
		return $this->get_model()->get_one_by_ID( $this->parent_ID() );
	}



	/**
	 * Gets ALL the children of this line item (ie, all the parts that contribute towards this total).
	 * @return EE_Line_Item[]
	 */
	public function children() {
		if ( $this->ID() ) {
			return $this->get_model()->get_all(
					array(
						array( 'LIN_parent' => $this->ID() ),
						'order_by' => array( 'LIN_order' => 'ASC' ) ) );
		} else {
			if ( ! is_array( $this->_children ) ) {
				$this->_children = array();
			}
			return $this->_children;
		}
	}



	/**
	 * Gets code
	 * @return string
	 */
	function code() {
		return $this->get( 'LIN_code' );
	}



	/**
	 * Sets code
	 * @param string $code
	 * @return boolean
	 */
	function set_code( $code ) {
		$this->set( 'LIN_code', $code );
	}



	/**
	 * Gets is_taxable
	 * @return boolean
	 */
	function is_taxable() {
		return $this->get( 'LIN_is_taxable' );
	}



	/**
	 * Sets is_taxable
	 * @param boolean $is_taxable
	 * @return boolean
	 */
	function set_is_taxable( $is_taxable ) {
		$this->set( 'LIN_is_taxable', $is_taxable );
	}



	/**
	 * Gets the object that this model-joins-to.
	 * returns one of the model objects that the field OBJ_ID can point to... see the 'OBJ_ID' field on EEM_Promotion_Object
	 *
	 * 		Eg, if this line item join model object is for a ticket, this will return the EE_Ticket object
	 *
	 * @return EE_Base_Class | NULL
	 */
	function get_object() {
		$model_name_of_related_obj = $this->OBJ_type();
		return $this->get_model()->has_relation(  $model_name_of_related_obj ) ? $this->get_first_related( $model_name_of_related_obj ) : NULL;
	}



	/**
	 * Like EE_Line_Item::get_object(), but can only ever actually return an EE_Ticket.
	 * (IE, if this line item is for a price or something else, will return NULL)
	 * @param array $query_params
	 * @return EE_Ticket
	 */
	function ticket( $query_params = array() ) {
		//we're going to assume that when this method is called we always want to receive the attached ticket EVEN if that ticket is archived.  This can be overridden via the incoming $query_params argument
		$remove_defaults = array( 'default_where_conditions' => 'none' );
		$query_params = array_merge( $remove_defaults, $query_params );
		return $this->get_first_related( 'Ticket', $query_params );
	}



	/**
	 * Gets the EE_Datetime that's related to the ticket, IF this is for a ticket
	 * @return EE_Datetime | NULL
	 */
	function get_ticket_datetime() {
		if ( $this->OBJ_type() === 'Ticket' ) {
			$ticket = $this->ticket();
			if ( $ticket instanceof EE_Ticket ) {
				$datetime = $ticket->first_datetime();
				if ( $datetime instanceof EE_Datetime ) {
					return $datetime;
				}
			}
		}
		return NULL;
	}



	/**
	 * Gets the event's name that's related to the ticket, if this is for
	 * a ticket
	 * @return string
	 */
	function ticket_event_name() {
		$event_name = __( "Unknown", "event_espresso" );
		$event = $this->ticket_event();
		if ( $event instanceof EE_Event ) {
			$event_name = $event->name();
		}
		return $event_name;
	}


	/**
	 * Gets the event that's related to the ticket, if this line item represents a ticket.
	 * @return EE_Event|null
	 */
	function ticket_event() {
		$event = null;
		$ticket = $this->ticket();
		if ( $ticket instanceof EE_Ticket ) {
			$datetime = $ticket->first_datetime();
			if ( $datetime instanceof EE_Datetime ) {
				$event = $datetime->event();
			}
		}
		return $event;
	}



	/**
	 * Gets the first datetime for this lien item, assuming it's for a ticket
	 * @param string $date_format
	 * @param string $time_format
	 * @return string
	 */
	function ticket_datetime_start( $date_format = '', $time_format = '' ) {
		$first_datetime_string = __( "Unknown", "event_espresso" );
		$datetime = $this->get_ticket_datetime();
		if ( $datetime ) {
			$first_datetime_string = $datetime->start_date_and_time( $date_format, $time_format );
		}
		return $first_datetime_string;
	}



	/**
	 * Adds the line item as a child to this line item. If there is another child line
	 * item with the same LIN_code, it is overwritten by this new one
	 * @param EE_Line_Item $line_item
	 * @param bool         $set_order
	 * @return bool success
	 * @throws \EE_Error
	 */
	function add_child_line_item( EE_Line_Item $line_item, $set_order = true ) {
		// should we calculate the LIN_order for this line item ?
		if ( $set_order || $line_item->order() === null ) {
			$line_item->set_order( count( $this->children() ) );
		}
		if ( $this->ID() ) {
			//check for any duplicate line items (with the same code), if so, this replaces it
			$line_item_with_same_code = $this->get_child_line_item(  $line_item->code() );
			if( $line_item_with_same_code instanceof EE_Line_Item && $line_item_with_same_code !== $line_item ) {
				$this->delete_child_line_item( $line_item_with_same_code->code() );
			}
			$line_item->set_parent_ID( $this->ID() );
			if( $this->TXN_ID() ){
				$line_item->set_TXN_ID( $this->TXN_ID() );
			}
			return $line_item->save();
		} else {
			$this->_children[ $line_item->code() ] = $line_item;
			return TRUE;
		}
	}



	/**
	 * Gets the child line item as specified by its code. Because this returns an object (by reference)
	 * you can modify this child line item and the parent (this object) can know about them
	 * because it also has a reference to that line item
	 * @param string $code
	 * @return EE_Line_Item
	 */
	function get_child_line_item( $code ) {
		if ( $this->ID() ) {
			return $this->get_model()->get_one( array( array( 'LIN_parent' => $this->ID(), 'LIN_code' => $code ) ) );
		} else {
			return isset( $this->_children[ $code ] ) ? $this->_children[ $code ] : null;
		}
	}



	/**
	 * Returns how many items are deleted (or, if this item has not been saved ot the DB yet, just how many it HAD cached on it)
	 * @return int
	 */
	function delete_children_line_items() {
		if ( $this->ID() ) {
			return $this->get_model()->delete( array( array( 'LIN_parent' => $this->ID() ) ) );
		} else {
			$count = count( $this->_children );
			$this->_children = array();
			return $count;
		}
	}



	/**
	 * If this line item has been saved to the DB, deletes its child with LIN_code == $code. If this line
	 * HAS NOT been saved to the DB, removes the child line item with index $code.
	 * Also searches through the child's children for a matching line item. However, once a line item has been found
	 * and deleted, stops searching (so if there are line items with duplicate codes, only the first one found will be deleted)
	 * @param string $code
	 * @param bool $stop_search_once_found
	 * @return int count of items deleted (or simply removed from the line item's cache, if not has not been saved to the DB yet)
	 */
	function delete_child_line_item( $code, $stop_search_once_found = true ) {
		if ( $this->ID() ) {
			$items_deleted = 0;
			if( $this->code() == $code ) {
				$items_deleted += EEH_Line_Item::delete_all_child_items( $this );
				$items_deleted += intval( $this->delete() );
				if( $stop_search_once_found ){
					return $items_deleted;
				}
			}
			foreach( $this->children() as $child_line_item ) {
				$items_deleted += $child_line_item->delete_child_line_item( $code, $stop_search_once_found );
			}
			return $items_deleted;
		} else {
			if( isset( $this->_children[ $code ] ) ) {
				unset( $this->_children[ $code ] );
				return 1;
			}else{
				return 0;
			}
		}
	}

	/**
	 * If this line item is in the database, is of the type subtotal, and
	 * has no children, why do we have it? It should be deleted so this function
	 * does that
	 * @return boolean
	 */
	public function delete_if_childless_subtotal() {
		if( $this->ID() &&
				$this->type() == EEM_Line_Item::type_sub_total &&
				! $this->children() ) {
			return $this->delete();
		} else {
			return false;
		}
	}



	/**
	 * Creates a code and returns a string. doesn't assign the code to this model object
	 * @return string
	 */
	function generate_code() {
		// each line item in the cart requires a unique identifier
		return md5( $this->get( 'OBJ_type' ) . $this->get( 'OBJ_ID' ) . microtime() );
	}



	/**
	 * @return bool
	 */
	function is_tax() {
		return EEM_Line_Item::type_tax == $this->type();
	}



	/**
	 * @return bool
	 */
	function is_tax_sub_total() {
		return EEM_Line_Item::type_tax_sub_total == $this->type();
	}



	/**
	 * @return bool
	 */
	function is_line_item() {
		return EEM_Line_Item::type_line_item == $this->type();
	}



	/**
	 * @return bool
	 */
	function is_sub_line_item() {
		return EEM_Line_Item::type_sub_line_item == $this->type();
	}



	/**
	 * @return bool
	 */
	function is_sub_total() {
		return EEM_Line_Item::type_sub_total == $this->type();
	}



	/**
	 * @return bool
	 */
	function is_total() {
		return EEM_Line_Item::type_total == $this->type();
	}



	/**
	 *
	 * @return string like '2, 004.00', formatted according to the localized currency
	 */
	function unit_price_no_code() {
		return $this->get_pretty( 'LIN_unit_price', 'no_currency_code' );
	}



	/**
	 *
	 * @return string like '2, 004.00', formatted according to the localized currency
	 */
	function total_no_code() {
		return $this->get_pretty( 'LIN_total', 'no_currency_code' );
	}



	/**
	 * Gets the final total on this item, taking taxes into account.
	 * Has the side-effect of setting the sub-total as it was just calculated.
	 * If this is used on a grand-total line item, also updates the transaction's
	 * TXN_total
	 * @return float
	 */
	function recalculate_total_including_taxes() {
		$pre_tax_total = $this->recalculate_pre_tax_total();
		$tax_total = $this->recalculate_taxes_and_tax_total();

		$total = $pre_tax_total + $tax_total;
		// no negative totals plz
		$total = max( $total, 0 );
		$this->set_total( $total );
		if( $this->type() == EEM_Line_Item::type_total && $this->transaction() instanceof EE_Transaction ){
			$this->transaction()->set_total( $total );
			if ( $this->transaction()->ID() ) {
				$this->transaction()->save();
			}
		}
		$this->maybe_save();
		return $total;
	}



	/**
	 * Recursively goes through all the children and recalculates sub-totals EXCEPT for
	 * tax-sub-totals (they're a an odd beast). Updates the 'total' on each line item according to either its
	 * unit price * quantity or the total of all its children EXCEPT when we're only calculating the taxable total and when this is called on the grand total
	 * @param \EE_Line_Item $parent_line_item
	 * @return float
	 * @throws \EE_Error
	 */
	function recalculate_pre_tax_total( EE_Line_Item $parent_line_item = null ) {
		$total = 0;
		//completely ignore tax sub-totals when calculating the pre-tax-total
		if ( $this->is_tax_sub_total() ) {
			return 0;
		} elseif ( $this->is_sub_line_item() ) {
			throw new EE_Error( sprintf( __( 'Calculating the pretax-total on sub-line items doesn\'t make sense right now. You were trying to calculate it on %s', "event_espresso" ), print_r( $this, TRUE ) ) );
		} elseif ( $this->is_line_item() ) {
			if ( $this->is_percent() && $parent_line_item instanceof EE_Line_Item ) {
				$total += $parent_line_item->total() * $this->percent() / 100;
			} else {
				$total = $this->unit_price() * $this->quantity();
			}
			$this->set_total( $total );
			$this->maybe_save();
		} elseif ( $this->is_sub_total() || $this->is_total() ) {
			//get the total of all its children
			foreach ( $this->children() as $child_line_item ) {
				if ( $child_line_item instanceof EE_Line_Item ) {
					//only recalculate sub-totals for NON-taxes
					if ( $child_line_item->is_percent() ) {
						$total += $total * $child_line_item->percent() / 100;
					} else {
						$total += $child_line_item->recalculate_pre_tax_total( $this );
					}
				}
			}
			//we only want to update sub-totals if we're including non-taxable items
			//and grand totals shouldn't be updated when calculating pre-tax totals
			if( $this->is_sub_total() ){
				// no negative totals plz
				$total = max( $total, 0 );
				$this->set_total( $total );
				$this->maybe_save();
			}
		}
		return $total;
	}



	/**
	 * Recalculates the total on each individual tax (based on a recalculation of the pre-tax total), sets
	 * the totals on each tax calculated, and returns the final tax total
	 * @return float
	 */
	function recalculate_taxes_and_tax_total() {
		//get all taxes
		$taxes = $this->tax_descendants();
		//calculate the pretax total
		$taxable_total = $this->taxable_total();
		$tax_total = 0;
		foreach ( $taxes as $tax ) {
			$total_on_this_tax = $taxable_total * $tax->percent() / 100;
			//remember the total on this line item
			$tax->set_total( $total_on_this_tax );
			$tax_total += $tax->total();
		}
		$this->_recalculate_tax_sub_total();
		return $tax_total;
	}



	/**
	 * Simply forces all the tax-sub-totals to recalculate. Assumes the taxes have been calculated
	 * @return void
	 */
	private function _recalculate_tax_sub_total() {
		if ( $this->is_tax_sub_total() ) {
			$total = 0;
			$total_percent = 0;
			//simply loop through all its children (which should be taxes) and sum their total
			foreach ( $this->children() as $child_tax ) {
				if ( $child_tax instanceof EE_Line_Item ) {
					$total += $child_tax->total();
					$total_percent += $child_tax->percent();
				}
			}
			$this->set_total( $total );
			$this->set_percent( $total_percent );
		} elseif ( $this->is_total() ) {
			foreach ( $this->children() as $maybe_tax_subtotal ) {
				if ( $maybe_tax_subtotal instanceof EE_Line_Item ) {
					$maybe_tax_subtotal->_recalculate_tax_sub_total();
				}
			}
		}
	}



	/**
	 * Gets the total tax on this line item. Assumes taxes have already been calculated using recalculate_taxes_and_total
	 * @return float
	 */
	public function get_total_tax() {
		$this->_recalculate_tax_sub_total();
		$total = 0;
		foreach ( $this->tax_descendants() as $tax_line_item ) {
			if ( $tax_line_item instanceof EE_Line_Item ) {
				$total += $tax_line_item->total();
			}
		}
		return $total;
	}


	/**
	 * Gets the total for all the items purchased only
	 * @return float
	 */
	public function get_items_total() {
		$total = 0;
		foreach ( $this->get_items() as $item ) {
			if ( $item instanceof EE_Line_Item ) {
				$total += $item->total();
			}
		}
		return $total;
	}



	/**
	 * Gets all the descendants (ie, children or children of children etc) that
	 * are of the type 'tax'
	 * @return EE_Line_Item[]
	 */
	function tax_descendants() {
		EE_Registry::instance()->load_helper( 'Line_Item' );
		return EEH_Line_Item::get_tax_descendants( $this );
	}



	/**
	 * Gets all the real items purchased which are children of this item
	 * @return EE_Line_Item[]
	 */
	function get_items() {
		EE_Registry::instance()->load_helper( 'Line_Item' );
		return EEH_Line_Item::get_line_item_descendants( $this );
	}



	/**
	 * Returns the amount taxable among this line item's children (or if it has no children,
	 * how much of it is taxable). Does not recalculate totals or subtotals.
	 * If the taxable total is negative, (eg, if none of the tickets were taxable,
	 * but there is a "Taxable" discount), returns 0.
	 * @return float
	 */
	function taxable_total() {
		$total = 0;
		if ( $this->children() ) {
			foreach ( $this->children() as $child_line_item ) {
				if ( $child_line_item->type() == EEM_Line_Item::type_line_item && $child_line_item->is_taxable()) {
					//if it's a percent item, only take into account the percent
					//that's taxable too (the taxable total so far)
					if( $child_line_item->is_percent() ) {
						$total = $total + ( $total * $child_line_item->percent() / 100 );
					}else{
						$total += $child_line_item->total();
					}
				}elseif( $child_line_item->type() == EEM_Line_Item::type_sub_total ){
					$total += $child_line_item->taxable_total();
				}
			}
		}
		return max( $total, 0 );
	}



	/**
	 * Gets the transaction for this line item
	 * @return EE_Transaction
	 */
	public function transaction() {
		return $this->get_first_related( 'Transaction' );
	}



	/**
	 * Saves this line item to the DB, and recursively saves its descendants.
	 * Because there currently is no proper parent-child relation on the model,
	 * save_this_and_cached() will NOT save the descendants.
	 * Also sets the transaction on this line item and all its descendants before saving
	 * @param int $txn_id if none is provided, assumes $this->TXN_ID()
	 * @return int count of items saved
	 */
	public function save_this_and_descendants_to_txn( $txn_id = NULL ) {
		if ( ! $txn_id ) {
			$txn_id = $this->TXN_ID();
		}
		$this->set_TXN_ID( $txn_id );
		$children = $this->children();
		$this->save();
		foreach ( $children as $child_line_item ) {
			if ( $child_line_item instanceof EE_Line_Item ) {
				$child_line_item->set_parent_ID( $this->ID() );
				$child_line_item->save_this_and_descendants_to_txn( $txn_id );
			}
		}
	}



	/**
	 * @deprecated
	 * @param string $type one of the constants on EEM_Line_Item
	 * @return EE_Line_Item[]
	 */
	protected function _get_descendants_of_type( $type ) {
		EE_Error::doing_it_wrong( 'EE_Line_Item::_get_descendants_of_type()', __('Method replaced with EEH_Line_Item::get_descendants_of_type()', 'event_espresso'), '4.6.0' );
		EE_Registry::instance()->load_helper( 'Line_Item' );
		return EEH_Line_Item::get_descendants_of_type( $this, $type );
	}



	/**
	 * @deprecated
	 * @param string $type like one of the EEM_Line_Item::type_*
	 * @return EE_Line_Item
	 */
	public function get_nearest_descendant_of_type( $type ) {
		EE_Error::doing_it_wrong( 'EE_Line_Item::get_nearest_descendant_of_type()', __('Method replaced with EEH_Line_Item::get_nearest_descendant_of_type()', 'event_espresso'), '4.6.0' );
		EE_Registry::instance()->load_helper( 'Line_Item' );
		return EEH_Line_Item::get_nearest_descendant_of_type( $this, $type );
	}



	/**
	 * If this item has an ID, then this saves it again to update the db
	 *
	 * @return int count of items saved
	 */
	public function maybe_save() {
		if ( $this->ID() ) {
			return $this->save();
		}
		return false;
	}



}
