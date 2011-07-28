<?php 
function update_event_email(){
	global $wpdb;
$email_id= $_REQUEST['email_id'];
		$email_name= esc_html($_REQUEST['email_name']);
		$email_subject= esc_html($_REQUEST['email_subject']);
		$email_text= esc_html($_REQUEST['email_text']);
	
	$sql=array('email_name'=>$email_name, 'email_text'=>$email_text, 'email_subject'=>$email_subject); 
		
		$update_id = array('id'=> $email_id);
		
		$sql_data = array('%s','%s','%s');
	
	if ($wpdb->update( EVENTS_EMAIL_TABLE, $sql, $update_id, $sql_data, array( '%d' ) )){?>
	<div id="message" class="updated fade"><p><strong><?php _e('The email', 'event_espresso'); ?> <?php echo stripslashes(htmlentities2($_REQUEST['email_name']));?> <?php _e('has been updated', 'event_espresso'); ?>.</strong></p></div>
<?php }else { ?>
	<div id="message" class="error"><p><strong><?php _e('The email', 'event_espresso'); ?> <?php echo stripslashes(htmlentities2($_REQUEST['email_name']));?> <?php _e('was not updated', 'event_espresso'); ?>. <?php print mysql_error() ?>.</strong></p></div>

<?php
	}
}