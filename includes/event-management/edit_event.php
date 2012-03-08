<?php
if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

function edit_event($event_id = 0) {
	global $wpdb, $org_options, $espresso_premium;

	$event = new stdClass;

	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	do_action('action_hook_espresso_admin_notices');

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


	if (function_exists('event_espresso_edit_event_groupon')) {
		$use_groupon_code = $event->use_groupon_code;
	}

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

	$values = array(
			array('id' => 'Y', 'text' => __('Yes', 'event_espresso')),
			array('id' => 'N', 'text' => __('No', 'event_espresso')));

	//If user is an event manager, then show only their events
	if (function_exists('espresso_is_my_event') && espresso_is_my_event($event->id) != true) {
		echo '<h2>' . __('Sorry, you do not have permission to edit this event.', 'event_espresso') . '</h2>';
		return;
	}
	espresso_display_edit_event($event);
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

					<div class="misc-pub-section" id="visibility"> <img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/icons/group.png" width="16" height="16" alt="<?php _e('View Attendees', 'event_espresso'); ?>" /> <?php echo!empty($number_attendees) ? __('Attendees', 'event_espresso') : '<a href="admin.php?page=attendees&amp;event_admin_reports=list_attendee_payments&amp;event_id=' . $event->id . '">' . __('Attendees', 'event_espresso') . '</a>'; ?>: <?php echo get_number_of_attendees_reg_limit($event->id, 'num_attendees_slash_reg_limit'); ?> </div>
					<div class="misc-pub-section <?php echo (function_exists('espresso_is_admin') && espresso_is_admin() == true && $espresso_premium == true) ? '' : 'misc-pub-section-last'; ?>" id="visibility2"> <a href="admin.php?page=attendees&amp;event_admin_reports=event_newsletter&amp;event_id=<?php echo $event->id ?>" title="<?php _e('Email Event Attendees', 'event_espresso'); ?>"><img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/icons/email_go.png" width="16" height="16" alt="<?php _e('Newsletter', 'event_espresso'); ?>" /></a> <a href="admin.php?page=attendees&amp;event_admin_reports=event_newsletter&amp;event_id=<?php echo $event->id ?>" title="<?php _e('Email Event Attendees', 'event_espresso'); ?>">
							<?php _e('Email Event Attendees', 'event_espresso'); ?>
						</a></div>
					<?php
					if (function_exists('espresso_is_admin') && espresso_is_admin() == true && $espresso_premium == true) {

						echo '<div class="misc-pub-section misc-pub-section-last" id="visibility3">';
						echo '<ul>';
						if (function_exists('espresso_manager_list')) {
							echo '<li>' . espresso_manager_list($event->wp_user) . '</li>';
						}
						$event->wp_user = $event->wp_user == $event->event_meta['originally_submitted_by'] ? $event->wp_user : $event->event_meta['originally_submitted_by'];
						$user_name = espresso_user_meta($event->wp_user, 'user_firstname') != '' ? espresso_user_meta($event->wp_user, 'user_firstname') . ' ' . espresso_user_meta($event->wp_user, 'user_lastname') : espresso_user_meta($event->wp_user, 'display_name');
						$user_company = espresso_user_meta($event->wp_user, 'company') != '' ? espresso_user_meta($event->wp_user, 'company') : '';
						$user_organization = espresso_user_meta($event->wp_user, 'organization') != '' ? espresso_user_meta($event->wp_user, 'organization') : '';
						$user_co_org = $user_company != '' ? $user_company : $user_organization;

						echo '<li><strong>' . __('Submitted By:', 'event_espresso') . '</strong> ' . $user_name . '</li>';
						echo '<li><strong>' . __('Email:', 'event_espresso') . '</strong> ' . espresso_user_meta($event->wp_user, 'user_email') . '</li>';
						echo $user_co_org != '' ? '<li><strong>' . __('Organization:', 'event_espresso') . '</strong> ' . espresso_user_meta($event->wp_user, 'company') . '</li>' : '';
						echo '<li><strong>' . __('Date Submitted:', 'event_espresso') . '</strong> ' . $event->submitted . '</li>';
						echo '</ul>';
						echo '</div>';
					}
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

function espresso_free_event_editor_event_options_meta_box($event) {
	?>
	<p class="inputundersmall">
		<label for"reg-limit">
		<?php _e('Attendee Limit: ', 'event_espresso'); ?>
	</label>
	<input id="reg-limit" name="reg_limit"  size="10" type="text" value="<?php echo $event->reg_limit; ?>" /><br />
	<span>(<?php _e('leave blank for unlimited', 'event_espresso'); ?>)</span>
	</p>
	<p class="clearfix" style="clear: both;">
		<label for="group-reg"><?php _e('Allow group registrations? ', 'event_espresso'); ?></label>
		<?php select_input('allow_multiple', $values, $event->allow_multiple, 'id="group-reg"'); ?>
	</p>
	<p class="inputundersmall">
		<label for="max-registrants"><?php _e('Max Group Registrants: ', 'event_espresso'); ?></label>
		<input type="text" id="max-registrants" name="additional_limit" value="<?php echo $event->additional_limit; ?>" size="4" />
	</p>
	<p>
		<strong><?php _e('Advanced Options:', 'event_espresso'); ?>
		</strong>
	</p>
	<p>
		<label><?php _e('Is this an active event? ', 'event_espresso'); ?>
		</label><?php _e(select_input('is_active', $values, $event->is_active)); ?>
	</p>
	<p><label><?php _e('Display  description? ', 'event_espresso'); ?></label>
		<?php select_input('display_desc', $values, $event->display_desc); ?>
	</p>
	<p>
		<label><?php _e('Display  registration form? ', 'event_espresso'); ?>
		</label><?php select_input('display_reg_form', $values, $event->display_reg_form); ?>
	</p>
	<?php
}

function espresso_event_editor_event_options_meta_box($event) {
	$values = array(
			array('id' => true, 'text' => __('Yes', 'event_espresso')),
			array('id' => false, 'text' => __('No', 'event_espresso'))
	);
	$additional_attendee_reg_info_values = array(
	array('id'=>'1','text'=> __('No info required','event_espresso')),
	array('id' => '2', 'text' => __('Personal Information only', 'event_espresso')),
	array('id' => '3', 'text' => __('Full registration information', 'event_espresso'))
);
	$event_status_values = array(
			array('id' => 'A', 'text' => __('Public', 'event_espresso')),
			array('id' => 'S', 'text' => __('Waitlist', 'event_espresso')),
			array('id' => 'O', 'text' => __('Ongoing', 'event_espresso')),
			array('id' => 'R', 'text' => __('Draft', 'event_espresso')),
			array('id' => 'D', 'text' => __('Deleted', 'event_espresso'))
			);
	$event_status_values = apply_filters('filter_hook_espresso_event_status_values', $event_status_values);

	$default_payment_status_values = array(
	array('id' => "", 'text' => 'No Change'),
	array('id' => 'Incomplete', 'text' => 'Incomplete'),
	array('id' => 'Pending', 'text' => 'Pending'),
	array('id' => 'Completed', 'text' => 'Completed')
);
	?>
	<p class="inputundersmall">
		<label for"reg-limit">
		<?php _e('Attendee Limit: ', 'event_espresso'); ?>
	</label>
	<input id="reg-limit" name="reg_limit"  size="10" type="text" value="<?php echo $event->reg_limit; ?>" /><br />
	<span>(<?php _e('leave blank for unlimited', 'event_espresso'); ?>)</span>
	</p>
	<p class="clearfix" style="clear: both;">
		<label for="group-reg"><?php _e('Allow group registrations? ', 'event_espresso'); ?></label>
		<?php echo select_input('allow_multiple', $values, $event->allow_multiple, 'id="group-reg"'); ?>
	</p>
	<p class="inputundersmall">
		<label for="max-registrants"><?php _e('Max Group Registrants: ', 'event_espresso'); ?></label>
		<input type="text" id="max-registrants" name="additional_limit" value="<?php echo $event->additional_limit; ?>" size="4" />
	</p>
	<p class="inputunder">
		<label><?php _e('Additional Attendee Registration info?', 'event_espresso'); ?></label>
		<?php echo select_input('additional_attendee_reg_info', $additional_attendee_reg_info_values, $event->event_meta['additional_attendee_reg_info']); ?>
	</p>
	<p>
		<label><?php _e('Event is Active', 'event_espresso'); ?></label>
		<?php  echo select_input('is_active', $values, $event->is_active); ?>
	</p>
	<p>
		<label><?php _e('Event Status', 'event_espresso'); ?>
			<a class="thickbox" href="#TB_inline?height=300&width=400&inlineId=status_types_info">
				<span class="question">[?]</span>
			</a>
		</label>
		<?php echo select_input('event_status', $event_status_values, $event->event_status); ?>
	</p>
	<p>
		<label><?php _e('Display  Description', 'event_espresso'); ?></label>
		<?php echo select_input('display_desc', $values, $event->display_desc); ?>
	</p>
	<p>
		<label>
			<?php _e('Display  Registration Form', 'event_espresso'); ?>
		</label>
		<?php echo select_input('display_reg_form', $values, $event->display_reg_form); ?>
	</p>
	<p class="inputunder">
		<label>
			<?php _e('Default Payment Status', 'event_espresso'); ?>
			<a class="thickbox" href="#TB_inline?height=300&amp;width=400&amp;inlineId=payment_status_info">
				<span class="question">[?]</span>
			</a>
		</label>
		<?php echo select_input('default_payment_status', $default_payment_status_values, $event->event_meta['default_payment_status']); ?>
	</p>
	<p class="inputunder">
		<label><?php _e('Alternate Registration Page', 'event_espresso'); ?>
			<a class="thickbox" href="#TB_inline?height=300&amp;width=400&amp;inlineId=external_URL_info">
				<span class="question">[?]</span>
			</a>
		</label>
		<input name="externalURL" size="20" type="text" value="<?php echo $event->externalURL; ?>">
	</p>
	<p class="inputunder">
		<label><?php _e('Alternate Email Address', 'event_espresso'); ?>
			<a class="thickbox" href="#TB_inline?height=300&width=400&inlineId=alt_email_info">
				<span class="question">[?]</span>
			</a>
		</label>
		<input name="alt_email" size="20" type="text" value="<?php echo $event->alt_email; ?>">
	</p>
	<?php
}

/* function espresso_event_editor_quick_overview_meta_box() {
  ?>

  <?php
  } */

function espresso_register_event_editor_meta_boxes() {
	global $espresso_premium;
	add_meta_box('espresso_event_editor_quick_overview', __('Quick Overview', 'event_espresso'), 'espresso_event_editor_quick_overview_meta_box', 'toplevel_page_events', 'side');
	if ($espresso_premium) {
		add_meta_box('espresso_event_editor_event_options', __('Event Options', 'event_espresso'), 'espresso_event_editor_event_options_meta_box', 'toplevel_page_events', 'side');
	} else {
		add_meta_box('espresso_free_event_editor_event_options', __('Event Options', 'event_espresso'), 'espresso_free_event_editor_event_options_meta_box', 'toplevel_page_events', 'side');
	}
	add_action('admin_footer', 'espresso_admin_page_footer');
}

add_action('current_screen', 'espresso_register_event_editor_meta_boxes');