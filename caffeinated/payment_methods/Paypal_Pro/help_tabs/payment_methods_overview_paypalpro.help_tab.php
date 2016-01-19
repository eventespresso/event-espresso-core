<p><strong><?php _e('PayPal Pro', 'event_espresso'); ?></strong></p>
<p>
<?php _e('Adjust the settings for the PayPal Pro payment gateway.', 'event_espresso'); ?>
</p>
<p>
<?php printf( __( 'See %1$shere%2$s for list of currencies supported by Paypal Pro.', 'event_espresso' ), "<a href='https://www.paypal.com/multicurrency'>","</a>" ); ?>
</p>
<p><strong><?php _e('PayPal Pro Settings', 'event_espresso'); ?></strong></p>
<ul>
<li>
<strong><?php _e('PayPal Email', 'event_espresso'); ?></strong><br />
<?php _e('Enter the email that you use to login to your PayPal account.', 'event_espresso'); ?>
</li>
<li>
<strong><?php _e('PayPal API Username', 'event_espresso'); ?></strong><br />
<?php _e('Enter your API Username for PayPal. Learn how to find your <a href="https://www.paypal.com/us/cgi-bin/webscr?cmd=xpt/cps/merchant/wppro/WPProIntegrationSteps-outside#SectionB" target="_blank">API Username</a>.', 'event_espresso'); ?>
</li>
<li>
<strong><?php _e('PayPal API Password', 'event_espresso'); ?></strong><br />
<?php _e('Enter your API Password for PayPal. Learn how to find your <a href="https://www.paypal.com/us/cgi-bin/webscr?cmd=xpt/cps/merchant/wppro/WPProIntegrationSteps-outside#SectionB" target="_blank">API Password</a>.', 'event_espresso'); ?>
</li>
<li>
<strong><?php _e('PayPal API Signature', 'event_espresso'); ?></strong><br />
<?php _e('Enter your API Signature for PayPal. Learn how to find your <a href="https://www.paypal.com/us/cgi-bin/webscr?cmd=xpt/cps/merchant/wppro/WPProIntegrationSteps-outside#SectionB" target="_blank">API Signature</a>.', 'event_espresso'); ?>
</li>
<li>
<strong><?php _e('Country Currency', 'event_espresso'); ?></strong><br />
<?php _e('Select the currency for your country. Payments will be accepted in this currency.', 'event_espresso'); ?>
</li>
<li>
<strong><?php _e('Accepted Card Types', 'event_espresso'); ?></strong><br />
<?php _e('Select the card types that you want to accept payments from.', 'event_espresso'); ?>
</li>
<li>
<strong><?php _e('Use the Debugging Feature and the PayPal Sandbox', 'event_espresso'); ?></strong><br />
<?php _e('Specify if you want to test the payment gateway by submitting a test transaction. If this option is enabled, be sure to enter your PayPal sandbox credentials in the fields above. Be sure to turn this setting off when you are done testing.', 'event_espresso'); ?>
</li>
<li>
<strong><?php _e('Button Image URL', 'event_espresso'); ?></strong><br />
<?php _e('Change the image that is used for this payment gateway.', 'event_espresso'); ?>
</li>
</ul>