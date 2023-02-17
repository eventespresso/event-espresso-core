<?php

namespace EventEspresso\core\services\payment_methods\gateways;

use EE_Error;
use EE_Line_Item;
use EE_Payment;
use ReflectionException;

/**
 * Class GatewayDataFormatter
 * Helper for gateway classes which helps to prepare data for sending to gateways. These methods help
 * to keep data sent to the various gateways consistent and filterable.
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          4.9.31.p
 */
class GatewayDataFormatter implements GatewayDataFormatterInterface
{
    /**
     * Gets the text to use for a gateway's line item name when this is a partial payment
     *
     * @param EE_Payment $payment
     * @return string
     */
    public function formatPartialPaymentLineItemName(EE_Payment $payment): string
    {
        return apply_filters(
            'EEG_Paypal_Pro__do_direct_payment__partial_amount_line_item_name',
            $payment->get_first_event_name(),
            $this,
            $payment
        );
    }


    /**
     * Gets the text to use for a gateway's line item description when this is a partial payment
     *
     * @param EE_Payment $payment
     * @return string
     * @throws EE_Error
     */
    public function formatPartialPaymentLineItemDesc(EE_Payment $payment): string
    {
        return apply_filters(
            'FHEE__EE_Gateway___partial_payment_desc',
            sprintf(
                esc_html__('Payment of %1$s for %2$s', "event_espresso"),
                $payment->get_pretty('PAY_amount', 'no_currency_code'),
                $payment->get_first_event_name()
            ),
            $this,
            $payment
        );
    }


    /**
     * Gets the name to use for a line item when sending line items to the gateway
     *
     * @param EE_Line_Item $line_item
     * @param EE_Payment  $payment
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function formatLineItemName(EE_Line_Item $line_item, EE_Payment $payment): string
    {
        return apply_filters(
            'FHEE__EE_gateway___line_item_name',
            sprintf(
                _x('%1$s for %2$s', 'Ticket for Event', 'event_espresso'),
                $line_item->name(),
                $line_item->ticket_event_name()
            ),
            $this,
            $line_item,
            $payment
        );
    }


    /**
     * Gets the description to use for a line item when sending line items to the gateway
     *
     * @param EE_Line_Item $line_item
     * @param EE_Payment  $payment
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function formatLineItemDesc(EE_Line_Item $line_item, EE_Payment $payment): string
    {
        return apply_filters(
            'FHEE__EE_Gateway___line_item_desc',
            $line_item->desc(),
            $this,
            $line_item,
            $payment
        );
    }


    /**
     * Gets the order description that should generally be sent to gateways
     *
     * @param EE_Payment $payment
     * @return string
     */
    public function formatOrderDescription(EE_Payment $payment): string
    {
        return apply_filters(
            'FHEE__EE_Gateway___order_description',
            sprintf(
                esc_html__('Event Registrations from %1$s for %2$s', "event_espresso"),
                wp_specialchars_decode(get_bloginfo(), ENT_QUOTES),
                $payment->get_first_event_name()
            ),
            $this,
            $payment
        );
    }


    /**
     * Formats the amount so it can generally be sent to gateways
     *
     * @param float $amount
     * @param int $precision
     * @return string
     */
    public function formatCurrency(float $amount, int $precision = 2): string
    {
        return number_format($amount, $precision, '.', '');
    }
}
