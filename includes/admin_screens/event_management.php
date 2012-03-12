<?php
if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

function event_espresso_manage_events() {
	global $wpdb, $org_options;
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

	if (isset($_REQUEST['action'])) {
		// These three are different views, so return after each
		switch ($_REQUEST['action']) {
			case 'csv_import':
				csv_import();
				return;
				break;
			case 'edit':
				edit_event($_REQUEST['event_id']);
				return;
				break;
			case 'add_new_event':
				add_new_event();
				return;
				break;
		}
	}
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

function add_file_loads_for_event_management_screen() {
//Update the event
	if (isset($_REQUEST['edit_action']) && $_REQUEST['edit_action'] == 'update') {
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . "event_management/update_event.php");
		update_event();
	}

	if (isset($_REQUEST['action'])) {
		switch ($_REQUEST['action']) {
			case 'copy_event':
				require_once(EVENT_ESPRESSO_INCLUDES_DIR . "event_management/copy_event.php");
				copy_event();
				break;
			case 'add':
				require_once(EVENT_ESPRESSO_INCLUDES_DIR . "event_management/insert_event.php");
				add_event_to_db();
				break;
			case 'delete':
				event_espresso_delete_event();
				break;
			case 'delete_recurrence_series':
				$r = $wpdb->get_results("SELECT id FROM " . EVENTS_DETAIL_TABLE . " ed WHERE recurrence_id = " . $_REQUEST['recurrence_id']);

				if ($wpdb->num_rows > 0) {
					foreach ($r as $row) {
						event_espresso_delete_event($row->id);
					}
				}
				break;
			case 'csv_import':
				require_once(EVENT_ESPRESSO_INCLUDES_DIR . "event_management/csv_import.php");
				break;
			case 'edit':
				require_once(EVENT_ESPRESSO_INCLUDES_DIR . "event_management/edit_event.php");
				break;
			case 'add_new_event':
				require_once(EVENT_ESPRESSO_INCLUDES_DIR . "event_management/add_new_event.php");
				break;
		}
	} else {
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . "event_management/event_list.php");
	}
}

add_action('admin_init', 'add_file_loads_for_event_management_screen');

