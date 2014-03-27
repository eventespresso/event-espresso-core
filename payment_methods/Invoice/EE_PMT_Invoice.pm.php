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
		
			
		parent::__construct($pm_instance);
	}
	/**
	 * beacuse creating this form can be rather expensive, we only bother doing it when requested
	 */
	public function settings_form() {
		if( ! $this->_settings_form){
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
			$this->_settings_form = new EE_Payment_Method_Form(array(
				'name'=>'Invoice_Form',
				'subsections'=>array(
					'pdf_stylesheet'=>new EE_Select_Input(array('simple.css'), array(
						'help_text'=>  __("Load a custom/pre-made style sheet 
	to change the look of your invoices.", 'event_espresso'),
					)),
					'pdf_instructions'=>new EE_Text_Area_Input(array(
						'default'=>  __("Please send this invoice with payment attached to the address above, or use the payment link below. Payment must be received within 48 hours of event date.", 'event_espresso')
					)),
					'pdf_logo_image'=>new EE_Admin_File_Uploader_Input(array(
						'default'=>  EE_Config::instance()->organization->logo_url
					)),
					'page_title'=>new EE_Text_Input(array(
						'default'=>  __("Invoice Payments", 'event_espresso')
					)),
					'page_instructions'=>new EE_Text_Area_Input(array(
						'default'=>  __("Please send Invoice to the address below. Payment must be received within 48 hours of event date.", 'event_espresso')
					)),
					'page_payable_to'=>new EE_Text_Input(array(
						'default'=> $organization_name
					)),
					'page_address_payable'=>new EE_Text_Area_Input(array(
						'default'=> $default_address,
					)),
				),
				'exclude'=>array('PMD_debug_mode'),
				'layout_strategy'=>new EE_Template_Layout(
					'payment_methods/Invoice/templates/invoice_settings_layout.template.php',
					'payment_methods/Invoice/templates/invoice_settings_input_layout.template.php'),
			));
		}
		return parent::settings_form();
	}
}

// End of file EE_PMT_Invoice.pm.php