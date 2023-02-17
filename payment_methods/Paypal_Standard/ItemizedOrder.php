<?php

namespace EventEspresso\payment_methods\Paypal_Standard;

use EE_Error;
use EE_Line_Item;
use EE_Payment;
use EE_Transaction;
use EEG_Paypal_Standard;
use EEH_Line_Item;
use EEH_Money;
use EventEspresso\core\services\payment_methods\gateways\GatewayDataFormatterInterface;
use ReflectionException;

class ItemizedOrder
{
    /**
     * @var float
     */
    private $existing_shipping_charges = 0.00;

    /**
     * keeps track of exactly how much the itemized order amount equals
     *
     * @var float
     */
    private $itemized_order_sum = 0.00;

    /**
     * @var GatewayDataFormatterInterface
     */
    protected $gateway_data_formatter;

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
     * @var EEG_Paypal_Standard
     */
    protected $paypal_gateway;

    /**
     * @var float
     */
    private $total_discounts = 0.00;

    /**
     * @var EE_Transaction
     */
    private $transaction;


    /**
     * @param GatewayDataFormatterInterface $gateway_data_formatter
     * @param EEG_Paypal_Standard           $paypal_gateway
     */
    public function __construct(GatewayDataFormatterInterface $gateway_data_formatter, EEG_Paypal_Standard $paypal_gateway)
    {
        $this->gateway_data_formatter = $gateway_data_formatter;
        $this->paypal_gateway = $paypal_gateway;
    }


    /**
     * @param EE_Payment $payment
     * @param string     $return_url    URL to send the user to after payment on the payment provider's website
     * @param string     $notify_url    URL to send the instant payment notification
     * @param string     $cancel_url    URL to send the user to after a cancelled payment attempt
     *                                  on the payment provider's website
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function generateItemizedOrderForPayment(
        EE_Payment $payment,
        string $return_url = '',
        string $notify_url = '',
        string $cancel_url = ''
    ): array {
        $this->payment         = $payment;
        $this->transaction     = $this->payment->transaction();
        $this->total_discounts = $this->transaction->paid();
        $total_line_item       = $this->transaction->total_line_item();

        // only itemize the order if we're paying for the rest of the order's amount
        $item_num = 1;
        $item_num = $this->paymentIsForTransactionTotal()
            ? $this->itemizeOrderForFullPayment($total_line_item, $item_num)
            : $this->handlePartialPayment($item_num);

        if ($this->paypal_gateway->isInSandboxMode()) {
            $this->addSandboxModeArgs($item_num, $notify_url, $return_url);
        }
        $this->addGeneralOrderItems($cancel_url, $notify_url, $return_url);
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
     * if the payment is for the remaining transaction amount,
     * keep track of exactly how much the itemized order amount equals
     *
     * @param EE_Line_Item $total_line_item
     * @param int          $item_num
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function itemizeOrderForFullPayment(EE_Line_Item $total_line_item, int $item_num): int
    {
        $this->payment->update_extra_meta(EEG_Paypal_Standard::itemized_payment_option_name, true);
        // this payment is for the remaining transaction amount, so let's show all the line items
        $item_num = $this->addOrderItemsForLineItems($total_line_item, $item_num);
        // and make adjustments as needed
        $item_num = $this->handleItemizedOrderSumDifference($total_line_item, $item_num);
        // add our taxes to the order if we're NOT using PayPal's
        if (! $this->paypal_gateway->paypalTaxes()) {
            $this->order_items['tax_cart'] = $total_line_item->get_total_tax();
        }
        return $item_num;
    }


    /**
     * @param int $item_num
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function handlePartialPayment(int $item_num): int
    {
        $this->payment->update_extra_meta(EEG_Paypal_Standard::itemized_payment_option_name, false);
        // partial payment that's not for the remaining amount, so we can't send an itemized list
        $this->order_items[ "item_name_{$item_num}" ] = substr(
            $this->gateway_data_formatter->formatPartialPaymentLineItemName($this->payment),
            0,
            127
        );
        $this->order_items[ "amount_{$item_num}" ]    = $this->payment->amount();
        $this->order_items[ "shipping_{$item_num}" ]  = '0';
        $this->order_items[ "shipping2_{$item_num}" ] = '0';
        $this->order_items['tax_cart']              = '0';
        $item_num++;
        return $item_num;
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
        foreach ($total_line_item->get_items() as $line_item) {
            if ($line_item instanceof EE_Line_Item) {
                // it's some kind of discount
                if (EEH_Money::compare_floats($line_item->pretaxTotal(), 0.00, '<')) {
                    $this->total_discounts    += abs($line_item->pretaxTotal());
                    $this->itemized_order_sum += $line_item->pretaxTotal();
                    continue;
                }
                // dont include shipping again.
                if (strpos($line_item->code(), 'paypal_shipping_') === 0) {
                    $this->existing_shipping_charges = $line_item->pretaxTotal();
                    continue;
                }
                $this->order_items[ "item_name_{$item_num}" ] = substr(
                    $this->gateway_data_formatter->formatLineItemName($line_item, $this->payment),
                    0,
                    127
                );
                $this->order_items[ "amount_{$item_num}" ]    = $line_item->unit_price();
                $this->order_items[ "quantity_{$item_num}" ]  = $line_item->quantity();
                // if we're not letting PayPal calculate shipping, tell them its 0
                if (! $this->paypal_gateway->paypalShipping()) {
                    $this->order_items[ "shipping_{$item_num}" ]  = '0';
                    $this->order_items[ "shipping2_{$item_num}" ] = '0';
                }
                $this->itemized_order_sum += $line_item->pretaxTotal();
                $item_num++;
            }
        }
        return $item_num;
    }


    /**
     * @param EE_Line_Item $total_line_item
     * @param int          $item_num
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function handleItemizedOrderSumDifference(EE_Line_Item $total_line_item, int $item_num): int
    {
        $taxes_li = EEH_Line_Item::get_taxes_subtotal($total_line_item);
        // calculate the difference between the TXN total and the itemized order sum
        $itemized_order_sum_difference = round(
            $this->transaction->total()
            - $this->itemized_order_sum
            - $taxes_li->total()
            - $this->existing_shipping_charges,
            2
        );
        // ideally the itemized order sum equals the transaction total, but if not (which is weird),
        // and the itemized sum is LESS than the transaction total...
        if (EEH_Money::compare_floats($itemized_order_sum_difference, 0.00, '<')) {
            // add the difference to the discounts
            $this->total_discounts += abs($itemized_order_sum_difference);
        } elseif (EEH_Money::compare_floats($itemized_order_sum_difference, 0.00, '>')) {
            // the itemized order sum is MORE than the transaction total
            $this->order_items[ "item_name_{$item_num}" ] = substr(
                esc_html__('additional charges', 'event_espresso'),
                0,
                127
            );
            $this->order_items[ "amount_{$item_num}" ]    = $this->gateway_data_formatter->formatCurrency(
                $itemized_order_sum_difference
            );
            $this->order_items[ "quantity_{$item_num}" ]  = 1;
            $item_num++;
        }
        if (EEH_Money::compare_floats($this->total_discounts, 0.00, '>')) {
            $this->order_items['discount_amount_cart'] = $this->gateway_data_formatter->formatCurrency(
                $this->total_discounts
            );
        }
        return $item_num;
    }


    /**
     * @param int    $item_num
     * @param string $notify_url
     * @param string $return_url
     */
    private function addSandboxModeArgs(int $item_num, string $notify_url, string $return_url)
    {
        $this->order_items[ "item_name_{$item_num}" ] = 'DEBUG INFO (this item only added in sandbox mode';
        $this->order_items[ "amount_{$item_num}" ]    = 0;
        $this->order_items[ "on0_{$item_num}" ]       = 'NOTIFY URL';
        $this->order_items[ "os0_{$item_num}" ]       = $notify_url;
        $this->order_items[ "on1_{$item_num}" ]       = 'RETURN URL';
        $this->order_items[ "os1_{$item_num}" ]       = $return_url;
        $this->order_items[ "shipping_{$item_num}" ]  = '0';
        $this->order_items[ "shipping2_{$item_num}" ] = '0';
        // $this->order_items['option_index_' . $item_num] = 1; // <-- dunno if this is needed ?
    }


    /**
     * @param string $cancel_url
     * @param string $notify_url
     * @param string $return_url
     */
    private function addGeneralOrderItems(string $cancel_url, string $notify_url, string $return_url)
    {
        $this->order_items['business']      = $this->paypal_gateway->paypalId();
        $this->order_items['return']        = $return_url;
        $this->order_items['cancel_return'] = $cancel_url;
        $this->order_items['notify_url']    = $notify_url;
        $this->order_items['cmd']           = '_cart';
        $this->order_items['upload']        = 1;
        $this->order_items['currency_code'] = $this->payment->currency_code();
        $this->order_items['rm']            = 2;// makes the user return with method=POST
        $this->order_items['no_shipping']   = $this->paypal_gateway->shippingDetails();
        $this->order_items['bn']            = 'EventEspresso_SP';// EE will blow up if you change this
        if ($this->paypal_gateway->imageUrl()) {
            $this->order_items['image_url'] = $this->paypal_gateway->imageUrl();
        }
    }
}
