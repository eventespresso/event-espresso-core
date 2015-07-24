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
	private $_show_taxes = FALSE;

	/**
	 * html for any tax rows
	 * @type string $_show_taxes
	 */
	private $_taxes_html = '';

	/**
	 * array of ticket IDs and their corresponding quantities for
	 * registrations that owe money and can pay at this moment
	 * @type array $_billable_ticket_quantities
	 */
	private $_billable_ticket_quantities = array();

	/**
	 * multidimensional array of line item IDs, there children (if any) and their associated totals
	 * @type array $_billable
	 */
	private $_line_item_totals = array();

	/**
	 * whether or not registrations have been separated into billable and non-billable items
	 * @type bool $_process_registrations
	 */
	private static $_process_registrations = true;

	/**
	 * tax rate to be used for tax calculations
	 * @type float $_tax_rate
	 */
	private $_tax_rate = 0.00;

	/**
	 * total tax amount we can bill for at this time
	 * @type float $_total_tax
	 */
	private $_total_tax = 0.00;

	/**
	 * total taxable amount being billed for at this time
	 * @type float $_taxable_total
	 */
	private $_taxable_total = 0.00;

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

		if ( isset( $options['registrations'] ) ) {
			$this->_process_billable_registrations( $options[ 'registrations' ] );
		}
		//echo '<h3 style="color:#E76700;line-height:1em;">' . $line_item->type() . ' : ' . $line_item->name() . '<br/><span style="font-size:9px;font-weight:normal;color:#666">' . __FILE__ . '</span>    <b style="font-size:10px;color:#333">  ' . __LINE__ . ' </b></h3>';

		switch( $line_item->type() ) {

			case EEM_Line_Item::type_line_item:
				$options[ 'billable_qty' ] = $this->_billable_qty( $line_item );
				//EEH_Debug_Tools::printr( $options[ 'billable_qty' ], 'billable_qty', __FILE__, __LINE__ );
				if ( $options[ 'billable_qty' ] ) {
					// item row
					$html .= $this->_ticket_row( $line_item, $options );
					// got any kids?
					foreach ( $line_item->children() as $child_line_item ) {
						$this->display_line_item( $child_line_item, $options );
					}
				} else if ( $line_item->OBJ_type() !== 'Ticket' ) {
					// item row
					$html .= $this->_item_row( $line_item, $options );
					// got any kids?
					foreach ( $line_item->children() as $child_line_item ) {
						$this->display_line_item( $child_line_item, $options );
					}
				}
				break;

			case EEM_Line_Item::type_sub_line_item:
				$html .= $this->_sub_item_row( $line_item, $options );
				break;

			case EEM_Line_Item::type_sub_total:
				static $sub_total = 0;
				$event_sub_total = 0;
				$text = __( 'Sub-Total', 'event_espresso' );
				if ( $line_item->OBJ_type() == 'Event' ) {
					$options[ 'event_id' ] = $event_id = $line_item->OBJ_ID();
					//echo '<h5 style="color:#2EA2CC;">event_id : <span style="color:#E76700">' . $options[ 'event_id' ] . '</span><br/><span style="font-size:9px;font-weight:normal;color:#666">' . __FILE__ . '</span>    <b style="font-size:10px;color:#333">  ' . __LINE__ . ' </b></h5>';
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
				//EEH_Debug_Tools::printr( $sub_total, '$sub_total', __FILE__, __LINE__ );
				//EEH_Debug_Tools::printr( $line_item->code(), '$line_item->code()', __FILE__, __LINE__ );
				//EEH_Debug_Tools::printr( count( $child_line_items ), 'count( $child_line_items )', __FILE__, __LINE__ );
				//EEH_Debug_Tools::printr( count( $this->_events ), 'count( $this->_events )', __FILE__, __LINE__ );
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
					$this->_tax_rate = $line_item->percent() / 100;
					//$this->_total_tax = $line_item->total() * $this->_tax_rate;
					$this->_total_tax = $this->_taxable_total * $this->_tax_rate;
					if ( count( $child_line_items ) > 1 ) {
						$this->_taxes_html .= $this->_total_tax_row( $line_item, __( 'Tax Total', 'event_espresso' ), $options );
					}
				}
				break;

			case EEM_Line_Item::type_total:
				$this->_line_item_totals = EEH_Line_Item::calculate_reg_final_prices_per_line_item( $line_item, $this->_billable_ticket_quantities );
				//EEH_Debug_Tools::printr( $this->_line_item_totals, '$this->_line_item_totals ', __FILE__, __LINE__ );
				// determine whether to display taxes or not
				$this->_taxable_total = isset( $this->_line_item_totals[ 'taxable' ][ 'total' ] ) ? $this->_line_item_totals['taxable']['total'] : 0.00;
				$this->_show_taxes = $this->_taxable_total > 0 ? true : false;
				$this->_grand_total = $this->_line_item_totals[ 'total' ];
				// get all child line items
				$children = $line_item->children();
				// loop thru all non-tax child line items
				foreach( $children as $child_line_item ) {
					if ( $child_line_item->type() != EEM_Line_Item::type_tax_sub_total ) {
						// recursively feed children back into this method
						$html .= $this->display_line_item( $child_line_item, $options );
					}
				}
				//EEH_Debug_Tools::printr( $this->_events, '$this->_events', __FILE__, __LINE__ );

				// now loop thru  tax child line items
				foreach( $children as $child_line_item ) {
					if ( $child_line_item->type() == EEM_Line_Item::type_tax_sub_total ) {
						// recursively feed children back into this method
						$html .= $this->display_line_item( $child_line_item, $options );
					}
				}
				$html .= $this->_taxes_html;
				$html .= $this->_total_row( __('Total', 'event_espresso') );

				//EEH_Debug_Tools::printr( $this->_taxable_total, '$this->_taxable_total', __FILE__, __LINE__ );
				//EEH_Debug_Tools::printr( $this->_tax_rate, '$this->_tax_rate', __FILE__, __LINE__ );
				//EEH_Debug_Tools::printr( $this->_total_tax, '$this->_total_tax', __FILE__, __LINE__ );
				//EEH_Debug_Tools::printr( $this->_grand_total, '$this->_grand_total', __FILE__, __LINE__ );

				//$html .= $this->_payments_and_amount_owing_rows( $line_item );
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
		$html .= EEH_HTML::td( EEH_HTML::strong( $line_item->desc() ), '', 'event-header', '', ' colspan="4"' );
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
		$html .= EEH_HTML::td( $options[ 'billable_qty' ], '', 'item_l jst-rght' );
		// determine total for line item
		$total = $line_item->unit_price() * $options[ 'billable_qty' ];
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
		$html .= EEH_HTML::td( $name_and_desc, '',  'item_l' );
		// price td
		if ( $line_item->is_percent() ) {
			$html .= EEH_HTML::td( $line_item->percent() . '%', '', 'item_c jst-rght' );
		} else {
			$html .= EEH_HTML::td( $line_item->unit_price_no_code(), '', 'item_c jst-rght' );
		}
		// quantity td
		$html .= EEH_HTML::td( $line_item->quantity(), '', 'item_l jst-rght' );
		$total = $line_item->total() * $line_item->quantity();
		$this->_events[ $options[ 'event_id' ] ] += $total;
		// total td
		$html .= EEH_HTML::td( EEH_Template::format_currency( $total, false, false ), '',  'item_r jst-rght' );
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
		$total = $this->_taxable_total * $line_item->percent() / 100;
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
			$html .= EEH_HTML::td( $text, '', 'total_currency total jst-rght', '', ' colspan="2"' );
			// empty td (price)
			$html .= EEH_HTML::td( EEH_HTML::nbsp() );
			// total td
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
			$html .= EEH_HTML::td( EEH_Template::format_currency( $options[ 'sub_total' ], false, false ), '', 'total jst-rght' );
			// end of row
			$html .= EEH_HTML::trx();
		}
		return $html;

	}



	/**
	 * 	_total_row
	 *
	 * @param string       $text
	 * @return mixed
	 */
	private function _total_row( $text = '' ) {
		// start of row
		$html = EEH_HTML::tr( '', '', 'spco-grand-total total_tr odd' );
		// total td
		$html .= EEH_HTML::td( $text, '',  'total_currency total jst-rght',  '',  ' colspan="3"' );
		// total td
		$html .= EEH_HTML::td( EEH_Template::format_currency( $this->_grand_total, false, false ), '',  'total jst-rght' );
		// end of row
		$html .= EEH_HTML::trx();
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
				foreach ( $payments as $payment ) {
					if ( $payment instanceof EE_Payment ) {
						//$owing = $owing - $payment->amount();
						$payment_desc = sprintf(
							__('Payment%1$s Received: %2$s', 'event_espresso'),
							$payment->txn_id_chq_nmbr() != '' ? ' <span class="small-text">(#' . $payment->txn_id_chq_nmbr() . ')</span> ' : '',
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
				//if ( $line_item->total() ) {
				//	// start of row
				//	$html .= EEH_HTML::tr( '', '', 'total_tr odd' );
				//	// total td
				//	$html .= EEH_HTML::td( __('Amount Owing', 'event_espresso'), '',  'total_currency total jst-rght',  '',  ' colspan="3"' );
				//	// total td
				//	$html .= EEH_HTML::td( EEH_Template::format_currency( $this->grand_total(), false, false ), '',  'total jst-rght' );
				//	// end of row
				//	$html .= EEH_HTML::trx();
				//}
			}
		}
		return $html;
	}



	/**
	 *    _process_registrations_requiring_payment
	 * compiles a list of EE_Tickets for each event in the passed array
	 *
	 * @param EE_Registration[] $registrations_requiring_payment
	 * @return mixed
	 */
	private function _process_billable_registrations( $registrations_requiring_payment = array() ) {
		if ( is_array( $registrations_requiring_payment ) && self::$_process_registrations ) {
			// these reg statuses require payment (if event is not free)
			$requires_payment = EEM_Registration::reg_statuses_that_allow_payment();
			foreach ( $registrations_requiring_payment as $registration ) {
				if ( ! $registration instanceof EE_Registration ) {
					break;
				}
				// make sure ticket qty is set
				if ( ! isset( $this->_billable_ticket_quantities[ $registration->ticket_ID() ] ) ) {
					$this->_billable_ticket_quantities[ $registration->ticket_ID() ] = 0;
				}
				// are we billing for this registration at this moment ?
				if (
					$registration->owes_monies_and_can_pay( $requires_payment ) ||
					(
						$registration->final_price() == 0 && in_array( $registration->status_ID(), $requires_payment )
					)
				) {
					// then increment the billable ticket quantity
					$this->_billable_ticket_quantities[ $registration->ticket_ID() ]++;
					$this->_total_items++;
				}
			}
			//EEH_Debug_Tools::printr( $this->_billable_ticket_quantities, '$this->_billable_ticket_quantities', __FILE__, __LINE__ );
		}
		self::$_process_registrations = false;
	}




	/**
	 *    _billable_qty
	 *
	 * @param EE_Line_Item $line_item
	 * @return int
	 */
	private function _billable_qty( EE_Line_Item $line_item ) {
		// is this a ticket ?
		if ( $line_item->OBJ_type() == 'Ticket' && isset( $this->_billable_ticket_quantities[ $line_item->OBJ_ID() ] ) ) {
			return $this->_billable_ticket_quantities[ $line_item->OBJ_ID() ];
		}
		return 0;
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