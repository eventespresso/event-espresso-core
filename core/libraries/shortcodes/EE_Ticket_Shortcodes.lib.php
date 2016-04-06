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
 * EE_Ticket_Shortcodes
 *
 * this is a child class for the EE_Shortcodes library.  The EE_Ticket_Shortcodes lists all shortcodes related to ticket specific info.
 *
 * NOTE: if a method doesn't have any phpdoc commenting the details can be found in the comments in EE_Shortcodes parent class.
 *
 * @package		Event Espresso
 * @subpackage	libraries/shortcodes/EE_Ticket_Shortcodes.lib.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Ticket_Shortcodes extends EE_Shortcodes {


	/**
	 * Will hold the EE_Ticket if available
	 *
	 * @var EE_Ticket
	 */
	protected $_ticket;


	protected function _init_props() {
		$this->label = __('Ticket Shortcodes', 'event_espresso');
		$this->description = __('All shortcodes specific to ticket related data', 'event_espresso');
		$this->_shortcodes = array(
			'[TICKET_ID]' => __('Will be replaced by the ticket ID of a ticket', 'event_espresso'),
			'[TICKET_NAME]' => __('The name of the ticket', 'event_espresso'),
			'[TICKET_DESCRIPTION]' => __('The description of the ticket', 'event_espresso'),
			'[TICKET_PRICE]' => __('The price of the ticket', 'event_espresso'),
			'[TICKET_PRICE_WITH_TAXES]' => __('The price of the ticket including any taxes that might be on the ticket', 'event_espresso'),
			'[TKT_QTY_PURCHASED]' => __('The total quantity of the current ticket in the list that has been purchased in this transaction', 'event_espresso'),
			'[TKT_USES_*]' => __( 'This attribute based shortcode parses to show the number of uses the ticket has.  The optional "schema" attribute can be used to indicate what schema is used when the uses is infinite.  Options are:', 'event_espresso' ) .
				'<p><ul>' .
				'<li><strong>symbol</strong>:' . __('This returns the &infin; symbol.', 'event_espresso') . '</li>' .
				'<li><strong>text</strong>:' . __('This returns the word, "Unlimited". This is also the default if the "schema" attribute is not used.', 'event_espresso' ) . '</li>' .
				'<li><strong>{custom}</strong>:' . __('You can put anything you want as a string instead and that will be used.  So you could have the world "any" and whenever uses for a ticket is infinity, this shortcode will parse to "any".', 'event_espresso' ) . '</li>' .
				'</ul></p>'
			);
	}


	protected function _parser( $shortcode ) {

		$this->_ticket = $this->_data instanceof EE_Ticket ? $this->_data : null;

		$aee = $this->_data instanceof EE_Messages_Addressee ? $this->_data : null;
		$aee = ! $aee instanceof EE_Messages_Addressee && is_array( $this->_extra_data ) && isset( $this->_extra_data['data'] ) && $this->_extra_data['data'] instanceof EE_Messages_Addressee ? $this->_extra_data['data'] : $aee;


		//possible EE_Line_Item may be incoming data
		$this->_ticket = empty( $this->_ticket ) && $this->_data instanceof EE_Line_Item && $aee instanceof EE_Messages_Addressee && ! empty( $aee->line_items_with_children[$this->_data->ID()]['EE_Ticket'] ) && $aee->line_items_with_children[$this->_data->ID()]['EE_Ticket'] instanceof EE_Ticket ? $aee->line_items_with_children[$this->_data->ID()]['EE_Ticket'] : $this->_ticket;

		//if still no ticket, then let's see if there is a reg_obj.  If there IS, then we'll try and grab the ticket from the reg_obj instead.
		if ( empty( $this->_ticket ) ) {
			$this->_ticket = $aee instanceof EE_Messages_Addressee && $aee->reg_obj instanceof EE_Registration ? $aee->reg_obj->ticket() : NULL;
		}


		//If there is no event object by now then get out.
		if ( ! $this->_ticket instanceof EE_Ticket )
			return '';

		switch ( $shortcode ) {

			case '[TICKET_ID]' :
				return $this->_ticket->ID();
				break;

			case '[TICKET_NAME]' :
				return $this->_ticket->get('TKT_name');
				break;

			case '[TICKET_DESCRIPTION]' :
				return $this->_ticket->get('TKT_description');
				break;

			case '[TICKET_PRICE]' :
				return EEH_Template::format_currency( $this->_ticket->get('TKT_price') );
				break;

			case '[TICKET_PRICE_WITH_TAXES]' :
				return EEH_Template::format_currency( $this->_ticket->get_ticket_total_with_taxes() );
				break;

			case '[TKT_QTY_PURCHASED]' :
				return $aee instanceof EE_Messages_Addressee ? $aee->tickets[$this->_ticket->ID()]['count'] : '';
				break;
		}

		if ( strpos( $shortcode, '[TKT_USES_*') !== FALSE  ) {
			$attrs = $this->_get_shortcode_attrs( $shortcode );
			$schema = empty( $attrs['schema'] ) ? null : $attrs['schema'];
			return $this->_ticket->get_pretty( 'TKT_uses', $schema );
		}
		return '';

	}



	public function get_ticket_set() {
		return $this->_ticket;
	}


} //end EE_Ticket_Shortcodes class
