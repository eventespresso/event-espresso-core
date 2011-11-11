<?php

$firstdata_connect_2_settings = get_option('event_espresso_firstdata_connect_2_settings');
include("Fdggutil.php");
$total_cost = "2.00";
$fdggutil = new Fdggutil($firstdata_connect_2_settings['storename'],
								$firstdata_connect_2_settings['sharedSecret'],
								$firstdata_connect_2_settings['timezone'],
								$total_cost,
								$firstdata_connect_2_settings['sandbox']);
$button_url = $firstdata_connect_2_settings['button_url'];
if (!empty($firstdata_connect_2_settings['bypass_payment_page']) && $firstdata_connect_2_settings['bypass_payment_page'] == 'Y') {
	echo $fdggutil->submitPayment();
} else {
	echo $fdggutil->submitButton($button_url);
}