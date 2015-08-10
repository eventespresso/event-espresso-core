<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }



/**
 * Interface EEI_Base
 */
interface EEI_Base{
	/**
	 * gets the unique ID of the model object. If it hasn't been saved yet
	 * to the database, this should be 0 or NULL
	 */
	function ID();
	/**
	 * Returns an array where keys are field names and values are their values
	 * @return array
	 */
	function model_field_array();

	/**
	 * Saves the thing to the database and returns success (or an ID)
	 * @return boolean success on insert; or int on update (ID of newly inserted thing)
	 */
	function save();
}





/**
 * Interface EEI_Transaction
 */
interface EEI_Transaction extends EEI_Base {
	/**
	 *
	 * @return EEI_Payment
	 */
	function last_payment();
	/**
	 * Gets the total that should eb paid for this transaction
	 * @return float
	 */
	function total();

	/**
	 * Get the line item that represents the total for the transaction
	 * @return EEI_Line_Item
	 */
	function total_line_item();

	/**
	 * Gets the primary registration for this transaction
	 * @return EEI_Registration
	 */
	function primary_registration();

	/**
	 * Returns the balance due on the transaction
	 * @return float
	 */
	function remaining();
}





/**
 * Interface EEI_Line_Item
 */
interface EEI_Line_Item{
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
	public function get_items_total();
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
	public function save_this_and_descendants_to_txn( $txn_id = NULL );

	/**
	 * Indicates whether or not taxes should apply to this line item
	 * @return boolean
	 */
	public function is_taxable();
}





/**
 * Interface EEI_Registration
 */
interface EEI_Registration extends EEI_Base {
	/**
	 * Gets the registration code
	 * @return string
	 */
	function reg_code();

	/**
	 * Gets the attendee corresponding to this registration
	 * @return EEI_Attendee
	 */
	function attendee();

	/**
	 * Returns the event's name this registration is for
	 * @return string
	 */
	function event_name();
}





/**
 * Interface EEI_Attendee
 */
interface EEI_Attendee {
	public function fname();
	public function lname();
	public function email();
	public function phone();
	public function address();
	public function address2();
	public function city();
	public function state_ID();
	public function state_name();
	/**
	 * @return EE_State
	 */
	public function state_obj();
	public function country_ID();
	public function country_name();
	/**
	 * @return EE_Country
	 */
	public function country_obj();
	public function zip();
}





/**
 * Interface EEI_Contact
 */
interface EEI_Contact {
	public function fname();
	public function lname();
	public function email();
	public function phone();
}





/**
 * Interface EEI_Address
 */
interface EEI_Address {
	public function address();
	public function address2();
	public function city();
	/**
	 * @return EE_State
	 */
	public function state_obj();
	public function state_ID();
	public function state_name();
	public function state_abbrev();
	public function state();
	/**
	 * @return EE_Country
	 */
	public function country_obj();
	public function country_ID();
	public function country_name();
	public function country();
	public function zip();
}





/**
 * Interface EEI_Address_Formatter
 */
interface EEI_Address_Formatter {

	/**
	 * @param string $address
	 * @param string $address2
	 * @param string $city
	 * @param string $state
	 * @param string $country
	 * @param string $zip
	 * @param string mixed
	 */
	public function format( $address, $address2, $city, $state, $country, $zip );
}





/**
 * Interface EEHI_Line_Item
 */
interface EEHI_Line_Item{
	/**
	 * Adds an item to the purchase in the right spot
	 * @param EE_Line_Item $total_line_item
	 * @param EE_Line_Item $line_item
	 */
	public function add_item( EE_line_Item $total_line_item, EE_Line_Item $line_item );
	/**
	 * Overwrites the previous tax by clearing out the old taxes, and creates a new
	 * tax and updates the total line item accordingly
	 * @param EE_Line_Item $total_line_item
	 * @param float $amount
	 * @param string $name
	 * @param string $description
	 * @return EE_Line_Item the new tax created
	 */
	public function set_total_tax_to( EE_Line_Item $total_line_item, $amount, $name  = NULL, $description = NULL );

	/**
	 * Adds a simple item ( unrelated to any other model object) to the total line item,
	 * in the correct spot in the line item tree.
	 * @param EE_Line_Item $total_line_item
	 * @param string $name
	 * @param float $unit_price
	 * @param string $description
	 * @param int $quantity
	 * @param boolean $taxable
	 * @return boolean success
	 */
	public function add_unrelated_item( EE_Line_Item $total_line_item, $name, $unit_price, $description = '', $quantity = 1, $taxable = FALSE );
}


/**
 * Money-related helper
 */
interface EEHI_Money{
		/**
	 * For comparing floats. Default operator is '=', but see the $operator below for all options.
	 * This should be used to compare floats instead of normal '==' because floats
	 * are inherently inprecise, and so you can sometimes have two floats that appear to be identical
	 * but actually differ by 0.00000001.
	 * @param float $float1
	 * @param float $float2
	 * $param string $operator  The operator. Valid options are =, <=, <, >=, >, <>, eq, lt, lte, gt, gte, ne
	 * @return boolean whether the equation is true or false
	 */
	function compare_floats( $float1, $float2, $operator='=' );
}

/**
 * Interface EEHI_Template
 */
interface EEHI_Template{

	/**
	 * EEH_Template::format_currency
	 * This helper takes a raw float value and formats it according to the default config country currency settings, or the country currency settings from the supplied country ISO code
	 *
	 * @param  float   $amount raw money value
	 * @param  boolean $return_raw whether to return the formatted float value only with no currency sign or code
	 * @param  boolean $display_code whether to display the country code (USD). Default = TRUE
	 * @param  string  $CNT_ISO 2 letter ISO code for a country
	 * @param string   $cur_code_span_class
	 * @return string the html output for the formatted money value
	 */
	public static function format_currency( $amount = NULL, $return_raw = FALSE, $display_code = TRUE, $CNT_ISO = '', $cur_code_span_class = 'currency-code' );
}



/**
 * Interface EEI_Line_Item_Display
 */
interface EEI_Line_Item_Display {

	/**
	 * @param EE_Line_Item $line_item
	 * @param array $options
	 * @return mixed
	 */
	public function display_line_item( EE_Line_Item $line_item, $options = array() );

}

// End of file EEI_Interfaces.php
// Location: /core/EEI_Interfaces.php
