<div class="espresso_payment_overview event-display-boxes" >
    <h3 class="section-heading"><?php _e('Payment Overview', 'event_espresso'); ?></h3>
    
			<p><strong><?php _e('Class/Event:', 'event_espresso'); ?></strong><br />
			<?php echo $event_link ?></p>
    
			<dl class="dl-inline"">
				<dt><?php _e('Primary Registrant:', 'event_espresso'); ?></dt> <dd><?php echo $fname. ' ' . $lname ?></dd>
    	<?php echo $txn_type ==''?'':'<dt>'.__('Payment Type:', 'event_espresso').'</dt> <dd>'.espresso_payment_type($txn_type).'</dd>'; ?>
    	<?php echo ($payment_date =='' || ($payment_status == 'Pending' && (espresso_payment_type($txn_type) == 'Invoice' || espresso_payment_type($txn_type) == 'Offline payment')))?'':'<dt>'.__('Payment Date:', 'event_espresso').'</dt> <dd>'.event_date_display($payment_date).'</dd>'; ?>
    	<dt><?php _e('Amount Paid/Owed:', 'event_espresso'); ?></dt> <dd><?php echo $org_options[ 'currency_symbol' ] ?><?php echo $total_cost?> <?php event_espresso_paid_status_icon( $payment_status ) ?> </dd>
    	<dt><?php _e('Payment Status:', 'event_espresso'); ?></dt> <dd><?php echo $payment_status ?></dd>
    	<dt><?php _e('Registration ID:', 'event_espresso'); ?></dt> <dd><?php echo $att_registration_id ?></dd>
    
				<?php echo $txn_id == ''?'':'<dt>'.__('Transaction ID:', 'event_espresso').'</strong> '.$txn_id. '</dd>'; ?>
			</dl>
</div>