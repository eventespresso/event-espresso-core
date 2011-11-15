<?php
function add_email_to_db(){
	global $wpdb, $espresso_wp_user, $notices;
	if ( $_REQUEST['action'] == 'add' && check_admin_referer('espresso_form_check', 'add_new_email')){
		$email_name= $_REQUEST['email_name'];
		$email_subject= $_REQUEST['email_subject'];
		$email_text= $_REQUEST['email_text']; 	

		$sql=array(
			'email_name'=>$email_name,
			'email_text'=>$email_text,
			'email_subject'=>$email_subject,
			'wp_user'=>$espresso_wp_user
		);
		
		$sql_data = array('%s','%s','%s','%s');
	
		if ($wpdb->insert( EVENTS_EMAIL_TABLE, $sql, $sql_data )){
			$notices['updates'][] = __('The email ', 'event_espresso') . $sql['email_name'] .  __(' was saved', 'event_espresso');
		}else{ 
			$notices['errors'][] = __('The email ', 'event_espresso') . $sql['email_name'] .  __(' was not saved', 'event_espresso');
		}
	}
}