<?php

// Setup payment page
if ($payment_settings['invoice']['show'] == 'N')
	return;
if(isset($default_gateway_version))echo '<!--Event Espresso Default Gateway Version ' . $default_gateway_version . '-->';
if(isset($payment_settings['invoice']['invoice_title'])) { ?>

<div class="event-display-boxes">
	<?php	echo '<h4 id="invoice_title" class="payment_type_title section-heading">'.stripslashes_deep($payment_settings['invoice']['invoice_title']).'</h4>';
}
?>
	<p><a href="<?php echo home_url(); ?>/?invoice_type=<?php echo empty($invoice_type) ? '' : $invoice_type; ?>&amp;download_invoice=true&amp;attendee_id=<?php echo $attendee_id; ?>&amp;registration_id=<?php echo $registration_id ?>" class="inline-button ui-priority-primary ui-state-default ui-state-hover ui-state-focus ui-corner-all" target="_blank">
		<?php _e('Download PDF Invoice', 'event_espresso'); ?>
		</a></p>
	<?php
if(isset($payment_settings['invoice']['page_instructions'])) {
	echo '<div class="event-messages ui-state-highlight"><span class="ui-icon ui-icon-alert"></span><p class="instruct">' . stripslashes_deep($payment_settings['invoice']['page_instructions']) . '</p></div>';
}
if(isset($invoice_payment_settings['payment_address'])){ ?>
	<div class="address-block">
		<?php	echo wpautop(stripslashes_deep($invoice_payment_settings['payment_address'])); ?>
	</div>
</div>
<?php
}
