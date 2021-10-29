<?php

namespace EventEspresso\core\services\calculators;

use DomainException;
use EE_Currency_Config;
use EE_Error;
use EE_Line_Item;
use EE_Transaction;
use EEH_Line_Item;
use EEM_Line_Item;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use InvalidArgumentException;
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
     * number of decimal places to round numbers to when performing calculations
     *
     * @var integer
     */
    protected $decimal_precision = 6;

    /**
     * number of decimal places to round numbers to for display
     *
     * @var integer
     */
    protected $locale_precision = 6;


    /**
     * @param EE_Currency_Config $currency_config
     */
    public function __construct(EE_Currency_Config $currency_config)
    {
        $this->locale_precision = $currency_config->dec_plc;
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
        $this->debug(null, __FUNCTION__, __CLASS__,__FILE__, __LINE__, 1);
        $this->validateLineItemAndType($line_item, EEM_Line_Item::type_total);
        $this->debug($line_item, '', __FUNCTION__, __FILE__, __LINE__, 1);
        [$total, $pretax] = $this->recalculateLineItemTotals($line_item);
        $total_tax = $this->recalculateTaxesAndTaxTotal($line_item);
        // no negative totals plz
        $total = max($total, 0);
        $pretax = $this->updatePreTaxTotal($line_item, $pretax, true);
        $total = $this->updateTotal($line_item, $total, true);
        $this->debug($line_item, $pretax, '$pretax total', __FILE__, __LINE__, 1);
        $this->debug($line_item, $total_tax, '$total_tax', __FILE__, __LINE__, 1);
        $this->debug($line_item, $total, 'grand $total', __FILE__, __LINE__, 1);
        $this->updateTransaction($line_item, $total, $update_txn_status);
        return $total;
    }


    /**
     * Recursively goes through all the children and recalculates sub-totals EXCEPT for
     * tax-sub-totals (they're a an odd beast). Updates the 'total' on each line item according to either its
     * unit price * quantity or the total of all its children EXCEPT when we're only calculating the taxable total and
     * when this is called on the grand total
     *
     * @param EE_Line_Item $line_item
     * @param float        $total
     * @param float        $pretax
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function recalculateLineItemTotals(
        EE_Line_Item $line_item,
        float        $total = 0,
        float        $pretax = 0
    ): array {
        $this->debug($line_item, $total, '> TOTAL', __FILE__, __LINE__, 3);
        $this->debug($line_item, $pretax, '> PRETAX', __FILE__, __LINE__, 3);
        $new_total = $new_pretax = 0;
        switch ($line_item->type()) {

            case EEM_Line_Item::type_total:
            case EEM_Line_Item::type_sub_total:
                [$new_total, $new_pretax] = $this->recalculateSubTotal($line_item, $total, $pretax);
                break;

            case EEM_Line_Item::type_line_item:
                [$new_total, $new_pretax] = $this->recalculateLineItem($line_item, $total, $pretax);
                break;

            case EEM_Line_Item::type_sub_line_item:
                // sub line items operate on the total and update both the total AND the pre-tax total
                $new_total = $new_pretax = $this->recalculateSubLineItem($line_item, $total);
                break;

            case EEM_Line_Item::type_sub_tax:
                // sub line item taxes ONLY operate on the pre-tax total and ONLY update the total
                $new_total = $this->recalculateSubTax($line_item, $pretax);
                break;

            case EEM_Line_Item::type_tax_sub_total:
            case EEM_Line_Item::type_tax:
            case EEM_Line_Item::type_cancellation:
                // completely ignore tax totals, tax sub-totals, and cancelled line items
                // when calculating the pre-tax-total
                break;
        }
        // $this->debug($line_item, $new_total, 'NEW TOTAL', __FILE__, __LINE__, 3);
        // $this->debug($line_item, $new_pretax, 'NEW PRETAX TOTAL', __FILE__, __LINE__, 3);
        return [$total + $new_total, $pretax + $new_pretax];
    }


    /**
     * @param EE_Line_Item $line_item
     * @param float        $total
     * @param float $pretax
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function recalculateSubTotal(
        EE_Line_Item $line_item,
        float        $total = 0,
        float $pretax = 0
    ): array {
        if ($line_item->is_total()) {
            // if this is the grand total line item
            // then first update ALL of the line item quantities (if need be)
            $this->updateLineItemQuantities($line_item);
        }
        // recursively loop through children and recalculate their totals
        $children = $line_item->children();
        foreach ($children as $child_line_item) {
            [$total, $pretax] = $this->recalculateLineItemTotals($child_line_item, $total, $pretax);
            $this->debug($child_line_item, $total, 'NEW TOTAL', __FILE__, __LINE__, 3);
            $this->debug($child_line_item, $pretax, 'NEW PRETAX TOTAL', __FILE__, __LINE__, 3);
        }
        $this->debug($line_item, __FUNCTION__, __FILE__, __LINE__, 3);
        // for the actual pre-tax sub total line item, we want to save the pretax value for everything
        if ($line_item->is_sub_total() && $line_item->name() === esc_html__('Pre-Tax Subtotal', 'event_espresso')) {
            $this->updateUnitPrice($line_item, $pretax);
            $this->updateTotal($line_item, $pretax, true);
        } else {
            $this->updateUnitPrice($line_item, $total);
            $total  = $this->updateTotal($line_item, $total, true);
        }
        $pretax = $this->updatePreTaxTotal($line_item, $pretax, true);
        return [$total, $pretax];
    }


    /**
     * @param EE_Line_Item $line_item
     * @param float        $total
     * @param float        $pretax
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     * @since   $VID:$
     */
    private function recalculateLineItem(
        EE_Line_Item $line_item,
        float        $total = 0,
        float        $pretax = 0
    ): array {
        if ($line_item->is_percent()) {
            $total = $this->calculatePercentage($total, $line_item->percent());
        } else {
            // recursively loop through children and recalculate their totals
            $children = $line_item->children();
            foreach ($children as $child_line_item) {
                [$total, $pretax] = $this->recalculateLineItemTotals($child_line_item, $total, $pretax);
                $this->debug($child_line_item, $total, 'NEW TOTAL', __FILE__, __LINE__, 3);
                $this->debug($child_line_item, $pretax, 'NEW PRETAX TOTAL', __FILE__, __LINE__, 3);
            }
        }
        $this->debug($line_item, __FUNCTION__, __FILE__, __LINE__, 3);
        $total = $this->updateTotal($line_item, $total, true);
        $pretax = $this->updatePreTaxTotal($line_item, $pretax, true);
        return [$total, $pretax];
    }


    /**
     * @param EE_Line_Item $line_item
     * @param float|int    $total
     * @return float
     * @throws EE_Error
     * @throws ReflectionException
     * @since   $VID:$
     */
    private function recalculateSubLineItem(EE_Line_Item $line_item, float $total = 0): float
    {
        $total = $line_item->is_percent()
            ? $this->calculatePercentage($total, $line_item->percent())
            : $this->calculateTotal($line_item);
        $this->debug($line_item, __FUNCTION__, __FILE__, __LINE__, 3);
        return $this->updateTotal($line_item, $total);
    }


    /**
     * @param EE_Line_Item $line_item
     * @param float|int    $total
     * @return float
     * @throws EE_Error
     * @throws ReflectionException
     * @since   $VID:$
     */
    private function recalculateSubTax(EE_Line_Item $line_item, float $total = 0): float
    {
        $total = $this->calculatePercentage($total, $line_item->percent());
        $this->debug($line_item, __FUNCTION__, __FILE__, __LINE__, 3);
        return $this->updateTotal($line_item, $total);
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
        $count = 0;
        switch ($line_item->type()) {

            case EEM_Line_Item::type_total:
            case EEM_Line_Item::type_sub_total:
            case EEM_Line_Item::type_tax_sub_total:
                // first, loop through children and set their quantities
                $children = $line_item->children();
                foreach ($children as $child_line_item) {
                    $count += $this->updateLineItemQuantities($child_line_item);
                }
                // $this->debug($line_item, '', __FUNCTION__, __FILE__, __LINE__, 3);
                // totals and subtotals should have a quantity of 1
                // unless their children have all been removed, in which case we can set them to 0
                $quantity = $count > 0 ? 1 : 0;
                $this->updateQuantity($line_item, $quantity);
                return $quantity;

            case EEM_Line_Item::type_line_item:
                // line items should ALREADY have accurate quantities set, if not, then somebody done goofed!
                // but if this is a percentage based line item, then ensure its quantity is 1
                if ($line_item->is_percent()) {
                    // $this->debug($line_item, '', __FUNCTION__, __FILE__, __LINE__, 3);
                    $this->updateQuantity($line_item, 1);
                }
                // and we also need to loop through all of the sub items and ensure those quantities match this parent.
                $children = $line_item->children();
                foreach ($children as $child_line_item) {
                    $count += $this->updateLineItemQuantities($child_line_item, $line_item->quantity());
                }
                return $count;

            case EEM_Line_Item::type_sub_line_item:
                // percentage based items need their quantity set to 1,
                // all others use the incoming value from the parent line item
                $quantity = $line_item->is_percent() ? 1 : $quantity;
                // $this->debug($line_item, '', __FUNCTION__, __FILE__, __LINE__, 3);
                $this->updateQuantity($line_item, $quantity);
                return $quantity;

            case EEM_Line_Item::type_tax:
            case EEM_Line_Item::type_sub_tax:
                // $this->debug($line_item, '', __FUNCTION__, __FILE__, __LINE__, 3);
                // taxes should have a quantity of 1
                $this->updateQuantity($line_item, 1);
                return $quantity;

            case EEM_Line_Item::type_cancellation:
                // cancellations will be ignored for all calculations
                // so assume that they are already set correctly, not that it matters
                break;
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
        return $this->roundNumericValue($amount, $round);
    }


    /**
     * @param EE_Line_Item $line_item
     * @return float
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function calculateTotal(EE_Line_Item $line_item): float
    {
        $total = $line_item->unit_price() * $line_item->quantity();
        return $this->roundNumericValue($total);
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
            $this->debug($line_item, $percent, 'SET LINE ITEM %: ', __FILE__, __LINE__, 2);
            $line_item->set_percent($percent);
            $line_item->maybe_save();
        }
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
            $this->debug($line_item, $quantity, 'SET LINE ITEM QTY: ', __FILE__, __LINE__, 2);
            $line_item->set_quantity($quantity);
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
        $pretax_total = $this->roundNumericValue($pretax_total, $round);
        // update and save new total only if incoming value does not match existing value
        if ($line_item->preTaxTotal() !== $pretax_total) {
            $this->debug($line_item, $pretax_total, 'SET LINE ITEM PRETAX TOTAL: ', __FILE__, __LINE__, 2);
            $line_item->setPreTaxTotal($pretax_total);
            $line_item->maybe_save();
        }
        return $pretax_total;
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
        $total = $this->roundNumericValue($total, $round);
        // update and save new total only if incoming value does not match existing value
        if ($line_item->total() !== $total) {
            $this->debug($line_item, $total, 'SET LINE ITEM TOTAL: ', __FILE__, __LINE__, 2);
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
     * @param float        $total
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function updateUnitPrice(EE_Line_Item $line_item, float $total)
    {
        $quantity = $line_item->quantity();
        // don't divide by zero else you'll create a singularity and implode the interweb
        $new_unit_price = $quantity !== 0 ? $total / $quantity : 0;
        $new_unit_price = $this->roundNumericValue($new_unit_price);
        // update and save new total only if incoming value does not match existing value
        if ($line_item->unit_price() !== $new_unit_price) {
            $this->debug($line_item, $new_unit_price, 'SET LINE ITEM UNIT PRICE: ', __FILE__, __LINE__, 2);
            $line_item->set_unit_price($new_unit_price);
            $line_item->maybe_save();
        }
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
    public function recalculateTaxesAndTaxTotal(EE_Line_Item $line_item): float
    {
        $this->debug(null, __FUNCTION__, __CLASS__, __FILE__, __LINE__, 1);
        $this->debug($line_item, '', __FUNCTION__, __FILE__, __LINE__);
        // calculate the total taxable amount for globally applied taxes
        $taxable_total = $this->taxableAmountForGlobalTaxes($line_item->children());
        $tax_total     = $this->applyGlobalTaxes($line_item, $taxable_total);
        $this->debug($line_item, "$tax_total", '$tax_total', __FILE__, __LINE__);
        $non_global_taxes = $this->calculateNonGlobalTaxes($line_item);
        $tax_total        = $this->applyNonGlobalTaxes($line_item, $tax_total, $non_global_taxes);
        $this->debug($line_item, "$tax_total", 'FINAL $tax_total', __FILE__, __LINE__);
        $this->recalculateTaxSubTotal($line_item);
        return $tax_total;
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
        $this->debug($total_line_item, '', __FUNCTION__, __FILE__, __LINE__);
        $this->validateLineItemAndType($total_line_item, EEM_Line_Item::type_total);
        $total_tax = 0;
        $this->debug($total_line_item, $taxable_total, '$taxable_total', __FILE__, __LINE__);
        // loop through all global taxes all taxes
        $taxes = $total_line_item->tax_descendants();
        foreach ($taxes as $tax) {
            $this->debug($tax, '', 'TAX CHILD', __FILE__, __LINE__);
            $tax_total = $this->calculatePercentage($taxable_total, $tax->percent());
            $tax_total = $this->updateTotal($tax, $tax_total, true);
            $total_tax += $tax_total;
        }
        return $total_tax;
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
        $this->debug($line_item, '', __FUNCTION__, __FILE__, __LINE__);
        foreach ($line_item->children() as $maybe_tax_subtotal) {
            if (
                $this->validateLineItemAndType($maybe_tax_subtotal)
                && $maybe_tax_subtotal->is_tax_sub_total()
            ) {
                $total         = 0;
                $total_percent = 0;
                // simply loop through all its children (which should be taxes) and sum their total
                foreach ($line_item->children() as $child_tax) {
                    if ($this->validateLineItemAndType($child_tax) && $child_tax->isGlobalTax()) {
                        $total         += $child_tax->total();
                        $total_percent += $child_tax->percent();
                    }
                }
                $this->updateTotal($line_item, $total, true);
                $this->updatePercent($line_item, $total_percent);
                $this->debug(null, __FUNCTION__, __CLASS__, __FILE__, __LINE__, 1);
                $this->debug($line_item, $total, 'TOTAL TAX', __FILE__, __LINE__);
                $this->debug($line_item, $total_percent, 'TOTAL TAX %', __FILE__, __LINE__);
                $this->debug($line_item, $total, $line_item->total() . ' === ', __FILE__, __LINE__, 1);
            }
        }
    }


    /**
     * @param EE_Line_Item $total_line_item
     * @param array        $non_global_taxes
     * @param float        $line_item_total
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function calculateNonGlobalTaxes(
        EE_Line_Item $total_line_item,
        array        $non_global_taxes = [],
        float        $line_item_total = 0
    ): array {
        foreach ($total_line_item->children() as $line_item) {
            if ($this->validateLineItemAndType($line_item)) {
                if ($line_item->is_sub_total()) {
                    $non_global_taxes = $this->calculateNonGlobalTaxes($line_item, $non_global_taxes);
                } elseif ($line_item->is_line_item()) {
                    $this->debug($line_item, $line_item->type(), ' ~ ~ TYPE', __FILE__, __LINE__);
                    $non_global_taxes = $this->calculateNonGlobalTaxes(
                        $line_item,
                        $non_global_taxes,
                        $line_item->pretaxTotal()
                    );
                } elseif ($line_item->isSubTax()) {
                    $this->debug($line_item, $line_item->type(), ' ~ ~ TYPE', __FILE__, __LINE__);
                    $tax_ID = $line_item->name() . '_' . $line_item->percent();
                    if (! isset($non_global_taxes[ $tax_ID ])) {
                        $this->debug($line_item, $tax_ID, '$tax_ID', __FILE__, __LINE__);
                        $non_global_taxes[ $tax_ID ] = [
                            'name'  => $line_item->name(),
                            'rate'  => $line_item->percent(),
                            'total' => 0,
                        ];
                    }
                    $tax = $this->calculatePercentage($line_item_total, $line_item->percent());
                    $this->debug($line_item, "$tax", '$tax', __FILE__, __LINE__);
                    $non_global_taxes[ $tax_ID ]['total'] += $tax;
                    $this->debug($line_item, $non_global_taxes, '$non_global_taxes', __FILE__, __LINE__);
                }
            }
        }
        return $non_global_taxes;
    }


    /**
     * @param EE_Line_Item $total_line_item
     * @param float        $tax_total
     * @param array        $non_global_taxes
     * @return float|mixed
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function applyNonGlobalTaxes(
        EE_Line_Item $total_line_item,
        float        $tax_total,
        array        $non_global_taxes
    ) {
        $this->debug($total_line_item, __FUNCTION__, __CLASS__, __FILE__, __LINE__, 1);
        /*
            array(1) {
              ['GST_7']=>
              array(3) {
                ['name']=>
                string(3) 'GST'
                ['rate']=>
                float(7)
                ['total']=>
                float(4.9)
              }
            }
        */
        $global_taxes   = $total_line_item->tax_descendants();
        $taxes_subtotal = EEH_Line_Item::get_taxes_subtotal($total_line_item);
        // $order = count($global_taxes);
        foreach ($non_global_taxes as $non_global_tax) {
            $this->debug($total_line_item, $non_global_tax, '$non_global_tax', __FILE__, __LINE__);
            $found = false;
            foreach ($global_taxes as $global_tax) {
                $this->debug($global_tax, "{$global_tax->OBJ_ID()}", 'global_tax ID', __FILE__, __LINE__);
                $this->debug($global_tax, $global_tax->name(), 'global_tax name', __FILE__, __LINE__);
                $this->debug($global_tax, $global_tax->percent(), 'global_tax %', __FILE__, __LINE__);
                if (
                    $this->validateLineItemAndType($global_tax)
                    && $non_global_tax['name'] === $global_tax->name()
                    && $non_global_tax['rate'] === $global_tax->percent()
                ) {
                    $found = true;
                    $this->debug($global_tax, $global_tax->total(), '$global_tax->total()', __FILE__, __LINE__);
                    $this->debug($global_tax, $non_global_tax['total'], '$non_global_tax[total]', __FILE__, __LINE__);

                    $new_total = $global_tax->total() + $non_global_tax['total'];
                    $this->debug($global_tax, $new_total, '$new_total', __FILE__, __LINE__);
                    // add non global tax to matching global tax AND the tax total
                    $global_tax->set_total($new_total);
                    $global_tax->maybe_save();
                    $tax_total += $non_global_tax['total'];
                    $this->debug($global_tax, "$tax_total", ' +++ $tax_total', __FILE__, __LINE__, 2);
                }
            }
            if (! $found) {
                // add a new line item for this non global tax
                $this->debug($total_line_item, $non_global_tax, '$non_global_tax', __FILE__, __LINE__);
                $taxes_subtotal->add_child_line_item(
                    EE_Line_Item::new_instance(
                        [
                            'LIN_name'       => $non_global_tax['name'],
                            'LIN_percent'    => $non_global_tax['rate'],
                            'LIN_is_taxable' => false,
                            'LIN_total'      => $non_global_tax['total'],
                            'LIN_type'       => EEM_Line_Item::type_tax,
                        ]
                    )
                );
                $tax_total += $non_global_tax['total'];
                $this->debug($total_line_item, "$tax_total", ' +++ $tax_total', __FILE__, __LINE__, 2);
            }
        }
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
        $this->validateLineItemAndType($line_item, EEM_Line_Item::type_total);
        $this->recalculateTaxSubTotal($line_item);
        $total = 0;
        foreach ($line_item->tax_descendants() as $tax_line_item) {
            if ($this->validateLineItemAndType($tax_line_item)) {
                $total += $tax_line_item->total();
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
     * @param EE_Line_Item[] $line_items
     * @return float
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function taxableAmountForGlobalTaxes(?array $line_items): float
    {
        $total      = 0;
        $line_items = $line_items ?? [];
        foreach ($line_items as $line_item) {
            $this->validateLineItemAndType($line_item);
            if ($line_item->is_sub_total()) {
                $total += $this->taxableAmountForGlobalTaxes($line_item->children());
            } elseif ($line_item->is_line_item() && $line_item->is_taxable()) {
                // if it's a percent item, only take into account
                // the percentage that's taxable (the taxable total so far)
                $total += $line_item->is_percent()
                    ? $this->calculatePercentage($total, $line_item->percent(), true)
                    : $line_item->pretaxTotal();
            }
        }
        return max($total, 0);
    }


    /**
     * strips formatting using the site locale, then rounds the provided number to 6 decimal places and returns a float
     *
     * @param float|int|string $number unformatted number value, ex: 1234.5678956789
     * @param bool             $round  whether to round the price off according to the locale settings
     * @return float                      rounded value, ex: 1,234.567896
     */
    private function roundNumericValue($number, bool $round = false): float
    {
        $precision = $round ? $this->locale_precision : $this->decimal_precision;
        return round(
            $this->filterNumericValue($number),
            $precision ?? $this->decimal_precision,
            PHP_ROUND_HALF_UP
        );
    }


    /**
     * Removes all characters except digits, +- and .
     *
     * @param float|int|string $number
     * @return float
     */
    private function filterNumericValue($number): float
    {
        return (float) filter_var($number, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
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
     * @param EE_Line_Item|null $line_item
     * @param                   $value
     * @param string            $msg
     * @param string            $file
     * @param string            $line
     * @param int               $heading
     * @throws EE_Error
     * @throws ReflectionException
     * @since   $VID:$
     */
    private function debug(?EE_Line_Item $line_item, $value, string $msg, string $file, string $line, int $heading = 5)
    {
        if ($this->debug) {
            $msg = $msg ? $msg . ' ' : '';
            $msg .= $line_item ? $line_item->type() . ' ▹ ' . $line_item->name() : '';
            \EEH_Debug_Tools::printr($value, $msg, $file, $line, $heading);
        }
    }


    private $debug = true;  // true  false
}
