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
			'[PAYMENT_LINK_IF_NEEDED_*]' => __('This is a special dynamic shortcode that allows one to insert a payment link conditional on there being amount owing on the transaction. Three params are available on this shortcode:') . '<ul>'
				. '<li>' . sprintf( __('%class:%s Thisis can be used to indicate css class is given to the containing css element (default is "callout").', 'event_espresso' ), '<strong>', '</strong>' ) . '</li>'
				. '<li>' . sprintf( __('%scustom_text:%s This should be a sprintf format text string (with %%s for where the hyperlink tags go) that is used for the generated link text (The default is "You can %%smake a payment here »%%s.)', 'event_espresso' ), '<strong>', '</strong>' ) . '</li>'
				. '<li>' . sprintf( __('%scontainer_tag:%s Use this to indicate what container tag you want surrounding the payment link (default is "p").', 'event_espresso' ), '<strong>', '</strong>' ) . '</li>'
				. '</ul>',
			'[INVOICE_LINK]' => __('This is a full html link to the invoice', 'event_espresso'),
			'[INVOICE_URL]' => __('This is just the url for the invoice', 'event_espresso'),
			'[INVOICE_LOGO_URL]' => __('This returns the url for the logo uploaded via the invoice settings page.', 'event_espresso'),
			'[INVOICE_LOGO]' => __('This returns the logo uploaded via the invoice settings page wrapped in img_tags and with a "logo screen" classes. The image size is also set in the img tags automatically to match the uploaded logo.', 'event_espresso'),
			'[INVOICE_PAYEE_NAME]' => __('This will parse to either: the value of the "Company Name" field in the invoice payment method settings; if that is blank, then the value of the Company Name in the "Your Organization Settings", if that is blank then an empty string.', 'event_espresso'),
			'[INVOICE_PAYEE_ADDRESS]' => __('This will parse to either: the value of the "Company Address" field in the invoice payment method settings; if that is blank, then the value of the Company Address in the "Your Organization Settings", if that is blank then an empty string.', 'event_espresso' ),
			'[INVOICE_PAYMENT_INSTRUCTIONS]' => __('This will parse to the value of the "Payment Instructions" field found on the Invoice payment methods settings page', 'event_espresso' ),
			'[INVOICE_PAYEE_EMAIL]' => __('This will parse to either: the value of the "Company Email" field in the invoice payment method settings; if that is blank, then the value of the Company Email in the "Your Organization Settings", if that is blank then an empty string.', 'event_espresso' ),
			'[INVOICE_PAYEE_TAX_NUMBER_*]' => __('This will parse to either: the value of the "Company Tax Number" field in the invoice payment method settings; if that is blank, then the value of the Company Tax Number in the "Your Organization Settings", if that is blank then an empty string. Note this is also a special dynamic shortcode. You can use the "prefix" parameter to indicate what text you want to use as a prefix before this tax number.  It defaults to "VAT/Tax Number:". To change this prefix you do the following format for this shortcode: <code>[INVOICE_PAYEE_TAX_NUMBER_* prefix="GST:"]</code> and that will ouptut: GST: 12345t56.  If you have no tax number in your settings, then no prefix will be output either.', 'event_espresso' ),
			'[TOTAL_COST]' => __('The total cost for the transaction', 'event_espresso'),
			'[TXN_STATUS]' => __('The transaction status for the transaction.', 'event_espresso'),
			'[TXN_STATUS_ID]' => __('The ID representing the transaction status as saved in the db.  This tends to be useful for including with css classes for styling certain statuses differently from others.', 'event_espresso'),
			'[PAYMENT_STATUS]' => __('The transaction status for the transaction. This parses to the same value as the [TXN_STATUS] shortcode and still remains here for legacy support.', 'event_espresso'),
			'[PAYMENT_GATEWAY]' => __('The payment gateway used for the transaction', 'event_espresso'),
			'[AMOUNT_PAID]' => __('The amount paid with a payment', 'event_espresso'),
			'[TOTAL_AMOUNT_PAID]' => __('This parses to the total amount paid over all payments', 'event_espresso'),
			'[TOTAL_OWING]' => __('The total owing on a transaction with no attributes.', 'event_espresso'),
			'[TXN_SUBTOTAL]' => __('The subtotal for all txn line items.', 'event_espresso'),
			'[TXN_TAX_SUBTOTAL]' => __('The subtotal for all tax line items.', 'event_espresso'),
			'[OWING_STATUS_MESSAGE_*]' => __('A dynamic shortcode for adjusting how total oweing gets shown. The acceptable attributes on the shortcode are:', 'event_espresso') . '<p></ul>' .
				'<li><strong>still_owing</strong>:' . __('If the transaction is not paid in full, then whatever is set for this attribute is shown (otherwise its just the amount oweing). The default is:', 'event_espresso' ) . sprintf( __( '%sPlease make a payment.%s', 'event_espresso'),  '<a href="[PAYMENT_URL]" class="noPrint">', '</a>' ) . '</li>' .
				'<li><strong>none_owing</strong>:' . __('If the transaction is paid in full, then you can indicate how this gets displayed.  Note, that it defaults to just be the total oweing.', 'event_espresso') . '</li></ul></p>',
			'[TXN_TOTAL_TICKETS]' => __('The total number of all tickets purchased in a transaction', 'event_espresso'),
			'[TKT_QTY_PURCHASED]' => __('The total number of all tickets purchased in a transaction. <strong>NOTE: This shortcode is good to use in the "[TICKET_LIST]" field but has been deprecated from all other contexts in favor of the more explicit [TXN_TOTAL_TICKETS] shortcode.</strong>', 'event_espresso'),
			'[TRANSACTION_ADMIN_URL]' => __('The url to the admin page for this transaction', 'event_espresso'),
			'[RECEIPT_URL]' => __('This parses to the generated url for retrieving the receipt for the transaction', 'event_espresso'),
			'[INVOICE_RECEIPT_SWITCHER_URL]' => __( 'This parses to the url that will switch to the receipt if an invoice is displayed, and switch to the invoice if receipt is displayed. If a message type OTHER than invoice or receipt is displayed then this will just return the url for the invoice. If the related message type is not active  then will parse to an empty string.', 'event_espresso'),
			'[INVOICE_RECEIPT_SWITCHER_BUTTON]' => sprintf( __( 'The same as %1$s[INVOICE_RECEIPT_SWITCHER_URL]%2$s except this returns the html for a button linked to the invoice or receipt.', 'event_espresso' ), '<code>', '</code>' )
			);
	}


	protected function _parser( $shortcode ) {

		EE_Registry::instance()->load_helper( 'Template' );

		//attempt to get the transaction.  Since this is potentially used in more fields, we may have to look in the _extra_data for the transaction.
		$transaction = $this->_data->txn instanceof EE_Transaction ? $this->_data->txn : null;
		$transaction = ! $transaction instanceof EE_Transaction && is_array( $this->_extra_data ) &&  isset( $this->_extra_data['data'] ) && $this->_extra_data['data'] instanceof EE_Messages_Addressee ? $this->_extra_data['data']->txn: $transaction;

		//payment
		$payment = $this->_data->payment instanceof EE_Payment ? $this->_data->payment : null;
		$payment = ! $payment instanceof EE_Payment && is_array( $this->_extra_data ) &&  isset( $this->_extra_data['data'] ) && $this->_extra_data['data'] instanceof EE_Messages_Addressee ? $this->_extra_data['data']->payment: $payment;


		if ( ! $transaction instanceof EE_Transaction )
			return '';

		switch ( $shortcode ) {
			case '[TXN_ID]' :
				return $transaction->ID();
				break;

			case '[PAYMENT_URL]' :
				$payment_url = $transaction->payment_overview_url();
				return empty( $payment_url ) ? __( 'http://dummypaymenturlforpreview.com', 'event_espresso') : $payment_url;
				break;

			case '[INVOICE_LINK]' :
				$invoice_url = $transaction->invoice_url();
				$invoice_url = empty( $invoice_url ) ? 'http://dummyinvoicelinksforpreview.com' : $invoice_url;
				return sprintf( __('%sClick here for Invoice%s', 'event_espresso'), '<a href="' . $invoice_url . '">', '</a>' );
				break; /**/

			case '[INVOICE_URL]' :
				$invoice_url = $transaction->invoice_url();
				return empty( $invoice_url ) ? 'http://dummyinvoicelinksforpreview.com' : $invoice_url;
				break;

			case '[INVOICE_LOGO_URL]' :
				return $this->_get_invoice_logo();
				break;

			case '[INVOICE_LOGO]' :
				return $this->_get_invoice_logo( TRUE );
				break;

			case '[INVOICE_PAYEE_NAME]' :
				return $this->_get_invoice_payee_name();
				break;

			case '[INVOICE_PAYEE_ADDRESS]' :
				return $this->_get_invoice_payee_address();
				break;

			case '[INVOICE_PAYMENT_INSTRUCTIONS]' :
				return $this->_get_invoice_payment_instructions();
				break;

			case '[INVOICE_PAYEE_EMAIL]' :
				return $this->_get_invoice_payee_email();
				break;


			case "[TOTAL_COST]" :
				$total = $transaction->total();
				return ! empty($total) ? EEH_Template::format_currency( $total ) : '';
				break;

			case "[PAYMENT_STATUS]" :
				$status = $transaction->pretty_status();
				return !empty($status) ? $status : __('Unknown', 'event_espresso');
				break; /**/

			// note the [payment_status] shortcode is kind of misleading because payment status might be different from txn status so I'm adding this here for clarity.
			case "[TXN_STATUS]" :
				$status = $transaction->pretty_status();
				return !empty( $status ) ? $status : __('Unknown', 'event_espresso');
				break;

			case "[TXN_STATUS_ID]" :
				return $transaction->status_ID();
				break;

			case "[PAYMENT_GATEWAY]" :
				return $this->_get_payment_gateway( $transaction );
				break;

			case "[AMOUNT_PAID]" :
				$amount = $payment instanceof EE_Payment ? $payment->amount() : 0;
				return EEH_Template::format_currency( $amount );
				break;

			case "[TOTAL_AMOUNT_PAID]" :
				return EEH_Template::format_currency( $transaction->paid() );
				break;

			case "[TOTAL_OWING]" :
				$total_owing = $transaction->remaining();
				return EEH_Template::format_currency( $total_owing );
				break;

			case "[TXN_SUBTOTAL]" :
				return EEH_Template::format_currency($this->_get_subtotal());
				break;

			case "[TXN_TAX_SUBTOTAL]" :
				return EEH_Template::format_currency($this->_get_subtotal( TRUE ));
				break;

			case "[TKT_QTY_PURCHASED]" :
			case "[TXN_TOTAL_TICKETS]" :
				return $this->_data->total_ticket_count;
				break;

			case "[TRANSACTION_ADMIN_URL]" :
				require_once EE_CORE . 'admin/EE_Admin_Page.core.php';
				$query_args = array( 'page' => 'espresso_transactions', 'action' => 'view_transaction', 'TXN_ID' => $transaction->ID() );
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

			case "[INVOICE_RECEIPT_SWITCHER_URL]" :
				return $this->_get_invoice_receipt_switcher( FALSE );
				break;

			case "[INVOICE_RECEIPT_SWITCHER_BUTTON]" :
				return $this->_get_invoice_receipt_switcher();
				break;


		}

		if ( strpos( $shortcode, '[OWING_STATUS_MESSAGE_*' ) !== FALSE ) {
			return $this->_get_custom_total_oweing( $shortcode );
		}

		if ( strpos( $shortcode, '[INVOICE_PAYEE_TAX_NUMBER_*' ) !== FALSE ) {
			return $this->_get_invoice_payee_tax_number( $shortcode );
		}

		if ( strpos( $shortcode, '[PAYMENT_LINK_IF_NEEDED_*' ) !== FALSE ) {
			return $this->_get_payment_link_if_needed( $shortcode );
		}

		return '';
	}



	/**
	 * parser for the [OWING_STATUS_MESSAGE_*] attribute type shortcode
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
		$total_owing = $addressee instanceof EE_Messages_Addressee && $addressee->txn instanceof EE_Transaction ? $addressee->txn->remaining() : 0;

		if ( $total_owing > 0 ) {
			$owing_content = ! empty( $attrs['still_owing'] ) ? $attrs['still_owing'] : sprintf( __( '%sPlease make a payment.%s', 'event_espresso'),  '<a href="[PAYMENT_URL]" class="noPrint">', '</a>' );

			//we need to re run this string through the parser to catch any shortcodes that are in it.
			$this->_set_shortcode_helper();
			$owing_content = $this->_shortcode_helper->parse_message_template( $owing_content, $addressee, $valid_shortcodes, $this->_message_type, $this->_messenger, $this->_context, $this->_GRP_ID );
		} else {
			$owing_content = !empty( $attrs['none_owing']) ? $attrs['none_owing'] : '';
		}

		return $owing_content;
	}



	private function _get_payment_gateway( $transaction ) {
		$pm = $this->_get_payment_method( $transaction );
		return $pm instanceof EE_Payment_Method ? $pm->name() : '';
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
		//try to get the invoice payment method's logo for this transaction image first
		$pm = $this->_get_payment_method();
		if ( $pm instanceof EE_Payment_Method ){
			$invoice_logo_url = $pm->get_extra_meta( 'pdf_logo_image', TRUE );
		}else{
			$invoice_logo_url = NULL;
		}
		if( empty( $invoice_logo_url ) ){
			$invoice_logo_url = EE_Registry::instance()->CFG->organization->logo_url;
		}

		if ( empty( $invoice_logo_url ) ) {
			return '';
		}

		if ( ! $img_tags ) {
			return $invoice_logo_url;
		}

		//image tags have been requested.
		$image_size = getimagesize( $invoice_logo_url );
		
		//if image is wider than 200px, set the wideth to 200
		if ( $image_size[0] > 300 ) {
			$image_width = 300;
		}else{
			$image_width = $image_size[0];
		}

		return '<img class="logo screen" src="' . $invoice_logo_url . '" width="' . $image_width . '" alt="logo" />';
	}





	/**
	 * Used to retrieve the appropriate content for the invoice payee name shortcode
	 *
	 * @since 4.5.0
	 *
	 * @return string
	 */
	private function _get_invoice_payee_name() {
		$payee_name = NULL;
		$pm = $this->_get_payment_method();
		if( $pm instanceof EE_Payment_Method ){
			$payee_name = $pm->get_extra_meta( 'pdf_payee_name', TRUE );
		}
		$payee_name = empty( $payee_name ) ? EE_Registry::instance()->CFG->organization->get_pretty( 'name' ) : $payee_name;
		return $payee_name;
	}

	/**
	 * gets the payment method for this transaction. Otherwise gets a default one.
	 */
	private function _get_payment_method( $transaction = null ){
		if( $transaction instanceof EE_Transaction ) {
			$payment_method = $transaction->payment_method();
			if ( empty( $payment_method ) ) {
				return apply_filters( 'FHEE__EE_Transaction_Shortcodes__get_payment_method__default', EEM_Payment_Method::instance()->get_one_of_type('Invoice'));
			}
			return $payment_method;
		}else{
			//get the first payment method we can find
			return apply_filters( 'FHEE__EE_Transaction_Shortcodes__get_payment_method__default', EEM_Payment_Method::instance()->get_one_of_type('Invoice'));
		}
	}




	/**
	 * Used to retrieve the appropriate content for the invoice payee email shortcode
	 *
	 * @since 4.5.0
	 *
	 * @return string
	 */
	private function _get_invoice_payee_email() {
		$payee_email = NULL;
		$pm = $this->_get_payment_method();
		if( $pm instanceof EE_Payment_Method ){
			$payee_email = $pm->get_extra_meta( 'pdf_payee_email', TRUE );
		}
		$payee_email = empty( $payee_email ) ? EE_Registry::instance()->CFG->organization->get_pretty( 'email' ) : $payee_email;
		return $payee_email;
	}




	/**
	 * Used to retrieve the appropriate content for the invoice payee tax number shortcode
	 *
	 * @since 4.5.0
	 *
	 * @param string $shortcode
	 *
	 * @return string
	 */
	private function _get_invoice_payee_tax_number( $shortcode ) {
		$payee_tax_number = NULL;
		$pm = $this->_get_payment_method();
		if( $pm instanceof EE_Payment_Method ){
			$payee_tax_number = $pm->get_extra_meta( 'pdf_payee_tax_number', TRUE );
		}
		$payee_tax_number = empty( $payee_tax_number ) ? EE_Registry::instance()->CFG->organization->vat : $payee_tax_number;

		if ( empty( $payee_tax_number ) ) {
			return '';
		}

		//any attributes?
		$attrs = $this->_get_shortcode_attrs( $shortcode );

		//prefix?
		$prefix = isset( $attrs['prefix'] ) ? $attrs['prefix'] : __( 'VAT/Tax Number: ', 'event_espresso' );
		return $prefix . $payee_tax_number;
	}





	/**
	 * Used to retrieve the appropriate content for the invoice payee address shortcode.
	 *
	 * @since 4.5.0
	 *
	 * @return string
	 */
	private function _get_invoice_payee_address() {
		$payee_address = NULL;
		$pm = $this->_get_payment_method();
		if( $pm instanceof EE_Payment_Method ){
			$payee_address = $pm->get_extra_meta( 'pdf_payee_address', TRUE );
		}
		if ( empty( $payee_address ) ) {
			$organization = EE_Registry::instance()->CFG->organization;
			$payee_address = $organization->get_pretty( 'address_1' ) . '<br>';
			$payee_address .= !empty( $organization->address_2 ) ? $organization->get_pretty( 'address_2' ) . '<br>' : '';
			$payee_address .= $organization->get_pretty( 'city' ) . '<br>';

			//state
			$state = EE_Registry::instance()->load_model( 'State' )->get_one_by_ID( $organization->STA_ID );
			$payee_address .= $state instanceof EE_State ? $state->name()  : '';

			//Country
			$payee_address .= ! empty( $organization->CNT_ISO ) ? ', ' . $organization->CNT_ISO . '<br>' : '';
			$payee_address .= ! empty( $organization->zip ) ? $organization->zip : '';
		}
		return $payee_address;
	}




	/**
	 * Used to retrieve the appropriate content for the invoice payment instructions shortcode.
	 *
	 * @since 4.5.0
	 *
	 * @return string
	 */
	private function _get_invoice_payment_instructions() {
		$instructions = NULL;
		$pm = $this->_get_payment_method();
		return ( $pm instanceof EE_Payment_Method ) ? $pm->get_extra_meta( 'pdf_instructions', TRUE) : '';
	}





	/**
	 * get invoice/receipt switch button or url.
	 *
	 * @param bool $button true (default) returns the html for a button, false just returns the url.
	 *
	 * @return string
	 */
	protected function _get_invoice_receipt_switcher( $button = TRUE ) {
		$reg = $this->_data->primary_reg_obj;
		$message_type = isset( $this->_extra_data['message_type'] ) ? $this->_extra_data['message_type'] : '';
		if ( ! $reg instanceof EE_Registration || empty( $message_type ) ) {
			return'';
		}

		$switch_to_invoice = ! $message_type instanceof EE_Invoice_message_type  ? true : false;
		$switch_to_label = $switch_to_invoice && ! $message_type instanceof EE_Receipt_message_type ? __('View Invoice', 'event_espresso' ) : __( 'Switch to Invoice', 'event_espresso' );
		$switch_to_label = ! $switch_to_invoice ? __( 'Switch to Receipt', 'event_espresso' ) : $switch_to_label;
		$switch_to_url = $switch_to_invoice ? $reg->invoice_url() : $reg->receipt_url();

		if ( ! $button ) {
			return $switch_to_url;
		}

		if ( ! empty( $switch_to_url ) ) {

		return  '
<form method="post" action="' . $switch_to_url . '" >
	<input class="print_button" type="submit" value="' . $switch_to_label . '" />
</form>
		';
		}
		return '';
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




	/**
	 * parser for the [PAYMENT_LINK_IF_NEEDED_*] attribute type shortcode
	 *
	 * @since 4.7.0
	 *
	 * @param string $shortcode the incoming shortcode
	 *
	 * @return string parsed.
	 */
	private function _get_payment_link_if_needed( $shortcode ) {
		$valid_shortcodes = array( 'transaction' );
		$attrs = $this->_get_shortcode_attrs( $shortcode );

		//ensure default is set.
		$addressee = $this->_data instanceof EE_Messages_Addressee ? $this->_data : null;
		$total_owing = $addressee instanceof EE_Messages_Addressee && $addressee->txn instanceof EE_Transaction ? $addressee->txn->remaining() : 0;

		if ( $total_owing > 0 ) {
			$class = isset( $attrs['class'] ) ? $attrs['class'] : 'callout';
			$custom_text = isset( $attrs['custom_text'] ) ? $attrs['custom_text'] : 'You can %smake a payment here »%s.';
			$container_tag = isset( $attrs['container_tag'] ) ? $attrs['container_tag'] : 'p';
			$opening_tag = ! empty( $container_tag ) ? '<' . $container_tag : '';
			$opening_tag .= ! empty( $opening_tag ) && !empty( $class ) ? ' class="' . $class . '"' : $opening_tag;
			$opening_tag .= !empty( $opening_tag ) ? '>' : $opening_tag;
			$closing_tag = ! empty( $container_tag ) ? '</' . $container_tag .'>' : '';
			$content = $opening_tag . sprintf( $custom_text, '<a href="[PAYMENT_URL]">', '</a>' ) . $closing_tag;

			//we need to re run this string through the parser to catch any shortcodes that are in it.
			$this->_set_shortcode_helper();
			$owing_content = $this->_shortcode_helper->parse_message_template( $content, $addressee, $valid_shortcodes, $this->_message_type, $this->_messenger, $this->_context, $this->_GRP_ID );
		} else {
			return '';
		}

		return $owing_content;
	}

} //end EE_Transaction Shortcodes library
