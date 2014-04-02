<div class="padding">
	<p>
        <?php _e('Displays a list of events based on a set of criteria on a WordPress page or post. Unless otherwise specified, events are sorted by start date.', 'event_espresso'); ?>
    </p>
		<ul>
			<li><?php _e('<strong>Show a list of all of your events</strong>', 'event_espresso'); ?><br /> [ESPRESSO_EVENTS]</li>
			<li><?php _e('<strong>Set a custom title for the event list</strong>', 'event_espresso'); ?><br /> [ESPRESSO_EVENTS title="My Super Event List"]</li>
			<li><?php _e('<strong>Limit (paginate) the number of events that are shown in the event list on a page or post</strong>', 'event_espresso'); ?><br />[ESPRESSO_EVENTS limit="5"]</li>
			<li><?php _e('<strong>Add a custom CSS class to each event post/article</strong>', 'event_espresso'); ?><br /> [ESPRESSO_EVENTS css_class="my-custom-class"]</li>
			<li><?php _e('<strong>Filter the event list by month and year</strong>', 'event_espresso'); ?><br />[ESPRESSO_EVENTS month="October 2104"]</li>
			<li><?php _e('<strong>Show expired events in the event list</strong>', 'event_espresso'); ?><br />[ESPRESSO_EVENTS show_expired="true"]</li>
			<li><?php _e('<strong>Sorts the event list in ascending order</strong>', 'event_espresso'); ?><br />[ESPRESSO_EVENTS sort="ASC"]</li>
			<li><?php _e('<strong>Sorts the event list in descending order</strong>', 'event_espresso'); ?><br />[ESPRESSO_EVENTS sort="DESC"]</li>
			<li><?php _e('<strong>Order the event list by a specific set of parameters (refer to available options below)</strong>', 'event_espresso'); ?><br />[ESPRESSO_EVENTS order_by="start_date,id"]</li>
		</ul>
            <p>
                <?php _e('These parameters (options) are available for the shortcode above. Multiple parameters should be separated by a comma.', 'event_espresso'); ?>
            </p>
            id<br />
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