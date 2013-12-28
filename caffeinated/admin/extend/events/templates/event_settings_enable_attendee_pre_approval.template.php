<tr>
	<th>
		<label for="use_attendee_pre_approval">
			<?php _e('Enable Attendee Pre-approval', 'event_espresso'); ?>
		</label>
	</th>
	<td>
		<p><?php echo $attendee_pre_approval_select ?></p>
		<p class="description">
			<?php _e('When you create an event, there is an option to require pre-approval for that event. Pre-approval means that no matter what the transaction status, registrations (attendees) will be marked as pending approval, until an administrator manually changes their status to approved via the Registrations Admin page.  This setting here allows you to change what the default setting is for this option when creating new events.  It will not retroactively apply to existing events.', 'event_espresso'); ?>
		</p>
	</td>
</tr>