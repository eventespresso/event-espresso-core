
<!--	<input type="hidden" id="reg-page-no-payment-required-payment_options" name="_reg-page-no-payment-required" value="1" />-->
	<p><?php echo apply_filters( 'FHEE__registration_page_payment_options__no_payment_required_pg', __( 'This is a free event, so no billing will occur.', 'event_espresso' )); ?></p>

	<?php echo $default_hidden_inputs;  ?>
	<?php echo $extra_hidden_inputs;  ?>



