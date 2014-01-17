<div class="padding">
	<p>
<?php _e('Returns a list of events', 'event_espresso'); ?>
		</p>
		<ul>
			<li>[ESPRESSO_EVENTS]</li>
			<li>[ESPRESSO_EVENTS title="My Super Event"]</li>
			<li>[ESPRESSO_EVENTS limit=5]</li>
			<li>[ESPRESSO_EVENTS css_class="my-custom-class"]</li>
			<li>[ESPRESSO_EVENTS month="October 2104"]</li>
			<li>[ESPRESSO_EVENTS show_expired=true]</li>
			<li>[ESPRESSO_EVENTS category_slug="free-events"]</li>
			<li>[ESPRESSO_EVENTS order_by="start_date,id"]</li>
			<li>[ESPRESSO_EVENTS sort="ASC"]</li>
			<li>[ESPRESSO_EVENTS list_type="grid"]</li>
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
			venue_title 
		</p>
			<p><strong><?php _e('Attention:', 'event_espresso'); ?></strong><br />
<?php _e('The [EVENT_LIST] shortcode should not be used as a replacement for the [ESPRESSO_EVENTS] shortcode. Replacing the [ESPRESSO_EVENTS] shortcode will break your registration pages.', 'event_espresso'); ?>
		</p>
</div>