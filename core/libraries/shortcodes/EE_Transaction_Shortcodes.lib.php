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
 * @ version		 	4.0
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
			'[INVOICE_LINK]' => __('This is a full html link to the invoice', 'event_espresso'),
			'[INVOICE_URL]' => __('This is just the url for the invoice', 'event_espresso'),
			'[INVOICE_LOGO_URL]' => __('This returns the url for the logo uploaded via the invoice settings page.', 'event_espresso'),
			'[INVOICE_LOGO]' => __('This returns the logo uploaded via the invoice settings page wrapped in img_tags and with a "logo screen" classes. The image size is also set in the img tags automatically to match the uploaded logo.', 'event_espresso'),
			'[TOTAL_COST]' => __('The total cost for the transaction', 'event_espresso'),
			'[TXN_STATUS]' => __('The transaction status for the transaction.', 'event_espresso'),
			'[TXN_STATUS_ID]' => __('The ID representing the transaction status as saved in the db.  This tends to be useful for including with css classes for styling certain statuses differently from others.', 'event_espresos'),
			'[PAYMENT_STATUS]' => __('The transaction status for the transaction. This parses to the same value as the [TXN_STATUS] shortcode and still remains here for legacy support.', 'event_espresso'),
			'[PAYMENT_GATEWAY]' => __('The payment gateway used for the transaction', 'event_espresso'),
			'[AMOUNT_PAID]' => __('The amount paid with a payment', 'event_espresso'),
			'[TOTAL_AMOUNT_PAID]' => __('This parses to the total amount paid over all payments', 'event_espresso'),
			'[TOTAL_OWING]' => __('The total owing on a transaction with no attributes.', 'event_espresso'),
			'[TXN_SUBTOTAL]' => __('The subtotal for all txn line items.', 'event_espresso'),
			'[TXN_TAX_SUBTOTAL]' => __('The subtotal for all tax line items.', 'event_espresso'),
			'[TOTAL_OWING_*]' => __('A dynamic shortcode for adjusting how total oweing gets shown. The acceptable attributes on the shortcode are:', 'event_espresso') . '<p></ul>' .
				'<li><strong>still_owing</strong>:' . __('If the transaction is not paid in full, then whatever is set for this attribute is shown (otherwise its just the amount oweing). The default is:', 'event_espresso' ) . sprintf( __( '%sPlease make a payment.%s', 'event_espresso'),  '<a href="[PAYMENT_URL]" class="noPrint">', '</a>' ) . '</li>' .
				'<li><strong>none_owing</strong>:' . __('If the transaction is paid in full, then you can indicate how this gets displayed.  Note, that it defaults to just be the total oweing.', 'event_espresso') . '</li></ul></p>',
			'[TKT_QTY_PURCHASED]' => __('The total number of all tickets purchased in a transaction', 'event_espresso'),
			'[TRANSACTION_ADMIN_URL]' => __('The url to the admin page for this transaction', 'event_espresso'),
			'[RECEIPT_URL]' => __('This parses to the generated url for retrieving the receipt for the transaction', 'event_espresso')
			);
	}


	protected function _parser( $shortcode ) {

		EE_Registry::instance()->load_helper( 'Template' );

		if ( !$this->_data->txn instanceof EE_Transaction )
			return '';

		switch ( $shortcode ) {
			case '[TXN_ID]' :
				return $this->_data->txn->ID();
				break;

			case '[PAYMENT_URL]' :
				$payment_url = $this->_data->txn->payment_overview_url();
				return empty( $payment_url ) ? __( 'http://dummypaymenturlforpreview.com', 'event_espresso') : $payment_url;
				break;

			case '[INVOICE_LINK]' :
				$invoice_url = $this->_data->txn->invoice_url();
				$invoice_url = empty( $invoice_url ) ? 'http://dummyinvoicelinksforpreview.com' : $invoice_url;
				return sprintf( __('%sClick here for Invoice%s', 'event_espresso'), '<a href="' . $invoice_url . '">', '</a>' );
				break; /**/

			case '[INVOICE_URL]' :
				$invoice_url = $this->_data->txn->invoice_url();
				return empty( $invoice_url ) ? 'http://dummyinvoicelinksforpreview.com' : $invoice_url;
				break;

			case '[INVOICE_LOGO_URL]' :
				return $this->_get_invoice_logo();
				break;

			case '[INVOICE_LOGO]' :
				return $this->_get_invoice_logo( TRUE );
				break;


			case "[TOTAL_COST]" :
				$total = $this->_data->txn->total();
				return ! empty($total) ? EEH_Template::format_currency( $total ) : '';
				break;

			case "[PAYMENT_STATUS]" :
				$status = $this->_data->txn->pretty_status();
				return !empty($status) ? $status : __('Unknown', 'event_espresso');
				break; /**/

			// note the [payment_status] shortcode is kind of misleading because payment status might be different from txn status so I'm adding this here for clarity.
			case "[TXN_STATUS]" :
				$status = $this->_data->txn->pretty_status();
				return !empty( $status ) ? $status : __('Unknown', 'event_espresso');
				break;

			case "[TXN_STATUS_ID]" :
				return $this->_data->txn->status_ID();
				break;

			case "[PAYMENT_GATEWAY]" :
				return $this->_get_payment_gateway();
				break;

			case "[AMOUNT_PAID]" :
				$amount = isset( $this->_data->payment ) && is_object( $this->_data->payment ) ? $this->_data->payment->amount() : 0;
				return EEH_Template::format_currency( $amount );
				break;

			case "[TOTAL_AMOUNT_PAID]" :
				return EEH_Template::format_currency( $this->_data->txn->paid() );
				break;

			case "[TOTAL_OWING]" :
				$total_owing = isset( $this->_data->txn ) && is_object($this->_data->txn) ? $this->_data->txn->remaining() : $this->_data->txn->total();
				return EEH_Template::format_currency( $total_owing );
				break;

			case "[TXN_SUBTOTAL]" :
				return EEH_Template::format_currency($this->_get_subtotal());
				break;

			case "[TXN_TAX_SUBTOTAL]" :
				return EEH_Template::format_currency($this->_get_subtotal( TRUE ));
				break;

			case "[TKT_QTY_PURCHASED]" :
				return $this->_data->total_ticket_count;
				break;

			case "[TRANSACTION_ADMIN_URL]" :
				require_once EE_CORE . 'admin/EE_Admin_Page.core.php';
				$query_args = array( 'page' => 'espresso_transactions', 'action' => 'view_transaction', 'TXN_ID' => $this->_data->txn->ID() );
				$url = EE_Admin_Page::add_query_args_and_nonce( $query_args, admin_url('admin.php') );
				return $url;
				break;

			case "[RECEIPT_URL]" :
				//get primary_registration
				$reg = $this->_data->primary_reg_obj;

				if ( ! $reg instanceof EE_Registration ) {
					return '';
				}
				return $reg->receipt_url();
				break;

		}

		if ( strpos( $shortcode, '[TOTAL_OWING_*' ) !== FALSE ) {
			return $this->_get_custom_total_oweing( $shortcode );
		}

		return '';
	}



	/**
	 * parser for the [TOTAL_OWING_*] attribute type shortcode
	 *
	 * @since 4.5.0
	 *
	 * @param string $shortcode the incoming shortcode
	 *
	 * @return string parsed.
	 */
	private function _get_custom_total_oweing( $shortcode ) {
		$valid_shortcodes = array( 'transaction' );
		$attrs = $this->_get_shortcode_attrs( $shortcode );

		//ensure default is set.
		$addressee = $this->_data instanceof EE_Messages_Addressee ? $this->_data : null;
		$total_owing = ! empty( $addressee ) ? $addressee->txn->remaining() : 0;

		if ( $total_owing > 0 ) {
			$owing_content = ! empty( $attrs['still_owing'] ) ? $attrs['still_oweing'] : sprintf( __( '%sPlease make a payment.%s', 'event_espresso'),  '<a href="[PAYMENT_URL]" class="noPrint">', '</a>' );

			//we need to re run this string through the parser to catch any shortcodes that are in it.
			$this->_set_shortcode_helper();
			$owing_content = $this->_shortcode_helper->parse_message_template( $owing_content, $addressee, $valid_shortcodes, $this->_message_type, $this->_messenger, $this->_context, $this->_GRP_ID );
		} else {
			$owing_content = !empty( $attrs['none_owing']) ? $attrs['none_owing'] : '';
		}

		return $owing_content;
	}



	private function _get_payment_gateway() {
		if ( !is_object( $this->_data->txn ) )
			return '';
		return $this->_data->txn->selected_gateway();
	}



	/**
	 * This retrieves a logo to be used for the invoice from whatever is set on the invoice logo settings page.  If its not present then the organization logo is used if its found (set on the organzation settings page).
	 *
	 * @since 4.5.0
	 *
	 * @param bool $img_tags TRUE means to return with the img tag wrappers.  False just returns the url to the image.
	 *
	 * @return string url or html
	 */
	private function _get_invoice_logo( $img_tags = FALSE ) {
		if( $this->_data->txn instanceof EE_Transaction &&
				$this->_data->txn->payment_method() instanceof EE_Payment_Method &&
				$this->_data->txn->payment_method()->type_obj() instanceof EE_PMT_Invoice ){
				$pm = $this->_data->txn->payment_method();
				$invoice_logo_url = $pm->get_extra_meta( 'pdf_logo_image', TRUE );
		}else{
			$invoice_logo_url = NULL;
		}
		if ( empty($invoice_logo_url ) ) {
			$invoice_logo_url = EE_Registry::instance()->CFG->organization->logo_url;
		}

		if ( empty( $invoice_logo_url ) ) {
			return '';
		}

		if ( ! $img_tags ) {
			return $invoice_logo_url;
		}

		//image tags have been requested.
		$image_size = getimagesize( $image_size );
		return '<img class="logo screen" src="' . $invoice_logo_url . '" ' . $image_size[3] . ' alt="logo" />';
	}





	/**
	 * Retrieves the url for generating the receipt associated with this transaction.
	 *
	 * @since 4.5.0
	 *
	 * @param EE_Transaction $transaction
	 *
	 * @return string
	 */
	private function _get_receipt_url( EE_Transaction $transaction ) {
		//get primary_registration
		$reg = $this->_data->primary_reg_obj;

		if ( ! $reg instanceof EE_Registration ) {
			return '';
		}

		return $reg->receipt_url();
	}



	/**
	 * This returns a subtotal.
	 *
	 * @param bool $tax if true then return the subtotal for tax otherwise return subtotal.
	 *
	 * @return int
	 */
	private function _get_subtotal( $tax = FALSE ) {
		$grand_total = isset( $this->_data->grand_total_line_item ) ? $this->_data->grand_total_line_item : NULL;

		if ( ! $grand_total instanceof EE_Line_Item ) {
			return 0;
		}

		return $tax ? $grand_total->get_total_tax() : $grand_total->get_items_total();
	}

} //end EE_Transaction Shortcodes library
