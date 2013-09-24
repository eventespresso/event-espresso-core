<?php if ($success){?>
	<h1><?php _e("Data Migration Report Sent", "event_espresso");?></h1>
	<p><?php _e("A migration crash report email was sent to Event Espresso. You should hear back from us soon.", "event_espresso");?></p>
<?php }else{//didnt send email properly ?>
	<h1><?php _e("Error Sending Data Migration Report", "event_espresso");?></h1>
	<p><?php _e("Today's just not your day is it?", "event_espresso");?></p>
	<p><?php printf(__("...Tell you what, why don't you just copy-and-paste the below information to %s %s %s", "event_espresso"),'<a href="mailto:'.EE_SUPPORT_EMAIL.'">',EE_SUPPORT_EMAIL,"</a>");?></p>
	<textarea class="system_status_info"><?php echo EEM_System_Status::instance()->get_system_stati()?></textarea>
<?php } ?>
<p><?php _e("In the meantime, you'll probably want to restore your database from your backup created before starting the data migration.", "event_espresso");?></p>