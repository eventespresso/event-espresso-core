<?php

if (isset($_REQUEST['ideal']) && $_REQUEST['ideal'] == 1) //need this condition so that ideal correctly redirects to the selected bank
	ob_start(); //before this condition, ob_start() was causing issues with pdf invoice.  Will not work inside the function.

//Payment processing - Used for onsite payment processing. Used with the [ESPRESSO_TXN_PAGE] tag

function event_espresso_txn() {
	global $wpdb, $org_options;
	if (!empty($org_options['full_logging']) && $org_options['full_logging'] == 'Y') {
		espresso_log::singleton()->log(array('file' => __FILE__, 'function' => __FUNCTION__, 'status' => ''));
	}
	$attendee_id = "";
	/*foreach ($_REQUEST as $k => $v){
	  print "   $k = $v\n";

	  }*/
	if (isset($_REQUEST['id']))
		$attendee_id = $_REQUEST['id']; //This is the id of the registrant
	if (isset($_REQUEST['x_cust_id']) && $_REQUEST['x_cust_id'] != '') {
		$attendee_id = $_REQUEST['x_cust_id'];
	}
	
	if (isset($_REQUEST['authAmountString'])) {
		$attendee_id = $_REQUEST['cartId'];
	}

	if ($attendee_id == "") {
		echo "ID not supplied.";
	} else {
		$email_subject = $org_options['payment_subject'];
		$email_body = $org_options['payment_message'];
		$default_mail = $org_options['default_mail'];
		$Organization = $org_options['organization'];
		$contact = $org_options['contact_email'];
		$email_before_payment = $org_options['email_before_payment'];

		//Load the payment gateways
		if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/index.php") || file_exists(EVENT_ESPRESSO_PLUGINFULLPATH . "gateways/index.php")) {
			if (get_option('events_paytrace_active') == true && isset($_POST['paytrace']) && !empty($_POST['paytrace']) && $_POST['paytrace'] == 'true') {
				if (file_exists(EVENT_ESPRESSO_PLUGINFULLPATH . "gateways/paytrace/do_transaction.php")) {
					require_once(EVENT_ESPRESSO_PLUGINFULLPATH . "gateways/paytrace/do_transaction.php");
				}
			}
			//Load iDEAL (Mollie)
			elseif ((get_option('events_ideal_active') == 'true') && !empty($_REQUEST['ideal']) && $_REQUEST['ideal'] == 1 && $_REQUEST['id'] != '') {
				//Ideal works a little differently.
				//on the EE payment page, there is a dropdown with a list of banks that is pulled from Mollie.
				//The customer selects the bank, submits and is redirected to the payment page
				//Once returns, there is a transaction_id in the variable

				$ideal_folder = EVENT_ESPRESSO_PLUGINFULLPATH . "gateways/ideal/";

				if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/ideal/ideal_vars.php")) {
					//Moved files
					$ideal_folder = EVENT_ESPRESSO_GATEWAY_DIR . "/ideal/";
				}
				//if the transaction id is not set, then they selected a bank and clicked on the button on ee payment page
				if (!isset($_GET['transaction_id'])) {
					require_once($ideal_folder . "ideal_vars.php");
				} else {
					require_once($ideal_folder . "report.php");
				}

				//Load PayPal IPN
			} elseif ($payment_settings['paypal_pro']['active'] == true
							&& !empty($_REQUEST['paypal_pro']) && $_REQUEST['paypal_pro'] == 'true'
							&& !empty($_REQUEST['id'])) {

				if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/paypal_pro/DoDirectPayment.php")) {
					//Moved files
					require_once(EVENT_ESPRESSO_GATEWAY_DIR . "/paypal_pro/DoDirectPayment.php");
				} elseif (file_exists(EVENT_ESPRESSO_PLUGINFULLPATH . "gateways/paypal_pro/DoDirectPayment.php")) {
					//Default files
					require_once(EVENT_ESPRESSO_PLUGINFULLPATH . "gateways/paypal_pro/DoDirectPayment.php");
				}
			} elseif (get_option('events_eway_active') == 'true' && isset($_REQUEST['AccessPaymentCode'])) {
				if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/eway/ewaypaymentprocess.php")) {
					//Moved files
					require_once(EVENT_ESPRESSO_GATEWAY_DIR . "/eway/ewaypaymentprocess.php");
				} elseif (file_exists(EVENT_ESPRESSO_PLUGINFULLPATH . "gateways/eway/ewaypaymentprocess.php")) {
					//Default files
					require_once(EVENT_ESPRESSO_PLUGINFULLPATH . "gateways/eway/ewaypaymentprocess.php");
				}
			} elseif (get_option('events_quickpay_active') == 'true' && isset($_REQUEST['chronopay_callback'])) {
				if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/quickpay/quickpaypaymentprocess.php")) {
					//Moved files
					require_once(EVENT_ESPRESSO_GATEWAY_DIR . "/quickpay/quickpaypaymentprocess.php");
				} elseif (file_exists(EVENT_ESPRESSO_PLUGINFULLPATH . "gateways/quickpay/quickpaypaymentprocess.php")) {
					//Default files
					require_once(EVENT_ESPRESSO_PLUGINFULLPATH . "gateways/quickpay/quickpaypaymentprocess.php");
				}
				//Process Firstdata
			} elseif ((get_option('events_firstdata_active') == 'true')
							&& !empty($_REQUEST['firstdata']) && $_REQUEST['firstdata'] == '1'
							&& !empty($_REQUEST['id'])) {

				if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/firstdata/Firstdata.php")) {
					//Moved files
					require_once(EVENT_ESPRESSO_GATEWAY_DIR . "/firstdata/Firstdata.php");
				} elseif (file_exists(EVENT_ESPRESSO_PLUGINFULLPATH . "gateways/firstdata/Firstdata.php")) {
					//Default files
					require_once(EVENT_ESPRESSO_PLUGINFULLPATH . "gateways/firstdata/Firstdata.php");
				}
			} elseif (get_option('events_firstdata_connect_2_active') == 'true' && !empty($_REQUEST['response_hash'])) {
				if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/firstdata_connect_2/firstdata_connect_2_ipn.php")) {
					//Moved files
					require_once(EVENT_ESPRESSO_GATEWAY_DIR . "/firstdata_connect_2/firstdata_connect_2_ipn.php");
				} elseif (file_exists(EVENT_ESPRESSO_PLUGINFULLPATH . "gateways/firstdata_connect_2/firstdata_connect_2_ipn.php")) {
					//Default files
					require_once(EVENT_ESPRESSO_PLUGINFULLPATH . "gateways/firstdata_connect_2/firstdata_connect_2_ipn.php");
				}
			} elseif (get_option('events_worldpay_active') == 'true') {
				if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/worldpay/worldpay_ipn.php")) {
					//Moved files
					require_once(EVENT_ESPRESSO_GATEWAY_DIR . "/worldpay/worldpay_ipn.php");
				} elseif (file_exists(EVENT_ESPRESSO_PLUGINFULLPATH . "gateways/worldpay/worldpay_ipn.php")) {
					//Default files
					require_once(EVENT_ESPRESSO_PLUGINFULLPATH . "gateways/worldpay/worldpay_ipn.php");
				}
				//Load Merchant Warrior IPN
			} elseif (get_option('events_mwarrior_active') == 'true') {
				if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/mwarrior/mwarrior_ipn.php")) {
					//Moved files
					require_once(EVENT_ESPRESSO_GATEWAY_DIR . "/mwarrior/mwarrior_ipn.php");
				} elseif (file_exists(EVENT_ESPRESSO_PLUGINFULLPATH . "gateways/mwarrior/mwarrior_ipn.php")) {
					//Default files
					require_once(EVENT_ESPRESSO_PLUGINFULLPATH . "gateways/mwarrior/mwarrior_ipn.php");
				}
				//Load Authorize.net AIM IPN
			} elseif ($payment_settings['authnet_aim']['active'] == true && ($_REQUEST['x_cust_id'] != '' && $_REQUEST['authnet_aim'] == 'true')) {
				if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/aim/aim_ipn.php")) {
					//Moved files
					require_once(EVENT_ESPRESSO_GATEWAY_DIR . "/aim/aim_ipn.php");
				} elseif (file_exists(EVENT_ESPRESSO_PLUGINFULLPATH . "gateways/aim/aim_ipn.php")) {
					//Default files
					require_once(EVENT_ESPRESSO_PLUGINFULLPATH . "gateways/aim/aim_ipn.php");
				}
				$result = espresso_aim_process_payment();
				extract($result);
			} elseif ($payment_settings['authnet_sim']['active'] == true && $_REQUEST['x_cust_id'] != '' && $_REQUEST['authnet_aim'] != 'true') {
				if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/authnet/authnet_ipn.php")) {
					//Moved files
					require_once(EVENT_ESPRESSO_GATEWAY_DIR . "/authnet/authnet_ipn.php");
				} elseif (file_exists(EVENT_ESPRESSO_PLUGINFULLPATH . "gateways/authnet/authnet_ipn.php")) {
					//Default files
					require_once(EVENT_ESPRESSO_PLUGINFULLPATH . "gateways/authnet/authnet_ipn.php");
				}
			} elseif ($payment_settings['2checkout']['active'] == true && !empty($_REQUEST['x_receipt_link_url'])) {
				if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/2checkout/2checkoutpaymentprocess.php")) {
					//Moved files
					require_once(EVENT_ESPRESSO_GATEWAY_DIR . "/2checkout/2checkoutpaymentprocess.php");
				} elseif (file_exists(EVENT_ESPRESSO_PLUGINFULLPATH . "gateways/2checkout/2checkoutpaymentprocess.php")) {
					//Default files
					require_once(EVENT_ESPRESSO_PLUGINFULLPATH . "gateways/2checkout/2checkoutpaymentprocess.php");
				}
				$result = espresso_2checkout_process_payment();
				extract($result);
			} elseif ($payment_settings['paypal']['active'] == true && empty($_REQUEST['x_cust_id'])) {
				if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/paypal/paypal_ipn.php")) {
					//Moved files
					require_once(EVENT_ESPRESSO_GATEWAY_DIR . "/paypal/paypal_ipn.php");
				} elseif (file_exists(EVENT_ESPRESSO_PLUGINFULLPATH . "gateways/paypal/paypal_ipn.php")) {
					//Default files
					require_once(EVENT_ESPRESSO_PLUGINFULLPATH . "gateways/paypal/paypal_ipn.php");
				}
				//Process PayPal PRO
			} else {
				//Send an email if payment gateways are not found.
				$subject = __('Problem With Your Website Payment IPN', 'event_espresso');
				$body = __('The IPN for ' . $Organization . ' at ' . home_url() . ' is not working properly or has not been setup correctly. Date/time' . date('g:i A'), 'event_espresso');
				wp_mail($contact, $subject, $body);
			}
		} else {
			//Send an email if the payemnt gateway is not set up.
			$subject = __('Website Payment IPN Not Setup', 'event_espresso');
			$body = __('The IPN for ' . $Organization . ' at ' . home_url() . ' has not been properly setup and is not working. Date/time' . date('g:i A'), 'event_espresso');
			wp_mail($contact, $subject, $body);
		}



		//Sends users to the thank you page if they try to access this page directly
		if (!empty($payment_status) && $payment_status == 'Completed') {

			$espresso_session_id = $_SESSION['espresso_session_id'];
			$registration_id = espresso_registration_id($attendee_id);
			//Adding this query for multi event
			//Since the registration id is used for marking the event as paid in the above files,
			//using this query to make sure that other events in the cart are also marked as paid
			//At this point the session id has changed
			//find the old session_id based on reg id

			$s = $wpdb->get_row("SELECT attendee_session, txn_id, txn_type, payment_date, amount_pd, coupon_code FROM " . EVENTS_ATTENDEE_TABLE . " WHERE registration_id='$registration_id' ORDER BY id LIMIT 1 ");

			$old_session_id = $s->attendee_session;

			/*
			 * NOTE BY ABEL 6/1/11
			 *
			 * I was going to drop amount_pd=$s->amount_pd in the following query to show how much was paid for all events in the cart
			 * but decided not to because it will create accounting discrepancies.
			 * Example, user registers for 2 different events, $30 and $35. Total $65.  Makes payment for
			 * $65 and the first event shows as paid $65 in event overview, the second event 0.  If I were to show amount_pd
			 * of $65 for both events, the total would show $130 for both events
			 *
			 * Suggestion.
			 *
			 * Since the event cost for each one of the events in the shopping cart is now being recorded in total_cost, I
			 * suggest the total payment due be the sum of those fields, grouped by the session id.  After the payment is made,
			 * and is successful, the query below can be adjusted to amount_pd=total_cost.  This way, each registrant group
			 * will have the correct amount associated with their registration.  From the above example, on the
			 * admin attendee overview, for the firs event it will show $30 and for the second event it will show $35, the correct amounts.
			 *
			 */

			//update the records
			$SQL = "UPDATE " . EVENTS_ATTENDEE_TABLE . " SET payment_status = '$payment_status', txn_id='$s->txn_id', txn_type='$s->txn_type', payment_date='$s->payment_date' WHERE attendee_session='$old_session_id'";

			$wpdb->query($SQL);


			//Send payment confirmation emails
			event_espresso_send_payment_notification(array('attendee_id' => $attendee_id));

			//Send the email confirmation
			//@params $attendee_id, $send_admin_email, $send_attendee_email
			if ($email_before_payment == 'N') {
				event_espresso_email_confirmations(array('attendee_id' => $attendee_id, 'send_admin_email' => 'true', 'send_attendee_email' => 'true'));
			}
			//wp_redirect(home_url().'/?page_id='.$org_options['return_url'] . "&attendee_id=$attendee_id&espresso_session_id=$espresso_session_id&registration_id=$registration_id" );
			//exit;

			if (file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . "payment_overview.php")) {
				require_once(EVENT_ESPRESSO_TEMPLATE_DIR . "payment_overview.php"); //This is the path to the template file if available
			} else {
				require_once(EVENT_ESPRESSO_PLUGINFULLPATH . "templates/payment_overview.php");
			}

			//This loads the affiliate tracking code if installed
			if (file_exists(EVENT_ESPRESSO_TEMPLATE_DIR . "affiliate_tracking.php")) {
				require_once(EVENT_ESPRESSO_TEMPLATE_DIR . "affiliate_tracking.php");
			}
		}
	}
}

add_shortcode('ESPRESSO_TXN_PAGE', 'event_espresso_txn');
