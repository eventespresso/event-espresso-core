<?php

/**
 * @var string   $previous_transaction
 * @var string   $next_transaction
 * @var string   $amount_due
 * @var string   $amount_due_class
 * @var string   $method_of_payment_name
 * @var string[] $txn_nmbr
 * @var string[] $txn_datetime
 * @var string[] $txn_status
 */

use EventEspresso\core\services\request\sanitizers\AllowedTags;

?>

<h3 class="txn-navigation-strip">
    <?php
    echo wp_kses($previous_transaction, AllowedTags::getAllowedTags());
    echo '&nbsp;' . sprintf(
        /* translators: %s: transaction number */
        esc_html__('Transaction # %1$s', 'event_espresso'),
        esc_html($txn_nmbr['value'])
    ) . '&nbsp;';
    echo wp_kses($next_transaction, AllowedTags::getAllowedTags());
    ?>
</h3>

<h2 id="txn-date-h2" class="txn-date-h2">
    <?php echo esc_html($txn_datetime['value']); ?>
</h2>

<h2 id="txn-status-h2" class="txn-status-h2">
    <?php echo esc_html__('Transaction Status: ', 'event_espresso'); ?>
    <span id="txn-status" class="<?php echo esc_attr($txn_status['class']); ?>">
        <?php echo esc_html($txn_status['value']); ?>
    </span>
</h2>

<?php $attributes = $amount_due ? 'class="txn-amount-due-h2"' : 'class="txn-amount-due-h2 hidden"'; ?>
<h2 id="txn-amount-due-h2" <?php echo esc_attr($attributes); ?>>
    <?php echo esc_html__('Total Amount Due: ', 'event_espresso'); ?>
    <span id="txn-admin-total-amount-due" class="<?php echo esc_attr($amount_due_class); ?>">
        <?php echo esc_html($amount_due); ?>
    </span>
</h2>

<h3 id="txn-selected-method-of-payment-h3" class="txn-selected-method-of-payment-h3">
    <?php echo esc_html__('Last Method of Payment: ', 'event_espresso'); ?>
    <?php echo esc_html($method_of_payment_name); ?>
</h3>
