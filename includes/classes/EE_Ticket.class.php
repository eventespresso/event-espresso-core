<?php if (!defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
do_action('AHEE_log', __FILE__, ' FILE LOADED', '' );
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			{@link http://eventespresso.com/support/terms-conditions/}   * see Plugin Licensing *
 * @ link					{@link http://www.eventespresso.com}
 * @ since		 		4.0
 *
 * ------------------------------------------------------------------------
 *
 * EE_Ticket class
 *
 * @package			Event Espresso
 * @subpackage		includes/classes/EE_Ticket.class.php
 * @author			Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class EE_Ticket extends EE_Base_Class{

	/**
	 * The following constants are used by the ticket_status() method to indicate whether a ticket is on sale or not.
	 */
	const expired = -1;
	const pending = 1;
	const onsale = 2;


	/**
	 * Primary key for Ticket. 
	 * @var INT
	 */
	protected $_TKT_ID;



	/**
	 * Foreign Key to the Ticket Template
	 * @var INT
	 */
	protected $_TTM_ID;





	/**
	 * Name of Ticket
	 * @var string
	 */
	protected $_TKT_name;




	/**
	 * Description for Ticket
	 * @var string
	 */
	protected $_TKT_description;




	/**
	 * Date the Ticket goes on sale (internally this is stored as a UNIX timestamp)
	 * @var string
	 */
	protected $_TKT_start_date;





	/**
	 * Date the Ticket sales end (internally this is stored as a UNIX timestamp)
	 * @var string
	 */
	protected $_TKT_end_date;




	/**
	 * Minimum quantity of this ticket that must be purchased in one transaction
	 * @var int
	 */
	protected $_TKT_min;





	/**
	 * Maximum quantity of this ticket that can be purchased in one m_transaction
	 * @var int
	 */
	protected $_TKT_max;



	/**
	 * Final calculated price for the ticket
	 * @var float
	 */
	protected $_TKT_price;



	/**
	 * The quantity of tickets available
	 * @var INT
	 */
	protected $_TKT_qty;







	/**
	 * The number of times this ticket can be used to checkin (per registration).
	 * @var int
	 */
	protected $_TKT_uses;





	/**
	 * Whether the ticket is taxable or not
	 * @var int
	 */
	protected $_TKT_taxable;







	/**
	 * The order for this ticket (used for autosaves a very transient value)
	 * @var INT
	 */
	protected $_TKT_order;





	/**
	 * The row this ticket coresponds with in the editor ui.
	 * @var INT
	 */
	protected $_TKT_row;






	/**
	 * Used to flag whether this is a default ticket or not
	 * @var boolean
	 */
	protected $_TKT_is_default;






	/**
	 * If this ticket is the child of another (i.e. revisions autosaves) then the ID corresponds to the parent
	 * @var INT
	 */
	protected $_TKT_parent;





	/**
	 * Whether this ticket is deleted or not
	 * @var bool
	 */
	protected $_TKT_deleted;







	/** Related Object Caches **/


	/**
	 * Registrations this ticket is attached to
	 * @var EE_Registration[]
	 */
	protected $_Registration;






	/**
	 * Datetimes attached to this ticket
	 * @var EE_Datetime[]
	 */
	protected $_Datetime;




	/**
	 * Datetime Ticket objects related to this ticket
	 * @var EE_Datetime_Ticket[]
	 */
	protected $_Datetime_Ticket;



	/**
	 * Prices attached to this ticket
	 * @var EE_Price[]
	 */
	protected $_Price;





	/**
	 * The template this ticket is using
	 * @var EE_Ticket_Template
	 */
	protected $_Ticket_Template;



	public static function new_instance( $props_n_values = array(), $timezone = NULL ) {
		$classname = __CLASS__;
		$has_object = parent::_check_for_object( $props_n_values, $classname, $timezone );
		return $has_object ? $has_object : new self( $props_n_values, FALSE, $timezone );
	}


	public static function new_instance_from_db ( $props_n_values = array(), $timezone = NULL ) {
		return new self( $props_n_values, TRUE, $timezone );
	}





	public function parent() {
		return $this->get('TKT_parent');
	}



	/**
	 * Return if a ticket is on sale or not
	 * @return boolean      
	 */
	public function is_on_sale() {
		return ( $this->_TKT_start_date < time() && $this->_TKT_end_date > time() );
	}




	/**
	 * Return if a ticket is yet to go on sale or not
	 * @return boolean
	 */
	public function is_pending() {
		return ( $this->_TKT_start_date > time() );
	}


	/**
	 * return if a ticket is no longer available cause its available dates have expired.
	 * @return boolean
	 */
	public function is_expired() {
		return ( $this->_TKT_end_date < time() );
	}



	/**
	 * Using the start date and end date this method calculates whether the ticket is On Sale, Pending, or Expired
	 * @param bool $display true = we'll return a localized string, otherwise we just return the value of the relevant status const
	 * @return mixed(int|string) status int if the display string isn't requested
	 */
	public function ticket_status( $display = FALSE ) {
		if ( $this->is_expired() ) return $display ? __('Expired', 'event_espresso') : EE_Ticket::expired;
		if ( $this->is_pending() ) return $display ? __('Pending', 'event_espresso') : EE_Ticket::pending;
		if ( $this->is_on_sale() ) return $display ? __('On Sale', 'event_espresso') : EE_Ticket::onsale;
	}



	/**
	 * This returns an array indexed by datetime_id for tickets sold with this ticket.
	 * @return array
	 */
	protected function _all_tickets_sold() {
		$dtts = $this->get_many_related('Datetime');
		$tickets_sold = array();
		if ( !empty( $dtts ) ) {
			foreach ( $dtts as $dtt ) {
				$tickets_sold['datetime'][$dtt->ID()] = $dtt->get('DTT_sold');
			}
		}

		//DATETIME TICKETS
		$dtks = $this->get_many_related('Datetime_Ticket');
		if ( !empty( $dtks ) ) {
			foreach ( $dtks as $dtk ) {
				$tickets_sold['datetime_ticket'][$dtk->get('DTT_ID')] = $dtt->get('DTK_sold');
			}
		}

		return $tickets_sold;
	}





	
	/**
	 * This returns the totla tickets sold depending on the given parameters.
	 * @param  string $what   Can be one of two options: 'ticket', 'datetime'.
	 *                        'ticket' = total ticket sales for all datetimes this ticket is related to
	 *                        'datetime' = total ticket sales for a specified datetime (required $dtt_id) 
	 *                        'datetime' = total ticket sales in the datetime_ticket table. If $dtt_id is not given then we return an array of sales indexed by datetime.  If $dtt_id IS given then we return the tickets sold for that given datetime.
	 * @param  int    $dtt_id [optional] include the dtt_id with $what = 'datetime'.
	 * @return mixed (array|int)    	  how many tickets have sold
	 */
	public function tickets_sold( $what = 'ticket', $dtt_id = NULL ) {
		$tickets_sold = $this->_all_tickets_sold();
		switch ( $what ) {
			case 'ticket' :
				if ( empty( $tickets_sold['datetime_ticket'] ) )
					return $total;
				return array_sum( $tickets_sold['datetime_ticket'] );
				break;
			case 'datetime' :
				if ( empty( $tickets_sold['datetime'] ) )
					return $total;
				if ( !empty( $dtt_id ) && !isset( $tickets_sold['datetime'][$dtt_id] ) ) {
					EE_Error::add_error(__("You've requested the amount of tickets sold for a given ticket and datetime, however there are no records for the datetime id you included.  Are you SURE that is a datetime related to this ticket?", "event_espresso") );
					return $total;
				}

				return empty( $dtt_id ) ? $tickets_sold['datetime'] : $tickets_sold['datetime'][$dtt_id];
		}
	}

} //end EE_Ticket class