<div class="padding">					
	<h4>
		<?php _e('Formatting', 'event_espresso'); ?>
	</h4>

	<table class="form-table">
		<tbody>

			<tr>
				<th>
					<label>
						<?php _e('Header Style Left', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php _e('Left', 'event_espresso'); ?>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<input type="text" name="espresso_calendar_header_left" id="espresso_calendar_header_left" class="medium-text" value="<?php echo htmlentities(stripslashes($espresso_calendar['header_left'])) ?>"><br />
					<?php _e('Center', 'event_espresso'); ?>:&nbsp;
					<input type="text" name="espresso_calendar_header_center" id="espresso_calendar_header_center" class="medium-text" value="<?php echo htmlentities(stripslashes($espresso_calendar['header_center'])) ?>"><br />
					<?php _e('Right', 'event_espresso'); ?>:&nbsp;&nbsp;&nbsp;&nbsp;
					<input type="text" class="medium-text" name="espresso_calendar_header_right" id="espresso_calendar_header_right" value="<?php echo htmlentities(stripslashes($espresso_calendar['header_right'])) ?>"><br />
					<span class="description">
						<?php _e('Defines the buttons and title at the top of the calendar.', 'event_espresso'); ?>
					</span>
				</td>
			</tr>

			<tr>
				<th>
					<label>
						<?php _e('Button Text', 'event_espresso'); ?>
					</label>
				</th>
				<td>

					<?php _e('Previous', 'event_espresso'); ?>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<input type="text" class="medium-text" name="buttonText_prev" id="buttonText_prev" value="<?php echo htmlentities(stripslashes($espresso_calendar['buttonText_prev'])) ?>"><br />

					<?php _e('Next', 'event_espresso'); ?>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<input type="text" class="medium-text" name="buttonText_next" id="buttonText_next" value="<?php echo htmlentities(stripslashes($espresso_calendar['buttonText_next'])) ?>"><br />

					<?php _e('Previous Year', 'event_espresso'); ?>:&nbsp;
					<input type="text" class="medium-text" name="buttonText_prevYear" id="buttonText_prevYear" value="<?php echo htmlentities(stripslashes($espresso_calendar['buttonText_prevYear'])) ?>"><br />

					<?php _e('Next Year', 'event_espresso'); ?>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<input type="text" class="medium-text" name="buttonText_nextYear" id="buttonText_nextYear" value="<?php echo htmlentities(stripslashes($espresso_calendar['buttonText_nextYear'])) ?>"><br />

					<?php _e('Today', 'event_espresso'); ?>:&nbsp;&nbsp;&nbsp;&nbsp;
					<input type="text" class="medium-text" name="buttonText_today" id="buttonText_today" value="<?php echo htmlentities(stripslashes($espresso_calendar['buttonText_today'])) ?>"><br />

					<?php _e('Month', 'event_espresso'); ?>:&nbsp;&nbsp;&nbsp;&nbsp;
					<input type="text" class="medium-text" name="buttonText_month" id="buttonText_month" value="<?php echo htmlentities(stripslashes($espresso_calendar['buttonText_month'])) ?>"><br />

					<?php _e('Week', 'event_espresso'); ?>:&nbsp;&nbsp;&nbsp;&nbsp;
					<input type="text" class="medium-text" name="buttonText_week" id="buttonText_week" value="<?php echo htmlentities(stripslashes($espresso_calendar['buttonText_week'])) ?>"><br />

					<?php _e('Day', 'event_espresso'); ?>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<input type="text" class="medium-text" name="buttonText_day" id="buttonText_day" value="<?php echo htmlentities(stripslashes($espresso_calendar['buttonText_day'])) ?>"><br />

					<span class="description">
						<?php _e('Text that will be displayed on the buttons in the header.', 'event_espresso'); ?>
					</span>
				</td>
			</tr>

			<tr>
				<th>
					<label>
						<?php _e('Title Format', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php _e('Month', 'event_espresso'); ?>:&nbsp;
					<input type="text" class="medium-text" name="titleFormat_month" id="titleFormat_month" value="<?php echo htmlentities(stripslashes($espresso_calendar['titleFormat_month'])) ?>"><br />
					<?php _e('Week', 'event_espresso'); ?>:&nbsp;
					<input type="text" class="medium-text" name="titleFormat_week" id="titleFormat_week" value="<?php echo htmlentities(stripslashes($espresso_calendar['titleFormat_week'])) ?>"><br />
					<?php _e('Day', 'event_espresso'); ?>:&nbsp;&nbsp;&nbsp;&nbsp;
					<input type="text" class="medium-text" name="titleFormat_day" id="titleFormat_day" value="<?php echo htmlentities(stripslashes($espresso_calendar['titleFormat_day'])) ?>"><br />
					<span class="description">
						<?php _e('Determines the text that will be displayed in the header\'s title.', 'event_espresso'); ?>
					</span>
				</td>
			</tr>

			<tr>
				<th>
					<label>
						<?php _e('Column Format', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php _e('Month', 'event_espresso'); ?>:&nbsp;
					<input type="text" class="medium-text" name="columnFormat_month" id="columnFormat_month" value="<?php echo htmlentities(stripslashes($espresso_calendar['columnFormat_month'])) ?>"><br />
					<?php _e('Week', 'event_espresso'); ?>:&nbsp;
					<input type="text" class="medium-text" name="columnFormat_week" id="columnFormat_week" value="<?php echo htmlentities(stripslashes($espresso_calendar['columnFormat_week'])) ?>"><br />
					<?php _e('Day', 'event_espresso'); ?>:&nbsp;&nbsp;&nbsp;&nbsp;
					<input type="text" class="medium-text" name="columnFormat_day" id="columnFormat_day" value="<?php echo htmlentities(stripslashes($espresso_calendar['columnFormat_day'])) ?>"><br />
					<span class="description">
						<?php _e('Determines the text that will be displayed on the calendar\'s column headings.', 'event_espresso'); ?>
					</span>
				</td>
			</tr>

		</tbody>
	</table>
	<h4>
		<?php _e('Memory Management', 'event_espresso'); ?>
	</h4>

	<table class="form-table">
		<tbody>

			<tr>
				<th>
					<label for="show_attendee_limit">
						<?php _e('Display Attendee Limits', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select_input('show_attendee_limit', $values, !empty($espresso_calendar['show_attendee_limit']) ? $espresso_calendar['show_attendee_limit'] : false, 'id="show_attendee_limit"'); ?><br />
					<span class="description">
						<?php _e('Enabling this setting increases the amount of database queries and may break the calendar on some servers.', 'event_espresso'); ?>
					</span>
				</td>
			</tr>

			<tr>
				<th>
					<label for="disable_categories">
						<?php _e('Disable Categories?', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select_input('disable_categories', $values, !empty($espresso_calendar['disable_categories']) ? $espresso_calendar['disable_categories'] : false, 'id="disable_categories"'); ?><br />
					<span class="description">
						<?php _e('Disabling categories in the calendar may potentially speed up the calendar and allow you to load more events, but you will not be able to use the category colors and css class options.', 'event_espresso'); ?>
					</span>
				</td>
			</tr>

		</tbody>
	</table>
</div>
<!-- / .padding -->