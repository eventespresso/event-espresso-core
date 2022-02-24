<?php
/**
 * @var EE_Transaction $transaction
 * @var boolean        $show_try_pay_again_link
 * @var string         $SPCO_payment_options_url
 * @var string         $primary_registrant_name
 */
?>

<h3><?php esc_html_e('Transaction Details', 'event_espresso'); ?></h3>
<?php do_action('AHEE__thank_you_page_transaction_details_template__after_heading'); ?>

<div id="espresso-thank-you-page-transaction-details-dv">
    <table class='ee-table'>
        <tbody>
            <tr>
                <td>
                    <label><?php esc_html_e('Total Cost: ', 'event_espresso'); ?></label>
                </td>
                <td>
                    <?php echo EEH_Template::format_currency($transaction->total()); ?>
                </td>
            </tr>
            <tr>
                <td>
                    <label><?php esc_html_e('Amount Owing: ', 'event_espresso'); ?></label>
                </td>
                <td class="<?php
                echo ($transaction->paid() == $transaction->total())
                    ? 'ee-transaction-paid'
                    : 'ee-transaction-unpaid'
                ?>"
                >
                    <?php echo EEH_Template::format_currency($transaction->remaining()); ?>
                </td>
            </tr>
            <tr>
                <td>
                    <label><?php esc_html_e('Transaction Status: ', 'event_espresso'); ?></label>
                </td>
                <td>
                    <?php $transaction->e_pretty_status(true);
                    if ($show_try_pay_again_link && ! $transaction->is_completed()) { ?>
                        <span class="small-text">
                        <a href='<?php echo esc_url_raw($SPCO_payment_options_url); ?>'>
                            <?php esc_html_e('View Payment Options', 'event_espresso'); ?>
                        </a>
                    </span>
                    <?php } ?>
                </td>
            </tr>
            <tr>
                <td>
                    <label><?php esc_html_e('Primary Registrant:', 'event_espresso'); ?></label>
                </td>
                <td>
                    <?php echo esc_html($primary_registrant_name); ?>
                </td>
            </tr>
            <?php do_action(
                'AHEE__thank_you_page_transaction_details_template__after_transaction_table_row',
                $transaction
            ); ?>
        </tbody>
    </table>

    <?php if ($show_try_pay_again_link && ! $transaction->is_completed()) { ?>
        <p class="small-text jst-rght">
            <a href='<?php echo esc_url_raw($SPCO_payment_options_url); ?>'><?php
                esc_html_e("Click here to view Payment Options", 'event_espresso'); ?></a>
        </p>
        <br />

    <?php } ?>

    <?php do_action('AHEE__thank_you_page_transaction_details_template__after_transaction_details'); ?>

</div>
