<?php

/**
 * payment_log_details
 *
 * @package     Event Espresso
 * @subpackage
 * @author      Mike Nelson
 * @var EE_Change_Log     $payment_log
 * @var EE_Payment_Method $payment_method
 * @var EE_Transaction    $transaction
 */

use EventEspresso\core\services\request\sanitizers\AllowedTags;

if ($payment_log instanceof EE_Change_Log) : ?>
<div class="padding">
    <table class="ee-payment-log-details widefat">
        <tbody>
            <tr>
                <th>
                    <label>
                        <?php esc_html_e('ID', 'event_espresso'); ?>
                    </label>
                </th>
                <td>
                    <?php echo absint($payment_log->ID()) ?>
                </td>
            </tr>
            <tr>
                <th>
                    <label>
                        <?php esc_html_e('Payment Method', 'event_espresso'); ?>
                    </label>
                </th>
                <td>
                    <?php
                    if ($payment_log->object() instanceof EE_Transaction) {
                        esc_html_e('Unknown', 'event_espresso');
                    } else {
                        echo esc_html(
                            $payment_method
                                ? $payment_method->admin_name()
                                : __("No Longer Exists", 'event_espresso')
                        );
                    }
                    ?>
                </td>
            </tr>
            <tr>
                <th>
                    <label>
                        <?php esc_html_e('Transaction', 'event_espresso'); ?>
                    </label>
                </th>
                <td>
                    <?php echo esc_html(
                        $transaction
                            ? absint($transaction->ID())
                            : __('Could not be determined', 'event_espresso')
                    ); ?>
                </td>
            </tr>
            <tr>
                <th>
                    <label>
                        <?php esc_html_e('Content', 'event_espresso'); ?>
                    </label>
                </th>
                <td class='ee-payment-log-details__content'>
                    <?php echo wp_kses($payment_log->get_pretty('LOG_message', 'as_table'), AllowedTags::getWithFormTags()); ?>
                </td>
            </tr>
        </tbody>
    </table>
</div>

<?php else : ?>
<div class="padding">
    <table class="ee-payment-log-details widefat">
        <tbody>
            <tr>
                <td>
                    <p class="ee-status-outline ee-status-bg--attention">
                        <?php esc_html_e("Payment Log No Longer Exists", 'event_espresso'); ?>
                    </p>
                </td>
            </tr>
        </tbody>
    </table>
</div>

<?php endif; ?>
