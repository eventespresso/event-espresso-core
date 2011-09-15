<?php
function add_ticket_to_db(){
	global $wpdb,$current_user;
	if ( $_REQUEST['action'] == 'add' ){
		$ticket_name= $_REQUEST['ticket_name'];
		$ticket_subject= $_REQUEST['ticket_subject'];
		$ticket_text= $_REQUEST['ticket_text']; 	
        
		if (!function_exists('espresso_member_data'))
			$current_user->ID = 1;

		$sql=array('ticket_name'=>$ticket_name, 'ticket_text'=>$ticket_text, 'ticket_subject'=>$ticket_subject, 'wp_user'=>$current_user->ID);
		
		$sql_data = array('%s','%s','%s','%s');
	
		if ($wpdb->insert( EVENTS_TICKET_TABLE, $sql, $sql_data )){?>
		<div id="message" class="updated fade"><p><strong><?php _e('The ticket', 'event_espresso'); ?> <?php echo htmlentities2($_REQUEST['ticket_name']);?> <?php _e('has been added.', 'event_espresso'); ?></strong></p></div>
	<?php }else { ?>
		<div id="message" class="error"><p><strong><?php _e('The ticket', 'event_espresso'); ?> <?php echo htmlentities2($_REQUEST['ticket_name']);?> <?php _e('was not saved.', 'event_espresso'); ?> <?php print mysql_error() ?>.</strong></p></div>

<?php
		}
	}
}