<?php

/**
 * @type int $reg_count
 * @type string $transaction_details
 * @type string $before_payment_options
 * @type string $payment_options
 * @type string $after_payment_options
 * @type string $default_hidden_inputs
 * @type string $extra_hidden_inputs
 */

use EventEspresso\core\services\request\sanitizers\AllowedTags;

?>

<h4 id="reg-page-totals-hdr" class="">
    <span class="drk-grey-text"><?php esc_html_e('Registrations:', 'event_espresso'); ?></span>
    <?php echo absint($reg_count); ?>
</h4>

<div class="spco-payment-info-dv">
    <table id="spco-payment-info-table">
        <thead>
        <tr>
            <th scope="col" width=""><?php esc_html_e('Name and Description', 'event_espresso'); ?></th>
            <th scope="col" width="15%" class="jst-cntr"><?php esc_html_e('Price', 'event_espresso'); ?></th>
            <th scope="col" width="5%" class="jst-cntr"><?php esc_html_e('Qty', 'event_espresso'); ?></th>
            <th scope="col" width="15%" class="jst-cntr"><?php esc_html_e('Total', 'event_espresso'); ?></th>
            <?php do_action('AHEE__registration_page_payment_options__payment_info_table_thead_row_end'); ?>
        </tr>
        </thead>
        <tbody>
        <?php echo wp_kses($transaction_details, AllowedTags::getWithFormTags()); ?>
        <?php do_action('AHEE__registration_page_payment_options__payment_info_table_tbody_end'); ?>
        </tbody>
    </table>
</div>
<div class="clear-float"></div>

<?php echo wp_kses($before_payment_options, AllowedTags::getWithFormTags()); ?>

<div id="methods-of-payment">
    <?php echo wp_kses($payment_options, AllowedTags::getWithFormTags()); ?>
</div>
<!-- end #methods-of-payment -->

<?php echo wp_kses($after_payment_options, AllowedTags::getWithFormTags()); ?>

