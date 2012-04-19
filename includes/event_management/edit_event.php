<?php
if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

function edit_event($event_id = 0) {

	global $wpdb;

	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	define( 'EVENTS_ADMIN_URL', admin_url( 'admin.php?page=events' ));	

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

	if (apply_filters('filter_hook_espresso_event_editor_permissions', true, $event->id)) {
		espresso_display_edit_event($event);
		do_action('action_hook_espresso_event_editor_footer');
	} else {
		echo '<h2>' . __('Sorry, you do not have permission to edit this event.', 'event_espresso') . '</h2>';
	}
}

function espresso_display_edit_event($event) {

	global $org_options;
	
	$event_page_url = get_permalink($org_options['event_page_id']);
	$edit_event_form_url = add_query_arg( array( 'action' => 'edit', 'event_id' =>$event->id  ), EVENTS_ADMIN_URL );  
	?>
	<div class="wrap columns-2">
		<div id="icon-options-event" class="icon32"> </div>
		
		<h2><?php _e('Event Editor', 'event_espresso'); ?></h2>
		
		<form name="form" method="post" action="<?php echo $edit_event_form_url; ?>">
		
			<div id="poststuff" class="metabox-holder has-right-sidebar">
				<div id="side-info-column" class="inner-sidebar">
					<?php do_meta_boxes('toplevel_page_events', 'side', $event); ?>
				</div>
				<div id="post-body">
					<div id="post-body-content">
					
						<div id="titlediv">
							<div id="titlewrap">
								<label id="title-prompt-text" class="hide-if-no-js" for="title" style="visibility:hidden"><?php _e('Event Title', 'event_espresso'); ?></label>
								<input id="title" type="text" autocomplete="off" value="<?php echo $event->event_name; ?>" tabindex="1" size="30" name="event">
							</div>
							<!-- /titlewrap -->
							
							<div class="inside">
								<div id="edit-slug-box" style="height:auto;">
								
									<strong><?php _e('Permalink:', 'event_espresso'); ?></strong>

									<span id="sample-permalink">
										<?php echo $event_page_url;?><input size="50" type="text" tabindex="2" name="slug" id="slug" value ="<?php echo $event->slug; ?>" />
									</span>
									
									<a class="button" onclick="prompt('Shortcode:', jQuery('#shortcode').val()); return false;" href="#"><?php  _e('Shortcode');?></a>
									<a class="button" onclick="prompt('Short URL:', jQuery('#shortlink').val()); return false;" href="#"><?php  _e('Short URL');?></a>		
									<a class="button" onclick="prompt('Full URL:', jQuery('#fulllink').val()); return false;" href="#"><?php  _e('Full URL');?></a>		
									<a class="button" onclick="prompt('Unique Event Identifier:', jQuery('#identifier').val()); return false;" href="#"><?php  _e('Identifier');?></a>		
									<a class="button" target="_blank" href="<?php echo $event_page_url . $event->slug; ?>/"><?php  _e('View Post');?></a>
									
									<input id="shortcode" type="hidden" value='[SINGLEEVENT single_event_id="<?php echo $event->event_identifier; ?>"]'>
									<input id="shortlink" type="hidden" value="<?php echo add_query_arg( array( 'ee' => $event->id  ), $event_page_url ); ?>">
									<input id="fulllink" type="hidden" value="<?php echo $event_page_url . $event->slug; ?>">
									<input id="identifier" type="hidden" value="<?php echo $event->event_identifier; ?>">
	
								</div>
								<!-- /edit-slug-box -->
							</div>
						</div>
						
						<div id="postdivrich" class="postarea">
<?php
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
										<td id="wp-word-count"> Word count: <span class="word-count"></span></td>
										<td class="autosave-info"><span class="autosave-message"></span><span id="last-edit"></span></td>
									</tr>
								</tbody>
							</table>						
						</div>								
					
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

function espresso_event_editor_publishing_action() {
	?>
	<div id="publishing-action">
		<?php wp_nonce_field('espresso_form_check', 'ee_update_event'); ?>
		<input class="button-primary" type="submit" name="Submit" value="<?php _e('Update Event', 'event_espresso'); ?>" id="save_event_setting" />
	</div>
	<?php
}

add_action('action_hook_espresso_event_editor_publishing_action', 'espresso_event_editor_publishing_action');