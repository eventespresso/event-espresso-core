<?php
function add_locale_to_db(){
	global $wpdb, $espresso_wp_user, $notices;
	$wpdb->show_errors();
	if ( $_REQUEST['action'] == 'add' ){
		//print_r($_REQUEST);
		$identifier=uniqid($espresso_wp_user.'-');
		
		$sql=array(
			'identifier'=>$identifier,
			'name'=>$_REQUEST['name'],
			'wp_user'=>$espresso_wp_user
		); 
		
		$sql_data = array('%s','%s','%d');		
		  
		if ($wpdb->insert( EVENTS_LOCALE_TABLE, $sql, $sql_data )){
			$notices['updates'][] = __('The locale ', 'event_espresso') . $sql['name'] .  __(' has been added', 'event_espresso');
		}else{ 
			$notices['errors'][] = __('The locale', 'event_espresso') . $sql['name'] .  __(' was not saved!', 'event_espresso');		
		}
	}
}