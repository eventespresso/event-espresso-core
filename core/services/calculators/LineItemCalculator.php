<?php

namespace EventEspresso\core\services\calculators;

use EE_Error;
use EE_Line_Item;
use EE_Transaction;
use EEH_Line_Item;
use EEM_Line_Item;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\formatters\CurrencyFormatter;
use InvalidArgumentException;
use ReflectionException;

class LineItemCalculator
{
    /**
     * @var CurrencyFormatter
     */
    private $currency_formatter;

    /**
     * TRUE if tickets have been added to cart
     *
     * @var bool
     */
    private $has_tickets;


    /**
     * @param CurrencyFormatter $currency_formatter
     */
    public function __construct(CurrencyFormatter $currency_formatter)
    {
        $this->currency_formatter = $currency_formatter;
    }


    /**
     * Simply forces all the tax-sub-totals to recalculate. Assumes the taxes have been calculated
     *
     * @param EE_Line_Item $line_item
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function recalculateTaxSubTotal(EE_Line_Item $line_item)
    {
        if ($line_item->is_tax_sub_total()) {
            $total         = 0;
            $total_percent = 0;
            // simply loop through all its children (which should be taxes) and sum their total
            foreach ($line_item->children() as $child_tax) {
                if ($child_tax instanceof EE_Line_Item) {
                    $total         += $child_tax->total();
                    $total_percent += $child_tax->percent();
                }
            }
            $line_item->set_total($total);
            $line_item->set_percent($total_percent);
            $line_item->maybe_save();
        } elseif ($line_item->is_total()) {
            foreach ($line_item->children() as $maybe_tax_subtotal) {
                if ($maybe_tax_subtotal instanceof EE_Line_Item) {
                    $this->recalculateTaxSubTotal($maybe_tax_subtotal);
                }
            }
        }
    }


    /**
     * Calculates the pretax total when this line item is a subtotal or total line item.
     * Basically does a sum-then-round approach (ie, any percent line item that are children
     * will calculate their total based on the un-rounded total we're working with so far, and
     * THEN round the result; instead of rounding as we go like with sub-line-items)
     *
     * @param EE_Line_Item   $line_item
     * @param float          $calculated_total_so_far
     * @param EE_Line_Item[] $children
     * @return float
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function recalculatePretaxTotalForSubtotal(
        EE_Line_Item $line_item,
        $calculated_total_so_far,
        $children = null
    ) {
        $children          = $children !== null ? $children : $line_item->children();
        $subtotal_quantity = 0;
        // get the total of all its children
        foreach ($children as $child_line_item) {
            if ($child_line_item instanceof EE_Line_Item && ! $child_line_item->is_cancellation()) {
                // percentage line items are based on total so far
                if ($child_line_item->is_percent()) {
                    $percent_total = $calculated_total_so_far * $child_line_item->percent(true);
                    $child_line_item->set_total($percent_total);
                    // so far all percent line items should have a quantity of 1
                    // (ie, no double percent discounts. Although that might be requested someday)
                    $child_line_item->set_quantity(1);
                    $child_line_item->maybe_save();
                    $calculated_total_so_far += $percent_total;
                } else {
                    // verify flat sub-line-item quantities match their parent
                    if ($child_line_item->is_sub_line_item()) {
                        $child_line_item->set_quantity($line_item->quantity());
                    }
                    $calculated_total_so_far += $this->recalculatePreTaxTotal($child_line_item);
                    $subtotal_quantity       += $child_line_item->quantity();
                }
            }
        }
        if ($line_item->is_sub_total()) {
            // no negative totals plz
            $calculated_total_so_far = max($calculated_total_so_far, 0);
            $subtotal_quantity       = $subtotal_quantity > 0 ? 1 : 0;
            $line_item->set_quantity($subtotal_quantity);
            $line_item->maybe_save();
        }
        return $calculated_total_so_far;
    }


    /**
     * Calculates the pretax total for a normal line item, in a round-then-sum approach
     * (where each sub-line-item is applied to the base price for the line item
     * and the result is immediately rounded, rather than summing all the sub-line-items
     * then rounding, like we do when recalculating pretax totals on totals and subtotals).
     *
     * @param EE_Line_Item   $line_item
     * @param EE_Line_Item[] $children
     * @return float
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function recalculatePretaxTotalForLineItem(EE_Line_Item $line_item, $children = null)
    {
        $children = $children !== null ? $children : $line_item->children();
        // we need to keep track of the running total for a single item, because we need to round as we go
        $unit_price_for_total = 0;
        $quantity_for_total   = 1;
        // get the total of all its children
        foreach ($children as $child_line_item) {
            if ($child_line_item instanceof EE_Line_Item && ! $child_line_item->is_cancellation()) {
                if ($child_line_item->is_percent()) {
                    // it should be the unit-price-so-far multiplied by the percent multiplied by the quantity
                    // not total multiplied by percent, because that ignores rounding along-the-way
                    $percent_unit_price = $unit_price_for_total * $child_line_item->percent(true);
                    // immediately round the price off according to the locale settings
                    $percent_unit_price = $this->currency_formatter->roundForLocale($percent_unit_price);
                    $child_line_item->set_total($percent_unit_price * $quantity_for_total);
                    // so far all percent line items should have a quantity of 1
                    // (ie, no double percent discounts. Although that might be requested someday)
                    $child_line_item->set_quantity(1);
                    $child_line_item->maybe_save();
                    $unit_price_for_total += $percent_unit_price;
                } else {
                    // verify flat sub-line-item quantities match their parent
                    if ($child_line_item->is_sub_line_item()) {
                        $child_line_item->set_quantity($line_item->quantity());
                    }
                    $quantity_for_total = $child_line_item->quantity();
                    $this->recalculatePreTaxTotal($child_line_item);
                    $unit_price_for_total += $child_line_item->unit_price(true);
                }
            }
        }
        return $unit_price_for_total * $quantity_for_total;
    }


    /**
     * Gets the final total on this item, taking taxes into account.
     * Has the side-effect of setting the sub-total as it was just calculated.
     * If this is used on a grand-total line item, also updates the transaction's
     * TXN_total (provided this line item is allowed to persist, otherwise we don't
     * want to change a persistable transaction with info from a non-persistent line item)
     *
     * @param EE_Line_Item $line_item
     * @param bool         $update_txn_status
     * @return float
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function recalculateTotalIncludingTaxes(EE_Line_Item $line_item, $update_txn_status = false)
    {
        $pre_tax_total = $this->recalculatePreTaxTotal($line_item);
        if ($pre_tax_total === 0.00) {
            return $pre_tax_total;
        }
        $tax_total     = $this->recalculateTaxesAndTaxTotal($line_item);
        $total         = $pre_tax_total + $tax_total;
        // no negative totals plz
        $total = max($total, 0);
        $line_item->set_total($this->currency_formatter->roundForLocale($total));
        // only update the related transaction's total
        // if we intend to save this line item and its a grand total
        if ($line_item->allow_persist()
            && $line_item->type() === EEM_Line_Item::type_total
            && $line_item->transaction() instanceof EE_Transaction
        ) {
            $line_item->transaction()->set_total($total);
            if ($update_txn_status) {
                // don't save the TXN because that will be done below
                // and the following method only saves if the status changes
                $line_item->transaction()->update_status_based_on_total_paid(false);
            }
            if ($line_item->transaction()->ID()) {
                $line_item->transaction()->save();
            }
        }
        $line_item->maybe_save();
        return $total;
    }


    /**
     * Recursively goes through all the children and recalculates sub-totals EXCEPT for
     * tax-sub-totals (they're a an odd beast). Updates the 'total' on each line item according to either its
     * unit price * quantity or the total of all its children EXCEPT when we're only calculating the taxable total and
     * when this is called on the grand total
     *
     * @param EE_Line_Item $line_item
     * @return float
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function recalculatePreTaxTotal(EE_Line_Item $line_item)
    {
        if (! $this->hasTickets($line_item)) {
            return 0.00;
        }
        $total        = 0;
        $children     = $line_item->children();
        $has_children = ! empty($children);
        if ($has_children && $line_item->is_line_item()) {
            $total = $this->recalculatePretaxTotalForLineItem($line_item, $children);
        } elseif (! $has_children && ($line_item->is_sub_line_item() || $line_item->is_line_item())) {
            $total = $line_item->unit_price(true) * $line_item->quantity();
        } elseif ($line_item->is_sub_total() || $line_item->is_total()) {
            $total = $this->recalculatePretaxTotalForSubtotal($line_item, $total, $children);
        } elseif ($line_item->is_tax_sub_total() || $line_item->is_tax() || $line_item->is_cancelled()) {
            // completely ignore tax totals, tax sub-totals, and cancelled line items, when calculating the pre-tax-total
            return 0;
        }
        // ensure all non-line items and non-sub-line-items have a quantity of 1 (except for Events)
        if (! $line_item->is_line_item() && ! $line_item->is_sub_line_item() && ! $line_item->is_cancellation()) {
            if ($line_item->OBJ_type() !== EEM_Line_Item::OBJ_TYPE_EVENT) {
                $line_item->set_quantity(1);
            }
            if (! $line_item->is_percent()) {
                $line_item->set_unit_price($this->currency_formatter->roundForLocale($total));
            }
        }
        // we don't want to bother saving grand totals, because that needs to factor in taxes anyways
        if (! $line_item->is_total()) {
            $line_item->set_total($this->currency_formatter->roundForLocale($total));
            // if not a percent line item, make sure we keep the unit price in sync
            if ($has_children && $line_item->is_line_item() && ! $line_item->is_percent()) {
                $new_unit_price = $line_item->quantity() !== 0 ? $line_item->total() / $line_item->quantity() : 0;
                $line_item->set_unit_price($this->currency_formatter->roundForLocale($new_unit_price));
            }
            $line_item->maybe_save();
        }
        return $total;
    }


    /**
     * Recalculates the total on each individual tax (based on a recalculation of the pre-tax total), sets
     * the totals on each tax calculated, and returns the final tax total. Re-saves tax line items
     * and tax sub-total if already in the DB
     *
     * @param EE_Line_Item $line_item
     * @return float
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function recalculateTaxesAndTaxTotal(EE_Line_Item $line_item)
    {
        // get all taxes
        $taxes = $line_item->tax_descendants();
        // calculate the pretax total
        $taxable_total = $line_item->taxable_total();
        $tax_total     = 0;
        foreach ($taxes as $tax) {
            $total_on_this_tax = $taxable_total * $tax->percent(true);
            // remember the total on this line item
            $tax->set_total($this->currency_formatter->roundForLocale($total_on_this_tax));
            $tax->maybe_save();
            $tax_total += $tax->total();
        }
        $this->recalculateTaxSubTotal($line_item);
        return $tax_total;
    }


    /**
     * Gets the total tax on this line item. Assumes taxes have already been calculated using
     * recalculate_taxes_and_total
     *
     * @param EE_Line_Item $line_item
     * @return float
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function getTotalTax(EE_Line_Item $line_item)
    {
        $this->recalculateTaxSubTotal($line_item);
        $total = 0;
        foreach ($line_item->tax_descendants() as $tax_line_item) {
            if ($tax_line_item instanceof EE_Line_Item) {
                $total += $tax_line_item->total();
            }
        }
        return $total;
    }


    /**
     * Gets the total for all the items purchased only
     *
     * @param EE_Line_Item $line_item
     * @return float
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function getItemsTotal(EE_Line_Item $line_item)
    {
        // by default, let's make sure we're consistent with the existing line item
        if ($line_item->is_total()) {
            $pretax_subtotal_li = EEH_Line_Item::get_pre_tax_subtotal($line_item);
            if ($pretax_subtotal_li instanceof EE_Line_Item) {
                return $pretax_subtotal_li->total();
            }
        }
        $total = 0;
        foreach ($line_item->get_items() as $item) {
            if ($item instanceof EE_Line_Item) {
                $total += $item->total();
            }
        }
        return $total;
    }


    /**
     * Returns the amount taxable among this line item's children (or if it has no children,
     * how much of it is taxable). Does not recalculate totals or subtotals.
     * If the taxable total is negative, (eg, if none of the tickets were taxable,
     * but there is a "Taxable" discount), returns 0.
     *
     * @param EE_Line_Item $line_item
     * @return float
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function amountTaxable(EE_Line_Item $line_item)
    {
        $total = 0;
        if ($line_item->children()) {
            foreach ($line_item->children() as $child_line_item) {
                if ($child_line_item->type() === EEM_Line_Item::type_line_item && $child_line_item->is_taxable()) {
                    // if it's a percent item, only take into account the percent
                    // that's taxable too (the taxable total so far)
                    if ($child_line_item->is_percent()) {
                        $child_line_item_amount = $total * $child_line_item->percent(true);
                        $total += $this->currency_formatter->roundForLocale($child_line_item_amount);
                    } else {
                        $total += $child_line_item->total();
                    }
                } elseif ($child_line_item->type() === EEM_Line_Item::type_sub_total) {
                    $total += $child_line_item->taxable_total();
                }
            }
        }
        return max($total, 0);
    }


    /**
     * @param EE_Line_Item $line_item
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function hasTickets(EE_Line_Item $line_item)
    {
        if ($this->has_tickets === null) {
            $tickets           = EEH_Line_Item::get_ticket_line_items($line_item);
            $this->has_tickets = is_array($tickets) && count($tickets) > 0;
        }
        return $this->has_tickets;
    }
}
