<?php

function event_espresso_discount_config_mnu() {
	global $wpdb, $espresso_wp_user, $notices;
	?>

	<div class="wrap">
		<div id="icon-options-event" class="icon32"> </div>
		<h2><?php echo _e('Manage Event Promotional Codes', 'event_espresso') ?>
			<?php
			if (!isset($_REQUEST['action']) || ($_REQUEST['action'] != 'edit' && $_REQUEST['action'] != 'new')) {
				echo '<a href="admin.php?page=discounts&amp;action=new" class="button add-new-h2" style="margin-left: 20px;">' . __('Add New Code', 'event_espresso') . '</a>';
			}
			?>
		</h2>
		<?php
		ob_start();
		do_meta_boxes('event-espresso_page_discounts', 'side', null);
		$sidebar_content = ob_get_clean();
		ob_start();
		?>
		<div class="meta-box-sortables ui-sortables">
			<?php
			if (isset($_REQUEST['action'])) {
				switch ($_REQUEST['action']) {
					case 'add':
						require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/coupon-management/add_discount.php');
						add_discount_to_db(); //Add the discount to the DB
						break;
					case 'new':
						require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/coupon-management/new_discount.php');
						add_new_event_discount(); //Add new discount form
						break;
					case 'edit':
						require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/coupon-management/edit_discount.php');
						edit_event_discount(); //Edit discount form
						break;
					case 'update':
						require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/coupon-management/update_discount.php');
						update_event_discount(); //Update discount in DB
						break;
				}
			}

			if (isset($_POST['delete_discount']) || (isset($_REQUEST['action']) && $_REQUEST['action'] == 'delete_discount')) {
				if ($_REQUEST['delete_discount']) {
					if (is_array($_POST['checkbox'])) {
						while (list($key, $value) = each($_POST['checkbox'])):
							$del_id = $key;
							//Delete discount data
							$sql = "DELETE FROM " . EVENTS_DISCOUNT_CODES_TABLE . " WHERE id='" . $del_id . "'";
							$wpdb->query($sql);

							$sql = "DELETE FROM " . EVENTS_DISCOUNT_REL_TABLE . " WHERE discount_id='" . $del_id . "'";
							$wpdb->query($sql);
						endwhile;
					}
				}
				if ($_REQUEST['action'] == 'delete_discount') {
					//Delete discount data
					$sql = "DELETE FROM " . EVENTS_DISCOUNT_CODES_TABLE . " WHERE id='" . $_REQUEST['discount_id'] . "'";
					$wpdb->query($sql);

					$sql = "DELETE FROM " . EVENTS_DISCOUNT_REL_TABLE . " WHERE discount_id='" . $_REQUEST['discount_id'] . "'";
					$wpdb->query($sql);
				}
				?>
				<div id="message" class="updated fade">
					<p><strong>
		<?php _e('Promotional Codes have been successfully deleted from the database.', 'event_espresso'); ?>
						</strong></p>
				</div>
				<?php
			}
			?>
			<form id="form1" name="form1" method="post" action="<?php echo $_SERVER["REQUEST_URI"] ?>">
				<table id="table" class="widefat manage-discounts">
					<thead>
						<tr>
							<th class="manage-column column-cb check-column" id="cb" scope="col" style="width:2.5%;"><input type="checkbox"></th>
							<th class="manage-column column-comments num" id="id" style="padding-top:7px; width:2.5%;" scope="col" title="Click to Sort"><?php _e('ID', 'event_espresso'); ?></th>
							<th class="manage-column column-title" id="name" scope="col" title="Click to Sort" style="width:10%;"><?php _e('Name', 'event_espresso'); ?></th>
							<th class="manage-column column-author" id="date" scope="col" title="Click to Sort" style="width:15%;"><?php _e('Exp Date', 'event_espresso'); ?></th>
							<th class="manage-column column-author" id="date" scope="col" title="Click to Sort" style="width:10%;"><?php _e('Qty Available', 'event_espresso'); ?></th>
							<?php if (function_exists('espresso_is_admin') && espresso_is_admin() == true) { ?>
								<th class="manage-column column-creator" id="creator" scope="col" title="Click to Sort" style="width:10%;"><?php _e('Creator', 'event_espresso'); ?></th>
	<?php } ?>
							<th class="manage-column column-author" id="start" scope="col" title="Click to Sort" style="width:5%;"><?php _e('Amount', 'event_espresso'); ?></th>
							<th class="manage-column column-date" id="begins" scope="col" title="Click to Sort" style="width:10%;"><?php _e('Percentaage', 'event_espresso'); ?></th>
						</tr>
					</thead>
					<tbody>
						<?php
						$sql = "SELECT * FROM " . EVENTS_DISCOUNT_CODES_TABLE;

						if (function_exists('espresso_manager_pro_version') && !empty($_SESSION['espresso_use_selected_manager'])) {
							$sql .= " WHERE wp_user = '" . $espresso_wp_user . "' ";
						} elseif (function_exists('espresso_member_data') && ( espresso_member_data('role') == 'espresso_event_manager' || espresso_member_data('role') == 'espresso_group_admin')) {
							$sql .= " WHERE wp_user = '" . espresso_member_data('id') . "' ";
						}

						$event_discounts = $wpdb->get_results($sql);
						if ($wpdb->num_rows > 0) {
							foreach ($event_discounts as $event_discount) {
								$discount_id = $event_discount->id;
								$coupon_code = $event_discount->coupon_code;
								$coupon_code_price = $event_discount->coupon_code_price;
								$coupon_code_description = $event_discount->coupon_code_description;
								$use_percentage = $event_discount->use_percentage;
								$wp_user = $event_discount->wp_user;

								$quantity = $event_discount->quantity;
								$use_limit = $event_discount->use_limit;
								$use_exp_date = $event_discount->use_exp_date;
								$exp_date = $event_discount->exp_date;
								?>
								<tr>
									<td class="check-column" style="padding:7px 0 22px 5px; vertical-align:top;"><input name="checkbox[<?php echo $discount_id ?>]" type="checkbox"  title="Delete <?php echo $coupon_code ?>"></td>
									<td class="column-comments" style="padding-top:3px;"><?php echo $discount_id ?></td>
									<td class="post-title page-title column-title"><strong><a href="admin.php?page=discounts&amp;action=edit&amp;discount_id=<?php echo $discount_id ?>"><?php echo $coupon_code ?></a></strong>
										<div class="row-actions"><span class="edit"><a href="admin.php?page=discounts&action=edit&discount_id=<?php echo $discount_id ?>">
													<?php _e('Edit', 'event_espresso'); ?>
												</a> | </span><span class="delete"><a onclick="return confirmDelete();" class="submitdelete" href="admin.php?page=discounts&action=delete_discount&discount_id=<?php echo $discount_id ?>">
			<?php _e('Delete', 'event_espresso'); ?>
												</a></span></div></td>
									<td class="post-title page-title column-title"><?php echo!empty($use_exp_date) ? event_espresso_paid_status_icon('Active') : event_espresso_paid_status_icon('Inactive'); ?> <?php echo isset($exp_date) ? event_date_display($exp_date) : '0000-00-00'; ?></td>
									<td class="post-title page-title column-title"><?php echo!empty($use_limit) ? event_espresso_paid_status_icon('Active') : event_espresso_paid_status_icon('Inactive'); ?> <?php echo isset($quantity) ? $quantity : ''; ?></td>
									<?php if (function_exists('espresso_is_admin') && espresso_is_admin() == true) { ?>
										<td><?php echo espresso_user_meta($wp_user, 'user_firstname') != '' ? espresso_user_meta($wp_user, 'user_firstname') . ' ' . espresso_user_meta($wp_user, 'user_lastname') : espresso_user_meta($wp_user, 'display_name'); ?></td>
			<?php } ?>
									<td class="author column-author"><?php echo $coupon_code_price ?></td>
									<td class="author column-author"><?php echo $use_percentage ?></td>
								</tr>
							<?php
							}
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
						<input name="delete_discount" type="submit" class="button-secondary" id="delete_discount" value="<?php _e('Delete Promotional Code', 'event_espresso'); ?>" style="margin:10 0 0 10px;" onclick="return confirmDelete();">
						<a  style="margin-left:5px"class="button-primary" href="admin.php?page=discounts&amp;action=new">
	<?php _e('Add New Promotional Code', 'event_espresso'); ?>
						</a></p>
				</div>
			</form>
		</div>
		<?php
		$main_post_content = ob_get_clean();
		espresso_choose_layout($main_post_content, $sidebar_content);
		?>
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
					{ "bSortable": false },
					null,
					null,
					null,
					null,
					null,
	<?php echo function_exists('espresso_is_admin') && espresso_is_admin() == true ? 'null,' : ''; ?>
					null

				]

			} );

		} );
		// Add new promo code form validation
		jQuery(function(){
			jQuery("#new-promo-code").validate( {
				rules: {
					coupon_code: "required"
				},
				messages: {
					coupon_code: "Please add your promotional code"
				}
			});
		});
	</script>
	<?php
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin-files/coupon-management/help.php');
}

