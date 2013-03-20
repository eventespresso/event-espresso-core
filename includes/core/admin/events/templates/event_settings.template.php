<div class="padding">
	<table class="form-table">
		<tbody>

			<tr>
				<th>
					<label for="expire_on_registration_end">
						<?php _e('Events Expire on Reg End Date?', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EE_Form_Fields::select_input( 'expire_on_registration_end', $values, $expire_on_registration_end ); ?>
					<p class="description">
						<?php _e('If set to "Yes", then as soon as an event\'s registration end date has passed, the event will become inactive, and will no longer appear in your event listings.', 'event_espresso'); ?>
					</p>
				</td>
			</tr>

			<tr>
				<th>
					<label for="default_reg_status">
						<?php _e(' Default Registration Status', 'event_espresso'); ?>
						<?php do_action('action_hook_espresso_help', 'payment_status_info') ?>
					</label>
				</th>
				<td>
					<?php echo EE_Form_Fields::select_input('default_reg_status', $reg_status_array, $default_reg_status ) ?>
					<p class="description">
						<?php _e('This value will be automatically filled in for each person\'s registration status, until payment is made, for each event.', 'event_espresso'); ?>
					</p>
				</td>
			</tr>

			<tr>
				<th>
					<label for="use_attendee_pre_approval">
						<?php _e('Enable Attendee Pre-approval', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EE_Form_Fields::select_input('use_attendee_pre_approval', $values, $use_attendee_pre_approval ); ?>
					<p class="description">
						<?php _e('Attendeess will be marked as pending approval, until an administrator manually changes their status to approved via the Registrations Admin page.', 'event_espresso'); ?>
					</p>
				</td>
			</tr>

		</tbody>
	</table>
</div>


<div id="payment_status_info" class="hidden pop-help" >
	<div class="TB-ee-frame">
		<h2><?php _e('Default Payment Status Options', 'event_espresso'); ?></h2>

		<p>
			<strong><?php _e('Approved', 'event_espresso'); ?></strong><br />
			<?php _e('This means the attendee\'s registration has been accepted as complete and will be count towards the registration limit, tickets left, and availalbe seats calculations. This default status can be overridden by the individual event\'s ', 'event_espresso'); ?>
		</p>
		
		<p>
			<strong><?php _e('Pending', 'event_espresso'); ?></strong><br />
			<?php _e('This means the attendee has not paid, but they do have a space reserved for them in the event.  When a user downloads an invoice, their payment status changes from Incomplete to Pending, reserving a space for them but not indicating that they have paid (since that would need to be recorded manually).', 'event_espresso'); ?>
			
		</p>

	</div>
</div>

<?php

//		$this->_template_args['expire_on_registration_end'] = isset( $org_options['expire_on_registration_end'] ) ? absint( $org_options['expire_on_registration_end'] ) : FALSE;
//		$data['expire_on_registration_end'] = isset( $this->_req_data['expire_on_registration_end'] ) ? absint( $this->_req_data['expire_on_registration_end'] ) : FALSE;
//
//
//		$data['use_attendee_pre_approval'] = isset( $this->_req_data['use_attendee_pre_approval'] ) ? absint( $this->_req_data['use_attendee_pre_approval'] ) : FALSE;
//		$this->_template_args['use_attendee_pre_approval'] = isset( $org_options['use_attendee_pre_approval'] ) ? absint( $org_options['use_attendee_pre_approval'] ) : FALSE;
?>