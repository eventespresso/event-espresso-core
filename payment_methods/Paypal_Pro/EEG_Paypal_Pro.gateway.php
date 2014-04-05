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
 * EEG_Paypal_Pro
 *
 * @package			Event Espresso
 * @subpackage		
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EEG_Paypal_Pro extends EE_Onsite_Gateway{
	/**
	 *
	 * @var $_paypal_api_username string
	 */
	protected $_paypal_api_username = NULL;
	/**
	 *
	 * @var $_paypal_api_password string
	 */
	protected $_paypal_api_password = NULL;
	/**
	 *
	 * @var $_paypal_api_signature string
	 */
	protected $_paypal_api_signature = NULL;
	/**
	 *
	 * @var $_no_shipping boolean
	 */
	protected $_no_shipping = NULL;
	/**
	 *
	 * @var $_credit_card_types array with the keys for credit card types accepted on this account
	 */
	protected $_credit_card_types = NULL;
				
	
	/**
	 * 
	 * @param EEI_Payment $payment
	 * @param array $billing_info{
	 *	@type $credit_card string
	 *	@type $credit_card_type string
	 *	@type $exp_month string always 2 characters
	 *	@type $exp_year string always 4 characters
	 *	@type $cvv string
	 * } @see parent::do_direct_payment for more info
	 */
	public function do_direct_payment($payment,$billing_info = null){
		$transaction = $payment->transaction();
		$primary_registrant = $transaction->primary_registration();
		$order_description  = sprintf(__("'Event Registrations from %s", "event_espresso"),get_bloginfo('name'));
		if($transaction->total() == $payment->amount()){//charge for teh full amount. Show itemized list
			$total_to_pay = $transaction->total();
			$item_num = 1;
			$total_line_item = $transaction->total_line_item();
			$order_items = array();
			foreach ($total_line_item->get_items() as $line_item) {	
				$item = array(
						// Item Name.  127 char max.
						'l_name' => substr($line_item->name(),0,127),
						// Item description.  127 char max.
						'l_desc' => substr($line_item->desc(),0,127),
						// Cost of individual item.
						'l_amt' => $line_item->unit_price(),
						// Item Number.  127 char max.
						'l_number' => $item_num++,
						// Item quantity.  Must be any positive integer.
						'l_qty' => $line_item->quantity(),
						// Item's sales tax amount.
						'l_taxamt' => '',
						// eBay auction number of item.
						'l_ebayitemnumber' => '',
						// eBay transaction ID of purchased item.
						'l_ebayitemauctiontxnid' => '',
						// eBay order ID for the item.
						'l_ebayitemorderid' => ''
				);
					// add to array of all items
				array_push($order_items, $item);
			}
			$item_amount = $total_line_item->get_items_total();
			$tax_amount = $total_line_item->get_total_tax();
		}else{
			$total_to_pay = $payment->amount();
			$single_item_desc = sprintf(__("Partial payment of %s. Total paid to date: %s", "event_espresso"),$total_to_pay,$transaction->remaining());
				$tax_amount = 0;
				array_push($order_items,array(
					// Item Name.  127 char max.
					'l_name' => sprintf(__("Partial payment for registration: %s", 'event_espresso'),$primary_registrant->reg_code()),
					// Item description.  127 char max.
					'l_desc' => $single_item_desc,
					// Cost of individual item.
					'l_amt' => $total_to_pay,
					// Item Number.  127 char max.
					'l_number' => 1,
					// Item quantity.  Must be any positive integer.
					'l_qty' => 1,
				));
		}
		// Populate data arrays with order data.
		$DPFields = array(
			// How you want to obtain payment ?  
			// Authorization indidicates the payment is a basic auth subject to settlement with Auth & Capture.  
			// Sale indicates that this is a final sale for which you are requesting payment.  Default is Sale.
			'paymentaction' => 'Sale',
			// Required.  IP address of the payer's browser.
			'ipaddress' => $_SERVER['REMOTE_ADDR'],
			// Flag to determine whether you want the results returned by FMF.  1 or 0.  Default is 0.
			'returnfmfdetails' => '1'
		);
		$CCDetails = array(
			// Required. Type of credit card.  Visa, MasterCard, Discover, Amex, Maestro, Solo.  
			// If Maestro or Solo, the currency code must be GBP.  In addition, either start date or issue number must be specified.
			'creditcardtype' => $billing_info['credit_card_type'],
			// Required.  Credit card number.  No spaces or punctuation.
			'acct' => $billing_info['credit_card'],
			// Required.  Credit card expiration date.  Format is MMYYYY
			'expdate' => $billing_info['exp_month'].$billing_info['exp_year'],
			// Requirements determined by your PayPal account settings.  Security digits for credit card.
			'cvv2' => $billing_info['cvv'],
		);
		$PayerInfo = array(
			// Email address of payer.
			'email' => $billing_info['email'],
			// Unique PayPal customer ID for payer.
			'payerid' => '',
			// Status of payer.  Values are verified or unverified
			'payerstatus' => '',
			// Payer's business name.
			'business' => ''
		);
		$PayerName = array(
					// Payer's salutation.  20 char max.
					'salutation' => '',
					// Payer's first name.  25 char max.
					'firstname' => substr($billing_info['first_name'],0,25),
					// Payer's middle name.  25 char max.
					'middlename' => '',
					// Payer's last name.  25 char max.
					'lastname' => substr($billing_info['last_name'],0,25),
					// Payer's suffix.  12 char max.
					'suffix' => ''
			);

			$BillingAddress = array(
					// Required.  First street address.
					'street' => $billing_info['address'],
					// Second street address.
					'street2' => $billing_info['address2'],
					// Required.  Name of City.
					'city' => $billing_info['city'],
					// Required. Name of State or Province.
					'state' => substr($billing_info['state'],0,40),
					// Required.  Country code.
					'countrycode' => $billing_info['country'], 
					// Required.  Postal code of payer.
					'zip' => $billing_info['zip'],
					// Phone Number of payer.  20 char max.
					'shiptophonenum' => substr($billing_info['phone'],0,20)
			);
			
			
			$PaymentDetails = array(
					// Required.  Total amount of order, including shipping, handling, and tax.
					'amt' => $this->format_currency($total_to_pay),
					// Required.  Three-letter currency code.  Default is USD.
					'currencycode' => $payment->currency_code(),
					// Required if you include itemized cart details. (L_AMTn, etc.)  Subtotal of items not including S&H, or tax.
					'itemamt' => $this->format_currency($item_amount),//
					// Total shipping costs for the order.  If you specify shippingamt, you must also specify itemamt.
					'shippingamt' => '',
					// Total handling costs for the order.  If you specify handlingamt, you must also specify itemamt.
					'handlingamt' => '',
					// Required if you specify itemized cart tax details. Sum of tax for all items on the order.  Total sales tax.
					'taxamt' => $this->format_currency($tax_amount),
					// Description of the order the customer is purchasing.  127 char max.
					'desc' => $order_description,
					// Free-form field for your own use.  256 char max.
					'custom' => $primary_registrant ? $primary_registrant->ID() : '',
					// Your own invoice or tracking number
					'invnum' => wp_generate_password(12,false),//$transaction->ID(),
					// URL for receiving Instant Payment Notifications.  This overrides what your profile is set to use.
					'notifyurl' => ''
			);
		// Wrap all data arrays into a single, "master" array which will be passed into the class function.
			$PayPalRequestData = array(
					'DPFields' => $DPFields,
					'CCDetails' => $CCDetails,
					'PayerName' => $PayerName,
					'BillingAddress' => $BillingAddress,
					'PaymentDetails' => $PaymentDetails,
					'OrderItems' => $order_items,
			);
			$this->log("PaypalPro Request Data:".print_r($PayPalRequestData,true), $transaction);
			try{
				$PayPalResult = $this->prep_and_curl_request($PayPalRequestData);
				//remove PCI-sensitive data so it doesn't get stored
				unset($PayPalResult['REQUESTDATA']['CREDITCARDTYPE']);
				unset($PayPalResult['REQUESTDATA']['ACCT']);
				unset($PayPalResult['REQUESTDATA']['EXPDATE']);
				unset($PayPalResult['REQUESTDATA']['CVV2']);
				unset($PayPalResult['RAWREQUEST']);
				$this->log("PaypalPro Response Data (cleaned):".print_r($PayPalResult,true),$transaction);
				$message = isset($PayPalResult['L_LONGMESSAGE0']) ? $PayPalResult['L_LONGMESSAGE0'] : $PayPalResult['ACK'];
				if($this->_APICallSuccessful($PayPalResult)){
					$payment->set_status($this->_pay_model->approved_status());
				}else{
					$payment->set_status($this->_pay_model->declined_status());
				}
				$payment->set_amount(isset($PayPalResult['AMT']) ? $PayPalResult['AMT'] : 0);
				$payment->set_gateway_response($message);
				$payment->set_txn_id_chq_nmbr(isset( $PayPalResult['TRANSACTIONID'] )? $PayPalResult['TRANSACTIONID'] : null);
				
				$primary_registration_code = $primary_registrant instanceof EE_Registration ? $primary_registrant->reg_code() : '';
				$payment->set_extra_accntng($primary_registration_code);
				$payment->set_details($PayPalResult);
//				$payment = EE_Payment::new_instance(array(
//								'TXN_ID' => $transaction->ID(),
//								'STS_ID' => $approved ? EEM_Payment::status_id_approved : EEM_Payment::status_id_declined,
//								'PAY_timestamp' => current_time('mysql',false),
//								'PAY_method' => 'CART',
//								'PAY_amount' => isset($PayPalResult['AMT']) ? $PayPalResult['AMT'] : 0,
//								'PAY_gateway' => $this->_gateway_name,
//								'PAY_gateway_response' => $message,
//								'PAY_txn_id_chq_nmbr' => isset( $PayPalResult['TRANSACTIONID'] )? $PayPalResult['TRANSACTIONID'] : null,
//								'PAY_po_number' => NULL,
//								'PAY_extra_accntng' => $primary_registration_code,
//								'PAY_via_admin' => false,
//								'PAY_details' => (array) $PayPalResult));
//				$payment->save();
//				$this->update_transaction_with_payment($transaction, $payment);
//				$return = array('success'=>true);
				return $payment;
			}catch(Exception $e){
				$payment->set_status($this->_pay_model->failed_status());
				$payment->set_gateway_response($e->getMessage());
				return $payment;
			}
	}
	private function prep_and_curl_request($DataArray) {
		// Create empty holders for each portion of the NVP string
		$DPFieldsNVP = '&METHOD=DoDirectPayment&BUTTONSOURCE=AngellEYE_PHP_Class_DDP';
		$CCDetailsNVP = '';
		$PayerInfoNVP = '';
		$PayerNameNVP = '';
		$BillingAddressNVP = '';
		$ShippingAddressNVP = '';
		$PaymentDetailsNVP = '';
		$OrderItemsNVP = '';
		$Secure3DNVP = '';

		// DP Fields
		$DPFields = isset($DataArray['DPFields']) ? $DataArray['DPFields'] : array();
		foreach ($DPFields as $DPFieldsVar => $DPFieldsVal)
			$DPFieldsNVP .= '&' . strtoupper($DPFieldsVar) . '=' . urlencode($DPFieldsVal);

		// CC Details Fields
		$CCDetails = isset($DataArray['CCDetails']) ? $DataArray['CCDetails'] : array();
		foreach ($CCDetails as $CCDetailsVar => $CCDetailsVal)
			$CCDetailsNVP .= '&' . strtoupper($CCDetailsVar) . '=' . urlencode($CCDetailsVal);

		// PayerInfo Type Fields
		$PayerInfo = isset($DataArray['PayerInfo']) ? $DataArray['PayerInfo'] : array();
		foreach ($PayerInfo as $PayerInfoVar => $PayerInfoVal)
			$PayerInfoNVP .= '&' . strtoupper($PayerInfoVar) . '=' . urlencode($PayerInfoVal);

		// Payer Name Fields
		$PayerName = isset($DataArray['PayerName']) ? $DataArray['PayerName'] : array();
		foreach ($PayerName as $PayerNameVar => $PayerNameVal)
			$PayerNameNVP .= '&' . strtoupper($PayerNameVar) . '=' . urlencode($PayerNameVal);

		// Address Fields (Billing)
		$BillingAddress = isset($DataArray['BillingAddress']) ? $DataArray['BillingAddress'] : array();
		foreach ($BillingAddress as $BillingAddressVar => $BillingAddressVal)
			$BillingAddressNVP .= '&' . strtoupper($BillingAddressVar) . '=' . urlencode($BillingAddressVal);

		// Payment Details Type Fields
		$PaymentDetails = isset($DataArray['PaymentDetails']) ? $DataArray['PaymentDetails'] : array();
		foreach ($PaymentDetails as $PaymentDetailsVar => $PaymentDetailsVal)
			$PaymentDetailsNVP .= '&' . strtoupper($PaymentDetailsVar) . '=' . urlencode($PaymentDetailsVal);

		// Payment Details Item Type Fields
		$OrderItems = isset($DataArray['OrderItems']) ? $DataArray['OrderItems'] : array();
		$n = 0;
		foreach ($OrderItems as $OrderItemsVar => $OrderItemsVal) {
			$CurrentItem = $OrderItems[$OrderItemsVar];
			foreach ($CurrentItem as $CurrentItemVar => $CurrentItemVal)
				$OrderItemsNVP .= '&' . strtoupper($CurrentItemVar) . $n . '=' . urlencode($CurrentItemVal);
			$n++;
		}

		// Ship To Address Fields
		$ShippingAddress = isset($DataArray['ShippingAddress']) ? $DataArray['ShippingAddress'] : array();
		foreach ($ShippingAddress as $ShippingAddressVar => $ShippingAddressVal)
			$ShippingAddressNVP .= '&' . strtoupper($ShippingAddressVar) . '=' . urlencode($ShippingAddressVal);

		// 3D Secure Fields
		$Secure3D = isset($DataArray['Secure3D']) ? $DataArray['Secure3D'] : array();
		foreach ($Secure3D as $Secure3DVar => $Secure3DVal)
			$Secure3DNVP .= '&' . strtoupper($Secure3DVar) . '=' . urlencode($Secure3DVal);

		// Now that we have each chunk we need to go ahead and append them all together for our entire NVP string
		$NVPRequest = 'USER=' . $this->_paypal_api_username . '&PWD=' . $this->_paypal_api_password . '&VERSION=64.0' . '&SIGNATURE=' . $this->_paypal_api_signature . $DPFieldsNVP . $CCDetailsNVP . $PayerInfoNVP . $PayerNameNVP . $BillingAddressNVP . $PaymentDetailsNVP . $OrderItemsNVP . $ShippingAddressNVP . $Secure3DNVP;
		$NVPResponse = $this->_CURLRequest($NVPRequest);
		$NVPRequestArray = $this->_NVPToArray($NVPRequest);
		$NVPResponseArray = $this->_NVPToArray($NVPResponse);

		$Errors = $this->_GetErrors($NVPResponseArray);

		$NVPResponseArray['ERRORS'] = $Errors;
		$NVPResponseArray['REQUESTDATA'] = $NVPRequestArray;
		$NVPResponseArray['RAWREQUEST'] = $NVPRequest;
		$NVPResponseArray['RAWRESPONSE'] = $NVPResponse;

		return $NVPResponseArray;
	}

// End function prep_and_curl_request()

	private function _CURLRequest($Request) {
		$EndPointURL = $this->_debug_mode ? 'https://api-3t.sandbox.paypal.com/nvp' : 'https://api-3t.paypal.com/nvp';
		$curl = curl_init();
		curl_setopt($curl, CURLOPT_VERBOSE, 1);
		curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($curl, CURLOPT_TIMEOUT, 60);
		curl_setopt($curl, CURLOPT_URL, $EndPointURL);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($curl, CURLOPT_POSTFIELDS, $Request);

		//execute the curl POST		
		$Response = curl_exec($curl);

		curl_close($curl);

		return $Response;
	}
	private function _NVPToArray($NVPString) {

		// prepare responses into array
		$proArray = array();
		while (strlen($NVPString)) {
			// name
			$keypos = strpos($NVPString, '=');
			$keyval = substr($NVPString, 0, $keypos);
			// value
			$valuepos = strpos($NVPString, '&') ? strpos($NVPString, '&') : strlen($NVPString);
			$valval = substr($NVPString, $keypos + 1, $valuepos - $keypos - 1);
			// decoding the respose
			$proArray[$keyval] = urldecode($valval);
			$NVPString = substr($NVPString, $valuepos + 1, strlen($NVPString));
		}

		return $proArray;
	}

// End function NVPToArray()

	private function _APICallSuccessful($PayPalResult) {
		// check main response message from PayPal
		if (isset($PayPalResult['ACK']) && !empty($PayPalResult['ACK'])) {
			$ack = strtoupper($PayPalResult['ACK']);
			$approved = ( $ack == 'SUCCESS' || $ack == 'SUCCESSWITHWARNING' || $ack == 'PARTIALSUCCESS' ) ? TRUE : FALSE;
		}
		// check if CVV2 code matches
		if (isset($PayPalResult['CVV2MATCH']) && !empty($PayPalResult['CVV2MATCH'])) {
			$cvv2_matches = $PayPalResult['CVV2MATCH'] == 'M' ? TRUE : FALSE;
		}

		return $approved && $cvv2_matches ? TRUE : FALSE;
	}

	private function _GetErrors($DataArray) {

		$Errors = array();
		$n = 0;
		while (isset($DataArray['L_ERRORCODE' . $n . ''])) {
			$LErrorCode = isset($DataArray['L_ERRORCODE' . $n . '']) ? $DataArray['L_ERRORCODE' . $n . ''] : '';
			$LShortMessage = isset($DataArray['L_SHORTMESSAGE' . $n . '']) ? $DataArray['L_SHORTMESSAGE' . $n . ''] : '';
			$LLongMessage = isset($DataArray['L_LONGMESSAGE' . $n . '']) ? $DataArray['L_LONGMESSAGE' . $n . ''] : '';
			$LSeverityCode = isset($DataArray['L_SEVERITYCODE' . $n . '']) ? $DataArray['L_SEVERITYCODE' . $n . ''] : '';

			$CurrentItem = array(
					'L_ERRORCODE' => $LErrorCode,
					'L_SHORTMESSAGE' => $LShortMessage,
					'L_LONGMESSAGE' => $LLongMessage,
					'L_SEVERITYCODE' => $LSeverityCode
			);

			array_push($Errors, $CurrentItem);
			$n++;
		}

		return $Errors;
	}

	/**
	 * 		nothing to see here...  move along....
	 * 		@access protected
	 * 		@return void
	 */
	private function _DisplayErrors($Errors) {
		$error = '';
		foreach ($Errors as $ErrorVar => $ErrorVal) {
			$CurrentError = $Errors[$ErrorVar];
			foreach ($CurrentError as $CurrentErrorVar => $CurrentErrorVal) {
				if ($CurrentErrorVar == 'L_ERRORCODE')
					$CurrentVarName = 'Error Code';
				elseif ($CurrentErrorVar == 'L_SHORTMESSAGE')
					$CurrentVarName = 'Short Message';
				elseif ($CurrentErrorVar == 'L_LONGMESSAGE')
					$CurrentVarName == 'Long Message';
				elseif ($CurrentErrorVar == 'L_SEVERITYCODE')
					$CurrentVarName = 'Severity Code';

				$error .= '<br />' . $CurrentVarName . ': ' . $CurrentErrorVal;
			}
		}
		return $error;
	}
}

// End of file EEG_Paypal_Pro.gateway.php