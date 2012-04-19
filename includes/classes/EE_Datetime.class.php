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
 * @package			Event Espresso
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
    *	Start Timestamp
	* 
	*	date / time
	*  
	*	@access	private
    *	@var int	
    */
	private $_DTT_start;
	
	
	
    /**
    *	End Timestamp
	* 
	*	date / time
	*  
	*	@access	private
    *	@var int	
    */
	private $_DTT_end;
	
	
	
    /**
    *	Event datetime or Registration Datetime 
	*
	*	is this a datetime for the Event itself ? or for the Registration ?
	* 	Event = 'E'	Registration = 'R'		not set = 0
	* 
	*	@access	private
    *	@var string	
    */
	private $_DTT_event_or_reg = 0;	
		
	
	
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
    *	datetimes
	* 
    *	an array of all datetimes for a particular event
	* 
	*	@access	private
    *	@var array	
    */
	private $_all_datetimes = array();	






	/**
	* Event Datetime constructor
	*
	* @access 		public
	* @param 		int 							$EVT_ID 						Event ID
	* @param 		mixed int | string 	$DTT_start 					Unix timestamp or date string for the event or reg beginning
	* @param 		mixed int | string	$DTT_end 					Unix timestamp or date string for the event or reg end
	* @param 		string 						$DTT_event_or_reg  	Whether timestamp is for the actual Event, or for the Registration, denoted by "E" or "R"
	* @param 		mixed						$DTT_reg_limit 			Registration Limit for this time period - int for starts, NULL for ends
	* @param 		int 							$DTT_ID 						Event Datetime ID
	*/
	public function __construct( $EVT_ID = NULL, $DTT_start = NULL, $DTT_end = NULL, $DTT_event_or_reg = 0, $DTT_reg_limit = NULL, $DTT_ID = NULL ) {
	
		global $org_options;
		
		$date_format = get_option('date_format');
		$this->_dt_frmt = $date_format ? $date_format : 'F j, Y';	
		
		$time_format = get_option('time_format');
		$this->_tm_frmt = $time_format ? $time_format : 'g:i a';
		
		$DTT_start = is_int( $DTT_start ) ? $DTT_start : strtotime( $DTT_start );
		$DTT_end = is_int( $DTT_end ) ? $DTT_end : strtotime( $DTT_end );		
		
		$this->_EVT_ID = $EVT_ID;
		$this->_DTT_start = $DTT_start;
		$this->_DTT_end = $DTT_end;
		$this->_DTT_event_or_reg = $DTT_event_or_reg;
		$this->_DTT_reg_limit = $DTT_reg_limit;
		$this->_DTT_ID = $DTT_ID;
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
	private function _start_date() {
		// check for existing event date AND verify that it NOT an end date
		if ( isset( $this->_DTT_start )) {
			return date( $this->_dt_frmt, $this->_DTT_start );
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
	private function _start_time() {
		// check for existing event time
		if ( isset( $this->_DTT_start )) {
			return date( $this->_tm_frmt, $this->_DTT_start );
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
	private function _end_date() {
		// check for existing event date AND verify that it NOT an end date
		if ( isset( $this->_DTT_end )) {
			return date( $this->_dt_frmt, $this->_DTT_end );
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
	private function _end_time() {
		// check for existing event time
		if ( isset( $this->_DTT_end )) {
			return date( $this->_tm_frmt, $this->_DTT_end );
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
	private function _set_date( $date = FALSE, $start = TRUE  ) {
	
		// if no date is set then use today
		if ( ! $date ){
			$event_date = date( $this->_dt_frmt, time());
		} else {
			$event_date = date( $this->_dt_frmt, $date );
		}
		
		if( $start ) {
			// get existing event start time
			if ( ! $event_time = $this->_start_time() ) {
				// or if no time is set, use 1 second after midnight
				$event_time = '00:00:01';
			}
			$this->_DTT_start = strtotime( $event_date . ' ' . $event_time );

		} else {
			// get existing event end time
			if ( ! $event_time = $this->_end_time() ) {
				// or if no time is set, use 1 second after midnight
				$event_time = '23:59:59';
			}
			$this->_DTT_end = strtotime( $event_date . ' ' . $event_time );
		}

		
				
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
	private function _set_time( $time = FALSE, $start = TRUE ) {
	
		// if no time is set, then use RIGHT NOW!!!!
		if ( ! $time ){
			$event_time = date( $this->_tm_frmt, time());
		} else {
			$event_time = date( $this->_tm_frmt, $time );
		}
		
		if( $start ) {
			// get existing event date
			if ( ! $event_date = $this->_start_date() ) {
				// or if no date is set, then use RIGHT NOW!!!!
				$event_date = date( $this->_dt_frmt, time());
			}
			$this->_DTT_start = strtotime( $event_date . ' ' . $event_time );
		} else {
			// get existing event date
			if ( ! $event_date = $this->_end_date() ) {
				// or if no date is set, then use RIGHT NOW!!!!
				$event_date = date( $this->_dt_frmt, time());
			}
			$this->_DTT_endt = strtotime( $event_date . ' ' . $event_time );			
		}
		
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
		$this->_set_date( $date );
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
		$this->_set_time( $time );
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
		$this->_set_date( $date, FALSE );
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
		$this->_set_time( $time, FALSE );
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
	*		show date and/or time
	* 
	* 		@access		private	
	* 		@param		string		$date_or_time - whether to display a date or time or both
	* 		@param		string		$dt_format - string representation of date format defaults to 'F j, Y'
	* 		@param		string		$tm_format - string representation of time format defaults to 'g:i a'
	*		@return 		mixed		string on success, FALSE on fail
	*/	
	private function _show_datetime( $date_or_time = 'D', $start = TRUE, $dt_frmt = FALSE, $tm_format = FALSE ) {
		
		$start_or_end = $start ? 'DTT_start' : 'DTT_end';
		if ( ! isset( $this->{$start_or_end} )) {
			return FALSE;
		}
		
		if ( ! $dt_frmt ){
			$dt_frmt = $this->_dt_frmt;
		}
		
		if ( ! $tm_format ){
			$tm_format = $this->_tm_frmt;
		}
		
		switch ( $date_or_time ) {
			
			case 'D' :
				return date( $dt_frmt, $this->{$start_or_end} );
				break;
			
			case 'T' :
				return date( $tm_format, $this->{$start_or_end} );
				break;
			
			default :
				return date( $dt_frmt . ' ' . $tm_format, $this->{$start_or_end} );
				
		}

	}




	/**
	*		get start date
	* 
	* 		@access		public	
	* 		@param		string		$dt_format - string representation of date format defaults to 'F j, Y'
	*		@return 		mixed		string on success, FALSE on fail
	*/	
	public function start_date( $dt_frmt = FALSE ) {		
		return $this->_show_datetime( 'D', TRUE, $dt_frmt );
	}




	/**
	*		get end date
	* 
	* 		@access		public	
	* 		@param		string		$dt_format - string representation of date format defaults to 'F j, Y'
	*		@return 		mixed		string on success, FALSE on fail
	*/	
	public function end_date( $dt_frmt = FALSE ) {		
		return $this->_show_datetime( 'D', FALSE, $dt_frmt );
	}





	/**
	*		get start time
	* 
	* 		@access		public	
	* 		@param		string		$tm_format - string representation of time format defaults to 'g:i a'
	*		@return 		mixed		string on success, FALSE on fail
	*/	
	public function start_time( $tm_format = FALSE ) {
		return $this->_show_datetime( 'T', TRUE, FALSE, $tm_format );
	}





	/**
	*		get end time
	* 
	* 		@access		public	
	* 		@param		string		$tm_format - string representation of time format defaults to 'g:i a'
	*		@return 		mixed		string on success, FALSE on fail
	*/	
	public function end_time( $tm_format = FALSE ) {
		return $this->_show_datetime( 'T', FALSE, FALSE, $tm_format );
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
		return $this->_show_datetime( '', TRUE, $dt_frmt, $tm_format );
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
		return $this->_show_datetime( '', FALSE, $dt_frmt, $tm_format );
	}




	/**
	*		get start timestamp
	* 
	* 		@access		public	
	*		@return 		int
	*/	
	public function start_timestamp() {
		return $this->_DTT_start;
	}




	/**
	*		get end timestamp
	* 
	* 		@access		public	
	*		@return 		int
	*/	
	public function end_timestamp() {
		return $this->_DTT_end;
	}




	/**
	*		get reg limit
	* 
	* 		@access		public	
	*		@return 		int
	*/	
	public function reg_limit() {
		return $this->_DTT_reg_limit;
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
		
		$this->_DTT_start = is_int( $this->_DTT_start ) ? $this->_DTT_start : strtotime( $this->_DTT_start );
		$this->_DTT_end = is_int( $this->_DTT_end ) ? $this->_DTT_end : strtotime( $this->_DTT_end );		

		$set_column_values = array(
				'EVT_ID'						=> $this->_EVT_ID,
				'DTT_start'					=> $this->_DTT_start,
				'DTT_end'					=> $this->_DTT_end,
				'DTT_event_or_reg'		=> $this->_DTT_event_or_reg,
				'DTT_reg_limit'			=> $this->_DTT_reg_limit
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
	