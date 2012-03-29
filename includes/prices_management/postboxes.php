<?php

function edit_event_price_postbox() {
	global $wpdb;

	if (!empty($_REQUEST['id'])) {
		$price=$wpdb->get_row("SELECT * FROM ". ESP_PRICE_TABLE . " WHERE PRC_id=". $_REQUEST['id']);
		$action = 'update_event_price';
	} else {
		$price = new stdClass;
		$price->PRC_name = '';
		$price->PRC_amount = 0.00;
		$price->PRT_id = null;
		$price->PRC_is_active = false;
		$price->PRC_desc = '';
		$action = 'add_price_to_db';
	}

	$sql = "SELECT * FROM " . ESP_PRICE_TYPE;
	$sql .= " ORDER BY PRT_id ASC";
	$results = $wpdb->get_results($sql);
	if (!empty($results)) {
	foreach ($results as $result) {
		$price_types[] = array('id' => $result->PRT_id, 'text' => $result->PRT_name);
	}
	} else {
		_e('You have no price types defined. Please add a price type before adding a price.', 'event_espresso');
		return;
	}

	$values = array(
			array('id' => true, 'text' => __('Yes', 'event_espresso')),
			array('id' => false, 'text' => __('No', 'event_espresso'))
	);
	?>
	<div class="inside">
		<form id="price-form" method="post" action="<?php echo $_SERVER['REQUEST_URI']; ?>">
			<table width="100%" border="0">
				<tbody>
					<tr>
						<th><label for="PRC_name">
								<?php _e('Price Name', 'event_espresso'); ?>
							</label></th>
						<td><input class="regular-text" type="text" id="PRC_name" name="PRC_name" value="<?php echo $price->PRC_name; ?>"/></td>
					</tr>
					<tr>
						<th><label for="PRC_amount">
								<?php _e('Price Amount', 'event_espresso'); ?>
							</label></th>
						<td><input class="regular-text" type="text" id="PRC_amount" name="PRC_amount" value="<?php echo $price->PRC_amount; ?>"/></td>
					</tr>
					<tr>
						<th><label for="PRT_id">
								<?php _e('Price Type', 'event_espresso'); ?>
							</label></th>
						<td><?php echo select_input('PRT_id', $price_types, $price->PRT_id, 'id="PRT_id"'); ?></td>
					</tr>
					<tr>
						<th><label for="PRC_is_active">
								<?php _e('Globally Active', 'event_espresso'); ?>
							</label></th>
						<td><?php echo select_input('PRC_is_active', $values, $price->PRC_is_active, 'id="PRC_is_active"'); ?></td>
					</tr>
				</tbody>
			</table>
			<?php do_meta_boxes('espresso_price_desc_editor', 'normal', $price->PRC_desc); ?>
			<input type="hidden" name="action" value="<?php echo $action; ?>">
			<?php if ($action == 'update_price') { ?>
			<input type="hidden" name="PRC_id" value="<?php echo $_REQUEST['id']; ?>">
			<?php } ?>
			<p>
				<input class="button-primary" type="submit" name="Submit" value="<?php _e('Save'); ?>" id="add_new_price" />
				<?php wp_nonce_field('espresso_form_check', $action) ?>
			</p>
		</form>
	</div>
	<?php
}

function espresso_description_editor_postbox($desc) {
	wp_editor(espresso_admin_format_content($desc), 'desc', array('media_buttons' => true, 'textarea_rows' => '3', 'textarea_name' => 'PRC_desc'));
	?>
	<table id="venue-descr-add-form"  cellspacing="0">
		<tbody>
			<tr>
				<td class="aer-word-count"></td>
				<td class="autosave-info"><span>
						<p></p>
					</span></td>
			</tr>
		</tbody>
	</table>
	<?php
}

function edit_event_price_type_postbox() {
	global $wpdb;

	if (!empty($_REQUEST['id'])) {
		$type=$wpdb->get_row("SELECT * FROM ". ESP_PRICE_TABLE . " WHERE PRC_id=". $_REQUEST['id']);
		$action = 'update_event_price_type';
	} else {
		$type = new stdClass;
		$type->PRT_name = '';
		$type->PRT_is_tax = false;
		$type->PRT_is_percent = false;
		$type->PRT_is_global = false;
		$type->PRT_order = 0;
		$action = 'add_price_type_to_db';
	}

	$values = array(
			array('id' => true, 'text' => __('Yes', 'event_espresso')),
			array('id' => false, 'text' => __('No', 'event_espresso'))
	);
	?>
	<div class="inside">
		<form id="price-form" method="post" action="<?php echo $_SERVER['REQUEST_URI']; ?>">
			<table width="100%" border="0">
				<tbody>
					<tr>
						<th><label for="PRT_name">
								<?php _e('Price Type Name', 'event_espresso'); ?>
							</label></th>
						<td><input class="regular-text" type="text" id="PRT_name" name="PRT_name" value="<?php echo $type->PRT_name; ?>"/></td>
					</tr>
					<tr>
						<th><label for="PRT_order">
								<?php _e('Price Type Order', 'event_espresso'); ?>
							</label></th>
						<td><input class="regular-text" type="text" id="PRT_order" name="PRT_order" value="<?php echo $type->PRT_order; ?>"/></td>
					</tr>
					<tr>
						<th><label for="PRT_is_tax">
								<?php _e('Is Type a tax?', 'event_espresso'); ?>
							</label></th>
						<td><?php echo select_input('PRT_is_tax', $values, $type->PRT_is_tax, 'id="PRT_is_tax"'); ?></td>
					</tr>
					<tr>
						<th><label for="PRT_is_percent">
								<?php _e('Is Type applied as a percentage?', 'event_espresso'); ?>
							</label></th>
						<td><?php echo select_input('PRT_is_percent', $values, $type->PRT_is_percent, 'id="PRT_is_percent"'); ?></td>
					</tr>
					<tr>
						<th><label for="PRT_is_global">
								<?php _e('Is Type to be applied globally?', 'event_espresso'); ?>
							</label></th>
						<td><?php echo select_input('PRT_is_global', $values, $type->PRT_is_global, 'id="PRT_is_global"'); ?></td>
					</tr>
				</tbody>
			</table>
			<input type="hidden" name="action" value="<?php echo $action; ?>">
			<?php if ($action == 'update_event_price_type') { ?>
			<input type="hidden" name="PRT_id" value="<?php echo $_REQUEST['id']; ?>">
			<?php } ?>
			<p>
				<input class="button-primary" type="submit" name="Submit" value="<?php _e('Save'); ?>" id="add_new_price_type" />
				<?php wp_nonce_field('espresso_form_check', $action) ?>
			</p>
		</form>
	</div>
	<?php
}
