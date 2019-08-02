<?php

if (!defined('EVENT_ESPRESSO_VERSION')) {
	exit('No direct script access allowed');
}

/**
 *
 * EEG_Mock_Onsite
 *
 * Just approves payments where billing_info[ 'credit_card' ] == 1.
 * If $billing_info[ 'credit_card' ] == '2' then its pending.
 * All others get refused
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EEG_New_Payment_Method_Offsite extends EE_Offsite_Gateway{

	/**
	 * This gateway supports all currencies by default. To limit it to
	 * only certain currencies, specify them here
	 * @var array
	 */
	protected $_currencies_supported = EE_Gateway::all_currencies_supported;
	
	/**
	 * Example of site's login ID
	 * @var string
	 */
	protected $_login_id = null;
	
	/**
	 * Whether we have configured the gateway integration object to use a separate IPN or not
	 * @var boolean
	 */
	protected $_override_use_separate_IPN = null;
	
	/**
	 * @return EEG_New_Payment_Method_Offsite
	 */
	public function __construct() {
		//if the gateway you are integrating with sends a separate instant-payment-notification request
		//(instead of sending payment information along with the user)
		//set this to TRUE
		$this->set_uses_separate_IPN_request( false ) ;
		parent::__construct();
	}
	
	/**
	 * Override's parent so this gateway integration class can act like one that uses
	 * a separate IPN or not, depending on what is set in the payment methods settings form
	 * @return boolean
	 */
	public function uses_separate_IPN_request() {
		if( $this->_override_use_separate_IPN_request !== null ) {
			$this->set_uses_separate_IPN_request( $this->_override_use_separate_IPN_request );
		} 
		return parent::uses_separate_IPN_request();
	}

	/**
	 *
	 * @param arrat $update_info {
	 *	@type string $gateway_txn_id
	 *	@type string status an EEMI_Payment status
	 * }
	 * @param type $transaction
	 * @return EEI_Payment
	 */
	public function handle_payment_update($update_info, $transaction) {
		if( !  isset( $update_info[ 'gateway_txn_id' ] ) ){
			return NULL;
		}
		$payment = $this->_pay_model->get_payment_by_txn_id_chq_nmbr($update_info[ 'gateway_txn_id' ] );
		if($payment instanceof EEI_Payment &&  isset( $update_info[ 'status' ] ) ){
			if( $update_info[ 'status' ] == $this->_pay_model->approved_status() ){
				$payment->set_status( $this->_pay_model->approved_status() );
				$payment->set_gateway_response( __( 'Payment Approved', 'event_espresso' ));
			}elseif( $update_info[ 'status' ] == $this->_pay_model->pending_status() ){
				$payment->set_status( $this->_pay_model->pending_status() );
				$payment->set_gateway_response( __( 'Payment Pending', 'event_espresso' ));
			}else{
				$payment->set_status( $this->_pay_model->failed_status() );
				$payment->set_gateway_response( __( 'Payment Failed', 'event_espresso' ) );
			}
		}
		return $payment;
	}

	/**
	 *
	 * @param EEI_Payment $payment
	 * @param type $billing_info
	 * @param type $return_url
	 * @param type $cancel_url
	 */
	public function set_redirection_info($payment, $billing_info = array(), $return_url = NULL, $notify_url = NULL, $cancel_url = NULL) {
		global $auto_made_thing_seed;
		if( empty( $auto_made_thing_seed ) ) {
			$auto_made_thing_seed = rand(1,1000000);
		}
		$payment->set_txn_id_chq_nmbr( $auto_made_thing_seed++ );
		
		$payment->set_redirect_url( EE_NEW_PAYMENT_METHOD_URL . '/payment_methods/New_Payment_Method_Offsite/pretend_offsite_page.php' );
		$payment->set_redirect_args( array(
			'amount' => $payment->amount(),
			'gateway_txn_id' => $payment->txn_id_chq_nmbr(),
			'return_url' => $return_url,
			'uses_separate_IPN_request' => $this->uses_separate_IPN_request(),
			'ipn_url' => $notify_url,
		));
		return $payment;
	}
}

// End of file EEG_Mock_Onsite.php