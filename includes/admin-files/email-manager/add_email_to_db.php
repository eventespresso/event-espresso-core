<?php
function add_email_to_db(){
	global $wpdb,$current_user;
	if ( $_REQUEST['action'] == 'add' ){
		$email_name= $_REQUEST['email_name'];
		$email_subject= $_REQUEST['email_subject'];
		$email_text= $_REQUEST['email_text']; 	
        
		if (!function_exists('espresso_member_data'))
			$current_user->ID = 1;

		$sql=array('email_name'=>$email_name, 'email_text'=>$email_text, 'email_subject'=>$email_subject, 'wp_user'=>$current_user->ID);
		
		$sql_data = array('%s','%s','%s','%s');
	
		if ($wpdb->insert( EVENTS_EMAIL_TABLE, $sql, $sql_data )){?>
		<div id="message" class="updated fade"><p><strong>The email <?php echo htmlentities2($_REQUEST['email_name']);?> has been added.</strong></p></div>
	<?php }else { ?>
		<div id="message" class="error"><p><strong>The email <?php echo htmlentities2($_REQUEST['email_name']);?> was not saved. <?php print mysql_error() ?>.</strong></p></div>

<?php
		}
	}
}