<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );

abstract class EE_Offline_Gateway extends EE_Gateway {


	protected function __construct(EEM_Gateways &$model) {
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		parent::__construct($model);
	}

	/**
	 * 		process_gateway_selection()
	 * 		@access public
	 * 		@return 	mixed	array on success or FALSE on fail
	 */
	public function process_gateway_selection() {	
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		$msg = $this->_EEM_Gateways->display_name() . __( ' gateway selected.', 'event_espresso' );
		EE_Error::add_success( $msg, __FILE__, __FUNCTION__, __LINE__ );		
	}



	/**
	 * 		set_billing_info_for_confirmation
	 * 		@access public
	 * 		@param array	$billing_info
	 * 		@return array
	 */
	public function set_billing_info_for_confirmation( $billing_info ) {
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		$confirm_data = array();
		$confirm_data['gateway'] = $this->_EEM_Gateways->display_name();
		return $confirm_data;
	}



	/**
	 * Updates the transaction in the session to acknowledge the registrant is done
	 * the registration process, all that remains is for them ot make the offline
	 * payment. Was renamed from 'set_transaction_details' to 'thank_you_page()', because it served the same purpose
	 * as it's parent's 'thank_you_page()', which is to update the transaction (but not the payment
	 * because in this case no payment has been made)
	 * @global type $EE_Session
	 * @param EE_Transaction
	 * @return void
	 */
	public function thank_you_page_logic(EE_Transaction $transaction) {
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		//check for an existing payment from this gateway
		$payments = $this->_PAY->get_all(array(array('PAY_gateway'=>$this->gateway(),'TXN_ID'=>$transaction->ID())));
		//if it already exists, short-circuit updating the transaction
		if( empty( $payments )){
			$this->update_transaction_with_payment($transaction, null);
			$transaction->save();
		}
		//createa hackey payment object, but dont save it
		$payment = EE_Payment::new_instance(array(
			'TXN_ID'=>$transaction->ID(), 
			'STS_ID'=>EEM_Payment::status_id_pending, 
			'PAY_timestamp'=>current_time('timestamp'), 
			'PAY_amount'=>$transaction->total(), 
			'PAY_gateway'=>$this->_gateway_name));
		
		do_action( 'AHEE_EE_Gateway__update_transaction_with_payment__done', $transaction, $payment );
		parent::thank_you_page_logic($transaction);
		
	}
	
}
