<?php
function espresso_display_payment_page_template($data) {
	global $org_options;
	?>
<div id="espresso_confirmation_display" class="event-display-boxes ui-widget ui-corner-all ui-widget-content">
	<div class="event-data-display">
  <?php
	//Confirmation Page Template
	if ($data->total_cost == '0.00') {
		unset($_SESSION['espresso_session']['id']);
		?>
  <h2><?php echo $data->attendees[0]->fname ?>,</h2>
  <div class="event-messages ui-state-highlight">
			<span class="ui-icon ui-icon-alert"></span>
			<p class="instruct">
	<?php _e('Thank you! Your registration is confirmed for', 'event_espresso'); ?>
		<b><?php echo stripslashes_deep($data->events[0]->event_name) ?></b>
			</p>
		</div>
  <p>
			<span class="section-title">
	<?php _e('Your Registration ID: ', 'event_espresso'); ?>
	</span> <?php echo $data->attendees[0]->registration_id ?> </p>
  <p class="instruct">
	<?php _e('A confirmation email has been sent with additional details of your registration.', 'event_espresso'); ?>
  </p>
  <?php
} else {
	?>
  <h2><?php echo $data->attendees[0]->fname ?>,</h2>
  <div class="event-messages ui-state-highlight">
			<span class="ui-icon ui-icon-alert"></span>
			<p>
		<?php _e('Your registration is not complete until payment is received.', 'event_espresso'); ?>
			</p>
  </div>
  <p> <span class="event_espresso_name section-title">
	<?php _e('Amount due: ', 'event_espresso'); ?>
	</span> <span class="event_espresso_value"><?php echo isset($org_options['currency_symbol'])?$org_options['currency_symbol']:''; ?><?php echo $data->total_cost; ?></span> </p>
  <p> <span class="section-title">
	<?php _e('Your Registration ID: ', 'event_espresso'); ?>
	</span><?php echo $data->attendees[0]->registration_id ?> </p>
  <p> <?php echo $org_options['email_before_payment'] == 'Y' ? __('A confirmation email has been sent with additional details of your registration.', 'event_espresso') : ''; ?> </p>
  <?php
}
?>
	</div><!-- / .event-data-display -->
</div><!-- / .event-display-boxes -->
<?php
}

add_action('action_hook_espresso_display_payment_page_template', 'espresso_display_payment_page_template');