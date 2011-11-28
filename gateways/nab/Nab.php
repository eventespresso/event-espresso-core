<?php

/**
 * nab Class
 *
 * Author 		Seth Shoultes
 * @package		Event Espresso nab Gateway
 * @category	Library
 */
$nab_gateway_version = '1.0';

class nab extends PaymentGateway {

	/**
	 * Initialize the nab gateway
	 *
	 * @param none
	 * @return void
	 */
	public function __construct() {
		parent::__construct();
		$this->gatewayUrl = 'https://transact.nab.com.au/live/directpost/genfingerprint
';
	}

	public function enableTestMode() {
		$this->testMode = TRUE;
		$this->gatewayUrl = 'https://transact.nab.com.au/test/directpost/genfingerprint';
	}

	public function prepareSubmit() {
		$req = "";
		foreach ($this->fields as $name => $value) {
			$req .= $name . '=' . $value . '&';
		}
		$req = rtrim($req, "&");
		$spacereplace = str_replace(" ", "%20", $req);

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $this->gatewayUrl);
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $req);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_HEADER, 1);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);

		$response = curl_exec($ch);
		$response = explode("\n", $response);
		return $response[8];
	}

	public function submitButton($button_url, $gateway) {
		$this->prepareSubmit();
		echo '<form method="get" name="payment_form" action="' . $this->gatewayUrl[0] . '">';
		echo '<td><input type="hidden" value="' . $this->gatewayUrl[1] . '" name="value"></td>';
		echo '<td><input class="espresso_payment_button" type="image" alt="Pay using nab" src="' . $button_url . '" /></td>';
		echo '</form>';
	}

	/**
	 * Validate the IPN notification
	 *
	 * @param none
	 * @return boolean
	 */
	public function validateIpn() {

		if (function_exists('curl_init')) {
			$urlParsed = parse_url($this->gatewayUrl);
			$req = '';
			foreach ($_POST as $key => $value) {
				$this->ipnData["$key"] = $value;
				$value = urlencode(stripslashes($value));
				$value = preg_replace('/(.*[^%^0^D])(%0A)(.*)/i', '${1}%0D%0A${3}', $value); // IPN fix
				$req .= $key . '=' . $value . '&';
			}
			$req .= 'cmd=_notify-validate';
			$url = $this->gatewayUrl;
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $url);
			curl_setopt($ch, CURLOPT_FAILONERROR, 1);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); // Returns result to a variable instead of echoing
			curl_setopt($ch, CURLOPT_TIMEOUT, 3); // Sets a time limit for curl in seconds (do not set too low)
			curl_setopt($ch, CURLOPT_POST, 1); // Set curl to send data using post
			curl_setopt($ch, CURLOPT_POSTFIELDS, $req); // Add the request parameters to the post
			$result = curl_exec($ch); // run the curl process (and return the result to $result
			curl_close($ch);

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
			$urlParsed = parse_url($this->gatewayUrl);
			$postString = '';
			foreach ($_POST as $field => $value) {
				$this->ipnData["$key"] = $value;
				$value = urlencode(stripslashes($value));
				$value = preg_replace('/(.*[^%^0^D])(%0A)(.*)/i', '${1}%0D%0A${3}', $value); // IPN fix
				$req .= $key . '=' . $value . '&';
			}
			$postString .="cmd=_notify-validate"; // append ipn command
			$fp = fsockopen($urlParsed[host], "80", $errNum, $errStr, 30);
			if (!$fp) {
				$this->lastError = "fsockopen error no. $errNum: $errStr";
				$this->logResults(false);
				return false;
			} else {
				fputs($fp, "POST $urlParsed[path] HTTP/1.1\r\n");
				fputs($fp, "Host: $urlParsed[host]\r\n");
				fputs($fp, "Content-type: application/x-www-form-urlencoded\r\n");
				fputs($fp, "Content-length: " . strlen($postString) . "\r\n");
				fputs($fp, "Connection: close\r\n\r\n");
				fputs($fp, $postString . "\r\n\r\n");
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
				$this->lastError = "IPN Validation Failed . $urlParsed[path] : $urlParsed[host]";
				$this->logResults(false);
				return false;
			}
		}
	}

}