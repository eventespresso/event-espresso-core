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
 * EE_Datetime class
 *
 * @package				Event Espresso
 * @subpackage		includes/classes/EE_Datetime.class.php
 * @author				Brent Christensen 
 *
 * ------------------------------------------------------------------------
 */
class EE_Datetime extends EE_Base_Class{
	
	/**
	 * constant used by get_active_status, indicates datetime has expired (event is over)
	 */
	const expired = -1;
	/**
	 * constant used in various places indicating that an event is INACTIVE (not yet ready to be published)
	 */
	const inactive = 0;
	/**
	 * constnats used by get_active_status, indicating datetime is still active (even isnt over, can be registered-for)
	 */
	const active = 2;
	/**
	 * constant used by get_active_status, indicating the datetime cannot be used for registrations yet, but has not expired
	 */
	const upcoming = 1;
	
    /**
    *	Datetime ID
	* 
	* 	primary key
	*	
	* 	@access	protected
    *	@var int	
    */
	protected $_DTT_ID;
	
	
	
    /**
    *	Event ID
	* 
	* 	foreign key
	* 
	*	@access	protected
    *	@var int	
    */
	protected $_EVT_ID;
	
	
	
	
	
    /**
    *	Event Start Timestamp
	* 
	*	date / time
	*  
	*	@access	protected
    *	@var int	
    */
	protected $_DTT_EVT_start;
	
	
	
    /**
    *	Event End Timestamp
	* 
	*	date / time
	*  
	*	@access	protected
    *	@var int	
    */
	protected $_DTT_EVT_end;
	
	
		
	
	
    /**
    *	reg limit
	* 
    *	registration limit for this date/time slot
	* 
	*	@access	protected
    *	@var int	
    */
	protected $_DTT_reg_limit = NULL;	
		
	



	/**
	 * if dtt is the primary one or not
	 * @var boolean
	 */
	protected $_DTT_is_primary = null;
	


	/**
	 * The order this event_datetime is displayed in lists
	 * @var int
	 */
	protected $_DTT_order;





	/**
	 * This is the parent for the given DTT (will match another existing DTT_ID in the db).  This is so DTT's attached to revisions are relationally connected to the parent DTT.
	 * @var int
	 */
	protected $_DTT_parent;




	/**
	 *	Related events
	 * @var EE_Event[]
	 */
	protected $_Event;
	
	
	/**
	 *
	 * @var EE_Ticket[]
	 */
	protected $_Ticket;



	
	


	public static function new_instance( $props_n_values = array(), $timezone = NULL ) {
		$classname = __CLASS__;
		$has_object = parent::_check_for_object( $props_n_values, $classname, $timezone );
		return $has_object ? $has_object : new self( $props_n_values, FALSE, $timezone );
	}


	public static function new_instance_from_db ( $props_n_values = array(), $timezone = NULL ) {
		return new self( $props_n_values, TRUE, $timezone );
	}



	/**
	*		Set event start date
	* 
	*		set the start date for an event 
	* 
	* 		@access		public		
	*		@param		string		$date 		a string representation of the event's date ex:  Dec. 25, 2025 or 12-25-2025
	*/	
	public function set_start_date( $date ) {
		$this->_set_date_for($date, 'DTT_EVT_start');
	}





	/**
	*		Set event start time
	* 
	*		set the start time for an event 
	* 
	* 		@access		public		
	*		@param		string		$time 		a string representation of the event time ex:  9am  or  7:30 PM
	*/	
	public function set_start_time( $time ) {
		$this->_set_time_for($time,'DTT_EVT_start');
	}




	/**
	*		Set event end date
	* 
	*		set the end date for an event 
	* 
	* 		@access		public		
	*		@param		string		$date 		a string representation of the event's date ex:  Dec. 25, 2025 or 12-25-2025
	*/	
	public function set_end_date( $date ) {
		$this->_set_date_for($date,'DTT_EVT_end');
	}





	/**
	*		Set event end time
	* 
	*		set the end time for an event 
	* 
	* 		@access		public		
	*		@param		string		$time 		a string representation of the event time ex:  9am  or  7:30 PM
	*/	
	public function set_end_time( $time ) {
		$this->_set_time_for($time,'DTT_EVT_end');
	}








	/**
	*		Set registration limit
	* 
	*		set the maximum number of attendees that can be registered for this datetime slot
	* 
	* 		@access		public		
	*		@param		int		$reg_limit 	
	*/	
	public function set_reg_limit( $reg_limit ) {
		$this->set('DTT_reg_limit', absint( $reg_limit ));
	}









	/**
	*		get Datetime ID
	* 
	* 		@access		public		
	*		@return 		mixed		int on success, FALSE on fail
	*/	
	public function ID() {
		if (isset($this->_DTT_ID)) {
			return $this->_DTT_ID;
		} else {
			return FALSE;
		}
	}






	/**
	 * This helper simply returns whether the event_datetime for the current datetime is a primary datetime
	 * @return boolean          TRUE if is primary, FALSE if not.
	 */
	public function is_primary() {
		return $this->get('DTT_is_primary');
	}




	/**
	 * This helper simply returns the order for the datetime
	 * @return int         The order of the datetime for this event.
	 */
	public function order() {
		return $this->get('DTT_order');
	}




	/**
	 * This helper simply returns the parent id for the datetime
	 * @return int
	 */
	public function parent() {
		return $this->get('DTT_parent');
	}







	/**
	*		show date and/or time
	* 
	* 		@access		private	
	* 		@param		string		$date_or_time - whether to display a date or time or both
	* 		@param		string		$start_or_end - whether to display start or end datetimes
	* 		@param		string		$dt_format - string representation of date format defaults to 'F j, Y'
	* 		@param		string		$tm_format - string representation of time format defaults to 'g:i a'
	* 		@param 		string 		$echo 		whether we echo or return (note echoing uses "pretty" formats, otherwise we use the standard formats)
	*		@return 		mixed		string on success, FALSE on fail
	*/	
	private function _show_datetime( $date_or_time = NULL, $start_or_end = 'start', $dt_frmt = NULL, $tm_frmt = NULL, $echo = FALSE ) {
		$field_name = "DTT_EVT_{$start_or_end}";
		$dtt = $this->_get_datetime( $field_name, $dt_frmt, $tm_frmt, $date_or_time, $echo );
		if ( !$echo ) return $dtt;
	}




	/**
	*		get event start date
	* 
	* 		@access		public	
	* 		@param		string		$dt_format - string representation of date format defaults to 'F j, Y'
	*		@return 		mixed		string on success, FALSE on fail
	*/	
	public function start_date( $dt_frmt = NULL ) {		
		return $this->_show_datetime( 'D', 'start', $dt_frmt );
	}


	public function e_start_date( $dt_frmt = NULL ) {
		$this->_show_datetime( 'D', 'start', $dt_frmt, NULL, TRUE );
	}




	/**
	*		get end date
	* 
	* 		@access		public	
	* 		@param		string		$dt_format - string representation of date format defaults to 'F j, Y'
	*		@return 		mixed		string on success, FALSE on fail
	*/	
	public function end_date( $dt_frmt = NULL ) {		
		return $this->_show_datetime( 'D', 'end', $dt_frmt );
	}

	public function e_end_date( $dt_frmt = NULL ) {		
		$this->_show_datetime( 'D', 'end', $dt_frmt, NULL, TRUE );
	}



	/**
	*		get start time
	* 
	* 		@access		public	
	* 		@param		string		$tm_format - string representation of time format defaults to 'g:i a'
	*		@return 		mixed		string on success, FALSE on fail
	*/	
	public function start_time( $tm_format = NULL ) {
		return $this->_show_datetime( 'T', 'start', NULL, $tm_format );
	}

	public function e_start_time( $tm_format = NULL ) {
		$this->_show_datetime( 'T', 'start', NULL, $tm_format, TRUE );
	}



	/**
	*		get end time
	* 
	* 		@access		public	
	* 		@param		string		$tm_format - string representation of time format defaults to 'g:i a'
	*		@return 		mixed		string on success, FALSE on fail
	*/	
	public function end_time( $tm_format = NULL ) {
		return $this->_show_datetime( 'T', 'end', NULL, $tm_format );
	}

	public function e_end_time( $tm_format = NULL ) {
		$this->_show_datetime( 'T', 'end', NULL, $tm_format, TRUE );
	}




	/**
	*		get start date and start time
	* 
	* 		@access		public	
	* 		@param		string		$dt_format - string representation of date format defaults to 'F j, Y'
	* 		@param		string		$tm_format - string representation of time format defaults to 'g:i a'
	*		@return 		mixed		string on success, FALSE on fail
	*/	
	public function start_date_and_time( $dt_frmt = NULL, $tm_format = NULL ) {
		return $this->_show_datetime( '', 'start', $dt_frmt, $tm_format );
	}

	public function e_start_date_and_time( $dt_frmt = NULL, $tm_format = NULL ) {
		$this->_show_datetime( '', 'start', $dt_frmt, $tm_format, TRUE);
	}




	/**
	*		get end date and time
	* 
	* 		@access		public	
	* 		@param		string		$dt_format - string representation of date format defaults to 'F j, Y'
	* 		@param		string		$tm_format - string representation of time format defaults to 'g:i a'
	*		@return 		mixed		string on success, FALSE on fail
	*/	
	public function end_date_and_time( $dt_frmt = FALSE, $tm_format = FALSE ) {
		return $this->_show_datetime( '', 'end', $dt_frmt, $tm_format );
	}

	public function e_end_date_and_time( $dt_frmt = FALSE, $tm_format = FALSE ) {
		$this->_show_datetime( '', 'end', $dt_frmt, $tm_format, TRUE );
	}




	/**
	*		get start timestamp
	* 
	* 		@access		public	
	*		@return 		int
	*/	
	public function start() {
		return $this->_DTT_EVT_start;
	}




	/**
	*		get end timestamp
	* 
	* 		@access		public	
	*		@return 		int
	*/	
	public function end() {
		return $this->_DTT_EVT_end;
	}






	/**
	*		get the registration limit for this datetime slot
	* 
	* 		@access		public		
	*		@return 		mixed		int on success, FALSE on fail
	*/	
	public function reg_limit() {
		return $this->_DTT_reg_limit;
	}







	/**
	 * This will return a timestamp for the website timezone but ONLY when the current website timezone is different than the timezone set for the website.
	 *
	 * NOTE, this currently only works well with methods that return values.  If you use it with methods that echo values the $_timestamp property may not get reset to its original value and that could lead to some unexpected results!
	 *
	 * @access public
	 * @param string $callback must match a valid method in this class
	 * @param mixed (array|string) $args This is the arguments that will be passed to the callback.
	 * @param string $prepend You can include something to prepend on the timestamp
	 * @param string $append You can include somethign to append on the timestamp
	 * @return string timestamp
	 */
	public function display_in_my_timezone( $callback, $args = NULL, $prepend = '', $append = '' ) {
		$timezone = get_option('timezone_string');
		if ( $timezone == $this->_timezone )
			return '';
		$original_timezone = $this->_timezone;
		$this->set_timezone( $timezone );

		if ( !method_exists( $this, $callback ) )
			throw EE_Error(sprintf( __('The method named "%s" given as the callback param in "display_in_my_timezone" does not exist.  Please check your spelling', 'event_espresso'), $callback ) );
		$args = (array) $args;
		$return =  $prepend . call_user_func_array( array( $this, $callback ), $args ) . $append;
		$this->set_timezone( $original_timezone );
		return $return;
	}


	/**
	 * This simply compares the internal dtt for the given string with NOW and determines if the date is upcoming or not.
	 * @access public
	 * @return boolean 
	 */
	public function is_upcoming() {
		$start = '_DTT_EVT_start';
		$this->_property_exists($start);
		return ( $this->$start > time() );
	}



	/**
	 * This simply compares the internal datetime for the given string with NOW and returns if the date is active (i.e. start and end time)
	 * @return boolean       
	 */
	public function is_active() {
		$start = '_DTT_EVT_start';
		$end = '_DTT_EVT_end';
		$this->_property_exists( array( $start, $end ) );
		return ( $this->$start < time() && $this->$end > time() );
	}




	/**
	 * This simply compares the internal dtt for the given string with NOW and determines if the date is expired or not.
	 * @return boolean       
	 */
	public function is_expired() {
		$end = '_DTT_EVT_end';
		$this->_property_exists( $end );
		return ( $this->$end < time() );
	}




	/**
	 * This returns the active status for whether an event is active, upcoming, or expired
	 * @return int       return value will be one of three ints: -1 = expired, 0 = upcoming, 1 = active.
	 */
	public function get_active_status() {
		if ( $this->is_expired() ) return EE_Datetime::expired;
		if ( $this->is_upcoming() ) return EE_Datetime::upcoming;
		if ( $this->is_active() ) return EE_Datetime::active;
	}


}

/* End of file EE_Datetime.class.php */
/* Location: includes/classes/EE_Datetime.class.php */	
	