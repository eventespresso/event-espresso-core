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
     * Converts an amount into the currency's subunits.
     * Some currencies have no subunits, so leave them in the currency's main units.
     *
     * @param float $amount
     * @return float in the currency's smallest unit (e.g., pennies)
     */
    public static function convertToSubunits(float $amount): float
    {
        $decimals = self::getDecimalPlaces();
        return round($amount * pow(10, $decimals), $decimals);
    }


    /**
     * Make sure the value is an absolute number with only two decimal places.
     *
     * @param float $amount
     * @return float
     */
    public static function normalizeValue(float $amount): float
    {
        $decimals = self::getDecimalPlaces();
        return abs(number_format($amount, $decimals, '.', ''));
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
