<?php

function espresso_prices_admin_helper() {
	global $wpdb;
	if (isset($_POST['delete_price_type']) || (isset($_REQUEST['action']) && $_REQUEST['action'] == 'delete_price_type')) {
		//Checkboxes
		if (!empty($_POST['checkbox']) && is_array($_POST['checkbox'])) {
			while (list($key, $value) = each($_POST['checkbox'])):
				$del_id = $key;
				$sql = "SELECT PRC_ID FROM " . ESP_PRICE_TABLE . " WHERE PRT_ID='$del_id'";
				$row = $wpdb->get_row($sql, ARRAY_N);
				if (!empty($row)) {
					foreach ($row as $entry) {
						$new_checkbox_list[$entry] = true;
					}
				}
				// If a price type is deleted, delete the price
				$sql = "DELETE FROM " . ESP_PRICE_TYPE . " WHERE PRT_ID='$del_id'";
				$wpdb->query($sql);
			endwhile;
		}

		//Delete link
		if ($_REQUEST['action'] == 'delete_price_type') {
			$sql = "SELECT PRC_ID FROM " . ESP_PRICE_TABLE . " WHERE PRT_ID='" . $_REQUEST['id'] . "'";
			$row = $wpdb->get_row($sql, ARRAY_N);
			if (!empty($row)) {
				foreach ($row as $entry) {
					$new_checkbox_list[$entry] = true;
				}
			}
			$sql = "DELETE FROM " . ESP_PRICE_TYPE . " WHERE PRT_ID='" . $_REQUEST['id'] . "'";
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
				$sql = "DELETE FROM " . ESP_PRICE_TABLE . " WHERE PRC_ID='$del_id'";
				$wpdb->query($sql);

				$sql = "DELETE FROM " . ESP_EVENT_PRICE_TABLE . " WHERE PRC_ID='$del_id'";
				$wpdb->query($sql);
			endwhile;
		}

		//Delete link
		if ($_REQUEST['action'] == 'delete_price') {
			//Delete discount data
			$sql = "DELETE FROM " . ESP_PRICE_TABLE . " WHERE PRC_ID='" . $_REQUEST['id'] . "'";
			$wpdb->query($sql);
			$sql = "DELETE FROM " . ESP_EVENT_PRICE_TABLE . " WHERE PRC_ID='" . $_REQUEST['id'] . "'";
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
	if (isset($_REQUEST['action'])) {
		if ($_REQUEST['action'] == 'update_event_price') {
			update_event_price();
		}
		if ($_REQUEST['action'] == 'add_price_to_db') {
			add_price_to_db();
		}
		if ($_REQUEST['action'] == 'update_event_price_type') {
			update_event_price_type();
		}
		if ($_REQUEST['action'] == 'add_price_type_to_db') {
			add_price_type_to_db();
		}
		do_action('action_hook_espresso_admin_notices');
	}
}

function update_event_price() {
	global $wpdb, $notices;
	if (check_admin_referer('espresso_form_check', 'update_event_price')) {
		$wpdb->show_errors();
		$sql = array(
				'PRC_amount' => $_REQUEST['PRC_amount'],
				'PRC_name' => $_REQUEST['PRC_name'],
				'PRC_desc' => $_REQUEST['PRC_desc'],
				'PRT_ID' => $_REQUEST['PRT_ID'],
				'PRC_is_active' => $_REQUEST['PRC_is_active']);

		$update_id = array('PRC_ID' => $_REQUEST['PRC_ID']);
		$sql_data = array('%d', '%s', '%s', '%d', '%d');
	}

	if ($wpdb->update(ESP_PRICE_TABLE, $sql, $update_id, $sql_data, array('%d'))) {
		$notices['updates'][] = __('The price', 'event_espresso') . ' ' . $_REQUEST['PRC_name'] . __(' has been updated', 'event_espresso');
	} else {
		$notices['errors'][] = __('The price', 'event_espresso') . ' ' . $_REQUEST['PRC_name'] . __(' was not updated!', 'event_espresso');
	}
}

function add_price_to_db() {
	global $wpdb, $notices;
	if (check_admin_referer('espresso_form_check', 'add_price_to_db')) {
		$wpdb->show_errors();
		$sql = array(
				'PRC_amount' => $_REQUEST['PRC_amount'],
				'PRC_name' => $_REQUEST['PRC_name'],
				'PRC_desc' => $_REQUEST['PRC_desc'],
				'PRT_ID' => $_REQUEST['PRT_ID'],
				'PRC_is_active' => $_REQUEST['PRC_is_active']);

		$sql_data = array('%d', '%s', '%s', '%d', '%d');
	}

	if ($wpdb->insert(ESP_PRICE_TABLE, $sql, $sql_data)) {
		$notices['updates'][] = __('The price', 'event_espresso') . ' ' . $_REQUEST['PRC_name'] . __(' has been saved', 'event_espresso');
	} else {
		$notices['errors'][] = __('The price', 'event_espresso') . ' ' . $_REQUEST['PRC_name'] . __(' was not saved!', 'event_espresso');
	}
}

function update_event_price_type() {
	global $wpdb, $notices;
	if (check_admin_referer('espresso_form_check', 'update_event_price_type')) {
		$wpdb->show_errors();
		$sql = array(
				'PRT_name' => $_REQUEST['PRT_name'],
				'PRT_is_tax' => $_REQUEST['PRT_is_tax'],
				'PRT_is_percent' => $_REQUEST['PRT_is_percent'],
				'PRT_order' => $_REQUEST['PRT_order'],
				'PRT_is_global' => $_REQUEST['PRT_is_global']);

		$update_id = array('PRT_ID' => $_REQUEST['PRT_ID']);
		$sql_data = array('%s', '%d', '%d', '%d', '%d');
	}

	if ($wpdb->update(ESP_PRICE_TYPE, $sql, $update_id, $sql_data, array('%d'))) {
		$notices['updates'][] = __('The price type', 'event_espresso') . ' ' . $_REQUEST['PRC_name'] . __(' has been updated', 'event_espresso');
	} else {
		$notices['errors'][] = __('The price type', 'event_espresso') . ' ' . $_REQUEST['PRC_name'] . __(' was not updated!', 'event_espresso');
	}
}

function add_price_type_to_db() {
	global $wpdb, $notices;
	if (check_admin_referer('espresso_form_check', 'add_price_type_to_db')) {
		$wpdb->show_errors();
		$sql = array(
				'PRT_name' => $_REQUEST['PRT_name'],
				'PRT_is_tax' => $_REQUEST['PRT_is_tax'],
				'PRT_is_percent' => $_REQUEST['PRT_is_percent'],
				'PRT_order' => $_REQUEST['PRT_order'],
				'PRT_is_global' => $_REQUEST['PRT_is_global']);

		$sql_data = array('%s', '%d', '%d', '%d', '%d');
	}

	if ($wpdb->insert(ESP_PRICE_TYPE, $sql, $sql_data)) {
		$notices['updates'][] = __('The price type', 'event_espresso') . ' ' . $_REQUEST['PRT_name'] . __(' has been saved', 'event_espresso');
	} else {
		$notices['errors'][] = __('The price type', 'event_espresso') . ' ' . $_REQUEST['PRT_name'] . __(' was not saved!', 'event_espresso');
	}
}

