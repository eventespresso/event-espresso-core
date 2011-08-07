<?php
//This file builds the gateways that are available
echo '<div id="onsite-payments" class="event-display-boxes">';
echo '<h2 class="section-heading">' .  __('Please choose a payment option:', 'event_espresso') . '</h2>';
if (get_option('events_paypal_pro_active') == 'true' 
	|| get_option('events_eway_active') == 'true' 
	|| get_option('events_authnet_aim_active') == 'true' 
	|| get_option('events_firstdata_active') == 'true' 
	|| get_option('events_ideal_active') == 'true'
	|| get_option('events_paytrace_active') == 'true'
	)
{
	echo '<div id="on_site_payment_container" class="payment_container event-display-boxes">';
	echo '<h3 id="on_site_payment" class="payment_option_title section-heading">'.__('On-site Payment Processing', 'event_espresso').'</h3>';
	
	if (get_option('events_paypal_pro_active') == 'true'){
		if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/paypal_pro/paypal_pro_vars.php")){
			require_once(EVENT_ESPRESSO_GATEWAY_DIR . "/paypal_pro/paypal_pro_vars.php");
		}elseif (file_exists(EVENT_ESPRESSO_PLUGINFULLPATH."gateways/paypal_pro/paypal_pro_vars.php")){
			require_once(EVENT_ESPRESSO_PLUGINFULLPATH."gateways/paypal_pro/paypal_pro_vars.php");
		}
	}
	if (get_option('events_eway_active') == 'true'){
		if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/eway/eway_vars.php")){
			require_once(EVENT_ESPRESSO_GATEWAY_DIR . "/eway/eway_vars.php");
		}elseif (file_exists(EVENT_ESPRESSO_PLUGINFULLPATH."gateways/eway/eway_vars.php")){
			require_once(EVENT_ESPRESSO_PLUGINFULLPATH."gateways/eway/eway_vars.php");
		}
	}
	if (get_option('events_authnet_aim_active') == 'true'){
		if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/aim/aim_vars.php")){
			require_once(EVENT_ESPRESSO_GATEWAY_DIR . "/aim/aim_vars.php");
		}elseif (file_exists(EVENT_ESPRESSO_PLUGINFULLPATH."gateways/aim/aim_vars.php")){
			require_once(EVENT_ESPRESSO_PLUGINFULLPATH."gateways/aim/aim_vars.php");
		}
	}
	if (get_option('events_firstdata_active') == 'true'){
		if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/firstdata/firstdata_vars.php")){
			require_once(EVENT_ESPRESSO_GATEWAY_DIR . "/firstdata/firstdata_vars.php");
		}elseif (file_exists(EVENT_ESPRESSO_PLUGINFULLPATH."gateways/firstdata/firstdata_vars.php")){
			require_once(EVENT_ESPRESSO_PLUGINFULLPATH."gateways/firstdata/firstdata_vars.php");
		}
	}
	if (get_option('events_ideal_active') == 'true'){
		if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/ideal/ideal_vars.php")){
			require_once(EVENT_ESPRESSO_GATEWAY_DIR . "/ideal/ideal_vars.php");
		}elseif (file_exists(EVENT_ESPRESSO_PLUGINFULLPATH."gateways/ideal/ideal_vars.php")){
			require_once(EVENT_ESPRESSO_PLUGINFULLPATH."gateways/ideal/ideal_vars.php");
		}
	}
	
	if (get_option('events_paytrace_active') == 'true'){
		if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/paytrace/paytrace_vars.php")){
			require_once(EVENT_ESPRESSO_GATEWAY_DIR . "/paytrace/paytrace_vars.php");
		}elseif (file_exists(EVENT_ESPRESSO_PLUGINFULLPATH."gateways/paytrace/paytrace_vars.php")){
			require_once(EVENT_ESPRESSO_PLUGINFULLPATH."gateways/paytrace/paytrace_vars.php");
		}
	}
	echo '</div><!-- / #onsite-payments -->';
}
if (get_option('events_paypal_active') == 'true' || get_option('events_authnet_active') == 'true' || get_option('events_mwarrior_active') == 'true' || get_option('events_alipay_active') == 'true' || get_option('events_plugnpay_active') == 'true' || get_option('events_2checkout_active') == 'true'){
	echo '<div id="off_site_payment_container" class="payment_container event-display-boxes">';
	echo '<h3 id="off_site_payment" class="payment_option_title section-heading">'.__('Off-site Payments', 'event_espresso').'</h3>';
	echo '<table id="espresso_payment_buttons" id="espresso_payment_buttons" width="95%">';
	echo '<tr>';
	
	if (get_option('events_paypal_active') == 'true'){
		echo '<td>';
		if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/paypal/paypal_vars.php")){
			require_once(EVENT_ESPRESSO_GATEWAY_DIR . "/paypal/paypal_vars.php");
		}else{
			require_once(EVENT_ESPRESSO_PLUGINFULLPATH."gateways/paypal/paypal_vars.php");
		}
		echo '</td>';
	}
	if (get_option('events_authnet_active') == 'true'){
		echo '<td>';
		if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/authnet/authnet_vars.php")){
			require_once(EVENT_ESPRESSO_GATEWAY_DIR . "/authnet/authnet_vars.php");
		}else{
			require_once(EVENT_ESPRESSO_PLUGINFULLPATH."gateways/authnet/authnet_vars.php");
		}
		echo '</td>';
	}
	
	if (get_option('events_mwarrior_active') == 'true'){
		echo '<td>';
		if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/mwarrior/mwarrior_vars.php")){
			require_once(EVENT_ESPRESSO_GATEWAY_DIR . "/mwarrior/mwarrior_vars.php");
		}else{
			require_once(EVENT_ESPRESSO_PLUGINFULLPATH."gateways/mwarrior/mwarrior_vars.php");
		}
		echo '</td>';
	}
	
	if ((file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/alipay/alipay_active.php") || file_exists(EVENT_ESPRESSO_PLUGINFULLPATH."gateways/alipay/alipay_active.php")) && get_option('events_alipay_active') == 'true'){
			global $org_options;
			$alipay_settings = get_option('event_espresso_alipay_settings');
		echo '<td>';
		if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/alipay/index.php")){
			require_once(EVENT_ESPRESSO_GATEWAY_DIR . "/alipay/index.php");
		}else{
			require_once(EVENT_ESPRESSO_PLUGINFULLPATH."gateways/alipay/index.php");
		}
		echo '</td>';
	}
	if (get_option('events_2checkout_active') == 'true'){
		echo '<td>';
		if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/2checkout/2checkout_vars.php")){
			require_once(EVENT_ESPRESSO_GATEWAY_DIR . "/2checkout/2checkout_vars.php");
		}elseif (file_exists(EVENT_ESPRESSO_PLUGINFULLPATH."gateways/2checkout/2checkout_vars.php")){
			require_once(EVENT_ESPRESSO_PLUGINFULLPATH."gateways/2checkout/2checkout_vars.php");
		}
		echo '</td>';
	}
	echo '</tr>';
	echo '</table>';
	echo '</div><!-- / #off_site_payment_container -->';
}

if (get_option('events_invoice_payment_active') == 'true'||get_option('events_check_payment_active') == 'true' || get_option('events_bank_payment_active') == 'true'){
	
	echo '<div id="off_line_payment_container" class="payment_container event-display-boxes">';
	echo '<h3 id="off_line_payment" class="payment_option_title section-heading">'.__('Off-line Payments', 'event_espresso').'</h3>';

	if (get_option('events_invoice_payment_active') == 'true'){
		if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/invoice/invoice_vars.php")){
			require_once(EVENT_ESPRESSO_GATEWAY_DIR . "/invoice/invoice_vars.php");
		}else{
			require_once(EVENT_ESPRESSO_PLUGINFULLPATH."gateways/invoice/invoice_vars.php");
		}
	}
	if (get_option('events_check_payment_active') == 'true'||get_option('events_bank_payment_active') == 'true'){
	?>
		<div class="event_espresso_attention">
			<p><strong><?php _e('Attention!', 'event_espresso'); ?></strong><br />
				<?php _e('If using one of the offline payment options, please make note of the information below, then', 'event_espresso'); ?>
				<a href="<?php echo home_url(). '/?page_id='.$org_options['return_url'] ;?>&amp;payment_type=cash_check&amp;registration_id=<?php echo $registration_id ?>" class="inline-link" title="<?php _e('Finalize your registration', 'event_espresso'); ?>"><?php _e('click here to finalize your registration', 'event_espresso'); ?></a>
			</p>
		</div>
	<?php
	}
	
	if (get_option('events_check_payment_active') == 'true'){
		if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/check/check_payment_vars.php")){
			require_once(EVENT_ESPRESSO_GATEWAY_DIR . "/check/check_payment_vars.php");
		}else{
			require_once(EVENT_ESPRESSO_PLUGINFULLPATH."gateways/check/check_payment_vars.php");
		}
	}
	
	if (get_option('events_bank_payment_active') == 'true'){
		if (file_exists(EVENT_ESPRESSO_GATEWAY_DIR . "/bank/bank_payment_vars.php")){
			require_once(EVENT_ESPRESSO_GATEWAY_DIR . "/bank/bank_payment_vars.php");
		}else{
			require_once(EVENT_ESPRESSO_PLUGINFULLPATH."gateways/bank/bank_payment_vars.php");
		}
	}
	echo '</div><!-- / #off_line_payment_container -->';
	echo '</div><!-- / .event-display-boxes payment opts -->';
}