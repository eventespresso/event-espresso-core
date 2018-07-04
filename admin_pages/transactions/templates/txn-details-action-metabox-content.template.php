<?php
/**
 * Template for transaction action metabox content
 * This metabox is located on the Transaction Details view
 * Template Variables are:
 *
 * @param EE_Transaction|null $transaction
 * @param string send_payment_reminder_button
 * @param string view_receipt_button
 * @param string view_invoice_button
 */
do_action('AHEE__txn_details_action_metabox_content__before', $transaction);
echo $send_payment_reminder_button;
echo $view_receipt_button;
echo $view_invoice_button;
do_action('AHEE__txn_details_action_metabox_content__after', $transaction);
