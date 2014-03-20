<?php 
/* @var $calendar_config EE_Calendar_Config */
?>
<div class="padding">
	<h4>
		<?php _e('Time/Date Settings', 'event_espresso'); ?>
	</h4>
	<table class="form-table">
		<tbody>
			<tr>
				<th>
					<label for="show_time">
						<?php _e('Show Event Time in Calendar', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select_input('calendar[time][show]', $values, $calendar_config->time->show, 'id="show_time"');?>
				</td>
			</tr>
			<tr>
				<th>
					<label for="time_format">
						<?php _e('Time Format') ?>
					</label>
				</th>
				<td>
					<?php
					
					$time_formats = apply_filters('time_formats', array(
							__('g:i a'),
							'ga',
							'g:i A',
							'gA',
							'H:i',
						));

					$custom = true;

					foreach ($time_formats as $format) {
						echo "\t<label title='" . esc_attr($format) . "' style=\"display:inline-block; width:150px; margin-bottom:1em;\" >&nbsp;<input type='radio' name='calendar[time][format]' value='" . esc_attr($format) . "'";
						if ($calendar_config->time->format === $format) {
							// checked() uses " == " rather than " === "
							echo " checked='checked'";
							$custom = false;
						}
						echo ' />&nbsp;<span>' . date_i18n($format) . "</span></label> \n";
					}

					echo '<div style="display:inline-block; width:230px;"><label style="display:inline-block;">&nbsp;<input type="radio" name="calendar[time][format]" id="time_format_custom_radio" value="\c\u\s\t\o\m"';
					checked($custom);
					echo '/>&nbsp;' . __('Custom:') . '</label>&nbsp;<input type="text" name="time_format_custom" value="' . esc_attr($calendar_config->time->format) . '" class="small-text" /> ';
					echo '<span class="example"> ' . date_i18n($calendar_config->time->format) . "</span></div>";
					?>
					<p><span class="description">
						<a href="http://codex.wordpress.org/Formatting_Date_and_Time">
							<?php _e('Documentation on date and time formatting', 'event_espresso'); ?>
						</a>
					</span></p>
					<img class="ajax-loading" src="<?php echo esc_url(admin_url('images/wpspin_light.gif'));?>" alt="" />
				</td>
			</tr>

			<?php
			$days_of_the_week = array(
				array('id'  => 0,'text'=> __('Sunday', 'event_espresso')),
				array('id'  => 1,'text'=> __('Monday', 'event_espresso')),
				array('id'  => 2,'text'=> __('Tuesday', 'event_espresso')),
				array('id'  => 3,'text'=> __('Wednesday', 'event_espresso')),
				array('id'  => 4,'text'=> __('Thursday', 'event_espresso')),
				array('id'  => 5,'text'=> __('Friday', 'event_espresso')),
				array('id'  => 6,'text'=> __('Saturday', 'event_espresso'))
			);
			?>
			<tr>
				<th>
					<label for="firstDay">
						<?php _e('First Day of the Week', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select_input('calendar[time][first_day]', $days_of_the_week,$calendar_config->time->first_day, 'id="firstDay"'); ?><br />
					<span class="description">
						<?php _e('Determines which day will be in the first column of the calendar', 'event_espresso'); ?>
					</span>
				</td>
			</tr>
			
			<tr>
				<th>
					<label for="weekends">
						<?php _e('Show Weekends', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select_input('calendar[time][weekends]', $values,$calendar_config->time->weekends, 'id="weekends"'); ?><br />
					<span class="description">
						<?php _e('This setting allows you to remove the weekends from your calendar views. This may be useful if you don\'t have events on weekends.', 'event_espresso'); ?>
					</span>
				</td>
			</tr>
			
		</tbody>
	</table>
	<h4>
		<?php _e('Page Settings', 'event_espresso'); ?>
	</h4>
	<table class="form-table">
		<tbody>
			<?php
			$week_modes = array(
				array('id'  => 'fixed','text'=> __('fixed: displays 6 weeks, fixed height', 'event_espresso')),
				array('id'  => 'liquid','text'=> __('liquid: displays 4-6 weeks, fixed height', 'event_espresso')),
				array('id'  => 'variable','text'=> __('variable: displays 4-6 weeks, variable height', 'event_espresso'))
			);
			?>
			<tr>
				<th>
					<label for="weekMode">
						<?php _e('Week Mode', 'event_espresso');  // 'fixed', 'liquid', 'variable'?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select_input('calendar[time][week_mode]', $week_modes, $calendar_config->time->week_mode, 'id="weekMode"'); ?><br />
					<span class="description">
						<?php _e('Determines the number of weeks displayed in a month view. Also determines each week\'s height.<br/>"fixed" - The calendar will always be 6 weeks tall. The height will always be the same, as determined by the calendar height setting or the aspect ratio.<br/>"liquid" - The calendar will have either 4, 5, or 6 weeks, depending on the month. The height of the weeks will stretch to fill the available height, as determined by the calendar height setting or the aspect ratio.<br/>"variable" - The calendar will have either 4, 5, or 6 weeks, depending on the month. Each week will have the same constant height, meaning the calendar\'s height will change month-to-month.', 'event_espresso'); ?>
					</span>
				</td>
			</tr>
			
			<tr>
				<th>
					<label for="espresso_calendar_height">
						<?php _e('Height', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<input id="espresso_calendar_height" type="text" name="calendar[display][calendar_height]" value="<?php echo $calendar_config->display->calendar_height; ?>" />
					<br />
					<span class="description">
						<?php _e('Will make the entire calendar (including header) a pixel height. Leave blank for an automagical height.', 'event_espresso'); ?>
					</span>
				</td>
			</tr>
			<tr>
				<th>
					<label for="enable-calendar-thumbs">
						<?php _e('Enable Images in Calendar', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select_input('calendar[display][enable_calendar_thumbs]', $values, $calendar_config->display->enable_calendar_thumbs, 'id="enable-calendar-thumbs"'); ?>
					<br />
					<span class="description">
						<?php _e('The "Featured Image" box in the event editor handles the thumbnail image URLs for each event. After setting the "Enable Calendar images" option to "Yes" in the calendar settings, upload an event image in the built-in WordPress media uploader, then click the Insert into post button on the media uploader.', 'event_espresso'); ?>
					</span>
				</td>
			</tr>
			
			
			<tr>
				<th>
					<label for="enable_calendar_filters">
						<?php _e('Enable Filters in Calendar', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select_input('calendar[display][enable_calendar_filters]', $values, $calendar_config->display->enable_calendar_filters, 'id="enable_calendar_filters"'); ?>
					<br />
					<span class="description">
						<?php _e('Filters allow users to filter events based on category and/or venue.', 'event_espresso'); ?>
					</span>
				</td>
			</tr>
			
			<tr>
				<th>
					<label for="enable_category_legend">
						<?php _e('Enable Category Legend', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select_input('calendar[display][enable_category_legend]', $values, $calendar_config->display->enable_category_legend, 'id="enable_category_legend"'); ?>
					<br />
					<span class="description">
						<?php _e('Shows a legend of all the different event categories', 'event_espresso'); ?>
					</span>
				</td>
			</tr>
		</tbody>
	</table>
	<h4>
		<?php _e('Theme Settings', 'event_espresso'); ?>
	</h4>

	<table class="form-table">
		<tbody>
			<tr>
				<th>
					<label for="enable-cat-classes">
						<?php _e('Enable CSS for Categories', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select_input('calendar[display][enable_cat_classes]', $values,$calendar_config->display->enable_cat_classes, 'id="enable-cat-classes"'); ?><br />
					<span class="description">
						<?php _e('This setting allows you to set each category to display a different color. Set each category color in Event Espresso > Categories.', 'event_espresso'); ?>
					</span>
				</td>
			</tr>
			<tr>
				<th>
					<label for="espresso_use_pickers">
						<?php _e('Use Color Pickers', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select_input('calendar[display][use_pickers]', $values,$calendar_config->display->use_pickers); ?><br />
					<span class="description">
						<?php _e('This allows you to customize the event background color and text color.', 'event_espresso'); ?>
					</span>
				</td>
			</tr>
			<tr class="color-picker-selections requires-color-pickers">
				<th class="color-picker-style">
					<label for="background-color">
						<?php _e('Event Background Color', 'event_espresso') ?>
					</label>
				</th>
				<td>
					<input id="background-color" class="color-picker" type="text" name="calendar[display][event_background]" value="<?php echo $calendar_config->display->event_background ?>" />
				</td>
			</tr>
			<tr class="color-picker-selections requires-color-pickers">
				<th class="color-picker-style">
					<label for="text-color">
						<?php _e('Event Text Color', 'event_espresso') ?>
					</label>
				</th>
				<td>
					<input id="text-color" class="color-picker" type="text" name="calendar[display][event_text_color]" value="<?php echo $calendar_config->display->event_text_color ?>" />
		
				</td>
			</tr>



			<tr>
				<th>
					<label for="show_tooltips">
						<?php _e('Show Tooltips', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select_input('calendar[tooltip][show]', $values, $calendar_config->tooltip->show, 'id="show_tooltips"'); ?><br />
					<span class="description">
						<?php _e('This allows you to display a short description of the event on hover. The "display short descriptions" feature set in Event Espresso>Template settings should be switched on when using this feature. Be sure to use the <code>&lt;!--more--&gt;</code> tag to separate the short description from the entire event description.', 'event_espresso'); ?>
					</span>
				</td>
			</tr>
			<?php
			$values_1 = array(
				array('id'  => 'top','text'=> __('Top', 'event_espresso')),
				array('id'  => 'center','text'=> __('Center', 'event_espresso')),
				array('id'  => 'bottom','text'=> __('Bottom', 'event_espresso'))
			);
			$values_2 = array(
				array('id'  => 'left','text'=> __('Left', 'event_espresso')),
				array('id'  => 'center','text'=> __('Center', 'event_espresso')),
				array('id'  => 'right','text'=> __('Right', 'event_espresso'))
			);
			?>
			<tr class="tooltip-position-selections requires-tooltips">
				<th class="tooltip-positions">
					<label for="tooltips_pos_my_1">
						<?php _e('Tooltip Position', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php _e('Place Tooltip\'s ', 'event_espresso'); ?>
					<?php echo EEH_Form_Fields::select_input('calendar[tooltip][pos_my_1]', $values_1, $calendar_config->tooltip->pos_my_1, 'id="tooltips_pos_my_1"'); ?>
					<?php echo EEH_Form_Fields::select_input('calendar[tooltip][pos_my_2]', $values_2, $calendar_config->tooltip->pos_my_2, 'id="tooltips_pos_my_2"'); ?>
					<?php _e('at the Event\'s  ', 'event_espresso'); ?>
					<?php echo EEH_Form_Fields::select_input('calendar[tooltip][pos_at_1]', $values_1, $calendar_config->tooltip->pos_at_1, 'id="tooltips_pos_at_1"'); ?>
					<?php echo EEH_Form_Fields::select_input('calendar[tooltip][pos_at_2]', $values_2, $calendar_config->tooltip->pos_at_2, 'id="tooltips_pos_at_2"'); ?><br />
					<span class="description">
						<?php _e('Default: "Bottom Center" and "Center Center"', 'event_espresso'); ?>
					</span>
				</td>
			</tr>

			<?php
			$tooltip_style = array(
				array('id'  => 'qtip-plain','text'=> __('plain', 'event_espresso')),
				array('id'  => 'qtip-light','text'=> __('light', 'event_espresso')),
				array('id'  => 'qtip-dark','text'=> __('dark', 'event_espresso')),
				array('id'  => 'qtip-red','text'=> __('red', 'event_espresso')),
				array('id'  => 'qtip-green','text'=> __('green', 'event_espresso')),
				array('id'  => 'qtip-blue','text'=> __('blue', 'event_espresso')),
				array('id'  => 'qtip-bootstrap','text'=> __('Twitter Bootstrap', 'event_espresso')),
				array('id'  => 'qtip-tipsy','text'=> __('Tipsy', 'event_espresso')),
				array('id'  => 'qtip-youtube','text'=> __('YouTube', 'event_espresso')),
				array('id'  => 'qtip-jtools','text'=> __('jTools', 'event_espresso')),
				array('id'  => 'qtip-cluetip','text'=> __('clueTip', 'event_espresso')),
				array('id'  => 'qtip-tipped','text'=> __('Tipped', 'event_espresso')),
			);
			?>

			<tr class="tooltip_style-selections requires-tooltips">
				<th class="tooltip_style">
					<label for="tooltip_style">
						<?php _e('Tooltip Style', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select_input('calendar[tooltip][style]', $tooltip_style, $calendar_config->tooltip->style, 'id="tooltip_style"'); ?><br/>
					<span class="description">
						<?php _e('Adds styling to tooltips. Default: light', 'event_espresso'); ?>
					</span>
				</td>
			</tr>
			<tr>
				<th><?php					_e("Calendar Configuration Reset", 'event_espresso');?></th>
				<td>
					<a class="button button-small calendar-reset-button" href="<?php echo $reset_url?>"><?php _e("Reset Now", 'event_espresso');?></a><br/>
					<span class="description">
						<?php _e('Resets all basic and advanced Event Espresso calendar settings to their plugin defaults', 'event_espresso'); ?>
					</span>
				</td>
			</tr>
		</tbody>
	</table>
</div>
<input type='hidden' name="return_action" value="<?php echo $return_action?>">
<!-- / .padding -->
