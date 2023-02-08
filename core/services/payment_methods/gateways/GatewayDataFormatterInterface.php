<?php

namespace EventEspresso\core\services\payment_methods\gateways;

use EE_Line_Item;
use EE_Payment;

/**
 * Class GatewayDataFormatterInterface
 * Interface which helps prepare data for sending to gateways
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          4.9.31.p
 */
interface GatewayDataFormatterInterface
{
    /**
     * Gets the text to use for a gateway's line item name when this is a partial payment
     *
     * @param EE_Payment $payment
     * @return string
     */
    public function formatPartialPaymentLineItemName($payment);



    /**
     * Gets the text to use for a gateway's line item description when this is a partial payment
     *
     * @param EE_Payment $payment
     * @return string
     */
    public function formatPartialPaymentLineItemDesc($payment);



    /**
     * Gets the name to use for a line item when sending line items to the gateway
     *
     * @param EE_Line_Item $line_item
     * @param EE_Payment   $payment
     * @return string
     */
    public function formatLineItemName($line_item, $payment);



    /**
     * Gets the description to use for a line item when sending line items to the gateway
     *
     * @param EE_Line_Item $line_item
     * @param EE_Payment   $payment
     * @return string
     */
    public function formatLineItemDesc($line_item, $payment);



    /**
     * Gets the order description that should generally be sent to gateways
     *
     * @param EE_Payment $payment
     * @return string
     */
    public function formatOrderDescription($payment);



    /**
     * Formats the amount so it can generally be sent to gateways
     *
     * @param float $amount
     * @param int   $precision
     * @return string
     */
    public function formatCurrency($amount, $precision = 2);
}
