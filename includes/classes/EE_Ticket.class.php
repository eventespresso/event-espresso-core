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
	 * The quantity of tickets available
	 * @var INT
	 */
	protected $_TKT_qty;





	/**
	 * Number of this ticket sold
	 * @var int
	 */
	protected $_TKT_sold;





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
	public function all_tickets_sold() {
		$dtts = $this->get_many_related('Datetime');
		$tickets_sold = array();
		if ( !empty( $dtts ) ) {
			foreach ( $dtts as $dtt ) {
				$tickets_sold['datetime'][$dtt->ID()] = $dtt->get('DTT_sold');
			}
		}

		$tickets_sold['ticket'] = $this->get('TKT_sold');

		return $tickets_sold;
	}



	/**
	 * return number of tickets_sold().
	 * @return int
	 */
	public function tickets_sold() {
		return $this->get('TKT_sold');
	}


} //end EE_Ticket class