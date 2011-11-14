<?php
function update_event_discount() {
	global $wpdb, $current_user, $notices;
	$wpdb->show_errors();
	if( check_admin_referer('espresso_form_check', 'edit_promocode') ){
	$sql=array(
		'coupon_code'=>$_REQUEST['coupon_code'],
		
		'quantity'=>$_REQUEST['quantity'],
		'use_limit'=>$_REQUEST['use_limit'],
		'use_exp_date'=>$_REQUEST['use_exp_date'],
		'exp_date'=>$_REQUEST['exp_date'],
		
		'coupon_code_price'=>$_REQUEST['coupon_code_price'],
		'coupon_code_description'=>$_REQUEST['coupon_code_description'],
		'use_percentage'=>$_REQUEST['use_percentage']
	); 
		
	$update_id = array('id'=> $_REQUEST['discount_id']);
		
	$sql_data = array('%s','%s','%s','%s','%s','%s','%s','%s');
	}
		
	if ($wpdb->update( EVENTS_DISCOUNT_CODES_TABLE, $sql, $update_id, $sql_data, array( '%d' ) )){ 
	$notices['updates'][] = __('The discount code ', 'event_espresso') . $sql['coupon_code'] .  __(' was updated', 'event_espresso');		
			        
}else { 
	$notices['errors'][] = __('The discount code ', 'event_espresso') . $sql['coupon_code'] .  __(' was not updated', 'event_espresso');
 ?>
	<div>             
		<?php echo 'Debug: <br />';
  	print_r($sql);
  	print 'Number of vars: ' . count ($sql);
  	echo '<br />';
  	print 'Number of cols: ' . count($sql_data);?> 
	</div>
<?php
		}
}
