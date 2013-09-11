<?php

/*
 * For displaying the migration page. Does not allow the user to migrate until all known EE
 * addons are updated from PUE. Using AJAX to run the migration and updat ethe progress bar
 */
?>
<h1><?php _e("Database Migration Manager", "event_espresso");?></h1>
<div class='main'>
	<div id='migration-prep'>
		<p><?php _e("Your Event Espresso database must be migrated to version 4.1.0. Before doing this, you are REQUIRED to perform a database backup, in case it has an error and your
			database is left corrupted.", "event_espresso");?></p>
		<p><b><?php _e("Not sure how?", "event_espresso");?></b> 
			<?php printf(__('%1$s here is an explanation of how to do it %2$s. Or you can also %3$s search for a database backup plugin %2$s', "event_espresso"),
						"<a href='http://codex.wordpress.org/Backing_Up_Your_Database'>","</a>","<a href='".admin_url('plugin-install.php?tab=search&type=term&s=database+backup&plugin-search-input=Search+Plugins')."'>");?></p>
		<div id='migration-confirm-backed-up'>
			<input type='checkbox' id='db-backed-up'> <label for='db-backed-up' id='db-backed-up-label'><?php _e("I have backed up my database", "event_espresso");?></label>
		</div>
	</div>
	<div id='migration-debrief-success' style='display:none'>
		<p><?php_e("Database Migration Finished Successfully. ", "event_espresso");?></p>
		<p><a href=''><?php_e("Take your site out of Maintenance Mode", "event_espresso");?></a></p>
	</div>
	<div id='migration-monitor' style='display:none'>
		<div id='migration-start-border'><button id='start-migration' class='button'><?php _e("Start Migration", "event_espresso");?></button></div>
		<div id='progress-area'>
			<div class="progress-responsive">
				<figure>
					<div class="progress-responsive__bar"></div>
					<div class="progress-responsive__percent"></div>
				</figure>
			</div><!-- .progress-responsive -->
		</div>
		<h2 id='main-message'>
			
		</h2>
		<div id='migration-messages' style='height:400px;overflow-y:scroll'>

		</div>
	</div>
</div>