					<fieldset id="event-gmap-opts" class="template-settings b">
					<legend><?php _e('Google Maps Display Options', 'event_espresso') ?>
					  <a class="thickbox"  href="#TB_inline?height=550&width=400&inlineId=gmaps_info" target="_blank"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/question-frame.png" width="16" height="16" /></a>
					</legend>
					
					 <div id="gmap-reg-events">
					  <p class="section-heading">Event Registration Options</p>
					   
								<li><p><label for="single-map-width"><?php _e('Set Map Width', 'event_espresso')  ?></label><input type="text" id="single-map-width"  name="ee_map_width_single" value="<?php echo $org_options['ee_map_width_single']==''? '500' : $org_options['ee_map_width_single'];?>" /></p></li>
					
					   <li><p><label for="single-map-height"><?php _e('Set Map Height', 'event_espresso')  ?></label><input type="text" id="single-map-height" size="" name="ee_map_height_single" value="<?php echo $org_options['ee_map_height_single']==''? '500' : $org_options['ee_map_height_single'];?>" /></p></li>
					
					   <li><p><label for="single-map-zoom"><?php _e('Set Map Zoom level: Range 1 - 19', 'event_espresso')  ?></label><input id="single-map-zoom" type="text" size="" name="ee_map_zoom_single" value="<?php echo $org_options['ee_map_zoom_single']== ''? '14' : $org_options['ee_map_zoom_single'];?>" /></p></li>
								
								<li><p><label for="show-overly-controls-single"><?php _e('Set Map Navigation Overlay', 'event_espresso')  ?></label><?php echo select_input('ee_map_nav_display_single', $values, isset($org_options['ee_map_nav_display_single']) ? $org_options['ee_map_nav_display_single'] : '', 'id="show-overlay-controls-single"'); ?></p></li>
								
								<li><p><label for="nav-size-small-single"><?php _e('Force Map Navigation Small', 'event_espresso')  ?></label><?php echo select_input('ee_map_nav_size_single', $values, isset($org_options['ee_map_nav_size_single']) ? $org_options['ee_map_nav_size_single'] : '', 'id="nav-size-small-single"'); ?></p></li>
								
								<li>
								<p class="section-heading"><?php _e('Set Map Type Control', 'event_espresso')  ?></p>
								 
									<p class="radio-sets">
								  <label for="map-type-default-single"><input id="map-type-default-single" type="radio" name="ee_map_type_control_single" <?php //espresso_is_selected('default')?> value="default"  /><?php _e(' Default', 'event_espresso') ?></label>
									 <label for="map-type-horizontal-single"><input id="map-type-horizontal-single" type="radio" name="ee_map_type_control_single" <?php// espresso_is_selected('horizontal')?> value="horizontal" /><?php _e(' Horizontal', 'event_espresso')?></label>
									 <label for="map-type-dropdown-single"><input id="map-type-dropdown-single" type="radio" name="ee_map_type_control_single" <?php// espresso_is_selected('dropdown')?> value="dropdown" /><?php _e(' Dropdown', 'event_espresso')?></label>
					    </p>
									
									<p class="section-heading"><?php _e('Set Map Alignment', 'event_espresso')  ?></p>
									
									<p class="radio-sets">
								  <label for="map-align-left_single"><input id="map-align-left_single" type="radio" name="ee_map_align_single" <?php //espresso_is_selected('left')?> value="left"  /><?php _e(' Align Left', 'event_espresso') ?></label>
									 <label for="map-align-center_single"><input id="map-align-center_single" type="radio" name="ee_map_align_single" <?php //espresso_is_selected('center')?> value="center" /><?php _e(' Align Center', 'event_espresso')?></label>
									 <label for="map-align-right_single"><input id="map-align-right_single" type="radio" name="ee_map_align_single" <?php //espresso_is_selected('right')?> value="right" /><?php _e(' Align Right', 'event_espresso')?></label>
					    </p>									
									
						
						</div>
						
					 <div id="gmap-list-events">
					  <p class="section-heading">Events List Options</p>
					   
								<li><p><label for="map-width"><?php _e('Set Map Width', 'event_espresso')  ?></label><input id="map-width" type="text"  name="ee_map_width" value="<?php echo $org_options['ee_map_width']== ''? '200' : $org_options['ee_map_width'];?>" /></p></li>
					
					   <li><p><label for="map-height"><?php _e('Set Map Height', 'event_espresso')  ?></label><input id="map-height" type="text" size="" name="ee_map_height" value="<?php echo $org_options['ee_map_height']== ''? '200' : $org_options['ee_map_height'];?>" /></p></li>
					
					   <li><p><label for="map-zoom"><?php _e('Set Map Zoom level: Range: 1 - 19', 'event_espresso')  ?></label><input id="map-zoom" type="text" size="" name="ee_map_zoom" value="<?php echo $org_options['ee_map_zoom']== ''? '11' : $org_options['ee_map_zoom'];?>" />

								
								<li><p><label for="show-overlay-controls"><?php _e('Set Map Navigation Overlay ', 'event_espresso')  ?></label><?php echo select_input('ee_map_nav_display', $values, isset($org_options['ee_map_nav_display']) ? $org_options['ee_map_nav_display'] : '', 'id="show-overlay-controls"'); ?></li>
								
								<li><p><label for="nav-size-small"><?php _e('Force Map Navigation Small', 'event_espresso')  ?></label><?php echo select_input('ee_map_nav_size', $values, isset($org_options['ee_map_nav_size']) ? $org_options['ee_map_nav_size'] : '', 'id="nav-size-small"'); ?></p></li>
								
								<li>
								<p class="section-heading"><?php _e('Set Map Type Control', 'event_espresso')  ?></p>
								 
									<p class="radio-sets">
								  <label for="map-type-default"><input id="map-type-default" type="radio" name="ee_map_type_control" <?php //espresso_is_selected('default')?> value="default"  /><?php _e(' Default', 'event_espresso') ?></label>
									 <label for="map-type-horizontal"><input id="map-type-horizontal" type="radio" name="ee_map_type_control" <?php //espresso_is_selected('horizontal')?> value="horizontal" /><?php _e(' Horizontal', 'event_espresso')?></label>
									 <label for="map-type-dropdown"><input id="map-type-dropdown" type="radio" name="ee_map_type_control" <?php //espresso_is_selected('dropdown')?> value="dropdown" /><?php _e(' Dropdown', 'event_espresso')?></label>
					    </p>
								<p class="section-heading"><?php _e('Set Map Alignment', 'event_espresso')  ?></p>
								 
									<p class="radio-sets">
								  <label for="map-align-left"><input id="map-align-left" type="radio" name="ee_map_align" <?php //espresso_is_selected('left')?> value="left"  /><?php _e(' Align Left', 'event_espresso') ?></label>
									 <label for="map-align-center"><input id="map-align-center" type="radio" name="ee_map_align" <?php //espresso_is_selected('center')?> value="center" /><?php _e(' Align Center', 'event_espresso')?></label>
									 <label for="map-align-right"><input id="map-align-right" type="radio" name="ee_map_align" <?php //espresso_is_selected('right')?> value="right" /><?php _e(' Align Right', 'event_espresso')?></label>
					    </p>									
						  </li>
						</div>						
					</fieldset>