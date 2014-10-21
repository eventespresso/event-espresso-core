<form id="reg_status_change_form" method="POST" action="<?php echo $form_url; ?>">
	<input type="hidden" name="action" value="change_reg_status">
	<input type="hidden" name="_REG_ID" value="<?php echo $REG_ID; ?>">
	<input type="hidden" name="return" value="view_registration">
	<?php echo $nonce; ?>
	<?php echo $status_buttons; ?>
	<?php if ( $attendee instanceof EE_Attendee && EE_Registry::instance()->CAP->current_user_can( 'ee_send_message', 'registration_message_type' ) ) : ?>
		<div class="ee-attention">
			<label for="txn_reg_status_change" class="last"><?php _e( 'Send Related Message?', 'event_espresso' );?></label>
			<input type="checkbox" value="1" name="txn_reg_status_change[send_notifications]">
			<br/>
			<br />
			<p class="description"><?php _e( 'If checked when changing status, the related messages will be sent to the registrant.', 'event_espresso' );?></p><br/>
			<label></label>
		</div>
	<?php endif; ?>
</form>
