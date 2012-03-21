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
	private $DTT_ID;
	
	
	
    /**
    *	Event ID
	* 
	* 	foreign key
	* 
	*	@access	private
    *	@var int	
    */
	private $EVT_ID;
	
	
	
    /**
    *	Timestamp
	* 
	*	date / time
	*  
	*	@access	private
    *	@var int	
    */
	private $DTT_timestamp;
	
	
	
    /**
    *	Event datetime or Registration Datetime 
	*
	*	is this a datetime for the Event itself ? or for the Registration ?
	* 	Event = 'E'	Registration = 'R'		not set = 0
	* 
	*	@access	private
    *	@var string	
    */
	private $DTT_event_or_reg = 0;	
	
	
    /**
    *	Start or End 
	*
	*	is this a start time? end time ? start date ? or end date ?
	* 	start = 'S'	end = 'E'		not set = 0
	* 
	*	@access	private
    *	@var string	
    */
	private $DTT_start_or_end = 0;
	
	
	
    /**
    *	reg limit
	* 
    *	registration limit for this date/time slot
	* 
	*	@access	private
    *	@var int	
    */
	private $DTT_reg_limit = NULL;	
	
	
	
    /**
    *	date format
	* 
    *	pattern or format for displaying dates
	* 
	*	@access	private
    *	@var string	
    */
	private $dt_frmt = 'Y-m-d';	
	
	
	
    /**
    *	time format
	* 
    *	pattern or format for displaying time
	* 
	*	@access	private
    *	@var string	
    */
	private $tm_frmt = 'H:i:s';		
	
	
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
	* @param 		int 					$DTT_ID 						Event Datetime ID
	* @param 		int 					$EVT_ID 						Event ID
	* @param 		timestamp 		$DTT_timestamp 		Unix timestamp
	* @param 		string 				$DTT_event_or_reg  	Whether timestamp is for the actual Event, or for the Registration, denoted by "E" or "R"
	* @param 		string 				$DTT_start_or_end  	Whether timestamp is for the start or end of an event, denoted by "S" or "E"
	* @param 		mixed				$DTT_reg_limit 			Registration Limit for this time period - int for starts, NULL for ends
	*/
	public function __construct( $DTT_ID = NULL, $EVT_ID = NULL, $DTT_timestamp = NULL, $DTT_event_or_reg = 0, $DTT_start_or_end = 0, $DTT_reg_limit = NULL ) {
		$this->DTT_ID = $DTT_ID;
		$this->EVT_ID = $EVT_ID;
		$this->DTT_timestamp = $DTT_timestamp;
		$this->DTT_event_or_reg = $DTT_event_or_reg;
		$this->DTT_start_or_end = $DTT_start_or_end;
		$this->DTT_reg_limit = $DTT_reg_limit;
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
			$this->EVT_ID = absint( $EVT_ID );
			return TRUE;
		}
	}





	/**
	*		get the $EVT_ID for the event that this datetime belongs to
	* 
	* 		@access		public		
	*		@return 	boolean	int on success, FALSE on fail
	*/	
	public function event_ID() {
		if (isset($this->EVT_ID)) {
			return $this->EVT_ID;
		} else {
			return FALSE;
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
		if ( isset( $this->DTT_timestamp ) && ( $this->DTT_start_or_end != 'E' )) {
			return date( $dt_frmt, $this->DTT_timestamp );
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
		if ( isset( $this->DTT_timestamp ) && ( $this->DTT_start_or_end != 'E' )) {
			return date( $tm_frmt, $this->DTT_timestamp );
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
	*		@param		string		$start_or_end 	start time = 'S'	end time = 'E'
	*/	
	private function _set_date( $date = FALSE, $start_or_end = 'S'  ) {
	
		// if no date is set then use today
		if ( ! $date ){
			$event_date = date( $dt_frmt, time());
		} else {
			$event_date = date( $dt_frmt, $date );
		}
		
		// get existing event time
		if ( ! $event_time = $this->start_time() ) {
			// or if no time is set, use 1 second after midnight
			$event_time = '00:00:01';
		}
		
		$this->DTT_timestamp = strtotime( $event_date . ' ' . $event_time );
		$this->DTT_start_or_end = $start_or_end;
				
	}





	/**
	*		Set event time
	* 
	*		set the time for an event
	* 
	* 		@access		private		
	*		@param		string		$time 					a string representation of the event time ex:  9am  or  7:30 PM
	*		@param		string		$start_or_end 	start time = 'S'	end time = 'E'
	*/	
	private function _set_time( $time = FALSE, $start_or_end = 'S' ) {
	
		// if no time is set, then use RIGHT NOW!!!!
		if ( ! $time ){
			$event_time = date( $tm_frmt, time());
		} else {
			$event_time = date( $tm_frmt, $time );
		}
		
		// get existing event date
		if ( ! $event_date = $this->start_date() ) {
			// or if no date is set, then use RIGHT NOW!!!!
			$event_date = date( $dt_frmt, time());
		}
		
		$this->DTT_timestamp = strtotime( $event_date . ' ' . $event_time );
		$this->DTT_start_or_end = $start_or_end;
				
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
		$this->_set_date( $date, 'S' );
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
		$this->_set_time( $time, 'S' );
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
		$this->_set_date( $date, 'E' );
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
		$this->_set_time( $time, 'E' );
	}





	/**
	*		get ID
	* 
	* 		@access		public		
	*		@return 	mixed		int on success, FALSE on fail
	*/	
	public function ID() {
		if (isset($this->DTT_ID)) {
			return $this->DTT_ID;
		} else {
			return FALSE;
		}
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


/* End of file EE_Datetime.class.php */
/* Location: includes/classes/EE_Datetime.class.php */	
	