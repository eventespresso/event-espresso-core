<?php
function espresso_display_invoice() {
	global $EE_Session;
	$gateway = 'invoice';
	$gateway_data = $EE_Session->get_session_data(FALSE, 'gateway_data');

	$invoice_settings = $gateway_data['payment_settings'][$gateway];
	
	$gateways = $gateway_data['html_data']
?>
			<a id="payment-gateway-button-<?php echo $gateway;?>" class="reg-page-payment-option-lnk<?php echo $gateways[ $gateway ]['css_link_class'];?>" rel="<?php echo $gateway;?>" href="<?php echo $gateways[ $gateway ]['form_url'];?>" >
				<button type="button">Invoice</button>
			</a>

			<div id="reg-page-billing-info-<?php echo $gateway;?>-dv" class="reg-page-billing-info-dv <?php echo $gateways[ $gateway ]['css_class'];?>">
				<?php _e('After confirming the details of your registration in Step 3, you will be transferred to the payment overview where your payment will be securely processed, and you can download your invoice.', 'event_espresso'); ?>
			</div>

<?php
}

add_action('action_hook_espresso_display_offsite_payment_gateway', 'espresso_display_invoice');

