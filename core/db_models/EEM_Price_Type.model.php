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
require_once ( EE_MODELS . 'EEM_Soft_Delete_Base.model.php' );
require_once ( EE_CLASSES . 'EE_Price_Type.class.php' );


class EEM_Price_Type extends EEM_Soft_Delete_Base {

	// private instance of the Price Type object
	protected static $_instance = NULL;
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
	 * return an array of Base types. Keys are INTs which are used in the database,
	 * values are text-representations of the base type.
	 * @return array
	 */
	public function get_base_types(){
		return $this->base_types;
	}

	/**
	 * Gets the name of the base
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
	const base_type_base_price = 1;
	const base_type_discount = 2;
	const base_type_surcharge = 3;
	const base_type_tax = 4;
	/**
	 * 		private constructor to prevent direct creation
	 * 		@Constructor
	 * 		@access protected
	 * 		@return void
	 */
	protected function __construct( $timezone = NULL ) {
		$this->base_types = array(
			EEM_Price_Type::base_type_base_price => __('Price','event_espresso'),
			EEM_Price_Type::base_type_discount => __('Discount','event_espresso'),
			EEM_Price_Type::base_type_surcharge => __('Surcharge','event_espresso'),
			EEM_Price_Type::base_type_tax => __('Tax','event_espresso') );
		$this->singular_item = __('Price Type','event_espresso');
		$this->plural_item = __('Price Types','event_espresso');

		$this->_tables = array(
			'Price_Type'=>new EE_Primary_Table('esp_price_type','PRT_ID')
		);
		$this->_fields = array(
			'Price_Type'=>array(
				'PRT_ID'=>new EE_Primary_Key_Int_Field('PRT_ID', __('Price Type ID','event_espresso')),
				'PRT_name'=>new EE_Plain_Text_Field('PRT_name', __('Price Type Name','event_espresso'), false, ''),
				'PBT_ID'=>new EE_Enum_Integer_Field('PBT_ID', __('Price Base type ID, 1 = Price , 2 = Discount , 3 = Surcharge , 4 = Tax','event_espresso'), false, EEM_Price_Type::base_type_base_price, $this->base_types),
				'PRT_is_percent'=>new EE_Boolean_Field('PRT_is_percent', __('Flag indicating price is a percentage','event_espresso'), false, false),
				'PRT_order'=>new EE_Integer_Field('PRT_order', __('Order in which price should be applied. ','event_espresso'), false, 0),
				'PRT_deleted'=>new EE_Trashed_Flag_Field('PRT_deleted', __('Flag indicating price type has been trashed','event_espresso'), false, false),
				'PRT_wp_user' => new EE_WP_User_Field('PRT_wp_user', __('Price Type Creator ID', 'event_espresso'), FALSE ),
			)
		);
		$this->_model_relations = array(
			'Price'=>new EE_Has_Many_Relation(),
			'WP_User' => new EE_Belongs_To_Relation(),
		);
		//this model is generally available for reading
		$this->_cap_restriction_generators[ EEM_Base::caps_read ] = new EE_Restriction_Generator_Public();
		//all price types are "default" in terms of capability names
		$this->_caps_slug = 'default_price_types';
		parent::__construct( $timezone );

	}




	/**
	 * 		instantiate a new price type object with blank/empty properties
	 *
	 * 		@access		public
	 * 		@return		mixed		array on success, FALSE on fail
	 */
	public function get_new_price_type() {
		return EE_Price_Type::new_instance();
	}














/**
 *
 * @param type $query_params
 * @param boolean $allow_blocking if TRUE, matched objects will only be deleted if there is no related model info
	 * that blocks it (ie, there' sno other data that depends on this data); if false, deletes regardless of other objects
	 * which may depend on it. Its generally advisable to always leave this as TRUE, otherwise you could easily corrupt your DB
 * @return boolean
 */
	public function delete_permanently($query_params = array(), $allow_blocking = true) {

		$would_be_deleted_price_types = $this->get_all_deleted_and_undeleted($query_params);
		$would_be_deleted_price_type_ids = array_keys($would_be_deleted_price_types);

		$ID = $query_params[0][$this->get_primary_key_field()->get_name()];

		//check if any prices use this price type
		$prc_query_params = array(array('PRT_ID'=>array('IN',$would_be_deleted_price_type_ids)));
		if ( $prices = $this->get_all_related($ID,'Price',$prc_query_params)) {
			$prices_names_and_ids = array();
			foreach($prices as $price){
				/* @var $price EE_Price */
				$prices_names_and_ids[] = $price->name()."(".$price->ID().")";
			}
			$msg = sprintf(__('The Price Type(s) could not be deleted because there are existing Prices that currently use this Price Type.  If you still wish to delete this Price Type, then either delete those Prices or change them to use other Price Types.The prices are: %s', 'event_espresso'),implode(",",$prices_names_and_ids));
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}



		return parent::delete_permanently($query_params);

	}






}

// End of file EEM_Price_Type.model.php
// Location: /ee-mvc/models/EEM_Price_Type.model.php
