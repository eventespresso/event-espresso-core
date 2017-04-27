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
 * EEG_Aim
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EEG_Aim extends EE_Onsite_Gateway{

	const LIVE_URL    = 'https://secure2.authorize.net/gateway/transact.dll'; //Authnet URL

	const SANDBOX_URL = 'https://test.authorize.net/gateway/transact.dll';

	protected $_login_id;

	protected $_transaction_key;

	protected $_server;

	protected $_currencies_supported = array(
		'AUD',
		'USD',
		'CAD',
		'EUR',
		'GBP',
		'NZD',
	);

	/**
	 * Whether to send test transactions (even to live site)
	 *
	 * @var boolean
	 */
	protected $_test_transactions;

	private   $VERIFY_PEER            = false;

	private   $_x_post_fields         = array(
		"version"        => "3.1",
		"delim_char"     => ",",
		"delim_data"     => "TRUE",
		"relay_response" => "FALSE",
		"encap_char"     => "|",
	);

	private   $_additional_line_items = array();

	/**
	 * A list of all fields in the AIM API.
	 * Used to warn user if they try to set a field not offered in the API.
	 */
	private $_all_aim_fields = array(
		"address",
		"allow_partial_auth",
		"amount",
		"auth_code",
		"authentication_indicator",
		"bank_aba_code",
		"bank_acct_name",
		"bank_acct_num",
		"bank_acct_type",
		"bank_check_number",
		"bank_name",
		"card_code",
		"card_num",
		"cardholder_authentication_value",
		"city",
		"company",
		"country",
		"cust_id",
		"customer_ip",
		"delim_char",
		"delim_data",
		"description",
		"duplicate_window",
		"duty",
		"echeck_type",
		"email",
		"email_customer",
		"encap_char",
		"exp_date",
		"fax",
		"first_name",
		"footer_email_receipt",
		"freight",
		"header_email_receipt",
		"invoice_num",
		"last_name",
		"line_item",
		"login",
		"method",
		"phone",
		"po_num",
		"recurring_billing",
		"relay_response",
		"ship_to_address",
		"ship_to_city",
		"ship_to_company",
		"ship_to_country",
		"ship_to_first_name",
		"ship_to_last_name",
		"ship_to_state",
		"ship_to_zip",
		"split_tender_id",
		"state",
		"tax",
		"tax_exempt",
		"test_request",
		"tran_key",
		"trans_id",
		"type",
		"version",
		"zip",
		"solution_id"
	);

	/**
	 * Gets the URL where the request should go. This is filterable
	 * @return string
	 */
	protected function _get_server_url() {
		return apply_filters(
			'FHEE__EEG_Aim___get_server_url',
			$this->_debug_mode ? self::SANDBOX_URL : self::LIVE_URL,
			$this
		);
	}

	/**
	 * TEMPORARY CALLBACK! Do not use
	 * Callback which filters the server url. This is added so site admins can revert to using
	 * the old AIM server in case Akamai service breaks their integration.
	 * Using Akamai will, however, be mandatory on June 30th 2016 Authorize.net
	 * (see http://www.authorize.net/support/akamaifaqs/#firewall?utm_campaign=April%202016%20Technical%20Updates%20for%20Merchants.html&utm_medium=email&utm_source=Eloqua&elqTrackId=46103bdc375c411a979c2f658fc99074&elq=7026706360154fee9b6d588b27d8eb6a&elqaid=506&elqat=1&elqCampaignId=343)
	 * Once that happens, this will be obsolete and WILL BE REMOVED.
	 * @param string $url
	 * @param EEG_Aim $gateway_object
	 * @return string
	 */
	public function possibly_use_deprecated_aim_server( $url, EEG_Aim $gateway_object ) {
		if(  $gateway_object->_server === 'authorize.net'
			&& ! $gateway_object->_debug_mode ) {
			return 'https://secure.authorize.net/gateway/transact.dll';
		} else {
			return $url;
		}
	}
	/**
	 * Asks the gateway to do whatever it does to process the payment. Onsite gateways will
	 * usually send a request directly to the payment provider and update the payment's status based on that;
	 * whereas offsite gateways will usually just update the payment with the URL and query parameters to use
	 * for sending the request via http_remote_request()
	 * @param EEI_Payment $payment
	 * @param array $billing_info {
	 *	@type $credit_card string
	 *	@type $cvv string
	 *	@type $exp_month string
	 *	@type $exp_year string
	 *	@see parent::do_direct_payment
	 * }
	 * @return EE_Payment updated
	 */

	public function do_direct_payment($payment, $billing_info = null) {
			add_filter( 'FHEE__EEG_Aim___get_server_url', array( $this, 'possibly_use_deprecated_aim_server' ), 10, 2 );
			// Enable test mode if needed
			//4007000000027  <-- test successful visa
			//4222222222222  <-- test failure card number

			$item_num = 1;
			$transaction = $payment->transaction();
			$order_description = $this->_format_order_description( $payment );
			$primary_registrant = $transaction->primary_registration();
			//if we're are charging for the full amount, show the normal line items
			//and the itemized total adds up properly
			if( $this->_can_easily_itemize_transaction_for( $payment ) ){
				$total_line_item = $transaction->total_line_item();
				foreach ($total_line_item->get_items() as $line_item) {
					if( $line_item->quantity() == 0 ){
						continue;
					}
					$this->addLineItem(
						$item_num++, 
						$this->_format_line_item_name( $line_item, $payment ), 
						$this->_format_line_item_desc( $line_item, $payment ), 
						$line_item->quantity(),
						$line_item->unit_price(), 
						'N');
					$order_description .= $line_item->desc().', ';
				}
				foreach($total_line_item->tax_descendants() as $tax_line_item){
					$this->addLineItem($item_num++, $tax_line_item->name(), $tax_line_item->desc(), 1, $tax_line_item->total(), 'N');
				}
			}




			//start transaction
			//if in debug mode, use authorize.net's sandbox id; otherwise use the Event Espresso partner id
			$partner_id = $this->_debug_mode ? 'AAA100302' : 'AAA105363';
			$this->setField( 'solution_id', $partner_id );
			$this->setField('amount', $this->format_currency($payment->amount()));
			$this->setField('description',substr(rtrim($order_description, ', '), 0, 255));
			$this->_set_sensitive_billing_data( $billing_info );
			$this->setField('first_name', $billing_info['first_name']);
			$this->setField('last_name', $billing_info['last_name']);
			$this->setField('email', $billing_info['email']);
			$this->setField('company', $billing_info['company']);
			$this->setField('address', $billing_info['address'].' '.$billing_info['address2']);
			$this->setField('city', $billing_info['city']);
			$this->setField('state', $billing_info['state'] );
			$this->setField('country', $billing_info['country'] );
			$this->setField('zip', $billing_info['zip']);
			$this->setField('fax', $billing_info['fax']);
			$this->setField('cust_id', $primary_registrant->ID());
			$this->setField('phone', $billing_info['phone']);
			//invoice_num would be nice to have it be unique per SPCO page-load, that way if users
			//press back, they don't submit a duplicate. However, we may be keeping the user on teh same spco page
			//in which case, we need to generate teh invoice num per request right here...
			$this->setField('invoice_num', wp_generate_password(12,false));//$billing_info['_reg-page-billing-invoice-'.$this->_gateway_name]['value']);
			//tell AIM that any duplicates sent in the next 5 minutes are to be ignored
            $this->setField('duplicate_window', 5 * MINUTE_IN_SECONDS );


			if ($this->_test_transactions) {
				$this->test_request = "true";
			}

			//Capture response
			$this->type = "AUTH_CAPTURE";
			$response = $this->_sendRequest($payment);
			if (!empty($response)){
				if ($this->_debug_mode) {
					$txn_id = $response->invoice_number;
				} else {
					$txn_id = $response->transaction_id;
				}
				$payment_status = $response->approved ? $this->_pay_model->approved_status() : $this->_pay_model->declined_status();
				$payment->set_status($payment_status);
				//make sure we interpret the AMT as a float, not an international string (where periods are thousand separators)
				$payment->set_amount( (float) $response->amount );
				$payment->set_gateway_response(sprintf("%s (code: %s)",$response->response_reason_text,$response->response_reason_code));
				$payment->set_txn_id_chq_nmbr( $txn_id );
				$payment->set_extra_accntng($primary_registrant->reg_code());
				$payment->set_details(print_r($response,true));
			} else {
				$payment->set_status($this->_pay_model->failed_status());
				$payment->set_gateway_response(__("There was no response from Authorize.net", 'event_espresso'));
				$payment->set_details(print_r($response,true));
			}
		return $payment;
	}

	/**
	 * Sets billing data for the upcoming request to AIM that is considered sensitive;
	 * also this method can be overridden by children classes to easily change
	 * what billing data gets sent
	 * @param array $billing_info
	 */
	protected function _set_sensitive_billing_data( $billing_info ) {
		$this->setField('card_num', $billing_info['credit_card']);
		$this->setField('exp_date', $billing_info['exp_month'].$billing_info['exp_year']);
		$this->setField('card_code', $billing_info['cvv']);
	}
	/**
	 * Add a line item.
	 *
	 * @param string $item_id
	 * @param string $item_name
	 * @param string $item_description
	 * @param string $item_quantity
	 * @param string $item_unit_price
	 * @param string $item_taxable
	 */
	public function addLineItem($item_id, $item_name, $item_description, $item_quantity, $item_unit_price, $item_taxable) {
		$args = array(
			substr($item_id, 0, 31),
			substr($item_name, 0, 31),
			substr($item_description, 0, 255),
			number_format(abs($item_quantity), 2, '.', ''),
			number_format(abs($item_unit_price), 2, '.', ''),
			$item_taxable === 'N' ? 'N' : 'Y'
			);
		$this->_additional_line_items[] = implode('<|>', $args);
	}


	/**
	 * Set an individual name/value pair. This will append x_ to the name
	 * before posting.
	 *
	 * @param string $name
	 * @param string $value
	 * @throws AuthorizeNetException
	 */
	protected function setField($name, $value) {
		if (in_array($name, $this->_all_aim_fields)) {
			$this->_x_post_fields[$name] = $value;
		} else {
			throw new AuthorizeNetException("Error: no field $name exists in the AIM API.
			To set a custom field use setCustomField('field','value') instead.");
		}
	}



	/**
	 * Posts the request to AuthorizeNet & returns response.
	 *
	 * @param $payment
	 * @return \EE_AuthorizeNetAIM_Response
	 */
	private function _sendRequest($payment) {
		$this->_x_post_fields['login'] = $this->_login_id;
		$this->_x_post_fields['tran_key'] = $this->_transaction_key;
		$x_keys = array();
		foreach ($this->_x_post_fields as $key => $value) {
			$x_keys[] = "x_$key=" . urlencode($this->_get_unsupported_character_remover()->format($value));
		}
		// Add line items
		foreach ($this->_additional_line_items as $key => $value) {
			$x_keys[] =  "x_line_item=" . urlencode($this->_get_unsupported_character_remover()->format($value));
		}
		$this->_log_clean_request($x_keys, $payment);
		$post_url = $this->_get_server_url();
		$curl_request = curl_init($post_url);
        $post_body = implode("&",$x_keys);
		curl_setopt($curl_request, CURLOPT_POSTFIELDS, $post_body);
		curl_setopt($curl_request, CURLOPT_HEADER, 0);
		curl_setopt($curl_request, CURLOPT_TIMEOUT, 45);
		curl_setopt($curl_request, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($curl_request, CURLOPT_SSL_VERIFYHOST, 2);
		if ($this->VERIFY_PEER) {
			curl_setopt($curl_request, CURLOPT_CAINFO, dirname( __DIR__ ) . '/ssl/cert.pem');
		} else {
			curl_setopt($curl_request, CURLOPT_SSL_VERIFYPEER, false);
		}

		if (preg_match('/xml/', $post_url)) {
			curl_setopt($curl_request, CURLOPT_HTTPHEADER, Array("Content-Type: text/xml"));
		}

		$response = curl_exec($curl_request);

		curl_close($curl_request);
		$response_obj =  new EE_AuthorizeNetAIM_Response($response);

		return $this->_log_and_clean_response($response_obj, $payment);
	}
	/**
	 * Logs the clean data only
	 * @param array $request_array
	 * @param EEI_Payment $payment
	 */
	protected function _log_clean_request($request_array,$payment){
		$keys_to_filter_out = array( 'x_card_num', 'x_card_code', 'x_exp_date' );
		foreach($request_array as $index => $keyvaltogether ) {
			foreach( $keys_to_filter_out as $key ) {
				if( strpos( $keyvaltogether, $key ) === 0 ){
					//found it at the first character
					//so its one of them
					unset( $request_array[ $index ] );
				}
			}
		}
		$this->log(array('AIM Request sent:'=>$request_array, 'Server URL' => $this->_get_server_url() ),$payment);
	}



	/**
	 * Logs the response and cleans it
	 *
	 * @param EE_AuthorizeNetAIM_Response $response_obj
	 * @param EE_Payment                  $payment
	 * @return \EE_AuthorizeNetAIM_Response
	 */
	private function _log_and_clean_response($response_obj,$payment){
		$response_obj->account_number = '';
		$this->log(array('AIM Response received:'=>$response_obj),$payment);
		return $response_obj;
	}

}



/**
 * Class EE_AuthorizeNetAIM_Response
 *
 * Parses an AuthorizeNet AIM Response.
 *
 * @package    AuthorizeNet
 * @subpackage AuthorizeNetAIM
 */
class EE_AuthorizeNetAIM_Response {

	const APPROVED = '1';
	const DECLINED = '2';
	const ERROR = '3';
	const HELD = '4';

	protected $_x_post_fields = array(
		"version" => "3.1",
		"delim_char" => ",",
		"delim_data" => "TRUE",
		"relay_response" => "FALSE",
		"encap_char" => "|",
	);
	public $approved;
	public $declined;
	public $error;
	public $held;
	public $response_code;
	public $response_subcode;
	public $response_reason_code;
	public $response_reason_text;
	public $authorization_code;
	public $avs_response;
	public $transaction_id;
	public $invoice_number;
	public $description;
	public $amount;
	public $method;
	public $transaction_type;
	public $customer_id;
	public $first_name;
	public $last_name;
	public $company;
	public $address;
	public $city;
	public $state;
	public $zip_code;
	public $country;
	public $phone;
	public $fax;
	public $email_address;
	public $ship_to_first_name;
	public $ship_to_last_name;
	public $ship_to_company;
	public $ship_to_address;
	public $ship_to_city;
	public $ship_to_state;
	public $ship_to_zip_code;
	public $ship_to_country;
	public $tax;
	public $duty;
	public $freight;
	public $tax_exempt;
	public $purchase_order_number;
	public $md5_hash;
	public $card_code_response;
	public $cavv_response; // cardholder_authentication_verification_response
	public $account_number;
	public $card_type;
	public $split_tender_id;
	public $requested_amount;
	public $balance_on_card;
	public $response; // The response string from AuthorizeNet.
	private $_response_array = array(); // An array with the split response.

	/**
	 * Constructor. Parses the AuthorizeNet response string
	 *
	 * @param string $response The response from the AuthNet server.
	 * @var string $delimiter	 The delimiter used (default is ",")
	 * @var string $encap_char	The encap_char used (default is "|")
	 * @var array  $custom_fields Any custom fields set in the request.
	 */

	public function __construct($response) {
		$encap_char = $this->_x_post_fields['encap_char'];
		$delimiter = $this->_x_post_fields['delim_char'];
		if ($response) {

			// Split Array
			$this->response = $response;
			if ($encap_char) {
				$this->_response_array = explode($encap_char . $delimiter . $encap_char, substr($response, 1, -1));
			} else {
				$this->_response_array = explode($delimiter, $response);
			}

			/**
			 * If AuthorizeNet doesn't return a delimited response.
			 */
			if (count($this->_response_array) < 10) {
				$this->approved = false;
				$this->error = true;
				$this->error_message = "Unrecognized response from AuthorizeNet: $response";
				return;
			}



			// Set all fields
			$this->response_code = $this->_response_array[0];
			$this->response_subcode = $this->_response_array[1];
			$this->response_reason_code = $this->_response_array[2];
			$this->response_reason_text = $this->_response_array[3];
			$this->authorization_code = $this->_response_array[4];
			$this->avs_response = $this->_response_array[5];
			$this->transaction_id = $this->_response_array[6];
			$this->invoice_number = $this->_response_array[7];
			$this->description = $this->_response_array[8];
			$this->amount = $this->_response_array[9];
			$this->method = $this->_response_array[10];
			$this->transaction_type = $this->_response_array[11];
			$this->customer_id = $this->_response_array[12];
			$this->first_name = $this->_response_array[13];
			$this->last_name = $this->_response_array[14];
			$this->company = $this->_response_array[15];
			$this->address = $this->_response_array[16];
			$this->city = $this->_response_array[17];
			$this->state = $this->_response_array[18];
			$this->zip_code = $this->_response_array[19];
			$this->country = $this->_response_array[20];
			$this->phone = $this->_response_array[21];
			$this->fax = $this->_response_array[22];
			$this->email_address = $this->_response_array[23];
			$this->ship_to_first_name = $this->_response_array[24];
			$this->ship_to_last_name = $this->_response_array[25];
			$this->ship_to_company = $this->_response_array[26];
			$this->ship_to_address = $this->_response_array[27];
			$this->ship_to_city = $this->_response_array[28];
			$this->ship_to_state = $this->_response_array[29];
			$this->ship_to_zip_code = $this->_response_array[30];
			$this->ship_to_country = $this->_response_array[31];
			$this->tax = $this->_response_array[32];
			$this->duty = $this->_response_array[33];
			$this->freight = $this->_response_array[34];
			$this->tax_exempt = $this->_response_array[35];
			$this->purchase_order_number = $this->_response_array[36];
			$this->md5_hash = $this->_response_array[37];
			$this->card_code_response = $this->_response_array[38];
			$this->cavv_response = $this->_response_array[39];
			$this->account_number = $this->_response_array[50];
			$this->card_type = $this->_response_array[51];
			$this->split_tender_id = $this->_response_array[52];
			$this->requested_amount = $this->_response_array[53];
			$this->balance_on_card = $this->_response_array[54];

			$this->approved = ($this->response_code === self::APPROVED);
			$this->declined = ($this->response_code === self::DECLINED);
			$this->error = ($this->response_code === self::ERROR);
			$this->held = ($this->response_code === self::HELD);

			if ($this->error || $this->declined || $this->held) {
				$this->error_message = '<p><strong class="credit_card_failure">Attention: your transaction was declined for the following reason(s):</strong><br />' . $this->response_reason_text . '<br /><span class="response_code">Response Code: ' . $this->response_code . '<br /></span><span class="response_subcode">Response Subcode: ' . $this->response_subcode . '</span></p><p>To try again, <a href="#payment_options">please click here</a>.</p> ';


				/* $this->error_message = "AuthorizeNet Error:
				  Response Code: ".$this->response_code."
				  Response Subcode: ".$this->response_subcode."
				  Response Reason Code: ".$this->response_reason_code."
				  Response Reason Text: ".$this->response_reason_text."
				  "; */
			}
		} else {
			$this->approved = false;
			$this->error = true;
			$this->error_message = "Error connecting to AuthorizeNet";
		}
	}

}

if ( ! class_exists( 'AuthorizeNetException' ) ) {
	/**
	 * Class AuthorizeNetException
	 *
	 * @package    AuthorizeNet
	 */
	class AuthorizeNetException extends Exception {

		/**
		 * Construct the exception. Note: The message is NOT binary safe.
		 * @link http://php.net/manual/en/exception.construct.php
		 * @param string $message [optional] The Exception message to throw.
		 * @param int $code [optional] The Exception code.
		 * @param Exception $previous [optional] The previous exception used for the exception chaining. Since 5.3.0
		 * @since 5.1.0
		 */
		public function __construct( $message = "", $code = 0, Exception $previous = null ) {
			parent::__construct( $message, $code, $previous );
		}
	}
}


// End of file EEG_Aim.gateway.php