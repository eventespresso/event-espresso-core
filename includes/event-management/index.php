<?php
if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
//Add/Delete/Edit Events
require_once('event_functions.php');
require_once("event_list.php");

function event_espresso_manage_events() {
	?>
	<div id="event_overview" class="wrap meta-box-sortables ui-sortable">
		<div id="event_reg_theme" class="wrap">
			<div id="icon-options-event" class="icon32"></div>
			<h2>
				<?php
			 
					_e('Event Overview', 'event_espresso');
					if (isset($_REQUEST['action']) && ($_REQUEST['action'] == 'edit' || $_REQUEST['action'] == 'add_new_event')) {

					} else {
						echo '<a href="admin.php?page=events&amp;action=add_new_event" class="button add-new-h2" style="margin-left: 20px;">' . __('Add New Event', 'event_espresso') . '</a>';
					}
				?>
			</h2>
			<?php
			global $wpdb, $org_options;
			if (isset($_REQUEST['action'])) {
				switch ($_REQUEST['action']) {
					case ( 'copy_event' ):
						require_once("copy_event.php");
						copy_event();
						break;
					case ( 'delete' ):
						//This function is called from the "/functions/admin.php" file.
						event_espresso_delete_event();
						break;
					case ( 'delete_recurrence_series' ):

						$r = $wpdb->get_results("SELECT id FROM " . EVENTS_DETAIL_TABLE . " ed
									WHERE recurrence_id = " . $_REQUEST['recurrence_id']);

						if ($wpdb->num_rows > 0) {

							foreach ($r as $row) {

								event_espresso_delete_event($row->id);
							}
						}
						break;
					case ( 'csv_import' ):
						require_once ('csv_import.php');
						csv_import();
						break;
					case ( 'add' ):
						require_once("insert_event.php");
						add_event_to_db();
						break;
				}
			}

			//Update the event
			if (isset($_REQUEST['edit_action']) && $_REQUEST['edit_action'] == 'update') {
				require_once("update_event.php");
				update_event();
			}
			//If we need to add or edit a new event then we show the add or edit forms
			if (isset($_REQUEST['action']) && ($_REQUEST['action'] == 'add_new_event' || $_REQUEST['action'] == 'edit')) {
				?>
				<form name="form" method="post" action="<?php echo $_SERVER["REQUEST_URI"] ?>">
					<div id="poststuff" class="metabox-holder has-right-sidebar">
						<?php
						if ($_REQUEST['action'] == 'edit') {//show the edit form
							require_once("edit_event.php");
							edit_event($_REQUEST['event_id']);
						} else {//Show the add new event form
							require_once("add_new_event.php");
							add_new_event();
						}
						?>
						<br class="clear" />
					</div>
					<!-- /poststuff -->
				</form>
				<!-- /event_reg_theme -->
				<?php
			} else {
				//If we are not adding or editing an event then show the list of events
				event_espresso_edit_list();
			}
//Do not remove anything below this line. These are the info box popups.
			?></div>
	</div>
   
	<div id="alt_email_info" style="display:none">
		<h2><?php _e('Alternate Email Address', 'event_espresso'); ?></h2>
		<p><?php _e('If an alternate email address is entered. Admin email notifications wil be sent to this address instead.', 'event_espresso'); ?></p>
	</div>

	<?php
	echo event_espresso_custom_email_info();
	include_once('help.php');
}
