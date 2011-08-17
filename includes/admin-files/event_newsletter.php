<?php
function event_newsletter($event_id=0){
	//print_r($_POST);
	if ($_POST['action']=='send_newsletter'){
		espresso_event_reminder($event_id, $_POST['email_subject'], $_POST['email_text'], $_POST['email_name']);
	}
	//echo $event_id;
	global $wpdb, $org_options;
	wp_tiny_mce( false , // true makes the editor "teeny"
		array(
			"editor_selector" => "theEditor"//This is the class name of your text field
		)
	);
	
	$events = $wpdb->get_results("SELECT * FROM " . EVENTS_DETAIL_TABLE . " WHERE id = '" . $event_id . "'");
	foreach ($events as $event){

		$event_id = $event->id;
		$event_name = stripslashes_deep($event->event_name);
		$event_description = stripslashes_deep($event->event_desc);
		$start_date =$event->start_date;
		$end_date =$event->end_date;
		$start_time = $event->start_time;
		$end_time = $event->end_time;
		$conf_mail=stripslashes_deep($event->conf_mail);
		
	}
?>
  <div id="poststuff" class="metabox-holder has-right-sidebar">
  <?php event_espresso_display_right_column ();?>
  <div id="post-body">
<div id="post-body-content">
 <div class="metabox-holder">
			<div class="postbox">
<h3><?php _e('Send an Email to the Attendees of','event_espresso');?> <a href="admin.php?page=events&amp;action=edit&amp;event_id=<?php echo $event_id ?>"><?php echo '"' . $event_name . '"'; ?></a></h3>
 <div class="inside">
  <form method="post" action="<?php echo $_SERVER['REQUEST_URI'];?>">
  <input type="hidden" name="action" value="send_newsletter"><p><strong><?php _e('Use a <a href="admin.php?page=event_emails">pre-existing email</a>? ', 'event_espresso');?></strong> <?php echo espresso_db_dropdown(id, email_name, EVENTS_EMAIL_TABLE, email_name, $email_id, 'desc') . ' <a class="thickbox" href="#TB_inline?height=300&width=400&inlineId=email_manager_info"><img src="' . EVENT_ESPRESSO_PLUGINFULLURL . '/images/question-frame.png" width="16" height="16" /></a>'; ?> </p>
  <p><strong><?php _e('OR', 'event_espresso'); ?></strong></p>
   <ul>
    <li><label for="email_subject"><?php _e('Email Subject Line','event_espresso'); ?></label> <input type="text" name="email_subject" size="25"></li>
   <li><label for="email_text"><?php _e('Email Text','event_espresso'); ?></label><br />
   <textarea class="theEditor" id="email_text" name="email_text"></textarea>
      <br />
<a class="thickbox" href="#TB_inline?height=300&width=400&inlineId=custom_email_info"><?php _e('View Custom Email Tags', 'event_espresso'); ?></a>  | <a class="thickbox" href="#TB_inline?height=300&width=400&inlineId=custom_email_example"> <?php _e('Email Example','event_espresso'); ?></a>
   </li>
   <li>
    <p>
            <input class="button-primary" type="submit" name="Submit" value="<?php _e('Send Email to Attendees'); ?>" id="add_new_email" />
            </p>
    </li>
   </ul>
     </form>
    
     </div>
	</div>
    <p><a href="admin.php?page=events&amp;action=edit&amp;event_id=<?php echo $event_id ?>"><?php _e('<< Back to', 'event_espresso'); ?> <?php echo  $event_name; ?></a></p>
</div>
</div>
</div>
</div>
<div id="email_manager_info" style="display:none">
<h2><?php _e('Pre-existing Emails', 'event_espresso'); ?></h2>
      <p><?php _e('This will override the custom email below if selected.', 'event_espresso'); ?></p>
</div>
<?php
echo event_espresso_custom_email_info();
}