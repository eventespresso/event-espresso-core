<?php

function espresso_prices_admin_helper() {
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price_Type.model.php');
	$PRT = EEM_Price_Type::instance();
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price.model.php');
	$PRC = EEM_Price::instance();
	if (isset($_POST['delete_price_type']) || (isset($_REQUEST['action']) && $_REQUEST['action'] == 'delete_price_type')) {
		//Checkboxes
		if (!empty($_POST['checkbox']) && is_array($_POST['checkbox'])) {
			while (list($key, $value) = each($_POST['checkbox'])) {
				$del_id = $key;
				$PRT->delete_by_id($del_id);
			}
		}

		//Delete link
		if ($_REQUEST['action'] == 'delete_price_type') {
			$PRT->delete_by_id($_REQUEST['id']);
		}
		?>
		<div id="message" class="updated fade">
			<p><strong>
					<?php _e('Price Types have been successfully deleted.', 'event_espresso'); ?>
				</strong></p>
		</div>
		<?php
	}
	if (isset($_POST['delete_price']) || (isset($_REQUEST['action']) && $_REQUEST['action'] == 'delete_price')) {
		//Checkboxes
		if (!empty($_POST['checkbox']) && is_array($_POST['checkbox'])) {
			while (list($key, $value) = each($_POST['checkbox'])) {
				$del_id = $key;
				$PRC->delete_by_id($del_id);
			}
		}

		//Delete link
		if ($_REQUEST['action'] == 'delete_price') {
			$PRC->delete_by_id($_REQUEST['id']);
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
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price.model.php');
	$PRC = EEM_Price::instance();
	if (check_admin_referer('espresso_form_check', 'update_event_price')) {
		$set_column_values = array(
				'PRC_amount' => $_REQUEST['PRC_amount'],
				'PRC_name' => $_REQUEST['PRC_name'],
				'PRC_desc' => $_REQUEST['PRC_desc'],
				'PRT_ID' => $_REQUEST['PRT_ID'],
				'PRC_is_active' => $_REQUEST['PRC_is_active']);

		$where_cols_n_values = array('PRC_ID' => $_REQUEST['PRC_ID']);
		$PRC->update($set_column_values, $where_cols_n_values);
	}
}

function add_price_to_db() {
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price.model.php');
	$PRC = EEM_Price::instance();
	if (check_admin_referer('espresso_form_check', 'add_price_to_db')) {
		$set_column_values = array(
				'PRC_amount' => $_REQUEST['PRC_amount'],
				'PRC_name' => $_REQUEST['PRC_name'],
				'PRC_desc' => $_REQUEST['PRC_desc'],
				'PRT_ID' => $_REQUEST['PRT_ID'],
				'PRC_is_active' => $_REQUEST['PRC_is_active']);
		$PRC->insert($set_column_values);
	}
}

function update_event_price_type() {
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price_Type.model.php');
	$PRT = EEM_Price_Type::instance();
	if (check_admin_referer('espresso_form_check', 'update_event_price_type')) {
		$set_column_values = array(
				'PRT_name' => $_REQUEST['PRT_name'],
				'PRT_is_tax' => $_REQUEST['PRT_is_tax'],
				'PRT_is_percent' => $_REQUEST['PRT_is_percent'],
				'PRT_order' => $_REQUEST['PRT_order'],
				'PRT_is_global' => $_REQUEST['PRT_is_global']);

		$where_cols_n_values = array('PRT_ID' => $_REQUEST['PRT_ID']);
		$PRT->update($set_column_values, $where_cols_n_values);
	}
}

function add_price_type_to_db() {
	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price_Type.model.php');
	$PRT = EEM_Price_Type::instance();
	if (check_admin_referer('espresso_form_check', 'add_price_type_to_db')) {
		$set_column_values = array(
				'PRT_name' => $_REQUEST['PRT_name'],
				'PRT_is_tax' => $_REQUEST['PRT_is_tax'],
				'PRT_is_percent' => $_REQUEST['PRT_is_percent'],
				'PRT_order' => $_REQUEST['PRT_order'],
				'PRT_is_global' => $_REQUEST['PRT_is_global']);

		$PRT->insert($set_column_values);
	}
}

