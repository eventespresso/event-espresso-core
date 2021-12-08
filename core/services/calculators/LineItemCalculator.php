<?php

namespace EventEspresso\core\services\calculators;

use DomainException;
use EE_Error;
use EE_Line_Item;
use EE_Transaction;
use EEH_Line_Item;
use EEM_Line_Item;
use EventEspresso\core\services\helpers\DecimalValues;
use ReflectionException;

/**
 * Class LineItemCalculator
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\services\calculators
 * @since   $VID:$
 */
class LineItemCalculator
{

    /**
     * @var DecimalValues
     */
    protected $decimal_values;

    /**
     * @var array
     */
    protected $default_query_params = [
        ['LIN_type' => ['!=', EEM_Line_Item::type_cancellation]]
    ];


    /**
     * @param DecimalValues $decimal_values
     */
    public function __construct(DecimalValues $decimal_values)
    {
        $this->decimal_values = $decimal_values;
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
    public function recalculateTotalIncludingTaxes(EE_Line_Item $line_item, bool $update_txn_status = false): float
    {
        $this->validateLineItemAndType($line_item, EEM_Line_Item::type_total);
        $ticket_line_items = EEH_Line_Item::get_ticket_line_items($line_item);
        if (empty($ticket_line_items)) {
            return 0;
        }
        [, $pretax_total] = $this->recalculateLineItemTotals($line_item);
        // EEH_Line_Item::visualize($line_item);
        $total_tax = $this->recalculateTaxesAndTaxTotal($line_item);
        // no negative totals plz
        $grand_total  = max($pretax_total + $total_tax, 0);
        $this->updatePreTaxTotal($line_item, $pretax_total, true);
        $grand_total  = $this->updateTotal($line_item, $grand_total, true);
        $this->updateTransaction($line_item, $grand_total, $update_txn_status);
        return $grand_total;
    }


    /**
     * Recursively goes through all the children and recalculates sub-totals EXCEPT for
     * tax-sub-totals (they're a an odd beast). Updates the 'total' on each line item according to either its
     * unit price * quantity or the total of all its children EXCEPT when we're only calculating the taxable total and
     * when this is called on the grand total
     *
     * @param EE_Line_Item $line_item
     * @param float        $total
     * @param float        $pretax_total
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function recalculateLineItemTotals(
        EE_Line_Item $line_item,
        float $total = 0,
        float $pretax_total = 0
    ): array {
        switch ($line_item->type()) {
            case EEM_Line_Item::type_total:
            case EEM_Line_Item::type_sub_total:
                [$total, $pretax_total] = $this->recalculateSubTotal($line_item);
                break;

            case EEM_Line_Item::type_line_item:
                [$total, $pretax_total] = $this->recalculateLineItem($line_item, $total, $pretax_total);
                break;

            case EEM_Line_Item::type_sub_line_item:
                // sub line items operate on the total and update both the total AND the pre-tax total
                [$total, $pretax_total] = $this->recalculateSubLineItem($line_item, $total, $pretax_total);
                break;

            case EEM_Line_Item::type_sub_tax:
                // sub line item taxes ONLY operate on the pre-tax total and ONLY update the total
                [$total, $pretax_total] = $this->recalculateSubTax($line_item, $pretax_total);
                break;

            case EEM_Line_Item::type_tax_sub_total:
            case EEM_Line_Item::type_tax:
            case EEM_Line_Item::type_cancellation:
                // completely ignore tax totals, tax sub-totals, and cancelled line items
                // when calculating the pre-tax-total
                $total = $pretax_total = 0;
                break;
        }
        return [$total, $pretax_total];
    }


    /**
     * @param EE_Line_Item $line_item
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function recalculateSubTotal(EE_Line_Item $line_item): array
    {
        // reset the total and pretax total to zero since we are recalculating them
        $total = $pretax_total = 0;
        if ($line_item->is_total()) {
            // if this is the grand total line item
            // then first update ALL of the line item quantities (if need be)
            $this->updateLineItemQuantities($line_item);
        }
        // recursively loop through children and recalculate their totals
        $children = $line_item->children($this->default_query_params);
        if (empty($children)) {
            return [$total, $pretax_total];
        }
        foreach ($children as $child_line_item) {
            [$child_total, $child_pretax_total] = $this->recalculateLineItemTotals(
                $child_line_item,
                $total,
                $pretax_total
            );
            $total += $child_total;
            $pretax_total += $child_pretax_total;
        }
        // update the unit price and pretax total
        $this->updateUnitPrice($line_item, $pretax_total);
        $pretax_total = $this->updatePreTaxTotal($line_item, $pretax_total, true);
        // for the actual pre-tax sub total line item, we want to save the pretax value for everything
        if ($line_item->is_sub_total() && $line_item->name() === esc_html__('Pre-Tax Subtotal', 'event_espresso')) {
            $this->updateTotal($line_item, $pretax_total, true);
        } elseif (! $line_item->is_total()) {
            // we don't update the total for the total line item, because that will need to include taxes
            $total = $this->updateTotal($line_item, $total, true);
        }
        return [$total, $pretax_total];
    }


    /**
     * @param EE_Line_Item $line_item
     * @param float        $total
     * @param float        $pretax_total
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function recalculateLineItem(
        EE_Line_Item $line_item,
        float $total = 0,
        float $pretax_total = 0
    ): array {
        if ($line_item->is_percent()) {
            $total = $this->calculatePercentage($total, $line_item->percent());
            $pretax_total = $this->calculatePercentage($pretax_total, $line_item->percent());
        } else {
            // recursively loop through children and recalculate their totals
            $children = $line_item->children($this->default_query_params);
            if (! empty($children)) {
                // reset the total and pretax total to zero since we are recalculating them
                $total = $pretax_total = 0;
                foreach ($children as $child_line_item) {
                    [$child_total, $child_pretax_total] = $this->recalculateLineItemTotals(
                        $child_line_item,
                        $total,
                        $pretax_total
                    );
                    $total        += $child_total;
                    $pretax_total += $child_pretax_total;
                }
            } else {
                // no child line items, so recalculate the total from the unit price and quantity
                // and set the pretax total to match since their are obviously no sub-taxes
                $pretax_total = $total = $this->calculateTotalForQuantity($line_item);
            }
        }
        $total  = $this->updateTotal($line_item, $total, true);
        $pretax_total = $this->updatePreTaxTotal($line_item, $pretax_total, true);

        // need to also adjust unit price too if the pretax total or quantity has been updated
        $this->updateUnitPrice($line_item, $pretax_total);
        return [$total, $pretax_total];
    }


    /**
     * @param EE_Line_Item $sub_line_item
     * @param float|int    $total
     * @param float|int    $pretax_total
     * @return float[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function recalculateSubLineItem(EE_Line_Item $sub_line_item, float $total = 0, float $pretax_total = 0): array
    {
        if ($sub_line_item->is_percent()) {
            $new_total = $this->calculatePercentage($total, $sub_line_item->percent());
            $new_pretax_total = $this->calculatePercentage($pretax_total, $sub_line_item->percent());
        } else {
            $new_total = $new_pretax_total = $this->calculateTotalForQuantity($sub_line_item);
        }
        $total = $this->updateTotal($sub_line_item, $new_total);
        $pretax_total = $this->updatePreTaxTotal($sub_line_item, $new_pretax_total);
        // need to also adjust unit price too if the pretax total or quantity has been updated
        $this->updateUnitPrice($sub_line_item, $pretax_total);
        return [$total, $pretax_total];
    }


    /**
     * @param EE_Line_Item $sub_line_item
     * @param float|int    $pretax_total
     * @return float[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function recalculateSubTax(EE_Line_Item $sub_line_item, float $pretax_total = 0): array
    {
        $total_tax = $this->calculatePercentage($pretax_total, $sub_line_item->percent());
        $total_tax = $this->updateTotal($sub_line_item, $total_tax);
        return [$total_tax, 0];
    }


    /**
     * recursively loops through the entire line item tree updating line item quantities accordingly.
     * this needs to be done prior to running any other calculations for reasons that are hopefully obvious :p
     *
     * @param EE_Line_Item $line_item
     * @param int          $quantity
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function updateLineItemQuantities(EE_Line_Item $line_item, int $quantity = 1): int
    {
        switch ($line_item->type()) {
            case EEM_Line_Item::type_total:
            case EEM_Line_Item::type_sub_total:
            case EEM_Line_Item::type_tax_sub_total:
                // first, loop through children and set their quantities
                $count = 0;
                $children = $line_item->children($this->default_query_params);
                foreach ($children as $child_line_item) {
                    $count += $this->updateLineItemQuantities($child_line_item);
                }
                // totals and subtotals should have a quantity of 1
                // unless their children have all been removed, in which case we can set them to 0
                $quantity = $count > 0 ? 1 : 0;
                $this->updateQuantity($line_item, $quantity);
                return $quantity;

            case EEM_Line_Item::type_line_item:
                // line items should ALREADY have accurate quantities set, if not, then somebody done goofed!
                // but if this is a percentage based line item, then ensure its quantity is 1
                if ($line_item->is_percent()) {
                    $this->updateQuantity($line_item, 1);
                }
                // and we also need to loop through all of the sub items and ensure those quantities match this parent.
                $children = $line_item->children($this->default_query_params);
                $quantity = $line_item->quantity();
                foreach ($children as $child_line_item) {
                    $this->updateLineItemQuantities($child_line_item, $quantity);
                }
                // percentage line items should not increment their parent's count, so they return 0
                return ! $line_item->is_percent() ? $quantity : 0;

            case EEM_Line_Item::type_sub_line_item:
                // percentage based items need their quantity set to 1,
                // all others use the incoming value from the parent line item
                $quantity = $line_item->is_percent() ? 1 : $quantity;
                $this->updateQuantity($line_item, $quantity);
                // percentage line items should not increment their parent's count, so they return 0
                return ! $line_item->is_percent() ? $quantity : 0;

            case EEM_Line_Item::type_tax:
            case EEM_Line_Item::type_sub_tax:
                // taxes should have a quantity of 1
                $this->updateQuantity($line_item, 1);
                return 1;

            case EEM_Line_Item::type_cancellation:
                // cancellations will be ignored for all calculations
                // because their parent quantities should have already been adjusted when they were added
                // so assume that things are already set correctly
                return 0;
        }
        return 0;
    }


    /**
     * @param float $total
     * @param float $percent
     * @param bool  $round
     * @return float
     */
    private function calculatePercentage(float $total, float $percent, bool $round = false): float
    {
        $amount = $total * $percent / 100;
        return $this->decimal_values->roundDecimalValue($amount, $round);
    }


    /**
     * @param EE_Line_Item $line_item
     * @return float
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function calculateTotalForQuantity(EE_Line_Item $line_item): float
    {
        $total = $line_item->unit_price() * $line_item->quantity();
        return $this->decimal_values->roundDecimalValue($total);
    }


    /**
     * @param EE_Line_Item $line_item
     * @param float        $percent
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function updatePercent(EE_Line_Item $line_item, float $percent)
    {
        // update and save new percent only if incoming value does not match existing value
        if ($line_item->percent() !== $percent) {
            $line_item->set_percent($percent);
            $line_item->maybe_save();
        }
    }


    /**
     * @param EE_Line_Item $line_item
     * @param float        $pretax_total
     * @param bool         $round
     * @return float
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function updatePreTaxTotal(EE_Line_Item $line_item, float $pretax_total, bool $round = false): float
    {
        $pretax_total = $this->decimal_values->roundDecimalValue($pretax_total, $round);
        // update and save new total only if incoming value does not match existing value
        if ($line_item->preTaxTotal() !== $pretax_total) {
            $line_item->setPreTaxTotal($pretax_total);
            $line_item->maybe_save();
        }
        return $pretax_total;
    }


    /**
     * @param EE_Line_Item $line_item
     * @param int          $quantity
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function updateQuantity(EE_Line_Item $line_item, int $quantity)
    {
        // update and save new quantity only if incoming value does not match existing value
        if ($line_item->quantity() !== $quantity) {
            $line_item->set_quantity($quantity);
            $line_item->maybe_save();
        }
    }


    /**
     * @param EE_Line_Item $line_item
     * @param float        $total
     * @param bool         $round
     * @return float
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function updateTotal(EE_Line_Item $line_item, float $total, bool $round = false): float
    {
        $total = $this->decimal_values->roundDecimalValue($total, $round);
        // update and save new total only if incoming value does not match existing value
        if ($line_item->total() !== $total) {
            $line_item->set_total($total);
            $line_item->maybe_save();
        }
        return $total;
    }


    /**
     * @param EE_Line_Item $line_item
     * @param float        $total
     * @param bool         $update_status
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function updateTransaction(EE_Line_Item $line_item, float $total, bool $update_status)
    {
        // only update the related transaction's total
        // if we intend to save this line item and its a grand total
        if ($line_item->allow_persist()) {
            $transaction = $line_item->transaction();
            if ($transaction instanceof EE_Transaction) {
                $transaction->set_total($total);
                if ($update_status) {
                    // don't save the TXN because that will be done below
                    // and the following method only saves if the status changes
                    $transaction->update_status_based_on_total_paid(false);
                }
                if ($transaction->ID()) {
                    $transaction->save();
                }
            }
        }
    }


    /**
     * @param EE_Line_Item $line_item
     * @param float        $pretax_total
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function updateUnitPrice(EE_Line_Item $line_item, float $pretax_total)
    {
        $quantity = $line_item->quantity();
        // don't divide by zero else you'll create a singularity and implode the interweb
        // we also don't set unit prices for percentage based line items
        if ($quantity === 0 || $line_item->is_percent()) {
            return;
        }
        $new_unit_price = $pretax_total / $quantity;
        $new_unit_price = $this->decimal_values->roundDecimalValue($new_unit_price);
        // update and save new total only if incoming value does not match existing value
        if ($line_item->unit_price() !== $new_unit_price) {
            $line_item->set_unit_price($new_unit_price);
            $line_item->maybe_save();
        }
    }


    /**
     * Recalculates the total on each individual tax (based on a recalculation of the pre-tax total), sets
     * the totals on each tax calculated, and returns the final tax total. Re-saves tax line items
     * and tax sub-total if already in the DB
     *
     * @param EE_Line_Item $total_line_item
     * @return float
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function recalculateTaxesAndTaxTotal(EE_Line_Item $total_line_item): float
    {
        $this->validateLineItemAndType($total_line_item, EEM_Line_Item::type_total);
        // calculate the total taxable amount for globally applied taxes
        $taxable_total = $this->taxableAmountForGlobalTaxes($total_line_item);
        $global_taxes     = $this->applyGlobalTaxes($total_line_item, $taxable_total);
        $non_global_taxes = $this->calculateNonGlobalTaxes($total_line_item);
        $all_tax_total        = $this->applyNonGlobalTaxes($total_line_item, $global_taxes, $non_global_taxes);
        $this->recalculateTaxSubTotal($total_line_item);
        return $all_tax_total;
    }


    /**
     * @param EE_Line_Item $total_line_item
     * @param float        $taxable_total
     * @return float
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function applyGlobalTaxes(EE_Line_Item $total_line_item, float $taxable_total): float
    {
        $this->validateLineItemAndType($total_line_item, EEM_Line_Item::type_total);
        $total_tax = 0;
        // loop through all global taxes all taxes
        $global_taxes = $total_line_item->tax_descendants();
        foreach ($global_taxes as $tax) {
            $tax_total = $this->calculatePercentage($taxable_total, $tax->percent());
            $tax_total = $this->updateTotal($tax, $tax_total, true);
            $total_tax += $tax_total;
        }
        return $this->decimal_values->roundDecimalValue($total_tax, true);
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
        $this->validateLineItemAndType($line_item, EEM_Line_Item::type_total);
        foreach ($line_item->children() as $maybe_tax_subtotal) {
            if (
                $this->validateLineItemAndType($maybe_tax_subtotal)
                && $maybe_tax_subtotal->is_tax_sub_total()
            ) {
                $total         = 0;
                $total_percent = 0;
                // simply loop through all its children (which should be taxes) and sum their total
                foreach ($maybe_tax_subtotal->children() as $child_tax) {
                    if ($this->validateLineItemAndType($child_tax) && $child_tax->isGlobalTax()) {
                        $total         += $child_tax->total();
                        $total_percent += $child_tax->percent();
                    }
                }
                $this->updateTotal($maybe_tax_subtotal, $total, true);
                $this->updatePercent($maybe_tax_subtotal, $total_percent);
            }
        }
    }


    /**
     * returns an array of tax details like:
     *  [
     *      'GST_7' => [
     *          'name'  => 'GST',
     *          'rate'  => float(7),
     *          'total' => float(4.9),
     *      ]
     *  ]
     *
     * @param EE_Line_Item $total_line_item
     * @param array        $non_global_taxes
     * @param float        $line_item_total
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function calculateNonGlobalTaxes(
        EE_Line_Item $total_line_item,
        array $non_global_taxes = [],
        float $line_item_total = 0
    ): array {
        foreach ($total_line_item->children() as $line_item) {
            if ($this->validateLineItemAndType($line_item)) {
                if ($line_item->is_sub_total()) {
                    $non_global_taxes = $this->calculateNonGlobalTaxes($line_item, $non_global_taxes);
                } elseif ($line_item->is_line_item()) {
                    $non_global_taxes = $this->calculateNonGlobalTaxes(
                        $line_item,
                        $non_global_taxes,
                        $line_item->pretaxTotal()
                    );
                } elseif ($line_item->isSubTax()) {
                    $tax_ID = $line_item->name() . '_' . $line_item->percent();
                    if (! isset($non_global_taxes[ $tax_ID ])) {
                        $non_global_taxes[ $tax_ID ] = [
                            'name'  => $line_item->name(),
                            'rate'  => $line_item->percent(),
                            'total' => 0,
                            'obj'   => $line_item->OBJ_type(),
                            'objID' => $line_item->OBJ_ID(),
                        ];
                    }
                    $tax = $this->calculatePercentage($line_item_total, $line_item->percent());
                    $non_global_taxes[ $tax_ID ]['total'] += $tax;
                }
            }
        }
        return $non_global_taxes;
    }


    /**
     * @param EE_Line_Item $total_line_item
     * @param float        $tax_total
     * @param array        $non_global_taxes array of tax details generated by calculateNonGlobalTaxes()
     * @return float
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function applyNonGlobalTaxes(
        EE_Line_Item $total_line_item,
        float $tax_total,
        array $non_global_taxes
    ): float {
        $global_taxes   = $total_line_item->tax_descendants();
        $taxes_subtotal = EEH_Line_Item::get_taxes_subtotal($total_line_item);
        foreach ($non_global_taxes as $non_global_tax) {
            $found = false;
            foreach ($global_taxes as $global_tax) {
                if (
                    $this->validateLineItemAndType($global_tax)
                    && $non_global_tax['obj'] === $global_tax->OBJ_type()
                    && $non_global_tax['objID'] === $global_tax->OBJ_ID()
                ) {
                    $found = true;
                    $new_total = $global_tax->total() + $non_global_tax['total'];
                    // add non global tax to matching global tax AND the tax total
                    $global_tax->set_total($new_total);
                    $global_tax->maybe_save();
                    $tax_total += $non_global_tax['total'];
                }
            }
            if (! $found) {
                // add a new line item for this non global tax
                $taxes_subtotal->add_child_line_item(
                    EE_Line_Item::new_instance(
                        [
                            'LIN_name'       => $non_global_tax['name'],
                            'LIN_percent'    => $non_global_tax['rate'],
                            'LIN_is_taxable' => false,
                            'LIN_total'      => $non_global_tax['total'],
                            'LIN_type'       => EEM_Line_Item::type_tax,
                            'OBJ_type'       => $non_global_tax['obj'],
                            'OBJ_ID'         => $non_global_tax['objID'],
                        ]
                    )
                );
                $tax_total += $non_global_tax['total'];
            }
        }
        return $this->decimal_values->roundDecimalValue($tax_total, true);
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
    public function getTotalTax(EE_Line_Item $line_item): float
    {
        $this->validateLineItemAndType($line_item, EEM_Line_Item::type_total);
        $this->recalculateTaxSubTotal($line_item);
        $total = 0;
        foreach ($line_item->tax_descendants() as $tax_line_item) {
            if ($this->validateLineItemAndType($tax_line_item)) {
                $total += $tax_line_item->total();
            }
        }
        return $this->decimal_values->roundDecimalValue($total, true);
    }


    /**
     * Returns the amount taxable among this line item's children (or if it has no children,
     * how much of it is taxable). Does not recalculate totals or subtotals.
     * If the taxable total is negative, (eg, if none of the tickets were taxable,
     * but there is a "Taxable" discount), returns 0.
     *
     * @param EE_Line_Item|null $line_item
     * @return float
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function taxableAmountForGlobalTaxes(?EE_Line_Item $line_item): float
    {
        $total      = 0;
        $child_line_items = $line_item->children($this->default_query_params);
        foreach ($child_line_items as $child_line_item) {
            $this->validateLineItemAndType($child_line_item);
            if ($child_line_item->is_sub_total()) {
                $total += $this->taxableAmountForGlobalTaxes($child_line_item);
            } elseif ($child_line_item->is_line_item() && $child_line_item->is_taxable()) {
                // if it's a percent item, only take into account
                // the percentage that's taxable (the taxable total so far)
                if ($child_line_item->is_percent()) {
                    $total += $this->calculatePercentage($total, $child_line_item->percent(), true);
                } else {
                    // pretax total will be equal to the total for line items with globally applied taxes
                    $pretax_total = $this->calculateTotalForQuantity($child_line_item);
                    $total += $this->updatePreTaxTotal($child_line_item, $pretax_total);
                }
            }
        }
        return max($total, 0);
    }


    /**
     * @param EE_Line_Item|null $line_item
     * @param string|null       $type
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function validateLineItemAndType(?EE_Line_Item $line_item, ?string $type = null): bool
    {
        if (! $line_item instanceof EE_Line_Item) {
            throw new DomainException(
                esc_html__('Invalid or missing Line Item supplied .', 'event_espresso')
            );
        }
        if ($type && $line_item->type() !== $type) {
            throw new DomainException(
                sprintf(
                    esc_html__(
                        'Invalid Line Item type supplied. Received "%1$s" but expected "%2$s".',
                        'event_espresso'
                    ),
                    $line_item->type(),
                    $type
                )
            );
        }
        return true;
    }
}
