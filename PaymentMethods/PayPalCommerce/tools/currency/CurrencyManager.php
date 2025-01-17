<?php

namespace EventEspresso\PaymentMethods\PayPalCommerce\tools\currency;

use EE_Registry;

/**
 * Class CurrencyManager
 *
 * @package     Event Espresso
 * @subpackage  eea-paypal-commerce
 * @author      Nazar Kolivoshka
 */
class CurrencyManager
{
    /**
     * Gets the number of decimal places we expect a currency to have.
     *
     * @param string $currency Accepted currency.
     * @return int
     */
    public static function getDecimalPlaces(string $currency = ''): int
    {
        if (! $currency) {
            $currency = self::currencyCode();
        }
        switch (strtoupper($currency)) {
            // Zero decimal currencies.
            case 'BIF':
            case 'CLP':
            case 'DJF':
            case 'GNF':
            case 'JPY':
            case 'KMF':
            case 'KRW':
            case 'MGA':
            case 'PYG':
            case 'RWF':
            case 'UGX':
            case 'VND':
            case 'VUV':
            case 'XAF':
            case 'XOF':
            case 'XPF':
                return 0;
            default:
                return 2;
        }
    }


    /**
     * Make sure the value is an absolute number with only two decimal places.
     *
     * @param float $amount
     * @return float
     */
    public static function normalizeValue(float $amount): float
    {
        // Make sure we get a positive value.
        // Don't use abs() because of the possible issues with rounding if 'serialize_precision' is not set to -1.
        if ($amount < 0) {
            $amount = $amount * -1;
        }
        return number_format($amount, self::getDecimalPlaces(), '.', '');
    }


    /**
     * Get currency that's currently set in Event Espresso settings.
     *
     * @return string
     */
    public static function currencyCode(): string
    {
        return EE_Registry::instance()->CFG->currency->code;
    }
}
