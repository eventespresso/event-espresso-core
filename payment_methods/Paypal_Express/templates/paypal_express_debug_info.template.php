<?php if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) { exit('No direct script access allowed'); } ?>

<div id="ppexpress-sandbox-panel" class="sandbox-panel">

	<h4 class="important-notice"><?php _e('Debug Mode is turned ON. You will be redirected to the PayPal Sandbox environment. Please use your Sandbox PayPal account for the checkout.', 'event_espresso'); ?></h4>

	<h4><?php _e('How do I test specific error codes?', 'event_espresso'); ?></h4>
	<p>
		<?php _e( 'To trigger an error condition on an amount-related field, 
			specify a error code value as a number with two digits to the right of the decimal point. 
			For example, specify a value of 107.55 to trigger the 10755 error.', 
		'event_espresso');?>
	</p>
	<p>
		<?php printf( __( 'More details can be found here: %1$s Testing Error Conditions %2$s.', 'event_espresso'), '<a href="https://developer.paypal.com/docs/classic/lifecycle/sb_error-conditions">', '</a>');?>
	</p>

</div>