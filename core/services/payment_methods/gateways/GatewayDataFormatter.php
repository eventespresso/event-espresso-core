<?php
namespace EventEspresso\core\services\payment_methods\gateways;

defined('EVENT_ESPRESSO_VERSION') || exit;



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
     * @param \EEI_Payment $payment
     * @return string
     */
    public function formatPartialPaymentLineItemName(\EEI_Payment $payment)
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
     * @param \EEI_Payment $payment
     * @return string
     */
    public function formatPartialPaymentLineItemDesc(\EEI_Payment $payment)
    {
        return apply_filters(
            'FHEE__EE_Gateway___partial_payment_desc',
            sprintf(
                __("Payment of %s for %s", "event_espresso"),
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
     * @param \EEI_Line_Item $line_item
     * @param \EEI_Payment   $payment
     * @return string
     */
    public function formatLineItemName(\EEI_Line_Item $line_item, \EEI_Payment $payment)
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
     * @param \EEI_Line_Item $line_item
     * @param \EEI_Payment   $payment
     * @return string
     */
    public function formatLineItemDesc(\EEI_Line_Item $line_item, \EEI_Payment $payment)
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
     * @param \EEI_Payment $payment
     * @return string
     */
    public function formatOrderDescription(\EEI_Payment $payment)
    {
        return apply_filters(
            'FHEE__EE_Gateway___order_description',
            sprintf(
                __('Event Registrations from %1$s for %2$s', "event_espresso"),
                get_bloginfo('name'),
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
     * @return string
     */
    public function formatCurrency($amount)
    {
        return number_format($amount, 2, '.', '');
    }
}
// End of file GatewayDataFormatter.php
// Location: core\services\gateways/GatewayDataFormatter.php