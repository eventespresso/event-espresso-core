<?php

if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link				http://www.eventespresso.com
 * @ version		 	3.2
 *
 * ------------------------------------------------------------------------
 *
 * EE_Transaction_Shortcodes
 * 
 * this is a child class for the EE_Shortcodes library.  The EE_Transaction_Shortcodes lists all shortcodes related to transaction specific info.
 *
 * NOTE: if a method doesn't have any phpdoc commenting the details can be found in the comments in EE_Shortcodes parent class.
 * 
 * @package		Event Espresso
 * @subpackage	libraries/shortcodes/EE_Transaction_Shortcodes.lib.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Transaction_Shortcodes extends EE_Shortcodes {

	public function __construct() {
		parent::__construct();
	}


	protected function _init_props() {
		$this->label = __("Transaction Shortcodes", 'event_espresso');
		$this->description = __('All shortcodes specific to transaction related data', 'event_espresso');
		$this->_shortcodes = array(
			'[TXN_ID]' => __('The transaction id for the purchase.', 'event_espresso'),
			'[PAYMENT_URL]' => __('This is a link to make a payment for the event', 'event_espresso'),
			'[INVOICE_LINK]' => __('This is a link to the invoice', 'event_espresso'),
			'[TOTAL_COST]' => __('The total cost for the registration', 'event_espresso'),
			'[EVENT_PRICE]' => __('The price of the given event', 'event_espresso'),
			'[PAYMENT_STATUS]' => __('The payment status for the transaction', 'event_espresso'),
			'[PAYMENT_GATEWAY]' => __('The payment gateway used for the transaction', 'event_espresso'),
			'[AMOUNT_PAID]' => __('The amount paid with a payment', 'event_espresso'),
			'[TOTAL_OWEING]' => __('The total oweing on a transaction', 'event_espresso')
			);
	}


	protected function _parser( $shortcode ) {

		switch ( $shortcode ) {
			case '[TXN_ID]' :
				return isset($this->_data->txn->ID) ? $this->_data->txn->ID : '';
				break;

			case '[PAYMENT_URL]' :
				$payment_url = $this->_data->txn->payment_overview_url();
				return empty( $payment_url ) ? __( 'http://dummypaymenturlforpreview.com', 'event_espresso') : $payment_url;
				break;

			case '[INVOICE_LINK]' :
				$invoice_link = $this->_data->txn->invoice_url();
				return empty( $invoice_link ) ? __('http://dummyinvoicelinkforpreview.com', 'event_espresso') : $invoice_link;
				break; /**/


			case "[TOTAL_COST]" :
				global $org_options;
				$currency_symbol = isset( $org_options['currency_symbol'] ) ? $org_options['currency_symbol'] : '';
				$total = $this->_data->txn->total();
				return !empty($total) ? $currency_symbol . number_format($total, 2) : '';
				break;

			case "[EVENT_PRICE]" :
				global $org_options;
				$currency_symbol = isset( $org_options['currency_symbol'] ) ? $org_options['currency_symbol'] : '';
				return isset($this->_data['price']) ? $currency_symbol . number_format($this->_data['price'], 2) : '';
				break;

			case "[PAYMENT_STATUS]" :
				$status = $this->_data->txn->pretty_status();
				return !empty($status) ? $status : __('Unknown', 'event_espresso');
				break; /**/

			case "[PAYMENT_GATEWAY]" :
				return $this->_get_payment_gateway();
				break;

			case "[AMOUNT_PAID]" :
				global $org_options;
				$currency_symbol = isset( $org_options['currency_symbol'] ) ? $org_options['currency_symbol'] : '';
				$amount = isset( $this->_data->payment ) && is_object( $this->_data->payment ) ? $this->_data->payment->amount() : 0;
				return $currency_symbol . number_format( $amount, 2);
				break;

			case "[TOTAL_OWEING]" :
				global $org_options;
				$currency_symbol = isset( $org_options['currency_symbol'] ) ? $org_options['currency_symbol'] : '';
				$total_oweing = isset( $this->_data->txn ) && is_object($this->_data->txn) ? $this->_data->txn->remaining() : $this->_data->txn->total();
				return $currency_symbol . number_format( $total_oweing, 2);
		}
	}



	private function _get_payment_gateway() {
		if ( !is_object( $this->_data->txn ) )
			return '';

		$details = $this->_data->txn->details();
		return isset( $details['gateway'] ) ? $details['gateway'] : 'Gateway not selected';
	}

} //end EE_Transaction Shortcodes library