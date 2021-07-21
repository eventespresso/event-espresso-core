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

	/**
	 *
	 * @param EE_Payment_Method $pm_instance
	 * @return EE_PMT_Mock_Onsite
	 */
	public function __construct($pm_instance = NULL) {
		require_once($this->file_folder().'EEG_Mock_Onsite.gateway.php');
		$this->_gateway = new EEG_Mock_Onsite();
		$this->_pretty_name = esc_html__("Mock Onsite", 'event_espresso');
		parent::__construct($pm_instance);
	}

	/**
	 * @param \EE_Transaction $transaction
	 * @return \EE_Billing_Attendee_Info_Form
	 */
	public function generate_new_billing_form( EE_Transaction $transaction = NULL ) {
		$form = new EE_Billing_Attendee_Info_Form($this->_pm_instance,array(
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

	/**
	 * Gets the form for all the settings related to this payment method type
	 * @return EE_Payment_Method_Form
	 */
	public function generate_new_settings_form() {
		$form = new EE_Payment_Method_Form(array(
			'extra_meta_inputs'=>array(
				'login_id'=>new EE_Text_Input(array(
					'html_label_text'=>  sprintf(esc_html__("Login ID %s", "event_espresso"),  EEH_Template::get_help_tab_link(self::help_tab_link))
				)))));
		return $form;
	}
}

// End of file EE_PMT_Onsite.php