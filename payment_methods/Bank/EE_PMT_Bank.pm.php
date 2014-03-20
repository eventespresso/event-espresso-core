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
	public function __construct($pm_instance){
		$this->_settings_form = new EE_Payment_Method_Form(array(
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
		parent::__construct($pm_instance);
	}
}

// End of file EEPMT_Bank.pm.php