<?php

/**
 * authorize_net_aim_debug_info
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 *
 * ------------------------------------------------------------------------
 */

?>
    <div class="sandbox-panel">
        <h2>
            <?php esc_html_e('Authorize.net AIM Test Mode', 'event_espresso'); ?>
        </h2>

        <p>
            <?php esc_html_e(
                'Test Mode allows you to submit test transactions to the payment gateway. Transactions that are submitted while Test Mode is ON are NOT actually processed. The result of a transaction depends on the card number submitted, and the invoice amount. If you want a transaction to be approved, use one of the following card numbers.',
                'event_espresso'
            ); ?>
        </p>

        <p>
            <strong><?php esc_html_e('Example Card Numbers:', 'event_espresso'); ?></strong>
        </p>

        <p>
            370000000000002 (<?php esc_html_e('American Express', 'event_espresso'); ?>)<br/>
            6011000000000012 (<?php esc_html_e('Discover', 'event_espresso'); ?>)<br/>
            5424000000000015 (<?php esc_html_e('MasterCard', 'event_espresso'); ?>)<br/>
            4007000000027 (<?php esc_html_e('Visa', 'event_espresso'); ?>)
        </p>
    </div>
<?php
