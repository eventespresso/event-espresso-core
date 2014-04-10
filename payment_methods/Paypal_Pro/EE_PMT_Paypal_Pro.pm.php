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
 * EEPMT_Paypal_Pro
 *
 * @package			Event Espresso
 * @subpackage		
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_PMT_Paypal_Pro extends EE_PMT_Base{
	public function __construct($pm_instance = NULL) {
		require_once($this->file_folder().'EEG_Paypal_Pro.gateway.php');
		$this->_gateway = new EEG_Paypal_Pro();
		parent::__construct($pm_instance);
	}
	public function generate_new_settings_form() {
		return new EE_Payment_Method_Form(array(
			'name'=>'Paypal_Pro_Form',
			'extra_meta_inputs'=>array(
//				'paypal_email'=>new EE_Email_Input(), not actually used
				'paypal_api_username'=>new EE_Text_Input(),
				'paypal_api_password'=>new EE_Text_Input(),
				'paypal_api_signature'=>new EE_Text_Input(),
				'no_shipping'=>new EE_Yes_No_Input(),
				'credit_card_types'=>new EE_Checkbox_Multi_Input($this->card_types_supported()),
				)
			)
		);
	}
	public function generate_new_billing_form() {
		$allowed_types = $this->_pm_instance->get_extra_meta('credit_card_types',true);
		if( ! $allowed_types){//if allowed types is a string or empty array or null...
			$allowed_types = array();
		}
		$form_name = 'Paypal_Pro_Billing_Form';
		$form_args = array(
			'name'=>$form_name,
			'subsections'=>array(
				'credit_card'=>new EE_Credit_Card_Input(),
				'credit_card_type'=>new EE_Select_Input(array_intersect_key(EE_PMT_Paypal_Pro::card_types_supported(),array_flip($allowed_types))),//the options are set dynamically
				'exp_month'=>new EE_Month_Input(true),
				'exp_year'=>new EE_Year_Input(true),
				'cvv'=>new EE_Text_Input(),
			));
		//tweak the form (in the template we check for debug mode and whether ot add any content or not)
		add_filter('FHEE__EE_Form_Section_Layout_Base__layout_form__start__for_'.$form_name, array('EE_PMT_Paypal_Pro','generate_billing_form_debug_content'),10,2);
		if($this->_pm_instance->debug_mode()){
			//customize
			
			$form_args['subsections']['credit_card']->set_default('5424180818927383');
			$form_args['subsections']['credit_card']->set_html_help_text(__("Payment fields have been autofilled because you are in debug mode.", 'event_espresso'));
			$form_args['subsections']['credit_card_type']->set_default('MasterCard');
			$form_args['subsections']['exp_year']->set_default('2020');
			$form_args['subsections']['cvv']->set_default('115');
		}
		$billing_form = new EE_Billing_Info_Form($this->_pm_instance,$form_args);	
		
		return $billing_form;
	}
	/**
	 * 
	 * @param type $form_begin_content
	 * @param EE_Billing_Form $form_section
	 * @return string
	 */
	public static function generate_billing_form_debug_content($form_begin_content,$form_section){
		EE_Registry::instance()->load_helper('Template');
		return EEH_Template::display_template(dirname(__FILE__).DS.'templates'.DS.'paypal_pro_debug_info.template.php',array('form_section'=>$form_section),true).$form_begin_content;
	}
	/**
	 * Returns an array of all the payment cards possibly supported by paypal pro.
	 * Keys are their values, values are their pretty names.
	 * @return array
	 */
	public static function card_types_supported(){
		return array(
			'Visa'=>  __("Visa", 'event_espresso'),
			'MasterCard'=>  __("MasterCard", 'event_espresso'),
			'Amex'=>  __("American Express", 'event_espresso'),
			'Discover'=>  __("Discover", 'event_espresso')
			);
	}
	/**	
	 * Adds the help tab
	 * @see EE_PMT_Base::help_tabs_config()
	 * @return array 
	 */
	public function help_tabs_config(){
		return array(
			'payment_methods_overview_paypalpro_help_tab' => array(
						'title' => __('PayPal Pro Settings', 'event_espresso'),
						'filename' => 'payment_methods_overview_paypalpro'
						),
		);
	}
}

// End of file EEPM_Paypal_Standard.pm.php