<?php

class ClsPaytrace {

	function send_paytrace_api_request($param_list) {
		$result = array();

		$header = array("MIME-Version: 1.0", "Content-type: application/x-www-form-urlencoded", "Contenttransfer-encoding: text");
		//point the cUrl to PayTrace's servers
		$url = "https://paytrace.com/api/default.pay";

		$ch = curl_init();
		// set URL and other appropriate options
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_VERBOSE, 1);
		#curl_setopt ($ch, CURLOPT_PROXYTYPE, CURLPROXY_HTTP);
		//Depending on your PHP Host, you may need to specify their proxy server
		#curl_setopt ($ch, CURLOPT_PROXY, $_POST["PROXY"]);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
		//http://64.202.165.130:3128
		//The proxy information above is for GoDaddy.com

		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $param_list);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_TIMEOUT, 45);

		// grab URL and pass it to the browser
		$response = curl_exec($ch);

		// close curl resource, and free up system resources
		curl_close($ch);
		$response_array = explode('|', $response);
		foreach ($response_array as $pair) {
			$tmp = explode('~', $pair);
			if (count($tmp) > 1) {
				$result[$tmp[0]] = $tmp[1];
			}
		}

		return $result;
	}

	function do_transaction($amount, $discount, $line_item, $cc, $csc, $exp_month, $exp_year, $csc, $bname="", $baddress="", $bcity="", $bstate="", $bzip="", $email="") {
		global $espresso_wp_user;
		$payment_settings = get_option('payment_data_' . $espresso_wp_user);
		$paytrace_settings = $payment_settings['paytrace'];

		$UN = $paytrace_settings['paytrace_user_id'];
		$Pass = $paytrace_settings['paytrace_user_pass'];
		$result = array();

		$result['status'] = -1;
		$result['msg'] = "Unknown error";
		//format the parameter string to process a transaction through PayTrace
		$param_list = "parmlist=";
		$params = "UN~{$UN}|PSWD~{$Pass}|TERMS~Y|";
		$params .= "METHOD~ProcessTranx|TRANXTYPE~Sale|";
		$params .= "CC~{$cc}|EXPMNTH~{$exp_month}|EXPYR~{$exp_year}|";
		$params .= "AMOUNT~{$amount}|CSC~{$csc}|DISCOUNT~{$discount}|";
		$params .= "BNAME~{$bname}|BADDRESS~{$baddress}|BCITY~{$bcity}|BSTATE~{$bstate}|BZIP~{$bzip}|";
		if (strlen($cc) == 16 && ( substr($cc, 0, 1) == 5 || substr($cc, 0, 1) == 4 )) {
			$params .= $line_item;
		}
		$param_list = $param_list . urlencode($params);
		#4012881888818888

		$transaction_data = $this->send_paytrace_api_request($param_list);
		$result['transaction_data'] = $transaction_data;

		if (isset($transaction_data['APPCODE']) && strlen(trim($transaction_data['APPCODE'])) > 0) {
			$transaction_id = $transaction_data['TRANSACTIONID'];
			$transaction_code = $transaction_data['APPCODE'];

			$result['status'] = 1;
			$result['msg'] = "Transaction was completed successfully [Transaction ID# " . $transaction_id . "]";


			if (isset($email) && strlen(trim($email)) > 0) {
				$param_list = "parmlist=";

				$params = "UN~{$UN}|PSWD~{$Pass}|TERMS~Y|METHOD~EmailReceipt|";
				$params .= "TRANXID~" . $transaction_id . "|EMAIL~{$email}|";

				$param_list = $param_list . urlencode($params);
				$email_receipt_data = $this->send_paytrace_api_request($param_list);
				if (isset($email_receipt_data['ERROR'])) {
					$result['error_msg'] = "Failed to send email receipt. ERROR: " . $email_receipt_data['ERROR'];
				}
			}
		} elseif (isset($transaction_data['ERROR'])) {
			$result['error_msg'] = $transaction_data['ERROR'];
		} else {
			$result['error_msg'] = $transaction_data['APPMSG'];
		}
		return $result;
	}

	#echo "<pre>";
	#print_r(do_transaction());
}