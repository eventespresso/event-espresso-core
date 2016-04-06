<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
 /**
 *
 * Class EE_Invoice_Line_Item_Display_Strategy
 *
 * Description
 *
 * @package         Event Espresso
 * @subpackage    core
 * @author				Brent Christensen
 * @since		 	   $VID:$
 *
 */
class EE_Invoice_Line_Item_Display_Strategy implements EEI_Line_Item_Display {

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
					$html .= $this->display_line_item( $child_line_item, $options );
				}
				$html .= $this->_separator_row( $options );
				$html .= $this->_total_row( $line_item, __('Total', 'event_espresso'), $options );
				 break;


			case EEM_Line_Item::type_sub_total:
				// loop thru children
				foreach( $line_item->children() as $child_line_item ) {
					// recursively feed children back into this method
					$html .= $this->display_line_item( $child_line_item, $options );
				}
				$html .= $this->_total_row( $line_item, __('Sub-Total', 'event_espresso'), $options );
				break;


			case EEM_Line_Item::type_tax_sub_total:
				// loop thru children
				foreach( $line_item->children() as $child_line_item ) {
					// recursively feed children back into this method
					$html .= $this->display_line_item( $child_line_item, $options );
				}
				$html .= $this->_total_row( $line_item, __('Tax Total', 'event_espresso'), $options );
				break;


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


			case EEM_Line_Item::type_tax:
				$html .= $this->_tax_row( $line_item, $options );
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
		$html = EEH_HTML::tr( '', $row_class );
		// name td
		$html .= EEH_HTML::td( $line_item->name(), '',  'item_l' );
		// desc td
		$html .= $options['show_desc'] ? EEH_HTML::td( $line_item->desc(), '',  'item_l' ) : '';
		// quantity td
		$html .= EEH_HTML::td( $line_item->quantity(), '',  'item_l' );
		// price td
		$html .= EEH_HTML::td( $line_item->unit_price_no_code(), '',  'item_c' );
		// total td
		$total = $line_item->is_taxable() ? $line_item->total_no_code() . '*' : $line_item->total_no_code();
		$html .= EEH_HTML::td( $total, '',  'item_r' );
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
		// name td
		$html .= EEH_HTML::td( $line_item->name(), '',  'item_l sub-item' );
		// desc td
		$html .= $options['show_desc'] ? EEH_HTML::td( $line_item->desc(), '',  'item_l' ) : '';
		$html .= EEH_HTML::td() . EEH_HTML::tdx();
		// discount/surcharge td
		if ( $line_item->is_percent() ) {
			$html .= EEH_HTML::td( $line_item->percent() . '%', '',  'item_c' );
		} else {
			$html .= EEH_HTML::td( $line_item->unit_price_no_code(), '',  'item_c' );
		}
		// total td
		$html .= EEH_HTML::td( $line_item->total_no_code(), '',  'item_r' );
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
		// name td
		$html .= EEH_HTML::td( $line_item->name(), '',  'item_l sub-item' );
		// desc td
		$html .= $options['show_desc'] ? EEH_HTML::td( $line_item->desc(), '',  'item_l' ) : '';
		// percent td
		$html .= EEH_HTML::td( $line_item->percent() . '%', '',  'item_c', '', ' colspan="2"' );
		// total td
		$html .= EEH_HTML::td( $line_item->total_no_code(), '',  'item_r' );
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
	private function _total_row( EE_Line_Item $line_item, $text = '', $options = array() ) {
		// colspan
		$colspan = $options['show_desc'] ? ' colspan="2"' : '';
		// start of row
		$html = EEH_HTML::tr( '', '', 'total_tr odd' );
		// empty td
		$html .= EEH_HTML::td( EEH_HTML::nbsp(), '',  '',  '',  $colspan );
		// total td
		$html .= EEH_HTML::td( $text, '',  'total_currency total',  '',  $colspan );
		// total td
		$html .= EEH_HTML::td( $line_item->total_no_code(), '',  'total' );
		// end of row
		$html .= EEH_HTML::trx();
		return $html;
	}



	/**
	 * 	_separator_row
	 *
	 * @param array        $options
	 * @return mixed
	 */
	private function _separator_row( $options = array() ) {
		// colspan
		$colspan = $options['show_desc'] ? ' colspan="5"' : ' colspan="4"';
		// start of row
		$html = EEH_HTML::tr( EEH_HTML::td( '<hr>', '',  '',  '',  $colspan ));
//		// separator td
//		$html .= EEH_HTML::td( '<hr>', '',  '',  '',  $colspan );
//		// end of row
//		$html .= EEH_HTML::trx();
		return $html;
	}


}
// End of file EE_Invoice_Line_Item_Display_Strategy.strategy.php
// Location: /EE_Invoice_Line_Item_Display_Strategy.strategy.php