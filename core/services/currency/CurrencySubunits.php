<?php

namespace EventEspresso\core\services\currency;

use EE_Error;
use EEH_File;
use EventEspresso\core\exceptions\InvalidIdentifierException;

defined('EVENT_ESPRESSO_VERSION') || exit('No direct script access allowed');



/**
 * Class CurrencySubunits
 * Class for retrieving a currency's decimal fractions,
 * or difference in order of magnitude between a currency's
 * super unit and subunit. For example, for USD, 1 penny is 1/100th of a dollar.
 * So the order of magnitude, or decimal fractions is 2
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          4.9.52.p
 */
class CurrencySubunits
{

    /**
     * array keys are currency codes, values are a sub-array with the  following values:
     *      "decimals" : the decimal fraction, or order of magnitude difference,
     *                   between that currency's main units and subunits.
     *                   E.g. for USD the decimal fraction is 2.
     *
     * @var array $currency_subunits
     */
    private $currency_subunits;



    /**
     * Returns all the currency subunit data
     *
     * @return array
     * @throws EE_Error
     */
    public function getAll()
    {
        $this->ensureInitialized();
        return $this->currency_subunits;
    }



    /**
     * Gets the decimal fraction, or order of magnitude difference between the currency's main units and subunits.
     *
     * @param $currency_code
     * @return mixed
     * @throws EE_Error
     * @throws InvalidIdentifierException
     */
    public function decimalsForCode($currency_code)
    {
        $this->ensureInitialized();
        if (isset($this->currency_subunits[ $currency_code]['decimals'])) {
            return $this->currency_subunits[ $currency_code]['decimals'];
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
     * Just verifies this object's data from the filesystem has been loaded
     *
     * @throws EE_Error
     */
    private function ensureInitialized()
    {
        if ($this->currency_subunits === null) {
            $this->currency_subunits = json_decode(
                EEH_File::get_file_contents(__DIR__ . DS . 'currency-subunits.json'),
                true
            );
        }
    }


}
