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
 * EEPMT_Bank
 *
 * @package			Event Espresso
 * @subpackage		
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_PMT_Bank extends EE_PMT_Base{
	public function generate_new_billing_form() {
		return NULL;
	}
	public function generate_new_settings_form() {
		return new EE_Payment_Method_Form(array(
			'name'=>'Bank_Form',
			'subsections'=>array(
				'page_title'=>new EE_Text_Input(array(
					'default'=>  __("Electronic Funds Transfers", 'event_espresso')
				)),
				'payment_instructions'=>new EE_Text_Area_Input(array(
					'default'=>  __("Please initiate an electronic payment using the bank information below. Payment must be received within 48 hours of event date.", 'event_espresso')
				)),
				'name_on_bank_account'=>new EE_Text_Input(),
				'bank_account_number'=>new EE_Text_Input(),
				'bank_name'=>new EE_Text_Input(),
				'bank_address'=>new EE_Text_Area_Input()
			),
			'exclude'=>array('PMD_debug_mode')
		));
	}
	
	/**
	 * For adding any html output ab ove the payment overview.
	 * Many gateways won't want ot display anything, so this function just returns an empty string.
	 * Other gateways may want to override this, such as offline gateways.
	 * @return string
	 */
	public function payment_overview_content(EE_Payment $payment){
		EE_Registry::instance()->load_helper('Template');
		$extra_meta_for_payment_method = $this->_pm_instance->all_extra_meta_array();
		$template_vars = array_merge(
						array(
							'payment_method'=>$this->_pm_instance,
							'payment'=>$payment,
							'page_title'=>'',
							'payment_instructions'=>'',
							'name_on_bank_account'=>'',
							'bank_account_number'=>'',
							'bank_name'=>'',
							'bank_address'=>''
							),
						$extra_meta_for_payment_method);
		return EEH_Template::display_template($this->_file_folder.'templates'.DS.'bank_payment_details_content.template.php', 
				$template_vars,
				true);
	}
}

// End of file EEPMT_Bank.pm.php