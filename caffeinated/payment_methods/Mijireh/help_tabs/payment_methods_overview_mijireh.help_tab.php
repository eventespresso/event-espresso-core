<p><strong><?php _e( 'Mijireh', 'event_espresso' ); ?></strong></p>
<p>
	<?php _e( 'Adjust the settings for the Mijireh payment gateway.', 'event_espresso' ); ?>
</p>
<p>
	<?php
	printf(
		__( 'Mijireh is basically a middle-man between Event Espresso and over 90 payment gateways. Most of the configuration occurs on %1$sMijireh\' website%2$s, where you configure your Mijireh store with the %3$spayment gateway of your choice%4$s.', 'event_espresso' ),
		'<a href="http://www.mijireh.com/" target="_blank">',
		'</a>',
		'<a href="http://www.mijireh.com/docs/payment-gateways/" target="_blank">',
		'</a>'
	);
	?>
</p>
<p>
	<?php _e( 'For information on what currencies you can use with Mijireh, please consult the payment gateway Mijireh is setup to use.', 'event_espresso' ) ?>
</p>
<ul>
	<li>
		<strong><?php _e( 'Mijireh Access Key', 'event_espresso' ); ?></strong><br/>
		<?php
		printf(
			__( 'Enter your Access Key for Mijireh. Your Access Key can be found in your %1$sMijireh account dashboard%2$s.', 'event_espresso' ),
			'<a href="https://secure.mijireh.com/login" target="_blank">',
			'</a>'
		);
		?>
	</li>
	<li>
		<strong><?php _e( 'Button Image URL', 'event_espresso' ); ?></strong><br/>
		<?php _e( 'Change the image that is used for this payment gateway.', 'event_espresso' ); ?>
	</li>
</ul>
<p><strong><?php _e( 'Mijireh Checkout Page Design', 'event_espresso' ); ?></strong></p>
<p>
	<?php _e( "As you are probably aware, when users pay with Mijireh Payment Method, they are taken to a secure offsite page, hosted by Mijireh. This page can easily be made to have the look-and-feel of your website through a process called 'slurping', where Mijireh 'slurps' up your website's design and uses it on their checkout page.", 'event_espresso' ); ?>
	<?php printf( __( "In order to do this, we automatically create a new WordPress page which is designed to be slurped by Mijireh. You can customize the page like any other, but the page must contain Mijireh's special '{{mijireh-checkout-form}}' shortcode. Once you have finished designing the page, publish it, and %s then click the special 'slurp now' button%s. Mijireh may take several minutes to slurp the page. Once Mijireh is finished slurping, you can delete the page, or mark it as a draft.", 'event_espresso' ), '<a href="http://ee-screenshots.s3.amazonaws.com/ee4/event-espresso-mijireh-slurp-page-example.jpg" target="_blank">', '</a>' ); ?>
</p>