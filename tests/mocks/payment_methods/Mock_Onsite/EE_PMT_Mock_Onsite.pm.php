<?php

if (!defined('EVENT_ESPRESSO_VERSION')) {
	exit('No direct script access allowed');
}

/**
 *
 * EE_PMT_Onsite
 *
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EE_PMT_Mock_Onsite extends EE_PMT_Base{
	const help_tab_link = 'ee_mock_onsite_help';
	public function __construct($pm_instance = NULL) {
		require_once($this->file_folder().'EEG_Mock_Onsite.gateway.php');
		$this->_gateway = new EEG_Mock_Onsite();
		$this->_pretty_name = __("Mock Onsite", 'event_espresso');
		parent::__construct($pm_instance);
	}
	public function generate_new_billing_form() {
		$form = new EE_Billing_Info_Form($this->_pm_instance,array(
			'name'=>'Mock_Onsite_Form',
			'subsections'=>array(
				'status' => new EE_Text_Input(),//this will become the payments status when processing payments on this mock object
				'credit_card'=>new EE_Credit_Card_Input(array(
					'required'=>false
				)),
				'exp_month'=>new EE_Month_Input(true, array(
					'required'=>false
				)),
				'exp_year'=>new EE_Year_Input(),
				'cvv'=>new EE_CVV_Input(),
			)
		));
		return $form;
	}

	public function generate_new_settings_form() {
		EE_Registry::instance()->load_helper('Template');
		$form = new EE_Payment_Method_Form(array(
			'extra_meta_inputs'=>array(
				'login_id'=>new EE_Text_Input(array(
					'html_label_text'=>  sprintf(__("Login ID %s", "event_espresso"),  EEH_Template::get_help_tab_link(self::help_tab_link))
				)))));
		return $form;
	}



	public function payment_information() {

	}
}

// End of file EE_PMT_Onsite.php