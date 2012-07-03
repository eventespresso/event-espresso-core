<?php

class espresso_Fdggutil {

	private $storename; // Replace with your Storenumber here
	private $sharedSecret; //Replace with your Shared Secret here
	private $timezone;
	private $dateTime;
	private $chargetotal;
	private $gatewayUrl;
	private $returnUrl;
	private $cancelUrl;

	public function espresso_Fdggutil($storename, $sharedSecret) {
		$this->storename = $storename;
		$this->sharedSecret = $sharedSecret;
	}

	public function set_timezone($timezone) {
		$this->timezone = $timezone;
	}

	public function set_dateTime($EE_Session) {
		$this->dateTime = date("Y:m:d-H:i:s");
		$session_data = $EE_Session->get_session_data();
		$session_data['gateway_data']['transaction_dateTime'] = $this->dateTime;
		$EE_Session->set_session_data($session_data['gateway_data'], 'gateway_data');
	}

	public function set_chargetotal($chargetotal) {
		$this->chargetotal = $chargetotal;
	}

	public function set_sandbox($sandbox) {
		if($sandbox) {
			$this->gatewayUrl = "https://connect.merchanttest.firstdataglobalgateway.com/IPGConnect/gateway/processing";
		} else {
			$this->gatewayUrl = "https://connect.firstdataglobalgateway.com/IPGConnect/gateway/processing";
		}
	}

	public function set_returnUrl($returnUrl) {
		$this->returnUrl = $returnUrl;
	}

	public function set_cancelUrl($cancelUrl) {
		$this->cancelUrl = $cancelUrl;
	}

	private function createHash() {
		$str = $this->storename . $this->dateTime . $this->chargetotal . $this->sharedSecret;
		$hex_str = '';
		for ($i = 0; $i < strlen($str); $i++) {
			$hex_str.=dechex(ord($str[$i]));
		}
		return hash('sha256', $hex_str);
	}

	public function check_return_hash($payment_date) {
		$currency = '840';
		$str = $this->sharedSecret . $_REQUEST['approval_code'] . $_REQUEST['chargetotal'] . $currency . $payment_date . $this->storename;
		$hex_str = '';
		for ($i = 0; $i < strlen($str); $i++) {
			$hex_str.=dechex(ord($str[$i]));
		}
		return hash('sha256', $hex_str);
	}

	private function submitForm($EE_Session) {
		global $org_options;
		$session_data = $EE_Session->get_session_data();
		$out = '<input type="hidden" name="timezone" value="' . $this->timezone . '" />';
		$out .= '<input type="hidden" name="authenticateTransaction" value="false" />';
		$out .= '<input size="50" type="hidden" name="txntype" value="sale"/>';
		$out .= '<input size="50" type="hidden" name="txndatetime" value="' . $this->dateTime .'" />';
		$out .= '<input size="50" type="hidden" name="hash" value="' . $this->createHash() . '" />';
		$out .= '<input size="50" type="hidden" name="mode" value="payonly"/>';
		$out .= '<input size="50" type="hidden" name="storename" value="' . $this->storename . '"/>';
		$out .= '<input size="50" type="hidden" name="chargetotal" value="' . $this->chargetotal . '"/>';
		$out .= '<input size="50" type="hidden" name="subtotal" value="' . $this->chargetotal . '"/>';
		$out .= '<input size="50" type="hidden" name="trxOrigin" value="ECI"/>';
		$out .= '<input size="50" type="hidden" name="responseSuccessURL" value="' . home_url() . '/?page_id=' . $org_options['return_url'] . '&session_id=' . $session_data['id'] . '&attendee_action=post_payment&form_action=payment"/>';
		$out .= '<input size="50" type="hidden" name="responseFailURL" value="' . str_replace("&", "%26", home_url() . '/?page_id=' . $org_options['cancel_return']) . '"/>';
		return $out;
	}

	public function submitButton($button_url) {
		$out = '<form  method="post" name="payment_form" action="' . $this->gatewayUrl . '">';
		$out .= $this->submitForm();
		$out .= '<input class="espresso_payment_button_firstdata_connect_2" type="image" ';
		$out .= 'alt="Pay using firstdata_connect_2" src="' . $button_url . '" />';
	$out .= '</form>';
		return $out;
	}

	public function submitPayment($EE_Session) {
		$pre_form = "<html>\n";
		$pre_form .= "<head><title>Processing Payment...</title></head>";
		$pre_form .= "<body>";
		$form = "<h2>Please wait, your order is being processed and you";
		$form .= " will be redirected to the payment website.</h2></p>";
		$form .= '<form method="post" name="gateway_form" action="' . $this->gatewayUrl . '">';
		$form .= $this->submitForm($EE_Session);
		$form .= "<p style=\"text-align:center;\"><br/><br/>If you are not automatically redirected to ";
		$form .= "the payment website within 5 seconds...<br/><br/>";
		$form .= "<input type=\"submit\" value=\"Click Here\"></p>";
		$form .= "</form>";
		$post_form = "</body></html>";
		return array('pre-form' => $pre_form, 'form' => $form, 'post-form' => $post_form);
	}
}