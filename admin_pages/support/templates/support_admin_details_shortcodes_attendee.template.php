<div class="padding">
	<p>
		<strong>Note:</strong> The <code>[ESPRESSO_EVENT_ATTENDEES]</code> shortcode is not used to represent the attendees post type directly, but is instead used to represent the intersection of attendees with events.  So it's always returning a list of attendees <em>in relation to</em> an event.
	</p>
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
					<?php _e('You can list attendees that have a specific registration status (use status code) or use "all" to return all attendees regardless of status.  Default when you don\'t have this parameter set is to only return attendees attached to approved contacts.', 'event_espresso' ); ?>
				</p>
				<p>
					<?php _e('The statuses you can use are:', 'event_espresso'); ?>
					<br>
					<?php
						foreach ( EEM_Registration::reg_status_array( array(), true ) as $status_code => $status_label ) {
							echo '<strong>' . $status_code . ':</strong>' . ' ' . $status_label . '<br>';
						}
					?>

				</p>
				<br>
			</li>
		</ul>
</div>
