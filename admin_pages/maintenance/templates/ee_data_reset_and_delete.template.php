<?php
/*
* a template with options for resetting and/or deleting EE data
*/
/** @var string $reset_capabilities_button */
/** @var string $reset_db_url */
/** @var string $delete_db_url */
?>
<h2>
	<?php esc_html_e( 'Reset/Delete Data for Event Espresso', 'event_espresso' );?>
</h2>
<br />

<div class="padding">
	<h4 class="espresso-header"><span class="dashicons dashicons-update ee-icon-size-22"></span><?php esc_html_e('Reset Ticket and Datetime Reserved Counts', 'event_espresso');?></h4>
	<p><?php esc_html_e('Use this to reset the counts for ticket and datetime reservations.', 'event_espresso');?></p>
	<div class="float-right"><?php echo $reset_reservations_button; ?></div>
	<div class="clear"></div>
</div>
<br />
<br />

<!-- reset DB url is here. Just need to make it look pretty and unhide it-->
<div class="padding">
	<h4 class="espresso-header"><span class="dashicons dashicons-update ee-icon-size-22"></span><?php esc_html_e('Reset Event Espresso Capabilities', 'event_espresso');?></h4>
	<p><?php esc_html_e('Use this to reset the capabilities on WP roles to the defaults as defined via EE_Capabilities.  Note this reset does not REMOVE any existing capabilities, it just ensures that all the defaults are ADDED to the roles.', 'event_espresso');?></p>
	<div class="float-right"><?php echo $reset_capabilities_button; ?></div>
	<div class="clear"></div>
</div>
<br />
<br />

<div class="padding">
	<h4 class="espresso-header"><span class="dashicons dashicons-update ee-icon-size-22"></span><?php esc_html_e('Reset Event Espresso Tables', 'event_espresso');?></h4>
	<p><?php esc_html_e('Use this to reset Event Espresso Data and return your site to how it was just after first activating Event Espresso.', 'event_espresso');?></p>
	<div class="float-right"><a class="button button-primary" href="<?php echo $reset_db_url;?>"><?php esc_html_e('Reset Event Espresso Tables', 'event_espresso');?></a></div>
	<div class="clear"></div>
</div>
<br />
<br />

<div class="padding">
	<h4 class="espresso-header"><span class="dashicons dashicons-post-trash ee-icon-size-22"></span><?php esc_html_e('Permanently Delete ALL Event Espresso Tables and Data', 'event_espresso');?></h4>
	<p><?php esc_html_e('If you know for certain that you will no longer be using Event Espresso and you wish to remove ALL traces of the plugin from your system, then perform the following steps.', 'event_espresso');?></p>
	<p class="important-notice"><?php printf( esc_html__('Please note: %sThis is permanent and can NOT be undone.%s', 'event_espresso'), '<strong>', '</strong>' ); ?><br/></p>
	<ol>
		<li><?php  printf( esc_html__('First, click the button below to permanently delete all Event Espresso tables, records, and options from your WordPress database . If you receive a "500 Internal Server Error" or a blank white screen, it means the server has timed out due to the large number of records being updated. This is not a cause for concern. Simply %1$srefresh the page%2$s and the Database Update will continue where it left off.', 'event_espresso'), '<strong>', '</strong>' );?></li>
		<li><?php printf( esc_html__('Then, locate Event Espresso on the WordPress Plugins page, and click on %sDelete%s', 'event_espresso'), '<strong>', '</strong>' ); ?></li>
        <li><?php printf( esc_html__('Once you are on the Delete Plugin page, click on %sYes, Delete these files and data%s', 'event_espresso'), '<strong>', '</strong>' ); ?></li>
	</ol>
	<div class="float-right"><a href="<?php echo $delete_db_url; ?>" id="delete-all-data-btn" class="button-primary"><?php esc_html_e('Permanently Delete All Event Espresso Data', 'event_espresso');?></a></div>
	<div class="clear"></div>
</div>
<br/>
<br/>


