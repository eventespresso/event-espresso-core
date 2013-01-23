		<div class="padding">
		
			<table class="form-table">
				<tbody>
				
					<tr>
						<td colspan="2"><strong><?php _e('Event Listings', 'event_espresso'); ?></strong></td>
					</tr>
					
					<tr>
						<th>
							<label for="display_description_in_event_list"><?php _e('Display Descriptions', 'event_espresso'); ?></label>
						</th>
						<td>
							<?php echo EE_Form_Fields::select_input('display_description_in_event_list', $values, $template_settings['display_description_in_event_list'], 'id="display_description_in_event_list"'); ?>							
						</td>
					</tr>
					
					<tr>
						<th>
							<label for="display_short_description_in_event_list"><?php _e('Use SHORT Descriptions', 'event_espresso'); ?></label>
						</th>
						<td>
							<?php echo EE_Form_Fields::select_input('display_short_description_in_event_list', $values, $template_settings['display_short_description_in_event_list'], 'id="display_short_description_in_event_list"'); ?>
							<span class="description">
								<?php _e('Be sure to use the more... tag in your event description', 'event_espresso'); ?>
							</span>
						</td>
					</tr>
					
					<tr>
						<th>
							<label for="display_address_in_event_list"><?php _e('Display Addresses', 'event_espresso'); ?></label>
						</th>
						<td>
							<?php echo EE_Form_Fields::select_input('display_address_in_event_list', $values, $template_settings['display_address_in_event_list'], 'id="display_address_in_event_list"'); ?>
						</td>
					</tr>

					<tr>
						<td colspan="2"><strong>
								<?php _e('Registration Pages', 'event_espresso'); ?>
							</strong></td>
					</tr>
					
					<tr>
						<th> <label for="display_address_in_regform">
								<?php _e('Display Addresses', 'event_espresso'); ?>
							</label>
						</th>
						<td><?php echo EE_Form_Fields::select_input('display_address_in_regform', $values, $template_settings['display_address_in_regform'], 'id="display_address_in_regform"'); ?><br />
							<span class="description">
								<?php _e('Do not use this if you are using the venue<br />
	shortcodes in your event description.', 'event_espresso'); ?>
							</span></td>
					</tr>
					
					<tr>
						<td colspan="2"><strong>
								<?php _e('Stylesheets', 'event_espresso'); ?>
							</strong></td>
					</tr>
					
					<tr>
						<th> <label>
								<?php _e('Use Built-in Style Sheets', 'event_espresso'); ?>
								<?php echo apply_filters('filter_hook_espresso_help', 'enable_styles_info'); ?>
							</label>
						</th>
						<td><?php echo EE_Form_Fields::select_input('enable_default_style', $values, $style_settings['enable_default_style'], 'id="use_built_in_style_sheets"'); ?>
							<span class="description">
								<?php _e('This option enables the style settings below.', 'event_espresso'); ?>
							</span></td>
					</tr>

					<tr>
						<th>
							<?php _e('ThemeRoller Style ', 'event_espresso'); ?><?php echo apply_filters('filter_hook_espresso_help', 'themeroller_info'); ?>
						</th>
						<td>
							<select id="style-themeroller" class="chzn-select wide" name="themeroller_style">
								<option <?php EE_Form_Fields::style_is_selected($fname_themeroller) ?> value=""> - <?php _e('Default', 'event_espresso'); ?>
								</option>
								<?php foreach ($files_themeroller as $fname_themeroller) { ?>
									<option <?php EE_Form_Fields::style_is_selected($fname_themeroller) ?> value="<?php echo $fname_themeroller ?>"><?php echo $fname_themeroller; ?></option>
								<?php } ?>
							</select>
							<span class="description">
								<?php _e('Default style sheet is Smoothness.', 'event_espresso'); ?>
							</span>
						</td>
					</tr>
					
				<?php if (!empty($style_settings['css_name'])) { ?>
					<tr>
						<th>
							<label><?php _e('Current Custom Style Sheet', 'event_espresso'); ?></label>
						</th>
						<td>
							<a href="<?php echo EVENT_ESPRESSO_UPLOAD_URL . 'css/' . $style_settings['css_name']; ?>" target="_blank">
							<?php echo $style_settings['css_name']; ?>								
							</a>
							<input style="width:20px; margin-left:20px" name="remove_css" type="checkbox" value="true" />
							<?php _e('Remove style sheet?', 'event_espresso'); ?>								
						</td>
					</tr>
				<?php } ?>
					
					<tr>
						<th>
							<label><?php _e('Add a custom style sheet?', 'event_espresso'); ?></label>
						</th>
						<td>
							<input type="file" name="css" id="css" />
						</td>
					</tr>
					<?php echo apply_filters('filter_hook_espresso_template_config_template_settings_form_table', ''); ?>
					
				</tbody>
			</table>
			
		</div>