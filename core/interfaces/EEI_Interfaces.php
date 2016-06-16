<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }



/**
 * Interface EEI_Base
 */
interface EEI_Base{
	/**
	 * gets the unique ID of the model object. If it hasn't been saved yet
	 * to the database, this should be 0 or NULL
	 */
	public function ID();
	/**
	 * Returns an array where keys are field names and values are their values
	 * @return array
	 */
	public function model_field_array();

	/**
	 * Saves the thing to the database and returns success (or an ID)
	 * @return boolean success on insert; or int on update (ID of newly inserted thing)
	 */
	public function save();

	/**
	 * Similar to insert_post_meta, adds a record in the Extra_Meta model's table with the given key and value.
	 * A $previous_value can be specified in case there are many meta rows with the same key
	 * @param string $meta_key
	 * @param string $meta_value
	 * @param string $previous_value
	 * @return int records updated (or BOOLEAN if we actually ended up inserting the extra meta row)
	 * NOTE: if the values haven't changed, returns 0
	 */
	public function update_extra_meta($meta_key,$meta_value,$previous_value = NULL);

	/**
	 * Adds a new extra meta record. If $unique is set to TRUE, we'll first double-check
	 * no other extra meta for this model object have the same key. Returns TRUE if the
	 * extra meta row was entered, false if not
	 * @param string $meta_key
	 * @param string $meta_value
	 * @param boolean $unique
	 * @return boolean
	 */
	public function add_extra_meta($meta_key,$meta_value,$unique = false);

	/**
	 * Deletes all the extra meta rows for this record as specified by key. If $meta_value
	 * is specified, only deletes extra meta records with that value.
	 * @param string $meta_key
	 * @param string $meta_value
	 * @return int number of extra meta rows deleted
	 */
	public function delete_extra_meta($meta_key,$meta_value = NULL);

	/**
	 * Gets the extra meta with the given meta key. If you specify "single" we just return 1, otherwise
	 * an array of everything found. Requires that this model actually have a relation of type EE_Has_Many_Any_Relation.
	 * You can specify $default is case you haven't found the extra meta
	 * @param string $meta_key
	 * @param boolean $single
	 * @param mixed $default if we don't find anything, what should we return?
	 * @return mixed single value if $single; array if ! $single
	 */
	public function get_extra_meta($meta_key,$single = FALSE,$default = NULL);
}



/**
 * EEI_Request_Decorator Interface
 */
interface EEI_Request_Decorator {

	/**
	 * converts a Request to a Response
	 * can perform their logic either before or after the core application has run like so:
	 *
	 *    public function handle_request( EE_Request $request, EE_Response $response ) {
	 *        $this->request = $request;
	 *        $this->response = $response;
	 *      // logic performed BEFORE core app has run
	 *      $this->process_request_stack( $this->request, $this->response );
	 *      // logic performed AFTER core app has run
	 *      return $response;
	 *    }
	 *
	 * @param 	EE_Request 	$request
	 * @param 	EE_Response $response
	 * @return 	EE_Response
	 */
	public function handle_request( EE_Request $request, EE_Response $response );
}



/**
 * Interface EEI_Request_Stack_Core_App
 */
interface EEI_Request_Stack_Core_App {

	/**
	 * gives the core app a chance to handle the response after the request stack has fully processed
	 *
	 * @param EE_Request $request
	 * @param EE_Response $response
	 */
	public function handle_response( EE_Request $request, EE_Response $response );
}



/**
 * Interface EEI_Transaction
 */
interface EEI_Transaction extends EEI_Base {
	/**
	 *
	 * @return EEI_Payment
	 */
	public function last_payment();
	/**
	 * Gets the total that should eb paid for this transaction
	 * @return float
	 */
	public function total();

	/**
	 * Get the line item that represents the total for the transaction
	 * @return EEI_Line_Item
	 */
	public function total_line_item();

	/**
	 * Gets the primary registration for this transaction
	 * @return EEI_Registration
	 */
	public function primary_registration();

	/**
	 * Returns the balance due on the transaction
	 * @return float
	 */
	public function remaining();

	/**
	 *        get Total Amount Paid to Date
	 * @access        public
	 * @return float
	 */
	public function paid();
}






/**
 * Interface EEI_Registration
 */
interface EEI_Registration extends EEI_Base {
	/**
	 * Gets the registration code
	 * @return string
	 */
	public function reg_code();

	/**
	 * Gets the attendee corresponding to this registration
	 * @return EEI_Attendee
	 */
	public function attendee();

	/**
	 * Returns the event's name this registration is for
	 * @return string
	 */
	public function event_name();
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
 * Interface EEI_Has_Address
 */
interface EEI_Has_Address {

	public function address();
	public function address2();
	public function city();
	public function state_ID();
	public function state_obj();
	public function country_ID();
	public function country_obj();
	public function zip();
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
	 * @param string $zip
	 * @param string $country
	 * @param string $CNT_ISO
	 */
	public function format( $address, $address2, $city, $state, $zip, $country, $CNT_ISO );
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
	public function add_item( EE_Line_Item $total_line_item, EE_Line_Item $line_item );
	/**
	 * Overwrites the previous tax by clearing out the old taxes, and creates a new
	 * tax and updates the total line item accordingly
	 * @param EE_Line_Item $total_line_item
	 * @param float $amount
	 * @param string $name
	 * @param string $description
         * @param string $code
         * @param boolean $add_to_existing_line_item if true and a duplicate line item with
         *  the same code is found, $amount will be added onto it; otherwise will simply
         *  set the taxes to match $amount
	 * @return EE_Line_Item the new tax created
	 */
	public function set_total_tax_to( EE_Line_Item $total_line_item, $amount, $name  = NULL, $description = NULL, $code = NULL, $add_to_existing_line_item = false );

         /**
         * Makes all the line items which are children of $line_item taxable (or not).
         * Does NOT save the line items
         * @param EE_Line_Item $line_item
         * @param boolean $taxable
         * @param string $code_substring_for_whitelist if this string is part of the line item's code
         *  it will be whitelisted (ie, except from becoming taxable)
         */
        public static function set_line_items_taxable( EE_Line_Item $line_item, $taxable = true, $code_substring_for_whitelist = null );

	/**
	 * Adds a simple item ( unrelated to any other model object) to the total line item,
	 * in the correct spot in the line item tree.
	 * @param EE_Line_Item $total_line_item
	 * @param string $name
	 * @param float $unit_price
	 * @param string $description
	 * @param int $quantity
	 * @param boolean $taxable
	 * @param boolean $code if set to a value, ensures there is only one line item with that code
	 * @return boolean success
	 */
	public function add_unrelated_item( EE_Line_Item $total_line_item, $name, $unit_price, $description = '', $quantity = 1, $taxable = FALSE, $code = null );

	/**
	 * Gets the line item for the taxes subtotal
	 * @param EE_Line_Item $total_line_item of type EEM_Line_Item::type_total
	 * @return \EE_Line_Item
	 */
	public static function get_taxes_subtotal( EE_Line_Item $total_line_item );
}


/**
 * Money-related helper
 */
interface EEHI_Money{
		/**
	 * For comparing floats. Default operator is '=', but see the $operator below for all options.
	 * This should be used to compare floats instead of normal '==' because floats
	 * are inherently imprecise, and so you can sometimes have two floats that appear to be identical
	 * but actually differ by 0.00000001.
	 * @param float $float1
	 * @param float $float2
	 * @param string $operator  The operator. Valid options are =, <=, <, >=, >, <>, eq, lt, lte, gt, gte, ne
	 * @return boolean whether the equation is true or false
	 */
	public function compare_floats( $float1, $float2, $operator='=' );
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



/**
 * Interface EEHI_File
 */
interface EEHI_File {
	/**
	 * ensure_file_exists_and_is_writable
	 * ensures that a file exists and is writable, will attempt to create file if it does not exist
	 * @param string $full_file_path
	 * @throws EE_Error
	 * @return bool
	 */
	public static function ensure_file_exists_and_is_writable( $full_file_path = '' );

	/**
	 * ensure_folder_exists_and_is_writable
	 * ensures that a folder exists and is writable, will attempt to create folder if it does not exist
	 * @param string $folder
	 * @throws EE_Error
	 * @return bool
	 */
	public static function ensure_folder_exists_and_is_writable( $folder = '' );
}

// End of file EEI_Interfaces.php
// Location: /core/EEI_Interfaces.php
