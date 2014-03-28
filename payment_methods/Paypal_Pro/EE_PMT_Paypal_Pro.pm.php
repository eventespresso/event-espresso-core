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
 * EEPMT_Paypal_Pro
 *
 * @package			Event Espresso
 * @subpackage		
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_PMT_Paypal_Pro extends EE_PMT_Base{
	public function __construct($pm_instance = NULL) {
		$this->_settings_form = new EE_Payment_Method_Form(array(
			'name'=>'Paypal_Pro_Form',
			'extra_meta_inputs'=>array(
				'paypal_email'=>new EE_Email_Input(),
				'paypal_api_username'=>new EE_Text_Input(),
				'paypal_api_password'=>new EE_Text_Input(),
				'paypal_api_signature'=>new EE_Text_Input(),
				'no_shipping'=>new EE_Yes_No_Input(),
				'credit_card_types'=>new EE_Checkbox_Multi_Input($this->card_types_supported()),
				)
			)
		);
		$this->_billing_form = new EE_Billing_Info_Form(array(
			'subsections'=>array(
				'credit_card'=>new EE_Credit_Card_Input(),
				'credit_card_type'=>new EE_Select_Input(array()),//the options are set dynamically
				'exp_month'=>new EE_Month_Input(true),
				'exp_year'=>new EE_Year_Input(false),
				'cvv'=>new EE_Text_Input(),
			)
		));
		parent::__construct($pm_instance);
		require_once($this->file_folder().'EEG_Paypal_Pro.gateway.php');
		$this->_gateway = new EEG_Paypal_Pro();
	}
	public function billing_form() {
		$cc_type_input = $this->_billing_form->get_input('credit_card_type');
		$allowed_types = $this->_pm_instance->get_extra_meta('credit_card_types',true);
		if( ! $allowed_types){//if allowed types is a string or empty array or null...
			$allowed_types = array();
		}
		$cc_type_input->set_select_options(array_intersect_key(EE_PMT_Paypal_Pro::card_types_supported(),array_flip($allowed_types)));
		return parent::billing_form();
	}
	/**
	 * Returns an array of all the payment cards possibly supported by paypal pro.
	 * Keys are their values, values are their pretty names.
	 * @return array
	 */
	public static function card_types_supported(){
		return array(
			'Visa'=>  __("Visa", 'event_espresso'),
			'MasterCard'=>  __("MasterCard", 'event_espresso'),
			'Amex'=>  __("American Express", 'event_espresso'),
			'Discover'=>  __("Discover", 'event_espresso')
			);
	}
}

// End of file EEPM_Paypal_Standard.pm.php