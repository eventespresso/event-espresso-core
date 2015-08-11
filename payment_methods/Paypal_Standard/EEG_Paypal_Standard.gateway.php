<?php
if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * EEG_Paypal_Standard
 *
 * Note: one important feature of the Paypal Standard Gateway is that it can allow
 * Paypal itself to calculate taxes and shipping on an order, and then when the IPN
 * for the payment is received from Paypal, this class will update the line items
 * accordingly (also bearing in mind that this could be a payment re-attempt, in
 * which case Paypal shouldn't add shipping or taxes twice).
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

	protected $_paypal_shipping = FALSE;

	protected $_paypal_taxes = FALSE;

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
		'TWD',
		'RUB'
	);



	/**
	 * @return EEG_Paypal_Standard
	 */
	public function __construct() {
		$this->set_uses_separate_IPN_request( true ) ;
		parent::__construct();
	}



	/**
	 * Also sets the gateway url class variable based on whether debug mode is enabled or not
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
				if ( $line_item instanceof EE_Line_Item ) {
					//if this is a re-attempt at paying, don't re-add PayPal's shipping
					if ( $line_item->code() == 'paypal_shipping' ) {
						continue;
					}
					$redirect_args[ 'item_name_' . $item_num ] = substr(
						sprintf( __( '%1$s for %2$s', 'event_espresso' ), $line_item->name(), $line_item->ticket_event_name() ), 0, 127 );
					$redirect_args[ 'amount_' . $item_num ] = $line_item->unit_price();
					$redirect_args[ 'quantity_' . $item_num ] = $line_item->quantity();
					if ( ! $line_item->is_taxable() ) {
						$redirect_args[ 'tax_' . $item_num ] = 0;
					}
					//if we're not letting PayPal calculate shipping, tell them its 0
					if ( ! $this->_paypal_shipping ) {
						$redirect_args[ 'shipping_' . $item_num ] = '0';
						$redirect_args[ 'shipping2_' . $item_num ] = '0';
					}
					$item_num++;
				}
			}
			//add our taxes to the order if we're NOT using PayPal's
			if( ! $this->_paypal_taxes ){
				$redirect_args['tax_cart'] = $total_line_item->get_total_tax();
			}
		}else{
			//this is a partial payment, so we can't really show all the line items
			$redirect_args['item_name_' . $item_num] = substr( sprintf(__('Payment of %1$s for  %2$s', "event_espresso"),$payment->amount(), $primary_registrant->reg_code()), 0, 127 );
			$redirect_args['amount_' . $item_num] = $payment->amount();
			//if we aren't allowing PayPal to calculate shipping, set it to 0
			$redirect_args['shipping_' . $item_num ] = '0';
			$redirect_args['shipping2_' . $item_num ] = '0';
			//PayPal can't calculate taxes because we don't know what parts of it are taxable
			$redirect_args['tax_cart'] = '0';

			$item_num++;



		}
		if($this->_debug_mode){
			$redirect_args['item_name_' . $item_num] = 'DEBUG INFO (this item only added in sandbox mode';
			$redirect_args['amount_' . $item_num] = 0;
			$redirect_args['on0_'.$item_num] = 'NOTIFY URL';
			$redirect_args['os0_' . $item_num] = $notify_url;
			$redirect_args['on1_'.$item_num] = 'RETURN URL';
			$redirect_args['os1_' . $item_num] = $return_url;
//			$redirect_args['option_index_' . $item_num] = 1; // <-- dunno if this is needed ?
			$redirect_args['shipping_' . $item_num ] = '0';
			$redirect_args['shipping2_' . $item_num ] = '0';
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
		$redirect_args['bn'] = 'EventEspresso_SP';//EE will blow up if you change this

		$redirect_args = apply_filters( "FHEE__EEG_Paypal_Standard__set_redirection_info__arguments", $redirect_args );

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
	 * @return \EEI_Payment updated
	 * @throws \EE_Error
	 */
	public function handle_payment_update( $update_info, $transaction ){
		//verify there's payment data that's been sent
		if ( empty( $update_info[ 'payment_status' ] ) || empty( $update_info[ 'txn_id' ] ) ) {
			// waaaait... is this a PDT request? (see https://developer.paypal.com/docs/classic/products/payment-data-transfer/)
			// indicated by the "tx" argument? If so, we don't need it. We'll just use the IPN data when it comes
			if ( isset( $update_info[ 'tx' ] ) ) {
				return $transaction->last_payment();
			} else {
				return null;
			}
		}
		$payment = $this->_pay_model->get_payment_by_txn_id_chq_nmbr( $update_info[ 'txn_id' ] );
		if ( ! $payment instanceof EEI_Payment ) {
			$payment = $transaction->last_payment();
		}
		// ok, then validate the IPN. Even if we've already processed this payment,
		// let PayPal know we don't want to hear from them anymore!
		if ( ! $this->validate_ipn( $update_info, $payment ) ) {
			return $payment;
		}
		//ok, well let's process this payment then!
		switch ( $update_info[ 'payment_status' ] ) {

			case 'Completed' :
				$status = $this->_pay_model->approved_status();
				$gateway_response = __( 'The payment is approved.', 'event_espresso' );
				break;

			case 'Pending' :
				$status = $this->_pay_model->pending_status();
				$gateway_response = __( 'The payment is in progress. Another message will be sent when payment is approved.', 'event_espresso' );
				break;

			case 'Denied' :
				$status = $this->_pay_model->declined_status();
				$gateway_response = __( 'The payment has been declined.', 'event_espresso' );
				break;

			case 'Expired' :
			case 'Failed' :
				$status = $this->_pay_model->failed_status();
				$gateway_response = __( 'The payment failed for technical reasons or expired.', 'event_espresso' );
				break;

			case 'Refunded' :
			case 'Partially_Refunded' :
				// even though it's a refund, we consider the payment as approved, it just has a negative value
				$status = $this->_pay_model->approved_status();
				$gateway_response = __( 'The payment has been refunded. Please update registrations accordingly.', 'event_espresso' );
				break;

			case 'Voided' :
			case 'Reversed' :
			case 'Canceled_Reversal' :
			default :
				$status = $this->_pay_model->cancelled_status();
				$gateway_response = __( 'The payment was cancelled, reversed, or voided. Please update registrations accordingly.', 'event_espresso' );
				break;

		}

		//check if we've already processed this payment
		if ( $payment instanceof EEI_Payment ) {
			//payment exists. if this has the exact same status and amount, don't bother updating. just return
			if ( $payment->status() == $status && $payment->amount() == $update_info[ 'mc_gross' ] ) {
				// DUPLICATED IPN! dont bother updating transaction foo!;
				$message_log = sprintf( __( 'It appears we have received a duplicate IPN from PayPal for payment %d', 'event_espresso' ), $payment->ID() );
			} else {
				// new payment yippee !!!
				$payment->set_status( $status );
				$payment->set_amount( floatval( $update_info[ 'mc_gross' ] ) );
				$payment->set_gateway_response( $gateway_response );
				$payment->set_details( $update_info );
				$payment->set_txn_id_chq_nmbr( $update_info[ 'txn_id' ] );
				$message_log = sprintf( __( 'Updated payment either from IPN or as part of POST from PayPal', 'event_espresso' ) );
			}
			$this->log(
				array(
					'url'      		=> $this->_process_response_url(),
					'message'  	=> $message_log,
					'payment'  	=> $payment->model_field_array(),
					'IPN_data' 	=> $update_info
				),
				$payment
			);
		}
		do_action( 'FHEE__EEG_Paypal_Standard__handle_payment_update__payment_processed', $payment, $this );
		// kill request here if this is a refund
		if ( $update_info[ 'payment_status' ] == 'Refunded' || $update_info[ 'payment_status' ] == 'Partially_Refunded'   ) {
			if ( apply_filters( 'FHEE__EEG_Paypal_Standard__handle_payment_update__kill_refund_request', true ) ) {
				status_header( 200 );
				exit();
			}
		}
		return $payment;
	}



	/**
	 * Validate the IPN notification
	 *y gon
	 * @param array                  $update_info like $_REQUEST
	 * @param EE_Payment|EEI_Payment $payment
	 * @return boolean
	 */
	public function validate_ipn( $update_info, $payment ) {
		//allow us to skip validating IPNs with PayPal (useful for testing)
		if ( apply_filters( 'FHEE__EEG_Paypal_Standard__validate_ipn__skip', false ) ) {
			return true;
		}
		//...otherwise, we actually don't care what the $update_info is, we need to look
		//at the request directly because we can't use $update_info because it has issues with quotes
		// Reading POSTed data directly from $_POST causes serialization issues with array data in the POST.
		// Instead, read raw POST data from the input stream.
		// @see https://gist.github.com/xcommerce-gists/3440401
		$raw_post_data = file_get_contents( 'php://input' );
		$raw_post_array = explode( '&', $raw_post_data );
		$update_info = array();
		foreach ( $raw_post_array as $keyval ) {
			$keyval = explode( '=', $keyval );
			if ( count( $keyval ) == 2 )
				$update_info[ $keyval[ 0 ] ] = urldecode( $keyval[ 1 ] );
		}
		// read the IPN message sent from PayPal and prepend 'cmd=_notify-validate'
		$req = 'cmd=_notify-validate';
		$get_magic_quotes_exists = function_exists( 'get_magic_quotes_gpc' ) ? true : false;
		foreach ( $update_info as $key => $value ) {
			if ( $get_magic_quotes_exists && get_magic_quotes_gpc() == 1 ) {
				$value = urlencode( stripslashes( $value ) );
			} else {
				$value = urlencode( $value );
			}
			$req .= "&$key=$value";
		}
		// HTTP POST the complete, unaltered IPN back to PayPal
		$response = wp_remote_post(
			$this->_gateway_url,
			array(
				'body' 				=> $req,
				'sslverify' 		=> false,
				'timeout' 		=> 60 ,
				// make sure to set a site specific unique "user-agent" string since the WordPres default gets declined by PayPal
				// plz see: https://github.com/websharks/s2member/issues/610
				'user-agent' 	=> 'Event Espresso v' . EVENT_ESPRESSO_VERSION . '; ' . home_url(),
			)
		);
		// then check the response
		if ( ! is_wp_error( $response ) && array_key_exists( 'body', $response ) && strcmp( $response[ 'body' ], "VERIFIED" ) == 0 ) {
			return true;
		} else {
			// huh, something's wack... the IPN didn't validate. We must have replied to the IPN incorrectly,
			// or their API must have changed: http://www.paypalobjects.com/en_US/ebook/PP_OrderManagement_IntegrationGuide/ipn.html
			$payment->set_gateway_response( sprintf( __( "IPN Validation failed! Paypal responded with '%s'", "event_espresso" ), $response[ 'body' ] ) );
			$payment->set_details( array( 'REQUEST' => $update_info, 'VALIDATION_RESPONSE' => $response ) );
			$payment->set_status( EEM_Payment::status_id_failed );
			// log the results
			$this->log(
				array(
					'url'     			=> $this->_process_response_url(),
					'message' 	=> $payment->gateway_response(),
					'details' 		=> $payment->details(),
				),
				$payment
			);
			return false;
		}
	}



	/**
	 * _process_response_url
	 * @return string
	 */
	protected function _process_response_url() {
		if ( isset( $_SERVER[ 'HTTP_HOST' ], $_SERVER[ 'REQUEST_URI' ] ) ) {
			$url = is_ssl() ? 'https://' : 'http://';
			$url .= filter_input( INPUT_SERVER, 'HTTP_HOST', FILTER_SANITIZE_URL, FILTER_NULL_ON_FAILURE );
			$url .= filter_input( INPUT_SERVER, 'REQUEST_URI', FILTER_SANITIZE_URL, FILTER_NULL_ON_FAILURE );
		} else {
			$url = 'unknown';
		}
		return $url;
	}




	/**
	 * Updates the transaction and line items based on the payment IPN data from PayPal,
	 * like the taxes or shipping
	 * @param EEI_Payment $payment
	 */
	public function update_txn_based_on_payment( $payment ) {
		$update_info = $payment->details();
		$redirect_args = $payment->redirect_args();
		$transaction = $payment->transaction();
		if( ! $transaction ){
			$this->log( __( 'Payment with ID %d has no related transaction, and so update_txn_based_on_payment couldn\'t be executed properly', 'event_espresso' ), $payment );
			return;
		}
		if( ! is_array( $update_info ) || ! isset( $update_info[ 'mc_shipping' ] ) || ! isset( $update_info[ 'tax' ] ) ) {
			$this->log(
				array(
					'url' 				=> $this->_process_response_url(),
					'message' 	=> __( 'Could not update transaction based on payment because the payment details have not yet been put on the payment. This normally happens during the IPN or returning from PayPal', 'event_espresso' ),
					'payment' 	=> $payment->model_field_array()
				),
				$payment
			);
			return;
		}
		//take note of whether or not we COULD have allowed PayPal to add taxes and shipping
		//when we sent the customer to PayPal (because if we couldn't itemize the transaction, we
		//wouldn't have known what parts were taxable, meaning we would have had to tell PayPal
		//NONE of it was taxable otherwise it would re-add taxes each time a payment attempt occurred)
//		$could_allow_paypal_to_add_taxes_and_shipping = $this->_can_easily_itemize_transaction_for( $payment );

		$grand_total_needs_resaving = FALSE;

		//might PayPal have added shipping?
		if( $this->_paypal_shipping && floatval( $update_info[ 'mc_shipping' ] ) != 0 ){
			$this->_line_item->add_unrelated_item( $transaction->total_line_item(), __('Shipping', 'event_espresso'), floatval( $update_info[ 'mc_shipping' ] ), __('Shipping charges calculated by Paypal', 'event_espresso'), 1, FALSE,  'paypal_shipping' );
			$grand_total_needs_resaving = TRUE;

		}
		//might PayPal have changed the taxes?
		if( $this->_paypal_taxes && floatval( $update_info[ 'tax' ] ) != $redirect_args[ 'tax_cart' ] ){
			$this->_line_item->set_total_tax_to( $transaction->total_line_item(), floatval( $update_info['tax'] ), __( 'Taxes', 'event_espresso' ), __( 'Calculated by Paypal', 'event_espresso' ) );
			$grand_total_needs_resaving = TRUE;
		}

		if( $grand_total_needs_resaving ){
			$transaction->total_line_item()->save_this_and_descendants_to_txn( $transaction->ID() );
		}
		$this->log(
			array(
				'url' 													=> $this->_process_response_url(),
				'message' 										=> __( 'Updated transaction related to payment', 'event_espresso' ),
				'transaction (updated)' 					=> $transaction->model_field_array(),
				'payment (updated)' 						=> $payment->model_field_array(),
				'use_paypal_shipping' 					=> $this->_paypal_shipping,
				'use_paypal_tax' 							=> $this->_paypal_taxes,
				'grand_total_needed_resaving' 	=> $grand_total_needs_resaving,
			),
			$payment
		);
	}

}
// End of file EEG_Paypal_Standard.gateway.php