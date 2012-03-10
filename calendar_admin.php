<?php

function espresso_calendar_add_to_featured_image_meta_box($event_meta) {
	$values = array(
			array('id' => true, 'text' => __('Yes', 'event_espresso')),
			array('id' => false, 'text' => __('No', 'event_espresso')));
	?>
	<p>
		<label>
			<?php _e('Add image to event calendar', 'event_espresso'); ?>
		</label>
		<?php echo select_input('show_on_calendar', $values, isset($event_meta['display_thumb_in_calendar']) ? $event_meta['display_thumb_in_calendar'] : '', 'id="show_on_calendar"'); ?>
	</p>
	<?php
}

add_action('action_hook_espresso_featured_image_add_to_meta_box', 'espresso_calendar_add_to_featured_image_meta_box');

function espresso_add_calendar_to_admin_menu($espresso_manager) {
	add_submenu_page('events', __('Event Espresso - Calendar Settings', 'event_espresso'), __('Calendar', 'event_espresso'), apply_filters('filter_hook_espresso_management_capability', 'administrator', $espresso_manager['espresso_manager_calendar']), 'espresso_calendar', 'espresso_calendar_config_mnu');
}

add_action('action_hook_espresso_add_new_submenu_to_group_settings', 'espresso_add_calendar_to_admin_menu', 5);