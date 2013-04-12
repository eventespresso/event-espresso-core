<div class="padding">

	<!--*************************   Event Listings  ****************************-->

	<h4 class="ee-admin-settings-hdr">
		<?php _e('Event Listings', 'event_espresso'); ?>
	</h4>

	<table class="form-table">
		<tbody>

			<tr>
				<td colspan="2">
					<strong>
						<?php _e('Event Listings', 'event_espresso'); ?>
					</strong>
				</td>
			</tr>

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

			<tr>
				<th>
					<label for="use_custom_post_types">
						<?php _e('Use the custom post types feature', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EE_Form_Fields::select_input('use_custom_post_types', $values, $template_settings['use_custom_post_types'], 'id="use_custom_post_types"'); ?>
					<p class="description">
						<?php _e('This merely "copies" your event data over to a WordPress Custom Post Type which can be used by developers for generating custom templates.', 'event_espresso'); ?>
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
			<?php echo apply_filters('filter_hook_espresso_template_config_template_settings_form_table', ''); ?>

		</tbody>
	</table>
	<br/>

	<p class="padding">
		<em class="important">
			<strong>
				<?php _e('ATTENTION:', 'event_espresso'); ?>
			</strong><br />
		</em>
		<?php
		echo sprintf(
			__('If you want to modify and customize the styles of your template pages you must move a copy of the %s to the %s folder.%sIf %s does not exist, you may need to create it manually via ftp. Keeping your modifications in this folder ensures that your styles are not overwritten when upgrading Event Espresso.', 'event_espresso'),
			'<b>event_espresso_style.css</b>',
			'<b>/wp-content/uploads/espresso/templates/</b>',
			'<br />',
			'<b>/wp-content/uploads/espresso/templates/</b>'
		);
		?>
	</p>

	<!--*************************   Custom Templates ****************************-->

	<?php
	if ( $custom_templates_exist ) {
		?>

		<h4 class="ee-admin-settings-hdr">
			<?php _e('Custom Templates', 'event_espresso'); ?>
		</h4>

		<table class="form-table">
			<tbody>

				<tr>
					<th>
						<label for="use_custom_templates">
							<?php _e('Enable Custom Templates', 'event_espresso'); ?>
							<?php echo EE_Template::get_help_tab_link('custom_templates_info'); ?>
						</label>
					</th>
					<td>
						<?php echo EE_Form_Fields::select_input('use_custom_templates', $values, $template_settings['use_custom_templates']); ?>
						<p class="description">
							<?php _e('This will override the built-in Event Espresso templates.', 'event_espresso'); ?>
						</p>
					</td>
				</tr>

			</tbody>
		</table>

		<?php
		if ( ! $template_settings['use_custom_templates']) {
			?>

			<p class="ee-attention">
				<?php _e('It appears that you have moved your files to the "wp-content/uploads/espresso/templates/ directory". However, these files may be outdated and are not being used at this time. If you wish to use these files, please make sure you have updated them files to match the files located in the "' . EVENT_ESPRESSO_PLUGINFULLPATH . 'templates/' . ' directory." ', 'event_espresso');?>
			</p>

			<?php
		}else {
			?>

			<div class="ee-attention">

				<p>
					<strong>
						<?php _e('Instructions:', 'event_espresso'); ?>
					</strong><br />
					<?php _e("To modify your event listings and registration pages. You need to edit the appropriate files in the following location: ", 'event_espresso'); ?>
					<strong>
						<?php _e("Path: ", 'event_espresso'); ?>wp-content/uploads/espresso/templates/
					</strong>
				</p>

				<h6>
					<?php _e('Current Template Files:', 'event_espresso'); ?>
				</h6>

				<ul>

					<?php
					foreach ($files as $file) {
						switch ($file) {
							case 'attendee_list.php':
							$info = __('displays a list of attendees', 'event_espresso');
							break;
							case 'event_list.php':
							$info = __('logic for displaying the list of events', 'event_espresso');
							break;
							case 'event_list_display.php':
							$info = __('displays a list of events', 'event_espresso');
							break;
							case 'event_post.php':
							$info = __('create-a-post template', 'event_espresso');
							break;
							case 'payment_page.php':
							$info = __('displays your payment page text', 'event_espresso');
							break;
							case 'registration_page.php':
							$info = __('logic for displaying the registration form', 'event_espresso');
							break;
							case 'registration_page_display.php':
							$info = __('displays your registration form', 'event_espresso');
							break;
							case 'confirmation_display.php':
							$info = __('displays a confimration page for free events', 'event_espresso');
							break;
							case 'return_payment.php':
							$info = __('page that is displayed when returning to pay', 'event_espresso');
							break;
							case 'widget.php':
							$info = __('creates a widget for use in your theme', 'event_espresso');
							break;
							default:
							$info = '';
							break;
						}

						if ( file_exists( EVENT_ESPRESSO_TEMPLATE_DIR . $file )) {
							$colour = '#090';
							$text   = __(' Moved', 'event_espresso');
						}else {
							$colour = '#F00';
							$text   = __(' Not Moved', 'event_espresso');
						}

						echo '<li><b>' . $file . '</b> &nbsp; - &nbsp; <span style="color:' . $colour . '">' . $text . '</span> &nbsp; - &nbsp; ' . $info . '</li>';

					}
					?>
				</ul>

				<p class="red_alert">
					<?php _e('Remember, if updates are made or features are added to these templates in the future. You will need to make the updates to your customized templates.', 'event_espresso'); ?>
				</p>

			</div>

			<?php
		}

	}else
	if ( ! is_writable( EVENT_ESPRESSO_TEMPLATE_DIR )) {
		?>

		<p>
			<?php _e('In order to use this this feature, you will need to move the files located in the', 'event_espresso'); ?>
			<span class="display-path">
				<strong>
					<?php echo EVENT_ESPRESSO_PLUGINFULLPATH ?>templates/
				</strong>
			</span>
			<?php _e('directory into the', 'event_espresso'); ?>
			<span class="display-path">
				<strong>
					<?php echo EVENT_ESPRESSO_TEMPLATE_DIR ?>
				</strong>
			</span>
			<?php _e('directory', 'event_espresso'); ?>
			.
		</p>
		<p class="fugue f-error">
			<?php _e("The permissions on your templates directory are incorrect.", 'event_espresso'); ?>
		</p>
		<p class="fugue f-error">
			<?php _e("To move your files automatically, please set the permissions to 775 on the following directory.", 'event_espresso'); ?>
			<br />
			<br />
			<span class='display-path'>
				<strong>
					<?php _e("Path:", 'event_espresso'); ?>
				</strong> wp-content/uploads/espresso/templates/
			</span>
		</p>

		<?php
	}else {
		?>

		<p class="ee-attention">
			<?php echo sprintf(__('If you plan on modifying the look of your event listings, registration page, or attendee list. You can move the templates located in the templates directory to your "wp-content/uploads/espresso/templates/" directory (%smore information here%s). Please keep in mind, if updates are made or features are added to these templates in the future. You will need to make the updates to your customized templates.', 'event_espresso'), '<a href="http://eventespresso.com/forums/?p=2906" target="_blank">', '</a>'); ?>
		</p>

		<?php
	} ?>

</div>