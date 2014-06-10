<?php if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package 		Event Espresso
 * @ author 		Event Espresso
 * @ copyright 	(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license 		{@link http://eventespresso.com/support/terms-conditions/}   * see Plugin Licensing *
 * @ link 				{@link http://www.eventespresso.com}
 * @ since 			4.0
 *
 */



/**
 * Event Question Group Model
 *
 * @package 			Event Espresso
 * @subpackage 	includes/models/
 * @author 				Mike Nelson
 */
class EE_Event extends EE_CPT_Base {

	/**
	 * This is just used for caching the Primary Datetime for the Event on initial retrieval
	 * @var EE_Datetime
	 */
	protected $_Primary_Datetime;



	/**
	 *
	 * @param array $props_n_values
	 * @return EE_Event
	 */
	public static function new_instance( $props_n_values = array() ) {
		$has_object = parent::_check_for_object( $props_n_values, __CLASS__ );
		$obj = $has_object ? $has_object : new self( $props_n_values );
		//we need to set the _timezone property to whatever is set in the db for the event initially.
		$obj->set_timezone( $obj->timezone_string() );
		return $obj;
	}



	/**
	 *
	 * @param array $props_n_values
	 * @return EE_Event
	 */
	public static function new_instance_from_db( $props_n_values = array() ) {
		$obj = new self( $props_n_values, TRUE );
		//we need to set the _timezone property to whatever is set in the db for the event initially.
		$obj->set_timezone( $obj->timezone_string() );
		return $obj;
	}



	/**
	 * Gets all the datetimes for this event, ordered by the DTT_order on the datetime.
	 * @darren, we should probably UNSET timezone on the EEM_Datetime model
	 * after running our query, so that this timezone isn't set for EVERY query
	 * on EEM_Datetime for the rest of the request, no?
	 * @param boolean $show_expired whether or not to include expired events
	 * @param boolean $show_deleted whether or not to include deleted events
	 * @return EE_Datetime[]
	 */
	public function datetimes_ordered( $show_expired = TRUE, $show_deleted = FALSE ) {
		return EEM_Datetime::instance( $this->_timezone )->get_datetimes_for_event_ordered_by_DTT_order( $this->ID(), $show_expired, $show_deleted );
	}



	/**
	 * Returns one related datetime. Mostly only used by some legacy code.
	 * @return EE_Datetime
	 */
	public function first_datetime() {
		return $this->get_first_related( 'Datetime' );
	}



	/**
	 * Returns the 'primary' datetime for the event
	 * @param bool $try_to_exclude_expired
	 * @param bool $try_to_exclude_deleted
	 * @return EE_Datetime
	 */
	public function primary_datetime( $try_to_exclude_expired = TRUE, $try_to_exclude_deleted = TRUE ) {
		if ( !empty ( $this->_Primary_Datetime ) ) {
			return $this->_Primary_Datetime;
		}
		$this->_Primary_Datetime = EEM_Datetime::instance( $this->_timezone )->get_primary_datetime_for_event( $this->ID(), $try_to_exclude_expired, $try_to_exclude_deleted );
		return $this->_Primary_Datetime;
	}



	/**
	 * Gets all the tickets available for purchase of this event
	 * @param array $query_params like EEM_Base::get_all
	 * @return EE_Ticket
	 */
	public function tickets( $query_params = array() ) {
		return $this->get_many_related( 'Ticket', $query_params );
	}



	/**
	 * @return bool
	 */
	function additional_limit() {
		return $this->get( 'EVT_additional_limit' );
	}



	/**
	 * @return bool
	 */
	function allow_overflow() {
		return $this->get( 'EVT_allow_overflow' );
	}



	/**
	 * @return bool
	 */
	function created() {
		return $this->get( 'EVT_created' );
	}



	/**
	 * @return bool
	 */
	function description() {
		return $this->get( 'EVT_desc' );
	}



	/**
	 * Runs do_shortcode and wpautop on the description
	 * @return string of html
	 */
	function description_filtered() {
		return $this->get_pretty( 'EVT_desc' );
	}



	/**
	 * @return bool
	 */
	function display_description() {
		return $this->get( 'EVT_display_desc' );
	}



	/**
	 * @return bool
	 */
	function display_ticket_selector() {
		return $this->get( 'EVT_display_ticket_selector' );
	}



	/**
	 * @return bool
	 */
	function external_url() {
		return $this->get( 'EVT_external_URL' );
	}



	/**
	 * @return bool
	 */
	function member_only() {
		return $this->get( 'EVT_member_only' );
	}



	/**
	 * @return bool
	 */
	function phone() {
		return $this->get( 'EVT_phone' );
	}



	/**
	 * @return bool
	 */
	function modified() {
		return $this->get( 'EVT_modified' );
	}



	/**
	 * @return bool
	 */
	function name() {
		return $this->get( 'EVT_name' );
	}



	/**
	 * @return bool
	 */
	function order() {
		return $this->get( 'EVT_order' );
	}



	/**
	 * @return bool|string
	 */
	function default_registration_status() {
		$event_default_registration_status = $this->get( 'EVT_default_registration_status' );
		return !empty( $event_default_registration_status ) ? $event_default_registration_status : EE_Registry::instance()->CFG->registration->default_STS_ID;
	}



	/**
	 * @param int  $num_words
	 * @param null $more
	 * @param bool $not_full_desc
	 * @return bool|string
	 */
	function short_description( $num_words = 55, $more = NULL, $not_full_desc = FALSE ) {
		$short_desc = $this->get( 'EVT_short_desc' );
		if ( !empty( $short_desc ) || $not_full_desc ) {
			return $short_desc;
		}
		else {
			$full_desc = $this->get( 'EVT_desc' );
			return wp_trim_words( $full_desc, $num_words, $more );
		}
	}



	/**
	 * @return bool
	 */
	function slug() {
		return $this->get( 'EVT_slug' );
	}



	/**
	 * @return bool
	 */
	function timezone_string() {
		return $this->get( 'EVT_timezone_string' );
	}



	/**
	 * @return bool
	 */
	function visible_on() {
		return $this->get( 'EVT_visible_on' );
	}



	/**
	 * @return bool
	 */
	function wp_user() {
		return $this->get( 'EVT_wp_user' );
	}



	/**
	 * @return bool
	 */
	function donations() {
		return $this->get( 'EVT_donations' );
	}



	/**
	 * @param $limit
	 */
	function set_additional_limit( $limit ) {
		$this->set( 'EVT_additional_limit', $limit );
	}



	/**
	 * @param $created
	 */
	function set_created( $created ) {
		$this->set( 'EVT_created', $created );
	}



	/**
	 * @param $desc
	 */
	function set_description( $desc ) {
		$this->set( 'EVT_desc', $desc );
	}



	/**
	 * @param $display_desc
	 */
	function set_display_description( $display_desc ) {
		$this->set( 'EVT_display_desc', $display_desc );
	}



	/**
	 * @param $display_ticket_selector
	 */
	function set_display_ticket_selector( $display_ticket_selector ) {
		$this->set( 'EVT_display_ticket_selector', $display_ticket_selector );
	}



	/**
	 * @param $external_url
	 */
	function set_external_url( $external_url ) {
		$this->set( 'EVT_external_URL', $external_url );
	}



	/**
	 * @param $member_only
	 */
	function set_member_only( $member_only ) {
		$this->set( 'EVT_member_only', $member_only );
	}



	/**
	 * @param $event_phone
	 */
	function set_event_phone( $event_phone ) {
		$this->set( 'EVT_phone', $event_phone );
	}



	/**
	 * @param $modified
	 */
	function set_modified( $modified ) {
		$this->set( 'EVT_modified', $modified );
	}



	/**
	 * @param $name
	 */
	function set_name( $name ) {
		$this->set( 'EVT_name', $name );
	}



	/**
	 * @param $order
	 */
	function set_order( $order ) {
		$this->set( 'EVT_order', $order );
	}



	/**
	 * @param $short_desc
	 */
	function set_short_description( $short_desc ) {
		$this->set( 'EVT_short_desc', $short_desc );
	}



	/**
	 * @param $slug
	 */
	function set_slug( $slug ) {
		$this->set( 'EVT_slug', $slug );
	}



	/**
	 * @param $timezone_string
	 */
	function set_timezone_string( $timezone_string ) {
		$this->set( 'EVT_timezone_string', $timezone_string );
	}



	/**
	 * @param $visible_on
	 */
	function set_visible_on( $visible_on ) {
		$this->set( 'EVT_visible_on', $visible_on );
	}



	/**
	 * @param $wp_user
	 */
	function set_wp_user( $wp_user ) {
		$this->set( 'EVT_wp_user', $wp_user );
	}



	/**
	 * @param $default_registration_status
	 */
	function set_default_registration_status( $default_registration_status ) {
		$this->set( 'EVT_default_registration_status', $default_registration_status );
	}



	/**
	 * @param $donations
	 */
	function set_donations( $donations ) {
		$this->set( 'EVT_donations', $donations );
	}



	/**
	 * Adds a venue to this event
	 * @param EE_Venue /int $venue_id_or_obj
	 * @return EE_Venue
	 */
	function add_venue( $venue_id_or_obj ) {
		return $this->_add_relation_to( $venue_id_or_obj, 'Venue' );
	}



	/**
	 * Removes a venue from the event
	 * @param EE_Venue /int $venue_id_or_obj
	 * @return EE_Venue
	 */
	function remove_venue( $venue_id_or_obj ) {
		return $this->_remove_relation_to( $venue_id_or_obj, 'Venue' );
	}



	/**
	 * Gets all the venues related ot the event. May provide additional $query_params if desired
	 * @param array $query_params like EEM_Base::get_all's $query_params
	 * @return EE_Venue[]
	 */
	function venues( $query_params = array() ) {
		return $this->get_many_related( 'Venue', $query_params );
	}



	/**
	 * check if event id is present and if event is published
	 * @access public
	 * @return boolean true yes, false no
	 */
	private function _has_ID_and_is_published() {
		// first check if event id is present and not NULL, then check if this event is published (or any of the equivalent "published" statuses)
		return ( $this->ID() && $this->ID() !== NULL && ( $this->status() == 'publish' || $this->status() == EEM_Event::sold_out || $this->status() == EEM_Event::postponed || $this->status() == EEM_Event::cancelled ) ) ? TRUE : FALSE;
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
		$datetimes = $this->get_many_related( 'Datetime', array( 'order_by' => array( 'DTT_EVT_start' => 'ASC' ) ) );
		foreach ( $datetimes as $datetime ) {
			if ( $datetime instanceof EE_Datetime ) {
				//if this dtt is expired then we continue cause one of the other datetimes might be upcoming.
				if ( $datetime->is_expired() ) {
					continue;
				}
				//if this dtt is active then we return false.
				if ( $datetime->is_active() ) {
					return FALSE;
				}
				//otherwise let's check upcoming status
				$upcoming = $datetime->is_upcoming();
			}
		}
		return $upcoming;
	}



	/**
	 * @return bool
	 */
	public function is_active() {
		// check if event id is present and if this event is published
		if ( $this->is_inactive() ) {
			return FALSE;
		}
		// set initial value
		$active = FALSE;
		//next let's get all datetimes and loop through them
		$datetimes = $this->get_many_related( 'Datetime', array( 'order_by' => array( 'DTT_EVT_start' => 'ASC' ) ) );
		foreach ( $datetimes as $datetime ) {
			if ( $datetime instanceof EE_Datetime ) {
				//if this dtt is expired then we continue cause one of the other datetimes might be active.
				if ( $datetime->is_expired() ) {
					continue;
				}
				//if this dtt is upcoming then we return false.
				if ( $datetime->is_upcoming() ) {
					return FALSE;
				}
				//otherwise let's check active status
				$active = $datetime->is_active();
			}
		}
		return $active;
	}



	/**
	 * @return bool
	 */
	public function is_expired() {
		// check if event id is present and if this event is published
		if ( $this->is_inactive() ) {
			return FALSE;
		}
		// set initial value
		$expired = FALSE;
		//first let's get all datetimes and loop through them
		$datetimes = $this->get_many_related( 'Datetime', array( 'order_by' => array( 'DTT_EVT_start' => 'ASC' ) ) );
		foreach ( $datetimes as $datetime ) {
			if ( $datetime instanceof EE_Datetime ) {
				//if this dtt is upcoming or active then we return false.
				if ( $datetime->is_upcoming() || $datetime->is_active() ) {
					return FALSE;
				}
				//otherwise let's check active status
				$expired = $datetime->is_expired();
			}
		}
		return $expired;
	}



	/**
	 * @return bool
	 */
	public function is_inactive() {
		// check if event id is present and if this event is published
		if ( $this->_has_ID_and_is_published() ) {
			return FALSE;
		}
		return TRUE;
	}



	/**
	 *    perform_sold_out_status_check
	 *    checks all of this events's datetime  reg_limit - sold values to determine if ANY datetimes have spaces available...
	 *    if NOT, then the event status will get toggled to 'sold_out'
	 *
	 * @access public
	 * @return bool    return the ACTUAL sold out state.
	 */
	public function perform_sold_out_status_check() {
		// set initial value
		$spaces_remaining = 0;
		//next let's get all datetimes and loop through them
		$datetimes = $this->get_many_related( 'Datetime', array( 'order_by' => array( 'DTT_EVT_start' => 'ASC' ) ) );
		foreach ( $datetimes as $datetime ) {
			if ( $datetime instanceof EE_Datetime ) {
				$dtt_spaces_remaining = $datetime->spaces_remaining( TRUE );
				// if datetime has unlimited reg limit then the event can never be sold out
				if ( $dtt_spaces_remaining === INF ) {
					return FALSE;
				}
				else {
					$spaces_remaining = max( $dtt_spaces_remaining, $spaces_remaining );
				}
			}
		}
		if ( $spaces_remaining === 0 ) {
			$this->set_status( EEM_Event::sold_out );
			if ( !is_admin() || ( is_admin() && defined( 'DOING_AJAX' ) ) ) {
				$this->save();
			}
			$sold_out = TRUE;
		}
		else {
			$sold_out = FALSE;
		}
		//note: I considered changing the EEM_Event status away from sold_out if this status check reveals that it's no longer sold out (yet the status is still set as sold out) but the problem is... what do we change the status BACK to?  We can't always assume that the previous event status was 'published' because this status check is always done in the admin and its entirely possible the event admin manually changes to sold_out status from some other status.  We also don't want a draft event to become a "publish event" because the sold out check reveals its NOT sold out.
		// So I'll forgo the automatic switch away from sold out status for now and instead just return the $sold out status... so this check can be used to validate the TRUE sold out status regardless of what the Event status is set to.
		return $sold_out;
	}



	/**
	 * Checks if the event is set to sold out
	 * @param  bool $actual whether or not to perform calculations to not only figure the actual status but also to flip the status if necessary to sold out If false, we just check the existing status of the event
	 * @return boolean
	 */
	public function is_sold_out( $actual = FALSE ) {
		if ( !$actual ) {
			return $this->status() == EEM_Event::sold_out;
		}
		else {
			return $this->perform_sold_out_status_check();
		}
	}



	/**
	 * Checks if the event is marked as postponed
	 * @return boolean
	 */
	public function is_postponed() {
		return $this->status() == EEM_Event::postponed;
	}



	/**
	 * Checks if the event is marked as cancelled
	 * @return boolean
	 */
	public function is_cancelled() {
		return $this->status() == EEM_Event::cancelled;
	}



	/**
	 * Get the logical active status in a hierarchical order for all the datetimes.
	 *
	 * Basically, we order the datetimes by EVT_start_date.  Then first test on whether the event is published.  If its NOT published then we test for whether its expired or not.  IF it IS published then we test first on whether an event has any active dates.  If no active dates then we check for any upcoming dates.  If no upcoming dates then the event is considered expired.
	 *
	 * @return int (based on EE_Datetime active constants.
	 */
	public function get_active_status() {
		$status_array = array();
		//first check if event id is present on this object
		if ( !$this->ID() ) {
			return FALSE;
		}
		//first get all datetimes ordered by date
		$datetimes = $this->get_many_related( 'Datetime', array( 'order_by' => array( 'DTT_EVT_start' => 'ASC' ) ) );
		//next loop through $datetimes and setup status array
		foreach ( $datetimes as $datetime ) {
			if ( $datetime instanceof EE_Datetime ) {
				$status_array[ ] = $datetime->get_active_status();
			}
		}
		//now we can conditionally determine status
		if ( $this->status() == 'publish' ) {
			if ( in_array( EE_Datetime::active, $status_array ) ) {
				return EE_Datetime::active;
			}
			else {
				if ( in_array( EE_Datetime::upcoming, $status_array ) ) {
					return EE_Datetime::upcoming;
				}
				else {
					if ( in_array( EE_Datetime::expired, $status_array ) ) {
						return EE_Datetime::expired;
					}
					else {
						if ( in_array( EE_Datetime::sold_out, $status_array ) ) {
							return EE_Datetime::sold_out;
						}
						else {
							return EE_Datetime::expired; //catchall
						}
					}
				}
			}
		}
		else {
			switch ( $this->status() ) {
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
	 *    pretty_active_status
	 *
	 * @access public
	 * @param boolean $echo     whether to return (FALSE), or echo out the result (TRUE)
	 * @return mixed void|string
	 */
	public function pretty_active_status( $echo = TRUE ) {
		$active_status = $this->get_active_status();
		$status = '<span class="ee-status event-active-status-' . $active_status . '">' . EEH_Template::pretty_status( $active_status, FALSE, 'sentence' ) . '</span>';
		if ( $echo ) {
			echo $status;
		} else {
			return $status;
		}
	}



	/**
	 * @return bool|int
	 */
	public function get_number_of_tickets_sold() {
		$tkt_sold = 0;
		if ( !$this->ID() ) {
			return 0;
		}
		$datetimes = $this->get_many_related( 'Datetime' );
		foreach ( $datetimes as $datetime ) {
			$tkt_sold += $datetime->get( 'DTT_sold' );
		}
		return $tkt_sold;
	}



	/**
	 * This just returns a count of all the registrations for this event
	 * @access  public
	 * @return int
	 */
	public function get_count_of_all_registrations() {
		return EEM_Event::instance()->count_related( $this, 'Registration' );
	}



	/**
	 * This returns the ticket with the earliest start time that is available for this event (across all datetimes attached to the event)
	 * @return EE_Ticket
	 */
	public function get_ticket_with_earliest_start_time() {
		$where[ 'Datetime.EVT_ID' ] = $this->ID();
		$query_params = array( $where, 'order_by' => array( 'TKT_start_date' => 'ASC' ) );
		return EE_Registry::instance()->load_model( 'Ticket' )->get_one( $query_params );
	}



	/**
	 * This returns the ticket with the latest end time that is available for this event (across all datetimes attached to the event)
	 * @return EE_Ticket
	 */
	public function get_ticket_with_latest_end_time() {
		$where[ 'Datetime.EVT_ID' ] = $this->ID();
		$query_params = array( $where, 'order_by' => array( 'TKT_end_date' => 'DESC' ) );
		return EE_Registry::instance()->load_model( 'Ticket' )->get_one( $query_params );
	}



	/**
	 * This returns whether there are any tickets on sale for this event.
	 * @return bool true = YES tickets on sale.
	 */
	public function tickets_on_sale() {
		$earliest_ticket = $this->get_ticket_with_earliest_start_time();
		$latest_ticket = $this->get_ticket_with_latest_end_time();
		if ( !$latest_ticket instanceof EE_Ticket && !$earliest_ticket instanceof EE_Ticket ) {
			return FALSE;
		}
		//check on sale for these two tickets.
		if ( $latest_ticket->is_on_sale() || $earliest_ticket->is_on_sale() ) {
			return TRUE;
		}
		return FALSE;
	}



	/**
	 * Gets the URL for viewing this event on the front-end. Overrides parent
	 * to check for an external URL first
	 * @return string
	 */
	public function get_permalink() {
		if ( $this->external_url() ) {
			return $this->external_url();
		}
		else {
			return parent::get_permalink();
		}
	}



	/**
	 * Gets the first term for 'espresso_event_categories' we can find
	 * @param array $query_params like EEM_Base::get_all
	 * @return EE_Term
	 */
	public function first_event_category( $query_params = array() ) {
		$query_params[ 0 ][ 'Term_Taxonomy.taxonomy' ] = 'espresso_event_categories';
		$query_params[ 0 ][ 'Term_Taxonomy.Event.EVT_ID' ] = $this->ID();
		return EEM_Term::instance()->get_one( $query_params );
	}



	/**
	 * Gets all terms for 'espresso_event_categories' we can find
	 * @param array $query_params
	 * @return EE_Term[]
	 */
	public function get_all_event_categories( $query_params = array() ) {
		$query_params[ 0 ][ 'Term_Taxonomy.taxonomy' ] = 'espresso_event_categories';
		$query_params[ 0 ][ 'Term_Taxonomy.Event.EVT_ID' ] = $this->ID();
		return EEM_Term::instance()->get_all( $query_params );
	}

	/**
	 * Gets all the question groups, ordering them by QSG_order ascending
	 * @param array $query_params @see EEM_Base::get_all
	 * @return EE_Question_Group[]
	 */
	public function question_groups($query_params = array()){
		$query_params = ! empty( $query_params ) ? $query_params : array( 'order_by' => array( 'QSG_order' => 'ASC' ));
		return $this->get_many_related('Question_Group', $query_params);
	}


}