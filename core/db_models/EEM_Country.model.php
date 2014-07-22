<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	4.0.B
 *
 * ------------------------------------------------------------------------
 *
 * Country Model
 *
 * @package			Event Espresso
 * @subpackage	includes/models/
 * @author				Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EEM_Country extends EEM_Base {

  	// private instance of the Attendee object
	private static $_instance = NULL;
  	// array of all countries
	private static $_all_countries = FALSE;
  	// array of all active countries
	private static $_active_countries = FALSE;



	/**
	 *		This function is a singleton method used to instantiate the EEM_Country object
	 *
	 *		@access public
	 *		@return EEM_Country instance
	 */
	public static function instance(){

		// check if instance of EEM_Country already exists
		if ( self::$_instance === NULL ) {
			// instantiate Espresso_model
			self::$_instance = new self();
		}
		// EEM_Country object
		return self::$_instance;
	}

	protected function __construct(){
		$this->singular_item = __('Country','event_espresso');
		$this->plural_item = __('Countries','event_espresso');


		$this->_tables = array(
			'Country'=> new EE_Primary_Table('esp_country', 'CNT_ISO')
		);
		$this->_fields = array(
			'Country'=>array(
				'CNT_active' => new EE_Boolean_Field('CNT_active', __('Country Appears in Dropdown Select Lists','event_espresso'), false, true),
				'CNT_ISO'=> new EE_Primary_Key_String_Field('CNT_ISO', __('Country ISO Code','event_espresso')),
				'CNT_ISO3'=>new EE_All_Caps_Text_Field('CNT_ISO3', __('Country ISO3 Code','event_espresso'), false,''),
				'RGN_ID'=>new EE_All_Caps_Text_Field('RGN_ID', __('Region ID','event_espresso'), false,0),//should be a foreign key, but no region table exists yet
				'CNT_name'=>new EE_Plain_Text_Field('CNT_name', __('Country Name','event_espresso'), false,''),
				'CNT_cur_code'=>new EE_All_Caps_Text_Field('CNT_cur_code', __('Country Currency Code','event_espresso'), false),
				'CNT_cur_single' => new EE_Plain_Text_Field('CNT_cur_single', __('Currency Name Singular','event_espresso'), false),
				'CNT_cur_plural' => new EE_Plain_Text_Field('CNT_cur_plural', __('Currency Name Plural','event_espresso'), false),
				'CNT_cur_sign' => new EE_Plain_Text_Field('CNT_cur_sign', __('Currency Sign','event_espresso'), false),
				'CNT_cur_sign_b4' => new EE_Boolean_Field('CNT_cur_sign_b4', __('Currency Sign Before Number','event_espresso'), false, true),
				'CNT_cur_dec_plc' => new EE_Integer_Field('CNT_cur_dec_plc', __('Currency Decimal Places','event_espresso'), false, 2),
				'CNT_cur_dec_mrk' => new EE_Plain_Text_Field('CNT_cur_dec_mrk', __('Currency Decimal Mark','event_espresso'), false, '.'),
				'CNT_cur_thsnds' => new EE_Plain_Text_Field('CNT_cur_thsnds', __('Currency Thousands Seperator','event_espresso'), false, ','),
				'CNT_tel_code' => new EE_Plain_Text_Field('CNT_tel_code', __('Country Telephone Code','event_espresso'), false, ''),
				'CNT_is_EU' => new EE_Boolean_Field('CNT_is_EU', __('Country is Member of EU','event_espresso'), false, false)
			));
		$this->_model_relations = array(
			'Attendee'=>new EE_Has_Many_Relation(),
			'State'=>new EE_Has_Many_Relation(),
			'Venue'=>new EE_Has_Many_Relation(),
		);

		parent::__construct();
	}




	/**
	*		_get_countries
	*
	* 		@access		private
	*		@return 		array
	*/
	public function get_all_countries() {
		if ( ! self::$_all_countries ) {
			self::$_all_countries = $this->get_all( array( 'order_by'=>array('CNT_name'=>'ASC'), 'limit'=> array( 0,99999 )));
		}
		return self::$_all_countries;
	}

	/**
	*		_get_countries
	*
	* 		@access		private
	*		@return 		array
	*/
	public function get_all_active_countries() {
		if ( ! self::$_active_countries ) {
			self::$_active_countries =  $this->get_all( array( array( 'CNT_active' => TRUE ), 'order_by'=>array('CNT_name'=>'ASC'), 'limit'=>array( 0, 99999 )));
		}
		return self::$_active_countries;
	}

}
// End of file EEM_Country.model.php
// Location: /includes/models/EEM_Country.model.php
