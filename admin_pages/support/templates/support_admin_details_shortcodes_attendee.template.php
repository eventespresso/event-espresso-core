<div class="padding">
	<ul>
			<li>
				<strong>[ESPRESSO_EVENT_ATTENDEES]</strong><br>
				<p class="description">
					<?php _e('With no parameters, this shows the attendees for the earliest active event, or if no active event, the earliest upcoming event.  If it is used in Event Description, then it will show the attendees for that event.', 'event_espresso' ); ?>
				</p>
				<br>
			</li>
			<li>
				<strong>[ESPRESSO_EVENT_ATTENDEES event_id=30]</strong><br>
				<p class="description">
					<?php _e('Will list the attendees for a specific event.', 'event_espresso' ); ?>
				</p>
				<br>
			</li>
			<li>
				<strong>[ESPRESSO_EVENT_ATTENDEES datetime_id=245]</strong><br>
				<p class="description">
					<?php _e('Will list the attendees for a specific datetime.', 'event_espresso' ); ?>
				</p>
				<br>
			</li>
			<li>
				<strong>[ESPRESSO_EVENT_ATTENDEES ticket_id=34]</strong><br>
				<p class="description">
					<?php _e('Will list the attendees for a specific ticket.', 'event_espresso' ); ?>
				</p>
				<br>
			</li>
			<li>
				<strong>[ESPRESSO_EVENT_ATTENDEES status=RAP]</strong><br>
				<p class="description">
					<?php _e('You can list attendees that have a specific registration status (use status_id) or use "all" to return all attendees regardless of status.  Default when you don\'t have this parameter set is to only return attendees attached to approved contacts.', 'event_espresso' ); ?>
				</p>
				<br>
			</li>
		</ul>
</div>
