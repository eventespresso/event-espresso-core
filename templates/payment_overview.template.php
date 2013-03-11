<?php

EE_Template_Validator::verify_instanceof($transaction, '$transaction', 'EE_Transaction');
EE_Template_Validator::verify_instanceof($primary_registrant, '$primary_registrant', 'EE_Registration');
EE_Template_Validator::verify_is_array_of($payments, '$payments', 'EE_Payment');
EE_Template_Validator::verify_is_array($event_names, '$event_names');
EE_Template_Validator::verify_isnt_null($currency_symbol, '$currency_symbol');
/**
 * @var $transaction EE_Transaction
 * @var $primary_registrant EE_Registration
 * @var $payments EE_Payment[]
 * @var $event_names array of strings of only event names
 * @var $currency_symbol string
 */
?>
<div class="espresso_payment_overview event-display-boxes ui-widget" >
		<h3 class="section-heading display-box-heading ui-widget-header ui-corner-top">
	<?php _e('Payment Overview', 'event_espresso'); ?>
		</h3>
		<div class="event-data-display  ui-widget-content ui-corner-bottom">
			<h4 class="section-title list-events">
			<?php _e('Class/Event:', 'event_espresso'); ?>
			</h4>
				<div>
				<?php echo implode( '<br />', $event_names ); ?>
				</div>
			<h4 class="section-title"><?php _e('Registration  Details:', 'event_espreso'); ?></h4>
			<div class="reg-gen-details">
				<table id="thank-you-page-reg-details-tbl">
					<tbody>			
						<tr>
							<td>
								<label><?php _e('Primary Registrant:', 'event_espresso'); ?></label>
							</td>
							<td>
								<?php $primary_registrant->attendee()->e('ATT_fname');?> <?php $primary_registrant->attendee()->e('ATT_lname');?>
							</td>
						</tr>
						<?php foreach($payments as $payment) {?>
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
									<label><?php _e("Payment Amount: ",'event_espresso') ?></label>
								</td>
								<td>
									<?php echo $currency_symbol;?><?php $payment->e('PAY_amount'); ?>
								</td>
							</tr>
							<tr>
								<td>
									<label><?php _e("Payment Status: ",'event_espresso') ?></label>
								</td>
								<td>
									<?php $payment->e_pretty_status() ?>
								</td>
							</tr>
						<?php }?>
						<tr>
							<td>
								<label><?php _e('Amount Paid/Owed: ', 'event_espresso'); ?></label>
							</td>
							<td>
								<?php echo $currency_symbol . number_format( $transaction->paid(), 2, '.', ',' ); ?> 
								/ 
								<?php echo $currency_symbol . number_format( $transaction->total(),2, '.', ',' ); ?>
							</td>
						</tr>
						<tr>
							<td>
								<label><?php _e('Transaction Status: ', 'event_espresso'); ?></label>
							</td>
							<td>
								<?php $transaction->e_pretty_status(); ?>
							</td>
						</tr>
						<?php foreach($transaction->registrations() as $registration){?>
							<tr>
								<td>
									<label><?php _e('Registration ID:', 'event_espresso'); ?></label>
								</td>
								<td>
									<?php $registration->e('REG_ID') ?>
								</td>
							</tr>
							<tr>
								<td>
									<label><?php _e('Transaction ID:', 'event_espresso'); ?></label>
								</td>
								<td>
									<?php $registration->e('REG_code');?>
								</td>
							</tr>
						<?php } ?>
					</tbody>
				</table>
				<?php 
					if (!$transaction->is_completed()){
						?>
				<a href=''><?php _e("Try payment again",'event_espresso');?></a>
						<?php
					}?>
			</div><!-- / .reg-gen-details -->
		</div><!-- / .event-data-display -->
	</div><!-- / .event-display-boxes -->