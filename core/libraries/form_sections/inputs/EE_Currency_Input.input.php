<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 *
 * EE_Currency_Input
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EE_Currency_Input extends EE_Select_Input{

	/**
	 *
	 * @param array $only_specific_currency_codes numerically-indexed array of allowed currency codes. By default, all are allowed
	 * @param array $input_settings
	 */
	function __construct( $only_specific_currency_codes = array(), $input_settings = array()){
		$query_params = array('order_by'=>array('CNT_name'=>'asc'));
		if($only_specific_currency_codes){
			$query_params[0]['CNT_cur_code'] = array('IN',$only_specific_currency_codes);
		}
		$all_countries = EEM_Country::instance()->get_all($query_params);
		$country_options = array();
		foreach($all_countries as $country){
			/* @var $country EE_Country */
			$country_options[$country->currency_code()] = $country->name().": ".$country->currency_name_single() ." (".$country->currency_sign().")";
		}
		parent::__construct($country_options,'int',$input_settings);
	}
}