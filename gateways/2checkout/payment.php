<?php

function espresso_display_2checkout() {
	global $EE_Session, $gateways;
	$session_data = $EE_Session->get_session_data();
	$twoco_settings = $session_data['payment_settings']['2checkout'];
	$gateway = '2checkout';
?>
			<a id="payment-gateway-button-<?php echo $gateway;?>" class="reg-page-payment-option-lnk<?php echo $gateways[ $gateway ]['css_link_class'];?>" rel="<?php echo $gateway;?>" href="<?php echo $gateways[ $gateway ]['form_url'];?>" >
				<img src="<?php echo $twoco_settings['button_url'];?>" alt="Pay using 2CheckOut.com" />
			</a>

			<div id="reg-page-billing-info-<?php echo $gateway;?>-dv" class="reg-page-billing-info-dv <?php echo $gateways[ $gateway ]['css_class'];?>">
				<?php _e('After confirming the details of your registration in Step 3, you will be transferred to the 2CheckOut.com website where your payment will be securely processed.', 'event_espresso'); ?>
				<input id="reg-page-gateway-off-site-<?php echo $gateway;?>" type="hidden" value="1" name="reg_page_gateway_off_site[<?php echo $gateway;?>]">
				<input id="reg-page-selected-gateway-name-<?php echo $gateway;?>" type="hidden" value="<?php echo $gateway; ?>" name="selected_gateway_name[<?php echo $gateway;?>]">
			</div>

<?php
}

add_action('action_hook_espresso_display_offsite_payment_gateway', 'espresso_display_2checkout');