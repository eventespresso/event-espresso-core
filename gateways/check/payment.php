<?php
// Setup class
$default_gateway_version = empty($default_gateway_version) ? '' : $default_gateway_version;
echo '<!-- Event Espresso Default Gateway Version ' . $default_gateway_version . '-->';

$payment_settings = get_option('payment_data_' . $espresso_wp_user);
?>
<div class="event-display-boxes">
	<h4 id="check_title" class="payment_type_title section-heading"><?php echo stripslashes_deep(empty($payment_settings['check_payment']['check_title']) ? '' : $payment_settings['check_payment']['check_title']) ?></h4>
	<p class="instruct"><?php echo stripslashes_deep(empty($payment_settings['check_payment']['check_instructions']) ? '' : $payment_settings['check_payment']['check_instructions'] ); ?></p>
	<p>
		<span class="section-title"><?php _e('Payable to:', 'event_espresso'); ?></span>
		<span class="highlight"><?php echo stripslashes_deep(empty($payment_settings['check_payment']['payable_to']) ? '' : $payment_settings['check_payment']['payable_to']); ?></span>
	</p>
	<p class="section-title"><?php _e('Payment Address: ', 'event_espresso'); ?></p>
	<div class="address-block">
		<?php echo wpautop(stripslashes_deep(empty($payment_settings['check_payment']['payment_address']) ? '' : $payment_settings['check_payment']['payment_address'])); ?>
	</div>
</div>