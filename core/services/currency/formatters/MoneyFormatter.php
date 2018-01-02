<?php

namespace EventEspresso\core\services\currency\formatters;

use EventEspresso\core\domain\values\currency\Money;

defined('EVENT_ESPRESSO_VERSION') || exit('No direct script access allowed');

/**
 * Class MoneyFormatter
 * Facilitates formatting a Money object amount for display. Uses the CurrencyAmountFormatter classes in this folder.
 *
 * @package Event Espresso
 * @author  Mike Nelson
 * @since   $VID:$
 */
class MoneyFormatter implements MoneyFormatterInterface
{

    /**
     * @var CurrencyAmountFormatterInterface[] $formatters
     */
    protected $formatters;


    /**
     * MoneyFormatter constructor.
     *
     * @param CurrencyAmountFormatterInterface[] $formatters
     */
    public function __construct(array $formatters = array())
    {
        $this->formatters = $formatters;
    }


    /**
     * @return CurrencyAmountFormatterInterface[]
     */
    protected function formatters()
    {
        if (empty($this->formatters)) {
            $this->initializeFormatters();
        }
        return $this->formatters;
    }



    /**
     * initializes a filterable array of CurrencyAmountFormatterInterface services
     */
    protected function initializeFormatters()
    {
        $this->formatters = apply_filters(
            'FHEE__EventEspresso_core_services_currency_formatters_MoneyFormatter__initializeFormatters__MoneyFormatters_array',
            array(
                1 => new DecimalCurrencyAmountFormatter(),
                2 => new ThousandsCurrencyAmountFormatter(),
                3 => new CurrencySignCurrencyAmountFormatter(),
                4 => new CurrencyCodeCurrencyAmountFormatter(),
                5 => new InternationalCurrencyAmountFormatter(),
            )
        );
    }



    /**
     * applies formatting based on the specified formatting level
     * corresponding to one of the constants on MoneyFormatter
     *
     * @param Money $money
     * @param int $formatting_level
     * @return string
     */
    public function format(Money $money, $formatting_level = CurrencyAmountFormatterInterface::ADD_THOUSANDS)
    {
        $amount = $money->amountInSubunits();
        $formatters = $this->formatters();
        for ($x = 1; $x <= $formatting_level; $x++) {
            if (isset($formatters[ $x ]) && $formatters[ $x ] instanceof CurrencyAmountFormatterInterface) {
                $amount = $formatters[ $x ]->format($amount, $money->currency());
            }
        }
        return (string) apply_filters(
            'FHEE__EventEspresso_core_domain_values_currency_formatters_MoneyFormatter__format__formatted_amount',
            $amount,
            $money,
            $this
        );
    }

}
// End of file MoneyFormatter.php
// Location: EventEspresso\core\services\currency\formatters/MoneyFormatter.php
