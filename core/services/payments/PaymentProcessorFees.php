<?php

namespace EventEspresso\core\services\payments;

use EE_Error;
use EE_Line_Item;
use EE_Transaction;
use EEH_Line_Item;
use EventEspresso\core\domain\services\licensing\LicenseData;
use EventEspresso\core\domain\values\gateways\GracePeriod;
use Exception;
use OutOfBoundsException;
use ReflectionException;
use RuntimeException;
use stdClass;

/**
 * PaymentProcessorFees
 *
 *  Manages the payment processor fees for different license types in the Event Espresso plugin.
 *  The fees are determined based on the license type and the payment gateway used.
 *  The class provides methods to get the fee for a specific payment method and to check if a gateway is a partner gateway.
 *
 * @package     Event Espresso
 * @subpackage  EventEspresso\core\services\payments
 * @author      Brent Christensen
 * @since       5.0.22.p
 */
class PaymentProcessorFees
{
    public const  GATEWAY_PAYPAL  = 'PayPal Commerce';

    public const  GATEWAY_SQUARE  = 'Square';

    public const  GATEWAY_STRIPE  = 'Stripe';

    private GracePeriod $grace_period;

    private LicenseData $license_data;

    /**
     * @var float[][] $gateway_fees
     */
    private array $gateway_fees = [
        LicenseData::LICENSE_ACTIVE  => [
            PaymentProcessorFees::GATEWAY_PAYPAL => 0.00,
            PaymentProcessorFees::GATEWAY_SQUARE => 0.00,
            PaymentProcessorFees::GATEWAY_STRIPE => 0.00,
        ],
        LicenseData::LICENSE_EXPIRED => [
            PaymentProcessorFees::GATEWAY_PAYPAL => 3.00,
            PaymentProcessorFees::GATEWAY_SQUARE => 2.50,
            PaymentProcessorFees::GATEWAY_STRIPE => 2.50,
        ],
        LicenseData::LICENSE_DECAF   => [
            PaymentProcessorFees::GATEWAY_PAYPAL => 3.00,
            PaymentProcessorFees::GATEWAY_SQUARE => 2.50,
            PaymentProcessorFees::GATEWAY_STRIPE => 2.50,
        ],
    ];

    private array $partner_gateways = [
        PaymentProcessorFees::GATEWAY_PAYPAL,
        PaymentProcessorFees::GATEWAY_SQUARE,
        PaymentProcessorFees::GATEWAY_STRIPE,
    ];


    /**
     * @param GracePeriod $grace_period
     * @param LicenseData $license_data
     */
    public function __construct(GracePeriod $grace_period, LicenseData $license_data)
    {
        $this->grace_period = $grace_period;
        $this->license_data = $license_data;
    }


    /**
     * @param EE_Transaction $transaction
     * @param string         $payment_method_name
     * @param float          $amount
     * @return float
     * @throws EE_Error|ReflectionException|RuntimeException
     * @throws Exception
     */
    public function applyGatewayPartnerFees(
        EE_Transaction $transaction,
        string $payment_method_name,
        float $amount = 0.00
    ): float {
        $processing_fee = $this->forPaymentMethod($payment_method_name);
        if ($processing_fee <= 0.00) {
            return $amount;
        }
        $grand_total = $transaction->total_line_item(false);
        if (
            ! $grand_total instanceof EE_Line_Item
            || ! $grand_total->is_total()
            || $grand_total->TXN_ID() !== $transaction->ID()
        ) {
            // throw RuntimeException if total_line_item is not a total line item
            throw new RuntimeException(
                sprintf(
                    esc_html__(
                        'Invalid or missing grand total line item for transaction %1$d.',
                        'event_espresso'
                    ),
                    $transaction->ID()
                )
            );
        }
        $line_item = EEH_Line_Item::add_percentage_based_item(
            EEH_Line_Item::get_pre_tax_subtotal($grand_total),
            esc_html__('Payment Processing Fee', 'event_espresso'),
            $processing_fee,
            '',
            false,
            sanitize_key(
                sprintf(
                    '%1$s-fee-%2$d',
                    $payment_method_name,
                    $transaction->ID()
                )
            ),
            true
        );
        $line_item->save();
        return $grand_total->recalculate_total_including_taxes();
    }


    /**
     * Returns the fee for a specific payment method based on the license status.
     *
     * @param string $payment_method_name
     * @return float
     * @throws Exception|OutOfBoundsException|RuntimeException
     */
    public function forPaymentMethod(string $payment_method_name): float
    {
        if (! $this->isPartnerGateway($payment_method_name)) {
            return 0.0;
        }
        $license_status = $this->license_data->licenseStatus();
        $license_expires = $this->license_data->licenseExpiry();
        // decaf, new activations, or expired licenses are allowed a grace period
        if ($this->grace_period->withinGracePeriod($license_status, $license_expires)) {
            return 0.0;
        }
        return $this->getGatewayFee($payment_method_name, $license_status);
    }


    /**
     * Checks if a gateway is a partner gateway.
     *
     * @param string $payment_method_name
     * @return bool
     */
    private function isPartnerGateway(string $payment_method_name): bool
    {
        return in_array($payment_method_name, $this->partner_gateways, true);
    }


    /**
     * Returns the fee for a specific payment method based on the license status.
     *
     * @param string $payment_method_name
     * @param string $license_status
     * @return float
     * @throws OutOfBoundsException
     */
    private function getGatewayFee(string $payment_method_name, string $license_status): float
    {
        if (isset($this->gateway_fees[ $license_status ][ $payment_method_name ])) {
            return $this->gateway_fees[ $license_status ][ $payment_method_name ];
        }
        throw new OutOfBoundsException(
            sprintf(
                esc_html__('A partner fee for %1$s with %2$s license is not defined.', 'event_espresso'),
                $payment_method_name,
                $license_status
            )
        );
    }
}
