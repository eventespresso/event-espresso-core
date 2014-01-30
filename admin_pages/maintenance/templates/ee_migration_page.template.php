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
<div class='padding'>
	<div id='migration-prep'>
		<?php if ($show_most_recent_migration){
			if($most_recent_migration &&
					$most_recent_migration instanceof EE_Data_Migration_Script_Base){
				
				if($most_recent_migration->can_continue()){
					//tell the user they shoudl continue their migration because it appears to be unfinished... well, assuming there were no errors ?>
					<p class="ee-attention"><?php printf(__("Your previous Data Migration Task (%s) is incomplete, and should be resumed", "event_espresso"),$most_recent_migration->pretty_name());?></p>
				<?php }elseif($most_recent_migration->is_borked()){
					//tell the user the migration failed and they should notify EE?>
					<h2><?php echo $most_recent_migration->get_feedback_message()?></h2>
				<?php } ?>
				<?php 
				//display errors or not of the most recent migration ran
				if ($most_recent_migration->get_errors()){?>
					<div class="ee-attention">
					<strong><?php printf(__("Warnings occurred during your last migration (%s):",'event_espresso'),$most_recent_migration->pretty_name()) ?></strong>
					<a id="show-hide-migration-warnings" class="display-the-hidden"><?php _e("Show Warnings", 'event_espresso');?></a>
					<ul class="migration-warnings" style="display:none">
					<?php foreach($most_recent_migration->get_errors() as $error){ ?>
						<li><?php echo $error ?></li>
					<?php }?>
					</ul>
					</div>
				<?php }else {
					//there were no errors during the last migration, just say so?>
					<h2><?php printf(__("The last data migration task (%s) ran successfully without errors.", "event_espresso"),$most_recent_migration->pretty_name())?></h2>
				<?php }?>
			<?php }else{
			}
?>
		<?php }?>
		<?php if ( $script_names ) {?>
		<h3 class="espresso-header"><span class="dashicons dashicons-migrate ee-icon-size-18" style="top:-1px; left:.25em;"></span><?php _e("Your Event Espresso data needs to be migrated (updated).", "event_espresso");?></h3>
		<p>
			<?php 
			echo  _n(
				"In order to import all of your existing Event Espresso data, the following upgrade task needs to be performed:", 
				"In order to import all of your existing Event Espresso data, the following %s upgrade tasks need to be performed:",
				count($script_names), 
				"event_espresso"
			);?>	
		</p>
		
		<ul style="list-style: inside;">
			<?php foreach($script_names as $script_name){?>
			<li style="margin: 0 0 1em 1em; line-height: 1.1em;"><?php echo $script_name?></li>
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
			<p class="ee-attention"><?php printf(__("Because any data migration has the potential to corrupt your information, you are %s REQUIRED %s to perform a database backup before running any Event Espresso data migration scripts.", "event_espresso"),"<b>","</b>");?></p>
			<p>
			<?php 
				printf(
					__('%1$sNot sure how to backup your existing data?%2$s Here is an %3$sexplanation%6$s.%7$sYou can also search the WordPress plugin database for %4$s database backup plugins %6$s, or have one of our dedicated support technicians help you by purchasing a %5$sPriority Support Token%6$s.', "event_espresso"),
					'<b>',
					'</b>',
					"<a href='http://codex.wordpress.org/Backing_Up_Your_Database'>",
					"<a href='".admin_url('plugin-install.php?tab=search&type=term&s=database+backup&plugin-search-input=Search+Plugins')."'>",
					"<a href='http://eventespresso.com/product/priority-support-tokens/'>",
					"</a>",
					'<br/>'
				);
			?>		
			</p>
			<p class="ee-attention">
				<b><?php _e("Important note to users with Event Espresso addons: ", "event_espresso");?></b><br/><?php _e("Your Event Espresso 3 (EE3) addons WILL NOT WORK with this new version of Event Espresso 4 (EE4), and their data will NOT BE MIGRATED unless the addon's description explicitly states that it is EE4 compatible. If you want, or need to keep using your EE3 addons, you SHOULD NOT USE EE4, and instead continue using EE3 until EE4 compatible versions of your addons becaome available. To continue using EE3 for now, simply deactivate EE4 and reactivate EE3.", "event_espresso");	?>
			</p>
		</div>
		<div id="migration-options-dv">
			<h1><?php _e("Migration Options", "event_espresso");?><span class="tiny-text lt-grey-text"> &nbsp; <?php _e(' to migrate or not to migrate?', "event_espresso");?></span></h1>
			<p>
				<label for='db-backed-up' id='db-backed-up-label'>
					<input type='checkbox' id='db-backed-up' class="toggle-migration-monitor">
					<?php 
					echo sprintf( 
						__("%sI have backed up my database%s, %sunderstand the risks involved%s, and am ready to migrate my existing EE3 data to EE4", "event_espresso"), 
						'<strong>', 
						'</strong>',
						'<a href="http://eventespresso.com/wiki/how-to-back-up-your-site/">',
						'</a>'
					);
					?>
				</label>
			</p>
			<p>	
				<label for='do-not-migrate' id='do-not-migrate-label'>
					<input type='checkbox' id='do-not-migrate' class="do-not-migrate" value="<?php echo $reset_db_page_link?>">
					<?php _e("I do NOT want to migrate my EE3 data to EE4 at this time and just want to use EE4 without migrating data", "event_espresso");?>
				</label>
			</p>
		</div>
		<?php } ?>
		
	</div>
	<?php if ($show_migration_progress){?>
	<div id='migration-monitor' <?php echo $show_backup_db_text ? "style='display:none'" : ''?>>
		<?php if( ! $show_continue_current_migration_script){?>
		<p>
			<a class="toggle-migration-monitor small-text" style="cursor: pointer;">
				<span class="dashicons dashicons-arrow-left-alt2" style="top:0px;"></span><?php _e("return to previous screen", "event_espresso");?>			
			</a>
			<br/>
			
		</p>
		<?php }?>
		<div id='progress-area'>
			<h3><?php echo $show_continue_current_migration_script ? array_shift($script_names) : array_shift($script_names);?></h3>
			<div class="progress-responsive">
				<figure>
					<div class="progress-responsive__bar"></div>
					<div class="progress-responsive__percent"></div>
				</figure>
			</div><!-- .progress-responsive -->
			<button id='start-migration' class='button-primary'>
			<?php echo $show_continue_current_migration_script ? __("Continue Migration", "event_espresso") : __("Begin Migration", "event_espresso");?>				
			</button>
			<br class="clear"/>
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
	<p>
		<input type="radio" id="maintenance_mode_level_off" name="maintenance_mode_level" value="0" <?php echo EE_Maintenance_Mode::instance()->level() == EE_Maintenance_Mode::level_0_not_in_maintenance ? 'checked="checked"' : ''?>>
		<label for="maintenance_mode_level_off"><?php  _e('Not In Maintenance (normal)', 'event_espresso');?></label>
	</p>
	<p><input type="radio" id="maintenance_mode_level_on" name="maintenance_mode_level" value="1" <?php echo EE_Maintenance_Mode::instance()->level() == EE_Maintenance_Mode::level_1_frontend_only_maintenance ? 'checked="checked"' : ''?>>
		<label for="maintenance_mode_level_on"><?php  _e('Frontend Maintenance (disables Event Espresso frontend functionality, except to administrators)', 'event_espresso')?></label>
	</p>
		<p class='description'><?php _e("Frontend Maintenance might be handy if you want to debug something on the frontend of your website before allowing non-administrators to see.", "event_espresso");?></p>
		<input type='submit' class="button-primary" value='<?php _e("Update Maintenance Mode Level", "event_espresso");?>'>
	</form>
	<?php } ?>
		
</div>