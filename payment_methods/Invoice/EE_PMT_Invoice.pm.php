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
 * EE_PMT_Invoice
 *
 * @package			Event Espresso
 * @subpackage		
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_PMT_Invoice extends EE_PMT_Base{
	public function __construct($pm_instance = NULL) {
		$this->_settings_form = new EE_Payment_Method_Form(array(
			'name'=>'Invoice_Form',
			'subsections'=>array(
//				'title'=> new EE_Text_Input(array(
//					'default'=>  __("Check/Money Order Payments", 'event_espresso'),
//				)),
//				'payment_instructions'=>new EE_Text_Area_Input(array(
//					'default'=> __("Please send Check/Money Order to the address below. Payment must be received within 48 hours of event date.", 'event_espresso')
//				)),
//				'payable_to'=>new EE_Text_Input(array(
//					'default'=>$organization
//				)),
//				'address_to_send_payment'=>new EE_Text_Area_Input(array(
//					'default'=>$default_address
//				))
			),
			'exclude'=>array('PMD_debug_mode')
		));
		parent::__construct($pm_instance);
	}
}

// End of file EE_PMT_Invoice.pm.php