<?php
/**
 * This contains the class for the Line Item messages shortcode library.
 *
 * @since 4.5.0
 * @package Event Espresso
 * @subpackage messages
 */
if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
 *
 * EE_Line_Item_Shortcodes
 *
 * This is a child class for the EE_Shortcodes library. The EE_Line_Item_Shortcodes lists all shortcodes related to line items.
 *
 *
 * @since 4.5.0
 *
 * @package			Event Espresso
 * @subpackage		messages
 * @author			Darren Ethier
 */
class EE_Line_Item_Shortcodes extends EE_Shortcodes {




	protected function _init_props() {
		$this->label = __('Line Item Shortcodes', 'event_espresso');
		$this->description = __('All shortcodes specific to line items', 'event_espresso');
		$this->_shortcodes = array(
			'[LINE_ITEM_NAME]' => __('Outputs the line item name.', 'event_espresso'),
			'[LINE_ITEM_DESCRIPTION]' => __('Outputs a the description for the line item.', 'event_espresso'),
			'[LINE_ITEM_QUANTITY]' => __('Outputs the quantity for this line item.', 'event_espresso'),
			'[LINE_ITEM_AMOUNT]' => __('This will either output the unit price for a line item if its not a percent, or the percent of the line item (if it is percent).', 'event_espresso' ),
			'[LINE_ITEM_TOTAL]' => __('This outputs the line item total.', 'event_espresso'),
			'[LINE_ITEM_TAXABLE_*]' => __('This attribute type shortcode allows users to indicate what to output if a line item is taxable or not.  One can use the key "symbol=" with the shortcode to indicate what they\'d like to represent a taxable line item.  So doing something like <code>[LINE_ITEM_TAXABLE_* symbol="*"]</code> means that when the line item is parsed, if it\'s taxable the "*" symbol will be returned.  The default symbol if no attribute is included is the "*" symbol.', 'event_espresso' )
			);
	}



	protected function _parser( $shortcode ) {
		//ensure that the incoming object IS a line item.  If it isn't then bail early.
		if ( ! $this->_data instanceof EE_Line_Item ) {
			return '';
		}

		$line_item = $this->_data;

		switch ( $shortcode ) {
			case '[LINE_ITEM_NAME]' :
				return $line_item->name();
				break;

			case '[LINE_ITEM_DESCRIPTION]' :
				return $line_item->desc();
				break;

			case '[LINE_ITEM_QUANTITY]' :
				return $line_item->quantity();
				break;

			case '[LINE_ITEM_AMOUNT]' :
				return $line_item->is_percent() ? $line_item->percent() . '%' : $line_item->unit_price_no_code();
				break;

			case '[LINE_ITEM_TOTAL]' :
				return $line_item->total_no_code();
				break;
		}

		if ( strpos( $shortcode, '[LINE_ITEM_TAXABLE_*' ) !== FALSE ) {
			$attrs = $this->_get_shortcode_attrs( $shortcode );
			if ( $line_item->is_taxable() ) {
				return !empty( $attrs['symbol'] ) ? $attrs['symbol'] : '*';
			}
		}

		return '';
	}
}
