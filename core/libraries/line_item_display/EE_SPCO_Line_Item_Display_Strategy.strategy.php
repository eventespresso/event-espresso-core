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

	/**
	 * array of events
	 * @type EE_Line_Item[] $_events
	 */
	private $_events = array();

	/**
	 * whether to display the taxes row or not
	 * @type bool $_show_taxes
	 */
	private $_show_taxes = false;

	/**
	 * html for any tax rows
	 * @type string $_show_taxes
	 */
	private $_taxes_html = '';

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
	 * @param EE_Line_Item  $line_item
	 * @param array         $options
	 * @param \EE_Line_Item $parent_line_item
	 * @return mixed
	 */
	public function display_line_item( EE_Line_Item $line_item, $options = array(), EE_Line_Item $parent_line_item = null ) {

		$html = '';
		// set some default options and merge with incoming
		$default_options = array(
			'show_desc' => true,  // 	true 		false
			'odd' => false
		);
		$options = array_merge( $default_options, (array)$options );

		switch( $line_item->type() ) {

			case EEM_Line_Item::type_line_item:
				$this->_show_taxes = $line_item->is_taxable() ? true : $this->_show_taxes;
				if ( $line_item->OBJ_type() == 'Ticket' ) {
					// item row
					$html .= $this->_ticket_row( $line_item, $options );
				} else {
					// item row
					$html .= $this->_item_row( $line_item, $options );
				}
				if (
					apply_filters(
						'FHEE__EE_SPCO_Line_Item_Display_Strategy__display_line_item__display_sub_line_items',
						true
					)
				) {
					// got any kids?
					foreach ( $line_item->children() as $child_line_item ) {
						$html .= $this->display_line_item( $child_line_item, $options, $line_item );
					}
				}
				break;

			case EEM_Line_Item::type_sub_line_item:
				$html .= $this->_sub_item_row( $line_item, $options, $parent_line_item );
				break;

			case EEM_Line_Item::type_sub_total:
				static $sub_total = 0;
				$event_sub_total = 0;
				$text = __( 'Sub-Total', 'event_espresso' );
				if ( $line_item->OBJ_type() == 'Event' ) {
					$options[ 'event_id' ] = $event_id = $line_item->OBJ_ID();
					if ( ! isset( $this->_events[ $options[ 'event_id' ] ] ) ) {
						$event = EEM_Event::instance()->get_one_by_ID( $options[ 'event_id' ] );
						if ( $event instanceof EE_Event ) {
							if ( $event->default_registration_status() == EEM_Registration::status_id_not_approved ) {
								return '';
							}
						}
						$this->_events[ $options[ 'event_id' ] ] = 0;
						$html .= $this->_event_row( $line_item );
						$text = __( 'Event Sub-Total', 'event_espresso' );
					}
				}
				$child_line_items = $line_item->children();
				// loop thru children
				foreach( $child_line_items as $child_line_item ) {
					// recursively feed children back into this method
					$html .= $this->display_line_item( $child_line_item, $options );
				}
				$event_sub_total += isset( $options[ 'event_id' ] ) ? $this->_events[ $options[ 'event_id' ] ] : 0;
				$sub_total += $event_sub_total;
				if (
					(
						// event subtotals
						$line_item->code() != 'pre-tax-subtotal' &&
						count( $child_line_items ) > 1
					)
					||
					(
						// pre-tax subtotals
						$line_item->code() == 'pre-tax-subtotal' &&
						count( $this->_events ) > 1
					)
				) {
					$options['sub_total'] = $line_item->OBJ_type() == 'Event' ? $event_sub_total : $sub_total;
					$html .= $this->_sub_total_row( $line_item, $text, $options );
				}
				break;

			case EEM_Line_Item::type_tax:
				if ( $this->_show_taxes ) {
					$this->_taxes_html .= $this->_tax_row( $line_item, $options );
				}
				break;

			case EEM_Line_Item::type_tax_sub_total:
				if ( $this->_show_taxes ) {
					$child_line_items = $line_item->children();
					// loop thru children
					foreach( $child_line_items as $child_line_item ) {
						// recursively feed children back into this method
						$html .= $this->display_line_item( $child_line_item, $options );
					}
					if ( count( $child_line_items ) > 1 ) {
						$this->_taxes_html .= $this->_total_tax_row( $line_item, __( 'Tax Total', 'event_espresso' ) );
					}
				}
				break;

			case EEM_Line_Item::type_total:
				// get all child line items
				$children = $line_item->children();
				// loop thru all non-tax child line items
				foreach( $children as $child_line_item ) {
					if ( $child_line_item->type() != EEM_Line_Item::type_tax_sub_total ) {
						// recursively feed children back into this method
						$html .= $this->display_line_item( $child_line_item, $options );
					}
				}

				// now loop thru  tax child line items
				foreach( $children as $child_line_item ) {
					if ( $child_line_item->type() == EEM_Line_Item::type_tax_sub_total ) {
						// recursively feed children back into this method
						$html .= $this->display_line_item( $child_line_item, $options );
					}
				}
				$html .= $this->_taxes_html;
				$html .= $this->_total_row( $line_item, __('Total', 'event_espresso') );


				$html .= $this->_payments_and_amount_owing_rows( $line_item, $options );
				break;

		}
		return $html;
	}



	/**
	 *    _event_row - basically a Heading row displayed once above each event's ticket rows
	 *
	 * @param EE_Line_Item $line_item
	 * @return mixed
	 */
	private function _event_row( EE_Line_Item $line_item ) {
		// start of row
		$html = EEH_HTML::tr( '', 'event-cart-total-row', 'total_tr odd' );
		// event name td
		$html .= EEH_HTML::td( EEH_HTML::strong( $line_item->name() ), '', 'event-header', '', ' colspan="4"' );
		// end of row
		$html .= EEH_HTML::trx();
		return $html;
	}



	/**
	 *    _ticket_row
	 *
	 * @param EE_Line_Item $line_item
	 * @param array        $options
	 * @return mixed
	 */
	private function _ticket_row( EE_Line_Item $line_item, $options = array() ) {
		// start of row
		$row_class = $options['odd'] ? 'item odd' : 'item';
		$html = EEH_HTML::tr( '', '', $row_class );
		// name && desc
		$name_and_desc = apply_filters(
			'FHEE__EE_SPCO_Line_Item_Display_Strategy__item_row__name',
			$line_item->name(),
			$line_item
		);
		$name_and_desc .= apply_filters(
			'FHEE__EE_SPCO_Line_Item_Display_Strategy__item_row__desc',
			( $options['show_desc'] ? '<span class="line-item-desc-spn smaller-text">: ' . $line_item->desc() . '</span>' : '' ),
			$line_item,
			$options
		);
		$name_and_desc .= $line_item->is_taxable() ? ' * ' : '';
		// name td
		$html .= EEH_HTML::td( /*__FUNCTION__ .*/ $name_and_desc, '',  'item_l' );
		// price td
		$html .= EEH_HTML::td( $line_item->unit_price_no_code(), '',  'item_c jst-rght' );
		// quantity td
		$html .= EEH_HTML::td( $line_item->quantity(), '', 'item_l jst-rght' );
		$this->_total_items += $line_item->quantity();
		// determine total for line item
		$total = $line_item->total();
		$this->_events[ $options[ 'event_id' ] ] += $total;
		// total td
		$html .= EEH_HTML::td( EEH_Template::format_currency( $total, false, false ), '',  'item_r jst-rght' );
		// end of row
		$html .= EEH_HTML::trx();
		return $html;
	}



	/**
	 *    _item_row
	 *
	 * @param EE_Line_Item $line_item
	 * @param array        $options
	 * @return mixed
	 */
	private function _item_row( EE_Line_Item $line_item, $options = array() ) {
		// start of row
		$row_class = $options['odd'] ? 'item odd' : 'item';
		$html = EEH_HTML::tr( '', '', $row_class );
		$obj_name = $line_item->OBJ_type() ? $line_item->OBJ_type_i18n() . ': ' : '';
		// name && desc
		$name_and_desc = apply_filters(
			'FHEE__EE_SPCO_Line_Item_Display_Strategy__item_row__name',
			 $obj_name . $line_item->name(),
			$line_item
		);
		$name_and_desc .= apply_filters(
			'FHEE__EE_SPCO_Line_Item_Display_Strategy__item_row__desc',
			( $options['show_desc'] ? '<span class="line-item-desc-spn smaller-text">: ' . $line_item->desc() . '</span>' : '' ),
			$line_item,
			$options
		);
		$name_and_desc .= $line_item->is_taxable() ? ' * ' : '';
		// name td
		$html .= EEH_HTML::td( $name_and_desc, '',  'item_l' );
		// price td
		if ( $line_item->is_percent() ) {
			$html .= EEH_HTML::td( $line_item->percent() . '%', '', 'item_c jst-rght' );
		} else {
			$html .= EEH_HTML::td( $line_item->unit_price_no_code(), '', 'item_c jst-rght' );
		}
		// quantity td
		$html .= EEH_HTML::td( $line_item->quantity(), '', 'item_l jst-rght' );
		//$total = $line_item->total() * $line_item->quantity();
		$total = $line_item->total();
		if( isset( $options[ 'event_id' ] ) && isset( $this->_events[ $options[ 'event_id' ] ] ) ) {
			$this->_events[ $options[ 'event_id' ] ] += $total;
		}
		// total td
		$html .= EEH_HTML::td( EEH_Template::format_currency( $total, false, false ), '',  'item_r jst-rght' );
		// end of row
		$html .= EEH_HTML::trx();
		return $html;
	}



	/**
	 *    _sub_item_row
	 *
	 * @param EE_Line_Item  $line_item
	 * @param array         $options
	 * @param \EE_Line_Item $parent_line_item
	 * @return mixed
	 */
	private function _sub_item_row( EE_Line_Item $line_item, $options = array(), EE_Line_Item $parent_line_item = null ) {
		// start of row
		$html = EEH_HTML::tr( '', '', 'item sub-item-row' );
		// name && desc
		$name_and_desc = EEH_HTML::span('', '', 'sub-item-row-bullet dashicons dashicons-arrow-right' ) . $line_item->name();
		$name_and_desc .= $options['show_desc'] ? '<span class="line-sub-item-desc-spn smaller-text">: ' . $line_item->desc() . '</span>' : '';
		// name td
		$html .= EEH_HTML::td( /*__FUNCTION__ .*/ $name_and_desc, '',  'item_l sub-item' );
		// discount/surcharge td
		if ( $line_item->is_percent() ) {
			$html .= EEH_HTML::td(
				EEH_Template::format_currency(
					$line_item->total() / $parent_line_item->quantity(),
					false, false
				),
				'',  'item_c jst-rght'
			);
		} else {
			$html .= EEH_HTML::td( $line_item->unit_price_no_code(), '',  'item_c jst-rght' );
		}
		// no quantity td
		$html .= EEH_HTML::td();
		// no total td
		$html .= EEH_HTML::td();
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
		$name_and_desc .= '<span class="smaller-text lt-grey-text" style="margin:0 0 0 2em;">' . __( ' * taxable items', 'event_espresso' ) . '</span>';
		$name_and_desc .= $options[ 'show_desc' ] ? '<br/>' . $line_item->desc() : '';
		// name td
		$html .= EEH_HTML::td( /*__FUNCTION__ .*/ $name_and_desc, '',  'item_l sub-item' );
		// percent td
		$html .= EEH_HTML::td( $line_item->percent() . '%', '',  ' jst-rght', '' );
		// empty td (price)
		$html .= EEH_HTML::td( EEH_HTML::nbsp() );
		// total td
		$html .= EEH_HTML::td( EEH_Template::format_currency( $line_item->total(), false, false ), '',  'item_r jst-rght' );
		// end of row
		$html .= EEH_HTML::trx();
		return $html;
	}



	/**
	 *    _total_row
	 *
	 * @param EE_Line_Item $line_item
	 * @param string $text
	 * @return mixed
	 */
	private function _total_tax_row( EE_Line_Item $line_item, $text = '' ) {
		$html = '';
		if ( $line_item->total() ) {
			// start of row
			$html = EEH_HTML::tr( '', '', 'total_tr odd' );
			// total td
			$html .= EEH_HTML::td( $text, '', 'total_currency total jst-rght', '', ' colspan="2"' );
			// empty td (price)
			$html .= EEH_HTML::td( EEH_HTML::nbsp() );
			// total td
			$html .= EEH_HTML::td( EEH_Template::format_currency( $line_item->total(), false, false ), '', 'total jst-rght' );
			// end of row
			$html .= EEH_HTML::trx();
		}
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
		$html = '';
		if ( $line_item->total() ) {
			// start of row
			$html = EEH_HTML::tr( '', '', 'total_tr odd' );
			// total td
			$html .= EEH_HTML::td( $text, '', 'total_currency total jst-rght', '', ' colspan="3"' );
			// total td
			$html .= EEH_HTML::td( EEH_Template::format_currency( $options[ 'sub_total' ], false, false ), '', 'total jst-rght' );
			// end of row
			$html .= EEH_HTML::trx();
		}
		return $html;

	}



	/**
	 * 	_total_row
	 *
	 * @param EE_Line_Item $line_item
	 * @param string       $text
	 * @return mixed
	 */
	private function _total_row( EE_Line_Item $line_item, $text = '' ) {
		// start of row
		$html = EEH_HTML::tr( '', '', 'spco-grand-total total_tr odd' );
		// total td
		$html .= EEH_HTML::td( $text, '',  'total_currency total jst-rght',  '',  ' colspan="3"' );
		// total td
		$html .= EEH_HTML::td( EEH_Template::format_currency( $line_item->total(), false, false ), '',  'total jst-rght' );
		// end of row
		$html .= EEH_HTML::trx();
		return $html;
	}



	/**
	 *    _payments_and_amount_owing_rows
	 *
	 * @param EE_Line_Item $line_item
	 * @param array        $options
	 * @return mixed
	 */
	private function _payments_and_amount_owing_rows( EE_Line_Item $line_item, $options = array() ) {
		$html = '';
		$owing = $line_item->total();
		$transaction = EEM_Transaction::instance()->get_one_by_ID( $line_item->TXN_ID() );
		if ( $transaction instanceof EE_Transaction ) {
			$registration_payments = array();
			$registrations = ! empty( $options['registrations'] )
				? $options[ 'registrations' ]
				: $transaction->registrations();
			foreach ( $registrations as $registration ) {
				if ( $registration instanceof EE_Registration && $registration->owes_monies_and_can_pay() ) {
					$registration_payments = $registration_payments + $registration->registration_payments();
				}
			}
			if ( ! empty( $registration_payments )) {
				foreach ( $registration_payments as $registration_payment ) {
					if ( $registration_payment instanceof EE_Registration_Payment ) {
						$owing = $owing - $registration_payment->amount();
						$payment = $registration_payment->payment();
						if ( $payment instanceof EE_Payment ) {
							$payment_desc = sprintf(
								__( 'Payment%1$s Received: %2$s', 'event_espresso' ),
								$payment->txn_id_chq_nmbr() != ''
									? ' <span class="small-text">(#' . $payment->txn_id_chq_nmbr() . ')</span> '
									: '',
								$payment->timestamp()
							);
						} else {
							$payment_desc = '';
						}
						// start of row
						$html .= EEH_HTML::tr( '', '', 'total_tr odd' );
						// payment desc
						$html .= EEH_HTML::td( $payment_desc, '', '', '', ' colspan="3"' );
						// total td
						$html .= EEH_HTML::td(
							EEH_Template::format_currency( $registration_payment->amount(), false, false ),
							'',
							'total jst-rght'
						);
						// end of row
						$html .= EEH_HTML::trx();
					}
				}
				if ( $line_item->total() ) {
					// start of row
					$html .= EEH_HTML::tr( '', '', 'total_tr odd' );
					// total td
					$html .= EEH_HTML::td(
						__('Amount Owing', 'event_espresso'),
						'',  'total_currency total jst-rght',  '',  ' colspan="3"'
					);
					// total td
					$html .= EEH_HTML::td(
						EEH_Template::format_currency( $owing, false, false ), '',  'total jst-rght'
					);
					// end of row
					$html .= EEH_HTML::trx();
				}
			}
		}
		$this->_grand_total = $owing;
		return $html;
	}


}
// End of file EE_SPCO_Line_Item_Display_Strategy.strategy.php
// Location: /EE_SPCO_Line_Item_Display_Strategy.strategy.php