<?php

/**
 * Class EE_Non_Zero_Line_Item_Filter
 * Filters line items to remove :
 *        subtotals with a total of 0
 *        line items with a quantity of 0
 *
 * @package               Event Espresso
 * @subpackage            core
 * @author                Brent Christensen
 *
 */
class EE_Non_Zero_Line_Item_Filter extends EE_Line_Item_Filter_Base
{

    /**
     * EE_Non_Zero_Line_Item_Filter constructor.
     */
    public function __construct()
    {
    }


    /**
     * Creates a duplicate of the line item tree, except only includes billable items
     * and the portion of line items attributed to billable things
     *
     * @param EE_Line_Item $line_item
     * @return EE_Line_Item
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function process(EE_Line_Item $line_item): ?EE_Line_Item
    {
        $non_zero_line_item = $this->_filter_zero_line_item($line_item);
        if (! $non_zero_line_item instanceof EE_Line_Item) {
            return null;
        }
        // if this is an event subtotal, we want to only include it if it
        // has a non-zero total and at least one ticket line item child
        if ($line_item->children()) {
            $ticket_or_subtotals_with_tkt_children_count = 0;
            foreach ($line_item->children() as $child_line_item) {
                $code = $child_line_item->code();
                $child_line_item = $this->process($child_line_item);
                if (! $child_line_item instanceof EE_Line_Item) {
                    $line_item->delete_child_line_item($code);
                    continue;
                }
                if (
                    (
                        $child_line_item instanceof EEI_Line_Item
                        && $child_line_item->type() === EEM_Line_Item::type_sub_total
                    )
                    || (
                        $child_line_item->type() === EEM_Line_Item::type_line_item
                        && $child_line_item->OBJ_type() === 'Ticket'
                    )
                ) {
                    $ticket_or_subtotals_with_tkt_children_count++;
                }
            }
            // if this is an event subtotal with NO ticket children
            // we basically want to ignore it
            return $this->_filter_zero_subtotal_line_item(
                $non_zero_line_item,
                $ticket_or_subtotals_with_tkt_children_count
            );
        }
        return $non_zero_line_item;
    }


    /**
     * Creates a new, unsaved line item, but if it's a ticket line item
     * with a total of 0, or a subtotal of 0, returns null instead
     *
     * @param EE_Line_Item $line_item
     * @return EE_Line_Item
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _filter_zero_line_item(EE_Line_Item $line_item): ?EE_Line_Item
    {
        if (
            $line_item->type() === EEM_Line_Item::type_line_item
            && $line_item->OBJ_type() === 'Ticket'
            && $line_item->quantity() === 0
        ) {
            return null;
        }
        return $line_item;
    }


    /**
     * Creates a new, unsaved line item, but if it's a ticket line item
     * with a total of 0, or a subtotal of 0, returns null instead
     *
     * @param EE_Line_Item $line_item
     * @param int          $ticket_children
     * @return EE_Line_Item
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _filter_zero_subtotal_line_item(EE_Line_Item $line_item, int $ticket_children = 0): ?EE_Line_Item
    {
        if (
            (int) $ticket_children === 0
            && $line_item->type() === EEM_Line_Item::type_sub_total
        ) {
            return null;
        }
        return $line_item;
    }
}
