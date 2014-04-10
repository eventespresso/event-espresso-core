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
 * EE_PMT_Mijireh
 *
 * @package			Event Espresso
 * @subpackage		
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_PMT_Mijireh extends EE_PMT_Base{
	const help_tab_name = 'ee_mijireh_help';
	public function __construct($pm_instance = NULL) {
		require_once($this->file_folder().'EEG_Mijireh.gateway.php');
		$this->_gateway = new EEG_Mijireh();
		$this->_pretty_name = __("Mijireh", 'event_espresso');
		parent::__construct($pm_instance);
		$this->_default_button_url = $this->file_url() . 'lib' . DS . 'mijireh-checkout-logo.png';
	}
	/**	
	 * Adds the help tab
	 * @see EE_PMT_Base::help_tabs_config()
	 * @return array 
	 */
	public function help_tabs_config(){
		return array(
			self::help_tab_name => array(
						'title' => __('Mijireh Settings', 'event_espresso'),
						'filename' => 'payment_methods_overview_mijireh'
						),
		);
	}
	public function generate_new_settings_form() {
		$form = new EE_Payment_Method_Form(array(
			'name'=>'Mijireh_Form',
			'extra_meta_inputs'=>array(
				'access_key'=>new EE_Text_Input(array(
					'html_label_text'=>  sprintf(__("Mijireh Access Key %s", 'event_espresso'),  EEH_Template::get_help_tab_link(self::help_tab_name))
				)),
			),
//			'after_form_content_template'=>$this->file_folder().DS.'templates'.DS.'mijireh_settings_after_form.template.php',
			'exclude'=>array('PMD_debug_mode'),
		));
		return $form;
	}
	public function generate_new_billing_form() {
		return NULL;
	}
	/**
	 * 
	 * mijireh doesn't send an IPN in the usual sense
	 * they just send the user back to our thank you page
	 * and then we need to directly query them for the payment's status
	 * @param EE_Transaction $transaction
	 */
	public function finalize_payment_for($transaction) {
			$most_recent_payment = EEM_Payment::instance()->get_one(array(array('TXN_ID'=>$transaction->ID(),'PMD_ID'=>$this->_pm_instance->ID()),'order_by'=>array('PAY_ID'=>'DESC')));
			EE_Registry::instance()->load_core('Payment_Processor')->process_ipn(array('payment'=>$most_recent_payment),$transaction,$this->_pm_instance);
	}
}

// End of file EE_PMT_Mijireh.pm.php