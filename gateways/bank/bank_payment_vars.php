<?php
// Setup class
$bank_gateway_version = empty($bank_gateway_version) ? '' : $bank_gateway_version;
echo '<!-- Event Espresso Electronic Funds Transfer Gateway Version ' . $bank_gateway_version . ' -->';

$bank_deposit_settings = get_option('event_espresso_bank_deposit_settings');
?>
<hr />
<h3 id="bank_title" class="payment_type_title"><?php echo stripslashes_deep(empty($bank_deposit_settings['bank_title']) ? '' : $bank_deposit_settings['bank_title']) ?></h3>
<?php echo wpautop(stripslashes_deep(empty($bank_deposit_settings['bank_instructions']) ? '' : $bank_deposit_settings['bank_instructions'])); ?></p>
<p><strong><?php _e('Name on Account:', 'event_espresso'); ?></strong><br />
<?php echo stripslashes_deep(empty($bank_deposit_settings['account_name']) ? '' : $bank_deposit_settings['account_name']); ?></p>
<p><strong><?php _e('Account Number:', 'event_espresso'); ?></strong><br />
<?php echo stripslashes_deep(empty($bank_deposit_settings['bank_account']) ? '' : $bank_deposit_settings['bank_account']); ?></p>
<p><strong><?php _e('Financial Institution:', 'event_espresso'); ?></strong><br />
<?php echo stripslashes_deep(empty($bank_deposit_settings['bank_name']) ? '' : $bank_deposit_settings['bank_name']) ?></p>
<?php echo wpautop(stripslashes_deep(empty($bank_deposit_settings['bank_address']) ? '' : $bank_deposit_settings['bank_address'])); ?>