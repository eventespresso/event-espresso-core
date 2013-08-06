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
	 * The limit of this Ticket that can be sold
	 * @var INT
	 */
	protected $_TKT_reg_limit;







	/**
	 * The display order for this ticket (also used for autosaves etc)
	 * @var INT
	 */
	protected $_TKT_order;






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
	 * Datetime_Ticket objects attached to this ticket (so we can get tickets sold for a particular datetime)
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
	public function tickets_sold() {
		$dtks = $this->get_many_related('Datetime_Ticket');
		$tickets_sold = array();
		if ( !empty( $dtks ) ) {
			foreach ( $dtks as $dtk ) {
				$tickets_sold[$dtk->ID()] = $dtk->get('DTK_sold');
			}
		}

		return $tickets_sold;
	}



	/**
	 * This helper function simply checks to see if any of this ticket have been sold for ANY of the datetimes associated with this 
	 * @return bool True if there are tickets sold, false if there aren't.
	 */
	public function any_tickets_sold() {
		$tickets_sold = $this->tickets_sold();
		if ( empty( $tickets_sold ) ) return FALSE; //early jumpout if there is an empty array (means there are not datetimes associated with this ticket)

		foreach ( $tickets_sold as $sold ) {
			if ( $ticket > 0 ) return TRUE;
		}

		return FALSE;
	}


} //end EE_Ticket class