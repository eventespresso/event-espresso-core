<?php

/**
 * Authorize.net Class
 *
 * Author 		Seth Shoultes
 * @package		Event Espresso Authorize.net SIM Gateway
 * @category	Library
 */
require_once( EVENT_ESPRESSO_PLUGINFULLPATH . 'gateways/PaymentGateway.php' );

class EE_Authorize extends PaymentGateway {

	/**
	 * Login ID of authorize.net account
	 *
	 * @var string
	 */
	public $login;

	/**
	 * Secret key from authorize.net account
	 *
	 * @var string
	 */
	public $secret;
	/*
	 * Initialize the Authorize.net gateway
	 *
	 * @param none
	 * @return void
	 */

	public function __construct() {
		parent::__construct();
		// Some default values of the class
		$this->gatewayUrl = 'https://secure.authorize.net/gateway/transact.dll';
		$this->ipnLogFile = 'authorize.ipn_results.log';
		// Populate $fields array with a few default
		$this->addField('x_Version', '3.0');
		$this->addField('x_Show_Form', 'PAYMENT_FORM');
		$this->addField('x_Relay_Response', 'TRUE');
	}

	public function useTestServer() {
		$this->testMode = TRUE;
		$this->gatewayUrl = 'https://test.authorize.net/gateway/transact.dll';
	}

	/**
	 * Enables the test mode
	 *
	 * @param none
	 * @return none
	 */
	public function enableTestMode() {
		$this->testMode = TRUE;
		$this->addField('x_Test_Request', 'TRUE');
	}

	/**
	 * Set login and secret key
	 *
	 * @param string user login
	 * @param string secret key
	 * @return void
	 */
	public function setUserInfo($login, $key) {
		$this->login = $login;
		$this->secret = $key;
	}

	/**
	 * Prepare a few payment information
	 *
	 * @param none
	 * @return void
	 */
	public function prepareSubmit() {
		$this->addField('x_Login', $this->login);
		$this->addField('x_fp_sequence', $this->fields['x_Invoice_num']);
		$this->addField('x_fp_timestamp', time());
		$data = $this->fields['x_Login'] . '^' .
				$this->fields['x_Invoice_num'] . '^' .
				$this->fields['x_fp_timestamp'] . '^' .
				$this->fields['x_Amount'] . '^';
		$this->addField('x_fp_hash', $this->hmac($this->secret, $data));
	}

	/**
	 * Validate the IPN notification
	 *
	 * @param none
	 * @return boolean
	 */
	public function validateIpn() {
		foreach ($_POST as $field => $value) {
			$this->ipnData["$field"] = $value;
		}
		$invoice = intval($this->ipnData['x_invoice_num']);
		$pnref = $this->ipnData['x_trans_id'];
		$amount = doubleval($this->ipnData['x_amount']);
		$result = intval($this->ipnData['x_response_code']);
		$respmsg = $this->ipnData['x_response_reason_text'];
		$md5source = $this->secret . $this->login . $this->ipnData['x_trans_id'] . $this->ipnData['x_amount'];
		$md5 = md5($md5source);
		if ($result == '1') {
			// Valid IPN transaction.
			$this->logResults(true);
			return true;
		} else if ($result != '1') {
			$this->lastError = $respmsg;
			$this->logResults(false);
			return false;
		} else if (strtoupper($md5) != $this->ipnData['x_MD5_Hash']) {
			$this->lastError = 'MD5 mismatch';
			$this->logResults(false);
			return false;
		}
	}

	/**
	 * RFC 2104 HMAC implementation for php.
	 *
	 * @author Lance Rushing
	 * @param string key
	 * @param string date
	 * @return string encoded hash
	 */
	private function hmac($key, $data) {
		$b = 64; // byte length for md5
		if (strlen($key) > $b) {
			$key = pack("H*", md5($key));
		}
		$key = str_pad($key, $b, chr(0x00));
		$ipad = str_pad('', $b, chr(0x36));
		$opad = str_pad('', $b, chr(0x5c));
		$k_ipad = $key ^ $ipad;
		$k_opad = $key ^ $opad;
		return md5($k_opad . pack("H*", md5($k_ipad . $data)));
	}

	/**
		 * Submit Payment Request (redirect)
		 *
		 * Generates a form with hidden elements from the fields array
		 * and submits it to the payment gateway URL. The user is presented
		 * a redirecting message along with a button to click.
		 *
		 * @param string value of buttn text
		 * @return void
		 */
		public function submitPayment() {
			$this->prepareSubmit();
			$pre_form = "<html>\n";
			$pre_form .= "<head><title>Processing Payment...</title></head>\n";
			$pre_form .= "<body>\n";
			$form = "<h2 style=\"margin:2em auto; line-height:2em; text-align:center;\">Please wait...<br/>your order is being processed and you will be redirected to the payment website.</h2>";
			$form .= "<form method=\"POST\" name=\"gateway_form\" ";
			$form .= "action=\"" . $this->gatewayUrl . "\">\n";
			foreach ($this->fields as $name => $value) {
				if ($name == 'x_line_item') {
					foreach ($value as $line_item) {
						$form .= "<input type=\"hidden\" name=\"x_line_item\" value=\"$line_item\"/>\n";
					}
				} else {
					$form .= "<input type=\"hidden\" name=\"$name\" value=\"$value\"/>\n";
				}
			}
			$form .= "<p style=\"text-align:center;\"><br/>If you are not automatically redirected to ";
			$form .= "the payment website within 10 seconds...<br/><br/>\n";
			$form .= "<input type=\"submit\" value=\"Click Here\"></p>\n";
			$form .= "</form>\n";
			$post_form = "</body></html>\n";
			return array('pre-form' => $pre_form, 'form' => $form, 'post-form' => $post_form);
			
		}
}