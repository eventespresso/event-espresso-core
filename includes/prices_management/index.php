<?php

function espresso_prices_admin_helper() {
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
				// If a price type is deleted, delete the price
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
}