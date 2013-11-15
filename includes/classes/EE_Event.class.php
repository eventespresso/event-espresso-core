<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * Event Question Group Model
 *
 * @package			Event Espresso
 * @subpackage		includes/models/
 * @author				Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
require_once( EE_CLASSES . 'EE_CPT_Base.class.php');
class EE_Event extends EE_CPT_Base{ 	
	/**
	 * All registrations for this event
	 * @var EE_Registration[] 
	 */
	protected $_Registration;
	
	/**
	 * All datetimes this event is offered
	 * @var EE_Datetime[] 
	 */
	protected $_Datetime;



	/**
	 * This is just used for caching the Primary Datetime for the Event on initial retreival
	 * @var EE_Datetime
	 */
	protected $_Primary_Datetime;

	
	/**
	 * Al question groups which apply to this event
	 * @var EE_Question_Group[] 
	 */
	protected $_Question_Group;
	
	/**
	 * related venues
	 * @var EE_Venue[]
	 */
	protected $_Venue;
	
	/**
	 * Term (in context of a taxonomy) which apply to this event
	 * @var EE_Term_Taxonomy[]
	 */
	protected $_Term_Taxonomy;
	
	/**
	 * @var EE_Promotion_Object relation to teh join table between promotions and whatevers
	 */
	protected $_Promotion_Object;



	/**
	 * If this event has any related Message Template Groups attached to it, they will be added to this property.
	 * @var EE_Message_Template_Group[]
	 */
	protected $_Message_Template_Group;

	
	/**
	 * ID of event (post id)
	 * @var int 
	 */
	protected $_EVT_ID;
	/**
	 * name of the event
	 * @var string
	 */
	protected $_EVT_name;
	/**
	 * description of the event
	 * @var string
	 */
	protected $_EVT_desc;
	/**
	 * url-friendly string of event name
	 * @var string
	 */
	protected $_EVT_slug;
	/**
	 * STring describing Event
	 * @var string
	 */
	protected $_EVT_created;
	/**
	 * Short description of the event
	 * @var string
	 */
	protected $_EVT_short_desc;

	/**
	 * time last modified
	 * @var string
	 */
	protected $_EVT_modified;
	/**
	 * id of creator
	 * @var int 
	 */
	protected $_EVT_wp_user;
	
	/**
	 * indicates order of event on a menu
	 * @var int 
	 */
	protected $_EVT_order;
	/**
	 * whether or not to display the event's description
	 * @var boolean
	 */
	protected $_EVT_display_desc;
	/**
	 * whether ot not to display something
	 * @brent: yeah what is this field for? from mike
	 * @var boolean
	 */
	protected $_EVT_display_reg_form;
	/**
	 * indicates time when event should be visible
	 * @var int 
	 */
	protected $_EVT_visible_on;
	
	/**
	 * flag indicating whehter to allwo group registrations
	 * @var boolean
	 */
	protected $_EVT_allow_multiple;
	/**
	 * how many extra people user can register
	 * @var int
	 */
	protected $_EVT_additional_limit;
	/**
	 * flag indicating whether to require users to be approved by admin
	 * before they are approved
	 * @brent do we still need this? isnt there a global setting for this? from mike
	 * @var boolean
	 */
	protected $_EVT_require_pre_approval;
	/**
	 * whether event is for members only
	 * @var boolean
	 */
	protected $_EVT_member_only;
	/**
	 * Phone number for event.  Event managers can have a specific phone number attached to an event that users can call in to get more details.
	 * @var string
	 */
	protected $_EVT_phone;
	/**
	 * flag indicating whether ot not to allow overflow registrants
	 * @var boolean
	 */
	protected $_EVT_allow_overflow;
	/**
	 * timezone event will occur in
	 * @var string
	 */
	protected $_EVT_timezone_string;
	/**
	 * URL of event if hosted elsewhere
	 * @var string
	 */
	protected $_EVT_external_URL;

	
	/**
	 *Indicates whether or not this event accepts donations
	 * @var boolean
	 */
	protected $_EVT_donations;




	/**
	 * used to indicate what the default payment status for the event will be
	 * @var string
	 */
	protected $_EVT_default_registration_status;




	/**
	 * 
	 * @param type $props_n_values
	 * @return EE_Event
	 */
	public static function new_instance( $props_n_values = array() ) {
		$classname = __CLASS__;
		$has_object = parent::_check_for_object( $props_n_values, $classname );
		$obj = $has_object ? $has_object : new self( $props_n_values);

		//we need to set the _timezone property to whatever is set in the db for the event initially.
		$obj->set_timezone( $obj->timezone_string() );
		return $obj;
	}


	/**
	 * 
	 * @param type $props_n_values
	 * @return EE_Event
	 */
	public static function new_instance_from_db ( $props_n_values = array() ) {
		$obj = new self( $props_n_values, TRUE );
		//we need to set the _timezone property to whatever is set in the db for the event initially.
		$obj->set_timezone( $obj->timezone_string() );
		return $obj;
	}


	/**
	 * Gets all the datetimes for this event, first the primary datetime, and
	 * then ordered by date (earliest first)
	 * @darren, we should probably UNSET timezone on the EEM_Datetime model
	 * after running our query, so that this timezone isn't set for EVERY query
	 * on EEM_Datetime for the rest of the requeset, no?
	 * @return EE_Datetime[]
	 */
	public function datetimes(){
		return EEM_Datetime::instance( $this->_timezone )->get_all_event_dates($this->_EVT_ID);
	}
	
	/**
	 * Returns one related datetime. Mostly only used by some legacy code.
	 * @return EE_Datetime
	 */
	public function first_datetime(){
		return $this->get_first_related('Datetime');
	}

	/**
	 * Returns the 'primary' datetime for the event
	 * @return EE_Datetime
	 */
	public function primary_datetime() {
		if ( !empty ( $this->_Primary_Datetime )) { 
			return $this->_Primary_Datetime; 
		}
		$this->_Primary_Datetime = EEM_Datetime::instance( $this->_timezone )->get_most_important_datetime_for_event( $this->_EVT_ID );
		return $this->_Primary_Datetime;
	}

	/**
	 * Gets all the tickets available for purhcase of this event
	 * @param array $query_params like EEM_Base::get_all
	 * @return EE_Ticket
	 */
	public function tickets($query_params = array()){
		return $this->get_many_related('Ticket', $query_params);
	}
	
	
	function additional_limit(){
		return $this->get('EVT_additional_limit');
	}
	
	function allow_multiple(){
		return $this->get('EVT_allow_multiple');
	}
	function allow_overflow(){
		return $this->get('EVT_allow_overflow');
	}
	function created(){
		return $this->get('EVT_created');
	}
	function description(){
		return $this->get('EVT_desc');
	}
	function display_description(){
		return $this->get('EVT_display_desc');
	}
	function display_reg_form(){
		return $this->get('EVT_display_reg_form');
	}
	function external_url(){
		return $this->get('EVT_external_URL');
	}
	
	function member_only(){
		return $this->get('EVT_member_only');
	}
	function event_phone(){
		return $this->get('EVT_phone');
	}
	function modified(){
		return $this->get('EVT_modified');
	}
	function name(){
		return $this->get('EVT_name');
	}
	function order(){
		return $this->get('EVT_order');
	}
	
	
	function require_pre_approval(){
		return $this->get('EVT_require_pre_approval');
	}
	
	function default_registration_status() {
		return $this->get('EVT_default_registration_status');
	}
	function short_description(){
		return $this->get('EVT_short_desc');
	}
	function slug(){
		return $this->get('EVT_slug');
	}
	function timezone_string(){
		return $this->get('EVT_timezone_string');
	}
	function visible_on(){
		return $this->get('EVT_visible_on');
	}
	function wp_user(){
		return $this->get('EVT_wp_user');
	}
	function donations(){
		return $this->get('EVT_donations');
	}
	function set_additional_limit($limit){
		return $this->set('EVT_additional_limit',$limit);
	}
	function set_allow_multiple($allow_multiple) {
		return $this->set('EVT_allow_multiple', $allow_multiple);
	}
	function set_created($created) {
		return $this->set('EVT_created', $created);
	}
	function set_description($desc) {
		return $this->set('EVT_desc', $desc);
	}
	function set_display_description($display_desc) {
		return $this->set('EVT_display_desc', $display_desc);
	}
	function set_display_reg_form($display_reg_form) {
		return $this->set('EVT_display_reg_form', $display_reg_form);
	}
	function set_external_url($external_url) {
		return $this->set('EVT_external_url', $external_url);
	}
	function set_member_only($member_only) {
		return $this->set('EVT_member_only', $member_only);
	}
	function set_event_phone($event_phone) {
		return $this->set('EVT_phone', $event_phone);
	}
	function set_modified($modified) {
		return $this->set('EVT_modified', $modified);
	}
	function set_name($name) {
		return $this->set('EVT_name', $name);
	}
	function set_order($order) {
		return $this->set('EVT_order', $order);
	}
	
	function set_require_pre_approval($require_pre_approval) {
		return $this->set('EVT_require_pre_approval', $require_pre_approval);
	}
	function set_short_description($short_desc) {
		return $this->set('EVT_short_desc', $short_desc);
	}
	function set_slug($slug) {
		return $this->set('EVT_slug', $slug);
	}
	function set_timezone_string($timezone_string) {
		return $this->set('EVT_timezone_string', $timezone_string);
	}
	function set_visible_on($visible_on) {
		return $this->set('EVT_visible_on', $visible_on);
	}
	function set_wp_user($wp_user) {
		return $this->set('EVT_wp_user', $wp_user);
	}
	function set_default_registration_status( $default_registration_status ) {
		return $this->set('EVT_default_registration_status', $default_registration_status );
	}
	function set_donations($donations){
		return $this->set('EVT_donations',$donations);
	}
	
	/**
	 * Adds a venue to this event
	 * @param EE_Venue/int $venue_id_or_obj
	 * @return EE_Venue
	 */
	function add_venue($venue_id_or_obj){
		return $this->_add_relation_to($venue_id_or_obj, 'Venue');
	}
	
	/**
	 * Removes a venue from the event
	 * @param EE_Venue/int $venue_id_or_obj
	 * @return EE_Venue
	 */
	function remove_venue($venue_id_or_obj){
		return $this->_remove_relation_to($venue_id_or_obj, 'Venue');
	}
	
	/**
	 * Gets all teh venues related ot the event. May provide additional $query_params if desired
	 * @param array $query_params like EEM_Base::get_all's $query_params
	 * @return EE_Venue[]
	 */
	function venues($query_params = array()){
		return $this->get_many_related('Venue', $query_params);
	}


	/**
	 * This simply compares the internal dates with NOW and determines if the event is upcoming or not.
	 * @access public
	 * @return boolean true yes, false no
	 */
	public function is_upcoming() {
		$upcoming = FALSE;

		//first check if event id is present on this object
		$evt_id = $this->ID();
		if ( empty( $evt_id) )
			return FALSE;

		//first we determine if this event is published.  If it isn't then we return false right away.
		if ( $this->_status != 'publish' ) return FALSE;

		//next let's get all datetimes and loop through them 
		$dtts = $this->get_many_related('Datetime', array( 'order_by' => array('DTT_EVT_start' => 'ASC' ) ) );
		foreach ( $dtts as $dtt ) {
			//if this dtt is expired then we continue cause one of the other datetimes might be upcoming.
			if ( $dtt->is_expired() ) continue;

			//if this dtt is active then we return false.
			if ( $dtt->is_active() ) return FALSE;

			//otherwise let's check upcoming status
			$upcoming = $dtt->is_upcoming();
		}

		return $upcoming;
	}



	public function is_active() {
		$active = FALSE;

		//first check if event id is present on this object
		$evt_id = $this->ID();
		if ( empty( $evt_id) )
			return FALSE;

		//first we determine if this event is published.  If it isn't then we return false right away.
		if ( $this->_status != 'publish' ) return FALSE;

		//next let's get all datetimes and loop through them 
		$dtts = $this->get_many_related('Datetime', array( 'order_by' => array('DTT_EVT_start' => 'ASC' ) ) );
		foreach ( $dtts as $dtt ) {
			//if this dtt is expired then we continue cause one of the other datetimes might be active.
			if ( $dtt->is_expired() ) continue;

			//if this dtt is upcoming then we return false.
			if ( $dtt->is_upcoming() ) return FALSE;

			//otherwise let's check active status
			$active = $dtt->is_active();
		}

		return $active;
	}



	public function is_expired() {
		$expired = FALSE;

		//first check if event id is present on this object
		$evt_id = $this->ID();
		if ( empty( $evt_id) )
			return FALSE;

		//first let's get all datetimes and loop through them 
		$dtts = $this->get_many_related('Datetime', array( 'order_by' => array('DTT_EVT_start' => 'ASC' ) ) );
		foreach ( $dtts as $dtt ) {

			//if this dtt is upcoming or active then we return false.
			if ( $dtt->is_upcoming() || $dtt->is_active() ) return FALSE;

			//otherwise let's check active status
			$expired = $dtt->is_expired();
		}

		return $expired;
	}



	public function is_inactive() {

		//first check if event id is present on this object
		$evt_id = $this->ID();
		if ( empty( $evt_id) )
			return TRUE;

		//first let's determine if the status is "publish" if it is then it can be returned cause it is NOT inactive
		if ( $this->_status == 'publish' ) return FALSE;

		//next let's get all datetimes and loop through them 
		$dtts = $this->get_many_related('Datetime', array( 'order_by' => array('DTT_EVT_start' => 'ASC' ) ) );
		foreach ( $dtts as $dtt ) {
			//all we're checking for is expire status cause if its expired then that's what we use.
			if ( $dtt->is_expired() ) return FALSE;
		}

		return TRUE;
	}



	/**
	 * Get the logical active status in a heirarchal order for all the datetimes.
	 *
	 * Basically, we order the dtts by EVT_start_date.  Then first test on whether the event is published.  If its NOT published then we test for whether its expired or not.  IF it IS published then we test first on whether an event has any active dates.  If no active dates then we check for any upcoming dates.  If no upcoming dates then the event is considered expired.
	 * 
	 * @return int (based on EE_Datetime active contstants.
	 */
	public function get_active_status() {
		$status_array = array();

		//first check if event id is present on this object
		$evt_id = $this->ID();
		if ( empty( $evt_id) )
			return FALSE;

		//first get all dtts ordered by date
		$dtts = $this->get_many_related('Datetime', array( 'order_by' => array('DTT_EVT_start' => 'ASC' ) ) );

		//next loop through dtts and setup status array
		foreach ( $dtts as $dtt ) {
			$status_array[] = $dtt->get_active_status();
		}

		//now we can conditionally determine status
		if ( $this->_status == 'publish' ) {
			if ( in_array(EE_Datetime::active, $status_array ) )
				return EE_Datetime::active;
			if ( in_array(EE_Datetime::upcoming, $status_array ) )
				return EE_Datetime::upcoming;
			return EE_Datetime::expired;
		} else {
			if ( in_array( EE_Datetime::expired, $status_array) )
				return EE_Datetime::expired;
		}

		return EE_Datetime::inactive;
	}




	public function pretty_active_status( $echo = TRUE ) {
		$active_status = $this->get_active_status();
		$status = FALSE; 

		switch ( $active_status ) {
			case EE_Datetime::expired :
				$status = __('Expired', 'event_espresso');
				$class = 'expired';
				break;
			case EE_Datetime::inactive :
				$status = __('Inactive', 'event_espresso');
				$class = 'inactive';
				break;

			case EE_Datetime::upcoming :
				$status = __('Upcoming', 'event_espresso');
				$class = 'upcoming';
				break;

			case EE_Datetime::active : 
				$status = __('Active', 'event_espresso');
				$class = 'active';
				break;

			default :
				$status = __('Inactive', 'event_espresso');
				$class = 'inactive';
				break;

		}

		$status = '<span class="ee-status ' . $class . '">' . $status . '</span>';
		if ( $echo ) {
			echo $status;
		} else {
			return $status;
		}
	}


	public function get_number_of_tickets_sold() {
		$tkt_sold = 0;

		if ( empty( $this->_EVT_ID ) )
			return 0;

		$datetimes = $this->get_many_related('Datetime');

		foreach ( $datetimes as $datetime ) {
			$tkt_sold += $datetime->get('DTT_sold');
		}

		return $tkt_sold;
	}




	/**
	 * This just returns a count of all the registrations for this event
	 * @access  public
	 * @return int
	 */
	public function get_count_of_all_registrations() {
		return EEM_Event::instance()->count_related($this, 'Registration');
	}



	//todo needs reworking an may get dropped.
	public function get_number_of_attendees_reg_limit( $type = 'NULL' ) {

		return "TODO: '$type' needs to be refactored";
		
		$reg_limit = $this->_EVT_reg_limit;
		switch ($type) {

			case 'available_spaces' :
			case 'num_attendees' :
			case 'number_available_spaces' :
			case 'num_completed_slash_incomplete' :
			case 'num_attendees_slash_reg_limit' :
			case 'avail_spaces_slash_reg_limit' :		
				$num_attendees = EEM_Registration::instance()->get_event_registration_count( $this->_EVT_ID );
			case 'reg_limit' :
			case 'available_spaces' :
			case 'number_available_spaces' :
			case 'avail_spaces_slash_reg_limit' :
			case 'num_attendees_slash_reg_limit' :
				$number_available_spaces = $reg_limit;
				if ($reg_limit > $num_attendees) {
					$number_available_spaces = $reg_limit - $num_attendees;
				}
			//break;

			case 'num_incomplete' :
			case 'num_completed_slash_incomplete' :
				$num_incomplete = EEM_Registration::instance()->get_event_registration_count( $this->_EVT_ID, TRUE );
			//break;
		}

		switch ($type) {
			case 'number_available_spaces' :
				return $number_available_spaces;
				break;
			case 'available_spaces' :
				if ($reg_limit >= 999) {
					$number_available_spaces = __('Unlimited', 'event_espresso');
				}
				return $number_available_spaces;
				break;
			case 'num_attendees' :
				return $num_attendees;
				break;
			case 'all_attendees' :
				$num_attendees = EEM_Attendee::instance()->count();
				return $num_attendees;
				break;
			case 'reg_limit' :
				return $reg_limit;
				break;
			case 'num_incomplete' :
				return $num_incomplete;
				break;
			//todo the below types and queries need to be handled.
			case 'num_completed' :
				$num_completed = 0;
				$a_sql = "SELECT SUM(quantity) quantity FROM " . EVENTS_ATTENDEE_TABLE . " WHERE event_id='" . $event_id . "' AND (payment_status='Completed' OR payment_status='Pending')  ";
				$wpdb->get_results($a_sql);
				if ($wpdb->num_rows > 0 && $wpdb->last_result[0]->quantity != NULL) {
					$num_completed = $wpdb->last_result[0]->quantity;
				}
				return $num_completed;
				break;
			case 'num_pending' :
				$num_pending = 0;
				$a_sql = "SELECT SUM(quantity) quantity FROM " . EVENTS_ATTENDEE_TABLE . " WHERE event_id='" . $event_id . "' AND  payment_status='Pending'";
				$wpdb->get_results($a_sql);
				if ($wpdb->num_rows > 0 && $wpdb->last_result[0]->quantity != NULL) {
					$num_pending = $wpdb->last_result[0]->quantity;
				}
				return $num_pending;
				break;
			case 'num_declined' :
				$num_declined = 0;
				$a_sql = "SELECT SUM(quantity) quantity FROM " . EVENTS_ATTENDEE_TABLE . " WHERE event_id='" . $event_id . "' AND  payment_status='Payment Declined'";
				$wpdb->get_results($a_sql);
				if ($wpdb->num_rows > 0 && $wpdb->last_result[0]->quantity != NULL) {
					$num_declined = $wpdb->last_result[0]->quantity;
				}
				return $num_declined;
				break;
			case 'num_completed_slash_incomplete' :
				return '<font color="green">' . $num_attendees . '</font>/<font color="red">' . $num_incomplete . '</font>';
				break;

			case 'avail_spaces_slash_reg_limit' :
				return $number_available_spaces . '/' . $reg_limit;
				break;
			case 'num_attendees_slash_reg_limit' :
			default:
				return $num_attendees . '/' . $reg_limit;
				break;
		}
	}


	
	

	/**
	 * This returns the ticket with the earliest start time that is available for this event (across all datetimes attached to the event)
	 * @return EE_Ticket
	 */
	public function get_ticket_with_earliest_start_time() {
		$where['Datetime.EVT_ID'] = $this->ID();
		$query_params = array( $where, 'order_by' => array('TKT_start_date' => 'ASC' ) );
		return $this->EE->load_model('Ticket')->get_one($query_params);
	}






}