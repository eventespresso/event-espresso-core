<?php
/* @var $transaction EE_Transaction */
EEH_Template_Validator::verify_instanceof($transaction, '$transaction', 'EE_Transaction');
EEH_Template_Validator::verify_instanceof($primary_registrant, '$primary_registrant', 'EE_Registration');
EEH_Template_Validator::verify_instanceof($primary_registrant->attendee(), '$primary_registrant', 'EE_Attendee');
EEH_Template_Validator::verify_is_array_of($payments, '$payments', 'EE_Payment');
EEH_Template_Validator::verify_is_array($event_names, '$event_names');
EEH_Template_Validator::verify_isnt_null($SPCO_step_2_url, '$SPCO_step_2_url');
EEH_Template_Validator::verify_isnt_null($show_try_pay_again_link, '$show_try_pay_again_link');
EEH_Template_Validator::verify_isnt_null($gateway_content, '$gateway_content');
/**
 * @var $transaction EE_Transaction
 * @var $primary_registrant EE_Registration
 * @var $payments EE_Payment[]
 * @var $event_names array of strings of only event names
 * @var $SPCO_step_2_url string
 * @var $show_try_pay_again_link boolean whether or not to show the link back to SPCO step 2 to retry paying
 * @var $gateway_content string of content from the gateway.
 */
?>
<div class="espresso_payment_overview event-display-boxes ui-widget" >
	<h2 class="section-heading display-box-heading ui-widget-header ui-corner-top">
		<?php _e('Payment Overview', 'event_espresso'); ?>
	</h2>

	<div class='reg-payment-details'>
		<?php 
		if ( empty($payments)){
			
			if ( $transaction->total() ){
				echo apply_filters('FHEE__payment_overview_template__no_payments_made',__("No payments have been made yet towards this registration.",'event_espresso'));
				echo $gateway_content;
			}else{
				 echo apply_filters('FHEE__payment_overview_template__no_payment_required', __("No payment required",'event_espresso'));
			}
			
		} else {
			
			foreach ( $payments as $payment ) { 
		?>
			<table class='ee-table'>
				<tbody>
					<tr>
						<td>
							<label><?php _e('Payment Type:', 'event_espresso'); ?></label>
						</td>
						<td>
							<?php $payment->e('PAY_gateway'); ?>
						</td>
					</tr>
					<tr>
						<td>
							<label><?php _e('Payment Date:', 'event_espresso'); ?></label>
						</td>
						<td>
							<?php $payment->e('PAY_timestamp'); ?>
						</td>
					</tr>
					<tr>
						<td>
							<label><?php _e("Payment Amount: ", 'event_espresso') ?></label>
						</td>
						<td>
							<?php  $payment->e( 'PAY_amount' ); ?>
						</td>
					</tr>
					<tr>
						<td>
							<label><?php _e("Payment Status: ", 'event_espresso') ?></label>
						</td>
						<td>
							<?php if ($payment->is_approved()) { ?>
								<img class="espresso-paid-status-icon-img" align="absmiddle" src="<?php echo EE_IMAGES_URL;?>accept.png" width="16" height="16" alt="<?php $payment->e_pretty_status() ?>" title="<?php $payment->e_pretty_status() ?>" />
							<?php } elseif($payment->is_pending()) { ?>
								<img class="espresso-unpaid-status-icon-img" align="absmiddle" src="<?php echo EE_IMAGES_URL;?>error.png" width="16" height="16" alt="<?php $payment->e_pretty_status() ?>" title="<?php $payment->e_pretty_status() ?>" />
							<?php }else{?>
								<img class="espresso-unpaid-status-icon-img" align="absmiddle" src="<?php echo EE_IMAGES_URL;?>exclamation.png" width="16" height="16" alt="<?php $payment->e_pretty_status() ?>" title="<?php $payment->e_pretty_status() ?>" />
							<?php } ?>
							<?php $payment->e_pretty_status();
							if ( $show_try_pay_again_link &&  ! $payment->is_approved()) {?>
							<a href='<?php echo $SPCO_step_2_url?>'><?php _e("Retry Payment", 'event_espresso'); ?></a>
								<?php }
							?>
						</td>
					</tr>
					<?php $gateway_payment_content = $payment->gateway_payment_overview_content();
					if (!empty($gateway_payment_content)){?>
					<tr>
						<td colspan=2><?php echo $gateway_payment_content?></td>
					</tr>
					<?php }?>
					</tbody>
				</table>
			<?php } ?>
			
		<?php }?>
	</div>
	<br/>
	
	<div class="highlight-bg bigger-text cntr">
		<a href="<?php echo $transaction->receipt_url('html');?>"><?php _e("View Full Order Confirmation", "event_espresso");?></a>
	</div>
	<h3>
		<?php _e('Transaction Status', 'event_espresso'); ?>
	</h3>
	<div class='ee-transaction-status'>
		<table class='ee-table'>
			<tbody>
				<tr>
					<td>
						<label><?php _e('Total Cost: ', 'event_espresso'); ?></label>
					</td>
					<td>
						<?php echo EEH_Template::format_currency( $transaction->total() ); ?>
					</td>
				</tr>
				<tr>
					<td>
						<label><?php _e('Amount Owed: ', 'event_espresso'); ?></label>
					</td>
					<td class='<?php echo ($transaction->paid() == $transaction->total()) ? 'ee-transaction-paid' : 'ee-transaction-unpaid' ?>'>
						<?php echo EEH_Template::format_currency( $transaction->remaining() ); ?> 
					</td>
				</tr>
				<tr>
					<td>
						<label><?php _e('Transaction Status: ', 'event_espresso'); ?></label>
					</td>
					<td>
						<?php
						if ($transaction->is_completed()) { ?>
							<img class="espresso-paid-status-icon-img" align="absmiddle" src="<?php echo EE_IMAGES_URL;?>accept.png" width="16" height="16" alt="<?php $transaction->e_pretty_status() ?>" title="<?php $transaction->e_pretty_status() ?>" />
						<?php } elseif($transaction->is_pending()) { ?>
							<img class="espresso-unpaid-status-icon-img" align="absmiddle" src="<?php echo EE_IMAGES_URL;?>error.png" width="16" height="16" alt="<?php $transaction->e_pretty_status() ?>" title="<?php $transaction->e_pretty_status() ?>" />
						<?php }else{?>
							<img class="espresso-unpaid-status-icon-img" align="absmiddle" src="<?php echo EE_IMAGES_URL;?>exclamation.png" width="16" height="16" alt="<?php $transaction->e_pretty_status() ?>" title="<?php $transaction->e_pretty_status() ?>" />
						<?php } ?>
						<?php $transaction->e_pretty_status(); 
						if ( $show_try_pay_again_link) {
							?><br>
						<a href='<?php echo $SPCO_step_2_url?>'><?php _e("Retry Payment", 'event_espresso'); ?></a>
							<?php }
						?>
					</td>
				</tr>
				<tr>
					<td>
						<label><?php _e('Primary Registrant:', 'event_espresso'); ?></label>
					</td>
					<td>
						<?php 
						//printr( $primary_registrant, '$primary_registrant  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
						echo htmlentities( $primary_registrant->attendee()->get('ATT_fname') . ' ' . $primary_registrant->attendee()->get('ATT_lname'), ENT_QUOTES, 'UTF-8' ); 
						?>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	
	<?php
	if ( $show_try_pay_again_link) {
			?>
		<a href='<?php echo $SPCO_step_2_url?>'><?php _e("Click here to view Payment Options", 'event_espresso'); ?></a>
			<?php 	
	}?>
	<div class="event-data-display">
		<h3 class="section-title"><?php _e('Registration  Details:', 'event_espreso'); ?></h3>
		<div class="reg-gen-details">
			<table class='ee-table ee-registrations-list'>
				<thead>
					<tr>
						<th>
							<?php _e("Name",'event_espresso')?>
						</th>
						<th>
							<?php _e("Registration Code",'event_espresso');?>
						</th>
						<th>
							<?php _e('Event Name','event_espresso');?>
						</th>
						<th>
							<?php _e("Registration Status",'event_espresso');?>
						</th>
					</tr>
				</thead>
				<tbody>			
					
					<?php foreach ($transaction->registrations() as $registration) { ?>
						<tr>
							<td>
							<?php 
								if ( $registration->attendee() instanceof EE_Attendee ) {									
									echo htmlentities( $registration->attendee()->get('ATT_fname') . ' ' . $registration->attendee()->get('ATT_lname'), ENT_QUOTES, 'UTF-8' );
								}
							?>
							</td>
							<td>
								<?php $registration->e('REG_code') ?>
							</td>
							<td>
								<?php echo htmlentities( $registration->event_name(), ENT_QUOTES, 'UTF-8' );?>
							</td>
							<td>
								<?php $registration->e_pretty_status()?>
							</td>
						</tr>
					<?php } ?>
				</tbody>
			</table>
			
		</div><!-- / .reg-gen-details -->
	</div><!-- / .event-data-display -->
</div><!-- / .event-display-boxes -->
<?php 
//insert affiliate code here (see includes/functions/affiliate-handling.php)
do_action( 'AHEE_reg_completed' );
?>