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
class EE_Event extends EE_Base_Class{ 	
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
	 * All prices which apply to this event
	 * @var EE_Price[] 
	 */
	protected $_Price;
	
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
	 * Related term-taxonomies (terms in context of a taxonomy).
	 * @var EE_Term_Taxonomy[]
	 */
	protected $_Term_Taxonomy;
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
	 * Foreign key into status table
	 * @var string
	 */
	protected $_STS_ID;
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
	 * id of parent
	 * @var int
	 */
	protected $_EVT_parent;
	/**
	 * indicates order of event on a menu
	 * @var int 
	 */
	protected $_EVT_order;
	/**
	 * flag indicating even tis active
	 * @var boolean
	 */
	protected $_EVT_is_active;
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
	 * registration limit on event
	 * @var int 
	 */
	protected $_EVT_reg_limit;
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
	 * 
	 * @param type $props_n_values
	 * @return EE_Event
	 */
	public static function new_instance( $props_n_values = array() ) {
		$classname = __CLASS__;
		$has_object = parent::_check_for_object( $props_n_values, $classname );
		return $has_object ? $has_object : new self( $props_n_values);
	}


	/**
	 * 
	 * @param type $props_n_values
	 * @return EE_Event
	 */
	public static function new_instance_from_db ( $props_n_values = array() ) {
		return new self( $props_n_values, TRUE );
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
		require_once('EEM_Datetime.model.php');
		return EEM_Datetime::instance( $this->_timezone )->get_all_event_dates($this->_EVT_ID);
	}

	public function primary_datetime() {
		require_once('EEM_Datetime.model.php');
		return EEM_Datetime::instance( $this->_timezone )->get_most_important_datetime_for_event( $this->_EVT_ID );
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
		return $this->get('EVT_external_url');
	}
	function is_active(){
		return $this->get('EVT_is_active');
	}
	function member_only(){
		return $this->get('EVT_member_only');
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
	function parent(){
		return $this->get('EVT_parent');
	}
	function reg_limit(){
		return $this->get('EVT_reg_limit');
	}
	function require_pre_approval(){
		return $this->get('EVT_require_pre_approval');
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
	function set_is_active($is_active) {
		return $this->set('EVT_is_active', $is_active);
	}
	function set_member_only($member_only) {
		return $this->set('EVT_member_only', $member_only);
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
	function set_parent($parent) {
		return $this->set('EVT_parent', $parent);
	}
	function set_reg_limit($reg_limit) {
		return $this->set('EVT_reg_limit', $reg_limit);
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



	public function get_number_of_attendees_reg_limit( $type = 'NULL' ) {
		
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
}