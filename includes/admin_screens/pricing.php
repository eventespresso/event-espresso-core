<?php

function espresso_price_manager_menu() {
	global $wpdb;
	$_REQUEST['action'] = isset($_REQUEST['action']) ? $_REQUEST['action'] : NULL;
	?>
	<div class="wrap">
		<div id="icon-options-event" class="icon32"> </div>
		<h2>
			<?php _e('Manage Prices', 'event_espresso'); ?>
			<?php
			if ($_REQUEST['action'] != 'edit'
							&& $_REQUEST['action'] != 'add_new_price'
							&& $_REQUEST['action'] != 'add_new_type') {
				echo '<a href="admin.php?page=event_prices&amp;action=add_new_price" class="button add-new-h2" style="margin-left: 20px;">' . __('Add New Price', 'event_espresso') . '</a>';
				echo '<a href="admin.php?page=event_prices&amp;action=add_new_type" class="button add-new-h2" style="margin-left: 20px;">' . __('Add New Type', 'event_espresso') . '</a>';
			}
			?>
		</h2>
		<div id="poststuff" class="metabox-holder has-right-sidebar">
			<div id="side-info-column" class="inner-sidebar">
				<?php do_meta_boxes('event-espresso_page_event_prices', 'side', null); ?>
			</div>
			<div id="post-body">
				<div id="post-body-content">
					<?php
					if (isset($_POST['delete_price_type']) || (isset($_REQUEST['action']) && $_REQUEST['action'] == 'delete_price_type')) {
						//Checkboxes
						if (is_array($_POST['checkbox'])) {
							while (list($key, $value) = each($_POST['checkbox'])):
								$del_id = $key;
								$sql = "SELECT PRC_id FROM " . ESP_PRICE_TABLE . " WHERE PRT_id='$del_id'";
								$row = $wpdb->get_row($sql, ARRAY_N);
								foreach ($row as $entry) {
									$new_checkbox_list[$entry] = true;
								}
								//Delete venue data
								$sql = "DELETE FROM " . ESP_PRICE_TYPE . " WHERE id='$del_id'";
								$wpdb->query($sql);
							endwhile;
						}

						//Delete link
						if ($_REQUEST['action'] == 'delete_price') {
							$sql = "SELECT PRC_id FROM " . ESP_PRICE_TABLE . " WHERE PRT_id='" . $_REQUEST['id'] . "'";
								$row = $wpdb->get_row($sql, ARRAY_N);
								foreach ($row as $entry) {
									$new_checkbox_list[$entry] = true;
								}
							$sql = "DELETE FROM " . ESP_PRICE_TYPE . " WHERE id='" . $_REQUEST['id'] . "'";
							$wpdb->query($sql);
						}
						?>
						<div id="message" class="updated fade">
							<p><strong>
									<?php _e('Price Types have been successfully deleted.', 'event_espresso'); ?>
								</strong></p>
						</div>
						<?php
						if (!empty($new_checkbox_list)) {
							$_REQUEST['action'] = 'delete_price';
							unset($_POST['checkbox']);
							$_POST['checkbox'] = $new_checkbox_list;
						}
					}
					if (isset($_POST['delete_price']) || (isset($_REQUEST['action']) && $_REQUEST['action'] == 'delete_price')) {
						//Checkboxes
						if (is_array($_POST['checkbox'])) {
							while (list($key, $value) = each($_POST['checkbox'])):
								$del_id = $key;
								//Delete venue data
								$sql = "DELETE FROM " . ESP_PRICE_TABLE . " WHERE PRC_id='$del_id'";
								$wpdb->query($sql);

								$sql = "DELETE FROM " . ESP_EVENT_PRICE_TABLE . " WHERE PRC_id='$del_id'";
								$wpdb->query($sql);
							endwhile;
						}

						//Delete link
						if ($_REQUEST['action'] == 'delete_price') {
							//Delete discount data
							$sql = "DELETE FROM " . ESP_PRICE_TABLE . " WHERE PRC_id='" . $_REQUEST['id'] . "'";
							$wpdb->query($sql);
							$sql = "DELETE FROM " . ESP_EVENT_PRICE_TABLE . " WHERE PRC_id='" . $_REQUEST['id'] . "'";
							$wpdb->query($sql);
						}
						?>
						<div id="message" class="updated fade">
							<p><strong>
									<?php _e('Prices have been successfully deleted.', 'event_espresso'); ?>
								</strong></p>
						</div>
						<?php
					}
					if (isset($_REQUEST['action']) && $_REQUEST['action'] == 'update_price') {
						require_once("update_price.php");
						update_event_price();
					}
					if (isset($_REQUEST['action']) && $_REQUEST['action'] == 'add_price') {
						require_once("add_price_to_db.php");
						add_price_to_db();
					}
					if (isset($_REQUEST['action']) && $_REQUEST['action'] == 'add_new_price') {
						require_once("add_new_price.php");
						add_new_event_price();
					}
					if (isset($_REQUEST['action']) && $_REQUEST['action'] == 'edit_price') {
						require_once("edit_price.php");
						edit_event_price();
					}
					if (isset($_REQUEST['action']) && $_REQUEST['action'] == 'update_type') {
						require_once("update_price_type.php");
						update_event_price_type();
					}
					if (isset($_REQUEST['action']) && $_REQUEST['action'] == 'add_type') {
						require_once("add_price_type_to_db.php");
						add_price_type_to_db();
					}
					if (isset($_REQUEST['action']) && $_REQUEST['action'] == 'add_new_price_type') {
						require_once("add_new_price_type.php");
						add_new_event_price_type();
					}
					if (isset($_REQUEST['action']) && $_REQUEST['action'] == 'edit_type') {
						require_once("edit_price_type.php");
						edit_event_price_type();
					}
					do_action('action_hook_espresso_admin_notices');
					?>
					<form id="form1" name="form1" method="post" action="<?php echo $_SERVER["REQUEST_URI"] ?>">
						<table id="table" class="widefat manage-discounts">
							<thead>
								<tr>
									<th class="manage-column column-cb check-column" id="cb" scope="col" style="width:2.5%;"><input type="checkbox"></th>
									<th class="manage-column column-comments num" id="id" style="padding-top:7px; width:2.5%;" scope="col" title="Click to Sort"><?php _e('ID', 'event_espresso'); ?></th>
									<th class="manage-column column-title" id="PRC_name" scope="col" title="Click to Sort" style="width:20%;"><?php _e('Name', 'event_espresso'); ?></th>
									<th class="manage-column column-title" id="PRC_amount" scope="col" title="Click to Sort" style="width:20%;"><?php _e('Amount', 'event_espresso'); ?></th>
									<th class="manage-column column-title" id="PRT_name" scope="col" title="Click to Sort" style="width:20%;"><?php _e('Type', 'event_espresso'); ?></th>
									<th class="manage-column column-title" id="PRC_is_active" scope="col" title="Click to Sort" style="width:20%;"><?php _e('Globally Active?', 'event_espresso'); ?></th>
								</tr>
							</thead>
							<?php
							$sql = "SELECT * FROM " . ESP_PRICE_TABLE . " prc";
							$sql .= " JOIN " . ESP_PRICE_TYPE . " prt ON prc.PRT_id = prt.PRT_id ";
							$sql .= " ORDER BY prc.PRC_id ASC";
							$results = $wpdb->get_results($sql);
							foreach ($results as $result) {
								?>
								<tr>
									<td class="check-column" style="padding:7px 0 22px 5px; vertical-align:top;"><input name="checkbox[<?php echo $result->PRC_id ?>]" type="checkbox"  title="Delete <?php echo stripslashes_deep($result->PRC_name) ?>"></td>
									<td class="column-comments" style="padding-top:3px;"><?php echo $result->PRC_id ?></td>
									<td class="post-title page-title column-title"><strong><a href="admin.php?page=event_prices&action=edit&id=<?php echo $result->PRC_id ?>"><?php echo stripslashes_deep($result->PRC_name) ?></a></strong>
										<div class="row-actions"> <span class="edit"><a href="admin.php?page=event_prices&action=edit&id=<?php echo $result->PRC_id ?>">
													<?php _e('Edit', 'event_espresso'); ?>
												</a> | </span> <span class="delete"><a onclick="return confirmDelete();" class="submitdelete" href="admin.php?page=event_prices&action=delete_price&id=<?php echo $result->PRC_id ?>">
													<?php _e('Delete', 'event_espresso'); ?>
												</a></span> </div>
									</td>
									<td>
										<?php echo $result->PRC_amount; ?>
									</td>
									<td>
										<?php echo $result->PRT_name; ?>
									</td>
									<td>
										<?php echo $result->PRC_is_active; ?>
									</td>
									<?php
								}
								?>
								</tbody>
						</table>
						<div style="clear:both">
							<p>
								<input type="checkbox" name="sAll" onclick="selectAll(this)" />
								<strong>
									<?php _e('Check All', 'event_espresso'); ?>
								</strong>
								<input name="delete_price" type="submit" class="button-secondary" id="delete_price" value="<?php _e('Delete Price', 'event_espresso'); ?>" style="margin-left:10px 0 0 10px;" onclick="return confirmDelete();">
								<a  style="margin-left:5px"class="button-primary" href="admin.php?page=event_prices&amp;action=add_new_price">
									<?php _e('Add New Price', 'event_espresso'); ?>
								</a> </p>
						</div>
					</form>
					<form id="form2" name="form2" method="post" action="<?php echo $_SERVER["REQUEST_URI"] ?>">
						<table id="table" class="widefat manage-discounts">
							<thead>
								<tr>
									<th class="manage-column column-cb check-column" id="cb" scope="col" style="width:2.5%;"><input type="checkbox"></th>
									<th class="manage-column column-comments num" id="PRT_id" style="padding-top:7px; width:2.5%;" scope="col" title="Click to Sort"><?php _e('ID', 'event_espresso'); ?></th>
									<th class="manage-column column-title" id="PRT_name" scope="col" title="Click to Sort" style="width:20%;"><?php _e('Name', 'event_espresso'); ?></th>
									<th class="manage-column column-title" id="PRT_is_tax" scope="col" title="Click to Sort" style="width:10%;"><?php _e('Tax?', 'event_espresso'); ?></th>
									<th class="manage-column column-title" id="PRT_is_percent" scope="col" title="Click to Sort" style="width:10%;"><?php _e('Percent?', 'event_espresso'); ?></th>
									<th class="manage-column column-title" id="PRT_is_global" scope="col" title="Click to Sort" style="width:10%;"><?php _e('Global?', 'event_espresso'); ?></th>
									<th class="manage-column column-title" id="PRT_order" scope="col" title="Click to Sort" style="width:10%;"><?php _e('Order', 'event_espresso'); ?></th>
								</tr>
							</thead>
							<?php
							$sql = "SELECT * FROM " . ESP_PRICE_TYPE;
							$sql .= " ORDER BY PRT_id ASC";
							$results = $wpdb->get_results($sql);
							foreach ($results as $result) {
								?>
								<tr>
									<td class="check-column" style="padding:7px 0 22px 5px; vertical-align:top;"><input name="checkbox[<?php echo $result->PRT_id ?>]" type="checkbox"  title="Delete <?php echo stripslashes_deep($result->PRT_name) ?>"></td>
									<td class="column-comments" style="padding-top:3px;"><?php echo $result->PRC_id ?></td>
									<td class="post-title page-title column-title"><strong><a href="admin.php?page=event_prices&action=edit_price_type&id=<?php echo $result->PRT_id ?>"><?php echo stripslashes_deep($result->PRT_name) ?></a></strong>
										<div class="row-actions"> <span class="edit"><a href="admin.php?page=event_prices&action=edit_price_type&id=<?php echo $result->PRT_id ?>">
													<?php _e('Edit', 'event_espresso'); ?>
												</a> | </span> <span class="delete"><a onclick="return confirmDelete();" class="submitdelete" href="admin.php?page=event_prices&action=delete_price_type&id=<?php echo $result->PRT_id ?>">
													<?php _e('Delete', 'event_espresso'); ?>
												</a></span> </div>
									</td>
									<td>
										<?php echo $result->PRC_is_tax; ?>
									</td>
									<td>
										<?php echo $result->PRC_is_percent; ?>
									</td>
									<td>
										<?php echo $result->PRT_is_global; ?>
									</td>
									<td>
										<?php echo $result->PRT_order; ?>
									</td>
									<?php
								}
								?>
								</tbody>
						</table>
						<div style="clear:both">
							<p>
								<input type="checkbox" name="sAll" onclick="selectAll(this)" />
								<strong>
									<?php _e('Check All', 'event_espresso'); ?>
								</strong>
								<input name="delete_price_type" type="submit" class="button-secondary" id="delete_price_type" value="<?php _e('Delete Price Type', 'event_espresso'); ?>" style="margin-left:10px 0 0 10px;" onclick="return confirmDelete();">
								<a  style="margin-left:5px"class="button-primary" href="admin.php?page=event_prices&amp;action=add_new_price_type">
									<?php _e('Add New Price Type', 'event_espresso'); ?>
								</a> </p>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
	<?php
}