<div class="padding">

	<table class="form-table">
		<tbody>

			<tr>
				<th>
					<label for="ee-display-map-no-shortcodes">
						<?php _e('Activate Google Maps', 'event_espresso') ?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select_input('use_google_maps', $values, $map_settings->use_google_maps, 'id="ee-display-map-no-shortcodes"'); ?>
				</td>
			</tr>

		</tbody>
	</table>


	<h4 class="ee-admin-settings-hdr">
		<?php _e('Reg Page Map Settings', 'event_espresso'); ?>
		<?php echo EEH_Template::get_help_tab_link('gmaps_info'); ?>
	</h4>

	<table class="form-table">
		<tbody>

			<tr>
				<th>
					<label for="event_details_map_width">
						<?php _e('Set Map Width', 'event_espresso') ?>
					</label>
				</th>
				<td>
					<input type="text" id="event_details_map_width"  name="event_details_map_width" value="<?php echo $map_settings->event_details_map_width; ?>" />
				</td>
			</tr>

			<tr>
				<th>
					<label for="event_details_map_height">
						<?php _e('Set Map Height', 'event_espresso') ?>
					</label>
				</th>
				<td>
					<input type="text" id="event_details_map_height" size="" name="event_details_map_height" value="<?php echo $map_settings->event_details_map_height; ?>" />
				</td>
			</tr>
			<tr>
				<th>
					<label for="event_details_map_zoom">
						<?php _e('Set Map Zoom level: Range 1 - 19', 'event_espresso') ?>
					</label>
				</th>
				<td>
					<input id="event_details_map_zoom" type="text" size="" name="event_details_map_zoom" value="<?php echo $map_settings->event_details_map_zoom; ?>" />
				</td>
			</tr>

			<tr>
				<th>
					<label for="event_details_display_nav">
						<?php _e('Set Map Navigation Overlay', 'event_espresso') ?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select_input('event_details_display_nav', $values, $map_settings->event_details_display_nav, 'id="event_details_display_nav" '); ?>
				</td>
			</tr>

			<tr>
				<th>
					<label for="event_details_nav_size">
						<?php _e('Keep Map Navigation Small', 'event_espresso') ?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select_input('event_details_nav_size', $values, $map_settings->event_details_nav_size, 'id="event_details_nav_size"'); ?>
				</td>
			</tr>

			<tr>
				<th>
					<?php _e('Set Map Type Control', 'event_espresso') ?>
				</th>
				<td>
					<label for="event_details_control_type-default" class="ee-admin-radio-lbl">
						<?php $checked = $map_settings->event_details_control_type == 'default' ? 'checked="checked"' : ''; ?>
						<input id="event_details_control_type-default" type="radio" name="event_details_control_type" value="default"<?php echo $checked;?>/>
						<?php _e(' Default', 'event_espresso') ?>
					</label>

					<label for="event_details_control_type-horizontal" class="ee-admin-radio-lbl">
						<?php $checked = $map_settings->event_details_control_type == 'horizontal' ? 'checked="checked"' : ''; ?>
						<input id="event_details_control_type-horizontal" type="radio" name="event_details_control_type" value="horizontal"<?php echo $checked;?>/>
						<?php _e(' Horizontal', 'event_espresso') ?>
					</label>

					<label for="event_details_control_type-dropdown" class="ee-admin-radio-lbl">
						<?php $checked = $map_settings->event_details_control_type == 'dropdown' ? 'checked="checked"' : ''; ?>
						<input id="event_details_control_type-dropdown" type="radio" name="event_details_control_type" value="dropdown"<?php echo $checked;?>/>
						<?php _e(' Dropdown', 'event_espresso') ?>
					</label>
				</td>
			</tr>

			<tr>
				<th>
					<?php _e('Set Map Alignment', 'event_espresso') ?>
				</th>
				<td>
					<label for="event_details_map_align-none" class="ee-admin-radio-lbl">
						<?php $checked = $map_settings->event_details_map_align == 'none' ? 'checked="checked"' : ''; ?>
						<input id="event_details_map_align-none" type="radio" name="event_details_map_align" value="none"<?php echo $checked;?>/>
						<?php _e(' None', 'event_espresso') ?>
					</label>

					<label for="event_details_map_align-left" class="ee-admin-radio-lbl">
						<?php $checked = $map_settings->event_details_map_align == 'left' ? 'checked="checked"' : ''; ?>
						<input id="event_details_map_align-left" type="radio" name="event_details_map_align" value="left"<?php echo $checked;?>/>
						<?php _e(' Align Left', 'event_espresso') ?>
					</label>

					<label for="event_details_map_align-center" class="ee-admin-radio-lbl">
						<?php $checked = $map_settings->event_details_map_align == 'center' ? 'checked="checked"' : ''; ?>
						<input id="event_details_map_align-center" type="radio" name="event_details_map_align" value="center"<?php echo $checked;?>/>
						<?php _e(' Align Center', 'event_espresso') ?>
					</label>

					<label for="event_details_map_align-right" class="ee-admin-radio-lbl">
						<?php $checked = $map_settings->event_details_map_align == 'right' ? 'checked="checked"' : ''; ?>
						<input id="event_details_map_align-right" type="radio" name="event_details_map_align" value="right"<?php echo $checked;?>/>
						<?php _e(' Align Right', 'event_espresso') ?>
					</label>
				</td>
			</tr>

		</tbody>
	</table>


	<h4 class="ee-admin-settings-hdr">
		<?php _e('Events List Options', 'event_espresso'); ?>
	</h4>

	<table class="form-table">
		<tbody>
			<tr>
				<th>
					<label for="event_list_map_width">
						<?php _e('Set Map Width', 'event_espresso') ?>
					</label>
				</th>
				<td>
					<input id="event_list_map_width" type="text"  name="event_list_map_width" value="<?php echo $map_settings->event_list_map_width; ?>" />
				</td>
			</tr>
			<tr>
				<th>
					<label for="event_list_map_height">
						<?php _e('Set Map Height', 'event_espresso') ?>
					</label>
				</th>
				<td>
					<input id="event_list_map_height" type="text" size="" name="event_list_map_height" value="<?php echo $map_settings->event_list_map_height; ?>" />
				</td>
			</tr>
			<tr>
				<th>
					<label for="event_list_map_zoom">
						<?php _e('Set Map Zoom level: Range: 1 - 19', 'event_espresso') ?>
					</label>
				</th>
				<td>
					<input id="event_list_map_zoom" type="text" size="" name="event_list_map_zoom" value="<?php echo $map_settings->event_list_map_zoom; ?>" />
				</td>
			</tr>
			<tr>
				<th>
					<label for="event_list_display_nav">
						<?php _e('Set Map Navigation Overlay ', 'event_espresso') ?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select_input('event_list_display_nav', $values, $map_settings->event_list_display_nav, 'id="event_list_display_nav"'); ?>
				</td>
			</tr>

			<tr>
				<th>
					<label for="event_list_nav_size">
						<?php _e('Keep Map Navigation Small', 'event_espresso') ?>
					</label>
				</th>
				<td>
					<?php echo EEH_Form_Fields::select_input('event_list_nav_size', $values, $map_settings->event_list_nav_size, 'id="event_list_nav_size"'); ?>
				</td>
			</tr>

			<tr>
				<th>
					<?php _e('Set Map Type Control', 'event_espresso') ?>
				</th>
				<td>
					<label for="event_list_control_type-default" class="ee-admin-radio-lbl">
						<?php $checked = $map_settings->event_list_control_type == 'default' ? 'checked="checked"' : ''; ?>
						<input id="event_list_control_type-default" type="radio" name="event_list_control_type" value="default"<?php echo $checked;?>/>
						<?php _e(' Default', 'event_espresso') ?>
					</label>

					<label for="event_list_control_type-horizontal" class="ee-admin-radio-lbl">
						<?php $checked = $map_settings->event_list_control_type == 'horizontal' ? 'checked="checked"' : ''; ?>
						<input id="event_list_control_type-horizontal" type="radio" name="event_list_control_type" value="horizontal"<?php echo $checked;?>/>
						<?php _e(' Horizontal', 'event_espresso') ?>
					</label>

					<label for="event_list_control_type-dropdown" class="ee-admin-radio-lbl">
						<?php $checked = $map_settings->event_list_control_type == 'dropdown' ? 'checked="checked"' : ''; ?>
						<input id="event_list_control_type-dropdown" type="radio" name="event_list_control_type" value="dropdown"<?php echo $checked;?>/>
						<?php _e(' Dropdown', 'event_espresso') ?>
					</label>

				</td>
			</tr>

			<tr>
				<th>
					<?php _e('Set Map Alignment', 'event_espresso') ?>
				</th>
				<td>
					<label for="event_list_map_align-none" class="ee-admin-radio-lbl">
						<?php $checked = $map_settings->event_list_map_align == 'none' ? 'checked="checked"' : ''; ?>
						<input id="event_list_map_align-none" type="radio" name="event_list_map_align" value="none"<?php echo $checked;?>/>
						<?php _e(' None', 'event_espresso') ?>
					</label>

					<label for="event_list_map_align-left" class="ee-admin-radio-lbl">
						<?php $checked = $map_settings->event_list_map_align == 'left' ? 'checked="checked"' : ''; ?>
						<input id="event_list_map_align-left" type="radio" name="event_list_map_align" value="left"<?php echo $checked;?>/>
						<?php _e(' Align Left', 'event_espresso') ?>
					</label>

					<label for="event_list_map_align-center" class="ee-admin-radio-lbl">
						<?php $checked = $map_settings->event_list_map_align == 'center' ? 'checked="checked"' : ''; ?>
						<input id="event_list_map_align-center" type="radio" name="event_list_map_align" value="center"<?php echo $checked;?>/>
						<?php _e(' Align Center', 'event_espresso') ?>
					</label>

					<label for="event_list_map_align-right" class="ee-admin-radio-lbl">
						<?php $checked = $map_settings->event_list_map_align == 'right' ? 'checked="checked"' : ''; ?>
						<input id="event_list_map_align-right" type="radio" name="event_list_map_align" value="right"<?php echo $checked;?>/>
						<?php _e(' Align Right', 'event_espresso') ?>
					</label>

				</td>
			</tr>

		</tbody>
	</table>

</div>