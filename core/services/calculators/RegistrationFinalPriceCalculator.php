<?php

namespace EventEspresso\core\services\calculators;

use EE_Error;
use EE_Line_Item;
use EE_Taxes;
use EEM_Line_Item;
use ReflectionException;

/**
 * Class RegistrationFinalPriceCalculator
 *
 * Distributes a line item tree's totals down onto individual ticket line items so that each
 * registration's share of the final price (including its proportional share of taxes and any
 * cart-wide modifiers) can be determined.
 *
 * This is a structured, single-responsibility reimplementation of the now-deprecated
 * {@see \EEH_Line_Item::calculate_reg_final_prices_per_line_item()}. With no exclusion predicate
 * supplied it is behavior-identical to that method; supplying $exclude additionally skips any line
 * item the predicate matches, so it neither contributes to nor is distributed across the result.
 *
 * Design notes:
 * - Pure with respect to the outside world: it never mutates the line item tree, never touches the
 *   database, and produces no side effects. Its only "state" is the running-totals array, which is
 *   threaded through the calculation as a parameter/return value rather than stored on the class,
 *   so there is nothing to leak between calls and nothing to reset beyond the fresh seed the entry
 *   point creates.
 * - The public entry point does not recurse; it seeds the running totals and hands off to the
 *   protected accumulator, which is the method that recurses over subtotals.
 * - Internals are protected (not private) so a test double may widen them to public and exercise
 *   each calculation in isolation.
 *
 * @author  Event Espresso
 * @package EventEspresso\core\services\calculators
 * @since   5.0.61
 */
class RegistrationFinalPriceCalculator
{
    /**
     * Calculates each ticket line item's share of the final price for the supplied line item tree.
     *
     * The returned array is keyed by ticket line item ID (values are that ticket's per-registration
     * final price), plus a 'total' key and a 'taxable' key which itself is keyed by ticket line item
     * ID. For example:
     *      [
     *          12        => 4.3,
     *          23        => 8.0,
     *          'total'   => 16.6,
     *          'taxable' => [ 12 => 10.0, 23 => 4.0, 'total' => 14.0 ],
     *      ]
     * To map a value back to a registration, find its ticket line item via
     * `EEM_Line_Item::instance()->get_line_item_for_registration($registration)`.
     *
     * @param EE_Line_Item  $line_item                  the total (or subtotal) line item to calculate from
     * @param int[]         $billable_ticket_quantities keyed by ticket OBJ_ID; when supplied, limits the
     *                                                  calculation to the given billable quantities
     * @param callable|null $exclude                    optional predicate `fn(EE_Line_Item $line_item): bool`;
     *                                                  return true to skip that line item (and, for a subtotal,
     *                                                  its entire branch) so it does not contribute to or get
     *                                                  distributed across the totals. Defaults to excluding nothing,
     *                                                  which keeps the calculation identical to the legacy behavior.
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function calculate(
        EE_Line_Item $line_item,
        array $billable_ticket_quantities = [],
        ?callable $exclude = null
    ): array {
        return RegistrationFinalPriceCalculator::accumulateRunningTotals(
            $line_item,
            RegistrationFinalPriceCalculator::initialRunningTotals(),
            $billable_ticket_quantities,
            $exclude
        );
    }


    /**
     * Recursively walks the children of $line_item, dispatching each to the handler for its type and
     * threading the running totals through. This is the method that recurses (via subtotals), not the
     * public entry point.
     *
     * @param EE_Line_Item  $line_item
     * @param array         $running_totals
     * @param int[]         $billable_ticket_quantities
     * @param callable|null $exclude
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected static function accumulateRunningTotals(
        EE_Line_Item $line_item,
        array $running_totals,
        array $billable_ticket_quantities,
        ?callable $exclude
    ): array {
        foreach ($line_item->children() as $child_line_item) {
            if (RegistrationFinalPriceCalculator::isExcluded($child_line_item, $exclude)) {
                continue;
            }
            switch ($child_line_item->type()) {
                case EEM_Line_Item::type_sub_total:
                    $running_totals = RegistrationFinalPriceCalculator::processSubtotalLineItem(
                        $running_totals,
                        $child_line_item,
                        $billable_ticket_quantities,
                        $exclude
                    );
                    break;

                case EEM_Line_Item::type_tax_sub_total:
                    $running_totals = RegistrationFinalPriceCalculator::processTaxSubtotalLineItem(
                        $running_totals,
                        $child_line_item
                    );
                    break;

                case EEM_Line_Item::type_line_item:
                    $running_totals = $child_line_item->OBJ_type() === EEM_Line_Item::OBJ_TYPE_TICKET
                        ? RegistrationFinalPriceCalculator::processTicketLineItem(
                            $running_totals,
                            $child_line_item,
                            $billable_ticket_quantities
                        )
                        : RegistrationFinalPriceCalculator::processNonTicketLineItem(
                            $running_totals,
                            $child_line_item,
                            $exclude !== null
                        );
                    break;
            }
        }
        return $running_totals;
    }


    /**
     * Calculates a subtotal branch on its own fresh running totals, then merges the result up into
     * the parent's running totals.
     *
     * @param array         $running_totals
     * @param EE_Line_Item  $subtotal
     * @param int[]         $billable_ticket_quantities
     * @param callable|null $exclude
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected static function processSubtotalLineItem(
        array $running_totals,
        EE_Line_Item $subtotal,
        array $billable_ticket_quantities,
        ?callable $exclude
    ): array {
        $subtotal_running_totals = RegistrationFinalPriceCalculator::accumulateRunningTotals(
            $subtotal,
            RegistrationFinalPriceCalculator::initialRunningTotals(),
            $billable_ticket_quantities,
            $exclude
        );
        return RegistrationFinalPriceCalculator::mergeSubtotalRunningTotals($running_totals, $subtotal_running_totals);
    }


    /**
     * Applies the tax subtotal's percentage to every taxable running total, adding the tax onto each
     * pretax total (including the grand 'total').
     *
     * @param array        $running_totals
     * @param EE_Line_Item $tax_subtotal
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected static function processTaxSubtotalLineItem(array $running_totals, EE_Line_Item $tax_subtotal): array
    {
        $tax_percent_decimal = RegistrationFinalPriceCalculator::taxPercentDecimal($tax_subtotal);
        foreach ($running_totals as $line_item_id => $this_running_total) {
            // the "taxable" array key is an exception
            if ($line_item_id === 'taxable') {
                continue;
            }
            $taxable_total                   = $running_totals['taxable'][ $line_item_id ];
            $running_totals[ $line_item_id ] += ($taxable_total * $tax_percent_decimal);
        }
        return $running_totals;
    }


    /**
     * Records a ticket line item's unit price (and taxable amount) as its own running total, and adds
     * its contribution to the grand totals. When $billable_ticket_quantities is supplied, only the
     * given billable quantity is counted (a zero quantity zeroes that ticket's share).
     *
     * @param array        $running_totals
     * @param EE_Line_Item $ticket
     * @param int[]        $billable_ticket_quantities
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected static function processTicketLineItem(
        array $running_totals,
        EE_Line_Item $ticket,
        array $billable_ticket_quantities
    ): array {
        // a ticket line item ID should only be encountered once; if it somehow recurs, just bump the
        // grand total (this shouldn't happen in a well-formed tree)
        if (isset($running_totals[ $ticket->ID() ])) {
            $running_totals['total'] += $ticket->totalWithTax();
            return $running_totals;
        }
        $taxable_amount = RegistrationFinalPriceCalculator::ticketTaxableAmount($ticket);
        // are we only calculating totals for some tickets?
        if (isset($billable_ticket_quantities[ $ticket->OBJ_ID() ])) {
            $quantity                                   = $billable_ticket_quantities[ $ticket->OBJ_ID() ];
            $running_totals[ $ticket->ID() ]            = $quantity ? $ticket->unit_price() : 0;
            $running_totals['taxable'][ $ticket->ID() ] = $quantity ? $taxable_amount : 0.0;
        } else {
            $quantity                                   = $ticket->quantity();
            $running_totals[ $ticket->ID() ]            = $ticket->unit_price();
            $running_totals['taxable'][ $ticket->ID() ] = $taxable_amount;
        }
        $running_totals['taxable']['total'] += $taxable_amount * $quantity;
        $running_totals['total']            += $ticket->unit_price() * $quantity;
        return $running_totals;
    }


    /**
     * Converts a non-ticket cart item (e.g. a discount or surcharge) into a multiplier and applies it across
     * every ticket's running total, so it affects each registration's final price equally.
     * The multiplier is 1 plus the item's amount as a fraction of the running total: a 10% surcharge gives 1.1,
     * and a $5 discount on a $20 running total gives 0.75.
     *
     * When line items are excluded, a percent item's stored total was calculated against a running total
     * that still included them, so its own percent is applied instead of its share of the running total.
     *
     * @param array        $running_totals
     * @param EE_Line_Item $line_item
     * @param bool         $has_exclusions whether an exclusion predicate is in effect
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected static function processNonTicketLineItem(
        array $running_totals,
        EE_Line_Item $line_item,
        bool $has_exclusions = false
    ): array {
        if ($has_exclusions && $line_item->is_percent()) {
            $multiplier = 1 + $line_item->percent() / 100;
        } else {
            $multiplier = $running_totals['total'] > 0
                ? ($line_item->totalWithTax() / $running_totals['total']) + 1
                : 1;
        }
        $is_taxable = $line_item->is_taxable();
        foreach ($running_totals as $line_item_id => $this_running_total) {
            // the "taxable" array key is an exception
            if ($line_item_id === 'taxable') {
                continue;
            }
            // yes this actually even works for the running grand total!
            $running_totals[ $line_item_id ] = $multiplier * $this_running_total;
            if ($is_taxable) {
                $running_totals['taxable'][ $line_item_id ] =
                    $multiplier * $running_totals['taxable'][ $line_item_id ];
            }
        }
        return $running_totals;
    }


    /**
     * Merges a subtotal branch's running totals up into the parent's, preserving the per-ticket
     * numeric keys and summing the grand totals.
     *
     * @param array $running_totals
     * @param array $subtotal_running_totals
     * @return array
     */
    protected static function mergeSubtotalRunningTotals(array $running_totals, array $subtotal_running_totals): array
    {
        // combine arrays but preserve numeric keys
        $running_totals                     = array_replace_recursive($subtotal_running_totals, $running_totals);
        $running_totals['total']            += $subtotal_running_totals['total'];
        $running_totals['taxable']['total'] += $subtotal_running_totals['taxable']['total'];
        return $running_totals;
    }


    /**
     * The taxable portion of a ticket line item: its unit price when taxable, otherwise zero.
     *
     * @param EE_Line_Item $ticket
     * @return float
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected static function ticketTaxableAmount(EE_Line_Item $ticket): float
    {
        return $ticket->is_taxable() ? $ticket->unit_price() : 0.0;
    }


    /**
     * Determines the tax percentage (as a decimal) to apply, falling back to the global total tax
     * percentage when the tax subtotal itself carries no percent.
     *
     * @param EE_Line_Item $tax_subtotal
     * @return float
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function taxPercentDecimal(EE_Line_Item $tax_subtotal): float
    {
        if ($tax_subtotal->percent() !== 0.0) {
            return $tax_subtotal->percent() / 100;
        }
        return EE_Taxes::get_total_taxes_percentage() / 100;
    }


    /**
     * Whether the given line item should be skipped entirely. With no predicate supplied this is
     * always false, which is what keeps the calculation identical to the legacy behavior.
     *
     * @param EE_Line_Item  $line_item
     * @param callable|null $exclude predicate `fn(EE_Line_Item $line_item): bool`
     * @return bool
     */
    protected static function isExcluded(EE_Line_Item $line_item, ?callable $exclude): bool
    {
        return $exclude !== null && $exclude($line_item);
    }


    /**
     * The seed value for a fresh running-totals accumulator.
     *
     * @return array
     */
    protected static function initialRunningTotals(): array
    {
        return [
            'total'   => 0,
            'taxable' => ['total' => 0],
        ];
    }
}
