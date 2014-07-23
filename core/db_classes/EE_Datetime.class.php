<?php if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package        Event Espresso
 * @ author        Event Espresso
 * @ copyright    (c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license        {@link http://eventespresso.com/support/terms-conditions/}   * see Plugin Licensing *
 * @ link                {@link http://www.eventespresso.com}
 * @ since            4.0
 *
 */



/**
 * EE_Datetime class
 *
 * @package               Event Espresso
 * @subpackage            includes/classes/EE_Datetime.class.php
 * @author                Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EE_Datetime extends EE_Soft_Delete_Base_Class {

	/**
	 * constant used by get_active_status, indicates datetime has no more available spaces
	 */
	const sold_out = 'DTS';

	/**
	 * constant used by get_active_status, indicating datetime is still active (even is not over, can be registered-for)
	 */
	const active = 'DTA';

	/**
	 * constant used by get_active_status, indicating the datetime cannot be used for registrations yet, but has not expired
	 */
	const upcoming = 'DTU';

	/**
	 * Datetime is postponed
	 */
	const postponed = 'DTP';

	/**
	 * Datetime is cancelled
	 */
	const cancelled = 'DTC';

	/**
	 * constant used by get_active_status, indicates datetime has expired (event is over)
	 */
	const expired = 'DTE';

	/**
	 * constant used in various places indicating that an event is INACTIVE (not yet ready to be published)
	 */
	const inactive = 'DTI';



	/**
	 *
	 * @param array  $props_n_values
	 * @param string $timezone
	 * @return EE_Datetime
	 */
	public static function new_instance( $props_n_values = array(), $timezone = NULL ) {
		$has_object = parent::_check_for_object( $props_n_values, __CLASS__, $timezone );
		return $has_object ? $has_object : new self( $props_n_values, FALSE, $timezone );
	}



	/**
	 * @param array $props_n_values
	 * @param null  $timezone
	 * @return EE_Datetime
	 */
	public static function new_instance_from_db( $props_n_values = array(), $timezone = NULL ) {
		return new self( $props_n_values, TRUE, $timezone );
	}



	/**
	 * @param $name
	 */
	public function set_name( $name ) {
		$this->set( 'DTT_name', $name );
	}



	/**
	 * @param $description
	 */
	public function set_description( $description ) {
		$this->set( 'DTT_description', $description );
	}



	/**
	 *        Set event start date
	 *
	 *        set the start date for an event
	 *
	 * @access        public
	 * @param        string $date a string representation of the event's date ex:  Dec. 25, 2025 or 12-25-2025
	 */
	public function set_start_date( $date ) {
		$this->_set_date_for( $date, 'DTT_EVT_start' );
	}



	/**
	 *        Set event start time
	 *
	 *        set the start time for an event
	 *
	 * @access        public
	 * @param        string $time a string representation of the event time ex:  9am  or  7:30 PM
	 */
	public function set_start_time( $time ) {
		$this->_set_time_for( $time, 'DTT_EVT_start' );
	}



	/**
	 *        Set event end date
	 *
	 *        set the end date for an event
	 *
	 * @access        public
	 * @param        string $date a string representation of the event's date ex:  Dec. 25, 2025 or 12-25-2025
	 */
	public function set_end_date( $date ) {
		$this->_set_date_for( $date, 'DTT_EVT_end' );
	}



	/**
	 *        Set event end time
	 *
	 *        set the end time for an event
	 *
	 * @access        public
	 * @param        string $time a string representation of the event time ex:  9am  or  7:30 PM
	 */
	public function set_end_time( $time ) {
		$this->_set_time_for( $time, 'DTT_EVT_end' );
	}



	/**
	 *        Set registration limit
	 *
	 *        set the maximum number of attendees that can be registered for this datetime slot
	 *
	 * @access        public
	 * @param        int $reg_limit
	 */
	public function set_reg_limit( $reg_limit ) {
		$this->set( 'DTT_reg_limit', $reg_limit );
	}



	/**
	 *    set_sold
	 *
	 * @access        public
	 * @param        int $sold
	 */
	public function set_sold( $sold ) {
		$this->set( 'DTT_sold', $sold );
	}



	/**
	 * increments sold by amount passed by $qty
	 * @param int $qty
	 */
	function increase_sold( $qty = 1 ) {
		$sold = $this->get_raw( 'DTT_sold' ) + $qty;
		$this->set_sold( $sold );
	}



	/**
	 * decrements (subtracts) sold amount passed by $qty
	 * @param int $qty
	 */
	function decrease_sold( $qty = 1 ) {
		$sold = $this->get_raw( 'DTT_sold' ) - $qty;
		// sold can not go below zero
		$sold = max( 0, $sold );
		$this->set_sold( $sold );
	}



	/**
	 * returns the datetime name
	 * @return string
	 */
	public function name() {
		return $this->get( 'DTT_name' );
	}



	/**
	 * returns the datetime description
	 * @return string
	 */
	public function description() {
		return $this->get( 'DTT_description' );
	}



	/**
	 * This helper simply returns whether the event_datetime for the current datetime is a primary datetime
	 * @return boolean          TRUE if is primary, FALSE if not.
	 */
	public function is_primary() {
		return $this->get( 'DTT_is_primary' );
	}



	/**
	 * This helper simply returns the order for the datetime
	 * @return int         The order of the datetime for this event.
	 */
	public function order() {
		return $this->get( 'DTT_order' );
	}



	/**
	 * This helper simply returns the parent id for the datetime
	 * @return int
	 */
	public function parent() {
		return $this->get( 'DTT_parent' );
	}



	/**
	 *        show date and/or time
	 *
	 * @access    private
	 * @param    string $date_or_time - whether to display a date or time or both
	 * @param    string $start_or_end - whether to display start or end datetimes
	 * @param    string $dt_frmt
	 * @param    string $tm_frmt
	 * @param    bool   $echo         - whether we echo or return (note echoing uses "pretty" formats, otherwise we use the standard formats)
	 * @return    string|bool|void  string on success, FALSE on fail
	 */
	private function _show_datetime( $date_or_time = NULL, $start_or_end = 'start', $dt_frmt = '', $tm_frmt = '', $echo = FALSE ) {
		$field_name = "DTT_EVT_{$start_or_end}";
		$dtt = $this->_get_datetime( $field_name, $dt_frmt, $tm_frmt, $date_or_time, $echo );
		if ( !$echo ) {
			return $dtt;
		}
	}



	/**
	 *        get event start date.  Provide either the date format, or NULL to re-use the
	 * last-used format, or '' to use the default date format
	 *
	 * @access        public
	 * @param null $dt_frmt
	 * @internal      param string $dt_format - string representation of date format defaults to 'F j, Y'
	 * @return        mixed        string on success, FALSE on fail
	 */
	public function start_date( $dt_frmt = NULL ) {
		return $this->_show_datetime( 'D', 'start', $dt_frmt );
	}



	/**
	 * Echoes start_date()
	 * @param string $dt_frmt
	 */
	public function e_start_date( $dt_frmt = NULL ) {
		$this->_show_datetime( 'D', 'start', $dt_frmt, NULL, TRUE );
	}



	/**
	 *        get end date. Provide either the date format, or NULL to re-use the
	 * last-used format, or '' to use the default date format
	 *
	 * @access        public
	 * @param null $dt_frmt
	 * @internal      param string $dt_format - string representation of date format defaults to 'F j, Y'
	 * @return        mixed        string on success, FALSE on fail
	 */
	public function end_date( $dt_frmt = NULL ) {
		return $this->_show_datetime( 'D', 'end', $dt_frmt );
	}



	/**
	 * Echoes the end date. See end_date()
	 * @param string $dt_frmt
	 */
	public function e_end_date( $dt_frmt = NULL ) {
		$this->_show_datetime( 'D', 'end', $dt_frmt, NULL, TRUE );
	}



	/**
	 *        get date_range - meaning the start AND end date
	 *
	 * @access        public
	 * @param null          $dt_frmt
	 * @param        string $conjunction - conjunction junction what's your function ? this string joins the start date with the end date ie: Jan 01 "to" Dec 31
	 * @internal      param string $dt_format - string representation of date format defaults to WP settings
	 * @return        mixed        string on success, FALSE on fail
	 */
	public function date_range( $dt_frmt = NULL, $conjunction = ' - ' ) {
		$dt_frmt = !empty( $dt_frmt ) ? $dt_frmt : $this->_dt_frmt;
		$start = str_replace( ' ', '&nbsp;', date_i18n( $dt_frmt, strtotime( $this->_show_datetime( 'D', 'start', NULL, NULL ) ) ) );
		$end = str_replace( ' ', '&nbsp;', date_i18n( $dt_frmt, strtotime( $this->_show_datetime( 'D', 'end', NULL, NULL ) ) ) );
		return $start != $end ? $start . $conjunction . $end : $start;
	}



	/**
	 * @param null   $dt_frmt
	 * @param string $conjunction
	 */
	public function e_date_range( $dt_frmt = NULL, $conjunction = ' - ' ) {
		echo $this->date_range( $dt_frmt, $conjunction );
	}



	/**
	 *        get start time
	 *
	 * @access        public
	 * @param        string $tm_format - string representation of time format defaults to 'g:i a'
	 * @return        mixed        string on success, FALSE on fail
	 */
	public function start_time( $tm_format = NULL ) {
		return $this->_show_datetime( 'T', 'start', NULL, $tm_format );
	}



	/**
	 * @param null $tm_format
	 */
	public function e_start_time( $tm_format = NULL ) {
		$this->_show_datetime( 'T', 'start', NULL, $tm_format, TRUE );
	}



	/**
	 *        get end time
	 *
	 * @access        public
	 * @param        string $tm_format - string representation of time format defaults to 'g:i a'
	 * @return        mixed        string on success, FALSE on fail
	 */
	public function end_time( $tm_format = NULL ) {
		return $this->_show_datetime( 'T', 'end', NULL, $tm_format );
	}



	/**
	 * @param null $tm_format
	 */
	public function e_end_time( $tm_format = NULL ) {
		$this->_show_datetime( 'T', 'end', NULL, $tm_format, TRUE );
	}



	/**
	 *        get time_range
	 *
	 * @access        public
	 * @param        string $tm_format   - string representation of time format defaults to 'g:i a'
	 * @param        string $conjunction - conjunction junction what's your function ? this string joins the start date with the end date ie: Jan 01 "to" Dec 31
	 * @return        mixed        string on success, FALSE on fail
	 */
	public function time_range( $tm_format = NULL, $conjunction = ' - ' ) {
		$tm_format = !empty( $tm_format ) ? $tm_format : $this->_tm_frmt;
		$start = str_replace( ' ', '&nbsp;', date_i18n( $tm_format, strtotime( $this->_show_datetime( 'T', 'start', NULL, NULL ) ) ) );
		$end = str_replace( ' ', '&nbsp;', date_i18n( $tm_format, strtotime( $this->_show_datetime( 'T', 'end', NULL, NULL ) ) ) );
		return $start != $end ? $start . $conjunction . $end : $start;
	}



	/**
	 * @param null   $tm_format
	 * @param string $conjunction
	 */
	public function e_time_range( $tm_format = NULL, $conjunction = ' - ' ) {
		echo $this->time_range( $tm_format, $conjunction );
	}



	/**
	 *        get start date and start time
	 *
	 * @access        public
	 * @param null          $dt_frmt
	 * @param        string $tm_format - string representation of time format defaults to 'g:i a'
	 * @internal      param string $dt_format - string representation of date format defaults to 'F j, Y'
	 * @return        mixed        string on success, FALSE on fail
	 */
	public function start_date_and_time( $dt_frmt = NULL, $tm_format = NULL ) {
		return $this->_show_datetime( '', 'start', $dt_frmt, $tm_format );
	}



	/**
	 * @param null $dt_frmt
	 * @param null $tm_format
	 */
	public function e_start_date_and_time( $dt_frmt = NULL, $tm_format = NULL ) {
		$this->_show_datetime( '', 'start', $dt_frmt, $tm_format, TRUE );
	}



	/**
	 * Shows the length of the event (start to end time).
	 * Can be shown in 'seconds','minutes','hours', or 'days'.
	 * By default, rounds up. (So if you use 'days', and then event
	 * only occurs for 1 hour, it will return 1 day).
	 * @param string $units 'seconds','minutes','hours','days'
	 * @param bool   $round_up
	 * @return float|int|mixed
	 */
	public function length( $units = 'seconds', $round_up = FALSE ) {
		$start = $this->get_raw( 'DTT_EVT_start' );
		$end = $this->get_raw( 'DTT_EVT_end' );
		$length_in_units = $end - $start;
		switch ( $units ) {
			//NOTE: We purposefully don't use "break;"
			//in order to chain the divisions
			case 'days':
				$length_in_units /= 24;
			case 'hours':
				$length_in_units /= 60;
			case 'minutes':
				$length_in_units /= 60;
			case 'seconds':
			default:
				$length_in_units = ceil( $length_in_units );
		}
		if ( $round_up ) {
			$length_in_units = max( $length_in_units, 1 );
		}
		return $length_in_units;
	}



	/**
	 *        get end date and time
	 *
	 * @access        public
	 * @param bool        $dt_frmt
	 * @param bool|string $tm_format - string representation of time format defaults to 'g:i a'
	 * @internal      param string $dt_format - string representation of date format defaults to 'F j, Y'
	 * @return        mixed        string on success, FALSE on fail
	 */
	public function end_date_and_time( $dt_frmt = FALSE, $tm_format = FALSE ) {
		return $this->_show_datetime( '', 'end', $dt_frmt, $tm_format );
	}



	/**
	 * @param bool $dt_frmt
	 * @param bool $tm_format
	 */
	public function e_end_date_and_time( $dt_frmt = FALSE, $tm_format = FALSE ) {
		$this->_show_datetime( '', 'end', $dt_frmt, $tm_format, TRUE );
	}



	/**
	 *        get start timestamp
	 *
	 * @access        public
	 * @return        int
	 */
	public function start() {
		return $this->get_raw( 'DTT_EVT_start' );
	}



	/**
	 *        get end timestamp
	 *
	 * @access        public
	 * @return        int
	 */
	public function end() {
		return $this->get_raw( 'DTT_EVT_end' );
	}



	/**
	 *    get the registration limit for this datetime slot
	 *
	 * @access        public
	 * @return        mixed        int on success, FALSE on fail
	 */
	public function reg_limit() {
		return $this->get_raw( 'DTT_reg_limit' );
	}



	/**
	 *    get the number of tickets sold for this datetime slot
	 *
	 * @access        public
	 * @return        mixed        int on success, FALSE on fail
	 */
	public function sold() {
		return $this->get_raw( 'DTT_sold' );
	}



	/**
	 *    have the tickets sold for this datetime, met or exceed the registration limit ?
	 *
	 * @access        public
	 * @return        boolean
	 */
	public function sold_out() {
		return $this->get( 'DTT_reg_limit' ) > 0 && $this->get( 'DTT_sold' ) >= $this->get( 'DTT_reg_limit' ) ? TRUE : FALSE;
	}



	/**
	 *    return the total number of spaces remaining at this venue.
	 *  This only takes the venue's capacity into account, NOT the tickets available for sale
	 *
	 * @access        public
	 * @param      bool $consider_tickets Whether to consider tickets remaining when determining if there are any spaces left (because if all tickets attached to this datetime have no spaces left, then this datetime IS effectively sold out)  However, there are cases where we just want to know the spaces remaining for this particular datetime hence the flag.
	 * @return        int
	 */
	public function spaces_remaining( $consider_tickets = FALSE ) {
		// tickets remaining availalbe for purchase
		//no need for special checks for infinite, because if DTT_reg_limit == INF, then INF - x = INF
		$dtt_remaining = $this->get( 'DTT_reg_limit' ) - $this->get( 'DTT_sold' );
		if ( !$consider_tickets ) {
			return $dtt_remaining;
		}
		$tickets_remaining = $this->tickets_remaining();
		return min( $dtt_remaining, $tickets_remaining );
	}



	/**
	 * Counts the total tickets available (from all the different types of tickets which are available for
	 * this datetime).
	 * @param array $query_params like EEM_Base::get_all's
	 * @return int
	 */
	public function tickets_remaining( $query_params = array() ) {
		return EEM_Ticket::instance()->sum_tickets_currently_available_at_datetime( $this->ID(), $query_params );
	}



	/**
	 * Gets the count of all the tickets available at this datetime (not ticket types)
	 * before any were sold
	 * @param array $query_params like EEM_Base::get_all's
	 * @return int
	 */
	public function sum_tickets_initially_available( $query_params = array() ) {
		return $this->sum_related( 'Ticket', $query_params, 'TKT_qty' );
	}



	/**
	 * Returns the lesser-of-the two: spaces remaining at this datetime, or
	 * the total tickets remaining (a sum of the tickets remaining for each ticket type
	 * that is available for this datetime).
	 * @return int
	 */
	public function total_tickets_available_at_this_datetime() {
		return min( array( $this->tickets_remaining(), $this->spaces_remaining() ) );
	}



	/**
	 * This simply compares the internal dtt for the given string with NOW and determines if the date is upcoming or not.
	 * @access public
	 * @return boolean
	 */
	public function is_upcoming() {
		return ( $this->get_raw( 'DTT_EVT_start' ) > time() );
	}



	/**
	 * This simply compares the internal datetime for the given string with NOW and returns if the date is active (i.e. start and end time)
	 * @return boolean
	 */
	public function is_active() {
		return ( $this->get_raw( 'DTT_EVT_start' ) < time() && $this->get_raw( 'DTT_EVT_end' ) > time() );
	}



	/**
	 * This simply compares the internal dtt for the given string with NOW and determines if the date is expired or not.
	 * @return boolean
	 */
	public function is_expired() {
		return ( $this->get_raw( 'DTT_EVT_end' ) < time() );
	}



	/**
	 * This returns the active status for whether an event is active, upcoming, or expired
	 * @return int       return value will be one of the EE_Datetime status constants.
	 */
	public function get_active_status() {
		$total_tickets_for_this_dtt = $this->total_tickets_available_at_this_datetime();
		if ( $total_tickets_for_this_dtt !== FALSE && $total_tickets_for_this_dtt < 1 ) {
			return EE_Datetime::sold_out;
		}
		if ( $this->is_expired() ) {
			return EE_Datetime::expired;
		}
		if ( $this->is_upcoming() ) {
			return EE_Datetime::upcoming;
		}
		if ( $this->is_active() ) {
			return EE_Datetime::active;
		}
	}



	/**
	 * This returns a nice display name for the datetime that is contingent on the span between the dates and times.
	 *
	 * @param  boolean $use_dtt_name if TRUE then we'll use DTT->name() if its not empty.
	 * @return string
	 */
	public function get_dtt_display_name( $use_dtt_name = FALSE ) {
		if ( $use_dtt_name ) {
			$dttname = $this->name();
			if ( !empty( $dttname ) ) {
				return $dttname;
			}
		}
		//first condition is to see if the months are different
		if ( date( 'm', $this->get_raw( 'DTT_EVT_start' ) ) != date( 'm', $this->get_raw( 'DTT_EVT_end' ) ) ) {
			$displaydate = $this->start_date( 'M j\, Y g:i a' ) . ' - ' . $this->end_date( 'M j\, Y g:i a' );
			//next condition is if its the same month but different day
		}
		else {
			if ( date( 'm', $this->get_raw( 'DTT_EVT_start' ) ) == date( 'm', $this->get_raw( 'DTT_EVT_end' ) ) && date( 'd', $this->get_raw( 'DTT_EVT_start' ) ) != date( 'd', $this->get_raw( 'DTT_EVT_end' ) ) ) {
				$displaydate = $this->start_date( 'M j\, g:i a' ) . ' - ' . $this->end_date( 'M j\, g:i a Y' );
			}
			else {
				$displaydate = $this->start_date( 'F j\, Y' ) . ' @ ' . $this->start_date( 'g:i a' ) . ' - ' . $this->end_date( 'g:i a' );
			}
		}
		return $displaydate;
	}



	/**
	 * Gets all the tickets for this datetime
	 * @param array $query_params see EEM_Base::get_all()
	 * @return EE_Datetime
	 */
	public function tickets( $query_params = array() ) {
		return $this->get_many_related( 'Ticket', $query_params );
	}



	/**
	 * Gets all the ticket types currently available for purchase
	 * @param array $query_params like EEM_Base::get_all's
	 * @return EE_Ticket[]
	 */
	public function ticket_types_available_for_purchase( $query_params = array() ) {
		// first check if datetime is valid
		if ( !( $this->is_upcoming() || $this->is_active() ) || $this->sold_out() ) {
			return array();
		}
		if ( empty( $query_params ) ) {
			$query_params = array( array( 'TKT_start_date' => array( '<=', current_time( 'mysql' ) ), 'TKT_end_date' => array( '>=', current_time( 'mysql' ) ), 'TKT_deleted' => FALSE ) );
		}
		//		$query_params[0]['TKT_start_date'] = array('<=',current_time('mysql'));
		//		$query_params[0]['TKT_end_date'] = array('>=',current_time('mysql'));
		return $this->tickets( $query_params );
	}



	/**
	 *
	 * @return EE_Event
	 */
	public function event() {
		return $this->get_first_related( 'Event' );
	}



	/**
	 * Updates the DTT_sold attribute (and saves) based on the number of registrations for this datetime (via the tickets).
	 * into account
	 * @return int
	 */
	public function update_sold() {
		$count_regs_for_this_datetime = EEM_Registration::instance()->count( array( array( 'STS_ID' => EEM_Registration::status_id_approved, 'Ticket.Datetime.DTT_ID' => $this->ID(), 'REG_deleted' => 0 ) ) );
		$this->set( 'DTT_sold', $count_regs_for_this_datetime );
		$this->save();
		return $count_regs_for_this_datetime;
	}
}

/* End of file EE_Datetime.class.php */
/* Location: includes/classes/EE_Datetime.class.php */
