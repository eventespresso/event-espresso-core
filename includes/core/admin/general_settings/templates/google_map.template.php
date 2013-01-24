<div class="padding">

	<h4 class="ee-admin-settings-hdr"><?php _e('Reg Page Map Settings', 'event_espresso'); ?><?php do_action('action_hook_espresso_help', 'gmaps_info'); ?></h4>
	
	<table class="form-table">
		<tbody>
		
			<tr>
				<th>
					<label for="single-map-width">
						<?php _e('Set Map Width', 'event_espresso') ?>
					</label>
				</th>
				<td>
					<input type="text" id="single-map-width"  name="ee_map_width_single" value="<?php echo $map_settings['ee_map_width_single']; ?>" />
				</td>
			</tr>
			
			<tr>
				<th>
					<label for="single-map-height">
						<?php _e('Set Map Height', 'event_espresso') ?>
					</label>
				</th>
				<td>
					<input type="text" id="single-map-height" size="" name="ee_map_height_single" value="<?php echo $map_settings['ee_map_height_single']; ?>" />
				</td>
			</tr>
			<tr>
				<th>
					<label for="single-map-zoom">
						<?php _e('Set Map Zoom level: Range 1 - 19', 'event_espresso') ?>
					</label>
				</th>
				<td>
					<input id="single-map-zoom" type="text" size="" name="ee_map_zoom_single" value="<?php echo $map_settings['ee_map_zoom_single']; ?>" />
				</td>
			</tr>
			
			<tr>
				<th>
					<label for="show-overlay-controls-single">
						<?php _e('Set Map Navigation Overlay', 'event_espresso') ?>
					</label>
				</th>
				<td>
					<?php echo EE_Form_Fields::select_input('ee_map_nav_display_single', $values, $map_settings['ee_map_nav_display_single'], 'id="show-overlay-controls-single" '); ?>
				</td>
			</tr>
			
			<tr>
				<th>
					<label for="nav-size-small-single">
						<?php _e('Keep Map Navigation Small', 'event_espresso') ?>
					</label>
				</th>
				<td>
					<?php echo EE_Form_Fields::select_input('ee_map_nav_size_single', $values, $map_settings['ee_map_nav_size_single'], 'id="nav-size-small-single"'); ?>
				</td>
			</tr>
			
			<tr>
				<th>
					<?php _e('Set Map Type Control', 'event_espresso') ?>
				</th>
				<td>
					<label for="map-type-control-default-single" class="ee-admin-radio-lbl">
						<?php $checked = $map_settings['ee_map_type_control_single'] == 'default' ? 'checked="checked"' : ''; ?>
						<input id="map-type-control-default-single" type="radio" name="ee_map_type_control_single" value="default"<?php echo $checked;?>/>
						<?php _e(' Default', 'event_espresso') ?>
					</label>
					
					<label for="map-type-control-horizontal-single" class="ee-admin-radio-lbl">
						<?php $checked = $map_settings['ee_map_type_control_single'] == 'horizontal' ? 'checked="checked"' : ''; ?>
						<input id="map-type-control-horizontal-single" type="radio" name="ee_map_type_control_single" value="horizontal"<?php echo $checked;?>/>
						<?php _e(' Horizontal', 'event_espresso') ?>							
					</label>
					
					<label for="map-type-control-dropdown-single" class="ee-admin-radio-lbl">
						<?php $checked = $map_settings['ee_map_type_control_single'] == 'dropdown' ? 'checked="checked"' : ''; ?>
						<input id="map-type-control-dropdown-single" type="radio" name="ee_map_type_control_single" value="dropdown"<?php echo $checked;?>/>
						<?php _e(' Dropdown', 'event_espresso') ?>
					</label>
				</td>
			</tr>
			
			<tr>
				<th>
					<?php _e('Set Map Alignment', 'event_espresso') ?>
				</th>
				<td>
					<label for="map-align-none_single" class="ee-admin-radio-lbl">
						<?php $checked = $map_settings['ee_map_align_single'] == 'none' ? 'checked="checked"' : ''; ?>
						<input id="map-align-none_single" type="radio" name="ee_map_align_single" value="none"<?php echo $checked;?>/>
						<?php _e(' None', 'event_espresso') ?>
					</label>
					
					<label for="map-align-left_single" class="ee-admin-radio-lbl">
						<?php $checked = $map_settings['ee_map_align_single'] == 'left' ? 'checked="checked"' : ''; ?>
						<input id="map-align-left_single" type="radio" name="ee_map_align_single" value="left"<?php echo $checked;?>/>
						<?php _e(' Align Left', 'event_espresso') ?>							
					</label>
					
					<label for="map-align-center_single" class="ee-admin-radio-lbl">
						<?php $checked = $map_settings['ee_map_align_single'] == 'center' ? 'checked="checked"' : ''; ?>
						<input id="map-align-center_single" type="radio" name="ee_map_align_single" value="center"<?php echo $checked;?>/>
						<?php _e(' Align Center', 'event_espresso') ?>
					</label>
					
					<label for="map-align-right_single" class="ee-admin-radio-lbl">
						<?php $checked = $map_settings['ee_map_align_single'] == 'right' ? 'checked="checked"' : ''; ?>
						<input id="map-align-right_single" type="radio" name="ee_map_align_single" value="right"<?php echo $checked;?>/>
						<?php _e(' Align Right', 'event_espresso') ?>
					</label>
				</td>
			</tr>
			
		</tbody>
	</table>


	<h4 class="ee-admin-settings-hdr"><?php _e('Events List Options', 'event_espresso'); ?></h4>
	
	<table class="form-table">
		<tbody>
			<tr>
				<th>
					<label for="map-width">
						<?php _e('Set Map Width', 'event_espresso') ?>
					</label>
				</th>
				<td>
					<input id="map-width" type="text"  name="ee_map_width" value="<?php echo $map_settings['ee_map_width']; ?>" />
				</td>
			</tr>
			<tr>
				<th>
					<label for="map-height">
						<?php _e('Set Map Height', 'event_espresso') ?>
					</label>
				</th>
				<td>
					<input id="map-height" type="text" size="" name="ee_map_height" value="<?php echo $map_settings['ee_map_height']; ?>" />
				</td>
			</tr>
			<tr>
				<th>
					<label for="map-zoom">
						<?php _e('Set Map Zoom level: Range: 1 - 19', 'event_espresso') ?>
					</label>
				</th>
				<td>
					<input id="map-zoom" type="text" size="" name="ee_map_zoom" value="<?php echo $map_settings['ee_map_zoom']; ?>" />
				</td>
			</tr>
			<tr>
				<th>
					<label for="show-overlay-controls">
						<?php _e('Set Map Navigation Overlay ', 'event_espresso') ?>
					</label>
				</th>
				<td>
					<?php echo EE_Form_Fields::select_input('ee_map_nav_display', $values, isset($map_settings['ee_map_nav_display']) ? $map_settings['ee_map_nav_display'] : '', 'id="show-overlay-controls"'); ?>
				</td>
			</tr>
			
			<tr>
				<th>
					<label for="nav-size-small">
						<?php _e('Keep Map Navigation Small', 'event_espresso') ?>
					</label>
				</th>
				<td>
					<?php echo EE_Form_Fields::select_input('ee_map_nav_size', $values, isset($map_settings['ee_map_nav_size']) ? $map_settings['ee_map_nav_size'] : '', 'id="nav-size-small"'); ?>
				</td>
			</tr>
			
			<tr>
				<th>
					<?php _e('Set Map Type Control', 'event_espresso') ?>
				</th>
				<td>
					<label for="map-type-default" class="ee-admin-radio-lbl">
						<?php $checked = $map_settings['ee_map_type_control'] == 'default' ? 'checked="checked"' : ''; ?>
						<input id="map-type-default" type="radio" name="ee_map_type_control" value="default"<?php echo $checked;?>/>
						<?php _e(' Default', 'event_espresso') ?>						
					</label>
					
					<label for="map-type-horizontal" class="ee-admin-radio-lbl">
						<?php $checked = $map_settings['ee_map_type_control'] == 'horizontal' ? 'checked="checked"' : ''; ?>
						<input id="map-type-horizontal" type="radio" name="ee_map_type_control" value="horizontal"<?php echo $checked;?>/>
						<?php _e(' Horizontal', 'event_espresso') ?>
					</label>
					
					<label for="map-type-dropdown" class="ee-admin-radio-lbl">
						<?php $checked = $map_settings['ee_map_type_control'] == 'dropdown' ? 'checked="checked"' : ''; ?>
						<input id="map-type-dropdown" type="radio" name="ee_map_type_control" value="dropdown"<?php echo $checked;?>/>
						<?php _e(' Dropdown', 'event_espresso') ?>
					</label>
					
				</td>
			</tr>
			
			<tr>
				<th>
					<?php _e('Set Map Alignment', 'event_espresso') ?>
				</th>
				<td>
					<label for="map-align-none" class="ee-admin-radio-lbl">
						<?php $checked = $map_settings['ee_map_align'] == 'none' ? 'checked="checked"' : ''; ?>
						<input id="map-align-none" type="radio" name="ee_map_align" value="none"<?php echo $checked;?>/>
						<?php _e(' None', 'event_espresso') ?>
					</label>
					
					<label for="map-align-left" class="ee-admin-radio-lbl">
						<?php $checked = $map_settings['ee_map_align'] == 'left' ? 'checked="checked"' : ''; ?>
						<input id="map-align-left" type="radio" name="ee_map_align" value="left"<?php echo $checked;?>/>
						<?php _e(' Align Left', 'event_espresso') ?>
					</label>
					
					<label for="map-align-center" class="ee-admin-radio-lbl">
						<?php $checked = $map_settings['ee_map_align'] == 'center' ? 'checked="checked"' : ''; ?>
						<input id="map-align-center" type="radio" name="ee_map_align" value="center"<?php echo $checked;?>/>
						<?php _e(' Align Center', 'event_espresso') ?>						
					</label>
					
					<label for="map-align-right" class="ee-admin-radio-lbl">
						<?php $checked = $map_settings['ee_map_align'] == 'right' ? 'checked="checked"' : ''; ?>
						<input id="map-align-right" type="radio" name="ee_map_align" value="right"<?php echo $checked;?>/>
						<?php _e(' Align Right', 'event_espresso') ?>						
					</label>
					
				</td>
			</tr>
			
			<tr>
				<th>
					<label for="ee-display-map-no-shortcodes">
						<?php _e('Use map in template files ( No Shortcodes )', 'event_espresso') ?>
					</label>
				</th>
				<td>
					<?php echo EE_Form_Fields::select_input('ee_display_map_no_shortcodes', $values, $map_settings['ee_display_map_no_shortcodes'], 'id="ee-display-map-no-shortcodes"'); ?>
				</td>
			</tr>
			
		</tbody>
	</table>

</div>
<?php include_once( GEN_SET_TEMPLATE_PATH . 'map_confg_help.php' ); ?>	