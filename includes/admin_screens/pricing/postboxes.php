<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');

function edit_event_price_postbox() {

	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price.model.php');
	$PRC = EEM_Price::instance();
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price_Type.model.php');
	$PRT = EEM_Price_Type::instance();

	if (!empty($_REQUEST['id'])) {
		$price = $PRC->get_price_by_ID($_REQUEST['id']);
		$action = 'update_event_price';
	} else {
		$price = $PRC->get_new_price();
		$action = 'add_price_to_db';
	}

	if (empty($PRT->type)) {
		_e('You have no price types defined. Please add a price type before adding a price.', 'event_espresso');
		return;
	} else {
		foreach ($PRT->type as $type) {
			$price_types[] = array('id' => $type->ID(), 'text' => $type->name());
		}
	}
?>

	<div class="inside">
	
		<form id="price-form" method="post" action="<?php echo $_SERVER['REQUEST_URI']; ?>">
			<?php wp_nonce_field('espresso_form_check', $action) ?>
			<input type="hidden" name="action" value="<?php echo $action; ?>">
<?php if ($action == 'update_event_price') { ?>
			<input type="hidden" name="PRC_ID" value="<?php echo $_REQUEST['id']; ?>">
<?php } ?>
			<input type="hidden" name="PRC_disc_code" value="<?php echo $price->disc_code(); ?>">
			<input type="hidden" name="PRC_disc_limit_qty" value="<?php echo $price->disc_limit_qty(); ?>">
			<input type="hidden" name="PRC_disc_qty" value="<?php echo $price->disc_qty(); ?>">
			<input type="hidden" name="PRC_disc_apply_all" value="<?php echo $price->disc_apply_all(); ?>">
			<input type="hidden" name="PRC_disc_wp_user" value="<?php echo $price->disc_wp_user(); ?>">

			<table class="form-table">
				<tbody>
					<tr valign="top">
						<th><label for="PRT_ID"><?php _e('Price Type', 'event_espresso'); ?></label></th>
						<td>
							<?php echo select_input('PRT_ID', $price_types, $price->type(), 'id="PRT_ID"'); ?>
							<span class="description"><?php _e('Whether this is an Event Price, Discount, Surcharge, or Tax. Default items will apply to ALL new events you create.', 'event_espresso'); ?></span>
						</td>
					</tr>
					<tr valign="top">
						<th><label for="PRC_name"><?php _e('Price Name', 'event_espresso'); ?></label></th>
						<td>
							<input class="regular-text" type="text" id="PRC_name" name="PRC_name" value="<?php echo $price->name(); ?>"/>
							<span class="description"><?php _e('The name that site visitors will see for this Price.', 'event_espresso'); ?></span>
						</td>
					</tr>
					<tr valign="top">
						<th><label for="PRC_desc"><?php _e('Description', 'event_espresso'); ?></label></th>
						<td>
							<textarea class="regular-text" type="text" id="PRC_desc" name="PRC_desc" cols="100" rows="1" ><?php echo $price->desc(); ?></textarea><br/>
							<span class="description"><?php _e('A brief description for this Price. More for your benefit.', 'event_espresso'); ?></span>
						</td>							
					</tr>
					<tr valign="top">
						<th><label for="PRC_amount"><?php _e('Price Amount', 'event_espresso'); ?></label></th>
						<td>
							<input class="small-text" type="text" id="PRC_amount" name="PRC_amount" value="<?php echo $price->amount(); ?>"/>
							<span class="description"><?php _e('The dollar or percentage amount for this Price.', 'event_espresso'); ?></span>
						</td>
					</tr>
					<tr valign="top">
						<th><label for="PRC_is_active"><?php _e('Triggered by Date', 'event_espresso'); ?></label></th>
						<td>
							<?php $yes_checked = $price->use_dates() ? ' checked="checked"' : ''; ?>
							<label style="margin-right:15px;">
								<input type="radio" name="PRC_use_dates" value="1"<?php echo $yes_checked;?> style="margin-right:5px;">
								<?php _e('Yes', 'event_espresso');?>
							</label>
							<?php $no_checked = $price->use_dates() ? '' : ' checked="checked"'; ?>
							<label style="margin-right:15px;">
							<input type="radio" name="PRC_use_dates" value="0"<?php echo $no_checked;?> style="margin-right:5px;">
							<?php _e('No', 'event_espresso');?>
							</label>
							<span class="description"><?php _e('If set to "Yes", then in the Event Editor you will be able to set start and end dates for when this price will be active.', 'event_espresso'); ?></span>
						</td>
					</tr>
					<tr valign="top">
						<th><label for="PRC_is_active"><?php _e('Active', 'event_espresso'); ?></label></th>
						<td>
							<?php $yes_checked = $price->is_active() ? ' checked="checked"' : ''; ?>
							<label style="margin-right:15px;"><input type="radio" name="PRC_is_active" value="1"<?php echo $yes_checked;?> style="margin-right:5px;"><?php _e('Yes', 'event_espresso');?></label>
							<?php $no_checked = $price->is_active() ? '' : ' checked="checked"'; ?>
							<label style="margin-right:15px;"><input type="radio" name="PRC_is_active" value="0"<?php echo $no_checked;?> style="margin-right:5px;"><?php _e('No', 'event_espresso');?></label>
							<span class="description"><?php _e('Whether this Price is currently being used and displayed on the site.', 'event_espresso'); ?></span>
						</td>
					</tr>
				</tbody>
			</table>
			<p>
				<input class="button-primary" type="submit" name="Submit" value="<?php _e('Save Changes'); ?>" id="add_new_price" />
				<a  style="margin-left:15px; cursor:pointer;" ><?php _e('learn more about how pricing works', 'event_espresso'); ?></a>
			</p>
		</form>
	</div>
	<?php
}



function edit_event_price_type_postbox() {

	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price_Type.model.php');
	$PRT = EEM_Price_Type::instance();

	if (!empty($_REQUEST['id'])) {
		$type = $PRT->get_price_type_by_ID($_REQUEST['id']);
		$action = 'update_event_price_type';
	} else {
		$type = $PRT->get_new_price_type();
		$action = 'add_price_type_to_db';
	}

	$values = array(
			array('id' => true, 'text' => __('Yes', 'event_espresso')),
			array('id' => false, 'text' => __('No', 'event_espresso'))
	);
	?>
	<div class="inside">
		<form id="price-type-form" method="post" action="<?php echo $_SERVER['REQUEST_URI']; ?>">
			<?php wp_nonce_field('espresso_form_check', $action) ?>
		<!--	PRT_ID 	PRT_name 	PRT_is_member 	PRT_is_discount 	PRT_is_tax 	PRT_is_percent 	PRT_is_global 	PRT_order	-->
			<table class="form-table">
				<tbody>
					<tr>
						<th>
							<label for="basic_type"><?php _e('Basic Type', 'event_espresso'); ?></label>
						</th>
						<td>
							<?php 
								$values = array(
															array('id' => 'Price', 'text' => __('Base Price', 'event_espresso')),
															array('id' => 'Discount', 'text' => __('Discount', 'event_espresso')),
															array('id' => 'Surcharge', 'text' => __('Surcharge', 'event_espresso')),
															array('id' => 'Tax', 'text' => __('Tax', 'event_espresso'))
														);
								$set_value = 'Price';						
								foreach ( $values as $value ) {
									$pos = strpos( $type->name(), $value['id'] );
									if ( $pos !== FALSE ) {
										$set_value = $value['id'];
									}
								}
								echo select_input('Base_Type', $values, $set_value, 'id="base-type"'); 
							?><br/>
							<span class="description"><?php _e('Choosing a basic type allows us to quickly configure a bunch of other options for you.<br/>All events need to have at least one Price type option.<br/>Discounts reduce the price of an event, Surcharges increase the price.<br/>Taxes are applied to the final total.', 'event_espresso'); ?></span>
						</td>
					</tr>
					<tr>
						<th>
							<label for="PRT_name"><?php _e('Price Type Name', 'event_espresso'); ?></label>
						</th>
						<td>
							<input class="regular-text" type="text" id="PRT_name" name="PRT_name" value="<?php echo $type->name(); ?>"/>
							<span class="description"><?php _e('A name for this Price Type.', 'event_espresso'); ?></span>
						</td>
					</tr>
<!--					<tr>
						<th>
							<label for="PRT_is_tax"><?php _e('Applied as Tax to Totals ', 'event_espresso'); ?></label>
						</th>
						<td>
							<?php $yes_checked = $type->is_tax() ? ' checked="checked"' : ''; ?>
							<label style="margin-right:15px;"><input type="radio" name="PRT_is_tax" value="1"<?php echo $yes_checked;?> style="margin-right:5px;"><?php _e('Yes', 'event_espresso');?></label>
							<?php $no_checked = $type->is_tax() ? '' : ' checked="checked"'; ?>
							<label style="margin-right:15px;"><input type="radio" name="PRT_is_tax" value="0"<?php echo $no_checked;?> style="margin-right:5px;"><?php _e('No', 'event_espresso');?></label>
							<span class="description"><?php _e('Whether this Price Type will be applied to totals as a tax.', 'event_espresso'); ?></span>
						</td>
					</tr>-->
					<tr>
						<th>
							<label><?php _e('Apply to Members Only', 'event_espresso'); ?></label>
						</th>
						<td>
							<?php $yes_checked = $type->is_member() ? ' checked="checked"' : ''; ?>
							<label style="margin-right:15px;"><input type="radio" name="PRT_is_member" value="1"<?php echo $yes_checked;?> style="margin-right:5px;">
								<?php _e('Yes', 'event_espresso');?>
							</label>
							<?php $no_checked = $type->is_member() ? '' : ' checked="checked"'; ?>
							<label style="margin-right:15px;"><input type="radio" name="PRT_is_member" value="0"<?php echo $no_checked;?> style="margin-right:5px;">
								<?php _e('No', 'event_espresso');?>
							</label>
							<span class="description"><?php _e('Whether this Price Type will <b>only</b> be available to members that are logged into the site.', 'event_espresso'); ?></span>
						</td>
					</tr>
					<tr>
						<th>
							<label for="PRT_is_percent"><?php _e('Percentage or Dollar Amount?', 'event_espresso'); ?></label>
						</th>
						<td>
							<?php $yes_checked = $type->is_percent() ? ' checked="checked"' : ''; ?>
							<label style="margin-right:15px;"><input type="radio" name="PRT_is_percent" value="1"<?php echo $yes_checked;?> style="margin-right:5px;">
								<?php _e('Percentage', 'event_espresso');?>
							</label>
							<?php $no_checked = $type->is_percent() ? '' : ' checked="checked"'; ?>
							<label style="margin-right:15px;"><input type="radio" name="PRT_is_percent" value="0"<?php echo $no_checked;?> style="margin-right:5px;">
								<?php _e('Dollar', 'event_espresso');?>
							</label>
							<span class="description"><?php _e('Whether this Price Type will be applied as a percentage or applied as a set dollar amount.', 'event_espresso'); ?></span>
						</td>
					</tr>
					<tr>
						<th>
							<label for="PRT_is_global"><?php _e('Apply to ALL New Events? ', 'event_espresso'); ?></label>
						</th>
						<td>
							<?php $yes_checked = $type->is_global() ? ' checked="checked"' : ''; ?>
							<label style="margin-right:15px;"><input type="radio" name="PRT_is_global" value="1"<?php echo $yes_checked;?> style="margin-right:5px;">
								<?php _e('Yes', 'event_espresso');?>
							</label>
							<?php $no_checked = $type->is_global() ? '' : ' checked="checked"'; ?>
							<label style="margin-right:15px;"><input type="radio" name="PRT_is_global" value="0"<?php echo $no_checked;?> style="margin-right:5px;">
								<?php _e('No', 'event_espresso');?>
							</label>
							<span class="description"><?php _e('Setting this to "Yes" will make this a <b>Default</b> Price Type that will then be applied to <b>ALL</b> new events.', 'event_espresso'); ?></span>
						</td>
					</tr>
					<tr>
						<th>
							<label for="PRT_order"><?php _e('Order of Application ', 'event_espresso'); ?></label>
						</th>
						<td>
							<input class="small-text" type="text" id="PRT_order" name="PRT_order" value="<?php echo $type->order(); ?>"/><span class="description">
							<?php _e('The order that Price Types are applied. .', 'event_espresso'); ?></span><br/><br/>
							<span class="description"><?php _e('Price types are applied sequentially according to their Order, where higher ordered Price Types will affect lower ordered Price Types.<br/>Price types with equal Orders will be applied in parrallel to whatever total preceeds them and will not affect each other. Actual Prices will be set to "0" so that they are processed first. Taxes will be always be applied last but their order will still determine if they are applied in parralel or as compound taxes (one tax on top of the other).', 'event_espresso'); ?></span>
						</td>
					</tr>
				</tbody>
			</table>
			
			<input type="hidden" name="action" value="<?php echo $action; ?>">
			<?php if ($action == 'update_event_price_type') { ?>
			<input type="hidden" name="PRT_ID" value="<?php echo $_REQUEST['id']; ?>">
			<?php } ?>
			
			<p>
				<input class="button-primary" type="submit" name="Submit" value="<?php _e('Save Changes'); ?>" id="add_new_price_type" />
				<a  style="margin-left:15px; cursor:pointer;" ><?php _e('learn more about how pricing works', 'event_espresso'); ?></a>
			</p>
			
		</form>
	</div>
	<?php
}



