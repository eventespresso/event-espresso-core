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
 * EEPMT_Check
 *
 * @package			Event Espresso
 * @subpackage		
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EEPMT_Check extends EEPMT_Base{
	public function __construct($pm_instance){
		if ( EE_Maintenance_Mode::instance()->level() != EE_Maintenance_Mode::level_2_complete_maintenance){
			$organization = EE_Registry::instance()->CFG->organization;
			$default_address = $organization->address_1 != '' ? $organization->address_1 . '<br />' : '';
			$default_address .= $organization->address_2 != '' ? $organization->address_2 . '<br />' : '';
			$default_address .= $organization->city != '' ? $organization->city : '';
			$default_address .= ( $organization->city != '' && $organization->STA_ID != '') ? ', ' : '<br />';
			$state = EE_Registry::instance()->load_model( 'State' )->get_one_by_ID( $organization->STA_ID );
			$country = EE_Registry::instance()->load_model( 'Country' )->get_one_by_ID( $organization->CNT_ISO ) ;
			$default_address .=  $state ? $state->name() . '<br />' : '';
			$default_address .= $country ? $country->name(). '<br />' : '';
			$default_address .= $organization->zip != '' ? $organization->zip : '';
		}else{
			$default_address = 'unknown';
			$organization = 'unknown';
		}
		$this->_settings_form = new EE_Payment_Method_Form(array(
			'subsections'=>array(
				'title'=> new EE_Text_Input(array(
					'default'=>  __("Check/Money Order Payments", 'event_espresso'),
				)),
				'payment_instructions'=>new EE_Text_Area_Input(array(
					'default'=> __("Please send Check/Money Order to the address below. Payment must be received within 48 hours of event date.", 'event_espresso')
				)),
				'payable_to'=>new EE_Text_Input(array(
					'default'=>$organization
				)),
				'address_to_send_payment'=>new EE_Text_Area_Input(array(
					'default'=>$default_address
				))
			),
			'exclude'=>array('PMD_debug_mode')
		));
		parent::__construct($pm_instance);
	}
}

// End of file EEPMT_Check.pm.php