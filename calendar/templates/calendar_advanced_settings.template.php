<?php 
/* @var $calendar_config EE_Calendar_Config */
?>
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
					<input type="text" name="calendar[header][left]" id="espresso_calendar_header_left" class="medium-text" value="<?php echo htmlentities($calendar_config->header->left) ?>"><br />
					<?php _e('Center', 'event_espresso'); ?>:&nbsp;
					<input type="text" name="calendar[header][center]" id="espresso_calendar_header_center" class="medium-text" value="<?php echo htmlentities($calendar_config->header->center) ?>"><br />
					<?php _e('Right', 'event_espresso'); ?>:&nbsp;&nbsp;&nbsp;&nbsp;
					<input type="text" class="medium-text" name="calendar[header][right]" id="espresso_calendar_header_right" value="<?php echo htmlentities($calendar_config->header->right) ?>"><br />
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
					<input type="text" class="medium-text" name="calendar[button_text][prev]" id="buttonText_prev" value="<?php echo htmlentities($calendar_config->button_text->prev) ?>"><br />

					<?php _e('Next', 'event_espresso'); ?>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<input type="text" class="medium-text" name="calendar[button_text][next]" id="buttonText_next" value="<?php echo htmlentities($calendar_config->button_text->next) ?>"><br />

					<?php _e('Previous Year', 'event_espresso'); ?>:&nbsp;
					<input type="text" class="medium-text" name="calendar[button_text][prev_year]" id="buttonText_prevYear" value="<?php echo htmlentities($calendar_config->button_text->prev_year) ?>"><br />

					<?php _e('Next Year', 'event_espresso'); ?>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<input type="text" class="medium-text" name="calendar[button_text][next_year]" id="buttonText_nextYear" value="<?php echo htmlentities($calendar_config->button_text->next_year) ?>"><br />

					<?php _e('Today', 'event_espresso'); ?>:&nbsp;&nbsp;&nbsp;&nbsp;
					<input type="text" class="medium-text" name="calendar[button_text][today]" id="buttonText_today" value="<?php echo htmlentities($calendar_config->button_text->today) ?>"><br />

					<?php _e('Month', 'event_espresso'); ?>:&nbsp;&nbsp;&nbsp;&nbsp;
					<input type="text" class="medium-text" name="calendar[button_text][month]" id="buttonText_month" value="<?php echo htmlentities($calendar_config->button_text->month) ?>"><br />

					<?php _e('Week', 'event_espresso'); ?>:&nbsp;&nbsp;&nbsp;&nbsp;
					<input type="text" class="medium-text" name="calendar[button_text][week]" id="buttonText_week" value="<?php echo htmlentities($calendar_config->button_text->week) ?>"><br />

					<?php _e('Day', 'event_espresso'); ?>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<input type="text" class="medium-text" name="calendar[button_text][day]" id="buttonText_day" value="<?php echo htmlentities($calendar_config->button_text->day) ?>"><br />

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
					<input type="text" class="medium-text" name="calendar[title_format][month]" id="titleFormat_month" value="<?php echo htmlentities($calendar_config->title_format->month) ?>"><br />
					<?php _e('Week', 'event_espresso'); ?>:&nbsp;
					<input type="text" class="medium-text" name="calendar[title_format][week]" id="titleFormat_week" value="<?php echo htmlentities($calendar_config->title_format->week) ?>"><br />
					<?php _e('Day', 'event_espresso'); ?>:&nbsp;&nbsp;&nbsp;&nbsp;
					<input type="text" class="medium-text" name="calendar[title_format][day]" id="titleFormat_day" value="<?php echo htmlentities($calendar_config->title_format->day) ?>"><br />
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
					<input type="text" class="medium-text" name="calendar[column_format][day]" id="columnFormat_month" value="<?php echo htmlentities($calendar_config->column_format->month) ?>"><br />
					<?php _e('Week', 'event_espresso'); ?>:&nbsp;
					<input type="text" class="medium-text" name="calendar[column_format][day]" id="columnFormat_week" value="<?php echo htmlentities($calendar_config->column_format->week) ?>"><br />
					<?php _e('Day', 'event_espresso'); ?>:&nbsp;&nbsp;&nbsp;&nbsp;
					<input type="text" class="medium-text" name="calendar[column_format][day]" id="columnFormat_day" value="<?php echo htmlentities($calendar_config->column_format->day) ?>"><br />
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
					<?php echo EEH_Form_Fields::select_input('calendar[display][show_attendee_limit]', $values, $calendar_config->display->show_attendee_limit, 'id="show_attendee_limit"'); ?><br />
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
					<?php echo EEH_Form_Fields::select_input('calendar[display][disable_categories]', $values, $calendar_config->display->disable_categories, 'id="disable_categories"'); ?><br />
					<span class="description">
						<?php _e('Disabling categories in the calendar may potentially speed up the calendar and allow you to load more events, but you will not be able to use the category colors and css class options.', 'event_espresso'); ?>
					</span>
				</td>
			</tr>

		</tbody>
	</table>
</div>
<input type='hidden' name="return_action" value="<?php echo $return_action?>">
<!-- / .padding -->