<?php

namespace EventEspresso\core\domain\values\currency;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Interface UsesMoneyInterface
 * indicates an entity that utilizes an EventEspresso\core\domain\values\currency\Money object internally
 *
 * @package EventEspresso\core\domain\values\currency
 * @author  Michael Nelson
 * @since   $VID:$
 */
interface UsesMoneyInterface
{

    /**
     * Gets a Money object for the specified field. Please note that this should only be
     * used for fields corresponding to EE_Money_Fields, and it will always return a money object,
     * or else it will throw an exception.
     *
     * @param $field_name
     * @return Money
     */
    public function getMoneyObject($field_name);

    /**
     * Returns the payment's amount in subunits (and if the currency has no subunits, then it will be in the main units)
     *
     * @return int
     */
    public function amountInSubunits();

    /**
     * Sets the payment's amount based on the incoming monetary subunits (eg pennies). If the currency has no subunits,
     * the amount is actually assumed to be in the currency's main units
     *
     * @param int $amount_in_subunits
     * @return void
     */
    public function setAmountInSubunits($amount_in_subunits);
}
