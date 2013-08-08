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
	 * Foreign Key to the Ticket Event
	 * @var INT
	 */
	protected $_EVT_ID;




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
	 * The display order for this ticket (also used for autosaves etc)
	 * @var INT
	 */
	protected $_TKT_order;






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
	 * Event this ticket is attached to
	 * @var EE_Event
	 */
	protected $_Event;





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