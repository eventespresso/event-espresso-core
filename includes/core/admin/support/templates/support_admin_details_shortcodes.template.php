<div class="padding">
	<p>
<?php _e('For more information, please visit:', 'event_espresso'); ?>
		<br />
		<a href="http://eventespresso.com/forums/2010/10/post-type-variables-and-shortcodes/" target="_blank">http://eventespresso.com/forums/2010/10/post-type-variables-and-shortcodes/</a></p>
	<hr />
	<div class="shortcode-box">
		<h4>
			<?php _e('Single Events', 'event_espresso'); ?>
		</h4>
		<p>
<?php _e('Displays a single event on a page or post', 'event_espresso'); ?>
		</p>
		<p ><span class="highlight">[SINGLEEVENT single_event_id="your_event_identifier"]</span></p>
	</div>
	<div class="shortcode-box">
		<h4>
			<?php _e('Add Events to Cart', 'event_espresso'); ?>
		</h4>
		<p>
<?php _e('Displays an "Add Event to Cart" link that can be added to the event details, page, or post. Requires the <a href="http://eventespresso.com/download/plugins-and-addons/multiple-event-registration/" target="_blank">Multiple Event Registration addon</a>.', 'event_espresso'); ?>
		</p>
		<p><span class="highlight">[ESPRESSO_CART_LINK]</span></p>
		<h5>
			<?php _e('Additonal Examples:', 'event_espresso'); ?>
		</h5>
		<p><span class="highlight">[ESPRESSO_CART_LINK direct_to_cart=1 moving_to_cart="Redirecting to cart..."]</span><br />
			<?php _e('(Used to redirect to the shopping cart page. Must be added to an event description.)', 'event_espresso'); ?>
		</p>
		<p><span class="highlight">[ESPRESSO_CART_LINK event_id="add_event_id_here" direct_to_cart=1 moving_to_cart="Redirecting to cart..."]</span><br />
<?php _e('(Same as above, but uses the event_id paramter and can be added to a page or post.)', 'event_espresso'); ?>
		</p>
	</div>
	<div class="shortcode-box">
		<h4>
			<?php _e('Event List', 'event_espresso'); ?>
		</h4>
		<p>
<?php _e('Returns a list of events', 'event_espresso'); ?>
		</p>
		<ul>
			<li><span class="highlight">[EVENT_LIST]</span></li>
			<li><span class="highlight">[EVENT_LIST limit=1]</span></li>
			<li><span class="highlight">[EVENT_LIST show_expired=true]</span></li>
			<li><span class="highlight">[EVENT_LIST show_deleted=true]</span></li>
			<li><span class="highlight">[EVENT_LIST show_secondary=true]</span></li>
			<li><span class="highlight">[EVENT_LIST category_identifier=your_category_identifier]</span></li>
			<li><span class="highlight">[EVENT_LIST staff_id=staff_id_number]</span></li>
			<li><span class="highlight">[EVENT_LIST order_by=date(start_date),id]</span></li>
		</ul>
		<h5>
			<?php _e('Order by parameters:', 'event_espresso'); ?>
		</h5>
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
		<p class="yellow_alert"><strong>
			<?php _e('Attention:', 'event_espresso'); ?>
			</strong><br />
<?php _e('The [EVENT_LIST] shortcode should not be used as a replacement for the [ESPRESSO_EVENTS] shortcode. Replacing the [ESPRESSO_EVENTS] shortcode will break your registration pages.', 'event_espresso'); ?>
		</p>
	</div>
	<div class="shortcode-box">
		<h4>
<?php _e('Attendee Listings', 'event_espresso'); ?>
		</h4>
		<ul>
			<li><span class="highlight">[LISTATTENDEES]</span></li>
			<li><span class="highlight">[LISTATTENDEES limit="30"]</span> //Number of events to show on the page</li>
			<li><span class="highlight">[LISTATTENDEES show_expired="true"]</span> //Show expired events</li>
			<li><span class="highlight">[LISTATTENDEES show_deleted="true"]</span> //Show deleted events</li>
			<li><span class="highlight">[LISTATTENDEES show_secondary="true"]</span> //Show secondary/backup events</li>
			<li><span class="highlight">[LISTATTENDEES show_gravatar="true"]</span> //Show a Gravatar of the attendee</li>
			<li><span class="highlight">[LISTATTENDEES event_identifier="your_event_identifier"]</span> //Show a single event using the event identifier</li>
			<li><span class="highlight">[LISTATTENDEES category_identifier="your_category_identifier"]</span> //Show a group of events in a category using the category identifier</li>
			<li><span class="highlight">[LISTATTENDEES staff_id="staff_id_number"]</span> //Show a list of events that are assigned to a staff member</li>
		</ul>
		<p>
<?php _e('For more information about the attendee listing shortcodes and customizations. Please view the <a href="http://eventespresso.com/wiki/shortcodes-template-variables/">Attendee Listing Shortcodes</a> page.', 'event_espresso'); ?>
		</p>
	</div>
	<div class="shortcode-box">
		<h4>
			<?php _e('Venue Shortcodes', 'event_espresso'); ?>
		</h4>
		<h5>
<?php _e('As of Event Espresso version 3.1', 'event_espresso'); ?>
		</h5>
		<a name="venue_shortcode" id="venue_shortcode"></a>
		<dl>
			<dt>
				<?php _e('Event Description Example:', 'event_espresso'); ?>
			</dt>
			<dd>
			<?php _e('If you want to display venue details within an event, the venue id is not needed. Just add <span class="highlight">[ESPRESSO_VENUE]</span> to your event description.', 'event_espresso'); ?>
			</dd>
			<dt>
<?php _e('Example with Optional Parameters:', 'event_espresso'); ?>
			</dt>
			<dd><span class="highlight">[ESPRESSO_VENUE outside_wrapper="div" outside_wrapper_class="event_venue"]</span></dd>
			<dt>
				<?php _e('Page/Post Example:', 'event_espresso'); ?>
			</dt>
			<dd>
<?php _e('You can display the details of any venue to a page, post or event by adding the id of the venue to the shortcode.', 'event_espresso'); ?>
				<br />
				<span class="highlight">[ESPRESSO_VENUE id="3"]</span></dd>
			<dt>
				<?php _e('Page/Post Example #2:', 'event_espresso'); ?>
			</dt>
			<dd>
<?php _e('If you want to display all available venues on a page, post, or event:', 'event_espresso'); ?>
				<br />
				<span class="highlight">[ESPRESSO_VENUE]</span>
			</dd>
			<dd>
<?php _e('Add the event id to the shortcode to display all the venues for an event:', 'event_espresso'); ?>
				<br />
				<span class="highlight">[ESPRESSO_VENUE event_id="8"]</span></dd>

		</dl>
		<h5>
<?php _e('Available parameters:', 'event_espresso'); ?>
		</h5>
		<ul>
			<li>outside_wrapper_class = class name for the outside wrapper. Eg. event_venue</li>
			<li>outside_wrapper = outside wrapper element. Eg. div</li>
			<li>inside_wrapper_class = class name for the outside wrapper. Eg. venue_details</li>
			<li>inside_wrapper = inside wrapper element. Eg. p</li>
			<li>title_class = class name for the title Eg. venue_name</li>
			<li>title_wrapper = title wrapper element. Eg. h3</li>
			<li>show_title = show the venue name? (true|false default true)</li>
			<li>image_class = class name for the image. Eg. venue_image</li>
			<li>show_image = show the image? (true|false default true)</li>
			<li>show_description = show the description? (true|false default true)</li>
			<li>show_address = show the address of the venue? (true|false default true)</li>
			<li>show_additional_details = show the additional details? (true|false default true)</li>
			<li>show_google_map_link = show the Google map link? (true|false default true)</li>
			<li>map_link_text = text to display in the link. Eg. Map and Directions</li>
		</ul>

		<dl>
			<dt>
<?php _e('Show All Events in a Venue:', 'event_espresso'); ?>
			</dt>
			<dd>
				<span class="highlight">[ESPRESSO_VENUE_EVENTS id="21"]</span></dd>
			<dd>
				<span class="highlight">[ESPRESSO_VENUE_EVENTS id="21" limit="5"]</span></dd>
		</dl> 

	</div>
	<div class="shortcode-box">
		<h4>
			<?php _e('Staff Shortcodes', 'event_espresso'); ?>
		</h4>
		<h5>
<?php _e('As of Event Espresso version 3.1', 'event_espresso'); ?>
		</h5>
		<a name="staff_shortcode" id="staff_shortcode"></a>
		<dl>
			<dt>
				<?php _e('Event Description Example:', 'event_espresso'); ?>
			</dt>
			<dd>
			<?php _e('If you want to display a list of staff members within an event, the staff id is not needed. Just add <span class="highlight">[ESPRESSO_STAFF]</span> to your event description.', 'event_espresso'); ?>
			</dd>
			<dt>
<?php _e('Example with Optional Parameters:', 'event_espresso'); ?>
			</dt>
			<dd><span class="highlight">[ESPRESSO_STAFF outside_wrapper="div" outside_wrapper_class="event_staff" inside_wrapper="p" inside_wrapper_class="event_person"]</span></dd>
			<dt>
				<?php _e('Page/Post Example:', 'event_espresso'); ?>
			</dt>
			<dd>
			<?php _e('You can display the details of any staff member to a page, post or event by adding the id of the staff member to the shortcode.', 'event_espresso'); ?>
				<span class="highlight">[ESPRESSO_STAFF id="3"]</span></dd>
			<dt>
				<?php _e('Page/Post Example #2:', 'event_espresso'); ?>
			</dt>
			<dd>
<?php _e('If you want to display a list of staff members assigned to an event, to a page, post or event add the event id to the  <span class="highlight">[ESPRESSO_STAFF]</span> shortcode.', 'event_espresso'); ?>
				<br />
				<span class="highlight">[ESPRESSO_STAFF event_id="8"]</span></dd>
		</dl>
		<h5><?php _e('Available parameters:', 'event_espresso'); ?></h5>
		<ul>
			<li>outside_wrapper_class = class name for the outside wrapper. Eg. event_staff</li>
			<li>outside_wrapper = outside wrapper element. Eg. div</li>
			<li>inside_wrapper_class = class name for the outside wrapper. Eg. event_person</li>
			<li>inside_wrapper = inside wrapper element. Eg. p</li>
			<li>name_class = class name for the persons name</li>
			<li>name_wrapper = name wrapper element. Eg. strong</li>
			<li>image_class = class name for the image. Eg. venue_image</li>
			<li>show_image = show the persons image? (true|false default true)</li>
			<li>show_staff_titles = show the role/title? (true|false default true)</li>
			<li>show_staff_details = show the details? (true|false default true)</li>
			<li>show_image = show the image? (true|false default true)</li>
			<li>show_description = show the description? (true|false default true)</li>
		</ul>
	</div>
	<div class="shortcode-box">
		<h4><?php _e('Calendar Shortcodes', 'event_espresso'); ?></h4>
		<ul>
			<li><span class="highlight">[ESPRESSO_CALENDAR]</span></li>
			<li><span class="highlight"> [ESPRESSO_CALENDAR show_expired="true"]</span></li>
			<li><span class="highlight">[ESPRESSO_CALENDAR event_category_id="your_category_identifier"]</span></li>
			<li><span class="highlight">[ESPRESSO_CALENDAR event_category_id="your_category_identifier" show_expired="true"]</span></li>
			<li><span class="highlight">[ESPRESSO_CALENDAR cal_view="month"] (Available parameters: month, basicWeek, basicDay, agendaWeek, agendaDay)</span></li>
		</ul>
	</div>
	<div class="shortcode-box">
		<h4><?php _e('Category Shortcodes', 'event_espresso'); ?></h4>
		<p><span class="highlight">[EVENT_ESPRESSO_CATEGORY event_category_id="your_category_indentifier"]</span></p>
	</div>
</div>
<!-- / .padding --> 