<?php


function espresso_event_editor_quick_overview_meta_box($event) {
	?>
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
					<?php do_action('action_hook_espresso_event_editor_overview_add', $event); ?>
				</div>			
				<!-- /misc-publishing-actions -->
			</div>
			<!-- /minor-publishing -->
			
			<?php do_action('action_hook_espresso_save_buttons', $event); ?>

		</div>
		<!-- /submitpost -->
	<?php
}

function espresso_event_editor_primary_questions_group_meta_box($event) {
	$question_groups = $event->question_groups;
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
				$group_name = $question_group->group_name;
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
			if ($num_rows > 10) {
				echo '<div style="height:250px;overflow:auto;">';
			}
			foreach ($event_categories as $category) {
				$category_id = $category->id;
				$category_name = $category->category_name;

				$in_event_categories = $wpdb->get_results("SELECT * FROM " . EVENTS_CATEGORY_REL_TABLE . " WHERE event_id='" . $event_id . "' AND cat_id='" . $category_id . "'");
				foreach ($in_event_categories as $in_category) {
					$in_event_category = $in_category->cat_id;
				}
				if (empty($in_event_category))
					$in_event_category = '';
				?>
				<p id="event-category-<?php echo $category_id; ?>">
					<label for="in-event-category-<?php echo $category_id; ?>" class="selectit">
						<input value="<?php echo $category_id; ?>" type="checkbox" name="event_category[]" id="in-event-category-<?php echo $category_id; ?>"<?php echo ($in_event_category == $category_id ? ' checked="checked"' : "" ); ?>/>
						<?php echo $category_name; ?>
					</label>
				</p>
				<?php
			}
			if ($num_rows > 10) {
				echo '</div>';
			}
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

function espresso_event_editor_title_div($event) {
	?>
	<div id="titlediv">
		<div id="titlewrap">
			<h5 style="margin: 1em .5em .1em;"><?php _e('Event Title', 'event_espresso'); ?></h5>
			<input id="title" type="text" autocomplete="off" value="<?php echo $event->event_name; ?>" tabindex="1" size="30" name="event">
		</div>
		<!-- /titlewrap -->

		<div class="inside">
			<div id="edit-slug-box" style="height:auto;">

				<strong><?php _e('Permalink:', 'event_espresso'); ?></strong>

				<span id="sample-permalink">
					<?php echo $event->page_url; ?><input size="50" type="text" tabindex="2" name="slug" id="slug" value ="<?php echo $event->slug; ?>" />
				</span>

				<?php if ( ! $event->is_new ) : ?>
					<a class="button" onclick="prompt('Shortcode:', jQuery('#shortcode').val()); return false;" href="#"><?php _e('Shortcode'); ?></a>
					<a class="button" onclick="prompt('Short URL:', jQuery('#shortlink').val()); return false;" href="#"><?php _e('Short URL'); ?></a>
					<a class="button" onclick="prompt('Full URL:', jQuery('#fulllink').val()); return false;" href="#"><?php _e('Full URL'); ?></a>
					<a class="button" onclick="prompt('Unique Event Identifier:', jQuery('#identifier').val()); return false;" href="#"><?php _e('Identifier'); ?></a>
					<a class="button" target="_blank" href="<?php echo $event->page_url . $event->slug; ?>/"><?php _e('View Post'); ?></a>
				<?php endif; ?>

				<input id="shortcode" type="hidden" value='[SINGLEEVENT single_event_id="<?php echo $event->event_identifier; ?>"]'>
				<input id="shortlink" type="hidden" value="<?php echo add_query_arg(array('ee' => $event->id), $event->page_url); ?>">
				<input id="fulllink" type="hidden" value="<?php echo $event->page_url . $event->slug; ?>">
				<input id="identifier" type="hidden" value="<?php echo $event->event_identifier; ?>">
				
			</div>
			<!-- /edit-slug-box -->
		</div>
	</div>
	<?php
}

function espresso_event_editor_desc_div($event) {
	?>
	<div id="postdivrich" class="postarea">
		<?php
			$args = array("textarea_rows" => 5, "textarea_name" => "event_desc", "editor_class" => "my_editor_custom");
			wp_editor(espresso_admin_format_content($event->event_desc), "event_desc", $args);
		?>
		<table id="post-status-info" cellspacing="0">
			<tbody>
				<tr>
					<td id="wp-word-count"><?php echo __('Word count:', 'event_espresso') ?> <span class="word-count"></span></td>
					<td class="autosave-info"><span class="autosave-message"></span><span id="last-edit"></span></td>
				</tr>
			</tbody>
		</table>
	</div>
	<?php
}

function espresso_event_editor_date_time_metabox($event) {

	global $org_options, $espresso_premium;

	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

//	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Ticket.model.php');
//	$TKT_MDL = EEM_Ticket::instance();
//	
//	$all_event_tickets = $TKT_MDL->get_all_event_tickets( $event->id );

	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Datetime.model.php');
	$DTM_MDL = EEM_Datetime::instance();

	global $times;
	// grab event times
	$times = $DTM_MDL->get_all_event_dates( $event->id );
	// grab reg times
	//$reg_times = $DTM_MDL->get_all_reg_dates($event->id);
	
	$datetime_IDs = array();
	
	//printr( $times, '$times' );
	?>

	
	<div id="event-datetimes-dv" class="" >

		<table id="event-dates-and-times">
			<thead>
				<tr valign="top">
					<td> <?php echo __('Event Starts on', 'event_espresso') ?> <?php do_action('action_hook_espresso_help', 'event_date_info'); ?> </td>
					<td><?php echo __('Event Ends on', 'event_espresso') ?></td>
					<td><?php echo __('Registration Starts on', 'event_espresso') ?> <?php do_action('action_hook_espresso_help', 'reg_date_info'); ?></td>
					<td><?php echo __('Registration Ends on', 'event_espresso') ?></td>					
					<?php /* DO NOT DELETE - NEW FEATURE IN PROGRESS <td><?php echo __('Max Reg Limit', 'event_espresso'); ?></td>*/ ?>
				</tr>
			</thead>
			
			<?php $row = 1; ?>
			
			<?php foreach ($times as $time) : ?>
				<tr valign="top" id="event-dates-and-times-row-<?php echo $row; ?>">
					<td>
						<div class="small-screen-table-label"><?php echo __('Event Starts on', 'event_espresso') ?> <?php do_action('action_hook_espresso_help', 'event_date_info'); ?></div>
						<input id="event-start-<?php echo $row; ?>" name="event_datetimes[<?php echo $row; ?>][evt_start]" type="text" class="dtm-es-picker dtm-inp medium-text" value="<?php echo $time->start_date_and_time(  'Y-m-d '  ); ?>"/>
						<input name="event-start-row-<?php echo $row; ?>" type="hidden" value="<?php echo $row; ?>"/>
						<?php /* <input id="event-start-max-date-<?php echo $row; ?>" type="hidden" value=""/> */ ?>
						<?php if ($time->ID()) { ?>
						<?php $datetime_IDs[$row] = $time->ID(); ?>
						<input id="ID-<?php echo $row; ?>" name="event_datetimes[<?php echo $row; ?>][ID]" type="hidden" value="<?php echo $time->ID(); ?>"/>
						<?php } ?>						
						<input id="is-primary-<?php echo $row; ?>" name="event_datetimes[<?php echo $row; ?>][is_primary]" type="hidden" value="<?php echo $time->is_primary(); ?>" />
					</td>

					<td>
						<div class="small-screen-table-label"><?php echo __('Event Ends on', 'event_espresso') ?></div>
						<input id="event-end-<?php echo $row; ?>" name="event_datetimes[<?php echo $row; ?>][evt_end]" type="text" class="dtm-ee-picker dtm-inp medium-text" value="<?php echo $time->end_date_and_time(  'Y-m-d '  ); ?>"/>
						<input name="event-end-row_<?php echo $row; ?>" type="hidden" value="<?php echo $row; ?>"/>
						<?php /* <input id="event-end-min-date-<?php echo $row; ?>" type="hidden" value=""/> */ ?>
					</td>
					
					<td>
						<div class="small-screen-table-label"><?php echo __('Registration Starts on', 'event_espresso') ?></div>
						<input id="reg-start-<?php echo $row; ?>" name="event_datetimes[<?php echo $row; ?>][reg_start]" type="text" class="dtm-rs-picker dtm-inp medium-text" value="<?php echo $time->reg_start_date_and_time(  'Y-m-d '  ) ?>" />
						<input name="reg-start-row-<?php echo $row; ?>" type="hidden" value="<?php echo $row; ?>"/>
					</td>

					<td>
						<div class="small-screen-table-label"><?php echo __('Registration Ends on', 'event_espresso') ?></div>
						<input id="reg-end-<?php echo $row; ?>" name="event_datetimes[<?php echo $row; ?>][reg_end]" type="text" class="dtm-re-picker dtm-inp medium-text" value="<?php echo $time->reg_end_date_and_time(  'Y-m-d '  ) ?>" />
						<input name="reg-end-row_<?php echo $row; ?>" type="hidden" value="<?php echo $row; ?>"/>
					</td>
		
					<?php /* DO NOT DELETE - NEW FEATURE IN PROGRESS 
					<?php if ($org_options['time_reg_limit']) : ?>
						<td>
							<input type="text" id="reg-limit-<?php echo $row; ?>" name="event_datetimes[<?php echo $row; ?>][reg_limit]" class="small-text dtm-inp" style="text-align:right;" value="<?php echo $time->reg_limit(); ?>"/>
						</td>
					<?php endif; // time_reg_limit   ?>
					  */ ?>
					
<!--					<td>
						<input type="text" id="tckts-left-<?php echo $row; ?>" name="event_datetimes[<?php echo $row; ?>][tckts_left]" class="small-text dtm-inp" style="text-align:right;" value="<?php echo $time->tckts_left(); ?>"/>
					</td>-->
																
					<td>
						<div class="small-screen-table-label"><?php echo __('Actions', 'event_espresso') ?></div>
						<?php /* DO NOT DELETE - NEW FEATURE IN PROGRESS <a class='display-dtm-tickets-left-lnk display-ticket-manager' data-reveal-id="ticket-manager-dv" rel="<?php echo $time->ID(); ?>"  title='Display the Ticket Manager for this Date Time' style="position:relative; top:5px; margin:0 0 0 10px; font-size:.9em; cursor:pointer;" >
							<img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/icons/tickets-1-16x16.png" width="16" height="16" alt="<?php _e('tickets left', 'event_espresso'); ?>"/>
						</a> */ ?>
						<a class='clone-date-time dtm-inp-btn' rel='<?php echo $row; ?>' title='<?php _e('Clone this Event Date and Time', 'event_espresso'); ?>' style='position:relative; top:5px; margin:0 0 0 10px; font-size:.9em; cursor:pointer;'>
							<img src='<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/icons/clone-trooper-16x16.png' width='16' height='16' alt='<?php _e('clone', 'event_espresso'); ?>'/>
						</a>
				<?php if ( $row != 1 ) : ?>
						<a class='remove-xtra-time dtm-inp-btn' rel='<?php echo $row; ?>' title='<?php _e('Remove this Event Date and Time', 'event_espresso'); ?>' style='position:relative; top:6px; margin:0 0 0 10px; font-size:.9em; cursor:pointer;'>
							<img src='<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/icons/trash-16x16.png' width='16' height='16' alt='<?php _e('trash', 'event_espresso'); ?>'/>
						</a>
				<?php endif; ?>
					</td>
					
				</tr>
				<?php $row++; ?>
			<?php endforeach; // ($times as $time)  ?>
		</table>
		<br class="clear"/>
		<!--<input type="button" id="add-time" class="button dtm-inp-btn" value="<?php _e('Add Additional Time', 'event_espresso'); ?>" />-->
		<a id="add-new-date-time" class="button dtm-inp-btn" ><?php _e('Add New Dates &amp; Times', 'event_espresso'); ?></a>
		<br class="clear"/><br/>
	</div>

	
	<div id="timezones-datetimes-dv" class="">

		<?php if ((!isset($org_options['use_event_timezones']) || $org_options['use_event_timezones'] ) && $espresso_premium === TRUE) : ?>
			<span class="run-in"> <?php _e('Current Time:', 'event_espresso'); ?> </span>
			<span class="current-date"> <?php echo date(get_option('date_format')) . ' ' . date(get_option('time_format')); ?></span>
			<?php do_action('action_hook_espresso_help', 'current_time_info'); ?>
			<a class="change-date-time" href="options-general.php" target="_blank"><?php _e('Change timezone and date format settings?', 'event_espresso'); ?></a>
		<?php endif; ?>

		<?php if (!empty($org_options['use_event_timezones']) && $espresso_premium === TRUE) : ?>
			<h6> <?php _e('Event Timezone:', 'event_espresso') ?> </h6>
			<?php echo eventespresso_ddtimezone($event->id) ?>
		<?php endif; ?>

	</div>

	<input  type="hidden" name="datetime_IDs" value="<?php echo serialize( $datetime_IDs ); ?>"/>
	<input  type="hidden" id="process_datetimes" name="process_datetimes" value="1"/>


	<?php if ($espresso_premium) : ?>
		<script type="text/javascript">
			(function($) {
				var counter = <?php echo $row; ?>;

				$('#add-new-date-time').live('click', function(){
					var newRow = "<tr valign='top' id='event-dates-and-times-row-"+counter+"'><td><div class='small-screen-table-label'><?php echo __('Event Starts on', 'event_espresso') ?></div><input id='event-start-"+counter+"' name='event_datetimes["+counter+"][evt_start]' type='text' class='dtm-es-picker dtm-inp medium-text' value=''/><input name='event-start-row-<?php echo $row; ?>' type='hidden' value='"+counter+"'/><input id='is-primary-"+counter+"' name='event_datetimes["+counter+"][is_primary]' type='hidden' value='' /></td><td><div class='small-screen-table-label'><?php echo __('Event Ends on', 'event_espresso') ?></div><input id='event-end-"+counter+"' name='event_datetimes["+counter+"][evt_end]' type='text' class='dtm-ee-picker dtm-inp medium-text' value=''/><input name='event-end-row-<?php echo $row; ?>' type='hidden' value='"+counter+"'/></td><td><div class='small-screen-table-label'><?php echo __('Registration Starts on', 'event_espresso') ?></div><input id='reg-start-"+counter+"' name='event_datetimes["+counter+"][reg_start]' type='text' class='dtm-rs-picker dtm-inp medium-text' value='' /><input name='reg-start-row-<?php echo $row; ?>' type='hidden' value='"+counter+"'/></td><td><div class='small-screen-table-label'><?php echo __('Registration Ends on', 'event_espresso') ?></div><input id='reg-end-"+counter+"' name='event_datetimes["+counter+"][reg_end]' type='text' class='dtm-re-picker dtm-inp medium-text' value='' /><input name='reg-end-row-<?php echo $row; ?>' type='hidden' value='"+counter+"'/></td><?php /* DO NOT DELETE - NEW FEATURE IN PROGRESS <?php if ($org_options['time_reg_limit']) : ?><td><input type='text' id='reg-limit-"+counter+"' name='event_datetimes["+counter+"][reg_limit]' class='small-text dtm-inp' style='text-align:right;' value=''/></td><?php endif; // time_reg_limit   ?><td><input type='text' id='tckts-left-"+counter+"' name='event_datetimes["+counter+"][tckts_left]' class='small-text dtm-inp' style='text-align:right;' value=''/></td> */ ?><td><div class=small-screen-table-label><?php echo __('Actions', 'event_espresso') ?></div><a class='clone-date-time dtm-inp-btn' rel='"+counter+"' title='<?php _e('Clone this Event Date and Time', 'event_espresso'); ?>' style='position:relative; top:6px; margin:0 0 0 10px; font-size:.9em; cursor:pointer;'><img src='<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/icons/clone-trooper-16x16.png' width='16' height='16' alt='<?php _e('clone', 'event_espresso'); ?>'/></a><a class='remove-xtra-time dtm-inp-btn' rel='"+counter+"' title='<?php _e('Remove this Event Time', 'event_espresso'); ?>' style='position:relative; top:6px; margin:0 0 0 10px; font-size:.9em; cursor:pointer;'><img src='<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/icons/trash-16x16.png' width='16' height='16' alt='<?php _e('trash', 'event_espresso'); ?>'/></a></td></tr>";
					$('#event-dates-and-times tr:last').after( newRow );
					counter++;
				});
				

				$('.clone-date-time').live('click', function(){				
					var cloneRow = $(this).attr('rel');					
					var newRow = "<tr valign='top' id='event-dates-and-times-row-"+counter+"'><td><div class='small-screen-table-label'><?php echo __('Event Starts on', 'event_espresso') ?></div><input id='event-start-"+counter+"' name='event_datetimes["+counter+"][evt_start]' type='text' class='dtm-es-picker dtm-inp medium-text' value=''/><input name='event-start-row-<?php echo $row; ?>' type='hidden' value='"+counter+"'/><input id='is-primary-"+counter+"' name='event_datetimes["+counter+"][is_primary]' type='hidden' value='' /></td><td><div class='small-screen-table-label'><?php echo __('Event Ends on', 'event_espresso') ?></div><input id='event-end-"+counter+"' name='event_datetimes["+counter+"][evt_end]' type='text' class='dtm-ee-picker dtm-inp medium-text' value=''/><input name='event-end-row-<?php echo $row; ?>' type='hidden' value='"+counter+"'/></td><td><div class='small-screen-table-label'><?php echo __('Registration Starts on', 'event_espresso') ?></div><input id='reg-start-"+counter+"' name='event_datetimes["+counter+"][reg_start]' type='text' class='dtm-rs-picker dtm-inp medium-text' value='' /><input name='reg-start-row-<?php echo $row; ?>' type='hidden' value='"+counter+"'/></td><td><div class='small-screen-table-label'><?php echo __('Registration Ends on', 'event_espresso') ?></div><input id='reg-end-"+counter+"' name='event_datetimes["+counter+"][reg_end]' type='text' class='dtm-re-picker dtm-inp medium-text' value='' /><input name='reg-end-row-<?php echo $row; ?>' type='hidden' value='"+counter+"'/></td><?php /* DO NOT DELETE - NEW FEATURE IN PROGRESS <?php if ($org_options['time_reg_limit']) : ?><td><input type='text' id='reg-limit-"+counter+"' name='event_datetimes["+counter+"][reg_limit]' class='small-text dtm-inp' style='text-align:right;' value=''/></td><?php endif; // time_reg_limit   ?><td><input type='text' id='tckts-left-"+counter+"' name='event_datetimes["+counter+"][tckts_left]' class='small-text dtm-inp' style='text-align:right;' value=''/></td>  */ ?><td><div class=small-screen-table-label><?php echo __('Actions', 'event_espresso') ?></div><a class='clone-date-time dtm-inp-btn' rel='"+counter+"' title='<?php _e('Clone this Event Date and Time', 'event_espresso'); ?>' style='position:relative; top:6px; margin:0 0 0 10px; font-size:.9em; cursor:pointer;'><img src='<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/icons/clone-trooper-16x16.png' width='16' height='16' alt='<?php _e('clone', 'event_espresso'); ?>'/></a><a class='remove-xtra-time dtm-inp-btn' rel='"+counter+"' title='<?php _e('Remove this Event Time', 'event_espresso'); ?>' style='position:relative; top:6px; margin:0 0 0 10px; font-size:.9em; cursor:pointer;'><img src='<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/icons/trash-16x16.png' width='16' height='16' alt='<?php _e('trash', 'event_espresso'); ?>'/></a></td></tr>";
					$('#event-dates-and-times-row-'+cloneRow).after( newRow );
					$('#event-start-'+counter).val( $('#event-start-'+(cloneRow)).val() );
					$('#event-end-'+counter).val( $('#event-end-'+(cloneRow)).val() );
					$('#reg-start-'+counter).val( $('#reg-start-'+(cloneRow)).val() );
					$('#reg-end-'+counter).val( $('#reg-end-'+(cloneRow)).val() );
					<?php /* DO NOT DELETE - NEW FEATURE IN PROGRESS 
					$('#reg-limit-'+counter).val( $('#reg-limit-'+(cloneRow)).val() );
					$('#tckts-left-'+counter).val( $('#tckts-left-'+(cloneRow)).val() );
					  */ ?>
					counter++;
				});

				$('.remove-xtra-time').live("click", function(){
					var whichRow = '#event-dates-and-times-row-' + $(this).attr('rel');
					$(whichRow).remove();
					counter--;
				});

			})(jQuery);
		</script>
	<?php endif; // $espresso_premium 
	
}





function espresso_event_editor_pricing_metabox($event) {

	global $org_options;

	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price_Type.model.php');
	$PRT = EEM_Price_Type::instance();

	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price.model.php');
	$PRC = EEM_Price::instance();

	$show_no_event_price_msg = FALSE;		
	
	global $all_prices;
	if ( ! $all_prices = $PRC->get_all_event_prices_for_admin( $event->id )) {
		$all_prices = array();
	}
	
	if ( empty( $all_prices[1] ) && empty( $all_prices[2] )) {
		$show_no_event_price_msg = TRUE;
	}
//	 echo printr( $all_prices, '$all_prices' );

	foreach ($PRT->type as $type) {
		$all_price_types[] = array('id' => $type->ID(), 'text' => $type->name());
		if ( $type->is_global() ) {
			$global_price_types[ $type->ID() ] = $type;
		} else {
			$price_types[] = array('id' => $type->ID(), 'text' => $type->name());
		}						
	}
	//echo printr( $global_price_types, '$global_price_types' );
	
	$table_class = apply_filters('filter_hook_espresso_pricing_table_class_filter', 'event_editor_pricing');
	?>


	<div id="ticket-prices-dv" class="">

	<?php if ( $show_no_event_price_msg ) : ?>
		<div class="error">
			<p><?php _e('There are currently no Prices set for this Event. Please see the Event Pricing section for more details.', 'event_espresso'); ?></p>
		</div>	
		<div id="no-ticket-prices-msg-dv">
			<p><?php _e('Please enter at lease one Event Price for this Event, or one Default Event Price to ensure that this Event displays and functions properly. Default Event Prices can be set on the <a href="'. admin_url( 'admin.php?page=pricing' ) .'">Pricing Management</a> page.', 'event_espresso'); ?></p>
		</div>
	<?php endif; ?>

	<!--<h5 id="add-new-ticket-price-h5" ><?php _e('All Prices, Discounts and Surcharges that are Currently Active for This Event', 'event_espresso'); ?></h5>-->

	<table id="event_editor_pricing" width="100%" >
		<thead>
			<tr>
				<td class="event-price-tbl-hdr-type"><b><?php //_e('Type'); ?></b></td>
				<td class="event-price-tbl-hdr-order"><b><?php _e('Order', 'event_espresso'); ?></b></td>
				<td class="event-price-tbl-hdr-name"><b><?php _e('Name', 'event_espresso'); ?></b></td>
				<!--<td style="width:2.5%; text-align:center;"></td>-->
				<td class="event-price-tbl-hdr-amount"><b><?php _e('Amount', 'event_espresso'); ?></b></td>
				<!--<td style="width:1%; text-align:center;"></td>-->
				<td class="event-price-tbl-hdr-actions"></td>
				<td class="event-price-tbl-hdr-desc"></td>
			</tr>
		</thead>
		<?php 
	$counter = 1;
	foreach ( $all_prices as $price_type => $prices ) :
		foreach ( $prices as $price ) :
			if ( ! $price->deleted() ) :
				//echo printr( $price, '$price' );
				$disabled = ! $price->is_active() ? ' disabled="disabled"' : ''; 
				$disabled_class = ! $price->is_active() ? ' input-disabled' : ''; 
				$inactive = ! $price->is_active() ? '<span class="inactice-price">'.__('inactive price - edit advanced settings to reactivate', 'event_espresso').'</span>' : FALSE; 
				if ( $price->use_dates() ){
					$today = time();
					if ( $today < $price->start_date( FALSE ) ){
						$price_date_status = '<a title="'. __('This Event Price option is not yet active', 'event_espresso') . '"><img src="'.EVENT_ESPRESSO_PLUGINFULLURL.'images/icons/timer-pending-16x22.png" width="16" height="22" alt="'. __('This Event Price option is not yet active', 'event_espresso') . '" class="price-date-status-img"/></a>';					
					} elseif ( $today > $price->start_date( FALSE ) && $today < $price->end_date( FALSE ) ) {
						$price_date_status = '<a title="'. __('This Event Price option is currently active', 'event_espresso') . '"><img src="'.EVENT_ESPRESSO_PLUGINFULLURL.'images/icons/timer-active-16x22.png" width="16" height="22" alt="'. __('This Event Price option is currently active', 'event_espresso') . '" class="price-date-status-img"/></a>';					
					} else {
						$price_date_status = '<a title="'. __('This Event Price option has expired', 'event_espresso') . '"><img src="'.EVENT_ESPRESSO_PLUGINFULLURL.'images/icons/timer-expired-16x22.png" width="16" height="22" alt="'. __('This Event Price option has expired', 'event_espresso') . '" class="price-date-status-img"/></a>';
						$disabled = ' disabled="disabled"'; 
						$disabled_class = ' input-disabled'; 
						$inactive = '<span class="inactice-price">'.__('This Event Price option has expired - edit advanced settings to reactivate', 'event_espresso').'</span>';
					}
				} else {
					$price_date_status = '';
				}
				
		?>

			<tr>
				<td colspan="6">					
					<div id="edit-event-price-<?php echo $price->ID(); ?>" class="event-price-settings-dv hidden">

						<a class="cancel-event-price-btn" rel="<?php echo $price->ID(); ?>" ><?php _e('close', 'event_espresso'); ?></a>
						
						<h6><?php _e('Edit : ', 'event_espresso'); ?><?php echo $price->name(); ?></h6>
						<?php //echo printr( $price, '$price' ); ?>
						<table class="form-table" width="100%">
							<tbody>
							
								<tr valign="top">					
									<th><label for="edit-ticket-price-PRT_ID"><?php _e('Type', 'event_espresso'); ?></label></th>
									<td>
										<?php $select_name = 'edit_ticket_price['. $price->ID() .'][PRT_ID]'; ?>
										<?php echo select_input( $select_name, $all_price_types, $price->type(), 'id="edit-ticket-price-type-ID-'.$price->ID().'" style="width:auto;"', 'edit-ticket-price-input' ); ?>
										<span class="description">&nbsp;&nbsp;<?php _e('Whether this is an Event Price, Discount, or Surcharge.', 'event_espresso'); ?></span>
										<input name="edit_ticket_price[<?php echo $price->ID()?>][PRC_ID]" type="hidden" value="<?php echo $price->ID()?>"/>
										<input name="edit_ticket_price[<?php echo $price->ID()?>][EVT_ID]" type="hidden" value="<?php echo $event->id?>"/>
										<?php $price_type = isset( $global_price_types[$price->type()] ) ? $global_price_types[$price->type()]->is_global() : FALSE; ?>
										<input name="edit_ticket_price[<?php echo $price->ID()?>][PRT_is_global]" type="hidden" value="<?php echo $price_type?>"/>
										<input name="edit_ticket_price[<?php echo $price->ID()?>][PRC_overrides]" type="hidden" value="<?php echo $price->overrides()?>"/>
										<input name="edit_ticket_price[<?php echo $price->ID()?>][PRC_deleted]" id="edit-ticket-price-PRC_deleted-<?php echo $price->ID(); ?>" type="hidden" value="<?php echo $price->deleted()?>"/>										
										<input name="edit_ticket_price[<?php echo $price->ID(); ?>][PRC_order]" id="edit-ticket-price-PRC_order-<?php echo $price->ID(); ?>" type="hidden"  value="<?php echo $PRT->type[$price->type()]->order(); ?>"/>										
										<input name="edit_ticket_price[<?php echo $price->ID()?>][use_quick_edit]" type="hidden" value="1"/>										
									</td>
								</tr>
								
								<tr valign="top">
									<th><label for="edit-ticket-price-PRC_name"><?php _e('Name', 'event_espresso'); ?></label></th>
									<td>
										<input class="edit-ticket-price-input regular-text" type="text" id="edit-ticket-price-PRC_name-<?php echo $price->ID(); ?>" name="edit_ticket_price[<?php echo $price->ID(); ?>][PRC_name]" value="<?php echo $price->name(); ?>"/>
										<span class="description">&nbsp;&nbsp;<?php _e('The name that site visitors will see for this Price.', 'event_espresso'); ?></span>
									</td>
								</tr>
								
								<tr valign="top">
									<th><label for="edit-ticket-price-PRC_desc"><?php _e('Description', 'event_espresso'); ?></label></th>
									<td>
										<input class="edit-ticket-price-input widefat" type="text" id="edit-ticket-price-PRC_desc-<?php echo $price->ID(); ?>" name="edit_ticket_price[<?php echo $price->ID(); ?>][PRC_desc]" value="<?php echo stripslashes( $price->desc() ); ?>"/><br/>
										<span class="description"><?php _e('A brief description for this Price. More for your benefit, as it is currently not displayed to site visitors.', 'event_espresso'); ?></span>
									</td>							
								</tr>
								
								<tr valign="top">
									<th><label for="edit-ticket-price-PRC_amount"><?php _e('Amount', 'event_espresso'); ?></label></th>
									<td>
										<?php $price_amount =  ($PRT->type[$price->type()]->is_percent()) ? number_format( $price->amount(), 1 ) : number_format( $price->amount(), 2 ); ?>
										<input class="edit-ticket-price-input small-text" type="text" id="edit-ticket-price-PRC_amount-<?php echo $price->ID(); ?>" name="edit_ticket_price[<?php echo $price->ID(); ?>][PRC_amount]" style="text-align:right;" value="<?php echo $price_amount; ?>"/>
										<span class="description">&nbsp;&nbsp;<?php _e('The dollar or percentage amount for this Price.', 'event_espresso'); ?></span>
									</td>
								</tr>
								
<?php /* DO NOT DELETE - NEW FEATURE IN PROGRESS 		
								<tr valign="top">
									<th><label for="edit-ticket-price-PRC_reg_limit"><?php _e('Registration Limit', 'event_espresso'); ?></label></th>
									<td>
										<input type="text" id="edit-ticket-price-PRC_reg_limit-<?php echo $price->ID(); ?>" name="edit_ticket_price[<?php echo $price->ID(); ?>][PRC_reg_limit]" class="edit-ticket-price-input small-text" style="text-align:right;" value="<?php echo $price->reg_limit(); ?>"/>
										<span class="description">&nbsp;&nbsp;<?php _e('The maximum number of attendees that can be registratered at this Price Level. Leave blank for no limit.', 'event_espresso'); ?></span>
									</td>
								</tr>
								
								<tr valign="top">
									<th><label for="edit-ticket-price-PRC_tckts_left"><?php _e('Tickets Left', 'event_espresso'); ?></label></th>
									<td>
										<input type="text" id="edit-ticket-price-PRC_tckts_left-<?php echo $price->ID(); ?>" name="edit_ticket_price[<?php echo $price->ID(); ?>][PRC_tckts_left]" class="edit-ticket-price-input small-text" style="text-align:right;" value="<?php echo $price->tckts_left(); ?>"/>
										<span class="description">&nbsp;&nbsp;<?php _e('The number of tickets left, or available spaces, at this Price Level. This field is computed and any changes made to this quatity will have no affect. To change the number of Tickets LEft you will need to manually add Attendees via the Registrations Admin page.', 'event_espresso'); ?></span>
									</td>
								</tr>
  */ ?>			
								
								<tr valign="top" class="edit-ticket-price-use-dates-tbl-row">
									<th><label><?php _e('Triggered by Date', 'event_espresso'); ?></label></th>
									<td>
										<?php $price_uses_dates = $price->use_dates();?>
										<label class="edit-ticket-price-radio-lbl">
											<?php $checked = $price_uses_dates == 1 ? ' checked="checked"' : '';?>
											<input name="edit_ticket_price[<?php echo $price->ID(); ?>][PRC_use_dates]" class="edit-ticket-price-use-dates-yes edit-ticket-price-input etp-radio" type="radio" value="1"<?php echo $checked;?> style="margin-right:5px;"/>
											<?php _e('Yes', 'event_espresso');?>
										</label>
										<label class="edit-ticket-price-radio-lbl">
											<?php $checked = $price_uses_dates == 0 ? ' checked="checked"' : '';?>
											<input name="edit_ticket_price[<?php echo $price->ID(); ?>][PRC_use_dates]" class="edit-ticket-price-use-dates-no edit-ticket-price-input etp-radio" type="radio" value="0"<?php echo $checked;?> style="margin-right:5px;"/>
											<?php _e('No', 'event_espresso');?>
										</label>
										<span class="description"><?php _e( 'If set to "Yes", then you will be able to set the dates for when this price will become active / inactive.', 'event_espresso' ); ?></span>
									</td>
								</tr>
			
								<tr valign="top">
									<th>
										<div class="edit-ticket-price-dates">
											<label for="edit_ticket_price[<?php echo $price->ID(); ?>][PRC_start_date]"><?php _e('Start Date', 'event_espresso'); ?></label>
										</div>
									</th>
									<td>
										<div class="edit-ticket-price-dates">
											<input id="edit-ticket-price-PRC_start_date-<?php echo $price->ID(); ?>" name="edit_ticket_price[<?php echo $price->ID(); ?>][PRC_start_date]" type="text" class="datepicker edit-ticket-price-input" value="<?php echo $price->start_date(); ?>" />
											<span class="description">&nbsp;&nbsp;<?php _e( sprintf( 'If the "Triggered by Date" field above is set to "Yes", then this is the date that this Event Price would become active and displayed.' ), 'event_espresso'); ?></span>
										</div>
									</td>
								</tr>
			
								<tr valign="top">
									<th>
										<div class="edit-ticket-price-dates">
										<label for="edit_ticket_price[<?php echo $price->ID(); ?>][PRC_end_date]"><?php _e('End Date', 'event_espresso'); ?></label>
										</div>
									</th>
									<td>
										<div class="edit-ticket-price-dates">
										<input id="edit-ticket-price-PRC_end_date-<?php echo $price->ID(); ?>" name="edit_ticket_price[<?php echo $price->ID(); ?>][PRC_end_date]" type="text" class="datepicker edit-ticket-price-input" value="<?php echo $price->end_date(); ?>" />
										<span class="description">&nbsp;&nbsp;<?php _e( sprintf( 'If "Triggered by Date" is set to "Yes", then this is the date that this Event Price would become inactive and no longer displayed.' ), 'event_espresso'); ?></span>
										</div>
									</td>
								</tr>			
								<?php if ( $counter > 1 ) : ?>
								<tr valign="top">
									<th><label><?php _e('Active', 'event_espresso'); ?></label></th>
									<td>
										<label class="edit-ticket-price-radio-lbl">
											<input class="edit-ticket-price-input" type="radio" name="edit_ticket_price[<?php echo $price->ID(); ?>][PRC_is_active]" value="1" style="margin-right:5px;" <?php echo $price->is_active() ? 'checked="checked"' : '' ?> />
											<?php _e('Yes', 'event_espresso');?>
										</label>
										<label class="edit-ticket-price-radio-lbl">
											<input class="edit-ticket-price-input" type="radio" name="edit_ticket_price[<?php echo $price->ID(); ?>][PRC_is_active]" value="0" style="margin-right:5px;" <?php echo ! $price->is_active() ? 'checked="checked"' : '' ?> />
											<?php _e('No', 'event_espresso');?>
										</label>
										<span class="description"><?php _e('Whether this Price is currently being used and displayed on the site.', 'event_espresso'); ?></span>
									</td>
								</tr>
								<?php else : ?>
										<input name="edit_ticket_price[<?php echo $price->ID()?>][PRC_is_active]" type="hidden" value="1"/>										
								<?php endif; ?>
							</tbody>
						</table>
			
					</div>
				</td>
			</tr>
			
			<tr>
				<td colspan="6">
					<div id="event-price-<?php echo $price->ID(); ?>" class="event-price-dv">
						<table class="ticket-price-quick-edit-tbl" width="100%">
							<tr>
							
								<td class="type-column ticket-price-quick-edit-column"> 
									<?php
									 //echo $PRT->type[$price->type()]->name(); 
									 //$select_name = 'edit_ticket_price['. $price->ID() .'][PRT_ID]'; 
									//echo select_input( $select_name, $all_price_types, $price->type(), 'id="quick-edit-ticket-price-type-ID" ', 'edit-ticket-price-input quick-edit' ); 
									?>
									<div class="small-screen-table-label"><?php echo __('Type', 'event_espresso') ?></div>
									<span><?php echo $PRT->type[$price->type()]->name() . ' ' . $price_date_status; ?></span>
								</td> 
								
								<td class="order-column ticket-price-quick-edit-column"> 
									<?php //echo $PRT->type[$price->type()]->order(); ?>
									<div class="small-screen-table-label"><?php echo __('Order', 'event_espresso') ?></div>
									<input class="edit-ticket-price-input quick-edit small-text jst-rght<?php echo $disabled_class;?>" type="text" id="quick-edit-ticket-price-PRC_order-<?php echo $price->ID(); ?>" name="quick_edit_ticket_price[<?php echo $price->ID(); ?>][PRC_order]" value="<?php echo $PRT->type[$price->type()]->order(); ?>"<?php echo $disabled; ?>/>							
								</td> 
								
								<td class="name-column ticket-price-quick-edit-column"> 
									<?php //echo $price->name(); ?>
									<div class="small-screen-table-label"><?php echo __('Name', 'event_espresso') ?></div>
									<input class="edit-ticket-price-input quick-edit regular-text<?php echo $disabled_class;?>" type="text" id="quick-edit-ticket-price-PRC_name-<?php echo $price->ID(); ?>" name="quick_edit_ticket_price[<?php echo $price->ID(); ?>][PRC_name]" value="<?php echo $price->name(); ?>" <?php echo $disabled; ?>/>
								</td> 
								
								<!--<td class="cur-sign-column ticket-price-quick-edit-column"> 
									<div class="small-screen-table-label"><?php echo __('Amount', 'event_espresso') ?></div>
									<?php echo ($PRT->type[$price->type()]->is_percent()) ?  '' : $org_options['currency_symbol']; ?>
								</td>--> 
								
								<td class="amount-column ticket-price-quick-edit-column"> 
									<div class="small-screen-table-label"><?php echo __('Amount', 'event_espresso') ?></div>
									<span class="cur-sign jst-rght"><?php echo ($PRT->type[$price->type()]->is_percent()) ?  '' : $org_options['currency_symbol']; ?></span>
									<?php $price_amount =  ($PRT->type[$price->type()]->is_percent()) ? number_format( $price->amount(), 1 ) : number_format( $price->amount(), 2 ); ?>
									<input class="edit-ticket-price-input quick-edit small-text jst-rght<?php echo $disabled_class;?>" type="text" id="quick-edit-ticket-price-PRC_amount-<?php echo $price->ID(); ?>" name="quick_edit_ticket_price[<?php echo $price->ID(); ?>][PRC_amount]" value="<?php echo $price_amount; ?>"<?php echo $disabled; ?>/>
									<span class="percent-sign jst-left"><?php echo ($PRT->type[$price->type()]->is_percent()) ? '%' : ''; ?></span>
								</td> 
								
								<!--<td class="percent-column ticket-price-quick-edit-column"> 
									<?php echo ($PRT->type[$price->type()]->is_percent()) ? '%' : ''; ?>
								</td> -->
								
<?php /* DO NOT DELETE - NEW FEATURE IN PROGRESS
								<td class="tckts-left-column" style="width:7.5%; height:2.5em; text-align:right;"> 
									<input class="edit-tickets-left-input quick-edit" type="text" id="quick-edit-ticket-price[<?php echo $price->ID(); ?>][PRC_tckts_left]" name="quick_edit_ticket_price[<?php echo $price->ID(); ?>][PRC_tckts_left]" style="width:100%;text-align:right;" value="<?php echo $price->tckts_left(); ?>" disabled="disabled"/>
								</td> 
 */ ?>
								
								<td class="edit-column ticket-price-quick-edit-column">
									<div class="small-screen-table-label"><?php echo __('Actions', 'event_espresso') ?></div>									
									<?php /* DO NOT DELETE - NEW FEATURE IN PROGRESS
									<a class='display-price-tickets-left-lnk display-ticket-manager' data-reveal-id="ticket-manager-dv" rel="<?php echo $price->ID(); ?>"  title='Display the Ticket Manager for this Event' style="cursor:pointer;" >
										<img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/icons/tickets-1-16x16.png" width="16" height="16" alt="<?php _e('tickets left', 'event_espresso'); ?>"/>
									</a>
									 */ ?>
									<a class='edit-event-price-lnk evt-prc-btn' rel="<?php echo $price->ID(); ?>"  title="Edit Advanced Settings for this Event Price">
										<img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/icons/settings-16x16.png" width="16" height="16" alt="<?php _e('edit', 'event_espresso'); ?>"/>
									</a>
									<a class='delete-event-price-lnk evt-prc-btn' rel="<?php echo $price->ID(); ?>" title="Delete this Event Price" >
										<img src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/icons/trash-16x16.png" width="16" height="16" alt="<?php _e('trash', 'event_espresso'); ?>"/>
									</a>
								</td>

								
								<td class="desc-column ticket-price-quick-edit-column"> 
									<div class="small-screen-table-label"><?php echo __('Description', 'event_espresso') ?></div>		
									<?php //echo $price->desc(); ?>
									<!--<input class="edit-ticket-price-input quick-edit widefat" type="text" id="quick-edit-ticket-price[<?php echo $price->ID(); ?>][PRC_desc]" name="quick_edit_ticket_price[<?php echo $price->ID(); ?>][PRC_desc]" value="<?php echo $price->desc(); ?>" style="width:100%;"/>-->
									<span class="description"><?php echo $inactive ? $inactive : stripslashes( $price->desc() ); ?></span>
								</td> 
								

							</tr>
						</table>
					</div>
				</td>				
			</tr>

			<?php
			endif;
			$counter++;
		endforeach;
	endforeach;
		?>
		</table>
		<br/>

		<div id="add-new-ticket-price-dv" class="hidden">
	
			<h5 id="add-new-ticket-price-h5" ><?php _e('Add New Event Price', 'event_espresso'); ?></h5>
				
			<table class="form-table">
				<tbody>
				
					<tr valign="top">					
						<th><label for="new-ticket-price-PRT_ID"><?php _e('Type', 'event_espresso'); ?></label></th>
						<td>
							<?php echo select_input( 'new_ticket_price[PRT_ID]', $price_types, 2, 'id="new-ticket-price-type-ID"', 'add-new-ticket-price-input' ); ?>
							<span class="description">&nbsp;&nbsp;<?php _e('Whether this is an Event Price, Discount, or Surcharge.', 'event_espresso'); ?></span>
							<input id="new_ticket_price-EVT_ID" name="new_ticket_price[EVT_ID]" type="hidden" value="<?php echo $event->id; ?>" />
						</td>
					</tr>
					
					<tr valign="top">
						<th><label for="new-ticket-price-PRC_name"><?php _e('Name', 'event_espresso'); ?></label></th>
						<td>
							<input class="add-new-ticket-price-input regular-text" type="text" id="new-ticket-price-PRC_name" name="new_ticket_price[PRC_name]" value=""/>
							<span class="description">&nbsp;&nbsp;<?php _e('The name that site visitors will see for this Price.', 'event_espresso'); ?></span>
						</td>
					</tr>
					
					<tr valign="top">
						<th><label for="new-ticket-price-PRC_desc"><?php _e('Description', 'event_espresso'); ?></label></th>
						<td>
							<textarea class="add-new-ticket-price-input regular-text" type="text" id="new-ticket-price[PRC_desc]" name="new_ticket_price[PRC_desc]" cols="100" rows="1" ></textarea><br/>
							<span class="description"><?php _e('A brief description for this Price. More for your benefit, as it is currently not displayed to site visitors.', 'event_espresso'); ?></span>
						</td>							
					</tr>
					
					<tr valign="top">
						<th><label for="new-ticket-price-PRC_amount"><?php _e('Amount', 'event_espresso'); ?></label></th>
						<td>
							<input class="add-new-ticket-price-input small-text" type="text" id="new-ticket-price[PRC_amount]" name="new_ticket_price[PRC_amount]" style="text-align:right;" value=""/>
							<span class="description">&nbsp;&nbsp;<?php _e('The dollar or percentage amount for this Price.', 'event_espresso'); ?></span>
						</td>
					</tr>

<?php /* DO NOT DELETE - NEW FEATURE IN PROGRESS 
					<tr valign="top">
						<th><label for="new-ticket-price-PRC_amount"><?php _e('Registration Limit', 'event_espresso'); ?></label></th>
						<td>
							<input type="text" id="new_ticket_price[PRC_reg_limit]" name="new_ticket_price[PRC_reg_limit]" class="add-new-ticket-price-input small-text" style="text-align:right;" value=""/>
							<span class="description">&nbsp;&nbsp;<?php _e('The maximum number of attendees that can be registratered at this Price Level. Leave blank for no limit.', 'event_espresso'); ?></span>
						</td>
					</tr>
*/ ?>
					
					<tr valign="top">
						<th><label><?php _e('Triggered by Date', 'event_espresso'); ?></label></th>
						<td>
							<label class="edit-ticket-price-radio-lbl">
								<input class="add-new-ticket-price-input" type="radio" name="new_ticket_price[PRC_use_dates]" value="1" style="margin-right:5px;">
								<?php _e('Yes', 'event_espresso');?>
							</label>
							<label class="edit-ticket-price-radio-lbl">
								<input class="add-new-ticket-price-input" type="radio" name="new_ticket_price[PRC_use_dates]" value="0" style="margin-right:5px;" checked="checked" />
								<?php _e('No', 'event_espresso');?>
							</label>
							<span class="description"><?php _e( 'If set to "Yes", then you will be able to set the dates for when this price will become active / inactive.', 'event_espresso' ); ?></span>
						</td>
					</tr>

					<tr valign="top">
						<th><label for="new_ticket_price[PRC_start_date]"><?php _e('Start Date', 'event_espresso'); ?></label></th>
						<td>
							<input id="new-ticket-price[PRC_start_date]" name="new_ticket_price[PRC_start_date]" type="text" class="datepicker add-new-ticket-price-input" value="" />
							<span class="description">&nbsp;&nbsp;<?php _e( sprintf( 'If the "Triggered by Date" field above is set to "Yes", then this is the date that this Event Price would become active and displayed for this Event.' ), 'event_espresso'); ?></span>
						</td>
					</tr>

					<tr valign="top">
						<th><label for="new_ticket_price[PRC_end_date]"><?php _e('End Date', 'event_espresso'); ?></label></th>
						<td>
							<input id="new-ticket-price[PRC_end_date]" name="new_ticket_price[PRC_end_date]" type="text" class="datepicker add-new-ticket-price-input" value="" />
							<span class="description">&nbsp;&nbsp;<?php _e( sprintf( 'If "Triggered by Date" is set to "Yes", then this is the date that this Event Price would become inactive and no longer displayed for this Event.' ), 'event_espresso'); ?></span>
						</td>
					</tr>			

					<tr valign="top">
						<th><label><?php _e('Active', 'event_espresso'); ?></label></th>
						<td>
							<label class="edit-ticket-price-radio-lbl">
								<input class="add-new-ticket-price-input" type="radio" name="new_ticket_price[PRC_is_active]" value="1" style="margin-right:5px;" checked="checked" />
								<?php _e('Yes', 'event_espresso');?>
							</label>
							<label class="edit-ticket-price-radio-lbl">
								<input class="add-new-ticket-price-input" type="radio" name="new_ticket_price[PRC_is_active]" value="0" style="margin-right:5px;" />
								<?php _e('No', 'event_espresso');?>
							</label>
							<span class="description"><?php _e('Whether this Price is currently being used and displayed on the site.', 'event_espresso'); ?></span>
						</td>
					</tr>
					
				</tbody>
			</table>
			<br/>

			<div>

				<div>
					<a id="hide-add-new-ticket-price" class="cancel-event-price-btn hidden" rel="add-new-ticket-price" style="left:230px;"><?php _e('cancel', 'event_espresso');?></a>
				</div>

			</div>
			
		</div>
		
		<a id="display-add-new-ticket-price" class="button-secondary display-the-hidden" rel="add-new-ticket-price">
			<?php _e('Add New Event Price', 'event_espresso'); ?>
		</a>
		<br class="clear"/><br/>
		
		<input id="edited-ticket-price-IDs" name="edited_ticket_price_IDs" type="hidden" value="" />
		
	</div>
	<?php
}




function espresso_event_editor_ticket_manager (){

	global $times, $all_prices; 
?>
	<div id="ticket-manager-dv" class="reveal-modal" >
		<h1><?php _e('Ticket Manager', 'event_espresso'); ?></h1>
		
		<?php foreach ($times as $time) : ?>
			<h5><?php echo $time->start_date( 'l F jS, Y' ) .  __(' at ', 'event_espresso') . $time->start_time(); ?></h5>
			
			<table class="ticket-manager-tbl" width="100%" >
				<thead>
					<tr>
						<td style="width:20%; padding:0 .5em;"><b><?php _e('Ticket Price', 'event_espresso'); ?></b></td>
						<td style="width:4%; text-align:center;"><b><?php _e('Reg Limit', 'event_espresso'); ?></b></td>
						<td style="width:17.5%; padding:0 .5em;"><b><?php _e('Tickets Left', 'event_espresso'); ?></b></td>
					</tr>
				</thead>
				<tbody>
				
					<tr valign="top">					
						<th><label for="new-ticket-price-PRT_ID"><?php _e('Type', 'event_espresso'); ?></label></th>
						<td>
							<?php echo select_input( 'new_ticket_price[PRT_ID]', $price_types, 2, 'id="new-ticket-price-type-ID"', 'add-new-ticket-price-input' ); ?>
							<span class="description">&nbsp;&nbsp;<?php _e('Whether this is an Event Price, Discount, or Surcharge.', 'event_espresso'); ?></span>
							<input id="new_ticket_price-EVT_ID" name="new_ticket_price[EVT_ID]" type="hidden" value="<?php echo $event->id; ?>" />
						</td>
					</tr>			

				</tbody>
			</table>
								
			<?php $row++; ?>
		<?php endforeach; // ($times as $time)  ?>
		
		<a class="close-reveal-modal">&#215;</a>
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
		<table class="form-table">
			<tr>
				<?php
				if (function_exists('espresso_venue_dd') && $org_options['use_venue_manager'] && $espresso_premium) {
					$ven_type = 'class="use-ven-manager"';
					?>
				<td valign="top" <?php echo $ven_type ?>><fieldset id="venue-manager">
							<legend><?php echo __('Venue Information', 'event_espresso') ?></legend>
							<?php if (!espresso_venue_dd()) : ?>
								<p class="info">
									<b><?php _e('You have not created any venues yet.', 'event_espresso'); ?></b>
								</p>
								<p><a href="admin.php?page=event_venues"><?php echo __('Add venues to the Venue Manager', 'event_espresso') ?></a></p>
							<?php else: ?>
								<?php echo espresso_venue_dd($event->venue_id) ?>
							<?php endif; ?>
						</fieldset>
					</td>
					<?php
				} else {
					$ven_type = 'class="manual-venue"';
					?>
					<td valign="top" <?php echo $ven_type ?>>
						<fieldset>
							<legend>
								<?php _e('Physical Location', 'event_espresso'); ?>
							</legend>
							<p>
								<label for="phys-addr">
									<?php _e('Address:', 'event_espresso'); ?>
								</label>
								<input size="20" id="phys-addr" tabindex="100"  type="text"  value="<?php echo $event->address ?>" name="address" />
								<label for="phys-addr-2"><?php _e('Address 2:', 'event_espresso'); ?></label>
								<input size="20" id="phys-addr-2" tabindex="101"  type="text"  value="<?php echo $event->address2 ?>" name="address2" />
								<label for="phys-city">
									<?php _e('City:', 'event_espresso'); ?>
								</label>
								<input size="20" id="phys-city" tabindex="102"  type="text"  value="<?php echo $event->city ?>" name="city" />
								<label for="phys-state">
									<?php _e('State:', 'event_espresso'); ?>
								</label>
								<input size="20" id="phys-state" tabindex="103"  type="text"  value="<?php echo $event->state ?>" name="state" />
								<label for="zip-postal">
									<?php _e('Zip/Postal Code:', 'event_espresso'); ?>
								</label>
								<input size="20" id="zip-postal"  tabindex="104"  type="text"  value="<?php echo $event->zip ?>" name="zip" />
								<label for="phys-country">
									<?php _e('Country:', 'event_espresso'); ?>
								</label>
								<input size="20" id="phys-country" tabindex="105"  type="text"  value="<?php echo $event->country ?>" name="country" />
								<br/>
								<?php _e('Google Map Link (for email):', 'event_espresso'); ?>
								<br />
								<?php echo $event->google_map_link; ?> </p>
						</fieldset>
					</td>
					<td valign="top" <?php echo $ven_type; ?>>

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
				<td valign="top" <?php echo $ven_type ?>>
					<fieldset id="virt-location">
						<legend>
							<?php _e('Virtual Location', 'event_espresso'); ?>
						</legend>
						<p>
							<label for="virt-phone" style="display:inline-block; width:100px;">
								<?php _e('Phone:', 'event_espresso'); ?>
							</label>
							<input size="20" id="virt-phone" type="text" tabindex="111" value="<?php echo $event->phone ?>" name="phone" />
						</p>
						<p>
							<label for="url-event" style="display:inline-block; width:100px; vertical-align:top;">
								<?php _e('URL of Event:', 'event_espresso'); ?>
							</label>
							<textarea id="url-event" cols="30" rows="4" tabindex="112"  name="virtual_url"><?php echo stripslashes_deep($event->virtual_url) ?></textarea>
						</p>
						<p>
							<label for="call-in-num" style="display:inline-block; width:100px;">
								<?php _e('Call in Number:', 'event_espresso'); ?>
							</label>
							<input id="call-in-num" size="20" tabindex="113"  type="text"  value="<?php echo stripslashes_deep($event->virtual_phone) ?>" name="virtual_phone" />
						</p>
					</fieldset>
				</td>
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

	add_action('action_hook_espresso_event_editor_title_div', 'espresso_event_editor_title_div');

	add_action('action_hook_espresso_event_editor_desc_div', 'espresso_event_editor_desc_div');

	//add_action('action_hook_espresso_event_editor_date_time_div', 'espresso_event_editor_date_time_metabox');

	add_meta_box('espresso_event_editor_date_time', __('Dates &amp; Times', 'event_espresso'), 'espresso_event_editor_date_time_metabox', 'toplevel_page_events', 'normal', 'high');

	add_meta_box('espresso_event_editor_pricing', __('Event Pricing', 'event_espresso'), 'espresso_event_editor_pricing_metabox', 'toplevel_page_events', 'normal', 'core');

	add_meta_box('espresso_event_editor_venue', __('Venue Details', 'event_espresso'), 'espresso_event_editor_venue_metabox', 'toplevel_page_events', 'normal', 'core');

	add_meta_box('espresso_event_editor_email', __('Email Confirmation:', 'event_espresso'), 'espresso_event_editor_email_metabox', 'toplevel_page_events', 'advanced', 'core');

	add_meta_box('espresso_event_editor_quick_overview', __('Quick Overview', 'event_espresso'), 'espresso_event_editor_quick_overview_meta_box', 'toplevel_page_events', 'side', 'high');

	add_meta_box('espresso_event_editor_primary_questions', __('Questions for Primary Attendee', 'event_espresso'), 'espresso_event_editor_primary_questions_group_meta_box', 'toplevel_page_events', 'side', 'core');

	add_meta_box('espresso_event_editor_categories', __('Event Category', 'event_espresso'), 'espresso_event_editor_categories_meta_box', 'toplevel_page_events', 'side', 'default');

	add_action('action_hook_espresso_event_editor_ticket_manager', 'espresso_event_editor_ticket_manager');

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

function espresso_save_buttons($event) {
	?>
		<?php wp_nonce_field('espresso_form_check', 'ee__event_editor'); ?>

		<div id="delete-action">
			<?php /*if ($event->recurrence_id > 0) : ?>
				<a class="submitdelete deletion" href="admin.php?page=events&amp;action=delete_recurrence_series&recurrence_id=<?php echo $event->recurrence_id ?>" onclick="return confirm('<?php _e('Are you sure you want to delete ' . $event->event_name . '?', 'event_espresso'); ?>')">
					<?php _e('Delete all events in this series', 'event_espresso'); ?>
				</a>
			<?php else:*/ ?>
				<a class="submitdelete deletion" href="admin.php?page=events&amp;action=delete&event_id=<?php echo $event->id ?>" onclick="return confirm('<?php _e('Are you sure you want to delete ' . $event->event_name . '?', 'event_espresso'); ?>')">
					<?php _e('Delete Event', 'event_espresso'); ?>
				</a>
			<?php //endif; ?>
		</div>
		<br/>

	<div id="event_editor_major_buttons_wrapper">	
		<div id="publishing-action">
			<input class="button-primary" type="submit" name="save" value="<?php _e('Save', 'event_espresso'); ?>" id="save" />
			<input class="button-primary" type="submit" name="save_and_close" value="<?php _e('Save And Close', 'event_espresso'); ?>" id="save_and_close" />
		</div>
		<br class="clear"/>		
	</div>
	<?php
}

add_action('action_hook_espresso_save_buttons', 'espresso_save_buttons'); 
