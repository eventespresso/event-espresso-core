<?php
if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * EEG_Paypal_Standard
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Mike Nelson
 * @since 				$VID:$
 *
 */
class EEG_Paypal_Standard extends EE_Offsite_Gateway {

	protected $_paypal_id = NULL;

	protected $_image_url = NULL;

	protected $_shipping_details = NULL;

	protected $_paypal_shipping = NULL;

	protected $_paypal_taxes = NULL;

	protected $_gateway_url = NULL;

	protected $_currencies_supported = array(
		'USD',
		'GBP',
		'CAD',
		'AUD',
		'BRL',
		'CHF',
		'CZK',
		'DKK',
		'EUR',
		'HKD',
		'HUF',
		'ILS',
		'JPY',
		'MXN',
		'MYR',
		'NOK',
		'NZD',
		'PHP',
		'PLN',
		'SEK',
		'SGD',
		'THB',
		'TRY',
		'TWD'
	);



	/**
	 * Also sets the gateway url class variable based o nwhether debug mode is enabled o rnot
	 * @param array $settings_array
	 */
	public function set_settings($settings_array){
		parent::set_settings($settings_array);
		if($this->_debug_mode){
			$this->_gateway_url = 'https://www.sandbox.paypal.com/cgi-bin/webscr';
		}else{
			$this->_gateway_url = 'https://www.paypal.com/cgi-bin/webscr';
		}
	}



	/**
	 * @param EEI_Payment $payment      to process
	 * @param array       $billing_info but should be empty for this gateway
	 * @param string      $return_url   URL to send the user to after payment on the payment provider's website
	 * @param string      $notify_url   URL to send the instant payment notification
	 * @param string      $cancel_url   URL to send the user to after a cancelled payment attempt on teh payment provider's website
	 * @return EEI_Payment
	 */
	public function set_redirection_info( $payment, $billing_info = array(), $return_url = NULL, $notify_url = NULL, $cancel_url = NULL ){
		$redirect_args = array();
		$transaction = $payment->transaction();
		$primary_registrant = $transaction->primary_registration();
		$item_num = 1;
		$total_line_item = $transaction->total_line_item();
		if( $this->_can_easily_itemize_transaction_for( $payment ) ){
			//this payment is for the entire transaction,
			//so let's show all the line items
			foreach($total_line_item->get_items() as $line_item){
				$redirect_args['item_name_' . $item_num] = substr($line_item->name(),0,127);
				$redirect_args['amount_' . $item_num] = $line_item->unit_price();
				$redirect_args['quantity_' . $item_num] = $line_item->quantity();
				if( $this->_paypal_shipping ){
					$redirect_args['shipping_' . $item_num ] = '0.00';
				}
				$item_num++;
			}
		}else{
			//this is a partial payment, so we can't really show all the line items
			$redirect_args['item_name_' . $item_num] = substr( sprintf(__("Payment for registration %s", "event_espresso"),$primary_registrant->reg_code()), 0, 127 );
			$redirect_args['amount_' . $item_num] = $payment->amount();
			$item_num++;

		}
		if($this->_debug_mode){
			$redirect_args['item_name_' . $item_num] = 'DEBUG INFO (this item only added in sandbox mode';
			$redirect_args['amount_' . $item_num] = 0;
			$redirect_args['on0_'.$item_num] = 'NOTIFY URL';
			$redirect_args['os0_' . $item_num] = $notify_url;
		}
		//add our taxes to the order if we're NOT using paypal's
		if( ! $this->_paypal_taxes ){
			$redirect_args['tax'] = $total_line_item->get_total_tax();
		}

		$redirect_args['business'] = $this->_paypal_id;
		$redirect_args['return'] = $return_url;
		$redirect_args['cancel_return'] = $cancel_url;
		$redirect_args['notify_url'] = $notify_url;
		$redirect_args['cmd'] = '_cart';
		$redirect_args['upload'] = 1;
		$redirect_args['currency_code'] = $payment->currency_code();
		$redirect_args['rm'] = 2;//makes the user return with method=POST
		if($this->_image_url){
			$redirect_args['image_url'] = $this->_image_url;
		}
		$redirect_args['no_shipping'] = $this->_shipping_details;

		$payment->set_redirect_url($this->_gateway_url);
		$payment->set_redirect_args($redirect_args);
		return $payment;
	}



	/**
	 * Often used for IPNs. But applies the info in $update_info to the payment.
	 * What is $update_info? Often the contents of $_REQUEST, but not necessarily. Whatever
	 * the payment method passes in.
	 * @param array $update_info like $_POST
	 * @param EEI_Transaction $transaction
	 * @return EE_Payment updated
	 */
	public function handle_payment_update( $update_info, $transaction ){
		//verify there's payment data that's been sent
		if(empty($update_info['payment_status']) || empty($update_info['txn_id'])){
			return NULL;
		}
		$payment =  $this->_pay_model->get_payment_by_txn_id_chq_nmbr($update_info['txn_id']);
		if ( ! $payment ){
			$payment = $transaction->last_payment();
		}
		//ok, then validate the IPN. Even if we've already processed this payment, let paypal know we don't want to hear from them anymore!
		if( ! $this->validate_ipn($update_info,$payment)){
			//huh, something's wack... the IPN didn't validate. We must have replied to the IPN incorrectly,
			//or their API must have changed: http://www.paypalobjects.com/en_US/ebook/PP_OrderManagement_IntegrationGuide/ipn.html
			$this->log(sprintf(__("IPN failed validation", "event_espresso")), $transaction);
			return $payment;
		}
		//verify the transaction exists
		if(empty($transaction)){
			return false;
		}


		//ok, well let's process this payment then!
		if($update_info['payment_status']=='Completed'){ //the old code considered 'Pending' as completed too..
			$status = $this->_pay_model->approved_status();//approved
			$gateway_response = __('Your payment is approved.', 'event_espresso');
		}elseif($update_info['payment_status']=='Pending'){
			$status = $this->_pay_model->pending_status();//approved
			$gateway_response = __('Your payment is in progress. Another message will be sent when payment is approved.', 'event_espresso');
		}else{
			$status = $this->_pay_model->declined_status();//declined
			$gateway_response = __('Your payment has been declined.', 'event_espresso');
		}
		$grand_total_needs_resaving = FALSE;
//		$this->_debug_log( "<hr>Payment is interpreted as $status, and the gateway's response set to '$gateway_response'");
		//check if we've already processed this payment
		if( $this->_paypal_shipping && floatval( $update_info[ 'mc_shipping' ] ) != 0 ){
			$this->_line_item->add_unrelated_item( $transaction->total_line_item(), __('Shipping', 'event_espresso'), floatval( $update_info[ 'mc_shipping' ] ), __('Shipping charges calculated by Paypal', 'event_espresso') );
			$grand_total_needs_resaving = TRUE;

		}
		if( $this->_paypal_taxes && floatval( $update_info[ 'tax' ] ) != $transaction->total_line_item()->get_total_tax() ){
			$this->_line_item->set_total_tax_to( $transaction->total_line_item(), floatval( $update_info['tax'] ), __( 'Taxes', 'event_espresso' ), __( 'Calculated by Paypal', 'event_espresso' ) );
			$grand_total_needs_resaving = TRUE;
		}

		if( ! empty($payment)){
			//payment exists. if this has the exact same status and amount, don't bother updating. just return
			if($payment->status() == $status && $payment->amount() == $update_info['mc_gross']){
				//echo "duplicated ipn! dont bother updating transaction foo!";
//				$this->_debug_log( "<hr>Duplicated IPN! ignore it...");
			}else{
//				$this->_debug_log( "<hr>Existing IPN for this paypal transaction, but it\'s got some new info. Old status:".$payment->STS_ID().", old amount:".$payment->amount());
				$payment->set_status($status);
				$payment->set_amount($update_info['mc_gross']);
				$payment->set_gateway_response($gateway_response);
				$payment->set_details($update_info);
			}
		}
		$this->log( array(
			'IPN Data' => $update_info,
			'transaction (not yet updated)' => $transaction->model_field_array(),
			'payment (updated)' => $payment->model_field_array()),
				$payment);
		if( $grand_total_needs_resaving ){
			$transaction->total_line_item()->save_this_and_descendants_to_txn( $transaction->ID() );
		}
		return $payment;
	}



	/**
	 * Validate the IPN notification
	 *
	 * @param array $update_info like $_REQUEST
	 * @param EE_Payment $payment
	 * @return boolean
	 */
	public function validate_ipn($update_info,$payment) {
		//allow us to skip validating IPNs with paypal (useful for testing)
		if( apply_filters( 'FHEE__EEG_Paypal_Standard__validate_ipn__skip', FALSE ) ){
			return TRUE;
		}
		$update_info_from_post_only = array_diff_key($update_info, $_GET);
		$response_post_data=$update_info_from_post_only + array('cmd'=>'_notify-validate');
		$result= wp_remote_post($this->_gateway_url, array('body' => $response_post_data, 'sslverify' => false, 'timeout' => 60));

		if ( ! is_wp_error($result) && array_key_exists('body',$result) && strcmp($result['body'], "VERIFIED") == 0) {
			return true;
		}else{
			$payment->set_gateway_response(sprintf(__("IPN Validation failed! Paypal responded with '%s'", "event_espresso"),$result['body']));
			$payment->set_details(array('REQUEST'=>$update_info,'VALIDATION_RESPONSE'=>$result));
			$payment->set_status(EEM_Payment::status_id_failed);
			return false;
		}
	}



}
// End of file EEG_Paypal_Standard.gateway.php