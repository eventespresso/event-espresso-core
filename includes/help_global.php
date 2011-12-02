<?php
/*
* Use this file for help pop ups that are the same in multiple files. 
*/?>
<div style="display: none;">

	<?php
  	/**
  	 * Payment status
  	 */
  ?>
  <div id="payment_status_info" class="pop-help" >
	<div class="TB-ee-frame">
	 <h2><?php _e('Default Payment Status Options', 'event_espresso'); ?></h2>
		<p><strong><?php _e('Incomplete', 'event_espresso'); ?></strong><br />
<?php _e('This is the default payment status.  While Incomplete is set as the default, all attendee information is recorded when they register, but those registrations do not count against the total number of available spaces.  That changes when an IPN message is sent from the payment gateway or the payment status for that attendee is updated manually.  If you have no credit card processing gateway active and are using the Invoice gateway, the status will change to Pending when the user downloads the invoice.', 'event_espresso'); ?></p>

<p><strong><?php _e('Pending', 'event_espresso'); ?></strong><br />
<?php _e('This means the attendee has not paid, but they do have a space reserved for them in the event.  When a user downloads an invoice, their payment status changes from Incomplete to Pending, reserving a space for them but not indicating that they have paid (since that would need to be recorded manually).', 'event_espresso'); ?></p>

<p><strong><?php _e('Complete', 'event_espresso'); ?></strong><br />
<?php _e('This means a payment notification has been received from the payment gateway or the attendee has been marked as paid manually from the back-end.', 'event_espresso'); ?></p>
	</div>
  </div>


	<?php
  	/**
  	 * A dummy example help box
  	 * use this to create new help boxes
  	 */
  ?>
  <div id="example_example_info" class="pop-help" >
	<div class="TB-ee-frame">
	 <h2><?php _e('Example Example', 'event_espresso'); ?></h2>
		<p><?php _e('Hey Mickey, you\'re so fine, you\'re so fine you blow my mind, hey Mickey', 'event_espresso'); ?></p>
	</div>
  </div>


</div><!--End <div style="display: none;"> -->
