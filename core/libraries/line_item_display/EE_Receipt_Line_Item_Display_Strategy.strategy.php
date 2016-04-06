<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * Event Espresso
 *
 * Event Registration and Ticketing Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			    Event Espresso
 * @ copyright		(c) 2008-2014 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	$VID:$
 *
 * ------------------------------------------------------------------------
 */
 /**
 *
 * Class EE_Receipt_Line_Item_Display_Strategy
 *
 * Description
 *
 * @package         Event Espresso
 * @subpackage    core
 * @author				Brent Christensen
 * @since		 	   $VID:$
 *
 */

class EE_Receipt_Line_Item_Display_Strategy  implements EEI_Line_Item_Display {

	/**
	 * @param EE_Line_Item $line_item
	 * @param array        $options
	 * @return mixed
	 */
	public function display_line_item( EE_Line_Item $line_item, $options = array() ) {

		$html = '';
		// set some default options and merge with incoming
		$default_options = array(
			'show_desc' => TRUE,
			'odd' => FALSE
		);
		$options = array_merge( $default_options, (array)$options );
		switch( $line_item->type() ) {

			case EEM_Line_Item::type_total:
				// loop thru children
				foreach( $line_item->children() as $child_line_item ) {
					// recursively feed children back into this method
//					$html .= $this->display_line_item( $child_line_item, $options );
				}
//				$html .= $this->_separator_row( $options );
//				$html .= $this->_total_row( $line_item, __('Total', 'event_espresso'), $options );
				break;


			case EEM_Line_Item::type_sub_total:
				// loop thru children
				foreach( $line_item->children() as $child_line_item ) {
					// recursively feed children back into this method
//					$html .= $this->display_line_item( $child_line_item, $options );
				}
//				$html .= $this->_total_row( $line_item, __('Sub-Total', 'event_espresso'), $options );
				break;


			case EEM_Line_Item::type_tax_sub_total:
				// loop thru children
				foreach( $line_item->children() as $child_line_item ) {
					// recursively feed children back into this method
//					$html .= $this->display_line_item( $child_line_item, $options );
				}
//				$html .= $this->_total_row( $line_item, __('Tax Total', 'event_espresso'), $options );
				break;


			case EEM_Line_Item::type_line_item:
				// item row
//				$html .= $this->_item_row( $line_item, $options );
				// got any kids?
				foreach( $line_item->children() as $child_line_item ) {
//					$this->display_line_item( $child_line_item, $options );
				}
				break;


			case EEM_Line_Item::type_sub_line_item:
//				$html .= $this->_sub_item_row( $line_item, $options );
				break;


			case EEM_Line_Item::type_tax:
//				$html .= $this->_tax_row( $line_item, $options );
				break;

		}

		return $html;

	}



}
// End of file EE_Receipt_Line_Item_Display_Strategy.strategy.php
// Location: /EE_Receipt_Line_Item_Display_Strategy.strategy.php