<?php
function add_staff_to_db(){
	global $wpdb, $espresso_wp_user, $notices;
	$wpdb->show_errors();
	if ( $_REQUEST['action'] == 'add' && check_admin_referer('espresso_form_check', 'add_new_staff') ){
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
		
		$identifier=uniqid($espresso_wp_user.'-');
		
		$sql=array(
			'identifier'=>$identifier,
			'role'=>$_REQUEST['role'],
			'name'=>$_REQUEST['name'],
			'email'=>$_REQUEST['email'],
			'wp_user'=>$espresso_wp_user,
			'meta'=>$meta
		); 
		
		$sql_data = array('%s', '%s', '%s','%s','%d','%s');
			
		if ($wpdb->insert( EVENTS_PERSONNEL_TABLE, $sql, $sql_data )){
			$notices['updates'][] = __('The staff member ', 'event_espresso') . $sql['name'] .  __(' has been updated', 'event_espresso');
		}else{ 
			$notices['errors'][] = __('The staff member', 'event_espresso') . $sql['name'] .  __(' was not updated!', 'event_espresso');		
		}
	}
}