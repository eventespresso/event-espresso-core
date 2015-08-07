<?php
if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * Class EEI_Line_Item
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Mike Nelson / Brent Christensen
 *
 */
interface EEI_Line_Item {

	/**
	 * generic setter
	 * @param    string $field_name
	 * @param    mixed  $field_value
	 * @param bool      $use_default
	 */
	public function set( $field_name, $field_value, $use_default = false );



	/**
	 * @return string
	 */
	function name();



	/**
	 * @return string
	 */
	function desc();



	/**
	 * The unit price for the items of this line item
	 * @return float
	 */
	function unit_price();



	/**
	 * Returns the number of items in this line item
	 * @return int
	 */
	function quantity();



	/**
	 * Sets quantity
	 * @param int $quantity
	 */
	function set_quantity( $quantity );



	/**
	 * Returns the total amount due for this line item
	 * (usually quantity x unit_price)
	 * @return float
	 */
	function total();



	/**
	 * Gets all teh children line items of type 'line-item'
	 * @return EEI_Line_Item[]
	 */
	function get_items();



	/**
	 * Gets the total for all the items purchased only
	 * @return float
	 */
	function get_items_total();



	/**
	 * Gets all the children line items of type 'tax'
	 * @return EEI_Line_Item[]
	 */
	function tax_descendants();



	/**
	 * Gets the total amount of the tax sub-line items
	 * @return float
	 */
	function get_total_tax();



	/**
	 * Returns the name of the event the ticket is for
	 * @return string
	 */
	function ticket_event_name();



	/**
	 * Saves this line item to the DB, and recursively saves its descendants.
	 * Also sets the transaction on this line item and all its descendants before saving
	 * @param int $txn_id if none is provided, assumes $this->TXN_ID()
	 * @return int count of items saved
	 */
	function save_this_and_descendants_to_txn( $txn_id = null );



	/**
	 * Indicates whether or not taxes should apply to this line item
	 * @return boolean
	 */
	function is_taxable();



	/**
	 * Gets ALL the children of this line item (ie, all the parts that contribute towards this total).
	 * @return EEI_Line_Item[]
	 */
	function children();



	/**
	 * Adds the line item as a child to this line item. If there is another child line
	 * item with the same LIN_code, it is overwritten by this new one
	 * @param EEI_Line_Item $line_item
	 * @param bool         $set_order
	 * @return bool true for success, false for fail
	 */
	function add_child_line_item( EEI_Line_Item $line_item, $set_order = true );



	/**
	 * Gets the line item type
	 * @return string
	 */
	function type();



	/**
	 * Gets item_id
	 * @return string
	 */
	function OBJ_ID();



	/**
	 * Gets the related item type ( like: Ticket or Event )
	 * @return string
	 */
	function OBJ_type();



	/**
	 * Gets the final total on this item, taking taxes into account.
	 * Has the side-effect of setting the sub-total as it was just calculated.
	 * If this is used on a grand-total line item, also updates the transaction's
	 * TXN_total
	 * @return float
	 */
	function recalculate_total_including_taxes();

	/**
	 * Checks if this item is a percentage modifier or not
	 * @throws EE_Error
	 * @return boolean
	 */
	function is_percent();

	/**
	 * Gets percent (between 100-.001)
	 * @return float
	 */
	function percent();

	/**
	 * Sets total
	 * @param float $total
	 * @return boolean
	 */
	function set_total( $total );

	/**
	 * Sets unit_price
	 * @param float $unit_price
	 * @return boolean
	 */
	function set_unit_price( $unit_price );

	/**
	 * If this line item has been saved to the DB, deletes its child with LIN_code == $code. If this line
	 * HAS NOT been saved to the DB, removes the child line item with index $code.
	 * Also searches through the child's children for a matching line item. However, once a line item has been found
	 * and deleted, stops searching (so if there are line items with duplicate codes, only the first one found will be deleted)
	 * @param string $code
	 * @param bool $stop_search_once_found
	 * @return int count of items deleted (or simply removed from the line item's cache, if not has not been saved to the DB yet)
	 */
	function delete_child_line_item( $code, $stop_search_once_found = true );

	/**
	 * Forgets the cached model of the given relation Name. So the next time we request it,
	 * we will fetch it again from the database. (Handy if you know it's changed somehow).
	 * If a specific object is supplied, and the relationship to it is either a HasMany or HABTM,
	 * then only remove that one object from our cached array. Otherwise, clear the entire list
	 * @param string $relationName                         one of the keys in the _model_relations array on the model. Eg 'Registration'
	 * @param mixed  $object_to_remove_or_index_into_array or an index into the array of cached things, or NULL
	 * if you intend to use $clear_all = TRUE, or the relation only has 1 object anyways (ie, it's a BelongsToRelation)
	 * @param bool   $clear_all                            This flags clearing the entire cache relation property if this is HasMany or HABTM.
	 * @throws EE_Error
	 * @return EE_Base_Class | boolean from which was cleared from the cache, or true if we requested to remove a relation from all
	 */
	public function clear_cache($relationName, $object_to_remove_or_index_into_array = NULL, $clear_all = FALSE);

	/**
	 * Sets whether or not this model object should be allowed to be saved to the DB.
	 * Normally once this is set to FALSE you wouldn't set it back to TRUE, unless
	 * you got new information that somehow made you change your mind.
	 * @param boolean $allow_persist
	 * @return boolean
	 */
	function set_allow_persist( $allow_persist );


}
// End of file EEI_Line_Item.interface.php
// Location: /EEI_Line_Item.interface.php