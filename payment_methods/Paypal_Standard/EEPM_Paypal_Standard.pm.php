<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
class EEPMT_Paypal_Standard extends EEPMT_Base{
	public function __construct() {
		$this->_settings_form = new EE_Payment_Method_Form(array(
			'extra_meta_inputs'=>array(
				'paypal_id'=>new EE_Text_Input(),
				'no_shipping'=>new EE_Yes_No_Input(),
				'image_url'=>new EE_Admin_File_Uploader_Input(),
			)
		));
		$this->_billing_form = new EE_Form_Section_Proper(array(
			'subsections'=>array(
				'name'=>
			)
		));
	}
}