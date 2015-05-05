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
	 * whether to display the taxes row or not
	 * @type bool $_show_taxes
	 */
	private $_show_taxes = FALSE;

	/**
	 * html for any tax rows
	 * @type string $_show_taxes
	 */
	private $_taxes_html = '';

	/**
	 * array of tickets for events with Not Approved Reg Status
	 * @type EE_Ticket[] $_do_not_bill
	 */
	private $_do_not_bill = array();

	/**
	 * total amount we can bill for at this time (pre-tax)
	 * @type float $_billable_total
	 */
	private $_billable_total = 0.00;

	/**
	 * total amount we can NOT bill for at this time (pre-tax)
	 * @type float $_non_billable_total
	 */
	private $_non_billable_total = 0.00;

	/**
	 * total billable amount for taxable items (pre-tax)
	 *
*@type float $_billable_tax_total
	 */
	private $_billable_tax_total = 0.00;

	/**
	 * total NON billable amount for taxable items (pre-tax)
	 * @type float $_non_billable_tax_total
	 */
	private $_non_billable_tax_total = 0.00;

	/**
	 * total tax amount we can bill for at this time
	 * @type float $_total_tax
	 */
	private $_total_tax = 0.00;

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

		EE_Registry::instance()->load_helper( 'Template' );
		EE_Registry::instance()->load_helper( 'HTML' );

		$html = '';
		// set some default options and merge with incoming
		$default_options = array(
			'show_desc' => TRUE,  // 	TRUE 		FALSE
			'odd' => FALSE
		);
		$options = array_merge( $default_options, (array)$options );

		if ( isset( $options['events_requiring_pre_approval'] )) {
			$this->_process_events_requiring_pre_approval( $options[ 'events_requiring_pre_approval' ] );
		}

		switch( $line_item->type() ) {

			case EEM_Line_Item::type_line_item:
				if ( $this->_is_billable( $line_item )) {
					// item row
					$html .= $this->_item_row( $line_item, $options );
					// got any kids?
					foreach ( $line_item->children() as $child_line_item ) {
						$html .= $this->display_line_item( $child_line_item, $options );
					}
				}
				break;

			case EEM_Line_Item::type_sub_line_item:
				$html .= $this->_sub_item_row( $line_item, $options );
				break;

			case EEM_Line_Item::type_sub_total:
				static $sub_total = 0;
				$child_line_items = $line_item->children();
				// loop thru children
				foreach( $child_line_items as $child_line_item ) {
					// recursively feed children back into this method
					$html .= $this->display_line_item( $child_line_item, $options );
				}
				if ( $line_item->total() != $sub_total && count( $child_line_items ) > 1 ) {
					$html .= $this->_sub_total_row( $line_item, __('Sub-Total', 'event_espresso'), $options );
					$sub_total = $line_item->total();
				}
				break;

			case EEM_Line_Item::type_tax:
				if ( $this->_show_taxes ) {
					$this->_taxes_html .= $this->_tax_row( $line_item, $options );
				}
				break;

			case EEM_Line_Item::type_tax_sub_total:
				if ( $this->_show_taxes ) {
					// loop thru children
					foreach( $line_item->children() as $child_line_item ) {
						// recursively feed children back into this method
						$html .= $this->display_line_item( $child_line_item, $options );
					}
					$this->_taxes_html .= $this->_total_tax_row( $line_item, __('Tax Total', 'event_espresso'), $options );
				}
				break;

			case EEM_Line_Item::type_total:
				// determine whether to display taxes or not
				$this->_show_taxes = $line_item->get_total_tax() > 0 ? true : false;
				// loop thru children
				foreach( $line_item->children() as $child_line_item ) {
					// recursively feed children back into this method
					$html .= $this->display_line_item( $child_line_item, $options );
				}
				$html .= $this->_taxes_html;
				$html .= $this->_total_row( $line_item, __('Total', 'event_espresso'), $options );
				$html .= $this->_payments_and_amount_owing_rows( $line_item );
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
			'FHEE__EE_SPCO_Line_Item_Display_Strategy__item_row__name',
			$line_item->name(),
			$line_item
		);
		$name_and_desc .= apply_filters(
			'FHEE__EE_SPCO_Line_Item_Display_Strategy__item_row__desc',
			( $options['show_desc'] ? '<span class="line-item-desc-spn smaller-text"> : ' . $line_item->desc() . '</span>' : '' ),
			$line_item,
			$options
		);
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
		$total = EEH_Template::format_currency( $line_item->total(), false, false );
		$total .= $line_item->is_taxable() ? '*' : '';
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
		$html .= EEH_HTML::td( EEH_Template::format_currency( $line_item->total(), false, false ), '',  'item_r jst-rght' );
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
		$name_and_desc .= '<span class="tiny-text" style="margin:0 0 0 2em;">' . __( ' * taxable items', 'event_espresso' ) . '</span>';
		$name_and_desc .= $options[ 'show_desc' ] ? '<br/>' . $line_item->desc() : '';
		// name td
		$html .= EEH_HTML::td( $name_and_desc, '',  'item_l sub-item', '', ' colspan="2"' );
		// percent td
		$html .= EEH_HTML::td( $line_item->percent() . '%', '',  ' jst-rght', '' );
		// total td
		$total = $line_item->total() * ( $this->_billable_tax_total / ( $this->_billable_tax_total + $this->_non_billable_tax_total ) );
		$html .= EEH_HTML::td( EEH_Template::format_currency( $total, false, false ), '',  'item_r jst-rght' );
		// end of row
		$html .= EEH_HTML::trx();
		return $html;
	}



	/**
	 *    _total_row
	 *
	 * @param EE_Line_Item $line_item
	 * @param string $text
	 * @param array $options
	 * @return mixed
	 */
	private function _total_tax_row( EE_Line_Item $line_item, $text = '', $options = array() ) {
		$html = '';
		if ( $line_item->total() ) {
			// start of row
			$html = EEH_HTML::tr( '', '', 'total_tr odd' );
			// total td
			$html .= EEH_HTML::td( $text, '', 'total_currency total jst-rght', '', ' colspan="3"' );
			// total td
			$this->_total_tax = $line_item->total() * ( $this->_billable_tax_total / ( $this->_billable_tax_total + $this->_non_billable_tax_total ) );
			$html .= EEH_HTML::td( EEH_Template::format_currency( $this->_total_tax, false, false ), '', 'total jst-rght' );
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
			$total = $line_item->total() * ( $this->_billable_total / ( $this->_billable_total + $this->_non_billable_total ) );
			$html .= EEH_HTML::td( EEH_Template::format_currency( $total, false, false ), '', 'total jst-rght' );
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
	private function _total_row( EE_Line_Item $line_item, $text = '', $options = array() ) {
		$html = '';
		if ( $line_item->total() ) {
			// start of row
			$html = EEH_HTML::tr( '', '', 'total_tr odd' );
			// total td
			$html .= EEH_HTML::td( $text, '',  'total_currency total jst-rght',  '',  ' colspan="3"' );
			// total td
			$this->_grand_total = $this->_billable_total + $this->_total_tax;
			$html .= EEH_HTML::td( EEH_Template::format_currency( $this->_grand_total, false, false ), '',  'total jst-rght' );
			// end of row
			$html .= EEH_HTML::trx();
		}
		return $html;
	}



	/**
	 * 	_payments_and_amount_owing_rows
	 *
	 * @param EE_Line_Item $line_item
	 * @return mixed
	 */
	private function _payments_and_amount_owing_rows( EE_Line_Item $line_item ) {
		$html = '';
		$transaction = EEM_Transaction::instance()->get_one_by_ID( $line_item->TXN_ID() );
		if ( $transaction instanceof EE_Transaction ) {
			$payments = $transaction->approved_payments();
			if ( ! empty( $payments )) {
				$owing = $line_item->total();
				foreach ( $payments as $payment ) {
					if ( $payment instanceof EE_Payment ) {
						$owing = $owing - $payment->amount();
						$payment_desc = sprintf(
							__('Payment%1$s Received: %2$s', 'event_espresso'),
							$payment->txn_id_chq_nmbr() != '' ? ' ' . $payment->txn_id_chq_nmbr() : '',
							$payment->timestamp()
						);
						// start of row
						$html .= EEH_HTML::tr( '', '', 'total_tr odd' );
						// payment desc
						$html .= EEH_HTML::td( $payment_desc, '',  '',  '',  ' colspan="3"' );
						// total td
						$html .= EEH_HTML::td( EEH_Template::format_currency( $payment->amount(), false, false ), '',  'total jst-rght' );
						// end of row
						$html .= EEH_HTML::trx();
					}
				}
				if ( $line_item->total() ) {
					// start of row
					$html .= EEH_HTML::tr( '', '', 'total_tr odd' );
					// total td
					$html .= EEH_HTML::td( __('Amount Owing', 'event_espresso'), '',  'total_currency total jst-rght',  '',  ' colspan="3"' );
					// total td
					$html .= EEH_HTML::td( EEH_Template::format_currency( $owing, false, false ), '',  'total jst-rght' );
					// end of row
					$html .= EEH_HTML::trx();
				}
			}
		}
		return $html;
	}



	/**
	 *    _process_events_requiring_pre_approval
	 * compiles a list of EE_Tickets for each event in the passed array
	 *
	 * @param array $events_requiring_pre_approval
	 * @return mixed
	 */
	private function _process_events_requiring_pre_approval( $events_requiring_pre_approval = array() ) {
		if ( is_array( $events_requiring_pre_approval ) ) {
			foreach ( $events_requiring_pre_approval as $event ) {
				if ( $event instanceof EE_Event ) {
					$datetimes = $event->datetimes_ordered( false );
					if ( is_array( $datetimes )) {
						foreach ( $datetimes as $datetime ) {
							if ( $datetime instanceof EE_Datetime ) {
								$tickets = $datetime->ticket_types_available_for_purchase();
								if ( is_array( $tickets )) {
									foreach ( $tickets as $ticket ) {
										if ( $ticket instanceof EE_Ticket ) {
											$this->_do_not_bill[ $ticket->ID() ] = $ticket;
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}



	/**
	 *    _process_billable_total
	 *
	 * @param EE_Line_Item $line_item
	 * @return mixed
	 */
	private function _is_billable( EE_Line_Item $line_item ) {
		// is this a ticket ?
		if ( $line_item->OBJ_type() == 'Ticket' ) {
			// is it in the "do not bill" list?
			if ( isset( $this->_do_not_bill[ $line_item->OBJ_ID() ] )) {
				$this->_non_billable_total += $line_item->total();
				if ( $line_item->is_taxable() ) {
					$this->_non_billable_tax_total += $line_item->total();
				}
				return false;
			} else {
				$this->_billable_total += $line_item->total();
				$this->_total_items += $line_item->quantity();
				if ( $line_item->is_taxable() ) {
					$this->_billable_tax_total += $line_item->total();
				}
			}
		}
		return true;
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