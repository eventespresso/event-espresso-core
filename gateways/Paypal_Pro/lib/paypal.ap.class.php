<?php
class PayPalAdaptivePayments
{
	var $APIUsername = '';
	var $APIPassword = '';
	var $APISignature = '';
	var $APISubject = '';
	var $APIVersion = '';
	var $APIMode = '';
	var $EndPointURL = '';
	var $XMLNamespace = '';
	var $Sandbox = '';
	var $BetaSandbox = '';
	var $PathToCertKeyPEM = '';
	var $SSL = '';
	var $ApplicationID = '';
	var $DeviceID = '';
	var $IPAddress = '';
	var $DetailLevel = '';
	var $ErrorLanguage = '';
	
	function PayPalAdaptivePayments($DataArray)
	{
		
		if(isset($DataArray['Sandbox']))
			$this -> Sandbox = $DataArray['Sandbox'];
		elseif(isset($DataArray['BetaSandbox']))
			$this -> Sandbox = $DataArray['BetaSandbox'];
		else
			$this -> Sandbox = true;
			
		$this -> Sandbox = isset($DataArray['Sandbox']) || isset($DataArray['BetaSandbox']) ? $DataArray['Sandbox'] : true;
		$this -> BetaSandbox = isset($DataArray['BetaSandbox']) ? $DataArray['BetaSandbox'] : false;
		$this -> APIVersion = isset($DataArray['APIVersion']) ? $DataArray['APIVersion'] : '64.0';
		$this -> APIMode = isset($DataArray['APIMode']) ? $DataArray['APIMode'] : 'Signature';
		$this -> APIButtonSource = isset($DataArray['ButtonSource']) ? $DataArray['ButtonSource'] : 'AngellEYE_PaymentsPro_PHP_Class';
		$this -> PathToCertKeyPEM = '/path/to/cert/pem.txt';
		$this -> SSL = $_SERVER['SERVER_PORT'] == '443' ? true : false;
		$this -> XMLNamespace = 'http://svcs.paypal.com/types/ap';
		$this -> DeviceID = isset($DataArray['DeviceID']) ? $DataArray['DeviceID'] : '';
		$this -> IPAddress = isset($DataArray['IPAddress']) ? $DataArray['IPAddress'] : $_SERVER['REMOTE_ADDR'];
		$this -> DetailLevel = isset($DataArray['DetailLevel']) ? $DataArray['DetailLevel'] : 'ReturnAll';
		$this -> ErrorLanguage = isset($DataArray['ErrorLanguage']) ? $DataArray['ErrorLanguage'] : 'en_US';
		$this -> APISubject = isset($DataArray['APISubject']) ? $DataArray['APISubject'] : '';
		
		if($this -> Sandbox)
		{	
			// Sandbox Credentials
			$this -> ApplicationID = isset($DataArray['ApplicationID']) ? $DataArray['ApplicationID'] : 'APP-80W284485P519543T';
			$this -> APIUsername = isset($DataArray['APIUsername']) && $DataArray['APIUsername'] != '' ? $DataArray['APIUsername'] : '';
			$this -> APIPassword = isset($DataArray['APIPassword']) && $DataArray['APIPassword'] != '' ? $DataArray['APIPassword'] : '';
			$this -> APISignature = isset($DataArray['APISignature']) && $DataArray['APISignature'] != '' ? $DataArray['APISignature'] : '';
			$this -> EndPointURL = isset($DataArray['EndPointURL']) && $DataArray['EndPointURL'] != '' ? $DataArray['EndPointURL'] : 'https://svcs.sandbox.paypal.com/';
		}
		elseif($this -> BetaSandbox)
		{
			// Beta Sandbox Credentials
			$this -> ApplicationID = isset($DataArray['ApplicationID']) ? $DataArray['ApplicationID'] : 'APP-80W284485P519543T';
			$this -> APIUsername = isset($DataArray['APIUsername']) && $DataArray['APIUsername'] != '' ? $DataArray['APIUsername'] : '';
			$this -> APIPassword = isset($DataArray['APIPassword']) && $DataArray['APIPassword'] != '' ? $DataArray['APIPassword'] : '';
			$this -> APISignature = isset($DataArray['APISignature']) && $DataArray['APISignature'] != '' ? $DataArray['APISignature'] : '';
			$this -> EndPointURL = isset($DataArray['EndPointURL']) && $DataArray['EndPointURL'] != '' ? $DataArray['EndPointURL'] : 'https://svcs.beta-sandbox.paypal.com/';
		}
		else
		{
			// Live Credentials
			$this -> ApplicationID = isset($DataArray['ApplicationID']) ? $DataArray['ApplicationID'] : 'YOUR_APP_ID';
			$this -> APIUsername = isset($DataArray['APIUsername']) && $DataArray['APIUsername'] != '' ? $DataArray['APIUsername'] : '';
			$this -> APIPassword = isset($DataArray['APIPassword']) && $DataArray['APIPassword'] != ''  ? $DataArray['APIPassword'] : '';
			$this -> APISignature = isset($DataArray['APISignature']) && $DataArray['APISignature'] != ''  ? $DataArray['APISignature'] : '';
			$this -> EndPointURL = isset($DataArray['EndPointURL']) && $DataArray['EndPointURL'] != ''  ? $DataArray['EndPointURL'] : 'https://svcs.paypal.com/';
		}
		
		$this -> Countries = array(
							'Afghanistan' => 'AF',
							'Å̉land Islands' => 'AX',
							'Albania' => 'AL',
							'Algeria' => 'DZ',
							'American Samoa' => 'AS',
							'Andorra' => 'AD',
							'Angola' => 'AO',
							'Anguilla' => 'AI',
							'Antarctica' => 'AQ',
							'Antigua and Barbuda' => 'AG',
							'Argentina' => 'AR',
							'Armenia' => 'AM',
							'Aruba' => 'AW',
							'Australia' => 'AU',
							'Austria' => 'AT',
							'Azerbaijan' => 'AZ',
							'Bahamas' => 'BS',
							'Bahrain' => 'BH',
							'Bangladesh' => 'BD',
							'Barbados' => 'BB',
							'Belarus' => 'BY',
							'Belgium' => 'BE',
							'Belize' => 'BZ',
							'Benin' => 'BJ',
							'Bermuda' => 'BM',
							'Bhutan' => 'BT',
							'Bolivia' => 'BO',
							'Bosnia and Herzegovina' => 'BA',
							'Botswana' => 'BW',
							'Bouvet Island' => 'BV',
							'Brazil' => 'BR',
							'British Indian Ocean Territory' => 'IO',
							'Brunei Darussalam' => 'BN',
							'Bulgaria' => 'BG',
							'Burkina Faso' => 'BF',
							'Burundi' => 'BI',
							'Cambodia' => 'KH',
							'Cameroon' => 'CM',
							'Canada' => 'CA',
							'Cape Verde' => 'CV',
							'Cayman Islands' => 'KY',
							'Central African Republic' => 'CF',
							'Chad' => 'TD',
							'Chile' => 'CL',
							'China' => 'CN',
							'Christmas Island' => 'CX',
							'Cocos (Keeling) Islands' => 'CC',
							'Colombia' => 'CO',
							'Comoros' => 'KM',
							'Congo' => 'CG',
							'Congo, The Democratic Republic of the' => 'CD',
							'Cook Islands' => 'CK',
							'Costa Rica' => 'CR',
							"Cote D'Ivoire" => 'CI',
							'Croatia' => 'HR',
							'Cuba' => 'CU',
							'Cyprus' => 'CY',
							'Czech Republic' => 'CZ',
							'Denmark' => 'DK',
							'Djibouti' => 'DJ',
							'Dominica' => 'DM',
							'Dominican Republic' => 'DO',
							'Ecuador' => 'EC',
							'Egypt' => 'EG',
							'El Salvador' => 'SV',
							'Equatorial Guinea' => 'GQ',
							'Eritrea' => 'ER',
							'Estonia' => 'EE',
							'Ethiopia' => 'ET',
							'Falkland Islands (Malvinas)' => 'FK',
							'Faroe Islands' => 'FO',
							'Fiji' => 'FJ',
							'Finland' => 'FI',
							'France' => 'FR',
							'French Guiana' => 'GF',
							'French Polynesia' => 'PF',
							'French Southern Territories' => 'TF',
							'Gabon' => 'GA',
							'Gambia' => 'GM',
							'Georgia' => 'GE',
							'Germany' => 'DE',
							'Ghana' => 'GH',
							'Gibraltar' => 'GI',
							'Greece' => 'GR',
							'Greenland' => 'GL',
							'Grenada' => 'GD',
							'Guadeloupe' => 'GP',
							'Guam' => 'GU',
							'Guatemala' => 'GT',
							'Guernsey' => 'GG',
							'Guinea' => 'GN',
							'Guinea-Bissau' => 'GW',
							'Guyana' => 'GY',
							'Haiti' => 'HT',
							'Heard Island and McDonald Islands' => 'HM',
							'Holy See (Vatican City State)' => 'VA',
							'Honduras' => 'HN',
							'Hong Kong' => 'HK',
							'Hungary' => 'HU',
							'Iceland' => 'IS',
							'India' => 'IN',
							'Indonesia' => 'ID',
							'Iran, Islamic Republic of' => 'IR',
							'Iraq' => 'IQ',
							'Ireland' => 'IE',
							'Isle of Man' => 'IM',
							'Israel' => 'IL',
							'Italy' => 'IT',
							'Jamaica' => 'JM',
							'Japan' => 'JP',
							'Jersey' => 'JE',
							'Jordan' => 'JO',
							'Kazakhstan' => 'KZ',
							'Kenya' => 'KE',
							'Kiribati' => 'KI',
							"Korea, Democratic People's Republic of" => 'KP',
							'Korea, Republic of' => 'KR',
							'Kuwait' => 'KW',
							'Kyrgyzstan' => 'KG',
							"Laos People's Democratic Republic" => 'LA',
							'Latvia' => 'LV',
							'Lebanon' => 'LB',
							'Lesotho' => 'LS',
							'Liberia' => 'LR',
							'Libyan Arab Jamahiriya' => 'LY',
							'Liechtenstein' => 'LI',
							'Lithuania' => 'LT',
							'Luxembourg' => 'LU',
							'Macao' => 'MO',
							'Macedonia, The former Yugoslav Republic of' => 'MK',
							'Madagascar' => 'MG',
							'Malawi' => 'MW',
							'Malaysia' => 'MY',
							'Maldives' => 'MV',
							'Mali' => 'ML',
							'Malta' => 'MT',
							'Marshall Islands' => 'MH',
							'Martinique' => 'MQ',
							'Mauritania' => 'MR',
							'Mauritius' => 'MU',
							'Mayotte' => 'YT',
							'Mexico' => 'MX',
							'Micronesia, Federated States of' => 'FM',
							'Moldova, Republic of' => 'MD',
							'Monaco' => 'MC',
							'Mongolia' => 'MN',
							'Montserrat' => 'MS',
							'Morocco' => 'MA',
							'Mozambique' => 'MZ',
							'Myanmar' => 'MM',
							'Namibia' => 'NA',
							'Nauru' => 'NR',
							'Nepal' => 'NP',
							'Netherlands' => 'NL',
							'Netherlands Antilles' => 'AN',
							'New Caledonia' => 'NC',
							'New Zealand' => 'NZ',
							'Nicaragua' => 'NI',
							'Niger' => 'NE',
							'Nigeria' => 'NG',
							'Niue' => 'NU',
							'Norfolk Island' => 'NF',
							'Northern Mariana Islands' => 'MP',
							'Norway' => 'NO',
							'Oman' => 'OM',
							'Pakistan' => 'PK',
							'Palau' => 'PW',
							'Palestinian Territory, Occupied' => 'PS',
							'Panama' => 'PA',
							'Papua New Guinea' => 'PG',
							'Paraguay' => 'PY',
							'Peru' => 'PE',
							'Philippines' => 'PH',
							'Pitcairn' => 'PN',
							'Poland' => 'PL',
							'Portugal' => 'PT',
							'Puerto Rico' => 'PR',
							'Qatar' => 'QA',
							'Reunion' => 'RE',
							'Romania' => 'RO',
							'Russian Federation' => 'RU',
							'Rwanda' => 'RW',
							'Saint Helena' => 'SH',
							'Saint Kitts and Nevis' => 'KN',
							'Saint Lucia' => 'LC',
							'Saint Pierre and Miquelon' => 'PM',
							'Saint Vincent and the Grenadines' => 'VC',
							'Samoa' => 'WS',
							'San Marino' => 'SM',
							'Sao Tome and Principe' => 'ST',
							'Saudi Arabia' => 'SA',
							'Senegal' => 'SN',
							'Serbia and Montenegro' => 'CS',
							'Seychelles' => 'SC',
							'Sierra Leone' => 'SL',
							'Singapore' => 'SG',
							'Slovakia' => 'SK',
							'Slovenia' => 'SI',
							'Solomon Islands' => 'SB',
							'Somalia' => 'SO',
							'South Africa' => 'ZA',
							'South Georgia and the South Sandwich Islands' => 'GS',
							'Spain' => 'ES',
							'Sri Lanka' => 'LK',
							'Sudan' => 'SD',
							'Suriname' => 'SR',
							'SValbard and Jan Mayen' => 'SJ',
							'Swaziland' => 'SZ',
							'Sweden' => 'SE',
							'Switzerland' => 'CH',
							'Syrian Arab Republic' => 'SY',
							'Taiwan, Province of China' => 'TW',
							'Tajikistan' => 'TJ',
							'Tanzania, United Republic of' => 'TZ',
							'Thailand' => 'TH',
							'Timor-Leste' => 'TL',
							'Togo' => 'TG',
							'Tokelau' => 'TK',
							'Tonga' => 'TO',
							'Trinidad and Tobago' => 'TT',
							'Tunisia' => 'TN',
							'Turkey' => 'TR',
							'Turkmenistan' => 'TM',
							'Turks and Caicos Islands' => 'TC',
							'Tuvalu' => 'TV',
							'Uganda' => 'UG',
							'Ukraine' => 'UA',
							'United Arab Emirates' => 'AE',
							'United Kingdom' => 'GB',
							'United States' => 'US',
							'United States Minor Outlying Islands' => 'UM',
							'Uruguay' => 'UY',
							'Uzbekistan' => 'UZ',
							'Vanuatu' => 'VU',
							'Venezuela' => 'VE',
							'Viet Nam' => 'VN',
							'Virgin Islands, British' => 'VG',
							'Virgin Islands, U.S.' => 'VI',
							'Wallis and Futuna' => 'WF',
							'Western Sahara' => 'EH',
							'Yemen' => 'YE',
							'Zambia' => 'ZM',
							'Zimbabwe' => 'ZW');
							
		$this -> States = array(
						'Alberta' => 'AB',
						'British Columbia' => 'BC',
						'Manitoba' => 'MB',
						'New Brunswick' => 'NB',
						'Newfoundland and Labrador' => 'NF',
						'Northwest Territories' => 'NT',
						'Nova Scotia' => 'NS',
						'Nunavut' => 'NU',
						'Ontario' => 'ON',
						'Prince Edward Island' => 'PE',
						'Quebec' => 'QC',
						'Saskatchewan' => 'SK',
						'Yukon' => 'YK',
						'Alabama' => 'AL',
						'Alaska' => 'AK',
						'American Samoa' => 'AS',
						'Arizona' => 'AZ',
						'Arkansas' => 'AR',
						'California' => 'CA',
						'Colorado' => 'CO',
						'Connecticut' => 'CT',
						'Delaware' => 'DE',
						'District of Columbia' => 'DC',
						'Federated States of Micronesia' => 'FM',
						'Florida' => 'FL',
						'Georgia' => 'GA',
						'Guam' => 'GU',
						'Hawaii' => 'HI',
						'Idaho' => 'ID',
						'Illinois' => 'IL',
						'Indiana' => 'IN',
						'Iowa' => 'IA',
						'Kansas' => 'KS',
						'Kentucky' => 'KY',
						'Louisiana' => 'LA',
						'Maine' => 'ME',
						'Marshall Islands' => 'MH',
						'Maryland' => 'MD',
						'Massachusetts' => 'MA',
						'Michigan' => 'MI',
						'Minnesota' => 'MN',
						'Mississippi' => 'MS',
						'Missouri' => 'MO',
						'Montana' => 'MT',
						'Nebraska' => 'NE',
						'Nevada' => 'NV',
						'New Hampshire' => 'NH',
						'New Jersey' => 'NJ',
						'New Mexico' => 'NM',
						'New York' => 'NY',
						'North Carolina' => 'NC',
						'North Dakota' => 'ND',
						'Northern Mariana Islands' => 'MP',
						'Ohio' => 'OH',
						'Oklahoma' => 'OK',
						'Oregon' => 'OR',
						'Palau' => 'PW',
						'Pennsylvania' => 'PA',
						'Puerto Rico' => 'PR',
						'Rhode Island' => 'RI',
						'South Carolina' => 'SC',
						'South Dakota' => 'SD',
						'Tennessee' => 'TN',
						'Texas' => 'TX',
						'Utah' => 'UT',
						'Vermont' => 'VT',
						'Virgin Islands' => 'VI',
						'Virginia' => 'VA',
						'Washington' => 'WA',
						'West Virginia' => 'WV',
						'Wisconsin' => 'WI',
						'Wyoming' => 'WY',
						'Armed Forces Americas' => 'AA',
						'Armed Forces' => 'AE',
						'Armed Forces Pacific' => 'AP');
						
		$this -> AVSCodes = array(
								  "A" => "Address Matches Only (No ZIP)", 
								  "B" => "Address Matches Only (No ZIP)", 
								  "C" => "This tranaction was declined.", 
								  "D" => "Address and Postal Code Match", 
								  "E" => "This transaction was declined.", 
								  "F" => "Address and Postal Code Match", 
								  "G" => "Global Unavailable - N/A", 
								  "I" => "International Unavailable - N/A", 
								  "N" => "None - Transaction was declined.", 
								  "P" => "Postal Code Match Only (No Address)", 
								  "R" => "Retry - N/A", 
								  "S" => "Service not supported - N/A", 
								  "U" => "Unavailable - N/A", 
								  "W" => "Nine-Digit ZIP Code Match (No Address)", 
								  "X" => "Exact Match - Address and Nine-Digit ZIP", 
								  "Y" => "Address and five-digit Zip match", 
								  "Z" => "Five-Digit ZIP Matches (No Address)");
								  
		$this -> CVV2Codes = array(
									"E" => "N/A", 
									"M" => "Match", 
									"N" => "No Match", 
									"P" => "Not Processed - N/A", 
									"S" => "Service Not Supported - N/A", 
									"U" => "Service Unavailable - N/A", 
									"X" => "No Response - N/A"
									);
								   
		$this -> CurrencyCodes = array(
										'AUD' => 'Australian Dollar', 
										'CAD' => 'Canadian Dollar', 
										'CHF' => 'Swiss Franc', 
										'CZK' => 'Czech Koruna', 
										'DKK' => 'Danish Krone', 
										'EUR' => 'Euro', 
										'GBP' => 'Pound Sterling', 
										'HKD' => 'Hong Kong Dollar', 
										'HUF' => 'Hungarian Forint', 
										'JPY' => 'Japanese Yen', 
										'NOK' => 'Norwegian Krone', 
										'NZD' => 'New Zealand Dollar', 
										'PLN' => 'Polish Zloty', 
										'SEK' => 'Swedish Krona', 
										'SGD' => 'Singapore Dollar', 
										'USD' => 'U.S. Dollar'
										);
	}
	
	// General Functions
	function GetCountryCode($CountryName)
	{
		return $this -> Countries[$CountryName];
	}
	
	
	function GetStateCode($StateOrProvinceName)
	{
		return $this -> States[$StateOrProvinceName];
	}
	
	function GetCountryName($CountryCode)
	{
		$Countries = array_flip($this -> Countries);
		return $Countries[$CountryCode];
	}
	
	function GetStateName($StateOrProvinceName)
	{
		$States = array_flip($this -> States);
		return $States[$StateOrProvinceName];
	}
	
	function GetAVSCodeMessage($AVSCode)
	{					  
		return $this -> AVSCodes[$AVSCode];
	}
	
	function GetCVV2CodeMessage($CVV2Code)
	{
		return $this -> CVV2Codes[$CVV2Code];	
	}
	
	function GetCurrencyCodeText($CurrencyCode)
	{
		return $this -> CurrencyCodes[$CurrencyCode];
	}
	
	function GetCurrencyCode($CurrencyCodeText)
	{
		$CurrencyCodes = array_flip($this -> CurrencyCodes);
		return $CurrencyCodes[$CurrencyCodeText];
	}
	
	function BuildHeaders()
	{
		$headers = array(
						'X-PAYPAL-SECURITY-USERID: ' . $this -> APIUsername, 
						'X-PAYPAL-SECURITY-PASSWORD: ' . $this -> APIPassword, 
						'X-PAYPAL-SECURITY-SIGNATURE: ' . $this -> APISignature, 
						'X-PAYPAL-SECURITY-SUBJECT: ' . $this -> APISubject, 
						'X-PAYPAL-SECURITY-VERSION: ' . $this -> APIVersion, 
						'X-PAYPAL-REQUEST-DATA-FORMAT: XML', 
						'X-PAYPAL-RESPONSE-DATA-FORMAT: XML', 
						'X-PAYPAL-APPLICATION-ID: ' . $this -> ApplicationID, 
						'X-PAYPAL-DEVICE-ID: ' . $this -> DeviceID, 
						'X-PAYPAL-DEVICE-IPADDRESS: ' . $this -> IPAddress
						);
		
		if($this -> Sandbox)
			array_push($headers, 'X-PAYPAL-SANDBOX-EMAIL-ADDRESS: andrew@angelleye.com');
		
		echo '<pre />';
		print_r($headers);
		
		return $headers;
	}
	
	function CURLRequest($Request, $APIName, $APIOperation)
	{
		$curl = curl_init();
				curl_setopt($curl, CURLOPT_VERBOSE, 1);
				curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
				curl_setopt($curl, CURLOPT_TIMEOUT, 30);
				curl_setopt($curl, CURLOPT_URL, $this -> EndPointURL . $APIName . '/' . $APIOperation);
				curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
				curl_setopt($curl, CURLOPT_POSTFIELDS, $Request);
				curl_setopt($curl, CURLOPT_HTTPHEADER, $this -> BuildHeaders());
								
		if($this -> APIMode == 'Certificate')
			curl_setopt($curl, CURLOPT_SSLCERT, $this -> PathToCertKeyPEM);
		
		//execute the curl POST		
		$Response = curl_exec($curl);
		
		curl_close($curl);
		
		return $Response;
		
	} //End CURLRequest function
	
	
	function GetErrors($XML)
	{
		$DOM = new DOMDocument();
		$DOM -> loadXML($XML);
		
		$Errors = $DOM -> getElementsByTagName('error') -> length > 0 ? $DOM -> getElementsByTagName('error') : array();
		$ErrorsArray = array();
		foreach($Errors as $Error)
		{
			$Receiver = $Error -> getElementsByTagName('receiver') -> length > 0 ? $Error -> getElementsByTagName('receiver') -> item(0) -> nodeValue : '';
			$Category = $Error -> getElementsByTagName('category') -> length > 0 ? $Error -> getElementsByTagName('category') -> item(0) -> nodeValue : '';
			$Domain = $Error -> getElementsByTagName('domain') -> length > 0 ? $Error -> getElementsByTagName('domain') -> item(0) -> nodeValue : '';
			$ErrorID = $Error -> getElementsByTagName('errorId') -> length > 0 ? $Error -> getElementsByTagName('errorId') -> item(0) -> nodeValue : '';
			$ExceptionID = $Error -> getElementsByTagName('exceptionId') -> length > 0 ? $Error -> getElementsByTagName('exceptionId') -> item(0) -> nodeValue : '';
			$Message = $Error -> getElementsByTagName('message') -> length > 0 ? $Error -> getElementsByTagName('message') -> item(0) -> nodeValue : '';
			$Parameter = $Error -> getElementsByTagName('parameter') -> length > 0 ? $Error -> getElementsByTagName('parameter') -> item(0) -> nodeValue : '';
			$Severity = $Error -> getElementsByTagName('severity') -> length  > 0 ? $Error -> getElementsByTagName('severity') -> item(0) -> nodeValue : '';
			$Subdomain = $Error -> getElementsByTagName('subdomain') -> length > 0 ? $Error -> getElementsByTagName('subdomain') -> item(0) -> nodeValue : '';
			
			$CurrentError = array(
								  'Receiver' => $Receiver, 
								  'Category' => $Category, 
								  'Domain' => $Domain, 
								  'ErrorID' => $ErrorID, 
								  'ExceptionID' => $ExceptionID, 
								  'Message' => $Message, 
								  'Parameter' => $Parameter, 
								  'Severity' => $Severity, 
								  'Subdomain' => $Subdomain
								  );
			array_push($ErrorsArray, $CurrentError);
		}
		return $ErrorsArray;
	}
	
	
	function GetXMLRequestEnvelope()
	{
		$XML = '<requestEnvelope xmlns="">';
		$XML .= '<detailLevel>' . $this -> DetailLevel . '</detailLevel>';
		$XML .= '<errorLanguage>' . $this -> ErrorLanguage . '</errorLanguage>';
		$XML .= '</requestEnvelope>';
		
		return $XML;
	}
	
	// Pay API
	function Pay($DataArray)
	{		
		/*$PayRequestFields = array(
								'ActionType' => '', 							// Required.  The action for this request.  Must be set to PAY
								'CurrencyCode' => '', 							// Required.  The code for the currency in which the payment is made.  You can speicify only one currency, regardless of the number of receivers.
								'CancelURL' => '', 								// Required.  URL to return the user to after canceling the approval for payment.  
								'ReturnURL' => '', 								// Required.  URL to return the user to after the sender has logged into PayPal and approved a payment.  
								'IPNNotificationURL' => '', 					// URL for IPN notification
								'SenderEmail' => '', 							// Your email address, which is an address associated with your API credentials.  Used for Implicit approval.	
								'PreapprovalKey' => '', 						// Preapproval key for the approval set up between you and the sender.
								'Pin' => '', 									// Sender's personal id number, if one was specified when the sender agreed to the approval.
								'ReverseAllParallelPaymentsOnError' => '', 		// Used to guarantee that transfers to all receivers are reversed and all funds are returned to the sender upon an error ocurring.  Otherwise, completed transfers are not reversed and funds that have already been transferred are no longer available to the sender.
								'TrackingId' => '', 							// Provided as a convenience in cases where you have your own ID to track payments.
								'FeesPayer' => '', 								// The payer of the PayPal fees.  Allowable values: SENDER, PRIMARYRECEIVER, EACHRECEIVER, SECONDARYONLY
								'Memo' => '' 									// A note associated with the payment.  1000 char max.
								);
		
		$Receivers = array();
		$Receiver = array(
						  'Email' => '',									// A receiver's email address. 
						  'Amount' => '', 									// Amount to be debited to the receiver's account.
						  'Primary' => '', 									// Set to true to indicate a chained payment.  Only one receiver can be a primary receiver.  Omit this field, or set to false for simple and parallel payments.
						  'InvoiceID' => '', 								// The invoice number for the payment.  This field is only used in Pay API operation.
						  'PaymentType' => ''								// The transaction subtype for the payment.  Allowable values are: GOODS, SERVICE
						  );
		
		array_push($Receivers, $Receiver);
		
		$ClientDetailsFields = array(
									 'CustomerID' => '', 						// Your ID for the sender.
									 'CustomerType' => '', 						// Your ID of the type of customer.
									 'GeoLocation' => '', 						// Sender's geographic location.
									 'Model' => '', 							// A sub-id of the application
									 'PartnerName' => ''						// Your organization's name or ID.
									 );
		
		$FundingTypes = array('ECHECK', 'BALANCE', 'CREDITCARD');
		
		$RequestData = array(
								'PayRequestFields' => $PayRequestFields, 
								'Receivers' => $Receivers, 
								'ClientDetailsFields' => $ClientDetailsFields, 
								'FundingTypes' => $FundingTypes 
								);*/
	
		// PayRequest Fields
		$PayRequestFields = isset($DataArray['PayRequestFields']) ? $DataArray['PayRequestFields'] : array();
		$ActionType = isset($PayRequestFields['ActionType']) ? $PayRequestFields['ActionType'] : '';
		$CancelURL = isset($PayRequestFields['CancelURL']) ? $PayRequestFields['CancelURL'] : '';
		$CurrencyCode = isset($PayRequestFields['CurrencyCode']) ? $PayRequestFields['CurrencyCode'] : '';
		$FeesPayer = isset($PayRequestFields['FeesPayer']) ? $PayRequestFields['FeesPayer'] : '';
		$FundingConstraint = isset($PayRequestFields['FundingConstraint']) ? $PayRequestFields['FundingConstraint'] : '';
		$IPNNotificationURL = isset($PayRequestFields['IPNNotificationURL']) ? $PayRequestFields['IPNNotificationURL'] : '';
		$Memo = isset($PayRequestFields['Memo']) ? $PayRequestFields['Memo'] : '';
		$Pin = isset($PayRequestFields['Pin']) ? $PayRequestFields['Pin'] : '';
		$PreapprovalKey = isset($PayRequestFields['PreapprovalKey']) ? $PayRequestFields['PreapprovalKey'] : '';
		$ReturnURL = isset($PayRequestFields['ReturnURL']) ? $PayRequestFields['ReturnURL'] : '';
		$ReverseAllParallelPaymentsOnError = isset($PayRequestFields['ReverseAllParallelPaymentsOnError']) ? $PayRequestFields['ReverseAllParallelPaymentsOnError'] : '';
		$SenderEmail = isset($PayRequestFields['SenderEmail']) ? $PayRequestFields['SenderEmail'] : '';
		$TrackingID = isset($PayRequestFields['TrackingID']) ? $PayRequestFields['TrackingID'] : '';
		
		// ClientDetails Fields
		$ClientDetailsFields = isset($DataArray['ClientDetailsFields']) ? $DataArray['ClientDetailsFields'] : array();
		$CustomerID = isset($ClientDetailsFields['CustomerID']) ? $ClientDetailsFields['CustomerID'] : '';
		$CustomerType = isset($ClientDetailsFields['CustomerType']) ? $ClientDetailsFields['CustomerType'] : '';
		$GeoLocation = isset($ClientDetailsFields['GeoLocation']) ? $ClientDetailsFields['GeoLocation'] : '';
		$Model = isset($ClientDetailsFields['Model']) ? $ClientDetailsFields['Model'] : '';
		$PartnerName = isset($ClientDetailsFields['PartnerName']) ? $ClientDetailsFields['PartnerName'] : '';
		
		// FundingConstraint Fields
		$FundingTypes = isset($DataArray['FundingTypes']) ? $DataArray['FundingTypes'] : array();
		
		// Receivers Fields
		$Receivers = isset($DataArray['Receivers']) ? $DataArray['Receivers'] : array();
		$Amount = isset($Receivers['Amount']) ? $Receivers['Amount'] : '';
		$Email = isset($Receivers['Email']) ? $Receivers['Email'] : '';
		$InvoiceID = isset($Receivers['InvoiceID']) ? $Receivers['InvoiceID'] : '';
		$Primary = isset($Receivers['Primary']) ? $Receivers['Primary'] : '';
		$PaymentType = isset($Receivers['PaymentType']) ? $Receivers['PaymentType'] : '';	
		
		// Generate XML Request
		$XMLRequest = '<?xml version="1.0" encoding="utf-8"?>';
		$XMLRequest .= '<PayRequest xmlns="' . $this -> XMLNamespace . '">';
		$XMLRequest .= $this -> GetXMLRequestEnvelope();
		$XMLRequest .= '<actionType xmlns="">' . $ActionType . '</actionType>';
		$XMLRequest .= '<cancelUrl xmlns="">' . $CancelURL . '</cancelUrl>';
		
		if(count($ClientDetailsFields) > 0)
		{
			$XMLRequest .= '<clientDetails xmlns="">';
			$XMLRequest .= $this -> ApplicationID != '' ? '<applicationId xmlns="">' . $this -> ApplicationID . '</applicationId>' : '';
			$XMLRequest .= $CustomerID != '' ? '<customerId xmlns="">' . $CustomerID . '</customerId>' : '';
			$XMLRequest .= $CustomerType != '' ? '<customerType xmlns="">' . $CustomerType . '</customerType>' : '';
			$XMLRequest .= $this -> DeviceID != '' ? '<deviceId xmlns="">' . $this -> DeviceID . '</deviceId>' : '';
			$XMLRequest .= $GeoLocation != '' ? '<geoLocation xmlns="">' . $GeoLocation . '</geoLocation>' : '';
			$XMLRequest .= $this -> IPAddress != '' ? '<ipAddress xmlns="">' . $this -> IPAddress . '</ipAddress>' : '';
			$XMLRequest .= $Model != '' ? '<model xmlns="">' . $Model . '</model>' : '';
			$XMLRequest .= $PartnerName != '' ? '<partnerName xmlns="">' . $PartnerName . '</partnerName>' : '';
			$XMLRequest .= '</clientDetails>';		
		}
		
		$XMLRequest .= '<currencyCode xmlns="">' . $CurrencyCode . '</currencyCode>';
		$XMLRequest .= $FeesPayer != '' ? '<feesPayer xmlns="">' . $FeesPayer . '</feesPayer>' : '';
		
		if(count($FundingTypes) > 0)
		{		
			$XMLRequest .= '<fundingConstraint xmlns="">';
			$XMLRequest .= '<allowedFundingType xmlns="">';
			
			foreach($FundingTypes as $FundingType)
			{
				$XMLRequest .= '<fundingTypeInfo xmlns="">';
				$XMLRequest .= '<fundingType xmlns="">' . $FundingType . '</fundingType>';
				$XMLRequest .= '</fundingTypeInfo>';
			}
			
			$XMLRequest .= '</allowedFundingType>';
			$XMLRequest .= '</fundingConstraint>';
		}
		
		$XMLRequest .= $IPNNotificationURL != '' ? '<ipnNotificationUrl xmlns="">' . $IPNNotificationURL . '</ipnNotificationUrl>' : '';
		$XMLRequest .= $Memo != '' ? '<memo xmlns="">' . $Memo . '</memo>' : '';
		$XMLRequest .= $Pin != '' ? '<pin xmlns="">' . $Pin . '</pin>' : '';
		$XMLRequest .= $PreapprovalKey != '' ? '<preapprovalKey xmlns="">' . $Pin . '</preapprovalKey>' : '';
		
		$XMLRequest .= '<receiverList xmlns="">';
		foreach($Receivers as $Receiver)
		{
			$XMLRequest .= '<receiver xmlns="">';
			$XMLRequest .= '<amount xmlns="">' . $Receiver['Amount'] . '</amount>';
			$XMLRequest .= '<email xmlns="">' . $Receiver['Email'] . '</email>';
			$XMLRequest .= $Receiver['InvoiceID'] != '' ? '<invoiceId xmlns="">' . $Receiver['InvoiceID'] . '</invoiceId>' : '';
			$XMLRequest .= $Receiver['PaymentType'] != '' ? '<paymentType xmlns="">' . $Receiver['PaymentType'] . '</paymentType>' : '';
			$XMLRequest .= $Receiver['Primary'] != '' ? '<primary xmls="">' . $Receiver['Primary'] . '</primary>' : '';
			$XMLRequest .= '</receiver>';
		}
		$XMLRequest .= '</receiverList>';
		
		$XMLRequest .= '<returnUrl xmlns="">' . $ReturnURL . '</returnUrl>';
		$XMLRequest .= $ReverseAllParallelPaymentsOnError != '' ? '<reverseAllParallelPaymentsOnError xmlns="">' . $ReverseAllParallelPaymentsOnError . '</reverseAllParallelPaymentsOnError>' : '';
		$XMLRequest .= $SenderEmail != '' ? '<senderEmail xmlns="">' . $SenderEmail . '</senderEmail>' : '';
		$XMLRequest .= $TrackingID != '' ? '<trackingId xmlns="">' . $TrackingID . '</trackingId>' : '';
		$XMLRequest .= '</PayRequest>';
		
		// Call the API and load XML response into DOM
		$XMLResponse = $this -> CURLRequest($XMLRequest, 'AdaptivePayments', 'Pay');
		$DOM = new DOMDocument();
		$DOM -> loadXML($XMLResponse);
						
		// Parse XML values
		$Fault = $DOM -> getElementsByTagName('FaultMessage') -> length > 0 ? true : false;
		$Errors = $this -> GetErrors($XMLResponse);
		$Ack = $DOM -> getElementsByTagName('ack') -> length > 0 ? $DOM -> getElementsByTagName('ack') -> item(0) -> nodeValue : '';
		$Build = $DOM -> getElementsByTagName('build') -> length > 0 ? $DOM -> getElementsByTagName('build') -> item(0) -> nodeValue : '';
		$CorrelationID = $DOM -> getElementsByTagName('correlationId') -> length > 0 ? $DOM -> getElementsByTagName('correlationId') -> item(0) -> nodeValue : '';
		$Timestamp = $DOM -> getElementsByTagName('timestamp') -> length > 0 ? $DOM -> getElementsByTagName('timestamp') -> item(0) -> nodeValue : '';
		
		$PayKey = $DOM -> getElementsByTagName('payKey') -> length > 0 ? $DOM -> getElementsByTagName('payKey') -> item(0) -> nodeValue : '';
		$PaymentExecStatus = $DOM -> getElementsByTagName('paymentExecStatus') -> length > 0 ? $DOM -> getElementsByTagName('paymentExecStatus') -> item(0) -> nodeValue : '';
		
		if($this -> Sandbox)
			$RedirectURL = 'https://www.sandbox.paypal.com/webscr?cmd=_ap-payment&paykey=' . $PayKey;
		elseif($this -> BetaSandbox)
			$RedirectURL = 'https://www.beta-sandbox.paypal.com/webscr?cmd=_ap-payment&paykey=' . $PayKey;
		else
			$RedirectURL = 'https://www.paypal.com/webscr?cmd=_ap-payment&paykey=' . $PayKey;
		
		$ResponseDataArray = array(
								   'Errors' => $Errors, 
								   'Ack' => $Ack, 
								   'Build' => $Build, 
								   'CorrelationID' => $CorrelationID, 
								   'Timestamp' => $Timestamp, 
								   'PayKey' => $PayKey, 
								   'PaymentExecStatus' => $PaymentExecStatus, 
								   'RedirectURL' => $PayKey != '' ? $RedirectURL : '', 
								   'XMLRequest' => $XMLRequest, 
								   'XMLResponse' => $XMLResponse
								   );
		
		return $ResponseDataArray;
	}
	
	// Payment Details API
	function PaymentDetails($DataArray)
	{	
		/*$PaymentDetailsFields = array(
									 'PayKey' => '', 								// The pay key that identifies the payment for which you want to retrieve details.  This is the pay key returned in the PayResponse.
									 'TranasctionID' => '', 						// PayPal transaction ID associated with the payment.  Retrieved via IPN.
									 'TrackingID' => '' 							// The tracking ID that was specified for this payment in the PayRequest.
									 );
		
		$RequestData = array(
							 'PaymentDetailsFields' => $PaymentDetailsFields
							 );*/
		
		// PaymentDetails Fields
		$PaymentDetailsFields = isset($DataArray['PaymentDetailsFields']) ? $DataArray['PaymentDetailsFields'] : array();
		$PayKey = isset($PaymentDetailsFields['PayKey']) ? $PaymentDetailsFields['PayKey'] : '';
		$TransactionID = isset($PaymentDetailsFields['TransactionID']) ? $PaymentDetailsFields['TransactionID'] : '';
		$TrackingID = isset($PaymentDetailsFields['TrackingID']) ? $PaymentDetailsFields['TrackingID'] : '';
		
		// Generate XML Request
		$XMLRequest = '<?xml version="1.0" encoding="utf-8"?>';
		$XMLRequest .= '<PaymentDetailsRequest xmlns="' . $this -> XMLNamespace . '">';
		$XMLRequest .= $this -> GetXMLRequestEnvelope();
		$XMLRequest .= isset($PaymentDetailsFields['PayKey']) ? '<payKey xmlns="">' . $PaymentDetailsFields['PayKey'] . '</payKey>' : '';
		$XMLRequest .= isset($PaymentDetailsFields['TransactionID']) ? '<transactionId xmlns="">' . $PaymentDetailsFields['TransactionID'] . '</transactionId>' : '';
		$XMLRequest .= isset($PaymentDetailsFields['TrackingID']) ? '<trackingId xmlns="">' . $PaymentDetailsFields['TrackingID'] . '</trackingId>' : '';
		$XMLRequest .= '</PaymentDetailsRequest>';
		
		// Call the API and load XML response into DOM
		$XMLResponse = $this -> CURLRequest($XMLRequest, 'AdaptivePayments', 'PaymentDetails');
		$DOM = new DOMDocument();
		$DOM -> loadXML($XMLResponse);
						
		// Parse XML values
		$Fault = $DOM -> getElementsByTagName('FaultMessage') -> length > 0 ? true : false;
		$Errors = $this -> GetErrors($XMLResponse);
		$Ack = $DOM -> getElementsByTagName('ack') -> length > 0 ? $DOM -> getElementsByTagName('ack') -> item(0) -> nodeValue : '';
		$Build = $DOM -> getElementsByTagName('build') -> length > 0 ? $DOM -> getElementsByTagName('build') -> item(0) -> nodeValue : '';
		$CorrelationID = $DOM -> getElementsByTagName('correlationId') -> length > 0 ? $DOM -> getElementsByTagName('correlationId') -> item(0) -> nodeValue : '';
		$Timestamp = $DOM -> getElementsByTagName('timestamp') -> length > 0 ? $DOM -> getElementsByTagName('timestamp') -> item(0) -> nodeValue : '';
		
		$ActionType = $DOM -> getElementsByTagName('actionType') -> length > 0 ? $DOM -> getElementsByTagName('actionType') -> item(0) -> nodeValue : '';
		$CancelURL = $DOM -> getElementsByTagName('cancelUrl') -> length > 0 ? $DOM -> getElementsByTagName('cancelUrl') -> item(0) -> nodeValue : '';
		$CurrencyCode = $DOM -> getElementsByTagName('currencyCode') -> length > 0 ? $DOM -> getElementsByTagName('currencyCode') -> item(0) -> nodeValue : '';
		$FeesPayer = $DOM -> getElementsByTagName('feesPayer') -> length > 0 ? $DOM -> getElementsByTagName('feesPayer') -> item(0) -> nodeValue : '';
		
		$FundingTypesDOM = $DOM -> getElementsByTagName('fundingType') -> length > 0 ? $DOM -> getElementsByTagName('fundingType') -> item(0) -> nodeValue : array();
		$FundingTypes = array();
		foreach($FundingTypesDOM as $FundingType)
			array_push($FundingTypes, $FundingType);
			
		$IPNNotificationURL = $DOM -> getElementsByTagName('ipnNotificationUrl') -> length > 0 ? $DOM -> getElementsByTagName('ipnNotificationUrl') -> item(0) -> nodeValue : '';
		$Memo = $DOM -> getElementsByTagName('memo') -> length > 0 ? $DOM -> getElementsByTagName('memo') -> item(0) -> nodeValue : '';
		$PayKey = $DOM -> getElementsByTagName('payKey') -> length > 0 ? $DOM -> getElementsByTagName('payKey') -> item(0) -> nodeValue : '';
		
		$PendingRefund = $DOM -> getElementsByTagName('pendingRefund') -> length > 0 ? $DOM -> getElementsByTagName('varName') -> item(0) -> nodeValue : 'false';
		$RefundedAmount = $DOM -> getElementsByTagName('refundedAmount') -> length > 0 ? $DOM -> getElementsByTagName('refundedAmount') -> item(0) -> nodeValue : '';
		$SenderTransactionID = $DOM -> getElementsByTagName('senderTransactionID') -> length > 0 ? $DOM -> getElementsByTagName('senderTransactionID') -> item(0) -> nodeValue : '';
		$SenderTransactionStatus = $DOM -> getElementsByTagName('senderTransactionStatus') -> length > 0 ? $DOM -> getElementsByTagName('senderTransactionStatus') -> item(0) -> nodeValue : '';
		$TransactionID = $DOM -> getElementsByTagName('transactionId') -> length > 0 ? $DOM -> getElementsByTagName('transactionId') -> item(0) -> nodeValue : '';
		$TransactionStatus = $DOM -> getElementsByTagName('transactionStatus') -> length > 0 ? $DOM -> getElementsByTagName('transactionStatus') -> item(0) -> nodeValue : '';
		$PaymentInfo = array(
							'PendingRefund' => $PendingRefund, 
							'RefundAmount' => $RefundAmount, 
							'SenderTransactionID' => $SenderTransactionID, 
							'SenderTransactionStatus' => $SenderTransactionStatus, 
							'TransactionID' => $TransactionID, 
							'TransactionStatus' => $TransactionStatus
							 );
		
		$PreapprovalKey = $DOM -> getElementsByTagName('preapprovalKey') -> length > 0 ? $DOM -> getElementsByTagName('preapprovalKey') -> item(0) -> nodeValue : '';
		$ReturnURL = $DOM -> getElementsByTagName('returnUrl') -> length > 0 ? $DOM -> getElementsByTagName('returnUrl') -> item(0) -> nodeValue : '';
		$ReverseAllParallelPaymentsOnError = $DOM -> getElementsByTagName('reverseAllParallelPaymentsOnError') -> length > 0 ? $DOM -> getElementsByTagName('reverseAllParallelPaymentsOnError') -> item(0) -> nodeValue : '';
		$SenderEmail = $DOM -> getElementsByTagName('senderEmail') -> length > 0 ? $DOM -> getElementsByTagName('senderEmail') -> item(0) -> nodeValue : '';
		$Status = $DOM -> getElementsByTagName('status') -> length > 0 ? $DOM -> getElementsByTagName('status') -> item(0) -> nodeValue : '';
		$TrackingID = $DOM -> getElementsByTagName('trackingId') -> length > 0 ? $DOM -> getElementsByTagName('trackingId') -> item(0) -> nodeValue : '';
		
		$Amount = $DOM -> getElementsByTagName('amount') -> length > 0 ? $DOM -> getElementsByTagName('amount') -> item(0) -> nodeValue : '';
		$Email = $DOM -> getElementsByTagName('email') -> length > 0 ? $DOM -> getElementsByTagName('email') -> item(0) -> nodeValue : '';
		$InvoiceID = $DOM -> getElementsByTagName('invoiceId') -> length > 0 ? $DOM -> getElementsByTagName('invoiceId') -> item(0) -> nodeValue : '';
		$PaymentType = $DOM -> getElementsByTagName('paymentType') -> length > 0 ? $DOM -> getElementsByTagName('paymentType') -> item(0) -> nodeValue : '';
		$Primary = $DOM -> getElementsByTagName('primary') -> length > 0 ? $DOM -> getElementsByTagName('primary') -> item(0) -> nodeValue : 'false';
		$Receiver = array(
						'Amount' => $Amount, 
						'Email' => $Email, 
						'InvoiceID' => $InvoiceID, 
						'PaymentType' => $PaymentType, 
						'Primary' => $Primary
						  );
		
		$ResponseDataArray = array(
								   'Errors' => $Errors, 
								   'Ack' => $Ack, 
								   'Build' => $Build, 
								   'CorrelationID' => $CorrelationID, 
								   'Timestamp' => $Timestamp, 
								   'ActionType' => $ActionType, 
								   'CancelURL' => $CancelURL, 
								   'CurrencyCode' => $CurrencyCode, 
								   'FeesPayer' => $FeesPayer, 
								   'FundingTypes' => $FundingTypes, 
								   'IPNNotificationURL' => $IPNNotificationURL, 
								   'Memo' => $Memo, 
								   'PayKey' => $PayKey, 
								   'PaymentInfo' => $PaymentInfo, 
								   'PreapprovalKey' => $PreapprovalKey, 
								   'ReturnURL' => $ReturnURL, 
								   'ReverseAllParallelPaymentsOnError' => $ReverseAllParallelPaymentsOnError, 
								   'SenderEmail' => $SenderEmail, 
								   'Status' => $Status, 
								   'TrackingID' => $TrackingID, 
								   'Receiver' => $Receiver, 
								   'XMLRequest' => $XMLRequest, 
								   'XMLResponse' => $XMLResponse
								   );
		
		return $ResponseDataArray;
	}
	
	
	// Preapproval API
	function Preapproval($DataArray)
	{
		/*$PreapprovalFields = array(
								   'CancelURL' => '',  								// Required.  URL to send the browser to after the user cancels.
								   'CurrencyCode' => '', 							// Required.  Currency Code.
								   'DateOfMonth' => '', 							// The day of the month on which a monthly payment is to be made.  0 - 31.  Specifying 0 indiciates that payment can be made on any day of the month.
								   'DayOfWeek' => '', 								// The day of the week that a weekly payment should be made.  Allowable values: NO_DAY_SPECIFIED, SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY
								   'EndingDate' => '', 								// Required.  The last date for which the preapproval is valid.  It cannot be later than one year from the starting date.
								   'IPNNotificationURL' => '', 						// The URL for IPN notifications.
								   'MaxAmountPerPayment' => '', 					// The preapproved maximum amount per payment.  Cannot exceed the preapproved max total amount of all payments.
								   'MaxNumberOfPayments' => '', 					// The preapproved maximum number of payments.  Cannot exceed the preapproved max total number of all payments. 
								   'MaxTotalAmountOfAllPaymentsPerPeriod' => '', 	// The preapproved maximum number of all payments per period.
								   'MaxTotalAmountOfAllPayments' => '', 			// The preapproved maximum total amount of all payments.  Cannot exceed $2,000 USD or the equivalent in other currencies.
								   'Memo' => '', 									// A note about the preapproval.
								   'PaymentPeriod' => '', 							// The pament period.  One of the following:  NO_PERIOD_SPECIFIED, DAILY, WEEKLY, BIWEEKLY, SEMIMONTHLY, MONTHLY, ANNUALLY
								   'PinType' => '', 								// Whether a personal identification number is required.  It is one of the following:  NOT_REQUIRED, REQUIRED
								   'ReturnURL' => '', 								// URL to return the sender to after approving at PayPal.
								   'SenderEmail' => '', 							// Sender's email address.  If not specified, the email address of the sender who logs on to approve is used.
								   'StartingDate' => '' 							// Required.  First date for which the preapproval is valid.  Cannot be before today's date or after the ending date.
								   );
		
		$ClientDetailsFields = array(
									 'CustomerID' => '', 						// Your ID for the sender.
									 'CustomerType' => '', 						// Your ID of the type of customer.
									 'GeoLocation' => '', 						// Sender's geographic location.
									 'Model' => '', 							// A sub-id of the application
									 'PartnerName' => ''						// Your organization's name or ID.
									 );
		
		$RequestData = array(
							 'PreapprovalFields' => $PreapprovalFields, 
							 'ClientDetailsFields' => $ClientDetailsFields
							 );*/
		
		$PreapprovalFields = isset($DataArray['PreapprovalFields']) ? $DataArray['PreapprovalFields'] : array();
		$CancelURL = isset($PreapprovalFields['CancelURL']) ? $PreapprovalFields['CancelURL'] : '';
		$CurrencyCode = isset($PreapprovalFields['CurrencyCode']) ? $PreapprovalFields['CurrencyCode'] : '';
		$DateOfMonth = isset($PreapprovalFields['DateOfMonth']) ? $PreapprovalFields['DateOfMonth'] : '';
		$DayOfWeek = isset($PreapprovalFields['DayOfWeek']) ? $PreapprovalFields['DayOfWeek'] : '';
		$EndingDate = isset($PreapprovalFields['EndingDate']) ? $PreapprovalFields['EndingDate'] : '';
		$IPNNotificationURL = isset($PreapprovalFields['IPNNotificationURL']) ? $PreapprovalFields['IPNNotificationURL'] : '';
		$MaxAmountPerPayment = isset($PreapprovalFields['MaxAmountPerPayment']) ? $PreapprovalFields['MaxAmountPerPayment'] : '';
		$MaxNumberOfPayments = isset($PreapprovalFields['MaxNumberOfPayments']) ? $PreapprovalFields['MaxNumberOfPayments'] : '';
		$MaxNumberOfPaymentsPerPeriod = isset($PreapprovalFields['MaxNumberOfPaymentsPerPeriod']) ? $PreapprovalFields['MaxNumberOfPaymentsPerPeriod'] : '';
		$MaxTotalAmountOfAllPayments = isset($PreapprovalFields['MaxTotalAmountOfAllPayments']) ? $PreapprovalFields['MaxTotalAmountOfAllPayments'] : '';
		$Memo = isset($PreapprovalFields['Memo']) ? $PreapprovalFields['Memo'] : '';
		$PaymentPeriod = isset($PreapprovalFields['PaymentPeriod']) ? $PreapprovalFields['PaymentPeriod'] : '';
		$PinType = isset($PreapprovalFields['PinType']) ? $PreapprovalFields['PinType'] : '';
		$ReturnURL = isset($PreapprovalFields['ReturnURL']) ? $PreapprovalFields['ReturnURL'] : '';
		$SenderEmail = isset($PreapprovalFields['SenderEmail']) ? $PreapprovalFields['SenderEmail'] : '';
		$StartingDate = isset($PreapprovalFields['StartingDate']) ? $PreapprovalFields['StartingDate'] : '';
		
		$ClientDetailsFields = isset($DataArray['ClientDetailsFields']) ? $DataArray['ClientDetails'] : array();
		$CustomerID = isset($ClientDetailsFields['CustomerID']) ? $ClientDetailsFields['CustomerID'] : '';
		$CustomerType = isset($ClientDetailsFields['CustomerType']) ? $ClientDetailsFields['CustomerType'] : '';
		$GeoLocation = isset($ClientDetailsFields['GeoLocation']) ? $ClientDetailsFields['GeoLocation'] : '';
		$Model = isset($ClientDetailsFields['Model']) ? $ClientDetailsFields['Model'] : '';
		$PartnerName = isset($ClientDetailsFields['PartnerName']) ? $ClientDetailsFields['PartnerName'] : '';
		
		// Generate XML Request
		$XMLRequest = '<?xml version="1.0" encoding="utf-8"?>';
		$XMLRequest .= '<PreapprovalRequest xmlns="' . $this -> XMLNamespace . '">';
		$XMLRequest .= $this -> GetXMLRequestEnvelope();
		$XMLRequest .= '<cancelUrl xmlns="">' . $CancelURL . '</cancelUrl>';
		
		$XMLRequest .= '<clientDetails xmlns="">';
		$XMLRequest .= $this -> ApplicationID != '' ? '<applicationId xmlns="">' . $this -> ApplicationID . '</applicationId>' : '';
		$XMLRequest .= $CustomerID != '' ? '<customerId xmlns="">' . $CustomerID . '</customerId>' : '';
		$XMLRequest .= $CustomerType != '' ? '<customerType xmlns="">' . $CustomerType . '</customerType>' : '';
		$XMLRequest .= $this -> DeviceID != '' ? '<deviceId xmlns="">' . $this -> DeviceID . '</deviceId>' : '';
		$XMLRequest .= $GeoLocation != '' ? '<geoLocation xmlns="">' . $GeoLocation . '</geoLocation>' : '';
		$XMLRequest .= $this -> IPAddress != '' ? '<ipAddress xmlns="">' . $this -> IPAddress . '</ipAddress>' : '';
		$XMLRequest .= $Model != '' ? '<model xmlns="">' . $Model . '</model>' : '';
		$XMLRequest .= $PartnerName != '' ? '<partnerName xmlns="">' . $PartnerName . '</partnerName>' : '';
		$XMLRequest .= '</clientDetails>';
		
		$XMLRequest .= '<currencyCode xmlns="">' . $CurrencyCode . '</currencyCode>';
		$XMLRequest .= $DateOfMonth != '' ? '<dateOfMonth xmlns="">' . $DateOfMonth . '</dateOfMonth>' : '';
		$XMLRequest .= $DayOfWeek != '' ? '<dayOfWeek xmlns="">' . $DayOfWeek . '</dayOfWeek>' : '';
		$XMLRequest .= $EndingDate != '' ? '<endingDate xmlns="">' . $EndingDate . '</endingDate>' : '';
		$XMLRequest .= $IPNNotificationURL != '' ? '<ipnNotificationUrl xmlns="">' . $IPNNotificationURL . '</ipnNotificationUrl>' : '';
		$XMLRequest .= $MaxAmountPerPayment != '' ? '<maxAmountPerPayment xmlns="">' . $MaxAmountPerPayment . '</maxAmountPerPayment>' : '';
		$XMLRequest .= $MaxNumberOfPayments != '' ? '<maxNumberOfPayments xmlns="">' . $MaxNumberOfPayments . '</maxNumberOfPayments>' : '';
		$XMLRequest .= $MaxNumberOfPaymentsPerPeriod != '' ? '<maxNumberOfPaymentsPerPeriod xmlns="">' . $MaxNumberOfPaymentsPerPeriod . '</maxNumberOfPaymentsPerPeriod>' : '';
		$XMLRequest .= $MaxTotalAmountOfAllPayments != '' ? '<maxTotalAmountOfAllPayments xmlns="">' . $MaxTotalAmountOfAllPayments . '</maxTotalAmountOfAllPayments>' : '';
		$XMLRequest .= $Memo != '' ? '<memo xmlns="">' . $Memo . '</memo>' : '';
		$XMLRequest .= $PaymentPeriod != '' ? '<paymentPeriod xmlns="">' . $Memo . '</paymentPeriod>' : '';
		$XMLRequest .= $PinType != '' ? '<pinType xmlns="">' . $PinType . '</pinType>' : '';
		$XMLRequest .= $ReturnURL != '' ? '<returnUrl xmlns="">' . $ReturnURL . '</returnUrl>' : '';
		$XMLRequest .= $SenderEmail != '' ? '<senderEmail xmlns="">' . $PinType . '</SenderEmail>' : '';
		$XMLRequest .= $StartingDate != '' ? '<startingDate xmlns="">' . $StartingDate . '</startingDate>' : '';
		$XMLRequest .= '</PreapprovalRequest>';
		
		// Call the API and load XML response into DOM
		$XMLResponse = $this -> CURLRequest($XMLRequest, 'AdaptivePayments', 'Preapproval');
		$DOM = new DOMDocument();
		$DOM -> loadXML($XMLResponse);
						
		// Parse XML values
		$Fault = $DOM -> getElementsByTagName('FaultMessage') -> length > 0 ? true : false;
		$Errors = $this -> GetErrors($XMLResponse);
		$Ack = $DOM -> getElementsByTagName('ack') -> length > 0 ? $DOM -> getElementsByTagName('ack') -> item(0) -> nodeValue : '';
		$Build = $DOM -> getElementsByTagName('build') -> length > 0 ? $DOM -> getElementsByTagName('build') -> item(0) -> nodeValue : '';
		$CorrelationID = $DOM -> getElementsByTagName('correlationId') -> length > 0 ? $DOM -> getElementsByTagName('correlationId') -> item(0) -> nodeValue : '';
		$Timestamp = $DOM -> getElementsByTagName('timestamp') -> length > 0 ? $DOM -> getElementsByTagName('timestamp') -> item(0) -> nodeValue : '';
		$PreapprovalKey = $DOM -> getElementsByTagName('preapprovalKey') -> length > 0 ? $DOM -> getElementsByTagName('preapprovalKey') -> item(0) -> nodeValue: '';
		
		if($this -> Sandbox)
			$RedirectURL = 'https://www.sandbox.paypal.com/webscr?cmd=_ap-preapproval&preapprovalkey=' . $PreapprovalKey;
		elseif($this -> BetaSandbox)
			$RedirectURL = 'https://www.beta-sandbox.paypal.com/webscr?cmd=_ap-preapproval&preapprovalkey=' . $PreapprovalKey;
		else
			$RedirectURL = 'https://www.paypal.com/webscr?cmd=_ap-preapproval&preapprovalkey=' . $PreapprovalKey;
		
		$ResponseDataArray = array(
								   'Errors' => $Errors, 
								   'Ack' => $Ack, 
								   'Build' => $Build, 
								   'CorrelationID' => $CorrelationID, 
								   'Timestamp' => $Timestamp, 
								   'PreapprovalKey' => $PreapprovalKey, 
								   'RedirectURL' => $PreapprovalKey != '' ? $RedirectURL : '', 
								   'XMLRequest' => $XMLRequest, 
								   'XMLResponse' => $XMLResponse
								   );
		
		return $ResponseDataArray;
	}
	
	
	// PreapprovalDetails API
	function PreapprovalDetails($DataArray)
	{
		/*$PreapprovalDetailsFields = array(
										  'GetBillingAddress' => '', 									// Opion to get the billing address in the response.  true or false.  Only available with Advanced permissions levels.
										  'PreapprovalKey' => '' 										// Required.  A preapproval key that identifies the preapproval for which you want to retrieve details.  Returned in the PreapprovalResponse
										  );
		
		$RequestData = array(
							 'PreapprovalDetailsFields' => $PreapprovalDetailsFields
							 );*/
		
		$PreapprovalDetailsFields = isset($DataArray['PreapprovalDetailsFields']) ? $DataArray['PreapprovalDetailsFields'] : array();
		$GetBillingAddress = isset($PreapprovalDetailsFields['GetBillingAddress']) ? $PreapprovalDetailsFields['GetBillingAddress'] : '';
		$PreapprovalKey = isset($PreapprovalDetailsFields['PreapprovalKey']) ? $PreapprovalDetailsFields['PreapprovalKey'] : '';
		
		// Generate XML Request
		$XMLRequest = '<?xml version="1.0" encoding="utf-8"?>';
		$XMLRequest .= '<PreapprovalDetailsRequest xmlns="' . $this -> XMLNamespace . '">';
		$XMLRequest .= $this -> GetXMLRequestEnvelope();
		$XMLRequest .= $GetBillingAddress != '' ? '<getBillingAddress>' . $GetBillingAddress . '</getBillingAddress>' : '';
		$XMLRequest .= $PreapprovalKey != '' ? '<preapprovalKey>' . $PreapprovalKey . '</preapprovalKey>' : '';
		$XMLRequest .= '</PreapprovalDetailsRequest>';
		
		// Call the API and load XML response into DOM
		$XMLResponse = $this -> CURLRequest($XMLRequest, 'AdaptivePayments', 'PreapprovalDetails');
		$DOM = new DOMDocument();
		$DOM -> loadXML($XMLResponse);
						
		// Parse XML values
		$Fault = $DOM -> getElementsByTagName('FaultMessage') -> length > 0 ? true : false;
		$Errors = $this -> GetErrors($XMLResponse);
		$Ack = $DOM -> getElementsByTagName('ack') -> length > 0 ? $DOM -> getElementsByTagName('ack') -> item(0) -> nodeValue : '';
		$Build = $DOM -> getElementsByTagName('build') -> length > 0 ? $DOM -> getElementsByTagName('build') -> item(0) -> nodeValue : '';
		$CorrelationID = $DOM -> getElementsByTagName('correlationId') -> length > 0 ? $DOM -> getElementsByTagName('correlationId') -> item(0) -> nodeValue : '';
		$Timestamp = $DOM -> getElementsByTagName('timestamp') -> length > 0 ? $DOM -> getElementsByTagName('timestamp') -> item(0) -> nodeValue : '';
		
		$Approved = $DOM -> getElementsByTagName('approved') -> length > 0 ? $DOM -> getElementsByTagName('approved') -> item(0) -> nodeValue : '';
		$CancelURL = $DOM -> getElementsByTagName('cancelUrl') -> length > 0 ? $DOM -> getElementsByTagName('cancelUrl') -> item(0) -> nodeValue : '';
		$CurPayments = $DOM -> getElementsByTagName('curPayments') -> length > 0 ? $DOM -> getElementsByTagName('curPayments') -> item(0) -> nodeValue : '';
		$CurPaymentsAmount = $DOM -> getElementsByTagName('curPaymentsAmount') -> length > 0 ? $DOM -> getElementsByTagName('curPaymentsAmount') -> item(0) -> nodeValue : '';
		$CurPeriodAttempts = $DOM -> getElementsByTagName('curPeriodAttempts') -> length > 0 ? $DOM -> getElementsByTagName('curPeriodAttempts') -> item(0) -> nodeValue : '';
		$CurPeriodEndingDate = $DOM -> getElementsByTagName('curPeriodEndingDate') -> length > 0 ? $DOM -> getElementsByTagName('curPeriodEndingDate') -> item(0) -> nodeValue : '';
		$CurrencyCode = $DOM -> getElementsByTagName('currencyCode') -> length > 0 ? $DOM -> getElementsByTagName('currencyCode') -> item(0) -> nodeValue : '';
		$DateOfMonth = $DOM -> getElementsByTagName('dateOfMonth') -> length > 0 ? $DOM -> getElementsByTagName('dateOfMonth') -> item(0) -> nodeValue : '';
		$DayOfWeek = $DOM -> getElementsByTagName('dayOfWeek') -> length > 0 ? $DOM -> getElementsByTagName('dayOfWeek') -> item(0) -> nodeValue : '';
		$EndingDate = $DOM -> getElementsByTagName('endingDate') -> length > 0 ? $DOM -> getElementsByTagName('endingDate') -> item(0) -> nodeValue : '';
		$IPNNotificationURL = $DOM -> getElementsByTagName('ipnNotificationUrl') -> length > 0 ? $DOM -> getElementsByTagName('ipnNotificationUrl') -> item(0) -> nodeValue : '';
		$MaxAmountPerPayment = $DOM -> getElementsByTagName('maxAmountPerPayment') -> length > 0 ? $DOM -> getElementsByTagName('maxAmountPerPayment') -> item(0) -> nodeValue : '';
		$MaxNumberOfPayments = $DOM -> getElementsByTagName('maxNumberOfPayments') -> length > 0 ? $DOM -> getElementsByTagName('maxNumberOfPayments') -> item(0) -> nodeValue : '';
		$MaxNumberOfPaymentsPerPeriod = $DOM -> getElementsByTagName('maxNumberOfPaymentsPerPeriod') -> length > 0 ? $DOM -> getElementsByTagName('maxNumberOfPaymentsPerPeriod') -> item(0) -> nodeValue : '';
		$MaxTotalAmountOfAllPayments = $DOM -> getElementsByTagName('maxTotalAmountOfAllPayments') -> length > 0 ? $DOM -> getElementsByTagName('maxTotalAmountOfAllPayments') -> item(0) -> nodeValue : '';
		$Memo = $DOM -> getElementsByTagName('memo') -> length > 0 ? $DOM -> getElementsByTagName('memo') -> item(0) -> nodeValue : '';
		$PaymentPeriod = $DOM -> getElementsByTagName('paymentPeriod') -> length > 0 ? $DOM -> getElementsByTagName('paymentPeriod') -> item(0) -> nodeValue : '';
		$PinType = $DOM -> getElementsByTagName('pinType') -> length > 0 ? $DOM -> getElementsByTagName('pinType') -> item(0) -> nodeValue : '';
		$ReturnUrl = $DOM -> getElementsByTagName('returnUrl') -> length > 0 ? $DOM -> getElementsByTagName('returnUrl') -> item(0) -> nodeValue : '';
		$SenderEmail = $DOM -> getElementsByTagName('senderEmail') -> length > 0 ? $DOM -> getElementsByTagName('senderEmail') -> item(0) -> nodeValue : '';
		$StartingDate = $DOM -> getElementsByTagName('startingDate') -> length > 0 ? $DOM -> getElementsByTagName('startingDate') -> item(0) -> nodeValue : '';
		$Status = $DOM -> getElementsByTagName('status') -> length > 0 ? $DOM -> getElementsByTagName('status') -> item(0) -> nodeValue : '';
		
		$ResponseDataArray = array(
								   'Errors' => $Errors, 
								   'Ack' => $Ack, 
								   'Build' => $Build, 
								   'CorrelationID' => $CorrelationID, 
								   'Timestamp' => $Timestamp, 
								   'Approved' => $Approved, 
								   'CancelURL' => $CancelURL, 
								   'CurPayments' => $CurPayments, 
								   'CurPaymentsAmount' => $CurPaymentsAmount, 
								   'CurPeriodAttempts' => $CurPeriodAttempts, 
								   'CurPeriodEndingDate' => $CurPeriodEndingDate, 
								   'CurrencyCode' => $CurrencyCode, 
								   'DateOfMonth' => $DateOfMonth, 
								   'DayOfWeek' => $DayOfWeek, 
								   'EndingDate' => $EndingDate, 
								   'IPNNotificationURL' => $IPNNotificationURL, 
								   'MaxAmountPerPayment' => $MaxAmountPerPayment, 
								   'MaxNumberOfPayments' => $MaxNumberOfPayments, 
								   'MaxNumberOfPaymentsPerPeriod' => $MaxNumberOfPaymentsPerPeriod, 
								   'MaxTotalAmountOfAllPayments' => $MaxTotalAmountOfAllPayments, 
								   'Memo' => $Memo, 
								   'PaymentPeriod' => $PaymentPeriod, 
								   'PinType' => $PinType, 
								   'ReturnUrl' => $ReturnUrl, 
								   'SenderEmail' => $SenderEmail, 
								   'StartingDate' => $StartingDate, 
								   'Status' => $Status, 
								   'XMLRequest' => $XMLRequest, 
								   'XMLResponse' => $XMLResponse
								   );
		
		return $ResponseDataArray;
	}
	
	
	// CancelPreapproval API
	function CancelPreapproval($DataArray)
	{
		/*$CancelPreapprovalFields = array(
										 'PreapprovalKey' => ''										// Required.  Preapproval key that identifies the preapproval to be canceled.
										 );
		
		$RequestData = array('CancelPreapprovalFields' => $CancelPreapprovalFields);*/
		
		$CancelPreapprovalFields = isset($DataArray['CancelPreapprovalFields']) ? $DataArray['CancelPreapprovalFields'] : array();
		$PreapprovalKey = isset($CancelPreapprovalFields['PreapprovalKey']) ? $CancelPreapprovalFields['PreapprovalKey'] : '';
		
		// Generate XML Request
		$XMLRequest = '<?xml version="1.0" encoding="utf-8"?>';
		$XMLRequest .= '<CancelPreapprovalRequest xmlns="' . $this -> XMLNamespace . '">';
		$XMLRequest .= $this -> GetXMLRequestEnvelope();
		$XMLRequest .= $PreapprovalKey != '' ? '<preapprovalKey>' . $PreapprovalKey . '</preapprovalKey>' : '';
		$XMLRequest .= '</CancelPreapprovalRequest>';
		
		// Call the API and load XML response into DOM
		$XMLResponse = $this -> CURLRequest($XMLRequest, 'AdaptivePayments', 'CancelPreapproval');
		$DOM = new DOMDocument();
		$DOM -> loadXML($XMLResponse);
						
		// Parse XML values
		$Fault = $DOM -> getElementsByTagName('FaultMessage') -> length > 0 ? true : false;
		$Errors = $this -> GetErrors($XMLResponse);
		$Ack = $DOM -> getElementsByTagName('ack') -> length > 0 ? $DOM -> getElementsByTagName('ack') -> item(0) -> nodeValue : '';
		$Build = $DOM -> getElementsByTagName('build') -> length > 0 ? $DOM -> getElementsByTagName('build') -> item(0) -> nodeValue : '';
		$CorrelationID = $DOM -> getElementsByTagName('correlationId') -> length > 0 ? $DOM -> getElementsByTagName('correlationId') -> item(0) -> nodeValue : '';
		$Timestamp = $DOM -> getElementsByTagName('timestamp') -> length > 0 ? $DOM -> getElementsByTagName('timestamp') -> item(0) -> nodeValue : '';
		
		$ResponseDataArray = array(
								   'Errors' => $Errors, 
								   'Ack' => $Ack, 
								   'Build' => $Build, 
								   'CorrelationID' => $CorrelationID, 
								   'Timestamp' => $Timestamp, 
								   'XMLRequest' => $XMLRequest, 
								   'XMLResponse' => $XMLResponse
								   );
		
		return $ResponseDataArray;
	}
	
	
	// Refund API
	function Refund($DataArray)
	{
		/*$RefundFields = array(
							  'CurrencyCode' => '', 											// Required.  Must specify code used for original payment.  You do not need to specify if you use a payKey to refund a completed transaction.
							  'PayKey' => '',  													// Required.  The key used to create the payment that you want to refund.
							  'TransactionID' => '', 											// Required.  The PayPal transaction ID associated with the payment that you want to refund.
							  'TrackingID' => ''												// Required.  The tracking ID associated with the payment that you want to refund.
							  );
		
		$Receivers = array();
		$Receiver = array(
						  'Email' => '',									// A receiver's email address. 
						  'Amount' => '', 									// Amount to be debited to the receiver's account.
						  'Primary' => '', 									// Set to true to indicate a chained payment.  Only one receiver can be a primary receiver.  Omit this field, or set to false for simple and parallel payments.
						  'InvoiceID' => '', 								// The invoice number for the payment.  This field is only used in Pay API operation.
						  'PaymentType' => ''								// The transaction subtype for the payment.  Allowable values are: GOODS, SERVICE
						  );
		
		array_push($Receivers, $Receiver);
		
		$RequestData = array(
							 'RefundFields' => $RefundFields, 
							 'Receivers' => $Receivers
							 );*/
		
		$RefundFields = isset($DataArray['RefundFields']) ? $DataArray['RefundFields'] : array();
		$CurrencyCode = isset($RefundFields['CurrencyCode']) ? $RefundFields['CurrencyCode'] : '';
		$PayKey = isset($RefundFields['PayKey']) ? $RefundFields['PayKey'] : '';
		$TransactionID = isset($RefundFields['TransactionID']) ? $RefundFields['TransactionID'] : '';
		$TrackingID = isset($RefundFields['TrackingID']) ? $RefundFields['TrackingID'] : '';
		
		$Receivers = isset($DataArray['Receivers']) ? $DataArray['Receivers'] : array();
		$Amount = isset($Receivers['Amount']) ? $Receivers['Amount'] : '';
		$Email = isset($Receivers['Email']) ? $Receivers['Email'] : '';
		$InvoiceID = isset($Receivers['InvoiceID']) ? $Receivers['InvoiceID'] : '';
		$Primary = isset($Receivers['Primary']) ? $Receivers['Primary'] : '';
		$PaymentType = isset($Receivers['PaymentType']) ? $Receivers['PaymentType'] : '';
		
		// Generate XML Request
		$XMLRequest = '<?xml version="1.0" encoding="utf-8"?>';
		$XMLRequest .= '<RefundRequest xmlns="' . $this -> XMLNamespace . '">';
		$XMLRequest .= $this -> GetXMLRequestEnvelope();
		$XMLRequest .= $CurrencyCode != '' ? '<currencyCode>' . $CurrencyCode . '</currencyCode>' : '';
		$XMLRequest .= $PayKey != '' ? '<payKey>' . $PayKey . '</payKey>' : '';
		
		$XMLRequest .= '<receiverList xmlns="">';
		foreach($Receivers as $Receiver)
		{
			$XMLRequest .= '<receiver xmlns="">';
			$XMLRequest .= '<amount xmlns="">' . $Receiver['Amount'] . '</amount>';
			$XMLRequest .= '<email xmlns="">' . $Receiver['Email'] . '</email>';
			$XMLRequest .= $Receiver['InvoiceID'] != '' ? '<invoiceId xmlns="">' . $Receiver['InvoiceID'] . '</invoiceId>' : '';
			$XMLRequest .= $Receiver['PaymentType'] != '' ? '<paymentType xmlns="">' . $Receiver['PaymentType'] . '</paymentType>' : '';
			$XMLRequest .= '</receiver>';
		}
		$XMLRequest .= '</receiverList>';
		
		$XMLRequest .= $TransactionID != '' ? '<transactionId>' . $TransactionID . '</transactionId>' : '';
		$XMLRequest .= $TrackingID != '' ? '<trackingId>' . $TrackingID . '</trackingId>' : '';
		$XMLRequest .= '</RefundRequest>';
		
		// Call the API and load XML response into DOM
		$XMLResponse = $this -> CURLRequest($XMLRequest, 'AdaptivePayments', 'Refund');
		$DOM = new DOMDocument();
		$DOM -> loadXML($XMLResponse);
						
		// Parse XML values
		$Fault = $DOM -> getElementsByTagName('FaultMessage') -> length > 0 ? true : false;
		$Errors = $this -> GetErrors($XMLResponse);
		$Ack = $DOM -> getElementsByTagName('ack') -> length > 0 ? $DOM -> getElementsByTagName('ack') -> item(0) -> nodeValue : '';
		$Build = $DOM -> getElementsByTagName('build') -> length > 0 ? $DOM -> getElementsByTagName('build') -> item(0) -> nodeValue : '';
		$CorrelationID = $DOM -> getElementsByTagName('correlationId') -> length > 0 ? $DOM -> getElementsByTagName('correlationId') -> item(0) -> nodeValue : '';
		$Timestamp = $DOM -> getElementsByTagName('timestamp') -> length > 0 ? $DOM -> getElementsByTagName('timestamp') -> item(0) -> nodeValue : '';
		
		$EncryptedTransactionID = $DOM -> getElementsByTagName('encryptedRefundTransactionId') -> length > 0 ? $DOM -> getElementsByTagName('encryptedRefundTransactionId') -> item(0) -> nodeValue : '';
		$RefundFeeAmount = $DOM -> getElementsByTagName('refundFeeAmount') -> length > 0 ? $DOM -> getElementsByTagName('refundFeeAmount') -> item(0) -> nodeValue : '';
		$RefundGrossAmount = $DOM -> getElementsByTagName('refundGrossAmount') -> length > 0 ? $DOM -> getElementsByTagName('refundGrossAmount') -> item(0) -> nodeValue : '';
		$RefundHasBecomeFull = $DOM -> getElementsByTagName('refundHasBecomeFull') -> length > 0 ? $DOM -> getElementsByTagName('refundHasBecomeFull') -> item(0) -> nodeValue : '';
		$RefundNetAmount = $DOM -> getElementsByTagName('refundNetAmount') -> length > 0 ? $DOM -> getElementsByTagName('refundNetAmount') -> item(0) -> nodeValue : '';
		$RefundStatus = $DOM -> getElementsByTagName('refundStatus') -> length > 0 ? $DOM -> getElementsByTagName('refundStatus') -> item(0) -> nodeValue : '';
		$RefundTransactionStatus = $DOM -> getElementsByTagName('refundTransactionStatus') -> length > 0 ? $DOM -> getElementsByTagName('refundTransactionStatus') -> item(0) -> nodeValue : '';
		$TotalOfAllRefunds = $DOM -> getElementsByTagName('totalOfAllRefunds') -> length > 0 ? $DOM -> getElementsByTagName('totalOfAllRefunds') -> item(0) -> nodeValue : '';
		
		$Amount = $DOM -> getElementsByTagName('amount') -> length > 0 ? $DOM -> getElementsByTagName('amount') -> item(0) -> nodeValue : '';
		$Email = $DOM -> getElementsByTagName('email') -> length > 0 ? $DOM -> getElementsByTagName('email') -> item(0) -> nodeValue : '';
		$InvoiceID = $DOM -> getElementsByTagName('invoiceId') -> length > 0 ? $DOM -> getElementsByTagName('invoiceId') -> item(0) -> nodeValue : '';
		$PaymentType = $DOM -> getElementsByTagName('paymentType') -> length > 0 ? $DOM -> getElementsByTagName('paymentType') -> item(0) -> nodeValue : '';
		$Primary = $DOM -> getElementsByTagName('primary') -> length > 0 ? $DOM -> getElementsByTagName('primary') -> item(0) -> nodeValue : '';
		$Receiver = array(
						'Amount' => $Amount, 
						'Email' => $Email, 
						'InvoiceID' => $InvoiceID, 
						'PaymentType' => $PaymentType, 
						'Primary' => $Primary
						  );
		
		$ResponseDataArray = array(
								   'Errors' => $Errors, 
								   'Ack' => $Ack, 
								   'Build' => $Build, 
								   'CorrelationID' => $CorrelationID, 
								   'Timestamp' => $Timestamp, 
								   'EncryptedTransactionID' => $EncryptedTransactionID, 
								   'RefundFeeAmount' => $RefundFeeAmount, 
								   'RefundGrossAmount' => $RefundGrossAmount, 
								   'RefundHasBecomeFull' => $RefundHasBecomeFull, 
								   'RefundNetAmount' => $RefundNetAmount, 
								   'RefundStatus' => $RefundStatus, 
								   'RefundTransactionStatus' => $RefundTransactionStatus, 
								   'TotalOfAllRefunds' => $TotalOfAllRefunds, 
								   'Receiver' => $Receiver
								   );
		
		return $ResponseDataArray;
	}
	
	
	// ConvertCurrency API
	function ConvertCurrency($DataArray)
	{
		/*$BaseAmountList = array();
		$BaseAmountData = array(
								'Code' => '', 						// Currency code.
								'Amount' => ''						// Amount to be converted.
								);
		array_push($BaseAmountList, $BaseAmountData);
		
		$ConvertToCurrencyList = array('USD', 'AUD', 'CAD');			// Currency Codes*/
		
		$BaseAmountList = isset($DataArray['BaseAmountList']) ? $DataArray['BaseAmountList'] : array();
		$ConvertToCurrencyList = isset($DataArray['ConvertToCurrencyList']) ? $DataArray['ConvertToCurrencyList'] : array();
		
		// Generate XML Request
		$XMLRequest = '<?xml version="1.0" encoding="utf-8"?>';
		$XMLRequest .= '<ConvertCurrencyRequest xmlns="' . $this -> XMLNamespace . '">';
		$XMLRequest .= $this -> GetXMLRequestEnvelope();
		$XMLRequest .= '<baseAmountList xmlns="">';
		foreach($BaseAmountList as $BaseAmount)
		{
			$XMLRequest .= '<currency xmlns="">';
			$XMLRequest .= '<code xmlns="">' . $BaseAmount['Code'] . '</code>';
			$XMLRequest .= '<amount xmlns="">' . $BaseAmount['Amount'] . '</amount>';
			$XMLRequest .= '</currency>';
		}
		$XMLRequest .= '</baseAmountList>';
		$XMLRequest .= '<convertToCurrencyList xmlns="">';
		foreach($ConvertToCurrencyList as $CurrencyCode)
			$XMLRequest .= '<currencyCode xmlns="">' . $CurrencyCode . '</currencyCode>';
		$XMLRequest .= '</convertToCurrencyList>';
		$XMLRequest .= '</ConvertCurrencyRequest>';
		
		// Call the API and load XML response into DOM
		$XMLResponse = $this -> CURLRequest($XMLRequest, 'AdaptivePayments', 'ConvertCurrency');
		$DOM = new DOMDocument();
		$DOM -> loadXML($XMLResponse);
						
		// Parse XML values
		$Fault = $DOM -> getElementsByTagName('FaultMessage') -> length > 0 ? true : false;
		$Errors = $this -> GetErrors($XMLResponse);
		$Ack = $DOM -> getElementsByTagName('ack') -> length > 0 ? $DOM -> getElementsByTagName('ack') -> item(0) -> nodeValue : '';
		$Build = $DOM -> getElementsByTagName('build') -> length > 0 ? $DOM -> getElementsByTagName('build') -> item(0) -> nodeValue : '';
		$CorrelationID = $DOM -> getElementsByTagName('correlationId') -> length > 0 ? $DOM -> getElementsByTagName('correlationId') -> item(0) -> nodeValue : '';
		$Timestamp = $DOM -> getElementsByTagName('timestamp') -> length > 0 ? $DOM -> getElementsByTagName('timestamp') -> item(0) -> nodeValue : '';
		
		$CurrencyConversionListArray = array();
		$CurrencyConversionListDOM = $DOM -> getElementsByTagName('currencyConversionList') -> length > 0 ? $DOM -> getElementsByTagName('currencyConversionList') : array();
		
		foreach($CurrencyConversionListDOM as $CurrencyConversionList)
		{
			$BaseAmountDOM = $CurrencyConversionList -> getElementsByTagName('baseAmount') -> length > 0 ? $CurrencyConversionList -> getElementsByTagName('baseAmount') : array();		
			foreach($BaseAmountDOM as $BaseAmount)
			{
				$BaseAmountCurrencyCode = $BaseAmount -> getElementsByTagName('code') -> length > 0 ? $BaseAmount -> getElementsByTagName('code') -> item(0) -> nodeValue : '';
				$BaseAmountValue = $BaseAmount -> getElementsByTagName('amount') -> length > 0 ? $BaseAmount -> getElementsByTagName('amount') -> item(0) -> nodeValue : '';
				$BaseAmountArray = array(
										 'Code' => $BaseAmountCurrencyCode, 
										 'Amount' => $BaseAmountValue
										 );
			}
			
			$CurrencyListArray = array();
			$CurrencyListDOM = $CurrencyConversionList -> getElementsByTagName('currency') -> length > 0 ? $CurrencyConversionList -> getElementsByTagName('currency') : array();
			foreach($CurrencyListDOM as $CurrencyList)
			{
				$ListCurrencyCode = $CurrencyList -> getElementsByTagName('code') -> length > 0 ? $CurrencyList -> getElementsByTagName('code') -> item(0) -> nodeValue : '';
				$ListCurrencyAmount = $CurrencyList -> getElementsByTagName('amount') -> length > 0 ? $CurrencyList -> getElementsByTagName('amount') -> item(0) -> nodeValue : '';
				$ListCurrencyCurrent = array(
											 'Code' => $ListCurrencyCode, 
											 'Amount' => $ListCurrencyAmount
											 );
				array_push($CurrencyListArray, $ListCurrencyCurrent);
			}
			
			$CurrencyConversionListCurrent = array(
												   'BaseAmount' => $BaseAmountArray, 
												   'CurrencyList' => $CurrencyListArray
												   );
			
			array_push($CurrencyConversionListArray, $CurrencyConversionListCurrent);
		}
		
		$ResponseDataArray = array(
								   'Errors' => $Errors, 
								   'Ack' => $Ack, 
								   'Build' => $Build, 
								   'CorrelationID' => $CorrelationID, 
								   'Timestamp' => $Timestamp, 
								   'CurrencyConversionList' => $CurrencyConversionListArray, 
								   'XMLRequest' => $XMLRequest, 
								   'XMLResponse' => $XMLResponse
								   );
		
		return $ResponseDataArray;
	}
	
	
	// Adaptive Accounts
	function CreateAccount($DataArray)
	{
		/*$CreateAccountFields = array(
									 'AccountType' => '',  										// Required.  The type of account to be created.  Personal or Premier
									 'CitizenshipCountryCode' => '',  							// Required.  The code of the country to be associated with the business account.  This field does not apply to personal or premier accounts.
									 'ContactPhoneNumber' => '', 								// Required.  The phone number associated with the new account.
									 'ReturnURL' => '', 										// Required.  URL to redirect the user to after leaving PayPal pages.
									 'CurrencyCode' => '', 										// Required.  Currency code associated with the new account.  
									 'DateOfBirth' => '', 										// Date of birth of the account holder.  YYYY-MM-DDZ format.  For example, 1970-01-01Z
 									 'EmailAddress' => '', 										// Required.  Email address.
									 'Saluation' => '', 										// A saluation for the account holder.
									 'FirstName' => '', 										// Required.  First name of the account holder.
									 'MiddleName' => '', 										// Middle name of the account holder.
									 'LastName' => '', 											// Required.  Last name of the account holder.
									 'Suffix' => '' 											// Suffix name for the account holder.
									 'NotificationURL' => '', 									// URL for IPN
									 'PreferredLanguageCode' => '', 							// Required.  The code indicating the language to be associated with the new account.
									 'RegistrationType' => '' 									// Required.  Whether the PayPal user will use a mobile device or the web to complete registration.  This determins whether a key or a URL is returned for the redirect URL.  Allowable values are:  Web
									);
		
		$Address = array(
					   'Line1' => '', 															// Required.  Street address.
					   'Line2' => '', 															// Street address 2.
					   'City' => '', 															// Required.  City
					   'State' => '', 															// State or Province
					   'PostalCode' => '', 														// Postal code
					   'CountryCode' => ''														// Required.  The country code.
					   );
		
		$PartnerFields = array(
							   'Field1' => '', 											// Custom field for use however needed
							   'Field2' => '', 											
							   'Field3' => '', 
							   'Field4' => '', 
							   'Field5' => ''
							   );
		
		$CreateAccountData = array(
								   'CreateAccountFields' => $CreateAccountFields, 
								   'Address' => $Address, 
								   'PartnerFields' => $PartnerFields
								   );*/
		
		$CreateAccountFields = isset($DataArray['CreateAccountFields']) ? $DataArray['CreateAccountFields'] : array();
		$AccountType = isset($CreateAccountFields['AccountType']) ? $CreateAccountFields['AccountType'] : '';
		$CitizenshipCountryCode = isset($CreateAccountFields['CitizenshipCountryCode']) ? $CreateAccountFields['CitizenshipCountryCode'] : '';
		$ContactPhoneNumber = isset($CreateAccountFields['ContactPhoneNumber']) ? $CreateAccountFields['ContactPhoneNumber'] : '';
		$ReturnURL = isset($CreateAccountFields['ReturnURL']) ? $CreateAccountFields['ReturnURL'] : '';
		$CurrencyCode = isset($CreateAccountFields['CurrencyCode']) ? $CreateAccountFields['CurrencyCode'] : '';
		$DateOfBirth = isset($CreateAccountFields['DateOfBirth']) ? $CreateAccountFields['DateOfBirth'] : '';
		$EmailAddress = isset($CreateAccountFields['EmailAddress']) ? $CreateAccountFields['EmailAddress'] : '';
		$Salutation = isset($CreateAccountFields['Salutation']) ? $CreateAccountFields['Salutation'] : '';
		$FirstName = isset($CreateAccountFields['FirstName']) ? $CreateAccountFields['FirstName'] : '';
		$MiddleName = isset($CreateAccountFields['MiddleName']) ? $CreateAccountFields['MiddleName'] : '';
		$LastName = isset($CreateAccountFields['LastName']) ? $CreateAccountFields['LastName'] : '';
		$Suffix = isset($CreateAccountFields['Suffix']) ? $CreateAccountFields['Suffix'] : '';
		$NotificationURL = isset($CreateAccountFields['NotificationURL']) ? $CreateAccountFields['NotificationURL'] : '';
		$PreferredLanguageCode = isset($CreateAccountFields['PreferredLanguageCode']) ? $CreateAccountFields['PreferredLanguageCode'] : 'en_US';
		$RegistrationType = isset($CreateAccountFields['RegistrationType']) ? $CreateAccountFields['RegistrationType'] : 'Web';
		
		$Address = isset($DataArray['Address']) ? $DataArray['Address'] : array();
		$Line1 = isset($Address['Line1']) ? $Address['Line1'] : '';
		$Line2 = isset($Address['Line2']) ? $Address['Line2'] : '';
		$City = isset($Address['City']) ? $Address['City'] : '';
		$State = isset($Address['State']) ? $Address['State'] : '';
		$PostalCode = isset($Address['PostalCode']) ? $Address['PostalCode'] : '';
		$CountryCode = isset($Address['CountryCode']) ? $Address['CountryCode'] : '';
		
		$PartnerFields = isset($DataArray['PartnerFields']) ? $DataArray['PartnerFields'] : array();
		$PartnerField1 = isset($PartnerFields['Field1']) ? $PartnerFields['Field1'] : '';
		$PartnerField2 = isset($PartnerFields['Field2']) ? $PartnerFields['Field2'] : '';
		$PartnerField3 = isset($PartnerFields['Field3']) ? $PartnerFields['Field3'] : '';
		$PartnerField4 = isset($PartnerFields['Field4']) ? $PartnerFields['Field4'] : '';
		$PartnerField5 = isset($PartnerFields['Field5']) ? $PartnerFields['Field5'] : '';
		
		// Generate XML Request
		$XMLRequest = '<?xml version="1.0" encoding="utf-8"?>';
		$XMLRequest .= '<CreateAccountRequest xmlns="' . $this -> XMLNamespace . '">';
		$XMLRequest .= $this -> GetXMLRequestEnvelope();
		$XMLRequest .= '<accountType xmlns="">' . $AccountType . '</accountType>';
		$XMLRequest .= '<emailAddress xmlns="">' . $EmailAddress . '</emailAddress>';
		$XMLRequest .= '<name xmlns="">';
		$XMLRequest .= $Salutation != '' ? '<salutation xmlns="">' . $Salutation . '</salutation>' : '';
		$XMLRequest .= '<firstName xmlns="">' . $FirstName . '</firstName>';
		$XMLRequest .= $MiddleName != '' ? '<middleName xmlns="">' . $MiddleName . '</middleName>' : '';
		$XMLRequest .= '<lastName xmlns="">' . $LastName . '</lastName>';
		$XMLRequest .= $Suffix != '' ? '<suffix xmlns="">' . $Suffix . '</suffix>' : '';
		$XMLRequest .= '</name>';
		$XMLRequest .= $DateOfBirth != '' ? '<dateOfBirth xmlns="">' . $DateOfBirth . '</dateOfBirth>' : '';
		$XMLRequest .= '<address xmlns="">';
		$XMLRequest .= '<line1 xmlns="">' . $Line1 . '</line1>';
		$XMLRequest .= $Line2 != '' ? '<line2 xmlns="">' . $Line2 . '</line2>' : '';
		$XMLRequest .= '<city xmlns="">' . $City . '</city>';
		$XMLRequest .= $State != '' ? '<state xmlns="">' . $State . '</state>' : '';
		$XMLRequest .= $PostalCode != '' ? '<postalCode xmlns="">' . $PostalCode . '</postalCode>' : '';
		$XMLRequest .= '<countryCode xmlns="">' . $CountryCode . '</countryCode>';
		$XMLRequest .= '</address>';
		$XMLRequest .= '<contactPhoneNumber xmlns="">' . $ContactPhoneNumber . '</contactPhoneNumber>';
		$XMLRequest .= '<currencyCode xmlns="">' . $CurrencyCode . '</currencyCode>';
		$XMLRequest .= '<citizenshipCountryCode xmlns="">' . $CitizenshipCountryCode . '</citizenshipCountryCode>';
		$XMLRequest .= '<preferredLanguageCode xmlns="">' . $PreferredLanguageCode . '</preferredLanguageCode>';
		$XMLRequest .= $NotificationURL != '' ? '<notificationURL xmlns="">' . $NotificationURL . '</notificationURL>' : '';
		$XMLRequest .= $PartnerField1 != '' ? '<partnerField1 xmlns="">' . $PartnerField1 . '</partnerField1>' : '';
		$XMLRequest .= $PartnerField2 != '' ? '<partnerField2 xmlns="">' . $PartnerField2 . '</partnerField2>' : '';
		$XMLRequest .= $PartnerField3 != '' ? '<partnerField3 xmlns="">' . $PartnerField3 . '</partnerField3>' : '';
		$XMLRequest .= $PartnerField4 != '' ? '<partnerField4 xmlns="">' . $PartnerField4 . '</partnerField4>' : '';
		$XMLRequest .= $PartnerField5 != '' ? '<partnerField5 xmlns="">' . $PartnerField5 . '</partnerField5>' : '';
		$XMLRequest .= '<registrationType xmlns="">' . $RegistrationType . '</registrationType>';
		$XMLRequest .= '<createAccountWebOptions xmlns="">';
		$XMLRequest .= '<returnUrl xmlns="">' . $ReturnURL . '</returnUrl>';
		$XMLRequest .= '</createAccountWebOptions>';
		$XMLRequest .= '</CreateAccountRequest>';
				
		// Call the API and load XML response into DOM
		$XMLResponse = $this -> CURLRequest($XMLRequest, 'AdaptiveAccounts', 'CreateAccount');
		$DOM = new DOMDocument();
		$DOM -> loadXML($XMLResponse);
		
		// Parse XML values
		$Fault = $DOM -> getElementsByTagName('FaultMessage') -> length > 0 ? true : false;
		$Errors = $this -> GetErrors($XMLResponse);
		$Ack = $DOM -> getElementsByTagName('ack') -> length > 0 ? $DOM -> getElementsByTagName('ack') -> item(0) -> nodeValue : '';
		$Build = $DOM -> getElementsByTagName('build') -> length > 0 ? $DOM -> getElementsByTagName('build') -> item(0) -> nodeValue : '';
		$CorrelationID = $DOM -> getElementsByTagName('correlationId') -> length > 0 ? $DOM -> getElementsByTagName('correlationId') -> item(0) -> nodeValue : '';
		$Timestamp = $DOM -> getElementsByTagName('timestamp') -> length > 0 ? $DOM -> getElementsByTagName('timestamp') -> item(0) -> nodeValue : '';
		
		$CreateAccountKey = $DOM -> getElementsByTagName('createAccountKey') -> length > 0 ? $DOM -> getElementsByTagName('createAccountKey') -> item(0) -> nodeValue : '';
		$ExecStatus = $DOM -> getElementsByTagName('execStatus') -> length > 0 ? $DOM -> getElementsByTagName('execStatus') -> item(0) -> nodeValue : '';
		$RedirectURL = $DOM -> getElementsByTagName('redirectURL') -> length > 0 ? $DOM -> getElementsByTagName('redirectURL') -> item(0) -> nodeValue : '';
		
		$ResponseDataArray = array(
								   'Errors' => $Errors, 
								   'Ack' => $Ack, 
								   'Build' => $Build, 
								   'CorrelationID' => $CorrelationID, 
								   'Timestamp' => $Timestamp, 
								   'CreateAccountKey' => $CreateAccountKey, 
								   'ExecStatus' => $ExecStatus, 
								   'RedirectURL' => $RedirectURL, 
								   'XMLRequest' => $XMLRequest, 
								   'XMLResponse' => $XMLResponse
								   );
		
		return $ResponseDataArray;
		
	}
	
} // End PayPalAdaptivePayments Class
?>