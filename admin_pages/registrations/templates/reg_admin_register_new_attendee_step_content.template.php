<div class="ee-new-registration-step-content">
	<h2 class="ee-new-registration-step-header"><?php echo $title ?></h2>
	<div class="ee-new-registration-step-content">
		<?php echo $content; ?>
		<?php if ( $show_notification_toggle ) : ?>
			<div class="ee-attention">
				<label for="txn_reg_status_change" class="last"><?php _e( 'Send Related Messages?', 'event_espresso' );?></label>
				<input type="checkbox" value="1" name="txn_reg_status_change[send_notifications]" checked=checked>
				<br/>
				<br />
				<p class="description"><?php _e( 'Send a notification to registrants after processing?', 'event_espresso' );?></p><br/>
				<label></label>
			</div>
		<?php endif; ?>
		<input id="ee-new-registration-step-button" class="right button button-primary button-large" type="submit" value="<?php echo $step_button_text; ?>" />
	</div>
</div>