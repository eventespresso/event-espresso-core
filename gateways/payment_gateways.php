<?php

function before_gateways() {
	$before_gateways = '<div id="event_reg_theme" class="wrap"><div id="icon-options-event" class="icon32"></div>';
	$before_gateways .= '<h2>' . __('Manage Payment Gateways', 'event_espresso') . '</h2>';
	$before_gateways .= '<div id="poststuff" class="metabox-holder has-right-sidebar">';
	$before_gateways .= event_espresso_get_right_column();
	$before_gateways .= '<div id="post-body"><div id="post-body-content"><div class="meta-box-sortables ui-sortables">';
	return $before_gateways;
}

function after_gateways() {
	$output = '';
	global $espresso_premium;
	if ($espresso_premium != true)
		$output .= '<h2>' . __('Need more payment options?', 'event_espresso') . ' <a href="http://eventespresso.com/download/" target="_blank">' . __('Upgrade Now!', 'event_espresso') . '</a></h2>';
	$output .= '</div><!-- / .meta-box-sortables --></div><!-- / #post-body-content --></div><!-- / #post-body --></div><!-- / #poststuff --></div><!-- / #wrap -->';
	$output .= '<div id="button_image" style="display:none"><h2>' . __('Button Image URL', 'event_espresso') . '</h2>';
	$output .= '<p>' . __('A default payment button is provided. A custom payment button may be used, choose your image or upload a new one, and just copy the "file url" here (optional.)', 'event_espresso') . '</p>';
	$output .= '</div><div id="bypass_confirmation" style="display:none">';
	$output .= '<h2>' . __('By-passing the Confirmation Page', 'event_espresso') . '</h2>';
	$output .= '<p>' . __('This will allow you to send your customers directly to the payment gateway of your choice.', 'event_espresso') . '</p></div>';
	$output .= '<script type="text/javascript" charset="utf-8">
        //<![CDATA[
         jQuery(document).ready(function() {
          postboxes.add_postbox_toggles("payment_gateways");
          });
        //]]>
        </script>';
	return $output;
}

//This is the payment gateway settings page.
function event_espresso_gateways_options() {
	global $active_gateways;
	$active_gateways = get_option('event_espresso_active_gateways', array());
	echo before_gateways();

	$gateways_glob = glob(EVENT_ESPRESSO_PLUGINFULLPATH . "gateways/*/settings.php");
	$upload_gateways_glob = glob(EVENT_ESPRESSO_GATEWAY_DIR . '*/settings.php');
	if (!is_array($upload_gateways_glob))
		$upload_gateways_glob = array();
	foreach ($upload_gateways_glob as $upload_gateway) {
		$pos = strpos($upload_gateway, 'gateways');
		$sub = substr($upload_gateway, $pos);
		foreach ($gateways_glob as &$gateway) {
			$pos2 = strpos($gateway, 'gateways');
			$sub2 = substr($gateway, $pos2);
			if ($sub == $sub2) {
				$gateway = $upload_gateway;
			}
		}
		unset($gateway);
	}
	$gateways = array_merge($upload_gateways_glob, $gateways_glob);
	$gateways = array_unique($gateways);

	foreach ($gateways as $gateway) {
		require_once($gateway);
	}

	do_action('action_hook_espresso_display_gateway_settings');

	if (file_exists(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/admin-files/gateway_developer.php')) {
		require_once(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/admin-files/gateway_developer.php');
	}
	echo after_gateways();
}

function espresso_update_active_gateways() {
	//upgrade script for those updating from versions prior to 3.1.16.P
	//hooked to plugin activation
	//
	// Have to get a list of users already using the 3.2 system

	global $wpdb;
	$sql = "SELECT id FROM " . $wpdb->usermeta . " WHERE meta_key='payment_settings'";
	$users = $wpdb->get_col($sql);

	// Payment settings prior to 3.2 have been independent wp_options in the db
	// This part takes the independent options and puts them into the payment
	// settings for the default ee_user, number 1.
	if (empty($users)) {
		$payment_settings = array();
		$twocheckout_settings = get_option('event_espresso_2checkout_settings');
		if (!empty($twocheckout_settings)) {
			$payment_settings['2checkout'] = $twocheckout_settings;
		}
		$authnet_aim_settings = get_option('event_espresso_authnet_aim_settings');
		if (!empty($authnet_aim_settings)) {
			$payment_settings['aim'] = $authnet_aim_settings;
		}
		$alipay_settings = get_option('event_espresso_alipay_settings');
		if (!empty($alipay_settings)) {
			$payment_settings['alipay'] = $alipay_settings;
		}
		$authnet_settings = get_option('event_espresso_authnet_settings');
		if (!empty($authnet_settings)) {
			$payment_settings['authnet'] = $authnet_settings;
		}
		$bank_settings = get_option('event_espresso_bank_settings');
		if (!empty($bank_settings)) {
			$payment_settings['bank'] = $bank_settings;
		}
		$check_settings = get_option('event_espresso_check_settings');
		if (!empty($check_settings)) {
			$payment_settings['check'] = $check_settings;
		}
		$eway_settings = get_option('event_espresso_eway_settings');
		if (!empty($eway_settings)) {
			$payment_settings['eway'] = $eway_settings;
		}
		$exact_settings = get_option('event_espresso_exact_settings');
		if (!empty($exact_settings)) {
			$payment_settings['exact'] = $exact_settings;
		}
		$firstdata_settings = get_option('event_espresso_firstdata_settings');
		if (!empty($firstdata_settings)) {
			$payment_settings['firstdata'] = $firstdata_settings;
		}
		$firstdata_connect_2_settings = get_option('event_espresso_firstdata_connect_2_settings');
		if (!empty($firstdata_connect_2_settings)) {
			$payment_settings['firstdata_connect_2'] = $firstdata_connect_2_settings;
		}
		$ideal_settings = get_option('event_espresso_ideal_settings');
		if (!empty($ideal_settings)) {
			$payment_settings['ideal'] = $ideal_settings;
		}
		$invoice_settings = get_option('event_espresso_invoice_settings');
		if (!empty($invoice_settings)) {
			$payment_settings['invoice'] = $invoice_settings;
		}
		$mwarrior_settings = get_option('event_espresso_mwarrior_settings');
		if (!empty($mwarrior_settings)) {
			$payment_settings['mwarrior'] = $mwarrior_settings;
		}
		$nab_settings = get_option('event_espresso_nab_settings');
		if (!empty($nab_settings)) {
			$payment_settings['nab'] = $nab_settings;
		}
		$paypal_settings = get_option('event_espresso_paypal_settings');
		if (!empty($paypal_settings)) {
			$payment_settings['paypal'] = $paypal_settings;
		}
		$paypal_pro_settings = get_option('event_espresso_paypal_pro_settings');
		if (!empty($paypal_pro_settings)) {
			$payment_settings['paypal_pro'] = $paypal_pro_settings;
		}
		$paytrace_settings = get_option('event_espresso_paytrace_settings');
		if (!empty($paytrace_settings)) {
			$payment_settings['paytrace'] = $paytrace_settings;
		}
		$quickpay_settings = get_option('event_espresso_quickpay_settings');
		if (!empty($quickpay_settings)) {
			$payment_settings['quickpay'] = $quickpay_settings;
		}
		$realauth_settings = get_option('event_espresso_realauth_settings');
		if (!empty($realauth_settings)) {
			$payment_settings['realauth'] = $realauth_settings;
		}
		$stripe_settings = get_option('event_espresso_stripe_settings');
		if (!empty($stripe_settings)) {
			$payment_settings['stripe'] = $stripe_settings;
		}
		$wepay_settings = get_option('event_espresso_wepay_settings');
		if (!empty($wepay_settings)) {
			$payment_settings['wepay'] = $wepay_settings;
		}
		$worldpay_settings = get_option('event_espresso_worldpay_settings');
		if (!empty($worldpay_settings)) {
			$payment_settings['worldpay'] = $worldpay_settings;
		}
		update_user_meta(1, 'payment_settings', $payment_settings);
		$users[0] = 1;
	}

	// This part updates any logos to the logos in the currently activated version of ee if they are the default
	// logos. If there have been custom logos uploaded, attempt to use them. If the admin used the media uploader button
	// then they should be fine. If they hand uploaded to the old ee folder, manually linked to it, and then
	// delete the old ee folder, advise them to use the media uploader.

	foreach ($users_ as $user) {
		$payment_settings = get_user_meta($user, 'payment_settings', true);
		if (!empty($payment_settings['2checkout']) && strpos($payment_settings['2checkout']['button_url'], "/2checkout/lib/logo.png")) {
			if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/2checkout/lib/logo.png")) {
				$payment_settings['2checkout']['button_url'] = EVENT_ESPRESSO_GATEWAY_URL . "/2checkout/lib/logo.png";
			} else {
				$payment_settings['2checkout']['button_url'] = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/2checkout/lib/logo.png";
			}
		}

		if (!empty($payment_settings['alipay']) && strpos($payment_settings['alipay']['button_url'], "/alipay/lib/new_logo.jpg")) {
			if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/alipay/lib/new_logo.jpg")) {
				$payment_settings['alipay']['button_url'] = EVENT_ESPRESSO_GATEWAY_URL . "/alipay/lib/new_logo.jpg";
			} else {
				$payment_settings['alipay']['button_url'] = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/alipay/lib/new_logo.jpg";
			}
		}

		if (!empty($payment_settings['authnet']) && strpos($payment_settings['authnet']['button_url'], "/authnet/lib/btn_cc_vmad.gif")) {
			if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/authnet/lib/btn_cc_vmad.gif")) {
				$payment_settings['authnet']['button_url'] = EVENT_ESPRESSO_GATEWAY_URL . "/authnet/lib/btn_cc_vmad.gif";
			} else {
				$payment_settings['authnet']['button_url'] = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/authnet/lib/btn_cc_vmad.gif";
			}
		}

		if (!empty($payment_settings['eway']) && strpos($payment_settings['eway']['button_url'], "/eway/lib/eway_logo.png")) {
			if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/eway/lib/eway_logo.png")) {
				$payment_settings['eway']['button_url'] = EVENT_ESPRESSO_GATEWAY_URL . "/eway/lib/eway_logo.png";
			} else {
				$payment_settings['eway']['button_url'] = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/eway/lib/eway_logo.png";
			}
		}

		if (!empty($payment_settings['exact']) && strpos($payment_settings['exact']['button_url'], "/exact/lib/btn_cc_vmad.gif")) {
			if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/exact/lib/btn_cc_vmad.gif")) {
				$payment_settings['exact']['button_url'] = EVENT_ESPRESSO_GATEWAY_URL . "/exact/lib/btn_cc_vmad.gif";
			} else {
				$payment_settings['exact']['button_url'] = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/exact/lib/btn_cc_vmad.gif";
			}
		}

		if (!empty($payment_settings['firstdata_connect_2']) && strpos($payment_settings['firstdata_connect_2']['button_url'], "/firstdata_connect_2/lib/standard_button.gif")) {
			if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/firstdata_connect_2/lib/standard_button.gif")) {
				$payment_settings['firstdata_connect_2']['button_url'] = EVENT_ESPRESSO_GATEWAY_URL . "/firstdata_connect_2/lib/standard_button.gif";
			} else {
				$payment_settings['firstdata_connect_2']['button_url'] = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/firstdata_connect_2/lib/standard_button.gif";
			}
		}

		if (!empty($payment_settings['mwarrior']) && strpos($payment_settings['mwarrior']['button_url'], "/mwarrior/lib/btn_checkout.png")) {
			if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/mwarrior/lib/btn_checkout.png")) {
				$payment_settings['mwarrior']['button_url'] = EVENT_ESPRESSO_GATEWAY_URL . "/mwarrior/lib/btn_checkout.png";
			} else {
				$payment_settings['mwarrior']['button_url'] = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/mwarrior/lib/btn_checkout.png";
			}
		}

		if (!empty($payment_settings['paypal']) && strpos($payment_settings['paypal']['button_url'], "/paypal/lib/btn_stdCheckout2.gif")) {
			if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/paypal/lib/btn_stdCheckout2.gif")) {
				$payment_settings['paypal']['button_url'] = EVENT_ESPRESSO_GATEWAY_URL . "/paypal/lib/btn_stdCheckout2.gif";
			} else {
				$payment_settings['paypal']['button_url'] = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/paypal/lib/btn_stdCheckout2.gif";
			}
		}

		if (!empty($payment_settings['realauth']) && strpos($payment_settings['realauth']['button_url'], "/realauth/lib/logo.gif")) {
			if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/realauth/lib/logo.gif")) {
				$payment_settings['realauth']['button_url'] = EVENT_ESPRESSO_GATEWAY_URL . "/realauth/lib/logo.gif";
			} else {
				$payment_settings['realauth']['button_url'] = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/realauth/lib/logo.gif";
			}
		}

		if (!empty($payment_settings['wepay']) && strpos($payment_settings['wepay']['button_url'], "/wepay/lib/logo.png")) {
			if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/wepay/lib/logo.png")) {
				$payment_settings['wepay']['button_url'] = EVENT_ESPRESSO_GATEWAY_URL . "/wepay/lib/logo.png";
			} else {
				$payment_settings['wepay']['button_url'] = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/wepay/lib/logo.png";
			}
		}

		if (!empty($payment_settings['worldpay']) && strpos($payment_settings['worldpay']['button_url'], "/worldpay/lib/WorldPaylogoBluetrans.png")) {
			if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/worldpay/lib/WorldPaylogoBluetrans.png")) {
				$payment_settings['worldpay']['button_url'] = EVENT_ESPRESSO_GATEWAY_URL . "/worldpay/lib/WorldPaylogoBluetrans.png";
			} else {
				$payment_settings['worldpay']['button_url'] = EVENT_ESPRESSO_PLUGINFULLURL . "gateways/worldpay/lib/WorldPaylogoBluetrans.png";
			}
		}

		update_user_meta($user, 'payment_settings', $payment_settings);
	}
	// This one has to cover three senarios:
	// 1. If they are upgrading from 3.2 or later, just update the paths stored in the active gateways
	// 2. If they are upgrading from 3.1.17+, make the active gateways option the one for the admin
	// 3. If they are upgrading from prior to 3.1.16, take the individual active gateway settings and
	//    put them into an array and make it the active gateways option for the admin

	$dir = dirname(__FILE__);
	foreach ($users as $user) {
		$active_gateways = get_user_meta($user, 'active_gateways', true);
		if (empty($active_gateways)) {
			$active_gateways = get_option('event_espresso_active_gateways', array());
			if (empty($active_gateways)) {
				$active_gateways = array();
				if (get_option('events_2checkout_active') == true) {
					$active_gateways['2checkout'] = '';
				}
				if (get_option('events_authnet_aim_active') == true) {
					$active_gateways['aim'] = '';
				}
				if (get_option('events_alipay_active') == true) {
					$active_gateways['alipay'] = '';
				}
				if (get_option('events_authnet_active') == true) {
					$active_gateways['authnet'] = '';
				}
				if (get_option('events_bank_payment_active') == true) {
					$active_gateways['bank'] = '';
				}
				if (get_option('events_check_payment_active') == true) {
					$active_gateways['check'] = '';
				}
				if (get_option('events_eway_active') == true) {
					$active_gateways['eway'] = '';
				}
				if (get_option('events_exact_active') == true) {
					$active_gateways['exact'] = '';
				}
				if (get_option('events_firstdata_active') == true) {
					$active_gateways['firstdata'] = '';
				}
				if (get_option('events_firstdata_connect_2_active') == true) {
					$active_gateways['firstdata_connect_2'] = '';
				}
				if (get_option('events_ideal_active') == true) {
					$active_gateways['ideal'] = '';
				}
				if (get_option('events_invoice_payment_active') == true) {
					$active_gateways['invoice'] = '';
				}
				if (get_option('events_mwarrior_active') == true) {
					$active_gateways['mwarrior'] = '';
				}
				if (get_option('events_nab_active') == true) {
					$active_gateways['nab'] = '';
				}
				if (get_option('events_paypal_active') == true) {
					$active_gateways['paypal'] = '';
				}
				if (get_option('events_paypal_pro_active') == true) {
					$active_gateways['paypal_pro'] = '';
				}
				if (get_option('events_paytrace_active') == true) {
					$active_gateways['paytrace'] = '';
				}
				if (get_option('events_quickpay_active') == true) {
					$active_gateways['quickpay'] = '';
				}
				$payment_settings = get_option('event_espresso_realauth_settings');
				if (!empty($payment_settings['active'])) {
					$active_gateways['realauth'] = '';
				}
				if (get_option('events_stripe_active') == true) {
					$active_gateways['stripe'] = '';
				}
				if (get_option('events_worldpay_active') == true) {
					$active_gateways['worldpay'] = '';
				}
			}
			if (array_key_exists('2checkout', $active_gateways)) {
				$active_gateways['2checkout'] = $dir . "/2checkout";
			}
			if (array_key_exists('aim', $active_gateways)) {
				$active_gateways['aim'] = $dir . "/aim";
			}
			if (array_key_exists('alipay', $active_gateways)) {
				$active_gateways['alipay'] = $dir . "/alipay";
			}
			if (array_key_exists('authnet', $active_gateways)) {
				$active_gateways['authnet'] = $dir . "/authnet";
			}
			if (array_key_exists('bank', $active_gateways)) {
				$active_gateways['bank'] = $dir . "/bank";
			}
			if (array_key_exists('check', $active_gateways)) {
				$active_gateways['check'] = $dir . "/check";
			}
			if (array_key_exists('eway', $active_gateways)) {
				$active_gateways['eway'] = $dir . "/eway";
			}
			if (array_key_exists('exact', $active_gateways)) {
				$active_gateways['exact'] = $dir . "/exact";
			}
			if (array_key_exists('firstdata', $active_gateways)) {
				$active_gateways['firstdata'] = $dir . "/firstdata";
			}
			if (array_key_exists('firstdata_connect_2', $active_gateways)) {
				$active_gateways['firstdata_connect_2'] = $dir . "/firstdata_connect_2";
			}
			if (array_key_exists('ideal', $active_gateways)) {
				$active_gateways['ideal'] = $dir . "/ideal";
			}
			if (array_key_exists('invoice', $active_gateways)) {
				$active_gateways['invoice'] = $dir . "/invoice";
			}
			if (array_key_exists('mwarrior', $active_gateways)) {
				$active_gateways['mwarrior'] = $dir . "/mwarrior";
			}
			if (array_key_exists('nab', $active_gateways)) {
				$active_gateways['nab'] = $dir . "/nab";
			}
			if (array_key_exists('paypal', $active_gateways)) {
				$active_gateways['paypal'] = $dir . "/paypal";
			}
			if (array_key_exists('paypal_pro', $active_gateways)) {
				$active_gateways['paypal_pro'] = $dir . "/paypal_pro";
			}
			if (array_key_exists('paytrace', $active_gateways)) {
				$active_gateways['paytrace'] = $dir . "/paytrace";
			}
			if (array_key_exists('quickpay', $active_gateways)) {
				$active_gateways['quickpay'] = $dir . "/quickpay";
			}
			if (array_key_exists('realauth', $active_gateways)) {
				$active_gateways['realauth'] = $dir . "/realauth";
			}
			if (array_key_exists('stripe', $active_gateways)) {
				$active_gateways['stripe'] = $dir . "/stripe";
			}
			if (array_key_exists('worldpay', $active_gateways)) {
				$active_gateways['worldpay'] = $dir . "/worldpay";
			}
		}
		update_user_meta($user, 'active_gateways', $active_gateways);
	}
}