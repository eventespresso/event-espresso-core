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
 * Price Type Model
 *
 * @package			Event Espresso
 * @subpackage		includes/models/
 * @author				Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Soft_Delete_Base.model.php' );

class EEM_Price_Type extends EEM_Soft_Delete_Base {

	// private instance of the Price Type object
	private static $_instance = NULL;
	// An array of the price type objects
	public $type = NULL;

	/**
	*	Price Base types
	*
	*	@access	private
	*	@var int
	*/
	public $base_types = null; 

	/**
	 * return an array of Base types. Keys are INTs which are used in teh database,
	 * values are text-representations of the base type.
	 * @return array
	 */
	public function get_base_types(){
		return $this->base_types;
	}
	
	/**
	 * Gets the naem of teh base 
	 * @param type $base_type_int
	 * @return type
	 */
	public function get_base_type_name($base_type_int){
		return $this->base_types[$base_type_int];
	}
	
	/**
	 * constants for price base types. In the DB, we decided to store the price base type
	 * as an integer. So, to avoid just having magic numbers everwhere (eg, querying for 
	 * all price types with PBT_ID = 2), we define these constants, to make code more understandable.
	 * So, as an example, to query for all price types that are a tax, we'd do
	 * EEM_PRice_Type::instance()->get_all(array(array('PBT_ID'=>EEM_Price_Type::base_type_tax)))
	 * instead of 
	 * EEM_Price_Type::instance()->get_all(array(array('PBT_ID'=>2)))
	 * Although the 2nd is shorter, it's much less obvious what it's doing. Also, should these magic IDs ever
	 * change, we can continue to use the constant, by simply change its value.
	 */
	const base_type_event_price = 1;
	const base_type_discount = 2;
	const base_type_surcharge = 3;
	const base_type_tax = 4;
	/**
	 * 		private constructor to prevent direct creation
	 * 		@Constructor
	 * 		@access protected
	 * 		@return void
	 */
	protected function __construct() {
//		global $wpdb;
		// set table name
//		$this->table_name = $wpdb->prefix . 'esp_price_type';
		// set item names
		$this->base_types = array( 
			EEM_Price_Type::base_type_event_price => __('Event Price','event_espresso'), 
			EEM_Price_Type::base_type_discount => __('Discount','event_espresso'), 
			EEM_Price_Type::base_type_surcharge => __('Surcharge','event_espresso'), 
			EEM_Price_Type::base_type_tax => __('Tax','event_espresso') );
		$this->singlular_item = __('Price Type','event_espresso');
		$this->plural_item = __('Price Types','event_espresso');		
		// array representation of the price type table and the data types for each field
//		$this->table_data_types = array(
//				'PRT_ID' 					=> '%d',
//				'PRT_name' 			=> '%s',
//				'PBT_ID' 					=> '%d',
//				'PRT_is_member' 	=> '%d',
//				'PRT_is_discount' 	=> '%d',
//				'PRT_is_tax' 			=> '%d',
//				'PRT_is_percent' 	=> '%d',
//				'PRT_is_global' 		=> '%d',
//				'PRT_order' 			=> '%d',
//				'PRT_deleted'			=> '%d'
//		);
		$this->_tables = array(
			'Price_Type'=>new EE_Primary_Table('esp_price_type','PRT_ID')
		);
		$this->_fields = array(
			'Price_Type'=>array(
				'PRT_ID'=>new EE_Primary_Key_Int_Field('PRT_ID', __('Price Type ID','event_espresso'), false, 0),
				'PRT_name'=>new EE_Plain_Text_Field('PRT_name', __('Price Type Name','event_espresso'), false, ''),
				'PBT_ID'=>new EE_Enum_Field('PBT_ID', __('Price Base type ID, 1 = Event Price , 2 = Discount , 3 = Surcharge , 4 = Tax','event_espresso'), false, 1, $this->base_types,true),
				'PRT_is_member'=>new EE_Boolean_Field('PRT_is_member', __('Flag indicating price is only for members','event_espresso'), false, false),
				'PRT_is_percent'=>new EE_Boolean_Field('PRT_is_percent', __('Flag indicating price is a percentage','event_espresso'), false, false),
				'PRT_is_global'=>new EE_Boolean_Field('PRT_is_global', __('Flag indicating price shoudl automatically be added to all events','event_espresso'), false, false),
				'PRT_order'=>new EE_Integer_Field('PRT_order', __('Order in which price should be applied. ','event_espresso'), false, 0),
				'PRT_deleted'=>new EE_Trashed_Flag_Field('PRT_deleted', __('Flag indicating price type has been trahsed','event_espresso'), false, false)
			)
		);
		$this->_model_relations = array(
			'Price'=>new EE_Has_Many_Relation(),
		);
		
		parent::__construct();
		//$this->type = $this->get_all();

	}





	/**
	 * 		This funtion is a singleton method used to instantiate the EEM_Attendee object
	 *
	 * 		@access public
	 * 		@return EEM_Price_Type instance
	 */
	public static function instance() {

		// check if instance of EEM_Price_Type already exists
		if (self::$_instance === NULL) {
			// instantiate Price_Type model
			self::$_instance = new self();
		}
		// EEM_Price_Type object
		return self::$_instance;
	}




	/**
	 * 		instantiate a new price type object with blank/empty properties
	 *
	 * 		@access		public
	 * 		@return		mixed		array on success, FALSE on fail
	 */
	public function get_new_price_type() {
		return new EE_Price_Type( '', 1, FALSE, FALSE, FALSE, 0, FALSE );
	}















	public function delete_by_ID($ID) {
		if (!$ID) {
			return FALSE;
		}
		//check if any prices use this price type
		if ( $prices = $this->get_all_related($ID,'Price')) {
			$msg = __('The Price Type could not be deleted because there are existing Prices that currently use this Price Type.  If you still wish to delete this Price Type, then either delete those Prices or change them to use other Price Types.', 'event_espresso');
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ ); 
			return FALSE;
		} 
		
		return parent::delete_by_ID($ID);

	}






}

// End of file EEM_Price_Type.model.php
// Location: /ee-mvc/models/EEM_Price_Type.model.php