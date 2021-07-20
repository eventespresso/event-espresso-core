<h3 class="txn-navigation-strip"><?php echo $previous_transaction . '&nbsp;';
    echo esc_html__('Transaction # ', 'event_espresso') . $txn_nmbr['value'];
    echo '&nbsp;' . $next_transaction; ?></h3>
<h2 id="txn-date-h2" class="txn-date-h2"><?php echo $txn_datetime['value']; ?></h2>
<h2 id="txn-status-h2" class="txn-status-h2">
    <?php echo esc_html__('Transaction Status: ', 'event_espresso'); ?><span id="txn-status"
                                                                     class="<?php echo $txn_status['class']; ?>"><?php echo $txn_status['value']; ?></span>
</h2>

<?php $attributes = $amount_due ? 'class="txn-amount-due-h2"' : 'class="txn-amount-due-h2 hidden"'; ?>
<h2 id="txn-amount-due-h2" <?php echo $attributes; ?>>
    <?php echo esc_html__('Total Amount Due: ', 'event_espresso'); ?><span id="txn-admin-total-amount-due"
                                                                   class="<?php echo $amount_due_class; ?>"><?php echo $amount_due; ?></span>
</h2>

<h3 id="txn-selected-method-of-payment-h3" class="txn-selected-method-of-payment-h3">
    <?php echo esc_html__('Last Method of Payment: ', 'event_espresso'); ?><?php echo $method_of_payment_name; ?>
</h3>


