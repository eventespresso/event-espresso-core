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

<div class="ee-admin-page-nav-strip-wrap">
    <div class='ee-admin-page-nav-strip'>
    <?php
    echo wp_kses($previous_transaction, AllowedTags::getAllowedTags());
    echo '&nbsp;' . sprintf(
        /* translators: %s: transaction number */
        esc_html__('Transaction # %1$s', 'event_espresso'),
        esc_html($txn_nmbr['value'])
    ) . '&nbsp;';
    echo wp_kses($next_transaction, AllowedTags::getAllowedTags());
    ?>
    </div>
</div>

<div class="ee-admin-page-header-grid">
    <div class='ee-admin-container'>
        <label><?php echo esc_html__('Transaction Date', 'event_espresso'); ?></label>
        <span><?php echo esc_html($txn_datetime['value']); ?></span>
    </div>
    <div class='ee-admin-container ee-status-bg--<?php echo esc_attr($txn_status['class']); ?>'>
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
