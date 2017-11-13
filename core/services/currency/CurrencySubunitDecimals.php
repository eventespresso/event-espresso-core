<?php

namespace EventEspresso\core\services\currency;

use EventEspresso\core\exceptions\InvalidIdentifierException;

defined('EVENT_ESPRESSO_VERSION') || exit('No direct script access allowed');



/**
 * Class CurrencySubunitDecimals
 * Class for retrieving a currency's decimal fractions,
 * or difference in order of magnitude between a currency's
 * super unit and subunit. For example, for USD, 1 penny is 1/100th of a dollar.
 * So the order of magnitude, or decimal fractions is 2
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          4.9.52.p
 */
class CurrencySubunitDecimals
{

    /**
     * array keys are currency codes, values is the decimal fraction,
     * or order of magnitude difference, between that currency's main units and subunits.
     * E.g., USD the order of magnitude difference is 2.
     *
     * @var array $currency_decimals
     */
    private $currency_decimals;



    /**
     * Returns all the order of magnitude differences between currency main units
     * and subunits
     * @return array
     */
    public function getDiffs()
    {
        $this->ensureInitialized();
        return $this->currency_decimals;
    }



    /**
     * Gets the order of magnitude difference between the currency's main units
     * and subunits.
     * @param $currency_code
     * @return mixed
     * @throws InvalidIdentifierException
     */
    public function getDiff($currency_code)
    {
        $this->ensureInitialized();
        if (isset($this->currency_decimals[$currency_code])) {
            return $this->currency_decimals[$currency_code];
        }
        throw new InvalidIdentifierException(
            '',
            $currency_code,
            sprintf(
                esc_html__('There is no currency with code %1$s', 'event_espresso'),
                $currency_code
            )
        );
    }


    /**
     * Just verifies this object\s data from the filesystem has been loaded
     */
    private function ensureInitialized()
    {
        if ($this->currency_decimals === null) {
            $this->currency_decimals = json_decode(
                file_get_contents(
                    __DIR__ . DS . 'currency-subunit-decimals.json'
                ),
                true
            );
        }
    }
}
// End of file CurrencySubunitOrderOfMagnitudeDiff.php
// Location: core\services\currency/CurrencySubunitOrderOfMagnitudeDiff.php
