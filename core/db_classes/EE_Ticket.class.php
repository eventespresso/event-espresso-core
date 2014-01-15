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
	const sold_out = -2;
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
	 * The number of times this ticket can be used to Check-in (per registration).
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
			// if  ticket sales for this datetime have exceeded the reg limit...
			if ( ! empty( $datetime ) && $datetime->sold_out() ) {
				return FALSE;
			}
		}
		// datetime is still open for registration, but is this ticket sold out ?
		return $this->_TKT_qty < 1 || $this->_TKT_qty > $this->_TKT_sold ? TRUE : FALSE;
	}


	/**
	 * The purpose of this method is to simply return a boolean for whether there are any tickets remaining for sale considering ALL the factors used for figuring that out.
	 *
	 * @access public
	 * @param  int     $DTT_ID if an int above 0 is included here then we get a specific dtt.
	 * @return boolean         true = tickets remaining, false not.
	 */
	public function is_remaining( $DTT_ID = 0 ) {
		$num_remaining = $this->remaining($DTT_ID);
		if ( $num_remaining === 0 )
			return false;

		if ( $num_remaining > 0 && $num_remaining < $this->min() )
			return false;

		return true;
	}	



	/**
	 * return the total number of tickets available for purchase
	 * @param  int    $DTT_ID the primary key for a particular datetime. set to null for 
	 * all related datetimes
	 * @return int
	 */
	public function remaining( $DTT_ID = 0 ) {
		// are we checking availablity for a particular datetime ?
		if ( $DTT_ID ) {
			// get that datetime object
			$datetimes = $this->get_many_related( 
				'Datetime',
				array( array( 'DTT_ID' => $DTT_ID ))
			); //needs to be in array for loop below.
		} else {
			// we need to check availability of ALL datetimes
			// get that datetime object
			$datetimes = $this->get_many_related( 
				'Datetime',
				array( 'order_by' => array( 'DTT_EVT_start' => 'ASC' ))
			);			
		}
//		d( $datetimes );
		// if datetime reg limit is not unlimited
		if ( ! empty( $datetimes )) {
			// although TKT_qty and $datetime->spaces_remaining() could both be INF
			//we only need to check for INF explicitly if we want to optimize.
			//because INF - x = INF; and min(x,INF) = x
			$tickets_remaining = $this->_TKT_qty - $this->_TKT_sold;
			foreach ( $datetimes as $datetime ) {
				$tickets_remaining =  min( $tickets_remaining, $datetime->spaces_remaining() );
			}
			return $tickets_remaining;
		}
	}



	/**
	 * Using the start date and end date this method calculates whether the ticket is On Sale, Pending, or Expired
	 * @param bool $display true = we'll return a localized string, otherwise we just return the value of the relevant status const
	 * @return mixed(int|string) status int if the display string isn't requested
	 */
	public function ticket_status( $display = FALSE ) {
		if ( $this->_TKT_qty - $this->_TKT_sold < 1 ) return $display ? __('Sold Out', 'event_espresso') : EE_Ticket::sold_out;
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
	 * This returns the chronologically first datetime that this ticket is associated with
	 * @return array
	 */
	public function first_datetime() {
		$datetimes = $this->get_many_related('Datetime');
		return reset( $datetimes );
	}

	/**
	 * This returns the chronologically last datetime that this ticket is associated with
	 * @return array
	 */
	public function last_datetime() {
		$datetimes = $this->get_many_related('Datetime');
		return end( $datetimes );
	}

	/**
	 * This returns the chronologically last datetime that this ticket is associated with
	 * @return array
	 */
	public function date_range( $dt_frmt = NULL ) {
		return $this->first_datetime()->start_date( $dt_frmt ) . ' - ' . $this->last_datetime()->end_date( $dt_frmt );
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
	 * This returns the base price object for the ticket.
	 *
	 * @access public
	 * @param  bool    $array whether to return as an array indexed by price id or just the object.
	 * @return EE_Price
	 */
	public function base_price( $array = FALSE ) {
		$_where = array(
			'Price_Type.PBT_ID' => EEM_Price_Type::base_type_base_price
			);
		return $array ? $this->get_many_related('Price', array($_where) ) : $this->get_first_related('Price', array($_where));
	}



	/**
	 * This returns ONLY the price modifiers for the ticket (i.e. no taxes or base price)
	 *
	 * @access public
	 * @return EE_Price[]
	 */
	public function price_modifiers() {
		$query_params = array(
			0 => array(
				'Price_Type.PBT_ID' => array( 'NOT IN', array(EEM_Price_Type::base_type_base_price, EEM_Price_Type::base_type_tax ) )
				)
			);
		return $this->prices($query_params);
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
	 * Gets all the datetimes this ticket can be used for attending.
	 * Unless otherwise sepcified, orders datetimes by start date.
	 * @param array $query_params see EEM_Base::get_all()
	 * @return EE_Datetime[]
	 */
	public function datetimes($query_params = array()){
		if( ! isset($query_params['order_by'])){
			$query_params['order_by']['DTT_EVT_start'] = 'ASC';
		}
		return $this->get_many_related('Datetime', $query_params);
	}
	
	/**
	 * Gets all the datetimes from teh db ordered by start time
	 * @param boolean $show_expired
	 * @param boolean $show_deleted
	 * @return EE_Datetime[]
	 */
	public function datetimes_ordered($show_expired = true, $show_deleted = false){
		return EEM_Datetime::instance($this->_timezone)->get_datetimes_for_ticket_ordered_by_start_time($this->ID(),$show_expired,$show_deleted);
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



	public function ticket_price() {
		return $this->get('TKT_price');
	}


	public function get_ticket_subtotal() {
		return EE_Taxes::get_subtotal_for_admin($this);
	}


	public function get_ticket_total_with_taxes() {
		return $this->get_ticket_subtotal() + $this->get_ticket_taxes_total_for_admin();
	}

	
	/**
	 * Gets ID
	 * @return string
	 */
	function ID() {
		return $this->get('TKT_ID');
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
	function start_date( $dt_frmt = NULL, $tm_frmt = NULL ) {
		return $this->_get_datetime( 'TKT_start_date', $dt_frmt, $tm_frmt );
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
	function end_date( $dt_frmt = NULL, $tm_frmt = NULL ) {
		return $this->_get_datetime( 'TKT_end_date', $dt_frmt, $tm_frmt );
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
	function set_sold( $sold ) {
		return $this->set('TKT_sold', $sold);
	}
	
	/**
	 * increments sold by amount passed by $qty
	 * @param int $qty
	 * @return boolean
	 */
	function increase_sold( $qty = 1 ) {
		$sold = $this->_TKT_sold + $qty;
		return $this->set_sold( $sold );
	}
	
	/**
	 * decrements (subtracts) sold by amount passed by $qty
	 * @param int $qty
	 * @return boolean
	 */
	function decrease_sold( $qty = 1 ) {
		$sold = $this->_TKT_sold - $qty;
		// sold can not go below zero
		$sold = max( 0, $sold );
		return $this->set_sold( $sold );
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
	/**
	 * Gets all the registrations for this ticket
	 * @param array $query_params like EEM_Base::get_all's
	 * @return EE_Registration[]
	 */
	public function registrations($query_params = array()){
		return $this->get_many_related('Registration', $query_params);
	}
	/**
	 * Counts the registrations for this ticket
	 * @param array $query_params like EEM_Base::get_all's
	 * @return int
	 */
	public function count_registrations($query_params = array()){
		return $this->count_related('Registration', $query_params);
	}
	
	/**
	 * Updates the TKT_sold attribute (and saves) based on the number of APPROVED registrations for thsi ticket.
	 * into account
	 * @return int
	 */
	public function update_tickets_sold(){
		$count_regs_for_this_ticket = $this->count_registrations( array( array( 'STS_ID' => EEM_Registration::status_id_approved, 'REG_deleted' => 0 )));
		$this->set_sold($count_regs_for_this_ticket);
		$this->save();
		return $count_regs_for_this_ticket;
	}
} //end EE_Ticket class