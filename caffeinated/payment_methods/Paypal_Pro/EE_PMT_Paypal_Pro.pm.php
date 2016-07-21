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

	/**
	 * @param EE_Payment_Method $pm_instance
	 * @return EE_PMT_Paypal_Pro
	 */
	public function __construct($pm_instance = NULL) {
		require_once($this->file_folder().'EEG_Paypal_Pro.gateway.php');
		$this->_gateway = new EEG_Paypal_Pro();
		$this->_pretty_name = __("Paypal Pro", 'event_espresso');
		$this->_default_description = __( 'Please provide the following billing information.', 'event_espresso' );
		$this->_requires_https = true;
		parent::__construct($pm_instance);
	}



	/**
	 * Gets the form for all the settings related to this payment method type
	 * @return EE_Payment_Method_Form
	 */
	public function generate_new_settings_form() {
		return new EE_Payment_Method_Form(array(
			'extra_meta_inputs'=>array(
//				'paypal_email'=>new EE_Email_Input(), not actually used
				'username'=>new EE_Text_Input(array(
					'html_label_text'=>  sprintf(__("Paypal API Username %s", "event_espresso"),$this->get_help_tab_link()),
					'required' => true
				)),
				'password'=>new EE_Text_Input(array(
					'html_label_text'=>  sprintf(__("Paypal API Password %s", "event_espresso"),$this->get_help_tab_link()),
					'required' => true
				)),
				'signature'=>new EE_Text_Input(array(
					'html_label_text'=>  sprintf(__("Paypal API Signature %s", "event_espresso"),$this->get_help_tab_link()),
					'required' => true
				)),
				'credit_card_types'=>new EE_Checkbox_Multi_Input(
						$this->card_types_supported(),
						array(
							'html_label_text' => __( 'Card Types Supported', 'event_espresso' ),
							'required' => true )),
				)
			)
		);
	}


	/**
	 * Creates the billing form for this payment method type
	 * @param \EE_Transaction $transaction
	 * @throws \EE_Error
	 * @return EE_Billing_Info_Form
	 */
	public function generate_new_billing_form( EE_Transaction $transaction = NULL ) {
		$allowed_types = $this->_pm_instance->get_extra_meta( 'credit_card_types', TRUE );
		//if allowed types is a string or empty array or null...
		if( empty( $allowed_types )) {
			$allowed_types = array();
		}

		$billing_form = new EE_Billing_Attendee_Info_Form(
			$this->_pm_instance,
			array(
				'name'=> 'Paypal_Pro_Billing_Form',
//				'html_id'=> 'ee-Paypal_Pro-billing-form',
				'subsections'=>array(
					'credit_card'=>new EE_Credit_Card_Input(
						array( 'required'=>TRUE, 'html_class' => 'ee-billing-qstn', 'html_label_text' => __( 'Card Number', 'event_espresso' ))
					),
					'credit_card_type'=>new EE_Select_Input(
						//the options are set dynamically
						array_intersect_key( EE_PMT_Paypal_Pro::card_types_supported(), array_flip( $allowed_types )),
						array( 'required'=>TRUE, 'html_class' => 'ee-billing-qstn', 'html_label_text' => __( 'Card Type', 'event_espresso' ))
					),
					'exp_month'=>new EE_Credit_Card_Month_Input(
						TRUE, array( 'required'=>TRUE, 'html_class' => 'ee-billing-qstn', 'html_label_text' =>  __( 'Expiry Month', 'event_espresso' )  )
					),
					'exp_year'=>new EE_Credit_Card_Year_Input(
						array( 'required'=>TRUE, 'html_class' => 'ee-billing-qstn', 'html_label_text' => __( 'Expiry Year', 'event_espresso' )  )
					),
					'cvv'=>new EE_CVV_Input(
						array( 'required'=>TRUE, 'html_class' => 'ee-billing-qstn', 'html_label_text' => __( 'CVV', 'event_espresso' ) )
					),
				)
			)
		);
		return $this->apply_billing_form_debug_settings( $billing_form );
	}



	/**
	 * apply_billing_form_debug_settings
	 * applies debug data to the form
	 *
	 * @param \EE_Billing_Info_Form $billing_form
	 * @return \EE_Billing_Info_Form
	 */
	public function apply_billing_form_debug_settings( EE_Billing_Info_Form $billing_form ) {
		if ( $this->_pm_instance->debug_mode() ) {
			$billing_form->add_subsections(
				array( 'fyi_about_autofill' => $billing_form->payment_fields_autofilled_notice_html() ),
				'credit_card'
			);
			$billing_form->add_subsections(
				array( 'debug_content' => new EE_Form_Section_HTML_From_Template( dirname(__FILE__).DS.'templates'.DS.'paypal_pro_debug_info.template.php' )),
				'first_name'
			);
			$billing_form->get_input( 'credit_card_type' )->set_default( 'Visa' );
			$billing_form->get_input( 'exp_year' )->set_default( 2018);
			$billing_form->get_input( 'cvv' )->set_default( '115' );
		}
		return $billing_form;
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
			$this->get_help_tab_name() => array(
						'title' => __('PayPal Pro Settings', 'event_espresso'),
						'filename' => 'payment_methods_overview_paypalpro'
						),
		);
	}

	/**
	 * Overrides parent's _get_billing_values_from_form because we want to
	 * get the country's 2-character ISO code, not the name like most gateways
	 * @param EE_Billing_Info_Form $billing_form
	 * @return array
	 */
	protected function _get_billing_values_from_form( $billing_form ){
		$billing_values = parent::_get_billing_values_from_form( $billing_form );
		$billing_values[ 'country' ] = $billing_form->get_input_value( 'country' );
		$billing_values[ 'credit_card_type' ] = $billing_form->get_input_value( 'credit_card_type' );
		return $billing_values;
	}

}
// End of file EEPM_Paypal_Standard.pm.php
