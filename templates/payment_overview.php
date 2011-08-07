<div class="espresso_payment_overview">
    <h3><?php _e('Payment Overview', 'event_espresso'); ?></h3>
    <p><strong><?php _e('Class/Event:', 'event_espresso'); ?></strong> <?php echo $event_link ?></p>
    <p><strong><?php _e('Primary Attendee:', 'event_espresso'); ?></strong> <?php echo $fname. ' ' . $lname ?></p>
    <?php echo $txn_type ==''?'':'<p><strong>'.__('Payment Type:', 'event_espresso').'</strong> '.espresso_payment_type($txn_type).'</p>'; ?>
    <?php echo ($payment_date =='' || ($payment_status == 'Pending' && (espresso_payment_type($txn_type) == 'Invoice' || espresso_payment_type($txn_type) == 'Offline payment')))?'':'<p><strong>'.__('Payment Date:', 'event_espresso').'</strong> '.event_date_display($payment_date).'</p>'; ?>
    <p><strong><?php _e('Amount Paid/Owed:', 'event_espresso'); ?></strong> <?php echo $org_options[ 'currency_symbol' ] ?><?php echo $amount_pd?> <?php event_espresso_paid_status_icon( $payment_status ) ?> </p>
    <p><strong><?php _e('Payment Status:', 'event_espresso'); ?></strong> <?php echo $payment_status ?></p>
    <p><strong><?php _e('Registration ID:', 'event_espresso'); ?></strong> <?php echo $att_registration_id ?></p>
    <?php echo $txn_id == ''?'':'<p><strong>'.__('Transaction ID:', 'event_espresso').'</strong> '.$txn_id. '</p>'; ?>
</div>