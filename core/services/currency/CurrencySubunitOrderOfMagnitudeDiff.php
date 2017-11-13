<?php

namespace EventEspresso\core\services\currency;

use EventEspresso\core\exceptions\InvalidIdentifierException;

defined('EVENT_ESPRESSO_VERSION') || exit('No direct script access allowed');



/**
 * Class CurrencySubunitOrderOfMagnitudeDiff
 * Class for retrieving the difference in order of magnitude between a currency's
 *
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          4.9.52.p
 */
class CurrencySubunitOrderOfMagnitudeDiff
{

    /**
     * @var array keys are currency codes, values is the order of magnitude difference
     *            between that currency's main units and subunits.
     *            E.g., USD the order of magnitude difference is 2.
     */
    private $diffs;



    /**
     * Returns all the order of magnitude differences between currency main units
     * and subunits
     * @return array
     */
    public function getDiffs()
    {
        $this->ensureInitialized();
        return $this->diffs;
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
        if (isset($this->diffs[$currency_code])) {
            return $this->diffs[$currency_code];
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
        if ($this->diffs === null) {
            $this->diffs = json_decode(
                file_get_contents(
                    __DIR__ . DS . 'currency-subunit-order-of-magnitude-diff.json'
                ),
                true
            );
        }
    }
}
// End of file CurrencySubunitOrderOfMagnitudeDiff.php
// Location: core\services\currency/CurrencySubunitOrderOfMagnitudeDiff.php
