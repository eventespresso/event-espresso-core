<?php
if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }

use EventEspresso\core\exceptions\IpnException;
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

	/**
	 * Name for the wp option used to save the itemized payment
	 */
	const itemized_payment_option_name = '_itemized_payment';

	protected $_paypal_id;

	protected $_image_url;

	protected $_shipping_details;

	protected $_paypal_shipping;

	protected $_paypal_taxes;

	protected $_gateway_url;

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
		$this->_gateway_url = $this->_debug_mode
			? 'https://www.sandbox.paypal.com/cgi-bin/webscr'
			: 'https://www.paypal.com/cgi-bin/webscr';
	}



	/**
	 * @param EEI_Payment $payment      the payment to process
	 * @param array       $billing_info but should be empty for this gateway
	 * @param string      $return_url   URL to send the user to after payment on the payment provider's website
	 * @param string      $notify_url   URL to send the instant payment notification
	 * @param string      $cancel_url   URL to send the user to after a cancelled payment attempt
	 *                                  on the payment provider's website
	 * @return EEI_Payment
	 * @throws \EE_Error
	 */
	public function set_redirection_info(
		$payment,
		$billing_info = array(),
		$return_url = null,
		$notify_url = null,
		$cancel_url = null
	) {
		$redirect_args = array();
		$transaction = $payment->transaction();
		$item_num = 1;
		/** @type EE_Line_Item $total_line_item */
		$total_line_item = $transaction->total_line_item();

		$total_discounts_to_cart_total = $transaction->paid();
		//only itemize the order if we're paying for the rest of the order's amount
		if( EEH_Money::compare_floats( $payment->amount(), $transaction->total(), '==' ) ) {
			$payment->update_extra_meta( EEG_Paypal_Standard::itemized_payment_option_name, true );
			//this payment is for the remaining transaction amount,
			//keep track of exactly how much the itemized order amount equals
			$itemized_sum = 0;
			$shipping_previously_added = 0;
			//so let's show all the line items
			foreach($total_line_item->get_items() as $line_item){
				if ( $line_item instanceof EE_Line_Item ) {
					//it's some kind of discount
					if( $line_item->total() < 0 ) {
						$total_discounts_to_cart_total += abs( $line_item->total() );
						$itemized_sum += $line_item->total();
						continue;
					}
					//dont include shipping again.
					if( strpos( $line_item->code(), 'paypal_shipping_') === 0 ) {
						$shipping_previously_added = $line_item->total();
						continue;
					}
					$redirect_args[ 'item_name_' . $item_num ] = substr(
						$this->_format_line_item_name( $line_item, $payment ),
						0, 127
					);
					$redirect_args[ 'amount_' . $item_num ] = $line_item->unit_price();
					$redirect_args[ 'quantity_' . $item_num ] = $line_item->quantity();
					//if we're not letting PayPal calculate shipping, tell them its 0
					if ( ! $this->_paypal_shipping ) {
						$redirect_args[ 'shipping_' . $item_num ] = '0';
						$redirect_args[ 'shipping2_' . $item_num ] = '0';
					}
					$item_num++;
					$itemized_sum += $line_item->total();
				}
			}
			$taxes_li = $this->_line_item->get_taxes_subtotal( $total_line_item );
			//ideally itemized sum equals the transaction total. but if not (which is weird)
			//and the itemized sum is LESS than the transaction total
			//add another line item
			//if the itemized sum is MORE than the transaction total,
			//add the difference it to the discounts
			$itemized_sum_diff_from_txn_total = round(
				$transaction->total() - $itemized_sum - $taxes_li->total() - $shipping_previously_added,
				2
			);
			if( $itemized_sum_diff_from_txn_total < 0 ) {
				//itemized sum is too big
				$total_discounts_to_cart_total += abs( $itemized_sum_diff_from_txn_total );
			} elseif( $itemized_sum_diff_from_txn_total > 0 ) {
				$redirect_args[ 'item_name_' . $item_num ] = substr(
						__( 'Other charges', 'event_espresso' ), 0, 127 );
				$redirect_args[ 'amount_' . $item_num ] = $this->format_currency( $itemized_sum_diff_from_txn_total );
				$redirect_args[ 'quantity_' . $item_num ] = 1;
				$item_num++;
			}
			if( $total_discounts_to_cart_total > 0 ) {
				$redirect_args[ 'discount_amount_cart' ] = $this->format_currency( $total_discounts_to_cart_total );
			}
			//add our taxes to the order if we're NOT using PayPal's
			if( ! $this->_paypal_taxes ){
				$redirect_args['tax_cart'] = $total_line_item->get_total_tax();
			}
		} else {
			$payment->update_extra_meta( EEG_Paypal_Standard::itemized_payment_option_name, false );
			//partial payment that's not for the remaining amount, so we can't send an itemized list
			$redirect_args['item_name_' . $item_num] = substr(
				$this->_format_partial_payment_line_item_name( $payment ),
				0, 127
			);
			$redirect_args['amount_' . $item_num] = $payment->amount();
			$redirect_args['shipping_' . $item_num ] = '0';
			$redirect_args['shipping2_' . $item_num ] = '0';
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

		$redirect_args = apply_filters( "FHEE__EEG_Paypal_Standard__set_redirection_info__arguments", $redirect_args, $this );

		$payment->set_redirect_url($this->_gateway_url);
		$payment->set_redirect_args($redirect_args);
		// log the results
		$this->log(
			array(
				'message'     => sprintf(
					__( 'PayPal payment request initiated.', 'event_espresso' )
				),
				'transaction' => $transaction->model_field_array(),
			),
			$payment
		);
		return $payment;
	}



	/**
	 * Often used for IPNs. But applies the info in $update_info to the payment.
	 * What is $update_info? Often the contents of $_REQUEST, but not necessarily. Whatever
	 * the payment method passes in.
	 * @param array $update_info like $_POST
	 * @param EEI_Transaction $transaction
	 * @return \EEI_Payment updated
	 * @throws \EE_Error, IpnException
	 */
	public function handle_payment_update( $update_info, $transaction ){
		// verify there's payment data that's been sent
		if ( empty( $update_info[ 'payment_status' ] ) || empty( $update_info[ 'txn_id' ] ) ) {
			// log the results
			$this->log(
				array(
					'message' => sprintf(
						__( 'PayPal IPN response is missing critical payment data. This may indicate a PDT request and require your PayPal account settings to be corrected.', 'event_espresso' )
					),
					'update_info' => $update_info,
				),
				$transaction
			);
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
        // kill request here if this is a refund, we don't support them yet (we'd need to adjust the transaction,
        // registrations, ticket counts, etc)
        if (
            (
                $update_info[ 'payment_status' ] === 'Refunded'
                || $update_info[ 'payment_status' ] === 'Partially_Refunded'
            )
            && apply_filters( 'FHEE__EEG_Paypal_Standard__handle_payment_update__kill_refund_request', true )
        ) {
            throw new EventEspresso\core\exceptions\IpnException(
                sprintf(
                    esc_html__( 'Event Espresso does not yet support %1$s IPNs from PayPal', 'event_espresso'),
                    $update_info['payment_status']
                ),
                EventEspresso\core\exceptions\IpnException::UNSUPPORTED,
                null,
                $payment,
                $update_info
            );
        }
		//ok, well let's process this payment then!
		switch ( $update_info[ 'payment_status' ] ) {

			case 'Completed' :
				$status = $this->_pay_model->approved_status();
				$gateway_response = esc_html__( 'The payment is approved.', 'event_espresso' );
				break;

			case 'Pending' :
				$status = $this->_pay_model->pending_status();
				$gateway_response = esc_html__( 'The payment is in progress. Another message will be sent when payment is approved.', 'event_espresso' );
				break;

			case 'Denied' :
				$status = $this->_pay_model->declined_status();
				$gateway_response = esc_html__( 'The payment has been declined.', 'event_espresso' );
				break;

			case 'Expired' :
			case 'Failed' :
				$status = $this->_pay_model->failed_status();
				$gateway_response = esc_html__( 'The payment failed for technical reasons or expired.', 'event_espresso' );
				break;

			case 'Refunded' :
			case 'Partially_Refunded' :
				// even though it's a refund, we consider the payment as approved, it just has a negative value
				$status = $this->_pay_model->approved_status();
				$gateway_response = esc_html__( 'The payment has been refunded. Please update registrations accordingly.', 'event_espresso' );
				break;

			case 'Voided' :
			case 'Reversed' :
			case 'Canceled_Reversal' :
			default :
				$status = $this->_pay_model->cancelled_status();
				$gateway_response = esc_html__( 'The payment was cancelled, reversed, or voided. Please update registrations accordingly.', 'event_espresso' );
				break;

		}

		//check if we've already processed this payment
		if ( $payment instanceof EEI_Payment ) {
			//payment exists. if this has the exact same status and amount, don't bother updating. just return
			if ( $payment->status() === $status && (float)$payment->amount() === (float)$update_info[ 'mc_gross' ] ) {
				// DUPLICATED IPN! don't bother updating transaction
				throw new IpnException(
					sprintf(
						esc_html__( 'It appears we have received a duplicate IPN from PayPal for payment %d', 'event_espresso' ),
						$payment->ID()
					),
					IpnException::DUPLICATE,
					null,
					$payment,
					$update_info
				);
			} else {
				// new payment yippee !!!
				$payment->set_status( $status );
				$payment->set_amount( (float)$update_info[ 'mc_gross' ] );
				$payment->set_gateway_response( $gateway_response );
				$payment->set_details( $update_info );
				$payment->set_txn_id_chq_nmbr( $update_info[ 'txn_id' ] );
				$this->log(
					array(
						'message'  => esc_html__( 'Updated payment either from IPN or as part of POST from PayPal', 'event_espresso' ),
						'url'      => $this->_process_response_url(),
						'payment'  => $payment->model_field_array(),
						'IPN_data' => $update_info
					),
					$payment
				);
			}

		}
		do_action( 'FHEE__EEG_Paypal_Standard__handle_payment_update__payment_processed', $payment, $this );
		return $payment;
	}



	/**
	 * Validate the IPN notification
	 *y gon
	 *
	 * @param array                  $update_info like $_REQUEST
	 * @param EE_Payment|EEI_Payment $payment
	 * @return boolean
	 * @throws \EE_Error
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
			if ( count( $keyval ) === 2 ) {
				$update_info[ $keyval[ 0 ] ] = urldecode( $keyval[ 1 ] );
			}
		}
		// read the IPN message sent from PayPal and prepend 'cmd=_notify-validate'
		$req = 'cmd=_notify-validate';
		$uses_get_magic_quotes = function_exists( 'get_magic_quotes_gpc' ) && get_magic_quotes_gpc() === 1
			? true
			: false;
		foreach ( $update_info as $key => $value ) {
			$value = $uses_get_magic_quotes ? urlencode( stripslashes( $value ) ) : urlencode( $value );
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
				'httpversion' => '1.1'
			)
		);
		// then check the response
		if (
			array_key_exists( 'body', $response )
			&& ! is_wp_error( $response )
			&& strcmp( $response[ 'body' ], "VERIFIED" ) === 0
		) {
			return true;
		}
		// huh, something's wack... the IPN didn't validate. We must have replied to the IPN incorrectly,
		// or their API must have changed: http://www.paypalobjects.com/en_US/ebook/PP_OrderManagement_IntegrationGuide/ipn.html
		if( $response instanceof WP_Error ) {
			$error_msg = sprintf(
				esc_html__( 'WP Error. Code: "%1$s", Message: "%2$s", Data: "%3$s"', 'event_espresso' ),
				$response->get_error_code(),
				$response->get_error_message(),
				print_r( $response->get_error_data(), true )
			);
		} elseif( is_array( $response ) && isset( $response[ 'body' ] ) ) {
			$error_msg = $response[ 'body' ];
		} else {
			$error_msg = print_r( $response, true );
		}
		$payment->set_gateway_response( sprintf( esc_html__( "IPN Validation failed! Paypal responded with '%s'", "event_espresso" ), $error_msg ) );
		$payment->set_details( array( 'REQUEST' => $update_info, 'VALIDATION_RESPONSE' => $response ) );
		$payment->set_status( EEM_Payment::status_id_failed );
		// log the results
		$this->log(
			array(
				'url'     => $this->_process_response_url(),
				'message' => $payment->gateway_response(),
				'details' => $payment->details(),
			),
			$payment
		);
		return false;
	}



	/**
	 * _process_response_url
	 * @return string
	 */
	protected function _process_response_url() {
		if ( isset( $_SERVER[ 'HTTP_HOST' ], $_SERVER[ 'REQUEST_URI' ] ) ) {
			$url = is_ssl() ? 'https://' : 'http://';
			$url .= EEH_URL::filter_input_server_url( 'HTTP_HOST' );
			$url .= EEH_URL::filter_input_server_url();
		} else {
			$url = 'unknown';
		}
		return $url;
	}



	/**
	 * Updates the transaction and line items based on the payment IPN data from PayPal,
	 * like the taxes or shipping
	 *
	 * @param EEI_Payment $payment
	 * @throws \EE_Error
	 */
	public function update_txn_based_on_payment( $payment ) {
		$update_info = $payment->details();
		/** @var EE_Transaction $transaction */
		$transaction = $payment->transaction();
		$payment_was_itemized = $payment->get_extra_meta( EEG_Paypal_Standard::itemized_payment_option_name, true, false );
		if( ! $transaction ){
			$this->log(
				esc_html__(
					'Payment with ID %d has no related transaction, and so update_txn_based_on_payment couldn\'t be executed properly',
					'event_espresso'
				),
				$payment
			);
			return;
		}
		if(
			! is_array( $update_info )
			|| ! isset( $update_info[ 'mc_shipping' ] )
			|| ! isset( $update_info[ 'tax' ] )
		) {
			$this->log(
				array(
					'message' => esc_html__(
						'Could not update transaction based on payment because the payment details have not yet been put on the payment. This normally happens during the IPN or returning from PayPal',
						'event_espresso'
					),
					'url' => $this->_process_response_url(),
					'payment' => $payment->model_field_array()
				),
				$payment
			);
			return;
		}
		if( $payment->status() !== $this->_pay_model->approved_status() ) {
			$this->log(
				array(
					'message' => esc_html__(
						'We shouldn\'t update transactions taxes or shipping data from non-approved payments',
						'event_espresso'
					),
					'url' => $this->_process_response_url(),
					'payment' 	=> $payment->model_field_array()
				),
				$payment
			);
			return;
		}
		$grand_total_needs_resaving = false;
		/** @var EE_Line_Item $transaction_total_line_item */
		$transaction_total_line_item = $transaction->total_line_item();

		//might paypal have changed the taxes?
		if( $this->_paypal_taxes && $payment_was_itemized ) {
            // note that we're doing this BEFORE adding shipping;
			// we actually want PayPal's shipping to remain non-taxable
            $this->_line_item->set_line_items_taxable( $transaction_total_line_item, true, 'paypal_shipping' );
            $this->_line_item->set_total_tax_to(
	            $transaction_total_line_item,
                (float)$update_info['tax'],
                esc_html__( 'Taxes', 'event_espresso' ),
                esc_html__( 'Calculated by Paypal', 'event_espresso' ),
                'paypal_tax'
            );
            $grand_total_needs_resaving = TRUE;
		}

		$shipping_amount = (float)$update_info[ 'mc_shipping' ];
		//might paypal have added shipping?
		if( $this->_paypal_shipping && $shipping_amount && $payment_was_itemized ){
			$this->_line_item->add_unrelated_item(
				$transaction_total_line_item,
				sprintf( esc_html__('Shipping for transaction %1$s', 'event_espresso'), $transaction->ID() ),
				$shipping_amount,
				esc_html__('Shipping charges calculated by Paypal', 'event_espresso'),
				1,
				false,
				'paypal_shipping_' . $transaction->ID()
			);
			$grand_total_needs_resaving = true;
		}

		if( $grand_total_needs_resaving ){
			$transaction_total_line_item->save_this_and_descendants_to_txn( $transaction->ID() );
			/** @var EE_Registration_Processor $registration_processor */
			$registration_processor = EE_Registry::instance()->load_class( 'Registration_Processor' );
			$registration_processor->update_registration_final_prices( $transaction );
		}
		$this->log(
			array(
				'message'                     => esc_html__( 'Updated transaction related to payment', 'event_espresso' ),
				'url'                         => $this->_process_response_url(),
				'transaction (updated)'       => $transaction->model_field_array(),
				'payment (updated)'           => $payment->model_field_array(),
				'use_paypal_shipping'         => $this->_paypal_shipping,
				'use_paypal_tax'              => $this->_paypal_taxes,
				'grand_total_needed_resaving' => $grand_total_needs_resaving,
			),
			$payment
		);
	}

}
// End of file EEG_Paypal_Standard.gateway.php