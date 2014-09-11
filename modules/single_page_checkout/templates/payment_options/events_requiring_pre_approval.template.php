
	<h4 class="orange-text"><?php _e('Important Notice:', 'event_espresso');?></h4>
	<p id="events-requiring-pre-approval-pg" class="small-text drk-grey-text">
		<?php echo $events_requiring_pre_approval_msg; ?>
	</p>
	<h6><?php _e('Events Requiring Pre-Approval:', 'event_espresso');?></h6>
	<ul id="spco-pre-approval-events-ul"><?php echo $events_requiring_pre_approval; ?></ul>

	<?php echo $default_hidden_inputs;  ?>
	<?php echo $extra_hidden_inputs;  ?>

	<!--	<input id="reg-page-selected-method-of-payment" type="hidden" value="payments_closed" name="selected_method_of_payment">-->
<!--	<input type="hidden" id="reg-page-no-payment-required-payment_options" name="_reg-page-no-payment-required" value="1" />-->
