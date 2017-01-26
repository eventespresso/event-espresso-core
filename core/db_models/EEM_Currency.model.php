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
	protected static $_instance = NULL;

	protected function __construct( $timezone = NULL ) {
		$this->singular_item = __('Currency','event_espresso');
		$this->plural_item = __('Currencies','event_espresso');
		$this->_tables = array(
			'Currency'=> new EE_Primary_Table('esp_currency', 'CUR_code')
		);
		$this->_fields = array(
			'Currency'=>array(
				'CUR_code'=> new EE_Primary_Key_String_Field('CUR_code', __('Currency Code','event_espresso')),
				'CUR_single' => new EE_Plain_Text_Field('CUR_single', __('Currency Name Singular','event_espresso'), false),
				'CUR_plural' => new EE_Plain_Text_Field('CUR_plural', __('Currency Name Plural','event_espresso'), false),
				'CUR_sign' => new EE_Plain_Text_Field('CUR_sign', __('Currency Sign','event_espresso'), false),
				'CUR_dec_plc' => new EE_Integer_Field('CUR_dec_plc', __('Currency Decimal Places','event_espresso'), false, 2),
				'CUR_active'=>new EE_Boolean_Field('CUR_active', __('Active?', 'event_espresso'), false,true),
			));
		$this->_model_relations = array(
			'Payment_Method'=>new EE_HABTM_Relation('Currency_Payment_Method'),
		);
		//this model is generally available for reading
		$this->_cap_restriction_generators[ EEM_Base::caps_read ] = new EE_Restriction_Generator_Public();

		parent::__construct( $timezone );
	}

	/**
	 * Gets all thea ctive currencies, and orders them by their singular name, and then their code
	 * (may be overridden)
	 * @param array $query_params see EEM_Base::get_all
	 * @return EE_Currency[]
	 */
	public function get_all_active($query_params = array()){
		$query_params[0]['CUR_active'] = true;
		if( ! isset($query_params['order_by'])){
			$query_params['order_by'] = array('CUR_code'=>'ASC','CUR_single'=>'ASC');
		}
		return $this->get_all($query_params);
	}
	/**
	 * Gets all the currencies which can be used by that payment method type
	 * @param EE_PMT_Base $payment_method_type
	 * @return EE_Currency[]
	 */
	public function get_all_currencies_usable_by($payment_method_type){
		if($payment_method_type instanceof EE_PMT_Base &&
				$payment_method_type->get_gateway()){
			$currencies_supported = $payment_method_type->get_gateway()->currencies_supported();
		}else{
			$currencies_supported = EE_Gateway::all_currencies_supported;
		}
		if($currencies_supported == EE_Gateway::all_currencies_supported || empty( $currencies_supported ) ) {
			$currencies = $this->get_all_active();
		}else{
			$currencies = $this->get_all_active(array(array('CUR_code'=>array('IN',$currencies_supported))));
		}
		return $currencies;
	}

}

// End of file EEM_Currency.model.php