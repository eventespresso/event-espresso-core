<p>
	<label><?php _e('Active Status: ', 'event_espresso'); ?></label>
	<?php echo $active_status; ?>
</p>

<p>
	<label for="max-registrants"><?php _e('Maximum number of tickets allowed per order for this event: ', 'event_espresso'); ?></label>
	<input class="ee-numeric" type="text" id="max-registrants" name="additional_limit" value="<?php echo $additional_limit; ?>" size="4" />
</p>

<?php echo $additional_registration_options; ?>

<!-- <p>
	<label><?php _e('Display Description', 'event_espresso'); ?></label>
	<?php echo $display_description; ?>
</p> -->

 <p>
	<label><?php _e('Display Ticket Selector', 'event_espresso'); ?></label>
	<?php echo $display_ticket_selector; ?>
</p>

<p>
	<label><?php _e('Event Phone Number', 'event_espresso'); ?></label>
	<input name="event_phone" size="20" type="text" value="<?php echo $_event->phone(); ?>">
</p>
