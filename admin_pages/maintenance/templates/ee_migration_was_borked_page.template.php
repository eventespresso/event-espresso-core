<?php

?>
<h1><?php esc_html_e("Data Migration Error", "event_espresso");?></h1>
<p class='error'><?php printf(esc_html__("Your last Database Update had a %s FATAL ERROR, and CANNOT be continued%s.", "event_espresso"),"<b>","</b>");?></p>
<a id="show-hide-migration-warnings" class="display-the-hidden"><?php esc_html_e("Show Errors", 'event_espresso');?></a>
<ul class="migration-warnings" style="display:none">
<?php foreach($most_recent_migration->get_errors() as $error){ ?>
	<li style="overflow-y:auto;max-height:100px"><?php echo esc_html($error)?></li>
<?php }?>
</ul>
<h2><?php esc_html_e("Fill out the below form to automatically Send Event Espresso a Crash Report", "event_espresso");?></h2>
<form action='<?php echo EE_Admin_Page::add_query_args_and_nonce(array('action'=>'send_migration_crash_report'), EE_MAINTENANCE_ADMIN_URL);?>' method='post'>
	<table class='widefat'>
		<tr><td><label for='from'><?php esc_html_e("From/Reply-To:", "event_espresso");?></label></td><td><input name='from' id='from' type='text' style="width:200px"value='<?php echo get_bloginfo('admin_email','display'); ?>'></td></tr>
		<tr><td><label for='from_name'><?php esc_html_e("Your Name", "event_espresso");?></label></td><td><input name='from_name' id='from_name' type='text' style="width:200px"value='<?php printf(esc_html__("Admin of %s", "event_espresso"),get_bloginfo('name','display'));?>'></td></tr>
		<tr><td><label for='body'><?php esc_html_e("Comments", "event_espresso");?></label></td><td><textarea name="body" id="body" class='system_status_info'><?php esc_html_e("Enter any comments about why you think the error may have occurred", "event_espresso");?></textarea>
			<p class='description'><?php esc_html_e("Note: the System Information report will also be added to the email's body, which contains information about your Event Espresso, Wordpress, and PHP settings which can be helpful in debugging the problem.", "event_espresso");?></p></td></tr>
		<tr><td colspan="2"><input type="submit" value="<?php esc_html_e("Mail Crash Report to Event Espresso", "event_espresso");?>"/></td></tr>
	</table>
</form>
<br>
<p><?php printf(esc_html__('...or copy-and-paste the below information to %1$s %2$s %3$s', "event_espresso"),'<a href="mailto:'.EE_SUPPORT_EMAIL.'">',EE_SUPPORT_EMAIL,"</a>");?></p>
<textarea class="system_status_info"><?php print_r( EEM_System_Status::instance()->get_system_stati())?></textarea>
<p><?php printf( esc_html__( '%1$sNext Step%2$s', 'event_espresso' ), "<a href='$next_url'>","</a>");?></p>
<p><?php printf( esc_html__( '...or %1$sDON\'T send crash report%2$s.', 'event_espresso' ), "<a href='$next_url'>","</a>");?></p>
