<div class="padding">
	<ul>
		<li>
			<strong>
				<?php _e('Directions:', 'event_espresso'); ?>
			</strong><br />
			<?php _e(' Add [ESPRESSO_CALENDAR] to any page or post to display a calendar of Event Espresso events. Use [ESPRESSO_CALENDAR event_category_id="your_category_identifier"] to show events of a certain category (also creates a CSS using the category_identifier as the class name.) Use [ESPRESSO_CALENDAR show_expired="true"] to show expired events, can also be used inconjunction with the category ID.', 'event_espresso'); ?>
		</li>
		<li>
			<strong>
				<?php _e('Examples Shortcodes:', 'event_espresso'); ?>
			</strong><br />
			[ESPRESSO_CALENDAR]<br />
			[ESPRESSO_CALENDAR show_expired="true"]<br />
			[ESPRESSO_CALENDAR event_category_id="your_category_identifier"]<br />
			[ESPRESSO_CALENDAR event_category_id="your_category_identifier" show_expired="true"]<br />
			[ESPRESSO_CALENDAR cal_view="month"] (Available parameters: month, basicWeek, basicDay, agendaWeek, agendaDay)
		</li>
		<li>
			<strong>
				<?php _e('Styles/Colors (premium version only):', 'event_espresso'); ?>
			</strong><br />
			<?php _e('To edit the calendar styles, copy the CSS file located in the plugin folder to your "wp-content/uploads/espresso/" directory. Then edit as needed. Refer to <a href="http://arshaw.com/fullcalendar/docs/event_rendering/Colors/" target="_blank">this page</a> for an example of styling the calendar and colors.', 'event_espresso'); ?>
		</li>
		<li>
			<strong>
				<?php _e('Category Colors (premium version only):', 'event_espresso'); ?>
			</strong><br />
			<?php _e('Event Categories can have their own colors on the calendar. To use this feature, simply create a class in theme CSS file with the names of your event categories. For more inforamtion <a href="http://eventespresso.com/forums/?p=650" target="_blank">please visit the tutorial</a> for this topic.', 'event_espresso'); ?>
		</li>
	</ul>
</div>
<!-- / .padding -->