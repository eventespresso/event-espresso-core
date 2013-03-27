<?php
EE_Template_Validator::verify_instanceof($transaction, '$transaction', 'EE_Transaction');
EE_Template_Validator::verify_instanceof($primary_registrant, '$primary_registrant', 'EE_Registration');
EE_Template_Validator::verify_is_array_of($payments, '$payments', 'EE_Payment');
EE_Template_Validator::verify_is_array($event_names, '$event_names');
EE_Template_Validator::verify_isnt_null($currency_symbol, '$currency_symbol');
EE_Template_Validator::verify_isnt_null($SPCO_step_2_url, '$SPCO_step_2_url');
EE_Template_Validator::verify_isnt_null($show_try_pay_again_link, '$show_try_pay_again_link');
/**
 * @var $transaction EE_Transaction
 * @var $primary_registrant EE_Registration
 * @var $payments EE_Payment[]
 * @var $event_names array of strings of only event names
 * @var $currency_symbol string
 * @var $SPCO_step_2_url string
 * @var $show_try_pay_again_link boolean whether or not to show the link back to SPCO step 2 to retry paying
 */
?>
<div class="espresso_payment_overview event-display-boxes ui-widget" >
	<h2 class="section-heading display-box-heading ui-widget-header ui-corner-top">
		<?php _e('Payment Overview', 'event_espresso'); ?>
	</h2>

	<div class='reg-payment-details'>
		<?php if ( empty($payments)){?>
			<?php _e("No payment have yet been made toward this registration.",'event_espresso')?>
		<?php }else{?>
		
			<?php foreach ($payments as $payment) { ?>
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
							<?php echo $currency_symbol; ?><?php $payment->e('PAY_amount'); ?>
						</td>
					</tr>
					<tr>
						<td>
							<label><?php _e("Payment Status: ", 'event_espresso') ?></label>
						</td>
						<td>
							<?php if ($payment->is_approved()) { ?>
								<img class="espresso-paid-status-icon-img" align="absmiddle" src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/accept.png" width="16" height="16" alt="<?php $payment->e_pretty_status() ?>" title="<?php $payment->e_pretty_status() ?>" />
							<?php } elseif($payment->is_pending()) { ?>
								<img class="espresso-unpaid-status-icon-img" align="absmiddle" src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/error.png" width="16" height="16" alt="<?php $payment->e_pretty_status() ?>" title="<?php $payment->e_pretty_status() ?>" />
							<?php }else{?>
								<img class="espresso-unpaid-status-icon-img" align="absmiddle" src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/exclamation.png" width="16" height="16" alt="<?php $payment->e_pretty_status() ?>" title="<?php $payment->e_pretty_status() ?>" />
							<?php } ?>
							<?php $payment->e_pretty_status() ?>
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
	<?php 
			if ($show_try_pay_again_link) {
				?>
			<a href='<?php echo $SPCO_step_2_url?>'><?php _e("Try Another Payment Method", 'event_espresso'); ?></a>
				<?php }
			?>

	<h3>
		<?php _e('Transaction Status', 'event_espresso'); ?>
	</h3>
	<div class='ee-transaction-status'>
		<table class='ee-table'>
			<tbody>
				<tr>
					<td>
						<label><?php _e('Amount Paid: ', 'event_espresso'); ?></label>
					</td>
					<td class='<?php echo ($transaction->paid() == $transaction->total()) ? 'ee-transaction-paid' : 'ee-transaction-unpaid' ?>'>
						<?php echo $currency_symbol . number_format($transaction->paid(), 2, '.', ','); ?> 
					</td>
				</tr>
				<tr>
					<td>
						<label><?php _e('Total Cost: ', 'event_espresso'); ?></label>
					</td>
					<td>
						<?php echo $currency_symbol . number_format($transaction->total(), 2, '.', ','); ?>
					</td>
				</tr>
				<tr>
					<td>
						<label><?php _e('Transaction Status: ', 'event_espresso'); ?></label>
					</td>
					<td>
						<?php if ($transaction->is_completed()) { ?>
							<img class="espresso-paid-status-icon-img" align="absmiddle" src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/accept.png" width="16" height="16" alt="<?php $transaction->e_pretty_status() ?>" title="<?php $transaction->e_pretty_status() ?>" />
						<?php } elseif($transaction->is_pending()) { ?>
							<img class="espresso-unpaid-status-icon-img" align="absmiddle" src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/error.png" width="16" height="16" alt="<?php $transaction->e_pretty_status() ?>" title="<?php $transaction->e_pretty_status() ?>" />
						<?php }else{?>
							<img class="espresso-unpaid-status-icon-img" align="absmiddle" src="<?php echo EVENT_ESPRESSO_PLUGINFULLURL ?>images/exclamation.png" width="16" height="16" alt="<?php $transaction->e_pretty_status() ?>" title="<?php $transaction->e_pretty_status() ?>" />
						<?php } ?>
						<?php $transaction->e_pretty_status(); ?>
					</td>
				</tr>
				<tr>
					<td>
						<label><?php _e('Primary Registrant:', 'event_espresso'); ?></label>
					</td>
					<td>
						<?php $primary_registrant->attendee()->e('ATT_fname'); ?> <?php $primary_registrant->attendee()->e('ATT_lname'); ?>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
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
								<?php $registration->attendee()->e('ATT_fname')?> <?php $registration->attendee()->e('ATT_lname')?>
							</td>
							<td>
								<?php $registration->e('REG_code') ?>
							</td>
							<td>
								<?php echo $registration->event_name()?>
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