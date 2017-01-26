<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
 /**
 *
 * Class EE_Default_Line_Item_Display_Strategy
 *
 * Description
 *
 * @package         Event Espresso
 * @subpackage    core
 * @author				Brent Christensen
 * @since		 	   $VID:$
 *
 */

class EE_Default_Line_Item_Display_Strategy implements EEI_Line_Item_Display {

	/**
	 * total amount of tax to apply
	 * @type float $_tax_rate
	 */
	private $_tax_rate = 0;

	/**
	 * total amount including tax we can bill for at this time
	 * @type float $_grand_total
	 */
	private $_grand_total = 0.00;

	/**
	 * total number of items being billed for
	 * @type int $_total_items
	 */
	private $_total_items = 0;



	/**
	 * @return float
	 */
	public function grand_total() {
		return $this->_grand_total;
	}



	/**
	 * @return int
	 */
	public function total_items() {
		return $this->_total_items;
	}



	/**
	 * @param EE_Line_Item $line_item
	 * @param array        $options
	 * @return mixed
	 */
	public function display_line_item( EE_Line_Item $line_item, $options = array() ) {

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
				foreach ( $line_item->children() as $child_line_item ) {
					$this->display_line_item( $child_line_item, $options );
				}
				break;

			case EEM_Line_Item::type_sub_line_item:
				$html .= $this->_sub_item_row( $line_item, $options );
				break;

			case EEM_Line_Item::type_sub_total:
				break;

			case EEM_Line_Item::type_tax:
				$this->_tax_rate += $line_item->percent();
				break;

			case EEM_Line_Item::type_tax_sub_total:
				foreach ( $line_item->children() as $child_line_item ) {
					if ( $child_line_item->type() == EEM_Line_Item::type_tax ) {
						// recursively feed children back into this method
						$this->display_line_item( $child_line_item, $options );
					}
				}
				break;

			case EEM_Line_Item::type_total:
				// get all child line items
				$children = $line_item->children();
				if ( $options[ 'set_tax_rate' ] === true  ) {
					// loop thru tax child line items just to determine tax rate
					foreach ( $children as $child_line_item ) {
						if ( $child_line_item->type() == EEM_Line_Item::type_tax_sub_total ) {
							// recursively feed children back into this method
							$this->display_line_item( $child_line_item, $options );
						}
					}
				} else {
					// now loop thru all non-tax child line items
					foreach ( $children as $child_line_item ) {
						if ( $child_line_item->type() != EEM_Line_Item::type_tax_sub_total ) {
							// recursively feed children back into this method
							$html .= $this->display_line_item( $child_line_item, $options );
						}
					}
				}
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
		$name_and_desc = apply_filters(
			'FHEE__EE_Default_Line_Item_Display_Strategy__item_row__name',
			$line_item->name(),
			$line_item
		);
		$name_and_desc .= apply_filters(
			'FHEE__EE_Default_Line_Item_Display_Strategy__item_row__desc',
			( $options['show_desc'] ? '<span class="line-item-desc-spn smaller-text">: ' . $line_item->desc() . '</span>' : '' ),
			$line_item,
			$options
		);
		if ( $line_item->is_taxable() ) {
			$ticket_price_includes_taxes = EE_Registry::instance()->CFG->tax_settings->prices_displayed_including_taxes
				? __( '* price includes taxes', 'event_espresso' )
				: __( '* price does not include taxes', 'event_espresso' );
			$name_and_desc .= '<span class="smaller-text lt-grey-text" style="margin:0 0 0 2em;">'
				  . $ticket_price_includes_taxes
				  . '</span>';
		}

		// name td
		$html .= EEH_HTML::td( $name_and_desc, '',  'item_l' );
		// quantity td
		$html .= EEH_HTML::td( $line_item->quantity(), '',  'item_l jst-rght' );
		$tax_rate = $line_item->is_taxable()
		            && EE_Registry::instance()->CFG->tax_settings->prices_displayed_including_taxes
			? 1 + ( $this->_tax_rate / 100 )
			: 1;
		// price td
		$unit_price = EEH_Template::format_currency( $line_item->unit_price() * $tax_rate, false, false );
		$html .= EEH_HTML::td( $unit_price, '',  'item_c jst-rght' );
		// total td
		$total = EEH_Template::format_currency( $line_item->unit_price() * $line_item->quantity() * $tax_rate, false, false );
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
		$name_and_desc .= $options['show_desc'] ? '<span class="line-sub-item-desc-spn smaller-text">: ' . $line_item->desc() . '</span>' : '';
		// name td
		$html .= EEH_HTML::td( /*__FUNCTION__ .*/ $name_and_desc, '',  'item_l sub-item' );
		// discount/surcharge td
		if ( $line_item->is_percent() ) {
			$html .= EEH_HTML::td( $line_item->percent() . '%', '',  'item_c' );
		} else {
			$html .= EEH_HTML::td( $line_item->unit_price_no_code(), '',  'item_c jst-rght' );
		}
		// total td
		$html .= EEH_HTML::td( EEH_Template::format_currency( $line_item->total(), false, false ), '',  'item_r jst-rght' );
		// end of row
		$html .= EEH_HTML::trx();
		return $html;
	}



}
// End of file EE_Default_Line_Item_Display_Strategy.strategy.php
// Location: /core/libraries/line_item_display/EE_Default_Line_Item_Display_Strategy.strategy.php