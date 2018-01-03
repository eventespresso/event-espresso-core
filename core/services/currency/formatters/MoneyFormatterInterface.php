<?php

namespace EventEspresso\core\services\currency\formatters;

use EventEspresso\core\domain\values\currency\Money;

/**
 * MoneyFormatterInterface
 * Facilitates formatting a Money object amount for display.
 *
 * @package Event Espresso
 * @author  Mike Nelson
 * @since   $VID:$
 */
interface MoneyFormatterInterface
{

    /**
     * applies formatting based on the specified formatting level
     * corresponding to one of the constants on MoneyFormatter
     *
     * @param Money $money
     * @param int   $formatting_level
     * @return string
     */
    public function format(Money $money, $formatting_level = CurrencyAmountFormatterInterface::ADD_THOUSANDS);
}
