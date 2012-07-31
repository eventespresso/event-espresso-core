<?php
// Included required files.
require_once('includes/config.php');
require_once('includes/paypal.nvp.class.php');

// Setup PayPal object
$PayPalConfig = array('Sandbox' => $sandbox, 'APIUsername' => $api_username, 'APIPassword' => $api_password, 'APISignature' => $api_signature);
$PayPal = new PayPal($PayPalConfig);

// Populate data arrays with order data.
$GBFields = array(
				'returnallcurrencies' => '1'					// Whether or not to return all currencies.  0 or 1.
			);

// Wrap all data arrays into a single, "master" array which will be passed into the class function.
$PayPalRequestData = array(
						   'GBFields' => $GBFields
						   );

// Pass the master array into the PayPal class function
$PayPalResult = $PayPal->GetBalance($PayPalRequestData);

// Display results
echo '<pre />';
print_r($PayPalResult);
?>