<?php

//Admin Dashboard Widget
// WP Event Dashboard Widget Table Function
function event_espresso_edit_list_widget() {
	global $wpdb, $org_options;
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	if (!empty($_POST['delete_event'])) {
		if (is_array($_POST['checkbox'])) {
			while (list($key, $value) = each($_POST['checkbox'])):
				$del_id = $key;
				event_espresso_delete_event($del_id);
			endwhile;
		}
		?>
		<div id="message" class="updated fade">
			<p><strong>
		<?php _e('Event(s) have been permanently deleted.', 'event_espresso'); ?>
				</strong></p>
		</div>
		<?php
	}
	?>


	<form id="form1" name="form1" method="post" action="<?php echo $_SERVER["REQUEST_URI"] ?>">
		<table id="table" class="widefat fixed" width="100%">
			<thead>
				<tr>
					<th class="manage-column column-title" id="title" scope="col" title="Click to Sort" style="width: 30%;"><?php _e('Name', 'event_espresso'); ?></th>
					<th class="manage-column column-date" id="start" scope="col" title="Click to Sort" style="width: 30%;"><?php _e('Date', 'event_espresso'); ?></th>
					<th class="manage-column column-date" id="status" scope="col" title="Click to Sort" style="width: 20%;"><?php _e('Status', 'event_espresso'); ?></th>
					<th class="manage-column column-date" id="attendees" scope="col" title="Click to Sort"  style="width: 15%;"><?php _e('Attendees', 'event_espresso'); ?></th>
				</tr>
			</thead>

			<tbody>
				<?php
				/* Events */
				//Get number of total events
				$wpdb->query("SELECT id FROM " . EVENTS_DETAIL_TABLE . " WHERE event_status != 'D'");
				$total_events = $wpdb->num_rows;
				$curdate = date("Y-m-d");

				//Get total events today
				$wpdb->query("SELECT id FROM " . EVENTS_DETAIL_TABLE . " WHERE event_status != 'D' AND start_date = '" . $curdate . "' ");
				$total_events_today = $wpdb->num_rows;

				if ($total_events > 0) {

					/* $pieces = explode('-',$curdate, 3);
					  $this_year_r = $pieces[0];
					  $this_month_r = $pieces[1];
					  //echo $this_year_r;
					  $days_this_month = date('t', strtotime($curdate)); */

					$days_in_dasboard = $org_options['events_in_dasboard'] == '' ? '30' : stripslashes_deep($org_options['events_in_dasboard']);

					$sql = "SELECT e.id event_id, e.event_name, e.event_identifier, e.reg_limit, e.registration_start, ";
					$sql .= " e.start_date, e.is_active, e.recurrence_id, e.registration_startT FROM " . EVENTS_DETAIL_TABLE . " e ";
					$sql .= " WHERE event_status != 'D' ";
					if ($total_events_today > 0) {
						$sql .= " AND start_date = '" . $curdate . "' ";
						global $how_many_events;
						$how_many_events = __('todays\' events', 'event_espresso');
					} else {
						$sql .= " AND ADDDATE('" . date('Y-m-d') . "', INTERVAL " . $days_in_dasboard . " DAY) >= start_date AND start_date >= '" . date('Y-m-d', strtotime($curdate)) . "' ";
						global $how_many_events;
						$how_many_events = __("the next $days_in_dasboard days of events", 'event_espresso');
					}
					//$sql .= " WHERE event_status != 'D' AND start_date BETWEEN '".date('Y-m-d', strtotime($this_year_r. '-' .$this_month_r . '-01'))."' AND '".date('Y-m-d', strtotime($this_year_r . '-' .$this_month_r. '-' . $days_this_month))."' ";


					$sql .= " ORDER BY e.start_date  ASC ";

					//echo $sql;
					$results = $wpdb->get_results($sql);

					foreach ($results as $result) {
						$event_id = $result->event_id;
						$event_name = stripslashes_deep($result->event_name);
						$event_identifier = stripslashes_deep($result->event_identifier);
						$reg_limit = $result->reg_limit;
						$registration_start = $result->registration_start;
						$start_date = $result->start_date;
						$end_date = $result->end_date;
						$is_active = $result->is_active;
						$status = array();
						$status = event_espresso_get_is_active($event_id);
						$recurrence_id = $result->recurrence_id;
						$registration_startT = $result->registration_startT;
						?>
						<tr>
							<td class="post-title page-title column-title"><strong><a class="row-title" href="admin.php?page=events&action=edit&event_id=<?php echo $event_id ?>"><?php echo $event_name ?></a></strong>
								<div class="row-actions"><span><a href="#">View</a> | </span><span class='edit'><a href="admin.php?page=events&amp;action=edit&amp;event_id=<?php echo $event_id ?>"><?php _e('Edit', 'event_espresso'); ?></a> | </span><span class='delete'><a onclick="return confirmDelete();" href='admin.php?page=events&amp;action=delete&amp;event_id=<?php echo $event_id ?>'><?php _e('Delete', 'event_espresso'); ?></a></span> | <span><a href="admin.php?page=attendees&amp;event_admin_reports=list_attendee_payments&amp;event_id=<?php echo $event_id ?>"><?php _e('Attendees', 'event_espresso'); ?></a> | </span><span><a href="#"><?php _e('Export', 'event_espresso'); ?></a></span></div></td>
							<td class="author column-author"><?php echo event_date_display($start_date, get_option('date_format')) ?> <br />
			<?php echo event_espresso_get_time($event_id, 'start_time') ?></td>
							<td class="date column-date"><?php echo $status['display'] ?></td>
							<td align="center" class="author column-attendees"><a href="admin.php?page=attendees&amp;event_admin_reports=list_attendee_payments&amp;event_id=<?php echo $event_id ?>"><?php echo get_number_of_attendees_reg_limit($event_id, 'num_attendees'); ?></a></td>

						</tr>
					<?php
					}
				}
				?>

			</tbody>
		</table><p>&nbsp;</p>
		<div style="clear:both"></div>
		<script>

			jQuery(document).ready(function($) {

				var mytable = $('#table').dataTable( {
					"bStateSave": true,
					"sPaginationType": "full_numbers",
					"oLanguage": {	"sSearch": "<strong><?php _e('Live Search Filter', 'event_espresso'); ?>:</strong>",
						"sZeroRecords": "<?php _e('No Records Found!', 'event_espresso'); ?>" },
					"aoColumns": [
						null,
						null,
						null,
						null
					]

				} );

			} );
		</script>

		<div style="clear:both"></div>
		<?php
	}

// Init WP Event Dashboard Widget
	add_action('wp_dashboard_setup', 'event_espresso_dashboard_widget');

	function event_espresso_dashboard_widget() {
		global $wp_meta_boxes, $org_options;
		if (!isset($org_options['espresso_dashboard_widget']) || $org_options['espresso_dashboard_widget'] != 'Y')
			return;
		wp_enqueue_script('dataTables', EVENT_ESPRESSO_PLUGINFULLURL . 'scripts/jquery.dataTables.min.js', array('jquery')); //Events core table script
		wp_add_dashboard_widget('todays_events_widget', __('Upcoming Events', 'event_espresso'), 'custom_dashboard_events');
	}

	function custom_dashboard_events() {
		event_espresso_edit_list_widget();
		global $how_many_events;
		echo '<p>A quick overview of ' . $how_many_events . '.  For a complete list of events visit the <a href="admin.php?page=events">Events Overview</a> page.</p>';
	}