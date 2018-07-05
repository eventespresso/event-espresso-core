<?php

/**
 * payment_log_details
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
/*@var EE_Change_Log $payment_Log */
/*@var EE_Payment_Method $payment_Method*/
/*@var EE_Transaction $transaction*/
?>
    <div class="padding">
        <table class="form-table">
            <tbody>

            <tr>
                <th>
                    <label>
                        <?php esc_html_e('ID', 'event_espresso'); ?>
                    </label>
                </th>
                <td>
                    <?php echo $payment_log->ID() ?>

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
                        echo $payment_method
                        ? $payment_method->admin_name()
                        : esc_html__(
                            "No Longer Exists",
                            'event_espresso'
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
                    <?php echo $transaction ? $transaction->ID() : esc_html__("Could not be determined", 'event_espresso'); ?>

                </td>
            </tr>
            <tr>
                <th>
                    <label>
                        <?php esc_html_e('Content', 'event_espresso'); ?>
                    </label>
                </th>
                <td>
                    <?php echo $payment_log->e(
                        'LOG_message',
                        'as_table'
                    );// EEH_Template::layout_array_as_table($payment_log->content())?>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
