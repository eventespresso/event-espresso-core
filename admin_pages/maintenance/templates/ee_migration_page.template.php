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

if ( $show_backup_db_text ) { ?>
<h1><span class="dashicons dashicons-migrate"></span><?php _e("Database Migration Manager", "event_espresso");?></h1>
<?php } ?>
<div class="padding">
	<div id="migration-prep">

 		<?php if ( $script_names ) { ?>
 			<h3 class="espresso-header">
 				<span class="dashicons dashicons-flag ee-icon-size-22"></span>
 				<?php echo apply_filters('FHEE__ee_migration_page__header',  sprintf(__("Event Espresso has detected event data from version %s that can be migrated (updated) to work with version %s.", "event_espresso"),$current_db_state,$next_db_state),$current_db_state,$next_db_state);?>
 			</h3>
 			<p>
 			<?php echo apply_filters('FHEE__ee_migration_page__p_after_header',sprintf(__("Since you have already been using Event Espresso and have previous event and registration data in your database, you have the option to migrate, or copy over, this existing data into a format that is compatible with %s.", "event_espresso"),$next_db_state),$next_db_state);?>
 			</p>
 		<?php } elseif ( $show_most_recent_migration ) { ?>
 			 <h3 class="espresso-header">
 			 	<span class="dashicons dashicons-awards ee-icon-size-22"></span>
 				 <?php echo apply_filters('FHEE__ee_migration_page__done_migration_header',sprintf(__('Congratulations! Your database is "up-to-date" and you are ready to begin using %s', "event_espresso"),$ultimate_db_state));?>
 			 </h3>
 			 <p>
 			 	<?php echo apply_filters('FHEE__ee_migration_page__p_after_done_migration_header',sprintf(__("Time to find out about all the great new features %s has to offer.", "event_espresso"),$ultimate_db_state));?> &nbsp;
 			 	<b><a id="get-started-after-migrate" class="button-primary" href="<?php echo add_query_arg( array( 'page' => 'espresso_about' ), admin_url( 'admin.php' )); ?>">
 			 		<?php _e("Let's Get Started", "event_espresso");?>&nbsp;<span class="dashicons dashicons-arrow-right ee-icon-size-22" style="margin:0;"></span>
 			 	</a></b>
 			 </p>
 		<?php } ?>


		<?php if ($show_backup_db_text){ ?>
		<div id="migration-options-dv">
			<h2>
				<span class="dashicons dashicons-admin-tools"></span>
				<?php _e("Migration Options", "event_espresso");?>
				<span class="tiny-text lt-grey-text"> &nbsp; <?php _e(' to migrate or not to migrate?', "event_espresso");?></span>
			</h2>
			<div class="ee-table-wrap">
				<table>
					<tbody>
						<tr>
							<td><h3><?php _e('1', 'event_espresso');?></h3></td>
							<td>
								<?php
								echo apply_filters('FHEE__ee_migration_page__option_1_main',sprintf(
									__('%1$sYes. I have backed up my database%2$s, %3$sunderstand the risks involved%4$s, and am ready to migrate my existing %5$s data to %6$s.', "event_espresso"),
									'<strong>',
									'</strong>',
									'<a id="migration-risks" class="" title="' . __('click for more details', "event_espresso") . '">',
									'</a>',
									$current_db_state,
									$next_db_state
								),$current_db_state,$next_db_state);
								?>
								<a id="display-migration-details" class="display-the-hidden lt-grey-text smaller-text hide-if-no-js" rel="migration-details" ><?php _e('click for more details', "event_espresso");?>&nbsp;+</a>
								<a  id="hide-migration-details" class="hide-the-displayed lt-grey-text smaller-text hide-if-no-js"  rel="migration-details" style="display:none;" ><?php echo sprintf( __( 'hide%1$sdetails%1$s-', 'event_espresso' ), '&nbsp;' ); ?></a>
							</td>
							<td>
								<a id="db-backed-up" class="toggle-migration-monitor button-primary"><?php echo apply_filters('FHEE__ee_migration_page__option_1_button_text',sprintf(__("Migrate My %s Data to %s", "event_espresso"),$current_db_state,$next_db_state),$current_db_state,$next_db_state);?></a>
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
									<?php do_action('AHEE__ee_migration_page__option_1_extra_details');?>
								</div>
							</td>
						</tr>
						<tr>
							<td><h3><?php _e('2', 'event_espresso');?></h3></td>
							<td>
								<?php echo apply_filters( 'FHEE__ee_migration_page__option_2_main',sprintf(__('I do NOT want to migrate my %1$s data to %2$s at this time and just want to use %3$s without migrating data.', "event_espresso"),$current_db_state,$next_db_state,$ultimate_db_state),$current_db_state,$next_db_state,$ultimate_db_state);?><br />
								<span class="reminder-spn"><?php _e( 'Please Note: In order to avoid errors, any existing Event Espresso data (events, ticket, registrations, etc) in your db will be erased! Regular WP data will NOT be affected.', 'event_espresso' );?></span>
								<a id="display-no-migration-details" class="display-the-hidden lt-grey-text smaller-text hide-if-no-js" rel="no-migration-details"><?php _e('click for more details', "event_espresso");?>&nbsp;+</a>
								<a  id="hide-no-migration-details" class="hide-the-displayed lt-grey-text smaller-text hide-if-no-js"  rel="no-migration-details" style="display:none;" ><?php echo sprintf( __( 'hide%1$sdetails%1$s-', 'event_espresso' ), '&nbsp;' ); ?></a>
							</td>
							<td>
								<a id="do-not-migrate" class="do-not-migrate button-primary" href="<?php echo $reset_db_page_link;?>"><?php echo apply_filters('FHEE__ee_migration_page__option_2_button_text',sprintf(__("Just Start %s and Delete Existing Data", "event_espresso"),$ultimate_db_state),$ultimate_db_state);?></a>
							</td>
						</tr>
						<tr>
							<td colspan="3" style="padding: 0">
								<div id="no-migration-details-dv" style="display: none; padding: 1em;">
									<p>
									<?php echo apply_filters('FHEE__ee_migration_page__option_2_details',sprintf(__("If your existing Event and Registration Data is no longer relevant nor required, you can just start up %s without performing a data migration.", "event_espresso"),$ultimate_db_state),$ultimate_db_state);?>
									</p>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<?php do_action('AHEE__ee_migration_page__after_migration_options_table');?>
		</div>
	<?php } ?>

	<?php
		if ( $show_most_recent_migration ) {
			if( $most_recent_migration && $most_recent_migration instanceof EE_Data_Migration_Script_Base ) {
				if( $most_recent_migration->can_continue() ) {
					//tell the user they shoudl continue their migration because it appears to be unfinished... well, assuming there were no errors ?>
					<h3 class="espresso-header">
						<span class="dashicons dashicons-star-half ee-icon-size-22"></span>
						<?php printf(__("It appears that your previous Data Migration Task (%s) is incomplete, and should be resumed", "event_espresso"),$most_recent_migration->pretty_name());?>
					</h3>
			<?php } elseif ( $most_recent_migration->is_borked() ) {
					//tell the user the migration failed and they should notify EE?>
					<h3 class="espresso-header">
						<span class="dashicons dashicons-no ee-icon-size-22"></span>
						<?php echo $most_recent_migration->get_feedback_message()?>
					</h3>
			<?php }

				//display errors or not of the most recent migration ran
				if ( $most_recent_migration->get_errors() ){ ?>
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
 		// end of: if ( $show_most_recent_migration )
 	?>

	</div>
	<!--end of #migration-prep-->

	<?php if ($show_migration_progress){?>
	<div id='migration-monitor' <?php echo $show_backup_db_text ? "style='display:none'" : ''?>>
		<?php if( $show_backup_db_text){?>
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
				echo  sprintf( _n(
					"In order to import all of your existing Event Espresso data, the following upgrade task needs to be performed:",
					"In order to import all of your existing Event Espresso data, the following %s upgrade tasks need to be performed:",
					count($script_names),
					"event_espresso"
				), count( $script_names ) );?>
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

			<div class="ee-attention">
				<p>
					<span class="reminder-spn">
						<strong><?php _e("Please Note:", "event_espresso");?></strong>
					</span>
					<br/>
					<?php _e("Depending on the number of events and the complexity of the information in your database, this could take a few minutes.", "event_espresso");?>
				</p>
				<p>
					<?php printf(__("%sPlease be patient and do NOT navigate away from this page once the migration has begun%s. If any issues arise due to existing malformed data, an itemized report will be made available to you after the migration has completed.", "event_espresso"),'<strong>', '</strong>' );?>
				</p>
				<p>
					<?php _e("Click the button below to begin the migration process.", "event_espresso") ?>
				</p>
			</div>
			<div id="progress-responsive">
				<figure>
					<div id="progress-responsive__bar" style="background:#2EA2CC;"></div>
					<div id="progress-responsive__percent"></div>
				</figure>
			</div>
			<!-- #progress-responsive -->

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
	<h2><span class="dashicons dashicons-admin-tools"></span><?php  _e('Set Event Espresso Maintenance Mode', 'event_espresso');?></h2>
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