<?php
namespace EventEspresso\core\services\payment_methods\gateways;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class GatewayDataFormatterInterface
 * Description
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          $VID:$
 */
interface GatewayDataFormatterInterface
{
    /**
     * Gets the text to use for a gateway's line item name when this is a partial payment
     * @param \EE_Payment $payment
     * @return string
     */
    public function format_partial_payment_line_item_name( \EEI_Payment $payment );
    /**
     * Gets the text to use for a gateway's line item description when this is a partial payment
     * @param \EEI_Payment $payment
     * @return string
     */
    public function format_partial_payment_line_item_desc( \EEI_Payment $payment );

    /**
     * Gets the name to use for a line item when sending line items to the gateway
     * @param \EEI_Line_Item $line_item
     * @param \EEI_Payment $payment
     * @return string
     */
    public function format_line_item_name( \EEI_Line_Item $line_item, \EEI_Payment $payment );

    /**
     * Gets the description to use for a line item when sending line items to the gateway
     * @param \EEI_Line_Item $line_item
     * @param \EEI_Payment $payment
     * @return string
     */
    public function format_line_item_desc( \EEI_Line_Item $line_item, \EEI_Payment $payment );
    /**
     * Gets the order description that should generlly be sent to gateways
     * @param \EEI_Payment $payment
     * @return type
     */
    public function format_order_description( \EEI_Payment $payment );

    /**
     * Formats the amount so it can generally be sent to gateways
     * @param float $amount
     * @return string
     */
    public function format_currency($amount);
}
// End of file GatewayDataFormatterInterface.php
// Location: core\services\payment_methods\gateways/GatewayDataFormatterInterface.php