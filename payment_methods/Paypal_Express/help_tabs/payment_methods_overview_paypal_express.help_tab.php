<p>
	<strong><?php _e( 'PayPal Express Checkout', 'event_espresso' ); ?></strong>
</p>
<p>
	<?php _e('Please be sure to update the settings for the PayPal Express Checkout payment method.', 'event_espresso'); ?>
</p>
<p>
	<?php printf( __('For more information on how to get your API credentials, please view the %1$sPayPal Documentation%2$s.', 'event_espresso'), '<a target="_blank" href="https://developer.paypal.com/docs/classic/api/apiCredentials/#create-an-api-signature">', '</a>' ); ?>
</p>


<p>
	<strong><?php _e('PayPal Express Checkout Settings', 'event_espresso'); ?></strong>
</p>
<ul>
	<li>
		<strong><?php _e( 'API Username', 'event_espresso' ); ?></strong><br/>
		<?php _e( 'Your PayPal API Username.'); ?>
	</li>
	<li>
		<strong><?php _e( 'API Password', 'event_espresso' ); ?></strong><br/>
		<?php _e( 'Your PayPal API Password.' ); ?>
	</li>
	<li>
		<strong><?php _e( 'API Signature', 'event_espresso' ); ?></strong><br/>
		<?php _e( 'Your PayPal Account Signature.' ); ?>
	</li>
	<li>
		<strong><?php _e( 'Request Shipping Address', 'event_espresso' ); ?></strong><br/>
		<?php _e( 'Indicates whether or not you require the buyer\'s shipping address on file with PayPal be a confirmed address.' ); ?>
	</li>
</ul>
<p>
	<?php printf( __('For testing please use a %1$s PaypPal Sandbox account%2$s.', 'event_espresso'), '<a target="_blank" href="https://developer.paypal.com">', '</a>' ); ?>
</p>
<p>
	<?php printf( __('Don\'t have PayPal? %1$sSign up for an account%2$s to get start right away.', 'event_espresso'), '<a target="_blank" href="hhttps://eventespresso.com/go/paypalstandard/">', '</a>' ); ?>
</p>