<?php
/**
 * This contains the class for the Payment messages shortcode library.
 *
 * @since 4.5.0
 * @package Event Espresso
 * @subpackage messages
 */
if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
 *
 * EE_Payment_Shortcodes
 *
 * This is a child class for the EE_Shortcodes library. The EE_Payment_Shortcodes lists all shortcodes related to payments.
 *
 *
 * @since 4.5.0
 *
 * @package			Event Espresso
 * @subpackage		messages
 * @author			Darren Ethier
 */
class EE_Payment_Shortcodes extends EE_Shortcodes {




	protected function _init_props() {
		$this->label = __('Payment Shortcodes', 'event_espresso');
		$this->description = __('All shortcodes specific to payments.', 'event_espresso');
		$this->_shortcodes = array(
			'[PAYMENT_TIMESTAMP]' => __('Outputs the date of the payment (using the default date format).', 'event_espresso'),
			'[PAYMENT_METHOD]' => __('Outputs a the payment method.', 'event_espresso'),
			'[PAYMENT_AMOUNT]' => __('Outputs the payment amount (with currency symbol).', 'event_espresso'),
			'[PAYMENT_GATEWAY]' => __('Outputs the gateway used for the payment.', 'event_espresso' ),
			'[PAYMENT_GATEWAY_RESPONSE]' => __('Outputs the payment gateway response.', 'event_espresso'),
			'[PAYMENT_GATEWAY_TXN_ID]' => __('This will either be the gateway transaction ID, or the manual ID added with payment applied via the admin.', 'event_espresso'),
			'[PAYMENT_PO_NUMBER]' => __('Purchase Order number (if present)', 'event_espresso'),
			'[PAYMENT_EXTRA_ACCOUNTING]' => __('Any extra accounting messages. Typically added with payments made via the admin.', 'event_espresso'),
			'[PAYMENT_STATUS]' => __('The status of the payment.', 'event_espresso'),
			//'[PAYMENT_STATUS_WITH_ICONS]' => __('The status of the payment including icons representing the status.', 'event_espresso')
			);
	}



	protected function _parser( $shortcode ) {
		//ensure that the incoming object is an EE_Payment object.  If it isn't then bail early.
		if ( ! $this->_data instanceof EE_Payment ) {
			return '';
		}

		$payment = $this->_data;

		switch ( $shortcode ) {
			case '[PAYMENT_TIMESTAMP]' :
				return $payment->timestamp();
				break;

			case '[PAYMENT_METHOD]' :
				//previously the column 'PAY_source' was known as 'PAY_method'
				return $payment->source();
				break;

			case '[PAYMENT_AMOUNT]' :
				return $payment->amount_no_code();
				break;

			case '[PAYMENT_GATEWAY]' :
				//previously teh column 'PMD_ID' was more-or-less 'PAY_gateway'
				if( $payment->payment_method() instanceof EE_Payment_Method ){
					return $payment->payment_method()->name();
				}else{
					return __( 'Unknown', 'event_espresso' );
				}
				break;

			case '[PAYMENT_GATEWAY_RESPONSE]' :
				return $payment->gateway_response();
				break;

			case '[PAYMENT_GATEWAY_TXN_ID]' :
				return $payment->txn_id_chq_nmbr();
				break;

			case '[PAYMENT_PO_NUMBER]' :
				return $payment->po_number();
				break;

			case '[PAYMENT_EXTRA_ACCOUNTING]' :
				return $payment->extra_accntng();
				break;

			case '[PAYMENT_STATUS]' :
				return $payment->pretty_status();
				break;

			case '[PAYMENT_STATUS_WITH_ICONS]' :
				return $payment->pretty_status( TRUE );
				break;

			default :
				return '';
				break;
		}
	}
} //end EE_Payment_Shortcodes
