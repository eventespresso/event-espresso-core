<p><strong><?php esc_html_e('New Payment Method', 'event_espresso'); ?></strong></p>
<p>
<?php esc_html_e('Adjust the settings for the New Payment Method payment gateway.', 'event_espresso'); ?>
</p>
<p>
<?php printf( esc_html__( 'Please contact New Payment Method to find what currencies are supported', 'event_espresso' ) ); ?>
</p>
<p><strong><?php esc_html_e('New Payment Method Settings', 'event_espresso'); ?></strong></p>
<ul>
	<li>
<strong><?php esc_html_e('Debug Mode', 'event_espresso'); ?></strong><br />
<?php esc_html_e('If this option is enabled, be sure to enter your sandbox credentials in the fields below. Be sure to turn this setting off when you are done testing.', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('Login', 'event_espresso'); ?></strong><br />
<?php esc_html_e('The login used to login to New Payment Method.', 'event_espresso'); ?>
</li>
<li>
<strong><?php esc_html_e('Other Important Information', 'event_espresso'); ?></strong><br />
<?php printf( 
		esc_html__('This is a good place to mention how to setup an account with the payment gateway, and any important gotchas. You can use variables set from EE_PMT_New_Payment_method_Offsite::help_tabs_config() in here. Like this: %1$s', 'event_espresso'),
		$variable_x );?>
</li>
<li>
<strong><?php esc_html_e('Button Image URL', 'event_espresso'); ?></strong><br />
<?php esc_html_e('Change the image that is used for this payment gateway.', 'event_espresso'); ?>
</li>
</ul>