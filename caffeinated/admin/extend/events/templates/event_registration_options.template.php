<p>
	<label><?php _e('Active Status: ', 'event_espresso'); ?></label>
	<?php echo $active_status; ?>
</p>

<p>
	<label for="max-registrants"><?php _e('Maximum number of tickets allowed per order for this event: ', 'event_espresso'); ?></label>
	<input type="text" id="max-registrants" name="additional_limit" value="<?php echo $additional_limit; ?>" size="4" />
</p>

<?php echo $additional_registration_options; ?>
<!-- removing the next block temporarily because it's not going to be used as is -->
<!-- <p> -->
	<!-- <label><?php _e('Default Payment Status', 'event_espresso'); ?></label> -->
	<?php //echo $default_registration_status; ?>
<!-- </p> -->

<p>
	<label><?php _e('Display  Description', 'event_espresso'); ?></label>
	<?php echo $display_description; ?>
</p>

<p>
	<label><?php _e('Display  Registration Form', 'event_espresso'); ?></label>
	<?php echo $display_registration_form; ?>
</p>

<p>
	<label><?php _e('Alternate Registration Page', 'event_espresso'); ?></label>
	<input name="externalURL" size="20" type="text" value="<?php echo $_event->external_url(); ?>">
</p>

<p>
	<label><?php _e('Event Phone Number', 'event_espresso'); ?></label>
	<input name="event_phone" size="20" type="text" value="<?php echo $_event->phone(); ?>">
</p>

<p>
	<label><?php _e('Require Pre-approval', 'event_espresso'); ?></label>
	<?php echo $require_pre_approval; ?>
</p>

<?php /*<p>
	<label><?php _e('Alternate Email Address', 'event_espresso'); ?>
		<a class="thickbox" href="#TB_inline?height=300&width=400&inlineId=alt_email_info">
			<span class="question">[?]</span>
		</a>
	</label>
	<input name="alt_email" size="20" type="text" value="<?php echo $_event->alt_email; ?>">
</p> /**/ ?>