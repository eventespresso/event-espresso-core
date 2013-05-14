<div class="padding">
	<p>
<?php _e('Returns a list of events', 'event_espresso'); ?>
		</p>
		<ul>
			<li>[EVENT_LIST]</li>
			<li>[EVENT_LIST limit=1]</li>
			<li>[EVENT_LIST show_expired=true]</li>
			<li>[EVENT_LIST show_deleted=true]</li>
			<li>[EVENT_LIST show_secondary=true]</li>
			<li>[EVENT_LIST category_identifier=your_category_identifier]</li>
			<li>[EVENT_LIST staff_id=staff_id_number]</li>
			<li>[EVENT_LIST order_by=date(start_date),id]</li>
		</ul>
		<h4>
			<?php _e('Order by parameters:', 'event_espresso'); ?>
		</h4>
		<p>
<?php _e('(comma separated)', 'event_espresso'); ?>
		</p>
		<p>id<br />
			date(start_date)<br />
			date(end_date)<br />
			event_name<br />
			date(registration_start)<br />
			date(registration_end)<br />
			city<br />
			state<br />
			category_id<br />
			venue_title </p>
			<p><strong><?php _e('Attention:', 'event_espresso'); ?></strong><br />
<?php _e('The [EVENT_LIST] shortcode should not be used as a replacement for the [ESPRESSO_EVENTS] shortcode. Replacing the [ESPRESSO_EVENTS] shortcode will break your registration pages.', 'event_espresso'); ?>
		</p>
</div>
