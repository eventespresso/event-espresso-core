<p><strong><?php _e('Payment Methods Overview', 'event_espresso'); ?></strong></p>
<p>
<?php _e('This page shows all available payment methods for Event Espresso.', 'event_espresso'); ?>
</p>
<p><strong><?php _e('Common Settings', 'event_espresso' )?></strong></p>
<ul>
	<li>
		<strong><?php _e( 'Name', 'event_espresso' );?></strong><br>
		<?php _e( 'The name of the payment method as customers see it in the registration form, in emails, in receipts, etc.', 'event_espresso' );?>
	</li>
	<li>
		<strong><?php _e( 'Description', 'event_espresso' );?></strong><br/>
		<?php _e( 'The description of how to use the payment method as customers will see it. This is mostly only seen during registration.', 'event_espresso' );?>
	</li>
	<li><strong><?php _e( 'Admin-Only Name', 'event_espresso' );?></strong><br/>
		<?php _e( 'The name of the payment method as seen internally by site administrators and staff.', 'event_espresso' );?>
	</li>
	<li>
		<strong><?php _e( 'Admin-Only Description', 'event_espresso' );?></strong><br/>
		<?php _e( 'The description of the payment method as seen internally by site administrators and staff.', 'event_espresso' );?>
	</li>
	<li>
		<strong><?php _e( 'Debug (sandbox) Mode', 'event_espresso' );?></strong><br/>
		<?php _e( 'Many payment methods have a debug/sandbox mode where payments are not processed but are only simulated. This is helpful when setup and debugging.', 'event_espresso' );?>
	</li>
	<li>
		<strong><?php _e( 'Open by Default', 'event_espresso' );?></strong><br/>
		<?php _e( 'If checked, this payment method will be selected by default (assuming no other valid payment methods are also marked as open by default.)', 'event_espresso' );?>
	</li>
	<li>
		<strong><?php _e( 'Button URL', 'event_espresso' );?></strong><br/>
		<?php printf( __( 'The URL of the button image for this payment method in the registration process. You may use any uploaded image on your website (click %s next to the field to select). If left blank, the default button image will be used.', 'event_espresso' ), '<img src="' . admin_url('images/media-button-image.gif') . '">' );?>
	</li>
	<li><strong><?php _e( 'Usable From', 'event_espresso' );?></strong><br/>
	<?php _e( 'Where this payment method can be used from.', 'event_espresso' );?>
		<ul>
			<li><?php _e( 'Front-end Registration Page: the payment method will appear as an option during the normal registration process to customers and they can use it to process payments.', 'event_espresso' );?></li>
			<li><?php _e( 'Admin Registration Page: when recording payments made from the transaction admin page, the payment method will appear as an option. Note: currently payments can only be RECORDED from the admin, they cannot be PROCESSED.', 'event_espresso' );?></li>
		</ul>
	</li>
</ul>
<strong><?php _e('Recommendations', 'event_espresso'); ?></strong><br />
<?php _e('Want to see a tour of this screen? Click on the Payment Methods Overview Tour button which appears on the right side of the page. <br />To learn more about the options on this page, take a look at the different tabs that appear on the left side of the page.', 'event_espresso'); ?>
</p>
<p>
<strong><?php _e('Screen Options', 'event_espresso'); ?></strong><br />
<?php _e('You can customize the information that is shown on this page by toggling the Screen Options tab. Then you can add or remove checkmarks to hide or show certain content.', 'event_espresso'); ?>
</p>