<?php
/**
 * This file is a template for the Maintenance Page/Tools tab in the EE admin pages
 * The tools page is for listing any specific tools available to users.  Only accessible to users with the 'manage_options' capability.
 *
 * template args in use for this template
 * @type string $reset_capabilities_button	This button triggers resetting the capabilities to the defaults set in the EE_Capabilities class for each role.
 */
?>
<p><?php _e('This tools page contains a list of available tools for your Event Espresso Install', 'event_espresso'); ?></p>
<div class="ee-tools-container">
<div class="ee-tool">
	<h3><?php _e('Reset Capabilities', 'event_espresso'); ?></h3>
	<p class="description"><?php _e( 'Use this to reset the capabilities on WP roles to the defaults as defined via EE_Capabilities.  Note this reset does not REMOVE any existing capabilities, it just ensures that all the defaults are ADDED to the roles.', 'event_espresso' ); ?></p>
	<?php echo $reset_capabilities_button; ?>
</div>
</div>
