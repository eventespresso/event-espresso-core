<div class="ee-new-registration-step-content">
	<h2 class="ee-new-registration-step-header"><?php echo $title ?></h2>
	<div class="ee-new-registration-step-content">
		<?php echo $content; ?>
		<?php if ( $show_notification_toggle && EE_Registry::instance()->CAP->current_user_can( 'ee_send_message', 'registration_message_type' ) ) : ?>
			<div class="ee-attention">
				<label for="txn_reg_status_change" class="last"><?php _e( 'Send Related Messages?', 'event_espresso' );?></label>
				<input type="checkbox" value="1" name="txn_reg_status_change[send_notifications]" checked=checked>
				<br/>
				<br />
				<p class="description"><?php _e( 'Send a notification to registrants after processing?', 'event_espresso' );?></p><br/>
				<label></label>
			</div>
			<?php if ( isset( $_COOKIE['ee_registration_added'])) : ?>
			<script>
				// WHOAH !!! it appears that someone is using the back button from the Transaction admin page
				// after just adding a new registration... we gotta try to put a stop to that !!!
				function disableBack() {
					alert( '<?php echo $no_backy_backy; ?>' );
					window.history.forward()
				}
				window.onload     = disableBack();
				window.onpageshow = function ( evt ) {
					if ( evt.persisted ) {
						disableBack();
					}
				}
			</script>
		<?php endif; ?>
		<?php endif; ?>
		<input id="ee-new-registration-step-button" class="right button button-primary button-large" type="submit" value="<?php echo $step_button_text; ?>" />
	</div>
</div>
