<?php 
function update_event_ticket(){
	global $wpdb;
$ticket_id= $_REQUEST['ticket_id'];
		$ticket_name= $_REQUEST['ticket_name'];
		$ticket_subject= $_REQUEST['ticket_subject'];
		$ticket_text= $_REQUEST['ticket_text'];
	
	$sql=array('ticket_name'=>$ticket_name, 'ticket_text'=>$ticket_text, 'ticket_subject'=>$ticket_subject); 
		
		$update_id = array('id'=> $ticket_id);
		
		$sql_data = array('%s','%s','%s');
	
	if ($wpdb->update( EVENTS_TICKET_TABLE, $sql, $update_id, $sql_data, array( '%d' ) )){?>
	<div id="message" class="updated fade"><p><strong><?php _e('The ticket', 'event_espresso'); ?> <?php echo stripslashes(htmlentities2($_REQUEST['ticket_name']));?> <?php _e('has been updated', 'event_espresso'); ?>.</strong></p></div>
<?php }else { ?>
	<div id="message" class="error"><p><strong><?php _e('The ticket', 'event_espresso'); ?> <?php echo stripslashes(htmlentities2($_REQUEST['ticket_name']));?> <?php _e('was not updated', 'event_espresso'); ?>. <?php print mysql_error() ?>.</strong></p></div>

<?php
	}
}