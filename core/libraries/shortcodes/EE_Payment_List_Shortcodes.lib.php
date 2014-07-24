<?php
/**
 * This contains the class for the Payment List messages shortcode library.
 *
 * @since %VER%
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
 * @since %VER%
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
			'[PAYMENT_LIST]' => __('Outputs a list of payment items.', 'event_espresso')
			);
	}



	protected function _parser( $shortcode ) {

		switch ( $shortcode ) {
			case '[PAYMENT_LIST]' :
				return $this->_get_payment_list();
				break;

			default :
				return '';
				break;
		}
	}




	/**
	 * verify incoming data contains what is needed for retrieving and parsing each payment for transaction.
	 *
	 * @since %VER%
	 *
	 * @return string parsed ticket line item list.
	 */
	private function _get_payment_list() {
		$this->_validate_list_requirements();
		$this->_set_shortcode_helper();

		if ( ! $this->_data instanceof EE_Messages_Addressee ) {
			return '';
		}

		$valid_shortcodes = array( 'payment' );

		$addressee_obj = $this->_data;
		$templates = $this->_extra_data['template'];
		$payments = $addressee_obj->payments;

		//made it here so we have an array of paymnets, so we should have what we need.
		$payment_content = '';
		foreach ( $payments as $payment ) {
			$payment_content .= $this->_shortcode_helper->parse_payment_list_template( $template['payment_list'], $payment, $valid_shortcodes, $this->_extra_data );
		}

		return $payment_content;
	}
} //end EE_Payment_List_Shortcodes class
