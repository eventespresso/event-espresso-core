<?php
/*
* a template with options for reseting and/or deleting EE data
*/
?>
<h1>
	<?php _e( 'Reset/Delete Data for Event Espresso', 'event_espresso' );?>
</h1>
<!-- reset DB url is here. Just need to make it look pretty and unhide it-->
<a style='display:none'href='<?php echo $reset_db_url;?>'>reset</a>
<div class="padding">
	<h3 class="espresso-header"><span class="dashicons dashicons-post-trash ee-icon-size-22"></span><?php _e('Delete ALL Event Espresso Tables and Data', 'event_espresso');?></h3>
	<p><?php _e('If you know for certain that you will no longer be using Event Espresso and you wish to remove ALL traces of the plugin from your system, then perform the following steps. Please note that this is permanent and can NOT be undone.', 'event_espresso');?></p>
	<p><?php _e('<strong>This is permanent and can NOT be undone.</strong>', 'event_espresso');?><br/></p>
	<ol>
		<li><?php printf( __('First, click this button to %sPermanently Delete All Event Espresso Tables, Records, and Options%s  from your WordPress database', 'event_espresso'), '<a href="' . $delete_db_url . '" id="delete-all-data-btn" class="button-primary">', '</a>' );?><br/><br/></li>
		<li><?php _e('Locate Event Espresso on the WordPress Plugins page. Then click on <strong>Delete</strong>.', 'event_espresso');?></li>
        <li><?php _e('Once you are on the Delete Plugin page, click on <strong>Yes, Delete these files and data</strong>', 'event_espresso');?></li>
	</ol>
</div>