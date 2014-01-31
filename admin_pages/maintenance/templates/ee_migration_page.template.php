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
<h1><span class="dashicons dashicons-migrate"></span><?php _e("Database Migration Manager", "event_espresso");?></h1>
<div class='padding'>
	<div id='migration-prep'>
	<?php 
		if ( $show_most_recent_migration ) {
			if( $most_recent_migration && $most_recent_migration instanceof EE_Data_Migration_Script_Base ) {
				if( $most_recent_migration->can_continue() ) {
					//tell the user they shoudl continue their migration because it appears to be unfinished... well, assuming there were no errors ?>
					<p class="ee-attention">
						<?php printf(__("It appears that your previous Data Migration Task (%s) is incomplete, and should be resumed", "event_espresso"),$most_recent_migration->pretty_name());?>
					</p>
			<?php } elseif ( $most_recent_migration->is_borked() ) {
					//tell the user the migration failed and they should notify EE?>
					<h2><?php echo $most_recent_migration->get_feedback_message()?></h2>
			<?php } 
				
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
				<?php } else {
					//there were no errors during the last migration, just say so?>
					<h2><?php printf(__("The last data migration task (%s) ran successfully without errors.", "event_espresso"),$most_recent_migration->pretty_name())?></h2>
				<?php }
				} else {
			}
		} 
 		// END if ( $show_most_recent_migration ) 
 		?>
 		
 		
 		<?php if ( $script_names ) { ?>
 			<h3 class="espresso-header">
 				<span class="dashicons dashicons-admin-tools ee-icon-size-22"></span>
 				<?php _e("Event Espresso has detected existing Event Data that can be migrated (updated) to work with the New EE4.", "event_espresso");?>
 			</h3>
 		<?php } else { ?>
 			 <h3 class="espresso-header">
 			 	<span class="dashicons dashicons-awards ee-icon-size-22"></span>
 				 <?php _e('Congratulations! Your database is "up-to-date" and you are ready to begin using EE4', "event_espresso");?>
 			 </h3>
 			 <p>
 			 	<?php _e("Time to find out about all the great new features EE4 has to offer and what you need to do next.", "event_espresso");?> &nbsp; 
 			 	<a id="get-started-after-migrate" class="button-primary" href="<?php echo add_query_arg( array( 'page' => 'espresso_about' ), admin_url( 'admin.php' )); ?>">
 			 		<?php _e("Let's Get Started", "event_espresso");?>
 			 	</a>
 			 </p>
 		<?php } ?>
		
		
		<?php if ($show_backup_db_text){ ?>
		<div id="migration-options-dv">
			<h1><?php _e("Migration Options", "event_espresso");?><span class="tiny-text lt-grey-text"> &nbsp; <?php _e(' to migrate or not to migrate?', "event_espresso");?></span></h1>
			<div class="ee-table-wrap">
				<table>
					<tbody>
						<tr>
							<td><h3><?php _e('1', 'event_espresso');?></h3></td>
							<td>
								<?php 
								echo sprintf( 
									__('%1$sYes. I have backed up my database%2$s, %3$sunderstand the risks involved%4$s, and am ready to migrate my existing EE3 data to EE4.', "event_espresso"), 
									'<strong>', 
									'</strong>',
									'<a id="migration-risks" class="" title="' . __('click for more details', "event_espresso") . '">',
									'</a>'
								);
								?>
								<a id="display-migration-details" class="display-the-hidden lt-grey-text smaller-text hide-if-no-js" rel="migration-details" ><?php _e('click for more details', "event_espresso");?>&nbsp;+</a>
								<a  id="hide-migration-details" class="hide-the-displayed lt-grey-text smaller-text hide-if-no-js"  rel="migration-details" style="display:none;" ><?php echo sprintf( __( 'hide%1$sdetails%1$s-', 'event_espresso' ), '&nbsp;' ); ?></a>
							</td>
							<td>
								<a id="db-backed-up" class="toggle-migration-monitor button-primary"><?php _e("Migrate My EE3 Data to EE4", "event_espresso");?></a>
							</td>
						</tr>
						<tr>
							<td colspan="3" style="padding: 0">
								<div id="migration-details-dv" style="display: none; padding: 1em;">
									
									<span class="reminder-spn"><?php printf(__("%s Important: %s Before migrating, please back up your database and files.", "event_espresso"),"<b>","</b>");?></span>
									<p>
									<?php 
										printf(
											__('%1$sNot sure how to backup your existing data?%2$s Here is %3$sWordPress\'s explanation%7$s, and here\'s %6$sour explanation%7$s.%8$sYou can also search the WordPress plugin database for %4$s database backup plugins %7$s,%8$sor have one of our dedicated support technicians help you by purchasing a %5$sPriority Support Token%7$s.', "event_espresso"),
											'<b>',
											'</b>',
											"<a href='http://codex.wordpress.org/Backing_Up_Your_Database'>",
											"<a href='".admin_url('plugin-install.php?tab=search&type=term&s=database+backup&plugin-search-input=Search+Plugins')."'>",
											"<a href='http://eventespresso.com/product/priority-support-tokens/'>",
											'<a href="http://eventespresso.com/wiki/how-to-back-up-your-site/">',
											"</a>",
											'<br/>'
										);
									?>
									</p>
								</div>										
							</td>
						</tr>
						<tr>
							<td><h3><?php _e('2', 'event_espresso');?></h3></td>
							<td>
								<?php _e("I do NOT want to migrate my EE3 data to EE4 at this time and just want to use EE4 without migrating data", "event_espresso");?>
								<a id="display-no-migration-details" class="display-the-hidden lt-grey-text smaller-text hide-if-no-js" rel="no-migration-details"><?php _e('click for more details', "event_espresso");?>&nbsp;+</a>
								<a  id="hide-no-migration-details" class="hide-the-displayed lt-grey-text smaller-text hide-if-no-js"  rel="no-migration-details" style="display:none;" ><?php echo sprintf( __( 'hide%1$sdetails%1$s-', 'event_espresso' ), '&nbsp;' ); ?></a>
							</td>
							<td>
								<a id="do-not-migrate" class="do-not-migrate button-primary"><?php _e("Just Start EE4 with No Data", "event_espresso");?></a>
							</td>
						</tr>
						<tr>
							<td colspan="3" style="padding: 0">
								<div id="no-migration-details-dv" style="display: none; padding: 1em;">
									
									<span class="reminder-spn"><?php printf(__("%s Important: %s Before migrating, please back up your database and files.", "event_espresso"),"<b>","</b>");?></span>
									<p>
									<?php _e("we needs sometin smart to say here :\\", "event_espresso");?>		
									</p>
								</div>										
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<p class="ee-attention">
				<strong><span class="reminder-spn"><?php _e("Important note to those using Event Espresso 3 addons: ", "event_espresso");?></span></strong><br/><?php _e("Unless an addon's description on our website explicitly states that it is compatible with EE4, you should consider it incompatible and know that it WILL NOT WORK correctly with this new version of Event Espresso 4 (EE4). As well, any data for incompatible addons will NOT BE MIGRATED until an updated EE4 compatible version of the addon is available. If you want, or need to keep using your EE3 addons, you should simply continue using EE3 until EE4 compatible versions of your addons become available. To continue using EE3 for now, just deactivate EE4 and reactivate EE3.", "event_espresso");	?>
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
			<h3 class="espresso-header">
				<?php 
				echo  _n(
					"In order to import all of your existing Event Espresso data, the following upgrade task needs to be performed:", 
					"In order to import all of your existing Event Espresso data, the following %s upgrade tasks need to be performed:",
					count($script_names), 
					"event_espresso"
				);?>	
			</h3>		
			<ul style="list-style: inside;">
				<?php foreach($script_names as $script_name){?>
				<li style="margin: 0 0 1em 1em; line-height: 1.1em;"><?php echo $script_name?></li>
				<?php }?>
			</ul>
			<br/>
			<?php if (count($script_names) > 1) {?>
			<p><?php _e("Please note: after each task is completed you will need to continue the data migration, or report an error to Event Espresso.", "event_espresso");?></p>
			<?php }?>
			
			<p class="ee-attention">
				<span class="reminder-spn">
					<?php _e("Please Note:", "event_espresso");?>
				</span>
				<br/>
				<?php printf(__("Depending on the number of events and the complexity of the information in your database, this could take a few minutes.%s%sPlease be patient and do NOT navigate away from this page once the migration has begun%s. If any issues arise due to existing malformed data, an itemized report will be made available to you after the migration has completed.%sClick the button to begin the migration progress.", "event_espresso"), '<br/>', '<strong>', '</strong>', '<br/>' );?>
			</p>
			
			<div class="progress-responsive">
				<figure>
					<div class="progress-responsive__bar"></div>
					<div class="progress-responsive__percent"></div>
				</figure>
			</div>
			<!-- .progress-responsive -->
			
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
	   if ( $show_maintenance_switch ) {
 ?>
	<h2><?php  _e('Set Maintenance Mode', 'event_espresso');?></h2>
   	<form method='post' action='<?php echo $update_migration_script_page_link?>'>
		<div class="ee-table-wrap">
			<table>
				<tr>
					<td width="40px" align="center">
						<input type="radio" id="maintenance_mode_level_off" name="maintenance_mode_level" value="0" <?php echo EE_Maintenance_Mode::instance()->level() == EE_Maintenance_Mode::level_0_not_in_maintenance ? 'checked="checked"' : ''?>>
					</td>
					<th align="left">
						<label for="maintenance_mode_level_off"><?php  _e('Maintenance Mode OFF', 'event_espresso');?></label>
				   		<p class='description' style="font-weight: normal;">
					   		<?php _e("This is the normal operating mode for Event Espresso and allows all functionality to be viewed by all site visitors.", "event_espresso");?>
				   		</p>
					</th>
				</tr>
				<tr>
					<td width="40px" align="center">
						<input type="radio" id="maintenance_mode_level_on" name="maintenance_mode_level" value="1" <?php echo EE_Maintenance_Mode::instance()->level() == EE_Maintenance_Mode::level_1_frontend_only_maintenance ? 'checked="checked"' : ''?>>
					</td>
					<th align="left">
						<label for="maintenance_mode_level_on"> 
							<?php  _e('Maintenance Mode ON', 'event_espresso')?>
						</label>
				   		<p class='description' style="font-weight: normal;">
					   		<?php _e("This disables Event Espresso frontend functionality for all site visitors that are not administrators, and allows you to configure and/or test things on the frontend of your website before others can see.", "event_espresso");?>
				   		</p>
					</th>
				</tr>
			</table>
		</div>
		<p>
   			<input type='submit' class="button-primary" value='<?php _e("Update Maintenance Mode", "event_espresso");?>'>
   		</p>
   	</form>
	   	<?php
	   } ?>

</div>