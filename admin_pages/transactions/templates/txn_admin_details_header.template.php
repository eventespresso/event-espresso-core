
		<h3 style="padding:0;margin:-.5em 0 1em;"><?php echo __( 'Transaction # ', 'event_espresso' ) . $txn_nmbr['value'];?></h3>
		
		<h2 id="txn-date-h2" style="padding:0;margin:0 0 1em;"><?php echo $txn_datetime['value'];?></h2>
		
		<?php echo $send_payment_reminder_button; ?>
		<h2 id="txn-status-h2" style="padding:0;margin:0 0 1em;">
			<?php echo __( 'Transaction Status: ', 'event_espresso' );?><span id="txn-status" class="<?php echo $txn_status['class'];?>"><?php echo $txn_status['value'];?></span>
		</h2>
		
	<?php if ( $amount_due ) : ?>
		<h2 id="txn-amount-due-h2" style="padding:0;margin:0 0 1em;">
			<?php echo __( 'Total Amount Due: ', 'event_espresso' );?><span class="<?php echo $amount_due_class;?>"><?php echo $amount_due;?></span>
		</h2>
	<?php else : ?>
		<h2 id="txn-amount-due-h2" class="hidden" style="padding:0;margin:0 0 1em;">
			<?php echo __( 'Total Amount Due: ', 'event_espresso' );?><span class="<?php echo $amount_due_class;?>"><?php echo $amount_due;?></span>
		</h2>
	<?php endif; ?>
				
	<?php if ( $method_of_payment ) : ?>
		<h3 id="txn-selected-method-of-payment-h3" style="padding:0;margin:0 0 1em;">
			<?php echo __( 'Selected Method of Payment: ', 'event_espresso' );?><?php echo $method_of_payment;?>
		</h3>
	<?php endif; ?>
				

