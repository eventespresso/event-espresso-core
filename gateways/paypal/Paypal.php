<?php

/**
 * Paypal Class
 *
 * Author 		Seth Shoultes
 * @package		Event Espresso PayPal Gateway
 * @category	Library
 */
$paypal_gateway_version = '1.0';

class Paypal extends PaymentGateway {

	/**
	 * Initialize the Paypal gateway
	 *
	 * @param none
	 * @return void
	 */
	public function __construct() {
		parent::__construct();
		// Some default values of the class
		$this->gatewayUrl = 'https://www.paypal.com/cgi-bin/webscr';
		$this->ipnLogFile = 'paypal.ipn_results.log';
		// Populate $fields array with a few default
		$this->addField('rm', '2');		   // Return method = POST
		$this->addField('cmd', '_xclick');
	}

	/**
	 * Enables the test mode
	 *
	 * @param none
	 * @return none
	 */
	public function enableTestMode() {
		$this->testMode = TRUE;
		$this->gatewayUrl = 'https://www.sandbox.paypal.com/cgi-bin/webscr';
	}

	public function logErrors($errors) {
		if (!$this->logIpn)
			return;
		// Timestamp

		$text = '[' . date('m/d/Y g:i A') . '] - ';
		// Success or failure being logged?

		$text .= "Errors from IPN Validation:\n";
		$text .= $errors;

		// Write to log
		$fp = @fopen($this->ipnLogFile, 'a');
		@fwrite($fp, $text . "\n\n");
		@fclose($fp);
	}

	/**
	 * Validate the IPN notification
	 *
	 * @param none
	 * @return boolean
	 */
	public function validateIpn() {
		global $org_options;
		if (!empty($org_options['full_logging']) && $org_options['full_logging'] == 'Y') {
			espresso_log::singleton()->log(array('file' => __FILE__, 'function' => __FUNCTION__, 'status' => ''));
		}
		if (function_exists('curl_init')) {
			//new paypal code//
			// parse the paypal URL
			$urlParsed = parse_url($this->gatewayUrl);

			// generate the post string from the _POST vars
			$req = '';

			$errors = "\nUsing BUILT-IN PHP curl methods\n";
			// Run through the posted array
			foreach ($_POST as $key => $value) {
				$this->ipnData["$key"] = $value;
				$errors .= "key = " . $key . "\nvalue = " . $value . "\n";
				$value = urlencode(stripslashes($value));
				$value = preg_replace('/(.*[^%^0^D])(%0A)(.*)/i', '${1}%0D%0A${3}', $value); // IPN fix
				$req .= $key . '=' . $value . '&';
			}
			$req .= 'cmd=_notify-validate';
			$url = $this->gatewayUrl;
			$ch = curl_init();	// Starts the curl handler
			$error = array();
			$error["set_host"] = curl_setopt($ch, CURLOPT_URL, $url); // Sets the paypal address for curl
			$error["set_fail_on_error"] = curl_setopt($ch, CURLOPT_FAILONERROR, 1);
			$error["set_return_transfer"] = curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); // Returns result to a variable instead of echoing
			$error["set_timeout"] = curl_setopt($ch, CURLOPT_TIMEOUT, 45); // Sets a time limit for curl in seconds (do not set too low)
			$error["set_post"] = curl_setopt($ch, CURLOPT_POST, 1); // Set curl to send data using post
			$error["set_post_fields"] = curl_setopt($ch, CURLOPT_POSTFIELDS, $req); // Add the request parameters to the post
			$errors .= $error["set_host"] ? "Success" : "Failure";
			$errors .= " Setting host: " . $url . "\n";
			$errors .= $error["set_post"] ? "Success" : "Failure";
			$errors .= " Setting request type to post\n";
			$errors .= $error["set_post_fields"] ? "Success" : "Failure";
			$errors .= " Setting post fields: " . htmlspecialchars($req) . "\n";
			$errors .= $error["set_fail_on_error"] ? "Success" : "Failure";
			$errors .= " Setting Fain On Error\n";
			$errors .= $error["set_return_transfer"] ? "Success" : "Failure";
			$errors .= " Setting return transfer\n";
			$errors .= $error["set_timeout"] ? "Success" : "Failure";
			$errors .= " Setting Timeout\n";
			$error["set_verbose"] = curl_setopt($ch, CURLOPT_VERBOSE, 1);
			$errors .= $error["set_verbose"] ? "Success" : "Failure";
			$errors .= " Setting verbose mode\n";
			$result = curl_exec($ch); // run the curl process (and return the result to $result
			$this->ipnResponse = $result;
			$error["result"] = curl_error($ch);
			curl_close($ch);
			$errors .= "Errors resulting from the execution of curl transfer: " . $error["result"];
			$this->logErrors($errors);

			if (strcmp($result, "VERIFIED") == 0) { // It may seem strange but this function returns 0 if the result matches the string So you MUST check it is 0 and not just do strcmp ($result, "VERIFIED") (the if will fail as it will equate the result as false)
				// Do some checks to ensure that the payment has been sent to the correct person
				// Check and ensure currency and amount are correct
				// Check that the transaction has not been processed before
				// Ensure the payment is complete
				// Valid IPN transaction.
				$this->logResults(true);
				return true;
			} else {
				// Log an invalid request to look into
				// Invalid IPN transaction.  Check the log for details.
				$this->lastError = "IPN Validation Failed . $urlParsed[path] : $urlParsed[host]";
				$this->logResults(false);
				return false;
			}
		} else {

			//Old paypal code
			// parse the paypal URL
			$urlParsed = parse_url($this->gatewayUrl);
			// generate the post string from the _POST vars
			$postString = '';
			foreach ($_POST as $key => $value) {
				$this->ipnData["$key"] = $value;
				$value = urlencode(stripslashes($value));
				$value = preg_replace('/(.*[^%^0^D])(%0A)(.*)/i', '${1}%0D%0A${3}', $value); // IPN fix
				$postString .= $key . '=' . $value . '&';
			}
			$postString .="cmd=_notify-validate"; // append ipn command
			// open the connection to paypal
			$fp = fsockopen($urlParsed[host], "80", $errNum, $errStr, 30);
			if (!$fp) {
				// Could not open the connection, log error if enabled
				$this->lastError = "fsockopen error no. $errNum: $errStr";
				$this->logResults(false);
				return false;
			} else {
				// Post the data back to paypal
				fputs($fp, "POST $urlParsed[path] HTTP/1.1\r\n");
				fputs($fp, "Host: $urlParsed[host]\r\n");
				fputs($fp, "Content-type: application/x-www-form-urlencoded\r\n");
				fputs($fp, "Content-length: " . strlen($postString) . "\r\n");
				fputs($fp, "Connection: close\r\n\r\n");
				fputs($fp, $postString . "\r\n\r\n");
				// loop through the response from the server and append to variable
				while (!feof($fp)) {
					$this->ipnResponse .= fgets($fp, 1024);
				}
				fclose($fp); // close connection
			}
			if (eregi("VERIFIED", $this->ipnResponse)) {
				// Valid IPN transaction.
				$this->logResults(true);
				return true;
			} else {
				// Invalid IPN transaction.  Check the log for details.
				$this->lastError = "IPN Validation Failed . $urlParsed[path] : $urlParsed[host]";
				$this->logResults(false);
				return false;
			}
		}
	}

}