<?php

global $espresso_wp_user;
$payment_settings = get_option('payment_data_' . $espresso_wp_user);
$ideal_mollie_settings = $payment_settings['ideal'];

require_once('ideal.class.php');

$partner_id = $ideal_mollie_settings['ideal_mollie_partner_id']; // Uw mollie partner ID

if (isset($_GET['transaction_id'])) {
	$iDEAL = new iDEAL_Payment($partner_id);
	// $iDEAL->setTestMode();

	$iDEAL->checkPayment($_GET['transaction_id']);

	if ($iDEAL->getPaidStatus() == true) {

		global $wpdb;

		$attendee_id = $_GET['id'];
		$transaction_id = $_GET['transaction_id'];
		$payment_status = "Completed";
		$payment_date = date('Y-m-d');
		$sql = "UPDATE " . EVENTS_ATTENDEE_TABLE . " SET payment_status = '$payment_status', txn_type = 'Mollie', txn_id = '$transaction_id', payment_date ='$payment_date' WHERE registration_id ='" . espresso_registration_id($attendee_id) . "' ";
		$wpdb->query($sql);

		/*
		 * Payment ok
		 */
		/* De betaling is betaald, deze informatie kan opgeslagen worden (bijv. in de database).
		  Met behulp van $iDEAL->getConsumerInfo(); kunt u de consument gegevens ophalen (de
		  functie returned een array). Met behulp van $iDEAL->getAmount(); kunt u het betaalde
		  bedrag vergelijken met het bedrag dat afgerekend zou moeten worden. */
	}
}
