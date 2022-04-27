<?php

use EventEspresso\core\services\request\sanitizers\AllowedTags;

/**
 * @var EE_Attendee  $attendee
 * @var EE_Payment[] $payments
 * @var array        $payment_methods
 * @var array        $payment_status
 * @var string       $registrations_to_apply_payment_to
 * @var array        $txn_details
 * @var array        $txn_nmbr
 * @var int          $TXN_ID
 * @var string       $REG_code
 * @var string       $TXN_status
 * @var string       $action_buttons
 * @var string       $apply_payment_form_url
 * @var string       $can_delete_payments
 * @var string       $can_edit_payments
 * @var string       $delete_payment_form_url
 * @var string       $delete_payment_url
 * @var string       $delete_status_change_select
 * @var string       $grand_raw_total
 * @var string       $line_item_table
 * @var string       $status_change_select
 */

$currency_steps = EEH_Money::getCurrencySubUnits('', true);

?>

<div id="admin-primary-mbox-dv" class="admin-primary-mbox-dv">

    <div class="admin-primary-mbox-tbl-wrap">
        <?php echo wp_kses($line_item_table, AllowedTags::getWithFormTags()); ?>
        <span id="txn-admin-grand-total" class="hidden"><?php echo esc_html($grand_raw_total); ?></span>
    </div>
    <div id="additional-transaction-actions-dv" class='ee-admin-button-row'>
        <?php echo wp_kses($action_buttons, AllowedTags::getWithFormTags()); ?>
    </div>
    <div class='ee-admin-button-row'>
        <a id='display-additional-transaction-session-info'
           class='display-the-hidden smaller-text'
           rel='additional-transaction-session-info'
           tabindex='0'
        >
            <span class="dashicons dashicons-plus-alt"></span>
            <?php esc_html_e('view additional transaction session details', 'event_espresso'); ?>
        </a>
        <a id='hide-additional-transaction-session-info'
           class='hide-the-displayed hidden smaller-text'
           rel='additional-transaction-session-info'
           tabindex='0'
        >
            <span class='dashicons dashicons-dismiss'></span>
            <?php esc_html_e('hide additional transaction session details', 'event_espresso'); ?>
        </a>
    </div>

    <div id="additional-transaction-session-info-dv" class="hidden">


        <h3 class="admin-primary-mbox-h4">
            <?php esc_html_e('Transaction Session Details', 'event_espresso'); ?>
        </h3>

        <table id="admin-primary-mbox-txn-extra-session-info-tbl" class="form-table skinny-rows">
            <tbody>
                <?php foreach ($txn_details as $key => $txn_detail) : ?>
                    <tr>
                        <th>
                            <label for="<?php echo esc_attr($key); ?>">
                                <?php echo esc_html($txn_detail['label']); ?>
                            </label>
                        </th>
                        <td>
                            <?php echo wp_kses($txn_detail['value'], AllowedTags::getAllowedTags()); ?>
                        </td>
                    </tr>
                <?php endforeach; // $txn_details?>
            </tbody>
        </table>
    </div>
    <br class="clear" />
    <?php
    $no_payments = $grand_raw_total > 0
                   || $TXN_status !== EEM_Transaction::complete_status_code
                   || ! empty($payments);
    ?>
    <?php if ($attendee instanceof EE_Attendee && $no_payments) : ?>
        <?php $no_payment_text = $can_edit_payments
            ? esc_html__(
                'No payments have been applied to this transaction yet. Click "Apply Payment" below to make a payment.',
                'event_espresso'
            )
            : esc_html__(
                'No payments have been applied to this transaction yet.',
                'event_espresso'
            );
        ?>

        <h3 class="admin-primary-mbox-h4 hdr-has-icon">
            <?php esc_html_e('Payment Details', 'event_espresso'); ?>
            <span class='dashicons dashicons-money-alt'></span>
        </h3>

        <div class="admin-primary-mbox-tbl-wrap">
            <table id="txn-admin-payments-tbl" class="admin-primary-mbox-tbl striped">
                <thead>
                    <tr>
                        <th class='jst-cntr no-pad'></th>
                        <th class="jst-cntr">
                            <?php esc_html_e('ID', 'event_espresso'); ?>
                        </th>
                        <th class="txn-admin-payment-date-col jst-left">
                            <?php esc_html_e('Date', 'event_espresso');?>
                        </th>
                        <th class='jst-cntr'>
                            <?php esc_html_e('Amount', 'event_espresso'); ?>
                        </th>
                        <th class="jst-left">
                            <?php esc_html_e('Method', 'event_espresso'); ?>
                        </th>
                        <th class="jst-left">
                            <?php esc_html_e('Gateway Response', 'event_espresso'); ?>
                        </th>
                        <th class="jst-left">
                            <?php esc_html_e('TXN&nbsp;ID / CHQ&nbsp;#', 'event_espresso'); ?>
                        </th>
                        <th class="jst-left">
                            <?php esc_html_e('P.O. / S.O.&nbsp;#', 'event_espresso'); ?>
                        </th>
                        <th class="jst-left">
                            <?php esc_html_e('Notes / Extra Accounting', 'event_espresso'); ?>
                        </th>
                        <!--<th class="jst-left"><?php esc_html_e('Details', 'event_espresso'); ?></th>-->
                        <th class='jst-left'>
                            <?php esc_html_e('Actions', 'event_espresso'); ?>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <?php if ($payments) : ?>
                        <?php $payment_total = 0; ?>
                        <?php foreach ($payments as $PAY_ID => $payment) :
                            if (! $payment instanceof EE_Payment) {
                                continue;
                            }
                            $existing_reg_payment_json = isset($existing_reg_payments[ $PAY_ID ])
                                ? wp_json_encode($existing_reg_payments[ $PAY_ID ])
                                : '{}';
                            ?>
                            <tr id="txn-admin-payment-tr-<?php echo absint($PAY_ID); ?>" class=' jst-cntr'>
                                <td class="jst-cntr no-pad">
                                    <span id="payment-status-<?php echo absint($PAY_ID); ?>"
                                        class="ee-status-dot ee-status-bg--<?php echo esc_attr($payment->STS_ID()); ?>" ></span>
                                    <div id="payment-STS_ID-<?php echo absint($PAY_ID); ?>" class="hidden">
                                        <?php echo esc_html($payment->STS_ID()); ?>
                                    </div>
                                    <div id="reg-payments-<?php echo absint($PAY_ID); ?>" class="hidden">
                                        <?php echo esc_html($existing_reg_payment_json); ?>
                                    </div>
                                </td>
                                <td class=" jst-rght">
                                    <div id="payment-id-<?php echo absint($PAY_ID); ?>">
                                        <?php echo esc_html($PAY_ID); ?>
                                    </div>
                                </td>
                                <td class=" jst-left">
                                    <div id="payment-date-<?php echo absint($PAY_ID); ?>" class="payment-date-dv">
                                        <?php echo esc_html($payment->timestamp('Y-m-d', 'g:i a')); ?>
                                    </div>
                                </td>
                                <td class=' jst-rght'>
                                    <?php
                                    $payment_class = $payment->amount() > 0
                                        ? 'txn-admin-payment-status-' . $payment->STS_ID()
                                        : 'txn-admin-payment-status-PDC';
                                    ?>
                                    <span class="<?php echo esc_attr($payment_class); ?>">
                                        <span id="payment-amount-<?php echo $escaped_pay_id; ?>"
                                              style="display:inline;"
                                        >
                                        <?php echo EEH_Template::format_currency(
                                            $payment->amount(),
                                            false,
                                            false
                                        ); // already escaped
                                        ?>
                                        </span>
                                    </span>
                                </td>
                                <td class="payment-method-gateway-td jst-left">
                                    <span id="payment-method-<?php echo absint($PAY_ID); ?>">
                                        <?php echo esc_html($payment->source()); ?>
                                    </span>
                                    <span class="ee-status--ignore">&raquo;</span>
                                    <span id="payment-gateway-<?php echo absint($PAY_ID); ?>">
                                        <?php echo ($payment->payment_method() instanceof EE_Payment_Method
                                            ? esc_html($payment->payment_method()->admin_name())
                                            : esc_html__("Unknown", 'event_espresso')); ?>
                                    </span>
                                    <span id="payment-gateway-id-<?php echo absint($PAY_ID); ?>" class="hidden">
                                        <?php echo ($payment->payment_method() instanceof EE_Payment_Method
                                            ? esc_html($payment->payment_method()->ID())
                                            : 0); ?>
                                    </span>
                                </td>
                                <td class=" jst-left">
                                    <div id="payment-response-<?php echo absint($PAY_ID); ?>">
                                        <?php echo esc_html($payment->gateway_response()); ?>
                                    </div>
                                </td>
                                <td class=" jst-left payment-txn-id-chq-nmbr">
                                    <div id="payment-txn-id-chq-nmbr-<?php echo absint($PAY_ID); ?>">
                                        <?php echo esc_html($payment->txn_id_chq_nmbr()); ?>
                                    </div>
                                </td>
                                <td class=" jst-left">
                                    <div id="payment-po-nmbr-<?php echo absint($PAY_ID); ?>">
                                        <?php echo esc_html($payment->po_number()); ?>
                                    </div>
                                </td>
                                <td class=" jst-left">
                                    <div id="payment-accntng-<?php echo absint($PAY_ID); ?>">
                                        <?php echo esc_html($payment->extra_accntng()); ?>
                                    </div>
                                </td>
                                <td class=" jst-rght">
                                    <?php
                                    $payment_class = $payment->amount() > 0
                                        ? 'txn-admin-payment-status-' . $payment->STS_ID()
                                        : 'txn-admin-payment-status-PDC';
                                    ?>
                                    <span class="<?php echo esc_attr($payment_class); ?>">
                                        <span id="payment-amount-<?php echo absint($PAY_ID); ?>" style="display:inline;">
                                        <?php echo EEH_Template::format_currency(
                                            $payment->amount(),
                                            false,
                                            false
                                        ); // already escaped
                                        ?>
                                        </span>
                                    </span>
                                </td>
                                <td class='jst-left'>
                                    <div class='txn-overview-actions ee-list-table-actions'>
                                            <?php if ($can_edit_payments) : ?>
                                                <a class="txn-admin-payment-action-edit-lnk button button--small
                                                button--icon-only ee-aria-tooltip"
                                                   aria-label="<?php esc_attr_e('Edit Payment', 'event_espresso'); ?>"
                                                   data-payment-id="<?php echo absint($PAY_ID); ?>"
                                                   tabindex="0"
                                                >
                                                    <span class="dashicons dashicons-edit"></span>
                                                </a>
                                            <?php endif; ?>
                                            <?php if ($can_delete_payments) : ?>
                                                <a class="txn-admin-payment-action-delete-lnk button button--small
                                                button--icon-only ee-aria-tooltip"
                                                   aria-label="<?php esc_attr_e('Delete Payment', 'event_espresso'); ?>"
                                                   data-payment-id="<?php echo absint($PAY_ID); ?>"
                                                   tabindex='0'
                                                >
                                                    <span class="dashicons dashicons-trash"></span>
                                                </a>
                                            <?php endif; ?>
                                    </div>
                                </td>
                            </tr>
                            <?php $payment_total += $payment->STS_ID() == 'PAP' ? $payment->amount() : 0; ?>
                        <?php endforeach; ?>
                        <?php $pay_totals_class = $payment_total > $grand_raw_total
                            ? ' important-notice'
                            : '';
                        ?>
                        <tr id="txn-admin-no-payments-tr" class="admin-primary-mbox-total-tr hidden">
                            <td class=" jst-rght" colspan="10">
                                <span class="important-notice"><?php echo wp_kses($no_payment_text, AllowedTags::getAllowedTags()); ?></span>
                            </td>
                        </tr>
                        <tr id="txn-admin-payments-total-tr"
                            class="admin-primary-mbox-total-tr<?php echo esc_attr($pay_totals_class); ?>"
                        >
                            <th class=" jst-rght" colspan="9">
                        <span id="payments-total-spn">
                        <?php
                        $overpaid = $payment_total > $grand_raw_total
                            ? '<span id="overpaid">'
                              . __('This transaction has been overpaid ! ', 'event_espresso')
                              . '</span>'
                            : '';
                        echo $overpaid . esc_html(
                            sprintf(
                                __('Payments Total %s', 'event_espresso'),
                                '(' . EE_Registry::instance()->CFG->currency->code . ')'
                            )
                        ); ?>
                        </span>
                            </th>
                            <th class=" jst-rght">
                        <span id="txn-admin-payment-total">
                        <?php
                        echo EEH_Template::format_currency(
                            $payment_total,
                            false,
                            false
                        ); // already escaped ?>
                        </span>
                            </th>
                        </tr>
                    <?php else : ?>
                        <tr id="txn-admin-no-payments-tr" class="admin-primary-mbox-total-tr">
                            <td class=" jst-rght" colspan="10">
                                <span class="important-notice"><?php echo wp_kses($no_payment_text, AllowedTags::getAllowedTags()); ?></span>
                            </td>
                        </tr>
                        <tr id="txn-admin-payments-total-tr" class="admin-primary-mbox-total-tr hidden">
                            <th class=" jst-rght" colspan="9">
                        <span id="payments-total-spn">
                        <?php echo esc_html__('Payments Total', 'event_espresso'); ?>
                        </span>
                            </th>
                            <th class=" jst-rght">
                                <span id="txn-admin-payment-total"></span>
                            </th>
                        </tr>
                    <?php endif; ?>

                    <tr id="txn-admin-payment-empty-row-tr" class="hidden">
                        <td>
                            <span id="payment-status-PAY_ID" class="ee-status-strip-td ee-status-strip"></span>
                            <div id="payment-STS_ID-PAY_ID" class="hidden"></div>
                        </td>
                        <td class=" jst-rght">
                            <div id="payment-id-PAY_ID">PAY_ID</div>
                        </td>
                        <td class=" jst-left">
                            <div id="payment-date-PAY_ID" class="payment-date-dv"></div>
                        </td>
                        <td class=' jst-rght'>
                            <div id='payment-amount-PAY_ID' style='display:inline;'>
                            </div>
                        </td>
                        <td class=" jst-left">
                            <div id="payment-method-PAY_ID"></div>
                            <div id="payment-gateway-PAY_ID">
                            </div>
                            <div id="payment-gateway-id-PAY_ID" class="hidden"></div>
                        </td>
                        <td class=" jst-left">
                            <div id="payment-response-PAY_ID"></div>
                        </td>
                        <td class=" jst-left">
                            <div id="payment-txn-id-chq-nmbr-PAY_ID"></div>
                        </td>
                        <td class=" jst-left">
                            <div id="payment-po-nmbr-PAY_ID"></div>
                        </td>
                        <td class="jst-left">
                            <div id="payment-accntng-PAY_ID"></div>
                        </td>
                        <td class='jst-left'>
                            <div class='txn-overview-actions ee-list-table-actions'>
                                    <a class='txn-admin-payment-action-edit-lnk button button--small button--icon-only ee-aria-tooltip'
                                       aria-label="<?php esc_attr_e('Edit Payment', 'event_espresso'); ?>"
                                       data-payment-id='PAY_ID'
                                       tabindex='0'
                                    >
                                        <span class='dashicons dashicons-edit'></span>
                                    </a>
                                    <a class='txn-admin-payment-action-delete-lnk button button--small button--icon-only ee-aria-tooltip'
                                       aria-label="<?php esc_attr_e('Delete Payment', 'event_espresso'); ?>"
                                       data-payment-id='PAY_ID'
                                       tabindex='0'
                                    >
                                        <span class='dashicons dashicons-trash'></span>
                                    </a>
                            </div>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>

        <div id="txn-admin-payment-options-ul" class="ee-admin-button-row">
            <?php if ($can_edit_payments) : ?>
                <a id="display-txn-admin-apply-payment"
                   class="button button--primary no-icon no-hide"
                   rel="txn-admin-apply-payment"
                   tabindex='0'
                > <!--display-the-hidden -->
                    <?php esc_html_e('Apply Payment', 'event_espresso'); ?>
                </a>
                <a id="display-txn-admin-apply-refund"
                   class="button button--secondary no-icon no-hide"
                   rel="txn-admin-apply-refund"
                   tabindex='0'
                >  <!--display-the-hidden -->
                    <?php esc_html_e('Apply Refund', 'event_espresso'); ?>
                </a>
            <?php else : ?>
                <span>
                    <?php esc_html__('You do not have access to apply payments or refunds.', 'event_espresso'); ?>
                </span>
            <?php endif; ?>
            <?php
            // Allows extend the fields at actions area.
            ob_start();
            do_action(
                'AHEE__txn_admin_details_main_meta_box_txn_details__after_actions_buttons',
                $can_edit_payments
            );
            $extra_actions = ob_get_clean();
            echo str_replace(['<li', '</li>'], ['<span', '</span>'], $extra_actions);
            ?>
        </div>

        <div id="txn-admin-apply-payment-dv" class="txn-admin-payment-option auto-hide" style="display: none;">

            <h2 id="admin-modal-dialog-apply-payment-h2" class="admin-modal-dialog-h2 hdr-has-icon"
                style="display:none;"
            >
                <?php echo esc_html__('Apply a Payment to Transaction #', 'event_espresso') . esc_html($txn_nmbr['value']); ?>
                <span class='dashicons dashicons-money-alt'></span>
            </h2>

            <h2 id="admin-modal-dialog-edit-payment-h2" class="admin-modal-dialog-h2 hdr-has-icon"
                style="display:none;"
            >
                <?php
                printf(
                    esc_html__('Edit Payment #%s for Transaction #%s', 'event_espresso'),
                    '<span class="ee-admin-payment-id"></span>',
                    $txn_nmbr['value']
                );
                ?>
                <span class='dashicons dashicons-money-alt'></span>
            </h2>

            <h2 id="admin-modal-dialog-edit-refund-h2" class="admin-modal-dialog-h2 hdr-has-icon" style="display:none;">
                <?php
                printf(
                    esc_html__('Edit Refund #%s for Transaction #%s', 'event_espresso'),
                    '<span class="ee-admin-payment-id"></span>',
                    $txn_nmbr['value']
                );
                ?>
                <span class='dashicons dashicons-money-alt'></span>
            </h2>

            <h2 id="admin-modal-dialog-apply-refund-h2" class="admin-modal-dialog-h2 hdr-has-icon"
                style="display:none;"
            >
                <?php
                echo esc_html__('Apply a Refund to Transaction #', 'event_espresso');
                echo esc_html($txn_nmbr['value']);
                ?>
                <span class='dashicons dashicons-money-alt'></span>
            </h2>

            <form name="txn-admin-apply-payment-frm"
                  id="txn-admin-apply-payment-frm"
                  action="<?php echo esc_html($apply_payment_form_url); ?>"
            >
                <div class="admin-modal-dialog-wrap">
                    <div class="admin-modal-dialog-inner ee-layout-stack">

                        <input type="hidden" name="page" value="espresso_transactions" />
                        <input type="hidden" id="txn-form-action"  name="action" value="espresso_apply_payment" />
                        <input type="hidden"
                               name="espresso_apply_payment_nonce"
                               id="espresso_apply_payment_nonce"
                               value="<?php echo esc_attr(wp_create_nonce('espresso_apply_payment_nonce')); ?>"
                        />
                        <!--<input type="hidden" name="espresso_ajax" id="espresso-ajax" value="0" />
                        <input type="hidden" name="noheader" id="txn-admin-noheader-inp" value="0" />-->
                        <input type="hidden"
                               name="txn_admin_payment[PAY_ID]"
                               id="txn-admin-payment-payment-id-inp"
                               class="txn-admin-apply-payment-inp"
                               value="0"
                        />
                        <input type="hidden"
                               name="txn_admin_payment[TXN_ID]"
                               id="txn-admin-payment-txn-id-inp"
                               value="<?php echo esc_attr($txn_nmbr['value']); ?>"
                        />
                        <input type="hidden"
                               name="txn_admin_payment[type]"
                               id="txn-admin-payment-type-inp"
                               value="1"
                        />
                        <input type="hidden"
                               name="txn_admin_payment[details]"
                               id="txn-admin-payment-details-inp"
                               value=""
                        />
                        <input type="hidden"
                               name="txn_admin_delete_payment_form_url"
                               id="txn-admin-delete-payment-form-url-inp"
                               value="<?php echo esc_attr($delete_payment_form_url); ?>"
                        />
                        <input id='txn-admin-todays-date-inp'
                               name="txn_admin_todays_date"
                               type="hidden"
                               value="<?php echo esc_attr(date('Y-m-d h:i a', current_time('timestamp'))); ?>"
                        />

                        <div class="txn-admin-apply-payment-date-dv admin-modal-dialog-row ee-layout-row">
                            <label for='txn-admin-payment-date-inp' class=''>
                                <?php esc_html_e('Payment Date', 'event_espresso'); ?>
                            </label>
                            <div class="ee-layout-stack">
                                <div class="validation-notice-dv">
                                    <?php esc_html_e('The following is  a required field', 'event_espresso'); ?>
                                </div>
                                <input class='txn-admin-apply-payment-inp required'
                                       id="txn-admin-payment-date-inp"
                                       name="txn_admin_payment[date]"
                                       type="text"
                                       value="<?php echo esc_attr(date('Y-m-d g:i a', current_time('timestamp'))); ?>"
                                />
                                <p class="description">
                                    <?php esc_html_e('The date the payment was actually made on', 'event_espresso'); ?>
                                </p>
                            </div>
                        </div>

                        <div class="txn-admin-apply-payment-amount-dv admin-modal-dialog-row ee-layout-row">
                            <label for="txn-admin-payment-amount-inp">
                                <?php esc_html_e('Amount', 'event_espresso'); ?>
                            </label>
                            <div class='ee-layout-stack'>
                                <div class='validation-notice-dv'>
                                    <?php esc_html_e('The following is  a required field', 'event_espresso'); ?>
                                </div>
                                <input class='txn-admin-apply-payment-inp required'
                                       id='txn-admin-payment-amount-inp'
                                       name='txn_admin_payment[amount]'
                                       type='number'
                                       min="0"
                                       step="<?php echo $currency_steps; ?>"
                                       value=''
                                />
                                <p class='description'>
                                    <?php esc_html_e('The amount of the payment', 'event_espresso'); ?>
                                </p>
                            </div>
                        </div>

                        <div class="txn-admin-apply-payment-method-dv admin-modal-dialog-row ee-layout-row">
                            <label for="txn-admin-payment-method-slct" class="">
                                <?php esc_html_e('Method of Payment', 'event_espresso'); ?>
                            </label>
                            <div class='ee-layout-stack'>
                                <div class="validation-notice-dv">
                                    <?php esc_html_e('The following is  a required field', 'event_espresso'); ?>
                                </div>
                                <select class='txn-admin-apply-payment-slct required'
                                        id="txn-admin-payment-method-slct"
                                        name="txn_admin_payment[PMD_ID]"
                                        type="text"
                                >
                                    <?php foreach ($payment_methods as $method) : ?>
                                        <?php $selected = $method->slug() == 'cash' ? ' selected' : ''; ?>
                                        <option id="payment-method-opt-<?php echo esc_attr($method->slug()); ?>"
                                                value="<?php echo esc_attr($method->ID()); ?>"
                                            <?php echo esc_attr($selected); ?>
                                        >
                                            <?php
                                            echo esc_html(
                                                sanitize_key($method->admin_desc())
                                                    ? substr($method->admin_desc(), 0, 128)
                                                    : $method->admin_name()
                                            );
                                            ?>&nbsp;&nbsp;
                                        </option>
                                    <?php endforeach; ?>
                                </select>
                                <p class="description">
                                    <?php esc_html_e(
                                        'Whether the payment was made via PayPal, Credit Card, Cheque, or Cash',
                                        'event_espresso'
                                    ); ?>
                                </p>
                            </div>
                        </div>

                        <div class="mop-PP mop-CC mop-CHQ mop txn-admin-apply-payment-gw-txn-id-dv
                        admin-modal-dialog-row ee-layout-row">
                            <label for="txn-admin-payment-txn-id-chq-nmbr-inp" class="">
                                <?php esc_html_e(
                                    'TXN ID / CHQ #',
                                    'event_espresso'
                                ); ?>
                            </label>
                            <div class='ee-layout-stack'>
                                <input name="txn_admin_payment[txn_id_chq_nmbr]"
                                       id="txn-admin-payment-txn-id-chq-nmbr-inp"
                                       class="txn-admin-apply-payment-inp"
                                       type="text" maxlength="100"
                                />
                                <p class="description">
                                    <?php esc_html_e(
                                        'The Transaction ID sent back from the payment gateway, or the Cheque #',
                                        'event_espresso'
                                    ); ?>
                                </p>
                            </div>
                        </div>

                        <div class="mop-CC mop txn-admin-apply-payment-response-dv admin-modal-dialog-row
                        ee-layout-row" style='display:none'>
                            <label for="txn-admin-payment-gateway-response-inp" class="">
                                <?php esc_html_e('Gateway Response', 'event_espresso'); ?>
                            </label>
                            <div class='ee-layout-stack'>
                                <input name="txn_admin_payment[gateway_response]"
                                       id="txn-admin-payment-gateway-response-inp"
                                       class="txn-admin-apply-payment-inp"
                                       type="text"
                                />
                                <p class="description">
                                    <?php esc_html_e(
                                        'The gateway response string (optional)',
                                        'event_espresso'
                                    ); ?>
                                </p>
                            </div>
                        </div>

                        <div class="mop-PP mop-CC mop txn-admin-apply-payment-status-dv admin-modal-dialog-row
                            ee-layout-row">
                            <label for="txn-admin-payment-status-slct" class="">
                                <?php esc_html_e(
                                    'Payment Status',
                                    'event_espresso'
                                ); ?>
                            </label>
                            <div class='ee-layout-stack'>
                                <select name="txn_admin_payment[status]"
                                        id="txn-admin-payment-status-slct"
                                        class="txn-admin-apply-payment-slct"
                                        type="text"
                                >
                                    <?php foreach ($payment_status as $STS_ID => $STS_code) : ?>
                                        <?php
                                        $selected = $STS_ID == 'PAP'
                                            ? 'selected'
                                            : '';
                                        ?>
                                        <option id="payment-status-opt-<?php echo esc_attr($STS_ID); ?>"
                                                value="<?php echo esc_attr($STS_ID); ?>"
                                            <?php echo esc_attr($selected); ?>
                                        >
                                            <?php echo esc_html($STS_code); ?>
                                        </option>
                                    <?php endforeach; ?>
                                </select>
                                <p class="description">
                                    <?php
                                    esc_html_e(
                                        'Whether the payment was approved, cancelled, declined or failed after submission to the gateway',
                                        'event_espresso'
                                    ); ?>
                                </p>
                            </div>
                        </div>

                        <div class="txn-admin-apply-payment-po-nmbr-dv admin-modal-dialog-row ee-layout-row">
                            <label for="txn-admin-payment-po-nmbr-inp" class="">
                                <?php esc_html_e('P.O. / S.O. #', 'event_espresso'); ?>
                            </label>
                            <div class='ee-layout-stack'>
                                <input class='txn-admin-apply-payment-inp'
                                       id="txn-admin-payment-po-nmbr-inp"
                                       maxlength="100"
                                       name="txn_admin_payment[po_number]"
                                       type="text"
                                />
                                <p class="description">
                                    <?php esc_html_e(
                                        'The Purchase or Sales Order Number if any (optional)',
                                        'event_espresso'
                                    ); ?>
                                </p>
                            </div>
                        </div>

                        <div class="txn-admin-apply-payment-accounting-dv admin-modal-dialog-row ee-layout-row">
                            <label for="txn-admin-payment-accounting-inp" class="last">
                                <?php esc_html_e('Notes / Extra Accounting', 'event_espresso'); ?>
                            </label>
                            <div class='ee-layout-stack'>
                                <input name="txn_admin_payment[accounting]"
                                       id="txn-admin-payment-accounting-inp"
                                       class="txn-admin-apply-payment-inp"
                                       type="text"
                                       value="<?php echo esc_attr($REG_code); ?>"
                                       maxlength="100"
                                />
                                <input type="hidden"
                                       id="txn-admin-reg-code-inp"
                                       value="<?php echo esc_attr($REG_code); ?>"
                                />
                                <p class="description">
                                    <?php esc_html_e(
                                        'An extra field you may use for accounting purposes or simple notes. Defaults to the primary registrant\'s registration code.',
                                        'event_espresso'
                                    ); ?>
                                </p>
                            </div>
                        </div>

                        <div class="txn-admin-apply-payment-registrations-dv admin-modal-dialog-row ee-layout-row">
                            <label for="txn-admin-payment-registrations-inp" class="last">
                                <?php esc_html_e('Registrations to Apply Payment to:', 'event_espresso'); ?>
                            </label>
                            <div class='ee-layout-stack'>
                                <label class="txn-admin-apply-payment-to-registrations-lbl">
                                    <input type="radio"
                                           value="1"
                                           id="txn-admin-apply-payment-to-all-registrations-inp"
                                           name="txn_admin_payment[apply_to_all_registrations]"
                                           checked
                                    />
                                    <?php esc_html_e('ALL Registrations', 'event_espresso'); ?>
                                </label>
                                <label class="txn-admin-apply-payment-to-registrations-lbl">
                                    <input type="radio"
                                           value="0"
                                           id="txn-admin-apply-payment-to-some-registrations-inp"
                                           name="txn_admin_payment[apply_to_all_registrations]"
                                    />
                                    <?php esc_html_e('Just the following Registrations', 'event_espresso'); ?>
                                </label>
                                <?php echo wp_kses($registrations_to_apply_payment_to, AllowedTags::getWithFormTags()); ?>
                            </div>
                        </div>

                        <div class="txn-admin-payment-reg-status-dv admin-modal-dialog-row ee-layout-row">
                            <label for="txn-admin-payment-reg-status-inp" class="last">
                                <?php esc_html_e('Change Registration Status?', 'event_espresso'); ?>
                            </label>
                            <div class='ee-layout-stack'>
                                <?php echo wp_kses($status_change_select, AllowedTags::getWithFormTags()); ?>
                                <p class="description">
                                    <?php esc_html_e(
                                        'If you wish to change the status for the registrations selected above, then select which status from this dropdown.',
                                        'event_espresso'
                                    ); ?>
                                </p>
                            </div>
                        </div>

                        <div class="txn-admin-apply-payment-send-notifications-dv admin-modal-dialog-row ee-layout-row">
                            <label for="txn-admin-payment-send-notifications-inp" class="last">
                                <?php esc_html_e('Send Related Messages?', 'event_espresso'); ?>
                            </label>
                            <div class='ee-layout-stack'>
                                <label class="txn-admin-payment-send-notifications-lbl">
                                    <input type="checkbox"
                                           value="1"
                                           name="txn_payments[send_notifications]"
                                           checked
                                           aria-checked="true"
                                           style="vertical-align: middle;"
                                    />
                                    <?php esc_html_e('Payment Messages?', 'event_espresso'); ?>
                                </label>
                                <label class="txn-admin-payment-send-notifications-lbl">
                                    <input type="checkbox"
                                           value="1"
                                           name="txn_reg_status_change[send_notifications]"
                                           style="vertical-align: middle;"
                                    />
                                    <?php esc_html_e('Registration Messages?', 'event_espresso'); ?>
                                </label>
                                <br class="clear-float" />
                                <p class="description">
                                    <?php printf(
                                        esc_html__(
                                            'By default %1$sa payment message is sent to the primary registrant%2$s after submitting this form.%3$sHowever, if you check the "Registration Messages" box, the system will also send any related messages matching the status of the registrations to %1$seach registration for this transaction%2$s.',
                                            'event_espresso'
                                        ),
                                        '<strong>',
                                        '</strong>',
                                        '<br />'
                                    ); ?>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="admin-modal-dialog-options-ul">
                    <a id="txn-admin-modal-dialog-apply-payment-lnk"
                       class="button button--primary no-icon"
                       style="display:none;"
                       tabindex='0'
                    >
                        <?php esc_html_e('Apply Payment', 'event_espresso'); ?>
                    </a>
                    <a id="txn-admin-modal-dialog-edit-payment-lnk"
                       class="button button--primary no-icon"
                       style="display:none;"
                       tabindex='0'
                    >
                        <?php esc_html_e('Save Payment Details', 'event_espresso'); ?>
                    </a>
                    <a id="txn-admin-modal-dialog-edit-refund-lnk"
                       class="button button--primary no-icon"
                       style="display:none;"
                       tabindex='0'
                    >
                        <?php esc_html_e('Save Refund Details', 'event_espresso'); ?>
                    </a>
                    <a id="txn-admin-modal-dialog-apply-refund-lnk"
                       class="button button--primary no-icon"
                       style="display:none;"
                       tabindex='0'
                    >
                        <?php esc_html_e('Apply Refund', 'event_espresso'); ?>
                    </a>
                    <a id="txn-admin-modal-dialog-cancel-lnk" class="button button--secondary no-icon" tabindex='0'>
                        <?php esc_html_e('Cancel', 'event_espresso'); ?>
                    </a>
                    <span id="ee-ajax-processing-text" style="display:none;">
                        <?php esc_html_e('Processing...', 'event_espresso'); ?>
                    </span>
                </div>

                <br class="clear" />

            </form>
        </div>

        <div id="txn-admin-delete-payment-dv" class="txn-admin-payment-option auto-hide" style="display: none;">

            <h2 id="admin-modal-dialog-delete-payment-h2" class="admin-modal-dialog-h2 hdr-has-icon"
                style="display:none;"
            >
                <?php printf(
                    esc_html__('Delete Payment/Refund for Transaction #', 'event_espresso'),
                    $txn_nmbr['value']
                );
                ?>
                <span class='dashicons dashicons-money-alt'></span>
            </h2>

            <form name="txn-admin-delete-payment-frm"
                  id="txn-admin-delete-payment-frm"
                  action="<?php echo esc_url_raw($delete_payment_url); ?>"
            >
                <div class="admin-modal-dialog-wrap">
                    <div class="admin-modal-dialog-inner">

                        <input type='hidden' name='page' value='espresso_transactions' />
                        <input type='hidden' id='txn-form-action' name='action' value='espresso_delete_payment' />
                        <input type="hidden"
                               name="espresso_delete_payment_nonce"
                               id="espresso_delete_payment_nonce"
                               value="<?php echo esc_attr(wp_create_nonce('espresso_delete_payment_nonce')); ?>"
                        />
                        <!--<input type="hidden" name="delete_espresso_ajax" id="delete-espresso-ajax" value="0" />-->
                        <!--<input type="hidden" name="delete_noheader" id="delete-txn-admin-noheader-inp" value="0" />-->
                        <input type="hidden"
                               name="delete_txn_admin_payment[PAY_ID]"
                               id="delete-txn-admin-payment-payment-id-inp"
                               class="txn-admin-apply-payment-inp"
                               value="0"
                        />
                        <input type="hidden"
                               name="delete_txn_admin_payment[TXN_ID]"
                               id="delete-txn-admin-payment-txn-id-inp"
                               value="<?php echo esc_attr($txn_nmbr['value']); ?>"
                        />

                        <div class="txn-admin-apply-payment-accounting-dv admin-modal-dialog-row ee-layout-row">
                            <label for="delete-txn-admin-payment-reg-status-inp" class="last">
                                <?php esc_html_e('Change Registration Status?', 'event_espresso'); ?>
                            </label>
                            <div class='ee-layout-stack'>
                                <?php echo wp_kses($delete_status_change_select, AllowedTags::getWithFormTags()); ?>
                                <p class="description">
                                    <?php printf(
                                        esc_html__(
                                            'If you wish to change the status of all the registrations associated with this transaction after deleting this payment/refund, then select which status from this dropdown. %sNote: ALL registrations associated with this transaction will be updated to this new status.%s',
                                            'event_espresso'
                                        ),
                                        '<strong>',
                                        '</strong>'
                                    ); ?>
                                </p>
                            </div>
                        </div>

                        <div class="ee-attention txn-admin-apply-payment-accounting-dv admin-modal-dialog-row ee-layout-row">
                            <label for="delete-txn-admin-payment-accounting-inp" class="last">
                                <?php esc_html_e('Send Related Messages?', 'event_espresso'); ?>
                            </label>
                            <div class='ee-layout-stack'>
                                <input type="checkbox"
                                       value="1"
                                       name="delete_txn_reg_status_change[send_notifications]"
                                       id='delete-txn-admin-payment-accounting-inp'
                                />
                                <p class="description">
                                    <?php
                                    esc_html_e(
                                        'If you check this box, the system will send any related registration messages matching the status of the registrations to each registration for this transaction. No Payment notifications are sent when deleting a payment.',
                                        'event_espresso'
                                    ); ?>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="del-admin-modal-dialog-options-ul">
                    <a id="txn-admin-modal-dialog-delete-lnk" class="button button--primary no-icon"
                       style="display:none;" tabindex='0'>
                        <?php esc_html_e('Delete', 'event_espresso'); ?>
                    </a>
                    <a id="del-txn-admin-modal-dialog-cancel-lnk" class="button button--secondary no-icon" tabindex='0'>
                        <?php esc_html_e('Cancel', 'event_espresso'); ?>
                    </a>
                    <span id="delete-ee-ajax-processing-text" style="display:none;">
                        <?php esc_html_e('Processing...', 'event_espresso'); ?>
                    </span>
                </div>

                <br class="clear" />

            </form>
        </div>

    <?php endif; // $grand_raw_total > 0?>

    <?php if (WP_DEBUG) {
        $delivered_messages = get_option('EED_Messages__payment', []);
        if (isset($delivered_messages[ $TXN_ID ])) { ?>
            <h4 class="admin-primary-mbox-h4 hdr-has-icon">
                <?php esc_html_e('Messages Sent to Primary Registrant', 'event_espresso'); ?>
                <span class="dashicons dashicons-email-alt"></span>
            </h4>
            <div class="admin-primary-mbox-tbl-wrap">
                <table class="admin-primary-mbox-tbl striped">
                    <thead>
                        <tr>
                            <th class="jst-left"><?php esc_html_e('Date & Time', 'event_espresso'); ?></th>
                            <th class="jst-left"><?php esc_html_e('Message Type', 'event_espresso'); ?></th>
                            <th class="jst-left"><?php esc_html_e(
                                'Payment Status Upon Sending',
                                'event_espresso'
                            ); ?></th>
                            <th class="jst-left"><?php esc_html_e('TXN Status Upon Sending', 'event_espresso'); ?></th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        foreach ($delivered_messages[ $TXN_ID ] as $timestamp => $delivered_message) :
                            ?>
                            <tr>
                                <td class="jst-left">
                                    <?php echo esc_html(
                                        date(
                                            get_option('date_format') . ' ' . get_option('time_format'),
                                            ($timestamp + (get_option('gmt_offset') * HOUR_IN_SECONDS))
                                        )
                                    ); ?>
                                </td>
                                <td class="jst-left"><?php
                                    echo isset($delivered_message['message_type'])
                                        ? esc_html($delivered_message['message_type'])
                                        : ''; ?>
                                </td>
                                <td class="jst-left"><?php
                                    echo isset($delivered_message['pay_status'])
                                        ? esc_html($delivered_message['pay_status'])
                                        : ''; ?>
                                </td>
                                <td class="jst-left"><?php
                                    echo isset($delivered_message['txn_status'])
                                        ? esc_html($delivered_message['txn_status'])
                                        : ''; ?>
                                </td>
                            </tr>
                        <?php endforeach; // $delivered_messages?>
                    </tbody>
                </table>
            </div>
            <?php
        }
    }
    ?>
</div>
