<?php
// Setup class
$bank_gateway_version = empty($bank_gateway_version) ? '' : $bank_gateway_version;
echo '<!-- Event Espresso Electronic Funds Transfer Gateway Version ' . $bank_gateway_version . ' -->';

$payment_settings = get_option('payment_data_'.$espresso_wp_user);
?>
<div class="event-display-boxes">
<h4 id="page_title" class="payment_type_title section-heading"><?php echo stripslashes_deep(empty($payment_settings['bank_payment']['page_title']) ? '' : $payment_settings['bank_payment']['page_title']) ?></h3>
<p class="instruct"><?php echo stripslashes_deep(empty($payment_settings['bank_payment']['bank_instructions']) ? '' : $payment_settings['bank_payment']['bank_instructions'] ); ?></p>
<p><span class="section-title"><?php _e('Name on Account:', 'event_espresso'); ?></span>
<?php echo stripslashes_deep(empty($payment_settings['bank_payment']['account_name']) ? '' : '<span class="highlight">' . $payment_settings['bank_payment']['account_name']) . '</span>'; ?></p>
<p><span class="section-title"><?php _e('Account Number:', 'event_espresso'); ?></span>
<?php echo stripslashes_deep(empty($payment_settings['bank_payment']['account_number']) ? '' : '<span class="highlight">' . $payment_settings['bank_payment']['account_number']) . '</span>'; ?></p>
<p><span class="section-title"><?php _e('Financial Institution:', 'event_espresso'); ?></span>
<?php echo stripslashes_deep(empty($payment_settings['bank_payment']['bank_name']) ? '' : '<span class="highlight">' . $payment_settings['bank_payment']['bank_name']). '</span>' ?></p>
<div class="address-block">
<?php echo wpautop(stripslashes_deep(empty($payment_settings['bank_payment']['bank_address']) ? '' : $payment_settings['bank_payment']['bank_address'])); ?>
</div>
</div>