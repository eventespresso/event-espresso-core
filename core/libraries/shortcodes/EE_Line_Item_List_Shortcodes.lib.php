<?php
/**
 * This contains the class for the Line Item List messages shortcode library.
 *
 * @since 4.5.0
 * @package Event Espresso
 * @subpackage messages
 */
if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
 *
 * EE_Line_Item_List_Shortcodes
 *
 * This is a child class for the EE_Shortcodes library. The EE_Line_Item_List_Shortcodes lists all shortcodes related to line item lists.
 *
 * This is a special shortcode parser in that it will actually load other parsers and receive a template to parse via the shortcode parser.
 *
 * @since 4.5.0
 *
 * @package			Event Espresso
 * @subpackage		messages
 * @author			Darren Ethier
 */
class EE_Line_Item_List_Shortcodes extends EE_Shortcodes {




	protected function _init_props() {
		$this->label = __('Line Item List Shortcodes', 'event_espresso');
		$this->description = __('All shortcodes specific to line item lists', 'event_espresso');
		$this->_shortcodes = array(
			'[TICKET_LINE_ITEM_LIST]' => __('Outputs a list of ticket line items.', 'event_espresso'),
			'[TAX_LINE_ITEM_LIST]' => __('Outputs a list of tax line items.', 'event_espresso'),
			'[ADDITIONAL_LINE_ITEM_LIST]' => __( 'Outputs a list of additional line items (other charges or discounts)', 'event_espresso' ),
			'[PRICE_MODIFIER_LINE_ITEM_LIST]' => __('Outputs a list of price modifier line items', 'event_espresso')
			);
	}



	protected function _parser( $shortcode ) {

		switch ( $shortcode ) {
			case '[TICKET_LINE_ITEM_LIST]' :
				return $this->_get_ticket_line_item_list();
				break;

			case '[TAX_LINE_ITEM_LIST]' :
				return $this->_get_tax_line_item_list();
				break;

			case '[PRICE_MODIFIER_LINE_ITEM_LIST]' :
				return $this->_get_price_mod_line_item_list();
				break;

			case '[ADDITIONAL_LINE_ITEM_LIST]':
				return $this->_get_additional_line_item_list();
				break;

			default :
				return '';
				break;
		}
	}




	/**
	 * verify incoming data contains what is needed for retrieving and parsing each ticket line item for an event.
	 *
	 * @since 4.5.0
	 *
	 * @return string parsed ticket line item list.
	 */
	private function _get_ticket_line_item_list() {
		$this->_validate_list_requirements();

		if ( ! $this->_data['data'] instanceof EE_Ticket ) {
			return '';
		}

		$valid_shortcodes = array( 'line_item', 'line_item_list', 'ticket' );

		$ticket = $this->_data['data'];
		$templates = $this->_extra_data['template'];
		$addressee_obj = $this->_extra_data['data'];

		//made it here so we have an EE_Ticket, so we should have what we need.
		$ticket_line_item = isset( $addressee_obj->tickets[$ticket->ID()]['line_item'] ) ? $addressee_obj->tickets[$ticket->ID()]['line_item'] : null;
		$sub_line_items = isset( $addressee_obj->tickets[$ticket->ID()]['sub_line_items'] ) ? $addressee_obj->tickets[$ticket->ID()]['sub_line_items'] : array();

		$template = count( $sub_line_items ) < 2 ? $templates['ticket_line_item_no_pms'] : $templates['ticket_line_item_pms'];

		if ( empty( $ticket_line_item ) || empty( $sub_line_items ) ) {
			return '';
		}

		//now we just return the appropriate template parsed for each ticket.
		return $this->_shortcode_helper->parse_line_item_list_template( $template, $ticket_line_item, $valid_shortcodes, $this->_extra_data );
	}




	/**
	 * Verify incoming data contains what is needed for retrieving and parsing each tax line item for a transaction.
	 *
	 * @since 4.5.0
	 *
	 * @return string  parsed tax line item list.
	 */
	private function _get_tax_line_item_list() {

		$this->_validate_list_requirements();

		if ( ! $this->_data['data'] instanceof EE_Messages_Addressee ) {
			return '';
		}

		//made it here so we're good to go.
		$valid_shortcodes = array( 'line_item' );
		$templates = $this->_data['template'];

		$tax_line_items = $this->_data['data']->tax_line_items;
		$line_item_list = '';
		foreach ( $tax_line_items as $line_item ) {
			$line_item_list .= $this->_shortcode_helper->parse_line_item_list_template( $templates['tax_line_item_list'], $line_item, $valid_shortcodes, $this->_extra_data );
		}

		return $line_item_list;
	}

	/**
	 * Verify incoming data contains what is needed for retrieving and parsing each other line item for a transaction.
	 *
	 * @since 4.5.0
	 *
	 * @return string  parsed other line item list.
	 */
	private function _get_additional_line_item_list() {

		$this->_validate_list_requirements();

		if ( ! $this->_data['data'] instanceof EE_Messages_Addressee ) {
			return '';
		}

		//made it here so we're good to go.
		$valid_shortcodes = array( 'line_item' );
		$templates = $this->_data['template'];

		$additional_line_items = $this->_data['data']->additional_line_items;
		$line_item_list = '';
		foreach ( $additional_line_items as $line_item ) {
			$line_item_list .= $this->_shortcode_helper->parse_line_item_list_template( $templates['additional_line_item_list'], $line_item, $valid_shortcodes, $this->_extra_data );
		}


		return $line_item_list;
	}






	/**
	 * Verify incoming data contains what is needed for retrieving and parsing each price modifier line item for a parent ticket line item.
	 *
	 * @since 4.5.0
	 *
	 * @return string parsed price modifier line item list.
	 */
	private function _get_price_mod_line_item_list() {
		$this->_validate_list_requirements();

		if ( ! $this->_data['data'] instanceof EE_Line_Item ) {
			return '';
		}

		//made it here so we're good to go.
		$main_line_item = $this->_data['data'];
		$templates = $this->_extra_data['template'];
		$addressee_obj = $this->_extra_data['data'];

		$valid_shortcodes = array( 'line_item' );

		$main_line_item_id = $main_line_item->ID();

		$price_mod_line_items = ! empty( $addressee_obj->line_items_with_children[$main_line_item_id]['children'] ) ? $addressee_obj->line_items_with_children[$main_line_item_id]['children'] : array();

		$line_item_list = '';

		foreach( $price_mod_line_items as $line_item ) {
			$line_item_list .= $this->_shortcode_helper->parse_line_item_list_template( $templates['price_modifier_line_item_list'], $line_item, $valid_shortcodes, $this->_extra_data  );
		}

		return $line_item_list;

	}



} // end EE_Event_List_Shortcodes class
