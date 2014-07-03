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
			'[TKT_QTY_PURCHASED]' => __('The total quantity of the current ticket in the list that has been purchased in this transaction', 'event_espresso')
			);
	}


	protected function _parser( $shortcode ) {

		EE_Registry::instance()->load_helper( 'Template' );

		$this->_ticket = $this->_data instanceof EE_Ticket ? $this->_data : null;

		//if no event, then let's see if there is a reg_obj.  If there IS, then we'll try and grab the event from the reg_obj instead.
		if ( empty( $this->_ticket ) ) {
			$aee = $this->_data instanceof EE_Messages_Addressee ? $this->_data : NULL;
			$aee = $this->_extra_data instanceof EE_Messages_Addressee ? $this->_extra_data : $aee;

			$this->_ticket = $aee instanceof EE_Messages_Addressee && $aee->reg_obj instanceof EE_Registration ? $aee->reg_obj->ticket() : NULL;
		}


		//If there is no event objecdt by now then get out.
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

			case '[TKT_QTY_PURCHASED]' :
				return $this->_extra_data['data']->tickets[$this->_ticket->ID()]['count'];
				break;
		}

	}


} //end EE_Ticket_Shortcodes class
