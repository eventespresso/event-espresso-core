<?php
if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');
//Add/Delete/Edit Events
require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'event-management/event_functions.php');
require_once(EVENT_ESPRESSO_INCLUDES_DIR . "admin-reports/event_list_attendees.php");

function event_espresso_manage_attendees() {
	?>
	<div id="event_overview" class="wrap meta-box-sortables ui-sortable">
		<div id="event_reg_theme" class="wrap">
			<div id="icon-options-event" class="icon32"></div>
			<h2>
				<?php
				if ($_REQUEST['page'] == 'attendees' && (isset($_REQUEST['event_admin_reports']))) {
					switch ($_REQUEST['event_admin_reports']) {
						case 'charts':
							_e('Registration Overview', 'event_espresso');
							break;
						case 'event_list_attendees':
						case 'resend_email':
						case 'list_attendee_payments':
							_e('Registration Overview', 'event_espresso');
							if (!empty($_REQUEST['event_id']) && $_REQUEST['event_admin_reports'] != 'add_new_attendee') {
								echo '<a href="admin.php?page=attendees&amp;event_admin_reports=add_new_attendee&amp;event_id=' . $_REQUEST['event_id'] . '" class="button add-new-h2" style="margin-left: 20px;">' . __('Add New Attendee', 'event_espresso') . '</a>';
							}
							break;
						case 'edit_attendee_record':
							_e('Edit Attendee Data', 'event_espresso');
							break;
						case 'enter_attendee_payments':
							_e('Edit Attendee Payment Record', 'event_espresso');
							break;
						case 'add_new_attendee':
							_e('Add New Attendee', 'event_espresso');
							break;
						case 'event_newsletter':
							_e('Email Event Attendees', 'event_espresso');
							break;
					}
				} else {
					_e('Registration Overview', 'event_espresso');
					if (isset($_REQUEST['action']) && ($_REQUEST['action'] == 'edit' || $_REQUEST['action'] == 'add_new_event')) {

					} else {
						echo '<a href="admin.php?page=events&amp;action=add_new_event" class="button add-new-h2" style="margin-left: 20px;">' . __('Add New Event', 'event_espresso') . '</a>';
					}
				}
				?>
			</h2>
			<?php
			global $wpdb, $org_options;
			if (!empty($org_options['full_logging']) && $org_options['full_logging'] == 'Y') {
				espresso_log::singleton()->log(array('file' => __FILE__, 'function' => __FUNCTION__, 'status' => ''));
			}
			if (isset($_REQUEST['event_admin_reports'])) {
				switch ($_REQUEST['event_admin_reports']) {
					case 'charts':
						require_once(EVENT_ESPRESSO_INCLUDES_DIR . "admin-reports/event_list_attendees.php");
						require_once(EVENT_ESPRESSO_INCLUDES_DIR . "admin-reports/charts.php");
						espresso_charts();
						break;
					case 'list_attendee_payments':
						require_once(EVENT_ESPRESSO_INCLUDES_DIR . "admin-reports/event_list_attendees.php");
						event_list_attendees();
						break;
					case 'event_list_attendees':
						require_once(EVENT_ESPRESSO_INCLUDES_DIR . "admin-reports/event_list_attendees.php");
						event_list_attendees();
						break;
					case 'edit_attendee_record':
						require_once(EVENT_ESPRESSO_INCLUDES_DIR . "admin-reports/event_list_attendees.php");
						require_once(EVENT_ESPRESSO_INCLUDES_DIR . "admin-reports/edit_attendee_record.php");
						edit_attendee_record();
						break;
					case 'enter_attendee_payments':
						require_once(EVENT_ESPRESSO_INCLUDES_DIR . "admin-reports/event_list_attendees.php");
						require_once(EVENT_ESPRESSO_INCLUDES_DIR . "admin-reports/enter_attendee_payments.php");
						enter_attendee_payments();
						break;
					case 'add_new_attendee':
						require_once(EVENT_ESPRESSO_INCLUDES_DIR . "admin-reports/event_list_attendees.php");
						require_once(EVENT_ESPRESSO_INCLUDES_DIR . "admin-reports/add_new_attendee.php");
						add_new_attendee($_REQUEST['event_id']);
						break;
					case 'event_newsletter':
						if (file_exists(EVENT_ESPRESSO_INCLUDES_DIR . "admin-files/event_newsletter.php")) {
							require_once(EVENT_ESPRESSO_INCLUDES_DIR . "admin-files/event_newsletter.php");
							event_newsletter($_REQUEST['event_id']);
						} else {
							require_once("event_newsletter.php");
						}

						break;
					case 'resend_email':
						require_once(EVENT_ESPRESSO_INCLUDES_DIR . "/admin-reports/event_list_attendees.php");
						echo '<div id="message" class="updated fade"><p><strong>Resending email to attendee.</strong></p></div>';
						event_espresso_email_confirmations(array('registration_id' => $_REQUEST['registration_id'], 'send_admin_email' => 'false', 'send_attendee_email' => 'true'));
						event_list_attendees();
						break;
					default:
						event_espresso_edit_list();
						break;
				}
			}else
				event_list_attendees();
			?></div>
	</div>
	<?php
}