<?php
/*
* a template with options for reseting and/or deleting EE data
*/
?>
<h1>
	<?php _e( 'Reset and/or Delete EE Data', 'event_espresso' );?>
</h1><?php
$url = EE_Admin_Page::add_query_args_and_nonce(array('action'=>'rerun_migration_from_ee3'), EE_MAINTENANCE_ADMIN_URL);
?><a href='<?php echo $url?>'>remigrate</a>
<div class="padding">
	
	<h3 class="espresso-header"><span class="dashicons dashicons-post-trash ee-icon-size-22"></span><?php _e('Delete ALL Event Espresso Tables and Data', 'event_espresso');?></h3>
	<p><?php _e('If you know for certain that you will no longer be using Event Espresso and you wish to remove ALL traces of the plugin from your system, then perform the following steps. Please note that this is permanent and can NOT be undone.', 'event_espresso');?><br/></p>
	<ol>
		<li><?php printf( __('first click this button to %sPermanently Delete All Event Espresso Tables, Records and Options%s  from your database', 'event_espresso'), '<a href="' . $delete_db_url . '" id="delete-all-data-btn" class="button-primary">', '</a>' );?><br/><br/></li>
		<li><?php printf( __('then go to the %sWordPress Plugins page%s click the delete link within the Event Espresso plugin listing', 'event_espresso'), '<a href="' . admin_url('plugins.php') . '">', '</a>' );?><br/><br/></li>
		<li><?php _e('follow the rest of the WordPress steps Event Espresso plugin listing', 'event_espresso');?></li>
	</ol>
	
</div>