<?php
// Setup class
$bank_gateway_version = empty($bank_gateway_version) ? '' : $bank_gateway_version;
echo '<!-- Event Espresso Electronic Funds Transfer Gateway Version ' . $bank_gateway_version . ' -->';

$bank_deposit_settings = get_option('event_espresso_bank_deposit_settings');
?>
<div class="event-display-boxes">
<h4 id="bank_title" class="payment_type_title section-heading"><?php echo stripslashes_deep(empty($bank_deposit_settings['bank_title']) ? '' : $bank_deposit_settings['bank_title']) ?></h3>
<p class="instruct"><?php echo stripslashes_deep(empty($bank_deposit_settings['bank_instructions']) ? '' : $bank_deposit_settings['bank_instructions'] ); ?></p>
<p><span class="section-title"><?php _e('Name on Account:', 'event_espresso'); ?></span>
<?php echo stripslashes_deep(empty($bank_deposit_settings['account_name']) ? '' : '<span class="highlight">' . $bank_deposit_settings['account_name']) . '</span>'; ?></p>
<p><span class="section-title"><?php _e('Account Number:', 'event_espresso'); ?></span>
<?php echo stripslashes_deep(empty($bank_deposit_settings['bank_account']) ? '' : '<span class="highlight">' . $bank_deposit_settings['bank_account']) . '</span>'; ?></p>
<p><span class="section-title"><?php _e('Financial Institution:', 'event_espresso'); ?></span>
<?php echo stripslashes_deep(empty($bank_deposit_settings['bank_name']) ? '' : '<span class="highlight">' . $bank_deposit_settings['bank_name']). '</span>' ?></p>
<div class="address-block">
<?php echo wpautop(stripslashes_deep(empty($bank_deposit_settings['bank_address']) ? '' : $bank_deposit_settings['bank_address'])); ?>
</div>
</div>