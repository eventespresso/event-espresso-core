<?php
defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Interface EEHI_Line_Item
 */
interface EEHI_Line_Item
{

    /**
     * Adds an item to the purchase in the right spot
     *
     * @param EE_Line_Item $total_line_item
     * @param EE_Line_Item $line_item
     */
    public function add_item(EE_Line_Item $total_line_item, EE_Line_Item $line_item);



    /**
     * Overwrites the previous tax by clearing out the old taxes, and creates a new
     * tax and updates the total line item accordingly
     *
     * @param EE_Line_Item $total_line_item
     * @param float        $amount
     * @param string       $name
     * @param string       $description
     * @param string       $code
     * @param boolean      $add_to_existing_line_item if true and a duplicate line item with
     *                                                the same code is found, $amount will be added onto it; otherwise will simply
     *                                                set the taxes to match $amount
     * @return EE_Line_Item the new tax created
     */
    public function set_total_tax_to(
        EE_Line_Item $total_line_item,
        $amount,
        $name = null,
        $description = null,
        $code = null,
        $add_to_existing_line_item = false
    );



    /**
     * Makes all the line items which are children of $line_item taxable (or not).
     * Does NOT save the line items
     *
     * @param EE_Line_Item $line_item
     * @param boolean      $taxable
     * @param string       $code_substring_for_whitelist if this string is part of the line item's code
     *                                                   it will be whitelisted (ie, except from becoming taxable)
     */
    public static function set_line_items_taxable(
        EE_Line_Item $line_item,
        $taxable = true,
        $code_substring_for_whitelist = null
    );



    /**
     * Adds a simple item ( unrelated to any other model object) to the total line item,
     * in the correct spot in the line item tree.
     *
     * @param EE_Line_Item $total_line_item
     * @param string       $name
     * @param float        $unit_price
     * @param string       $description
     * @param int          $quantity
     * @param boolean      $taxable
     * @param boolean      $code if set to a value, ensures there is only one line item with that code
     * @return boolean success
     */
    public function add_unrelated_item(
        EE_Line_Item $total_line_item,
        $name,
        $unit_price,
        $description = '',
        $quantity = 1,
        $taxable = false,
        $code = null
    );



    /**
     * Gets the line item for the taxes subtotal
     *
     * @param EE_Line_Item $total_line_item of type EEM_Line_Item::type_total
     * @return \EE_Line_Item
     */
    public static function get_taxes_subtotal(EE_Line_Item $total_line_item);
}
// End of file EEHI_Line_Item.interface.php
// Location: core/interfaces/line_items/EEHI_Line_Item.interface.php