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
	 * how many extra people user can register
	 * @var int
	 */
	protected $_EVT_additional_limit;
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
	 * @param boolean $show_expired whether or not to incldue expired events
	 * @param boolean $show_deleted whether or not to icnldue deleted events
	 * @return EE_Datetime[]
	 */
	public function datetimes_ordered($show_expired = TRUE, $show_deleted = FALSE){
		return EEM_Datetime::instance( $this->_timezone )->get_datetimes_for_event_ordered_by_start_time($this->_EVT_ID,$show_expired,$show_deleted);
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
	public function primary_datetime($try_to_exclude_expired = true, $try_to_exclude_deleted = true) {
		if ( !empty ( $this->_Primary_Datetime )) { 
			return $this->_Primary_Datetime; 
		}
		$this->_Primary_Datetime = EEM_Datetime::instance( $this->_timezone )->get_primary_datetime_for_event( $this->_EVT_ID ,$try_to_exclude_expired , $try_to_exclude_deleted );
//		$this->_Primary_Datetime = EEM_Datetime::instance( $this->_timezone )->get_most_important_datetime_for_event( $this->_EVT_ID );
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
	
	function allow_overflow(){
		return $this->get('EVT_allow_overflow');
	}
	function created(){
		return $this->get('EVT_created');
	}
	function description(){
		return $this->get('EVT_desc');
	}
	/**
	 * Runs do_shortcode and wpautop on the descrption
	 * @return string of html
	 */
	function description_filtered(){
		return $this->get_pretty('EVT_desc');
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
	function phone(){
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
	
	function default_registration_status() {
		return $this->get('EVT_default_registration_status');
	}
	
	function short_description( $num_words = 55, $more = NULL ){
		$short_desc = $this->get('EVT_short_desc');
		if ( ! empty( $short_desc )) {
			return $short_desc;
		} else {
			$full_desc = $this->get('EVT_desc');
			return wp_trim_words ( $full_desc, $num_words, $more );
		}
		
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
	 * check if event id is present and if event is published
	 * @access public
	 * @return boolean true yes, false no
	 */
	private function _has_ID_and_is_published() {
		// first check if event id is present and not NULL, then check if this event is published (or any of the equivalent "published" statuses)
		return ( $this->ID() && $this->ID() !== NULL && ($this->_status == 'publish' || $this->_status == EEM_Event::sold_out || $this->_status == EEM_Event::postponed || $this->_status == EEM_Event::cancelled ) ) ? TRUE : FALSE;		
	}


	/**
	 * This simply compares the internal dates with NOW and determines if the event is upcoming or not.
	 * @access public
	 * @return boolean true yes, false no
	 */
	public function is_upcoming() {
		// check if event id is present and if this event is published
		if ( $this->is_inactive() ) {
			return FALSE;
		}
		// set initial value
		$upcoming = FALSE;
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
		// check if event id is present and if this event is published
		if ( $this->is_inactive() ) {
			return FALSE;
		}
		// set initial value
		$active = FALSE;
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
		// check if event id is present and if this event is published
		if ( $this->is_inactive() ) {
			return FALSE;
		}
		// set initial value
		$expired = FALSE;
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
		// check if event id is present and if this event is published
		if ( $this->_has_ID_and_is_published() ) {
			return FALSE;
		}
		return TRUE;
	}



	/**
	 * 	perform_sold_out_status_check
	 * 	checks all of this events's datetime  reg_limit - sold values to determine if ANY datetimes have spaces available...
	 * 	if NOT, then the event status will get toggled to 'sold_out'
	 * 
	 * 	@access public
	 * 	@return bool    return the ACTUAL sold out state.
	 */
	public function perform_sold_out_status_check() {
		// set initial value
		$spaces_remaining = 0;
		//next let's get all datetimes and loop through them 
		$datetimes = $this->get_many_related( 'Datetime', array( 'order_by' => array( 'DTT_EVT_start' => 'ASC' )));
		foreach ( $datetimes as $datetime ) {
			$dtt_spaces_remaining = (int)$datetime->spaces_remaining(TRUE);
			// if datetime has unlimited reg limit then the event can never be sold out
			if ( $dtt_spaces_remaining === INF ) {
				return;
			} else {
				$spaces_remaining = max( $dtt_spaces_remaining, $spaces_remaining );
			}			
		}
		if ( $spaces_remaining === 0 ) {
			$this->set_status( EEM_Event::sold_out );
			$sold_out = TRUE;
		} else {
			$sold_out = FALSE;
		}

		//note: I considered changing the EEM_Event status away from sold_out if this status check reveals that it's no longer sold out (yet the status is still set as sold out) but the problem is... what do we change the status BACK to?  We can't always assume that the previous event status was 'published' because this status check is always done in the admin and its entirely possible the event admin manually changes to sold_out status from some other status.  We also don't want a draft event to become a "publish event" because the sold out check reveals its NOT sold out. 
		// So I'll forgo the automatic switch away from sold out status for now and instead just return the $sold out status... so this check can be used to validate the TRUE sold out status regardless of what the Event status is set to.

		return $sold_out;
	}



	/**
	 * Checks if the event is set to sold out
	 * @param  bool 	$actual  whether or not to perform calculations to not only figure the actual status but also to flip the status if necessary to sold out If false, we just check the existing status of the event
	 * @return boolean
	 */
	public function is_sold_out( $actual = FALSE ){
		if ( ! $actual )
			return $this->status() == EEM_Event::sold_out;
		else {
			return $this->perform_sold_out_status_check();
		}
	}



	/**
	 * Checks if the event is marked as postponed
	 * @return boolean
	 */
	public function is_postponed(){
		return $this->status() == EEM_Event::postponed;
	}



	/**
	 * Checks if the event is marked as cancelled
	 * @return boolean
	 */
	public function is_cancelled(){
		return $this->status() == EEM_Event::cancelled;
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
		if ( ! $this->ID() ) {
			return FALSE;
		}			

		//first get all dtts ordered by date
		$dtts = $this->get_many_related('Datetime', array( 'order_by' => array('DTT_EVT_start' => 'ASC' ) ) );

		//next loop through dtts and setup status array
		foreach ( $dtts as $dtt ) {
			$status_array[] = $dtt->get_active_status();
		}
		//now we can conditionally determine status
		if ( $this->_status == 'publish' ) {
			
			if ( in_array( EE_Datetime::active, $status_array )) {
				return EE_Datetime::active;
			} else if ( in_array( EE_Datetime::upcoming, $status_array )) {
				return EE_Datetime::upcoming;
			} else if ( in_array( EE_Datetime::expired, $status_array ) ) {
				return EE_Datetime::expired;
			}  else if ( in_array( EE_Datetime::sold_out, $status_array )) {
				return EE_Datetime::sold_out;	
			} else {
				return EE_Datetime::expired; //catchall
			}		
		} else {
			switch ($this->_status) {
				case EEM_Event::sold_out :
					return EE_Datetime::sold_out;
					break;
				case EEM_Event::cancelled :
					return EE_Datetime::cancelled;
					break;

				case EEM_Event::postponed :
					return EE_Datetime::postponed;
					break;

				default :
					return EE_Datetime::inactive;
			}			
		}
	}



	/**
	 * 	pretty_active_status
	 *
	 *  @access public
	 *  @param boolean 	$echo  whether to return (FALSE), or echo out the result (TRUE)
	 *  @param boolean	$show_all  whether to only return/show all stati or ONLY those with values less than 1 ie: only return negative/bad/warning stati like "sold out""
	 *  return string
	 */
	public function pretty_active_status( $echo = TRUE, $show_all = TRUE ) {
		$status = '';
		$active_status = $this->get_active_status();
		$status = '<span class="ee-status event-active-status-' . $active_status . '">' . EEH_Template::pretty_status($active_status, FALSE, 'sentence') . '</span>';
		
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



	/**
	 * This returns the ticket with the earliest start time that is available for this event (across all datetimes attached to the event)
	 * @return EE_Ticket
	 */
	public function get_ticket_with_earliest_start_time() {
		$where['Datetime.EVT_ID'] = $this->ID();
		$query_params = array( $where, 'order_by' => array('TKT_start_date' => 'ASC' ) );
		return EE_Registry::instance()->load_model('Ticket')->get_one($query_params);
	}



	
	/**
	 * This returns the ticket with the latest end time that is available for this event (across all datetimes attached to the event)
	 * @return EE_Ticket
	 */
	public function get_ticket_with_latest_end_time() {
		$where['Datetime.EVT_ID'] = $this->ID();
		$query_params = array( $where, 'order_by' => array( 'TKT_end_date' => 'DESC' ) );
		return EE_Registry::instance()->load_model('Ticket')->get_one($query_params);
	}




	/**
	 * This returns whether there are any tickets on sale for this event.
	 * @return bool true = YES tickets on sale.
	 */
	public function tickets_on_sale() {
		$earliest_ticket = $this->get_ticket_with_earliest_start_time();
		$latest_ticket = $this->get_ticket_with_latest_end_time();

		//check on sale for these two tickets.
		if ( $latest_ticket->is_on_sale() || $earliest_ticket->is_on_sale() )
			return TRUE;
		return FALSE;
	}




	/**
	 * Gets the URL for viewing this event on the front-end. Overrides parent
	 * to check for an external URL first
	 * @return string
	 */
	public function get_permalink() {
		if($this->external_url()){
			return $this->external_url();
		}else{
			return parent::get_permalink();
		}
	}
	/**
	 * Gets teh first term taxonomy we can find
	 * @param array $query_params like EEM_Base::get_all
	 * @return EE_Term_Taxonomy
	 */
	public function first_event_category($query_params = array()){
		$query_params[0]['Term_Taxonomy.taxonomy'] = 'espresso_event_categories';
		$query_params[0]['Term_Taxonomy.Event.EVT_ID'] = $this->ID();
		return EEM_Term::instance()->get_one($query_params);
	}




}