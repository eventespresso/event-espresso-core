<?php

namespace EventEspresso\core\domain\services\admin\registrations\list_table\csv_reports;

/**
 * Class PaymentsInfo
 * Extracts payment information using the payment records
 *
 * @author  Hossein Rafiei
 * @package EventEspresso\core\domain\services\admin\registrations\list_table\csv_reports
 */
class PaymentsInfoCSV
{

    /**
     * Extracts payment information using the payment records
     *
     * @param array $payments_info
     * @return array
     */
    public static function extractPaymentInfo(array $payments_info)
    {
        $payment_methods = [];
        $gateway_txn_ids_etc = [];
        $payment_times = [];
        foreach ($payments_info as $payment_method_and_gateway_txn_id) {
            $payment_methods[] = isset($payment_method_and_gateway_txn_id['name'])
                ? $payment_method_and_gateway_txn_id['name']
                : esc_html__('Unknown', 'event_espresso');
            $gateway_txn_ids_etc[] = isset($payment_method_and_gateway_txn_id['gateway_txn_id'])
                ? $payment_method_and_gateway_txn_id['gateway_txn_id']
                : '';
            $payment_times[] = isset($payment_method_and_gateway_txn_id['payment_time'])
                ? $payment_method_and_gateway_txn_id['payment_time']
                : '';
        }
        return [$payment_methods, $gateway_txn_ids_etc, $payment_times];
    }
}
