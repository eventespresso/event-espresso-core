<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

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
 * @ version		 	4.3
 *
 * ------------------------------------------------------------------------
 *
 * EEM_Currency
 *
 * @package			Event Espresso
 * @subpackage		
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EEM_Currency extends EEM_Base{
		// private instance of the Attendee object
	private static $_instance = NULL;

	/**
	 *		This funtion is a singleton method used to instantiate the EEM_Attendee object
	 *
	 *		@access public
	 *		@return EEM_Attendee instance
	 */	
	public static function instance(){
	
		// check if instance of EEM_Attendee already exists
		if ( self::$_instance === NULL ) {
			// instantiate Espresso_model 
			self::$_instance = new self();
		}
		// EEM_Attendee object
		return self::$_instance;
	}

	protected function __construct(){
		$this->singular_item = __('Currency','event_espresso');
		$this->plural_item = __('Currencies','event_espresso');
		$this->_tables = array(
			'Currency'=> new EE_Primary_Table('esp_currency', 'CUR_code')
		);
		$this->_fields = array(
			'Currency'=>array(
				'CUR_code'=> new EE_Primary_Key_String_Field('CUR_code', __('Currency COde','event_espresso')),
				'CUR_single' => new EE_Plain_Text_Field('CUR_single', __('Currency Name Singular','event_espresso'), false),
				'CUR_plural' => new EE_Plain_Text_Field('CUR_plural', __('Currency Name Plural','event_espresso'), false),
				'CUR_sign' => new EE_Plain_Text_Field('CUR_sign', __('Currency Sign','event_espresso'), false),
				'CUR_dec_plc' => new EE_Integer_Field('CUR_dec_plc', __('Currency Decimal Places','event_espresso'), false, 2),
				'CUR_active'=>new EE_Boolean_Field('CUR_active', __("Active?", 'event_espresso'), false,true),
			));
		$this->_model_relations = array(
			'Payment_Method'=>new EE_HABTM_Relation('Currency_Payment_Method'),
		);
		
		parent::__construct();
	}
}

// End of file EEM_Currency.model.php