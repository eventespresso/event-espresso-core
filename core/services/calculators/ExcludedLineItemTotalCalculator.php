<?php

namespace EventEspresso\core\services\calculators;

use EE_Error;
use EE_Line_Item;
use EEM_Line_Item;
use ReflectionException;

/**
 * Class ExcludedLineItemTotalCalculator
 *
 * Companion to {@see RegistrationFinalPriceCalculator}: calculates the final amount a line item excluded from
 * that distribution contributes to the total, so the caller can attribute it on its own
 * (e.g. to the single registration that purchased it).
 *
 * @author  Event Espresso
 * @package EventEspresso\core\services\calculators
 * @since   5.0.61
 */
class ExcludedLineItemTotalCalculator
{
    /**
     * The excluded line item's pretax total plus the percent modifiers and taxes that
     * RegistrationFinalPriceCalculator::calculate() applies after it. Fixed (non-percent) items are distributed
     * across tickets only, so they stay unallocated when the tickets total zero.
     * Returns zero when the line item is not within $total_line_item.
     *
     * @param EE_Line_Item  $total_line_item    the same line item passed to RegistrationFinalPriceCalculator
     * @param EE_Line_Item  $excluded_line_item a line item the $exclude predicate matches
     * @param callable|null $exclude            the same predicate passed to RegistrationFinalPriceCalculator
     * @return float
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function calculate(
        EE_Line_Item $total_line_item,
        EE_Line_Item $excluded_line_item,
        ?callable $exclude = null
    ): float {
        $path = ExcludedLineItemTotalCalculator::pathToLineItem($total_line_item, $excluded_line_item);
        if ($path === []) {
            return 0.0;
        }
        $amount  = $excluded_line_item->pretaxTotal();
        $taxable = $excluded_line_item->is_taxable() ? $amount : 0.0;
        // from the excluded item's parent up to the root, apply every sibling processed after that branch
        for ($depth = count($path) - 1; $depth > 0; $depth--) {
            $is_after_branch = false;
            foreach ($path[ $depth - 1 ]->children() as $sibling) {
                if (! $is_after_branch) {
                    $is_after_branch = ExcludedLineItemTotalCalculator::isSameLineItem($sibling, $path[ $depth ]);
                    continue;
                }
                if ($exclude !== null && $exclude($sibling)) {
                    continue;
                }
                if ($sibling->is_tax_sub_total()) {
                    $amount += $taxable * RegistrationFinalPriceCalculator::taxPercentDecimal($sibling);
                } elseif (
                    $sibling->is_line_item()
                    && $sibling->is_percent()
                    && $sibling->OBJ_type() !== EEM_Line_Item::OBJ_TYPE_TICKET
                ) {
                    $multiplier = 1 + $sibling->percent() / 100;
                    $amount     *= $multiplier;
                    $taxable    = $sibling->is_taxable() ? $taxable * $multiplier : $taxable;
                }
            }
        }
        return $amount;
    }


    /**
     * The chain of line items from $root down to $target (both inclusive), or an empty array when $target
     * is not within $root. Only totals and subtotals are descended into.
     *
     * @param EE_Line_Item $root
     * @param EE_Line_Item $target
     * @return EE_Line_Item[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected static function pathToLineItem(EE_Line_Item $root, EE_Line_Item $target): array
    {
        if (ExcludedLineItemTotalCalculator::isSameLineItem($root, $target)) {
            return [$root];
        }
        if (! $root->is_total() && ! $root->is_sub_total()) {
            return [];
        }
        foreach ($root->children() as $child) {
            $path = ExcludedLineItemTotalCalculator::pathToLineItem($child, $target);
            if ($path !== []) {
                return [$root, ...$path];
            }
        }
        return [];
    }


    /**
     * @param EE_Line_Item $line_item
     * @param EE_Line_Item $other
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected static function isSameLineItem(EE_Line_Item $line_item, EE_Line_Item $other): bool
    {
        return $line_item === $other || ($line_item->ID() && $line_item->ID() === $other->ID());
    }
}
