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
class EE_Ticket extends EE_Soft_Delete_Base_Class{

	/**
	 * The following constants are used by the ticket_status() method to indicate whether a ticket is on sale or not.
	 */
	const expired = -1;
	const archived = 0;
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
	 * the quantity of tickets sold
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
	 * Registrations on this ticket
	 * @var EE_Registration[]
	 */
	protected $_Registration;





	/**
	 * The template this ticket is using
	 * @var EE_Ticket_Template
	 */
	protected $_Ticket_Template;
	
	
	/**
	 * @var EE_Promotion_Object a relation to the join-table between promotions and whatevers
	 */
	protected $_Promotion_Object;


	/**
	 * 
	 * @param type $props_n_values
	 * @param type $timezone
	 * @return EE_Ticket
	 */
	public static function new_instance( $props_n_values = array(), $timezone = NULL ) {
		$classname = __CLASS__;
		$has_object = parent::_check_for_object( $props_n_values, $classname, $timezone );
		return $has_object ? $has_object : new self( $props_n_values, FALSE, $timezone );
	}

	/**
	 * 
	 * @param type $props_n_values
	 * @param type $timezone
	 * @return EE_Ticket
	 */
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
	 * return if a ticket has quantities availalbe for purchase
	 * @param  int    $DTT_ID the primary key for a particular datetime
	 * @return boolean
	 */
	public function available( $DTT_ID = FALSE ) {
		// are we checking availablity for a particular datetime ?
		if ( $DTT_ID ) {
			// get that datetime object
			$datetime = $this->get_first_related( 
				'Datetime',
				array( array( 'DTT_ID' => $DTT_ID ))
			);
			// get the registration limit
			$DTT_reg_limit = ! empty( $datetime ) ? $datetime->get( 'DTT_reg_limit' ) : 0;
			// get the tickets sold
			$DTT_sold = ! empty( $datetime ) ? $datetime->get( 'DTT_sold' ) : 0;
			// if there is a reg limit and ticket sales for this datetime have exceeded the reg limit...
			if ( $DTT_reg_limit != 0 && $DTT_sold >= $DTT_reg_limit ) {
				return FALSE;
			}
		}
		// datetime is still open for registration, but is this ticket sold out ?
		return $this->_TKT_qty < 1 || $this->_TKT_qty > $this->_TKT_sold ? TRUE : FALSE;
	}



	/**
	 * Using the start date and end date this method calculates whether the ticket is On Sale, Pending, or Expired
	 * @param bool $display true = we'll return a localized string, otherwise we just return the value of the relevant status const
	 * @return mixed(int|string) status int if the display string isn't requested
	 */
	public function ticket_status( $display = FALSE ) {
		if ( $this->_TKT_deleted ) return $display ? __('Archived', 'event_espresso') : EE_Ticket::archived;
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

		//Tickets sold
		$tickets_sold['ticket'] = $this->_TKT_sold;

		return $tickets_sold;
	}





	
	/**
	 * This returns the total tickets sold depending on the given parameters.
	 * @param  string $what   Can be one of two options: 'ticket', 'datetime'.
	 *                        'ticket' = total ticket sales for all datetimes this ticket is related to
	 *                        'datetime' = total ticket sales for a specified datetime (required $dtt_id) 
	 *                        'datetime' = total ticket sales in the datetime_ticket table. If $dtt_id is not given then we return an array of sales indexed by datetime.  If $dtt_id IS given then we return the tickets sold for that given datetime.
	 * @param  int    $dtt_id [optional] include the dtt_id with $what = 'datetime'.
	 * @return mixed (array|int)    	  how many tickets have sold
	 */
	public function tickets_sold( $what = 'ticket', $dtt_id = NULL ) {
		$total = 0;
		$tickets_sold = $this->_all_tickets_sold();
		switch ( $what ) {
			case 'ticket' :
				return $tickets_sold['ticket'];
				break;
				
			case 'datetime' :
				if ( empty( $tickets_sold['datetime'] ) )
					return $total;
				if ( !empty( $dtt_id ) && !isset( $tickets_sold['datetime'][$dtt_id] ) ) {
					EE_Error::add_error(__("You've requested the amount of tickets sold for a given ticket and datetime, however there are no records for the datetime id you included.  Are you SURE that is a datetime related to this ticket?", "event_espresso") );
					return $total;
				}

				return empty( $dtt_id ) ? $tickets_sold['datetime'] : $tickets_sold['datetime'][$dtt_id];
				break;
		}
	}
	
	/**
	 * Gets all the prices that combine to form teh final price of this ticket
	 * @param array $query_params like EEM_Base::get_all
	 * @return EE_Price[]
	 */
	public function prices($query_params = array()){
		return $this->get_many_related('Price', $query_params);
	}
	
	
	/**
	 * Gets all the ticket applicabilities (ie, relations between datetimes and tickets)
	 * @param array $query_params see EEM_Base::get_all()
	 * @return EE_Datetime_Ticket
	 */
	public function datetime_tickets($query_params = array()){
		return $this->get_many_related('Datetime_Ticket', $query_params);
	}
	
	/**
	 * Gets all the datetimes this ticket can be used for attending
	 * @param array $query_params see EEM_Base::get_all()
	 * @return EE_Datetime[]
	 */
	public function datetimes($query_params = array()){
		return $this->get_many_related('Datetime', $query_params);
	}
	
	/**
	 * Gets the template for the ticket
	 * @return EE_Ticket_Template
	 */
	public function template(){
		return $this->get_first_related('Ticket_Template');
	}



	/**
	 * Simply returns an array of EE_Price objects that are taxes.
	 * @return EE_Taxes[] 
	 */
	public function get_ticket_taxes_for_admin() {
		return EE_Taxes::get_taxes_for_admin($this);
	}




	/**
	 * Returns the total taxes applied to this ticket
	 * @return float
	 */
	public function get_ticket_taxes_total_for_admin() {
		return EE_Taxes::get_total_taxes_for_admin($this);
	}




	public function get_ticket_subtotal() {
		return $this->_TKT_taxable ? EE_Taxes::get_subtotal_for_admin($this) : $this->_TKT_price;
	}

	
	/**
	 * Gets name
	 * @return string
	 */
	function name() {
		return $this->get('TKT_name');
	}

	/**
	 * Sets name
	 * @param string $name
	 * @return boolean
	 */
	function set_name($name) {
		return $this->set('TKT_name', $name);
	}
	/**
	 * Gets description
	 * @return string
	 */
	function description() {
		return $this->get('TKT_description');
	}

	/**
	 * Sets description
	 * @param string $description
	 * @return boolean
	 */
	function set_description($description) {
		return $this->set('TKT_description', $description);
	}
	/**
	 * Gets start_date
	 * @return string
	 */
	function start_date() {
		return $this->get('TKT_start_date');
	}

	/**
	 * Sets start_date
	 * @param string $start_date
	 * @return boolean
	 */
	function set_start_date($start_date) {
		return $this->set('TKT_start_date', $start_date);
	}
	/**
	 * Gets end_date
	 * @return string
	 */
	function end_date() {
		return $this->get('TKT_end_date');
	}

	/**
	 * Sets end_date
	 * @param string $end_date
	 * @return boolean
	 */
	function set_end_date($end_date) {
		return $this->set('TKT_end_date', $end_date);
	}
	/**
	 * Gets min
	 * @return int
	 */
	function min() {
		return $this->get('TKT_min');
	}

	/**
	 * Sets min
	 * @param int $min
	 * @return boolean
	 */
	function set_min($min) {
		return $this->set('TKT_min', $min);
	}
	/**
	 * Gets max
	 * @return int
	 */
	function max() {
		return $this->get('TKT_max');
	}

	/**
	 * Sets max
	 * @param int $max
	 * @return boolean
	 */
	function set_max($max) {
		return $this->set('TKT_max', $max);
	}
	/**
	 * Gets price
	 * @return float
	 */
	function price() {
		return $this->get('TKT_price');
	}

	/**
	 * Sets price
	 * @param float $price
	 * @return boolean
	 */
	function set_price($price) {
		return $this->set('TKT_price', $price);
	}
	/**
	 * Gets sold
	 * @return int
	 */
	function sold() {
		return $this->get('TKT_sold');
	}

	/**
	 * Sets sold
	 * @param int $sold
	 * @return boolean
	 */
	function set_sold($sold) {
		return $this->set('TKT_sold', $sold);
	}
	/**
	 * Gets qty
	 * @return int
	 */
	function qty() {
		return $this->get('TKT_qty');
	}

	/**
	 * Sets qty
	 * @param int $qty
	 * @return boolean
	 */
	function set_qty($qty) {
		return $this->set('TKT_qty', $qty);
	}
	/**
	 * Gets uses
	 * @return int
	 */
	function uses() {
		return $this->get('TKT_uses');
	}

	/**
	 * Sets uses
	 * @param int $uses
	 * @return boolean
	 */
	function set_uses($uses) {
		return $this->set('TKT_uses', $uses);
	}
	/**
	 * Gets taxable
	 * @return boolean
	 */
	function taxable() {
		return $this->get('TKT_taxable');
	}

	/**
	 * Sets taxable
	 * @param boolean $taxable
	 * @return boolean
	 */
	function set_taxable($taxable) {
		return $this->set('TKT_taxable', $taxable);
	}
	/**
	 * Gets is_default
	 * @return boolean
	 */
	function is_default() {
		return $this->get('TKT_is_default');
	}

	/**
	 * Sets is_default
	 * @param boolean $is_default
	 * @return boolean
	 */
	function set_is_default($is_default) {
		return $this->set('TKT_is_default', $is_default);
	}
	/**
	 * Gets order
	 * @return int
	 */
	function order() {
		return $this->get('TKT_order');
	}

	/**
	 * Sets order
	 * @param int $order
	 * @return boolean
	 */
	function set_order($order) {
		return $this->set('TKT_order', $order);
	}
	/**
	 * Gets row
	 * @return int
	 */
	function row() {
		return $this->get('TKT_row');
	}

	/**
	 * Sets row
	 * @param int $row
	 * @return boolean
	 */
	function set_row($row) {
		return $this->set('TKT_row', $row);
	}
	/**
	 * Gets deleted
	 * @return boolean
	 */
	function deleted() {
		return $this->get('TKT_deleted');
	}

	/**
	 * Sets deleted
	 * @param boolean $deleted
	 * @return boolean
	 */
	function set_deleted($deleted) {
		return $this->set('TKT_deleted', $deleted);
	}
	/**
	 * Gets parent
	 * @return int
	 */
	function parent_ID() {
		return $this->get('TKT_parent');
	}

	/**
	 * Sets parent
	 * @param int $parent
	 * @return boolean
	 */
	function set_parent_ID($parent) {
		return $this->set('TKT_parent', $parent);
	}

	/**
	 * Gets a string which is handy for showing in gateways etc that describes the ticket.
	 * @return string
	 */
	function name_and_info(){
		foreach($this->datetimes() as $datetime){
				$times[] = $datetime->start_date_and_time();
			}
		return $this->name()." @ ".implode(", ",$times)." for ".$this->price();
	}
} //end EE_Ticket class