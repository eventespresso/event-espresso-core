<?php

namespace EventEspresso\core\services\calculators;

use DomainException;
use EE_Error;
use EE_Line_Item;
use EE_Transaction;
use EEH_Line_Item;
use EEM_Line_Item;
use EventEspresso\core\services\helpers\DebugDisplay;
use EventEspresso\core\services\helpers\DecimalValues;
use ReflectionException;

/**
 * Class LineItemCalculator
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\services\calculators
 * @since   5.0.0.p
 */
class LineItemCalculator
{
    use DebugDisplay;

    protected DecimalValues $decimal_values;

    protected array $default_query_params = [];


    /**
     * @param DecimalValues $decimal_values
     */
    public function __construct(DecimalValues $decimal_values)
    {
        $this->decimal_values = $decimal_values;
        $this->initializeDebugDisplay();
    }


    /**
     * Gets the final total on this item, taking taxes into account.
     * Has the side effect of setting the sub-total as it was just calculated.
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
        $this->debugLog('', 2);
        $this->debugLog(__METHOD__);
        $this->debugLog(str_repeat('*', strlen(__METHOD__)), 2);
        $this->debugLog(">>> TXN : " . $line_item->TXN_ID(), 2);
        $this->validateLineItemAndType($line_item, EEM_Line_Item::type_total);
        $ticket_line_items = EEH_Line_Item::get_ticket_line_items($line_item);
        if (empty($ticket_line_items)) {
            // no tickets? ensure totals are zero
            $this->updatePreTaxTotal($line_item, 0);
            $this->updateTotal($line_item, 0);
            $this->updateTransaction($line_item, 0, $update_txn_status);
            return 0;
        }
        [, $pretax_total] = $this->recalculateLineItemTotals($line_item);
        // EEH_Line_Item::visualize($line_item);
        $total_tax = $this->recalculateTaxesAndTaxTotal($line_item);
        // no negative totals plz
        $grand_total = max($pretax_total + $total_tax, 0);
        $this->updatePreTaxTotal($line_item, $pretax_total, true);
        $grand_total = $this->updateTotal($line_item, $grand_total, true);
        $this->updateTransaction($line_item, $grand_total, $update_txn_status);
        return $grand_total;
    }


    /**
     * Recursively goes through all the children and recalculates sub-totals EXCEPT for
     * tax-sub-totals (they're an odd beast). Updates the 'total' on each line item according to either its
     * unit price * quantity or the total of all its children EXCEPT when we're only calculating the taxable total and
     * when this is called on the grand total
     *
     * @param EE_Line_Item $line_item
     * @param float        $total
     * @param float        $pretax_total
     * @param bool         $is_taxable
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function recalculateLineItemTotals(
        EE_Line_Item $line_item,
        float $total = 0,
        float $pretax_total = 0,
        bool $is_taxable = false
    ): array {
        $this->debugLog(__FUNCTION__);
        $OBJ = $line_item->OBJ_type();
        $OBJ .= $OBJ ? ': ' : '';
        $this->debugLog(
            ' * ' . $OBJ . $line_item->name() . ' - ' . $line_item->type() . ' (' . $line_item->code() . ')',
            2
        );
        $this->debugLog(" * total: $total", 3);
        $this->debugLog(" * pretax: $pretax_total", 3);
        switch ($line_item->type()) {
            case EEM_Line_Item::type_total:
            case EEM_Line_Item::type_sub_total:
                [$total, $pretax_total] = $this->recalculateSubTotal($line_item);
                break;

            case EEM_Line_Item::type_line_item:
                [$total, $pretax_total] = $this->recalculateLineItem($line_item, $total, $pretax_total);
                break;

            case EEM_Line_Item::type_sub_line_item:
            case EEM_Line_Item::type_cancellation:
                // sub-line-items operate on the total and update both the total AND the pre-tax total
                [$total, $pretax_total] = $this->recalculateSubLineItem($line_item, $total, $pretax_total, $is_taxable);
                break;

            case EEM_Line_Item::type_sub_tax:
                // sub-line-items taxes ONLY operate on the pre-tax total and ONLY update the total
                [$total, $pretax_total] = $this->recalculateSubTax($line_item, $pretax_total);
                break;

            case EEM_Line_Item::type_tax_sub_total:
            case EEM_Line_Item::type_tax:
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
        $this->debugLog(__FUNCTION__);
        // reset the total and pretax total to zero since we are recalculating them
        $total = $pretax_total = 0;
        if ($line_item->is_total()) {
            // if this is the grand total line item
            // then first update ALL the line item quantities (if need be)
            $this->updateLineItemQuantities($line_item);
        }
        // recursively loop through children and recalculate their totals
        $children = $line_item->children($this->default_query_params);
        if (empty($children)) {
            $this->debugLog(' - ' . __FUNCTION__, 3);
            $this->debugLog(" - - total : $total ", 3);
            $this->debugLog(" - - pretax: $pretax_total ", 3);
            return [$total, $pretax_total];
        }
        foreach ($children as $child_line_item) {
            [$child_total, $child_pretax_total] = $this->recalculateLineItemTotals(
                $child_line_item,
                $total,
                $pretax_total
            );
            $total        += $child_total;
            $pretax_total += $child_pretax_total;
        }
        // update the unit price and pretax total
        $this->updateUnitPrice($line_item, $pretax_total, false);
        $pretax_total = $this->updatePreTaxTotal($line_item, $pretax_total, true, false);
        $this->debugLog(' - ' . __FUNCTION__, 3);
        $this->debugLog(" - - line_item->name() : " . $line_item->name(), 3);
        $this->debugLog(" - - line_item->code() : " . $line_item->code(), 3);
        // for the actual pre-tax sub-total line item, we want to save the pretax value for everything
        if ($line_item->is_sub_total() && $line_item->code() === 'pre-tax-subtotal') {
            $this->updateTotal($line_item, $pretax_total, true);
        } elseif (! $line_item->is_total()) {
            // we don't update the total for the total line item, because that will need to include taxes
            $total = $this->updateTotal($line_item, $total, true);
        }
        $this->debugLog(' - ' . __FUNCTION__, 3);
        $this->debugLog(" - - total : $total ", 3);
        $this->debugLog(" - - pretax: $pretax_total ", 3);
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
        $this->debugLog(__FUNCTION__);
        $this->reorderSubLineItems($line_item);
        [$total, $pretax_total] = $line_item->is_percent()
            ? $this->recalculatePercentageLineItem($line_item, $total, $pretax_total)
            : $this->recalculateNonPercentageLineItem($line_item);

        $total        = $this->updateTotal($line_item, $total, true);
        $pretax_total = $this->updatePreTaxTotal($line_item, $pretax_total, true);

        // need to also adjust unit price too if the pretax total or quantity has been updated
        $this->updateUnitPrice($line_item, $pretax_total);
        $this->debugLog(' - ' . __FUNCTION__, 3);
        $this->debugLog(" - - total : $total", 3);
        $this->debugLog(" - - pretax: $pretax_total", 3);
        return [$total, $pretax_total];
    }


    /**
     * @param EE_Line_Item $line_item
     * @param float        $total
     * @param float        $pretax_total
     * @return float[]
     * @throws EE_Error
     * @throws ReflectionException
     * @since 5.0.12.p
     */
    private function recalculatePercentageLineItem(
        EE_Line_Item $line_item,
        float $total = 0,
        float $pretax_total = 0
    ): array {
        $this->debugLog(' % ' . __FUNCTION__, 2);
        $pretax_total = $this->calculatePercentage($pretax_total, $line_item->percent());
        // if the line item is taxable, then we need to calculate the total,
        // otherwise we can just use the pretax total
        $total = $line_item->is_taxable()
            ? $this->calculatePercentage($total, $line_item->percent())
            : $pretax_total;
        $this->debugLog(' % ' . __FUNCTION__, 3);
        $this->debugLog(" % % total : $total ", 3);
        $this->debugLog(" % % pretax: $pretax_total ", 3);
        return [$total, $pretax_total];
    }


    /**
     * @param EE_Line_Item $line_item
     * @return float[]
     * @throws EE_Error
     * @throws ReflectionException
     * @since 5.0.12.p
     */
    private function recalculateNonPercentageLineItem(
        EE_Line_Item $line_item
    ): array {
        $this->debugLog(' $ ' . __FUNCTION__, 2);
        // recursively loop through children and recalculate their totals
        $children = $line_item->children($this->default_query_params);
        if (! empty($children)) {
            // reset the total and pretax total to zero since we are recalculating them
            $total = $pretax_total = 0;
            foreach ($children as $child_line_item) {
                [$child_total, $child_pretax_total] = $this->recalculateLineItemTotals(
                    $child_line_item,
                    $total,
                    $pretax_total,
                    $line_item->is_taxable()
                );
                $this->debugLog(' $ $ ' . __FUNCTION__, 3);
                $this->debugLog(
                    ' $ $ $ ' . $child_line_item->name() . ' '
                    . $child_line_item->type() . ' ' . $child_line_item->code(),
                    3
                );
                $this->debugLog(" $ $ $ $ child total: $child_total", 3);
                $this->debugLog(" $ $ $ $ child pretax: $child_pretax_total", 3);
                $total        += $child_total;
                $pretax_total += $child_pretax_total;
            }
        } else {
            // no child line items, so recalculate the total from the unit price and quantity
            // and set the pretax total to match since there are obviously no sub-taxes
            $pretax_total = $total = $this->calculateTotalForQuantity($line_item);
        }
        $this->debugLog(' $ ' . __FUNCTION__, 3);
        $this->debugLog(' $ $ ' . $line_item->name() . ' ' . $line_item->type() . ' ' . $line_item->code(), 3);
        $this->debugLog(" $ $ $ total: $total", 3);
        $this->debugLog(" $ $ $ pretax: $pretax_total", 3);
        return [$total, $pretax_total];
    }


    /**
     * @param EE_Line_Item $sub_line_item
     * @param float|int    $total
     * @param float|int    $pretax_total
     * @param bool         $is_taxable
     * @return float[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function recalculateSubLineItem(
        EE_Line_Item $sub_line_item,
        float $total = 0,
        float $pretax_total = 0,
        bool $is_taxable = false
    ): array {
        $this->debugLog(__FUNCTION__);
        $total = $is_taxable ? $total : $pretax_total;
        if ($sub_line_item->is_percent()) {
            $new_total        = $this->calculatePercentage($total, $sub_line_item->percent());
            $new_pretax_total = $this->calculatePercentage($pretax_total, $sub_line_item->percent());
        } else {
            $new_total = $new_pretax_total = $this->calculateTotalForQuantity($sub_line_item);
        }
        $total        = $this->updateTotal($sub_line_item, $new_total, false, false);
        $pretax_total = $this->updatePreTaxTotal($sub_line_item, $new_pretax_total, false, false);
        // need to also adjust unit price too if the pretax total or quantity has been updated
        $this->updateUnitPrice($sub_line_item, $pretax_total);
        $this->debugLog(" - - total : $total ", 3);
        $this->debugLog(" - - pretax: $pretax_total ", 3);
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
        $this->debugLog(__FUNCTION__);
        $total_tax = $this->calculatePercentage($pretax_total, $sub_line_item->percent());
        $total_tax = $this->updateTotal($sub_line_item, $total_tax);
        $this->debugLog(" - total_tax : $total_tax ", 3);
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
                $count    = 0;
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
                // and we also need to loop through all the sub items and ensure those quantities match this parent.
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
        $amount = $this->decimal_values->roundDecimalValue($amount, $round);
        $this->debugLog(' % ' . __FUNCTION__, 2);
        $this->debugLog(" % % total: $total", 3);
        $this->debugLog(" % % percent: $percent", 3);
        $this->debugLog(" % % amount: $amount", 3);
        return $amount;
    }


    /**
     * @param EE_Line_Item $line_item
     * @return float
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function calculateTotalForQuantity(EE_Line_Item $line_item): float
    {
        $this->debugLog(' # ' . __FUNCTION__, 2);
        $this->debugLog(' # # ' . $line_item->name() . ' ' . $line_item->type() . ' ' . $line_item->code(), 3);
        $this->debugLog(" # # # unit_price: " . $line_item->unit_price(), 3);
        $this->debugLog(" # # # quantity: " . $line_item->quantity(), 3);
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
     * @param bool         $save
     * @return float
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function updatePreTaxTotal(
        EE_Line_Item $line_item,
        float $pretax_total,
        bool $round = false,
        bool $save = true
    ): float {
        $pretax_total = $this->decimal_values->roundDecimalValue($pretax_total, $round);
        $sign = $line_item->type() === EEM_Line_Item::type_cancellation ? -1 : 1;
        $pretax_total = $sign * $pretax_total;
        $this->debugLog(' ? ' . __FUNCTION__, 2);
        $this->debugLog(' ??? ' . $line_item->name() . ' ' . $line_item->type() . ' ' . $line_item->code(), 3);
        $this->debugLog(" ????? SIGN: $sign  &&  pretax_total: $pretax_total", 3);
        // update and save new total only if incoming value does not match existing value
        if ($line_item->preTaxTotal() !== $pretax_total) {
            $line_item->setPreTaxTotal($pretax_total);
            if ($save) {
                $line_item->maybe_save();
            }
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
     * @param bool         $save
     * @return float
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function updateTotal(EE_Line_Item $line_item, float $total, bool $round = false, bool $save = true): float
    {
        $total = $this->decimal_values->roundDecimalValue($total, $round);
        $sign = $line_item->type() === EEM_Line_Item::type_cancellation ? -1 : 1;
        $total = $sign * $total;
        $this->debugLog(' ? ' . __FUNCTION__, 2);
        $this->debugLog(' ??? ' . $line_item->name() . ' ' . $line_item->type() . ' ' . $line_item->code(), 3);
        $this->debugLog(" ????? SIGN: $sign  &&  total: $total", 3);
        // update and save new total only if incoming value does not match existing value
        if ($line_item->total() !== $total) {
            $line_item->set_total($total);
            if ($save) {
                $line_item->maybe_save();
            }
        }
        return (float) $total;
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
        // if we intend to save this line item and it's a grand total
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
     * @param bool         $save
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function updateUnitPrice(EE_Line_Item $line_item, float $pretax_total, bool $save = true)
    {
        $quantity = $line_item->quantity();
        // don't divide by zero else you'll create a singularity and implode the interweb
        // we also don't set unit prices for percentage based line items
        if ($quantity === 0 || $line_item->is_percent()) {
            return;
        }
        $new_unit_price = $pretax_total / $quantity;
        $new_unit_price = $this->decimal_values->roundDecimalValue($new_unit_price);
        $sign = $line_item->type() === EEM_Line_Item::type_cancellation ? -1 : 1;
        $new_unit_price = $sign * $new_unit_price;
        $this->debugLog(' ? ' . __FUNCTION__, 2);
        $this->debugLog(' ??? ' . $line_item->name() . ' ' . $line_item->type() . ' ' . $line_item->code(), 3);
        $this->debugLog(" ????? SIGN: $sign  &&  new_unit_price: $new_unit_price", 3);
        // update and save new total only if incoming value does not match existing value
        if ($line_item->unit_price() !== $new_unit_price) {
            $this->debugLog(' @ ' . __FUNCTION__, 3);
            $this->debugLog(' @ @ ' . $line_item->name() . ' ' . $line_item->type() . ' ' . $line_item->code(), 3);
            $this->debugLog(" @ @ @ pretax: $pretax_total", 3);
            $this->debugLog(" @ @ @ quantity: $quantity", 3);
            $this->debugLog(" @ @ @ old unit price: " . $line_item->unit_price(), 3);
            $this->debugLog(" @ @ @ new unit price: $new_unit_price", 3);
            $line_item->set_unit_price($new_unit_price);
            if ($save) {
                $line_item->maybe_save();
            }
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
        $this->debugLog(__FUNCTION__, 3);
        $this->validateLineItemAndType($total_line_item, EEM_Line_Item::type_total);
        // calculate the total taxable amount for globally applied taxes
        $taxable_total    = $this->taxableAmountForGlobalTaxes($total_line_item);
        [$total_tax, $global_taxes ]    = $this->applyGlobalTaxes($total_line_item, $taxable_total);
        $non_global_taxes = $this->calculateNonGlobalTaxes($total_line_item);
        $all_tax_total    = $this->applyNonGlobalTaxes($total_line_item, $total_tax, $global_taxes, $non_global_taxes);
        $this->recalculateTaxSubTotal($total_line_item);
        $this->debugLog(" - taxable_total : $taxable_total", 4);
        $this->debugLog(" - total_tax : $total_tax", 4);
        $this->debugLog(" - all_tax_total : $all_tax_total", 4);
        return $all_tax_total;
    }


    /**
     * @param EE_Line_Item $total_line_item
     * @param float        $taxable_total
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function applyGlobalTaxes(EE_Line_Item $total_line_item, float $taxable_total): array
    {
        $this->debugLog(__FUNCTION__, 4);
        $this->validateLineItemAndType($total_line_item, EEM_Line_Item::type_total);
        $total_tax = 0;
        if ($taxable_total === 0.0) {
            return [0, []];
        }
        // loop through all global taxes all taxes
        $global_taxes = $total_line_item->tax_descendants();
        foreach ($global_taxes as $tax) {
            $tax_total = $this->calculatePercentage($taxable_total, $tax->percent());
            if ($tax_total === 0.0) {
                $tax->delete();
                continue;
            }
            $tax_total = $this->updateTotal($tax, $tax_total, true);
            $total_tax += $tax_total;
        }
        return [$this->decimal_values->roundDecimalValue($total_tax, true), $global_taxes];
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
        $this->debugLog(__FUNCTION__, 4);
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
        $this->debugLog(__FUNCTION__, 4);
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
     * @param EE_Line_Item   $total_line_item
     * @param float          $tax_total
     * @param EE_Line_Item[] $global_taxes array of tax line items returned from applyGlobalTaxes()
     * @param array          $non_global_taxes array of tax details generated by calculateNonGlobalTaxes()
     * @return float
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function applyNonGlobalTaxes(
        EE_Line_Item $total_line_item,
        float $tax_total,
        array $global_taxes,
        array $non_global_taxes
    ): float {
        $this->debugLog(__FUNCTION__, 4);
        $taxes_subtotal = EEH_Line_Item::get_taxes_subtotal($total_line_item);
        foreach ($non_global_taxes as $non_global_tax) {
            $found = false;
            foreach ($global_taxes as $global_tax) {
                if (
                    $this->validateLineItemAndType($global_tax)
                    && $non_global_tax['obj'] === $global_tax->OBJ_type()
                    && $non_global_tax['objID'] === $global_tax->OBJ_ID()
                ) {
                    $found     = true;
                    $new_total = $global_tax->total() + $non_global_tax['total'];
                    // add non-global tax to matching global tax AND the tax total
                    $global_tax->set_total($new_total);
                    $global_tax->maybe_save();
                    $tax_total += $non_global_tax['total'];
                }
            }
            if (! $found) {
                // add a new line item for this non-global tax
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
        $this->debugLog(__FUNCTION__, 4);
        $total            = 0;
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
                    $total        += $this->updatePreTaxTotal($child_line_item, $pretax_total);
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


    /**
     * loops through all sub-line-items for the supplied line item and reorders them as follows:
     * 1. sub items
     * 2. other??? (not a sub-item or sub-tax)
     * 3. sub taxes
     *
     * @param EE_Line_Item $line_item
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     * @since 5.0.12.p
     */
    public function reorderSubLineItems(EE_Line_Item $line_item)
    {
        if ($line_item->type() !== EEM_Line_Item::type_line_item) {
            return;
        }
        $this->debugLog(' + LineItemCalculator::reorderSubLineItems', 3);
        $this->debugLog(
            ' + + ' . $line_item->OBJ_type() . ' ' . $line_item->name()
            . ' - ' . $line_item->type() . ' (' . $line_item->code() . ')',
            3
        );
        $sub_line_items = $line_item->children();
        $items          = [];
        $other          = [];
        $taxes          = [];
        foreach ($sub_line_items as $sub_line_item) {
            switch ($sub_line_item->type()) {
                case EEM_Line_Item::type_sub_line_item:
                    $items[ $sub_line_item->ID() ] = $sub_line_item;
                    break;
                case EEM_Line_Item::type_sub_tax:
                    $taxes[ $sub_line_item->ID() ] = $sub_line_item;
                    break;
                default:
                    $other[ $sub_line_item->ID() ] = $sub_line_item;
            }
        }
        $order      = 0;
        $line_items = apply_filters(
            'FHEE__EventEspresso_core_services_calculators_LineItemCalculator__reorderSubLineItems__line_items',
            ['items' => $items, 'other' => $other, 'taxes' => $taxes]
        );
        foreach ($line_items as $sub_items) {
            foreach ($sub_items as $sub_item) {
                $order++;
                $sub_item->set_order($order);
                $sub_item->save();
                $this->debugLog(
                    ' + + + ' . $order . '. ' . $sub_item->OBJ_type() . ' ' . $sub_item->name()
                    . ' - ' . $sub_item->type() . ' (' . $sub_item->code() . ')',
                    3
                );
            }
        }
    }
}
