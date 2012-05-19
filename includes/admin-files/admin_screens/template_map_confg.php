<?php

function event_espresso_manage_maps() {
	include_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/templates/map_confg_help.php');
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/templates/event_gmaps_settings.php');
	global $wpdb, $org_options, $notices, $espresso_wp_user;
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	if (isset($_POST['update_org']) && check_admin_referer('espresso_form_check', 'ee_maps_update')) {
		$org_options['map_settings']['ee_display_map_no_shortcodes'] = $_POST['ee_display_map_no_shortcodes'];
		// org_options Gmaps reg page
		$org_options['map_settings']['ee_map_width_single'] = $_POST['ee_map_width_single'];
		$org_options['map_settings']['ee_map_height_single'] = $_POST['ee_map_height_single'];
		$org_options['map_settings']['ee_map_zoom_single'] = $_POST['ee_map_zoom_single'];
		$org_options['map_settings']['ee_map_nav_display_single'] = $_POST['ee_map_nav_display_single'];
		$org_options['map_settings']['ee_map_nav_size_single'] = $_POST['ee_map_nav_size_single'];
		$org_options['map_settings']['ee_map_type_control_single'] = $_POST['ee_map_type_control_single'];
		$org_options['map_settings']['ee_map_align_single'] = $_POST['ee_map_align_single'];
		//org_options Gmaps list pages
		$org_options['map_settings']['ee_map_width'] = $_POST['ee_map_width'];
		$org_options['map_settings']['ee_map_height'] = $_POST['ee_map_height'];
		$org_options['map_settings']['ee_map_zoom'] = $_POST['ee_map_zoom'];
		$org_options['map_settings']['ee_map_nav_display'] = $_POST['ee_map_nav_display'];
		$org_options['map_settings']['ee_map_nav_size'] = $_POST['ee_map_nav_size'];
		$org_options['map_settings']['ee_map_type_control'] = $_POST['ee_map_type_control'];
		$org_options['map_settings']['ee_map_align'] = $_POST['ee_map_align'];

		if (empty($org_options['map_settings']['ee_map_type_control']))
			$org_options['map_settings']['ee_map_type_control'] = 'default';
		if (empty($org_options['map_settings']['ee_map_align']))
			$org_options['map_settings']['ee_map_align'] = 'none';
		if (empty($org_options['map_settings']['ee_map_align_single']))
			$org_options['map_settings']['ee_map_align_single'] = 'none';
		if (empty($org_options['map_settings']['ee_map_type_control_single']))
			$org_options['map_settings']['ee_map_type_control_single'] = 'default';
		update_user_meta($espresso_wp_user, 'events_organization_settings', $org_options);

		$notices['updates'][] = __('Events Map Settings Updated', 'event_espresso');
	}

	// checks value of calendar thumb size to set radio inputs
	// two seperate functions to handle list opts or reg page(single) opts
	// to prevent opt values clashing due to same values.
	function espresso_is_selected_list($input_val) {
		global $org_options;
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		$the_opt_val = array('ee_map_type_control' => $org_options['map_settings']['ee_map_type_control'],
				'ee_map_align' => $org_options['map_settings']['ee_map_align']);
		if (!in_array($input_val, $the_opt_val))
			return false;
		else
			echo 'checked="checked"';
		return;
	}

	function espresso_is_selected_reg($input_val) {
		global $org_options;
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		$the_opt_val = array('ee_map_align_single' => $org_options['map_settings']['ee_map_align_single'],
				'ee_map_type_control_single' => $org_options['map_settings']['ee_map_type_control_single']);
		if (!in_array($input_val, $the_opt_val)) {
			return false;
		} else {
			echo 'checked="checked"';
			return true;
		}
	}

	espresso_template_map_confg_display();
}

function espresso_template_map_confg_display() {
	ob_start();
	do_meta_boxes('event-espresso_page_template_map_confg', 'side', null);
	$sidebar_content = ob_get_clean();
	ob_start();
	?>
	<form id="template-settings-form" class="espresso_form" method="post" action="<?php echo $_SERVER['REQUEST_URI'] ?>">
		<?php
		do_meta_boxes('event-espresso_page_template_map_confg', 'advanced', null);
		espresso_map_confg_help_display();
		// create our nonces and do our form submit
		wp_nonce_field('espresso_form_check', 'ee_maps_update');
		?>
		<input type="hidden" name="update_org" value="update" />
	</form>
	<?php
	$main_post_content = ob_get_clean();
	?>
	<div class="wrap columns-2">
		<div id="icon-options-event" class="icon32"> </div>
		<h2>
			<?php _e('Event Espresso - Event Map Settings', 'event_espresso'); ?>
		</h2>
		<?php
		if (!espresso_choose_layout($main_post_content, $sidebar_content))
			return FALSE;
		?>
	</div><!-- / #wrap -->

	<?php
}
