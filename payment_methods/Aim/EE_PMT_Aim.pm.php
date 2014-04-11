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
 * EE_PMT_Aim
 *
 * @package			Event Espresso
 * @subpackage		
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_PMT_Aim extends EE_PMT_Base{
	const help_tab_link = 'ee_aim_help';
	
	public function __construct($pm_instance = NULL) {
		require_once($this->file_folder().'EEG_Aim.gateway.php');
		$this->_gateway = new EEG_AIM();
		$this->_pretty_name = __("Authorize.net AIM", 'event_espresso');
		parent::__construct($pm_instance);
	}
	public function generate_new_billing_form() {
		$form = new EE_Billing_Info_Form($this->_pm_instance,array(
			'name'=>'AIM_Form',
			'subsections'=>array(
				'credit_card'=>new EE_Credit_Card_Input(array(
					'required'=>true
				)),
				'exp_month'=>new EE_Month_Input(true, array(
					'required'=>true
				)),
				'exp_year'=>new EE_Year_Input(),
				'cvv'=>new EE_CVV_Input(),
			)
		));
		add_filter('FHEE__EE_Form_Section_Layout_Base__layout_form__start__for_AIM_Form',array('EE_PMT_Aim','generate_new_billing_form_debug_content'),10,2);
		if($this->_pm_instance->debug_mode() || $this->_pm_instance->get_extra_meta('test_transactions',true,false)){
			$form->get_input('credit_card')->set_default('4007000000027');
			$form->get_input('exp_year')->set_default('2020');
			$form->get_input('cvv')->set_default(('123'));
			$form->add_subsections(array('fyi_about_autofill'=>new EE_Form_Section_HTML(sprintf(__("%sPayment fields have been autofilled because you are in debug mode%s", "event_espresso"),'<h3>','</h3>'))),'credit_card');
		}
		return $form;
	}
	public static function generate_new_billing_form_debug_content($original_opening_content,$form_section){
		EE_Registry::instance()->load_helper('Template');
		$pm = $form_section->payment_method();
		$sending_tests = $pm->get_extra_meta('test_transactions',true,false);
		$show = $pm->debug_mode() || $sending_tests;
		return EEH_Template::display_template(dirname(__FILE__).DS.'templates'.DS.'authorize_net_aim_debug_info.template.php',array('form_section'=>$form_section,'show'=>$show),true).$original_opening_content;
	}
	public function generate_new_settings_form() {
		EE_Registry::instance()->load_helper('Template');
		$form = new EE_Payment_Method_Form(array(
			'extra_meta_inputs'=>array(
				'login_id'=>new EE_Text_Input(array(
					'html_label_text'=>  sprintf(__("Authorize.net API Login ID %s", "event_espresso"),  EEH_Template::get_help_tab_link(self::help_tab_link))
				)),
				'transaction_key'=>new EE_Text_Input(array(
					'html_label_text'=> sprintf(__("Authorize.net Transaction Key %s", "event_espresso"), EEH_Template::get_help_tab_link(self::help_tab_link))
				)),
				'test_transactions'=>new EE_Yes_No_Input(array(
					'html_label_text'=>  sprintf(__("Send test transactions? %s", 'event_espresso'),  EEH_Template::get_help_tab_link(self::help_tab_link)),
					'html_help_text'=>  __("Send test transactions, even to live server", 'event_espresso')
				)),
			)
		));
		$form->get_input('PMD_debug_mode')->set_html_label_text(sprintf(__("Use Sandbox Server? %s", 'event_espresso'),  EEH_Template::get_help_tab_link(self::help_tab_link)));
		$form->get_input('PMD_debug_mode')->set_html_help_text(__("Account is on Authorize.net's sandbox server", 'event_espresso'));
		return $form;
	}
	/**
	 * Adds the help tab
	 * @see EE_PMT_Base::help_tabs_config()
	 * @return array 
	 */
	public function help_tabs_config(){
		return array(
			self::help_tab_link => array(
						'title' => __('Authorize.net AIM Settings', 'event_espresso'),
						'filename' => 'payment_methods_overview_aim'
						),
		);
	}
}

// End of file EE_PMT_Aim.pm.php