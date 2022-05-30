<?php

/**
 *
 * EE_Line_Item_Shortcodes
 *
 * This is a child class for the EE_Shortcodes library. The EE_Line_Item_Shortcodes lists all shortcodes related to
 * line items.
 *
 *
 * @since              4.5.0
 *
 * @package            Event Espresso
 * @subpackage         messages
 * @author             Darren Ethier
 */
class EE_Line_Item_Shortcodes extends EE_Shortcodes
{
    protected function _init_props()
    {
        $this->label = esc_html__('Line Item Shortcodes', 'event_espresso');
        $this->description = esc_html__('All shortcodes specific to line items', 'event_espresso');
        $this->_shortcodes = array(
            '[LINE_ITEM_NAME]' => esc_html__('Outputs the line item name.', 'event_espresso'),
            '[LINE_ITEM_DESCRIPTION]' => esc_html__('Outputs a the description for the line item.', 'event_espresso'),
            '[LINE_ITEM_QUANTITY]' => esc_html__('Outputs the quantity for this line item.', 'event_espresso'),
            '[LINE_ITEM_AMOUNT]' => esc_html__(
                'This will either output the unit price for a line item if its not a percent, or the percent of the line item (if it is percent).',
                'event_espresso'
            ),
            '[LINE_ITEM_TOTAL]' => esc_html__('This outputs the line item total.', 'event_espresso'),
            '[LINE_ITEM_TAXABLE_*]' => esc_html__(
                'This attribute type shortcode allows users to indicate what to output if a line item is taxable or not.  One can use the key "symbol=" with the shortcode to indicate what they\'d like to represent a taxable line item.  So doing something like <code>[LINE_ITEM_TAXABLE_* symbol="*"]</code> means that when the line item is parsed, if it\'s taxable the "*" symbol will be returned.  The default symbol if no attribute is included is the "*" symbol.',
                'event_espresso'
            ),
        );
    }


    protected function _parser($shortcode)
    {
        // ensure that the incoming object IS a line item.  If it isn't then bail early.
        if (! $this->_data instanceof EE_Line_Item) {
            return '';
        }

        $line_item = $this->_data;

        switch ($shortcode) {
            case '[LINE_ITEM_NAME]':
                return $line_item->name();
                break;

            case '[LINE_ITEM_DESCRIPTION]':
                return $line_item->desc();
                break;

            case '[LINE_ITEM_QUANTITY]':
                return $line_item->quantity();
                break;

            case '[LINE_ITEM_AMOUNT]':
                return $line_item->is_percent() ? $line_item->percent() . '%' : $line_item->unit_price_no_code();
                break;

            case '[LINE_ITEM_TOTAL]':
                return $line_item->total_no_code();
                break;
        }

        if (strpos($shortcode, '[LINE_ITEM_TAXABLE_*') !== false) {
            $attrs = $this->_get_shortcode_attrs($shortcode);
            if ($line_item->is_taxable()) {
                return ! empty($attrs['symbol']) ? $attrs['symbol'] : '*';
            }
        }

        return '';
    }
}
