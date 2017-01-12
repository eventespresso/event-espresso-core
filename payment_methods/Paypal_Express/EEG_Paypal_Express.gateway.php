<?php if ( ! defined( 'EVENT_ESPRESSO_VERSION' )) { exit('NO direct script access allowed'); }

/**
 * ----------------------------------------------
 *
 * Class  EEG_Paypal_Express
 *
 * @package			Event Espresso
 * @subpackage		eea-paypal-express
 * @author			Event Espresso
 * @version		 	$VID:$
 *
 * ----------------------------------------------
 */
class EEG_Paypal_Express extends EE_Offsite_Gateway {

	/**
	 * Merchant API Username.
	 *  @var string
	 */
	protected $_api_username;

	/**
	 * Merchant API Password.
	 *  @var string
	 */
	protected $_api_password;

	/**
	 * API Signature.
	 *  @var string
	 */
	protected $_api_signature;

	/**
	 * Request Shipping address on PP checkout page.
	 *  @var string
	 */
	protected $_request_shipping_addr;

	/**
	 * Business/personal logo.
	 *  @var string
	 */
	protected $_image_url;

    /**
     * gateway URL variable
     *
     * @var string
     */
    protected $_base_gateway_url = '';



    /**
     * EEG_Paypal_Express constructor.
     */
    public function __construct()
    {
        $this->_currencies_supported = array(
            'USD',
            'AUD',
            'BRL',
            'CAD',
            'CZK',
            'DKK',
            'EUR',
            'HKD',
            'HUF',
            'ILS',
            'JPY',
            'MYR',
            'MXN',
            'NOK',
            'NZD',
            'PHP',
            'PLN',
            'GBP',
            'RUB',
            'SGD',
            'SEK',
            'CHF',
            'TWD',
            'THB',
            'TRY'
        );
        parent::__construct();
    }



    /**
	 * Sets the gateway URL variable based on whether debug mode is enabled or not.

	 *
*@param array $settings_array
	 */
	public function set_settings( $settings_array ) {
		parent::set_settings($settings_array);
		// Redirect URL.
        $this->_base_gateway_url = $this->_debug_mode
            ? 'https://api-3t.sandbox.paypal.com/nvp'
            : 'https://api-3t.paypal.com/nvp';
	}



    /**
     * @param EEI_Payment $payment
     * @param array       $billing_info
     * @param string      $return_url
     * @param string      $notify_url
     * @param string      $cancel_url
     * @return \EE_Payment|\EEI_Payment
     * @throws \EE_Error
     */
	public function set_redirection_info( $payment, $billing_info = array(), $return_url = NULL, $notify_url = NULL, $cancel_url = NULL ) {
		if ( ! $payment instanceof EEI_Payment ) {
			$payment->set_gateway_response( __( 'Error. No associated payment was found.', 'event_espresso' ) );
			$payment->set_status( $this->_pay_model->failed_status() );
			return $payment;
		}
		$transaction = $payment->transaction();
		if ( ! $transaction instanceof EEI_Transaction ) {
			$payment->set_gateway_response( __( 'Could not process this payment because it has no associated transaction.', 'event_espresso' ) );
			$payment->set_status( $this->_pay_model->failed_status() );
			return $payment;
		}
		$order_description = substr( $this->_format_order_description($payment), 0, 127 );
		$primary_registration = $transaction->primary_registration();
		$primary_attendee = $primary_registration instanceof EE_Registration ? $primary_registration->attendee() : false;
		$locale = explode('-', get_bloginfo('language'));

		// Gather request parameters.
		$token_request_dtls = array(
			'METHOD' => 'SetExpressCheckout',
			'PAYMENTREQUEST_0_AMT' => $payment->amount(),
			'PAYMENTREQUEST_0_CURRENCYCODE' => $payment->currency_code(),
			'PAYMENTREQUEST_0_DESC' => $order_description,
			'RETURNURL' => $return_url,
			'CANCELURL' => $cancel_url,
			'PAYMENTREQUEST_0_PAYMENTACTION' => 'Sale',
			'SOLUTIONTYPE' => 'Sole',	// Buyer does not need to create a PayPal account to check out. This is referred to as PayPal Account Optional.
			'BUTTONSOURCE' => 'EventEspresso_SP',//EE will blow up if you change this
			'LOCALECODE' => $locale[1]	// Locale of the pages displayed by PayPal during Express Checkout.
		);

		// Show itemized list.
		if ( $this->_money->compare_floats( $payment->amount(), $transaction->total(), '==' ) ) {
			$item_num = 0;
			$itemized_sum = 0;
			$total_line_items = $transaction->total_line_item();
			// Go through each item in the list.
			foreach ( $total_line_items->get_items() as $line_item ) {
				if ( $line_item instanceof EE_Line_Item ) {
					// PayPal doesn't like line items with 0.00 amount, so we may skip those.
					if ( EEH_Money::compare_floats( $line_item->total(), '0.00', '==' ) ) {
						continue;
					}

					$unit_price = $line_item->unit_price();
					$line_item_quantity = $line_item->quantity();
					// This is a discount.
					if ( $line_item->is_percent() ) {
						$unit_price = $line_item->total();
						$line_item_quantity = 1;
					}
					// Item Name.
					$token_request_dtls['L_PAYMENTREQUEST_0_NAME'.$item_num] = substr($this->_format_line_item_name( $line_item, $payment), 0, 127);
					// Item description.
					$token_request_dtls['L_PAYMENTREQUEST_0_DESC'.$item_num] = substr($this->_format_line_item_desc( $line_item, $payment), 0, 127);
					// Cost of individual item.
					$token_request_dtls['L_PAYMENTREQUEST_0_AMT'.$item_num] = $this->format_currency( $unit_price );
					// Item Number.
					$token_request_dtls['L_PAYMENTREQUEST_0_NUMBER'.$item_num] = $item_num + 1;
					// Item quantity.
					$token_request_dtls['L_PAYMENTREQUEST_0_QTY'.$item_num] = $line_item_quantity;
					// Digital item is sold.
					$token_request_dtls['L_PAYMENTREQUEST_0_ITEMCATEGORY'.$item_num] = 'Physical';
					$itemized_sum += $line_item->total();
					++$item_num;
				}
			}
			// Item's sales S/H and tax amount.
			$token_request_dtls['PAYMENTREQUEST_0_ITEMAMT'] = $total_line_items->get_items_total();
			$token_request_dtls['PAYMENTREQUEST_0_TAXAMT'] = $total_line_items->get_total_tax();
			$token_request_dtls['PAYMENTREQUEST_0_SHIPPINGAMT'] = '0';
			$token_request_dtls['PAYMENTREQUEST_0_HANDLINGAMT'] = '0';

			$itemized_sum_diff_from_txn_total = round( $transaction->total() - $itemized_sum - $total_line_items->get_total_tax(), 2 );
			// If we were not able to recognize some item like promotion, surcharge or cancellation,
			// add the difference as an extra line item.
			if ( $this->_money->compare_floats( $itemized_sum_diff_from_txn_total, 0, '!=' ) ) {
				// Item Name.
				$token_request_dtls['L_PAYMENTREQUEST_0_NAME'.$item_num] = substr( __( 'Other (promotion/surcharge/cancellation)', 'event_espresso' ), 0, 127 );
				// Item description.
				$token_request_dtls['L_PAYMENTREQUEST_0_DESC'.$item_num] = '';
				// Cost of individual item.
				$token_request_dtls['L_PAYMENTREQUEST_0_AMT'.$item_num] = $this->format_currency( $itemized_sum_diff_from_txn_total );
				// Item Number.
				$token_request_dtls['L_PAYMENTREQUEST_0_NUMBER'.$item_num] = $item_num + 1;
				// Item quantity.
				$token_request_dtls['L_PAYMENTREQUEST_0_QTY'.$item_num] = 1;
                // Digital item is sold.
                $token_request_dtls['L_PAYMENTREQUEST_0_ITEMCATEGORY'.$item_num] = 'Physical';
                $item_num++;
			}
		} else {
			// Just one Item.
			// Item Name.
			$token_request_dtls['L_PAYMENTREQUEST_0_NAME0'] = substr( $this->_format_partial_payment_line_item_name($payment), 0, 127 );
			// Item description.
			$token_request_dtls['L_PAYMENTREQUEST_0_DESC0'] = substr( $this->_format_partial_payment_line_item_desc($payment), 0, 127 );
			// Cost of individual item.
			$token_request_dtls['L_PAYMENTREQUEST_0_AMT0'] = $this->format_currency( $payment->amount() );
			// Item Number.
			$token_request_dtls['L_PAYMENTREQUEST_0_NUMBER0'] = 1;
			// Item quantity.
			$token_request_dtls['L_PAYMENTREQUEST_0_QTY0'] = 1;
			// Digital item is sold.
			$token_request_dtls['L_PAYMENTREQUEST_0_ITEMCATEGORY0'] = 'Physical';
			// Item's sales S/H and tax amount.
			$token_request_dtls['PAYMENTREQUEST_0_ITEMAMT'] = $this->format_currency( $payment->amount() );
			$token_request_dtls['PAYMENTREQUEST_0_TAXAMT'] = '0';
			$token_request_dtls['PAYMENTREQUEST_0_SHIPPINGAMT'] = '0';
			$token_request_dtls['PAYMENTREQUEST_0_HANDLINGAMT'] = '0';
		}
		// Automatically filling out shipping and contact information.
		if ( $this->_request_shipping_addr && $primary_attendee instanceof EEI_Attendee ) {
			$token_request_dtls['NOSHIPPING'] = '2';	//  If you do not pass the shipping address, PayPal obtains it from the buyer's account profile.
			$token_request_dtls['PAYMENTREQUEST_0_SHIPTOSTREET'] = $primary_attendee->address();
			$token_request_dtls['PAYMENTREQUEST_0_SHIPTOSTREET2'] = $primary_attendee->address2();
			$token_request_dtls['PAYMENTREQUEST_0_SHIPTOCITY'] = $primary_attendee->city();
			$token_request_dtls['PAYMENTREQUEST_0_SHIPTOSTATE'] = $primary_attendee->state_abbrev();
			$token_request_dtls['PAYMENTREQUEST_0_SHIPTOCOUNTRYCODE'] = $primary_attendee->country_ID();
			$token_request_dtls['PAYMENTREQUEST_0_SHIPTOZIP'] = $primary_attendee->zip();
			$token_request_dtls['PAYMENTREQUEST_0_EMAIL'] = $primary_attendee->email();
			$token_request_dtls['PAYMENTREQUEST_0_SHIPTOPHONENUM'] = $primary_attendee->phone();
		} elseif ( ! $this->_request_shipping_addr ) {
			// Do not request shipping details on the PP Checkout page.
			$token_request_dtls['NOSHIPPING'] = '1';
			$token_request_dtls['REQCONFIRMSHIPPING'] = '0';

		}
		// Used a business/personal logo on the PayPal page.
		if ( ! empty($this->_image_url) ) {
			$token_request_dtls['LOGOIMG'] = $this->_image_url;
		}
		$token_request_dtls = apply_filters( 
			'FHEE__EEG_Paypal_Express__set_redirection_info__arguments', 
			$token_request_dtls, 
			$this 
		);
		// Request PayPal token.
		$token_request_response = $this->_ppExpress_request( $token_request_dtls, 'Payment Token', $payment );
		$token_rstatus = $this->_ppExpress_check_response( $token_request_response );
		$response_args = ( isset($token_rstatus['args']) && is_array($token_rstatus['args']) ) ? $token_rstatus['args'] : array();
		if ( $token_rstatus['status'] ) {
			// We got the Token so we may continue with the payment and redirect the client.
			$payment->set_details( $response_args );

			$gateway_url = $this->_debug_mode ? 'https://www.sandbox.paypal.com' : 'https://www.paypal.com';
			$payment->set_redirect_url( $gateway_url . '/checkoutnow?useraction=commit&cmd=_express-checkout&token=' . $response_args['TOKEN'] );
		} else {
			if ( isset($response_args['L_ERRORCODE']) ) {
				$payment->set_gateway_response( $response_args['L_ERRORCODE'] . '; ' . $response_args['L_SHORTMESSAGE'] );
			} else {
				$payment->set_gateway_response( __( 'Error occurred while trying to setup the Express Checkout.', 'event_espresso' ) );
			}
			$payment->set_details( $response_args );
			$payment->set_status( $this->_pay_model->failed_status() );
		}

		return $payment;
	}


	/**

	 *  @param array $update_info {
	 *	  @type string $gateway_txn_id
	 *	  @type string status an EEMI_Payment status
	 *  }
	 *  @param EEI_Transaction $transaction
	 *  @return EEI_Payment
	 */
	public function handle_payment_update( $update_info, $transaction ) {
		$payment = $transaction instanceof EEI_Transaction ? $transaction->last_payment() : null;

		if ( $payment instanceof EEI_Payment ) {
			$this->log( array( 'Return from Authorization' => $update_info ), $payment );
			$transaction = $payment->transaction();
			if ( ! $transaction instanceof EEI_Transaction ) {
				$payment->set_gateway_response( __( 'Could not process this payment because it has no associated transaction.', 'event_espresso' ) );
				$payment->set_status( $this->_pay_model->failed_status() );
				return $payment;
			}
			$primary_registrant = $transaction->primary_registration();
            $payment_details = $payment->details();
            // Check if we still have the token.
			if ( ! isset($payment_details['TOKEN']) || empty($payment_details['TOKEN']) ) {
				$payment->set_status( $this->_pay_model->failed_status() );
				return $payment;
			}

			$cdetails_request_dtls = array(
				'METHOD' => 'GetExpressCheckoutDetails',
				'TOKEN' => $payment_details['TOKEN']
			);
			// Request Customer Details.
			$cdetails_request_response = $this->_ppExpress_request( $cdetails_request_dtls, 'Customer Details', $payment );
			$cdetails_rstatus = $this->_ppExpress_check_response( $cdetails_request_response );
			$cdata_response_args = ( isset($cdetails_rstatus['args']) && is_array($cdetails_rstatus['args']) ) ? $cdetails_rstatus['args'] : array();
			if ( $cdetails_rstatus['status'] ) {
				// We got the PayerID so now we can Complete the transaction.
				$docheckout_request_dtls = array(
					'METHOD' => 'DoExpressCheckoutPayment',
					'PAYERID' => $cdata_response_args['PAYERID'],
					'TOKEN' => $payment_details['TOKEN'],
					'PAYMENTREQUEST_0_PAYMENTACTION' => 'Sale',
					'PAYMENTREQUEST_0_AMT' => $payment->amount(),
					'PAYMENTREQUEST_0_CURRENCYCODE' => $payment->currency_code()
				);
				// Payment Checkout/Capture.
				$docheckout_request_response = $this->_ppExpress_request( $docheckout_request_dtls, 'Do Payment', $payment );
				$docheckout_rstatus = $this->_ppExpress_check_response( $docheckout_request_response );
				$docheckout_response_args = ( isset($docheckout_rstatus['args']) && is_array($docheckout_rstatus['args']) ) ? $docheckout_rstatus['args'] : array();
				if ( $docheckout_rstatus['status'] ) {
					// All is well, payment approved.
					$primary_registration_code = $primary_registrant instanceof EE_Registration ? $primary_registrant->reg_code() : '';
					$payment->set_extra_accntng( $primary_registration_code );
					$payment->set_amount( isset($docheckout_response_args['PAYMENTINFO_0_AMT']) ? (float) $docheckout_response_args['PAYMENTINFO_0_AMT'] : 0 );
					$payment->set_txn_id_chq_nmbr( isset( $docheckout_response_args['PAYMENTINFO_0_TRANSACTIONID'] ) ? $docheckout_response_args['PAYMENTINFO_0_TRANSACTIONID'] : null );
					$payment->set_details( $cdata_response_args );
					$payment->set_gateway_response( isset( $docheckout_response_args['PAYMENTINFO_0_ACK'] ) ? $docheckout_response_args['PAYMENTINFO_0_ACK'] : '' );
					$payment->set_status( $this->_pay_model->approved_status() );
				} else {
					if ( isset($docheckout_response_args['L_ERRORCODE']) ) {
						$payment->set_gateway_response( $docheckout_response_args['L_ERRORCODE'] . '; ' . $docheckout_response_args['L_SHORTMESSAGE'] );
					} else {
						$payment->set_gateway_response( __( 'Error occurred while trying to Capture the funds.', 'event_espresso' ) );
					}
					$payment->set_details( $docheckout_response_args );
					$payment->set_status( $this->_pay_model->declined_status() );
				}
			} else {
				if ( isset($cdata_response_args['L_ERRORCODE']) ) {
					$payment->set_gateway_response( $cdata_response_args['L_ERRORCODE'] . '; ' . $cdata_response_args['L_SHORTMESSAGE'] );
				} else {
					$payment->set_gateway_response( __( 'Error occurred while trying to get payment Details from PayPal.', 'event_espresso' ) );
				}
				$payment->set_details( $cdata_response_args );
				$payment->set_status( $this->_pay_model->failed_status() );
			}
		} else {
			$payment->set_gateway_response( __( 'Error occurred while trying to process the payment.', 'event_espresso' ) );
			$payment->set_status( $this->_pay_model->failed_status() );
		}

		return $payment;
	}


	/**
	 *  Make the Express checkout request.
	 *
	 *	@param array        $request_params
	 *	@param string       $request_text
	 *  @param EEI_Payment  $payment
	 *	@return mixed
	 */
	public function _ppExpress_request( $request_params, $request_text, $payment ) {
		$request_dtls = array(
			'VERSION' => '204.0',
			'USER' => urlencode( $this->_api_username ),
			'PWD' => urlencode( $this->_api_password ),
			'SIGNATURE' => urlencode( $this->_api_signature )
		);
		$dtls = array_merge( $request_dtls, $request_params );

		$this->_log_clean_request( $dtls, $payment, $request_text . ' Request' );
		// Request Customer Details.
		$request_response = wp_remote_post(
			$this->_base_gateway_url,
			array(
				'method' => 'POST',
				'timeout' => 45,
				'httpversion' => '1.1',
				'cookies' => array(),
				'headers' => array(),
				'body' => http_build_query( $dtls )
			)
		);
		// Log the response.
		$this->log( array( $request_text . ' Response' => $request_response), $payment );

		return $request_response;
	}


	/**
	 *  Check the response status.
	 *
	 *	@param mixed        $request_response
	 *	@return array
	 */
	public function _ppExpress_check_response( $request_response ) {
		if (empty($request_response['body']) || is_wp_error( $request_response ) ) {
            // If we got here then there was an error in this request.
            return array('status' => false, 'args' => $request_response);
        }
        $response_args = array();
        parse_str( urldecode($request_response['body']), $response_args );
        if ( ! isset($response_args['ACK'])) {
            return array('status' => false, 'args' => $request_response);
        }
        if (
            $response_args['ACK'] === 'Success'
            && (
                isset($response_args['PAYERID'])
                || isset($response_args['PAYMENTINFO_0_TRANSACTIONID'])
                || (isset($response_args['PAYMENTSTATUS']) && $response_args['PAYMENTSTATUS'] === 'Completed')
                || isset($response_args['TOKEN'])
            )
        ) {
            // Response status OK, return response parameters for further processing.
            return array('status' => true, 'args' => $response_args);
        } else {
            $errors = $this->_get_errors($response_args);
            return array('status' => false, 'args' => $errors);
        }
	}


	/**
     *  Log a "Cleared" request.
     *
     * @param array $request
	 * @param EEI_Payment  $payment
	 * @param string  		$info
	 * @return void
	 */
	private function _log_clean_request($request, $payment, $info ) {
		$cleaned_request_data = $request;
		unset($cleaned_request_data['PWD'], $cleaned_request_data['USER'], $cleaned_request_data['SIGNATURE']);
		$this->log( array($info => $cleaned_request_data), $payment );
	}


	/**
	 *  Get error from the response data.
	 *
	 *  @param array	$data_array
	 *  @return array
	 */
	private function _get_errors( $data_array ) {
		$errors = array();
		$n = 0;
		while ( isset($data_array["L_ERRORCODE{$n}"]) ) {
			$l_error_code = isset($data_array["L_ERRORCODE{$n}"])
                ? $data_array["L_ERRORCODE{$n}"]
                : '';
			$l_severity_code = isset($data_array["L_SEVERITYCODE{$n}"])
                ? $data_array["L_SEVERITYCODE{$n}"]
                : '';
			$l_short_message = isset($data_array["L_SHORTMESSAGE{$n}"])
                ? $data_array["L_SHORTMESSAGE{$n}"]
                : '';
			$l_long_message = isset($data_array["L_LONGMESSAGE{$n}"])
                ? $data_array["L_LONGMESSAGE{$n}"]
                : '';

			if ( $n === 0 ) {
				$errors = array(
					'L_ERRORCODE' => $l_error_code,
					'L_SHORTMESSAGE' => $l_short_message,
					'L_LONGMESSAGE' => $l_long_message,
					'L_SEVERITYCODE' => $l_severity_code
				);
			} else {
				$errors['L_ERRORCODE'] .= ', ' . $l_error_code;
				$errors['L_SHORTMESSAGE'] .= ', ' . $l_short_message;
				$errors['L_LONGMESSAGE'] .= ', ' . $l_long_message;
				$errors['L_SEVERITYCODE'] .= ', ' . $l_severity_code;
			}

			$n++;
		}

		return $errors;
	}

}
// End of file EEG_Paypal_Express.gateway.php