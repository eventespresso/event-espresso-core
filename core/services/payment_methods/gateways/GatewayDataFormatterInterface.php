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
    public function formatPartialPaymentLineItemName(EE_Payment $payment): string;



    /**
     * Gets the text to use for a gateway's line item description when this is a partial payment
     *
     * @param EE_Payment $payment
     * @return string
     */
    public function formatPartialPaymentLineItemDesc(EE_Payment $payment): string;



    /**
     * Gets the name to use for a line item when sending line items to the gateway
     *
     * @param EE_Line_Item $line_item
     * @param EE_Payment   $payment
     * @return string
     */
    public function formatLineItemName(EE_Line_Item $line_item, EE_Payment $payment): string;



    /**
     * Gets the description to use for a line item when sending line items to the gateway
     *
     * @param EE_Line_Item $line_item
     * @param EE_Payment   $payment
     * @return string
     */
    public function formatLineItemDesc(EE_Line_Item $line_item, EE_Payment $payment): string;



    /**
     * Gets the order description that should generally be sent to gateways
     *
     * @param EE_Payment $payment
     * @return string
     */
    public function formatOrderDescription(EE_Payment $payment): string;



    /**
     * Formats the amount so it can generally be sent to gateways
     *
     * @param float $amount
     * @param int   $precision
     * @return string
     */
    public function formatCurrency(float $amount, int $precision = 2): string;
}
