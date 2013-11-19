<?php
/**
 * Mwarrior Class
 *
 * @author 		Rajinesh Ravendran (rajinesh@merchantwarrior.com)
 * @package		Event Espresso Merchant Warrior Gateway
 * @category	Library
 */
$mwarrior_gateway_version = '1.0';

class Mwarrior extends PaymentGateway{
	
	/**
	 * Initialize the Merchant Warrior gateway
	 *
	 * @param none
	 * @return void
	 */
	public function __construct()
	{
		parent::__construct();		
		// Some default values of the class
		$this->gatewayUrl = 'https://secure.merchantwarrior.com';
		$this->gatewayUrlQuery = 'https://api.merchantwarrior.com/post/';
		$this->ipnLogFile = 'mwarrior.ipn_results.log';
	}
	
	/**
	 * Enables the test mode
	 *
	 * @param none
	 * @return none
	 */
	public function enableTestMode()
	{
		$this->testMode = TRUE;
		$this->gatewayUrl = 'https://securetest.merchantwarrior.com';
		$this->gatewayUrlQuery = 'https://base.merchantwarrior.com/post/';
	}
	
	/**
	 * Set merchant id and passphrase
	 *
	 * @param string merchantID
	 * @param string passphrase
	 * @return void
	 */
	public function setMerchantInfo($merchantID, $apikey, $passphrase)
	{
		$this->merchantID = $merchantID;
		$this->apikey = $apikey;
		$this->passphrase = $passphrase;
	}
	
	/**
	 * Validate the IPN notification
	 *
	 * @param none
	 * @return boolean
	 */
	public function validateIpn()
	{
		if (empty($_POST))
		{
			// Redirect
			if(!empty($_REQUEST))
			{
				$this->response['status'] = (isset($_REQUEST['status']))? $_REQUEST['status'] : "N/A";
				$this->response['responseData']['transactionID'] = (isset($_REQUEST['reference'])) ? $_REQUEST['reference'] : "N/A" ;
				$this->response['responseData']['responseMessage'] = (isset($_REQUEST['error'])) ? $_REQUEST['error'] : "N/A";
				$this->response['responseData']['hash'] = (isset($_REQUEST['hash'])) ? $_REQUEST['hash'] : "N/A";
			}
			$xml = "n/a";
		}
		else
		{
			// Get XML POST notification
			$xml = file_get_contents('php://input', NULL, NULL, 0, 1024); 
			$this->response = $this->_parseResponse($xml);
			$this->response['status'] = ($this->response['status'] == true) ? "approved" : "declined";
		}

		$this->response['attendee_id'] = (isset($_REQUEST['id']))? $_REQUEST['id'] : 0;
		$this->response['reg_id'] = espresso_registration_id($this->response['attendee_id']);
		
		if (isset($xml) && isset($this->response['status']) && $this->_calculateHash($this->response, 'redirect') == $this->response['responseData']['hash'])
		{
		 	// Valid IPN transaction.
		 	$this->logResults(true);
		 	return true;
		}
		else
		{
		 	$this->lastError = isset($this->response['error']) ?  $this->response['error'] : $this->response['responseData']['responseMessage'];
			$this->logResults(false);
			return false;
		}
	}
	
	/**
	 * Method that parses response from Merchant Warrior
	 *
	 * @param string $result (XML)
	 * @return array
	 */
	public function _parseResponse($result) 
	{
		// Check for any result at all
		if ($result === false) 
		{
			return array('status' => false, 'error' => "Could not successfully communicate with Payment Processor.  Check the URL.", 'result' => $result);
		}
		
		// Parse the XML
		$xml = simplexml_load_string($result);
		// Convert the result from a SimpleXMLObject into an array
		$xml = (array) $xml;

		// Check for a valid response code
		if (!isset($xml['responseCode']) || strlen($xml['responseCode']) < 1) 
		{
			return array('status' => false, 'error' => "Payment Processor did not return a valid response.", 'result' => $result, 'responseData' => $xml);
		}

		// Validate the response - the only successful code is 0
		$status = ((int) $xml['responseCode'] === 0) ? true : false;

		// Set an error message if the transaction failed
		if ($status === false) 
		{
			return array('status' => false, 'error' => "Transaction Declined: {$xml['responseMessage']}.", 'result' => $result, 'responseData' => $xml);
		}

		// Make the response a little more useable - there are a few fields that may or may not be present
		// depending on the different transaction types, so this handles them all generically.
		$response = array ( 'status' => $status,
							'result' => $result,
							'responseData' => $xml,
							'transactionID' => (isset($xml['transactionID']) ? $xml['transactionID'] : null),
							'authCode' => (isset($xml['authCode']) ? $xml['authCode'] : null));

		return $response;
	}

	/**
	 * Calculate verification hash for Merchant Warrior POST API
	 *
	 * @param array $postData
	 * @param string $type
	 * @return string
	 */
	public function _calculateHash(array $postData = array(), $type = '') 
	{
		if ($type == "redirect") // 302 Redirect
		{
			// Generate & return the hash
			return md5(strtolower($this->passphrase . $this->_getHashSalt($this->response['reg_id']) . $this->merchantID . $postData['status'] . $postData['responseData']['transactionID']));
		}
		elseif ($type == "transaction") 
		{
			// Generate & return the hash
			return md5(strtolower($this->passphrase . $this->merchantID . $postData['transactionAmount'] . $postData['transactionCurrency']));
		}
		elseif ($type == "query") 
		{
			// Generate & return the hash
			return md5(strtolower($this->passphrase . $this->merchantID . $postData['transactionID']));
		}
		elseif ($type == "url")
		{
			// Check the amount param
			if (!isset($postData['returnURL']) || !strlen($postData['returnURL'])) {
				throw new Exception("Missing or blank return URL field in post array.");
			}

			// Check the currency param
			if (!isset($postData['notifyURL']) || !strlen($postData['notifyURL'])) {
				throw new Exception("Missing or blank notify URL field in post array.");
			}

			// Generate & return the hash
			return md5(strtolower($this->passphrase . $this->merchantID . $postData['returnURL'] . $postData['notifyURL']));
		
		}
	}
	
	/**
	 * Helper function which returns a random alphanumeric string
	 * which can be used as the hash salt.
	 *
	 * @param int $length
	 * @return string
	 */
	public function _generateHashSalt($length = 16)
	{
		$str = "";
		$chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		
		for($i=0;$i<$length;$i++)
		{
			$str .= substr(str_shuffle($chars), 0, 1);
		}
		
		return $str;
	}
	
	/**
	 * Helper function which returns the random alphanumeric string
	 * which was be used to generate the hash salt from the db.
	 *
	 * @param string $reg_id
	 * @return string
	 */
	public function _getHashSalt($reg_id = '')
	{
		global $wpdb;
		$s = $wpdb->get_row("SELECT hashSalt FROM " . EVENTS_ATTENDEE_TABLE . " WHERE registration_id ='$reg_id' ORDER BY id LIMIT 1 ");

		return $s->hashSalt;
	}
	
	/**
	 * Helper function which temporarily stores the salt in the db
	 *
	 * @param string $salt
	 * @param string $reg_id
	 * @return
	 */
	public function _storeHashSalt($salt='', $reg_id = '')
	{
		global $wpdb;	
		$sql="UPDATE ". EVENTS_ATTENDEE_TABLE . " SET hashSalt = '$salt' WHERE registration_id ='$reg_id' ";
		$result = $wpdb->query($sql);		
		
		return $result;
	}
	
	/**
	 * Helper function which returns the transaction amount
	 *
	 * @param 
	 * @return string
	 */
	public function _getAmount($reg_id = '')
	{
		global $wpdb;
		
		/*
		$reg_id = (isset($reg_id)) ? $reg_id : $this->response['reg_id'];
		$s = $wpdb->get_row("SELECT attendee_session FROM " . EVENTS_ATTENDEE_TABLE . " WHERE registration_id='$reg_id' ORDER BY id LIMIT 1 ");
		$old_session_id = $s->attendee_session;
		$s = $wpdb->get_row("SELECT sum(amount_pd) as total FROM " . EVENTS_ATTENDEE_TABLE . " WHERE attendee_session = '$old_session_id'");
		*/
		
		$reg_id = (isset($reg_id) && strlen($reg_id) > 0) ? $reg_id : $this->response['reg_id'];
		$s = $wpdb->get_row("SELECT amount_pd as total FROM " . EVENTS_ATTENDEE_TABLE . " WHERE registration_id='$reg_id' ORDER BY id LIMIT 1 ");
	
		return $s->total;
	}
	
	/**
	 * Calls the MW queryCard method.
	 *
	 * @param string $transactionID
	 * @return array
	 */
	public function queryCard($transactionID) 
	{
		$url = $this->gatewayUrlQuery;
		
		// Setup all of the core, non-optional fields
		$data = array('method'				=> 'queryCard',
					  'merchantUUID'		=> $this->merchantID,
					  'apiKey'				=> $this->apikey,
					  'transactionID'		=> $transactionID);
		
		// Create the hash
		$data['hash'] = $this->_calculateHash($data, 'query');
		
		$result = $this->_doCurl($url, $data);
		
		$resp = $this->_parseResponse($result['data']);
		
		return $resp['responseData'];
	}

	/**
	 * Send request to Merchant Warrior via CURL
	 *
	 * @param string $url
	 * @param array $data
	 * @param array $options
	 * @return string
	 */
	public function _doCurl($url = null, $data = array(), array $options = array()) 
	{
		if (function_exists("curl_init") == true)
		{
			$result = array();

			// Default CURL options (these can be overwritten via $options)
			$baseOptions = array(CURLOPT_HEADER => false,
				CURLOPT_RETURNTRANSFER => true,
				CURLOPT_SSL_VERIFYPEER => false,
				CURLOPT_FORBID_REUSE => true,
				CURLOPT_FRESH_CONNECT => true,
				CURLOPT_TIMEOUT => 60,
				CURLOPT_CONNECTTIMEOUT => 30,
				CURLOPT_POST => true);

			if (!isset($url) || strlen($url) < 1) {
				return false;
			}

			// Instante a cURL object
			$curlHandle = curl_init($url);

			// Note - do NOT just pass an array to POSTFIELDS - that will make the form
			// get sent as multipart/form-data instead of application/x-www-form-urlencoded
			$options[CURLOPT_POSTFIELDS] = is_array($data) ? http_build_query($data, '', '&') : $data;

			// Assign any options passed into the function
			// This will overwrite any defaults if the setting
			// has been passed in - yes, just like array_merge
			foreach ($options AS $key => $value) {
				$baseOptions[$key] = $value;
			}

			// Assign the options to the curl object
			foreach ($baseOptions AS $optKey => $optVal) {
				curl_setopt($curlHandle, $optKey, $optVal);
			}

			// Execute the request
			$result['data'] = curl_exec($curlHandle);

			// Fetch a bunch of useful data - just in case
			$result['code'] = curl_getinfo($curlHandle, CURLINFO_HTTP_CODE);
			$result['info'] = curl_getinfo($curlHandle);
			$result['err'] = curl_error($curlHandle);
			$result['errno'] = curl_errno($curlHandle);

			// Cleanup after ourselves and close the connection
			curl_close($curlHandle);

			return $result;
		}
	}
	
}