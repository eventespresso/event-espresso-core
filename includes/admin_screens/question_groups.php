<?php

function event_espresso_question_groups_config_mnu() {
	global $wpdb, $notices;
	//Update the questions when re-ordering
	if (!empty($_REQUEST['update_sequence'])) {
		$rows = explode(",", $_POST['row_ids']);
		for ($i = 0; $i < count($rows); $i++) {
			$wpdb->query("UPDATE " . EVENTS_QST_GROUP_TABLE . " SET group_order=" . $i . " WHERE id='" . $rows[$i] . "'");
		}
		die();
	}

	// get counts
	$sql = "SELECT id FROM " . EVENTS_QST_GROUP_TABLE;
	$wpdb->get_results($sql);
	$total_question_groups = $wpdb->num_rows;
	if (function_exists('espresso_is_admin') && espresso_is_admin() == true) {
		$sql .= " WHERE ";
		if (espresso_member_data('id') == 0 || espresso_member_data('id') == 1) {
			$sql .= " (wp_user = '0' OR wp_user = '1') ";
		} else {
			$sql .= " wp_user = '" . espresso_member_data('id') . "' ";
		}
	}
	$wpdb->get_results($sql);
	$total_self_question_groups = $wpdb->num_rows;
	?>
	<div class="wrap">
		<div id="icon-options-event" class="icon32"> </div>

		<h2><?php echo _e('Manage Question Groups', 'event_espresso') ?>
			<?php
			if (!isset($_REQUEST['action']) || ($_REQUEST['action'] != 'edit_group' && $_REQUEST['action'] != 'new_group')) {
				echo '<a href="admin.php?page=form_groups&amp;action=new_group" class="button add-new-h2" style="margin-left: 20px;">' . __('Add New Group', 'event_espresso') . '</a>';
			}
			?>
		</h2>
		<?php
		ob_start();
		do_meta_boxes('event-espresso_page_form_groups', 'side', null);
		$sidebar_content = ob_get_clean();
		ob_start();
		if (function_exists('espresso_is_admin') && espresso_is_admin() == true) {
			?>
			<div style="margin-bottom: 10px;">
				<ul class="subsubsub" style="margin-bottom: 0;clear:both;">
					<li><strong><?php _e('Question Groups', 'event_espresso'); ?>: </strong> </li>
					<li><a <?php echo ( (!isset($_REQUEST['self']) && !isset($_REQUEST['all']) ) || ( isset($_REQUEST['self']) && $_REQUEST['self'] == 'true') ) ? ' class="current" ' : '' ?> href="admin.php?page=form_groups&self=true"><?php _e('My Groups', 'event_espresso'); ?> <span class="count">(<?php echo $total_self_question_groups; ?>)</span> </a> | </li>
					<li><a <?php echo (isset($_REQUEST['all']) && $_REQUEST['all'] == 'true') ? ' class="current" ' : '' ?> href="admin.php?page=form_groups&all=true"><?php _e('All Groups', 'event_espresso'); ?> <span class="count">(<?php echo $total_question_groups; ?>)</span> </a></li>
				</ul>
				<div class="clear"></div>
			</div>
		<?php
		}
		if (isset($_REQUEST['action'])) {
			switch ($_REQUEST['action']) {
				case 'new_group':
					if (file_exists(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/admin-files/form-builder/groups/new_group.php')) {
						require_once(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/admin-files/form-builder/groups/new_group.php');
						event_espresso_form_group_new();
					} else {
						require_once(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/pricing_table.php');
					}
					break;
				case 'edit_group':
					require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'form-builder/groups/edit_group.php');
					event_espresso_form_group_edit();
					break;
				case 'insert_group':
					if (file_exists(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/admin-files/form-builder/groups/insert_group.php')) {
						require_once(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/admin-files/form-builder/groups/insert_group.php');
						event_espresso_insert_group();
					}
					break;
				case 'update_group':
					require_once(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/admin-files/form-builder/groups/update_group.php');
					event_espresso_form_group_update($_REQUEST['group_id']);
					break;
				case 'delete_group':
					if (file_exists(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/admin-files/form-builder/groups/delete_group.php')) {
						require_once(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/admin-files/form-builder/groups/delete_group.php');
						event_espresso_form_group_delete();
					} else {
						?>
						<div id="message" class="updated fade">
							<p><strong>
						<?php _e('This function is not available in the free version of Event Espresso.', 'event_espresso'); ?>
								</strong></p>
						</div>
						<?php
					}
					break;
			}
		}
		if (!empty($_REQUEST['delete_group'])) {//This is for the delete checkboxes
			if (file_exists(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/admin-files/form-builder/groups/delete_group.php')) {
				require_once(EVENT_ESPRESSO_PLUGINFULLPATH . 'includes/admin-files/form-builder/groups/delete_group.php');
				event_espresso_form_group_delete();
			} else {
				?>
				<div id="message" class="updated fade">
					<p><strong>
				<?php _e('This function is not available in the free version of Event Espresso.', 'event_espresso'); ?>
						</strong></p>
				</div>
				<?php
			}
		}
		?>
		<form id="form1" name="form1" method="post" action="<?php echo $_SERVER["REQUEST_URI"] ?>">
			<table id="table" class="widefat manage-question-group">
				<thead>
					<tr>
						<th class="manage-column" id="cb" scope="col" style="width: 2%;" ><input type="checkbox" /></th>
						<th class="manage-column column-title" id="values" scope="col" title="Click to Sort" style="width:22%;">
							<?php _e('Group Name', 'event_espresso'); ?>
						</th>
						<th class="manage-column column-title" id="type" scope="col" title="Click to Sort" style="width:23%;">
						<?php _e('Indentifier', 'event_espresso'); ?>
						</th>
						<?php if (function_exists('espresso_is_admin') && espresso_is_admin() == true) { ?>
							<th class="manage-column column-creator" id="creator" scope="col" title="Click to Sort" style="width:18%;"><?php _e('Creator', 'event_espresso'); ?></th>
							<?php } ?>
						<th class="manage-column column-title" id="required" scope="col" title="Click to Sort" style="width:35%;">
	<?php _e('Description', 'event_espresso'); ?>
						</th>
					</tr>
				</thead>
				<tbody>
					<?php
					$sql = "SELECT * FROM  " . EVENTS_QST_GROUP_TABLE;
					$sql .= " WHERE ";
					if (function_exists('espresso_member_data') && !isset($_REQUEST['all'])) {
						if (espresso_member_data('id') == 0 || espresso_member_data('id') == 1) {
							$sql .= " (wp_user = '0' OR wp_user = '1') ";
						} else {
							$sql .= " wp_user = '" . espresso_member_data('id') . "' ";
						}
					} else {
						$sql .= " (wp_user = '0' OR wp_user = '1') ";
					}
					$sql .= " ORDER BY group_order ";

					$groups = $wpdb->get_results($sql);
					if ($wpdb->num_rows > 0) {
						foreach ($groups as $group) {
							$group_id = $group->id;
							$group_name = stripslashes($group->group_name);
							$group_identifier = stripslashes($group->group_identifier);
							$group_description = stripslashes($group->group_description);
							$question = stripslashes(isset($group->question) ? $group->question : '');
							$group_order = $group->group_order;
							$system_group = $group->system_group;
							$wp_user = $group->wp_user == 0 ? 1 : $group->wp_user;
							?>
							<tr>
								<td class="checkboxcol">
									<input name="row_id" type="hidden" value="<?php echo $group_id ?>" />
									<?php if ($system_group == 0) : ?>
										<input style="margin:7px 0 22px 8px; vertical-align:top;" name="checkbox[<?php echo $group_id ?>]" type="checkbox"  title="Delete <?php echo empty($question_name) ? '' : $question_name ?>">
									<?php else: ?>
										<span><?php echo '<img style="margin:7px 0 22px 8px; vertical-align:top;" src="' . EVENT_ESPRESSO_PLUGINFULLURL . 'images/icons/lock.png" alt="System Group" title="System Group" />'; ?></span>
			<?php endif; ?>
								</td>

								<td class="post-title page-title column-title"><strong><a href="admin.php?page=form_groups&amp;action=edit_group&amp;group_id=<?php echo $group_id ?>"><?php echo $group_name ?></a></strong>
									<div class="row-actions">
										<span class="edit"><a href="admin.php?page=form_groups&amp;action=edit_group&amp;group_id=<?php echo $group_id ?>"><?php _e('Edit', 'event_espresso'); ?></a> | </span>
			<?php if ($system_group == 0) : ?><span class="delete"><a onclick="return confirmDelete();" class="submitdelete"  href="admin.php?page=form_groups&amp;action=delete_group&amp;group_id=<?php echo $group_id ?>"><?php _e('Delete', 'event_espresso'); ?></a></span><?php endif; ?>
									</div>
								</td>
								<td class="author column-author"><?php echo $group_identifier ?></td>
								<?php if (function_exists('espresso_is_admin') && espresso_is_admin() == true) { ?>
									<td><?php echo espresso_user_meta($wp_user, 'user_firstname') != '' ? espresso_user_meta($wp_user, 'user_firstname') . ' ' . espresso_user_meta($wp_user, 'user_lastname') : espresso_user_meta($wp_user, 'display_name'); ?></td>
			<?php } ?>
								<td class="author column-author"><?php echo $group_description ?></td>

							</tr>
		<?php }
	}
	?>
				</tbody>
			</table>
			<div style="clear:both">
				<p><input type="checkbox" name="sAll" onclick="selectAll(this)" />
					<strong>
	<?php _e('Check All', 'event_espresso'); ?>
					</strong>
					<input name="delete_group" type="submit" class="button-secondary" id="delete_group" value="<?php _e('Delete Question Group', 'event_espresso'); ?>"  style="margin:10 0 0 10px;" onclick="return confirmDelete();">
					<a  style="margin-left:5px"class="button-primary" href="admin.php?page=form_groups&amp;action=new_group"><?php _e('Add New Group', 'event_espresso'); ?></a>
					<a  style="margin-left:5px"class="button-primary" href="admin.php?page=form_builder"><?php _e('Questions', 'event_espresso'); ?></a>
					<a  style="color:#FFF; text-decoration:none; margin-left:5px"class="button-primary thickbox" href="#TB_inline?height=400&width=500&inlineId=group_info"><?php _e('Help', 'event_espresso'); ?></a></p>
			</div>
		</form>
	<?php $main_post_content = ob_get_clean();
	espresso_choose_layout($main_post_content, $sidebar_content);
	?>
	</div>
	<div id="group_info" class="pop-help" style="display:none">
		<div class="TB-ee-frame">
			<h2><?php _e('Question Groups Overview', 'event_espresso'); ?></h2>
			<p><?php _e('Question Groups are pre-populated groups of ', 'event_espresso'); ?> <a href="admin.php?page=form_builder"><?php _e('questions', 'event_espresso'); ?></a> <?php _e('that can be added your events. These groups of questions are what make up your customized regsistration forms. The personal information group is required for all events and is shown by default on all registration forms.', 'event_espresso'); ?></p>
			<p><?php _e('Question Groups can be organized or re-ordered by dragging and dropping individual table rows into the desired positions.', 'event_espresso'); ?></p>
		</div>
	</div>

	<script type="text/javascript">
		jQuery(document).ready(function($) {

			/* show the table data */
			var mytable = $('#table').dataTable( {
				"bStateSave": true,
				"sPaginationType": "full_numbers",

				"oLanguage": {	"sSearch": "<strong><?php _e('Live Search Filter', 'event_espresso'); ?>:</strong>",
					"sZeroRecords": "<?php _e('No Records Found!', 'event_espresso'); ?>" },
				"aoColumns": [
					{ "bSortable": true },
					null,
	<?php echo function_exists('espresso_is_admin') && espresso_is_admin() == true ? 'null,' : ''; ?>
					null,
					null
				]
			} );

			var startPosition;
			var endPosition;
			$("#table tbody").sortable({
				cursor: "move",
				start:function(event, ui){
					startPosition = ui.item.prevAll().length + 1;
				},
				update: function(event, ui) {
					endPosition = ui.item.prevAll().length + 1;
					//alert('Start Position: ' + startPosition + ' End Position: ' + endPosition);
					var row_ids="";
					$('#table tbody input[name="row_id"]').each(function(i){
						row_ids= row_ids + ',' + $(this).val();
					});
					$.post(EEGlobals.ajaxurl, { action: "update_qgr_sequence", row_ids: row_ids, update_sequence: "true"} );
				}
			});
			postboxes.add_postbox_toggles('form_groups');
		} );

		jQuery(function(){
			jQuery('#add-new-group').validate({

				rules: {
					group_name: "required"
				},
				messages: {
					group_name: "Please add a name for your group"
				}
			});

		});
	</script>

	<?php
}
