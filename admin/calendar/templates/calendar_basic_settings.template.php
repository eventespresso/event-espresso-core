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
					<?php echo EEH_Form_Fields::select_input('show_time', $values, $espresso_calendar['show_time'], 'id="show_time"');?>
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
					$espresso_calendar['time_format'] = empty($espresso_calendar['time_format']) ? get_option('time_format') : $espresso_calendar['time_format'];
					$time_formats = apply_filters('time_formats', array(
							__('g:i a'),
							'ga',
							'g:i A',
							'gA',
							'H:i',
						));

					$custom = true;

					foreach ($time_formats as $format) {
						echo "\t<label title='" . esc_attr($format) . "' style=\"display:inline-block; width:150px; margin-bottom:1em;\" >&nbsp;<input type='radio' name='time_format' value='" . esc_attr($format) . "'";
						if ($espresso_calendar['time_format'] === $format) {
							// checked() uses " == " rather than " === "
							echo " checked='checked'";
							$custom = false;
						}
						echo ' />&nbsp;<span>' . date_i18n($format) . "</span></label> \n";
					}

					echo '<div style="display:inline-block; width:230px;"><label style="display:inline-block;">&nbsp;<input type="radio" name="time_format" id="time_format_custom_radio" value="\c\u\s\t\o\m"';
					checked($custom);
					echo '/>&nbsp;' . __('Custom:') . '</label>&nbsp;<input type="text" name="time_format_custom" value="' . esc_attr($espresso_calendar['time_format']) . '" class="small-text" /> ';
					echo '<span class="example"> ' . date_i18n($espresso_calendar['time_format']) . "</span></div>";
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
					<?php echo EEH_Form_Fields::select_input('firstDay', $days_of_the_week, $espresso_calendar['firstDay'], 'id="firstDay"'); ?><br />
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
					<?php echo EEH_Form_Fields::select_input('weekends', $values, $espresso_calendar['weekends'], 'id="weekends"'); ?><br />
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
			$espresso_calendar['weekMode'] = isset( $espresso_calendar['weekMode'] ) ? $espresso_calendar['weekMode'] : 'liquid';
			?>
			<tr>
				<th>
					<label for="weekMode">
						<?php _e('Week Mode', 'event_espresso');  // 'fixed', 'liquid', 'variable'?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select_input('weekMode', $week_modes, $espresso_calendar['weekMode'], 'id="weekMode"'); ?><br />
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
					<input id="espresso_calendar_height" type="text" name="espresso_calendar_height" size="100" maxlength="100" value="<?php echo $espresso_calendar['espresso_calendar_height']; ?>" />
					<br />
					<span class="description">
						<?php _e('Will make the entire calendar (including header) a pixel height. Leave blank for an automagical height.', 'event_espresso'); ?>
					</span>
				</td>
			</tr>
			<!--								<tr>
			<th> <label for="calendar_pages">
			<?php _e('Page(s) Displaying the Calendar', 'event_espresso'); ?>
			</label>
			</th>
			<td><input id="calendar_pages" type="text" name="calendar_pages" size="100" maxlength="100" value="<?php echo isset($espresso_calendar['calendar_pages']) && !empty($espresso_calendar['calendar_pages']) ? $espresso_calendar['calendar_pages'] : 0; ?>" />
			<br />
			<span class="description">
			<?php _e('This tells the plugin to load the calendar CSS file on specific pages. This should be a comma separated list of page id\'s. If left to the default of 0, the calendar stylesheet will load on every page of the site. You can find Page ID\'s by going to the WordPress menu Pages > All Pages, and hovering your mouse over the Page title, at the bottom of your browser a small box will appear with some code in it. Where it says post= then a number (post=4), that number is the Page ID. You can improve site performance and reduce conflicts by specifying which page/s have calendars on them.', 'event_espresso'); ?>
			</span></td>
			</tr>-->
			<tr>
				<th>
					<label for="enable-calendar-thumbs">
						<?php _e('Enable Images in Calendar', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select_input('enable_calendar_thumbs', $values, isset($espresso_calendar['enable_calendar_thumbs']) && !empty($espresso_calendar['enable_calendar_thumbs']) ?  $espresso_calendar['enable_calendar_thumbs']: 0, 'id="enable-calendar-thumbs"'); ?>
					<br />
					<span class="description">
						<?php _e('The "Featured Image" box in the event editor handles the thumbnail image URLs for each event. After setting the "Enable Calendar images" option to "Yes" in the calendar settings, upload an event image in the built-in WordPress media uploader, then click the Insert into post button on the media uploader.', 'event_espresso'); ?>
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
					<?php echo EEH_Form_Fields::select_input('enable_cat_classes', $values, $espresso_calendar['enable_cat_classes'], 'id="enable-cat-classes"'); ?><br />
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
					<?php echo EEH_Form_Fields::select_input('espresso_use_pickers', $values, $espresso_calendar['espresso_use_pickers'], 'id="espresso_use_pickers"'); ?><br />
					<span class="description">
						<?php _e('This allows you to customize the event background color and text color.', 'event_espresso'); ?>
					</span>
				</td>
			</tr>
			<tr class="color-picker-selections">
				<th class="color-picker-style">
					<label for="background-color">
						<?php _e('Event Background Color', 'event_espresso') ?>
					</label>
				</th>
				<td>
					<input id="background-color"type="text" name="ee_event_background" <?php echo (isset($espresso_calendar['ee_event_background']) && !empty($espresso_calendar['ee_event_background'])) ? 'value="' . $espresso_calendar['ee_event_background'] . '"' : 'value="#007BAE"' ?> />
					<div id="colorpicker-1">
					</div>
				</td>
			</tr>
			<tr class="color-picker-selections">
				<th class="color-picker-style">
					<label for="text-color">
						<?php _e('Event Text Color', 'event_espresso') ?>
					</label>
				</th>
				<td>
					<input id="text-color" type="text" name="ee_event_text_color" <?php echo (isset($espresso_calendar['ee_event_text_color']) && !empty($espresso_calendar['ee_event_text_color'])) ? 'value="' . $espresso_calendar['ee_event_text_color'] . '"' : 'value="#FFFFFF"' ?> />
					<div id="colorpicker-2">
					</div>
				</td>
			</tr>



			<tr>
				<th>
					<label for="show_tooltips">
						<?php _e('Show Tooltips', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select_input('show_tooltips', $values, $espresso_calendar['show_tooltips'], 'id="show_tooltips"'); ?><br />
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
			<tr class="tooltip-position-selections">
				<th class="tooltip-positions">
					<label for="tooltips_pos_my_1">
						<?php _e('Tooltip Position', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php _e('Place Tooltip ', 'event_espresso'); ?>
					<?php echo EEH_Form_Fields::select_input('tooltips_pos_my_1', $values_1, !empty($espresso_calendar['tooltips_pos_my_1']) ? $espresso_calendar['tooltips_pos_my_1'] : 'bottom', 'id="tooltips_pos_my_1"'); ?>
					<?php echo EEH_Form_Fields::select_input('tooltips_pos_my_2', $values_2, !empty($espresso_calendar['tooltips_pos_my_2']) ? $espresso_calendar['tooltips_pos_my_2'] : 'center', 'id="tooltips_pos_my_2"'); ?>
					<?php _e('at the Event\'s  ', 'event_espresso'); ?>
					<?php echo EEH_Form_Fields::select_input('tooltips_pos_at_1', $values_1, !empty($espresso_calendar['tooltips_pos_at_1']) ? $espresso_calendar['tooltips_pos_at_1'] : 'center', 'id="tooltips_pos_at_1"'); ?>
					<?php echo EEH_Form_Fields::select_input('tooltips_pos_at_2', $values_2, !empty($espresso_calendar['tooltips_pos_at_2']) ? $espresso_calendar['tooltips_pos_at_2'] : 'center', 'id="tooltips_pos_at_2"'); ?><br />
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

			<tr class="tooltip_style-selections">
				<th class="tooltip_style">
					<label for="tooltip_style">
						<?php _e('Tooltip Style', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select_input('tooltip_style', $tooltip_style, !empty($espresso_calendar['tooltip_style']) ? $espresso_calendar['tooltip_style'] : 'qtip-light', 'id="tooltip_style"'); ?><br/>
					<span class="description">
						<?php _e('Adds styling to tooltips. Default: light', 'event_espresso'); ?>
					</span>
				</td>
			</tr>

			<tr class="tooltip_word_count">
				<th>
					<label for="tooltip_word_count">
						<?php _e('Tooltip Desc Word Count', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<input id="tooltip_word_count" type="text" name="tooltip_word_count" value="<?php echo isset( $espresso_calendar['tooltip_word_count'] ) ? $espresso_calendar['tooltip_word_count'] : 50; ?>" /><br/>
					<span class="description">
						<?php _e('Number of words to show in tooltip event descriptions. Set to "0" for no limit. Default: 50.<br/>Please note that using this feature will strip all formating and images from your tool tip event descriptions.', 'event_espresso'); ?>
					</span>
				</td>
			</tr>

		</tbody>
	</table>
</div>
<!-- / .padding -->
