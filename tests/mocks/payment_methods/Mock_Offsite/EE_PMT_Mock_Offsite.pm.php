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
class EE_PMT_Mock_Offsite extends EE_PMT_Base{
	const help_tab_link = 'ee_mock_onsite_help';
	public function __construct($pm_instance = NULL) {
		require_once($this->file_folder().'EEG_Mock_Offsite.gateway.php');
		$this->_gateway = new EEG_Mock_Offsite();
		$this->_pretty_name = __("Mock Offsite", 'event_espresso');
		parent::__construct($pm_instance);
	}
	public function generate_new_billing_form() {
		return NULL;
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
}

// End of file EE_PMT_Onsite.php