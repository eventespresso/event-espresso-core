<?php

?>
<h1><?php _e("Data Migration Error", "event_espresso");?></h1>
<p class='error'><?php printf(__("Your last data migration had a %s FATAL ERROR, and CANNOT be continued%s.", "event_espresso"),"<b>","</b>");?></p>
<a id="show-hide-migration-warnings" class="display-the-hidden"><?php _e("Show Errors", 'event_espresso');?></a>
<ul class="migration-warnings" style="display:none">
<?php foreach($most_recent_migration->get_errors() as $error){ ?>
	<li><?php echo $error ?></li>
<?php }?>
</ul>
<h2><?php _e("Fill out the below form to automatically Send Event Espresso a Crash Report", "event_espresso");?></h2>
<form action='<?php echo EE_Admin_Page::add_query_args_and_nonce(array('action'=>'send_migration_crash_report'), EE_MAINTENANCE_ADMIN_URL);?>' method='post'>
	<table class='widefat'> 
		<tr><td><label for='from'><?php _e("From/Reply-To:", "event_espresso");?></label></td><td><input name='from' id='from' type='text' style="width:200px"value='<?php echo get_bloginfo('admin_email','display'); ?>'></td></tr>
		<tr><td><label for='from_name'><?php _e("Your Name", "event_espresso");?></label></td><td><input name='from_name' id='from_name' type='text' style="width:200px"value='<?php printf(__("Admin of %s", "event_espresso"),get_bloginfo('name','display'));?>'></td></tr>
		<tr><td><label for='body'><?php _e("Comments", "event_espresso");?></label></td><td><textarea name="body" id="body" class='system_status_info'><?php _e("Enter any comments about why you think the error may have occurred", "event_espresso");?></textarea>
			<p class='description'><?php _e("Note: the System Information report will also be added to the email's body, which contains information about your Event Espresso, Wordpress, and PHP settings which can be helpful in debugging the problem.", "event_espresso");?></p></td></tr>
		<tr><td colspan="2"><input type="submit" value="<?php _e("Mail Crash Report to Event Espresso", "event_espresso");?>"/></td></tr>
	</table>
</form>
<br>
<p><?php printf(__('...or copy-and-paste the below information to %1$s %2$s %3$s', "event_espresso"),'<a href="mailto:'.EE_SUPPORT_EMAIL.'">',EE_SUPPORT_EMAIL,"</a>");?></p>
<textarea class="system_status_info"><?php print_r( EEM_System_Status::instance()->get_system_stati())?></textarea>

<h1><?php _e("What's next?", 'event_espresso');?></h1>
<p><?php _e("Well, it depends on your situation:", 'event_espresso');?></p>
<div class='ee-table-wrap'>
	<table>
		<thead><tr><th><?php _e("Your Situation", 'event_espresso');?></th><th><?php _e("Suggested Action", 'event_espresso');?></th></tr></thead>
		<tbody>
			<tr><td><?php _e("I want to retry migrating my EE3 data", 'event_espresso');?></td><td><p><?php _e("First, check the forums to see if there is a solution before re-attempting to migrate.", 'event_espresso');?></p><p><?php _e("To retry migrating your data: delete your EE4 data (click on the 'Reset/Delete Data' tab above), and then reactivate EE4, and then re-run the migration scripts.", 'event_espresso');?></p></td></tr>
			<tr><td><?php _e("I'm not in a rush. I can wait to hear back from Event Espresso Support", 'event_espresso');?></td><td><?php _e("Just make sure you've checked for a solution in the forums, and properly contacted Support. Then make yourself comfortable.", 'event_espresso');?></td></tr>
			<tr><td><?php _e("Forget about keeping my EE3 data, I just want to use EE4!", 'event_espresso');?></td><td><?php printf(__("Then we suggest skipping the migrations and %s use EE4 with no Data %s", 'event_espresso'),"<a id='do-not-migrate' class='do-not-migrate button-primary' href='$reset_db_page_link'>","</a>");?></td></tr>
			<tr><td><p><?php _e("Forget about EE4. I want to keep using EE3!", 'event_espresso');?></td><td><?php _e("Then we suggest you restore your database to the backup you made just before migrating. If you didn't backup your database, then delete your EE4 data (click on the 'Reset/Delete Data' tab above), and then reactivate EE3 from the plugins page. Note: some of your EE3 shortcodes may have been changed to their EE4 equivalents, so you will need to change them back.", 'event_espresso');?></p>
					<p><?php _e("If you ever decide to re-attempt using EE4, you will again be given the option to migrate your EE3 data or not.", 'event_espresso');?></p></td></tr>
			
		</tbody>
	</table>
</div>
	