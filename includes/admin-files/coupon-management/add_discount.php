<?php
function add_discount_to_db(){
	global $wpdb, $espresso_wp_user, $notices;
	$wpdb->show_errors();
	if (isset($_POST['add_new_discount']) && check_admin_referer('espresso_form_check', 'add_new_promocode') ){
		if ( $_REQUEST['action'] == 'add' ){
	
			$sql=array(
			'coupon_code'=>$_REQUEST['coupon_code'],
			
			'quantity'=>$_REQUEST['quantity'],
			'use_limit'=>$_REQUEST['use_limit'],
			'use_exp_date'=>$_REQUEST['use_exp_date'],
			'exp_date'=>$_REQUEST['exp_date'],
		
			'coupon_code_price'=>$_REQUEST['coupon_code_price'],
			'coupon_code_description'=>$_REQUEST['coupon_code_description'],
			'use_percentage'=>$_REQUEST['use_percentage'],
			'wp_user'=>$espresso_wp_user
		); 
		
			$sql_data = array('%s','%s','%s','%s','%s','%s','%s','%s','%d');
	
			if ($wpdb->insert( EVENTS_DISCOUNT_CODES_TABLE, $sql, $sql_data )){
				$notices['updates'][] = __('The discount code ', 'event_espresso') . $sql['coupon_code'] .  __(' was saved', 'event_espresso');
	
			}else{ 
				$notices['errors'][] = __('The discount code ', 'event_espresso') . $sql['coupon_code'] .  __(' was not saved', 'event_espresso');
			}
		}
	}
}
