<?php

function event_espresso_email_config_mnu() {
	global $wpdb, $espresso_wp_user, $espresso_premium;
	if ($espresso_premium != true)
		return;
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/email-manager/add_new_email.php');
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/email-manager/edit_email.php');
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/email-manager/update_email.php');
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/email-manager/add_email_to_db.php');
	?>

	<div class="wrap">
		<div id="icon-options-event" class="icon32"> </div>
		<h2><?php echo _e('Manage Event Emails', 'event_espresso') ?>
			<?php
			if (!isset($_REQUEST['action']) || ($_REQUEST['action'] != 'edit' && $_REQUEST['action'] != 'add_new_email')) {
				echo '<a href="admin.php?page=event_emails&amp;action=add_new_email" class="button add-new-h2" style="margin-left: 20px;">' . __('Add New Email', 'event_espresso') . '</a>';
			}
			?>
		</h2>
		<div id="poststuff" class="metabox-holder has-right-sidebar">
			<div id="side-info-column" class="inner-sidebar">
				<?php do_meta_boxes('event-espresso_page_event_emails', 'side', null); ?>
			</div>
			<div id="post-body">
				<div id="post-body-content">
					<?php
					if (isset($_REQUEST['delete_email']) || (isset($_REQUEST['action']) && $_REQUEST['action'] == 'delete_email')) {
						if (!empty($_REQUEST['delete_email'])
										&& empty($_POST['checkbox'])
										&& is_array($_POST['checkbox'])
										&& !array_key_exists(1, $_POST['checkbox'])
										&& !array_key_exists(2, $_POST['checkbox'])) {
							while (list($key, $value) = each($_POST['checkbox'])):
								$del_id = $key;
								$sql = "DELETE FROM " . EVENTS_EMAIL_TABLE . " WHERE id='$del_id'";
								$wpdb->query($sql);
							endwhile;
						}elseif (!empty($_REQUEST['action'])
										&& $_REQUEST['action'] == 'delete_email'
										&& $_REQUEST['id'] != 1
										&& $_REQUEST['id'] != 2) {
							$sql = "DELETE FROM " . EVENTS_EMAIL_TABLE . " WHERE id='" . $_REQUEST['id'] . "'";
							$wpdb->query($sql);
						} else
							$failed = true;

						if (empty($failed)) {
							?>
							<div id="message" class="updated fade">
								<p><strong>
										<?php _e('Email(s) have been successfully deleted.', 'event_espresso'); ?>
									</strong></p>
							</div>
							<?php
						} else {
							?>
							<div id="message" class="updated fade">
								<p><strong>
										<?php _e('You cannot delete either of the two default emails.', 'event_espresso');
										?>
									</strong></p>
							</div>
							<?php
						}
					}
					if (isset($_REQUEST['action'])) {
						switch ($_REQUEST['action']) {
							case 'update':
								update_event_email();
								break;
							case 'add':
								add_email_to_db();
								break;
							case 'add_new_email':
								add_new_event_email();
								break;
							case 'edit':
								edit_event_email();
								break;
						}
					}
					do_action('action_hook_espresso_admin_notices');
					?>
					<form id="form1" name="form1" method="post" action="<?php echo 'admin.php?page=event_emails'; ?>">
						<table id="table" class="widefat manage-emails">
							<thead>
								<tr>
									<th class="manage-column column-cb check-column" id="cb" scope="col" style="width:3.5%;"><input type="checkbox"></th>
									<th class="manage-column column-comments num" id="id" style="padding-top:7px; width:3.5%;" scope="col" title="Click to Sort"><?php _e('ID', 'event_espresso'); ?></th>
									<th class="manage-column column-title" id="name" scope="col" title="Click to Sort" style="width:60%;"><?php _e('Name', 'event_espresso'); ?></th>
									<?php if (function_exists('espresso_is_admin') && espresso_is_admin() == true) { ?>
										<th class="manage-column column-creator" id="creator" scope="col" title="Click to Sort" style="width:10%;"><?php _e('Creator', 'event_espresso'); ?></th>
									<?php } ?>
									<th class="manage-column column-title" id="action" scope="col" title="Click to Sort" style="width:30%;"><?php _e('Action', 'event_espresso'); ?></th>
								</tr>
							</thead>
							<tbody>
								<?php
								$sql = "SELECT * FROM " . EVENTS_EMAIL_TABLE . " e";

								if (function_exists('espresso_manager_pro_version') && $_SESSION['espresso_use_selected_manager'] == true) {
									$sql .= " JOIN $wpdb->users u on u.ID = e.wp_user WHERE e.wp_user = " . $espresso_wp_user;
								} elseif (function_exists('espresso_member_data') && ( espresso_member_data('role') == 'espresso_event_manager' || espresso_member_data('role') == 'espresso_group_admin')) {
									$sql .= " JOIN $wpdb->users u on u.ID = e.wp_user WHERE e.wp_user = " . espresso_member_data('id');
								}

								$wpdb->query($sql);
								if ($wpdb->num_rows > 0) {
									$results = $wpdb->get_results($sql . " ORDER BY e.id ASC");
									foreach ($results as $result) {
										$email_id = $result->id;
										$email_name = stripslashes($result->email_name);
										$email_text = stripslashes($result->email_text);
										$wp_user = $result->wp_user;
										?>
										<tr>
											<td><input name="checkbox[<?php echo $email_id ?>]" type="checkbox"  title="Delete <?php echo stripslashes($email_name) ?>"></td>
											<td><?php echo $email_id ?></td>
											<td class="post-title page-title column-title"><strong><a href="admin.php?page=event_emails&action=edit&id=<?php echo $email_id ?>"><?php echo $email_name ?></a></strong>
												<div class="row-actions"><span class="edit"><a href="admin.php?page=event_emails&action=edit&id=<?php echo $email_id ?>">
															<?php _e('Edit', 'event_espresso'); ?>
														</a> | </span><span class="delete"><a onclick="return confirmDelete();" class="submitdelete" href="admin.php?page=event_emails&action=delete_email&id=<?php echo $email_id ?>">
															<?php _e('Delete', 'event_espresso'); ?>
														</a></span></div></td>
											<?php if (function_exists('espresso_user_meta') && espresso_is_admin() == true) { ?>
												<td><?php echo espresso_user_meta($wp_user, 'user_firstname') != '' ? espresso_user_meta($wp_user, 'user_firstname') . ' ' . espresso_user_meta($wp_user, 'user_lastname') : espresso_user_meta($wp_user, 'display_name'); ?></td>
											<?php } ?>
											<td><a href="admin.php?page=event_emails&action=edit&id=<?php echo $email_id ?>">
													<?php _e('Edit Email', 'event_espresso'); ?>
												</a></td>
										</tr>
										<?php
									}
								}
								?>
							</tbody>
						</table>
						<p>
							<input type="checkbox" name="sAll" onclick="selectAll(this)" />
							<strong>
								<?php _e('Check All', 'event_espresso'); ?>
							</strong>
							<input name="delete_email" type="submit" class="button-secondary" id="delete_email" value="<?php _e('Delete Email', 'event_espresso'); ?>" style="margin-left:100px;" onclick="return confirmDelete();">
							<?php echo '<a href="admin.php?page=event_emails&amp;action=add_new_email" style="margin-left:5px"class="button-primary">' . __('Add New Email', 'event_espresso') . '</a>'; ?> </p>
					</form>
				</div>
			</div>
		</div>
	</div>
	<script>
		jQuery(document).ready(function($) {

			/* show the table data */
			var mytable = $('#table').dataTable( {
				"bStateSave": true,
				"sPaginationType": "full_numbers",

				"oLanguage": {	"sSearch": "<strong><?php _e('Live Search Filter', 'event_espresso'); ?>:</strong>",
					"sZeroRecords": "<?php _e('No Records Found!', 'event_espresso'); ?>" },
				"aoColumns": [
					{ "bSortable": false },
					null,
					null,
	<?php echo function_exists('espresso_is_admin') && espresso_is_admin() == true ? 'null,' : ''; ?>
					null

				]

			} );

		} );
	</script>
	<?php
	echo event_espresso_custom_email_info();
}
