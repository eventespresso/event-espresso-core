<h3><?php _e('PayPal Standard', 'event_espresso'); ?></h3>
<p>
<?php _e('Adjust the settings for the PayPal Standard payment gateway.', 'event_espresso'); ?>
</p>
<p>
<?php printf( __( 'See %1$shere%2$s for list of currencies supported by Paypal Standard.', 'event_espresso' ), "<a href='https://www.paypal.com/multicurrency' target='_blank'>","</a>" ); ?>
</p>
<h3><?php _e('PayPal Standard Settings', 'event_espresso'); ?></h3>
<ul>
	<li>
<strong><?php _e('Use the PayPal Sandbox', 'event_espresso'); ?></strong><br />
<?php _e('If this option is enabled, be sure to enter your PayPal sandbox credentials in the fields above. Be sure to turn this setting off when you are done testing.', 'event_espresso'); ?>
</li>
<li>
<strong><?php _e('PayPal Email', 'event_espresso'); ?></strong><br />
<?php _e('Enter the email that you use to login to your PayPal account.', 'event_espresso'); ?>
</li>
<li>
<strong><?php _e('Image URL', 'event_espresso'); ?></strong><br />
<?php _e('Select an image/logo that should be shown on the payment page for PayPal.', 'event_espresso'); ?>
</li>
<li>
<strong><?php _e('PayPal Calculates Taxes', 'event_espresso'); ?></strong><br />
<?php printf( __('If set to "Yes", we will indicate to PayPal that it ought to calculate the taxes on the order and add it. This means PayPal\'s tax calculations will be used on the order instead of Event Espresso\'s. %1$sRead here for more information.%2$s', 'event_espresso'), "<a href='https://www.paypal.com/ca/cgi-bin/webscr?cmd=xpt/Marketing/shipping/EasyCalculateShipAndTax-outside' target='_blank'>", '</a>' ); ?><br/>
<?php _e( 'Important Note: PayPal calculates its taxes ONLY ON TAXABLE tickets. So if you mark an Event Espresso ticket as being non-taxable, PayPal will also respect that setting and those items will NOT be taxed.', 'event_espresso' );?>
</li>
<li>
<strong><?php _e('PayPal Calculates Shipping', 'event_espresso'); ?></strong><br />
<?php _e('Similar to the "PayPal Calculates Taxes" setting, if this is set to "Yes", we will indicate to PayPal that it ought to calculate the shipping on the order and it.', 'event_espresso'); ?><br/>
<?php _e( 'Important Note: PayPal will ONLY calculate shipping on an order if "Shipping Address Options" is set to "Prompt for an Address" (otherwise how will PayPal know how much to charge for shipping if it doesn\'t know where it\'s shipping to?)', 'event_espresso' );?>
<li>
<strong><?php _e( 'Notes Regarding Paypal Taxes and Shipping', 'event_espresso' );?></strong><br/>
<?php _e( 'If you want PayPal to calculate taxes and shipping on an order, those changes will NOT appear during the initial registration process until the user is redirected to PayPal for payment.', 'event_espresso' );?><br/>
<?php _e( 'However, after the user has returned from PayPal, their order in Event Espresso will be updated with the new taxes and added shipping charges (e.g. it will appear on their receipt.)', 'event_espresso' );?>
</li>
<li>
<strong><?php _e('Shipping Address Options', 'event_espresso'); ?></strong><br />
<?php _e('Specify whether an address should be requested on the payments page.', 'event_espresso'); ?>
</li>
<li>
<strong><?php _e('Button Image URL', 'event_espresso'); ?></strong><br />
<?php _e('Change the image that is used for this payment gateway.', 'event_espresso'); ?>
</li>
</ul>