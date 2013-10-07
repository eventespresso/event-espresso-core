<?php

/**
 * Converts gateway settings from 3.1 format to 4.1, and sets active gateways.
 * At the time of writing this, however, the only gateways created for 4.1 were
 * Authorize.net AIM, Bank, Check, Invoice, Paypal Pro and Paypal Standard.
 */
class EE_DMS_4_1_0P_gateways extends EE_Data_Migration_Script_Stage{

private $_converted_active_gateways = false;

function _migration_step($num_items=50){
	$gateways_to_migrate = array_slice($this->_gateways_we_know_how_to_migrate,$this->count_records_migrated(),$num_items);// $this->_gateways_we_know_how_to_migrate;
	$new_gateway_config_obj = EE_Config::instance()->gateway;
	$items_actually_migrated = 0;
	//convert settings
	foreach($gateways_to_migrate as $old_gateway_slug => $new_gateway_slug){
		//determine the old option's name
		$old_gateway_settings = $this->_get_old_gateway_option($new_gateway_slug);
		if( ! $old_gateway_settings){
			//no setings existed for this gateway anyways... weird...
			$items_actually_migrated++;
			continue;
		}
		//now prepare the settings to make sure they're in the 4.1 format
		$new_gateway_settings = $this->_convert_gateway_settings($old_gateway_settings,$new_gateway_slug);
		$new_gateway_config_obj->payment_settings[$new_gateway_slug] = $new_gateway_settings;
		
		$items_actually_migrated++;
	}
	//if we can keep going, and it hasn' tbeen done yet, convert active gateways
	if($items_actually_migrated < $num_items &&  ! $this->_converted_active_gateways){
		$this->_convert_active_gateways();
		$this->_converted_active_gateways = true;
		$items_actually_migrated++;
	}
	
	EE_Config::instance()->update_espresso_config(false,false);
	if($this->count_records_migrated() + $items_actually_migrated >= $this->count_records_to_migrate()){
		$this->set_completed();
	}
	return $items_actually_migrated;
}
function _count_records_to_migrate() {
	$count_of_gateways_to_convert = count($this->_gateways_we_know_how_to_migrate);
	$step_of_setting_active_gateways = 1;
//	$button_images_to_update = 
	return $count_of_gateways_to_convert +  $step_of_setting_active_gateways;
}
function __construct() {
	$this->_pretty_name = __("Gateways", "event_espresso");
	parent::__construct();
}

/**
 * Takes the old array of 3.1 gateway settings for this gateway and converts it
 * into an array with all the 4.1 gateway setting array keys (often the keys were
 * changed from 3.1 to 4.1)
 * @param array $old_gateway_settings
 * @param string $new_gateway_slug
 * @return array
 */
private function _convert_gateway_settings($old_gateway_settings,$new_gateway_slug){
	$new_gateway_settings = $old_gateway_settings;
	switch($new_gateway_slug){
			case 'Invoice':
				$new_gateway_settings['invoice_logo_url'] = $old_gateway_settings['image_url'];
				break;
			case 'Paypal_Pro':
				$new_gateway_settings['email'] = $old_gateway_settings['paypal_pro_email'];
				$new_gateway_settings['username'] = $old_gateway_settings['paypal_api_username'];
				$new_gateway_settings['password'] = $old_gateway_settings['paypal_api_password'];
				$new_gateway_settings['signature'] = $old_gateway_settings['paypal_api_signature'];
				$new_gateway_settings['credit_cards'] = explode(",",$old_gateway_settings['paypal_api_credit_cards']);
				$new_gateway_settings['use_sandbox'] = $old_gateway_settings['paypal_pro_use_sandbox'];
				break;
		}
	return $new_gateway_settings;
}
/**
 * Figures out the correct 3.1 gateway settings option name for the given 4.1 gateway
 * @param string $new_gateway_slug
 * @return string
 */
private function _get_old_gateway_option($new_gateway_slug){
	$new_gateway_slugs_to_new = array_flip($this->_gateways_we_know_how_to_migrate);
	$old_gateway_slug = $new_gateway_slugs_to_new[$new_gateway_slug];
	$normal_option_prefix = 'event_espresso_';
	$normal_option_postfix = '_settings';
	switch($new_gateway_slug){
		case 'Bank':
			$option_name = $normal_option_prefix.'bank_deposit'.$normal_option_postfix;
			break;
		case 'Aim':
			$option_name = $normal_option_prefix.'authnet_aim'.$normal_option_postfix;
			break;
		case 'Check':
			$option_name = $normal_option_prefix.'check_payment'.$normal_option_postfix;
			break;
		case 'Ideal':
			$option_name = $normal_option_prefix.'ideal_mollie'.$normal_option_postfix;
			break;
		case 'Invoice':
			$option_name = $normal_option_prefix.'invoice_payment'.$normal_option_postfix;
			break;
		case 'Purchase_Order':
			$option_name = $normal_option_prefix.'purchase_order_payment'.$normal_option_postfix;
			break;
		case 'USAePay_Offsite':
			$option_name = 'espresso_usaepay_offsite'.$normal_option_postfix;
			break;
		case 'USAePay_Onsite':
			$option_name = 'espresso_usaepay_onsite'.$normal_option_postfix;
			break;
		default:
			$option_name = apply_filters('FHEE__EE_DMS_4_1_0P_gateways__get_old_gateway_option',$normal_option_prefix.$old_gateway_slug.$normal_option_postfix);
	}
	$settings =  get_option($option_name);
	if( ! $settings){
		$this->add_error(sprintf(__("There is no wordpress option named %s for gateway %s", "event_espresso"),$old_gateway_slug,$option_name));
	}
	return $settings;
		
}

private function _convert_active_gateways(){
	//just does it all one big swoop
	$old_active_gateways = get_option('event_espresso_active_gateways');
	$new_active_gateways = EE_Config::instance()->gateway->active_gateways;
	foreach($old_active_gateways as $old_gateway_slug => $filepath){
		if( ! isset($this->_gateways_we_know_how_to_migrate[$old_gateway_slug])){
			$this->add_error(sprintf(__("There gateway %s does not exist in EE 4.1", "event_espresso"),$old_gateway_slug));
			continue;
		}
		$new_gateway_slug = $this->_gateways_we_know_how_to_migrate[$old_gateway_slug];
		
		//in the new format we can also upload gateways to the uploads directory and 
		$new_active_gateways[$new_gateway_slug] = FALSE;
	}
	EE_Config::instance()->gateway->active_gateways = $new_active_gateways;
}
	
	protected $_gateways_we_know_how_to_migrate = array(
//		'2checkout'=>'2checkout',
		'aim'=>'Aim',
//		'anz'=>'Anz',
//		'atos'=>'Atos',
//		'authnet'=>'Authnet',
		'bank'=>'Bank',
//		'beanstream'=>'Beanstream',
		'check'=>'Check',
//		'evertec'=>'Evertec',
//		'eway'=>'Eway',
//		'eway_rapid3'=>'Eway_Rapid3',
//		'exact'=>'Exact',
//		'firstdata'=>'Firstdata',
//		'firstdat_e4'=>'Firstdata_E4',
//		'ideal'=>'Ideal',
//		'infusion_payment'=>'InfusionSoft',
		'invoice'=>'Invoice',  
//		'luottokunta'=>'Luottokunta',
//		'megasoft'=>'Megasoft',
//		'moneris_hpp'=>'Moneris_HPP',
//		'mwarrior'=>'Mwarrior',
//		'nab'=>'NAB',
//		'paychoice'=>'Paychoice',
		'paypal'=>'Paypal_Standard',
		'paypal_pro'=>'Paypal_Pro',
//		'paytrace'=>'Paytrace',
//		'psigate'=>'Psigate',
//		'purchase_order'=>'Purchase_Order',
//		'qbms'=>'QBMS',
//		'quickpay'=>'Quickpay',
//		'realauth'=>'Realauth',
//		'securepay_aus'=>'Securepay_Aus',
//		'stripe'=>'Stripe',
//		'usaepay_offsite'=>'USAePay_Offsite',
//		'usaepay_onsite'=>'USAePay_Onsite',
//		'wepay'=>'Wepay',
//		'worldpay'=>'Worldpay'
	);
}
