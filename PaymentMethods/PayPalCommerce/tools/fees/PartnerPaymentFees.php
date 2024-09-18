<?php

namespace EventEspresso\PaymentMethods\PayPalCommerce\tools\fees;

use EE_Transaction;
use EventEspresso\core\services\payments\PaymentProcessorFees;
use EventEspresso\PaymentMethods\PayPalCommerce\tools\currency\CurrencyManager;
use Exception;

/**
 * Class PartnerPaymentFees
 *
 * @package     Event Espresso
 * @subpackage  eep-paypal-commerce
 * @author      Nazar Kolivoshka
 */
class PartnerPaymentFees
{
    private PaymentProcessorFees $payment_processor_fees;


    /**
     * PartnerPaymentFees constructor.
     *
     * @param PaymentProcessorFees $payment_processor_fees
     */
    public function __construct(PaymentProcessorFees $payment_processor_fees)
    {
        $this->payment_processor_fees = $payment_processor_fees;
    }


    /**
     * @param EE_Transaction $transaction
     * @return float
     * @throws Exception
     */
    public function getPartnerFee(EE_Transaction $transaction): float
    {
        $fee_rate = $this->payment_processor_fees->forPaymentMethod(PaymentProcessorFees::GATEWAY_PAYPAL);
        if ($fee_rate <= 0) {
            return 0;
        }
        // Don't count tax.
        $total_remaining = $transaction->total() - $transaction->tax_total();
        // If this is a partial payment, try to get a tax-free amount.
        if ($transaction->paid() > 0) {
            $paid_percent    = $transaction->paid() * 100 / $transaction->total();
            $paid_tax        = ($transaction->tax_total() / 100) * $paid_percent;
            $total_remaining = $transaction->remaining() - $paid_tax;
        }
        return CurrencyManager::normalizeValue(($total_remaining / 100) * $fee_rate);
    }
}
