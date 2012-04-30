<?php
if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

function event_espresso_manage_events() {
	global $wpdb, $org_options;
	do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	define('EVENTS_ADMIN_URL', admin_url('admin.php?page=events'));


	$_REQUEST['action'] = isset($_REQUEST['action']) ? wp_strip_all_tags($_REQUEST['action']) : FALSE;

	if ($_SESSION['return_to_editor']) {
		edit_event(absint($_SESSION['event_id']));
		return;
	}

	if ($_REQUEST['action']) {
		// These three are different views, so return after each
		switch ($_REQUEST['action']) {
			case 'csv_import':
				csv_import();
				return;
				break;
			case 'edit_event':
				edit_event(absint($_REQUEST['event_id']));
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
	$load_event_list = true;
	if (isset($_REQUEST['save'])) {
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . "event_management/edit_event.php");
		$_SESSION['return_to_editor'] = TRUE;
		$load_event_list = false;
	} else {
		$_SESSION['return_to_editor'] = FALSE;
	}
	if (isset($_REQUEST['action'])) {
		switch ($_REQUEST['action']) {
			case 'copy_event':
				require_once(EVENT_ESPRESSO_INCLUDES_DIR . "event_management/copy_event.php");
				copy_event();
				break;
			case 'insert':
				require_once(EVENT_ESPRESSO_INCLUDES_DIR . "event_management/insert_event.php");
				$_SESSION['event_id'] = add_event_to_db();
				break;
			case 'update':
				require_once(EVENT_ESPRESSO_INCLUDES_DIR . "event_management/update_event.php");
				$_SESSION['event_id'] = update_event();
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
				$load_event_list = false;
				break;
			case 'edit_event':
				require_once(EVENT_ESPRESSO_INCLUDES_DIR . "event_management/edit_event.php");
				$load_event_list = false;
				break;
			case 'add_new_event':
				require_once(EVENT_ESPRESSO_INCLUDES_DIR . "event_management/add_new_event.php");
				$load_event_list = false;
				break;
		}
	}
	if ($load_event_list) {
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . "event_management/event_list.php");
	}
}

add_action('admin_init', 'add_file_loads_for_event_management_screen');

