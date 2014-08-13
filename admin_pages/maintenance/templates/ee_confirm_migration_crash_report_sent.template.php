<?php if ($success){?>
	<h1><?php _e("Data Migration Report Sent", "event_espresso");?></h1>
	<p><?php _e("A migration crash report email was sent to Event Espresso. You should hear back from us soon.", "event_espresso");?></p>
<?php }else{//didnt send email properly ?>
	<h1><?php _e("Migration Report not sent", "event_espresso");?></h1>
	<p><?php _e("Today's just not your day is it?", "event_espresso");?></p>
	<p><?php printf(__("...Tell you what, why don't you just copy-and-paste the below information to %s %s %s", "event_espresso"),'<a href="mailto:'.EE_SUPPORT_EMAIL.'">',EE_SUPPORT_EMAIL,"</a>");?></p>
	<textarea class="system_status_info"><?php echo EEM_System_Status::instance()->get_system_stati()?></textarea>
<?php } ?>


<h1><?php _e("What's next?", 'event_espresso');?></h1>
<p><?php _e("Well, it depends on your situation:", 'event_espresso');?></p>
<div class='ee-table-wrap'>
	<table>
		<thead><tr><th><?php _e("Your Situation", 'event_espresso');?></th><th><?php _e("Suggested Action", 'event_espresso');?></th></tr></thead>
		<tbody>
			<tr><td><p class='big-text'><?php _e("I want to retry migrating my data", 'event_espresso');?></p></td><td><p><?php printf( __('First, %1$s check the forums %2$s to see if there is a solution before re-attempting to migrate.', 'event_espresso'), "<a href='".EE_SUPPORT_EMAIL."' target='_blank'>", '</a>' );?></p><p><?php printf( __('To retry migrating your data: restore to the backup you made before the migration and reactivate EE (and any addons you are using) and re-run the migration scripts. If you did not make a database migration and are migrating from EE3: delete your EE4 data (use the %1$s Reset/Delete Data tab above%2$s), and then reactivate EE4, and then re-run the migration scripts.', 'event_espresso'), "<a href='$reset_db_page_url'>", "</a>" );?></p></td></tr>
			<tr><td><p class='big-text'><?php _e("I want to hear from Support before proceeding", 'event_espresso');?></p></td><td><?php printf( __('Just make sure you\'ve %1$s checked for a solution in the forums,%2$s and properly contacted Support. We will get back to you as soon as posisble', 'event_espresso'), "<a href='".EE_SUPPORT_EMAIL."'>", "</a>" );?></td></tr>
			<tr><td><p class='big-text'><?php printf( __('I don\'t need my old EE %s data', 'event_espresso'), $most_recent_migration->slug() );?></p></td><td><?php printf( __('If you are ok with losing all the EE %1$s data, you can skip the migrations and %2$s use EE4 with only default Data%3$s', 'event_espresso'), $most_recent_migration->slug(), "<a id='do-not-migrate' class='do-not-migrate button-primary' href='$reset_db_action_url'>","</a>");?></td></tr>
			<tr><td><p class='big-text'><?php printf( __('I want to go back to my old version of EE %1$s', 'event_espresso'), $most_recent_migration->slug() ) ;?></td><td><?php printf( __('Then we suggest you re-activate the old version of EE %3$s and restore your database to the backup you made just before migrating . If you didn\'t backup your database and are migrating from EE3, you can also delete your EE4 data (use on the %1$s"Reset/Delete Data" tab above%2$s), and then reactivate EE3 from the plugins page. Note: some of your EE3 shortcodes may have been changed to their EE4 equivalents, so you will need to change them back.', 'event_espresso'), "<a href='$reset_db_page_url'>", "</a>", $most_recent_migration->slug() );?></p>
					<p><?php _e("If you ever decide to re-attempt using EE4, you will again be given the option to migrate your EE3 data or not.", 'event_espresso');?></p></td></tr>

		</tbody>
	</table>
</div>