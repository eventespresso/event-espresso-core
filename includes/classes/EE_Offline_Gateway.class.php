<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
do_action('action_hook_espresso_log', __FILE__, ' FILE LOADED', '' );

abstract class EE_Offline_Gateway extends EE_Gateway {


	protected function __construct(EEM_Gateways &$model) {
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		parent::__construct($model);
	}

	/**
	 * 		process_gateway_selection()
	 * 		@access public
	 * 		@return 	mixed	array on success or FALSE on fail
	 */
	public function process_gateway_selection() {	
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
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
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
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
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		
		global $EE_Session;
		//check for an existing payment from this gateway
		$payments = $this->_PAY->get_all_where(array('PAY_gateway'=>$this->gateway(),'TXN_ID'=>$transaction->ID()));
		//if it already exists, short-circuit updating the transaction
		if(empty($payments)){
			//no payment so far, create one
			$payment = new EE_Payment($transaction->ID(), EEM_Payment::status_id_pending, $transaction->datetime(), 'CART', $transaction->total(), $this->gateway(), __("Payment is pending. Your registration is not complete until payment is received",'event_espresso'),null,null,null,false,array());
			$payment->save();
			$success = $this->update_transaction_with_payment($transaction, $payment);

			$EE_Session->set_session_data(array('txn_results' => serialize($transaction->details())), 'session_data');
			$session = $EE_Session->get_session_data();
			//prevent trying to serialize a recursive relationship
			unset($session['transaction']);
			$transaction->set_txn_session_data( $session );
		}
		parent::thank_you_page_logic($transaction);
		//check that there's still a transaction in the session.
		//if there isn't, maybe we've cleared it (session ended with the thank you page)
		//or something wack's going on...
		/*if(!array_key_exists('transaction',$session)){
			return;
		}
		$txn_results = array(
				'gateway' => $this->_payment_settings['display_name'],
				'approved' => FALSE,
				'response_msg' => __('You\'re registration will be marked as complete once your payment is received.', 'event_espresso'),
				'status' => 'Incomplete',
				'raw_response' => serialize($_REQUEST),
				'amount' => 0.00,
				'method' => 'Off-line',
				'auth_code' => '',
				'md5_hash' => '',
				'invoice_number' => '',
				'transaction_id' => ''
		);*/
		
		
//		printr( $session, 'session data ( ' . __FUNCTION__ . ' on line: ' .  __LINE__ . ' )' ); die();
//		die();	

		/*$success = $txn_results['approved'];
		do_action( 'action_hook_espresso_after_payment', $EE_Session, $success );
		
		require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Transaction.model.php' );
		$transaction = $session['transaction'];
		
		$transaction->set_paid($txn_results['amount']);
		$transaction->set_details( $txn_results );
		//$txn_status = $this->_TXN->pending_status_code;//'TPN';
		$transaction->set_status(EEM_Transaction::pending_status_code);
		//update our local session data with what's in teh session singleton
		$session = $EE_Session->get_session_data();
		unset( $session['transaction'] );
		$transaction->set_txn_session_data( $session );
		if (isset($session['taxes'])) {
			$tax_data = array('taxes' => $session['taxes'], 'tax_totals' => $session['tax_totals']);
			$transaction->set_tax_data($tax_data);
		}
		$transaction->update();*/
		
	}
	
}