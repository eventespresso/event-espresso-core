<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * Line Item Model. MOstly used for storing a snapshot of all the items in a transaction
 * as they were recorded at teh time of transaction completion (purchase)
 *
 * This links Registrations with datetimes for recording checkin's and checkouts (and attendance)
 *
 * @package			Event Espresso
 * @subpackage		includes/models/EEM_Checkin.model.php
 * @author			Darren Ethier
 *
 * ------------------------------------------------------------------------
 */

class EEM_Line_Item extends EEM_Base {

	// private instance of the EEM_Checkin object
	private static $_instance = NULL;



	/**
	 * 		This funtion is a singleton method used to instantiate the EEM_Line_Item object
	 *
	 * 		@access public
	 * 		@param string $timezone string representing the timezone we want to set for returned Date Time Strings (and any incoming timezone data that gets saved).  Note this just sends the timezone info to the date time model field objects.  Default is NULL (and will be assumed using the set timezone in the 'timezone_string' wp option)
	 * 		@return EEM_Checkin instance
	 */
	public static function instance( $timezone = NULL ) {

		// check if instance of EEM_Checkin already exists
		if (self::$_instance === NULL) {
			// instantiate Price_model
			self::$_instance = new self( $timezone );
		}

		//set timezone if we have in incoming string
		if ( !empty( $timezone ) )
			self::$_instance->set_timezone( $timezone );
		
		// EEM_Checkin object
		return self::$_instance;
	}



	/**
	 * 		private constructor to prevent direct creation
	 * 		@Constructor
	 * 		@access protected
	 * 		@param string $timezone string representing the timezone we want to set for returned Date Time Strings (and any incoming timezone data that gets saved).  Note this just sends the timezone info to the date time model field objects.  Default is NULL (and will be assumed using the set timezone in the 'timezone_string' wp option)
	 * 		@return void
	 */
	protected function __construct( $timezone ) {
		$this->singlular_item = __('Line Item','event_espresso');
		$this->plural_item = __('Line Items','event_espresso');		

		$this->_tables = array(
			'Line_Item'=>new EE_Primary_Table('esp_line_item','LIN_ID')
		);
		$line_items_can_be_for = array('Ticket','Price');
		$this->_fields = array(
			'Line_Item'=> array(
				'LIN_ID'=>new EE_Primary_Key_Int_Field('LIN_ID', __("ID", "event_espresso")),
				'LIN_code'=>new EE_Slug_Field('LIN_code', __("Code for index into Cart", "event_espresso"), true),
				'TXN_ID'=>new EE_Foreign_Key_Int_Field('TXN_ID', __("Transaction ID", "event_espresso"), true, null, 'Transaction'),
				'LIN_name'=>new EE_Full_HTML_Field('LIN_name', __("Line Item Name", "event_espresso"), false, ''),
				'LIN_desc'=>new EE_Full_HTML_Field('LIN_desc', __("Line Item Description", "event_espresso"), true),
				'LIN_unit_price'=>new EE_Float_Field('LIN_unit_price',  __("Unit Price", "event_espresso"),false,0),
				'LIN_is_percent'=>new EE_Boolean_Field('LIN_is_percent', __("Is Percent", "event_espresso"), false, false),
				'LIN_is_taxable'=>new EE_Boolean_Field('LIN_is_taxable', __("Taxable", "event_espresso"), false, false),
				'LIN_order'=>new EE_Integer_Field('LIN_order', __("Order of Application towards total of parent", "event_espresso"), false,1),
				'LIN_total'=>new EE_Float_Field('LIN_total', __("Total (unit price x quantity)", "event_espresso"), false, 0),
				'LIN_quantity'=>new EE_Integer_Field('LIN_quantity', __("Quantity", "event_espresso"), true, null),
				'LIN_parent'=>new EE_Integer_Field('LIN_parent', __("Parent ID (this item goes towards that Line Item's total)", "event_espresso"), true, null),
				'LIN_type'=>new EE_Enum_Text_Field('LIN_type', __("Type", "event_espresso"), false, 'line-item', 
						array(
							'line-item'=>  __("Line Item", "event_espresso"),
							'sub-item'=>  __("Sub-Item", "event_espresso"),
							'subtotal'=>  __("Subtotal", "event_espresso"),
							'tax'=>  __("Tax", "event_espresso"),
							'total'=>  __("Total", "event_espresso"))),
				'OBJ_ID'=>new EE_Foreign_Key_Int_Field('OBJ_ID', __("ID of Item purchased.", "event_espresso"), true,null,$line_items_can_be_for),
				'OBJ_type'=>new EE_Any_Foreign_Model_Name_Field('OBJ_type', __("Model Name this Line Item is for", "event_espresso"), true,null,$line_items_can_be_for),
			)
		);
		$this->_model_relations = array(
			'Transaction'=>new EE_Belongs_To_Relation(),
			'Ticket'=>new EE_Belongs_To_Any_Relation(),
			'Price'=>new EE_Belongs_To_Any_Relation(),
		);
		parent::__construct( $timezone );
	}
}