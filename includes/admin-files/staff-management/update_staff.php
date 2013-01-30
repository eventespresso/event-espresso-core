<?php 
function update_event_staff(){
	global $wpdb, $notices;
	if( check_admin_referer('espresso_form_check', 'update_staff') ) {
	$wpdb->show_errors();
	//print_r($_REQUEST);
	$staff_meta['phone'] = $_REQUEST['phone'];
	$staff_meta['twitter'] = $_REQUEST['twitter'];
	$staff_meta['image'] = $_REQUEST['image'];
	$staff_meta['website'] = $_REQUEST['website'];
	$staff_meta['description'] = esc_html($_REQUEST['description']);
	
	$staff_meta['organization'] = esc_html($_REQUEST['organization']);
	$staff_meta['title'] = esc_html($_REQUEST['title']);
	$staff_meta['industry'] = esc_html($_REQUEST['industry']);
	$staff_meta['city'] = esc_html($_REQUEST['city']);
	$staff_meta['country'] = esc_html($_REQUEST['country']);
	
	$meta = serialize($staff_meta);
		
	
	$sql=array(
		'name'=>$_REQUEST['name'],
		'role'=>$_REQUEST['role'],
		'email'=>$_REQUEST['email'],
		'meta'=>$meta
	); 
		
	$update_id = array('id'=> $_REQUEST['staff_id']);
		
	$sql_data = array('%s','%s','%s','%s');
	}
	if ( $wpdb->update(EVENTS_PERSONNEL_TABLE, $sql, $update_id, $sql_data, array( '%d' )) ){
		$notices['updates'][] = __('The staff member ', 'event_espresso') . $sql['name'] .  __(' has been updated', 'event_espresso');
	}else{ 
		$notices['errors'][] = __('The staff member', 'event_espresso') . $sql['name'] .  __(' was not updated!', 'event_espresso');		
	}
}