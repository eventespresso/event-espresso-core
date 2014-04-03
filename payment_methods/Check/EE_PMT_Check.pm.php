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
class EE_PMT_Check extends EE_PMT_Base{
	public function generate_new_billing_form() {
		return ;
	}
	/**
	 * Overrides parent to dynamically set some defaults, but only when the form is requested
	 * @return EE_Form_Section_Proper
	 */
	public function generate_new_settings_form() {
			if ( EE_Maintenance_Mode::instance()->level() != EE_Maintenance_Mode::level_2_complete_maintenance){
				$organization = EE_Registry::instance()->CFG->organization;
				$organization_name = $organization->name;
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
				$organization_name = 'unknown';
			}
			return new EE_Payment_Method_Form(array(
			'name'=>'Check_Form',
			'subsections'=>array(
				'check_title'=> new EE_Text_Input(array(
					'default'=>  __("Check/Money Order Payments", 'event_espresso'),
				)),
				'payment_instructions'=>new EE_Text_Area_Input(array(
					'default'=> __("Please send Check/Money Order to the address below. Payment must be received within 48 hours of event date.", 'event_espresso')
				)),
				'payable_to'=>new EE_Text_Input(array(
					'default'=>$organization_name
				)),
				'address_to_send_payment'=>new EE_Text_Area_Input(array(
					'default'=>$default_address
				)),
			),
			'exclude'=>array('PMD_debug_mode')
		));
		return parent::settings_form();
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
							'check_title'=>'',
							'payment_instructions'=>'',
							'payable_to'=>'',
							'address_to_send_payment'=>'',
							),
						$extra_meta_for_payment_method);
		return EEH_Template::display_template($this->_file_folder.'templates'.DS.'check_payment_details_content.template.php', 
				$template_vars,
				true);
	}
}

// End of file EEPMT_Check.pm.php