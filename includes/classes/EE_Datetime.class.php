<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
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
 * @ since		 		3.2.P
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
class EE_Datetime {
	
    /**
    *	Datetime ID
	* 
	* 	primary key
	*	
	* 	@access	private
    *	@var int	
    */
	private $_DTT_ID;
	
	
	
    /**
    *	Event ID
	* 
	* 	foreign key
	* 
	*	@access	private
    *	@var int	
    */
	private $_EVT_ID;
	
	
	
    /**
    *	Primary Datetime (first)
	* 
	* 	foreign key
	* 
	*	@access	private
    *	@var int	
    */
	private $_DTT_is_primary = NULL;
	
	
	
    /**
    *	Event Start Timestamp
	* 
	*	date / time
	*  
	*	@access	private
    *	@var int	
    */
	private $_DTT_EVT_start;
	
	
	
    /**
    *	Event End Timestamp
	* 
	*	date / time
	*  
	*	@access	private
    *	@var int	
    */
	private $_DTT_EVT_end;
	
	
	
	
	
	
    /**
    *	REG Start Timestamp
	* 
	*	date / time
	*  
	*	@access	private
    *	@var int	
    */
	private $_DTT_REG_start;
	
	
	
    /**
    *	REG End Timestamp
	* 
	*	date / time
	*  
	*	@access	private
    *	@var int	
    */
	private $_DTT_REG_end;
		
	
	
    /**
    *	reg limit
	* 
    *	registration limit for this date/time slot
	* 
	*	@access	private
    *	@var int	
    */
	private $_DTT_reg_limit = NULL;	
		
	
	
    /**
    *	available spaces left
	* 
    *	registration limit for this date/time slot
	* 
	*	@access	private
    *	@var int	
    */
	private $_DTT_tckts_left = NULL;	
	
	
	
    /**
    *	date format
	* 
    *	pattern or format for displaying dates
	* 
	*	@access	private
    *	@var string	
    */
	private $_dt_frmt = 'F j, Y';	
	
	
	
    /**
    *	time format
	* 
    *	pattern or format for displaying time
	* 
	*	@access	private
    *	@var string	
    */
	private $_tm_frmt = 'g:i a';







	/**
	* Event Datetime constructor
	*
	* @access 		public
	* @param			int								$EVT_ID 						Event ID
	* @param			int								$DTT_is_primary 		Marks this as a Primary Date time - the first event or reg date
	* @param			mixed int | string 		$DTT_EVT_start 			Unix timestamp or date string for the event beginning
	* @param			mixed int | string		$DTT_EVT_end			Unix timestamp or date string for the event  end
	* @param			mixed int | string 		$DTT_REG_start 			Unix timestamp or date string for the registration beginning
	* @param			mixed int | string		$DTT_REG_end			Unix timestamp or date string for the registration end
	* @param			mixed int | NULL		$DTT_reg_limit 			Registration Limit for this time period - int for limit, NULL for no limit
	* @param			mixed int | NULL		$DTT_tckts_left 		Spaces left for this timeslot - int for limit, NULL for no limit
	* @param			int								$DTT_ID 						Event Datetime ID
	*/
	public function __construct( 
														$EVT_ID = NULL, 
														$DTT_is_primary = 0, 
														$DTT_EVT_start = NULL, 
														$DTT_EVT_end = NULL, 
														$DTT_REG_start = NULL, 
														$DTT_REG_end = NULL, 
														/* DO NOT DELETE - NEW FEATURE IN PROGRESS 
														$DTT_reg_limit = NULL, 
														$DTT_tckts_left = NULL, */
														$DTT_ID = NULL 
												) {
	
		global $org_options;
		
		$date_format							= get_option('date_format');
		$this->_dt_frmt						= $date_format ? $date_format : 'F j, Y';	
		
		$time_format							= get_option('time_format');
		$this->_tm_frmt						= $time_format ? $time_format : 'g:i a';
		
//echo '<h1>B4 !!!</h1>';
//echo '<h4>$DTT_EVT_start : ' . strtotime( $DTT_EVT_start ) . '  <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h4>';
//echo '<h4>$DTT_EVT_end : ' . $DTT_EVT_end . '  <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h4>';
//echo '<h4>$DTT_REG_start : ' . $DTT_REG_start . '  <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h4>';
//echo '<h4>$DTT_REG_end : ' . $DTT_REG_end . '  <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h4>';

		$DTT_EVT_start						= is_numeric( $DTT_EVT_start ) ? absint( $DTT_EVT_start ) : strtotime( wp_strip_all_tags( $DTT_EVT_start ));
		$DTT_EVT_end						= is_numeric( $DTT_EVT_end ) ? absint( $DTT_EVT_end ) : strtotime( wp_strip_all_tags( $DTT_EVT_end ));		
		$DTT_REG_start						= is_numeric( $DTT_REG_start ) ? absint( $DTT_REG_start ) : strtotime( wp_strip_all_tags( $DTT_REG_start ));
		$DTT_REG_end						= is_numeric( $DTT_REG_end ) ? absint( $DTT_REG_end ) : strtotime( wp_strip_all_tags( $DTT_REG_end ));		
		$DTT_is_primary						= absint( $DTT_is_primary ) ? TRUE : FALSE;

//echo '<h1>AFTER !!!</h1>';
//echo '<h4>$DTT_EVT_start : ' . $DTT_EVT_start . '  <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h4>';
//echo '<h4>$DTT_EVT_end : ' . $DTT_EVT_end . '  <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h4>';
//echo '<h4>$DTT_REG_start : ' . $DTT_REG_start . '  <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h4>';
//echo '<h4>$DTT_REG_end : ' . $DTT_REG_end . '  <span style="margin:0 0 0 3em;font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span></h4>';

		$this->_EVT_ID						= absint( $EVT_ID );
		$this->_DTT_is_primary			= $DTT_is_primary;
		$this->_DTT_EVT_start			= $DTT_EVT_start;
		$this->_DTT_EVT_end			= $DTT_EVT_end;
		$this->_DTT_REG_start			= $DTT_REG_start;
		$this->_DTT_REG_end			= $DTT_REG_end;
		/* DO NOT DELETE - NEW FEATURE IN PROGRESS 
		$this->_DTT_reg_limit			= absint( $DTT_reg_limit );
		$this->_DTT_tckts_left		= absint( $DTT_tckts_left );*/
		$this->_DTT_ID						= absint( $DTT_ID );

	}






	/**
	*		Set the $EVT_ID for the event that this datetime belongs to
	* 
	* 		@access		private		
	*		@param		int			$EVT_ID
	*		@return 	boolean	TRUE on success, FALSE on fail
	*/	
	private function _set_event_ID( $EVT_ID = FALSE ) {
		if ( $EVT_ID === FALSE or ! is_numeric($EVT_ID)){
			return FALSE;
		} else {
			$this->_EVT_ID = absint( $EVT_ID );
			return TRUE;
		}
	}







	/**
	*		Get event start date
	* 
	*		get the start date for an event 
	* 
	* 		@access		private		
	*		@return		mixed 	string on success, FALSE if no existing start date
	*/	
	private function _EVT_start_date() {
		// check for existing event date AND verify that it NOT an end date
		if ( isset( $this->_DTT_EVT_start )) {
			return date( $this->_dt_frmt, $this->_DTT_EVT_start );
		} else {
			return FALSE;
		}
	}





	/**
	*		Get event start time
	* 
	*		get the start time for an event 
	* 
	* 		@access		private		
	*		@return		mixed 	string on success, FALSE if no existing start time
	*/	
	private function _EVT_start_time() {
		// check for existing event time
		if ( isset( $this->_DTT_EVT_start )) {
			return date( $this->_tm_frmt, $this->_DTT_EVT_start );
		} else {
			return FALSE;
		}
	}






	/**
	*		Get event end date
	* 
	*		get the end date for an event 
	* 
	* 		@access		private		
	*		@return		mixed 	string on success, FALSE if no existing end date
	*/	
	private function _EVT_end_date() {
		// check for existing event date AND verify that it NOT an end date
		if ( isset( $this->_DTT_EVT_end )) {
			return date( $this->_dt_frmt, $this->_DTT_EVT_end );
		} else {
			return FALSE;
		}
	}





	/**
	*		Get event end time
	* 
	*		get the end time for an event 
	* 
	* 		@access		private		
	*		@return		mixed 	string on success, FALSE if no existing end time
	*/	
	private function _EVT_end_time() {
		// check for existing event time
		if ( isset( $this->_DTT_EVT_end )) {
			return date( $this->_tm_frmt, $this->_DTT_EVT_end );
		} else {
			return FALSE;
		}
	}







	/**
	*		Get REG start date
	* 
	*		get the registration start date for an event 
	* 
	* 		@access		private		
	*		@return		mixed 	string on success, FALSE if no existing start date
	*/	
	private function _REG_start_date() {
		// check for existing event date AND verify that it NOT an end date
		if ( isset( $this->_DTT_REG_start )) {
			return date( $this->_dt_frmt, $this->_DTT_REG_start );
		} else {
			return FALSE;
		}
	}





	/**
	*		Get registration start time
	* 
	*		get the registration start time for an event 
	* 
	* 		@access		private		
	*		@return		mixed 	string on success, FALSE if no existing start time
	*/	
	private function _REG_start_time() {
		// check for existing event time
		if ( isset( $this->_DTT_REG_start )) {
			return date( $this->_tm_frmt, $this->_DTT_REG_start );
		} else {
			return FALSE;
		}
	}






	/**
	*		Get registration end date
	* 
	*		get the registration end date for an event 
	* 
	* 		@access		private		
	*		@return		mixed 	string on success, FALSE if no existing end date
	*/	
	private function _REG_end_date() {
		// check for existing event date AND verify that it NOT an end date
		if ( isset( $this->_DTT_REG_end )) {
			return date( $this->_dt_frmt, $this->_DTT_REG_end );
		} else {
			return FALSE;
		}
	}





	/**
	*		Get registration end time
	* 
	*		get the registration end time for an event 
	* 
	* 		@access		private		
	*		@return		mixed 	string on success, FALSE if no existing end time
	*/	
	private function _REG_end_time() {
		// check for existing event time
		if ( isset( $this->_DTT_REG_end )) {
			return date( $this->_tm_frmt, $this->_DTT_REG_end );
		} else {
			return FALSE;
		}
	}





	/**
	*		Set event date
	* 
	*		set the date for an event - use time() if no date is provided
	* 
	* 		@access		private		
	*		@param		string		$date 					a string representation of the event's date ex:  Dec. 25, 2025 or 12-25-2025
	*		@param		string		$start				 	whether to set start or end dates
	*/	
	private function _set_date( $date = FALSE, $start_or_end = 'start', $EVT_or_REG = 'EVT' ) {
	
		// if no date is set then use today
		if ( ! $date ){
			$event_date = date( $this->_dt_frmt, time());
		} else {
			$event_date = date( $this->_dt_frmt, strtotime($date) );
		}
		
		if( $start_or_end == 'start' ) {
			// get existing event start time
			$function_name = "_{$EVT_or_REG}_start_time";
			if ( $event_time = $this->$function_name() ) {
				// or if no time is set, use 1 second after midnight
				$event_time = '00:00:01';
			}

		} else {
			// get existing event end time
			$function_name = "_{$EVT_or_REG}_end_time";
			if ( ! $event_time = $this->$function_name() ) {
				// or if no time is set, use 1 second before midnight
				$event_time = '23:59:59';
			}
		}

		$var_name = "_DTT_{$EVT_or_REG}_{$start_or_end}";
		$this->$var_name = strtotime( $event_date . ' ' . $event_time );
				
	}





	/**
	*		Set event time
	* 
	*		set the time for an event
	* 
	* 		@access		private		
	*		@param		string		$time 					a string representation of the event time ex:  9am  or  7:30 PM
	*		@param		string		$start				 	whether to set start or end times
	*/	
	private function _set_time( $time = FALSE, $start_or_end = 'start', $EVT_or_REG = 'EVT' ) {
	
		// if no time is set, then use RIGHT NOW!!!!
		if ( ! $time ){
			$event_time = date( $this->_tm_frmt, time());
		} else {
			$event_time = date( $this->_tm_frmt, strtotime($time) );
		}

		$function_name = "_{$EVT_or_REG}_{$start_or_end}_date";
		if ( ! $event_date = $this->$function_name() ) {
			// or if no date is set, then use RIGHT NOW!!!!
			$event_date = date( $this->_dt_frmt, time());
		}
			
		$var_name = "_DTT_{$EVT_or_REG}_{$start_or_end}";
		$this->$var_name = strtotime( $event_date . ' ' . $event_time );

					
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
		$this->_set_date( $date, 'start', 'EVT' );
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
		$this->_set_time( $time, 'start', 'EVT' );
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
		$this->_set_date( $date, 'end', 'EVT' );
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
		$this->_set_time( $time, 'end', 'EVT' );
	}





	/**
	*		Set registration start date
	* 
	*		set the registration start date for an event 
	* 
	* 		@access		public		
	*		@param		string		$date 		a string representation of the event's date ex:  Dec. 25, 2025 or 12-25-2025
	*/	
	public function set_reg_start_date( $date ) {
		$this->_set_date( $date, 'start', 'REG' );
	}





	/**
	*		Set registration start time
	* 
	*		set the registration start time for an event 
	* 
	* 		@access		public		
	*		@param		string		$time 		a string representation of the event time ex:  9am  or  7:30 PM
	*/	
	public function set_reg_start_time( $time ) {
		$this->_set_time( $time, 'start', 'REG' );
	}




	/**
	*		Set registration end date
	* 
	*		set the registration end date for an event 
	* 
	* 		@access		public		
	*		@param		string		$date 		a string representation of the event's date ex:  Dec. 25, 2025 or 12-25-2025
	*/	
	public function set_reg_end_date( $date ) {
		$this->_set_date( $date, 'end', 'REG' );
	}





	/**
	*		Set registration end time
	* 
	*		set the registration end time for an event 
	* 
	* 		@access		public		
	*		@param		string		$time 		a string representation of the event time ex:  9am  or  7:30 PM
	*/	
	public function set_reg_end_time( $time ) {
		$this->_set_time( $time, 'end', 'REG' );
	}





	/**
	*		Set as primary date
	* 
	*		set the datetime as the primary datetime - please verify that all other datetimes are now set to false
	* 
	* 		@access		public		
	*		@param		string		$primary 		True or False ?
	*/	
	public function set_primary( $primary ) {
		$this->_DTT_is_primary = (bool)absint( $primary );
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
		$this->_DTT_reg_limit = absint( $reg_limit );
	}





	/**
	*		Set availalbe spaces
	* 
	*		set remaining number of spaces left for this datetime slot
	* 
	* 		@access		public		
	*		@param		int		$tckts_left 
	*/	
	public function set_tckts_left( $tckts_left ) {
		$this->_DTT_tckts_left = absint( $tckts_left );
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
	*		get the $EVT_ID for the event that this datetime belongs to
	* 
	* 		@access		public		
	*		@return 		mixed		int on success, FALSE on fail
	*/	
	public function event_ID() {
		if (isset($this->_EVT_ID)) {
			return $this->_EVT_ID;
		} else {
			return FALSE;
		}
	}





	/**
	*		whether this is the primary datetime for the event or registration
	* 
	* 		@access		public		
	*		@return 		bool		bool on success, FALSE on fail
	*/	
	public function is_primary() {
	
		if ( is_bool( $this->_DTT_is_primary )) {
			return $this->_DTT_is_primary ? TRUE : FALSE;
		} else {
			return 'NOT SET';
		}
	}





	/**
	*		show date and/or time
	* 
	* 		@access		private	
	* 		@param		string		$date_or_time - whether to display a date or time or both
	* 		@param		string		$EVT_or_REG - whether to display event or registration datetimes
	* 		@param		string		$start_or_end - whether to display start or end datetimes
	* 		@param		string		$dt_format - string representation of date format defaults to 'F j, Y'
	* 		@param		string		$tm_format - string representation of time format defaults to 'g:i a'
	*		@return 		mixed		string on success, FALSE on fail
	*/	
	private function _show_datetime( $date_or_time = NULL, $EVT_or_REG = 'EVT', $start_or_end = 'start', $dt_frmt = FALSE, $tm_format = FALSE ) {
		
		if ( ! $dt_frmt ){
			$dt_frmt = $this->_dt_frmt;
		}
		
		if ( ! $tm_format ){
			$tm_format = $this->_tm_frmt;
		}

		$var_name = "_DTT_{$EVT_or_REG}_{$start_or_end}";
		
		switch ( $date_or_time ) {
			
			case 'D' :
				return date( $dt_frmt, $this->{$var_name} );
				break;
			
			case 'T' :
				return date( $tm_format, $this->{$var_name} );
				break;
			
			default :
				return date( $dt_frmt . ' ' . $tm_format, $this->{$var_name} );
				
		}

	}




	/**
	*		get event start date
	* 
	* 		@access		public	
	* 		@param		string		$dt_format - string representation of date format defaults to 'F j, Y'
	*		@return 		mixed		string on success, FALSE on fail
	*/	
	public function start_date( $dt_frmt = FALSE ) {		
		return $this->_show_datetime( 'D', 'EVT', 'start', $dt_frmt );
	}




	/**
	*		get end date
	* 
	* 		@access		public	
	* 		@param		string		$dt_format - string representation of date format defaults to 'F j, Y'
	*		@return 		mixed		string on success, FALSE on fail
	*/	
	public function end_date( $dt_frmt = FALSE ) {		
		return $this->_show_datetime( 'D', 'EVT', 'end', $dt_frmt );
	}





	/**
	*		get start time
	* 
	* 		@access		public	
	* 		@param		string		$tm_format - string representation of time format defaults to 'g:i a'
	*		@return 		mixed		string on success, FALSE on fail
	*/	
	public function start_time( $tm_format = FALSE ) {
		return $this->_show_datetime( 'T', 'EVT', 'start', FALSE, $tm_format );
	}





	/**
	*		get end time
	* 
	* 		@access		public	
	* 		@param		string		$tm_format - string representation of time format defaults to 'g:i a'
	*		@return 		mixed		string on success, FALSE on fail
	*/	
	public function end_time( $tm_format = FALSE ) {
		return $this->_show_datetime( 'T', 'EVT', 'end', FALSE, $tm_format );
	}





	/**
	*		get start date and start time
	* 
	* 		@access		public	
	* 		@param		string		$dt_format - string representation of date format defaults to 'F j, Y'
	* 		@param		string		$tm_format - string representation of time format defaults to 'g:i a'
	*		@return 		mixed		string on success, FALSE on fail
	*/	
	public function start_date_and_time( $dt_frmt = FALSE, $tm_format = FALSE ) {
		return $this->_show_datetime( '', 'EVT', 'start', $dt_frmt, $tm_format );
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
		return $this->_show_datetime( '', 'EVT', 'end', $dt_frmt, $tm_format );
	}




	/**
	*		get registration start date
	* 
	* 		@access		public	
	* 		@param		string		$dt_format - string representation of date format defaults to 'F j, Y'
	*		@return 		mixed		string on success, FALSE on fail
	*/	
	public function reg_start_date( $dt_frmt = FALSE ) {		
		return $this->_show_datetime( 'D', 'REG', 'start', $dt_frmt );
	}




	/**
	*		get registration end date
	* 
	* 		@access		public	
	* 		@param		string		$dt_format - string representation of date format defaults to 'F j, Y'
	*		@return 		mixed		string on success, FALSE on fail
	*/	
	public function reg_end_date( $dt_frmt = FALSE ) {		
		return $this->_show_datetime( 'D', 'REG', 'end', $dt_frmt );
	}





	/**
	*		get registration start time
	* 
	* 		@access		public	
	* 		@param		string		$tm_format - string representation of time format defaults to 'g:i a'
	*		@return 		mixed		string on success, FALSE on fail
	*/	
	public function reg_start_time( $tm_format = FALSE ) {
		return $this->_show_datetime( 'T', 'REG', 'start', FALSE, $tm_format );
	}





	/**
	*		get registration end time
	* 
	* 		@access		public	
	* 		@param		string		$tm_format - string representation of time format defaults to 'g:i a'
	*		@return 		mixed		string on success, FALSE on fail
	*/	
	public function reg_end_time( $tm_format = FALSE ) {
		return $this->_show_datetime( 'T', 'REG', 'end', FALSE, $tm_format );
	}





	/**
	*		get registrationstart date and start time
	* 
	* 		@access		public	
	* 		@param		string		$dt_format - string representation of date format defaults to 'F j, Y'
	* 		@param		string		$tm_format - string representation of time format defaults to 'g:i a'
	*		@return 		mixed		string on success, FALSE on fail
	*/	
	public function reg_start_date_and_time( $dt_frmt = FALSE, $tm_format = FALSE ) {
		return $this->_show_datetime( '', 'REG', 'start', $dt_frmt, $tm_format );
	}





	/**
	*		get registration end date and time
	* 
	* 		@access		public	
	* 		@param		string		$dt_format - string representation of date format defaults to 'F j, Y'
	* 		@param		string		$tm_format - string representation of time format defaults to 'g:i a'
	*		@return 		mixed		string on success, FALSE on fail
	*/	
	public function reg_end_date_and_time( $dt_frmt = FALSE, $tm_format = FALSE ) {
		return $this->_show_datetime( '', 'REG', 'end', $dt_frmt, $tm_format );
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
	*		get registration start timestamp
	* 
	* 		@access		public	
	*		@return 		int
	*/	
	public function reg_start() {
		return $this->_DTT_REG_start;
	}




	/**
	*		get registration end timestamp
	* 
	* 		@access		public	
	*		@return 		int
	*/	
	public function reg_end() {
		return $this->_DTT_REG_end;
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
	*		get the available spaces left for this datetime slot
	* 
	* 		@access		public		
	*		@return 		mixed		int on success, FALSE on fail
	*/	
	public function tckts_left() {
		return $this->_DTT_tckts_left;
	}






	/**
	*		update existing db record
	*
	* 		@access		public
	*/
	public function update() {
		return $this->_save_to_db( array( 'DTT_ID' => $this->_DTT_ID ));
	}


	/**
	*	insert new db record
	*
	* @access		public
	*/
	public function insert() {
		return $this->_save_to_db();
	}





	/**
	*		save object to db
	*
	* 		@access		private
	* 		@param		array		$where_cols_n_values
	*/
	private function _save_to_db( $where_cols_n_values = FALSE ) {

		 $MODEL = EEM_Datetime::instance();
		
		$set_column_values = array(
				'EVT_ID'						=> $this->_EVT_ID,
				'DTT_is_primary'			=> $this->_DTT_is_primary,
				'DTT_EVT_start'			=> $this->_DTT_EVT_start,
				'DTT_EVT_end'			=> $this->_DTT_EVT_end,
				'DTT_REG_start'			=> $this->_DTT_REG_start,
				'DTT_REG_end'			=> $this->_DTT_REG_end,
				/*'DTT_reg_limit'			=> $this->_DTT_reg_limit,
				'DTT_tckts_left'		=> $this->_DTT_tckts_left*/
		);

		if ( $where_cols_n_values ){
			$results = $MODEL->update ( $set_column_values, $where_cols_n_values );
		} else {
			$results = $MODEL->insert ( $set_column_values );
		}

		return $results;
	}



		

	/**
	 *		@ override magic methods
	 *		@ return void
	 */	
	public function __get($a) { return FALSE; }
	public function __set($a,$b) { return FALSE; }
	public function __unset($a) { return FALSE; }
	public function __clone() { return FALSE; }
	public function __wakeup() { return FALSE; }



}


/*
	EXAMPLE USAGE

	require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/Espresso_base.model.php' );
	require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/Event_datetime.model.php' );
	$EVT_DTT = Event_datetime::instance();
//	$EVT_DTT->convert_existing_event_datetimes();	

	$start_dates = $EVT_DTT->get_event_start_dates( 8 );
	$end_dates = $EVT_DTT->get_event_end_dates( 8 );
	$reg_start_dates = $EVT_DTT->get_reg_start_dates( 8 );
	$reg_end_dates = $EVT_DTT->get_reg_end_dates( 8 );
	
	foreach( $start_dates as $start_date ) {
		echo $start_date->show_date() . '<br />';
		echo $start_date->show_time() . '<br />';
		echo $start_date->show_date_and_time() . '<br />';
		echo $start_date->show_date_and_time( 'l \t\h\e jS \of F, Y,', '\a\t h:i:s A' ) . '<br />';
	}
*/


/* End of file EE_Datetime.class.php */
/* Location: includes/classes/EE_Datetime.class.php */	
	