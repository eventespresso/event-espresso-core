<div id="reg-admin-approve-decline-reg-status-dv">

	<h2 id="reg-admin-reg-details-reg-status-hdr">
		<?php echo __( 'Current Registration Status : ', 'event_espresso' ); ?>
		<span class="<?php echo $reg_status_class; ?> bigger-text"><?php echo $reg_status_value; ?></span>
	</h2>
	<?php do_action( 'AHEE__reg_status_change_buttons__after_header', $REG_ID ); ?>

	<h3 id="reg-admin-reg-details-reg-status-hdr">
		<?php echo __( 'Change Registration Status to :', 'event_espresso' ); ?>
	</h3>

	<form id="reg_status_change_form" method="POST" action="<?php echo $form_url; ?>">
		<input type="hidden" name="action" value="change_reg_status">
		<input type="hidden" name="_REG_ID" value="<?php echo $REG_ID; ?>">
		<input type="hidden" name="return" value="view_registration">
		<?php echo $nonce; ?>
		<?php echo $status_buttons; ?>
		<?php if ( $attendee instanceof EE_Attendee && EE_Registry::instance()->CAP->current_user_can( 'ee_send_message', 'registration_message_type' ) ) : ?>
			<span id="send-related-messages-dv">
			<label for="txn-reg-status-send-notifications-inp" class="important-notice"><?php _e( '...and send related messages ?', 'event_espresso' ); ?>
				<input type="checkbox" value="1" id="txn-reg-status-send-notifications-inp" name="txn_reg_status_change[send_notifications]">
			</label>
			<br/>
		</span>
			<br/>
			<p class="description"><?php _e( 'If the "send related messages"checkbox is checked when changing status, then the related messages will be sent to the registrant.', 'event_espresso' ); ?></p>
		<?php endif; ?>
	</form>
</div>
