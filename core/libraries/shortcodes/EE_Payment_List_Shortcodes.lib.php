<?php
/**
 * This contains the class for the Payment List messages shortcode library.
 *
 * @since 4.5.0
 * @package Event Espresso
 * @subpackage messages
 */
if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
 *
 * EE_Payment_List_Shortcodes
 *
 * This is a child class for the EE_Shortcodes library. The EE_Payment_List_Shortcodes lists all shortcodes related to line item lists.
 *
 * This is a special shortcode parser in that it will actually load other parsers and receive a template to parse via the shortcode parser.
 *
 * @since 4.5.0
 *
 * @package			Event Espresso
 * @subpackage		messages
 * @author			Darren Ethier
 */
class EE_Payment_List_Shortcodes extends EE_Shortcodes {




	protected function _init_props() {
		$this->label = __('Payment List Shortcodes', 'event_espresso');
		$this->description = __('All shortcodes specific to payment lists', 'event_espresso');
		$this->_shortcodes = array(
			'[PAYMENT_LIST_*]' => __('Outputs a list of payment items. Note, this is a dynamic shortcode in that it accepts some attributes for setting certain defaults.  Attributes that are available are:', 'event_espresso') . '<p><ul>' .
				'<li><strong>no_payments</strong>:' . sprintf( __('Indicate with this attribute what will be used if there are no payments present.  Default is: "%sNo approved payments have been received.%s"', 'event_espresso'),  htmlspecialchars('<td class="aln-cntr" colspan="6">'), htmlspecialchars('</td>') ) . '</li>' .
				'</ul></p>'
			);
	}



	protected function _parser( $shortcode ) {

		if ( strpos( $shortcode, '[PAYMENT_LIST_*' ) !== FALSE ) {
			return $this->_get_payment_list( $shortcode );
		}
		return '';
	}




	/**
	 * verify incoming data contains what is needed for retrieving and parsing each payment for transaction.
	 *
	 * @since 4.5.0
	 *
	 * @param string $shortcode The incoming shortcode.
	 *
	 * @return string parsed ticket line item list.
	 */
	private function _get_payment_list( $shortcode ) {
		$this->_validate_list_requirements();


		if ( ! $this->_data['data'] instanceof EE_Messages_Addressee ) {
			return '';
		}

		$valid_shortcodes = array( 'payment' );

		$addressee_obj = $this->_data['data'];
		$templates = $this->_extra_data['template'];
		$payments = apply_filters( 'FHEE__Payment_List_Shortcodes___get_payments_list__payments', $addressee_obj->payments );

		//let's get any attributes that may be present and set the defaults.
		$atts = $this->_get_shortcode_attrs( $shortcode );

		$no_payments_msg = empty( $atts['no_payments'] ) ?  __('No approved payments have been received.','event_espresso') : $atts['no_payments'];

		//made it here so we have an array of paymnets, so we should have what we need.
		$payment_content = empty( $payments ) ? $no_payments_msg : '';

		$payments = (array) $payments;

		foreach ( $payments as $payment ) {
			$payment_content .= $this->_shortcode_helper->parse_payment_list_template( $templates['payment_list'], $payment, $valid_shortcodes, $this->_extra_data );
		}

		return $payment_content;
	}
} //end EE_Payment_List_Shortcodes class
