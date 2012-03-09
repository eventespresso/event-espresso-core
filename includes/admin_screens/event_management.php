<?php
if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');
//Add/Delete/Edit Events
//require_once('event_functions.php');
//require_once("event_list.php");
//require_once("copy_event.php");
//require_once("insert_event.php");
//require_once ('csv_import.php');
//require_once("edit_event.php");
//require_once("add_new_event.php");

function event_espresso_manage_events() {
	global $wpdb, $org_options;
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	//Update the event
	if (isset($_REQUEST['edit_action']) && $_REQUEST['edit_action'] == 'update') {
		require_once("update_event.php");
		update_event();
	}

	if (isset($_REQUEST['action'])) {

		// No output, so go through to event overview
		// ToDo: convert them to notices
		if ($_REQUEST['action'] == 'copy_event') {
			copy_event();
		}
		if ($_REQUEST['action'] == 'delete') {
			event_espresso_delete_event();
		}
		//Delete recurrence series of events
		if ($_REQUEST['action'] == 'delete_recurrence_series') {
			$r = $wpdb->get_results("SELECT id FROM " . EVENTS_DETAIL_TABLE . " ed WHERE recurrence_id = " . $_REQUEST['recurrence_id']);

			if ($wpdb->num_rows > 0) {
				foreach ($r as $row) {
					event_espresso_delete_event($row->id);
				}
			}
		}
		if ($_REQUEST['action'] == 'add') {
			add_event_to_db();
		}


		// These three are different views, so return after each
		if ($_REQUEST['action'] == 'csv_import') {
			csv_import();
			return;
		}
		if ($_REQUEST['action'] == 'edit') {//show the edit form
			edit_event($_REQUEST['event_id']);
			return;
		}
		if ($_REQUEST['action'] == 'add') {//Show the add new event form
			add_new_event();
			return;
		}
	}
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . "event_management/event_list.php");
	?>
	<div id="event_reg_theme" class="wrap">
		<div id="icon-options-event" class="icon32"></div>
		<h2>
			<?php
			_e('Event Overview', 'event_espresso');
			echo '<a href="admin.php?page=events&amp;action=add_new_event" class="button add-new-h2" style="margin-left: 20px;">' . __('Add New Event', 'event_espresso') . '</a>';
			?>
		</h2>
		<?php
		event_espresso_edit_list();
		?>
	</div>
	<?php
}

