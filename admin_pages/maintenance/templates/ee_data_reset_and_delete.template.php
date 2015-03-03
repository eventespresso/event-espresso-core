<?php
/*
* a template with options for reseting and/or deleting EE data
*/
?>
<h1>
	<?php _e( 'Reset/Delete Data for Event Espresso', 'event_espresso' );?>
</h1>
<br />

<!-- reset DB url is here. Just need to make it look pretty and unhide it-->
<div class="padding">
	<h3 class="espresso-header"><span class="dashicons dashicons-update ee-icon-size-22"></span><?php _e('Reset Event Espresso Capabilities', 'event_espresso');?></h3>
	<p><?php _e('Use this to reset the capabilities on WP roles to the defaults as defined via EE_Capabilities.  Note this reset does not REMOVE any existing capabilities, it just ensures that all the defaults are ADDED to the roles.', 'event_espresso');?></p>
	<div class="float-right"><?php echo $reset_capabilities_button; ?></div>
	<div class="clear"></div>
</div>
<br />
<br />

<div class="padding">
	<h3 class="espresso-header"><span class="dashicons dashicons-update ee-icon-size-22"></span><?php _e('Reset Event Espresso Tables', 'event_espresso');?></h3>
	<p><?php _e('Use this to reset Event Espresso Data and return your site to how it was just after first activating Event Espresso.', 'event_espresso');?></p>
	<div class="float-right"><a class="button button-primary" href="<?php echo $reset_db_url;?>"><?php _e('Reset Event Espresso Tables', 'event_espresso');?></a></div>
	<div class="clear"></div>
</div>
<br />
<br />

<div class="padding">
	<h3 class="espresso-header"><span class="dashicons dashicons-post-trash ee-icon-size-22"></span><?php _e('Permanently Delete ALL Event Espresso Tables and Data', 'event_espresso');?></h3>
	<p><?php _e('If you know for certain that you will no longer be using Event Espresso and you wish to remove ALL traces of the plugin from your system, then perform the following steps.', 'event_espresso');?></p>
	<p class="important-notice"><?php _e('Please note: <strong>This is permanent and can NOT be undone.</strong>', 'event_espresso');?><br/></p>
	<ol>
		<li><?php  _e('First, click the button below to permanently delete all Event Espresso tables, records, and options from your WordPress database', 'event_espresso');?></li>
		<li><?php _e('Then, locate Event Espresso on the WordPress Plugins page, and click on <strong>Delete</strong>.', 'event_espresso');?></li>
        <li><?php _e('Once you are on the Delete Plugin page, click on <strong>Yes, Delete these files and data</strong>', 'event_espresso');?></li>
	</ol>
	<div class="float-right"><a href="<?php echo $delete_db_url; ?>" id="delete-all-data-btn" class="button-primary"><?php _e('Permanently Delete All Event Espresso Data', 'event_espresso');?></a></div>
	<div class="clear"></div>
</div>
<br/>
<br/>


