<?php
function update_event_email(){
	global $wpdb, $notices;
	if(check_admin_referer('espresso_form_check', 'update_email')) {
		$email_id= $_REQUEST['email_id'];
		$email_type = $_REQUEST['email_type'];
		$email_name= $_REQUEST['email_name'];
		$email_subject= $_REQUEST['email_subject'];
		$email_text= $_REQUEST['email_text'];

		$sql=array('email_name'=>$email_name, 'email_type'=>$email_type, 'email_text'=>$email_text, 'email_subject'=>$email_subject);

		$update_id = array('id'=> $email_id);

		$sql_data = array('%s','%s','%s', '%s');
	}
	if ($wpdb->update( EVENTS_EMAIL_TABLE, $sql, $update_id, $sql_data, array( '%d' ) )){
		$notices['updates'][] = __('The email ', 'event_espresso') . $sql['email_name'] .  __(' was saved', 'event_espresso');
	}else{
		$notices['errors'][] = __('The email ', 'event_espresso') . $sql['email_name'] .  __(' was not saved', 'event_espresso');
	}
}