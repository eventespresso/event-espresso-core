<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
 /**
 *
 * Class EE_SPCO_Line_Item_Display_Strategy
 *
 * Description
 *
 * @package         Event Espresso
 * @subpackage    core
 * @author				Brent Christensen
 * @since		 	   $VID:$
 *
 */

class EE_SPCO_Line_Item_Display_Strategy implements EEI_Line_Item_Display {

	private $_show_taxes = FALSE;

	/**
	 * @param EE_Line_Item $line_item
	 * @param array        $options
	 * @return mixed
	 */
	public function display_line_item( EE_Line_Item $line_item, $options = array() ) {

		EE_Registry::instance()->load_helper( 'HTML' );

		$html = '';
		// set some default options and merge with incoming
		$default_options = array(
			'show_desc' => TRUE,  // 	TRUE 		FALSE
			'odd' => FALSE
		);
		$options = array_merge( $default_options, (array)$options );

		switch( $line_item->type() ) {

			case EEM_Line_Item::type_line_item:
				// item row
				$html .= $this->_item_row( $line_item, $options );
				// got any kids?
				foreach( $line_item->children() as $child_line_item ) {
					$this->display_line_item( $child_line_item, $options );
				}
				break;

			case EEM_Line_Item::type_sub_line_item:
				$html .= $this->_sub_item_row( $line_item, $options );
				break;

			case EEM_Line_Item::type_sub_total:
				$child_line_items = $line_item->children();
				// loop thru children
				foreach( $child_line_items as $child_line_item ) {
					// recursively feed children back into this method
					$html .= $this->display_line_item( $child_line_item, $options );
				}
				// only display subtotal if there are multiple child line items
				$html .= count( $child_line_items ) > 1 ? $this->_sub_total_row( $line_item, __('Sub-Total', 'event_espresso'), $options ) : '';
				break;

			case EEM_Line_Item::type_tax:
				if ( $this->_show_taxes ) {
					$html .= $this->_tax_row( $line_item, $options );
				}
				break;

			case EEM_Line_Item::type_tax_sub_total:
				if ( $this->_show_taxes ) {
					// loop thru children
					foreach( $line_item->children() as $child_line_item ) {
						// recursively feed children back into this method
						$html .= $this->display_line_item( $child_line_item, $options );
					}
					$html .= $this->_total_row( $line_item, __('Tax Total', 'event_espresso'), $options );
				}
				break;

			case EEM_Line_Item::type_total:
				// loop thru children
				foreach( $line_item->children() as $child_line_item ) {
					// recursively feed children back into this method
					$html .= $this->display_line_item( $child_line_item, $options );
				}
				$html .= $this->_total_row( $line_item, __('Total', 'event_espresso'), $options );
				break;

		}

		return $html;
	}



	/**
	 * 	_total_row
	 *
	 * @param EE_Line_Item $line_item
	 * @param array        $options
	 * @return mixed
	 */
	private function _item_row( EE_Line_Item $line_item, $options = array() ) {
		// start of row
		$row_class = $options['odd'] ? 'item odd' : 'item';
		$html = EEH_HTML::tr( '', '', $row_class );
		// name && desc
		$name_and_desc = $line_item->name();
		$name_and_desc .= $options['show_desc'] ? '<span class="line-item-desc-spn smaller-text"> : ' . $line_item->desc() . '</span>'  : '';
		// name td
		$html .= EEH_HTML::td( $name_and_desc, '',  'item_l' );
		// quantity td
		$html .= EEH_HTML::td( $line_item->quantity(), '',  'item_l jst-rght' );
		if ( $line_item->percent() ) {
			// percent td
			$html .= EEH_HTML::td( $line_item->percent() . ' %', '',  'item_c jst-rght' );
		} else {
			// price td
			$html .= EEH_HTML::td( $line_item->unit_price_no_code(), '',  'item_c jst-rght' );
		}
		// total td
		$total = $line_item->is_taxable() ? $line_item->total_no_code() . '*' : $line_item->total_no_code();
		$this->_show_taxes = $line_item->is_taxable() ? TRUE : $this->_show_taxes;
		$html .= EEH_HTML::td( $total, '',  'item_r jst-rght' );
		// end of row
		$html .= EEH_HTML::trx();
		return $html;
	}



	/**
	 * 	_sub_item_row
	 *
	 * @param EE_Line_Item $line_item
	 * @param array        $options
	 * @return mixed
	 */
	private function _sub_item_row( EE_Line_Item $line_item, $options = array() ) {
		// start of row
		$html = EEH_HTML::tr( '', 'item sub-item-row' );
		// name && desc
		$name_and_desc = $line_item->name();
		$name_and_desc .= $options['show_desc'] ? '<span class="line-sub-item-desc-spn smaller-text"> : ' . $line_item->desc() . '</span>' : '';
		// name td
		$html .= EEH_HTML::td( $name_and_desc, '',  'item_l sub-item' );
		// discount/surcharge td
		if ( $line_item->is_percent() ) {
			$html .= EEH_HTML::td( $line_item->percent() . '%', '',  'item_c' );
		} else {
			$html .= EEH_HTML::td( $line_item->unit_price_no_code(), '',  'item_c jst-rght' );
		}
		// total td
		$html .= EEH_HTML::td( $line_item->total_no_code(), '',  'item_r jst-rght' );
		// end of row
		$html .= EEH_HTML::trx();
		return $html;
	}



	/**
	 * 	_tax_row
	 *
	 * @param EE_Line_Item $line_item
	 * @param array        $options
	 * @return mixed
	 */
	private function _tax_row( EE_Line_Item $line_item, $options = array() ) {
		// start of row
		$html = EEH_HTML::tr( '', 'item sub-item tax-total' );
		// name && desc
		$name_and_desc = $line_item->name();
		$name_and_desc .= $options['show_desc'] ? '<br/>' . $line_item->desc() : '';
		// name td
		$html .= EEH_HTML::td( $name_and_desc, '',  'item_l sub-item', '', ' colspan="2"' );
		// percent td
		$html .= EEH_HTML::td( $line_item->percent() . '%', '',  'item_c', '' );
		// total td
		$html .= EEH_HTML::td( $line_item->total_no_code(), '',  'item_r jst-rght' );
		// end of row
		$html .= EEH_HTML::trx();
		return $html;
	}



	/**
	 * 	_total_row
	 *
	 * @param EE_Line_Item $line_item
	 * @param string       $text
	 * @param array        $options
	 * @return mixed
	 */
	private function _sub_total_row( EE_Line_Item $line_item, $text = '', $options = array() ) {
		if ( $line_item->total() ) {
			return $this->_total_row( $line_item, $text, $options);
		}
		return '';
	}



	/**
	 * 	_total_row
	 *
	 * @param EE_Line_Item $line_item
	 * @param string       $text
	 * @param array        $options
	 * @return mixed
	 */
	private function _total_row( EE_Line_Item $line_item, $text = '', $options = array() ) {
		$html = '';
		if ( $line_item->total() ) {
			// start of row
			$html = EEH_HTML::tr( '', '', 'total_tr odd' );
			// empty td
			$html .= EEH_HTML::td( $line_item->desc(), '',  'jst-rght',  '',  ' colspan="2"' );
			// total td
			$html .= EEH_HTML::td( $text, '',  'total_currency total jst-rght' );
			// total td
			$html .= EEH_HTML::td( $line_item->total_no_code(), '',  'total jst-rght' );
			// end of row
			$html .= EEH_HTML::trx();
		}
		return $html;
	}



	/**
	 * 	_separator_row
	 *
	 * @param array        $options
	 * @return mixed
	 */
	private function _separator_row( $options = array() ) {
		// start of row
		$html = EEH_HTML::tr( EEH_HTML::td( '<hr>', '',  '',  '',  ' colspan="4"' ));
		return $html;
	}


}
// End of file EE_SPCO_Line_Item_Display_Strategy.strategy.php
// Location: /EE_SPCO_Line_Item_Display_Strategy.strategy.php