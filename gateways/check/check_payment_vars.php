<?php
// Setup class
$default_gateway_version = empty($default_gateway_version) ? '' : $default_gateway_version;
echo '<!-- Event Espresso Default Gateway Version ' . $default_gateway_version . '-->';

$check_payment_settings = get_option('event_espresso_check_payment_settings');
?>
<hr />
<h3 id="check_title" class="payment_type_title"><?php echo stripslashes_deep(empty($check_payment_settings['check_title']) ? '' : $check_payment_settings['check_title']) ?></h3>
<?php echo wpautop(stripslashes_deep(empty($check_payment_settings['check_instructions']) ? '' : $check_payment_settings['check_instructions'])); ?>
<p><strong><?php _e('Payable to:', 'event_espresso'); ?></strong><br />
<?php echo stripslashes_deep(empty($check_payment_settings['payable_to']) ? '' : $check_payment_settings['payable_to']); ?></p>
<?php echo wpautop(stripslashes_deep(empty($check_payment_settings['payment_address']) ? '' : $check_payment_settings['payment_address'])); ?>