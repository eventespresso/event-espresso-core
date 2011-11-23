<?php
if(empty($org_options['map_settings']['ee_map_type_control'])) $org_options['map_settings']['ee_map_type_control'] = 'default';
if(empty($org_options['map_settings']['ee_map_align'])) $org_options['map_settings']['ee_map_align'] = 'none';
if(empty($org_options['map_settings']['ee_map_align_single'])) $org_options['map_settings']['ee_map_align_single'] = 'default';
if(empty($org_options['map_settings']['ee_map_type_control_single'])) $org_options['map_settings']['ee_map_type_control_single'] = 'none';
?>
 <h4>
		<?php _e('Google Maps Display Options', 'event_espresso') ?> <?php apply_filters( 'espresso_help', 'gmaps_info'); ?>
	</h4>

	<div id="gmap-reg-events-settings">
	  <h5 class="section-heading"><?php _e('Event Registration Options', 'event_espresso') ?></h5>
			<table class="form-table">
				<tbody>
					<tr>
					  <th>
							<label for="single-map-width">
			  				<?php _e('Set Map Width', 'event_espresso')  ?>
							</label>
						</th>
						<td>
							<input type="text" id="single-map-width"  name="ee_map_width_single" value="<?php echo empty($org_options['map_settings']['ee_map_width_single']) ? '500' : $org_options['map_settings']['ee_map_width_single'];?>" />
		  			</td>
					</tr>
					<tr>
						<th>
							<label for="single-map-height">
			  				<?php _e('Set Map Height', 'event_espresso')  ?>
							</label>
						</th>
						<td>
							<input type="text" id="single-map-height" size="" name="ee_map_height_single" value="<?php echo empty($org_options['map_settings']['ee_map_height_single']) ? '500' : $org_options['map_settings']['ee_map_height_single'];?>" />
		  			</td>
					</tr>
					<tr>
						<th>
							<label for="single-map-zoom">
			 				 <?php _e('Set Map Zoom level: Range 1 - 19', 'event_espresso')  ?>
							</label>
						</th>
						<td>
							<input id="single-map-zoom" type="text" size="" name="ee_map_zoom_single" value="<?php echo empty($org_options['map_settings']['ee_map_zoom_single']) ? '14' : $org_options['map_settings']['ee_map_zoom_single'];?>" />
		  			</td>
					</tr>
					<tr>
					  <th>
							<label for="show-overlay-controls-single">
			  				<?php _e('Set Map Navigation Overlay', 'event_espresso')  ?>
							</label>
						</th>
						<td>
							<?php echo select_input('ee_map_nav_display_single', $values, isset($org_options['map_settings']['ee_map_nav_display_single']) ? $org_options['map_settings']['ee_map_nav_display_single'] : '', 'id="show-overlay-controls-single" '); ?>
						</td>
					</tr>
					<tr>
					  <th>
							<label for="nav-size-small-single">
			  				<?php _e('Keep Map Navigation Small', 'event_espresso')  ?>
							</label>
						</th>
						<td>
							<?php echo select_input('ee_map_nav_size_single', $values, isset($org_options['map_settings']['ee_map_nav_size_single']) ? $org_options['map_settings']['ee_map_nav_size_single'] : '', 'id="nav-size-small-single"'); ?>
						</td>
					</tr>
				</tbody>
			</table>

			<p class="section-heading">
			<?php _e('Set Map Type Control', 'event_espresso')  ?>
		  </p>
			<table class="form-table">
				<tbody>
					<tr>
		  			<th>
							<label for="map-type-default_single"><?php _e(' Default', 'event_espresso') ?></label>
						</th>
						<td>
			  			<input id="map-type-default_single" type="radio" name="ee_map_type_control_single" <?php espresso_is_selected_reg('default')?> value="default"  />
						</td>
					</tr>
					<tr>
						<th>
							<label for="map-type-horizontal_single">
								<?php _e(' Horizontal', 'event_espresso')?>
							</label>
						</th>
						<td>
			  			<input id="map-type-horizontal_single" type="radio" name="ee_map_type_control_single" <?php espresso_is_selected_reg('horizontal')?> value="horizontal" />
						</td>
					</tr>
					<tr>
						<th>
							<label for="map-type-dropdown_single">
								<?php _e(' Dropdown', 'event_espresso')?>
							</label>
						</th>
						<td>
			  			<input id="map-type-dropdown_single" type="radio" name="ee_map_type_control_single" <?php espresso_is_selected_reg('dropdown')?> value="dropdown" />
						</td>
		  		</tr>
				<tbody>
			</table>

			<p class="section-heading">
			<?php _e('Set Map Alignment', 'event_espresso')  ?>
		  </p>

			<table class="form-table">
				<tbody>
					<tr>
		  			<th>
							<label for="map-align-none_single">
			  				<?php _e(' None', 'event_espresso') ?>
							</label>
						</th>
						<td>
							<input id="map-align-none_single" type="radio" name="ee_map_align_single" <?php espresso_is_selected_reg('none')?> value="none"  />
						</td>
					</tr>
					<tr>
						<th>
							<label for="map-align-left_single">
			  				<?php _e(' Align Left', 'event_espresso') ?>
							</label>
						</th>
						<td>
							<input id="map-align-left_single" type="radio" name="ee_map_align_single" <?php espresso_is_selected_reg('left')?> value="left"  />
						</td>
					</tr>
					<tr>
						<th>
							<label for="map-align-center_single">
								<?php _e(' Align Center', 'event_espresso')?>
							</label>
						</th>
						<td>
							<input id="map-align-center_single" type="radio" name="ee_map_align_single" <?php espresso_is_selected_reg('center')?> value="center" />
						</td>
					</tr>
					<tr>
						<th>
							<label for="map-align-right_single">
	  						<?php _e(' Align Right', 'event_espresso')?>
							</label>
						</th>
						<td>
							<input id="map-align-right_single" type="radio" name="ee_map_align_single" <?php espresso_is_selected_reg('right')?> value="right" />
						</td>
					</tr>
		 		</tbody>
			</table>

		</div>

		<div id="gmap-list-events-settings">

		<h5 class="section-heading">Events List Options</h5>

			<table class="form-table">
				<tbody>
					<tr>
		  			<th>
							<label for="map-width">
			  				<?php _e('Set Map Width', 'event_espresso')  ?>
							</label>
						</th>
						<td>
							<input id="map-width" type="text"  name="ee_map_width" value="<?php echo empty($org_options['map_settings']['ee_map_width']) ? '200' : $org_options['map_settings']['ee_map_width'];?>" />
		  			</td>
					</tr>
					<tr>
		  			<th>
							<label for="map-height">
			  				<?php _e('Set Map Height', 'event_espresso')  ?>
							</label>
						</th>
		  			<td>
							<input id="map-height" type="text" size="" name="ee_map_height" value="<?php echo empty($org_options['map_settings']['ee_map_height']) ? '200' : $org_options['map_settings']['ee_map_height'];?>" />
						</td>
					</tr>
					<tr>
						<th>
							<label for="map-zoom">
			  				<?php _e('Set Map Zoom level: Range: 1 - 19', 'event_espresso')  ?>
							</label>
						</th>
						<td>
							<input id="map-zoom" type="text" size="" name="ee_map_zoom" value="<?php echo empty($org_options['map_settings']['ee_map_zoom']) ? '11' : $org_options['map_settings']['ee_map_zoom'];?>" />
						</td>
					</tr>
		  		<tr>
						<th>
							<label for="show-overlay-controls">
			  				<?php _e('Set Map Navigation Overlay ', 'event_espresso')  ?>
							</label>
						</th>
						<td>
							<?php echo select_input('ee_map_nav_display', $values, isset($org_options['map_settings']['ee_map_nav_display']) ? $org_options['map_settings']['ee_map_nav_display'] : '', 'id="show-overlay-controls"'); ?>
						</td>
					</tr>
					<tr>
						<th>
							<label for="nav-size-small">
			  				<?php _e('Keep Map Navigation Small', 'event_espresso')  ?>
							</label>
						</th>
						<td>
							<?php echo select_input('ee_map_nav_size', $values, isset($org_options['map_settings']['ee_map_nav_size']) ? $org_options['map_settings']['ee_map_nav_size'] : '', 'id="nav-size-small"'); ?>
						</td>
					</tr>
				</tbody>
			</table>

		  <p class="section-heading">
			<?php _e('Set Map Type Control', 'event_espresso')  ?>
		  </p>

			<table class="form-table">
				<tbody>
					<tr>
		  			<th>
							<label for="map-type-default">
			  				<?php _e(' Default', 'event_espresso') ?>
							</label>
						</th>
						<td>
							<input id="map-type-default" type="radio" name="ee_map_type_control" <?php espresso_is_selected_list('default')?> value="default"  />
						</td>
					</tr>
					<tr>
						<th>
							<label for="map-type-horizontal">
			  				<?php _e(' Horizontal', 'event_espresso')?>
							</label>
						</th>
						<td>
							<input id="map-type-horizontal" type="radio" name="ee_map_type_control" <?php espresso_is_selected_list('horizontal')?> value="horizontal" />
						</td>
					</tr>
					<tr>
						<th>
							<label for="map-type-dropdown">
			  				<?php _e(' Dropdown', 'event_espresso')?>
							</label>
						</th>
						<td>
							<input id="map-type-dropdown" type="radio" name="ee_map_type_control" <?php espresso_is_selected_list('dropdown')?> value="dropdown" />
						</td>
					</tr>
				</tbody>
			</table>

		  <p class="section-heading">
			<?php _e('Set Map Alignment', 'event_espresso')  ?>
		  </p>

			<table class="form-table">
				<tbody>
					<tr>
						<th>
							<label for="map-align-none">
			   				<?php _e(' None', 'event_espresso') ?>
							</label>
						</th>
						<td>
							<input id="map-align-none" type="radio" name="ee_map_align" <?php espresso_is_selected_list('none')?> value="none"  />
						</td>
					</tr>
					<tr>
						<th>
							<label for="map-align-left">
			  				<?php _e(' Align Left', 'event_espresso') ?>
							</label>
						</th>
						<td>
							<input id="map-align-left" type="radio" name="ee_map_align" <?php espresso_is_selected_list('left')?> value="left"  />
						</td>
					</tr>
					<tr>
						<th>
							<label for="map-align-center">
			 					 <?php _e(' Align Center', 'event_espresso')?>
			  			</label>
						</th>
						<td>
							<input id="map-align-center" type="radio" name="ee_map_align" <?php espresso_is_selected_list('center')?> value="center" />
						</td>
					</tr>
					<tr>
						<th>
							<label for="map-align-right">
			  				<?php _e(' Align Right', 'event_espresso')?>
							</label>
						</th>
						<td>
							<input id="map-align-right" type="radio" name="ee_map_align" <?php espresso_is_selected_list('right')?> value="right" />
						</td>
		  		</tr>
				</tbody>
			</table>

		</div>

		<p class="clear">
	  <label for="ee-display-map-no-shortcodes">
				<?php _e('Use map in template files ( No Shortcodes)<br /> Set this option to No if you are using venue shortcodes in Descriptions', 'event_espresso')  ?>
	  </label>
	  <?php echo select_input('ee_display_map_no_shortcodes', $values, isset($org_options['map_settings']['ee_display_map_no_shortcodes']) ? $org_options['map_settings']['ee_display_map_no_shortcodes'] : '', 'id="ee-display-map-no-shortcodes"'); ?>
		</p>

