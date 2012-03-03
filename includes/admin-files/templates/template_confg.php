<?php

function event_espresso_manage_templates() {
	global $wpdb, $org_options, $notices, $espresso_wp_user;
	add_meta_box(
					'template_settings', __('Template Settings', 'event_espresso'), 'espresso_template_settings', 'template_confg');
	add_meta_box(
					'customization_instructions', __('Customization Instructions', 'event_espresso'), 'espresso_template_customization_instructions', 'template_confg');
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	//print_r($org_options);
	if (isset($_POST['update_org']) && check_admin_referer('espresso_form_check', 'ee_template_settings_update')) {

		$org_options['template_settings']['display_description_in_event_list'] = $_POST['display_description_in_event_list'];
		$org_options['template_settings']['display_short_description_in_event_list'] = $_POST['display_short_description_in_event_list'];
		$org_options['template_settings']['display_address_in_event_list'] = $_POST['display_address_in_event_list'];
		$org_options['template_settings']['display_address_in_regform'] = $_POST['display_address_in_regform'];
		$org_options['style_settings']['enable_default_style'] = $_POST['enable_default_style'];
		$org_options['style_settings']['use_grid_layout'] = $_POST['use_grid_layout'];
		$org_options['themeroller']['themeroller_style'] = empty($_POST['themeroller_style']) ? '' : $_POST['themeroller_style'];

		if (isset($_POST['remove_css']) && $_POST['remove_css'] == 'true') {
			$org_options['style_settings']['css_name'] = '';
		}

		if (isset($_FILES['css']) && is_uploaded_file($_FILES['css']['tmp_name'])) {
			if (copy($_FILES['css']['tmp_name'], EVENT_ESPRESSO_UPLOAD_DIR . 'css/' . $_FILES['css']['name'])) {
				$org_options['style_settings']['css_name'] = $_FILES['css']['name'];
			}
		}
		$org_options['template_settings']['use_custom_templates'] = $_POST['use_custom_templates'];
		$org_options = apply_filters('filter_hook_espresso_template_confg_save', $org_options);
		update_user_meta($espresso_wp_user, 'events_organization_settings', $org_options);

		$notices['updates'][] = __('Template Settings Updated', 'event_espresso');
	}


	function espresso_style_is_selected($name) {
		global $org_options;
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		$input_item = $name;
		$option_selections = isset($org_options['themeroller']) && !empty($org_options['themeroller']) ? array($org_options['themeroller']['themeroller_style']) : array();
		if (!in_array($input_item, $option_selections)) {
			return false;
		} else {
			echo 'selected="selected"';
			return;
		}
	}

	espresso_template_confg_output();
}

function espresso_template_confg_output() {
	?>
	<div class="wrap">
		<div id="icon-options-event" class="icon32"> </div>
		<h2>
			<?php _e('Template Settings', 'event_espresso'); ?>
		</h2>
		<?php do_action('action_hook_espresso_admin_notices'); ?>
		<div id="poststuff" class="metabox-holder has-right-sidebar">
			<?php event_espresso_display_right_column(); ?>
			<div id="post-body">
				<div id="post-body-content">
					<form id="template-settings-form" class="espresso_form" enctype="multipart/form-data" method="post" action="<?php echo $_SERVER['REQUEST_URI'] ?>">
						<div class="meta-box-sortables ui-sortables">
							<?php do_meta_boxes('template_confg', 'advanced', null); ?>
						</div>
						<!-- / .meta-box-sortables -->

						<input type="hidden" name="update_org" value="update" />
					</form>
					<?php include_once('templates_help.php'); ?>
				</div>
				<!-- / #post-body-content -->
			</div>
			<!-- / #post-body -->
		</div>
		<!-- / #poststuff -->
	</div>
	<!-- / #wrap -->
	<script type="text/javascript" charset="utf-8">
		//<![CDATA[
		jQuery(document).ready(function() {
			postboxes.add_postbox_toggles('template_conf');

		});
		//]]>
	</script>
	<?php
}

function espresso_template_settings() {
	$values = array(
			array('id' => true, 'text' => __('Yes', 'event_espresso')),
			array('id' => false, 'text' => __('No', 'event_espresso'))
	);
	//Stylesheet functions
	// read our style dir and build an array of files
	// themeroller style directory
	if (file_exists(EVENT_ESPRESSO_UPLOAD_DIR . "/themeroller/index.php")) {
		$dhandle = opendir(EVENT_ESPRESSO_UPLOAD_DIR . '/themeroller/');
	} else {
		$dhandle = opendir(EVENT_ESPRESSO_PLUGINFULLPATH . 'templates/css/themeroller/');
	}

	$files_themeroller = array();

	if ($dhandle) { //if we managed to open the directory
		// loop through all of the files
		while (false !== ($fname_themeroller = readdir($dhandle))) {
			// if the file is not this file, and does not start with a '.', '..', etc., then store it for later display.
			if ($fname_themeroller != '.'
							&& $fname_themeroller != '..'
							&& $fname_themeroller != '.svn'
							&& $fname_themeroller != basename($_SERVER['PHP_SELF'])
							&& $fname_themeroller != 'index.php'
							&& $fname_themeroller != '.DS_Store'
							&& $fname_themeroller != 'themeroller-base.css') {
				// store the filename
				$files_themeroller[] = $fname_themeroller;
			}
		}
		// close the directory
		closedir($dhandle);
	}
	global $org_options;
	?>
	<div class="padding">
		<table class="form-table">
			<tbody>
				<tr>
					<td colspan="2"><strong>
							<?php _e('Event Listings', 'event_espresso'); ?>
						</strong></td>
				<tr>
				<tr>
					<th> <label for="display_description_in_event_list">
							<?php _e('Display Descriptions', 'event_espresso'); ?>
						</label>
					</th>
					<td><?php echo select_input('display_description_in_event_list', $values, $org_options['template_settings']['display_description_in_event_list'], 'id="display_description_in_event_list"'); ?></td>
				</tr>
				<tr>
					<th> <label for="display_short_description_in_event_list">
							<?php _e('Use SHORT Descriptions', 'event_espresso'); ?>
						</label>
					</th>
					<td><?php echo select_input('display_short_description_in_event_list', $values, $org_options['template_settings']['display_short_description_in_event_list'], 'id="display_short_description_in_event_list"'); ?> <br />
						<span class="description">
							<?php _e('Be sure to use the more... tag in your event description', 'event_espresso'); ?>
						</span></td>
				</tr>
				<tr>
					<th> <label for="display_address_in_event_list">
							<?php _e('Display Addresses', 'event_espresso'); ?>
						</label>
					</th>
					<td><?php echo select_input('display_address_in_event_list', $values, $org_options['template_settings']['display_address_in_event_list'], 'id="display_address_in_event_list"'); ?></td>
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
					<td><?php echo select_input('display_address_in_regform', $values, $org_options['template_settings']['display_address_in_regform'], 'id="display_address_in_regform"'); ?><br />
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
					<td><?php echo select_input('enable_default_style', $values, $org_options['style_settings']['enable_default_style'], 'id="use_built_in_style_sheets"'); ?><br />
						<span class="description">
							<?php _e('This option enables the style settings below.', 'event_espresso'); ?>
						</span></td>
				</tr>
				<tr>
					<th> <label>
							<?php _e('Use Grid Layout', 'event_espresso'); ?>
							<?php echo apply_filters('filter_hook_espresso_help', 'use_grid_info'); ?>
						</label>
					</th>
					<td><?php echo select_input('use_grid_layout', $values, $org_options['style_settings']['use_grid_layout'], 'id="use_grid_layout"'); ?><br />
						<span class="description">
							<?php _e('Displays event list in a grid layout.', 'event_espresso'); ?>
						</span>
					</td>
				</tr>

				<tr>
					<th> <?php _e('ThemeRoller Style ', 'event_espresso'); ?>
						<?php echo apply_filters('filter_hook_espresso_help', 'themeroller_info'); ?>
					</th>
					<td><select id="style-themeroller" class="chzn-select wide" name="themeroller_style">
							<option <?php espresso_style_is_selected($fname_themeroller) ?> value=""> - <?php _e('Default', 'event_espresso'); ?>
							</option>
							<?php foreach ($files_themeroller as $fname_themeroller) { ?>
								<option <?php espresso_style_is_selected($fname_themeroller) ?> value="<?php echo $fname_themeroller ?>"><?php echo $fname_themeroller; ?></option>
							<?php } ?>
						</select><br />
						<span class="description">
							<?php _e('Default style sheet is Smoothness.', 'event_espresso'); ?>
						</span></td>
				</tr>
				<?php if (!empty($org_options['style_settings']['css_name'])) { ?>
					<tr>
						<th> <label>
								<?php _e('Current Custom Style Sheet', 'event_espresso'); ?>
							</label>
						</th>
						<td><a href="<?php echo EVENT_ESPRESSO_UPLOAD_URL . 'css/' . $org_options['style_settings']['css_name']; ?>" target="_blank"><?php echo $org_options['style_settings']['css_name']; ?></a>
							<input style="width:20px; margin-left:20px" name="remove_css" type="checkbox" value="true" />
							<?php _e('Remove style sheet?', 'event_espresso'); ?></td>
					</tr>
				<?php } ?>
				<tr>
					<th> <label>
							<?php _e('Add a custom style sheet?', 'event_espresso'); ?>
						</label>
					</th>
					<td><input type="file" name="css" id="css" /></td>
				</tr>
				<?php echo apply_filters('filter_hook_espresso_template_config_template_settings_form_table', ''); ?>
			</tbody>
		</table>
		<?php // create our nonces and do our form submit   ?>
		<?php wp_nonce_field('espresso_form_check', 'ee_template_settings_update'); ?>
		<p class="submit-buttons">
			<input class="button-primary" type="submit" name="Submit" value="<?php _e('Save Options', 'event_espresso'); ?>" id="save_organization_setting_1" />
		</p>
	</div>
	<?php
}

function espresso_multi_reg_display_in_template_config_template_settings_form_table($input) {
	ob_start();
	?>
	<tr>
		<th> <label for="display_description_on_multi_reg_page">
				<?php _e('Multiple Event Descriptions', 'event_espresso'); ?>
			</label>
		</th>
		<td><?php echo select_input('display_description_on_multi_reg_page', $values, isset($org_options['template_settings']['display_description_on_multi_reg_page']) ? $org_options['template_settings']['display_description_on_multi_reg_page'] : '', 'id="display_description_on_multi_reg_page"'); ?><br />
			<span class="description">
				<?php _e('Displays the event description in the <br />Multiple Event Registration pages.', 'event_espresso'); ?>
			</span></td>
	</tr>
	<?php
	$buffer = ob_get_contents();
	ob_end_clean();
	return $input . $buffer;
}

if (function_exists('event_espresso_multi_reg_init')) {
	add_filter('filter_hook_espresso_template_config_template_settings_form_table', 'espresso_multi_reg_display_in_template_config_template_settings_form_table');
	add_filter('filter_hook_espresso_template_confg_save', 'espresso_multi_reg_template_confg_save_filter');
}

function espresso_multi_reg_template_confg_save_filter($org_options) {
	$org_options['template_settings']['display_description_on_multi_reg_page'] = empty($_POST['display_description_on_multi_reg_page']) ? '' : $_POST['display_description_on_multi_reg_page'];
	return $org_options;
}

require_once(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/admin-files/templates/template_files.php');