<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
do_action('AHEE_log', __FILE__, ' FILE LOADED', '' );/**
 *
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package		Event Espresso
 * @ author		Seth Shoultes
 * @ copyright	(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license		http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link			http://www.eventespresso.com
 *
 * ------------------------------------------------------------------------
 * 
 * EE_Ticket_Cart_Item class
 *
 * @ version		2.0
 * @subpackage	includes/classes/EE_Ticket_Cart_Item.class.php
 * @author		Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class EE_Ticket_Cart_Item extends EE_Cart_Item {

	/**
	 *	@var EE_Ticket $ticket
	 * 	@access 	protected
	 */
	public $ticket;
	
	/**
	 * 	class constructor
	 * 	@access 	public
	 *	@param EE_Ticket $ticket
	 *	@param int $qty
	 *	@return void
	 */
	public function __construct( EE_Ticket $ticket, $qty = 1 )	{
		$this->set_line_item_ID( 'EE_Ticket', $ticket->ID() );
		$this->ticket = $ticket;
		$this->_qty = $qty;
	}
	
	/**
	 * 	returns the ID
	 * 	@access 	public
	 *	@return string
	 */
	public function ID() {
		return $this->ticket->ID();
	}

	/**
	 * 	returns the name
	 * 	@access 	public
	 *	@return string
	 */
	public function name() {
		return $this->ticket->name();
	}

	/**
	 * 	returns the price
	 * 	@access 	public
	 *	@return float
	 */
	public function price() {
		return $this->ticket->price();
	}

	/**
	 * 	whether or not taxes should be applied to this item
	 * 	@access 	public
	 *	@return boolean
	 */
	public function is_taxable() {
		return $this->ticket->taxable();
	}

} 
/* End of file EE_Ticket_Cart_Item.class.php */
/* Location: /includes/classes/EE_Ticket_Cart_Item.class.php */