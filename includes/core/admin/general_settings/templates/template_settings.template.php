<div class="padding">

	<!--*************************   Event Listings  ****************************-->

	<h4 class="ee-admin-settings-hdr">
		<?php _e('Event Listings', 'event_espresso'); ?>
	</h4>

	<table class="form-table">
		<tbody>

			<tr>
				<th>
					<label for="display_description_in_event_list">
						<?php _e('Display Descriptions', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EE_Form_Fields::select_input('display_description_in_event_list', $values, $template_settings['display_description_in_event_list'], 'id="display_description_in_event_list"'); ?>
				</td>
			</tr>

			<tr>
				<th>
					<label for="display_short_description_in_event_list">
						<?php _e('Use SHORT Descriptions', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EE_Form_Fields::select_input('display_short_description_in_event_list', $values, $template_settings['display_short_description_in_event_list'], 'id="display_short_description_in_event_list"'); ?>
					<p class="description">
						<?php _e('Be sure to use the more... tag in your event description', 'event_espresso'); ?>
					</p>
				</td>
			</tr>

			<tr>
				<th>
					<label for="display_address_in_event_list">
						<?php _e('Display Addresses', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EE_Form_Fields::select_input('display_address_in_event_list', $values, $template_settings['display_address_in_event_list'], 'id="display_address_in_event_list"'); ?>
				</td>
			</tr>

		</tbody>
	</table>

	<!--*************************   Registration Pages   ****************************-->

	<h4 class="ee-admin-settings-hdr">
		<?php _e('Registration Pages', 'event_espresso'); ?>
	</h4>

	<table class="form-table">
		<tbody>

			<tr>
				<th>
					<label for="display_address_in_regform">
						<?php _e('Display Addresses', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EE_Form_Fields::select_input('display_address_in_regform', $values, $template_settings['display_address_in_regform'], 'id="display_address_in_regform"'); ?>
					<p class="description">
						<?php _e('Do not use this if you are using the venue shortcodes in your event description.', 'event_espresso'); ?>
					</p>
				</td>
			</tr>

		</tbody>
	</table>

	<!--*************************   Themes & Styles   ****************************-->

	<h4 class="ee-admin-settings-hdr">
		<?php _e('Themes & Styles', 'event_espresso'); ?>
	</h4>

	<table class="form-table">
		<tbody>

			<tr>
				<th>
					<label>
						<?php _e('Use Built-in Style Sheets', 'event_espresso'); ?>
						<?php echo EE_Template::get_help_tab_link('enable_styles_info'); ?>
					</label>
				</th>
				<td>
					<?php echo EE_Form_Fields::select_input('enable_default_style', $values, $style_settings['enable_default_style'], 'id="use_built_in_style_sheets"'); ?>
					<p class="description">
						<?php _e('This enables the following style settings below.', 'event_espresso'); ?>
					</p>
				</td>
			</tr>

			<tr>
				<th>
					<?php _e('ThemeRoller Style ', 'event_espresso'); ?>
					<?php echo EE_Template::get_help_tab_link('themeroller_info'); ?>
					
				</th>
				<td>
					<?php //printr( $themeroller_themes, '$themeroller_themes < br /><span style = "font - size:10px;font - weight:normal;" > ' . __FILE__ . ' < br />line no: ' . __LINE__ . '</span > ', 'auto' ); ?>
					<?php echo EE_Form_Fields::select_input('themeroller_style', $themeroller_themes, $themeroller['themeroller_style'], 'id="themeroller_style"'); ?>
					<p class="description">
						<?php _e('The default style sheet is Smoothness.', 'event_espresso'); ?>
					</p>
				</td>
			</tr>

			<?php
			if (!empty($style_settings['css_name'])) {
				?>
				<tr>
					<th>
						<label>
							<?php _e('Current Custom Style Sheet', 'event_espresso'); ?>
						</label>
					</th>
					<td>
						<a href="<?php echo EVENT_ESPRESSO_UPLOAD_URL . 'css/' . $style_settings['css_name']; ?>" target="_blank">
							<?php echo $style_settings['css_name']; ?>
						</a>
						<input style="width:20px; margin-left:20px" name="remove_css" type="checkbox" value="true" />
						<p class="description">
							<?php _e('Remove style sheet?', 'event_espresso'); ?>
						</p>
					</td>
				</tr>
				<?php
			} ?>

			<tr>
				<th>
					<label>
						<?php _e('Add a custom style sheet?', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<input type="file" name="css" id="css" />
				</td>
			</tr>
			<?php echo apply_filters('FHEE_template_config_template_settings_form_table', ''); ?>

		</tbody>
	</table>
	
</div>