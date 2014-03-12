<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
class EEPM_Paypal_Standard extends EEPM_Base{
	
}

abstract class EEPM_Base{
	/**
	 *
	 * @var EE_Payment_Method
	 */
	protected $_pm_instance = NULL;
	protected $_requires_https = FALSE;
	protected $_gateway = NULL;
	protected $_settings_form = NULL;
	protected $_bililng_form = NULL;
	function __construct($pm_instance) {
		$this->_pm_instance = $pm_instance;
	}
	//two forms
	//requires https
	//how to get gateway
	//functions
	
	/**
	 * Gets teh form for displaying to admins where they setup the payment method
	 * @return EE_Form_Section_Proper
	 */
	function settings_form(){
		return $this->_settings_form;
	}
	/**
	 * Gets the form for displaying to attendees where they can enter their billing info
	 * which will be sent to teh gateway (can be null)
	 * @return EE_Form_Section_Proper
	 */
	function billing_form(){
		return $this->_bililng_form;
	}
	/**
	 * Returns whether or not this payment method requires HTTPS to be used
	 * @return boolean
	 */
	function requires_https(){
		return $this->_requires_https;
	}
	function process_payment($transaction, $billing_info = null, $success_url = null,$fail_url = null, $method = 'CART', $amount = null ){
		if($this->_gateway){
			//there is a gateway, so we're going to create a payment object
			$payment = EE_Payment::new_instance(array(
								'TXN_ID' => $transaction->ID(),
								'STS_ID' => EEM_Payment::status_id_failed,
								'PAY_timestamp' => current_time('mysql',false),
								'PAY_method' => $method,
								'PAY_amount' => $amount !== NULL ? $amount : $transaction->total(),
								'PMD_ID' => $this->_pm_instance->ID(),
								'PAY_gateway_response' => '',
								'PAY_txn_id_chq_nmbr' => NULL,
								'PAY_po_number' => NULL,
								'PAY_extra_accntng' => $primary_registration_code,
								'PAY_via_admin' => false,
								'PAY_details' => NULL));
		}
		
	}
}