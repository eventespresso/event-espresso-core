<?php

/*
 * For displaying the migration page. Does not allow the user to migrate until all known EE
 * addons are updated from PUE. Using AJAX to run the migration and updat ethe progress bar
 * @var $script_names array of strings
 * @var $show_backup_db_text boolean
 * @var $most_recent_migration EE_Data_Migration_Script_Base
 * @var $show_continue_current_migration_script boolean 
 * @var $show_maintenance_switch boolean
 * @var $show_migration_progress boolean
 * @var $update_migration_script_page_link string
 */

?>
<h1><?php _e("Database Migration Manager", "event_espresso");?></h1>
<div class='main'>
	<div id='migration-prep'>
		<?php if ($show_most_recent_migration){
			if($most_recent_migration &&
					$most_recent_migration instanceof EE_Data_Migration_Script_Base){
				
				if($most_recent_migration->can_continue()){
					//tell the user they shoudl continue their migration because it appears to be unfinished... well, assuming there were no errors ?>
					<p><?php printf(__("Your previous Data Migration Task (%s) is incomplete, and should be resumed", "event_espresso"),$most_recent_migration->pretty_name());?></p>
				<?php }elseif($most_recent_migration->is_borked()){
					//tell the user the migration failed and they should notify EE?>
					<h2><?php echo $most_recent_migration->get_feedback_message()?></h2>
				<?php } ?>
				<?php 
				//display errors or not of the most recent migration ran
				if ($most_recent_migration->get_errors()){?>
					<p><?php printf(__("The following errors occurred during your last migration (%s):",'event_espresso'),$most_recent_migration->pretty_name()) ?></p>
					<ul>
					<?php foreach($most_recent_migration->get_errors() as $error){ ?>
						<li><?php echo $error ?></li>
					<?php }?>
					</ul>
				<?php }else {
					//there were no errors during the last migration, just say so?>
					<h2><?php printf(__("The last ran data migration task (%s) had no errors.", "event_espresso"),$most_recent_migration->pretty_name())?></h2>
				<?php }?>
			<?php }else{
			}
?>
		<?php }?>
		<?php if ( $script_names ) {?>
		<p><?php 
		_e("Your Event Espresso data needs to be migrated (updated).", "event_espresso");?>
		<?php echo  _n("The following upgrade task needs to be performed:", "The following %s upgrade tasks need to be performed:",count($script_names), "event_espresso");?></p>
		<ul>
			<?php foreach($script_names as $script_name){?>
			<li><?php echo $script_name?></li>
			<?php }?>
		</ul>
		<?php if (count($script_names) > 1) {?>
			<p><?php _e("Please note: after each task is completed you will need to continue the data migration, or report an error to Event Espresso.", "event_espresso");?></p>
		<?php }?>
		
		<?php }else{?>
			<h2><?php _e("Your Database is up-to-date", "event_espresso");?></h2>
		<?php }?>
		<?php if ($show_backup_db_text){ ?>
			<div id='backup_db_text'>
				<p><?php _e("Before running the data migration, you are REQUIRED to perform a database backup, in case it has an error and your
					database is left corrupted.", "event_espresso");?></p>
				<p><b><?php _e("Not sure how?", "event_espresso");?></b> 
					<?php printf(__('%1$s here is an explanation of how to do it %2$s. Or you can also %3$s search for a database backup plugin %2$s', "event_espresso"),
								"<a href='http://codex.wordpress.org/Backing_Up_Your_Database'>","</a>","<a href='".admin_url('plugin-install.php?tab=search&type=term&s=database+backup&plugin-search-input=Search+Plugins')."'>");?></p>
			</div>
		<div id='migration-confirm-backed-up'>
			<input type='checkbox' id='db-backed-up'> <label for='db-backed-up' id='db-backed-up-label'><?php _e("I have backed up my database", "event_espresso");?></label>
		</div>
		<?php } ?>
		
	</div>
	<?php if ($show_migration_progress){?>
	<div id='migration-monitor' <?php echo $show_backup_db_text ? "style='display:none'" : ''?>>
		<div id='migration-start-border'><button id='start-migration' class='button-primary'><?php echo $show_continue_current_migration_script ? sprintf(__("Continue Migration %s", "event_espresso"),array_shift($script_names)) : sprintf(__("Start Migration %s", "event_espresso"),array_shift($script_names));?></button></div>
		<div id='progress-area'>
			<div class="progress-responsive">
				<figure>
					<div class="progress-responsive__bar"></div>
					<div class="progress-responsive__percent"></div>
				</figure>
			</div><!-- .progress-responsive -->
		</div>
		<h2 id='main-message'>
			<!-- content dynamically added by js -->
		</h2>
		<div id='migration-messages' style='height:400px;overflow-y:scroll'>
			<!-- content dynamically added by js -->
		</div>
	</div>
	<?php }
	if ($show_maintenance_switch){?>
	<form method='post' action='<?php echo $update_migration_script_page_link?>'>
	<?php 
	?><input type="radio" id="maintenance_mode_level_off" name="maintenance_mode_level" value="0" <?php echo EE_Maintenance_Mode::instance()->level() == EE_Maintenance_Mode::level_0_not_in_maintenance ? 'checked="checked"' : ''?>>
		<label for="maintenance_mode_level_off"><?php  _e('Not In Maintenance (normal)', 'event_espresso');?></label>
	<input type="radio" id="maintenance_mode_level_on" name="maintenance_mode_level" value="1" <?php echo EE_Maintenance_Mode::instance()->level() == EE_Maintenance_Mode::level_1_frontend_only_maintenance ? 'checked="checked"' : ''?>>
		<label for="maintenance_mode_level_on"><?php  _e('Frontend Maintenance (disables Event Espresso frontend functionality, except to administrators)', 'event_espresso')?></label>
	
		<p class='description'><?php _e("Frontend Maintenance might be handy if you want to debug something on the frontend of your website before allowing non-administrators to see.", "event_espresso");?></p>
		<input type='submit' class="button-primary" value='<?php _e("Update Maintenance Mode Level", "event_espresso");?>'>
	</form>
	<?php } ?>
	
</div>