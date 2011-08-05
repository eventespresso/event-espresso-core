<?php
// Setup payment page
if(isset($default_gateway_version))echo '<!--Event Espresso Default Gateway Version ' . $default_gateway_version . '-->';
$invoice_payment_settings = get_option('event_espresso_invoice_payment_settings');
echo '<hr />';
if(isset($invoice_payment_settings['invoice_title'])) {
	echo '<h3 id="invoice_title" class="payment_type_title">'.stripslashes_deep($invoice_payment_settings['invoice_title']).'</h3>';
}
?>
<p><a href="<?php echo home_url(); ?>/?invoice_type=<?php echo empty($invoice_type) ? '' : $invoice_type; ?>&amp;download_invoice=true&amp;attendee_id=<?php echo $attendee_id; ?>&amp;registration_id=<?php echo $registration_id ?>" target="_blank"><?php _e('Download PDF Invoice', 'event_espresso'); ?></a></p>
<?php
if(isset($invoice_payment_settings['invoice_instructions'])) {
	echo '<p>'.stripslashes_deep($invoice_payment_settings['invoice_instructions']).'</p>';
}
if(isset($invoice_payment_settings['payment_address'])){
	echo wpautop(stripslashes_deep($invoice_payment_settings['payment_address']));
}