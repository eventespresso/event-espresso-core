<?php 
function update_event_locale(){
	global $wpdb, $notices;
	$wpdb->show_errors();
	//print_r($_REQUEST);
	$sql=array('name'=>$_REQUEST['name']); 
	$update_id = array('id'=> $_REQUEST['locale_id']);
	$sql_data = array('%s','%s','%s','%s','%s','%s','%s','%s','%s');
	
	if ($wpdb->update( EVENTS_LOCALE_TABLE, $sql, $update_id, $sql_data, array( '%d' ) )){
		$notices['updates'][] = __('The locale ', 'event_espresso') . $sql['name'] .  __(' has been updated', 'event_espresso');
	}else{ 
		$notices['errors'][] = __('The locale', 'event_espresso') . $sql['name'] .  __(' was not updated!', 'event_espresso');		
	}
}