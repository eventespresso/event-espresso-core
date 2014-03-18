<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
class EEPMT_Paypal_Standard extends EEPMT_Base{
	const shipping_info_none = 'none';
	const shipping_info_optional = 'optional';
	const shipping_info_required = 'required';
	public function __construct() {
		$this->_settings_form = new EE_Payment_Method_Form(array(
			'extra_meta_inputs'=>array(
				'paypal_id'=>new EE_Text_Input(),
				'no_shipping'=>new EE_Yes_No_Input(),
				'image_url'=>new EE_Admin_File_Uploader_Input(),
				'shipping_details'=>new EE_Select_Input(array(
					EEPMT_Paypal_Standard::shipping_info_none => __("Do not prompt for an address", 'event_espresso'),
					EEPMT_Paypal_Standard::shipping_info_optional => __("Prompt for an address, but do not require it", 'event_espresso'),
					EEPMT_Paypal_Standard::shipping_info_required => __("Prompt for an address, and require it", 'event_espresso')
				)),
				
				)
			)
		);
		$this->_billing_form = NULL;//NO billing info entered onsite at all
	}
	public function billing_form() {
		$cc_type_input = $this->_billing_form->get_input('credit_card_type');
		$allowed_types = $this->_pm_instance->get_extra_meta('credit_card_types');
		
		parent::billing_form();
	}
}