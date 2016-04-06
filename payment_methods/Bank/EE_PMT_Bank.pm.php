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



	/**
	 *
	 * @param EE_Payment_Method $pm_instance
	 * @return EE_PMT_Bank
	 */
	public function __construct($pm_instance = NULL) {
		$this->_pretty_name = __("Bank", 'event_espresso');
		parent::__construct($pm_instance);
		$this->_default_button_url = $this->file_url().'lib'.DS.'bank-logo.png';
		$this->_default_description = __( 'Make payment using an electronic funds transfer from your bank.', 'event_espresso' );
	}



	/**
	 * Creates the billing form for this payment method type
	 * @param \EE_Transaction $transaction
	 * @return NULL
	 */
	public function generate_new_billing_form( EE_Transaction $transaction = NULL ) {
		return NULL;
	}



	/**
	 * Gets the form for all the settings related to this payment method type
	 * @return EE_Payment_Method_Form
	 */
	public function generate_new_settings_form() {
		return new EE_Payment_Method_Form(array(
			'extra_meta_inputs'=>array(
				'page_title'=>new EE_Text_Input(array(
					'html_label_text'=>  sprintf(__("Title %s", "event_espresso"),  $this->get_help_tab_link()),
					'default'=>  __("Electronic Funds Transfers", 'event_espresso')
				)),
				'payment_instructions'=>new EE_Text_Area_Input( array(
					'html_label_text'=>  sprintf(__("Payment Instructions %s", "event_espresso"),  $this->get_help_tab_link()),
					'html_help_text' => __( 'Provide instructions on how registrants can send the bank draft payment. Eg, mention your account name, bank account number, bank name, bank routing code, and bank address, etc.', 'event_espresso' ),
					'default'=> sprintf(
						__('Please initiate an electronic payment using the following bank information: %1$sAccount Owner: Luke Skywalker%1$sBank Account # 1234567890%1$sBank Name: Rebellion Bank%1$sRouting Number: 12345%1$sBank Address: 12345 Wookie Rd., Planet Corellian.%1$sPayment must be received within 48 hours of event date.', 'event_espresso'),
						"\n"
					),
					'validation_strategies' => array( new EE_Full_HTML_Validation_Strategy() ),
				)),
			),
			'exclude'=>array('PMD_debug_mode')
		));
	}



	/**
	 * Adds the help tab
	 * @see EE_PMT_Base::help_tabs_config()
	 * @return array
	 */
	public function help_tabs_config(){
		return array(
			$this->get_help_tab_name() => array(
						'title' => __('Bank Draft Settings', 'event_espresso'),
						'filename' => 'payment_methods_overview_bank_draft'
						),
		);
	}



	/**
	 * For adding any html output ab ove the payment overview.
	 * Many gateways won't want ot display anything, so this function just returns an empty string.
	 * Other gateways may want to override this, such as offline gateways.
	 * @return string
	 */
	public function payment_overview_content(EE_Payment $payment){
		$extra_meta_for_payment_method = $this->_pm_instance->all_extra_meta_array();
		$template_vars = array_merge(
						array(
							'payment_method'=>$this->_pm_instance,
							'payment'=>$payment,
							'page_title'=>'',
							'payment_instructions'=>'',
							),
						$extra_meta_for_payment_method);
		return EEH_Template::locate_template(
				'payment_methods' . DS . 'Bank'. DS . 'templates' . DS . 'bank_payment_details_content.template.php',
				$template_vars);
	}






}
// End of file EEPMT_Bank.pm.php