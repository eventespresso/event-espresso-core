<?php
if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

function edit_event($event_id = 0) {
	global $wpdb;

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
	$event->start_time = isset($event->start_time) ? $event->start_time : '';
	$event->end_time = isset($event->end_time) ? $event->end_time : '';
	$event->status = array();
	$event->status = event_espresso_get_is_active($event->id);
	$event->address = stripslashes_deep($event->address);
	$event->address2 = stripslashes_deep($event->address2);
	$event->city = stripslashes_deep($event->city);
	$event->state = stripslashes_deep($event->state);
	$event->zip = stripslashes_deep($event->zip);
	$event->country = stripslashes_deep($event->country);
	$event->submitted = $event->submitted != '0000-00-00 00:00:00' ? (empty($event->submitted) ? '' : event_date_display($event->submitted, get_option('date_format')) ) : 'N/A';
	$google_map_link = espresso_google_map_link(array('address' => $event->address, 'city' => $event->city, 'state' => $event->state, 'zip' => $event->zip, 'country' => $event->country));
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

	if (apply_filters('filter_hook_espresso_event_editor_permissions', true, $event->id)) {
		espresso_display_edit_event($event);
	} else {
		echo '<h2>' . __('Sorry, you do not have permission to edit this event.', 'event_espresso') . '</h2>';
	}
}

function espresso_display_edit_event($event) {
	?>
	<div class="wrap columns-2">
		<div id="icon-options-event" class="icon32"> </div>
		<h2>
			<?php _e('Event Editor', 'event_espresso'); ?>
		</h2>
		<form name="form" method="post" action="<?php echo $_SERVER['REQUEST_URI'] ?>">
			<div id="poststuff" class="metabox-holder has-right-sidebar">
				<div id="side-info-column" class="inner-sidebar">
					<?php do_meta_boxes('toplevel_page_events', 'side', $event); ?>
				</div>
				<div id="post-body">
					<div id="post-body-content">
						<?php do_meta_boxes('toplevel_page_events', 'advanced', null); ?>
						<input type="hidden" name="edit_action" value="update">
						<input type="hidden" name="date_submitted" value="<?php echo $event->submitted; ?>">
						<input type="hidden" name="recurrence_id" value="<?php echo $event->recurrence_id; ?>">
						<input type="hidden" name="action" value="edit">
						<input type="hidden" name="event_id" value="<?php echo $event->id ?>">
						<input type="hidden" name="originally_submitted_by" value="<?php echo!empty($event->event_meta['originally_submitted_by']) ? $event->event_meta['originally_submitted_by'] : $event->wp_user ?>">
					</div>
				</div>
			</div>
		</form>
	</div>
	<?php
}

function espresso_event_editor_quick_overview_meta_box($event) {
	?>
	<div class="inside">
		<div class="submitbox" id="submitpost">
			<div id="minor-publishing">
				<div id="minor-publishing-actions" class="clearfix">
					<div id="preview-action"> <a class="preview button" href="<?php echo espresso_reg_url($event->id, $event->slug); ?>" target="_blank" id="event-preview" tabindex="5">
							<?php _e('View Event', 'event_espresso'); ?>
						</a>
						<input type="hidden" name="event-preview" id="event-preview" value="" />
					</div>
					<div id="copy-action"> <a class="preview button" href="admin.php?page=events&amp;action=copy_event&event_id=<?php echo $event->id ?>" id="post-copy" tabindex="4" onclick="return confirm('<?php _e('Are you sure you want to copy ' . $event->event_name . '?', 'event_espresso'); ?>')">
							<?php _e('Duplicate Event', 'event_espresso'); ?>
						</a>
						<input  type="hidden" name="event-copy" id="event-copy" value="" />
					</div>
				</div>
				<!-- /minor-publishing-actions -->

				<div id="misc-publishing-actions">
					<div class="misc-pub-section curtime" id="visibility"> <span id="timestamp">
							<?php _e('Start Date', 'event_espresso'); ?>
							<b> <?php echo event_date_display($event->start_date); ?></b> </span> </div>
					<div class="misc-pub-section">
						<label for="post_status">
							<?php _e('Current Status:', 'event_espresso'); ?>
						</label>
						<span id="post-status-display"> <?php echo $event->status['display']; ?></span></div>

					<div class="misc-pub-section" id="visibility">
						<img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/icons/group.png" width="16" height="16" alt="<?php _e('View Attendees', 'event_espresso'); ?>" />
						<a href="admin.php?page=attendees&amp;event_admin_reports=list_attendee_payments&amp;event_id=' . $event->id . '"><?php _e('Attendees', 'event_espresso'); ?></a>:
						<?php echo get_number_of_attendees_reg_limit($event->id, 'num_attendees_slash_reg_limit'); ?>
					</div>

					<?php $class = apply_filters('filter_hook_espresso_event_editor_email_attendees_class', 'misc-pub-section'); ?>

					<div class="misc-pub-section <?php echo $class; ?>" id="visibility2">
						<a href="admin.php?page=attendees&amp;event_admin_reports=event_newsletter&amp;event_id=<?php echo $event->id ?>" title="<?php _e('Email Event Attendees', 'event_espresso'); ?>">
							<img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/icons/email_go.png" width="16" height="16" alt="<?php _e('Newsletter', 'event_espresso'); ?>" />
						</a>
						<a href="admin.php?page=attendees&amp;event_admin_reports=event_newsletter&amp;event_id=<?php echo $event->id ?>" title="<?php _e('Email Event Attendees', 'event_espresso'); ?>">
							<?php _e('Email Event Attendees', 'event_espresso'); ?>
						</a>
					</div>
					<?php
					do_action('action_hook_espresso_event_editor_overview_add', $event);
					?>
				</div>
				<!-- /misc-publishing-actions -->
			</div>
			<!-- /minor-publishing -->

			<div id="major-publishing-actions" class="clearfix">
				<?php if ($event->recurrence_id > 0) : ?>
					<div id="delete-action"> &nbsp; <a class="submitdelete deletion" href="admin.php?page=events&amp;action=delete_recurrence_series&recurrence_id=<?php echo $event->recurrence_id ?>" onclick="return confirm('<?php _e('Are you sure you want to delete ' . $event->event_name . '?', 'event_espresso'); ?>')">
							<?php _e('Delete all events in this series', 'event_espresso'); ?>
						</a> </div>
				<?php else: ?>
					<div id="delete-action"> <a class="submitdelete deletion" href="admin.php?page=events&amp;action=delete&event_id=<?php echo $event->id ?>" onclick="return confirm('<?php _e('Are you sure you want to delete ' . $event->event_name . '?', 'event_espresso'); ?>')">
							<?php _e('Delete Event', 'event_espresso'); ?>
						</a> </div>
				<?php endif; ?>
				<div id="publishing-action">
					<?php wp_nonce_field('espresso_form_check', 'ee_update_event'); ?>
					<input class="button-primary" type="submit" name="Submit" value="<?php _e('Update Event', 'event_espresso'); ?>" id="save_event_setting" />
				</div>
				<!-- /publishing-action -->
			</div>
			<!-- /major-publishing-actions -->
		</div>
		<!-- /submitpost -->
	</div>
	<?php
}

function espresso_event_editor_primary_questions_group_meta_box($event) {
	global $wpdb;
	$question_groups = $event->question_groups;
	$event_id = $event->id;
	?>
	<div class="inside">
		<p><strong>
				<?php _e('Question Groups', 'event_espresso'); ?>
			</strong><br />
			<?php _e('Add a pre-populated', 'event_espresso'); ?>
			<a href="admin.php?page=form_groups" target="_blank">
				<?php _e('group', 'event_espresso'); ?>
			</a>
			<?php _e('of', 'event_espresso'); ?>
			<a href="admin.php?page=form_builder" target="_blank">
				<?php _e('questions', 'event_espresso'); ?>
			</a>
			<?php _e('to your event. The personal information group is required for all events.', 'event_espresso'); ?>
		</p>
		<?php
		if ($event->num_rows > 0) {
			reset($event->q_groups);
			$html = '';
			foreach ($event->q_groups as $question_group) {
				$question_group_id = $question_group->id;
				$question_group_description = $question_group->group_description;
				$group_name = $question_group->group_name;
				//$checked = $question_group->system_group == 1 ? ' checked="checked" ' : '';
				$checked = (is_array($question_groups) && array_key_exists($question_group_id, $question_groups)) || $question_group->system_group == 1 ? ' checked="checked" ' : '';
				$visibility = $question_group->system_group == 1 ? 'style="visibility:hidden"' : '';
				$group_id = isset($group_id) ? $group_id : '';
				$html .= '<p id="event-question-group-' . $question_group_id . '"><input value="' . $question_group_id . '" type="checkbox" ' . $checked . $visibility . ' name="question_groups[' . $question_group_id . ']" ' . $checked . ' /> <a href="admin.php?page=form_groups&amp;action=edit_group&amp;group_id=' . $question_group_id . '" title="edit" target="_blank">' . $group_name . '</a></p>';
			}
			if ($event->num_rows > 10) {
				$top_div = '<div style="height:250px;overflow:auto;">';
				$bottom_div = '</div>';
			} else {
				$top_div = '';
				$bottom_div = '';
			}
			$html = $top_div . $html . $bottom_div;
			echo $html;
		} else {
			echo __('There seems to be a problem with your questions. Please contact support@eventespresso.com', 'event_espresso');
		}
		do_action('action_hook_espresso_event_editor_questions_notice');
		?>
	</div>
	<?php
}

function espresso_event_editor_categories_meta_box($event) {
	$event_id = $event->id;
	global $wpdb;
	?>
	<div class="inside">
		<?php
		$sql = "SELECT * FROM " . EVENTS_CATEGORY_TABLE;
		$sql = apply_filters('filter_hook_espresso_event_editor_categories_sql', $sql);
		$event_categories = $wpdb->get_results($sql);
		$num_rows = $wpdb->num_rows;
		if ($num_rows > 0) {
			foreach ($event_categories as $category) {
				$category_id = $category->id;
				$category_name = $category->category_name;

				$in_event_categories = $wpdb->get_results("SELECT * FROM " . EVENTS_CATEGORY_REL_TABLE . " WHERE event_id='" . $event_id . "' AND cat_id='" . $category_id . "'");
				foreach ($in_event_categories as $in_category) {
					$in_event_category = $in_category->cat_id;
				}
				if (empty($in_event_category))
					$in_event_category = '';
				ob_start();
				?>
				<p id="event-category-<?php echo $category_id; ?>">
					<label for="in-event-category-<?php echo $category_id; ?>" class="selectit">
						<input value="' . $category_id . '" type="checkbox" name="event_category[]" id="in-event-category-<?php echo $category_id; ?>"<?php echo ($in_event_category == $category_id ? ' checked="checked"' : "" ); ?>/>
						<?php echo $category_name; ?>
					</label>
				</p>
				<?php
				$html = ob_get_contents();
				ob_end_clean();
			}
			if ($num_rows > 10) {
				ob_start();
				?>
				<div style="height:250px;overflow:auto;">
					<?php echo $html; ?>
				</div>
				<?php
				$html = ob_get_contents();
				ob_end_clean();
			}
			echo $html;
		} else {
			_e('No Categories', 'event_espresso');
		}
		?>
		<p>
			<a href="admin.php?page=event_categories" target="_blank">
				<?php _e('Manage Categories', 'event_espresso'); ?>
			</a>
		</p>
	</div>
	<?php
}



function espresso_register_event_editor_meta_boxes() {
	global $espresso_premium;

	add_meta_box('espresso_event_editor_quick_overview', __('Quick Overview', 'event_espresso'), 'espresso_event_editor_quick_overview_meta_box', 'toplevel_page_events', 'side', 'high');

	add_meta_box('espresso_event_editor_primary_questions', __('Questions for Primary Attendee', 'event_espresso'), 'espresso_event_editor_primary_questions_group_meta_box', 'toplevel_page_events', 'side', 'core');

	add_meta_box('espresso_event_editor_categories', __('Event Category', 'event_espresso'), 'espresso_event_editor_categories_meta_box', 'toplevel_page_events', 'side', 'default');

	add_action('admin_footer', 'espresso_admin_page_footer');
}

add_action('current_screen', 'espresso_register_event_editor_meta_boxes');