<?php

/**
 * Template for transaction action metabox content
 * This metabox is located on the Transaction Details view
 * Template Variables are:
 *
 * @var EE_Transaction|null $transaction
 * @var string              $send_payment_reminder_button
 * @var string              $view_invoice_button
 * @var string              $view_receipt_button
 */

do_action('AHEE__txn_details_action_metabox_content__before', $transaction);
echo esc_html($send_payment_reminder_button);
echo esc_html($view_receipt_button);
echo esc_html($view_invoice_button);
do_action('AHEE__txn_details_action_metabox_content__after', $transaction);
