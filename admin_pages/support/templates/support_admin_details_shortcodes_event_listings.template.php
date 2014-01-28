<div class="padding">
	<p>
<?php _e('Displays a list of events based on a set of criteria on a WordPress page or post.', 'event_espresso'); ?>
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
			<?php _e('Acceptable Order by parameters:', 'event_espresso'); ?>
		</h4>
		<p>
<?php _e('These parameters (options) are available for the shortcodes above. Multiple parameters should be separated by a comma.', 'event_espresso'); ?>
		</p>
            ID<br />
            start_date<br />
            end_date<br />
            event_name<br />
            category_slug<br />
            ticket_start<br />
            ticket_end<br />
            venue_title<br />
            city<br />
            state
		</p>
</div>