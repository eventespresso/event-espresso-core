<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
class EE_PMT_Paypal_Standard extends EE_PMT_Base{
	const shipping_info_none = 'none';
	const shipping_info_optional = 'optional';
	const shipping_info_required = 'required';
	public function __construct($pm_instance = NULL) {
		$this->_settings_form = new EE_Payment_Method_Form(array(
			'name'=>'Paypal_Standard_Form',
			'extra_meta_inputs'=>array(
				'paypal_id'=>new EE_Text_Input(),
				'no_shipping'=>new EE_Yes_No_Input(),
				'image_url'=>new EE_Admin_File_Uploader_Input(),
				'shipping_details'=>new EE_Select_Input(array(
					EE_PMT_Paypal_Standard::shipping_info_none => __("Do not prompt for an address", 'event_espresso'),
					EE_PMT_Paypal_Standard::shipping_info_optional => __("Prompt for an address, but do not require it", 'event_espresso'),
					EE_PMT_Paypal_Standard::shipping_info_required => __("Prompt for an address, and require it", 'event_espresso')
				)),
				
				)
			)
		);
		$this->_billing_form = NULL;//NO billing info entered onsite at all
		parent::__construct($pm_instance);
		require_once($this->file_folder().'EEG_Paypal_Standard.gateway.php');
		$this->_gateway = new EEG_Paypal_Standard();
	}
}