<?php
if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

function edit_event($event_id = 0) {

	global $wpdb, $org_options;

	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

	$sql = "SELECT e.*, ev.id as venue_id
		FROM " . EVENTS_DETAIL_TABLE . " e
		LEFT JOIN " . EVENTS_VENUE_REL_TABLE . " vr ON e.id = vr.event_id
		LEFT JOIN " . EVENTS_VENUE_TABLE . " ev ON vr.venue_id = ev.id
		WHERE e.id = %d";
	$event = $wpdb->get_row($wpdb->prepare($sql, $event_id), OBJECT);

	//Debug
	//echo "<pre>".print_r($event,true)."</pre>";

	$event->event_name = stripslashes_deep($event->event_name);
	$event->event_desc = stripslashes_deep($event->event_desc);
	$event->phone = stripslashes_deep($event->phone);
	$event->externalURL = stripslashes_deep($event->externalURL);
	$event->early_disc = stripslashes_deep($event->early_disc);
	$event->early_disc_date = stripslashes_deep($event->early_disc_date);
	$event->early_disc_percentage = stripslashes_deep($event->early_disc_percentage);
	$event->event_identifier = stripslashes_deep($event->event_identifier);
//	$event->start_time = isset($event->start_time) ? $event->start_time : '';
//	$event->end_time = isset($event->end_time) ? $event->end_time : '';
	$event->status = array();
	$event->status = event_espresso_get_is_active($event->id);
	$event->address = stripslashes_deep($event->address);
	$event->address2 = stripslashes_deep($event->address2);
	$event->city = stripslashes_deep($event->city);
	$event->state = stripslashes_deep($event->state);
	$event->zip = stripslashes_deep($event->zip);
	$event->country = stripslashes_deep($event->country);
	$event->submitted = $event->submitted != '0000-00-00 00:00:00' ? (empty($event->submitted) ? '' : event_date_display($event->submitted, get_option('date_format')) ) : 'N/A';
	$event->google_map_link = espresso_google_map_link(array('address' => $event->address, 'city' => $event->city, 'state' => $event->state, 'zip' => $event->zip, 'country' => $event->country));
	$event->question_groups = unserialize($event->question_groups);
	$event->event_meta = unserialize($event->event_meta);

	$sql = "SELECT qg.* FROM " . EVENTS_QST_GROUP_TABLE . " qg JOIN " . EVENTS_QST_GROUP_REL_TABLE . " qgr ON qg.id = qgr.group_id ";
	$sql2 = apply_filters('filter_hook_espresso_event_editor_question_groups_sql', " WHERE wp_user = '0' OR wp_user = '1' ", $event->id);
	$sql .= $sql2 . " GROUP BY qg.id ORDER BY qg.group_order";
	$sql = apply_filters('filter_hook_espresso_question_group_sql', $sql);
	//Debug:
	//echo $sql;
	$event->q_groups = $wpdb->get_results($sql);
	$event->num_rows = $wpdb->num_rows;
	$event->page_url = get_permalink($org_options['event_page_id']);

	if (apply_filters('filter_hook_espresso_event_editor_permissions', true, $event->id)) {
		espresso_display_edit_event($event);
		do_action('action_hook_espresso_event_editor_footer');
	} else {
		echo '<h2>' . __('Sorry, you do not have permission to edit this event.', 'event_espresso') . '</h2>';
	}
}

function espresso_display_edit_event($event) {

	global $org_options;


	$edit_event_form_url = add_query_arg(array('action' => 'edit_event', 'event_id' => $event->id), EVENTS_ADMIN_URL);
	?>
	<div class="wrap columns-2">
		<div id="icon-options-event" class="icon32"> </div>

		<h2><?php _e('Event Editor', 'event_espresso'); ?></h2>

		<form name="form" method="post" action="<?php echo $edit_event_form_url; ?>">
			<?php
			ob_start();
			do_meta_boxes('toplevel_page_events', 'side', $event);
			$sidebar_content = ob_get_clean();
			ob_start();
			do_action('action_hook_espresso_event_editor_title_div', $event);
			do_action('action_hook_espresso_event_editor_desc_div', $event);
			$main_post_content = ob_get_clean();
			ob_start();
			do_meta_boxes('toplevel_page_events', 'normal', $event);
			do_meta_boxes('toplevel_page_events', 'advanced', $event);
			$center_metabox_content = ob_get_clean();
			espresso_choose_layout($main_post_content, $sidebar_content, $center_metabox_content);
			?>
			<input type="hidden" name="action" value="update">
			<input type="hidden" name="date_submitted" value="<?php echo $event->submitted; ?>">
			<input type="hidden" name="recurrence_id" value="<?php echo $event->recurrence_id; ?>">
			<input type="hidden" name="event_id" value="<?php echo $event->id ?>">
			<input type="hidden" name="originally_submitted_by" value="<?php echo!empty($event->event_meta['originally_submitted_by']) ? $event->event_meta['originally_submitted_by'] : $event->wp_user ?>">
			<?php //do_action('action_hook_espresso_save_buttons', $event); ?>
			<div id="event-editor-floating-save-btns" class="hidden">	
				<div id="publishing-action">
					<input class="button-primary" type="submit" name="save" value="<?php _e('Save', 'event_espresso'); ?>" id="save" />
					<input class="button-primary" type="submit" name="save_and_close" value="<?php _e('Save And Close', 'event_espresso'); ?>" id="save_and_close" />
				</div>
				<br class="clear"/>		
			</div>			
		</form>
	</div>
	<?php
}
