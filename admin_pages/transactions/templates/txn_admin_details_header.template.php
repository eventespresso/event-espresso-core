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
$amount_due_class = $amount_due ? 'ee-txn-amount-owing' : '';
?>

<div class="ee-admin-page-nav-strip-wrap">
    <div class='ee-admin-page-nav-strip'>
        <?php
        echo $previous_transaction; // already escaped
        echo '<span>';
        echo esc_html__('Transaction # ', 'event_espresso');
        echo esc_html($txn_nmbr['value']);
        echo '</span>';
        echo $next_transaction; // already escaped
        ?>
    </div>
</div>

<div class="ee-admin-page-header-grid">
    <div class='ee-admin-container'>
        <label><?php echo esc_html__('Transaction Date', 'event_espresso'); ?></label>
        <span><?php echo esc_html($txn_datetime['value']); ?></span>
    </div>
    <div class='ee-admin-container <?php echo esc_attr($txn_status['class']); ?>'>
        <label><?php echo esc_html__('Transaction Status: ', 'event_espresso'); ?></label>
        <span><?php echo esc_html($txn_status['value']); ?></span>
    </div>
    <div class='ee-admin-container <?php echo esc_attr($amount_due_class); ?>'>
        <label><?php echo esc_html__('Total Amount Due: ', 'event_espresso'); ?></label>
        <span><?php echo esc_html($amount_due); ?></span>
    </div>
    <div class='ee-admin-container'>
        <label><?php echo esc_html__('Last Method of Payment: ', 'event_espresso'); ?></label>
        <span><?php echo esc_html($method_of_payment_name); ?></span>
    </div>
</div>
