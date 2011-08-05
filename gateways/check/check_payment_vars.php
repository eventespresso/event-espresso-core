<?php
// Setup class
$default_gateway_version = empty($default_gateway_version) ? '' : $default_gateway_version;
echo '<!-- Event Espresso Default Gateway Version ' . $default_gateway_version . '-->';

$check_payment_settings = get_option('event_espresso_check_payment_settings');
?>
<div class="event-display-boxes">
<h4 id="check_title" class="payment_type_title section-heading"><?php echo stripslashes_deep(empty($check_payment_settings['check_title']) ? '' : $check_payment_settings['check_title']) ?></h4>
<p class="instruct"><?php echo stripslashes_deep(empty($check_payment_settings['check_instructions']) ? '' : $check_payment_settings['check_instructions'] ); ?></p>
<p>
	<span class="section-title"><?php _e('Payable to:', 'event_espresso'); ?></span>
	<span class="highlight"><?php echo stripslashes_deep(empty($check_payment_settings['payable_to']) ? '' : $check_payment_settings['payable_to']); ?></span>
</p>
<p class="section-title"><?php _e('Payment Address: ', 'event_espresso'); ?></p>
<div class="address-block">
	<?php echo wpautop(stripslashes_deep(empty($check_payment_settings['payment_address']) ? '' : $check_payment_settings['payment_address'])); ?>
</div>
</div>