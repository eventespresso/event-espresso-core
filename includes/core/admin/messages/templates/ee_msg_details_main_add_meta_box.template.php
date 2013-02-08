<div id="admin-primary-mbox-dv" class="admin-primary-mbox-dv">
	
	<h4 class="admin-primary-mbox-h4"><?php echo ($event_name) ? $event_name . ' Custom Template' : ''; ?></h4>
	<p><?php echo $action_message; ?></p>

	<form id="ee-msg-add-message-template-frm" action="<?php echo $edit_message_template_form_url; ?>" method="post">
		<input type="hidden" id="evt_id" name="EVT_ID" value="<?php echo ($EVT_ID) ? $EVT_ID : ''; ?>" />
		<?php if ( isset( $hidden_fields ) ) echo $hidden_fields; ?>
		
		<!--active_messengers -->
		<label for="MTP_messenger"><?php _e('Select Messenger', 'event_espresso'); ?></label>
		<select name="MTP_messenger" id="MTP-messenger">
			<?php foreach ( $active_messengers as $messenger => $values ) : ?>
			<option value="<?php echo $messenger; ?>"><?php echo ucwords(str_replace('_', ' ', $messenger) ); ?></option>
			<?php endforeach; ?>
		</select>

		<label for="MTP_message_type"><?php _e('Select Message Type', 'event_espresso'); ?></label>
		<select name="MTP_message_type" id="MTP-message-type">
			<?php foreach ( $active_message_types as $message_type => $values ) : ?>
			<option value="<?php echo $message_type; ?>"><?php echo ucwords(str_replace('_', ' ', $message_type) ); ?></option>
			<?php endforeach; ?>
		</select>

		<!-- events if we don't have an EVENT_ID -->
		<?php if ( !empty( $active_events ) ) : ?>
			<label for="EVT_ID_select"><?php _e('Select Event', 'event_espresso'); ?></label>
			<select name="EVT_ID" id="EVT_ID_select">
				<?php foreach ( $active_events as $event ) : ?>
				<option value="<?php echo $event->event_id; ?>"><?php echo $event->event_name; ?></option>
				<?php endforeach; ?>
			</select>
		<?php endif; ?>

		<input id="submit-msg-add-sbmt" class="button-secondary" type="submit" value="Generate Templates">
	</form>
</div> <!-- end #admin-primary-mbox-dv -->