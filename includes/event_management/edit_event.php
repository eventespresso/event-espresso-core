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

	if (apply_filters('filter_hook_espresso_event_editor_permissions', true, $event->id)) {
		espresso_display_edit_event($event);
		do_action('action_hook_espresso_event_editor_footer');
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
						<?php do_meta_boxes('toplevel_page_events', 'normal', $event); ?>
						<?php do_meta_boxes('toplevel_page_events', 'advanced', $event); ?>
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

function espresso_event_editor_title_metabox($event) {
	global $org_options;
	?>
	<div id="titlewrap">
		<label class="screen-reader-text" for="title">
			<?php _e('Event Title', 'event_espresso'); ?>
		</label>
		<input type="text" name="event" size="30" tabindex="1" value="<?php echo $event->event_name; ?>" id="title" autocomplete="off" />
	</div>
	<!-- /titlewrap -->
	<div class="inside">
		<div id="edit-slug">
			<p>
				<strong> <?php _e('Permalink:', 'event_espresso'); ?> </strong> <?php echo get_permalink($org_options['event_page_id']) ?><input size="30" type="text" tabindex="2" name="slug" id="slug" value ="<?php echo $event->slug; ?>" /><br />
				<?php echo '<a href="#" class="button" onclick="prompt(&#39;Event Shortcode:&#39;, \'[SINGLEEVENT single_event_id=&#34;' . $event->event_identifier . '&#34;]\'); return false;">' . __('Shortcode') . '</a>' ?> <?php echo '<a href="#" class="button" onclick="prompt(&#39;Short URL:&#39;, \'' . espresso_short_reg_url($event->id) . '\'); return false;">' . __('Short URL') . '</a>' ?> <?php echo '<a href="#" class="button" onclick="prompt(&#39;Full URL:&#39;, \'' . espresso_reg_url($event->id, $event->slug) . '\'); return false;">' . __('Full URL') . '</a>' ?> <?php echo '<a href="#" class="button" onclick="prompt(&#39;Unique Event Identifier:&#39;, \'' . $event->event_identifier . '\'); return false;">' . __('Identifier') . '</a>' ?>
			</p>
		</div>
		<!-- /edit-slug-box -->
	</div>
	<?php
}

function espresso_event_editor_description_metabox($event) {
	if (function_exists('wp_editor')) {
		$args = array("textarea_rows" => 5, "textarea_name" => "event_desc", "editor_class" => "my_editor_custom");
		wp_editor(espresso_admin_format_content($event->event_desc), "event_desc", $args);
	} else {
		/*
		  This is the editor used by WordPress. It is very very hard to find documentation for this thing, so I pasted everything I could find below.
		  param: string $content Textarea content.
		  param: string $id Optional, default is 'content'. HTML ID attribute value.
		  param: string $prev_id Optional, default is 'title'. HTML ID name for switching back and forth between visual editors.
		  param: bool $media_buttons Optional, default is true. Whether to display media buttons.
		  param: int $tab_index Optional, default is 2. Tabindex for textarea element.
		 */
		//the_editor($content, $id = 'content', $prev_id = 'title', $media_buttons = true, $tab_index = 2)
		//the_editor(espresso_admin_format_content($event_desc), $id = 'event_desc'/* , $prev_id = 'title', $media_buttons = true, $tab_index = 3 */);
		the_editor(espresso_admin_format_content($event->event_desc), $id = 'event_desc'/* , $prev_id = 'title', $media_buttons = true, $tab_index = 3 */);
	}
	?>
	<table id="post-status-info" cellspacing="0">
		<tbody>
			<tr>
				<td id="wp-word-count"></td>
				<td class="autosave-info"><span id="autosave">&nbsp;</span></td>
			</tr>
		</tbody>
	</table>
	<?php
}

function espresso_event_editor_date_time_metabox($event) {
	global $espresso_premium;
	?>
	<div class="inside">
		<table width="100%" border="0" cellpadding="5">
			<tr valign="top">
				<td class="a"><fieldset id="add-reg-dates">
						<legend>
							<?php _e('Registration Dates', 'event_espresso'); ?>
							<?php echo apply_filters('filter_hook_espresso_help', 'reg_date_info'); ?> </legend>
						<p>
							<label for="registration_start"> <?php echo __('Registration Start:', 'event_espresso') ?></label>
							<input type="text" class="datepicker" size="15" id="registration_start" name="registration_start"  value="<?php echo $event->registration_start ?>" />
						</p>
						<p>
							<label for="registration_end"><?php echo __('Registration End:', 'event_espresso') ?></label>
							<input type="text" class="datepicker" size="15" id="registration_end" name="registration_end"  value="<?php echo $event->registration_end ?>" />
						</p>
					</fieldset>
					<fieldset>
						<legend>
							<?php _e('Event Dates', 'event_espresso'); ?>
							<?php echo apply_filters('filter_hook_espresso_help', 'event_date_info'); ?> </legend>
						<p>
							<label for="start_date"><?php echo __('Event Start Date', 'event_espresso') ?></label>
							<input type="text" class="datepicker" size="15" id="start_date" name="start_date" value="<?php echo $event->start_date ?>" />
						</p>
						<p>
							<label for="end_date"><?php echo __('Event End Date', 'event_espresso') ?></label>
							<input type="text" class="datepicker" size="15" id="end_date" name="end_date" value="<?php echo $event->end_date ?>" />
						</p>
					</fieldset>
					<?php if ((!isset($org_options['use_event_timezones']) || $org_options['use_event_timezones']) && $espresso_premium == true) { ?>
						<p><span class="run-in">
								<?php _e('Current Time:', 'event_espresso'); ?>
							</span> <span class="current-date"> <?php echo date(get_option('date_format')) . ' ' . date(get_option('time_format')); ?></span> <?php echo apply_filters('filter_hook_espresso_help', 'current_time_info'); ?> <a class="change-date-time" href="options-general.php" target="_blank">
								<?php _e('Change timezone and date format settings?', 'event_espresso'); ?>
							</a></p>
					<?php } ?>
					<?php if (isset($org_options['use_event_timezones']) && $org_options['use_event_timezones'] == 'Y' && $espresso_premium == true) { ?>
						<fieldset id="event-timezone">
							<p>
								<label>
									<?php _e('Event Timezone:', 'event_espresso') ?>
								</label>
								<?php echo eventespresso_ddtimezone($event->id) ?></p>
						</fieldset>
					<?php } ?></td>
				<?php // ADD TIME REGISTRATION   ?>
				<td class="b"><fieldset id="add-register-times">
						<legend>
							<?php _e('Registration Times', 'event_espresso'); ?>
							<?php echo apply_filters('filter_hook_espresso_help', 'reg_date_info'); ?> </legend>
						<?php echo event_espresso_timereg_editor($event->id); ?>
					</fieldset>
					<fieldset id="add-event-times">
						<legend>
							<?php _e('Event Times', 'event_espresso'); ?>
							<?php echo apply_filters('filter_hook_espresso_help', 'event_times_info'); ?> </legend>
						<?php echo event_espresso_time_editor($event->id); ?>
					</fieldset></td>
			</tr>
		</table>
	</div>
	<?php
}

function espresso_event_editor_pricing_metabox($event) {
	global $espresso_premium;
	(get_option('events_members_active') == 'true') ? $members_active = 'class="members-active"' : $members_active = '';
	?>
	<div class="inside">
		<table <?php echo $members_active ?> width="100%" border="0" cellpadding="5">
			<tr valign="top">
				<td id="standard-pricing" class="a"><?php event_espresso_multi_price_update($event->id); //Standard pricing          ?></td>
				<?php
				//If the members addon is installed, define member only event settings
				if (get_option('events_members_active') == 'true' && $espresso_premium == true) {
					?>
					<td id="member-pricing" class="b"><?php echo event_espresso_member_only_pricing($event->id); //Show the the member only pricing options.            ?></td>
				<?php } ?>
			</tr>
		</table>
	</div>
	<?php
}

function espresso_event_editor_venue_metabox($event) {
	global $org_options, $espresso_premium;
	$values = array(
			array('id' => true, 'text' => __('Yes', 'event_espresso')),
			array('id' => false, 'text' => __('No', 'event_espresso'))
	);
	?>
	<div class="inside">
		<table width="100%" border="0" cellpadding="5">
			<tr valign="top">

				<?php
				if (function_exists('espresso_venue_dd') && $org_options['use_venue_manager'] == 'Y' && $espresso_premium == true) {
					$ven_type = 'class="use-ven-manager"';
					?>
					<td <?php echo $ven_type ?>><fieldset id="venue-manager">
							<legend><?php echo __('Venue Information', 'event_espresso') ?></legend>
							<?php if (!espresso_venue_dd()) : ?>
								<p class="info"><b>
										<?php _e('You have not created any venues yet.', 'event_espresso'); ?>
									</b></p>
								<p><a href="admin.php?page=event_venues"><?php echo __('Add venues to the Venue Manager', 'event_espresso') ?></a></p>
							<?php else: ?>
								<?php echo espresso_venue_dd($event->venue_id) ?>
							<?php endif; ?>
						</fieldset></td>
					<?php
				} else {
					$ven_type = 'class="manual-venue"';
					?>
					<td <?php echo $ven_type ?>><fieldset>
							<legend>
								<?php _e('Physical Location', 'event_espresso'); ?>
							</legend>
							<p>
								<label for="phys-addr">
									<?php _e('Address:', 'event_espresso'); ?>
								</label>
								<input size="20" id="phys-addr" tabindex="100"  type="text"  value="<?php echo $event->address ?>" name="address" />
							</p>
							<p>
								<label for="phys-addr-2">
									<?php _e('Address 2:', 'event_espresso'); ?>
								</label>
								<input size="20" id="phys-addr-2" tabindex="101"  type="text"  value="<?php echo $event->address2 ?>" name="address2" />
							</p>
							<p>
								<label for="phys-city">
									<?php _e('City:', 'event_espresso'); ?>
								</label>
								<input size="20" id="phys-city" tabindex="102"  type="text"  value="<?php echo $event->city ?>" name="city" />
							</p>
							<p>
								<label for="phys-state">
									<?php _e('State:', 'event_espresso'); ?>
								</label>
								<input size="20" id="phys-state" tabindex="103"  type="text"  value="<?php echo $event->state ?>" name="state" />
							</p>
							<p>
								<label for="zip-postal">
									<?php _e('Zip/Postal Code:', 'event_espresso'); ?>
								</label>
								<input size="20" id="zip-postal"  tabindex="104"  type="text"  value="<?php echo $event->zip ?>" name="zip" />
							</p>
							<p>
								<label for="phys-country">
									<?php _e('Country:', 'event_espresso'); ?>
								</label>
								<input size="20" id="phys-country" tabindex="105"  type="text"  value="<?php echo $event->country ?>" name="country" />
							</p>
							<p>
								<?php _e('Google Map Link (for email):', 'event_espresso'); ?>
								<br />
								<?php echo $event->google_map_link; ?> </p>
						</fieldset></td>
					<td <?php echo $ven_type; ?>>

						<fieldset>

							<legend>
								<?php _e('Venue Information', 'event_espresso'); ?>
							</legend>
							<p>
								<label for="ven-title">
									<?php _e('Title:', 'event_espresso'); ?>
								</label>
								<input size="20"id="ven-title" tabindex="106"  type="text"  value="<?php echo stripslashes_deep($event->venue_title) ?>" name="venue_title" />
							</p>
							<p>
								<label for="ven-website">
									<?php _e('Website:', 'event_espresso'); ?>
								</label>
								<input size="20" id="ven-website" tabindex="107"  type="text"  value="<?php echo stripslashes_deep($event->venue_url) ?>" name="venue_url" />
							</p>
							<p>
								<label for="ven-phone">
									<?php _e('Phone:', 'event_espresso'); ?>
								</label>
								<input size="20" id="ven-phone" tabindex="108"  type="text"  value="<?php echo stripslashes_deep($event->venue_phone) ?>" name="venue_phone" />
							</p>
							<p>
								<label for="ven-image">
									<?php _e('Image:', 'event_espresso'); ?>
								</label>
								<input size="20" id="ven-image" tabindex="110"  type="text"  value="<?php echo stripslashes_deep($event->venue_image) ?>" name="venue_image" />
							</p>
						<?php } ?>
				</td>

				<td <?php echo $ven_type ?>><fieldset id="virt-location">
						<legend>
							<?php _e('Virtual Location', 'event_espresso'); ?>
						</legend>
						<p>
							<label for="virt-phone">
								<?php _e('Phone:', 'event_espresso'); ?>
							</label>
							<input size="20" id="virt-phone" type="text" tabindex="111" value="<?php echo $event->phone ?>" name="phone" />
						</p>
						<p>
							<label for="url-event">
								<?php _e('URL of Event:', 'event_espresso'); ?>
							</label>
							<textarea id="url-event" cols="30" rows="4" tabindex="112"  name="virtual_url"><?php echo stripslashes_deep($event->virtual_url) ?></textarea>
						</p>
						<p>
							<label for="call-in-num">
								<?php _e('Call in Number:', 'event_espresso'); ?>
							</label>
							<input id="call-in-num" size="20" tabindex="113"  type="text"  value="<?php echo stripslashes_deep($event->virtual_phone) ?>" name="virtual_phone" />
						</p>
					</fieldset></td>
			</tr>

		</table>
		<p>
			<label for="enable_for_gmap">
				<?php _e('Enable event address in Google Maps? ', 'event_espresso') ?>
			</label>
			<?php echo select_input('enable_for_gmap', $values, isset($event->event_meta['enable_for_gmap']) ? $event->event_meta['enable_for_gmap'] : '', 'id="enable_for_gmap"') ?> </p>
	</div>
	<?php
}

function espresso_event_editor_email_metabox($event) {
	?>
	<div class="inside">
		<table class="form-table">
			<tbody>
				<tr>
					<td class="custom_emails"><fieldset id="email-manager">
							<legend><?php echo __('Email Information', 'event_espresso') ?></legend>
							<p class="info">Choose a payment confirmation email:</p>
							<?php echo espresso_email_dd('payment', $event->payment_email_id); ?>
							<p class="info">Choose a registration confirmation email:</p>
							<?php echo espresso_email_dd('confirmation', $event->confirmation_email_id); ?>
						</fieldset></td>
					<td>
						<p><a href="admin.php?page=event_emails"><?php echo __('Add emails to the Email Manager', 'event_espresso') ?></a></p>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	<?php
}

function espresso_register_event_editor_meta_boxes() {
	global $espresso_premium;

	add_meta_box('espresso_event_editor_title', __('Event Title', 'event_espresso'), 'espresso_event_editor_title_metabox', 'toplevel_page_events', 'normal', 'high');

	add_meta_box('espresso_event_editor_description', __('Event Description', 'event_espresso'), 'espresso_event_editor_description_metabox', 'toplevel_page_events', 'normal', 'high');

	add_meta_box('espresso_event_editor_date_time', __('Event Date/Times', 'event_espresso'), 'espresso_event_editor_date_time_metabox', 'toplevel_page_events', 'normal', 'high');

	add_meta_box('espresso_event_editor_pricing', __('Event Pricing', 'event_espresso'), 'espresso_event_editor_pricing_metabox', 'toplevel_page_events', 'normal', 'core');

	add_meta_box('espresso_event_editor_venue', __('Venue Details', 'event_espresso'), 'espresso_event_editor_venue_metabox', 'toplevel_page_events', 'normal', 'core');

	add_meta_box('espresso_event_editor_email', __('Email Confirmation:', 'event_espresso'), 'espresso_event_editor_email_metabox', 'toplevel_page_events', 'advanced', 'core');

	add_meta_box('espresso_event_editor_quick_overview', __('Quick Overview', 'event_espresso'), 'espresso_event_editor_quick_overview_meta_box', 'toplevel_page_events', 'side', 'high');

	add_meta_box('espresso_event_editor_primary_questions', __('Questions for Primary Attendee', 'event_espresso'), 'espresso_event_editor_primary_questions_group_meta_box', 'toplevel_page_events', 'side', 'core');

	add_meta_box('espresso_event_editor_categories', __('Event Category', 'event_espresso'), 'espresso_event_editor_categories_meta_box', 'toplevel_page_events', 'side', 'default');

	add_action('admin_footer', 'espresso_admin_page_footer');
}

add_action('current_screen', 'espresso_register_event_editor_meta_boxes');

function espresso_event_editor_footer() {
	include_once('help.php');
	?>
	<script type="text/javascript" charset="utf-8">

		//<![CDATA[
		jQuery(document).ready(function() {

			jQuery(".datepicker" ).datepicker({
				changeMonth: true,
				changeYear: true,
				dateFormat: "yy-mm-dd",
				showButtonPanel: true
			}); // close doc.ready

			var header_clicked = false;
			jQuery('#upload_image_button').click(function() {
				formfield = jQuery('#upload_image').attr('name');
				tb_show('', 'media-upload.php?type=image&amp;TB_iframe=1');
				jQuery('p.event-featured-thumb').addClass('old');
				header_clicked = true;
				return false;
			});

	<?php do_action('action_hook_espresso_premium_event_editor_footer'); ?>
		});
		//]]>
	</script>
	<?php
}

add_action('action_hook_espresso_event_editor_footer', 'espresso_event_editor_footer');