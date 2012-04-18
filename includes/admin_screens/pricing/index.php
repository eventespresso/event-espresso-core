<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');

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

	if (check_admin_referer('espresso_form_check', 'update_event_price')) {

		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price.model.php');
		$PRC = EEM_Price::instance();
		
		$set_column_values = array(
				'PRT_ID' 						=> absint( $_REQUEST['PRT_ID'] ),
				'PRC_amount' 			=> abs( $_REQUEST['PRC_amount'] ),
				'PRC_name' 				=> wp_strip_all_tags( $_REQUEST['PRC_name'] ),
				'PRC_desc' 					=> wp_strip_all_tags( $_REQUEST['PRC_desc'] ),
				'PRC_use_dates'			=> absint( $_REQUEST['PRC_use_dates'] ),
				'PRC_disc_code'			=> wp_strip_all_tags( $_REQUEST['PRC_disc_code'] ),
				'PRC_disc_limit_qty'	=> absint( $_REQUEST['PRC_disc_limit_qty'] ),
				'PRC_disc_qty'				=> absint( $_REQUEST['PRC_disc_qty'] ),
				'PRC_disc_apply_all'	=> absint( $_REQUEST['PRC_disc_apply_all'] ),
				'PRC_disc_wp_user'	=> absint( $_REQUEST['PRC_disc_wp_user'] ),
				'PRC_is_active' 			=> absint( $_REQUEST['PRC_is_active'] )
		);

		$where_cols_n_values = array('PRC_ID' => $_REQUEST['PRC_ID']);
		$PRC->update($set_column_values, $where_cols_n_values);
	}
}

function add_price_to_db() {

	if (check_admin_referer('espresso_form_check', 'add_price_to_db')) {

		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price.model.php');
		$PRC = EEM_Price::instance();

		$set_column_values = array(
				'PRT_ID' 						=> absint( $_REQUEST['PRT_ID'] ),
				'PRC_amount' 			=> abs( $_REQUEST['PRC_amount'] ),
				'PRC_name' 				=> wp_strip_all_tags( $_REQUEST['PRC_name'] ),
				'PRC_desc' 					=> wp_strip_all_tags( $_REQUEST['PRC_desc'] ),
				'PRC_use_dates'			=> absint( $_REQUEST['PRC_use_dates'] ),
				'PRC_disc_code'			=> wp_strip_all_tags( $_REQUEST['PRC_disc_code'] ),
				'PRC_disc_limit_qty'	=> absint( $_REQUEST['PRC_disc_limit_qty'] ),
				'PRC_disc_qty'				=> absint( $_REQUEST['PRC_disc_qty'] ),
				'PRC_disc_apply_all'	=> absint( $_REQUEST['PRC_disc_apply_all'] ),
				'PRC_disc_wp_user'	=> absint( $_REQUEST['PRC_disc_wp_user'] ),
				'PRC_is_active' 			=> absint( $_REQUEST['PRC_is_active'] )
		);
		$PRC->insert($set_column_values);
	}
}

function update_event_price_type() {

	if (check_admin_referer('espresso_form_check', 'update_event_price_type')) {
	
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price_Type.model.php');
		$PRT = EEM_Price_Type::instance();
		
		$base_type = wp_strip_all_tags( $_REQUEST['base_type'] );
		$name = wp_strip_all_tags( $_REQUEST['PRT_name'] );
		
		switch ( $base_type ) {
			
			case 'Price' :
				$_REQUEST['PRT_is_discount'] = 0;
				$_REQUEST['PRT_is_tax'] = 0;
				$_REQUEST['PRT_is_percent'] = 0;
				$_REQUEST['PRT_order'] = 0;
				
				$pos = strpos( $name, ' Price' );
				$trunc = strlen($name) - 6;
				if ( $pos == $trunc ) {
					$name = substr( $name, 0, $trunc );
				}
				$name = trim( $name ) . ' Price';
				$_REQUEST['PRT_name'] = $name;
				break;
			
			case 'Discount' :
				$_REQUEST['PRT_is_discount'] = 1;
				$pos = strpos( $name, ' Discount' );
				$trunc = strlen($name) - 9;
				if ( $pos == $trunc ) {
					$name = substr( $name, 0, $trunc );
				}
				$name = trim( $name ) . ' Discount';
				$_REQUEST['PRT_name'] = $name;
				break;
			
			case 'Surcharge' :
				$_REQUEST['PRT_is_discount'] = 0;
				$_REQUEST['PRT_is_tax'] = 0;
				$pos = strpos( $name, ' Surcharge' );
				$trunc = strlen($name) - 10;
				if ( $pos == $trunc ) {
					$name = substr( $name, 0, $trunc );
				}
				$name = trim( $name ) . ' Surcharge';
				$_REQUEST['PRT_name'] = $name;				
				break;
			
			case 'Tax' :
				$_REQUEST['PRT_is_discount'] = 0;
				$_REQUEST['PRT_is_tax'] = 1;
				$_REQUEST['PRT_is_percent'] = 1;
				$pos = strpos( $name, ' Tax' );
				$trunc = strlen($name) - 4;
				if ( $pos == $trunc ) {
					$name = substr( $name, 0, $trunc );
				}
				$name = trim( $name ) . ' Tax';
				$_REQUEST['PRT_name'] = $name;				
				break;
			
		}

	
		$set_column_values = array(
				'PRT_name' 			=> $_REQUEST['PRT_name'],
				'PRT_is_member' 	=> $_REQUEST['PRT_is_member'],
				'PRT_is_discount' 	=> $_REQUEST['PRT_is_discount'],
				'PRT_is_tax' 			=> $_REQUEST['PRT_is_tax'],
				'PRT_is_percent' 	=> $_REQUEST['PRT_is_percent'],
				'PRT_is_global' 		=> $_REQUEST['PRT_is_global'],
				'PRT_order' 			=> $_REQUEST['PRT_order']
		);

		$where_cols_n_values = array('PRT_ID' => $_REQUEST['PRT_ID']);
		
//		echo printr( $set_column_values, '$set_column_values' );	
//		echo printr( $where_cols_n_values, '$where_cols_n_values' );	

		if ( $PRT->update($set_column_values, $where_cols_n_values) ) {
			wp_redirect( PRC_ADMIN_URL );
			exit();
		}
		
	}
}

function add_price_type_to_db() {

	if (check_admin_referer('espresso_form_check', 'add_price_type_to_db')) {

		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price_Type.model.php');
		$PRT = EEM_Price_Type::instance();

		$set_column_values = array(
				'PRT_name' 			=> $_REQUEST['PRT_name'],
				'PRT_is_member' 	=> $_REQUEST['PRT_is_member'],
				'PRT_is_discount' 	=> $_REQUEST['PRT_is_discount'],
				'PRT_is_tax' 			=> $_REQUEST['PRT_is_tax'],
				'PRT_is_percent' 	=> $_REQUEST['PRT_is_percent'],
				'PRT_is_global' 		=> $_REQUEST['PRT_is_global'],
				'PRT_order' 			=> $_REQUEST['PRT_order']
		);

		$PRT->insert($set_column_values);
	}
}

