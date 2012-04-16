<?php

function espresso_price_manager_menu() {
	global $org_options;
	$values = array(
			array('id' => true, 'text' => __('Yes', 'event_espresso')),
			array('id' => false, 'text' => __('No', 'event_espresso'))
	);
	$_REQUEST['action'] = isset($_REQUEST['action']) ? $_REQUEST['action'] : NULL;
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . "prices_management/index.php");
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
					espresso_prices_admin_helper();
					do_meta_boxes('event-espresso_page_event_prices', 'normal', null);
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
							require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price_Type.model.php');
							$PRT = EEM_Price_Type::instance();
							require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price.model.php');
							$PRC = EEM_Price::instance();
							if ($prices = $PRC->get_all_prices()) {
								foreach ($prices as $price) {
									?>
									<tr>
										<td class="check-column" style="padding:7px 0 22px 5px; vertical-align:top;"><input name="checkbox[<?php echo $price->ID(); ?>]" type="checkbox"  title="Delete <?php echo stripslashes_deep($price->name()); ?>"></td>
										<td class="column-comments" style="padding-top:3px;"><?php echo $price->ID(); ?></td>
										<td class="post-title page-title column-title"><strong><a href="admin.php?page=event_prices&action=edit_price&id=<?php echo $price->ID(); ?>"><?php echo stripslashes_deep($price->name()); ?></a></strong>
											<div class="row-actions"> <span class="edit"><a href="admin.php?page=event_prices&action=edit_price&id=<?php echo $price->ID(); ?>">
														<?php _e('Edit', 'event_espresso'); ?>
													</a> | </span> <span class="delete"><a onclick="return confirmDelete();" class="submitdelete" href="admin.php?page=event_prices&action=delete_price&id=<?php echo $price->ID(); ?>">
														<?php _e('Delete', 'event_espresso'); ?>
													</a></span> </div>
										</td>
										<td>
											<?php echo $org_options['currency_symbol'] . $price->amount(); ?>
										</td>
										<td>
											<?php echo $PRT->type[$price->type()]->name(); ?>
										</td>
										<td>
											<?php echo ($price->is_active()) ? "Yes" : "No"; ?>
										</td>
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
									<th class="manage-column column-comments num" id="PRT_ID" style="padding-top:7px; width:2.5%;" scope="col" title="Click to Sort"><?php _e('ID', 'event_espresso'); ?></th>
									<th class="manage-column column-title" id="PRT_name" scope="col" title="Click to Sort" style="width:20%;"><?php _e('Name', 'event_espresso'); ?></th>
									<th class="manage-column column-title" id="PRT_is_tax" scope="col" title="Click to Sort" style="width:10%;"><?php _e('Tax?', 'event_espresso'); ?></th>
									<th class="manage-column column-title" id="PRT_is_percent" scope="col" title="Click to Sort" style="width:10%;"><?php _e('Percent?', 'event_espresso'); ?></th>
									<th class="manage-column column-title" id="PRT_is_global" scope="col" title="Click to Sort" style="width:10%;"><?php _e('Global?', 'event_espresso'); ?></th>
									<th class="manage-column column-title" id="PRT_order" scope="col" title="Click to Sort" style="width:10%;"><?php _e('Order', 'event_espresso'); ?></th>
								</tr>
							</thead>
							<?php
							foreach ($PRT->type as $type) {
								?>
								<tr>
									<td class="check-column" style="padding:7px 0 22px 5px; vertical-align:top;"><input name="checkbox[<?php echo $type->ID(); ?>]" type="checkbox"  title="Delete <?php echo stripslashes_deep($type->name()); ?>">
										<div style="display:none;">
											<span class="PRT_ID"><?php echo $type->ID(); ?></span>
											<span class="PRT_is_tax"><?php echo $type->is_tax(); ?></span>
											<span class="PRT_name"><?php echo $type->name(); ?></span>
											<span class="PRT_is_percent"><?php echo $type->is_percent(); ?></span>
											<span class="PRT_is_global"><?php echo $type->is_global(); ?></span>
											<span class="PRT_order"><?php echo $type->order(); ?></span>
										</div>
									</td>
									<td class="column-comments" style="padding-top:3px;"><?php echo $type->ID(); ?></td>
									<td class="post-title page-title column-title"><strong><a href="admin.php?page=event_prices&action=edit_price_type&id=<?php echo $type->ID(); ?>"><?php echo stripslashes_deep($type->name()); ?></a></strong>
										<div class="row-actions">
											<span class="edit">
												<a href="admin.php?page=event_prices&action=edit_price_type&id=<?php echo $type->ID(); ?>">
													<?php _e('Edit', 'event_espresso'); ?>
												</a>
											</span>
											|
											<span class="delete">
												<a onclick="return confirmDelete();" class="submitdelete" href="admin.php?page=event_prices&action=delete_price_type&id=<?php echo $type->ID(); ?>">
													<?php _e('Delete', 'event_espresso'); ?>
												</a>
											</span>
										</div>
									</td>
									<td>
										<?php echo ($type->is_tax()) ? "Yes" : "No"; ?>
									</td>
									<td>
										<?php echo ($type->is_percent()) ? "Yes" : "No"; ?>
									</td>
									<td>
										<?php echo ($type->is_global()) ? "Yes" : "No"; ?>
									</td>
									<td>
										<?php echo $type->order(); ?>
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