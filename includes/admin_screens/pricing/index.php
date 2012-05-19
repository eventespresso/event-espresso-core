<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');

function espresso_prices_admin_helper() {

	if (isset($_POST['delete_price'])) {
		$_REQUEST['action'] = 'delete_price';
	}
	if (isset($_POST['trash_price'])) {
		$_REQUEST['action'] = 'trash_price';
	}
	if (isset($_POST['restore_price'])) {
		$_REQUEST['action'] = 'restore_price';
	}
	if (isset($_POST['delete_price_type'])) {
		$_REQUEST['action'] = 'delete_price_type';
	}
	if (isset($_POST['trash_price_type'])) {
		$_REQUEST['action'] = 'trash_price_type';
	}
	if (isset($_POST['restore_price_type'])) {
		$_REQUEST['action'] = 'restore_price_type';
	}

	if (isset($_REQUEST['action'])) {

		$action = wp_strip_all_tags($_REQUEST['action']);
		switch ($action) {

			case 'update_event_price' :
				espresso_update_event_price();
				break;

			case 'add_price_to_db' :
				espresso_add_price_to_db();
				break;

			case 'update_event_price_type' :
				espresso_update_event_price_type();
				break;

			case 'add_price_type_to_db' :
				espresso_add_price_type_to_db();
				break;

			case 'delete_price' :
				espresso_delete_price();
				break;

			case 'delete_price_type' :
				espresso_delete_price_type();
				break;

			case 'trash_price' :
				espresso_trash_price();
				break;

			case 'restore_price' :
				espresso_restore_price();
				break;

			case 'trash_price_type' :
				espresso_trash_price_type();
				break;

			case 'restore_price_type' :
				espresso_restore_price_type();
				break;
		}

		$_SERVER['REQUEST_URI'] = remove_query_arg('action');
	}

	echo espresso_get_notices();
}

function espresso_update_event_price() {

	if (check_admin_referer('espresso_form_check', 'update_event_price')) {

		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price.model.php');
		$PRC = EEM_Price::instance();

		$set_column_values = espresso_process_price();
		$where_cols_n_values = array('PRC_ID' => $_REQUEST['PRC_ID']);
		// run the update
		if ($PRC->update($set_column_values, $where_cols_n_values)) {
			$notices = espresso_get_notices(FALSE, TRUE);
			$redirect_url = add_query_arg($notices, PRC_ADMIN_URL);
			wp_redirect($redirect_url);
			exit();
		}
	}
}

function espresso_add_price_to_db() {

	if (check_admin_referer('espresso_form_check', 'add_price_to_db')) {

		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price.model.php');
		$PRC = EEM_Price::instance();

		$set_column_values = espresso_process_price();
		// run the insert
		if ($PRC->insert($set_column_values)) {
			$notices = espresso_get_notices(FALSE, TRUE);
			$redirect_url = add_query_arg($notices, PRC_ADMIN_URL);
			wp_redirect($redirect_url);
			exit();
		}
	}
}

function espresso_process_price() {

	$_REQUEST['PRC_name'] = ucwords(strtolower($_REQUEST['PRC_name']));
	$_REQUEST['PRC_name'] = htmlentities($_REQUEST['PRC_name'], ENT_QUOTES, 'UTF-8');

	$set_column_values = array(
			'PRT_ID' => absint($_REQUEST['PRT_ID']),
			'PRC_amount' => abs($_REQUEST['PRC_amount']),
			'PRC_name' => $_REQUEST['PRC_name'],
			'PRC_desc' => htmlentities(wp_strip_all_tags($_REQUEST['PRC_desc']), ENT_QUOTES, 'UTF-8'),
			'PRC_use_dates' => absint($_REQUEST['PRC_use_dates']),
			'PRC_disc_code' => wp_strip_all_tags($_REQUEST['PRC_disc_code']),
			'PRC_disc_limit_qty' => absint($_REQUEST['PRC_disc_limit_qty']),
			'PRC_disc_qty' => absint($_REQUEST['PRC_disc_qty']),
			'PRC_disc_apply_all' => absint($_REQUEST['PRC_disc_apply_all']),
			'PRC_disc_wp_user' => absint($_REQUEST['PRC_disc_wp_user']),
			'PRC_is_active' => absint($_REQUEST['PRC_is_active'])
	);
	return $set_column_values;
}

function espresso_update_event_price_type() {

	if (check_admin_referer('espresso_form_check', 'update_event_price_type')) {

		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price_Type.model.php');
		$PRT = EEM_Price_Type::instance();

		// perform some voodoo
		$set_column_values = espresso_process_price_type();
		$where_cols_n_values = array('PRT_ID' => absint($_REQUEST['PRT_ID']));
		// run the update
		if ($PRT->update($set_column_values, $where_cols_n_values)) {
			$notices = espresso_get_notices(FALSE, TRUE);
			$redirect_url = add_query_arg($notices, PRC_ADMIN_URL);
			wp_redirect($redirect_url);
			exit();
		}
	}
}

function espresso_add_price_type_to_db() {

	if (check_admin_referer('espresso_form_check', 'add_price_type_to_db')) {

		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price_Type.model.php');
		$PRT = EEM_Price_Type::instance();

		// perform some voodoo
		$set_column_values = espresso_process_price_type();
		// run the insert
		if ($PRT->insert($set_column_values)) {
			$notices = espresso_get_notices(FALSE, TRUE);
			$redirect_url = add_query_arg($notices, PRC_ADMIN_URL);
			wp_redirect($redirect_url);
			exit();
		}
	}
}

function espresso_process_price_type() {

	$base_type = wp_strip_all_tags($_REQUEST['base_type']);
	$name = wp_strip_all_tags($_REQUEST['PRT_name']);

	switch ($base_type) {

		case 'Price' :
			$_REQUEST['PRT_is_discount'] = 0;
			$_REQUEST['PRT_is_tax'] = 0;
			$_REQUEST['PRT_is_percent'] = 0;
			$_REQUEST['PRT_order'] = 0;

			$pos = strpos($name, ' Price');
			$trunc = strlen($name) - 6;
			if ($pos == $trunc) {
				$name = substr($name, 0, $trunc);
			}
			$name = trim($name) . ' Price';
			$_REQUEST['PRT_name'] = $name;
			break;

		case 'Discount' :
			$_REQUEST['PRT_is_discount'] = 1;
			$pos = strpos($name, ' Discount');
			$trunc = strlen($name) - 9;
			if ($pos == $trunc) {
				$name = substr($name, 0, $trunc);
			}
			$name = trim($name) . ' Discount';
			$_REQUEST['PRT_name'] = $name;
			break;

		case 'Surcharge' :
			$_REQUEST['PRT_is_discount'] = 0;
			$_REQUEST['PRT_is_tax'] = 0;
			$pos = strpos($name, ' Surcharge');
			$trunc = strlen($name) - 10;
			if ($pos == $trunc) {
				$name = substr($name, 0, $trunc);
			}
			$name = trim($name) . ' Surcharge';
			$_REQUEST['PRT_name'] = $name;
			break;

		case 'Tax' :
			$_REQUEST['PRT_is_discount'] = 0;
			$_REQUEST['PRT_is_tax'] = 1;
			$_REQUEST['PRT_is_percent'] = 1;
			$pos = strpos($name, ' Tax');
			$trunc = strlen($name) - 4;
			if ($pos == $trunc) {
				$name = substr($name, 0, $trunc);
			}
			$name = trim($name) . ' Tax';
			$_REQUEST['PRT_name'] = $name;
			break;
	}

	$_REQUEST['PRT_name'] = ucwords(strtolower($_REQUEST['PRT_name']));
	$_REQUEST['PRT_name'] = htmlentities($_REQUEST['PRT_name'], ENT_QUOTES, 'UTF-8');

	$set_column_values = array(
			'PRT_name' => $_REQUEST['PRT_name'],
			'PRT_is_member' => absint($_REQUEST['PRT_is_member']),
			'PRT_is_discount' => absint($_REQUEST['PRT_is_discount']),
			'PRT_is_tax' => absint($_REQUEST['PRT_is_tax']),
			'PRT_is_percent' => absint($_REQUEST['PRT_is_percent']),
			'PRT_is_global' => absint($_REQUEST['PRT_is_global']),
			'PRT_order' => absint($_REQUEST['PRT_order'])
	);

	return $set_column_values;
//		echo printr( $set_column_values, '$set_column_values' );	
//		echo printr( $where_cols_n_values, '$where_cols_n_values' );	
}

function espresso_delete_price() {

	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price.model.php');
	$PRC = EEM_Price::instance();


	$success = TRUE;
	//Checkboxes
	if (!empty($_POST['checkbox']) && is_array($_POST['checkbox'])) {
		while (list( $PRC_ID, $value ) = each($_POST['checkbox'])) {
			if (!$PRC->delete_by_id(absint($PRC_ID))) {
				$success = FALSE;
			}
		}

		if ($success) {
			$espresso_notices['success'][] = __('Prices have been successfully deleted.', 'event_espresso');
		}
	} elseif ($_REQUEST['action'] == 'delete_price') {
		$PRC_ID = absint($_REQUEST['id']);
		if ($PRC->delete_by_id($PRC_ID)) {
			$espresso_notices['success'][] = __('Prices have been successfully deleted.', 'event_espresso');
		}
	}
}

function espresso_delete_price_type() {

	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price_Type.model.php');
	$PRT = EEM_Price_Type::instance();

	$success = TRUE;
	//Checkboxes
	if (!empty($_POST['checkbox']) && is_array($_POST['checkbox'])) {
		while (list( $PRT_ID, $value ) = each($_POST['checkbox'])) {
			if (!$PRT->delete_by_id(absint($PRT_ID))) {
				$success = FALSE;
			}
		}

		if ($success) {
			$espresso_notices['success'][] = __('Price Types have been successfully deleted.', 'event_espresso');
		}
	} elseif ($_REQUEST['action'] == 'delete_price_type') {
		$PRT_ID = absint($_REQUEST['id']);
		if ($PRT->delete_by_id($PRT_ID)) {
			$espresso_notices['success'][] = __('Price Types have been successfully deleted.', 'event_espresso');
		}
	}
}

function espresso_trash_price() {

	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price.model.php');
	$PRC = EEM_Price::instance();


	$success = TRUE;
	//Checkboxes
	if (!empty($_POST['checkbox']) && is_array($_POST['checkbox'])) {
		while (list( $PRC_ID, $value ) = each($_POST['checkbox'])) {
			if (!$PRC->update(array('PRC_deleted' => TRUE), array('PRC_ID' => absint($PRC_ID)))) {
				$success = FALSE;
			}
		}

		if ($success) {
			$espresso_notices['success'][] = __('Prices have been moved to the trash.', 'event_espresso');
		}
	} elseif ($_REQUEST['action'] == 'trash_price') {
		$PRC_ID = absint($_REQUEST['id']);
		if ($PRC->update(array('PRC_deleted' => TRUE), array('PRC_ID' => absint($PRC_ID)))) {
			$espresso_notices['success'][] = __('Price has been moved to the trash', 'event_espresso');
		}
	}
}

function espresso_restore_price() {

	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price.model.php');
	$PRC = EEM_Price::instance();


	$success = TRUE;
	//Checkboxes
	if (!empty($_POST['checkbox']) && is_array($_POST['checkbox'])) {
		while (list( $PRC_ID, $value ) = each($_POST['checkbox'])) {
			if (!$PRC->update(array('PRC_deleted' => FALSE), array('PRC_ID' => absint($PRC_ID)))) {
				$success = FALSE;
			}
		}

		if ($success) {
			$espresso_notices['success'][] = __('Prices have been successfully deleted.', 'event_espresso');
		}
	} elseif ($_REQUEST['action'] == 'restore_price') {
		$PRC_ID = absint($_REQUEST['id']);
		if ($PRC->update(array('PRC_deleted' => FALSE), array('PRC_ID' => absint($PRC_ID)))) {
			$espresso_notices['success'][] = __('Prices have been successfully deleted.', 'event_espresso');
		}
	}
}

function espresso_trash_price_type() {

	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price_Type.model.php');
	$PRT = EEM_Price_Type::instance();


	$success = TRUE;
	//Checkboxes
	if (!empty($_POST['checkbox']) && is_array($_POST['checkbox'])) {
		while (list( $PRT_ID, $value ) = each($_POST['checkbox'])) {
			if (!$PRT->update(array('PRT_deleted' => TRUE), array('PRT_ID' => absint($PRT_ID)))) {
				$success = FALSE;
			}
		}

		if ($success) {
			$espresso_notices['success'][] = __('Price Types have been moved to the trash.', 'event_espresso');
		}
	} elseif ($_REQUEST['action'] == 'trash_price_type') {
		$PRT_ID = absint($_REQUEST['id']);
		if ($PRT->update(array('PRT_deleted' => TRUE), array('PRT_ID' => absint($PRT_ID)))) {
			$espresso_notices['success'][] = __('Price Type has been moved to the trash', 'event_espresso');
		}
	}
}

function espresso_restore_price_type() {

	require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price_Type.model.php');
	$PRT = EEM_Price_Type::instance();


	$success = TRUE;
	//Checkboxes
	if (!empty($_POST['checkbox']) && is_array($_POST['checkbox'])) {
		while (list( $PRT_ID, $value ) = each($_POST['checkbox'])) {
			if (!$PRT->update(array('PRT_deleted' => FALSE), array('PRT_ID' => absint($PRT_ID)))) {
				$success = FALSE;
			}
		}

		if ($success) {
			$espresso_notices['success'][] = __('Price Types hava been restored from trash.', 'event_espresso');
		}
	} elseif ($_REQUEST['action'] == 'restore_price_type') {
		$PRT_ID = absint($_REQUEST['id']);
		if ($PRT->update(array('PRT_deleted' => FALSE), array('PRT_ID' => absint($PRT_ID)))) {
			$espresso_notices['success'][] = __('Price Type has been restored from trash.', 'event_espresso');
		}
	}
}