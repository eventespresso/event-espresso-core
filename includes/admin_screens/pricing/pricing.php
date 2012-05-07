<?php
if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

function espresso_price_manager_menu() {

	global $org_options;

	define('PRC_ADMIN_URL', admin_url('admin.php?page=pricing'));

	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'admin_screens/pricing/index.php');
	espresso_prices_admin_helper();

	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price_Type.model.php');
	$PRT = EEM_Price_Type::instance();

	$_REQUEST['action'] = isset($_REQUEST['action']) ? wp_strip_all_tags($_REQUEST['action']) : NULL;
	$edit_or_add_pages = array('edit_price', 'edit_price_type', 'add_new_price', 'add_new_price_type');
	$edit_or_add_page = ( in_array($_REQUEST['action'], $edit_or_add_pages)) ? TRUE : FALSE;

	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Prices_List_Table.class.php');
	$pricesListTable = new EE_Prices_List_Table();
	$pricesListTable->prepare_items();
	?>
	<div class="wrap">
		<div id="icon-options-event" class="icon32"> </div>
		<h2><?php _e('Manage Event Pricing', 'event_espresso'); ?></h2>

		<div id="poststuff" class="metabox-holder has-right-sidebar">
			<div id="side-info-column" class="inner-sidebar">
				<?php do_meta_boxes('event-espresso_page_pricing', 'side', null); ?>
			</div>
			<div id="post-body">
				<div id="post-body-content">
					<?php
					if ($edit_or_add_page) {
						do_meta_boxes('event-espresso_page_pricing', 'normal', null);
					}
					?>
					<h2><?php _e('Global Prices', 'event_espresso'); ?>
						<?php
						if (!$edit_or_add_page) {
							$add_new_price_url = add_query_arg(array('action' => 'add_new_price'), PRC_ADMIN_URL);
							echo '<a href="' . $add_new_price_url . '" class="button add-new-h2" style="margin-left: 20px;">' . __('Add New Price', 'event_espresso') . '</a>';
						}
						?>
					</h2>
					<?php $pricesListTable->views(); ?>
					<form id="espresso-admin-price-list-frm" name="espresso-admin-price-list-frm" method="post" action="<?php echo PRC_ADMIN_URL ?>">
						<input type="hidden" name="page" value="<?php echo $_REQUEST['page'] ?>" />
						<?php $pricesListTable->display() ?>
					</form>
					<br/><br/>



					<h2>Price Types
						<?php
						if (!$edit_or_add_page) {
							$add_new_price_type_url = add_query_arg(array('action' => 'add_new_price_type'), PRC_ADMIN_URL);
							echo '<a href="' . $add_new_price_type_url . '" class="button add-new-h2" style="margin-left: 20px;">' . __('Add New Type', 'event_espresso') . '</a>';
						}
						?>					
					</h2>
					<form id="espresso-admin-price-type-frm" name="espresso-admin-price-type-frm" method="post" action="<?php echo PRC_ADMIN_URL ?>">
						<table id="table" class="widefat manage-price-types">
							<thead>
								<tr>
									<th class="manage-column column-cb check-column" id="cb" scope="col" style="width:2.5%; text-align:center;"><input type="checkbox"></th>
									<th class="manage-column column-comments num" id="PRT_ID" style="padding-top:7px; width:2.5%;" scope="col" title="Click to Sort">
										<?php _e('ID', 'event_espresso'); ?>
									</th>
									<th class="manage-column column-title" id="PRT_name" scope="col" title="Click to Sort" style="width:20%;">
										<?php _e('Name', 'event_espresso'); ?>
									</th>
									<th class="manage-column column-title" id="PRT_is_member" scope="col" title="Click to Sort" style="width:10%; text-align:center;"">
									<?php _e('Applied to<br />Members Only', 'event_espresso'); ?>
								</th>
								<th class="manage-column column-title" id="PRT_is_discount" scope="col" title="Click to Sort" style="width:10%; text-align:center;"">
								<?php _e('Discount<br />(reduces price)', 'event_espresso'); ?>
							</th>
							<th class="manage-column column-title" id="PRT_is_tax" scope="col" title="Click to Sort" style="width:10%; text-align:center;">
								<?php _e('Applied as Tax<br />to Totals', 'event_espresso'); ?>
							</th>
							<th class="manage-column column-title" id="PRT_is_percent" scope="col" title="Click to Sort" style="width:10%; text-align:center;">
								<?php echo __('Applied as<br />% or ', 'event_espresso') . $org_options['currency_symbol']; ?>
							</th>
							<th class="manage-column column-title" id="PRT_is_global" scope="col" title="Click to Sort" style="width:10%; text-align:center;">
								<?php _e('Apply to ALL<br />New Events?', 'event_espresso'); ?>
							</th>
							<th class="manage-column column-title" id="PRT_order" scope="col" title="Click to Sort" style="width:10%; text-align:center;">
								<?php _e('Order of<br />Application', 'event_espresso'); ?>
							</th>
						</tr>
					</thead>
					<tbody>
						<?php
						foreach ($PRT->type as $type) {
							?>
							<tr>
								<td class="check-column" style="padding:7px 0 22px 5px; vertical-align:top; text-align:center;">
									<input name="checkbox[<?php echo $type->ID(); ?>]" type="checkbox"  title="Delete <?php echo stripslashes_deep($type->name()); ?>">
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
								<td class="post-title page-title column-title"><strong><a href="admin.php?page=pricing&action=edit_price_type&id=<?php echo $type->ID(); ?>"><?php echo stripslashes_deep($type->name()); ?></a></strong>
									<div class="row-actions">
										<span class="edit">
											<a href="admin.php?page=pricing&action=edit_price_type&id=<?php echo $type->ID(); ?>">
												<?php _e('Edit', 'event_espresso'); ?>
											</a>
										</span>
										|
										<span class="delete">
											<a onclick="return confirmDelete();" class="submitdelete" href="admin.php?page=pricing&action=delete_price_type&id=<?php echo $type->ID(); ?>">
												<?php _e('Delete', 'event_espresso'); ?>
											</a>
										</span>
									</div>
								</td>
								<td style="text-align:center;">
									<?php echo ($type->is_member()) ? 'Yes' : ''; ?>
								</td>
								<td style="text-align:center;">
									<?php echo ($type->is_discount()) ? 'Yes' : ''; ?>
								</td>
								<td style="text-align:center;">
									<?php echo ($type->is_tax()) ? 'Yes' : ''; ?>
								</td>
								<td style="text-align:center;">
									<?php echo ($type->is_percent()) ? '%' : $org_options['currency_symbol']; ?>
								</td>
								<td style="text-align:center;">
									<?php echo ($type->is_global()) ? 'Yes' : ''; ?>
								</td>
								<td style="text-align:center;">
									<?php echo $type->order(); ?>
								</td>
							</tr>
							<?php
						}
						?>
					</tbody>
				</table>
				<div style="clear:both; margin-left:15px;">
					<p>
						<input type="checkbox" name="sAll" onclick="selectAll(this)" />
						<strong><?php _e('Check All', 'event_espresso'); ?></strong>&nbsp;&nbsp;&nbsp;&nbsp;								
						<input name="delete_price_type" type="submit" class="button-secondary" id="delete_price_type" value="<?php _e('Delete Price Type', 'event_espresso'); ?>" style="margin-left:15px;" onclick="return confirmDelete();">
						<a  style="margin-left:15px"class="button-primary" href="admin.php?page=pricing&amp;action=add_new_price_type">
							<?php _e('Add New Price Type', 'event_espresso'); ?>
						</a>
						<a  style="margin-left:15px; cursor:pointer;" ><?php _e('learn more about how pricing works', 'event_espresso'); ?></a>
					</p>
				</div>
			</form>
		</div>
	</div>
	<div class="clear"></div>
	</div>
	</div>
	<?php
}