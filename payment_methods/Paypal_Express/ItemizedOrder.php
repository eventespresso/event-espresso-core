<?php

namespace EventEspresso\payment_methods\Paypal_Express;

use EE_Error;
use EE_Line_Item;
use EE_Payment;
use EE_Registry;
use EE_Transaction;
use EEH_Money;
use EventEspresso\core\services\payment_methods\gateways\GatewayDataFormatterInterface;
use ReflectionException;
use RuntimeException;

class ItemizedOrder
{


    /**
     * number of decimal places to round numbers to when performing calculations
     *
     * @var integer
     */
    protected $decimal_precision = 6;

    /**
     * @var GatewayDataFormatterInterface
     */
    protected $gateway_data_formatter;

    /**
     * keeps track of exactly how much the itemized order amount equals
     *
     * @var float
     */
    private $itemized_order_sum = 0.00;

    /**
     * @var array
     */
    private $order_items;

    /**
     * the payment being processed
     *
     * @var EE_Payment
     */
    protected $payment;

    /**
     * @var EE_Transaction
     */
    private $transaction;


    /**
     * @param GatewayDataFormatterInterface $gateway_data_formatter
     */
    public function __construct(GatewayDataFormatterInterface $gateway_data_formatter)
    {
        $this->decimal_precision      = EE_Registry::instance()->CFG->currency->dec_plc;
        $this->gateway_data_formatter = $gateway_data_formatter;
        $this->order_items            = [];
    }


    /**
     * @param array $request_response_args
     * @return array
     */
    public function getExistingItemizedOrder(array $request_response_args): array
    {
        // If we have data from a previous communication with PP (on this transaction) we may use that for our list...
        if (
            ! empty($request_response_args)
            && array_key_exists('L_PAYMENTREQUEST_0_AMT0', $request_response_args)
            && array_key_exists('PAYMENTREQUEST_0_ITEMAMT', $request_response_args)
        ) {
            foreach ($request_response_args as $arg_key => $arg_val) {
                if (
                    strpos($arg_key, 'PAYMENTREQUEST_') !== false
                    && strpos($arg_key, 'NOTIFYURL') === false
                ) {
                    $this->order_items[ $arg_key ] = $arg_val;
                }
            }
            // If we only get a few Items then something is not right.
            if (count($this->order_items) < 3) {
                throw new RuntimeException(
                    sprintf(
                        esc_html__(
                            'Unable to continue with the checkout because a proper purchase list could not be generated. The purchased list we could have sent was %1$s',
                            'event_espresso'
                        ),
                        wp_json_encode($this->order_items)
                    )
                );
            }
        }
        return $this->order_items;
    }


    /**
     *  Make a list of items that are in the giver transaction.
     *
     * @param EE_Payment $payment
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function generateItemizedOrder(EE_Payment $payment): array
    {
        $this->payment     = $payment;
        $this->transaction = $this->payment->transaction();
        // reset order items
        $this->order_items = [];
        if ($this->paymentIsForTransactionTotal()) {
            $this->itemizeOrderForFullPayment();
        } else {
            $this->handlePartialPayment();
        }
        return $this->order_items;
    }


    /**
     * @return bool
     * @throws ReflectionException
     * @throws EE_Error
     */
    private function paymentIsForTransactionTotal(): bool
    {
        return EEH_Money::compare_floats($this->payment->amount(), $this->transaction->total(), '==');
    }


    /**
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function itemizeOrderForFullPayment()
    {
        $item_num        = 0;
        $total_line_item = $this->transaction->total_line_item();
        $item_num        = $this->addOrderItemsForLineItems($total_line_item, $item_num);
        $this->addOrderItemsForAdditionalCharges($total_line_item);
        $this->handleItemizedOrderSumDifference($total_line_item, $item_num);
    }


    /**
     * @return void
     * @throws EE_Error
     */
    private function handlePartialPayment()
    {
        // Item Name.
        $this->order_items['L_PAYMENTREQUEST_0_NAME0'] = mb_strcut(
            $this->gateway_data_formatter->formatPartialPaymentLineItemName($this->payment),
            0,
            127
        );
        // Item description.
        $this->order_items['L_PAYMENTREQUEST_0_DESC0'] = mb_strcut(
            $this->gateway_data_formatter->formatPartialPaymentLineItemDesc($this->payment),
            0,
            127
        );
        // Cost of individual item.
        $this->order_items['L_PAYMENTREQUEST_0_AMT0'] = $this->gateway_data_formatter->formatCurrency(
            $this->payment->amount(),
            $this->decimal_precision
        );
        // Item Number.
        $this->order_items['L_PAYMENTREQUEST_0_NUMBER0'] = 1;
        // Item quantity.
        $this->order_items['L_PAYMENTREQUEST_0_QTY0'] = 1;
        // Digital item is sold.
        $this->order_items['L_PAYMENTREQUEST_0_ITEMCATEGORY0'] = 'Physical';
        // Item's sales S/H and tax amount.
        $this->order_items['PAYMENTREQUEST_0_ITEMAMT']     = $this->gateway_data_formatter->formatCurrency(
            $this->payment->amount(),
            $this->decimal_precision
        );
        $this->order_items['PAYMENTREQUEST_0_TAXAMT']      = '0';
        $this->order_items['PAYMENTREQUEST_0_SHIPPINGAMT'] = '0';
        $this->order_items['PAYMENTREQUEST_0_HANDLINGAMT'] = '0';
    }


    /**
     * @param EE_Line_Item $total_line_item
     * @param int          $item_num
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function addOrderItemsForLineItems(EE_Line_Item $total_line_item, int $item_num): int
    {
        // Go through each item in the list.
        foreach ($total_line_item->get_items() as $line_item) {
            if ($line_item instanceof EE_Line_Item) {
                // PayPal doesn't like line items with 0.00 amount, so we may skip those.
                if (EEH_Money::compare_floats($line_item->pretaxTotal(), '0.00', '==')) {
                    continue;
                }
                $unit_price         = $this->gateway_data_formatter->formatCurrency(
                    $line_item->unit_price(),
                    $this->decimal_precision
                );
                $line_item_quantity = $line_item->quantity();
                // This is a discount.
                if ($line_item->is_percent()) {
                    $unit_price         = $line_item->pretaxTotal();
                    $line_item_quantity = 1;
                }
                // Item Name.
                $this->order_items[ "L_PAYMENTREQUEST_0_NAME{$item_num}" ] = mb_strcut(
                    $this->gateway_data_formatter->formatLineItemName($line_item, $this->payment),
                    0,
                    127
                );
                // Item description.
                $this->order_items[ "L_PAYMENTREQUEST_0_DESC{$item_num}" ] = mb_strcut(
                    $this->gateway_data_formatter->formatLineItemDesc($line_item, $this->payment),
                    0,
                    127
                );
                // Cost of individual item.
                $this->order_items[ "L_PAYMENTREQUEST_0_AMT{$item_num}" ] = $unit_price;
                // Item Number.
                $this->order_items[ "L_PAYMENTREQUEST_0_NUMBER{$item_num}" ] = $item_num + 1;
                // Item quantity.
                $this->order_items[ "L_PAYMENTREQUEST_0_QTY{$item_num}" ] = $line_item_quantity;
                // Digital item is sold.
                $this->order_items[ "L_PAYMENTREQUEST_0_ITEMCATEGORY{$item_num}" ] = 'Physical';
                // add item total to order sum
                $this->itemized_order_sum += $unit_price * $line_item_quantity;
                ++$item_num;
            }
        }
        return $item_num;
    }


    /**
     * @param EE_Line_Item $total_line_item
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function addOrderItemsForAdditionalCharges(EE_Line_Item $total_line_item)
    {
        // Item's sales S/H and tax amount.
        $this->order_items['PAYMENTREQUEST_0_ITEMAMT']     = $total_line_item->get_items_total();
        $this->order_items['PAYMENTREQUEST_0_TAXAMT']      = $total_line_item->get_total_tax();
        $this->order_items['PAYMENTREQUEST_0_SHIPPINGAMT'] = '0';
        $this->order_items['PAYMENTREQUEST_0_HANDLINGAMT'] = '0';
    }


    /**
     * @param EE_Line_Item $total_line_item
     * @param int          $item_num
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function handleItemizedOrderSumDifference(EE_Line_Item $total_line_item, int $item_num)
    {
        // calculate the difference between the TXN total and the itemized order sum
        $itemized_order_sum_difference = round(
            $this->transaction->total()
            - $this->itemized_order_sum
            - $total_line_item->get_total_tax(),
            $this->decimal_precision
        );
        // If we were not able to recognize some item like promotion, surcharge or cancellation,
        // add the difference as an extra line item.
        if (EEH_Money::compare_floats($itemized_order_sum_difference, 0, '!=')) {
            // Item Name.
            $this->order_items[ "L_PAYMENTREQUEST_0_NAME{$item_num}" ] = mb_strcut(
                esc_html__(
                    'Other (promotion/surcharge/cancellation)',
                    'event_espresso'
                ),
                0,
                127
            );
            // Item description.
            $this->order_items[ "L_PAYMENTREQUEST_0_DESC{$item_num}" ] = '';
            // Cost of individual item.
            $this->order_items[ "L_PAYMENTREQUEST_0_AMT{$item_num}" ] = $this->gateway_data_formatter->formatCurrency(
                $itemized_order_sum_difference,
                $this->decimal_precision
            );
            // Item Number.
            $this->order_items[ "L_PAYMENTREQUEST_0_NUMBER{$item_num}" ] = $item_num + 1;
            // Item quantity.
            $this->order_items[ "L_PAYMENTREQUEST_0_QTY{$item_num}" ] = 1;
            // Digital item is sold.
            $this->order_items[ "L_PAYMENTREQUEST_0_ITEMCATEGORY{$item_num}" ] = 'Physical';
        }
    }
}
