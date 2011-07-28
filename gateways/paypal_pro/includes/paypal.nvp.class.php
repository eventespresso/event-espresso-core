<?php
/*
	**************************************************
	Angell EYE : www.angelleye.com
	PayPal Pro NVP API Documentation : September 2010
	API Version 64.0
	**************************************************
*/


class PayPal
{

	var $APIUsername = '';
	var $APIPassword = '';
	var $APISignature = '';
	var $APISubject = '';
	var $APIVersion = '';
	var $APIMode = '';
	var $EndPointURL = '';
	var $Sandbox = '';
	var $BetaSandbox = '';
	var $PathToCertKeyPEM = '';
	var $SSL = '';
	
	function PayPal($DataArray)
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
		$this -> PathToCertKeyPEM = '/path/to/cert/pem.txt';
		$this -> SSL = $_SERVER['SERVER_PORT'] == '443' ? true : false;
		$this -> APISubject = isset($DataArray['APISubject']) ? $DataArray['APISubject'] : '';
		
		if($this -> Sandbox || $this -> BetaSandbox)
		{
			if($this -> BetaSandbox)
			{
				# Beta Sandbox
				$this -> APIUsername = isset($DataArray['APIUsername']) && $DataArray['APIUsername'] != '' ? $DataArray['APIUsername'] : '';
				$this -> APIPassword = isset($DataArray['APIPassword']) && $DataArray['APIPassword'] != '' ? $DataArray['APIPassword'] : '';
				$this -> APISignature = isset($DataArray['APISignature']) && $DataArray['APISignature'] != '' ? $DataArray['APISignature'] : '';
				$this -> EndPointURL = isset($DataArray['EndPointURL']) && $DataArray['EndPointURL'] != '' ? $DataArray['EndPointURL'] : 'https://api-3t.beta-sandbox.paypal.com/nvp';	
			}
			else
			{
				#Sandbox
				$this -> APIUsername = isset($DataArray['APIUsername']) && $DataArray['APIUsername'] != '' ? $DataArray['APIUsername'] : '';
				$this -> APIPassword = isset($DataArray['APIPassword']) && $DataArray['APIPassword'] != '' ? $DataArray['APIPassword'] : '';
				$this -> APISignature = isset($DataArray['APISignature']) && $DataArray['APISignature'] != '' ? $DataArray['APISignature'] : '';
				$this -> EndPointURL = isset($DataArray['EndPointURL']) && $DataArray['EndPointURL'] != '' ? $DataArray['EndPointURL'] : 'https://api-3t.sandbox.paypal.com/nvp';	
			}
		}
		else
		{
			$this -> APIUsername = isset($DataArray['APIUsername']) && $DataArray['APIUsername'] != '' ? $DataArray['APIUsername'] : '';
			$this -> APIPassword = isset($DataArray['APIPassword']) && $DataArray['APIPassword'] != '' ? $DataArray['APIPassword'] : '';
			$this -> APISignature = isset($DataArray['APISignature']) && $DataArray['APISignature'] != '' ? $DataArray['APISignature'] : '';
			$this -> EndPointURL = isset($DataArray['EndPointURL']) && $DataArray['EndPointURL'] != ''  ? $DataArray['EndPointURL'] : 'https://api-3t.paypal.com/nvp';
		}
		
		// Create the NVP credentials string which is required in all calls.
		$this -> NVPCredentials = 'USER=' . $this -> APIUsername . '&PWD=' . $this -> APIPassword . '&VERSION=' . $this -> APIVersion;
		$this -> NVPCredentials .= $this -> APISubject != '' ? 'SUBJECT=' . $this -> APISubject : '';
		$this -> NVPCredentials .= $this -> APIMode == 'Signature' ? '&SIGNATURE=' . $this -> APISignature : '';
		
		$this -> Countries = array(
							'Afghanistan' => 'AF',
							'ÌÉland Islands' => 'AX',
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
						
		$this -> AVSCodes = array("A" => "Address Matches Only (No ZIP)", 
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
										'AUD' => 'Austrailian Dollar', 
										'BRL' => 'Brazilian Real', 
										'CAD' => 'Canadian Dollar', 
										'CZK' => 'Czeck Koruna', 
										'DKK' => 'Danish Krone', 
										'EUR' => 'Euro', 
										'HKD' => 'Hong Kong Dollar', 
										'HUF' => 'Hungarian Forint', 
										'ILS' => 'Israeli New Sheqel', 
										'JPY' => 'Japanese Yen', 
										'MYR' => 'Malaysian Ringgit', 
										'MXN' => 'Mexican Peso', 
										'NOK' => 'Norwegian Krone', 
										'NZD' => 'New Zealand Dollar', 
										'PHP' => 'Philippine Peso', 
										'PLN' => 'Polish Zloty', 
										'GBP' => 'Pound Sterling', 
										'SGD' => 'Singapore Dollar', 
										'SEK' => 'Swedish Krona', 
										'CHF' => 'Swiss Franc', 
										'TWD' => 'Taiwan New Dollar', 
										'THB' => 'Thai Baht', 
										'USD' => 'U.S. Dollar'
										);
		
	
	}  // End function PayPalPro()
	
	/*
		GENERAL CLASS FUNCTIONS
	*/
	
	function GetAPIVersion()
	{
		return $this -> APIVersion;	
	}
	
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
	
	
	function CURLRequest($Request)
	{
	
		$curl = curl_init();
				curl_setopt($curl, CURLOPT_VERBOSE, 1);
				curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
				curl_setopt($curl, CURLOPT_TIMEOUT, 30);
				curl_setopt($curl, CURLOPT_URL, $this -> EndPointURL);
				curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
				curl_setopt($curl, CURLOPT_POSTFIELDS, $Request);
				
		if($this -> APIMode == 'Certificate')
			curl_setopt($curl, CURLOPT_SSLCERT, $this -> PathToCertKeyPEM);
		
		//execute the curl POST		
		$Response = curl_exec($curl);
		
		curl_close($curl);
		
		return $Response;
		
	} //End CURLRequest function
	
	
	function NVPToArray($NVPString)
	{
			
		// prepare responses into array
		$proArray = array();
		while(strlen($NVPString))
		{
			// name
			$keypos= strpos($NVPString,'=');
			$keyval = substr($NVPString,0,$keypos);
			// value
			$valuepos = strpos($NVPString,'&') ? strpos($NVPString,'&'): strlen($NVPString);
			$valval = substr($NVPString,$keypos+1,$valuepos-$keypos-1);
			// decoding the respose
			$proArray[$keyval] = urldecode($valval);
			$NVPString = substr($NVPString,$valuepos+1,strlen($NVPString));
		}
		
		return $proArray;
		
	} // End function NVPToArray()
	
	
	function GetErrors($DataArray)
	{
	
		$Errors = array();
		$n = 0;
		while(isset($DataArray['L_ERRORCODE' . $n . '']))
		{
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
		
	} // End function GetErrors()
	
	
	function DisplayErrors($Errors)
	{
		foreach($Errors as $ErrorVar => $ErrorVal)
		{
			$CurrentError = $Errors[$ErrorVar];
			foreach($CurrentError as $CurrentErrorVar => $CurrentErrorVal)
			{
				if($CurrentErrorVar == 'L_ERRORCODE')
					$CurrentVarName = 'Error Code';
				elseif($CurrentErrorVar == 'L_SHORTMESSAGE')
					$CurrentVarName = 'Short Message';
				elseif($CurrentErrorVar == 'L_LONGMESSAGE')
					$CurrentVarName == 'Long Message';
				elseif($CurrentErrorVar == 'L_SEVERITYCODE')
					$CurrentVarName = 'Severity Code';
			
				echo $CurrentVarName . ': ' . $CurrentErrorVal . '<br />';		
			}
			echo '<br />';
		}
	} // End function DisplayErrors()
	
	
	function GetOrderItems($DataArray)
	{
		
		$OrderItems = array();
		$n = 0;
		while(isset($DataArray['L_AMT' . $n . '']))
		{
			$LName = isset($DataArray['L_NAME' . $n . '']) ? $DataArray['L_NAME' . $n . ''] : '';
			$LDesc = isset($DataArray['L_DESC' . $n . '']) ? $DataArray['L_DESC' . $n . ''] : '';
			$LNumber = isset($DataArray['L_NUMBER' . $n . '']) ? $DataArray['L_NUMBER' . $n . ''] : '';
			$LQTY = isset($DataArray['L_QTY' . $n . '']) ? $DataArray['L_QTY' . $n . ''] : '';
			$LAmt = isset($DataArray['L_AMT' . $n . '']) ? $DataArray['L_AMT' . $n . ''] : '';
			$LTaxAmt = isset($DataArray['L_TAXAMT' . $n . '']) ? $DataArray['L_TAXAMT' . $n . ''] : '';
			$LItemWeightValue = isset($DataArray['L_ITEMWEIGHTVALUE' . $n . '']) ? $DataArray['L_ITEMWEIGHTVALUE' . $n . ''] : '';
			$LItemWeightUnit = isset($DataArray['L_ITEMWEIGHTUNIT' . $n . '']) ? $DataArray['L_ITEMWEIGHTUNIT' . $n . ''] : '';
			$LItemWidthValue = isset($DataArray['L_ITEMWEIGHTVALUE' . $n . '']) ? $DataArray['L_ITEMWEIGHTVALUE' . $n . ''] : '';
			$LItemWidthUnit = isset($DataArray['L_ITEMWIDTHUNIT' . $n . '']) ? $DataArray['L_ITEMWIDTHUNIT' . $n . ''] : '';
			$LItemLengthValue = isset($DataArray['L_ITEMLENGTHVALUE' . $n . '']) ? $DataArray['L_ITEMLENGTHVALUE' . $n . ''] : '';
			$LItemLengthUnit = isset($DataArray['L_ITEMLENGTHUNIT' . $n . '']) ? $DataArray['L_ITEMLENGTHUNIT' . $n . ''] : '';
			$LeBayItemID = isset($DataArray['L_EBAYITEMNUMBER' . $n . '']) ? $DataArray['L_EBAYITEMNUMBER' . $n . ''] : '';
			$LeBayTransID = isset($DataArray['L_EBAYITEMAUCTIONTXNID' . $n . '']) ? $DataArray['L_EBAYITEMAUCTIONTXNID' . $n . ''] : '';
			$LeBayOrderID = isset($DataArray['L_EBAYITEMORDERID' . $n . '']) ? $DataArray['L_EBAYITEMORDERID' . $n . ''] : '';
			
			$CurrentItem = array(
								'L_NAME' => $LName, 
								'L_DESC' => $LDesc, 
								'L_NUMBER' => $LNumber, 
								'L_QTY' => $LQTY, 
								'L_AMT' => $LAmt, 
								'L_ITEMWEIGHTVALUE' => $LItemWeightValue, 
								'L_ITEMWEIGHTUNIT' => $LItemWeightUnit, 
								'L_ITEMWIDTHVALUE' => $LItemWidthValue, 
								'L_ITEMWIDTHUNIT' => $LItemWidthUnit, 
								'L_ITEMLENGTHVALUE' => $LItemLengthValue, 
								'L_ITEMLENGTHUNIT' => $LItemLengthUnit, 
								'L_TAXAMT' => $LTaxAmt, 
								'L_EBAYITEMNUMBER' => $LeBayItemID, 
								'L_EBAYITEMAUCTIONTXNID' => $LeBayTransID, 
								'L_EBAYITEMORDERID' => $LeBayOrderID
								);
								
			array_push($OrderItems, $CurrentItem);
			$n++;
		}
		
		return $OrderItems;
	
	} // End function GetOrderItems
	
	
	function GetPayments($DataArray)
	{
		$Payments = array();
		$n = 0;
		while(isset($DataArray['PAYMENTREQUEST_' . $n . '_AMT']))
		{			
			$Payment = array(
							'SHIPTONAME' => isset($DataArray['PAYMENTREQUEST_' . $n . '_SHIPTONAME']) ? $DataArray['PAYMENTREQUEST_' . $n . '_SHIPTONAME'] : '', 
							'SHIPTOSTREET' => isset($DataArray['PAYMENTREQUEST_' . $n . '_SHIPTOSTREET']) ? $DataArray['PAYMENTREQUEST_' . $n . '_SHIPTOSTREET'] : '', 
							'SHIPTOSTREET2' => isset($DataArray['PAYMENTREQUEST_' . $n . '_SHIPTOSTREET2']) ? $DataArray['PAYMENTREQUEST_' . $n . '_SHIPTOSTREET2'] : '', 
							'SHIPTOCITY' => isset($DataArray['PAYMENTREQUEST_' . $n . '_SHIPTOCITY']) ? $DataArray['PAYMENTREQUEST_' . $n . '_SHIPTOCITY'] : '', 
							'SHIPTOSTATE' => isset($DataArray['PAYMENTREQUEST_' . $n . '_SHIPTOSTATE']) ? $DataArray['PAYMENTREQUEST_' . $n . '_SHIPTOSTATE'] : '', 
							'SHIPTOZIP' => isset($DataArray['PAYMENTREQUEST_' . $n . '_SHIPTOZIP']) ? $DataArray['PAYMENTREQUEST_' . $n . '_SHIPTOZIP'] : '', 
							'SHIPTOCOUNTRYCODE' => isset($DataArray['PAYMENTREQUEST_' . $n . '_SHIPTOCOUNTRYCODE']) ? $DataArray['PAYMENTREQUEST_' . $n . '_SHIPTOCOUNTRYCODE'] : '', 
							'SHIPTOCOUNTRYNAME' => isset($DataArray['PAYMENTREQUEST_' . $n . '_SHIPTOCOUNTRYNAME']) ? $DataArray['PAYMENTREQUEST_' . $n . '_SHIPTOCOUNTRYNAME'] : '', 
							'SHIPTOPHONENUM' => isset($DataArray['PAYMENTREQUEST_' . $n . '_SHIPTOPHONENUM']) ? $DataArray['PAYMENTREQUEST_' . $n . '_SHIPTOPHONENUM'] : '', 
							'ADDRESSSTATUS' => isset($DataArray['PAYMENTREQUEST_' . $n . '_ADDRESSSTATUS']) ? $DataArray['PAYMENTREQUEST_' . $n . '_ADDRESSSTATUS'] : '', 
							'AMT' => isset($DataArray['PAYMENTREQUEST_' . $n . '_AMT']) ? $DataArray['PAYMENTREQUEST_' . $n . '_AMT'] : '', 
							'CURRENCYCODE' => isset($DataArray['PAYMENTREQUEST_' . $n . '_CURRENCYCODE']) ? $DataArray['PAYMENTREQUEST_' . $n . '_CURRENCYCODE'] : '', 
							'ITEMAMT' => isset($DataArray['PAYMENTREQUEST_' . $n . '_ITEMAMT']) ? $DataArray['PAYMENTREQUEST_' . $n . '_ITEMAMT'] : '', 
							'SHIPPINGAMT' => isset($DataArray['PAYMENTREQUEST_' . $n . '_SHIPPINGAMT']) ? $DataArray['PAYMENTREQUEST_' . $n . '_SHIPPINGAMT'] : '', 
							'INSURANCEOPTIONOFFERED' => isset($DataArray['PAYMENTREQUEST_' . $n . '_INSURANCEOPTIONOFFERED']) ? $DataArray['PAYMENTREQUEST_' . $n . '_INSURANCEOPTIONOFFERED'] : '', 
							'HANDLINGAMT' => isset($DataArray['PAYMENTREQUEST_' . $n . '_HANDLINGAMT']) ? $DataArray['PAYMENTREQUEST_' . $n . '_HANDLINGAMT'] : '', 
							'TAXAMT' => isset($DataArray['PAYMENTREQUEST_' . $n . '_TAXAMT']) ? $DataArray['PAYMENTREQUEST_' . $n . '_TAXAMT'] : '', 
							'DESC' => isset($DataArray['PAYMENTREQUEST_' . $n . '_DESC']) ? $DataArray['PAYMENTREQUEST_' . $n . '_DESC'] : '', 
							'CUSTOM' => isset($DataArray['PAYMENTREQUEST_' . $n . '_CUSTOM']) ? $DataArray['PAYMENTREQUEST_' . $n . '_CUSTOM'] : '', 
							'INVNUM' => isset($DataArray['PAYMENTREQUEST_' . $n . '_INVNUM']) ? $DataArray['PAYMENTREQUEST_' . $n . '_INVNUM'] : '', 
							'NOTIFYURL' => isset($DataArray['PAYMENTREQUEST_' . $n . '_NOTIFYURL']) ? $DataArray['PAYMENTREQUEST_' . $n . '_NOTIFYURL'] : '', 
							'NOTETEXT' => isset($DataArray['PAYMENTREQUEST_' . $n . '_NOTETEXT']) ? $DataArray['PAYMENTREQUEST_' . $n . '_NOTETEXT'] : '', 
							'TRANSACTIONID' => isset($DataArray['PAYMENTREQUEST_' . $n . '_TRANSACTIONID']) ? $DataArray['PAYMENTREQUEST_' . $n . '_TRANSACTIONID'] : '', 
							'ALLOWEDPAYMENTMETHOD' => isset($DataArray['PAYMENTREQUEST_' . $n . '_ALLOWEDPAYMENTMETHOD']) ? $DataArray['PAYMENTREQUEST_' . $n . '_ALLOWEDPAYMENTMETHOD'] : '', 
							'PAYMENTREQUESTID' => isset($DataArray['PAYMENTREQUEST_' . $n . '_PAYMENTREQUESTID']) ? $DataArray['PAYMENTREQUEST_' . $n . '_PAYMENTREQUESTID'] : ''
							);
			
			$n_items = 0;
			$OrderItems = array();
			while(isset($DataArray['L_PAYMENTREQUEST_' . $n . '_AMT' . $n_items]))
			{
				$Item = array(
							'NAME' => isset($DataArray['L_PAYMENTREQUEST_' . $n . '_NAME' . $n_items]) ? $DataArray['L_PAYMENTREQUEST_' . $n . '_NAME' . $n_items] : '', 
							'DESC' => isset($DataArray['L_PAYMENTREQUEST_' . $n . '_DESC' . $n_items]) ? $DataArray['L_PAYMENTREQUEST_' . $n . '_DESC' . $n_items] : '', 
							'AMT' => isset($DataArray['L_PAYMENTREQUEST_' . $n . '_AMT' . $n_items]) ? $DataArray['L_PAYMENTREQUEST_' . $n . '_AMT' . $n_items] : '', 
							'NUMBER' => isset($DataArray['L_PAYMENTREQUEST_' . $n . '_NUMBER' . $n_items]) ? $DataArray['L_PAYMENTREQUEST_' . $n . '_NUMBER' . $n_items] : '', 
							'QTY' => isset($DataArray['L_PAYMENTREQUEST_' . $n . '_QTY' . $n_items]) ? $DataArray['L_PAYMENTREQUEST_' . $n . '_QTY' . $n_items] : '', 
							'TAXAMT' => isset($DataArray['L_PAYMENTREQUEST_' . $n . '_TAXAMT' . $n_items]) ? $DataArray['L_PAYMENTREQUEST_' . $n . '_TAXAMT' . $n_items] : '', 
							'ITEMWEIGHTVALUE' => isset($DataArray['L_PAYMENTREQUEST_' . $n . '_ITEMWEIGHTVALUE' . $n_items]) ? $DataArray['L_PAYMENTREQUEST_' . $n . '_ITEMWEIGHTVALUE' . $n_items] : '', 
							'ITEMWEIGHTUNIT' => isset($DataArray['L_PAYMENTREQUEST_' . $n . '_ITEMWEIGHTUNIT' . $n_items]) ? $DataArray['L_PAYMENTREQUEST_' . $n . '_ITEMWEIGHTUNIT' . $n_items] : '', 
							'ITEMLENGTHVALUE' => isset($DataArray['L_PAYMENTREQUEST_' . $n . '_ITEMLENGTHVALUE' . $n_items]) ? $DataArray['L_PAYMENTREQUEST_' . $n . '_ITEMLENGTHVALUE' . $n_items] : '', 
							'ITEMLENGTHUNIT' => isset($DataArray['L_PAYMENTREQUEST_' . $n . '_ITEMLENGTHUNIT' . $n_items]) ? $DataArray['L_PAYMENTREQUEST_' . $n . '_ITEMLENGTHUNIT' . $n_items] : '', 
							'ITEMWIDTHVALUE' => isset($DataArray['L_PAYMENTREQUEST_' . $n . '_ITEMWIDTHVALUE' . $n_items]) ? $DataArray['L_PAYMENTREQUEST_' . $n . '_ITEMWIDTHVALUE' . $n_items] : '', 
							'ITEMWIDTHUNIT' => isset($DataArray['L_PAYMENTREQUEST_' . $n . '_ITEMWIDTHUNIT' . $n_items]) ? $DataArray['L_PAYMENTREQUEST_' . $n . '_ITEMWIDTHUNIT' . $n_items] : '', 
							'ITEMHEIGHTVALUE' => isset($DataArray['L_PAYMENTREQUEST_' . $n . '_ITEMHEIGHTVALUE' . $n_items]) ? $DataArray['L_PAYMENTREQUEST_' . $n . '_ITEMHEIGHTVALUE' . $n_items] : '', 
							'ITEMHEIGHTUNIT' => isset($DataArray['L_PAYMENTREQUEST_' . $n . '_ITEMHEIGHTUNIT' . $n_items]) ? $DataArray['L_PAYMENTREQUEST_' . $n . '_ITEMHEIGHTUNIT' . $n_items] : '', 
							'EBAYITEMNUMBER' => isset($DataArray['L_PAYMENTREQUEST_' . $n . '_EBAYITEMNUMBER' . $n_items]) ? $DataArray['L_PAYMENTREQUEST_' . $n . '_EBAYITEMNUMBER' . $n_items] : '', 
							'EBAYAUCTIONTXNID' => isset($DataArray['L_PAYMENTREQUEST_' . $n . '_EBAYAUCTIONTXNID' . $n_items]) ? $DataArray['L_PAYMENTREQUEST_' . $n . '_EBAYAUCTIONTXNID' . $n_items] : '', 
							'EBAYITEMORDERID' => isset($DataArray['L_PAYMENTREQUEST_' . $n . '_EBAYITEMORDERID' . $n_items]) ? $DataArray['L_PAYMENTREQUEST_' . $n . '_EBAYITEMORDERID' . $n_items] : '', 
							'EBAYITEMCARTID' => isset($DataArray['L_PAYMENTREQUEST_' . $n . '_EBAYITEMCARTID' . $n_items]) ? $DataArray['L_PAYMENTREQUEST_' . $n . '_EBAYITEMCARTID' . $n_items] : ''
							);
				
				array_push($OrderItems, $Item);
				$n_items++;	
			}
			$Payment['ORDERITEMS'] = $OrderItems;
			
			array_push($Payments, $Payment);
			$n++;
		}
		
		return $Payments;
	}
	// End function GetPayments()	
	
	
	function GetExpressCheckoutPaymentInfo($DataArray)
	{
		$Payments = array();
		$n = 0;
		
		while(isset($DataArray['PAYMENTINFO_' . $n . '_TRANSACTIONID']))
		{	
			$PaymentInfo = array(
			'TRANSACTIONID' => isset($DataArray['PAYMENTINFO_' . $n . '_TRANSACTIONID']) ? $DataArray['PAYMENTINFO_' . $n . '_TRANSACTIONID'] : '',  
			'TRANSACTIONTYPE' => isset($DataArray['PAYMENTINFO_' . $n . '_TRANSACTIONTYPE']) ? $DataArray['PAYMENTINFO_' . $n . '_TRANSACTIONTYPE'] : '', 
			'PAYMENTTYPE' => isset($DataArray['PAYMENTINFO_' . $n . '_PAYMENTTYPE']) ? $DataArray['PAYMENTINFO_' . $n . '_PAYMENTTYPE'] : '',  
			'ORDERTIME' => isset($DataArray['PAYMENTINFO_' . $n . '_ORDERTIME']) ? $DataArray['PAYMENTINFO_' . $n . '_ORDERTIME'] : '',  
			'AMT' => isset($DataArray['PAYMENTINFO_' . $n . '_AMT']) ? $DataArray['PAYMENTINFO_' . $n . '_AMT'] : '',  
			'CURRENCYCODE' => isset($DataArray['PAYMENTINFO_' . $n . '_CURRENCYCODE']) ? $DataArray['PAYMENTINFO_' . $n . '_CURRENCYCODE'] : '',  
			'FEEAMT' => isset($DataArray['PAYMENTINFO_' . $n . '_FEEAMT']) ? $DataArray['PAYMENTINFO_' . $n . '_FEEAMT'] : '', 
			'SETTLEAMT' => isset($DataArray['PAYMENTINFO_' . $n . '_SETTLEAMT']) ? $DataArray['PAYMENTINFO_' . $n . '_SETTLEAMT'] : '', 
			'TAXAMT' => isset($DataArray['PAYMENTINFO_' . $n . '_TAXAMT']) ? $DataArray['PAYMENTINFO_' . $n . '_TAXAMT'] : '', 
			'EXCHANGERATE' => isset($DataArray['PAYMENTINFO_' . $n . '_EXCHANGERATE']) ? $DataArray['PAYMENTINFO_' . $n . '_EXCHANGERATE'] : '', 
			'PAYMENTSTATUS' => isset($DataArray['PAYMENTINFO_' . $n . '_PAYMENTSTATUS']) ? $DataArray['PAYMENTINFO_' . $n . '_PAYMENTSTATUS'] : '', 
			'PENDINGREASON' => isset($DataArray['PAYMENTINFO_' . $n . '_PENDINGREASON']) ? $DataArray['PAYMENTINFO_' . $n . '_PENDINGREASON'] : '', 
			'REASONCODE' => isset($DataArray['PAYMENTINFO_' . $n . '_REASONCODE']) ? $DataArray['PAYMENTINFO_' . $n . '_REASONCODE'] : '', 
			'PROTECTIONELIGIBILITY' => isset($DataArray['PAYMENTINFO_' . $n . '_PROTECTIONELIGIBILITY']) ? $DataArray['PAYMENTINFO_' . $n . '_PROTECTIONELIGIBILITY'] : '', 
			'EBAYITEMAUCTIONTRANSACTIONID' => isset($DataArray['PAYMENTINFO_' . $n . '_EBAYITEMAUCTIONTRANSACTIONID']) ? $DataArray['PAYMENTINFO_' . $n . '_EBAYITEMAUCTIONTRANSACTIONID'] : '', 
			'PAYMENTREQUESTID' => isset($DataArray['PAYMENTINFO_' . $n . '_PAYMENTREQUESTID']) ? $DataArray['PAYMENTINFO_' . $n . '_PAYMENTREQUESTID'] : ''    
			);
			
			array_push($Payments, $PaymentInfo);
			$n++;
		}
		return $Payments;
	}
	
	/*
		AUTHORIZATION AND CAPTURE API'S
	*/
	
	function DoCapture($DataArray)
	{
		
		/*		
		$DCFields = array(
							'authorizationid' => '', 				// Required. The authorization identification number of the payment you want to capture. This is the transaction ID returned from DoExpressCheckoutPayment or DoDirectPayment.
							'amt' => '', 							// Required. Must have two decimal places.  Decimal separator must be a period (.) and optional thousands separator must be a comma (,)
							'completetype' => '', 					// Required.  The value Complete indiciates that this is the last capture you intend to make.  The value NotComplete indicates that you intend to make additional captures.
							'currencycode' => '', 					// Three-character currency code
							'invnum' => '', 						// Your invoice number
							'note' => '', 							// Informational note about this setlement that is displayed to the buyer in an email and in his transaction history.  255 character max.
							'softdescriptor' => '', 				// Per transaction description of the payment that is passed to the customer's credit card statement.
						);
		*/
	
		$DCFieldsNVP = '&METHOD=DoCapture&BUTTONSOURCE=AngellEYE_PHP_Class_DC';
		
		// DoCapture Fields
		$DCFields = isset($DataArray['DCFields']) ? $DataArray['DCFields'] : array();
		foreach($DCFields as $DCFieldsVar => $DCFieldsVal)
			$DCFieldsNVP .= '&' . strtoupper($DCFieldsVar) . '=' . urlencode($DCFieldsVal);
			
		$NVPRequest = $this -> NVPCredentials . $DCFieldsNVP;
		$NVPResponse = $this -> CURLRequest($NVPRequest);
		$NVPRequestArray = $this -> NVPToArray($NVPRequest);
		$NVPResponseArray = $this -> NVPToArray($NVPResponse);
		
		$Errors = $this -> GetErrors($NVPResponseArray);
		
		$NVPResponseArray['REQUESTDATA'] = $NVPRequestArray;
		$NVPResponseArray['ERRORS'] = $Errors;
		$NVPResponseArray['RAWREQUEST'] = $NVPRequest;
		$NVPResponseArray['RAWRESPONSE'] = $NVPResponse;
									
		return $NVPResponseArray;
		
	
	} // End function DoCapture()
	
	function DoAuthorization($DataArray)
	{
		
		/*		
		$DAFields = array(
							'transactionid' => '', 					// Required.  The value of the order's transaction ID number returned by PayPal.  
							'amt' => '', 							// Required. Must have two decimal places.  Decimal separator must be a period (.) and optional thousands separator must be a comma (,)
							'transactionentity' => '', 				// Type of transaction to authorize.  The only allowable value is Order, which means that the transaction represents a customer order that can be fulfilled over 29 days.
							'currencycode' => '', 					// Three-character currency code.
						);
		*/
	
		$DAFieldsNVP = '&METHOD=DoAuthorization&BUTTONSOURCE=AngellEYE_PHP_Class_DA';
		
		$DAFields = isset($DataArray['DAFields']) ? $DataArray['DAFields'] : array();
		foreach($DAFields as $DAFieldsVar => $DAFieldsVal)
			$DAFieldsNVP .= '&' . strtoupper($DAFieldsVar) . '=' . urlencode($DAFieldsVal);
		
		$NVPRequest = $this -> NVPCredentials . $DAFieldsNVP;
		$NVPResponse = $this -> CURLRequest($NVPRequest);
		$NVPRequestArray = $this -> NVPToArray($NVPRequest);
		$NVPResponseArray = $this -> NVPToArray($NVPResponse);
		
		$Errors = $this -> GetErrors($NVPResponseArray);
		
		$NVPResponseArray['ERRORS'] = $Errors;
		$NVPResponseArray['REQUESTDATA'] = $NVPRequestArray;
		$NVPResponseArray['RAWREQUEST'] = $NVPRequest;
		$NVPResponseArray['RAWRESPONSE'] = $NVPResponse;
									
		return $NVPResponseArray;	
	
	} // End function DoAuthorization()
	
	function DoReauthorization($DataArray)
	{
	
		/*
		$DRFields = array(
							'authorizationid' => '', 				// Required. The value of a previously authorized transaction ID returned by PayPal.
							'amt' => '', 							// Required. Must have two decimal places.  Decimal separator must be a period (.) and optional thousands separator must be a comma (,)
							'currencycode' => ''					// Three-character currency code.
						);
		*/
		
		$DRFieldsNVP = '&METHOD=DoReAuthorization&BUTTONSOURCE=AngellEYE_PHP_Class_DRA';
		
		$DRFields = isset($DataArray['DRFields']) ? $DataArray['DRFields'] : array();
		foreach($DRFields as $DRFieldsVar => $DRFieldsVal)
			$DRFieldsNVP .= '&' . strtoupper($DRFieldsVar) . '=' . urlencode($DRFieldsVal);
		
		$NVPRequest = $this -> NVPCredentials . $DRFieldsNVP;
		$NVPResponse = $this -> CURLRequest($NVPRequest);
		$NVPRequestArray = $this -> NVPToArray($NVPRequest);
		$NVPResponseArray = $this -> NVPToArray($NVPResponse);
		
		$Errors = $this -> GetErrors($NVPResponseArray);
		
		$NVPResponseArray['ERRORS'] = $Errors;
		$NVPResponseArray['REQUESTDATA'] = $NVPRequestArray;
		$NVPResponseArray['RAWREQUEST'] = $NVPRequest;
		$NVPResponseArray['RAWRESPONSE'] = $NVPResponse;
									
		return $NVPResponseArray;	
	
	}  // End function DoReauthorization()
	
	function DoVoid($DataArray)
	{
	
		/*
		DVFields = array(
							'authorizationid' => '', 				// Required.  The value of the original authorization ID returned by PayPal.  NOTE:  If voiding a transaction that has been reauthorized, use the ID from the original authorization, not the reauth.
							'note' => '' 							// An information note about this void that is displayed to the payer in an email and in his transaction history.  255 char max.
						);
		*/
		
		$DVFieldsNVP = '&METHOD=DoVoid&BUTTONSOURCE=AngellEYE_PHP_Class_DV';
		
		$DVFields = isset($DataArray['DVFields']) ? $DataArray['DVFields'] : array();
		foreach($DVFields as $DVFieldsVar => $DVFieldsVal)
			$DVFieldsNVP .= '&' . strtoupper($DVFieldsVar) . '=' . urlencode($DVFieldsVal);
		
		$NVPRequest = $this -> NVPCredentials . $DVFieldsNVP;
		$NVPResponse = $this -> CURLRequest($NVPRequest);
		$NVPRequestArray = $this -> NVPToArray($NVPRequest);
		$NVPResponseArray = $this -> NVPToArray($NVPResponse);
		
		$Errors = $this -> GetErrors($NVPResponseArray);
		
		$NVPResponseArray['ERRORS'] = $Errors;
		$NVPResponseArray['REQUESTDATA'] = $NVPRequestArray;
		$NVPResponseArray['RAWREQUEST'] = $NVPRequest;
		$NVPResponseArray['RAWRESPONSE'] = $NVPResponse;
									
		return $NVPResponseArray;	
	
	}  // End function DoVoid()
	
	
	
	/*
		MASS PAY API
	*/
	
	function MassPay($DataArray)
	{
	
		/*
		$MPFields = array(
							'emailsubject' => '', 						// The subject line of the email that PayPal sends when the transaction is completed.  Same for all recipients.  255 char max.
							'currencycode' => '', 						// Three-letter currency code.
							'receivertype' => '' 						// Indicates how you identify the recipients of payments in this call to MassPay.  Must be EmailAddress or UserID
						);
		
		Loop through your cart items and add this array into the $MPItems array...
		
		$Item1 = array(
							'l_email' => '', 							// Required.  Email address of recipient.  You must specify either L_EMAIL or L_RECEIVERID but you must not mix the two.
							'l_receiverid' => '', 						// Required.  ReceiverID of recipient.  Must specify this or email address, but not both.
							'l_amt' => '', 								// Required.  Payment amount.
							'l_uniqueid' => '', 						// Transaction-specific ID number for tracking in an accounting system.
							'l_note' => '' 								// Custom note for each recipient.
					);
											
		$MPItems = array($Item1, $Item2, ...);
		
		*/
	
		$MPFieldsNVP = '&METHOD=MassPay&BUTTONSOURCE=AngellEYE_PHP_Class_MP';
		$MPItemsNVP = '';
		
		// MassPay Fields
		$MPFields = isset($DataArray['MPFields']) ? $DataArray['MPFields'] : array();
		foreach($MPFields as $MPFieldsVar => $MPFieldsVal)
			$MPFieldsNVP .= '&' . strtoupper($MPFieldsVar) . '=' . urlencode($MPFieldsVal);
		
		// MassPay Items Fields	
		$MPItems = isset($DataArray['MPItems']) ? $DataArray['MPItems'] : array();
		$n = 0;
		foreach($MPItems as $MPItemsVar => $MPItemsVal)
		{
			$CurrentItem = $MPItems[$MPItemsVar];
			foreach($CurrentItem as $CurrentItemVar => $CurrentItemVal)
				$MPItemsNVP .= '&' . strtoupper($CurrentItemVar) . $n . '=' . urlencode($CurrentItemVal);
			$n++;
		}
		
		$NVPRequest = $this -> NVPCredentials . $MPFieldsNVP . $MPItemsNVP;
		$NVPResponse = $this -> CURLRequest($NVPRequest);
		$NVPRequestArray = $this -> NVPToArray($NVPRequest);
		$NVPResponseArray = $this -> NVPToArray($NVPResponse);
		
		$Errors = $this -> GetErrors($NVPResponseArray);
		
		$NVPResponseArray['ERRORS'] = $Errors;
		$NVPResponseArray['REQUESTDATA'] = $NVPRequestArray;
		$NVPResponseArray['RAWREQUEST'] = $NVPRequest;
		$NVPResponseArray['RAWRESPONSE'] = $NVPResponse;
									
		return $NVPResponseArray;
	
	}  // End function MassPay()
	
	
	
	
	/*
		REFUND TRANSACTION API
	*/
	
	function RefundTransaction($DataArray)
	{
	
		/*
		$RTFields = array(
							'transactionid' => '', 							// Required.  PayPal transaction ID for the order you're refunding.
							'invoiceid' => '', 								// Your own invoice id.
							'currencycode' => '', 							// Required for partial refunds.  Don't use it for full refunds.
							'refundtype' => '', 							// Required.  Type of refund.  Must be Full, Partial, or Other.
							'amt' => '', 									// Refund Amt.  Required if refund type is Partial.  
							'note' => '' 									// Custom memo about the refund.  255 char max.
						);
		*/
		
		$RTFieldsNVP = '&METHOD=RefundTransaction&BUTTONSOURCE=AngellEYE_PHP_Class_RT';
		
		$RTFields = isset($DataArray['RTFields']) ? $DataArray['RTFields'] : array();
		foreach($RTFields as $RTFieldsVar => $RTFieldsVal)
			$RTFieldsNVP .= '&' . strtoupper($RTFieldsVar) . '=' . urlencode($RTFieldsVal);
			
		$NVPRequest = $this -> NVPCredentials . $RTFieldsNVP;
		$NVPResponse = $this -> CURLRequest($NVPRequest);
		$NVPRequestArray = $this -> NVPToArray($NVPRequest);
		$NVPResponseArray = $this -> NVPToArray($NVPResponse);
		
		$Errors = $this -> GetErrors($NVPResponseArray);
		
		$NVPResponseArray['ERRORS'] = $Errors;
		$NVPResponseArray['REQUESTDATA'] = $NVPRequestArray;
		$NVPResponseArray['RAWREQUEST'] = $NVPRequest;
		$NVPResponseArray['RAWRESPONSE'] = $NVPResponse;
									
		return $NVPResponseArray;
	
	}  // End function RefundTransaction()
	
	
	/*
		GET TRANSACTION DETAILS API
	*/
	
	function GetTransactionDetails($DataArray)
	{
	
		/*
		$GTDFields = array(
							'transactionid' => ''							// PayPal transaction ID of the order you want to get details for.
						);
		*/
		
		$GTDFieldsNVP = '&METHOD=GetTransactionDetails&BUTTONSOURCE=AngellEYE_PHP_Class_GTD';
		
		$GTDFields = isset($DataArray['GTDFields']) ? $DataArray['GTDFields'] : array();
		foreach($GTDFields as $GTDFieldsVar => $GTDFieldsVal)
			$GTDFieldsNVP .= '&' . strtoupper($GTDFieldsVar) . '=' . urlencode($GTDFieldsVal);
			
		$NVPRequest = $this -> NVPCredentials . $GTDFieldsNVP;
		$NVPResponse = $this -> CURLRequest($NVPRequest);
		$NVPRequestArray = $this -> NVPToArray($NVPRequest);
		$NVPResponseArray = $this -> NVPToArray($NVPResponse);
		
		$Errors = $this -> GetErrors($NVPResponseArray);
		$OrderItems = $this -> GetOrderItems($NVPResponseArray);
		
		$NVPResponseArray['ERRORS'] = $Errors;
		$NVPResponseArray['ORDERITEMS'] = $OrderItems;
		$NVPResponseArray['REQUESTDATA'] = $NVPRequestArray;
		$NVPResponseArray['RAWREQUEST'] = $NVPRequest;
		$NVPResponseArray['RAWRESPONSE'] = $NVPResponse;
								
		return $NVPResponseArray;
	
	}  // End function GetTransactionDetails()
	
	
	
	
	/*
		DIRECT PAYMENT API
	*/
	
	function DoDirectPayment($DataArray)
	{
	
		/*
		$DPFields = array(
							'paymentaction' => '', 						// How you want to obtain payment.  Authorization indidicates the payment is a basic auth subject to settlement with Auth & Capture.  Sale indicates that this is a final sale for which you are requesting payment.  Default is Sale.
							'ipaddress' => '', 							// Required.  IP address of the payer's browser.
							'returnfmfdetails' => '' 					// Flag to determine whether you want the results returned by FMF.  1 or 0.  Default is 0.
						);
						
		$CCDetails = array(
							'creditcardtype' => '', 					// Required. Type of credit card.  Visa, MasterCard, Discover, Amex, Maestro, Solo.  If Maestro or Solo, the currency code must be GBP.  In addition, either start date or issue number must be specified.
							'acct' => '', 								// Required.  Credit card number.  No spaces or punctuation.  
							'expdate' => '', 							// Required.  Credit card expiration date.  Format is MMYYYY
							'cvv2' => '', 								// Requirements determined by your PayPal account settings.  Security digits for credit card.
							'startdate' => '', 							// Month and year that Maestro or Solo card was issued.  MMYYYY
							'issuenumber' => ''							// Issue number of Maestro or Solo card.  Two numeric digits max.
						);
						
		$PayerInfo = array(
							'email' => '', 								// Email address of payer.
							'payerid' => '', 							// Unique PayPal customer ID for payer.
							'payerstatus' => '', 						// Status of payer.  Values are verified or unverified
							'business' => '' 							// Payer's business name.
						);
						
		$PayerName = array(
							'salutation' => '', 						// Payer's salutation.  20 char max.
							'firstname' => '', 							// Payer's first name.  25 char max.
							'middlename' => '', 						// Payer's middle name.  25 char max.
							'lastname' => '', 							// Payer's last name.  25 char max.
							'suffix' => ''								// Payer's suffix.  12 char max.
						);
						
		$BillingAddress = array(
								'street' => '', 						// Required.  First street address.
								'street2' => '', 						// Second street address.
								'city' => '', 							// Required.  Name of City.
								'state' => '', 							// Required. Name of State or Province.
								'countrycode' => '', 					// Required.  Country code.
								'zip' => '', 							// Required.  Postal code of payer.
								'phonenum' => '' 						// Phone Number of payer.  20 char max.
							);
							
		$ShippingAddress = array(
								'shiptoname' => '', 					// Required if shipping is included.  Person's name associated with this address.  32 char max.
								'shiptostreet' => '', 					// Required if shipping is included.  First street address.  100 char max.
								'shiptostreet2' => '', 					// Second street address.  100 char max.
								'shiptocity' => '', 					// Required if shipping is included.  Name of city.  40 char max.
								'shiptostate' => '', 					// Required if shipping is included.  Name of state or province.  40 char max.
								'shiptozip' => '', 						// Required if shipping is included.  Postal code of shipping address.  20 char max.
								'shiptocountrycode' => '', 				// Required if shipping is included.  Country code of shipping address.  2 char max.
								'shiptophonenum' => ''					// Phone number for shipping address.  20 char max.
								);
							
		$PaymentDetails = array(
								'amt' => '', 							// Required.  Total amount of order, including shipping, handling, and tax.  
								'currencycode' => '', 					// Required.  Three-letter currency code.  Default is USD.
								'itemamt' => '', 						// Required if you include itemized cart details. (L_AMTn, etc.)  Subtotal of items not including S&H, or tax.
								'shippingamt' => '', 					// Total shipping costs for the order.  If you specify shippingamt, you must also specify itemamt.
								'handlingamt' => '', 					// Total handling costs for the order.  If you specify handlingamt, you must also specify itemamt.
								'taxamt' => '', 						// Required if you specify itemized cart tax details. Sum of tax for all items on the order.  Total sales tax. 
								'desc' => '', 							// Description of the order the customer is purchasing.  127 char max.
								'custom' => '', 						// Free-form field for your own use.  256 char max.
								'invnum' => '', 						// Your own invoice or tracking number
								'buttonsource' => '', 					// An ID code for use by 3rd party apps to identify transactions.
								'notifyurl' => ''						// URL for receiving Instant Payment Notifications.  This overrides what your profile is set to use.
							);
		
		// For order items you populate a nested array with multiple $Item arrays.  Normally you'll be looping through cart items to populate the $Item 
		// array and then push it into the $OrderItems array at the end of each loop for an entire collection of all items in $OrderItems.
		
		$OrderItems = array();		
			
		$Item	 = array(
								'l_name' => '', 						// Item Name.  127 char max.
								'l_desc' => '', 						// Item description.  127 char max.
								'l_amt' => '', 							// Cost of individual item.
								'l_number' => '', 						// Item Number.  127 char max.
								'l_qty' => '', 							// Item quantity.  Must be any positive integer.  
								'l_taxamt' => '', 						// Item's sales tax amount.
								'l_ebayitemnumber' => '', 				// eBay auction number of item.
								'l_ebayitemauctiontxnid' => '', 		// eBay transaction ID of purchased item.
								'l_ebayitemorderid' => '' 				// eBay order ID for the item.
						);
		
		array_push($OrderItems, $Item);
		
		$Secure3D = array(
						  'authstatus3d' => '', 
						  'mpivendor3ds' => '', 
						  'cavv' => '', 
						  'eci3ds' => '', 
						  'xid' => ''
						  );
		
		*/
	
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
		foreach($DPFields as $DPFieldsVar => $DPFieldsVal)
			$DPFieldsNVP .= '&' . strtoupper($DPFieldsVar) . '=' . urlencode($DPFieldsVal);
		
		// CC Details Fields
		$CCDetails = isset($DataArray['CCDetails']) ? $DataArray['CCDetails'] : array();
		foreach($CCDetails as $CCDetailsVar => $CCDetailsVal)
			$CCDetailsNVP .= '&' . strtoupper($CCDetailsVar) . '=' . urlencode($CCDetailsVal);
				
		// PayerInfo Type Fields
		$PayerInfo = isset($DataArray['PayerInfo']) ? $DataArray['PayerInfo'] : array();
		foreach($PayerInfo as $PayerInfoVar => $PayerInfoVal)
			$PayerInfoNVP .= '&' . strtoupper($PayerInfoVar) . '=' . urlencode($PayerInfoVal);
		
		// Payer Name Fields
		$PayerName = isset($DataArray['PayerName']) ? $DataArray['PayerName'] : array();
		foreach($PayerName as $PayerNameVar => $PayerNameVal)
			$PayerNameNVP .= '&' . strtoupper($PayerNameVar) . '=' . urlencode($PayerNameVal);
		
		// Address Fields (Billing)
		$BillingAddress = isset($DataArray['BillingAddress']) ? $DataArray['BillingAddress'] : array();
		foreach($BillingAddress as $BillingAddressVar => $BillingAddressVal)
			$BillingAddressNVP .= '&' . strtoupper($BillingAddressVar) . '=' . urlencode($BillingAddressVal);
		
		// Payment Details Type Fields
		$PaymentDetails = isset($DataArray['PaymentDetails']) ? $DataArray['PaymentDetails'] : array();
		foreach($PaymentDetails as $PaymentDetailsVar => $PaymentDetailsVal)
			$PaymentDetailsNVP .= '&' . strtoupper($PaymentDetailsVar) . '=' . urlencode($PaymentDetailsVal);
		
		// Payment Details Item Type Fields
		$OrderItems = isset($DataArray['OrderItems']) ? $DataArray['OrderItems'] : array();
		$n = 0;
		foreach($OrderItems as $OrderItemsVar => $OrderItemsVal)
		{
			$CurrentItem = $OrderItems[$OrderItemsVar];
			foreach($CurrentItem as $CurrentItemVar => $CurrentItemVal)
				$OrderItemsNVP .= '&' . strtoupper($CurrentItemVar) . $n . '=' . urlencode($CurrentItemVal);
			$n++;
		}
		
		// Ship To Address Fields
		$ShippingAddress = isset($DataArray['ShippingAddress']) ? $DataArray['ShippingAddress'] : array();
		foreach($ShippingAddress as $ShippingAddressVar => $ShippingAddressVal)
			$ShippingAddressNVP .= '&' . strtoupper($ShippingAddressVar) . '=' . urlencode($ShippingAddressVal);
			
		// 3D Secure Fields
		$Secure3D = isset($DataArray['Secure3D']) ? $DataArray['Secure3D'] : array();
		foreach($Secure3D as $Secure3DVar => $Secure3DVal)
			$Secure3DNVP .= '&' . strtoupper($Secure3DVar) . '=' . urlencode($Secure3DVal);
			
		// Now that we have each chunk we need to go ahead and append them all together for our entire NVP string
		$NVPRequest = $this -> NVPCredentials . $DPFieldsNVP . $CCDetailsNVP . $PayerInfoNVP . $PayerNameNVP . $BillingAddressNVP . $PaymentDetailsNVP . $OrderItemsNVP . $ShippingAddressNVP . $Secure3DNVP;
		$NVPResponse = $this -> CURLRequest($NVPRequest);
		$NVPRequestArray = $this -> NVPToArray($NVPRequest);
		$NVPResponseArray = $this -> NVPToArray($NVPResponse);
		
		$Errors = $this -> GetErrors($NVPResponseArray);
		
		$NVPResponseArray['ERRORS'] = $Errors;
		$NVPResponseArray['REQUESTDATA'] = $NVPRequestArray;
		$NVPResponseArray['RAWREQUEST'] = $NVPRequest;
		$NVPResponseArray['RAWRESPONSE'] = $NVPResponse;
				
		return $NVPResponseArray;
	
	} // End function DoDirectPayment()
	
	
	
	/*
		EXPRESS CHECKOUT API'S
	*/
	
	function SetExpressCheckout($DataArray)
	{
	
		/*
		$SECFields = array(
							'token' => '', 								// A timestamped token, the value of which was returned by a previous SetExpressCheckout call.
							'maxamt' => '', 						// The expected maximum total amount the order will be, including S&H and sales tax.
							'returnurl' => '', 							// Required.  URL to which the customer will be returned after returning from PayPal.  2048 char max.
							'cancelurl' => '', 							// Required.  URL to which the customer will be returned if they cancel payment on PayPal's site.
							'callback' => '', 							// URL to which the callback request from PayPal is sent.  Must start with https:// for production.
							'callbacktimeout' => '', 					// An override for you to request more or less time to be able to process the callback request and response.  Acceptable range for override is 1-6 seconds.  If you specify greater than 6 PayPal will use default value of 3 seconds.
							'callbackversion' => '', 					// The version of the Instant Update API you're using.  The default is the current version.							
							'reqconfirmshipping' => '', 				// The value 1 indicates that you require that the customer's shipping address is Confirmed with PayPal.  This overrides anything in the account profile.  Possible values are 1 or 0.
							'noshipping' => '', 						// The value 1 indiciates that on the PayPal pages, no shipping address fields should be displayed.  Maybe 1 or 0.
							'allownote' => '', 							// The value 1 indiciates that the customer may enter a note to the merchant on the PayPal page during checkout.  The note is returned in the GetExpresscheckoutDetails response and the DoExpressCheckoutPayment response.  Must be 1 or 0.
							'addroverride' => '', 						// The value 1 indiciates that the PayPal pages should display the shipping address set by you in the SetExpressCheckout request, not the shipping address on file with PayPal.  This does not allow the customer to edit the address here.  Must be 1 or 0.
							'localecode' => '', 						// Locale of pages displayed by PayPal during checkout.  Should be a 2 character country code.  You can retrive the country code by passing the country name into the class' GetCountryCode() function.
							'pagestyle' => '', 							// Sets the Custom Payment Page Style for payment pages associated with this button/link.  
							'hdrimg' => '', 							// URL for the image displayed as the header during checkout.  Max size of 750x90.  Should be stored on an https:// server or you'll get a warning message in the browser.
							'hdrbordercolor' => '', 					// Sets the border color around the header of the payment page.  The border is a 2-pixel permiter around the header space.  Default is black.  
							'hdrbackcolor' => '', 						// Sets the background color for the header of the payment page.  Default is white.  
							'payflowcolor' => '', 						// Sets the background color for the payment page.  Default is white.
							'skipdetails' => '', 						// This is a custom field not included in the PayPal documentation.  It's used to specify whether you want to skip the GetExpressCheckoutDetails part of checkout or not.  See PayPal docs for more info.
							'email' => '', 								// Email address of the buyer as entered during checkout.  PayPal uses this value to pre-fill the PayPal sign-in page.  127 char max.
							'solutiontype' => '', 						// Type of checkout flow.  Must be Sole (express checkout for auctions) or Mark (normal express checkout)
							'landingpage' => '', 						// Type of PayPal page to display.  Can be Billing or Login.  If billing it shows a full credit card form.  If Login it just shows the login screen.
							'channeltype' => '', 						// Type of channel.  Must be Merchant (non-auction seller) or eBayItem (eBay auction)
							'giropaysuccessurl' => '', 					// The URL on the merchant site to redirect to after a successful giropay payment.  Only use this field if you are using giropay or bank transfer payment methods in Germany.
							'giropaycancelurl' => '', 					// The URL on the merchant site to redirect to after a canceled giropay payment.  Only use this field if you are using giropay or bank transfer methods in Germany.
							'banktxnpendingurl' => '',  				// The URL on the merchant site to transfer to after a bank transfter payment.  Use this field only if you are using giropay or bank transfer methods in Germany.
							'brandname' => '', 							// A label that overrides the business name in the PayPal account on the PayPal hosted checkout pages.  127 char max.
							'customerservicenumber' => '', 				// Merchant Customer Service number displayed on the PayPal Review page. 16 char max.
							'giftmessageenable' => '', 					// Enable gift message widget on the PayPal Review page. Allowable values are 0 and 1
							'giftreceiptenable' => '', 					// Enable gift receipt widget on the PayPal Review page. Allowable values are 0 and 1
							'giftwrapenable' => '', 					// Enable gift wrap widget on the PayPal Review page.  Allowable values are 0 and 1.
							'giftwrapname' => '', 						// Label for the gift wrap option such as "Box with ribbon".  25 char max.
							'giftwrapamount' => '', 					// Amount charged for gift-wrap service.
							'buyeremailoptionenable' => '', 			// Enable buyer email opt-in on the PayPal Review page. Allowable values are 0 and 1
							'surveyquestion' => '', 					// Text for the survey question on the PayPal Review page. If the survey question is present, at least 2 survey answer options need to be present.  50 char max.
							'surveyenable' => '', 						// Enable survey functionality. Allowable values are 0 and 1
							'buyerid' => '', 							// The unique identifier provided by eBay for this buyer. The value may or may not be the same as the username. In the case of eBay, it is different. 255 char max.
							'buyerusername' => '', 						// The user name of the user at the marketplaces site.
							'buyerregistrationdate' => '',  			// Date when the user registered with the marketplace.
							'allowpushfunding' => ''					// Whether the merchant can accept push funding.  0 = Merchant can accept push funding : 1 = Merchant cannot accept push funding.			
						);
		
		// Basic array of survey choices.  Nothing but the values should go in here.  
		$SurveyChoices = array('Choice 1', 'Choice2', 'Choice3', 'etc');
		
		$Payments = array();
		$Payment = array(
						'amt' => '', 							// Required.  The total cost of the transaction to the customer.  If shipping cost and tax charges are known, include them in this value.  If not, this value should be the current sub-total of the order.
						'currencycode' => '', 					// A three-character currency code.  Default is USD.
						'itemamt' => '', 						// Required if you specify itemized L_AMT fields. Sum of cost of all items in this order.  
						'shippingamt' => '', 					// Total shipping costs for this order.  If you specify SHIPPINGAMT you mut also specify a value for ITEMAMT.
						'insuranceoptionoffered' => '', 		// If true, the insurance drop-down on the PayPal review page displays the string 'Yes' and the insurance amount.  If true, the total shipping insurance for this order must be a positive number.
						'handlingamt' => '', 					// Total handling costs for this order.  If you specify HANDLINGAMT you mut also specify a value for ITEMAMT.
						'taxamt' => '', 						// Required if you specify itemized L_TAXAMT fields.  Sum of all tax items in this order. 
						'desc' => '', 							// Description of items on the order.  127 char max.
						'custom' => '', 						// Free-form field for your own use.  256 char max.
						'invnum' => '', 						// Your own invoice or tracking number.  127 char max.
						'notifyurl' => '', 						// URL for receiving Instant Payment Notifications
						'shiptoname' => '', 					// Required if shipping is included.  Person's name associated with this address.  32 char max.
						'shiptostreet' => '', 					// Required if shipping is included.  First street address.  100 char max.
						'shiptostreet2' => '', 					// Second street address.  100 char max.
						'shiptocity' => '', 					// Required if shipping is included.  Name of city.  40 char max.
						'shiptostate' => '', 					// Required if shipping is included.  Name of state or province.  40 char max.
						'shiptozip' => '', 						// Required if shipping is included.  Postal code of shipping address.  20 char max.
						'shiptocountry' => '', 					// Required if shipping is included.  Country code of shipping address.  2 char max.
						'shiptophonenum' => '',  				// Phone number for shipping address.  20 char max.
						'notetext' => '', 						// Note to the merchant.  255 char max.  
						'allowedpaymentmethod' => '', 			// The payment method type.  Specify the value InstantPaymentOnly.
						'paymentaction' => '', 					// How you want to obtain the payment.  When implementing parallel payments, this field is required and must be set to Order. 
						'paymentrequestid' => '',  				// A unique identifier of the specific payment request, which is required for parallel payments. 
						'sellerpaypalaccountid' => ''			// A unique identifier for the merchant.  For parallel payments, this field is required and must contain the Payer ID or the email address of the merchant.
						);
						
		$PaymentOrderItems = array();
		$Item = array(
					'name' => '', 								// Item name. 127 char max.
					'desc' => '', 								// Item description. 127 char max.
					'amt' => '', 								// Cost of item.
					'number' => '', 							// Item number.  127 char max.
					'qty' => '', 								// Item qty on order.  Any positive integer.
					'taxamt' => '', 							// Item sales tax
					'itemurl' => '', 							// URL for the item.
					'itemweightvalue' => '', 					// The weight value of the item.
					'itemweightunit' => '', 					// The weight unit of the item.
					'itemheightvalue' => '', 					// The height value of the item.
					'itemheightunit' => '', 					// The height unit of the item.
					'itemwidthvalue' => '', 					// The width value of the item.
					'itemwidthunit' => '', 						// The width unit of the item.
					'itemlengthvalue' => '', 					// The length value of the item.
					'itemlengthunit' => '',  					// The length unit of the item.
					'ebayitemnumber' => '', 					// Auction item number.  
					'ebayitemauctiontxnid' => '', 				// Auction transaction ID number.  
					'ebayitemorderid' => '',  					// Auction order ID number.
					'ebayitemcartid' => ''						// The unique identifier provided by eBay for this order from the buyer. These parameters must be ordered sequentially beginning with 0 (for example L_EBAYITEMCARTID0, L_EBAYITEMCARTID1). Character length: 255 single-byte characters
					);
		array_push($PaymentOrderItems, $Item);
		$Payment['order_items'] = $PaymentOrderItems;
		
		array_push($Payments, $Payment);
		
		$BuyerDetails = array(
								'buyerid' => '', 				// The unique identifier provided by eBay for this buyer.  The value may or may not be the same as the username.  In the case of eBay, it is different.  Char max 255.
								'buyerusername' => '', 			// The username of the marketplace site.
								'buyerregistrationdate' => ''	// The registration of the buyer with the marketplace.
								);
								
		// For shipping options we create an array of all shipping choices similar to how order items works.
		$ShippingOptions = array();
		$Option = array(
						'l_shippingoptionisdefault' => '', 				// Shipping option.  Required if specifying the Callback URL.  true or false.  Must be only 1 default!
						'l_shippingoptionname' => '', 					// Shipping option name.  Required if specifying the Callback URL.  50 character max.
						'l_shippingoptionlabel' => '', 					// Shipping option label.  Required if specifying the Callback URL.  50 character max.
						'l_shippingoptionamount' => '' 					// Shipping option amount.  Required if specifying the Callback URL.  
						);
		array_push($ShippingOptions, $Option);
				
		$BillingAgreements = array();
		$Item = array(
					  'l_billingtype' => '', 							// Required.  Type of billing agreement.  For recurring payments it must be RecurringPayments.  You can specify up to ten billing agreements.  For reference transactions, this field must be either:  MerchantInitiatedBilling, or MerchantInitiatedBillingSingleSource
					  'l_billingagreementdescription' => '', 			// Required for recurring payments.  Description of goods or services associated with the billing agreement.  
					  'l_paymenttype' => '', 							// Specifies the type of PayPal payment you require for the billing agreement.  Any or IntantOnly
					  'l_billingagreementcustom' => ''					// Custom annotation field for your own use.  256 char max.
					  );
		
		array_push($BillingAgreements, $Item);
		*/		

		$SECFieldsNVP = '&METHOD=SetExpressCheckout&BUTTONSOURCE=AngellEYE_PHP_Class_SEC';
		$SurveyChoicesNVP = '';
		$PaymentsNVP = '';
		$ShippingOptionsNVP = '';
		$BillingAgreementsNVP = '';
		
		// SetExpressCheckout Request Fields
		$SECFields = isset($DataArray['SECFields']) ? $DataArray['SECFields'] : array();
		foreach($SECFields as $SECFieldsVar => $SECFieldsVal)
		{
			if(strtoupper($SECFieldsVar) != 'SKIPDETAILS')
				$SECFieldsNVP .= '&' . strtoupper($SECFieldsVar) . '=' . urlencode($SECFieldsVal);
			else
				$SkipDetails = $SECFieldsVal ? true : false;				
		}
		
		// Check to see if the REDIRECTURL should include user-action
		if(isset($SkipDetails) && $SkipDetails)
			$SkipDetailsOption = 'useraction=commit';
		else
			$SkipDetailsOption = 'useraction=continue';
		
		// Survey Choices
		$SurveyChoices = isset($DataArray['SurveyChoices']) ? $DataArray['SurveyChoices'] : array();
		$n = 0;
		foreach($SurveyChoices as $SurveyChoice)
		{
			$SurveyChoicesNVP .= '&' . 'L_SURVEYCHOICE' . $n . '=' . urlencode($SurveyChoice);
			$n++;	
		}
		
		// Payment Details Type Fields
		$Payments = isset($DataArray['Payments']) ? $DataArray['Payments'] : array();
		$n = 0;
		foreach($Payments as $PaymentsVar => $PaymentsVal)
		{
			$CurrentPayment = $Payments[$PaymentsVar];
			foreach($CurrentPayment as $CurrentPaymentVar => $CurrentPaymentVal)
			{
				if(strtoupper($CurrentPaymentVar) != 'ORDER_ITEMS')
					$PaymentsNVP .= '&PAYMENTREQUEST_' . $n . '_' . strtoupper($CurrentPaymentVar) . '=' . urlencode($CurrentPaymentVal);
				else
				{
					$PaymentOrderItems = $CurrentPayment['order_items'];
					$n_item = 0;
					foreach($PaymentOrderItems as $OrderItemsVar => $OrderItemsVal)
					{
						$CurrentItem = $PaymentOrderItems[$OrderItemsVar];
						foreach($CurrentItem as $CurrentItemVar => $CurrentItemVal)
							$PaymentsNVP .= '&L_PAYMENTREQUEST_' . $n . '_' . strtoupper($CurrentItemVar) . $n_item . '=' . urlencode($CurrentItemVal);
						$n_item++;
					}	
				}
			}
			$n++;
		}		
		
		// Billing Agreements
		$BillingAgreements = isset($DataArray['BillingAgreements']) ? $DataArray['BillingAgreements'] : array();
		$n = 0;
		foreach($BillingAgreements as $BillingAgreementVar => $BillingAgreementVal)
		{
			$CurrentItem = $BillingAgreements[$BillingAgreementVar];
			foreach($CurrentItem as $CurrentItemVar => $CurrentItemVal)
				$BillingAgreementsNVP .= '&' . strtoupper($CurrentItemVar) . $n . '=' . urlencode($CurrentItemVal);
			$n++;	
		}
			
		// Shipping Options Fields
		$ShippingOptions = isset($DataArray['ShippingOptions']) ? $DataArray['ShippingOptions'] : array();
		$n = 0;
		foreach($ShippingOptions as $ShippingOptionsVar => $ShippingOptionsVal)
		{
			$CurrentOption = $ShippingOptions[$ShippingOptionsVar];
			foreach($CurrentOption as $CurrentOptionVar => $CurrentOptionVal)
				$ShippingOptionsNVP .= '&' . strtoupper($CurrentOptionVar) . $n . '=' . urlencode($CurrentOptionVal);
			$n++;	
		}
		
		$NVPRequest = $this -> NVPCredentials . $SECFieldsNVP . $SurveyChoicesNVP . $ShippingOptionsNVP . $BillingAgreementsNVP . $PaymentsNVP;
		$NVPResponse = $this -> CURLRequest($NVPRequest);
		$NVPRequestArray = $this -> NVPToArray($NVPRequest);
		$NVPResponseArray = $this -> NVPToArray($NVPResponse);
		
		$Errors = $this -> GetErrors($NVPResponseArray);
		
		if($this -> Sandbox)
			$NVPResponseArray['REDIRECTURL'] = 'https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&' . $SkipDetailsOption . '&token=' . $NVPResponseArray['TOKEN'];
		else
			$NVPResponseArray['REDIRECTURL'] = 'https://www.paypal.com/cgi-bin/webscr?cmd=_express-checkout&' . $SkipDetailsOption . '&token=' . $NVPResponseArray['TOKEN'];

		
		$NVPResponseArray['ERRORS'] = $Errors;
		$NVPResponseArray['REQUESTDATA'] = $NVPRequestArray;
		$NVPResponseArray['RAWREQUEST'] = $NVPRequest;
		$NVPResponseArray['RAWRESPONSE'] = $NVPResponse;
				
		return $NVPResponseArray;
	
	}  // End function SetExpressCheckout()
	
	
	function CallbackResponse($DataArray)
	{
		/*$CBFields = array(
						  'offerinsuranceoption' => '' 						// Indicates whether or not PayPal should display insurance in a drop-down list or not.
						  );
		
		$ShippingOptions = array();
		
		$Option = array(
						'l_shippingoptionisdefault' => '', 						// Shipping option.  Required if specifying the Callback URL.  true or false.  Must be only 1 default!
						'l_shippingoptionname' => '', 							// Shipping option name.  Required if specifying the Callback URL.  50 character max.
						'l_shippingoptionlabel' => '', 							// Shipping option label.  Required if specifying the Callback URL.  50 character max.
						'l_shippingoptionamount' => '', 						// Shipping option amount.  Required if specifying the Callback URL.  
						'l_taxamt' => '', 										// New tax amount based on this shipping option and address.
						'l_insuranceamount' => '' 								// New insurance amount based on this shipping option and address.
						);
		
		array_push($ShippingOptions, $Option);*/
		
		$CBFieldsNVP = 'METHOD=CallbackResponse';	
		$ShippingOptionsNVP = '';
		
		// Basic callback response fields.
		$CBFields = isset($DataArray['CBFields']) ? $DataArray['CBFields'] : array();
		foreach($CBFields as $CBFieldsVar => $CBFieldsVal)
			$CBFieldsNVP .= '&' . strtoupper($CBFieldsVar) . '=' . urlencode($CBFieldsVal);
		
		// Shipping Options Fields
		$ShippingOptions = isset($DataArray['ShippingOptions']) ? $DataArray['ShippingOptions'] : array();
		$n = 0;
		foreach($ShippingOptions as $ShippingOptionsVar => $ShippingOptionsVal)
		{
			$CurrentOption = $ShippingOptions[$ShippingOptionsVar];
			foreach($CurrentOption as $CurrentOptionVar => $CurrentOptionVal)
				$ShippingOptionsNVP .= '&' . strtoupper($CurrentOptionVar) . $n . '=' . urlencode($CurrentOptionVal);
			$n++;	
		}
		
		$NVPResponse = $CBFieldsNVP . $ShippingOptionsNVP;
				
		return $NVPResponse;
		
	}
	
	
	function GetExpressCheckoutDetails($Token)
	{
	
		/*
			All you're passing in here is a token so no array templates are provided.  Simply...
			
			$ECDetailsResults = $ppSession -> GetExpressCheckoutDetails($Token);
		*/
	
		$GECDFieldsNVP = '&METHOD=GetExpressCheckoutDetails&BUTTONSOURCE=AngellEYE_PHP_Class_GECD&TOKEN=' . $Token;
			
		$NVPRequest = $this -> NVPCredentials . $GECDFieldsNVP;
		$NVPResponse = $this -> CURLRequest($NVPRequest);
		$NVPRequestArray = $this -> NVPToArray($NVPRequest);
		$NVPResponseArray = $this -> NVPToArray($NVPResponse);
		
		$Errors = $this -> GetErrors($NVPResponseArray);
		$OrderItems = $this -> GetOrderItems($NVPResponseArray);
		$Payments = $this -> GetPayments($NVPResponseArray);
		
		$NVPResponseArray['ERRORS'] = $Errors;
		$NVPResponseArray['ORDERITEMS'] = $OrderItems;
		$NVPResponseArray['PAYMENTS'] = $Payments;
		$NVPResponseArray['REQUESTDATA'] = $NVPRequestArray;
		$NVPResponseArray['RAWREQUEST'] = $NVPRequest;
		$NVPResponseArray['RAWRESPONSE'] = $NVPResponse;
				
		return $NVPResponseArray;
		
	
	}  // End function GetExpressCheckoutDetails()
	
	
	function DoExpressCheckoutPayment($DataArray)
	{
	
		/*
		$DECPFields = array(
							'token' => '', 								// Required.  A timestamped token, the value of which was returned by a previous SetExpressCheckout call.
							'payerid' => '', 							// Required.  Unique PayPal customer id of the payer.  Returned by GetExpressCheckoutDetails, or if you used SKIPDETAILS it's returned in the URL back to your RETURNURL.
							'returnfmfdetails' => '', 					// Flag to indiciate whether you want the results returned by Fraud Management Filters or not.  1 or 0.
							'giftmessage' => '', 						// The gift message entered by the buyer on the PayPal Review page.  150 char max.
							'giftreceiptenable' => '', 					// Pass true if a gift receipt was selected by the buyer on the PayPal Review page. Otherwise pass false.
							'giftwrapname' => '', 						// The gift wrap name only if the gift option on the PayPal Review page was selected by the buyer.
							'giftwrapamount' => '', 					// The amount only if the gift option on the PayPal Review page was selected by the buyer.
							'buyermarketingemail' => '', 				// The buyer email address opted in by the buyer on the PayPal Review page.
							'surveyquestion' => '', 					// The survey question on the PayPal Review page.  50 char max.
							'surveychoiceselected' => '',  				// The survey response selected by the buyer on the PayPal Review page.  15 char max.
							'allowedpaymentmethod' => '', 				// The payment method type. Specify the value InstantPaymentOnly.
							'buttonsource' => '' 						// ID code for use by third-party apps to identify transactions in PayPal. 
						);
								
		$Payments = array();
		$Payment = array(
						'amt' => '', 							// Required.  The total cost of the transaction to the customer.  If shipping cost and tax charges are known, include them in this value.  If not, this value should be the current sub-total of the order.
						'currencycode' => '', 					// A three-character currency code.  Default is USD.
						'itemamt' => '', 						// Required if you specify itemized L_AMT fields. Sum of cost of all items in this order.  
						'shippingamt' => '', 					// Total shipping costs for this order.  If you specify SHIPPINGAMT you mut also specify a value for ITEMAMT.
						'insuranceoptionoffered' => '', 		// If true, the insurance drop-down on the PayPal review page displays the string 'Yes' and the insurance amount.  If true, the total shipping insurance for this order must be a positive number.
						'handlingamt' => '', 					// Total handling costs for this order.  If you specify HANDLINGAMT you mut also specify a value for ITEMAMT.
						'taxamt' => '', 						// Required if you specify itemized L_TAXAMT fields.  Sum of all tax items in this order. 
						'desc' => '', 							// Description of items on the order.  127 char max.
						'custom' => '', 						// Free-form field for your own use.  256 char max.
						'invnum' => '', 						// Your own invoice or tracking number.  127 char max.
						'notifyurl' => '', 						// URL for receiving Instant Payment Notifications
						'shiptoname' => '', 					// Required if shipping is included.  Person's name associated with this address.  32 char max.
						'shiptostreet' => '', 					// Required if shipping is included.  First street address.  100 char max.
						'shiptostreet2' => '', 					// Second street address.  100 char max.
						'shiptocity' => '', 					// Required if shipping is included.  Name of city.  40 char max.
						'shiptostate' => '', 					// Required if shipping is included.  Name of state or province.  40 char max.
						'shiptozip' => '', 						// Required if shipping is included.  Postal code of shipping address.  20 char max.
						'shiptocountry' => '', 					// Required if shipping is included.  Country code of shipping address.  2 char max.
						'shiptophonenum' => '',  				// Phone number for shipping address.  20 char max.
						'notetext' => '', 						// Note to the merchant.  255 char max.  
						'allowedpaymentmethod' => '', 			// The payment method type.  Specify the value InstantPaymentOnly.
						'paymentaction' => '', 					// How you want to obtain the payment.  When implementing parallel payments, this field is required and must be set to Order. 
						'paymentrequestid' => '',  				// A unique identifier of the specific payment request, which is required for parallel payments. 
						'sellerpaypalaccountid' => '', 			// A unique identifier for the merchant.  For parallel payments, this field is required and must contain the Payer ID or the email address of the merchant.
						'softdescriptor' => ''					// A per transaction description of the payment that is passed to the buyer's credit card statement.
						);
						
		$PaymentOrderItems = array();
		$Item = array(
					'name' => '', 								// Item name. 127 char max.
					'desc' => '', 								// Item description. 127 char max.
					'amt' => '', 								// Cost of item.
					'number' => '', 							// Item number.  127 char max.
					'qty' => '', 								// Item qty on order.  Any positive integer.
					'taxamt' => '', 							// Item sales tax
					'itemurl' => '', 							// URL for the item.
					'itemweightvalue' => '', 					// The weight value of the item.
					'itemweightunit' => '', 					// The weight unit of the item.
					'itemheightvalue' => '', 					// The height value of the item.
					'itemheightunit' => '', 					// The height unit of the item.
					'itemwidthvalue' => '', 					// The width value of the item.
					'itemwidthunit' => '', 						// The width unit of the item.
					'itemlengthvalue' => '', 					// The length value of the item.
					'itemlengthunit' => '',  					// The length unit of the item.
					'ebayitemnumber' => '', 					// Auction item number.  
					'ebayitemauctiontxnid' => '', 				// Auction transaction ID number.  
					'ebayitemorderid' => '',  					// Auction order ID number.
					'ebayitemcartid' => ''						// The unique identifier provided by eBay for this order from the buyer. These parameters must be ordered sequentially beginning with 0 (for example L_EBAYITEMCARTID0, L_EBAYITEMCARTID1). Character length: 255 single-byte characters
					);
		array_push($PaymentOrderItems, $Item);
		$Payment['order_items'] = $PaymentOrderItems;				
		
		$UserSelectedOptions = array(
									 'shippingcalculationmode' => '', 	// Describes how the options that were presented to the user were determined.  values are:  API - Callback   or   API - Flatrate.
									 'insuranceoptionselected' => '', 	// The Yes/No option that you chose for insurance.
									 'shippingoptionisdefault' => '', 	// Is true if the buyer chose the default shipping option.  
									 'shippingoptionamount' => '', 		// The shipping amount that was chosen by the buyer.
									 'shippingoptionname' => '', 		// Is true if the buyer chose the default shipping option...??  Maybe this is supposed to show the name..??
									 );
		*/	
	
		$DECPFieldsNVP = '&METHOD=DoExpressCheckoutPayment&BUTTONSOURCE=AngellEYE_PHP_Class_DECP';
		$PaymentsNVP = '';
		$UserSelectedOptionsNVP = '';
		
		// DoExpressCheckoutPayment Fields
		$DECPFields = isset($DataArray['DECPFields']) ? $DataArray['DECPFields'] : array();
		foreach($DECPFields as $DECPFieldsVar => $DECPFieldsVal)
			$DECPFieldsNVP .= '&' . strtoupper($DECPFieldsVar) . '=' . urlencode($DECPFieldsVal);
		
		// Payment Details Type Fields
		$Payments = isset($DataArray['Payments']) ? $DataArray['Payments'] : array();
		$n = 0;
		foreach($Payments as $PaymentsVar => $PaymentsVal)
		{
			$CurrentPayment = $Payments[$PaymentsVar];
			foreach($CurrentPayment as $CurrentPaymentVar => $CurrentPaymentVal)
			{
				if(strtoupper($CurrentPaymentVar) != 'ORDER_ITEMS')
					$PaymentsNVP .= '&PAYMENTREQUEST_' . $n . '_' . strtoupper($CurrentPaymentVar) . '=' . urlencode($CurrentPaymentVal);
				else
				{
					$PaymentOrderItems = $CurrentPayment['order_items'];
					$n_item = 0;
					foreach($PaymentOrderItems as $OrderItemsVar => $OrderItemsVal)
					{
						$CurrentItem = $PaymentOrderItems[$OrderItemsVar];
						foreach($CurrentItem as $CurrentItemVar => $CurrentItemVal)
							$PaymentsNVP .= '&L_PAYMENTREQUEST_' . $n . '_' . strtoupper($CurrentItemVar) . $n_item . '=' . urlencode($CurrentItemVal);
						$n_item++;
					}	
				}
			}
			$n++;
		}	
		
		// User Selected Options
		$UserSelectedOptions = isset($DataArray['UserSelectedOptions']) ? $DataArray['UserSelectedOptions'] : array();
		foreach($UserSelectedOptions as $UserSelectedOptionVar => $UserSelectedOptionVal)
			$UserSelectedOptionsNVP .= '&' . strtoupper($UserSelectedOptionVar) . '=' . urlencode($UserSelectedOptionVal);
			
		$NVPRequest = $this -> NVPCredentials . $DECPFieldsNVP . $PaymentsNVP . $UserSelectedOptionsNVP;
		$NVPResponse = $this -> CURLRequest($NVPRequest);
		$NVPRequestArray = $this -> NVPToArray($NVPRequest);
		$NVPResponseArray = $this -> NVPToArray($NVPResponse);
		
		$Errors = $this -> GetErrors($NVPResponseArray);
		
		// Loop through all possible payments and parse out data accordingly.
		// This is to handle parallel payments.
		$n = 0;
		$Payments = array();
		while(isset($NVPResponseArray['PAYMENTINFO_' . $n . '_AMT']))
		{
			$Payment = array(
								'TRANSACTIONID' => isset($NVPResponseArray['PAYMENTINFO_' . $n . '_TRANSACTIONID']) ? $NVPResponseArray['PAYMENTINFO_' . $n . '_TRANSACTIONID'] : '', 
								'TRANSACTIONTYPE' => isset($NVPResponseArray['PAYMENTINFO_' . $n . '_TRANSACTIONTYPE']) ? $NVPResponseArray['PAYMENTINFO_' . $n . '_TRANSACTIONTYPE'] : '', 
								'PAYMENTTYPE' => isset($NVPResponseArray['PAYMENTINFO_' . $n . '_PAYMENTTYPE']) ? $NVPResponseArray['PAYMENTINFO_' . $n . '_PAYMENTTYPE'] : '', 
								'ORDERTIME' => isset($NVPResponseArray['PAYMENTINFO_' . $n . '_ORDERTIME']) ? $NVPResponseArray['PAYMENTINFO_' . $n . '_ORDERTIME'] : '', 
								'AMT' => isset($NVPResponseArray['PAYMENTINFO_' . $n . '_AMT']) ? $NVPResponseArray['PAYMENTINFO_' . $n . '_AMT'] : '', 
								'FEEAMT' => isset($NVPResponseArray['PAYMENTINFO_' . $n . '_FEEAMT']) ? $NVPResponseArray['PAYMENTINFO_' . $n . '_FEEAMT'] : '', 
								'SETTLEAMT' => isset($NVPResponseArray['PAYMENTINFO_' . $n . '_SETTLEAMT']) ? $NVPResponseArray['PAYMENTINFO_' . $n . '_SETTLEAMT'] : '', 
								'TAXAMT' => isset($NVPResponseArray['PAYMENTINFO_' . $n . '_TAXAMT']) ? $NVPResponseArray['PAYMENTINFO_' . $n . '_TAXAMT'] : '', 
								'EXCHANGERATE' => isset($NVPResponseArray['PAYMENTINFO_' . $n . '_EXCHANGERATE']) ? $NVPResponseArray['PAYMENTINFO_' . $n . '_EXCHANGERATE'] : '', 
								'CURRENCYCODE' => isset($NVPResponseArray['PAYMENTINFO_' . $n . '_CURRENCYCODE']) ? $NVPResponseArray['PAYMENTINFO_' . $n . '_CURRENCYCODE'] : '', 
								'PAYMENTSTATUS' => isset($NVPResponseArray['PAYMENTINFO_' . $n . '_PAYMENTSTATUS']) ? $NVPResponseArray['PAYMENTINFO_' . $n . '_PAYMENTSTATUS'] : '', 
								'PENDINGREASON' => isset($NVPResponseArray['PAYMENTINFO_' . $n . '_PENDINGREASON']) ? $NVPResponseArray['PAYMENTINFO_' . $n . '_PENDINGREASON'] : '', 
								'REASONCODE' => isset($NVPResponseArray['PAYMENTINFO_' . $n . '_REASONCODE']) ? $NVPResponseArray['PAYMENTINFO_' . $n . '_REASONCODE'] : '', 
								'PROTECTIONELIGIBILITY' => isset($NVPResponseArray['PAYMENTINFO_' . $n . '_PROTECTIONELIGIBILITY']) ? $NVPResponseArray['PAYMENTINFO_' . $n . '_PROTECTIONELIGIBILITY'] : '', 
								'ERRORCODE' => isset($NVPResponseArray['PAYMENTINFO_' . $n . '_ERRORCODE']) ? $NVPResponseArray['PAYMENTINFO_' . $n . '_ERRORCODE'] : ''
								);
			
			// Pull out FMF info for current payment.													
			$FMFilters = array();
			$n_filters = 0;
			while(isset($NVPResponseArray['L_PAYMENTINFO_' . $n . '_FMFFILTERID' . $n_filters]))
			{
				$FMFilter = array(
								'ID' => isset($NVPResponseArray['L_PAYMENTINFO_' . $n . '_FMFFILTERID' . $n_filters]) ? $NVPResponseArray['L_PAYMENTINFO_' . $n . '_FMFFILTERID' . $n_filters] : '', 
								'NAME' => isset($NVPResponseArray['L_PAYMENTINFO_' . $n . '_FMFFILTERNAME' . $n_filters]) ? $NVPResponseArray['L_PAYMENTINFO_' . $n . '_FMFFILTERNAME' . $n_filters] : ''
								);
				$n_filters++;
			}
			$Payment['FMFILTERS'] = $FMFilters;
			
			// Pull error info for current payment.
			$PaymentErrors = array();
			while(isset($NVPResponseArray['PAYMENTREQUEST_' . $n . '_ERRORCODE']))
			{
				$Error = array(
								'ERRORCODE' => isset($NVPResponseArray['PAYMENTREQUEST_' . $n . '_ERRORCODE']) ? $NVPResponseArray['PAYMENTREQUEST_' . $n . '_ERRORCODE'] : '', 
								'SHORTMESSAGE' => isset($NVPResponseArray['PAYMENTREQUEST_' . $n . '_SHORTMESSAGE']) ? $NVPResponseArray['PAYMENTREQUEST_' . $n . '_SHORTMESSAGE'] : '', 
								'LONGMESSAGE' => isset($NVPResponseArray['PAYMENTREQUEST_' . $n . '_LONGMESSAGE']) ? $NVPResponseArray['PAYMENTREQUEST_' . $n . '_LONGMESSAGE'] : '', 
								'SEVERITYCODE' => isset($NVPResponseArray['PAYMENTREQUEST_' . $n . '_SEVERITYCODE']) ? $NVPResponseArray['PAYMENTREQUEST_' . $n . '_SEVERITYCODE'] : '', 
								'ACK' => isset($NVPResponseArray['PAYMENTREQUEST_' . $n . '_ACK']) ? $NVPResponseArray['PAYMENTREQUEST_' . $n . '_ACK'] : ''								
								);
				array_push($PaymentErrors, $Error);
			}
			$Payment['ERRORS'] = $PaymentErrors;
			
			array_push($Payments, $Payment);
			$n++;	
		}
		
		$NVPResponseArray['ERRORS'] = $Errors;
		$NVPResponseArray['PAYMENTS'] = $Payments;
		$NVPResponseArray['REQUESTDATA'] = $NVPRequestArray;
		$NVPResponseArray['RAWREQUEST'] = $NVPRequest;
		$NVPResponseArray['RAWRESPONSE'] = $NVPResponse;
		
		return $NVPResponseArray;
	
	}  // End function DoExpressCheckoutPayment()
	
	
	
	
	/*
		TRANSACTION SEARCH API
	*/
	
	function TransactionSearch($DataArray)
	{
		
		/*
		$TSFields = array(
							'startdate' => '', 							// Required.  The earliest transaction date you want returned.  Must be in UTC/GMT format.  2008-08-30T05:00:00.00Z
							'enddate' => '', 							// The latest transaction date you want to be included.
							'email' => '', 								// Search by the buyer's email address.
							'receiver' => '', 							// Search by the receiver's email address.  
							'receiptid' => '', 							// Search by the PayPal account optional receipt ID.
							'transactionid' => '', 						// Search by the PayPal transaction ID.
							'invnum' => '', 							// Search by your custom invoice or tracking number.
							'acct' => '', 								// Search by a credit card number, as set by you in your original transaction.  
							'auctionitemnumber' => '', 					// Search by auction item number.
							'transactionclass' => '', 					// Search by classification of transaction.  Possible values are: All, Sent, Received, MassPay, MoneyRequest, FundsAdded, FundsWithdrawn, Referral, Fee, Subscription, Dividend, Billpay, Refund, CurrencyConversions, BalanceTransfer, Reversal, Shipping, BalanceAffecting, ECheck
							'amt' => '', 								// Search by transaction amount.
							'currencycode' => '', 						// Search by currency code.
							'status' => '',  							// Search by transaction status.  Possible values: Pending, Processing, Success, Denied, Reversed
							'profileid' => ''							// Recurring Payments profile ID.  Currently undocumented but has tested to work.
						);
						
		$PayerName = array(
							'salutation' => '', 						// Search by payer's salutation.
							'firstname' => '', 							// Search by payer's first name.
							'middlename' => '', 						// Search by payer's middle name.
							'lastname' => '', 							// Search by payer's last name.
							'suffix' => ''	 							// Search by payer's suffix.
						);
		*/
	
		$TSFieldsNVP = '&METHOD=TransactionSearch&BUTTONSOURCE=AngellEYE_PHP_Class_TS';
		$PayerNameNVP = '';
		
		// Transaction Search Fields
		$TSFields = isset($DataArray['TSFields']) ? $DataArray['TSFields'] : array();
		foreach($TSFields as $TSFieldsVar => $TSFieldsVal)
			$TSFieldsNVP .= '&' . strtoupper($TSFieldsVar) . '=' . urlencode($TSFieldsVal);
			
		// Payer Name Fields
		$PayerName = isset($DataArray['PayerName']) ? $DataArray['PayerName'] : array();
		foreach($PayerName as $PayerNameVar => $PayerNameVal)
			$PayerNameNVP .= '&' . strtoupper($PayerNameVar) . '=' . urlencode($PayerNameVal);
		
		$NVPRequest = $this -> NVPCredentials . $TSFieldsNVP . $PayerNameNVP;
		$NVPResponse = $this -> CURLRequest($NVPRequest);
		$NVPRequestArray = $this -> NVPToArray($NVPRequest);
		$NVPResponseArray = $this -> NVPToArray($NVPResponse);
		
		$Errors = $this -> GetErrors($NVPResponseArray);
		
		$SearchResults = array();
		$n = 0;
		while(isset($NVPResponseArray['L_TIMESTAMP' . $n . '']))
		{
			$LTimestamp = isset($NVPResponseArray['L_TIMESTAMP' . $n . '']) ? $NVPResponseArray['L_TIMESTAMP' . $n . ''] : '';
			$LTimeZone = isset($NVPResponseArray['L_TIMEZONE' . $n . '']) ? $NVPResponseArray['L_TIMEZONE' . $n . ''] : '';
			$LType = isset($NVPResponseArray['L_TYPE' . $n . '']) ? $NVPResponseArray['L_TYPE' . $n . ''] : '';
			$LEmail = isset($NVPResponseArray['L_EMAIL' . $n . '']) ? $NVPResponseArray['L_EMAIL' . $n . ''] : '';
			$LName = isset($NVPResponseArray['L_NAME' . $n . '']) ? $NVPResponseArray['L_NAME' . $n . ''] : '';
			$LTransID = isset($NVPResponseArray['L_TRANSACTIONID' . $n . '']) ? $NVPResponseArray['L_TRANSACTIONID' . $n . ''] : '';
			$LStatus = isset($NVPResponseArray['L_STATUS' . $n . '']) ? $NVPResponseArray['L_STATUS' . $n . ''] : '';
			$LAmt = isset($NVPResponseArray['L_AMT' . $n . '']) ? $NVPResponseArray['L_AMT' . $n . ''] : '';
			$LFeeAmt = isset($NVPResponseArray['L_FEEAMT' . $n . '']) ? $NVPResponseArray['L_FEEAMT' . $n . ''] : '';
			$LNetAmt = isset($NVPResponseArray['L_NETAMT' . $n . '']) ? $NVPResponseArray['L_NETAMT' . $n . ''] : '';
			
			$CurrentItem = array(
								'L_TIMESTAMP' => $LTimestamp, 
								'L_TIMEZONE' => $LTimeZone, 
								'L_TYPE' => $LType, 
								'L_EMAIL' => $LEmail, 
								'L_NAME' => $LName, 
								'L_TRANSACTIONID' => $LTransID, 
								'L_STATUS' => $LStatus, 
								'L_AMT' => $LAmt, 
								'L_FEEAMT' => $LFeeAmt, 
								'L_NETAMT' => $LNetAmt
								);
																	
			array_push($SearchResults, $CurrentItem);
			$n++;
		}
		
		$NVPResponseArray['ERRORS'] = $Errors;
		$NVPResponseArray['SEARCHRESULTS'] = $SearchResults;
		$NVPResponseArray['REQUESTDATA'] = $NVPRequestArray;
		$NVPResponseArray['RAWREQUEST'] = $NVPRequest;
		$NVPResponseArray['RAWRESPONSE'] = $NVPResponse;
		
		return $NVPResponseArray;
		
	
	}  // End function TransactionSearch()
	
	
	
	
	/*
		REFERENCE TRANSACTIONS API
	*/
	
	function DoNonReferenceCredit($DataArray)
	{
		
		/*
		$DNRCFields = array(
							'amt' => '', 						// Required.  Total of order including shipping, handling, and tax.  
							'netamt' => '', 					// Total amount of all items in this transactions.  Subtotal.
							'shippingamt' => '', 				// Total shipping costs on the transaction.
							'taxamt' => '', 					// Sum of tax for all items on the order.
							'currencycode' => '', 				// Required.  Default is USD.  Only valid values are: AUD, CAD, EUR, GBP, JPY, and USD.
							'note' => '' 						// Field used by merchant to record why this credit was issued to the buyer.
						);	
						
		$CCDetails = array(
							'creditcardtype' => '', 			// Required.  Type of credit card.  Values can be: Visa, MasterCard, Discover, Amex, Maestro, Solo
							'acct' => '', 						// Required.  Credit card number.  No spaces or punctuation.
							'expdate' => '', 					// Required.  Credit card expiration date.  MMYYYY
							'cvv2' => '', 						// Requirement determined by PayPal profile settings.  Credit Card security digits.
							'startdate' => '', 					// Mo and Yr that Maestro or Solo card was issued.  MMYYYY.
							'issuenumber' => '' 				// Isssue number of Maestro or Solo card.  
		);
		
		$PayerInfo = array(
							'email' => '', 						// Email address of payer.
							'firstname' => '', 					// Payer's first name.
							'lastname' => '' 					// Payer's last name.
						);
						
		$BillingAddress = array(
								'street' => '', 				// Required.  First street address.
								'street2' => '', 				// Second street address.
								'city' => '', 					// Required.  Name of City.
								'state' => '', 					// Required. Name of State or Province.
								'countrycode' => '', 			// Required.  Country code.
								'zip' => '', 					// Required.  Postal code of payer.
								'phonenum' => '' 				// Phone Number of payer.  20 char max.
							);
		*/
		
		
		$DNRCFieldsNVP = '&METHOD=DoNonReferencedCredit&BUTTONSOURCE=AngellEYE_PHP_Class_DNRC';
		$CCDetailsNVP = '';
		$PayerInfoNVP = '';
		$BillingAddressNVP = '';
		
		// DoNonReferencedCredit Fields
		$DNRCFields = isset($DataArray['DNRCFields']) ? $DataArray['DNRCFields'] : array();
		foreach($DNRCFields as $DNRCFieldsVar => $DNRCFieldsVal)
			$DNRCFieldsNVP .= '&' . strtoupper($DNRCFieldsVar) . '=' . urlencode($DNRCFieldsVal);
			
		// CC Details Fields
		$CCDetails = isset($DataArray['CCDetails']) ? $DataArray['CCDetails'] : array();
		foreach($CCDetails as $CCDetailsVar => $CCDetailsVal)
			$CCDetailsNVP .= '&' . strtoupper($CCDetailsVar) . '=' . urlencode($CCDetailsVal);
			
		// Payer Info Fields
		$PayerInfo = isset($DataArray['PayerInfo']) ? $DataArray['PayerInfo'] : array();
		foreach($PayerInfo as $PayerInfoVar => $PayerInfoVal)
			$PayerInfoNVP .= '&' . strtoupper($PayerInfoVar) . '=' . urlencode($PayerInfoVal);
			
		// Address Fields (Billing)
		$BillingAddress = isset($DataArray['BillingAddress']) ? $DataArray['BillingAddress'] : array();
		foreach($BillingAddress as $BillingAddressVar => $BillingAddressVal)
			$BillingAddressNVP .= '&' . strtoupper($BillingAddressVar) . '=' . urlencode($BillingAddressVal);
			
		$NVPRequest = $this -> NVPCredentials . $DNRCFieldsNVP . $CCDetailsNVP . $PayerInfoNVP . $BillingAddressNVP;
		$NVPResponse = $this -> CURLRequest($NVPRequest);
		$NVPRequestArray = $this -> NVPToArray($NVPRequest);
		$NVPResponseArray = $this -> NVPToArray($NVPResponse);
		
		$Errors = $this -> GetErrors($NVPResponseArray);
		
		$NVPResponseArray['ERRORS'] = $Errors;
		$NVPResponseArray['REQUESTDATA'] = $NVPRequestArray;
		$NVPResponseArray['RAWREQUEST'] = $NVPRequest;
		$NVPResponseArray['RAWRESPONSE'] = $NVPResponse;
		
		return $NVPResponseArray;
	
	} // End DoNonReferenceCredit()
	
	
	
	function DoReferenceTransaction($DataArray)
	{
		
		/*$DRTFields = array(
						   'referenceid' => '', 
						   'paymentaction' => '', 
						   'returnfmfdetails' => '', 
						   'softdescriptor' => ''
						   );
		
		$ShippingAddress = array(
								'shiptoname' => '', 							// Required if shipping is included.  Person's name associated with this address.  32 char max.
								'shiptostreet' => '', 					// Required if shipping is included.  First street address.  100 char max.
								'shiptostreet2' => '', 					// Second street address.  100 char max.
								'shiptocity' => '', 					// Required if shipping is included.  Name of city.  40 char max.
								'shiptostate' => '', 					// Required if shipping is included.  Name of state or province.  40 char max.
								'shiptozip' => '', 						// Required if shipping is included.  Postal code of shipping address.  20 char max.
								'shiptocountry' => '', 					// Required if shipping is included.  Country code of shipping address.  2 char max.
								'shiptophonenum' => ''						// Phone number for shipping address.  20 char max.
								);
		
		$PaymentDetails = array(
								'amt' => '', 							// Required. Total amount of the order, including shipping, handling, and tax.
								'currencycode' => '', 					// A three-character currency code.  Default is USD.
								'itemamt' => '', 						// Required if you specify itemized L_AMT fields. Sum of cost of all items in this order.  
								'shippingamt' => '', 					// Total shipping costs for this order.  If you specify SHIPPINGAMT you mut also specify a value for ITEMAMT.
								'insuranceamt' => '', 
								'shippingdiscount' => '', 
								'handlingamt' => '', 					// Total handling costs for this order.  If you specify HANDLINGAMT you mut also specify a value for ITEMAMT.
								'taxamt' => '', 						// Required if you specify itemized L_TAXAMT fields.  Sum of all tax items in this order. 
								'insuranceoptionoffered' => '', 		// If true, the insurance drop-down on the PayPal review page displays Yes and shows the amount.
								'desc' => '', 							// Description of items on the order.  127 char max.
								'custom' => '', 						// Free-form field for your own use.  256 char max.
								'invnum' => '', 						// Your own invoice or tracking number.  127 char max.
								'buttonsource' => '', 					// ID code for use by third-party apps to identify transactions in PayPal. 
								'notifyurl' => '' 						// URL for receiving Instant Payment Notifications
								);
		
		// For order items you populate a nested array with multiple $Item arrays.  Normally you'll be looping through cart items to populate the $Item 
		// array and then push it into the $OrderItems array at the end of each loop for an entire collection of all items in $OrderItems.
		
		$OrderItems = array();
		$Item		 = array(
							'l_name' => '', 							// Item name. 127 char max.
							'l_description' => '', 
							'l_amt' => '', 								// Cost of item.
							'l_number' => '', 							// Item number.  127 char max.
							'l_qty' => '', 								// Item qty on order.  Any positive integer.
							'l_taxamt' => '', 							// Item sales tax
							'l_itemweightvalue' => '', 					// The weight value of the item.
							'l_itemweightunit' => '', 					// The weight unit of the item.
							'l_itemheightvalue' => '', 					// The height value of the item.
							'l_itemheightunit' => '', 					// The height unit of the item.
							'l_itemwidthvalue' => '', 					// The width value of the item.
							'l_itemwidthunit' => '', 					// The width unit of the item.
							'l_itemlengthvalue' => '', 					// The length value of the item.
							'l_itemlengthunit' => '',  					// The length unit of the item.
							'l_ebayitemnumber' => '', 					// Auction item number.  
							'l_ebayitemauctiontxnid' => '', 			// Auction transaction ID number.  
							'l_ebayitemorderid' => '' 					// Auction order ID number.
							);
							
		array_push($OrderItems, $Item);
		
		$CCDetails = array(
							'creditcardtype' => '', 					// Required. Type of credit card.  Visa, MasterCard, Discover, Amex, Maestro, Solo.  If Maestro or Solo, the currency code must be GBP.  In addition, either start date or issue number must be specified.
							'acct' => '', 								// Required.  Credit card number.  No spaces or punctuation.  
							'expdate' => '', 							// Required.  Credit card expiration date.  Format is MMYYYY
							'cvv2' => '', 								// Requirements determined by your PayPal account settings.  Security digits for credit card.
							'startdate' => '', 							// Month and year that Maestro or Solo card was issued.  MMYYYY
							'issuenumber' => ''							// Issue number of Maestro or Solo card.  Two numeric digits max.
						);
		
		$PayerInfo = array(
							'email' => '', 								// Email address of payer.
							'firstname' => '', 							// Unique PayPal customer ID for payer.
							'lastname' => ''						// Status of payer.  Values are verified or unverified
						);
						
		$BillingAddress = array(
								'street' => '', 						// Required.  First street address.
								'street2' => '', 						// Second street address.
								'city' => '', 							// Required.  Name of City.
								'state' => '', 							// Required. Name of State or Province.
								'countrycode' => '', 					// Required.  Country code.
								'zip' => '', 							// Required.  Postal code of payer.
								'phonenum' => '' 						// Phone Number of payer.  20 char max.
							);*/
		
		$DRTFieldsNVP = '&METHOD=DoReferenceTransaction&BUTTONSOURCE=AngellEYE_PHP_Class_DRT';
		$CCDetailsNVP = '';
		$PayerInfoNVP = '';
		$BillingAddressNVP = '';
		$ShippingAddressNVP = '';
		$PaymentDetailsNVP = '';
		$OrderItemsNVP = '';
		$PaymentDetailsNVP = '';
		
		// GetBalance Fields
		$DRTFields = isset($DataArray['DRTFields']) ? $DataArray['DRTFields'] : array();
		foreach($DRTFields as $DRTFieldsVar => $DRTFieldsVal)
			$DRTFieldsNVP .= '&' . strtoupper($DRTFieldsVar) . '=' . urlencode($DRTFieldsVal);
			
		// Ship To Address Fields
		$ShippingAddress = isset($DataArray['ShippingAddress']) ? $DataArray['ShippingAddress'] : array();
		foreach($ShippingAddress as $ShippingAddressVar => $ShippingAddressVal)
			$ShippingAddressNVP .= '&' . strtoupper($ShippingAddressVar) . '=' . urlencode($ShippingAddressVal);
			
		// Payment Details Item Type Fields
		$OrderItems = isset($DataArray['OrderItems']) ? $DataArray['OrderItems'] : array();
		$n = 0;
		foreach($OrderItems as $OrderItemsVar => $OrderItemsVal)
		{
			$CurrentItem = $OrderItems[$OrderItemsVar];
			foreach($CurrentItem as $CurrentItemVar => $CurrentItemVal)
				$OrderItemsNVP .= '&' . strtoupper($CurrentItemVar) . $n . '=' . urlencode($CurrentItemVal);
			$n++;
		}
			
		// CC Details Fields
		$CCDetails = isset($DataArray['CCDetails']) ? $DataArray['CCDetails'] : array();
		foreach($CCDetails as $CCDetailsVar => $CCDetailsVal)
			$CCDetailsNVP .= '&' . strtoupper($CCDetailsVar) . '=' . urlencode($CCDetailsVal);
			
		// PayerInfo Type Fields
		$PayerInfo = isset($DataArray['PayerInfo']) ? $DataArray['PayerInfo'] : array();
		foreach($PayerInfo as $PayerInfoVar => $PayerInfoVal)
			$PayerInfoNVP .= '&' . strtoupper($PayerInfoVar) . '=' . urlencode($PayerInfoVal);
			
		// Address Fields (Billing)
		$BillingAddress = isset($DataArray['BillingAddress']) ? $DataArray['BillingAddress'] : array();
		foreach($BillingAddress as $BillingAddressVar => $BillingAddressVal)
			$BillingAddressNVP .= '&' . strtoupper($BillingAddressVar) . '=' . urlencode($BillingAddressVal);
			
		// Payment Details Fields
		$PaymentDetails = isset($DataArray['PaymentDetails']) ? $DataArray['PaymentDetails'] : array();
		foreach($PaymentDetails as $PaymentDetailsVar => $PaymentDetailsVal)
			$PaymentDetailsNVP .= '&' . strtoupper($PaymentDetailsVar) . '=' . urlencode($PaymentDetailsVal);
			
		$NVPRequest = $this -> NVPCredentials . $DRTFieldsNVP . $ShippingAddressNVP . $OrderItemsNVP . $CCDetailsNVP . $PayerInfoNVP . $BillingAddressNVP . $PaymentDetailsNVP;
		$NVPResponse = $this -> CURLRequest($NVPRequest);
		$NVPRequestArray = $this -> NVPToArray($NVPRequest);
		$NVPResponseArray = $this -> NVPToArray($NVPResponse);
		
		$Errors = $this -> GetErrors($NVPResponseArray);	
		
		$NVPResponseArray['ERRORS'] = $Errors;
		$NVPResponseArray['REQUESTDATA'] = $NVPRequestArray;
		$NVPResponseArray['RAWREQUEST'] = $NVPRequest;
		$NVPResponseArray['RAWRESPONSE'] = $NVPResponse;
		
		return $NVPResponseArray;
	}
	
	
	
	
	/*
		GET BALANCE API
	*/
	
	function GetBalance($DataArray)
	{
	
		/*
		$GBFields = array(
							'returnallcurrencies' => ''					// Whether to return all currencies.  0 or 1.
						);
		*/
		
		
		$GBFieldsNVP = '&METHOD=GetBalance&BUTTONSOURCE=AngellEYE_PHP_Class_GB';
		
		// GetBalance Fields
		$GBFields = isset($DataArray['GBFields']) ? $DataArray['GBFields'] : array();
		foreach($GBFields as $GBFieldsVar => $GBFieldsVal)
			$GBFieldsNVP .= '&' . strtoupper($GBFieldsVar) . '=' . urlencode($GBFieldsVal);
			
		$NVPRequest = $this -> NVPCredentials . $GBFieldsNVP;
		$NVPResponse = $this -> CURLRequest($NVPRequest);
		$NVPRequestArray = $this -> NVPToArray($NVPRequest);
		$NVPResponseArray = $this -> NVPToArray($NVPResponse);
		
		$Errors = $this -> GetErrors($NVPResponseArray);
		
		$BalanceResults = array();
		$n = 0;
		while(isset($NVPResponseArray['L_AMT' . $n . '']))
		{
			$LAmt = isset($NVPResponseArray['L_AMT' . $n . '']) ? $NVPResponseArray['L_AMT' . $n . ''] : '';
			$LCurrencyCode = isset($NVPResponseArray['L_CURRENCYCODE' . $n . '']) ? $NVPResponseArray['L_CURRENCYCODE' . $n . ''] : '';
			
			$CurrentItem = array(
								'L_AMT' => $LAmt, 
								'L_CURRENCYCODE' => $LCurrencyCode
								);
																	
			array_push($BalanceResults, $CurrentItem);
			$n++;	
		}
		
		$NVPResponseArray['ERRORS'] = $Errors;
		$NVPResponseArray['BALANCERESULTS'] = $BalanceResults;
		$NVPResponseArray['REQUESTDATA'] = $NVPRequestArray;
		$NVPResponseArray['RAWREQUEST'] = $NVPRequest;
		$NVPResponseArray['RAWRESPONSE'] = $NVPResponse;
		
		return $NVPResponseArray;
	
	} // End function GetBalance()
	
	
	/*
		GET PAL DETAILS
	*/
	
	function GetPalDetails($DataArray)
	{
		$GPFieldsNVP = '&METHOD=GetPalDetails&BUTTONSOURCE=AngellEYE_PHP_Class_GPD';
				
		$GPFields = isset($DataArray['GPFields']) ? $DataArray['GPFields'] : array();
		foreach($GPFields as $GPFieldsVar => $GPFieldsVal)
			$GPFieldsNVP .= '&' . strtoupper($GPFieldsVar) . '=' . urlencode($GPFieldsVal);
			
		$NVPRequest = $this -> NVPCredentials . $GPFieldsNVP;
		$NVPResponse = $this -> CURLRequest($NVPRequest);
		$NVPRequestArray = $this -> NVPToArray($NVPRequest);
		$NVPResponseArray = $this -> NVPToArray($NVPResponse);
		
		$Errors = $this -> GetErrors($NVPResponseArray);
		
		$NVPResponseArray['ERRORS'] = $Errors;
		$NVPResponseArray['REQUESTDATA'] = $NVPRequestArray;
		$NVPResponseArray['RAWREQUEST'] = $NVPRequest;
		$NVPResponseArray['RAWRESPONSE'] = $NVPResponse;
								
		return $NVPResponseArray;	
	}
	
	
	/*
		ADDRESS VERIFY
	*/
	
	function AddressVerify($DataArray)
	{
		/*
		$AVFields = array
					(
					'email' => '', 							// Required. Email address of PayPal member to verify.
					'street' => '', 						// Required. First line of the postal address to verify.  35 char max.
					'zip' => ''								// Required.  Postal code to verify.  
					);
		*/
		
		$AVFieldsNVP = '&METHOD=AddressVerify&BUTTONSOURCE=AngellEYE_PHP_Class_AV';
		
		$AVFields = isset($DataArray['AVFields']) ? $DataArray['AVFields'] : array();
		foreach($AVFields as $AVFieldsVar => $AVFieldsVal)
			$AVFieldsNVP .= '&' . strtoupper($AVFieldsVar) . '=' . urlencode($AVFieldsVal);
			
		$NVPRequest = $this -> NVPCredentials . $AVFieldsNVP;
		$NVPResponse = $this -> CURLRequest($NVPRequest);
		$NVPRequestArray = $this -> NVPToArray($NVPRequest);
		$NVPResponseArray = $this -> NVPToArray($NVPResponse);
		
		$Errors = $this -> GetErrors($NVPResponseArray);
		
		$NVPResponseArray['ERRORS'] = $Errors;
		$NVPResponseArray['REQUESTDATA'] = $NVPRequestArray;
		$NVPResponseArray['RAWREQUEST'] = $NVPRequest;
		$NVPResponseArray['RAWRESPONSE'] = $NVPResponse;
								
		return $NVPResponseArray;
	}
	
	
	
	/*
		FRAUD MANAGEMENT
	*/
	
	function ManagePendingTransactionStatus($DataArray)
	{
		/*
		$MPTSFields = array
					(
					'transactionid' => '', 								// Required. Transaction ID of the payment transaction.
					'action' => ''										// Required.  The operation you want to perform on the pending transaction.  Options are: Accept, Deny 
					);
		*/
		
		$MPTSFieldsNVP = '&METHOD=ManagePendingTransactionStatus&BUTTONSOURCE=AngellEYE_PHP_Class_MPTS';
		
		$MPTSFields = isset($DataArray['MPTSFields']) ? $DataArray['MPTSFields'] : array();
		foreach($AVFields as $MPTSFieldsVar => $MPTSFieldsVal)
			$MPTSFieldsNVP .= '&' . strtoupper($MPTSFieldsVar) . '=' . urlencode($MPTSFieldsVal);
			
		$NVPRequest = $this -> NVPCredentials . $MPTSFieldsNVP;
		$NVPResponse = $this -> CURLRequest($NVPRequest);
		$NVPRequestArray = $this -> NVPToArray($NVPRequest);
		$NVPResponseArray = $this -> NVPToArray($NVPResponse);
		
		$Errors = $this -> GetErrors($NVPResponseArray);
		
		$NVPResponseArray['ERRORS'] = $Errors;
		$NVPResponseArray['REQUESTDATA'] = $NVPRequestArray;
		$NVPResponseArray['RAWREQUEST'] = $NVPRequest;
		$NVPResponseArray['RAWRESPONSE'] = $NVPResponse;
								
		return $NVPResponseArray;
	}
	
	
	/*
		RECURRING PAYMENTS
	*/
	
	function CreateRecurringPaymentsProfile($DataArray)
	{
		/*
		$CRPPFields = array(
					'token' => '', 								// Token returned from PayPal SetExpressCheckout.  Can also use token returned from SetCustomerBillingAgreement.
						);
						
		$ProfileDetails = array(
							'subscribername' => '', 					// Full name of the person receiving the product or service paid for by the recurring payment.  32 char max.
							'profilestartdate' => '', 					// Required.  The date when the billing for this profiile begins.  Must be a valid date in UTC/GMT format.
							'profilereference' => '' 					// The merchant's own unique invoice number or reference ID.  127 char max.
						);
						
		$ScheduleDetails = array(
							'desc' => '', 								// Required.  Description of the recurring payment.  This field must match the corresponding billing agreement description included in SetExpressCheckout.
							'maxfailedpayments' => '', 					// The number of scheduled payment periods that can fail before the profile is automatically suspended.  
							'autobillamt' => '' 						// This field indiciates whether you would like PayPal to automatically bill the outstanding balance amount in the next billing cycle.  Values can be: NoAutoBill or AddToNextBilling
						);
						
		$BillingPeriod = array(
							'trialbillingperiod' => '', 
							'trialbillingfrequency' => '', 
							'trialtotalbillingcycles' => '', 
							'trialamt' => '', 
							'billingperiod' => '', 						// Required.  Unit for billing during this subscription period.  One of the following: Day, Week, SemiMonth, Month, Year
							'billingfrequency' => '', 					// Required.  Number of billing periods that make up one billing cycle.  The combination of billing freq. and billing period must be less than or equal to one year. 
							'totalbillingcycles' => '', 				// the number of billing cycles for the payment period (regular or trial).  For trial period it must be greater than 0.  For regular payments 0 means indefinite...until canceled.  
							'amt' => '', 								// Required.  Billing amount for each billing cycle during the payment period.  This does not include shipping and tax. 
							'currencycode' => '', 						// Required.  Three-letter currency code.
							'shippingamt' => '', 						// Shipping amount for each billing cycle during the payment period.
							'taxamt' => '' 								// Tax amount for each billing cycle during the payment period.
						);
						
		$ActivationDetails = array(
							'initamt' => '', 							// Initial non-recurring payment amount due immediatly upon profile creation.  Use an initial amount for enrolment or set-up fees.
							'failedinitamtaction' => '', 				// By default, PayPal will suspend the pending profile in the event that the initial payment fails.  You can override this.  Values are: ContinueOnFailure or CancelOnFailure
						);
						
		$CCDetails = array(
							'creditcardtype' => '', 					// Required. Type of credit card.  Visa, MasterCard, Discover, Amex, Maestro, Solo.  If Maestro or Solo, the currency code must be GBP.  In addition, either start date or issue number must be specified.
							'acct' => '', 								// Required.  Credit card number.  No spaces or punctuation.  
							'expdate' => '', 							// Required.  Credit card expiration date.  Format is MMYYYY
							'cvv2' => '', 								// Requirements determined by your PayPal account settings.  Security digits for credit card.
							'startdate' => '', 							// Month and year that Maestro or Solo card was issued.  MMYYYY
							'issuenumber' => ''							// Issue number of Maestro or Solo card.  Two numeric digits max.
						);
						
		$PayerInfo = array(
							'email' => '', 								// Email address of payer.
							'payerid' => '', 							// Unique PayPal customer ID for payer.
							'payerstatus' => '', 						// Status of payer.  Values are verified or unverified
							'countrycode' => '', 						// Payer's country of residence in the form of the two letter code.
							'business' => '' 							// Payer's business name.
						);
						
		$PayerName = array(
							'salutation' => '', 						// Payer's salutation.  20 char max.
							'firstname' => '', 							// Payer's first name.  25 char max.
							'middlename' => '', 						// Payer's middle name.  25 char max.
							'lastname' => '', 							// Payer's last name.  25 char max.
							'suffix' => ''								// Payer's suffix.  12 char max.
						);
						
		$BillingAddress = array(
								'street' => '', 						// Required.  First street address.
								'street2' => '', 						// Second street address.
								'city' => '', 							// Required.  Name of City.
								'state' => '', 							// Required. Name of State or Province.
								'countrycode' => '', 					// Required.  Country code.
								'zip' => '', 							// Required.  Postal code of payer.
								'phonenum' => '' 						// Phone Number of payer.  20 char max.
							);
							
		$ShippingAddress = array(
								'shiptoname' => '', 					// Required if shipping is included.  Person's name associated with this address.  32 char max.
								'shiptostreet' => '', 					// Required if shipping is included.  First street address.  100 char max.
								'shiptostreet2' => '', 					// Second street address.  100 char max.
								'shiptocity' => '', 					// Required if shipping is included.  Name of city.  40 char max.
								'shiptostate' => '', 					// Required if shipping is included.  Name of state or province.  40 char max.
								'shiptozip' => '', 						// Required if shipping is included.  Postal code of shipping address.  20 char max.
								'shiptocountrycode' => '', 				// Required if shipping is included.  Country code of shipping address.  2 char max.
								'shiptophonenum' => ''					// Phone number for shipping address.  20 char max.
								);
		*/
	
		$CRPPFieldsNVP = '&METHOD=CreateRecurringPaymentsProfile&BUTTONSOURCE=AngellEYE_PHP_Class_CRPP';
		
		$CRPPFields = isset($DataArray['CRPPFields']) ? $DataArray['CRPPFields'] : array();
		foreach($CRPPFields as $CRPPFieldsVar => $CRPPFieldsVal)
			$CRPPFieldsNVP .= '&' . strtoupper($CRPPFieldsVar) . '=' . urlencode($CRPPFieldsVal);
			
		$ProfileDetails = isset($DataArray['ProfileDetails']) ? $DataArray['ProfileDetails'] : array();
		foreach($ProfileDetails as $ProfileDetailsVar => $ProfileDetailsVal)
			$CRPPFieldsNVP .= '&' . strtoupper($ProfileDetailsVar) . '=' . urlencode($ProfileDetailsVal);
			
		$ScheduleDetails = isset($DataArray['ScheduleDetails']) ? $DataArray['ScheduleDetails'] : array();
		foreach($ScheduleDetails as $ScheduleDetailsVar => $ScheduleDetailsVal)
			$CRPPFieldsNVP .= '&' . strtoupper($ScheduleDetailsVar) . '=' . urlencode($ScheduleDetailsVal);
			
		$BillingPeriod = isset($DataArray['BillingPeriod']) ? $DataArray['BillingPeriod'] : array();
		foreach($BillingPeriod as $BillingPeriodVar => $BillingPeriodVal)
			$CRPPFieldsNVP .= '&' . strtoupper($BillingPeriodVar) . '=' . urlencode($BillingPeriodVal);
			
		$ActivationDetails = isset($DataArray['ActivationDetails']) ? $DataArray['ActivationDetails'] : array();
		foreach($ActivationDetails as $ActivationDetailsVar => $ActivationDetailsVal)
			$CRPPFieldsNVP .= '&' . strtoupper($ActivationDetailsVar) . '=' . urlencode($ActivationDetailsVal);
			
		$CCDetails = isset($DataArray['CCDetails']) ? $DataArray['CCDetails'] : array();
		foreach($CCDetails as $CCDetailsVar => $CCDetailsVal)
			$CRPPFieldsNVP .= '&' . strtoupper($CCDetailsVar) . '=' . urlencode($CCDetailsVal);
			
		$PayerInfo = isset($DataArray['PayerInfo']) ? $DataArray['PayerInfo'] : array();
		foreach($PayerInfo as $PayerInfoVar => $PayerInfoVal)
			$CRPPFieldsNVP .= '&' . strtoupper($PayerInfoVar) . '=' . urlencode($PayerInfoVal);
			
		$PayerName = isset($DataArray['PayerName']) ? $DataArray['PayerName'] : array();
		foreach($PayerName as $PayerNameVar => $PayerNameVal)
			$CRPPFieldsNVP .= '&' . strtoupper($PayerNameVar) . '=' . urlencode($PayerNameVal);
			
		$BillingAddress = isset($DataArray['BillingAddress']) ? $DataArray['BillingAddress'] : array();
		foreach($BillingAddress as $BillingAddressVar => $BillingAddressVal)
			$CRPPFieldsNVP .= '&' . strtoupper($BillingAddressVar) . '=' . urlencode($BillingAddressVal);
			
		$ShippingAddress = isset($DataArray['ShippingAddress']) ? $DataArray['ShippingAddress'] : array();
		foreach($ShippingAddress as $ShippingAddressVar => $ShippingAddressVal)
			$CRPPFieldsNVP .= '&' . strtoupper($ShippingAddressVar) . '=' . urlencode($ShippingAddressVal);
			
		$NVPRequest = $this -> NVPCredentials . $CRPPFieldsNVP;
		$NVPResponse = $this -> CURLRequest($NVPRequest);
		$NVPRequestArray = $this -> NVPToArray($NVPRequest);
		$NVPResponseArray = $this -> NVPToArray($NVPResponse);
		
		$Errors = $this -> GetErrors($NVPResponseArray);
		
		$NVPResponseArray['ERRORS'] = $Errors;
		$NVPResponseArray['REQUESTDATA'] = $NVPRequestArray;
		$NVPResponseArray['RAWREQUEST'] = $NVPRequest;
		$NVPResponseArray['RAWRESPONSE'] = $NVPResponse;
								
		return $NVPResponseArray;	
	}
	
	function GetRecurringPaymentsProfileDetails($DataArray)
	{
		/*
		$GRPPDFields = array(
					   'profileid' => ''			// Profile ID of the profile you want to get details for.
					   );
		*/
		
		$GRPPDFieldsNVP = '&METHOD=GetRecurringPaymentsProfileDetails&BUTTONSOURCE=AngellEYE_PHP_Class_GRPPD';
		
		$GRPPDFields = isset($DataArray['GRPPDFields']) ? $DataArray['GRPPDFields'] : array();
		foreach($GRPPDFields as $GRPPDFieldsVar => $GRPPDFieldsVal)
			$GRPPDFieldsNVP .= '&' . strtoupper($GRPPDFieldsVar) . '=' . urlencode($GRPPDFieldsVal);
			
		$NVPRequest = $this -> NVPCredentials . $GRPPDFieldsNVP;
		$NVPResponse = $this -> CURLRequest($NVPRequest);
		$NVPRequestArray = $this -> NVPToArray($NVPRequest);
		$NVPResponseArray = $this -> NVPToArray($NVPResponse);
		
		$Errors = $this -> GetErrors($NVPResponseArray);
		
		$NVPResponseArray['ERRORS'] = $Errors;
		$NVPResponseArray['REQUESTDATA'] = $NVPRequestArray;
		$NVPResponseArray['RAWREQUEST'] = $NVPRequest;
		$NVPResponseArray['RAWRESPONSE'] = $NVPResponse;
								
		return $NVPResponseArray;
	}

	function ManageRecurringPaymentsProfileStatus($DataArray)
	{
		/*
		$MRPPSFields = array(
						'profileid' => '', 				// Required. Recurring payments profile ID returned from CreateRecurring...
						'action' => '', 				// Required. The action to be performed.  Mest be: Cancel, Suspend, Reactivate
						'note' => ''					// The reason for the change in status.  For express checkout the message will be included in email to buyers.  Can also be seen in both accounts in the status history.
						);
		*/
		
		$MRPPSFieldsNVP = '&METHOD=ManageRecurringPaymentsProfileStatus&BUTTONSOURCE=AngellEYE_PHP_Class_MRPPS';
		
		$MRPPSFields = isset($DataArray['MRPPSFields']) ? $DataArray['MRPPSFields'] : array();
		foreach($MRPPSFields as $MRPPSFieldsVar => $MRPPSFieldsVal)
			$MRPPSFieldsNVP .= '&' . strtoupper($MRPPSFieldsVar) . '=' . urlencode($MRPPSFieldsVal);
			
		$NVPRequest = $this -> NVPCredentials . $MRPPSFieldsNVP;
		$NVPResponse = $this -> CURLRequest($NVPRequest);
		$NVPRequestArray = $this -> NVPToArray($NVPRequest);
		$NVPResponseArray = $this -> NVPToArray($NVPResponse);
		
		$Errors = $this -> GetErrors($NVPResponseArray);
		
		$NVPResponseArray['ERRORS'] = $Errors;
		$NVPResponseArray['REQUESTDATA'] = $NVPRequestArray;
		$NVPResponseArray['RAWREQUEST'] = $NVPRequest;
		$NVPResponseArray['RAWRESPONSE'] = $NVPResponse;
								
		return $NVPResponseArray;
	}
	
	function BillOutstandingAmount($DataArray)
	{
		/*
			$BOAFields = array(
							   'profileid' => '', 				// Required.  Recurring payments profile ID returned from CreateRecurringPaymentsProfile.
							   'amt' => '', 					// The amount to bill.  Must be less than or equal to the current oustanding balance.  Default is to collect entire amount.
							   'note' => ''						// Note about the reason for the non-scheduled payment.  EC profiles will show this message in the email notification to the buyer and can be seen in the details page by both buyer and seller.
							   );
		*/
		
		$BOAFieldsNVP = '&METHOD=BillOutstandingAmount&BUTTONSOURCE=AngellEYE_PHP_Class_BOA';
		
		$BOAFields = isset($DataArray['BOAFields']) ? $DataArray['BOAFields'] : array();
		foreach($BOAFields as $BOAFieldsVar => $BOAFieldsVal)
			$BOAFieldsNVP .= '&' . strtoupper($BOAFieldsVar) . '=' . urlencode($BOAFieldsVal);
			
		$NVPRequest = $this -> NVPCredentials . $BOAFieldsNVP;
		$NVPResponse = $this -> CURLRequest($NVPRequest);
		$NVPRequestArray = $this -> NVPToArray($NVPRequest);
		$NVPResponseArray = $this -> NVPToArray($NVPResponse);
		
		$Errors = $this -> GetErrors($NVPResponseArray);
		
		$NVPResponseArray['ERRORS'] = $Errors;
		$NVPResponseArray['REQUESTDATA'] = $NVPRequestArray;
		$NVPResponseArray['RAWREQUEST'] = $NVPRequest;
		$NVPResponseArray['RAWRESPONSE'] = $NVPResponse;
								
		return $NVPResponseArray;	
	}

	function UpdateRecurringPaymentsProfile($DataArray)
	{
		/*
			$URPPFields = array(
							   'profileid' => '', 							// Required.  Recurring payments ID.
							   'note' => '', 								// Note about the reason for the update to the profile.  Included in EC profile notification emails and in details pages.
							   'desc' => '', 								// Description of the recurring payment profile.
							   'subscribername' => '', 						// Full name of the person receiving the product or service paid for by the recurring payment profile.
							   'profilereference' => '', 					// The merchant's own unique reference or invoice number.
							   'additionalbillingcycles' => '', 			// The number of additional billing cycles to add to this profile.
							   'amt' => '', 								// Billing amount for each cycle in the subscription, not including shipping and tax.  Express Checkout profiles can only be updated by 20% every 180 days.
							   'shippingamt' => '', 						// Shipping amount for each billing cycle during the payment period.
							   'taxamt' => '' 								// Tax amount for each billing cycle during the payment period.
							   'outstandingamt' => '', 						// The current past-due or outstanding amount.  You can only decrease this amount.  
							   'autobilloutamt' => '', 						// This field indiciates whether you would like PayPal to automatically bill the outstanding balance amount in the next billing cycle.
							   'maxfailedpayments' => '', 					// The number of failed payments allowed before the profile is automatically suspended.  The specified value cannot be less than the current number of failed payments for the profile.
							   'profilestartdate' => ''						// The date when the billing for this profile begins.  UTC/GMT format.
							   );
			
			$BillingAddress = array(
								'street' => '', 						// Required.  First street address.
								'street2' => '', 						// Second street address.
								'city' => '', 							// Required.  Name of City.
								'state' => '', 							// Required. Name of State or Province.
								'countrycode' => '', 					// Required.  Country code.
								'zip' => '', 							// Required.  Postal code of payer.
								'phonenum' => '' 						// Phone Number of payer.  20 char max.
							);
			
			$ShippingAddress = array(
								'shiptoname' => '', 					// Required if shipping is included.  Person's name associated with this address.  32 char max.
								'shiptostreet' => '', 					// Required if shipping is included.  First street address.  100 char max.
								'shiptostreet2' => '', 					// Second street address.  100 char max.
								'shiptocity' => '', 					// Required if shipping is included.  Name of city.  40 char max.
								'shiptostate' => '', 					// Required if shipping is included.  Name of state or province.  40 char max.
								'shiptozip' => '', 						// Required if shipping is included.  Postal code of shipping address.  20 char max.
								'shiptocountrycode' => '', 				// Required if shipping is included.  Country code of shipping address.  2 char max.
								'shiptophonenum' => ''					// Phone number for shipping address.  20 char max.
								);
			
			$BillingPeriod = array(
							'trialbillingperiod' => '', 
							'trialbillingfrequency' => '', 
							'trialtotalbillingcycles' => '', 
							'trialamt' => '', 
							'billingperiod' => '', 						// Required.  Unit for billing during this subscription period.  One of the following: Day, Week, SemiMonth, Month, Year
							'billingfrequency' => '', 					// Required.  Number of billing periods that make up one billing cycle.  The combination of billing freq. and billing period must be less than or equal to one year. 
							'totalbillingcycles' => '', 				// the number of billing cycles for the payment period (regular or trial).  For trial period it must be greater than 0.  For regular payments 0 means indefinite...until canceled.  
							'amt' => '', 								// Required.  Billing amount for each billing cycle during the payment period.  This does not include shipping and tax. 
							'currencycode' => '', 						// Required.  Three-letter currency code.
						);
			
			$CCDetails = array(
							'creditcardtype' => '', 					// Required. Type of credit card.  Visa, MasterCard, Discover, Amex, Maestro, Solo.  If Maestro or Solo, the currency code must be GBP.  In addition, either start date or issue number must be specified.
							'acct' => '', 								// Required.  Credit card number.  No spaces or punctuation.  
							'expdate' => '', 							// Required.  Credit card expiration date.  Format is MMYYYY
							'cvv2' => '', 								// Requirements determined by your PayPal account settings.  Security digits for credit card.
							'startdate' => '', 							// Month and year that Maestro or Solo card was issued.  MMYYYY
							'issuenumber' => ''							// Issue number of Maestro or Solo card.  Two numeric digits max.
						);
			
			$PayerInfo = array(
							'email' => '', 								// Payer's email address.
							'firstname' => '', 							// Required.  Payer's first name.
							'lastname' => ''							// Required.  Payer's last name.
						);
		*/
		
		$URPPFieldsNVP = '&METHOD=UpdateRecurringPaymentsProfile&BUTTONSOURCE=AngellEYE_PHP_Class_URPP';
		
		$URPPFields = isset($DataArray['URPPFields']) ? $DataArray['URPPFields'] : array();
		foreach($URPPFields as $URPPFieldsVar => $URPPFieldsVal)
			$URPPFieldsNVP .= '&' . strtoupper($URPPFieldsVar) . '=' . urlencode($URPPFieldsVal);
			
		$BillingAddress = isset($DataArray['BillingAddress']) ? $DataArray['BillingAddress'] : array();
		foreach($BillingAddress as $BillingAddressVar => $BillingAddressVal)
			$URPPFieldsNVP .= '&' . strtoupper($BillingAddressVar) . '=' . urlencode($BillingAddressVal);
			
		$ShippingAddress = isset($DataArray['ShippingAddress']) ? $DataArray['ShippingAddress'] : array();
		foreach($ShippingAddress as $ShippingAddressVar => $ShippingAddressVal)
			$URPPFieldsNVP .= '&' . strtoupper($ShippingAddressVar) . '=' . urlencode($ShippingAddressVal);
			
		$BillingPeriod = isset($DataArray['BillingPeriod']) ? $DataArray['BillingPeriod'] : array();
		foreach($BillingPeriod as $BillingPeriodVar => $BillingPeriodVal)
			$URPPFieldsNVP .= '&' . strtoupper($BillingPeriodVar) . '=' . urlencode($BillingPeriodVal);
			
		$CCDetails = isset($DataArray['CCDetails']) ? $DataArray['CCDetails'] : array();
		foreach($CCDetails as $CCDetailsVar => $CCDetailsVal)
			$URPPFieldsNVP .= '&' . strtoupper($CCDetailsVar) . '=' . urlencode($CCDetailsVal);
			
		$PayerInfo = isset($DataArray['PayerInfo']) ? $DataArray['PayerInfo'] : array();
		foreach($PayerInfo as $PayerInfoVar => $PayerInfoVal)
			$URPPFieldsNVP .= '&' . strtoupper($PayerInfoVar) . '=' . urlencode($PayerInfoVal);
			
		$NVPRequest = $this -> NVPCredentials . $URPPFieldsNVP;
		$NVPResponse = $this -> CURLRequest($NVPRequest);
		$NVPRequestArray = $this -> NVPToArray($NVPRequest);
		$NVPResponseArray = $this -> NVPToArray($NVPResponse);
		
		$Errors = $this -> GetErrors($NVPResponseArray);
		
		$NVPResponseArray['ERRORS'] = $Errors;
		$NVPResponseArray['REQUESTDATA'] = $NVPRequestArray;
		$NVPResponseArray['RAWREQUEST'] = $NVPRequest;
		$NVPResponseArray['RAWRESPONSE'] = $NVPResponse;
								
		return $NVPResponseArray;		
	}
	
	
	function GetRecurringPaymentsProfileStatus($ProfileID)
	{
		$GRPPDFields = array('profileid' => $ProfileID);
		$PayPalRequestData = array('GRPPDFields' => $GRPPDFields);
		
		$PayPalResult = $this -> GetRecurringPaymentsProfileDetails($PayPalRequestData);
		$PayPalErrors = $PayPalResult['ERRORS'];
		$ProfileStatus = isset($PayPalResult['STATUS']) ? $PayPalResult['STATUS'] : 'Unknown';
		
		$ResponseArray = array(
							   'PayPalResult' => $PayPalResult, 
							   'ProfileStatus' => $ProfileStatus
							   );
		
		return $ResponseArray;	
	}
	
	
	function BillAgreementUpdate($DataArray)
	{
		/*
			$BAUFields = array(
							   'referenceid' => '', 							// Required. An ID, such as a billing agreement ID or a reference transaction ID that is associated with a billing agreement.
							   'billingagreementstatus' => '', 					// The current status of the billing agreement, which is one of the following values: Active or Canceled.
							   'billingagreementdescription' => '', 			// Description of goods or services associated with the billing agreement, which is required for each recurring payment billing agreement. PayPal recommends that the description contain a brief summary of the billing agreement terms and conditions. For example, customer will be billed at "9.99 per month for 2 years". 127 Car max.
							   'billingagreementcustom' => ''					// Custom annotation field for your own use.  256 char max.
							   );
		*/
		
		$BAUFieldsNVP = '&METHOD=BillAgreementUpdate&BUTTONSOURCE=AngellEYE_PHP_Class_BAU';
		
		$BAUFields = isset($DataArray['BAUFields']) ? $DataArray['BAUFields'] : array();
		foreach($BAUFields as $BAUFieldsVar => $BAUFieldsVal)
			$BAUFieldsNVP .= '&' . strtoupper($BAUFieldsVar) . '=' . urlencode($BAUFieldsVal);
			
		$NVPRequest = $this -> NVPCredentials . $BAUFieldsNVP;
		$NVPResponse = $this -> CURLRequest($NVPRequest);
		$NVPRequestArray = $this -> NVPToArray($NVPRequest);
		$NVPResponseArray = $this -> NVPToArray($NVPResponse);
		
		$Errors = $this -> GetErrors($NVPResponseArray);
		
		$NVPResponseArray['ERRORS'] = $Errors;
		$NVPResponseArray['REQUESTDATA'] = $NVPRequestArray;
		$NVPResponseArray['RAWREQUEST'] = $NVPRequest;
		$NVPResponseArray['RAWRESPONSE'] = $NVPResponse;
								
		return $NVPResponseArray;
			
	}
	
	
	/*
		MOBILE CHECKOUT
	*/
	
	function SetMobileCheckout($DataArray)
	{
		/*
			$SMCFields = array(
							'phonecountrycode' => '', 				// Three-digit country code for buyer's phone number.  
							'phonenum' => '', 						// Localized phone number used by the buyer to submit the payment request.  if the phone number is activated for mobile checkout, PayPal uses this value to pre-fill the PayPal login page.
							'amt' => '', 							// Required. Cost of item before tax and shipping.
							'currencycode' => '', 					// Required.  Three-character currency code.  Default is USD.
							'taxamt' => '', 						// Tax on item purchased.
							'shippingamt' => '', 					// shipping costs for this transaction.
							'desc' => '', 							// Required. The name of the item is being ordered.  127 char max.
							'number' => '', 						// Pass-through field allowing you to specify detailis, such as a SKU.  127 char max.
							'custom' => '', 						// Free-form field for your own use.  256 char max.
							'invnum' => '', 						// Your own invoice or tracking number.  127 char max.
							'returnurl' => '', 						// URL to direct the browser to after leaving PayPal pages.
							'cancelurl' => '', 						// URL to direct the borwser to if the user cancels payment.
							'addressdisplay' => '', 				// Indiciates whether or not a shipping address is required.  1 or 0. 
							'sharephonenum' => '', 					// Indiciates whether or not the customer's phone number is returned to the merchant.  1 or 0.  
							'email' => '' 							// Email address of the buyer as entered during checkout.  If the phone number is not activated for Mobile Checkout, PayPal uses this value to pre-fill the PayPal login page.  127 char max.
						);
						
		$ShippingAddress = array(
								'shiptoname' => '', 					// Required if shipping is included.  Person's name associated with this address.  32 char max.
								'shiptostreet' => '', 					// Required if shipping is included.  First street address.  100 char max.
								'shiptostreet2' => '', 					// Second street address.  100 char max.
								'shiptocity' => '', 					// Required if shipping is included.  Name of city.  40 char max.
								'shiptostate' => '', 					// Required if shipping is included.  Name of state or province.  40 char max.
								'shiptozip' => '', 						// Required if shipping is included.  Postal code of shipping address.  20 char max.
								'shiptocountry' => '' 					// Required if shipping is included.  Country code of shipping address.  2 char max.
								);
		*/
		
		$SMCFieldsNVP = '&METHOD=SetMobileCheckout&BUTTONSOURCE=AngellEYE_PHP_Class_SMC';
		
		$SMCFields = isset($DataArray['SMCFields']) ? $DataArray['SMCFields'] : array();
		foreach($SMCFields as $SMCFieldsVar => $SMCFieldsVal)
			$SMCFieldsNVP .= '&' . strtoupper($SMCFieldsVar) . '=' . urlencode($SMCFieldsVal);
			
		$ShippingAddress = isset($DataArray['ShippingAddress']) ? $DataArray['ShippingAddress'] : array();
		foreach($ShippingAddress as $ShippingAddressVar => $ShippingAddressVal)
			$SMCFieldsNVP .= '&' . strtoupper($ShippingAddressVar) . '=' . urlencode($ShippingAddressVal);
			
		$NVPRequest = $this -> NVPCredentials . $SMCFieldsNVP;
		$NVPResponse = $this -> CURLRequest($NVPRequest);
		$NVPRequestArray = $this -> NVPToArray($NVPRequest);
		$NVPResponseArray = $this -> NVPToArray($NVPResponse);
		
		$Errors = $this -> GetErrors($NVPResponseArray);
		
		$NVPResponseArray['ERRORS'] = $Errors;
		$NVPResponseArray['REQUESTDATA'] = $NVPRequestArray;
		$NVPResponseArray['RAWREQUEST'] = $NVPRequest;
		$NVPResponseArray['RAWRESPONSE'] = $NVPResponse;
								
		return $NVPResponseArray;
	}

	
	function DoMobileCheckoutPayment($DataArray)
	{
		/*
		$DMCFields = array(
						   'token' => ''				// Token returned by SetMobileCheckout
						   );
		*/
		
		$DMCPFieldsNVP = '&METHOD=DoMobileCheckoutPayment&BUTTONSOURCE=AngellEYE_PHP_Class_DMCP';
		
		$DMCPFields = isset($DataArray['DMCPFields']) ? $DataArray['DMCPFields'] : array();
		foreach($DMCPFields as $DMCPFieldsVar => $DMCPFieldsVal)
			$DMCPFieldsNVP .= '&' . strtoupper($DMCFieldsVar) . '=' . urlencode($DMCFieldsVal);
			
		$NVPRequest = $this -> NVPCredentials . $DMCPFieldsNVP;
		$NVPResponse = $this -> CURLRequest($NVPRequest);
		$NVPRequestArray = $this -> NVPToArray($NVPRequest);
		$NVPResponseArray = $this -> NVPToArray($NVPResponse);
		
		$Errors = $this -> GetErrors($NVPResponseArray);
		
		$NVPResponseArray['ERRORS'] = $Errors;
		$NVPResponseArray['REQUESTDATA'] = $NVPRequestArray;
		$NVPResponseArray['RAWREQUEST'] = $NVPRequest;
		$NVPResponseArray['RAWRESPONSE'] = $NVPResponse;
								
		return $NVPResponseArray;
	}		
	
	
	// Authorization Services
	function SetAuthFlowParam($DataArray)
	{
		/*$SetAuthFlowParamFields = array(
										'ReturnURL' => '', 														// URL to which the customer's browser is returned after choosing to authenticate with PayPal
										'CancelURL' => '', 														// URL to which the customer is returned if they decide not to log in.
										'LogoutURL' => '', 														// URL to which the customer is returned after logging out from your site.
										'LocalCode' => '', 														// Local of pages displayed by PayPal during authentication.  AU, DE, FR, IT, GB, ES, US
										'PageStyle' => '', 														// Sets the custom payment page style of the PayPal pages associated with this button/link.
										'HDRIMG' => '', 														// URL for the iamge you want to appear at the top of the PayPal pages.  750x90.  Should be stored on a secure server.  127 char max.
										'HDRBorderColor' => '', 												// Sets the border color around the header on PayPal pages.HTML Hexadecimal value.
										'HDRBackColor' => '', 													// Sets the background color for PayPal pages.
										'PayFlowColor' => '', 													// Sets the background color for the payment page.
										'InitFlowType' => '', 													// The initial flow type, which is one of the following:  login  / signup   Default is login.
										'FirstName' => '', 														// Customer's first name.
										'LastName' => '',  														// Customer's last name.
										'ServiceName1' => 'Name', 
										'ServiceName2' => 'Email', 
										'ServiceDefReq1' => 'Required', 
										'ServiceDefReq2' => 'Required'
										);
		
		$ShippingAddress = array(
								'ShipToName' => '', 													// Persona's name associated with this address.
								'ShipToStreet' => '', 													// First street address.
								'ShipToStreet2' => '', 													// Second street address.
								'ShipToCity' => '', 													// Name of city.
								'ShipToState' => '', 													// Name of State or Province.
								'ShipToZip' => '', 														// US Zip code or other country-specific postal code.
								'ShipToCountryCode' => '' 												// Country code.
								 );*/
		
		$SetAuthFlowParamFieldsNVP = '&METHOD=SetAuthFlowParam&BUTTONSOURCE=AngellEYE_PHP_Class_SAFP';
		
		// SetAuthFlowParam Fields
		$SetAuthFlowParamFields = isset($DataArray['SetAuthFlowParamFields']) ? $DataArray['SetAuthFlowParamFields'] : array();
		foreach($SetAuthFlowParamFields as $SetAuthFlowParamFieldsVar => $SetAuthFlowParamFieldsVal)
			$SetAuthFlowParamFieldsNVP .= '&' . strtoupper($SetAuthFlowParamFieldsVar) . '=' . urlencode($SetAuthFlowParamFieldsVal);
			
		// ShippingAddress Fields
		$ShippingAddressFields = isset($DataArray['ShippingAddress']) ? $DataArray['ShippingAddress'] : array();
		foreach($ShippingAddressFields as $ShippingAddressFieldsVar => $ShippingAddressFieldsVal)
			$SetAuthFlowParamFieldsNVP .= '&' . strtoupper($ShippingAddressFieldsVar) . '=' . urlencode($ShippingAddressFieldsVal);
			
		$NVPRequest = $this -> NVPCredentials . $SetAuthFlowParamFieldsNVP;
		$NVPResponse = $this -> CURLRequest($NVPRequest);
		$NVPRequestArray = $this -> NVPToArray($NVPRequest);

		$NVPResponseArray = $this -> NVPToArray($NVPResponse);
		
		$Errors = $this -> GetErrors($NVPResponseArray);
		$Token = isset($NVPResponseArray['TOKEN']) ? $NVPResponseArray['TOKEN'] : '';
		$RedirectURL = $Token != '' ? 'https://www.paypal.com/us/cgi-bin/webscr?cmd=_account-authenticate-login&token=' . $Token : '';
		
		$NVPResponseArray['ERRORS'] = $Errors;
		$NVPResponseArray['REDIRECTURL'] = $RedirectURL;
		$NVPResponseArray['REQUESTDATA'] = $NVPRequestArray;
		$NVPResponseArray['RAWREQUEST'] = $NVPRequest;
		$NVPResponseArray['RAWRESPONSE'] = $NVPResponse;
								
		return $NVPResponseArray;
	}
	
	function GetAuthDetails($Token)
	{
		$GetAuthDetailsFieldsNVP = '&METHOD=GetAuthDetails&BUTTONSOURCE=AngellEYE_PHP_Class_GAD&TOKEN=' . $Token;
		
		$NVPRequest = $this -> NVPCredentials . $GetAuthDetailsFieldsNVP;
		$NVPResponse = $this -> CURLRequest($NVPRequest);
		$NVPRequestArray = $this -> NVPToArray($NVPRequest);
		$NVPResponseArray = $this -> NVPToArray($NVPResponse);
		
		$Errors = $this -> GetErrors($NVPResponseArray);
		
		$NVPResponseArray['ERRORS'] = $Errors;
		$NVPResponseArray['REDIRECTURL'] = $RedirectURL;
		$NVPResponseArray['REQUESTDATA'] = $NVPRequestArray;
		$NVPResponseArray['RAWREQUEST'] = $NVPRequest;
		$NVPResponseArray['RAWRESPONSE'] = $NVPResponse;
								
		return $NVPResponseArray;
	}
	
	
	// Permissions Services
	function GetAccessPermissionsDetails($Token)
	{
		$GetAccessPermissionsDetailsNVP = '&METHOD=GetAccessPermissionsDetails&BUTTONSOURCE=AngellEYE_PHP_Class_GACPD&TOKEN=' . $Token;
		
		$NVPRequest = $this -> NVPCredentials . $GetAccessPermissionsDetailsNVP;
		$NVPResponse = $this -> CURLRequest($NVPRequest);
		$NVPRequestArray = $this -> NVPToArray($NVPRequest);
		$NVPResponseArray = $this -> NVPToArray($NVPResponse);
		
		$Errors = $this -> GetErrors($NVPResponseArray);
		
		$Permissions = array();
		$n = 0;
		while(isset($NVPResponseArray['L_ACCESSPERMISSIONNAME' . $n . '']))
		{
			$LName = isset($NVPResponseArray['L_ACCESSPERMISSIONNAME' . $n . '']) ? $NVPResponseArray['L_ACCESSPERMISSIONNAME' . $n . ''] : '';
			$LStatus = isset($NVPResponseArray['L_ACCESSPERMISSIONSTATUS' . $n . '']) ? $NVPResponseArray['L_ACCESSPERMISSIONSTATUS' . $n . ''] : '';
			
			$CurrentItem = array(
								'L_ACCESSPERMISSIONNAME' => $LName, 
								'L_ACCESSPERMISSIONSTATUS' => $LStatus
								);
																	
			array_push($ActivePermissions, $CurrentItem);
			$n++;	
		}
		
		$NVPResponseArray['ERRORS'] = $Errors;
		$NVPResponseArray['Permissions'] = $Permissions;
		$NVPResponseArray['REQUESTDATA'] = $NVPRequestArray;
		$NVPResponseArray['RAWREQUEST'] = $NVPRequest;
		$NVPResponseArray['RAWRESPONSE'] = $NVPResponse;
								
		return $NVPResponseArray;	
	}
	
	function SetAccessPermissions($DataArray)
	{
		/*$SetAccessPermissionsFields = array(
											'ReturnURL' => '', 														// URL to return the browser to after authorizing permissions.
											'CancelURL' => '', 													 	// URL to return if the customer cancels authorization
											'LogoutURL' => '', 														// URL to return to on logout from PayPal
											'LocalCode' => '', 														// Local of pages displayed by PayPal during authentication.  AU, DE, FR, IT, GB, ES, US
											'PageStyle' => '', 														// Sets the custom payment page style of the PayPal pages associated with this button/link.
											'HDRIMG' => '', 														// URL for the iamge you want to appear at the top of the PayPal pages.  750x90.  Should be stored on a secure server.  127 char max.
											'HDRBorderColor' => '', 												// Sets the border color around the header on PayPal pages.HTML Hexadecimal value.
											'HDRBackColor' => '', 													// Sets the background color for PayPal pages.
											'PayFlowColor' => '', 													// Sets the background color for the payment page.
											'InitFlowType' => '', 													// The initial flow type, which is one of the following:  login  / signup   Default is login.
											'FirstName' => '', 														// Customer's first name.
											'LastName' => ''
											);
		
		$RequiredPermissions = array(
									 'Email', 
									 'Name', 
									 'GetBalance', 
									 'RefundTransaction', 
									 'GetTransactionDetails', 
									 'TransactionSearch', 
									 'MassPay', 
									 'EncryptedWebsitePayments', 
									 'GetExpressCheckoutDetails', 
									 'SetExpressCheckout', 
									 'DoExpressCheckoutPayment', 
									 'DoCapture', 
									 'DoAuthorization', 
									 'DoReauthorization', 
									 'DoVoid', 
									 'DoDirectPayment', 
									 'SetMobileCheckout', 
									 'CreateMobileCheckout', 
									 'DoMobileCheckoutPayment', 
									 'DoUATPAuthorization', 
									 'DoUATPExpressCheckoutPayment', 
									 'GetBillingAgreementCustomerDetails', 
									 'SetCustomerBillingAgreement', 
									 'CreateBillingAgreement', 
									 'BillAgreementUpdate', 
									 'BillUser', 
									 'DoReferenceTransaction', 
									 'Express_Checkout', 
									 'Admin_API', 
									 'Auth_Settle', 
									 'Transaction_History'
									 );
		
		$OptionalPermissions = array(
									 'Email', 
									 'Name', 
									 'GetBalance', 
									 'RefundTransaction', 
									 'GetTransactionDetails', 
									 'TransactionSearch', 
									 'MassPay', 
									 'EncryptedWebsitePayments', 
									 'GetExpressCheckoutDetails', 
									 'SetExpressCheckout', 
									 'DoExpressCheckoutPayment', 
									 'DoCapture', 
									 'DoAuthorization', 
									 'DoReauthorization', 
									 'DoVoid', 
									 'DoDirectPayment', 
									 'SetMobileCheckout', 
									 'CreateMobileCheckout', 
									 'DoMobileCheckoutPayment', 
									 'DoUATPAuthorization', 
									 'DoUATPExpressCheckoutPayment', 
									 'GetBillingAgreementCustomerDetails', 
									 'SetCustomerBillingAgreement', 
									 'CreateBillingAgreement', 
									 'BillAgreementUpdate', 
									 'BillUser', 
									 'DoReferenceTransaction', 
									 'Express_Checkout', 
									 'Admin_API', 
									 'Auth_Settle', 
									 'Transaction_History'
									 );
		
		$PayPalRequestData = array(
								   'SetAccessPermissionsFields' => $SetAccessPermissionsFields, 
								   'RequiredPermissions' => $RequiredPermissions, 
								   'OptionalPermissions' => $OptionalPermissions
								   );*/
		
		$SetAccessPermissionsNVP = '&METHOD=SetAccessPermissions&BUTTONSOURCE=AngellEYE_PHP_Class_SAP';
		
		// SetAccessPermissions Fields
		$SetAccessPermissionsFields = isset($DataArray['SetAccessPermissionsFields']) ? $DataArray['SetAccessPermissionsFields'] : array();
		foreach($SetAccessPermissionsFields as $SetAccessPermissionsFieldsVar => $SetAccessPermissionsFieldsVal)
			$SetAccessPermissionsNVP .= '&' . strtoupper($SetAccessPermissionsFieldsVar) . '=' . urlencode($SetAccessPermissionsFieldsVal);
		
		$n = 0;
		$RequiredPermissions = isset($DataArray['RequiredPermissions']) ? $DataArray['RequiredPermissions'] : array();
		foreach($RequiredPermissions as $RequiredPermission)
		{
			$SetAccessPermissionsNVP .= '&L_REQUIREDACCESSPERMISSIONS' . $n . '=' . urlencode($RequiredPermission);
			$n++;
		}
		
		$n = 0;
		$OptionalPermissions = isset($DataArray['OptionalPermissions']) ? $DataArray['OptionalPermissions'] : array();
		foreach($OptionalPermissions as $OptionalPermission)
		{
			$SetAccessPermissionsNVP .= '&L_OPTIONALACCESSPERMISSIONS' . $n . '=' . urlencode($OptionalPermission);
			$n++;
		}
		
		$NVPRequest = $this -> NVPCredentials . $SetAccessPermissionsNVP;
		$NVPResponse = $this -> CURLRequest($NVPRequest);
		$NVPRequestArray = $this -> NVPToArray($NVPRequest);
		$NVPResponseArray = $this -> NVPToArray($NVPResponse);
		
		$Errors = $this -> GetErrors($NVPResponseArray);
		$Token = isset($NVPResponseArray['TOKEN']) ? $NVPResponseArray['TOKEN'] : '';
		
		if($this -> Sandbox)
		{
			$RedirectURL = $Token != '' ? 'https://www.sandbox.paypal.com/us/cgi-bin/webscr?cmd=_access-permission-login&token=' . $Token : '';
			$LogoutRedirectURL = $Token != '' ? 'https://www.sandbox.paypal.com/us/cgi-bin/webscr?cmd=_access-permission-logout&token=' . $Token : '';
		}
		else
		{
			$RedirectURL = $Token != '' ? 'https://www.paypal.com/us/cgi-bin/webscr?cmd=_access-permission-login&token=' . $Token : '';
			$LogoutRedirectURL = $Token != '' ? 'https://www.paypal.com/us/cgi-bin/webscr?cmd=_access-permission-logout&token=' . $Token : '';
		}
		
		$NVPResponseArray['ERRORS'] = $Errors;
		$NVPResponseArray['REDIRECTURL'] = $RedirectURL;
		$NVPResponseArray['LOGOUTREDIRECTURL'] = $LogoutRedirectURL;
		$NVPResponseArray['REQUESTDATA'] = $NVPRequestArray;
		$NVPResponseArray['RAWREQUEST'] = $NVPRequest;
		$NVPResponseArray['RAWRESPONSE'] = $NVPResponse;
								
		return $NVPResponseArray;
	}
	
	function UpdateAccessPermissions($PayerID)
	{
		$UpdateAcccessPermissionsNVP = '&METHOD=UpdateAccessPermissions&BUTTONSOURCE=AngellEYE_PHP_Class_UAP&PAYERID=' . $PayerID;	
		
		$NVPRequest = $this -> NVPCredentials . $UpdateAcccessPermissionsNVP;
		$NVPResponse = $this -> CURLRequest($NVPRequest);
		$NVPRequestArray = $this -> NVPToArray($NVPRequest);
		$NVPResponseArray = $this -> NVPToArray($NVPResponse);
		
		$Errors = $this -> GetErrors($NVPResponseArray);
		
		$NVPResponseArray['ERRORS'] = $Errors;
		$NVPResponseArray['REDIRECTURL'] = $RedirectURL;
		$NVPResponseArray['REQUESTDATA'] = $NVPRequestArray;
		$NVPResponseArray['RAWREQUEST'] = $NVPRequest;
		$NVPResponseArray['RAWRESPONSE'] = $NVPResponse;
								
		return $NVPResponseArray;
	}
	
}  // End class PayPalPro
?>